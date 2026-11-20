const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২০ নভেম্বর ২০২৬ (রাত) সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================\n');

// 1. UPDATE & POLISH NEWS ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
const articles = newsData.articles || newsData;

const polishedNov20Articles = [
  {
    id: 'art-1795194058355-ay0f',
    slug: 'cyclone-akvan-impact-baruipur-rasmath-diamond-circus-opening-postponed-weather-alert',
    title: 'বঙ্গোপসাগরে ঘূর্ণিঝড় \'আকভান\'-এর প্রভাবে বারুইপুরে দুর্যোগ সতর্কতা: রাস মাঠের ডায়মন্ড সার্কাসের উদ্বোধন স্থগিত, সর্বত্র নজরদারি',
    titleEn: 'Cyclone Akvan Threat over Bay of Bengal: Weather Alert across Baruipur, Diamond Circus Opening at Rasmath Postponed',
    summary: 'উপকূলীয় দক্ষিণ ২৪ পরগনায় দুর্যোগপূর্ণ আবহাওয়া ও ভারী বৃষ্টির পূর্বাভাস। দর্শকদের নিরাপত্তা ও মেলার পরিকাঠামো বাঁচাতে বারুইপুর রাস মাঠের ডায়মন্ড সার্কাসের উদ্বোধন পিছিয়ে দিল কর্তৃপক্ষ। ২৪ ঘণ্টার কন্ট্রোল রুম চালু।',
    category: 'municipality',
    categoryBn: 'আবহাওয়া ও পুর পরিষেবা',
    status: 'published',
    source: 'Baruipur Barta / Weather Alert Desk',
    sourceUrl: 'https://baruipur.online/news/cyclone-akvan-impact-baruipur-rasmath-diamond-circus-opening-postponed-weather-alert',
    author: 'বারুইপুর বার্তা ডেস্ক',
    published_at: '2026-11-20T21:15:00+05:30',
    date: '২০ নভেম্বর, ২০২৬',
    time: 'রাত ০৯:১৫',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/1466ab9adfd2a521be6e920a3f8ba959.jpg'
    ],
    views: 520,
    likes: 42,
    shares: 36,
    tags: ['বারুইপুর', 'ঘূর্ণিঝড় আকভান', 'আবহাওয়া সতর্কতা', 'রাস মাঠ', 'ডায়মন্ড সার্কাস', 'বৃষ্টিপাত', 'দক্ষিণ ২৪ পরগনা'],
    content: `বঙ্গোপসাগরে সৃষ্ট তীব্র ঘূর্ণিঝড় 'আকভান' ও তার সঙ্গে সক্রিয় নিম্নচাপের জেরে দক্ষিণ ২৪ পরগনা জেলা জুড়ে আবহাওয়া দ্রুত অবনতির দিকে এগোচ্ছে। আবহাওয়া দপ্তরের পক্ষ থেকে জেলায় ভারী থেকে অতিভারী বৃষ্টির হলুদ সতর্কতা জারি করা হয়েছে। এই দুর্যোগপূর্ণ পরিস্থিতির কারণে এবং সাধারণ দর্শক ও মেলাপ্রেমী মানুষের সুরক্ষার কথা বিবেচনা করে আজ ২০ নভেম্বর বারুইপুর ঐতিহাসিক রাস মাঠে বহু প্রতীক্ষিত 'ডায়মন্ড সার্কাস'-এর মহাধুমধামে উদ্বোধনী প্রদর্শনী আপাতত স্থগিত ঘোষণা করা হয়েছে।

মেলা ও সার্কাস পরিচালন কমিটির এক মুখপাত্র আজ সন্ধ্যায় জরুরি বিজ্ঞপ্তিতে জানান, "মাঠে প্রচুর দর্শক সমাগমের সম্ভাবনা ছিল। কিন্তু প্রবল ঝোড়ো হাওয়া ও নিরবচ্ছিন্ন বৃষ্টির পূর্বাভাসের কারণে তাঁবু ও বৈদ্যুতিক নিরাপত্তার ক্ষেত্রে কোনো ঝুঁকি নেওয়া সমীচীন নয়। আবহাওয়া স্বাভাবিক হলে এবং মাঠ শুকিয়ে চলাচলের উপযোগী হলে আগামী দুই-একদিনের মধ্যে নতুন উদ্বোধনী দিনক্ষণ ঘোষণা করা হবে।"

এদিকে দুর্যোগ মোকাবিলায় সম্পূর্ণ প্রস্তুত রয়েছে বারুইপুর পুরসভা ও মহকুমা প্রশাসন। উপকূলবর্তী সুন্দরবনের কাছাকাছি অঞ্চল হওয়ায় শিয়ালদহ দক্ষিণ রেলওয়ে শাখায় ওভারহেড তার ও ট্র্যাকে নজরদারি জোরদার করা হয়েছে। মহকুমা শাসকের দপ্তরে একটি সার্বক্ষণিক ২৪ ঘণ্টার আপৎকালীন কন্ট্রোল রুম খোলা হয়েছে। কোনো নিচু এলাকায় জলমগ্নতা বা গাছ ভেঙে পড়ার ঘটনা ঘটলে দ্রুত ব্যবস্থা নিতে সিভিল ডিফেন্স ও দমকল বাহিনীকে সতর্ক থাকার নির্দেশ দেওয়া হয়েছে।`
  },
  {
    id: 'art-1795194061451-z4k4',
    slug: 'bakultala-police-arms-ammunition-recovered-accused-arrested-baruipur',
    title: 'বারুইপুর পুলিশ জেলার বকুলতলায় উদ্ধার দেশি পাইপগান ও তাজা কার্তুজ: ধৃত দুষ্কৃতীকে জেরা করে মিলল লুকানো অস্ত্রের হদিশ',
    titleEn: 'Bakultala Police Recover Improvised Firearm and Live Ammunition in Baruipur Police District: Accused Arrested and Interrogated',
    summary: 'গোপন সূত্রে অভিযান চালিয়ে হানারবাটি থেকে গ্রেপ্তার এক দাগি দুষ্কৃতী। ধৃতের স্বীকারোক্তির ভিত্তিতে গোপন আস্তানা থেকে উদ্ধার ওয়ান-শটার ও গুলি। বারুইপুর আদালতে পেশ।',
    category: 'crime',
    categoryBn: 'আইনশৃঙ্খলা ও অপরাধ',
    status: 'published',
    source: 'Bakultala PS / Baruipur Police District',
    sourceUrl: 'https://baruipur.online/news/bakultala-police-arms-ammunition-recovered-accused-arrested-baruipur',
    author: 'অপরাধ ও তদন্ত বিভাগ',
    published_at: '2026-11-20T20:30:00+05:30',
    date: '২০ নভেম্বর, ২০২৬',
    time: 'রাত ০৮:৩০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/957f397f80be087273cf82603c6f763e.jpg'
    ],
    views: 410,
    likes: 31,
    shares: 20,
    tags: ['বকুলতলা', 'আগ্নেয়াস্ত্র উদ্ধার', 'বারুইপুর পুলিশ জেলা', 'কার্তুজ', 'গ্রেপ্তার', 'আদালত'],
    content: `অসামাজিক কাজকর্ম ও বেআইনি অস্ত্র পাচারের বিরুদ্ধে ফের বড়সড় সাফল্য পেল বারুইপুর পুলিশ জেলা। মহকুমার বকুলতলা থানা এলাকার হানারবাটিতে বিশেষ অভিযান চালিয়ে আগ্নেয়াস্ত্র ও গোলাবারুদ সহ এক দুষ্কৃতীকে গ্রেপ্তার করেছে পুলিশ।

পুলিশ সূত্রে জানা গিয়েছে, ধৃত ব্যক্তির নাম নূর হোসেন শেখ, বাড়ি বকুলতলা থানার হানারবাটি গ্রামে। তার বিরুদ্ধে বকুলতলা থানায় অস্ত্র আইনের ২৫/২৭ ধারায় কেস নম্বর ৪৬৩/২০২৬ নথিভুক্ত করা হয়। পুলিশ হেফাজতে নিয়ে নিবিড় জিজ্ঞাসাবাদের পর ধৃতের দেওয়া গোপন তথ্যের ভিত্তিতে একটি বাঁশবাগানের ভেতর মাটির নিচে লুকানো অবস্থায় উদ্ধার করা হয় একটি লোহার ওয়ান-শটার দেশি পাইপগান এবং দুই রাউন্ড তাজা কার্তুজ।

বারুইপুর পুলিশ জেলার শীর্ষ আধিকারিকরা জানান, আসন্ন শীতকালীন মেলা ও উৎসবের মরশুমে মহকুমার শান্তিশৃঙ্খলা বজায় রাখতে প্রতিটি থানায় অস্ত্র উদ্ধার অভিযান জোরদার করা হয়েছে। এই আগ্নেয়াস্ত্রটি কোথা থেকে আনা হয়েছিল এবং কোনো বড়সড় অপরাধমূলক ষড়যন্ত্রের পরিকল্পনা ছিল কি না, তা খতিয়ে দেখা হচ্ছে। ধৃতকে আজ বারুইপুর মহকুমা আদালতে তোলা হলে বিচারক তাকে পুলিশি হেফাজতে পাঠানোর নির্দেশ দেন।`
  },
  {
    id: 'art-1795194062359-z5vd',
    slug: 'baruipur-rasmela-2026-field-preparation-stalls-roychoudhury-bari-guide',
    title: 'ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬ প্রস্তুতি চূড়ান্ত পর্বে: রাস মাঠের স্টল বিন্যাস, আলোর রোশনাই ও রায়চৌধুরী বাড়ির ঐতিহ্যকে ঘিরে উন্মাদনা',
    titleEn: 'Historic Baruipur Rasmela 2026 Preparation in Final Leg: Rasmath Stall Allocation, Lighting, and Festivities around Roychoudhury Bari',
    summary: '৩৫০ বছরেরও বেশি প্রাচীন বারুইপুরের ঐতিহ্যবাহী রাস উৎসব ও রাসমেলা ঘিরে মহকুমাবাসীর উৎসাহ তুঙ্গে। মাঠজুড়ে হস্তশিল্প, নাগরদোলা ও মিষ্টির স্টল তৈরির তোড়জোড়। কড়া নিরাপত্তাব্যবস্থা পুলিশের।',
    category: 'culture',
    categoryBn: 'উৎসব ও সংস্কৃতি',
    status: 'published',
    source: 'Heritage & Culture Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-rasmela-2026-field-preparation-stalls-roychoudhury-bari-guide',
    author: 'সাংস্কৃতিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-20T19:40:00+05:30',
    date: '২০ নভেম্বর, ২০২৬',
    time: 'সন্ধ্যা ০৭:৪০',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/bc2b33a73abbe93f92d9b8399eda5f07.jpg',
      '/images/crawled/e24649bfdb47ca849047d5936cddb778.jpg'
    ],
    views: 680,
    likes: 58,
    shares: 44,
    tags: ['বারুইপুর রাসমেলা', 'রাস উৎসব', 'রায়চৌধুরী বাড়ি', 'রাস মাঠ', 'মেলার স্টল', 'ঐতিহ্য'],
    content: `দক্ষিণ ২৪ পরগনার অন্যতম প্রাচীন ও বৃহত্তম লোকউৎসব বারুইপুরের রাসমেলা ২০২৬-এর প্রস্তুতি এখন চূড়ান্ত পর্যায়ে। বারুইপুরের জমিদার রায়চৌধুরী পরিবারের ঐতিহ্যবাহী শ্রীশ্রী রাধাবল্লভ জিউর রাস উৎসবকে কেন্দ্র করে প্রতি বছর এই মহামিলন মেলার আয়োজন হয়। রাস মাঠ প্রাঙ্গণ জুড়ে এখন যুদ্ধকালীন তৎপরতায় চলছে স্টল নির্মাণ, রঙিন বৈদ্যুতিক তোরণ ও নাগরদোলা বসানোর কাজ।

মেলা কমিটি সূত্রে জানা গেছে, এ বছর মেলা প্রাঙ্গণে প্রায় পাঁচ শতাধিক বিভিন্ন ধরনের স্টল বসছে। এর মধ্যে কাঠের আসবাবপত্র, ঐতিহ্যবাহী মাটির পুতুল, হস্তশিল্প, গ্রামীণ কৃষি সরঞ্জাম এবং সুস্বাদু জিলিপি, খাজা ও মিষ্টির দোকান বিশেষ আকর্ষণ। শিশুদের মনোরঞ্জনের জন্য বসানো হচ্ছে একাধিক ব্রেক-ডান্স রাইড, জায়ান্ট হুইল ও ওয়াটার বোট।

বারুইপুর পুলিশ জেলা ও পৌরসভার সমন্বয়ে মেলা চলাকালীন নিরাপত্তা নিশ্চিত করতে সিসিটিভি ক্যামেরা, ওয়াচ টাওয়ার এবং সিভিল পোশাকে পুলিশি নজরদারি থাকবে। হারিয়ে যাওয়া শিশুদের জন্য বিশেষ সহায়তা কেন্দ্র ও ফার্স্ট এইড ক্যাম্প স্থাপন করা হচ্ছে। বারুইপুর ও সংলগ্ন অঞ্চলের মানুষের কাছে এই রাসমেলা শুধু ধর্মীয় উৎসব নয়, বরং এক প্রাণের মহামিলন ক্ষেত্র।`
  },
  {
    id: 'art-1795194050080-hi4x',
    slug: 'isf-workers-join-congress-baruipur-political-party-switch-2026',
    title: 'বারুইপুরে দলবদল: জাতীয় কংগ্রেসের কার্যালয়ে পতাকা হাতে দলে যোগ দিলেন শতাধিক আইএসএফ কর্মী-সমর্থক',
    titleEn: 'Political Switch in Baruipur: Over a Hundred ISF Workers Join Congress at Baruipur Party Office Ahead of Civic Elections',
    summary: 'বারুইপুর পশ্চিম ও পূর্ব বিধানসভা এলাকা থেকে বহু সংখ্যালঘু যুব কর্মী কংগ্রেসের নীতিতে আস্থা রেখে দলবদল করলেন। আসন্ন পুরভোটের প্রাক্কালে মহকুমার রাজনৈতিক সমীকরণে নতুন মোড়।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও পুর রাজনীতি',
    status: 'published',
    source: 'District Political Bureau',
    sourceUrl: 'https://baruipur.online/news/isf-workers-join-congress-baruipur-political-party-switch-2026',
    author: 'রাজনৈতিক সংবাদদাতা, বারুইপুর',
    published_at: '2026-11-20T18:45:00+05:30',
    date: '২০ নভেম্বর, ২০২৬',
    time: 'সন্ধ্যা ০৬:৪৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/27f958f03eef7b338d431010af8965ba.jpg'
    ],
    views: 380,
    likes: 24,
    shares: 16,
    tags: ['বারুইপুর', 'কংগ্রেস', 'আইএসএফ', 'দলবদল', 'দক্ষিণ ২৪ পরগনা', 'পুরভোট'],
    content: `বারুইপুর পুরবোর্ড ভেঙে যাওয়ার পর মহকুমা রাজনীতিতে প্রতিনিয়ত উত্তাপ বাড়ছে। আজ বিকেলে বারুইপুর রেল স্টেশন সংলগ্ন জেলা জাতীয় কংগ্রেস কার্যালয়ে একটি বিশেষ সাংগঠনিক সভায় ইন্ডিয়ান সেকুলার ফ্রন্ট (ISF) ছেড়ে একঝাঁক সক্রিয় কর্মী-সমর্থক কংগ্রেসে যোগদান করেন। তাঁদের হাতে দলীয় পতাকা তুলে দেন দক্ষিণ ২৪ পরগনা জেলা কংগ্রেসের নেতৃবৃন্দ।

যোগদানকারী নেতৃত্ব জানান, গ্রামীণ এলাকায় কর্মসংস্থান, যুব সমাজের অধিকার রক্ষা এবং দ্রব্যমূল্য বৃদ্ধির বিরুদ্ধে লড়াইয়ে জাতীয় কংগ্রেসের ধর্মনিরপেক্ষ আদর্শে অনুপ্রাণিত হয়েই তাঁরা এই সিদ্ধান্ত নিয়েছেন। তাঁদের দাবি, বারুইপুর মহকুমার বিভিন্ন পঞ্চায়েত ও পুর এলাকার সংখ্যালঘু ও খেটে খাওয়া মানুষের পাশে দাঁড়িয়ে প্রকৃত বিরোধী শক্তির রূপ নিতে পারে একমাত্র কংগ্রেসই।

জেলা কংগ্রেস নেতৃত্বের বক্তব্য, পুরসভা ও গ্রামীণ স্তরে মানুষ বর্তমান রাজনৈতিক পরিস্থিতিতে বিকল্প পথের সন্ধান করছেন। বিভিন্ন দল থেকে সাধারণ মানুষ ও যুব শক্তির এই যোগদান বারুইপুরে দলকে সাংগঠনিকভাবে আরও শক্তিশালী করে তুলবে। যোগদান পর্ব শেষে একটি সংবর্ধনা সভা অনুষ্ঠিত হয়।`
  }
];

