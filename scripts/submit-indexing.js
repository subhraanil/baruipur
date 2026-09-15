const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// Key paths to check
const KEY_PATHS = [
  path.join(__dirname, '../service_account.json'),
  path.join(__dirname, '../service_account_2.json'),
  path.join(__dirname, '../service_account_indexing_397007.json'),
  'C:\\Users\\test\\Videos\\MY-AI Agent\\service_account.json'
];

function loadServiceAccounts() {
  const accounts = [];
  const seen = new Set();
  for (const p of KEY_PATHS) {
    if (fs.existsSync(p)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (parsed.client_email && parsed.private_key && !seen.has(parsed.client_email)) {
          seen.add(parsed.client_email);
          accounts.push({
            client_email: parsed.client_email,
            private_key: parsed.private_key,
            project_id: parsed.project_id,
            token: null,
            tokenExpiry: 0,
            quotaUsed: 0
          });
        }
      } catch (e) {
        console.warn(`[WARN] Failed reading key at ${p}:`, e.message);
      }
    }
  }
  return accounts;
}

function getAccessToken(account) {
  const now = Math.floor(Date.now() / 1000);
  if (account.token && account.tokenExpiry > now + 60) {
    return Promise.resolve(account.token);
  }

  return new Promise((resolve, reject) => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const claim = Buffer.from(JSON.stringify({
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    })).toString('base64url');

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(header + '.' + claim);
    const signature = sign.sign(account.private_key, 'base64url');
    const jwt = header + '.' + claim + '.' + signature;

    const postData = 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + encodeURIComponent(jwt);

    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) {
            account.token = parsed.access_token;
            account.tokenExpiry = now + (parsed.expires_in || 3600);
            resolve(parsed.access_token);
          } else {
            reject(new Error(`OAuth error: ${data}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function submitUrlNotification(url, account, type = 'URL_UPDATED') {
  return new Promise(async (resolve) => {
    try {
      const token = await getAccessToken(account);
      const postData = JSON.stringify({
        url: url.trim(),
        type: type
      });

      const req = https.request('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              account.quotaUsed++;
              resolve({ success: true, statusCode: res.statusCode, response: parsed, account: account.client_email });
            } else {
              resolve({ success: false, statusCode: res.statusCode, error: parsed, account: account.client_email });
            }
          } catch (e) {
            resolve({ success: false, statusCode: res.statusCode, error: data, account: account.client_email });
          }
        });
      });

      req.on('error', (err) => {
        resolve({ success: false, statusCode: 0, error: err.message, account: account.client_email });
      });

      req.write(postData);
      req.end();
    } catch (err) {
      resolve({ success: false, statusCode: 0, error: err.message, account: account.client_email });
    }
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('=== Google Indexing API Bulk Submitter ===\n');
  const accounts = loadServiceAccounts();

  if (accounts.length === 0) {
    console.error('ERROR: No valid Google Service Account JSON keys found.');
    console.log('Please place your service account JSON file as "service_account.json" or "service_account_2.json".');
    process.exit(1);
  }

  console.log(`Loaded ${accounts.length} Service Account(s):`);
  accounts.forEach((a, i) => console.log(`  [${i + 1}] ${a.client_email} (Project: ${a.project_id})`));

  // Load URLs from sitemap.xml
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`ERROR: Sitemap not found at ${sitemapPath}`);
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`\nTotal URLs in sitemap to submit: ${urls.length}`);

  const results = {
    startedAt: new Date().toISOString(),
    totalUrls: urls.length,
    successful: 0,
    failed: 0,
    details: []
  };

  let accountIndex = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const currentAccount = accounts[accountIndex % accounts.length];

    process.stdout.write(`[${i + 1}/${urls.length}] Submitting: ${url} ... `);
    const res = await submitUrlNotification(url, currentAccount);

    if (res.success) {
      console.log(`✓ 200 OK (${currentAccount.client_email.split('@')[0]})`);
      results.successful++;
      results.details.push({
        url,
        status: 'SUCCESS',
        account: currentAccount.client_email,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(`✗ FAILED (${res.statusCode}): ${JSON.stringify(res.error?.error?.message || res.error)}`);
      
      if (res.error?.error?.code === 429 && accounts.length > 1) {
        console.log(`Quota reached for ${currentAccount.client_email}. Switching account.`);
        accountIndex++;
      }

      results.failed++;
      results.details.push({
        url,
        status: 'FAILED',
        error: res.error,
        account: currentAccount.client_email,
        timestamp: new Date().toISOString()
      });
    }

    // Rate limiting: 100ms
    await sleep(100);
  }

  results.completedAt = new Date().toISOString();
  results.summary = {
    total: urls.length,
    success: results.successful,
    failed: results.failed,
    accountsUsed: accounts.map(a => ({ email: a.client_email, quotaUsed: a.quotaUsed }))
  };

  const reportDir = path.join(__dirname, '../reports');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, 'indexing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n==========================================');
  console.log(`Indexing Submission Complete!`);
  console.log(`Total URLs: ${results.totalUrls}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed:     ${results.failed}`);
  console.log(`Report written to: ${reportPath}`);
  console.log('==========================================\n');
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
