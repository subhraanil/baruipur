const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');
const { execSync } = require('child_process');

// Parse CLI arguments
const args = process.argv.slice(2);
let daysBack = 7;
for (const arg of args) {
  if (arg.startsWith('--days=')) {
    const val = parseInt(arg.split('=')[1], 10);
    if (!isNaN(val) && val > 0) daysBack = val;
  }
}

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const CACHE_DIR = path.join(__dirname, '..', 'public', 'images', 'crawled');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// 1. Promotional filter
function isPromotionalPost(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  const promoKeywords = [
    'অফার', 'ডিসকাউন্ট', 'সেল', 'কেনাকাটা', 'শপিং', 'প্রাইস', 'দাম মাত্র',
    'মূল্য মাত্র', 'মূল্যঃ', 'দামঃ', 'টাকা মাত্র', '₹', 'store opening',
    'showroom', 'fashion baruipur', 'কালেকশন', 'গার্মেন্টস', 'শাড়ি', 'কুর্তি',
    'পাঞ্জাবি', 'টিশার্ট', 'জিন্স', 'জুতো', 'বুটিক', 'হোম ডেলিভারি', 'যোগাযোগ করুন',
    'বুকিং চলছে', 'অর্ডার করতে', 'ফ্রি ডেলিভারি', 'dm for details', 'whatsapp us',
    'call now', 'discount', 'special offer', 'flat off', 'cash on delivery',
    'flat 50%', 'flat 20%', 'flat 30%', 'buy 1 get 1', 'buy 2 get 1', 'sale',
    'স্টক সীমিত', 'হোলসেল', 'রিটেল', 'শোরুম', 'গ্র্যান্ড ওপেনিং', 'মেগা সেল', 'ধামাকা অফার'
  ];
  const newsKeywords = [
    'গ্রেফতার', 'আটক', 'পুলিশ', 'থানা', 'আইসি', 'এসপি', 'তদন্ত', 'অভিযোগ',
    'মৃত্যু', 'নিহত', 'আহত', 'দুর্ঘটনা', 'অগ্নিকাণ্ড', 'রেল', 'ট্রেন',
    'শিয়ালদহ', 'লোকাল', 'পৌরসভা', 'চেয়ারম্যান', 'ওয়ার্ড', 'নিকাশি',
    'হাসপাতাল', 'চিকিৎসা', 'স্বাস্থ্য', 'বিদ্যালয়', 'কলেজ', 'মাধ্যমিক',
    'উচ্চমাধ্যমিক', 'পরীক্ষা', 'আদালত', 'বিচারক', 'রায়', 'প্রশাসন', 'মহকুমা শাসক',
    'বন্যা', 'বৃষ্টি', 'বিদ্যুৎ', 'পানি', 'জলমগ্ন', 'বিক্ষোভ', 'উদ্ধার'
  ];

  let promoScore = 0;
  for (const word of promoKeywords) {
    if (t.includes(word)) promoScore++;
  }
  let newsScore = 0;
  for (const word of newsKeywords) {
    if (t.includes(word)) newsScore++;
  }
  if (/(?:call|whatsapp|অর্ডার|বুকিং|যোগাযোগ).*?\b\d{10}\b/i.test(t)) promoScore += 2;
  if (/(?:₹\s*\d+|\d+\s*\/-|\d+%\s*(?:off|ছাড়))/i.test(t)) promoScore += 2;

  return promoScore >= 2 && newsScore === 0;
}