polishedNov20Articles.forEach(pa => {
  const idx = articles.findIndex(a => a.id === pa.id);
  if (idx !== -1) {
    articles[idx] = { ...articles[idx], ...pa };
    console.log(`✓ Updated & published: ${pa.title.substring(0, 50)}...`);
  } else {
    articles.unshift(pa);
    console.log(`✓ Inserted & published: ${pa.title.substring(0, 50)}...`);
  }
});

// Prune useless non-news / spam drafts from tonight's crawl
const spamDraftIds = [
  'art-1795194069878-bnsa', // ব্যারাকপুর
  'art-1795194065798-ddlb', // ইন্দিরা গান্ধী
  'art-1795194064834-21r8', // Happy Children's Day
  'art-1795194063470-vy1d', // ঘূর্ণি ঝড় ধেয়ে আসছে
  'art-1795194063329-ksc9', // কোন স্কুলের স্টুডেন্ট তুমি
  'art-1795194063185-peet', // এই বৃষ্টিতে অফিস ছুটি...
  'art-1795194058532-8d4i', // পুরনো সোয়েটারকে টাটা
  'art-1795194054861-74q0', // যোগাযোগ ও ভর্তি
  'art-1795194053030-4kj8'  // দীঘা সমুদ্রে পর্যটক
];

