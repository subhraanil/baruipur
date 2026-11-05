const axios = require('axios');
const cheerio = require('cheerio');

async function testRss() {
  const query = 'Baruipur when:7d';
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(res.data, { xmlMode: true });
    const items = [];
    $('item').each((i, el) => {
      items.push({
        title: $(el).find('title').text(),
        link: $(el).find('link').text(),
        pubDate: $(el).find('pubDate').text(),
        source: $(el).find('source').text()
      });
    });
    console.log(`Found ${items.length} Google News items for Baruipur:`);
    items.forEach((it, idx) => {
      console.log(`${idx + 1}. ${it.title} | ${it.source} | ${it.pubDate}`);
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testRss();
