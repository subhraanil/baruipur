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

// 1. Comprehensive Spam, Advertisement & Comment Filter
function isJunkOrCommentOrPromo(text) {
  if (!text || text.trim().length < 30) return true;
  // Normalize mathematical bold/italic Unicode letters (e.g. 𝐖𝐞 𝐈𝐧𝐬𝐭𝐚𝐥𝐥 -> We Install)
  const normalizedText = (text || '').normalize('NFKD');
  const t = normalizedText.trim();
  const lower = t.toLowerCase();

  // A. Facebook UI artifacts & button fragments
  if (/^(?:see\s+all\s+photos|see\s+more|view\s+more|log\s+in|sign\s+up|watch\s+more)/i.test(t)) return true;
  if (/see all photos/i.test(lower)) return true;

  // B. Facebook user comments / banter / transliterated chatter / surveys / greetings
  if (/^[A-Z][a-z]+\s+[A-Z][a-z]+\s+sure\b/i.test(t)) return true;
  if (/(?:dar gari|amra roj jai|ami chini|kheye nebe|valobasa|bhalobasa|bhaipo|bhalo theko|choto bhai|pukur bujiye|ekhn diye roj)\b/i.test(lower)) return true;
  if (/happy\s*birthday|shuvo\s*jonmodin|শুভ\s*জন্মদিন|অনেক\s*অনেক\s*ভালোবাসা/i.test(lower)) return true;
  if (/good\s*morning|good\s*night|shuvo\s*sokal|শুভ\s*সকাল|শুভ\s*রাত্রি/i.test(lower)) return true;
  if (/মাশাল্লাহ|সব রখম মোবাইল|calender না দেখে|roll best/i.test(lower)) return true;
  if (/never share your otp/i.test(lower)) return true;

  // Pure religious / festive one-liner greeting messages without substantive news
  if (/(?:শুভ\s*রাধাষ্টমী|রাধে\s*রাধে|জয়\s*বাবা\s*বিশ্বকর্মা|বিশ্বকর্মা\s*(?:পূজো?র|পূজার)?\s*(?:অনেক\s*অনেক\s*)?শুভেচ্ছা|শুভ\s*বিজয়া|শুভ\s*দীপাবলি|শুভ\s*নববর্ষ|জয়\s*শ্রী\s*রাম|জয়\s*শ্রী\s*কৃষ্ণ|হর\s*হর\s*মহাদেব)/i.test(lower)) {
    // If it's just a greeting without news event
    if (!/(?:গ্রেফতার|আটক|উদ্বোধন|মিছিল|সভা|কর্মসূচি|তদন্ত|দুর্ঘটনা|প্রতিযোগিতা|পুজোয়\s*উপস্থিত|বৈঠক|রক্তদান)/i.test(lower)) {
      return true;
    }
  }

  // Social media conversation prompts, quiz questions & questionnaires
  if (/(?:profession\s*উল্লেখ|তোমরা\s*কারা|কে\s*কে\s*যাবে|কারা\s*কারা\s*(?:গেছ|খেয়েছ|দেখেছ|আছো)|কেমন\s*লাগলো\s*জানাও|কমেন্ট\s*করে\s*জানাও|বলতে\s*পারব[েোনা]|কারা\s*বলতে\s*পারব[েোনা]|কারা\s*চেনো|চিনতে\s*পারছ[েোনা]|কোথায়\s*বলতে|কে\s*কে\s*গেছো|বলুন\s*তো\s*দেখি|চিনতে\s*পারলেন)/i.test(lower)) return true;

  // Conversational train surveys
  if (/তোমরা\s*কারা\s*এই\s*ট্রেন/i.test(lower)) return true;

  // Commercial repairs / servicing / electronics shop ads
  if (/(?:repair|repairing|service\s*centre|service\s*center|home\s*theatre|sound\s*system|সারানো\s*হয়|সারানো\s*হচ্ছে|স্পিকার\s*সারানো|মোবাইল\s*সারানো|we\s*service\s*and\s*repair|all\s*kinds\s*of\s*speakers)/i.test(lower)) return true;

  // Facebook follower shoutouts, milestone celebrations & engagement lists
  if (/(?:shout\s*out\s*to\s*my\s*newest\s*followers|excited\s*to\s*have\s*you\s*onboard|weekly\s*engagement\s*list)/i.test(lower)) return true;
  if (/\b\d+(\.\d+)?k\s*(?:পরিবার|followers|ভালোবাসা)/i.test(lower)) return true;
  if (/(?:লাখ\s*মানুষের\s*কাছে\s*পৌঁছে\s*গেছে|পাশে\s*থাকার\s*জন্য\s*ধন্যবাদ|আপনাদের\s*ভালোবাসাই\s*আমার\s*শক্তি)/i.test(lower)) return true;

  // Commercial beauty parlour, salon, spa, cosmetics or hair treatment ads
  if (/(?:সালোন|স্যালোন|salon|পার্লার|parlour|parlor|বিউটি\s*পার্লার|কেরাটিন|বোটক্স|স্মুদনিং|স্ট্রেটনিং|বোটোপ্লাস্টিয়া|শ্যাম্পু\s*একদম\s*ফ্রি|পাবেন\s*একদম\s*ফ্রি|মাত্র\s*[\d০-৯,]+\s*টাকা|branch\s*locations|main\s*branch)/i.test(lower)) return true;

  // Commercial real estate, warehouse, office, shop, flat, land rental or sales ads
  if (/(?:rent\s*available|ভাড়া\s*হবে|ভাড়ার\s*জন্য|ভাড়ায়\s*পাওয়া\s*যাবে|গোডাউন|sqft|ঘর\s*ভাড়া|দোকান\s*ভাড়া|ফ্ল্যাট\s*বিক্রি|জমি\s*বিক্রি|প্লট\s*বিক্রি|ব্যাংক\s*ভাড়া)/i.test(lower)) return true;

  // Commercial coaching centres, private tuitions, academic admission ads
  if (/(?:অ্যাকাডেমি|একাডেমি|academy|admission\s*open|ভর্তি\s*চলছে|স্পোকেন\s*ইংলিশ|অ্যাবাকাস|টিউশন|কোচিং|আমাদের\s*বিশেষত্ব|আমাদের\s*ঠিকানা.*?যোগাযোগ.*?ফোন)/i.test(lower)) {
    if (!/(?:গ্রেফতার|আটক|পুলিশ|তদন্ত|বিক্ষোভ|ভাঙচুর|উত্তপ্ত|সংঘর্ষ)/i.test(lower)) {
      return true;
    }
  }

  // Pure devotional prayer posts without news event
  if (/(?:জয়\s*শ্রী\s*বজরংবলী|বজরংবলীর\s*মন্দির|শ্রী\s*হনুমানজি|সকলের\s*জীবন\s*ভরে\s*উঠুক|অটুট\s*ভক্তি\s*আমাদের\s*শেখায়|দূর\s*হোক\s*সকল\s*বাধা)/i.test(lower)) {
    if (!/(?:গ্রেফতার|আটক|উদ্বোধন|মিছিল|সভা|তদন্ত|দুর্ঘটনা|প্রতিযোগিতা|পুজোয়\s*উপস্থিত|বৈঠক|রক্তদান)/i.test(lower)) {
      return true;
    }
  }

  if (/^[a-zA-Z0-9\s.,!?:;'"()/\-]+$/.test(t) && !lower.includes('police') && !lower.includes('arrest') && !lower.includes('hospital')) {
    return true;
  }

  // C. Commercial Advertisements & Promotions
  const promoKeywords = [
    'অফার', 'ডিসকাউন্ট', 'সেল', 'কেনাকাটা', 'শপিং', 'প্রাইস', 'দাম মাত্র',
    'মূল্য মাত্র', 'মূল্যঃ', 'দামঃ', 'টাকা মাত্র', '₹', 'store opening',
    'showroom', 'fashion baruipur', 'কালেকশন', 'গার্মেন্টস', 'শাড়ি', 'কুর্তি',
    'পাঞ্জাবি', 'টিশার্ট', 'জিন্স', 'জুতো', 'বুটিক', 'হোম ডেলিভারি', 'যোগাযোগ করুন',
    'বুকিং চলছে', 'অর্ডার করতে', 'ফ্রি ডেলিভারি', 'dm for details', 'whatsapp us',
    'call now', 'discount', 'special offer', 'flat off', 'cash on delivery',
    'flat 50%', 'flat 20%', 'flat 30%', 'buy 1 get 1', 'buy 2 get 1', 'sale',
    'স্টক সীমিত', 'হোলসেল', 'রিটেল', 'শোরুম', 'গ্র্যান্ড ওপেনিং', 'মেগা সেল', 'ধামাকা অফার',
    'জুয়েলার্স', 'গহনা কিনলে', 'সোনার গহনা', 'রুপোর গহনা', 'স্কুটার', 'প্রচার করুন',
    'বিজ্ঞাপন দিন', 'ব্র্যান্ডের প্রচার', 'রেজিস্ট্রেশন করে', 'ট্রেডিং', 'পাইকারি', 'খুচরা',
    'শাড়ির', 'শাড়ি', 'শাড়ী', 'গিফ্ট', 'উপহার', 'পাইকারি দামে', 'শুরু মাত্র', 'টাকা থেকে শুরু',
    'অর্ডার করুন', 'হোম ডেলিভারি', 'cctv', 'camera', 'we install', 'installation', 'enterprise',
    'gift', 'ব্র্যান্ড নিউ', 'পুরনো দামেই', 'ক্যামেরা লাগাতে', 'সার্ভিসিং', 'সারানো হয়',
    'সার্ভিস সেন্টার', 'সার্ভিসিং সেন্টার'
  ];

  const newsKeywords = [
    'গ্রেফতার', 'আটক', 'পুলিশ', 'থানা', 'আইসি', 'এসপি', 'তদন্ত', 'অভিযোগ',
    'মৃত্যু', 'নিহত', 'আহত', 'দুর্ঘটনা', 'অগ্নিকাণ্ড', 'রেল', 'ট্রেন',
    'শিয়ালদহ', 'লোকাল', 'পৌরসভা', 'চেয়ারম্যান', 'ওয়ার্ড', 'নিকাশি',
    'হাসপাতাল', 'চিকিৎসা', 'স্বাস্থ্য', 'বিদ্যালয়', 'কলেজ', 'মাধ্যমিক',
    'উচ্চমাধ্যমিক', 'পরীক্ষা', 'আদালত', 'বিচারক', 'রায়', 'প্রশাসন', 'মহকুমা শাসক',
    'বন্যা', 'বৃষ্টি', 'বিদ্যুৎ', 'পানি', 'জলমগ্ন', 'বিক্ষোভ', 'উদ্ধার', 'বিস্ফোরণ',
    'পুজো', 'পূজা', 'উৎসব', 'রাসমাঠ', 'রক্তদান'
  ];

  let promoScore = 0;
  for (const w of promoKeywords) {
    if (lower.includes(w)) promoScore++;
  }
  let newsScore = 0;
  for (const w of newsKeywords) {
    if (lower.includes(w)) newsScore++;
  }

  if (/(?:call|whatsapp|অর্ডার|বুকিং|যোগাযোগ).*?\b\d{10}\b/i.test(lower)) promoScore += 3;
  if (/(?:₹\s*\d+|\d+\s*\/-|\d+%\s*(?:off|ছাড়))/i.test(lower)) promoScore += 2;
  if (/(?:cctv|we install|camera's|gift & enterprise)/i.test(lower)) promoScore += 3;

  if (promoScore >= 3) return true;
  if (promoScore >= 2 && promoScore > newsScore) return true;
  if (promoScore >= 2 && newsScore <= 1) return true;
  if (promoScore >= 1 && newsScore === 0) return true;
  if (/(?:শাড়ি|শাড়ির|পাইকারি|ডিসকাউন্ট|ট্রেডিং|শোরুম|জুয়েলার্স|অফার|সেল|কেনাকাটা|মূল্য মাত্র|দাম মাত্র|বুকিং চলছে|মাত্র\s*\d+\s*টাকা|cctv|we install)/i.test(lower)) return true;

  return false;
}

// 2. Category detector
function detectCategory(text) {
  const raw = text.split('\n\n[')[0].toLowerCase();
  if (/মেলা|পুজো|পূজো|পূজা|উৎসব|গণেশ|গনেশ|দুর্গা|কালী|কার্তিক|নাটক|সাংস্কৃতিক|খেলা|ফুটবল|ক্রিকেট|টুর্নামেন্ট|রাসমেলা|রাসমাঠ|যাত্রাপালা|সংগীত|রাখি|ঢাকের কাঠি|উওম কুমার|শরৎ|মহালয়া/.test(raw)) return 'culture';
  if (/পৌরসভা|পুরসভা|চেয়ারম্যান|কাউন্সিলর|ওয়ার্ড|নিকাশি|ড্রেন|আবর্জনা|সাফাই|পানীয় জল|রাস্তাঘাট|রাস্তা|ঘাট|আলো|ট্যাক্স|পৌরপ্রধান|পুরপ্রধান|জলমগ্ন/.test(raw)) return 'municipality';
  if (/রেল|ট্রেন|লোকাল|শিয়ালদহ|ক্যানিং|নামখানা|ডায়মন্ড|বারুইপুর জংশন|প্ল্যাটফর্ম|রেলওয়ে|যাত্রী|বগির|(?:রেললাইন|রেলপথ|রেল\s*লাইন|আপ\s*লাইন|ডাউন\s*লাইন)|সিগন্যাল|রেলগেট/.test(raw)) return 'railway';
  if (/হাসপাতাল|স্বাস্থ্য|ডাক্তার|নার্স|চিকিৎসা|রোগী|ওষুধ|ব্লাড ব্যাংক|অ্যাম্বুলেন্স|স্বাস্থ্যকেন্দ্র|স্বাস্থ্যসাথী|মহকুমা হাসপাতাল|অপারেশন|রক্তদান/.test(raw)) return 'health';
  if (/স্কুল|বিদ্যালয়|কলেজ|পড়ুয়া|ছাত্র|ছাত্রী|পরীক্ষা|মাধ্যমিক|উচ্চমাধ্যমিক|শিক্ষক|শিক্ষিকা|সিলেবাস|বৃত্তি|বিশ্ববিদ্যালয়/.test(raw)) return 'education';
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
    const lines = cleaned
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 10 && !/^(?:see\s+all|see\s+more|view\s+more|log\s+in|watch\s+more|sign\s+up)/i.test(l));
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
    .replace(/(?:আপনার\s*ওয়ার্ডে|আপনার\s*এলাকায়|কমেন্টে\s*জানান).*?$/gim, '')
    .replace(/📍.*?$/gim, '')
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

// 7. Scrape a Facebook page with clean comment isolation
async function scrapeFacebookSource(source) {
  const posts = [];
  const cleanTargetUrl = source.url.replace(/\/$/, '');

  try {
    const res = await axios.get(source.url, {
      timeout: 15000,
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
        if (!jsonStr.includes('comet_sections') || !jsonStr.includes('post_id')) continue;
        try {
          const data = JSON.parse(jsonStr);

          function extractStories(obj) {
            if (!obj || typeof obj !== 'object') return [];
            // Strictly block comments and replies
            if (obj.comment_rendering_instance || obj.comments || obj.feedback_target_with_context || obj.comment_list_renderer) return [];

            let found = [];
            if (obj.__typename === 'Story' && obj.post_id) {
              let text = '';
              const msgObj = obj.comet_sections?.content?.story?.message || obj.message;
              if (msgObj && typeof msgObj.text === 'string') text = msgObj.text;

              const mediaImages = new Set();
              function getImgs(o) {
                if (!o || typeof o !== 'object') return;
                if (o.uri && typeof o.uri === 'string' && o.uri.startsWith('http') && !o.uri.includes('emoji') && !o.uri.includes('rsrc.php') && !o.uri.includes('static.xx.fbcdn.net')) {
                  mediaImages.add(o.uri);
                }
                for (const k of Object.keys(o)) {
                  if (k === 'comments' || k === 'feedback' || k === 'feedback_context') continue;
                  getImgs(o[k]);
                }
              }
              getImgs(obj.attachments);
              getImgs(obj.comet_sections?.content?.story?.attachments);

              let videoUrl;
              function getVideo(o) {
                if (!o || typeof o !== 'object') return;
                if (o.playable_url && typeof o.playable_url === 'string') videoUrl = o.playable_url;
                if (o.__typename === 'Video' && o.id) videoUrl = `https://www.facebook.com/watch/?v=${o.id}`;
                for (const k of Object.keys(o)) {
                  if (k === 'comments' || k === 'feedback' || k === 'feedback_context') continue;
                  getVideo(o[k]);
                }
              }
              getVideo(obj.attachments);
              getVideo(obj.comet_sections?.content?.story?.attachments);

              const imagesList = Array.from(mediaImages);
              const hasMedia = imagesList.length > 0 || !!videoUrl;

              // Mandatory Media and Clean Content validation
              if (text && text.trim().length >= 35 && hasMedia) {
                found.push({
                  postId: obj.post_id,
                  text: text.trim(),
                  images: imagesList,
                  videoUrl,
                  creationTime: obj.creation_time
                });
              }
            }

            for (const k of Object.keys(obj)) {
              if (k === 'comments' || k === 'feedback' || k === 'feedback_context') continue;
              found = found.concat(extractStories(obj[k]));
            }
            return found;
          }

          const stories = extractStories(data);
          stories.forEach(s => rawStories.push(s));
        } catch (e) {}
      }

      const seenIds = new Set();
      for (const item of rawStories) {
        if (seenIds.has(item.postId)) continue;
        seenIds.add(item.postId);

        if (isJunkOrCommentOrPromo(item.text)) continue;

        let videoEmbedUrl = item.videoUrl 
          ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.videoUrl)}&show_text=0`
          : undefined;

        posts.push({
          sourceId: source.id,
          sourceName: source.name,
          postId: item.postId,
          content: item.text,
          images: item.images,
          imageUrl: item.images.length > 0 ? item.images[0] : undefined,
          videoUrl: item.videoUrl,
          videoEmbedUrl: videoEmbedUrl,
          originalUrl: `https://www.facebook.com/${item.postId}`,
          publishedAt: item.creationTime ? new Date(item.creationTime * 1000).toISOString() : new Date().toISOString()
        });
      }
    }
  } catch (err) {}

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

