/**
 * Baruipur Local Business Crawler (GMB / Justdial via Jina / OpenStreetMap Overpass & Nominatim)
 *
 * Fetches structured local business data (Salons, Restaurants, Sweet Shops, Cafes, Electronics)
 * in Baruipur (lat: 22.3654, lon: 88.4325) for content creation and directory enrichment.
 *
 * Usage:
 *   node scripts/crawl-local-businesses.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'local_businesses_crawled.json');

const CATEGORIES = [
  {
    key: 'salon',
    nameBn: 'সেরা সেলুন ও বিউটি পার্লার',
    jdUrl: 'https://www.justdial.com/Kolkata/Beauty-Salons-in-Baruipur/nct-10042247',
    nominatimQueries: ['beauty parlour Baruipur', 'salon Baruipur'],
    osmTags: ['hairdresser', 'beauty'],
  },
  {
    key: 'restaurant',
    nameBn: 'সেরা রেস্তোরাঁ ও ফ্যামিলি ডাইনিং',
    jdUrl: 'https://www.justdial.com/Kolkata/Restaurants-in-Baruipur/nct-10408936',
    nominatimQueries: ['restaurant Baruipur', 'biryani Baruipur'],
    osmTags: ['restaurant', 'fast_food'],
  },
  {
    key: 'sweet_shop',
    nameBn: 'বিখ্যাত মিষ্টির দোকান',
    jdUrl: 'https://www.justdial.com/Kolkata/Sweet-Shops-in-Baruipur/nct-10467554',
    nominatimQueries: ['sweet shop Baruipur', 'sweets Baruipur'],
    osmTags: ['confectionery', 'bakery', 'pastry'],
  },
  {
    key: 'cafe',
    nameBn: 'সেরা ক্যাফে ও আড্ডার জায়গা',
    jdUrl: 'https://www.justdial.com/Kolkata/Coffee-Shops-in-Baruipur/nct-10104727',
    nominatimQueries: ['cafe Baruipur', 'coffee Baruipur'],
    osmTags: ['cafe'],
  },
  {
    key: 'electronics',
    nameBn: 'ইলেকট্রনিক্স ও হোম অ্যাপ্লায়েন্স শোরুম',
    jdUrl: 'https://www.justdial.com/Kolkata/Electronic-Goods-Showrooms-in-Baruipur/nct-10185346',
    nominatimQueries: ['electronics Baruipur', 'mobile store Baruipur'],
    osmTags: ['electronics', 'mobile_phone', 'appliance'],
  },
];

// 1. Single batched Overpass API call (avoids 502 rate-limits)
async function fetchAllFromOverpass() {
  const endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];
  const ql = `[out:json][timeout:25];(
    node["shop"~"hairdresser|beauty|confectionery|bakery|pastry|electronics|mobile_phone|appliance"](around:6000,22.3654,88.4325);
    node["amenity"~"restaurant|fast_food|cafe"](around:6000,22.3654,88.4325);
    way["shop"~"hairdresser|beauty|confectionery|bakery|pastry|electronics|mobile_phone|appliance"](around:6000,22.3654,88.4325);
    way["amenity"~"restaurant|fast_food|cafe"](around:6000,22.3654,88.4325);
  );out center 100;`;

  for (const ep of endpoints) {
    try {
      const res = await axios.post(ep, `data=${encodeURIComponent(ql)}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'BaruipurOnlineCivicBot/1.0' },
        timeout: 20000,
      });
      if (Array.isArray(res.data?.elements)) {
        console.log(`  ✓ Overpass (${ep}) returned ${res.data.elements.length} POIs`);
        return res.data.elements;
      }
    } catch (e) {
      console.warn(`  [Overpass ${ep}] warning:`, e.message);
    }
  }
  return [];
}

// 2. Nominatim OpenStreetMap search
async function fetchFromNominatim(query, cat) {
  const results = [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=15`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'BaruipurOnlineCivicBot/1.0 (contact@baruipur.online)' },
      timeout: 10000,
    });
    for (const item of res.data || []) {
      const name = (item.name || item.display_name?.split(',')[0] || '').trim();
      if (!name) continue;
      results.push({
        name,
        category: cat.key,
        categoryBn: cat.nameBn,
        address: item.display_name || 'বারুইপুর, দক্ষিণ ২৪ পরগনা',
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        source: 'OSM-Nominatim',
      });
    }
  } catch (e) {
    console.warn(`  [Nominatim] ${query} warning:`, e.message);
  }
  return results;
}

// 3. Justdial via Jina Reader (bypasses datacenter anti-bot blocks)
async function fetchJustdialViaJina(cat) {
  const results = [];
  try {
    const res = await axios.get(`https://r.jina.ai/${cat.jdUrl}`, {
      headers: { Accept: 'text/plain' },
      timeout: 18000,
      validateStatus: () => true,
    });
    if (res.status === 200 && typeof res.data === 'string') {
      const lines = res.data.split('\n');
      for (const line of lines) {
        // Match markdown headings or numbered Justdial business titles
        const m = line.match(/^#{2,3}\s+\[?([^\]\n]+?)(?:\]|\s*$)/);
        if (m && m[1]) {
          const name = m[1].replace(/^\d+\.\s*/, '').trim();
          if (
            name.length > 3 &&
            name.length < 80 &&
            !/justdial|popular|related|filter|sort|login|sign/i.test(name)
          ) {
            results.push({
              name,
              category: cat.key,
              categoryBn: cat.nameBn,
              address: 'বারুইপুর, দক্ষিণ ২৪ পরগনা',
              source: 'Justdial-Jina',
              sourceUrl: cat.jdUrl,
            });
          }
        }
      }
    }
  } catch (e) {
    console.warn(`  [Justdial-Jina] ${cat.key} warning:`, e.message);
  }
  return results.slice(0, 15);
}

