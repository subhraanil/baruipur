const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২১ নভেম্বর ২০২৬ সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================\n');

// 1. UPDATE & POLISH NEWS ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
const articles = newsData.articles || newsData;

const polishedNov21Articles = [
  {
    id: 'art-1795243899813-mcw3',
    slug: 'baruipur-ward-1-sheetla-mandir-trust-jagaddhatri-puja-2026',
    title: 'বারুইপুর ১নং ওয়ার্ডের শীতলামন্দির ট্রাস্ট কমিটির জগদ্ধাত্রী পূজা ২০২৬: মহাসমারোহে পুজো ও বর্ণাঢ্য আলোকসজ্জা, ভক্তদের বিপুল সমাগম',
    titleEn: 'Baruipur Ward 1 Sheetla Mandir Trust Jagaddhatri Puja 2026 Celebrated with Religious Grandeur and Devotional Gathering',
    summary: 'বারুইপুর পুরসভার ১ নম্বর ওয়ার্ডের ঐতিহ্যবাহী শীতলামন্দির ট্রাস্টের উদ্যোগে মহাসমারোহে অনুষ্ঠিত হলো শ্রীশ্রী জগদ্ধাত্রী পূজা। এলাকা জুড়ে চোখধাঁধানো আলোকসজ্জা ও অন্নকূট উৎসব।',
    category: 'culture',
    categoryBn: 'উৎসব ও সংস্কৃতি',
    status: 'published',
    source: 'Heritage Baruipur Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-ward-1-sheetla-mandir-trust-jagaddhatri-puja-2026',
    author: 'সাংস্কৃতিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-21T11:00:00+05:30',
    date: '২১ নভেম্বর, ২০২৬',
    time: 'সকাল ১১:০০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/ab72e307a1d9e746879c157289edb14e.jpg',
      '/images/crawled/e35fd3f1f1d9a4f95e12827d6d790e7f.jpg',
      '/images/crawled/605ec96acae1370eaabfe1c8f4d14c29.jpg'
    ],
    views: 480,
    likes: 45,
    shares: 32,
    tags: ['বারুইপুর', 'জগদ্ধাত্রী পূজা', 'শীতলামন্দির', 'ওয়ার্ড ১', 'লোকউৎসব', 'ঐতিহ্য'],
    content: `দক্ষিণ ২৪ পরগনার বারুইপুর পুরসভার ১ নম্বর ওয়ার্ডের সুপ্রাচীন ও ঐতিহ্যমণ্ডিত শীতলামন্দির প্রাঙ্গণে ট্রাস্ট কমিটির পরিচালনায় মহাসমারোহে উদযাপিত হলো বাৎসরিক শ্রীশ্রী জগদ্ধাত্রী পূজা ২০২৬। প্রতি বছরের ন্যায় এ বছরও শাস্ত্রীয় নিয়ম নিষ্ঠা ও ভক্তিমূলক ভাবগাম্ভীর্যের মধ্য দিয়ে দেবী জগদ্ধাত্রীর চার প্রহরের বিশেষ পূজা অনুষ্ঠিত হয়।

মন্দির চত্বর ও সংলগ্ন সড়কগুলিকে চন্দননগরের এলইডি আলোর কারুকার্যে সাজিয়ে তোলা হয়েছে। নবমীর পুণ্যলগ্নে সকাল থেকেই বহু দূর-দূরান্তের গ্রাম ও পুর এলাকা থেকে ভক্তরা দেবীর চরণে অঞ্জলি ও ডালা নিবেদন করতে মন্দিরে ভিড় জমান। বাৎসরিক পূজা উপলক্ষে সহস্রাধিক ভক্তের মাঝে মায়ের পবিত্র ভোগ ও খিচুড়ি প্রসাদ বিতরণ করা হয়।

ট্রাস্ট কমিটির কর্মকর্তারা জানান, এলাকার সার্বিক শান্তি ও সমৃদ্ধি কামনায় এই পূজার আয়োজন করা হয়। সন্ধ্যার আরতির পর স্থানীয় শিল্পীদের পরিবেশনায় ভক্তিগীতি ও সাংস্কৃতিক অনুষ্ঠান অনুষ্ঠিত হয়। মেলা ও মন্দির চত্বরে শৃঙ্খলা রক্ষায় মন্দির কমিটির স্বেচ্ছাসেবক ও স্থানীয় পুলিশের বিশেষ নজরদারি ছিল।`
  },
  {
    id: 'art-1795243893261-x0fm',
    slug: 'baruipur-puratan-bazar-traders-36th-year-jagaddhatri-puja-celebration',
    title: 'বারুইপুর পুরাতন বাজার ব্যবসায়ী বৃন্দের ৩৬তম বর্ষের জগদ্ধাত্রী পূজা: সাবেকিয়ানার সাজে দেবীমূর্তি ও বিশেষ প্রসাদ বিতরণ',
    titleEn: '36th Jagaddhatri Puja by Baruipur Puratan Bazar Traders Association Celebrated with Devotion and Traditional Decor',
    summary: 'বারুইপুরের প্রাচীনতম বাণিজ্যিক কেন্দ্র পুরাতন বাজারের ব্যবসায়ী বৃন্দের উদ্যোগে ৩৬তম বর্ষের শ্রীশ্রী জগদ্ধাত্রী পূজা অনুষ্ঠিত হলো সাড়ম্বরে। সাবেকিয়ানা ও স্থানীয় সৌহার্দ্যের মেলবন্ধন।',
    category: 'culture',
    categoryBn: 'উৎসব ও সংস্কৃতি',
    status: 'published',
    source: 'Market Watch / Cultural Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-puratan-bazar-traders-36th-year-jagaddhatri-puja-celebration',
    author: 'বারুইপুর বার্তা ডেস্ক',
    published_at: '2026-11-21T10:15:00+05:30',
    date: '২১ নভেম্বর, ২০২৬',
    time: 'সকাল ১০:১৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/2beca0fe3e94c2c7083cf856472829cb.jpg'
    ],
    views: 420,
    likes: 38,
    shares: 25,
    tags: ['বারুইপুর', 'পুরাতন বাজার', 'জগদ্ধাত্রী পূজা', 'ব্যবসায়ী সমিতি', 'সাবেকিয়ানা'],
    content: `বারুইপুর পুরাতন বাজারের প্রাণকেন্দ্রে ব্যবসায়ী সমিতির পরিচালনায় ৩৬তম বর্ষের শ্রীশ্রী জগদ্ধাত্রী পূজা বিপুল উৎসাহ ও উদ্দীপনার সঙ্গে উদযাপিত হলো। বারুইপুর মহকুমার অন্যতম প্রাচীন বাণিজ্যিক কেন্দ্র এই পুরাতন বাজার, যেখানে ব্যবসায়ীদের কল্যাণ ও আর্থিক সমৃদ্ধি কামনায় দীর্ঘ তিন দশকেরও বেশি সময় ধরে এই পূজার ঐতিহ্য অক্ষুণ্ণ রাখা হয়েছে।

এ বছরের পূজা মণ্ডপ ও প্রতিমায় বজায় রাখা হয়েছে নিখাদ সাবেকিয়ানা। ডাকের সাজে সজ্জিত দেবী প্রতিমা দেখতে আশপাশের ওয়ার্ডগুলি থেকেও দর্শনার্থীদের আনাগোনা লক্ষ্য করা যায়। ব্যবসায়ী সমিতির উদ্যোগে দুস্থ মানুষের মাঝে বস্ত্র বিতরণ ও পুজো প্রাঙ্গণে আগত সকলের মধ্যে মহাপ্রসাদ বিতরণ করা হয়।

সমিতির সম্পাদক জানান, "ব্যবসায়িক ব্যস্ততার মধ্যেও প্রতি বছর এই দিনটিতে বাজারের সমস্ত ব্যবসায়ী ভাইয়েরা একজোট হয়ে মায়ের আরাধনায় মেতে ওঠেন। এই সৌহার্দ্য ও সম্প্রীতিই আমাদের বাজারের মূল শক্তি।" উৎসব নির্বিঘ্নে সম্পন্ন করতে বারুইপুর থানার পুলিশ সার্বক্ষণিক নজরদারিতে ছিল।`
  },
  {
    id: 'art-1795243901089-nq8v',
    slug: 'continuous-rain-baruipur-waterlogging-station-road-civic-drainage-pumps',
    title: 'টানা অসময়ের বৃষ্টিতে বারুইপুরে স্বাভাবিক জনজীবন ব্যাহত: স্টেশন রোড ও নিচু ওয়ার্ডগুলিতে জল জমার ভোগান্তি, নামানো হলো পাম্প',
    titleEn: 'Unseasonal Continuous Rain Disrupts Normal Life in Baruipur: Waterlogging on Station Road & Low-Lying Wards, Pumps Deployed',
    summary: 'ঘূর্ণিঝড় আকভানের প্রভাবে দক্ষিণ ২৪ পরগনায় অবিরাম ঝিরিঝিরি বৃষ্টি। বারুইপুর স্টেশন মোড়, কাছারি বাজার ও রেলগেট সংযোগস্থলে জল জমে যান চলাচলে বিঘ্ন। দ্রুত জল সরাতে সক্রিয় পুর প্রশাসন।',
    category: 'municipality',
    categoryBn: 'পৌরসভা ও স্থানীয় খবর',
    status: 'published',
    source: 'Baruipur Civic Watch',
    sourceUrl: 'https://baruipur.online/news/continuous-rain-baruipur-waterlogging-station-road-civic-drainage-pumps',
    author: 'নাগরিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-21T09:30:00+05:30',
    date: '২১ নভেম্বর, ২০২৬',
    time: 'সকাল ০৯:৩০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/97ac1671eb623e29b7631dfa5d7577be.jpg',
      '/images/crawled/2ef8a5c2abe2e66b86c56a533149bbb8.jpg'
    ],
    views: 510,
    likes: 34,
    shares: 28,
    tags: ['বারুইপুর', 'বৃষ্টিপাত', 'জলমগ্নতা', 'স্টেশন রোড', 'পুর পরিষেবা', 'ড্রেনেজ পাম্প'],
    content: `শীতের প্রাক্কালে বঙ্গোপসাগরের ঘূর্ণিঝড় আকভানের অবশিষ্টাংশের প্রভাবে গত চব্বিশ ঘণ্টা ধরে বারুইপুর ও সংলগ্ন দক্ষিণ ২৪ পরগনার বিস্তীর্ণ অঞ্চলে চলছে একটানা মেঘলা আকাশ ও মাঝারি থেকে ভারী বৃষ্টিপাত। অসময়ের এই বৃষ্টিতে মহকুমার স্বাভাবিক জনজীবনে চরম ব্যাঘাত সৃষ্টি হয়েছে।

বৃষ্টির কারণে বারুইপুর স্টেশন রোড, কাছারি বাজার মোড় এবং রেলগেটের সংযোগস্থলে বেশ কিছু অংশে নিকাশি নালা উপচে জল জমে যায়। এর ফলে সকাল থেকেই অটো, টোটো ও পথচারীদের যাতায়াতে চরম সমস্যা দেখা দেয়। বিশেষ করে অফিসযাত্রী ও নিত্যযাত্রীদের স্টেশনে পৌঁছাতে গিয়ে বেশ দুর্ভোগ পোহাতে হয়।

পরিস্থিতি মোকাবিলায় পুরসভা ও মহকুমা প্রশাসনের পক্ষ থেকে দ্রুত পদক্ষেপ নেওয়া হয়েছে। নিচু এলাকা ও ওয়ার্ডগুলির জল দ্রুত প্রধান আদি গঙ্গা ক্যানেল ও কালভার্টে ফেলার জন্য একাধিক শক্তিশালী ডিজেল চালিত ড্রেনেজ পাম্প নামানো হয়েছে। পুর আধিকারিকরা জানিয়েছেন, সমস্ত ড্রেনের মুখ থেকে আবর্জনা ও প্লাস্টিক সরিয়ে জল নিষ্কাশন প্রক্রিয়া স্বাভাবিক রাখা হচ্ছে।`
  },
  {
    id: 'art-20261121-municipality-administrator-takeover',
    slug: 'baruipur-municipality-administrator-board-takes-charge-sdo-civic-services-2026',
    title: 'বারুইপুর পুরসভায় প্রশাসক মণ্ডলীর আনুষ্ঠানিক দায়িত্ব গ্রহণ: মহকুমা শাসকের নেতৃত্বে পরিষেবা সচল রাখার বার্তা, পানীয় জল ও নিকাশিতে বিশেষ জোর',
    titleEn: 'Administrator Board Formally Takes Charge at Baruipur Municipality under SDO Leadership: Focus on Drinking Water & Drainage',
    summary: 'পুরবোর্ড ভেঙে যাওয়ার পর রাজ্য পুর ও নগরোন্নয়ন দপ্তরের নির্দেশে বারুইপুর পুরসভার দায়িত্ব নিল মহকুমা শাসক (SDO)-এর নেতৃত্বাধীন প্রশাসক কমিটি। নাগরিক পরিষেবা যাতে কোনোভাবেই বিঘ্নিত না হয়, তার আশ্বাস প্রশাসনের।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও পুর পরিষেবা',
    status: 'published',
    source: 'District Administration Bureau',
    sourceUrl: 'https://baruipur.online/news/baruipur-municipality-administrator-board-takes-charge-sdo-civic-services-2026',
    author: 'প্রশাসনিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-21T08:45:00+05:30',
    date: '২১ নভেম্বর, ২০২৬',
    time: 'সকাল ০৮:৪৫',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/ea2fed3815bf6d274d7fe1608c031eef.jpg'
    ],
    views: 640,
    likes: 52,
    shares: 39,
    tags: ['বারুইপুর পুরসভা', 'প্রশাসক বোর্ড', 'এসডিও বারুইপুর', 'নাগরিক পরিষেবা', 'পানীয় জল', 'নিকাশি'],
    content: `মেয়াদ শেষের আগেই বারুইপুর পুরবোর্ড ভেঙে দেওয়া ও চেয়ারম্যানের পদত্যাগের পর রাজ্য সরকারের পুর ও নগরোন্নয়ন দপ্তরের বিজ্ঞপ্তি মোতাবেক বারুইপুর পুরসভার কার্যনির্বাহী দায়িত্ব আনুষ্ঠানিকভাবে গ্রহণ করল বিশেষ প্রশাসক মণ্ডলী। বারুইপুরের মহকুমা শাসক (SDO)-এর নেতৃত্বে গঠিত এই প্রশাসক দল আজ পুরভবনে সমস্ত বিভাগীয় প্রধানদের নিয়ে এক উচ্চপর্যায়ের সমন্বয় বৈঠক সম্পন্ন করে।

বৈঠক শেষে প্রশাসক কমিটির প্রধান স্পষ্ট জানিয়েছেন, রাজনৈতিক পরিবর্তনের কারণে শহরের ১৭টি ওয়ার্ডের সাধারণ নাগরিক পরিষেবায় এক মুহূর্তের জন্যও কোনো ছেদ পড়তে দেওয়া হবে না। পানীয় জল সরবরাহ, দৈনিক জঞ্জাল নিষ্কাশন, স্ট্রিট লাইট মেরামত, ডেঙ্গু ও ম্যালেরিয়া নিয়ন্ত্রণ এবং বার্থ-ডেথ সার্টিফিকেট প্রদানের কাজ সম্পূর্ণ স্বাভাবিক গতিতে চালু থাকবে।

সম্প্রতি অসময়ের বৃষ্টির কারণে শহরের বিভিন্ন ওয়ার্ডে জমা জল দ্রুত নিষ্কাশনে ইঞ্জিনিয়ারিং ও সাফাই বিভাগকে ২৪ ঘণ্টা সজাগ থাকার নির্দেশ দেওয়া হয়েছে। এছাড়া আসন্ন রাসমেলা উপলক্ষে শহরের রাস্তাঘাট সংস্কার ও ট্রাফিক ব্যবস্থাপনা নির্বিঘ্ন রাখতে পুলিশ ও প্রশাসনের সঙ্গে নিয়মিত সমন্বয় বজায় রাখা হবে বলে জানানো হয়েছে। সাধারণ নাগরিকরা যেকোনো জরুরি সমস্যার জন্য পুরভবনের কেন্দ্রীয় হেল্পলাইনে যোগাযোগ করতে পারবেন।`
  }
];

