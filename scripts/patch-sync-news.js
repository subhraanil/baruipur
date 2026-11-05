const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sync-news.js');
let content = fs.readFileSync(filePath, 'utf8');

const targetMarker = "// 8. Multi-factor deduplication engine";

const scrapersCode = `// 7b. Scrape ABP Ananda Baruipur Topic & Search
async function scrapeAbpSource(source) {
  const posts = [];
  try {
    const urls = [source.url, source.searchUrl].filter(Boolean);
    const candidateLinks = new Set();

    for (const u of urls) {
      try {
        const res = await axios.get(u, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          timeout: 10000,
          validateStatus: () => true
        });

        if (res.status === 200 && res.data) {
          const $ = cheerio.load(res.data);
          $('a[href*="/district/"], a[href*="/news/"], a[href*="/videos/district/"]').each((i, el) => {
            const href = $(el).attr('href');
            if (href && (href.includes('baruipur') || href.includes('south-24-parganas')) && !href.includes('#')) {
              candidateLinks.add(href.startsWith('http') ? href : \`https://bengali.abplive.com\${href}\`);
            }
          });
        }
      } catch (err) {}
    }

    const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);

    for (const link of Array.from(candidateLinks).slice(0, 5)) {
      try {
        const artRes = await axios.get(link, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          },
          timeout: 10000,
          validateStatus: () => true
        });

        if (artRes.status === 200 && artRes.data) {
          const $ = cheerio.load(artRes.data);
          const title = $('h1').first().text().trim() || $('title').text().split('|')[0].trim();
          
          // Strict Date Freshness Verification
          const timeMeta = $('meta[property="article:published_time"]').attr('content') || 
                           $('time').attr('datetime') || 
                           $('span[class*="date"], span[class*="time"]').first().text().trim();
          let pubDate = timeMeta ? new Date(timeMeta) : null;
          if (pubDate && !isNaN(pubDate.getTime()) && pubDate.getTime() < cutoffMs) {
            continue; // Skip old article
          }

          let paragraphs = [];
          $('div[class*="article-content"] p, div[class*="story-detail"] p, article p').each((i, p) => {
            const t = $(p).text().trim();
            if (t.length > 20 && !t.includes('ABP Ananda') && !t.includes('Follow us on')) {
              paragraphs.push(t);
            }
          });

          if (paragraphs.length >= 2) {
            const fullText = title + "\\n\\n" + paragraphs.join("\\n\\n");
            const img = $('meta[property="og:image"]').attr('content') || $('article img').first().attr('src');
            posts.push({
              sourceId: source.id,
              sourceName: source.name,
              postId: crypto.createHash('md5').update(link).digest('hex').slice(0, 12),
              content: fullText,
              images: img ? [img] : [],
              imageUrl: img,
              originalUrl: link,
              publishedAt: pubDate && !isNaN(pubDate.getTime()) ? pubDate.toISOString() : new Date().toISOString()
            });
          }
        }
      } catch (err) {}
    }
  } catch (err) {}
  return posts;
}

// 7c. Scrape Public App Baruipur
async function scrapePublicAppSource(source) {
  const posts = [];
  try {
    const res = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      timeout: 10000,
      validateStatus: () => true
    });

    if (res.status === 200 && res.data) {
      const $ = cheerio.load(res.data);
      const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);

      $('a[href*="/video/"]').each((i, el) => {
        const href = $(el).attr('href');
        const title = $(el).text().trim() || $(el).find('img').attr('alt') || '';
        const img = $(el).find('img').attr('src');

        if (title.length > 30 && !title.includes('নানা পাটেকার') && !title.includes('নেপালে')) {
          const dateMatch = title.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+\\d{1,2},\\s+\\d{4}/i);
          if (dateMatch) {
            const parsed = new Date(dateMatch[0]);
            if (!isNaN(parsed.getTime()) && parsed.getTime() < cutoffMs) return; // Skip old video
          }

          const fullUrl = href.startsWith('http') ? href : \`https://public.app\${href}\`;
          posts.push({
            sourceId: source.id,
            sourceName: source.name,
            postId: crypto.createHash('md5').update(fullUrl).digest('hex').slice(0, 12),
            content: title,
            images: img ? [img] : [],
            imageUrl: img,
            videoUrl: fullUrl,
            originalUrl: fullUrl,
            publishedAt: new Date().toISOString()
          });
        }
      });
    }
  } catch (err) {}
  return posts;
}

// 7d. Scrape News Portals via Google News RSS & Aggregation (Anandabazar, NDTV, Twitter)
async function scrapeWebPortalSource(source) {
  const posts = [];
  try {
    const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);
    let query = 'Baruipur';
    if (source.id.includes('anandabazar')) query = 'site:anandabazar.com Baruipur';
    else if (source.id.includes('ndtv')) query = 'site:ndtv.com Baruipur';
    else if (source.id.includes('twitter')) query = 'Baruipur (site:x.com OR site:twitter.com)';

    const rssUrl = \`https://news.google.com/rss/search?q=\${encodeURIComponent(query + \` when:\${daysBack}d\`)}&hl=bn&gl=IN&ceid=IN:bn\`;
    
    const res = await axios.get(rssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 10000,
      validateStatus: () => true
    });

    if (res.status === 200 && res.data) {
      const $ = cheerio.load(res.data, { xmlMode: true });
      $('item').each((i, el) => {
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDateStr = $(el).find('pubDate').text().trim();
        const pubDate = new Date(pubDateStr);

        if (!isNaN(pubDate.getTime()) && pubDate.getTime() < cutoffMs) return;
        if (title.length > 25 && !title.toLowerCase().includes('on road price')) {
          posts.push({
            sourceId: source.id,
            sourceName: source.name,
            postId: crypto.createHash('md5').update(link || title).digest('hex').slice(0, 12),
            content: title,
            images: [],
            imageUrl: undefined,
            originalUrl: link,
            publishedAt: !isNaN(pubDate.getTime()) ? pubDate.toISOString() : new Date().toISOString()
          });
        }
      });
    }
  } catch (err) {}
  return posts;
}

`;

if (!content.includes('scrapeAbpSource')) {
  content = content.replace(targetMarker, scrapersCode + targetMarker);
  console.log("✓ Added scrapers code to sync-news.js");
}

// Now replace loop: `const posts = await scrapeFacebookSource(s);`
const loopTarget = "const posts = await scrapeFacebookSource(s);";
const loopReplacement = `let posts = [];
    if (s.type === 'facebook') {
      posts = await scrapeFacebookSource(s);
    } else if (s.type === 'portal_abp') {
      posts = await scrapeAbpSource(s);
    } else if (s.type === 'portal_public') {
      posts = await scrapePublicAppSource(s);
    } else {
      posts = await scrapeWebPortalSource(s);
    }`;

if (content.includes(loopTarget)) {
  content = content.replace(loopTarget, loopReplacement);
  console.log("✓ Updated multi-source crawler loop in sync-news.js");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("✓ sync-news.js updated successfully!");
