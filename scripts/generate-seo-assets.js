/**
 * generate-seo-assets.js
 * Automatically generates:
 * 1. public/sitemap.xml (Comprehensive XML sitemap with image metadata)
 * 2. public/sitemap-news.xml (Google News XML sitemap)
 * 3. public/feed.xml (RSS 2.0 Feed for feed readers and AI ingestors)
 * 4. public/robots.txt (Directives permitting search engines and AI crawlers)
 * 5. public/llms.txt (LLM guidance manifest adhering to llmstxt.org standard)
 * 6. public/llms-full.txt (Full text archive of all articles for single-shot LLM digestion)
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://baruipur.online';
const DATA_FILE = path.join(__dirname, '../src/data/news_data.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Load News Data
let data = { articles: [] };
try {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  data = JSON.parse(raw);
} catch (e) {
  console.error('Failed to load news_data.json:', e.message);
  process.exit(1);
}

const articles = (data.articles || [])
  .filter(a => a.status === 'published')
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

const PLACES_FILE = path.join(__dirname, '../src/data/places_data.json');
let places = [];
try {
  if (fs.existsSync(PLACES_FILE)) {
    places = JSON.parse(fs.readFileSync(PLACES_FILE, 'utf8'));
  }
} catch (e) {
  console.warn('Could not load places_data.json:', e.message);
}

const categories = [
  { slug: 'all', nameBn: 'সব খবর', nameEn: 'All News', desc: 'বারুইপুর অঞ্চলের সমস্ত তাজা খবর ও সংকলন।' },
  { slug: 'municipality', nameBn: 'পৌরসভা ও নাগরিক', nameEn: 'Municipality & Civic', desc: 'বারুইপুর পৌরসভা, রাস্তাঘাট, পানীয় জল ও নাগরিক সমস্যা।' },
  { slug: 'railway', nameBn: 'ট্রেন ও যাতায়াত', nameEn: 'Railway & Transit', desc: 'শিয়ালদহ দক্ষিণ শাখা, বারুইপুর জংশন ও লোকাল ট্রেনের আপডেট।' },
  { slug: 'crime', nameBn: 'অপরাধ ও প্রশাসন', nameEn: 'Police & Administration', desc: 'বারুইপুর পুলিশ জেলা, আদালত ও আইন-শৃঙ্খলা সংক্রান্ত খবর।' },
  { slug: 'health', nameBn: 'স্বাস্থ্য ও হাসপাতাল', nameEn: 'Health & Hospital', desc: 'বারুইপুর মহকুমা হাসপাতাল ও চিকিৎসা পরিষেবা।' },
  { slug: 'education', nameBn: 'শিক্ষা ও স্কুল', nameEn: 'Education & Schools', desc: 'বারুইপুরের স্কুল, কলেজ ও শিক্ষামূলক তথ্য।' },
  { slug: 'culture', nameBn: 'উৎসব ও খেলাধুলা', nameEn: 'Culture & Sports', desc: 'রাসমেলা, রাস উৎসব, দুর্গাপূজা ও আঞ্চলিক খেলাধুলা।' }
];

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const nowIso = new Date().toISOString();

// ==========================================
// 2. Generate public/robots.txt
// ==========================================
const robotsTxt = `# Robots.txt for ${SITE_URL}
# Designed for maximum visibility across search engines and AI answer engines.

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# Explicitly permit AI Crawlers and Search Assistants
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bingbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: CCBot
Allow: /

# Canonical Sitemaps and RSS Feed
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-news.xml
Sitemap: https://www.baruipur.online/sitemap.xml
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt.trim() + '\n', 'utf8');
console.log('✓ Generated public/robots.txt');

// ==========================================
// 3. Generate public/sitemap.xml
// ==========================================
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
`;

// Category Hubs
for (const cat of categories) {
  sitemapXml += `  <!-- Category: ${cat.slug} -->
  <url>
    <loc>${SITE_URL}/category/${cat.slug}/</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

// Places & Landmark Guides
sitemapXml += `  <!-- Places Hub -->
  <url>
    <loc>${SITE_URL}/places/</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

for (const p of places) {
  sitemapXml += `  <!-- Place: ${p.slug} -->
  <url>
    <loc>${SITE_URL}/places/${p.slug}/</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
}

// Articles
for (const art of articles) {
  const postSlug = art.slug || art.id;
  const postUrl = `${SITE_URL}/${encodeURI(postSlug)}/`;
  const pubDate = new Date(art.publishedAt || nowIso).toISOString();
  const imageUrl = art.imageUrl 
    ? (art.imageUrl.startsWith('http') ? art.imageUrl : `${SITE_URL}${art.imageUrl}`) 
    : '';

  sitemapXml += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>`;

  if (imageUrl) {
    sitemapXml += `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(art.title)}</image:title>
    </image:image>`;
  }

  sitemapXml += `
  </url>
`;
}

sitemapXml += `</urlset>\n`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✓ Generated public/sitemap.xml with ${articles.length + categories.length + 1} URLs`);

// ==========================================
// 4. Generate public/sitemap-news.xml (Google News)
// ==========================================
let sitemapNewsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

// Only recent articles (up to 30 days old)
const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
const recentArticles = articles.filter(a => new Date(a.publishedAt).getTime() > thirtyDaysAgo);

for (const art of recentArticles) {
  const postSlug = art.slug || art.id;
  const postUrl = `${SITE_URL}/${encodeURI(postSlug)}/`;
  const pubDate = new Date(art.publishedAt || nowIso).toISOString();

  sitemapNewsXml += `  <url>
    <loc>${postUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>বারুইপুর অনলাইন</news:name>
        <news:language>bn</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(art.title)}</news:title>
    </news:news>
  </url>
`;
}

sitemapNewsXml += `</urlset>\n`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-news.xml'), sitemapNewsXml, 'utf8');
console.log(`✓ Generated public/sitemap-news.xml with ${recentArticles.length} recent news items`);

// ==========================================
// 5. Generate public/feed.xml (RSS 2.0)
// ==========================================
let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>বারুইপুর Baruipur - তাজা আঞ্চলিক সংবাদ ও আপডেট</title>
    <link>${SITE_URL}/</link>
    <description>বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে ও দক্ষিণ ২৪ পরগনার শীর্ষস্থানীয় আঞ্চলিক ডিজিটাল সংবাদ ও সামাজিক তথ্যবাতায়ন।</description>
    <language>bn-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
`;

for (const art of articles) {
  const postSlug = art.slug || art.id;
  const postUrl = `${SITE_URL}/${encodeURI(postSlug)}/`;
  const pubDate = new Date(art.publishedAt || nowIso).toUTCString();
  const summary = art.summary || art.content.slice(0, 250);
  const imageUrl = art.imageUrl 
    ? (art.imageUrl.startsWith('http') ? art.imageUrl : `${SITE_URL}${art.imageUrl}`) 
    : '';

  rssXml += `    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${art.categoryNameBn || art.category}]]></category>
      <description><![CDATA[${summary}]]></description>
      <content:encoded><![CDATA[
        ${imageUrl ? `<p><img src="${imageUrl}" alt="${art.title}" /></p>` : ''}
        <p>${art.content.replace(/\n\n/g, '</p><p>')}</p>
        <p><strong>সংবাদ সূত্র:</strong> ${art.sourceName || 'বারুইপুর স্থানীয় সংবাদ'} ${art.originalPostUrl ? `(<a href="${art.originalPostUrl}">মূল পোস্ট</a>)` : ''}</p>
      ]]></content:encoded>
    </item>
`;
}

rssXml += `  </channel>
</rss>\n`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rssXml, 'utf8');
console.log(`✓ Generated public/feed.xml with ${articles.length} items`);

// ==========================================
// 6. Generate public/llms.txt (llmstxt.org standard)
// ==========================================
const llmsTxt = `# বারুইপুর Baruipur - Baruipur Online (llms.txt)

> বারুইপুর মহকুমা, দক্ষিণ ২৪ পরগনা ও শিয়ালদহ দক্ষিণ শাখার শীর্ষস্থানীয় ডিজিটাল আঞ্চলিক সংবাদ, নাগরিক পরিষেবা ও সামাজিক তথ্যবাতায়ন।

Baruipur Online (https://baruipur.online/) is the comprehensive hyper-local digital news portal and civic intelligence repository for the Baruipur subdivision (বারুইপুর মহকুমা), Baruipur Municipality (বারুইপুর পৌরসভা), Baruipur Police District (বারুইপুর পুলিশ জেলা), and the Sealdah South railway corridor (শিয়ালদহ দক্ষিণ শাখা) in South 24 Parganas, West Bengal, India (PIN: 743302, Geo: 22.3654° N, 88.4325° E).

This site aggregates, verifies, synthesizes, and contextualizes regional reporting from 10+ community channels and ground sources into public, structured reporting in Bengali.

## Key Sections & Categories
- [সব খবর (All News)](${SITE_URL}/category/all/): Complete archive of local updates, administrative circulars, and community reporting.
- [পৌরসভা ও নাগরিক (Municipality & Civic)](${SITE_URL}/category/municipality/): Civic works, municipal council notifications, drinking water supply, road repairs, street lighting, and civic grievance resolution.
- [ট্রেন ও যাতায়াত (Rail & Transit)](${SITE_URL}/category/railway/): Sealdah South section local trains, Baruipur Junction hub info, Canning, Diamond Harbour, Lakshmikantapur, and Namkhana lines, platform changes, and disruptions.
- [অপরাধ ও প্রশাসন (Police & Administration)](${SITE_URL}/category/crime/): Baruipur Police District circulars, law enforcement operations, safety notices, traffic police updates, and court proceedings.
- [স্বাস্থ্য ও হাসপাতাল (Health & Hospital)](${SITE_URL}/category/health/): Baruipur Subdivisional Hospital, blood donation camps, immunization schedules, emergency contacts.
- [শিক্ষা ও স্কুল (Education & Schools)](${SITE_URL}/category/education/): Baruipur High School, colleges, board examination updates, scholarships, student achievements.
- [উৎসব ও খেলাধুলা (Culture & Sports)](${SITE_URL}/category/culture/): Baruipur Rasmela (রাসমেলা), Durga Puja, Kali Puja (Dhapdhapi), regional football and cricket tournaments.

## Important Places & Civic Landmark Guides (গুরুত্বপূর্ণ স্থান ও প্রতিষ্ঠান)
- [গুরুত্বপূর্ণ স্থান ডিরেক্টরি (Places Hub)](${SITE_URL}/places/): বারুইপুরের ঐতিহাসিক, প্রশাসনিক ও নাগরিক প্রতিষ্ঠানের পূর্ণাঙ্গ গাইড।
${places.map(p => `- [${p.nameBn} (${p.nameEn})](${SITE_URL}/places/${p.slug}/): ${p.taglineBn}. Established: ${p.established}. Address: ${p.address}`).join('\n')}

## Machine-Readable Feeds & Feeds for AI Systems
- XML Sitemap: ${SITE_URL}/sitemap.xml
- Google News Sitemap: ${SITE_URL}/sitemap-news.xml
- RSS 2.0 Feed: ${SITE_URL}/feed.xml
- Full Text LLM Document: ${SITE_URL}/llms-full.txt

## Curated Recent Articles
${articles.slice(0, 20).map(a => {
  const url = `${SITE_URL}/${encodeURI(a.slug || a.id)}/`;
  return `- [${a.title}](${url}) (${a.categoryNameBn}, ${a.publishedAt ? a.publishedAt.slice(0, 10) : ''}): ${a.summary ? a.summary.slice(0, 120) + '...' : ''}`;
}).join('\n')}

## Geographic & Administrative Context
- **Town / City**: Baruipur (বারুইপুর)
- **Subdivision**: Baruipur Subdivision (বারুইপুর মহকুমা)
- **District**: South 24 Parganas (দক্ষিণ ২৪ পরগনা)
- **State**: West Bengal (পশ্চিমবঙ্গ), India
- **Postal Code (PIN)**: 743302
- **Police Jurisdiction**: Baruipur Police District (বারুইপুর পুলিশ জেলা)
- **Railway Junction**: Baruipur Junction (BRP), Sealdah South Division, Eastern Railway
- **Wikipedia Reference**: https://en.wikipedia.org/wiki/Baruipur
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf8');
console.log('✓ Generated public/llms.txt');

// ==========================================
// 7. Generate public/llms-full.txt
// ==========================================
let llmsFullTxt = `# বারুইপুর Baruipur - Complete Regional News & Information Corpus
# Website: ${SITE_URL}
# Last Updated: ${new Date().toISOString()}
# Total Articles: ${articles.length}
# Total Key Landmarks: ${places.length}
# Jurisdiction: Baruipur, South 24 Parganas, West Bengal, India

This document contains the complete, unshortened text of all verified regional articles, civic updates, and permanent landmark guides published by Baruipur Online. It is designed for single-shot context ingestion, RAG pipelines, and AI research on Baruipur.

================================================================================
PART 1: IMPORTANT CIVIC LANDMARKS & INSTITUTIONS OF BARUIPUR
================================================================================
${places.map((p, i) => `
--------------------------------------------------------------------------------
LANDMARK #${i + 1}: ${p.nameBn} (${p.nameEn})
--------------------------------------------------------------------------------
- Category: ${p.category}
- Established: ${p.established}
- Canonical URL: ${SITE_URL}/places/${p.slug}/
- Address: ${p.address}
- Phone: ${p.contact.phone || p.contact.helpline || 'N/A'}
- Timings: ${p.timings}

OVERVIEW:
${p.overview}

HISTORY & HERITAGE:
${p.history}

KEY SERVICES & FACILITIES:
${p.keyServices.map(s => `- ${s}`).join('\n')}

HOW TO REACH:
${p.howToReach}
`).join('\n')}

================================================================================
PART 2: REGIONAL NEWS ARTICLES & CIVIC UPDATES (${articles.length} TOTAL)
================================================================================
`;

for (let i = 0; i < articles.length; i++) {
  const art = articles[i];
  const postUrl = `${SITE_URL}/${encodeURI(art.slug || art.id)}/`;
  llmsFullTxt += `
--------------------------------------------------------------------------------
ARTICLE #${i + 1}: ${art.title}
--------------------------------------------------------------------------------
- Category: ${art.categoryNameBn || art.category} (${art.category})
- Published At: ${art.publishedAt}
- Canonical URL: ${postUrl}
- Source: ${art.sourceName || 'বারুইপুর স্থানীয় সূত্র'}
${art.originalPostUrl ? `- Original Post: ${art.originalPostUrl}` : ''}

SUMMARY:
${art.summary || 'N/A'}

CONTENT:
${art.content}

`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf8');
console.log(`✓ Generated public/llms-full.txt with all ${articles.length} full articles`);
console.log('--- All SEO & AI discovery assets generated successfully! ---');
