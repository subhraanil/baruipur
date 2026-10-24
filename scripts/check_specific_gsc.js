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
    req.on('error', err => resolve({ error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function main() {
  const token = await getAccessToken(KEY_PATH);
  const siteUrl = 'https://baruipur.online/';

  const endDate = new Date().toISOString().split('T')[0];
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 90);
  const startDate = startDateObj.toISOString().split('T')[0];

  // Specific query for each URL pattern using page filter
  const specificUrls = [
    "https://baruipur.online/places/baruipur-bdo-office/",
    "https://baruipur.online/health-directory/mahendra-clinic-baruipur/",
    "https://baruipur.online/places/baruipur-rajbari/",
    "https://baruipur.online/adi-ganga-and-atghara-archaeological-heritage-baruipur-guide",
    "https://baruipur.online/health-directory/debasish-nursing-home-baruipur/",
    "https://baruipur.online/health-directory/kabita-sebayatan-baruipur/",
    "https://baruipur.online/organizations/baruipur-sneha/",
    "https://baruipur.online/places/",
    "https://baruipur.online/places/baruipur-town-library/"
  ];

  for (const u of specificUrls) {
    const pageFilter = {
      startDate,
      endDate,
      dimensions: ['query'],
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'page',
          operator: 'contains',
          expression: u.replace('https://baruipur.online', '')
        }]
      }]
    };
    const res = await querySearchAnalytics(token, siteUrl, pageFilter);
    console.log(`\nURL: ${u}`);
    if (res.rows && res.rows.length > 0) {
      console.log(`Found ${res.rows.length} queries:`);
      res.rows.forEach(r => console.log(`  - "${r.keys[0]}" (Clicks: ${r.clicks}, Impr: ${r.impressions}, Pos: ${r.position.toFixed(1)})`));
    } else {
      console.log(`  No queries found with exact page filter.`);
    }
  }

  // Also check keyword search for Asim Mandal / Maoist / Kabita Sebayatan across whole site
  console.log("\n================ SEARCH BY KEYWORDS ACROSS ENTIRE GSC ================");
  const kwFilter = {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'query',
        operator: 'contains',
        expression: 'মাওবাদী'
      }]
    }]
  };
  const kwRes = await querySearchAnalytics(token, siteUrl, kwFilter);
  console.log("Query 'মাওবাদী':", JSON.stringify(kwRes.rows || []));

  const asimFilter = {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'query',
        operator: 'contains',
        expression: 'আকাশ'
      }]
    }]
  };
  const asimRes = await querySearchAnalytics(token, siteUrl, asimFilter);
  console.log("Query 'আকাশ':", JSON.stringify(asimRes.rows || []));

  const kabitaFilter = {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'query',
        operator: 'contains',
        expression: 'kabita'
      }]
    }]
  };
  const kabitaRes = await querySearchAnalytics(token, siteUrl, kabitaFilter);
  console.log("Query 'kabita':", JSON.stringify(kabitaRes.rows || []));

  const snehaFilter = {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'query',
        operator: 'contains',
        expression: 'sneha'
      }]
    }]
  };
  const snehaRes = await querySearchAnalytics(token, siteUrl, snehaFilter);
  console.log("Query 'sneha':", JSON.stringify(snehaRes.rows || []));

  const atgharaFilter = {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'query',
        operator: 'contains',
        expression: 'atghara'
      }]
    }]
  };
  const atgharaRes = await querySearchAnalytics(token, siteUrl, atgharaFilter);
  console.log("Query 'atghara':", JSON.stringify(atgharaRes.rows || []));
}

main();