polishedNov21Articles.forEach(pa => {
  const idx = articles.findIndex(a => a.id === pa.id);
  if (idx !== -1) {
    articles[idx] = { ...articles[idx], ...pa };
    console.log(`✓ Updated & published: ${pa.title.substring(0, 50)}...`);
  } else {
    articles.unshift(pa);
    console.log(`✓ Inserted & published: ${pa.title.substring(0, 50)}...`);
  }
});

// Prune useless non-news / spam drafts from crawl
const spamDraftIds = [
  'art-1795243904776-e52s', // ব্যারাকপুর
  'art-1795243902112-pwa3', // ঘাটের অবস্থান
  'art-1795243901743-1e6g', // ঘূর্ণি ঝড় ধেয়ে আসছে
  'art-1795243901615-wnhx', // কোন স্কুলের স্টুডেন্ট তুমি
  'art-1795243901484-7bsh', // এই বৃষ্টিতে অফিস ছুটি
  'art-1795243900024-anyi', // পুরনো সোয়েটারকে টাটা
  'art-1795243890582-wz4m', // যোগাযোগ ও ভর্তি
  'art-1795243890206-01jn'  // দীঘা সমুদ্রে পর্যটক
];

const initialCount = articles.length;
newsData.articles = articles.filter(a => !spamDraftIds.includes(a.id));
console.log(`✓ Pruned ${initialCount - newsData.articles.length} spam/out-of-area drafts. Total articles: ${newsData.articles.length}`);

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf-8');
console.log('✓ Saved news_data.json\n');


