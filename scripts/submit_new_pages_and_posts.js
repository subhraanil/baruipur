const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const KEY_PATHS = [
  path.join(__dirname, '../service_account.json'),
  path.join(__dirname, '../service_account_2.json'),
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
          if (res.statusCode === 200) {
            resolve({ success: true, statusCode: 200, response: data, account: account.client_email });
          } else {
            let parsed = data;
            try { parsed = JSON.parse(data); } catch (e) {}
            resolve({ success: false, statusCode: res.statusCode, error: parsed, account: account.client_email });
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

async function main() {
  console.log('=== Prioritized Google Indexing API Submission ===\n');
  const accounts = loadServiceAccounts();

  if (accounts.length === 0) {
    console.error('ERROR: No valid Google Service Account keys found.');
    process.exit(1);
  }

  console.log(`Loaded ${accounts.length} Service Account(s):`);
  accounts.forEach((a, i) => console.log(`  [${i + 1}] ${a.client_email} (${a.project_id})`));

  // 1. Define High-Priority New URLs First!
  const highPriorityUrls = [
    // 4 Mega Guides
    'https://baruipur.online/baruipur-durga-puja-parikrama-pandal-guide-2026/',
    'https://baruipur.online/best-restaurants-cafes-and-food-guide-in-baruipur/',
    'https://baruipur.online/best-banquet-halls-and-marriage-venues-in-baruipur/',
    'https://baruipur.online/baruipur-real-estate-property-and-flat-buying-guide/',

    // 3 Legal/Policy Pages for AdSense
    'https://baruipur.online/privacy-policy/',
    'https://baruipur.online/terms-of-service/',
    'https://baruipur.online/disclaimer/',

    // Key Pillars & Guides
    'https://baruipur.online/',
    'https://baruipur.online/shopping-malls-and-top-brands-in-baruipur-market-guide/',
    'https://baruipur.online/top-schools-in-baruipur-education-admission-guide/',
    'https://baruipur.online/top-things-to-do-in-baruipur-complete-experience-guide/',
    'https://baruipur.online/best-places-to-visit-in-baruipur-travel-guide/',
    'https://baruipur.online/places/',
    'https://baruipur.online/organizations/',
    'https://baruipur.online/health-directory/',
    'https://baruipur.online/events/',
    'https://baruipur.online/transport/',
    'https://baruipur.online/editorial-team/',
    'https://baruipur.online/editorial-policy/',
    'https://baruipur.online/corrections-policy/',
    'https://baruipur.online/emergency-contacts/',
    'https://baruipur.online/citizen-services/'
  ];

  // Load articles from news_data.json and sort newest first
  const dataPath = path.join(__dirname, '../src/data/news_data.json');
  const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const sortedArticles = (newsData.articles || [])
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Add all sorted article URLs
  for (const art of sortedArticles) {
    const slug = art.slug || art.id;
    const url = `https://baruipur.online/${encodeURI(slug)}/`;
    if (!highPriorityUrls.includes(url)) {
      highPriorityUrls.push(url);
    }
  }

  // Load all URLs from sitemap.xml to catch any others
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const allSitemapUrls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    for (const u of allSitemapUrls) {
      if (!highPriorityUrls.includes(u)) {
        highPriorityUrls.push(u);
      }
    }
  }

  console.log(`\nPrepared ${highPriorityUrls.length} total URLs to submit (Newest & High Priority first!).\n`);

  let accountIndex = 0;
  let successful = 0;
  let failed = 0;
  let quotaReachedCount = 0;

  for (let i = 0; i < highPriorityUrls.length; i++) {
    const url = highPriorityUrls[i];
    const currentAccount = accounts[accountIndex % accounts.length];

    process.stdout.write(`[${i + 1}/${highPriorityUrls.length}] ${url} ... `);
    const res = await submitUrlNotification(url, currentAccount);

    if (res.success) {
      console.log(`✓ 200 OK (${currentAccount.client_email.split('@')[0]})`);
      successful++;
    } else {
      const errMsg = res.error?.error?.message || JSON.stringify(res.error);
      console.log(`✗ ${res.statusCode}: ${errMsg}`);
      failed++;

      if (res.error?.error?.code === 429 || res.statusCode === 429) {
        quotaReachedCount++;
        if (accounts.length > 1) {
          console.log(`>>> Quota reached for ${currentAccount.client_email.split('@')[0]}. Switching to next account.`);
          accountIndex++;
        }
        // If all accounts hit 429, don't spam
        if (quotaReachedCount >= accounts.length * 2) {
          console.log('\n⚠️ All service accounts have exhausted their daily Google Indexing quota (200 requests/day per project).');
          console.log('Any remaining URLs will be indexed automatically when the quota resets or through sitemap.xml ping.');
          break;
        }
      }
    }
  }

  console.log('\n==========================================');
  console.log(`Indexing Submission Finished!`);
  console.log(`Total URLs attempted: ${successful + failed}`);
  console.log(`Successful (200 OK):  ${successful}`);
  console.log(`Failed / Quota:       ${failed}`);
  console.log('==========================================\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
