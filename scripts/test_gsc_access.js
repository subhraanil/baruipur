const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const KEY_PATHS = [
  path.join(__dirname, '../service_account.json'),
  path.join(__dirname, '../service_account_2.json'),
  path.join(__dirname, '../service_account_indexing_397007.json'),
  'C:\\Users\\test\\Videos\\MY-AI Agent\\service_account.json'
];

async function getAccessToken(keyPath) {
  if (!fs.existsSync(keyPath)) return null;
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

  return new Promise((resolve) => {
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
          resolve({ email: parsed.client_email, token: resp.access_token, error: resp.error_description || resp.error });
        } catch (e) {
          resolve({ email: parsed.client_email, error: e.message });
        }
      });
    });
    req.on('error', err => resolve({ email: parsed.client_email, error: err.message }));
    req.write(postData);
    req.end();
  });
}

function callGsc(token, endpoint, body) {
  return new Promise((resolve) => {
    const postData = body ? JSON.stringify(body) : '';
    const u = new URL(endpoint);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: body ? 'POST' : 'GET',
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
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', err => resolve({ error: err.message }));
    if (body) req.write(postData);
    req.end();
  });
}

async function main() {
  for (const kp of KEY_PATHS) {
    if (!fs.existsSync(kp)) continue;
    console.log(`Checking key: ${kp}`);
    const auth = await getAccessToken(kp);
    if (!auth || !auth.token) {
      console.log(`  Failed auth for ${auth ? auth.email : kp}:`, auth ? auth.error : 'file missing');
      continue;
    }
    console.log(`  Authenticated as: ${auth.email}`);
    
    // Check sites list
    const sitesResp = await callGsc(auth.token, 'https://www.googleapis.com/webmasters/v3/sites');
    console.log(`  Sites response (${sitesResp.status}):`, JSON.stringify(sitesResp.data || sitesResp.raw));

    if (sitesResp.data && sitesResp.data.siteEntry) {
      for (const site of sitesResp.data.siteEntry) {
        console.log(`  Site found: ${site.siteUrl} (${site.permissionLevel})`);
      }
    }
  }
}

main();
