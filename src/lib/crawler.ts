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

interface RawPost {
  title?: string;
  content: string;
  originalUrl: string;
  publishedAt?: string;
  imageUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
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
  const t = text.toLowerCase();

  // Railway & Traffic
  if (/রেল|ট্রেন|লোকাল|শিয়ালদহ|ক্যানিং|নামখানা|ডায়মন্ড|বারুইপুর জংশন|প্ল্যাটফর্ম|রেলওয়ে|যাত্রী|বগির|লাইন|সিগন্যাল|গেট/.test(t)) {
    return 'railway';
  }

  // Police & Crime
  if (/থানা|পুলিশ|আইসি|এসপি|গ্রেফতার|আটক|চুরি|ছিনতাই|খুন|মাদক|তল্লাশি|আদালত|আইন|অপরাধ|অভিযান|মারপিট|প্রতারণা/.test(t)) {
    return 'crime';
  }

  // Municipality & Civic
  if (/পৌরসভা|পুরসভা|চেয়ারম্যান|কাউন্সিলর|ওয়ার্ড|নিকাশি|ড্রেন|আবর্জনা|সাফাই|পানীয় জল|রাস্তাঘাট|আলো|ট্যাক্স|পৌরপ্রধান|পুরপ্রধান/.test(t)) {
    return 'municipality';
  }

  // Health & Hospitals
  if (/হাসপাতাল|স্বাস্থ্য|ডাক্তার|নার্স|চিকিৎসা|রোগী|ওষুধ|ব্লাড ব্যাংক|অ্যাম্বুলেন্স|স্বাস্থ্যকেন্দ্র|স্বাস্থ্যসাথী|মহকুমা হাসপাতাল|অপারেশন/.test(t)) {
    return 'health';
  }

  // Education & Schools
  if (/স্কুল|বিদ্যালয়|কলেজ|পড়ুয়া|ছাত্র|ছাত্রী|পরীক্ষা|মাধ্যমিক|উচ্চমাধ্যমিক|শিক্ষক|শিক্ষিকা|সিলেবাস|বৃত্তি|বিশ্ববিদ্যালয়/.test(t)) {
    return 'education';
  }

  // Culture, Festivals & Sports
  if (/মেলা|পুজো|উৎসব|নাটক|সাংস্কৃতিক|খেলা|ফুটবল|ক্রিকেট|টুর্নামেন্ট|রাসমেলা|যাত্রাপালা|সম্মেলন|সংগীত/.test(t)) {
    return 'culture';
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
  // Strip any handle or Latin/Bengali prefix followed by a colon or dash
  title = title.replace(/^[a-zA-Z0-9_.\s-]+[:|\\-–—]\s*/, '');
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

// Main processing & auto-publishing function
export async function crawlSource(source: Source): Promise<{ fetched: number; published: number; message: string }> {
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

  // If remote channel returned 0 posts or error, log warning and return without publishing fake news
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

  let publishedCount = 0;

  for (const post of rawPosts) {
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
    const summary = cleanedContent.length > 180 ? cleanedContent.substring(0, 175) + '...' : cleanedContent;
    const articleId = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    // Extract video if present in post or in content text
    let videoUrl = post.videoUrl;
    let videoEmbedUrl = post.videoEmbedUrl;
    if (!videoUrl) {
      const extracted = extractVideoFromText(cleanedContent);
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
      content: cleanedContent,
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
      status: source.autoPublish ? 'published' : 'draft', // Automatic publishing as requested!
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
    logMessage = `ক্রলিং সফল! উৎস থেকে মোট ${rawPosts.length} টি পোস্ট পরীক্ষা করা হয়েছে, ${publishedCount} টি নতুন সংবাদ স্বয়ংক্রিয়ভাবে প্রকাশিত হয়েছে।`;
  } else {
    logMessage = `ক্রলিং সফল! উৎস থেকে ${rawPosts.length} টি পোস্ট পাওয়া গেছে। এই পোস্টগুলি ইতিমধ্যে ওয়েবসাইটে সংরক্ষিত রয়েছে (কোনো নতুন অপ্রকাশিত পোস্ট নেই)।`;
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

export async function crawlAllActiveSources() {
  const sources = db.getSources().filter(s => s.isActive);
  const results = [];
  let totalFetched = 0;
  let totalPublished = 0;

  for (const s of sources) {
    const res = await crawlSource(s);
    results.push({ source: s.name, ...res });
    totalFetched += res.fetched;
    totalPublished += res.published;
  }

  return {
    sourcesCount: sources.length,
    totalFetched,
    totalPublished,
    results
  };
}
