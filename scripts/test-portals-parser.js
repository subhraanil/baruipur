const axios = require('axios');
const cheerio = require('cheerio');

async function checkAbp() {
  console.log("=== Checking ABP Live Bengali ===");
  try {
    const res = await axios.get("https://bengali.abplive.com/topic/baruipur", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    const articles = [];
    $('a[href*="/news/"], a[href*="/district/"], a[href*="/state/"]').each((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr('href');
      if (title.length > 20 && href && !articles.some(a => a.href === href)) {
        articles.push({ title, href });
      }
    });
    console.log(`ABP Found ${articles.length} news items:`);
    articles.slice(0, 5).forEach(a => console.log(' -', a.title, `(${a.href})`));
  } catch (e) {
    console.error("ABP Error:", e.message);
  }
}

async function checkPublicApp() {
  console.log("\n=== Checking Public App Baruipur ===");
  try {
    const res = await axios.get("https://public.app/city/news-in-baruipur", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    const text = $('body').text();
    console.log("Public App page title:", $('title').text());
    // Check if next_data or json is embedded
    const nextData = $('#__NEXT_DATA__').html();
    if (nextData) {
      console.log("Found __NEXT_DATA__ in Public App! Length:", nextData.length);
      const parsed = JSON.parse(nextData);
      console.log("Keys in NEXT_DATA props:", Object.keys(parsed.props?.pageProps || {}));
    } else {
      console.log("No NEXT_DATA, raw text snippet:", text.slice(0, 200));
    }
  } catch (e) {
    console.error("Public App Error:", e.message);
  }
}

async function run() {
  await checkAbp();
  await checkPublicApp();
}

run();