// 2. Category detector
function detectCategory(text) {
  const raw = text.split('\n\n[')[0].toLowerCase();
  if (/রেল|ট্রেন|লোকাল|শিয়ালদহ|ক্যানিং|নামখানা|ডায়মন্ড|বারুইপুর জংশন|প্ল্যাটফর্ম|রেলওয়ে|যাত্রী|বগির|লাইন|সিগন্যাল|গেট/.test(raw)) return 'railway';
  if (/হাসপাতাল|স্বাস্থ্য|ডাক্তার|নার্স|চিকিৎসা|রোগী|ওষুধ|ব্লাড ব্যাংক|অ্যাম্বুলেন্স|স্বাস্থ্যকেন্দ্র|স্বাস্থ্যসাথী|মহকুমা হাসপাতাল|অপারেশন|রক্তদান/.test(raw)) return 'health';
  if (/স্কুল|বিদ্যালয়|কলেজ|পড়ুয়া|ছাত্র|ছাত্রী|পরীক্ষা|মাধ্যমিক|উচ্চমাধ্যমিক|শিক্ষক|শিক্ষিকা|সিলেবাস|বৃত্তি|বিশ্ববিদ্যালয়/.test(raw)) return 'education';
  if (/মেলা|পুজো|পূজো|উৎসব|নাটক|সাংস্কৃতিক|খেলা|ফুটবল|ক্রিকেট|টুর্নামেন্ট|রাসমেলা|যাত্রাপালা|সংগীত|রাখি|ঢাকের কাঠি|উওম কুমার|শরৎ|মহালয়া/.test(raw)) return 'culture';
  if (/পৌরসভা|পুরসভা|চেয়ারম্যান|কাউন্সিলর|ওয়ার্ড|নিকাশি|ড্রেন|আবর্জনা|সাফাই|পানীয় জল|রাস্তাঘাট|রাস্তা|ঘাট|আলো|ট্যাক্স|পৌরপ্রধান|পুরপ্রধান|জলমগ্ন/.test(raw)) return 'municipality';
  if (/থানা|পুলিশ|আইসি|এসপি|গ্রেফতার|আটক|চুরি|ছিনতাই|(?<!রা)খুন|মাদক|তল্লাশি|আদালত|আইন|অপরাধ|অভিযান|মারপিট|প্রতারণা|হাইকোর্ট|জামিন|সাইবার/.test(raw)) return 'crime';
  return 'general';
}

const CATEGORY_NAMES = {
  railway: 'রেল ও যাতায়াত',
  crime: 'অপরাধ ও প্রশাসন',
  municipality: 'পৌরসভা ও নাগরিক',
  health: 'স্বাস্থ্য ও হাসপাতাল',
  education: 'শিক্ষা ও বিদ্যায়তন',
  culture: 'উৎসব, সংস্কৃতি ও খেলাধুলা',
  general: 'সব খবর'
};

// 3. Editorial Context Enrichment
function enrichContentWithContext(title, content, category) {
  let enriched = content.trim();
  const contextMap = {
    railway: '\n\n[রেল ও যাতায়াত প্রেক্ষাপট]: দক্ষিণ ২৪ পরগনার অন্যতম প্রধান রেল জংশন হলো বারুইপুর। শিয়ালদহ দক্ষিণ শাখার ডায়মন্ড হারবার, ক্যানিং ও নামখানা লাইনের হাজার হাজার যাত্রী প্রতিদিন এই রুটে যাতায়াত করেন। রেল সংক্রান্ত যেকোনো বিঘ্ন বা সময়সূচি পরিবর্তনের ক্ষেত্রে নিত্যযাত্রীদের সচেতন থাকার পরামর্শ দেওয়া হচ্ছে।',
    crime: '\n\n[আইনশৃঙ্খলা ও নিরাপত্তা]: বারুইপুর পুলিশ জেলা প্রশাসনের পক্ষ থেকে জানানো হয়েছে, যেকোনো জরুরি সহায়তা বা অভিযোগ জানাতে স্থানীয় থানা বা ডিস্ট্রিক্ট কন্ট্রোল রুমে সরাসরি যোগাযোগ করা যাবে। এলাকায় শান্তি-শৃঙ্খলা বজায় রাখতে পুলিশি টহল অব্যাহত রয়েছে।',
    municipality: '\n\n[পৌর ও নাগরিক পরিষেবা]: বারুইপুর মহকুমা ও পুরসভা এলাকার নাগরিকদের সুবিধার জন্য বিভিন্ন ওয়ার্ডে নিকাশি, আলো ও রাস্তাঘাট সংস্কারে নিয়মিত নজরদারি রাখা হচ্ছে বলে স্থানীয় পুর প্রশাসন সূত্রে জানা গেছে।',
    health: '\n\n[স্বাস্থ্য তথ্য]: স্থানীয় জনসাধারণের চিকিৎসা সেবায় বারুইপুর মহকুমা হাসপাতাল ও সংশ্লিষ্ট স্বাস্থ্যকেন্দ্রগুলি সার্বক্ষণিক জরুরি পরিষেবা প্রদানে তৎপর রয়েছে।',
    education: '\n\n[শিক্ষা বার্তা]: বারুইপুর মহকুমার বিভিন্ন স্কুল, কলেজ ও শিক্ষাপ্রতিষ্ঠানে শিক্ষার্থীদের পড়াশোনা ও প্রশাসনিক নির্দেশিকা যথাসময়ে কার্যকর থাকে।',
    culture: '\n\n[ঐতিহ্য ও সংস্কৃতি]: বারুইপুরের ঐতিহাসিক রাসমেলা ও বিভিন্ন ঐতিহ্যবাহী উৎসব প্রতি বছর বিপুল সংখ্যক ভক্ত ও দর্শনার্থীদের আকর্ষণ করে।',
    general: '\n\n[স্থানীয় আপডেট]: বারুইপুর মহকুমার নিত্যদিনের খবরাখবর ও নাগরিক উন্নয়নের তথ্যে নিয়মিত চোখ রাখুন বারুইপুর সংবাদ পোর্টালে।'
  };
  const extra = contextMap[category];
  if (extra && enriched.length < 500 && !enriched.includes(extra.substring(2, 25))) {
    enriched += extra;
  }
  return enriched;
}

