const fs = require('fs');
const axios = require('axios');

const data = JSON.parse(fs.readFileSync('src/data/news_data.json', 'utf8'));
const sources = data.sources || [];

async function testAllSources() {
  console.log(`Testing all ${sources.length} existing sources in news_data.json...`);
  for (const s of sources) {
    try {
      const res = await axios.get(s.url, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000,
        validateStatus: () => true
      });
      console.log(`- ${s.name} (${s.url}) => Status: ${res.status}, Length: ${res.data ? res.data.length : 0}`);
    } catch (e) {
      console.log(`- ${s.name} (${s.url}) => ERROR: ${e.message}`);
    }
  }
}

testAllSources();
