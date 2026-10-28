const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const KEY_PATH = path.join(__dirname, '../service_account.json');

async function getAccessToken(keyPath) {
  const parsed = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: parsed.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(header + '.' + claim);
  const signature = sign.sign(parsed.private_key, 'base64url');
  const jwt = header + '.' + claim + '.' + signature;

  const postData = 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + encodeURIComponent(jwt);

  return new Promise((resolve, reject) => {
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
          const resp = JSON.parse(data);
          if (resp.access_token) resolve(resp.access_token);
          else reject(new Error('No access_token: ' + data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function querySearchAnalytics(token, siteUrl, requestBody) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(requestBody);
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const u = new URL(endpoint);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message, raw: data });
        }
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function main() {
  const token = await getAccessToken(KEY_PATH);
  const siteUrl = 'https://baruipur.online/';
  const endDate = '2026-10-28';
  const startDate = '2026-07-30';

  console.log('Querying query + page combinations from GSC...');
  const res = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    rowLimit: 5000
  });

  const rows = res.rows || [];
  console.log(`Fetched ${rows.length} total page-query rows.`);

  const pageGroups = {};
  for (const r of rows) {
    const pageUrl = r.keys[0];
    const query = r.keys[1];
    if (!pageGroups[pageUrl]) {
      pageGroups[pageUrl] = {
        url: pageUrl,
        totalImpressions: 0,
        totalClicks: 0,
        queries: []
      };
    }
    pageGroups[pageUrl].totalImpressions += r.impressions;
    pageGroups[pageUrl].totalClicks += r.clicks;
    pageGroups[pageUrl].queries.push({
      query,
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: (r.ctr * 100).toFixed(1) + '%',
      position: Number(r.position.toFixed(1))
    });
  }

  // Sort queries within each page
  for (const url in pageGroups) {
    pageGroups[url].queries.sort((a,b) => b.impressions - a.impressions);
  }

  // Sort pages by total impressions
  const sortedPages = Object.values(pageGroups).sort((a,b) => b.totalImpressions - a.totalImpressions);

  fs.writeFileSync('gsc_all_pages_with_queries.json', JSON.stringify(sortedPages, null, 2));

  console.log(`\n=== TOP 25 EXISTING PAGES GETTING SEARCH IMPRESSIONS ===`);
  for (const p of sortedPages.slice(0, 25)) {
    const pathOnly = p.url.replace('https://baruipur.online', '');
    console.log(`\n📄 ${pathOnly} (Total Imp: ${p.totalImpressions}, Clicks: ${p.totalClicks})`);
    for (const q of p.queries.slice(0, 5)) {
      console.log(`   - "${q.query}" | Impr: ${q.impressions} | Clicks: ${q.clicks} | Pos: ${q.position}`);
    }
  }
}

main().catch(console.error);