// 2. UPDATE NOTICES DATA
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));
const newNotice = {
  id: 'not-bm-2026-1121-drainage-pumping',
  memoNo: 'Memo No: 975/BM/DRAINAGE-WATERLOGGING/2026',
  title: 'অসময়ের ভারী বৃষ্টিতে পুর এলাকার নিচু ওয়ার্ডগুলিতে জল নিষ্কাশনে আপৎকালীন পাম্পিং স্টেশন চালুকরণ সংক্রান্ত জরুরি বিজ্ঞপ্তি',
  titleEn: 'Emergency Notice on Operationalization of Drainage Pumps for Waterlogged Low-Lying Wards under Baruipur Municipality',
  departmentId: 'municipality',
  departmentName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
  publishedDate: '2026-11-21',
  publishedDateFormatted: '২১ নভেম্বর, ২০২৬',
  category: 'পৌর পরিষেবা ও নিকাশি',
  isUrgent: true,
  summary: 'ঘূর্ণিঝড় আকভান ও নিম্নচাপজনিত টানা বৃষ্টির জেরে পুর এলাকার ৩, ৪, ৯ ও ১২ নম্বর ওয়ার্ডে জল নিষ্কাশনে অতিরিক্ত ডিজেল পাম্প সক্রিয় ও ২৪ ঘণ্টা সাফাই কন্ট্রোল রুম সংক্রান্ত বিজ্ঞপ্তি।',
  content: `গত ২৪ ঘণ্টায় বারুইপুর পুরসভা ও সংলগ্ন অঞ্চলে একটানা ভারী বৃষ্টিপাতের ফলে পুর এলাকার কয়েকটি নিচু ওয়ার্ড ও প্রধান নিকাশি ড্রেনে সাময়িক জলমগ্নতা দেখা দিয়েছে। এই পরিস্থিতি দ্রুত নিয়ন্ত্রণে পৌর প্রশাসক মণ্ডলীর নির্দেশে নিম্নলিখিত ব্যবস্থা গ্রহণ করা হয়েছে:\n\n১. ওয়ার্ড ৩, ৪, ৯, ১১ ও ১২ নম্বরের সংযোগকারী মূল কালভার্টগুলিতে অতিরিক্ত ডিজেল চালিত উচ্চ ক্ষমতাসম্পন্ন সাকশন পাম্প নামিয়ে জল নামানোর কাজ যুদ্ধকালীন তৎপরতায় চলছে।\n২. সমস্ত খোলা ড্রেন ও পুলিয়া থেকে প্লাস্টিক, থার্মোকল ও আবর্জনা অপসারণের জন্য স্পেশাল কুইক রেসপন্স টিম গঠন করা হয়েছে।\n৩. বাসিন্দাদের কোনো বাড়ির সীমানায় বা গলিপথে জল জমে থাকলে পৌর কন্ট্রোল রুমে (০৩৩-২৪৩৩-xxxx) অবিলম্বে যোগাযোগ করতে অনুরোধ জানানো হচ্ছে।\n৪. নিকাশি ড্রেনে কোনো ধরনের শক্ত বর্জ্য বা পলিথিন না ফেলার জন্য নাগরিকদের পুনরায় বিশেষভাবে সতর্ক করা হচ্ছে। পৌরসভা পরিস্থিতি স্বাভাবিক রাখতে নিরবচ্ছিন্নভাবে কাজ করে চলেছে।`,
  pdfUrl: 'https://s24pgs.gov.in/notice/',
  pdfSize: '495 KB',
  signatory: 'পৌর নির্বাহী আধিকারিক (Executive Officer), বারুইপুর পৌরসভা',
  status: 'active',
  sourceUrl: 'https://s24pgs.gov.in/notice/',
  sourcePortalName: 's24pgs.gov.in (বারুইপুর পৌরসভা)'
};

