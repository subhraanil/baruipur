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
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
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
          resolve(resp.access_token);
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

async function run() {
  const token = await getAccessToken(KEY_PATH);
  const siteUrl = 'https://baruipur.online/';

  console.log('Querying GSC for last 7 days (2026-11-08 to 2026-11-14)...');
  const res = await querySearchAnalytics(token, siteUrl, {
    startDate: '2026-11-08',
    endDate: '2026-11-14',
    dimensions: ['page', 'query'],
    rowLimit: 100
  });

  console.log('Last 7 days results (page + query):', (res.rows || []).length);
  (res.rows || []).forEach(r => {
    console.log(`Page: ${r.keys[0]} | Query: "${r.keys[1]}" | Impr: ${r.impressions} | Clicks: ${r.clicks} | Pos: ${r.position.toFixed(1)}`);
  });

  console.log('\nQuerying GSC for prior 7 days before drop (2026-10-21 to 2026-10-27)...');
  const prior = await querySearchAnalytics(token, siteUrl, {
    startDate: '2026-10-21',
    endDate: '2026-10-27',
    dimensions: ['page'],
    rowLimit: 50
  });
  console.log('Prior 7 days top pages before drop:');
  (prior.rows || []).sort((a,b) => b.impressions - a.impressions).slice(0, 20).forEach(r => {
    console.log(`Page: ${r.keys[0]} | Impr: ${r.impressions} | Clicks: ${r.clicks} | Pos: ${r.position.toFixed(1)}`);
  });
}

run().catch(console.error);
