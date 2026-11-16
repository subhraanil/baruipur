const fs = require('fs');
const path = require('path');
const https = require('https');

const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'gsc_recent_diagnostic.json'), 'utf8'));
const urls = d.topPages.map(p => ({ url: p.keys[0], impressions: p.impressions, clicks: p.clicks }));

console.log(`Checking ${urls.length} historical URLs...`);

function checkUrl(u) {
  return new Promise((resolve) => {
    https.get(u, (res) => {
      resolve({ url: u, status: res.statusCode, location: res.headers.location });
    }).on('error', (err) => {
      resolve({ url: u, status: 'ERROR', error: err.message });
    });
  });
}

async function main() {
  const results = [];
  for (const item of urls) {
    const res = await checkUrl(item.url);
    results.push({ ...item, ...res });
  }

  const notOk = results.filter(r => r.status !== 200);
  console.log(`\nFound ${notOk.length} URLs returning NON-200 status (out of ${urls.length}):`);
  notOk.forEach(r => {
    console.log(`  [${r.status}] Impr: ${r.impressions} | Clicks: ${r.clicks} | ${r.url}`);
  });

  fs.writeFileSync(path.join(__dirname, 'gsc_broken_urls.json'), JSON.stringify(notOk, null, 2), 'utf8');
}

main();
