const axios = require('axios');

async function test() {
  const res = await axios.get('https://www.facebook.com/baruipur360', {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });
  console.log('Length:', res.data.length);
  const titleMatch = res.data.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
  const scripts = [...res.data.matchAll(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g)];
  console.log('JSON Scripts count:', scripts.length);
  let foundComet = 0;
  for (const s of scripts) {
    if (s[1].includes('comet_sections') || s[1].includes('post_id') || s[1].includes('message')) {
      foundComet++;
    }
  }
  console.log('Scripts with comet/posts:', foundComet);
}

test();