async function run() {
  console.log('===============================================================');
  console.log('🔍 BARUIPUR LOCAL BUSINESS CRAWLER (GMB / Justdial / OSM)');
  console.log('===============================================================\n');

  const osmElements = await fetchAllFromOverpass();
  const allCollected = {};
  let totalCount = 0;

  for (const cat of CATEGORIES) {
    console.log(`▶ Processing category: ${cat.nameBn} (${cat.key})...`);

    const osmMatches = [];
    for (const el of osmElements) {
      const tags = el.tags || {};
      const tagVal = tags.shop || tags.amenity || '';
      if (!cat.osmTags.includes(tagVal)) continue;
      const name = tags['name:bn'] || tags.name;
      if (!name) continue;
      osmMatches.push({
        name,
        nameEn: tags['name:en'] || tags.name || '',
        category: cat.key,
        categoryBn: cat.nameBn,
        address: [tags['addr:street'], tags['addr:suburb'], tags['addr:city'] || 'বারুইপুর'].filter(Boolean).join(', '),
        phone: tags.phone || tags['contact:phone'] || '',
        openingHours: tags.opening_hours || '',
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        source: 'OpenStreetMap-Overpass',
      });
    }

    const nomResults = [];
    for (const nq of cat.nominatimQueries) {
      const items = await fetchFromNominatim(nq, cat);
      nomResults.push(...items);
    }

    const jdResults = await fetchJustdialViaJina(cat);

    const merged = [];
    const seen = new Set();
    for (const item of [...osmMatches, ...nomResults, ...jdResults]) {
      const key = (item.name || '').toLowerCase().replace(/[^a-z0-9\u0980-\u09ff]/g, '');
      if (!key || seen.has(key)) continue;
      seen.add(key);
      merged.push({
        ...item,
        crawledAt: new Date().toISOString(),
      });
    }

    allCollected[cat.key] = {
      categoryBn: cat.nameBn,
      count: merged.length,
      items: merged,
    };
    totalCount += merged.length;
    console.log(`  ✓ Collected ${merged.length} unique businesses (Overpass: ${osmMatches.length}, Nominatim: ${nomResults.length}, Justdial: ${jdResults.length})`);
  }

  const output = {
    lastCrawledAt: new Date().toISOString(),
    location: 'Baruipur, South 24 Parganas, West Bengal',
    totalBusinesses: totalCount,
    categories: allCollected,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Saved ${totalCount} businesses to src/data/local_businesses_crawled.json`);
}

run();