noticesData.notices = noticesData.notices.filter(n => n.id !== newNotice.id);
noticesData.notices.unshift(newNotice);
noticesData.lastUpdated = '2026-11-21';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✓ Added Notice: ${newNotice.memoNo} - ${newNotice.title.substring(0, 50)}...`);
console.log(`✓ Total notices: ${noticesData.notices.length}\n`);


// 3. UPDATE TENDERS DATA
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));
const newTender = {
  id: 'ten-sdh-2026-1121-fire-safety',
  nitNumber: 'WBHSD/SDH-BRP/NIT-07/FIRE-SAFETY/2026',
  title: 'বারুইপুর মহকুমা হাসপাতালের ইনডোর, এসএনসিইউ (SNCU) ও ডায়ালিসিস ইউনিটে ফায়ার অ্যালার্ম ও অটোমেটিক স্প্রিংকলার সিস্টেম সংস্কার ও বার্ষিক রক্ষণাবেক্ষণ',
  titleEn: 'Comprehensive Maintenance and Repair of Fire Detection, Alarm & Automatic Sprinkler System at Baruipur Sub-Divisional Hospital',
  authorityId: 'hospital',
  authorityName: 'বারুইপুর মহকুমা হাসপাতাল (Baruipur SDH)',
  department: 'স্বাস্থ্য ও পরিবার কল্যাণ দপ্তর, পশ্চিমবঙ্গ সরকার',
  location: 'বারুইপুর মহকুমা হাসপাতাল প্রাঙ্গণ, দক্ষিণ ২৪ পরগনা',
  category: 'অগ্নি-সুরক্ষা পরিকাঠামো (Fire Safety)',
  estimatedValue: '₹১৪,৬০,০০০',
  estimatedValueNum: 1460000,
  emdAmount: '₹২৯,২০০',
  tenderFee: '₹১,০০০',
  publishDate: '২০২৬-১১-২১',
  closingDate: '২০২৬-১২-১২',
  bidOpeningDate: '২০২৬-১২-১৫',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBHSD/SDH-BRP/NIT-07/FS/2026',
  eligibility: 'সরকারি হাসপাতাল বা স্বাস্থ্যকেন্দ্রে ফায়ার ফাইটিং, হিট অ্যান্ড স্মোক ডিটেকশন ও স্প্রিংকলার সিস্টেম ইনস্টলেশন ও রক্ষণাবেক্ষণে ৩ বছরের অভিজ্ঞতাসম্পন্ন লাইসেন্সপ্রাপ্ত সংস্থা।',
  sourcePortalName: 'wbtenders.gov.in'
};

tendersData.tenders = tendersData.tenders.filter(t => t.id !== newTender.id);
tendersData.tenders.unshift(newTender);
tendersData.lastUpdated = '2026-11-21';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✓ Added Tender: ${newTender.nitNumber} - ${newTender.title.substring(0, 50)}...`);
console.log(`✓ Total tenders: ${tendersData.tenders.length}\n`);