const initialCount = articles.length;
newsData.articles = articles.filter(a => !spamDraftIds.includes(a.id));
console.log(`✓ Pruned ${initialCount - newsData.articles.length} spam/out-of-area drafts. Total articles: ${newsData.articles.length}`);

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf-8');
console.log('✓ Saved news_data.json\n');


// 2. UPDATE NOTICES DATA
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));
const newNotice = {
  id: 'not-bpd-2026-1120-cyclone-safety',
  memoNo: 'Memo No: 2280/BPD/DISASTER-CYCLONE/2026',
  title: 'ঘূর্ণিঝড় \'আকভান\' ও ভারী বৃষ্টির পূর্বাভাসের প্রেক্ষিতে বারুইপুর মহকুমা ও উপকূলবর্তী এলাকায় জরুরি সতর্কতা ও কন্ট্রোল রুম খোলা সংক্রান্ত নির্দেশিকা',
  titleEn: 'Disaster Advisory and 24x7 Emergency Control Room Notification for Cyclone Akvan across Baruipur Sub-Division',
  departmentId: 'police',
  departmentName: 'বারুইপুর পুলিশ জেলা ও বিপর্যয় সেল',
  publishedDate: '2026-11-20',
  publishedDateFormatted: '২০ নভেম্বর, ২০২৬',
  category: 'দুর্যোগ মোকাবিলা ও জননিরাপত্তা',
  isUrgent: true,
  summary: 'বঙ্গোপসাগরে ঘূর্ণিঝড় আকভানের কারণে বারুইপুর, ক্যানিং ও কুলতলিতে ভারী বৃষ্টি ও দমকা ঝোড়ো হাওয়ার পূর্বাভাস। নাগরিকদের সতর্ক থাকার বার্তা ও জরুরি কন্ট্রোল রুম নম্বর চালু।',
  content: `আবহাওয়া দপ্তরের সর্বশেষ বুলেটিন অনুযায়ী ঘূর্ণিঝড় 'আকভান'-এর প্রভাবে দক্ষিণ ২৪ পরগনার বিস্তীর্ণ অঞ্চলে আগামী ৪৮ ঘণ্টায় ভারী বর্ষণ ও ৫০-৬০ কিমি বেগে ঝোড়ো হাওয়ার সম্ভাবনা রয়েছে। বারুইপুর পুলিশ জেলা ও প্রশাসনের পক্ষ থেকে নিম্নোক্ত সতর্কবার্তা জারি করা হচ্ছে:\n\n১. কাঁচা বা জরাজীর্ণ বাড়িতে বসবাসকারী নাগরিকদের নিকটবর্তী ফ্লাড শেল্টার বা পাকা বিদ্যালয় ভবনে আশ্রয় নেওয়ার পরামর্শ দেওয়া হচ্ছে।\n২. খোলা তার, ট্রান্সফর্মার বা বিপজ্জনক জলমগ্ন বিদ্যুতের খুঁটির কাছাকাছি যাবেন না। কোনো তার ছিঁড়ে পড়লে তৎক্ষণাৎ স্থানীয় বিদ্যুৎ দপ্তর বা কন্ট্রোল রুমে জানান।\n৩. নদী বা খালের পাড়ে অযথা জমায়েত সম্পূর্ণ নিষিদ্ধ করা হয়েছে। মৎস্যজীবীদের সমুদ্রে ও নদীতে মাছ ধরতে যেতে নিষেধ করা হয়েছে।\n৪. জরুরি সহায়তার জন্য মহকুমা সার্বক্ষণিক কন্ট্রোল রুম হেল্পলাইন: ০৩৩-২৪৩৩-xxxx / ১০০ নম্বরে ফোন করুন। পুলিশ পেট্রোল ভ্যান নিয়মিত টহলে নিয়োজিত রয়েছে।`,
  pdfUrl: 'https://wbpolice.gov.in/WBP/Common/WBP_Notice.aspx',
  pdfSize: '560 KB',
  signatory: 'পুলিশ সুপারিনটেনডেন্ট (SP), বারুইপুর পুলিশ জেলা',
  status: 'active',
  sourceUrl: 'https://wbpolice.gov.in/WBP/Common/WBP_Notice.aspx',
  sourcePortalName: 'wbpolice.gov.in (বারুইপুর পুলিশ জেলা)'
};

