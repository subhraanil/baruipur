const axios = require('axios');
const cheerio = require('cheerio');

async function checkAbpRecent() {
  console.log("=== ABP Ananda Baruipur News ===");
  try {
    const res = await axios.get("https://bengali.abplive.com/topic/baruipur", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    const items = [];
    $('div.other-story, div.story-layout, a[href*="/district/"], a[href*="/news/"]').each((i, el) => {
      const link = $(el).is('a') ? $(el) : $(el).find('a').first();
      const title = link.text().trim();
      const href = link.attr('href');
      const time = $(el).find('span.time, time, span.date').text().trim();
      if (title.length > 25 && href && !items.some(x => x.href === href)) {
        items.push({ title, href, time });
      }
    });
    console.log(`Found ${items.length} items from ABP:`);
    items.slice(0, 10).forEach((it, idx) => {
      console.log(`${idx + 1}. ${it.title} | ${it.href} | Time: ${it.time}`);
    });
  } catch (e) {
    console.error("ABP fetch error:", e.message);
  }
}

async function checkAbpSearch() {
  console.log("\n=== ABP Ananda Search Baruipur ===");
  try {
    const res = await axios.get("https://bengali.abplive.com/search?s=baruipur", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    const items = [];
    $('a[href*="/district/"], a[href*="/news/"], a[href*="/videos/"]').each((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr('href');
      if (title.length > 25 && href && !items.some(x => x.href === href)) {
        items.push({ title, href });
      }
    });
    console.log(`Found ${items.length} search items from ABP:`);
    items.slice(0, 10).forEach((it, idx) => {
      console.log(`${idx + 1}. ${it.title} | ${it.href}`);
    });
  } catch (e) {
    console.error("ABP search error:", e.message);
  }
}

async function run() {
  await checkAbpRecent();
  await checkAbpSearch();
}

run();