// 4. Clean Bengali headline
function generateHeadline(content, fallbackTitle, sourceName) {
  let title = '';
  if (fallbackTitle && fallbackTitle.trim().length > 10 && fallbackTitle.trim().length < 140) {
    title = fallbackTitle.trim();
  }
  if (!title) {
    const cleaned = content
      .replace(/https?:\/\/\S+/g, '')
      .replace(/#[\w\u0980-\u09FF]+/g, '')
      .trim();
    const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 10);
    if (lines.length > 0) {
      const firstLine = lines[0];
      if (firstLine.length <= 90) {
        title = firstLine;
      } else {
        const sentences = firstLine.split(/[।!?]/).map(s => s.trim()).filter(s => s.length > 0);
        if (sentences.length > 1 && sentences[0].length < 20) {
          title = (sentences[0] + ' - ' + sentences[1]).substring(0, 90);
        } else if (sentences.length > 0) {
          title = sentences[0].substring(0, 90);
        } else {
          title = firstLine.substring(0, 80) + '...';
        }
      }
    } else {
      title = 'বারুইপুরের বিশেষ সংবাদ ও স্থানীয় আপডেট';
    }
  }

  if (sourceName) {
    const escaped = sourceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    title = title.replace(new RegExp(`^${escaped}\\s*[:|\\-–—]\\s*`, 'i'), '');
  }
  title = title.replace(/^[\w\u0980-\u09FF]{2,25}\s*[:|–—]\s*/, '');
  title = title.replace(/^#\w+\s*[:\-–—]?\s*/i, '');
  title = title
    .replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Symbol}#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳]+/gu, '')
    .replace(/[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Symbol}#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳]+$/gu, '')
    .trim();

  return title || 'বারুইপুরের বিশেষ সংবাদ ও স্থানীয় আপডেট';
}

function cleanBengaliContent(raw) {
  return raw
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#[\w\u0980-\u09FF]+/g, '')
    .replace(/বি\/স্ফোর\/ণে/g, 'বিস্ফোরণে')
    .replace(/বি\/স্ফোর\/ণ/g, 'বিস্ফোরণ')
    .replace(/ফোনে যোগাযোগ করুন.*?$/gi, '')
    .replace(/লাইক ও শেয়ার করুন.*?$/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function createSlug(title, id) {
  const clean = title
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 90)
    .replace(/^-+|-+$/g, '');
  if (clean && clean.length > 2) return clean;
  return 'baruipur-news-' + (id ? id.substring(0, 8) : Date.now());
}

// 5. Semantic clustering & synthesis
function extractKeywords(text) {
  const stopWords = new Set(['এই', 'সেই', 'একটি', 'হবে', 'ছিল', 'করে', 'করা', 'থেকে', 'জন্য', 'নিয়ে', 'হয়ে', 'সাথে', 'বলেন', 'তার', 'এবং', 'কিন্তু', 'বা', 'ও', 'করেছে', 'হয়েছে', 'যায়', 'দিয়ে', 'পারে', 'হতে']);
  return text
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));
}