noticesData.notices = noticesData.notices.filter(n => n.id !== newNotice.id);
noticesData.notices.unshift(newNotice);
noticesData.lastUpdated = '2026-11-20';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✓ Added Notice: ${newNotice.memoNo} - ${newNotice.title.substring(0, 50)}...`);
console.log(`✓ Total notices: ${noticesData.notices.length}\n`);


// 3. UPDATE TENDERS DATA
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));
const newTender = {
  id: 'ten-bm-2026-1120-drain-culvert',
  nitNumber: 'WBMAD/BM/NIT-22/DRAIN-CULVERT/2026',
  title: 'বারুইপুর পুরসভার ১১ ও ১২ নম্বর ওয়ার্ডে পাকা আরসিসি ড্রেন ও বক্স কালভার্ট নির্মাণ প্রকল্প',
  titleEn: 'Construction of Reinforced Concrete (RCC) Covered Drain and Box Culverts in Ward No. 11 & 12 under Baruipur Municipality',
  authorityId: 'municipality',
  authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
  department: 'পূর্ত ও নিকাশি পরিকাঠামো শাখা',
  location: 'ওয়ার্ড ১১ ও ১২ (মাদরাত সংযোগ ও শ্মশান রোড এলাকা), বারুইপুর',
  category: 'পূর্ত ও নিকাশি (Civil Drainage)',
  estimatedValue: '₹২১,২০,০০০',
  estimatedValueNum: 2120000,
  emdAmount: '₹৪২,৪০০',
  tenderFee: '₹১,৫০০',
  publishDate: '২০২৬-১১-২০',
  closingDate: '২০২৬-১২-১৪',
  bidOpeningDate: '২০২৬-১২-১৬',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBMAD/BM/NIT-22/DRN/2026',
  eligibility: 'পৌরসভা, পূর্ত দপ্তর (PWD) বা কেএমডিএ এলাকায় আরসিসি ড্রেন ও কালভার্ট নির্মাণ কার্যে পূর্ব অভিজ্ঞতাসম্পন্ন বৈধ জিএসটি ও ট্রেড লাইসেন্সধারী ঠিকাদারি প্রতিষ্ঠান।',
  sourcePortalName: 'wbtenders.gov.in'
};

tendersData.tenders = tendersData.tenders.filter(t => t.id !== newTender.id);
tendersData.tenders.unshift(newTender);
tendersData.lastUpdated = '2026-11-20';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✓ Added Tender: ${newTender.nitNumber} - ${newTender.title.substring(0, 50)}...`);
console.log(`✓ Total tenders: ${tendersData.tenders.length}\n`);


