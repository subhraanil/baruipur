import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import crypto from 'crypto';
import { db } from './db';
import { Article, ArticleCategory, Source, CrawlLog } from './types';
import { CATEGORIES } from './constants';

const rssParser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  }
});

export interface RawPost {
  title?: string;
  content: string;
  originalUrl: string;
  publishedAt?: string;
  imageUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  sourceId?: string;
  sourceName?: string;
}

import fs from 'fs';
import path from 'path';
export { getVideoEmbedUrl, extractVideoFromText, getSafeImageUrl } from './videoUtils';
import { getVideoEmbedUrl, extractVideoFromText, getSafeImageUrl } from './videoUtils';

export async function downloadImageLocally(url?: string): Promise<string> {
  if (!url || !url.startsWith('http')) {
    return url || '';
  }

  if (url.startsWith('/images/')) {
    return url;
  }

  if (
    url.includes('fbsbx.com') ||
    url.includes('fbcdn.net') ||
    url.includes('scontent') ||
    url.includes('facebook.com') ||
    url.includes('fb.watch')
  ) {
    try {
      const cacheDir = path.join(process.cwd(), 'public', 'images', 'crawled');
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const hash = crypto.createHash('md5').update(url).digest('hex');
      const filename = `${hash}.jpg`;
      const filePath = path.join(cacheDir, filename);

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
    } catch (e: any) {
      console.warn('Image download warning:', e.message);
    }
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
}


// Bengali category keyword classifier
export function detectCategory(text: string): ArticleCategory {
  // Strip any existing context footer before analyzing
  const raw = text.split('\n\n[')[0].toLowerCase();

  // Railway & Traffic
  if (/রেল|ট্রেন|লোকাল|শিয়ালদহ|ক্যানিং|নামখানা|ডায়মন্ড|বারুইপুর জংশন|প্ল্যাটফর্ম|রেলওয়ে|যাত্রী|বগির|লাইন|সিগন্যাল|গেট/.test(raw)) {
    return 'railway';
  }

  // Health & Hospitals / Blood donation
  if (/হাসপাতাল|স্বাস্থ্য|ডাক্তার|নার্স|চিকিৎসা|রোগী|ওষুধ|ব্লাড ব্যাংক|অ্যাম্বুলেন্স|স্বাস্থ্যকেন্দ্র|স্বাস্থ্যসাথী|মহকুমা হাসপাতাল|অপারেশন|রক্তদান/.test(raw)) {
    return 'health';
  }

  // Education & Schools
  if (/স্কুল|বিদ্যালয়|কলেজ|পড়ুয়া|ছাত্র|ছাত্রী|পরীক্ষা|মাধ্যমিক|উচ্চমাধ্যমিক|শিক্ষক|শিক্ষিকা|সিলেবাস|বৃত্তি|বিশ্ববিদ্যালয়/.test(raw)) {
    return 'education';
  }

  // Culture, Festivals, Sports & Community Events
  if (/মেলা|পুজো|পূজো|উৎসব|নাটক|সাংস্কৃতিক|খেলা|ফুটবল|ক্রিকেট|টুর্নামেন্ট|রাসমেলা|যাত্রাপালা|সংগীত|রাখি|ঢাকের কাঠি|উওম কুমার|শরৎ|মহালয়া/.test(raw)) {
    return 'culture';
  }

  // Municipality & Civic
  if (/পৌরসভা|পুরসভা|চেয়ারম্যান|কাউন্সিলর|ওয়ার্ড|নিকাশি|ড্রেন|আবর্জনা|সাফাই|পানীয় জল|রাস্তাঘাট|রাস্তা|ঘাট|আলো|ট্যাক্স|পৌরপ্রধান|পুরপ্রধান|জলমগ্ন/.test(raw)) {
    return 'municipality';
  }

  // Police & Crime
  if (/থানা|পুলিশ|আইসি|এসপি|গ্রেফতার|আটক|চুরি|ছিনতাই|(?<!রা)খুন|মাদক|তল্লাশি|আদালত|আইন|অপরাধ|অভিযান|মারপিট|প্রতারণা|হাইকোর্ট|জামিন|সাইবার/.test(raw)) {
    return 'crime';
  }

  return 'general';
}

// Generate clean Bengali headline from raw content (strips any source name prefix)
export function generateHeadline(content: string, fallbackTitle?: string, sourceName?: string): string {
  let title = '';

  if (fallbackTitle && fallbackTitle.trim().length > 10 && fallbackTitle.trim().length < 140) {
    title = fallbackTitle.trim();
  }

  if (!title) {
    // Clean text from hashtags, links, and censorship slashes
    const cleaned = content
      .replace(/https?:\/\/\S+/g, '')
      .replace(/#[\w\u0980-\u09FF]+/g, '')
      .replace(/বি\/স্ফোর\/ণে/g, 'বিস্ফোরণে')
      .replace(/বি\/স্ফোর\/ণ/g, 'বিস্ফোরণ')
      .trim();

    const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 10);
    if (lines.length > 0) {
      const firstLine = lines[0];
      if (firstLine.length <= 90) {
        title = firstLine;
      } else {
        // Take first complete sentence
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

  // Explicit user rule: DO NOT put source name in title!
  if (sourceName) {
    const escaped = sourceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    title = title.replace(new RegExp(`^${escaped}\\s*[:|\\-–—]\\s*`, 'i'), '');
  }
  // Strip any short handle or source prefix followed by a colon or dash
  title = title.replace(/^[\w\u0980-\u09FF]{2,25}\s*[:|–—]\s*/, '');
  title = title.replace(/^#\w+\s*[:\-–—]?\s*/i, '');
  title = title
    .replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Symbol}#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳]+/gu, '')
    .replace(/[\s\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Symbol}#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳]+$/gu, '')
    .trim();

  return title || 'বারুইপুরের বিশেষ সংবাদ ও স্থানীয় আপডেট';
}

function cleanBengaliContent(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#[\w\u0980-\u09FF]+/g, '') // remove hashtags
    .replace(/বি\/স্ফোর\/ণে/g, 'বিস্ফোরণে')
    .replace(/বি\/স্ফোর\/ণ/g, 'বিস্ফোরণ')
    .replace(/ফোনে যোগাযোগ করুন.*?$/gi, '')
    .replace(/লাইক ও শেয়ার করুন.*?$/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Strict promotional / advertising detector: filters out garment ads, shop sales, price lists
export function isPromotionalPost(text: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  
  // Strong promotional and shopping keywords
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

  // News indicators (if text contains high-value news keywords, avoid false positive)
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

  // If phone number followed by order/call, strongly promotional
  if (/(?:call|whatsapp|অর্ডার|বুকিং|যোগাযোগ).*?\b\d{10}\b/i.test(t)) {
    promoScore += 2;
  }

  // Price tags like ₹500, 500/- or 50%
  if (/(?:₹\s*\d+|\d+\s*\/-|\d+%\s*(?:off|ছাড়))/i.test(t)) {
    promoScore += 2;
  }

  return promoScore >= 2 && newsScore === 0;
}

// Editorial context enrichment: adds informative geographic and civic context to news articles
export function enrichContentWithContext(title: string, content: string, category: ArticleCategory): string {
  let enriched = content.trim();

  const contextMap: Record<ArticleCategory, string> = {
    railway: '\n\n[রেল ও যাতায়াত প্রেক্ষাপট]: দক্ষিণ ২৪ পরগনার অন্যতম প্রধান রেল জংশন হলো বারুইপুর। শিয়ালদহ দক্ষিণ শাখার ডায়মন্ড হারবার, ক্যানিং ও নামখানা লাইনের হাজার হাজার যাত্রী প্রতিদিন এই রুটে যাতায়াত করেন। রেল সংক্রান্ত যেকোনো বিঘ্ন বা সময়সূচি পরিবর্তনের ক্ষেত্রে নিত্যযাত্রীদের সচেতন থাকার পরামর্শ দেওয়া হচ্ছে।',
    crime: '\n\n[আইনশৃঙ্খলা ও নিরাপত্তা]: বারুইপুর পুলিশ জেলা প্রশাসনের পক্ষ থেকে জানানো হয়েছে, যেকোনো জরুরি সহায়তা বা অভিযোগ জানাতে স্থানীয় থানা বা ডিস্ট্রিক্ট কন্ট্রোল রুমে সরাসরি যোগাযোগ করা যাবে। এলাকায় শান্তি-শৃঙ্খলা বজায় রাখতে পুলিশি টহল অব্যাহত রয়েছে।',
    municipality: '\n\n[পৌর ও নাগরিক পরিষেবা]: বারুইপুর মহকুমা ও পুরসভা এলাকার নাগরিকদের সুবিধার জন্য বিভিন্ন ওয়ার্ডে নিকাশি, আলো ও রাস্তাঘাট সংস্কারে নিয়মিত নজরদারি রাখা হচ্ছে বলে স্থানীয় পুর প্রশাসন সূত্রে জানা গেছে।',
    health: '\n\n[স্বাস্থ্য তথ্য]: স্থানীয় জনসাধারণের চিকিৎসা সেবায় বারুইপুর মহকুমা হাসপাতাল ও সংশ্লিষ্ট স্বাস্থ্যকেন্দ্রগুলি সার্বক্ষণিক জরুরি পরিষেবা প্রদানে তৎপর রয়েছে।',
    education: '\n\n[শিক্ষা বার্তা]: বারুইপুর মহকুমার বিভিন্ন স্কুল, কলেজ ও শিক্ষাপ্রতিষ্ঠানে শিক্ষার্থীদের পড়াশোনা ও প্রশাসনিক নির্দেশিকা যথাসময়ে কার্যকর থাকে।',
    culture: '\n\n[ঐতিহ্য ও সংস্কৃতি]: বারুইপুরের ঐতিহাসিক রাসমেলা ও বিভিন্ন ঐতিহ্যবাহী উৎসব প্রতি বছর বিপুল সংখ্যক ভক্ত ও দর্শনার্থীদের আকর্ষণ করে।',
    general: '\n\n[স্থানীয় আপডেট]: বারুইপুর মহকুমার নিত্যদিনের খবরাখবর ও নাগরিক উন্নয়নের তথ্যে নিয়মিত চোখ রাখুন বারুইপুর সংবাদ পোর্টালে।',
    all: ''
  };

  const extra = contextMap[category];
  if (extra && enriched.length < 500 && !enriched.includes(extra.substring(2, 25))) {
    enriched += extra;
  }

  return enriched;
}

// Helper to extract Bengali keywords for semantic clustering
export function extractKeywords(text: string): string[] {
  const stopWords = new Set(['এই', 'সেই', 'একটি', 'হবে', 'ছিল', 'করে', 'করা', 'থেকে', 'জন্য', 'নিয়ে', 'হয়ে', 'সাথে', 'বলেন', 'তার', 'এবং', 'কিন্তু', 'বা', 'ও', 'করেছে', 'হয়েছে', 'যায়', 'দিয়ে', 'পারে', 'হতে']);
  return text
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));
}

// Calculate topical overlap ratio between two texts (Jaccard-like keyword intersection)
export function calculateTopicOverlap(text1: string, text2: string): number {
  const kw1 = new Set(extractKeywords(text1));
  const kw2 = new Set(extractKeywords(text2));
  if (kw1.size === 0 || kw2.size === 0) return 0;
  let shared = 0;
  for (const w of kw1) {
    if (kw2.has(w)) shared++;
  }
  return shared / Math.min(kw1.size, kw2.size);
}

// Cross-source topic synthesis: merges articles covering the exact same event from different pages
export function synthesizeTopicPosts(rawList: RawPost[]): RawPost[] {
  const merged: RawPost[] = [];
  const visited = new Set<number>();

  for (let i = 0; i < rawList.length; i++) {
    if (visited.has(i)) continue;
    const cluster: RawPost[] = [rawList[i]];
    visited.add(i);

    for (let j = i + 1; j < rawList.length; j++) {
      if (visited.has(j)) continue;
      const overlap = calculateTopicOverlap(rawList[i].content, rawList[j].content);
      // If significant topical overlap (>= 35%) cluster them together
      if (overlap >= 0.35) {
        cluster.push(rawList[j]);
        visited.add(j);
      }
    }

    if (cluster.length === 1) {
      merged.push(cluster[0]);
    } else {
      // Sort cluster by content detail (longest first)
      cluster.sort((a, b) => b.content.length - a.content.length);
      const primary = cluster[0];
      
      // Combine unique non-duplicate sentences across all sources
      const seenSentences = new Set<string>();
      const combinedLines: string[] = [];

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

export function createSlug(title: string, id?: string): string {
  const clean = title
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 90)
    .replace(/^-+|-+$/g, '');

  if (clean && clean.length > 2) {
    return clean;
  }
  return 'baruipur-news-' + (id ? id.substring(0, 8) : Date.now());
}

// Fallback high-quality local imagery if crawled post lacks an image
const FALLBACK_IMAGES: Record<ArticleCategory, string[]> = {
  railway: [
    'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80'
  ],
  municipality: [
    'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80'
  ],
  crime: [
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
  ],
  health: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
  ],
  culture: [
    'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&auto=format&fit=crop&q=80'
  ],
  general: [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80'
  ],
  all: [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80'
  ]
};

function getRandomFallbackImage(cat: ArticleCategory): string {
  const list = FALLBACK_IMAGES[cat] || FALLBACK_IMAGES.general;
  return list[Math.floor(Math.random() * list.length)];
}

// Scrape Telegram public channel view (t.me/s/<channel>)
async function crawlTelegramChannel(channelHandleOrUrl: string): Promise<RawPost[]> {
  let cleanHandle = channelHandleOrUrl
    .replace(/^https?:\/\/t\.me\/(s\/)?/, '')
    .replace(/^@/, '')
    .replace(/\/.*$/, '')
    .trim();

  if (!cleanHandle) return [];

  const url = `https://t.me/s/${cleanHandle}`;
  try {
    const res = await axios.get(url, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'bn-IN,bn;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const $ = cheerio.load(res.data);
    const posts: RawPost[] = [];

    $('.tgme_widget_message').each((_, el) => {
      const text = $(el).find('.tgme_widget_message_text').text().trim();
      if (!text || text.length < 25) return;

      const postLink = $(el).find('.tgme_widget_message_date').attr('href') || url;
      const timeStr = $(el).find('.tgme_widget_message_date time').attr('datetime');

      // Extract image if attached
      let imageUrl = '';
      const photoEl = $(el).find('.tgme_widget_message_photo_wrap');
      if (photoEl.length > 0) {
        const style = photoEl.attr('style') || '';
        const match = style.match(/background-image:url\('?(.*?)'?\)/);
        if (match && match[1]) {
          imageUrl = match[1];
        }
      }

      // Check for video tag or video preview
      let videoUrl: string | undefined = undefined;
      let videoEmbedUrl: string | undefined = undefined;
      const videoEl = $(el).find('video');
      if (videoEl.length > 0 && videoEl.attr('src')) {
        videoUrl = videoEl.attr('src');
        videoEmbedUrl = videoUrl;
      }
      if (!videoUrl) {
        const extracted = extractVideoFromText(text);
        videoUrl = extracted.videoUrl;
        videoEmbedUrl = extracted.videoEmbedUrl;
      }

      posts.push({
        content: text,
        originalUrl: postLink,
        publishedAt: timeStr || new Date().toISOString(),
        imageUrl: imageUrl || undefined,
        videoUrl,
        videoEmbedUrl
      });
    });

    return posts;
  } catch (err: any) {
    console.warn(`Telegram fetch failed for ${cleanHandle}:`, err.message);
    return [];
  }
}

// Scrape RSS or YouTube feeds
async function crawlRssFeed(feedUrl: string): Promise<RawPost[]> {
  try {
    const feed = await rssParser.parseURL(feedUrl);
    const posts: RawPost[] = [];

    for (const item of feed.items) {
      const content = item.contentSnippet || item.content || item.summary || item.title || '';
      if (!content || content.length < 15) continue;

      let imageUrl: string | undefined = undefined;
      if (item.enclosure && item.enclosure.url) {
        imageUrl = item.enclosure.url;
      }

      let videoUrl: string | undefined = undefined;
      let videoEmbedUrl: string | undefined = undefined;

      // Extract YouTube video ID if present
      const ytIdMatch = (item.link || feedUrl).match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
      if (ytIdMatch && ytIdMatch[1]) {
        videoUrl = `https://www.youtube.com/watch?v=${ytIdMatch[1]}`;
        videoEmbedUrl = `https://www.youtube.com/embed/${ytIdMatch[1]}`;
      } else {
        const extracted = extractVideoFromText(content);
        videoUrl = extracted.videoUrl;
        videoEmbedUrl = extracted.videoEmbedUrl;
      }

      posts.push({
        title: item.title,
        content: content,
        originalUrl: item.link || feedUrl,
        publishedAt: item.isoDate || (item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString()),
        imageUrl: imageUrl,
        videoUrl,
        videoEmbedUrl
      });
    }

    return posts;
  } catch (err: any) {
    console.warn(`RSS fetch failed for ${feedUrl}:`, err.message);
    return [];
  }
}

// Crawl Facebook page using real OpenGraph / CometFeed extraction
async function crawlFacebookPage(source: Source): Promise<RawPost[]> {
  const posts: RawPost[] = [];

  // If user passed an RSS or XML feed URL for Facebook
  if (source.url.includes('rss') || source.url.includes('xml')) {
    return await crawlRssFeed(source.url);
  }

  const userAgents = [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  ];

  for (const ua of userAgents) {
    if (posts.length > 0) break; // If we already extracted posts, stop trying fallbacks

    try {
      const res = await axios.get(source.url, {
        timeout: 15000,
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'bn-IN,bn;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        maxRedirects: 5,
        validateStatus: () => true
      });

      if (res.data && typeof res.data === 'string') {
        const html = res.data;

        // Extract Comet feed stories from JSON scripts
        const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
        let m;
        const rawStories: any[] = [];

        while ((m = scriptRegex.exec(html)) !== null) {
          const jsonStr = m[1];
          if (!jsonStr.includes('post_id') && !jsonStr.includes('creation_time') && !jsonStr.includes('feedback') && !jsonStr.includes('story')) continue;
          try {
            const data = JSON.parse(jsonStr);
            function scan(obj: any) {
              if (!obj || typeof obj !== 'object') return;
              const pId = obj.post_id || obj.legacy_fbid || (obj.__typename === 'Story' ? obj.id : undefined);
              if (pId && (obj.creation_time || obj.comet_sections || obj.attachments || obj.message)) {
                rawStories.push({ ...obj, post_id: pId });
              }
              for (const k of Object.keys(obj)) {
                scan(obj[k]);
              }
            }
            scan(data);
          } catch(e) {}
        }

        const seenPostIds = new Set<string>();

        for (const story of rawStories) {
          const postId = String(story.post_id || story.legacy_fbid || story.id || '');
          if (!postId || seenPostIds.has(postId)) continue;
          seenPostIds.add(postId);

          // Find message text recursively
          function findMessage(o: any): string | null {
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

          // Extract media (photos and videos)
          const images: string[] = [];
          const videos: string[] = [];
          function extractMedia(o: any) {
            if (!o) return;
            if (typeof o === 'object') {
              if (
                o.uri && 
                typeof o.uri === 'string' && 
                o.uri.startsWith('http') && 
                !o.uri.includes('emoji') && 
                !o.uri.includes('rsrc.php') && 
                !o.uri.includes('static.xx.fbcdn.net')
              ) {
                images.push(o.uri);
              }
              if (o.playable_url && typeof o.playable_url === 'string') {
                videos.push(o.playable_url);
              }
              if (o.__typename === 'Video' && o.id) {
                videos.push(`https://www.facebook.com/watch/?v=${o.id}`);
              }
              for (const k of Object.keys(o)) {
                extractMedia(o[k]);
              }
            }
          }
          extractMedia(story.attachments);
          extractMedia(story.comet_sections);

          const cleanBaseUrl = source.url.replace(/\/$/, '');
          const postUrl = story.permalink_url || `${cleanBaseUrl}/posts/${postId}`;
          const publishedAt = story.creation_time ? new Date(story.creation_time * 1000).toISOString() : new Date().toISOString();
          const imageUrl = images.length > 0 ? images[0] : undefined;
          let videoUrl: string | undefined = videos.length > 0 ? videos[0] : undefined;
          let videoEmbedUrl: string | undefined = undefined;

          if (videoUrl) {
            videoEmbedUrl = getVideoEmbedUrl(videoUrl);
          } else {
            const extracted = extractVideoFromText(message);
            if (extracted.videoUrl) {
              videoUrl = extracted.videoUrl;
              videoEmbedUrl = extracted.videoEmbedUrl;
            }
          }

          posts.push({
            content: message,
            originalUrl: postUrl,
            publishedAt,
            imageUrl,
            videoUrl,
            videoEmbedUrl
          });
        }

        // Fallback: If 0 structured stories parsed, try OpenGraph tags
        if (posts.length === 0) {
          const $ = cheerio.load(html);
          const ogDesc = $('meta[property="og:description"]').attr('content');
          const ogTitle = $('meta[property="og:title"]').attr('content');
          const ogImage = $('meta[property="og:image"]').attr('content');
          const ogVideo = $('meta[property="og:video"]').attr('content') || 
                          $('meta[property="og:video:url"]').attr('content') || 
                          $('meta[property="og:video:secure_url"]').attr('content');

          if (ogDesc && ogDesc.length > 30 && !ogDesc.includes('Log into Facebook') && !ogDesc.includes('Log In')) {
            let videoUrl: string | undefined = ogVideo;
            let videoEmbedUrl: string | undefined = ogVideo ? getVideoEmbedUrl(ogVideo) : undefined;
            if (!videoUrl) {
              const extracted = extractVideoFromText(ogDesc);
              videoUrl = extracted.videoUrl;
              videoEmbedUrl = extracted.videoEmbedUrl;
            }

            posts.push({
              title: ogTitle && !ogTitle.includes('Log in') ? ogTitle : undefined,
              content: ogDesc,
              originalUrl: source.url,
              publishedAt: new Date().toISOString(),
              imageUrl: ogImage,
              videoUrl,
              videoEmbedUrl
            });
          }
        }
      }
    } catch (err: any) {
      console.warn(`Facebook crawl attempt (${ua.split(' ')[0]}) for ${source.name}:`, err.message);
    }
  }

  // Cloud/Datacenter IP Fallback: When direct requests yield 0 posts (e.g. on Render/AWS where Facebook blocks DC IPs),
  // fetch via Jina Reader which bypasses datacenter blocks and returns rendered content.
  if (posts.length === 0) {
    try {
      const cleanTargetUrl = source.url.replace(/\/$/, '');
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
            let videoUrl: string | undefined = undefined;
            let videoEmbedUrl: string | undefined = undefined;

            if (reelMatch) {
              videoUrl = `https://www.facebook.com/watch/?v=${reelMatch[1]}`;
              videoEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0`;
            } else {
              const extracted = extractVideoFromText(text);
              videoUrl = extracted.videoUrl;
              videoEmbedUrl = extracted.videoEmbedUrl;
            }

            posts.push({
              content: text,
              originalUrl: reelMatch ? `https://www.facebook.com/reel/${reelMatch[1]}` : cleanTargetUrl,
              publishedAt: new Date().toISOString(),
              imageUrl: cleanImg,
              videoUrl,
              videoEmbedUrl
            });
          }
        }
      }
    } catch (jinaErr: any) {
      console.warn(`Jina Facebook fallback warning for ${source.name}:`, jinaErr.message);
    }
  }

  return posts;
}

// Main processing & auto-publishing function for a single source
export async function crawlSource(source: Source, daysBack = 7): Promise<{ fetched: number; published: number; message: string }> {
  let rawPosts: RawPost[] = [];
  let fetchError = '';

  const urlLower = (source.url || '').toLowerCase();
  const isFb = source.type === 'facebook' || 
    urlLower.includes('facebook.com') || 
    urlLower.includes('fb.watch') || 
    urlLower.includes('fb.com');

  const isTg = source.type === 'telegram' || urlLower.includes('t.me');
  const isYt = source.type === 'youtube' || urlLower.includes('youtube.com') || urlLower.includes('youtu.be');

  try {
    if (isFb) {
      rawPosts = await crawlFacebookPage(source);
    } else if (isTg) {
      rawPosts = await crawlTelegramChannel(source.handle || source.url);
    } else if (isYt) {
      if (source.url.includes('feeds/videos.xml')) {
        rawPosts = await crawlRssFeed(source.url);
      } else {
        rawPosts = await crawlTelegramChannel(source.handle || source.url);
      }
    } else if (source.type === 'rss') {
      rawPosts = await crawlRssFeed(source.url);
    } else {
      rawPosts = await crawlFacebookPage(source);
    }
  } catch (err: any) {
    fetchError = err.message;
  }

  // Tag rawPosts with source info
  rawPosts = rawPosts.map(p => ({
    ...p,
    sourceId: source.id,
    sourceName: source.name
  }));

  // If remote channel returned 0 posts or error
  if (rawPosts.length === 0) {
    const errorMsg = fetchError 
      ? `উৎস সংযোগে সমস্যা: ${fetchError}` 
      : `উৎস থেকে কোনো পোস্ট পাওয়া যায়নি। পেজটি পাবলিক কি না অথবা ইউআরএল সঠিক কি না যাচাই করুন।`;

    source.lastCrawledAt = new Date().toISOString();
    db.saveSource(source);

    const log: CrawlLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      sourceId: source.id,
      sourceName: source.name,
      status: fetchError ? 'error' : 'warning',
      message: errorMsg,
      itemsFetched: 0,
      itemsPublished: 0
    };
    db.addCrawlLog(log);

    return {
      fetched: 0,
      published: 0,
      message: errorMsg
    };
  }

  const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);
  let publishedCount = 0;

  for (const post of rawPosts) {
    // 1. Filter by daysBack window
    if (post.publishedAt) {
      const pTime = new Date(post.publishedAt).getTime();
      if (!isNaN(pTime) && pTime < cutoffMs) {
        continue;
      }
    }

    // 2. Strict promotional & advertising filter
    if (isPromotionalPost(post.content)) {
      continue;
    }

    const cleanedContent = cleanBengaliContent(post.content);
    if (!cleanedContent || cleanedContent.length < 15) continue;

    // Deduplication hash based on content snippet + source
    const hash = crypto
      .createHash('md5')
      .update(cleanedContent.substring(0, 100) + source.id)
      .digest('hex');

    // Skip if already published
    if (db.hasArticleWithHash(hash)) {
      continue;
    }

    const category = source.defaultCategory !== 'general' && source.defaultCategory !== 'all' 
      ? source.defaultCategory 
      : detectCategory(cleanedContent);

    const categoryObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const headline = generateHeadline(cleanedContent, post.title, source.name);
    const enrichedContent = enrichContentWithContext(headline, cleanedContent, category);
    const summary = enrichedContent.length > 180 ? enrichedContent.substring(0, 175) + '...' : enrichedContent;
    const articleId = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    // Extract video if present in post or in content text
    let videoUrl = post.videoUrl;
    let videoEmbedUrl = post.videoEmbedUrl;
    if (!videoUrl) {
      const extracted = extractVideoFromText(enrichedContent);
      if (extracted.videoUrl) {
        videoUrl = extracted.videoUrl;
        videoEmbedUrl = extracted.videoEmbedUrl;
      }
    } else if (!videoEmbedUrl) {
      videoEmbedUrl = getVideoEmbedUrl(videoUrl);
    }

    let finalImageUrl = post.imageUrl;
    if (finalImageUrl) {
      finalImageUrl = await downloadImageLocally(finalImageUrl);
    } else {
      finalImageUrl = getRandomFallbackImage(category);
    }

    const newArticle: Article = {
      id: articleId,
      title: headline,
      originalTitle: post.title,
      slug: createSlug(headline, articleId),
      summary: summary,
      content: enrichedContent,
      category: category,
      categoryNameBn: categoryObj.nameBn,
      sourceId: source.id,
      sourceName: source.name,
      sourceType: isFb ? 'facebook' : (isTg ? 'telegram' : (isYt ? 'youtube' : source.type)),
      sourceUrl: source.url,
      originalPostUrl: post.originalUrl,
      imageUrl: finalImageUrl,
      videoUrl: videoUrl,
      videoEmbedUrl: videoEmbedUrl,
      publishedAt: post.publishedAt || new Date().toISOString(),
      isBreaking: category === 'railway' || category === 'crime',
      isFeatured: false,
      status: source.autoPublish ? 'published' : 'draft',
      views: Math.floor(Math.random() * 50) + 10,
      crawlHash: hash
    };

    db.saveArticle(newArticle);
    publishedCount++;
  }

  // Update source statistics
  source.lastCrawledAt = new Date().toISOString();
  source.postsCount = (source.postsCount || 0) + publishedCount;
  db.saveSource(source);

  // Informative feedback message
  let logMessage = '';
  if (publishedCount > 0) {
    logMessage = `ক্রলিং সফল! উৎস থেকে বিগত ${daysBack} দিনের পোস্ট পরীক্ষা করা হয়েছে, ${publishedCount} টি নতুন সংবাদ স্বয়ংক্রিয়ভাবে প্রকাশিত হয়েছে।`;
  } else {
    logMessage = `ক্রলিং সফল! উৎস থেকে ${rawPosts.length} টি পোস্ট পাওয়া গেছে। এই পোস্টগুলি ইতিমধ্যে ওয়েবসাইটে সংরক্ষিত রয়েছে অথবা ফিল্টার হয়েছে (কোনো নতুন অপ্রকাশিত সংবাদ নেই)।`;
  }
  if (fetchError) {
    logMessage = `ক্রলিং সম্পন্ন (নেটওয়ার্ক সতর্কতা): প্রাপ্ত ${rawPosts.length}, নতুন প্রকাশিত ${publishedCount} টি।`;
  }

  // Log crawl execution
  const log: CrawlLog = {
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString(),
    sourceId: source.id,
    sourceName: source.name,
    status: fetchError ? 'warning' : 'success',
    message: logMessage,
    itemsFetched: rawPosts.length,
    itemsPublished: publishedCount
  };
  db.addCrawlLog(log);

  return {
    fetched: rawPosts.length,
    published: publishedCount,
    message: logMessage
  };
}

// Full multi-source crawler: aggregates, filters promotions, clusters same topics across pages, and enriches
export async function crawlAllActiveSources(daysBack = 7) {
  const sources = db.getSources().filter(s => s.isActive);
  const cutoffMs = Date.now() - (daysBack * 24 * 60 * 60 * 1000);
  const allRawPosts: RawPost[] = [];
  const results = [];

  for (const s of sources) {
    let posts: RawPost[] = [];
    try {
      if (s.type === 'facebook' || s.url.includes('facebook.com') || s.url.includes('fb.watch') || s.url.includes('fb.com')) {
        posts = await crawlFacebookPage(s);
      } else if (s.type === 'telegram' || s.url.includes('t.me')) {
        posts = await crawlTelegramChannel(s.handle || s.url);
      } else if (s.type === 'rss') {
        posts = await crawlRssFeed(s.url);
      } else {
        posts = await crawlFacebookPage(s);
      }
    } catch (e: any) {
      console.warn(`Error crawling ${s.name}:`, e.message);
    }

    // Filter by time window and promotional keywords
    const filteredPosts = posts.filter(p => {
      if (p.publishedAt) {
        const t = new Date(p.publishedAt).getTime();
        if (!isNaN(t) && t < cutoffMs) return false;
      }
      if (isPromotionalPost(p.content)) return false;
      return true;
    }).map(p => ({
      ...p,
      sourceId: s.id,
      sourceName: s.name
    }));

    allRawPosts.push(...filteredPosts);
    results.push({ source: s.name, fetched: posts.length, filtered: filteredPosts.length });

    s.lastCrawledAt = new Date().toISOString();
    db.saveSource(s);
  }

  // Cross-source topic clustering & synthesis: combine multi-page coverage of the same event
  const synthesizedPosts = synthesizeTopicPosts(allRawPosts);
  let totalPublished = 0;

  for (const post of synthesizedPosts) {
    const cleanedContent = cleanBengaliContent(post.content);
    if (!cleanedContent || cleanedContent.length < 15) continue;

    // Deduplication hash
    const hash = crypto
      .createHash('md5')
      .update(cleanedContent.substring(0, 100) + (post.sourceId || ''))
      .digest('hex');

    if (db.hasArticleWithHash(hash)) {
      continue;
    }

    const category = detectCategory(cleanedContent);
    const categoryObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const headline = generateHeadline(cleanedContent, post.title, post.sourceName);
    const enrichedContent = enrichContentWithContext(headline, cleanedContent, category);
    const summary = enrichedContent.length > 180 ? enrichedContent.substring(0, 175) + '...' : enrichedContent;
    const articleId = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    let videoUrl = post.videoUrl;
    let videoEmbedUrl = post.videoEmbedUrl;
    if (!videoUrl) {
      const extracted = extractVideoFromText(enrichedContent);
      if (extracted.videoUrl) {
        videoUrl = extracted.videoUrl;
        videoEmbedUrl = extracted.videoEmbedUrl;
      }
    } else if (!videoEmbedUrl) {
      videoEmbedUrl = getVideoEmbedUrl(videoUrl);
    }

    let finalImageUrl = post.imageUrl;
    if (finalImageUrl) {
      finalImageUrl = await downloadImageLocally(finalImageUrl);
    } else {
      finalImageUrl = getRandomFallbackImage(category);
    }

    const newArticle: Article = {
      id: articleId,
      title: headline,
      originalTitle: post.title,
      slug: createSlug(headline, articleId),
      summary: summary,
      content: enrichedContent,
      category: category,
      categoryNameBn: categoryObj.nameBn,
      sourceId: post.sourceId || 'multi',
      sourceName: post.sourceName || 'বারুইপুর ডেস্ক',
      sourceType: 'facebook',
      sourceUrl: post.originalUrl,
      originalPostUrl: post.originalUrl,
      imageUrl: finalImageUrl,
      videoUrl: videoUrl,
      videoEmbedUrl: videoEmbedUrl,
      publishedAt: post.publishedAt || new Date().toISOString(),
      isBreaking: category === 'railway' || category === 'crime',
      isFeatured: false,
      status: 'published',
      views: Math.floor(Math.random() * 50) + 10,
      crawlHash: hash
    };

    db.saveArticle(newArticle);
    totalPublished++;
  }

  // Global crawl log
  const summaryMessage = `মোট ${sources.length} টি ফেসবুক পেজ/গ্রুপ থেকে বিগত ${daysBack} দিনের সংবাদ স্ক্যান সম্পন্ন। মোট পোস্ট সংগ্রহ: ${allRawPosts.length}, একই বিষয়ের খবর সমন্বয় করে ${synthesizedPosts.length} টি রিপোর্ট তৈরি ও ${totalPublished} টি নতুন সংবাদ প্রকাশিত হয়েছে।`;
  const globalLog: CrawlLog = {
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString(),
    sourceId: 'multi',
    sourceName: 'সমস্ত ফেসবুক সোর্স',
    status: 'success',
    message: summaryMessage,
    itemsFetched: allRawPosts.length,
    itemsPublished: totalPublished
  };
  db.addCrawlLog(globalLog);

  return {
    sourcesCount: sources.length,
    totalFetched: allRawPosts.length,
    synthesizedCount: synthesizedPosts.length,
    totalPublished,
    message: summaryMessage,
    results
  };
}
