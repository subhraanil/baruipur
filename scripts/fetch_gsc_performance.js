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
  
  // Date range: last 3 months
  const endDate = new Date().toISOString().split('T')[0];
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 90);
  const startDate = startDateObj.toISOString().split('T')[0];

  console.log(`Querying GSC for ${siteUrl} from ${startDate} to ${endDate}...\n`);

  // Target paths / slugs
  const targets = [
    { name: "Baruipur BDO Office", pattern: "baruipur-bdo-office" },
    { name: "Mahendra Clinic", pattern: "mahendra-clinic-baruipur" },
    { name: "Baruipur Rajbari", pattern: "baruipur-rajbari" },
    { name: "Maoist Asim Mandal", pattern: "ভাঙড়ে-গ্রেফতার" },
    { name: "Adi Ganga & Atghara Heritage", pattern: "adi-ganga-and-atghara" },
    { name: "Debasish Nursing Home", pattern: "debasish-nursing-home" },
    { name: "Kabita Sebayatan", pattern: "kabita-sebayatan" },
    { name: "Baruipur Sneha", pattern: "baruipur-sneha" },
    { name: "Places Index", pattern: "/places/" },
    { name: "Baruipur Town Library", pattern: "baruipur-town-library" }
  ];

  // First: Fetch all page-level queries to inspect what queries exist across these URLs
  const allPagesQuery = {
    startDate: startDate,
    endDate: endDate,
    dimensions: ['page', 'query'],
    rowLimit: 5000
  };

  const results = await querySearchAnalytics(token, siteUrl, allPagesQuery);

  if (!results.rows) {
    console.log("No data returned or error:", JSON.stringify(results));
    return;
  }

  console.log(`Total rows returned: ${results.rows.length}\n`);

  const categorized = {};
  targets.forEach(t => categorized[t.name] = []);

  const uncategorized = [];

  for (const row of results.rows) {
    const pageUrl = row.keys[0];
    const decodedPageUrl = decodeURIComponent(pageUrl);
    const query = row.keys[1];
    
    let matched = false;
    for (const t of targets) {
      if (t.name === "Places Index") {
        if (pageUrl.endsWith('/places/') || pageUrl.endsWith('/places')) {
          categorized[t.name].push({ query, page: pageUrl, clicks: row.clicks, impressions: row.impressions, ctr: (row.ctr * 100).toFixed(1) + '%', pos: row.position.toFixed(1) });
          matched = true;
          break;
        }
      } else if (pageUrl.includes(t.pattern) || decodedPageUrl.includes(t.pattern)) {
        categorized[t.name].push({ query, page: pageUrl, clicks: row.clicks, impressions: row.impressions, ctr: (row.ctr * 100).toFixed(1) + '%', pos: row.position.toFixed(1) });
        matched = true;
        break;
      }
    }
    if (!matched) {
      uncategorized.push({ page: decodedPageUrl, query, impressions: row.impressions, clicks: row.clicks });
    }
  }

  const outputSummary = {};

  for (const t of targets) {
    const rows = categorized[t.name];
    console.log(`=======================================================`);
    console.log(`📌 ${t.name} (Matched: ${rows.length} queries)`);
    console.log(`=======================================================`);
    // Sort by impressions descending
    rows.sort((a, b) => b.impressions - a.impressions);
    outputSummary[t.name] = rows;
    if (rows.length === 0) {
      console.log(`  (No specific queries matched in top results)`);
    } else {
      rows.forEach(r => {
        console.log(`  - Query: "${r.query}" | Impr: ${r.impressions} | Clicks: ${r.clicks} | CTR: ${r.ctr} | Pos: ${r.pos}`);
      });
    }
    console.log();
  }

  // Save full json output for further processing
  fs.writeFileSync('gsc_report_raw.json', JSON.stringify({ categorized, targets, dateRange: { startDate, endDate } }, null, 2));
  console.log("Saved raw report to gsc_report_raw.json");
}

main();