// 8. Multi-factor deduplication engine
function normalizeForComparison(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[\s\p{P}\p{Symbol}#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeBengaliWord(w) {
  if (!w || w.length < 2) return w;
  let s = w
    .replace(/\u09C0/g, '\u09BF') // ী -> ি
    .replace(/\u09C2/g, '\u09C1') // ূ -> ু
    .replace(/\u09CE/g, '\u09A4') // ৎ -> ত
    .replace(/\u09DC|\u09DD/g, '\u09A1'); // ড়/ঢ় -> ড
  if (s.length >= 4) {
    s = s.replace(/(?:ে|তে|কে|য়ের|ের|র|টি|টা|দের)$/, '');
  }
  return s;
}

function getComparisonTokens(str) {
  const norm = normalizeForComparison(str);
  const stopWords = new Set(['বারুইপুর', 'এর', 'ও', 'এবং', 'হলো', 'করা', 'হয়েছে', '২০২৬', '2026', 'হতে', 'নিয়ে', 'থেকে', 'একটি', 'এই', 'সেই', 'ছিল', 'হবে', 'করেন', 'বলেন', 'তার', 'জন্য']);
  return norm
    .split(' ')
    .filter(w => w.length >= 2)
    .map(normalizeBengaliWord)
    .filter(w => w.length >= 2 && !stopWords.has(w));
}

function findDuplicateArticle(candidate, existingArticles) {
  const candTitleNorm = normalizeForComparison(candidate.title);
  const candSlug = candidate.slug;
  const candPureContent = (candidate.content || '').split('\n\n[')[0].trim();
  const candContentNorm = normalizeForComparison(candPureContent);
  const candTokens = new Set(getComparisonTokens(candPureContent));
  const candTitleTokens = new Set(getComparisonTokens(candidate.title));
  
  const candPostIdMatch = (candidate.originalUrl || '').match(/(?:posts\/|\?v=|videos\/|reel\/|\/)(\d{8,})/);
  const candPostId = candPostIdMatch ? candPostIdMatch[1] : null;

  for (const existing of existingArticles) {
    // 1. Exact or normalized title match
    const exTitleNorm = normalizeForComparison(existing.title);
    if (candTitleNorm && exTitleNorm && candTitleNorm === exTitleNorm) {
      return { duplicate: true, matchedArticle: existing, reason: 'exact_title' };
    }

    // 2. Slug match
    if (candSlug && existing.slug && candSlug === existing.slug) {
      return { duplicate: true, matchedArticle: existing, reason: 'slug_match' };
    }

    // 3. Title token overlap (shared normalized entities / keywords >= 60%)
    if (candTitleTokens.size >= 3) {
      const exTitleTokens = new Set(getComparisonTokens(existing.title));
      if (exTitleTokens.size >= 3) {
        let titleShared = 0;
        for (const w of candTitleTokens) {
          if (exTitleTokens.has(w)) titleShared++;
        }
        const titleOverlap = titleShared / Math.min(candTitleTokens.size, exTitleTokens.size);
        if (titleOverlap >= 0.60) {
          return { duplicate: true, matchedArticle: existing, reason: 'title_token_overlap' };
        }
      }
    }

    // 4. Original post URL match or Post ID match
    if (candidate.originalUrl && (candidate.originalUrl === existing.originalPostUrl || candidate.originalUrl === existing.sourceUrl)) {
      return { duplicate: true, matchedArticle: existing, reason: 'url_match' };
    }
    if (candPostId) {
      const exPostIdMatch = (existing.originalPostUrl || existing.sourceUrl || '').match(/(?:posts\/|\?v=|videos\/|reel\/|\/)(\d{8,})/);
      if (exPostIdMatch && exPostIdMatch[1] === candPostId) {
        return { duplicate: true, matchedArticle: existing, reason: 'post_id_match' };
      }
    }

    // 5. Content similarity
    const exPureContent = (existing.content || '').split('\n\n[')[0].trim();
    const exContentNorm = normalizeForComparison(exPureContent);

    // Exact content prefix match (first 60 chars)
    if (candContentNorm.length >= 40 && exContentNorm.length >= 40) {
      if (candContentNorm.substring(0, 60) === exContentNorm.substring(0, 60)) {
        return { duplicate: true, matchedArticle: existing, reason: 'content_prefix' };
      }
    }

    // Word token overlap on pure content
    const exTokens = new Set(getComparisonTokens(exPureContent));
    if (candTokens.size >= 10 && exTokens.size >= 10) {
      let shared = 0;
      for (const w of candTokens) {
        if (exTokens.has(w)) shared++;
      }
      const union = candTokens.size + exTokens.size - shared;
      const jaccard = shared / union;
      const minOverlap = shared / Math.min(candTokens.size, exTokens.size);

      if (jaccard >= 0.55 || minOverlap >= 0.70) {
        return { duplicate: true, matchedArticle: existing, reason: 'content_overlap' };
      }
    }
  }

  return { duplicate: false };
}

// 9. Main execution orchestrator
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
      if (isJunkOrCommentOrPromo(p.content)) {
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
  let mediaMergedCount = 0;

  for (const post of synthesizedPosts) {
    const cleaned = cleanBengaliContent(post.content);
    if (!cleaned || cleaned.length < 30) continue;

    // Mandatory Media Requirement: strictly discard posts without media
    const rawImages = post.images || (post.imageUrl ? [post.imageUrl] : []);
    if (rawImages.length === 0 && !post.videoUrl) {
      continue;
    }

    const category = detectCategory(cleaned);
    const categoryBn = CATEGORY_NAMES[category] || 'সব খবর';
    const headline = generateHeadline(cleaned, post.title, post.sourceName);
    const candidateSlug = createSlug(headline);

    // Multi-factor Deduplication Check against existing database articles
    const dupCheck = findDuplicateArticle({
      title: headline,
      slug: candidateSlug,
      content: cleaned,
      originalUrl: post.originalUrl
    }, existingArticles);

    if (dupCheck.duplicate) {
      const existing = dupCheck.matchedArticle;
      console.log(`🔁 ডুপ্লিকেট শনাক্ত (${dupCheck.reason}): "${headline.substring(0, 35)}..." -> পূর্ববর্তী: "${existing.title.substring(0, 35)}..."`);

      // Merge media if candidate post has additional photos or videos
      let mediaUpdated = false;
      if (rawImages.length > 0) {
        const exImages = new Set(existing.images || (existing.imageUrl ? [existing.imageUrl] : []));
        for (const imgUri of rawImages) {
          if (!exImages.has(imgUri)) {
            const local = await downloadImageLocally(imgUri);
            if (local && !exImages.has(local)) {
              exImages.add(local);
              mediaUpdated = true;
            }
          }
        }
        if (mediaUpdated) {
          existing.images = Array.from(exImages);
          if (!existing.imageUrl || existing.imageUrl.includes('placeholder')) {
            existing.imageUrl = existing.images[0];
          }
        }
      }

      if (!existing.videoUrl && post.videoUrl) {
        existing.videoUrl = post.videoUrl;
        existing.videoEmbedUrl = post.videoEmbedUrl;
        mediaUpdated = true;
      }

      if (mediaUpdated) {
        mediaMergedCount++;
        console.log(`   📸 পূর্ববর্তী পোস্টে নতুন ছবি/ভিডিও সংযুক্ত করা হয়েছে।`);
      }

      continue;
    }

    // Download all attached images locally
    const downloadedImages = [];
    for (const imgUri of rawImages) {
      const local = await downloadImageLocally(imgUri);
      if (local) downloadedImages.push(local);
    }

    const primaryImage = downloadedImages.length > 0 ? downloadedImages[0] : '';
    if (!primaryImage && !post.videoUrl) {
      continue;
    }

    const enriched = enrichContentWithContext(headline, cleaned, category);
    const summary = enriched.length > 180 ? enriched.substring(0, 175) + '...' : enriched;
    const articleId = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

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
      imageUrl: primaryImage,
      images: downloadedImages,
      videoUrl: post.videoUrl,
      videoEmbedUrl: post.videoEmbedUrl,
      publishedAt: post.publishedAt || new Date().toISOString(),
      isBreaking: category === 'railway' || category === 'crime',
      isFeatured: downloadedImages.length > 2,
      status: 'published',
      views: Math.floor(Math.random() * 50) + 10,
      crawlHash: crypto.createHash('md5').update(cleaned.substring(0, 100)).digest('hex')
    };

    existingArticles.unshift(article);
    newPublishedCount++;
  }

  // Save updated database
  rawDb.articles = existingArticles;
  rawDb.sources = sources;

  const logMsg = `বিগত ${daysBack} দিনের ${sources.length}টি ফেসবুক উৎস স্ক্যান সম্পন্ন। মোট পোস্ট সংগ্রহ: ${allRawPosts.length}, সমন্বয়ের পর: ${synthesizedPosts.length}, নতুন প্রকাশিত সংবাদ: ${newPublishedCount} টি।`;
  rawDb.crawlLogs = rawDb.crawlLogs || [];
  rawDb.crawlLogs.unshift({
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString(),
    sourceId: `multi-${sources.length}-sources`,
    sourceName: `${sources.length}টি ফেসবুক পেজ ও গ্রুপ`,
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

  // Regenerate SEO assets (sitemaps, RSS feed, llms.txt)
  try {
    console.log('📄 এসইও অ্যাসেট (Sitemap, RSS, llms.txt) পুনর্নির্মাণ করা হচ্ছে...');
    execSync('node scripts/generate-seo-assets.js', { stdio: 'inherit' });
  } catch (seoErr) {
    console.warn('⚠️ SEO asset generation warning:', seoErr.message);
  }

  // Push to GitHub so GitHub Actions deploys live to cPanel!
  if (!process.env.GITHUB_ACTIONS) {
    console.log('🌐 গিটহাবে পুশ ও লাইভ cPanel ডিপ্লয়মেন্ট শুরু হচ্ছে...');
    try {
      try {
        execSync('git pull --rebase origin main', { stdio: 'inherit' });
      } catch (e) {}
      execSync('git add src/data/news_data.json public/ public/images/crawled/ src/ scripts/', { stdio: 'inherit' });
      const commitMsg = `Sync today's news from ${sources.length} Facebook sources (${newPublishedCount} new articles)`;
      try {
        execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
      } catch (e) {
        console.log('ℹ️ No changes to commit.');
      }
      try {
        execSync('git pull --rebase origin main', { stdio: 'inherit' });
      } catch (e) {}
      const token = process.env.GITHUB_TOKEN;
      const pushCmd = token 
        ? `git -c credential.helper= push https://subhraanil:${token}@github.com/subhraanil/baruipur.git main`
        : 'git push origin main';
      execSync(pushCmd, { stdio: 'inherit' });
      console.log('✅ গিটহাবে সফলভাবে পুশ সম্পন্ন! cPanel লাইভ সাইট স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে।');
    } catch (gitErr) {
      console.warn('⚠️ গিট অপারেশনের সময় সতর্কতা:', gitErr.message);
    }
  }

  // Auto-submit updated URLs to Google Indexing API
  if (newPublishedCount > 0) {
    try {
      console.log('🚀 নতুন পোস্টগুলি গুগল সার্চ কনসোলে ইনডেক্সিং এর জন্য পাঠানো হচ্ছে...');
      execSync('node scripts/submit-indexing.js', { stdio: 'inherit' });
    } catch (idxErr) {
      console.warn('⚠️ গুগল ইনডেক্সিং সাবমিশনে সতর্কতা:', idxErr.message);
    }
  }
}

runWorkflow().catch(err => {
  console.error('❌ ত্রুটি:', err);
  process.exit(1);
});