// 4. UPDATE BUY & SALES (PROPERTIES DATA)
const propertiesData = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf-8'));
const newProperty = {
  id: "prop-brp-034",
  title: "বারুইপুর দক্ষিণ গোবিন্দপুর ও বাইপাস কানেক্টর সংলগ্ন ২.৫ কাঠা নিষ্কণ্টক বাস্তু জমি বিক্রয়",
  titleEn: "2.5 Katha Prime Freehold Residential Vastu Land for Sale near Baruipur Dakshin Gobindapur & Bypass Connector",
  category: "land_plot",
  categoryNameBn: "আবাসিক জমি/প্লট (Residential Land)",
  location: "দক্ষিণ গোবিন্দপুর, বারুইপুর বাইপাস কানেক্টর রোড, দক্ষিণ ২৪ পরগনা",
  locationArea: "Dakshin Gobindapur / Bypass",
  price: "₹১৮.৭৫ লক্ষ (প্রতি কাঠা ₹৭.৫০ লক্ষ)",
  priceNum: 1875000,
  priceUnit: "total",
  configuration: "২.৫ কাঠা আয়তাকার প্লট (২২ ফুট চওড়া পিচ রাস্তা ফ্রন্ট)",
  areaSqFt: "১,৮০০ বর্গফুট (২.৫ কাঠা)",
  facing: "দক্ষিণ মুখী (পর্যাপ্ত আলো ও খোলা বাতাস)",
  floorInfo: "সম্পূর্ণ নিষ্কণ্টক বাস্তু জমি (বাউন্ডারি করা)",
  possessionStatus: "তাৎক্ষণিক রেজিস্ট্রি ও দখল (Immediate Registry)",
  reraStatus: "বারুইপুর পঞ্চায়েত ও বিএলআরও রেকর্ডভুক্ত বৈধ বাস্তু জমি",
  approvalStatus: "সম্পূর্ণ নিষ্কণ্টক ও রায়তি আইনি দলিল সহ প্রস্তুত",
  bankLoanApproved: "বাড়ি তৈরির জন্য SBI ও HDFC ল্যান্ড পারচেজ লোন উপলব্ধ",
  amenities: [
    "২২ ফুট চওড়া পিচ ড্রেনেজ রোড সংলগ্ন সম্মুখভাগ",
    "বিদ্যুৎ সংযোগ ও পাইপলাইনের জলের সুব্যবস্থা উপলব্ধ",
    "শান্ত ও দ্রুত উন্নয়নশীল আবাসিক পাড়া",
    "বারুইপুর বাইপাস ও সুভাষগ্রাম স্টেশনের নিকটবর্তী যোগাযোগ"
  ],
  description: "বারুইপুর বাইপাস কানেক্টর রোড ও দক্ষিণ গোবিন্দপুরের মাঝে অবস্থিত ২.৫ কাঠার স্কয়ার সাইজ বাস্তু প্লট। চারপাশ কংক্রিট পিলার ও তার দিয়ে ঘেরা। উঁচু ভরাট জমি, অবিলম্বে স্বপ্নের বাড়ি বা ভিলা তৈরির জন্য একদম প্রস্তুত। ১০০% নিষ্কণ্টক খতিয়ান।",
  imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
  images: [
    "/images/baruipur-real-estate-flats-guide.jpg"
  ],
  featured: true,
  contactPerson: "তাপস নস্কর (গোবিন্দপুর ল্যান্ড কনসালটেন্সি)",
  contactPhone: "+91 98314 22890",
  contactWhatsapp: "+91 98314 22890",
  publishedAt: "২০২৬-১১-২০"
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

console.log('🎉 ২০ নভেম্বর (রাত) সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