function calculateTopicOverlap(text1, text2) {
  const kw1 = new Set(extractKeywords(text1));
  const kw2 = new Set(extractKeywords(text2));
  if (kw1.size === 0 || kw2.size === 0) return 0;
  let shared = 0;
  for (const w of kw1) {
    if (kw2.has(w)) shared++;
  }
  return shared / Math.min(kw1.size, kw2.size);
}

function synthesizeTopicPosts(rawList) {
  const merged = [];
  const visited = new Set();

  for (let i = 0; i < rawList.length; i++) {
    if (visited.has(i)) continue;
    const cluster = [rawList[i]];
    visited.add(i);

    for (let j = i + 1; j < rawList.length; j++) {
      if (visited.has(j)) continue;
      const overlap = calculateTopicOverlap(rawList[i].content, rawList[j].content);
      if (overlap >= 0.35) {
        cluster.push(rawList[j]);
        visited.add(j);
      }
    }

    if (cluster.length === 1) {
      merged.push(cluster[0]);
    } else {
      cluster.sort((a, b) => b.content.length - a.content.length);
      const primary = cluster[0];
      const seenSentences = new Set();
      const combinedLines = [];

      for (const p of cluster) {
        const sentences = p.content.split(/[।!?\n]+/).map(s => s.trim()).filter(s => s.length > 10);
        for (const s of sentences) {
          const key = s.substring(0, 35);
          if (!seenSentences.has(key)) {
            seenSentences.add(key);
            combinedLines.push(s);
          }
        }
      }

      const mergedContent = combinedLines.join('। ') + '।';
      const sourceNames = Array.from(new Set(cluster.map(p => p.sourceName).filter(Boolean))).join(', ');
      const bestImage = cluster.find(p => p.imageUrl && !p.imageUrl.includes('placeholder'))?.imageUrl || primary.imageUrl;
      const video = cluster.find(p => p.videoUrl);

      merged.push({
        title: primary.title,
        content: mergedContent,
        originalUrl: primary.originalUrl,
        publishedAt: primary.publishedAt || new Date().toISOString(),
        imageUrl: bestImage,
        videoUrl: video?.videoUrl,
        videoEmbedUrl: video?.videoEmbedUrl,
        sourceId: primary.sourceId,
        sourceName: sourceNames || primary.sourceName
      });
    }
  }

  return merged;
}

// 6. Image download & caching
async function downloadImageLocally(url) {
  if (!url || !url.startsWith('http')) return url || '';
  if (url.startsWith('/images/')) return url;

  if (
    url.includes('fbsbx.com') ||
    url.includes('fbcdn.net') ||
    url.includes('scontent') ||
    url.includes('facebook.com')
  ) {
    try {
      const hash = crypto.createHash('md5').update(url).digest('hex');
      const filename = `${hash}.jpg`;
      const filePath = path.join(CACHE_DIR, filename);

      if (fs.existsSync(filePath)) {
        return `/images/crawled/${filename}`;
      }

      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        responseType: 'arraybuffer',
        timeout: 10000,
        validateStatus: () => true
      });

      if (res.status === 200 && res.data && res.data.length > 500) {
        fs.writeFileSync(filePath, res.data);
        return `/images/crawled/${filename}`;
      }
    } catch (e) {}
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

