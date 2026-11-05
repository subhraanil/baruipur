const axios = require('axios');

const fbSources = [
  { name: "Baruipur 360", url: "https://www.facebook.com/baruipur360" },
  { name: "Baruipur Barta", url: "https://www.facebook.com/baruipurbarta05" },
  { name: "Baruipur Update", url: "https://www.facebook.com/BaruipurUpdate" },
  { name: "Baruipur Press Club", url: "https://www.facebook.com/BaruipurPressClub0" },
  { name: "Voice of Baruipur", url: "https://www.facebook.com/voiceofbaruipur" }
];

const portals = [
  { name: "Anandabazar Patrika Topic", url: "https://www.anandabazar.com/topic/baruipur" },
  { name: "Public App Baruipur", url: "https://public.app/city/news-in-baruipur" },
  { name: "Twitter/X Hashtag", url: "https://x.com/hashtag/Baruipur" },
  { name: "ABP Ananda Topic", url: "https://bengali.abplive.com/topic/baruipur" },
  { name: "ABP Ananda Search", url: "https://bengali.abplive.com/search?s=baruipur" },
  { name: "NDTV Topic", url: "https://www.ndtv.com/topic/baruipur" }
];

async function testFb() {
  console.log("=== Testing Facebook Sources ===");
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
  console.log("\n=== Testing News Portals ===");
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
