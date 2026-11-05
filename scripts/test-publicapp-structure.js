const axios = require('axios');
const cheerio = require('cheerio');

async function inspectPublic() {
  const res = await axios.get("https://public.app/city/news-in-baruipur", {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const $ = cheerio.load(res.data);
  const scripts = $('script').map((i, el) => $(el).html() || '').get();
  console.log("Total scripts:", scripts.length);
  scripts.forEach((s, idx) => {
    if (s.includes('baruipur') || s.includes('video') || s.includes('news') || s.includes('itemListElement')) {
      console.log(`Script ${idx} length: ${s.length}, snippet:`, s.slice(0, 150));
    }
  });
  const videoCards = $('a[href*="/video/"], a[href*="/post/"]').map((i, el) => ({
    title: $(el).text().trim() || $(el).find('img').attr('alt'),
    href: $(el).attr('href'),
    img: $(el).find('img').attr('src')
  })).get();
  console.log("Video/post links found:", videoCards.length);
  videoCards.slice(0, 5).forEach(v => console.log(v));
}

inspectPublic();
