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

  const today = new Date();
  const endDate = today.toISOString().split('T')[0];
  const startDateObj = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
  const startDate = startDateObj.toISOString().split('T')[0];

  console.log(`Analyzing GSC performance for: ${siteUrl}`);
  console.log(`Period (Last 3 Months / 90 Days): ${startDate} to ${endDate}\n`);

  // 1. Overall Aggregated Totals & Daily Trend
  console.log('1. Fetching overall date trend...');
  const dateRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['date'],
    rowLimit: 1000
  });

  const dateRows = dateRes.rows || [];
  let totalClicks = 0;
  let totalImpressions = 0;
  let weightedPositionSum = 0;

  dateRows.forEach(r => {
    totalClicks += r.clicks;
    totalImpressions += r.impressions;
    weightedPositionSum += r.position * r.impressions;
  });

  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0%';
  const avgPos = totalImpressions > 0 ? (weightedPositionSum / totalImpressions).toFixed(1) : 'N/A';

  console.log(`Overall Stats (90 Days):`);
  console.log(`- Total Clicks: ${totalClicks}`);
  console.log(`- Total Impressions: ${totalImpressions}`);
  console.log(`- Average CTR: ${avgCtr}`);
  console.log(`- Average Position: ${avgPos}\n`);

  // 2. Fetch Top Pages
  console.log('2. Fetching Top Pages...');
  const pagesRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['page'],
    rowLimit: 1000
  });
  const pageRows = (pagesRes.rows || []).sort((a, b) => b.impressions - a.impressions);

  // 3. Fetch Top Queries
  console.log('3. Fetching Top Queries...');
  const queriesRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['query'],
    rowLimit: 1000
  });
  const queryRows = (queriesRes.rows || []).sort((a, b) => b.impressions - a.impressions);

  // 4. Fetch Page + Query Combinations
  console.log('4. Fetching Page + Query Combinations...');
  const pageQueryRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['page', 'query'],
    rowLimit: 5000
  });
  const pageQueryRows = pageQueryRes.rows || [];

  // 5. Fetch Device Breakdown
  console.log('5. Fetching Device Breakdown...');
  const deviceRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['device']
  });

  // 6. Fetch Country Breakdown
  console.log('6. Fetching Country Breakdown...');
  const countryRes = await querySearchAnalytics(token, siteUrl, {
    startDate,
    endDate,
    dimensions: ['country'],
    rowLimit: 20
  });

  // Group Page-Query
  const pageMap = {};
  pageQueryRows.forEach(r => {
    const p = r.keys[0];
    const q = r.keys[1];
    if (!pageMap[p]) {
      pageMap[p] = {
        url: p,
        clicks: 0,
        impressions: 0,
        queries: []
      };
    }
    pageMap[p].clicks += r.clicks;
    pageMap[p].impressions += r.impressions;
    pageMap[p].queries.push({
      query: q,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(2),
      position: r.position.toFixed(1)
    });
  });

  // Identify Striking Distance Keywords (Position 4.0 - 20.0 with high impressions)
  const strikingDistance = queryRows.filter(r => r.position >= 4.0 && r.position <= 20.0 && r.impressions >= 10);

  // Identify Keyword Cannibalization (Queries mapping to > 1 page)
  const queryToPages = {};
  pageQueryRows.forEach(r => {
    const p = r.keys[0];
    const q = r.keys[1];
    if (!queryToPages[q]) queryToPages[q] = [];
    queryToPages[q].push({ page: p, impressions: r.impressions, clicks: r.clicks, position: r.position });
  });

  const cannibalized = Object.entries(queryToPages)
    .filter(([q, pages]) => pages.length > 1 && pages.reduce((sum, x) => sum + x.impressions, 0) >= 10)
    .map(([q, pages]) => ({
      query: q,
      totalPages: pages.length,
      pages: pages.sort((a, b) => b.impressions - a.impressions)
    }));

  // Save full JSON output for deep analysis
  const fullReport = {
    meta: {
      siteUrl,
      startDate,
      endDate,
      generatedAt: new Date().toISOString()
    },
    summary: {
      totalClicks,
      totalImpressions,
      avgCtr,
      avgPos,
      totalPagesCount: pageRows.length,
      totalQueriesCount: queryRows.length
    },
    dateTrend: dateRows,
    devices: deviceRes.rows || [],
    countries: countryRes.rows || [],
    topPages: pageRows.slice(0, 30),
    topQueries: queryRows.slice(0, 50),
    strikingDistance,
    cannibalized,
    pageQueryDetails: Object.values(pageMap).sort((a, b) => b.impressions - a.impressions)
  };

  const outputPath = path.join(__dirname, '../gsc_3months_full_analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullReport, null, 2), 'utf8');
  console.log(`✓ Full GSC analysis data saved to ${outputPath}`);

  // Print Summary Highlights
  console.log('\n================ TOP 15 PAGES BY IMPRESSIONS ================');
  pageRows.slice(0, 15).forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.keys[0]} | Impr: ${p.impressions} | Clicks: ${p.clicks} | CTR: ${(p.ctr * 100).toFixed(2)}% | Pos: ${p.position.toFixed(1)}`);
  });

  console.log('\n================ TOP 15 QUERIES BY IMPRESSIONS ================');
  queryRows.slice(0, 15).forEach((q, idx) => {
    console.log(`${idx + 1}. "${q.keys[0]}" | Impr: ${q.impressions} | Clicks: ${q.clicks} | CTR: ${(q.ctr * 100).toFixed(2)}% | Pos: ${q.position.toFixed(1)}`);
  });

  console.log('\n================ STRIKING DISTANCE OPPORTUNITIES (Pos 4-20) ================');
  strikingDistance.slice(0, 15).forEach((s, idx) => {
    console.log(`${idx + 1}. "${s.keys[0]}" | Impr: ${s.impressions} | Clicks: ${s.clicks} | Pos: ${s.position.toFixed(1)} | CTR: ${(s.ctr * 100).toFixed(2)}%`);
  });

  console.log('\n================ CANNIBALIZATION CANDIDATES ================');
  cannibalized.slice(0, 10).forEach((c, idx) => {
    console.log(`${idx + 1}. Query: "${c.query}" (Competing on ${c.totalPages} URLs)`);
    c.pages.forEach(p => console.log(`   - ${p.page} (Impr: ${p.impressions}, Pos: ${p.position.toFixed(1)})`));
  });
}

main().catch(console.error);
