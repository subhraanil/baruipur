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

  console.log('1. Checking daily clicks and impressions for last 28 days...');
  const dailyRes = await querySearchAnalytics(token, siteUrl, {
    startDate: '2026-10-18',
    endDate: '2026-11-14',
    dimensions: ['date']
  });

  const dailyRows = (dailyRes.rows || []).sort((a,b) => a.keys[0].localeCompare(b.keys[0]));
  console.log('Daily performance:');
  dailyRows.forEach(r => {
    console.log(`  ${r.keys[0]}: Clicks: ${r.clicks}, Impressions: ${r.impressions}, CTR: ${(r.ctr*100).toFixed(1)}%, Pos: ${r.position.toFixed(1)}`);
  });

  console.log('\n2. Checking top pages by clicks/impressions in last 90 days...');
  const pagesRes = await querySearchAnalytics(token, siteUrl, {
    startDate: '2026-08-15',
    endDate: '2026-11-14',
    dimensions: ['page'],
    rowLimit: 100
  });

  const topPages = (pagesRes.rows || []).sort((a,b) => b.impressions - a.impressions);
  console.log(`Top ${Math.min(topPages.length, 30)} pages by impressions:`);
  topPages.slice(0, 30).forEach((p, idx) => {
    console.log(`  ${idx+1}. ${p.keys[0]} | Impr: ${p.impressions} | Clicks: ${p.clicks} | CTR: ${(p.ctr*100).toFixed(1)}% | Pos: ${p.position.toFixed(1)}`);
  });

  console.log('\n3. Checking top search queries in last 90 days...');
  const queriesRes = await querySearchAnalytics(token, siteUrl, {
    startDate: '2026-08-15',
    endDate: '2026-11-14',
    dimensions: ['query'],
    rowLimit: 100
  });

  const topQueries = (queriesRes.rows || []).sort((a,b) => b.impressions - a.impressions);
  console.log(`Top ${Math.min(topQueries.length, 30)} queries by impressions:`);
  topQueries.slice(0, 30).forEach((q, idx) => {
    console.log(`  ${idx+1}. "${q.keys[0]}" | Impr: ${q.impressions} | Clicks: ${q.clicks} | Pos: ${q.position.toFixed(1)}`);
  });

  // Save the full GSC diagnostic report to disk
  const report = {
    generatedAt: new Date().toISOString(),
    daily: dailyRows,
    topPages: topPages,
    topQueries: topQueries
  };
  fs.writeFileSync(path.join(__dirname, 'gsc_recent_diagnostic.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log('\nSaved full GSC data to scripts/gsc_recent_diagnostic.json');
}

main().catch(console.error);