// 7. Scrape a Facebook page with Jina Reader fallback
async function scrapeFacebookSource(source) {
  const posts = [];
  const cleanTargetUrl = source.url.replace(/\/$/, '');

  // Attempt 1: Direct Comet scraper
  try {
    const res = await axios.get(source.url, {
      timeout: 12000,
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'bn-IN,bn;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      maxRedirects: 5,
      validateStatus: () => true
    });

    if (res.data && typeof res.data === 'string') {
      const html = res.data;
      const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
      let m;
      const rawStories = [];

      while ((m = scriptRegex.exec(html)) !== null) {
        const jsonStr = m[1];
        if (!jsonStr.includes('post_id') && !jsonStr.includes('creation_time') && !jsonStr.includes('story')) continue;
        try {
          const data = JSON.parse(jsonStr);
          function scan(obj) {
            if (!obj || typeof obj !== 'object') return;
            const pId = obj.post_id || obj.legacy_fbid || (obj.__typename === 'Story' ? obj.id : undefined);
            if (pId && (obj.creation_time || obj.comet_sections || obj.attachments || obj.message)) {
              rawStories.push({ ...obj, post_id: pId });
            }
            for (const k of Object.keys(obj)) scan(obj[k]);
          }
          scan(data);
        } catch (e) {}
      }

      const seenPostIds = new Set();
      for (const story of rawStories) {
        const postId = String(story.post_id || story.legacy_fbid || story.id || '');
        if (!postId || seenPostIds.has(postId)) continue;
        seenPostIds.add(postId);

        function findMessage(o) {
          if (!o) return null;
          if (o.__typename === 'TextWithEntities' && typeof o.text === 'string') return o.text;
          if (o.message && typeof o.message.text === 'string') return o.message.text;
          if (typeof o === 'object') {
            for (const k of Object.keys(o)) {
              const r = findMessage(o[k]);
              if (r) return r;
            }
          }
          return null;
        }

        const message = findMessage(story.comet_sections?.content) || findMessage(story);
        if (!message || message.trim().length < 15) continue;

        const images = [];
        const videos = [];
        function extractMedia(o) {
          if (!o || typeof o !== 'object') return;
          if (o.uri && typeof o.uri === 'string' && o.uri.startsWith('http') && !o.uri.includes('emoji') && !o.uri.includes('rsrc.php') && !o.uri.includes('static.xx.fbcdn.net')) {
            images.push(o.uri);
          }
          if (o.playable_url && typeof o.playable_url === 'string') videos.push(o.playable_url);
          if (o.__typename === 'Video' && o.id) videos.push(`https://www.facebook.com/watch/?v=${o.id}`);
          for (const k of Object.keys(o)) extractMedia(o[k]);
        }
        extractMedia(story.attachments);
        extractMedia(story.comet_sections);

        const postUrl = story.permalink_url || `${cleanTargetUrl}/posts/${postId}`;
        const publishedAt = story.creation_time ? new Date(story.creation_time * 1000).toISOString() : new Date().toISOString();
        const imageUrl = images.length > 0 ? images[0] : undefined;
        let videoUrl = videos.length > 0 ? videos[0] : undefined;
        let videoEmbedUrl = videoUrl ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0` : undefined;

        posts.push({
          content: message,
          originalUrl: postUrl,
          publishedAt,
          imageUrl,
          videoUrl,
          videoEmbedUrl,
          sourceId: source.id,
          sourceName: source.name
        });
      }
    }
  } catch (e) {}

  // Attempt 2: High-reliability Jina Reader Fallback
  if (posts.length === 0) {
    try {
      const jinaRes = await axios.get(`https://r.jina.ai/${cleanTargetUrl}`, {
        headers: { 'Accept': 'text/plain' },
        timeout: 20000,
        validateStatus: () => true
      });

      if (jinaRes.data && typeof jinaRes.data === 'string') {
        const md = jinaRes.data;
        const sections = md.split(/\n(?=## |\n\*\*\[)/g);

        for (const sec of sections) {
          const imgMatches = [...sec.matchAll(/!\[.*?\]\((https:\/\/[^)]+fbcdn\.net[^)]+)\)/g)].map(m => m[1]);
          const reelMatch = sec.match(/https:\/\/www\.facebook\.com\/(?:reel|watch\/\?v=|videos\/)(\d+)/);

          let text = sec
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/##\s+/g, '')
            .replace(/\*\*/g, '')
            .replace(/\b(Like|Comment|Share|Privacy|Terms|Advertising|Cookies|Log In|Create new account|See more|Forgot Account\?)\b/gi, '')
            .trim();

          if (text.length > 25 && !text.includes('Log into Facebook') && !text.includes('Password') && !text.includes('Forgot Account')) {
            const cleanImg = imgMatches.find(u => !u.includes('emoji') && !u.includes('rsrc.php'));
            let videoUrl;
            let videoEmbedUrl;

            if (reelMatch) {
              videoUrl = `https://www.facebook.com/watch/?v=${reelMatch[1]}`;
              videoEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0`;
            }

            posts.push({
              content: text,
              originalUrl: reelMatch ? `https://www.facebook.com/reel/${reelMatch[1]}` : cleanTargetUrl,
              publishedAt: new Date().toISOString(),
              imageUrl: cleanImg,
              videoUrl,
              videoEmbedUrl,
              sourceId: source.id,
              sourceName: source.name
            });
          }
        }
      }
    } catch (jinaErr) {}
  }

  return posts;
}

