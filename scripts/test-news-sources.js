const axios = require('axios');
const fs = require('fs');

const rawDb = JSON.parse(fs.readFileSync('src/data/news_data.json', 'utf-8'));
const fbSources = (rawDb.sources || []).filter(s => s.type === 'facebook' && s.isActive);
const portals = (rawDb.sources || []).filter(s => s.type !== 'facebook' && s.isActive);

async function testFb() {
  console.log(`=== Testing Facebook Sources (${fbSources.length} total) ===`);
  for (const s of fbSources) {
    try {
      const res = await axios.get(s.url, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000,
        validateStatus: () => true
      });
      console.log(`[FB] ${s.name} (${s.url}) -> Status: ${res.status}, Length: ${res.data ? res.data.length : 0}`);
    } catch (e) {
      console.log(`[FB] ${s.name} ERROR:`, e.message);
    }
  }
}

async function testPortals() {
  console.log(`\n=== Testing News Portals (${portals.length} total) ===`);
  for (const p of portals) {
    try {
      const res = await axios.get(p.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'bn-IN,bn;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: 10000,
        validateStatus: () => true
      });
      console.log(`[Portal] ${p.name} (${p.url}) -> Status: ${res.status}, Length: ${res.data ? res.data.length : 0}`);
    } catch (e) {
      console.log(`[Portal] ${p.name} ERROR:`, e.message);
    }
  }
}

async function run() {
  await testFb();
  await testPortals();
}

run();
