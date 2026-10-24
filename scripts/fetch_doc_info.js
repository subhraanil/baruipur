const axios = require('axios');
const cheerio = require('cheerio');

async function check(url) {
  try {
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 10000 });
    const $ = cheerio.load(res.data);
    console.log('=== ' + url + ' ===');
    console.log('Title:', $('title').text().trim());
    $('script, style, nav, footer, header').remove();
    console.log('Text snippet:', $('body').text().replace(/\s+/g, ' ').slice(0, 1500));
  } catch (e) {
    console.log('Error fetching ' + url + ':', e.message);
  }
}

async function run() {
  await check('https://rubyhospital.com/doctor/dr-bijoy-roy-choudhury/');
  await check('https://desunhospital.com/doctor/dr-bijay-roy-chaudhuri/');
}
run();