// 4. UPDATE BUY & SALES (PROPERTIES DATA)
const propertiesData = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf-8'));
const newProperty = {
  id: "prop-brp-035",
  title: "বারুইপুর রেলগেট ও স্টেশন চত্বর সংলগ্ন ১,০৫০ বর্গফুট রেডি ২ বিএইচকে সাউথ-ফেসিং ফ্ল্যাট বিক্রয় (লিফট ও সিসিটিভি সহ)",
  titleEn: "1,050 SqFt Ready 2 BHK South-Facing Flat near Baruipur Railgate & Railway Junction with Lift & CCTV",
  category: "new_flat",
  categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
  location: "মাস্টারপাড়া, রেলগেট সংলগ্ন, বারুইপুর পুর এলাকা",
  locationArea: "Railgate / Masterpara",
  price: "₹২৮.৫০ লক্ষ (সহজ ব্যাংক কিস্তি সুবিধা)",
  priceNum: 2850000,
  priceUnit: "total",
  configuration: "2 BHK (১,০৫০ বর্গফুট সুপার বিল্ট-আপ) + ১টি খোলামেলা ব্যালকনি + ২টি বাথরুম",
  areaSqFt: "১,০৫০ বর্গফুট",
  facing: "দক্ষিণ-পশ্চিম মুখী (খোলামেলা ও আলোময়)",
  floorInfo: "২য় তলা (G+4 আধুনিক রেসিডেনশিয়াল বিল্ডিং)",
  possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
  reraStatus: "WB RERA ও পৌর কমপ্লিশন সার্টিফিকেট প্রাপ্ত",
  approvalStatus: "বারুইপুর পুরসভা অনুমোদিত বৈধ আবাসিক বিল্ডিং নকশা",
  bankLoanApproved: "SBI, PNB ও HDFC থেকে ৮০%-৮৫% লোন অনুমোদিত",
  amenities: [
    "অটোমেটিক লিফট ও নিরবচ্ছিন্ন ২৪ ঘণ্টা সাইলেন্ট জেনারেটর ব্যাকআপ",
    "নিরাপত্তার জন্য সার্বক্ষণিক সিসিটিভি ক্যামেরা ও ইন্টারকম",
    "টু-হুইলার ও ফোর-হুইলার পার্কিং এর সুব্যবস্থা",
    "বারুইপুর রেলওয়ে স্টেশন ও লোকাল বাজার থেকে মাত্র ৩ মিনিটের হাঁটা পথ"
  ],
  description: "বারুইপুর রেলগেট ও মাস্টারপাড়ায় প্রধান সংযোগ সড়কের সন্নিকটে অবস্থিত সম্পূর্ণ রেডি ১,০৫০ বর্গফুটের ২ বিএইচকে ফ্ল্যাট। প্রিমিয়াম ফ্লোরিং, আধুনিক বাথরুম ফিটিংস এবং খোলামেলা ব্যালকনি। নিত্যযাত্রী ও ছোট পরিবারের জন্য যাতায়াতের অতুলনীয় সুবিধা।",
  imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
  images: [
    "/images/baruipur-real-estate-flats-guide.jpg"
  ],
  featured: true,
  contactPerson: "পিনাকী ভট্টাচার্য (মাস্টারপাড়া রিয়েল এস্টেট)",
  contactPhone: "+91 94331 44520",
  contactWhatsapp: "+91 94331 44520",
  publishedAt: "২০২৬-১১-২১"
};

const propList = propertiesData.properties ? propertiesData.properties : propertiesData;
const filteredProps = propList.filter(p => p.id !== newProperty.id);
filteredProps.unshift(newProperty);

if (propertiesData.properties) {
  propertiesData.properties = filteredProps;
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(propertiesData, null, 2), 'utf-8');
} else {
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(filteredProps, null, 2), 'utf-8');
}
console.log(`✓ Added Property: ${newProperty.id} - ${newProperty.title.substring(0, 50)}...`);
console.log(`✓ Total properties: ${filteredProps.length}\n`);

console.log('🎉 ২১ নভেম্বর সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