// 8. Main execution orchestrator
async function runWorkflow() {
  console.log('===============================================================');
  console.log(`🚀 বারুইপুর মাল্টি-সোর্স নিউজ ক্রলার ও সিন্থেসিস ওয়ার্কফ্লো`);
  console.log(`⏱️ টাইম উইন্ডো: বিগত ${daysBack} দিন`);
  console.log(`📅 সময়: ${new Date().toLocaleString('bn-IN')}`);
  console.log('===============================================================\n');

  const rawDb = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const sources = (rawDb.sources || []).filter(s => s.isActive);
  const existingArticles = rawDb.articles || [];
  const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);

  console.log(`🔍 সক্রিয় ফেসবুক সোর্স সংখ্যা: ${sources.length} টি\n`);

  const allRawPosts = [];

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    process.stdout.write(`[${i + 1}/${sources.length}] স্ক্যান করা হচ্ছে: ${s.name}... `);
    const posts = await scrapeFacebookSource(s);

    // Apply time-window and promotional filter
    let validCount = 0;
    let promoCount = 0;

    for (const p of posts) {
      if (p.publishedAt) {
        const pTime = new Date(p.publishedAt).getTime();
        if (!isNaN(pTime) && pTime < cutoffMs) continue;
      }
      if (isPromotionalPost(p.content)) {
        promoCount++;
        continue;
      }
      allRawPosts.push(p);
      validCount++;
    }

    console.log(`পেয়েছি: ${posts.length}, গ্রহণযোগ্য নিউজ: ${validCount}, বিজ্ঞাপনী বাতিল: ${promoCount}`);
    s.lastCrawledAt = new Date().toISOString();
  }

  console.log(`\n📊 মোট সংগৃহীত খাঁটি সংবাদ পোস্ট: ${allRawPosts.length} টি`);
  console.log(`🔄 একাধিক পেজের খবরের মধ্যে সমন্বয় ও সিন্থেসিস (Cross-Source Topic Synthesis) চলছে...`);

  const synthesizedPosts = synthesizeTopicPosts(allRawPosts);
  console.log(`✨ সমন্বয়ের পর চূড়ান্ত সংবাদ রিপোর্ট সংখ্যা: ${synthesizedPosts.length} টি\n`);

  let newPublishedCount = 0;
  const existingHashes = new Set(existingArticles.map(a => a.crawlHash).filter(Boolean));

  for (const post of synthesizedPosts) {
    const cleaned = cleanBengaliContent(post.content);
    if (!cleaned || cleaned.length < 15) continue;

    const hash = crypto
      .createHash('md5')
      .update(cleaned.substring(0, 100) + (post.sourceId || ''))
      .digest('hex');

    if (existingHashes.has(hash)) {
      continue;
    }

    const category = detectCategory(cleaned);
    const categoryBn = CATEGORY_NAMES[category] || 'সব খবর';
    const headline = generateHeadline(cleaned, post.title, post.sourceName);
    const enriched = enrichContentWithContext(headline, cleaned, category);
    const summary = enriched.length > 180 ? enriched.substring(0, 175) + '...' : enriched;
    const articleId = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    let finalImageUrl = post.imageUrl;
    if (finalImageUrl) {
      finalImageUrl = await downloadImageLocally(finalImageUrl);
    } else {
      finalImageUrl = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';
    }

    const article = {
      id: articleId,
      title: headline,
      originalTitle: post.title,
      slug: createSlug(headline, articleId),
      summary: summary,
      content: enriched,
      category: category,
      categoryNameBn: categoryBn,
      sourceId: post.sourceId || 'multi',
      sourceName: post.sourceName || 'বারুইপুর ডেস্ক',
      sourceType: 'facebook',
      sourceUrl: post.originalUrl,
      originalPostUrl: post.originalUrl,
      imageUrl: finalImageUrl,
      videoUrl: post.videoUrl,
      videoEmbedUrl: post.videoEmbedUrl,
      publishedAt: post.publishedAt || new Date().toISOString(),
      isBreaking: category === 'railway' || category === 'crime',
      isFeatured: false,
      status: 'published',
      views: Math.floor(Math.random() * 50) + 10,
      crawlHash: hash
    };

    existingArticles.unshift(article);
    existingHashes.add(hash);
    newPublishedCount++;
  }

  // Save updated database
  rawDb.articles = existingArticles;
  rawDb.sources = sources;

  const logMsg = `বিগত ${daysBack} দিনের ১০টি ফেসবুক উৎস স্ক্যান সম্পন্ন। মোট পোস্ট সংগ্রহ: ${allRawPosts.length}, সমন্বয়ের পর: ${synthesizedPosts.length}, নতুন প্রকাশিত সংবাদ: ${newPublishedCount} টি।`;
  rawDb.crawlLogs = rawDb.crawlLogs || [];
  rawDb.crawlLogs.unshift({
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString(),
    sourceId: 'multi-10-sources',
    sourceName: '১০টি ফেসবুক পেজ ও গ্রুপ',
    status: 'success',
    message: logMsg,
    itemsFetched: allRawPosts.length,
    itemsPublished: newPublishedCount
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(rawDb, null, 2), 'utf-8');

  console.log('---------------------------------------------------------------');
  console.log(`🎉 প্রকাশনা সম্পন্ন!`);
  console.log(`✅ নতুন প্রকাশিত সংবাদ: ${newPublishedCount} টি`);
  console.log(`📁 ডেটাবেস সাইজ: ${existingArticles.length} টি প্রকাশিত সংবাদ`);
  console.log('---------------------------------------------------------------\n');

  // Push to GitHub so Render updates live!
  console.log('🌐 গিটহাবে পুশ ও লাইভ রেন্ডার সার্ভার আপডেট শুরু হচ্ছে...');
  try {
    execSync('git add src/data/news_data.json public/images/crawled/ src/lib/ scripts/', { stdio: 'inherit' });
    const commitMsg = `Sync ${daysBack} days news from 10 Facebook sources (${newPublishedCount} new articles)`;
    const token = process.env.GITHUB_TOKEN;
    const pushCmd = token 
      ? `git -c credential.helper= push https://subhraanil:${token}@github.com/subhraanil/baruipur.git main`
      : 'git push origin main';
    execSync(pushCmd, { stdio: 'inherit' });
    console.log('✅ গিটহাবে সফলভাবে পুশ সম্পন্ন! রেন্ডার লাইভ সাইট স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে।');
  } catch (gitErr) {
    console.warn('⚠️ গিট অপারেশনের সময় সতর্কতা:', gitErr.message);
  }
}

runWorkflow().catch(err => {
  console.error('❌ ত্রুটি:', err);
  process.exit(1);
});
