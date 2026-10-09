const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// Key paths to check for Google Service Account credentials
const KEY_PATHS = [
  path.join(__dirname, '../service_account.json'),
  path.join(__dirname, '../service_account_2.json'),
  path.join(__dirname, '../service_account_indexing_397007.json'),
  'C:\\Users\\test\\Videos\\MY-AI Agent\\service_account.json',
  'C:\\Users\\test\\Videos\\TE-AI Agent\\service_account.json'
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

function getAllNonNewsUrls() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const allUrls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  // Load news slugs to strictly exclude
  const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/news_data.json'), 'utf8'));
  const newsSlugs = new Set((newsData.articles || []).map(a => a.slug));
  const newsIds = new Set((newsData.articles || []).map(a => a.id));

  const nonNewsUrls = allUrls.filter(url => {
    // Exclude article/[id]
    if (url.includes('/article/')) return false;

    // Check if path matches a news slug (e.g. https://baruipur.online/[newsSlug])
    const pathPart = url.replace('https://baruipur.online/', '').replace(/\/$/, '');
    if (!pathPart) return true; // Homepage

    const decoded = decodeURIComponent(pathPart);
    if (newsSlugs.has(decoded) || newsIds.has(decoded)) return false;

    return true;
  });

  return Array.from(new Set(nonNewsUrls));
}

async function main() {
  console.log('====================================================');
  console.log('  Google Indexing API: Organizations, Places & Pages');
  console.log('====================================================\n');

  const accounts = loadServiceAccounts();
  if (accounts.length === 0) {
    console.error('ERROR: No service account credentials found.');
    process.exit(1);
  }

  console.log(`Loaded ${accounts.length} Service Account(s):`);
  accounts.forEach((a, i) => console.log(`  [${i + 1}] ${a.client_email} (Project: ${a.project_id})`));

  const targetUrls = getAllNonNewsUrls();
  console.log(`\nFiltered non-news target URLs to submit: ${targetUrls.length}`);

  const orgUrls = targetUrls.filter(u => u.includes('/organizations'));
  const placeUrls = targetUrls.filter(u => u.includes('/places'));
  const healthUrls = targetUrls.filter(u => u.includes('/health-directory'));
  const otherPages = targetUrls.filter(u => !u.includes('/organizations') && !u.includes('/places') && !u.includes('/health-directory'));

  console.log(`  - Organizations: ${orgUrls.length}`);
  console.log(`  - Places:        ${placeUrls.length}`);
  console.log(`  - Health:        ${healthUrls.length}`);
  console.log(`  - Core Pages:    ${otherPages.length}`);

  const results = {
    startedAt: new Date().toISOString(),
    totalUrls: targetUrls.length,
    successful: 0,
    failed: 0,
    details: []
  };

  let accountIndex = 0;

  for (let i = 0; i < targetUrls.length; i++) {
    const url = targetUrls[i];
    let submitted = false;
    while (!submitted && accountIndex < accounts.length) {
      const currentAccount = accounts[accountIndex];
      process.stdout.write(`[${i + 1}/${targetUrls.length}] Submitting: ${url} (via ${currentAccount.client_email.split('@')[0]}) ... `);
      const res = await submitUrlNotification(url, currentAccount);

      if (res.success) {
        console.log(`✓ 200 OK`);
        results.successful++;
        results.details.push({
          url,
          status: 'SUCCESS',
          account: currentAccount.client_email,
          timestamp: new Date().toISOString()
        });
        submitted = true;
      } else {
        console.log(`✗ (${res.statusCode}): ${JSON.stringify(res.error?.error?.message || res.error)}`);
        if (res.error?.error?.code === 429 || res.statusCode === 429) {
          console.log(`Account ${currentAccount.client_email} reached daily quota. Switching to next account...`);
          accountIndex++;
        } else {
          // If other error, record failure and break to next URL
          results.failed++;
          results.details.push({
            url,
            status: 'FAILED',
            statusCode: res.statusCode,
            error: res.error,
            account: currentAccount.client_email,
            timestamp: new Date().toISOString()
          });
          break;
        }
      }
    }

    await sleep(150);
  }

  results.completedAt = new Date().toISOString();
  results.summary = {
    total: targetUrls.length,
    successful: results.successful,
    failed: results.failed,
    accountsUsed: accounts.map(a => ({ email: a.client_email, quotaUsed: a.quotaUsed }))
  };

  const reportDir = path.join(__dirname, '../reports');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, 'non-news-indexing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n==========================================');
  console.log(`Non-News Indexing Submission Finished!`);
  console.log(`Total URLs: ${results.totalUrls}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed:     ${results.failed}`);
  console.log(`Report saved to: ${reportPath}`);
  console.log('==========================================\n');
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
