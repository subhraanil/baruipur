const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ১৯ নভেম্বর ২০২৬ (রাত) সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================\n');

// 1. UPDATE & POLISH NEWS ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
const articles = newsData.articles || newsData;

const polishedNightArticles = [
  {
    id: 'art-1795108314480-8158',
    slug: 'narendrapur-drug-bust-contraband-recovered-arrest-baruipur-court',
    title: 'নরেন্দ্রপুরে প্রায় সাড়ে ১২ কেজি নিষিদ্ধ মাদক সহ পাকড়াও আন্তঃজেলা পাচারকারী: জগদীপোতা মোড়ে মধ্যরাতের অভিযানে বড় সাফল্য',
    titleEn: 'Inter-District Drug Peddler Arrested in Narendrapur with Over 12.6 Kg Contraband: Major Breakthrough at Jagadipota Intersection',
    summary: 'গোপন সূত্রে খবর পেয়ে নরেন্দ্রপুর থানার পুলিশের গভীর রাতের সাঁড়াশি তল্লাশি অভিযান। জগদীপোতা মোড় থেকে ধৃত এক পাচারকারী, উদ্ধার বিপুল নিষিদ্ধ মাদক। বারুইপুর মহকুমা আদালতে পেশ।',
    category: 'crime',
    categoryBn: 'আইনশৃঙ্খলা ও অপরাধ',
    status: 'published',
    source: 'Narendrapur PS / Baruipur Police District',
    sourceUrl: 'https://baruipur.online/news/narendrapur-drug-bust-contraband-recovered-arrest-baruipur-court',
    author: 'অপরাধ ও বিশেষ অনুসন্ধান সেল',
    published_at: '2026-11-19T21:30:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'রাত ০৯:৩০',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/24aa64086cc77a6f7175b6165dca5770.jpg'
    ],
    views: 450,
    likes: 35,
    shares: 28,
    tags: ['নরেন্দ্রপুর', 'মাদক উদ্ধার', 'বারুইপুর পুলিশ জেলা', 'জগদীপোতা', 'গ্রেপ্তার', 'আদালত'],
    content: `দক্ষিণ ২৪ পরগনার বারুইপুর পুলিশ জেলার নরেন্দ্রপুর থানা এলাকায় মাদকবিরোধী অভিযানে বড়সড় সাফল্য মিলল। গভীর রাতে গোপন সূত্রে নির্ভরযোগ্য তথ্য পেয়ে দ্রুত অভিযান চালিয়ে প্রায় ১২ কেজি ৬২৩ গ্রাম নিষিদ্ধ মাদক সহ এক সক্রিয় মাদক পাচারকারীকে হাতেনাতে গ্রেপ্তার করেছে পুলিশ।

পুলিশ সূত্রে জানা গিয়েছে, ধৃত ব্যক্তির নাম সন্তু দত্ত ওরফে ভোলা। সে দীর্ঘদিন ধরেই মহকুমার সীমান্ত ও কলকাতা সংলগ্ন সংযোগস্থলগুলিতে নিষিদ্ধ মাদক সরবরাহের সঙ্গে যুক্ত ছিল বলে প্রাথমিক তদন্তে জানা গিয়েছে। নরেন্দ্রপুর থানার ওসির নেতৃত্বে বিশেষ তদন্তকারী দল জগদীপোতা মোড় এলাকায় নাকা চেকিং ও অতর্কিত নজরদারি শুরু করে। একটি ব্যাগ নিয়ে সন্দেহজনকভাবে ঘোরাঘুরি করার সময় পুলিশ সন্তু দত্তকে আটক করে এবং তল্লাশি চালাতেই উদ্ধার হয় প্লাস্টিকের প্যাকেটে মুড়ে রাখা বিপুল পরিমাণ নিষিদ্ধ মাদক।

উদ্ধার হওয়া মাদকের আনুমানিক আন্তর্জাতিক বাজারমূল্য কয়েক লক্ষ টাকা বলে জানা গিয়েছে। বারুইপুর পুলিশ জেলার এক পদস্থ আধিকারিক জানান, পুলিশের পক্ষ থেকে স্বতঃপ্রণোদিত (Suo-Motu) মামলা দায়ের করে এনডিপিএস (NDPS) আইনের কঠোর ধারায় অভিযোগ আনা হয়েছে। ধৃতকে আজ বারুইপুর মহকুমা আদালতে পেশ করে পুলিশ হেফাজতে নেওয়ার আবেদন জানানো হয়, যাতে এই চক্রের মূল পান্ডা ও পেছনের নেটওয়ার্কের সন্ধান পাওয়া যায়। মহকুমাজুড়ে মাদক কারবারীদের বিরুদ্ধে পুলিশের এই লাগাতার জিরো টলারেন্স অভিযানকে সাধুবাদ জানিয়েছেন স্থানীয় নাগরিকরা।`
  },
  {
    id: 'art-1795108311765-6lxw',
    slug: 'baruipur-district-congress-press-conference-price-rise-civic-issues-2026',
    title: 'নিত্যপ্রয়োজনীয় সামগ্রী ও দুধের মূল্যবৃদ্ধির প্রতিবাদে বারুইপুর জেলা কংগ্রেসের সাংবাদিক বৈঠক: পুরবোর্ড ভাঙা নিয়েও তীব্র আক্রমণ',
    titleEn: 'Baruipur District Congress Press Conference Protesting Rising Commodity & Milk Prices: Sharp Attack Over Municipality Dissolution',
    summary: 'বাজারে শাকসবজি, ভোজ্যতেল এবং প্যাকেটজাত দুধের অস্বাভাবিক মূল্যবৃদ্ধিতে নাভিশ্বাস আমজনতার। বারুইপুর দলীয় কার্যালয়ে সাংবাদিক সম্মেলন করে কেন্দ্র ও রাজ্যের নীতির কড়া সমালোচনা জেলা কংগ্রেসের।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও পুর পরিষেবা',
    status: 'published',
    source: 'Baruipur Press Club / District Reporter',
    sourceUrl: 'https://baruipur.online/news/baruipur-district-congress-press-conference-price-rise-civic-issues-2026',
    author: 'রাজনৈতিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-19T20:45:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'রাত ০৮:৪৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/810974a1a28753f339e249986828dbd4.jpg'
    ],
    views: 395,
    likes: 27,
    shares: 18,
    tags: ['বারুইপুর কংগ্রেস', 'মূল্যবৃদ্ধি', 'সাংবাদিক সম্মেলন', 'দুধের দাম', 'পুরবোর্ড', 'নাগরিক সমস্যা'],
    content: `বাজারের অগ্নিমূল্য এবং সাধারণ মানুষের নিত্যদিনের অপরিহার্য খাদ্যসামগ্রীর ক্রমাগত মূল্যবৃদ্ধির বিরুদ্ধে এবার সরব হলো বারুইপুর জেলা কংগ্রেস নেতৃত্ব। আজ সন্ধ্যায় বারুইপুর রেলগেট সংলগ্ন দলীয় কার্যালয়ে এক জরুরি সাংবাদিক সম্মেলন ডেকে কেন্দ্রীয় ও রাজ্য সরকারের তীব্র সমালোচনা করেন কংগ্রেসের জেলা নেতৃবৃন্দ।

সাংবাদিক বৈঠকে জেলা কংগ্রেসের মুখপাত্র ও শীর্ষ নেতারা অভিযোগ করেন, "গত কয়েক সপ্তাহে ভোজ্যতেল, চিনি, ডাল এবং সবচেয়ে উদ্বেগের বিষয় হলো শিশুদের দুধের দাম যে হারে একলাফে বৃদ্ধি পেয়েছে, তাতে মধ্যবিত্ত ও নিম্নবিত্ত পরিবারের দৈনন্দিন বাজেট ভেঙে পড়েছে। সরকারি নজরদারি ও টাস্ক ফোর্সের কোনো কার্যকর ভূমিকা বারুইপুরের খুচরা ও পাইকারি বাজারগুলিতে দেখা যাচ্ছে না।" অবিলম্বে বাজার নিয়ন্ত্রণে কঠোর প্রশাসনিক পদক্ষেপ এবং কালোবাজারি রুখতে নিয়মিত অভিযানের দাবি জানান তাঁরা।

একই সঙ্গে সদ্য ভেঙে যাওয়া বারুইপুর পুরবোর্ড প্রসঙ্গেও ক্ষোভ উগরে দেন নেতৃবৃন্দ। তাঁদের দাবি, পুরবোর্ডের চেয়ারম্যানের হঠাৎ পদত্যাগ এবং মেয়াদ শেষের মুখে পুরবোর্ড ভেঙে দেওয়া আসলে দায়িত্ব এড়ানোর কৌশল। কংগ্রেসের বক্তব্য, আগামী পুরভোট না হওয়া পর্যন্ত যেন কোনো রাজনৈতিক পক্ষপাত ছাড়াই সাধারণ নাগরিকদের পরিশ্রুত পানীয় জল, রাস্তার আলো ও সাফাই পরিষেবা নিশ্চিত করে নিরপেক্ষ প্রশাসক মণ্ডলী। দাবি না মানা হলে মহকুমা শাসকের দপ্তরের সামনে অবস্থান বিক্ষোভের হুঁশিয়ারি দেওয়া হয়েছে।`
  },
  {
    id: 'art-1795108319710-aaim',
    slug: 'baruipur-police-district-sdrf-disaster-preparedness-drill-kultali',
    title: 'সুন্দরবনের উপকূলে দুর্যোগ মোকাবিলায় প্রস্তুত প্রশাসন: বারুইপুর পুলিশ জেলা ও রাজ্য দুর্যোগ ব্যবস্থাপনা দলের যৌথ সচেতনতা ও উদ্ধার মহড়া',
    titleEn: 'Administration Prepared for Coastal Disasters: Baruipur Police District and SDRF Conduct Joint Preparedness Drill in Kultali',
    summary: 'শীতের মুখে বঙ্গোপসাগরের নিম্নচাপ ও সম্ভাব্য ঘূর্ণিঝড় সতর্কতার প্রেক্ষিতে কুলতলি থানায় আয়োজিত হলো রাজ্য বিপর্যয় মোকাবিলা বাহিনীর (SDRF) সচেতনতা শিবির ও উদ্ধার কার্যপদ্ধতি প্রদর্শন।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও জনশৃঙ্খলা',
    status: 'published',
    source: 'Baruipur Police District PR',
    sourceUrl: 'https://baruipur.online/news/baruipur-police-district-sdrf-disaster-preparedness-drill-kultali',
    author: 'মহকুমা প্রশাসনিক ডেস্ক',
    published_at: '2026-11-19T19:30:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সন্ধ্যা ০৭:৩০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/88c031e2ac08f9fd3c9a539dcc4ea6a4.jpg'
    ],
    views: 420,
    likes: 31,
    shares: 22,
    tags: ['বারুইপুর পুলিশ জেলা', 'কুলতলি', 'SDRF', 'দুর্যোগ মোকাবিলা', 'সুন্দরবন', 'উদ্ধার মহড়া'],
    content: `সুন্দরবন উপকূলীয় অঞ্চল ও নদীমাতৃক এলাকায় যেকোনো প্রাকৃতিক বিপর্যয় বা ঘূর্ণিঝড়ে সাধারণ মানুষের জীবন ও সম্পদ রক্ষায় আগাম প্রস্তুতি সেরে রাখল বারুইপুর পুলিশ জেলা প্রশাসন। আজ ১৯ নভেম্বর কুলতলি থানা প্রাঙ্গণে রাজ্য বিপর্যয় মোকাবিলা বাহিনী (SDRF)-র ৬ষ্ঠ ব্যাটালিয়ন ও পুলিশের যৌথ উদ্যোগে একটি উচ্চপর্যায়ের দুর্যোগ প্রস্তুতি ও জনসচেতনতা কর্মসূচি অনুষ্ঠিত হয়।

এই মহড়ায় উদ্ধারকারী দলের অভিজ্ঞ জওয়ানরা দেখিয়ে দেন কীভাবে তীব্র ঝড় বা জলপ্লাবনের সময় দুর্গতদের দ্রুত উদ্ধার করে নিরাপদ আশ্রয়ে সরিয়ে নিয়ে যেতে হয়। আধুনিক লাইফ জ্যাকেট, কাটার মেশিন, ফ্লাড রেসকিউ বোট এবং জরুরি ফার্স্ট এইড প্রয়োগের বাস্তবসম্মত কৌশল প্রদর্শন করা হয়। অনুষ্ঠানে স্থানীয় পঞ্চায়েত সদস্য, সিভিক ভলান্টিয়ার্স, ছাত্রছাত্রী এবং সাধারণ মৎস্যজীবী পরিবারের মানুষজন উপস্থিত ছিলেন।

বারুইপুর পুলিশ জেলার পদস্থ আধিকারিকরা জানান, সুন্দরবনের বিস্তীর্ণ দ্বীপ অঞ্চলে আবহাওয়ার দ্রুত পরিবর্তন ঘটে। সেই কারণে প্রত্যন্ত নদী তীরবর্তী গ্রামের বাসিন্দাদের সতর্কবার্তা পৌঁছানো এবং সংকটকালীন মুহূর্তে পুলিশ ও উদ্ধারকারী দলগুলির পারস্পরিক যোগাযোগ সুদৃঢ় করতেই এই উদ্যোগ নেওয়া হয়েছে। সচেতনতা শিবিরে সাধারণ মানুষকে কোনো গুজবে কান না দিয়ে সরাসরি প্রশাসনিক কন্ট্রোল রুমের নির্দেশ মেনে চলার আহ্বান জানানো হয়।`
  },
  {
    id: 'art-1795108322451-5uel',
    slug: 'baruipur-kachari-bazar-electric-pole-short-circuit-fire-scare',
    title: 'বারুইপুর কাছারি বাজার সংলগ্ন বৈদ্যুতিক খুঁটিতে শর্ট সার্কিট: বেরোল গলগল করে ধোঁয়া, অল্পের জন্য বড়সড় অগ্নিকাণ্ড থেকে রক্ষা পেল ঘনবসতি এলাকা',
    titleEn: 'Electric Pole Short Circuit Near Baruipur Kachari Bazar: Thick Smoke Triggers Panic, Major Fire Disaster Averted',
    summary: 'ব্যস্ত কাছারি বাজারে হাই-টেনশন তারে হঠাৎ স্ফুলিঙ্গ ও ধোঁয়া দেখে শোরগোল। স্থানীয় ব্যবসায়ী ও দমকলের তৎপরতায় দ্রুত বিদ্যুৎ সংযোগ বিচ্ছিন্ন করে পরিস্থিতি নিয়ন্ত্রণে আনা হয়।',
    category: 'municipality',
    categoryBn: 'পৌরসভা ও নিরাপত্তা',
    status: 'published',
    source: 'Local Market Watch / WBSEDCL Cell',
    sourceUrl: 'https://baruipur.online/news/baruipur-kachari-bazar-electric-pole-short-circuit-fire-scare',
    author: 'নগর সংবাদদাতা, বারুইপুর',
    published_at: '2026-11-19T18:50:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সন্ধ্যা ০৬:৫০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/ba5136b213825fbd1a8dc290aa60af56.jpg',
      '/images/crawled/4ab5713c4eb2d70fe0b5faf02b5c4170.jpg'
    ],
    views: 360,
    likes: 18,
    shares: 14,
    tags: ['বারুইপুর', 'কাছারি বাজার', 'শর্ট সার্কিট', 'বিদ্যুৎ দপ্তর', 'অগ্নিনির্বাপণ', 'নিরাপত্তা'],
    content: `বৃহস্পতিবার সন্ধ্যায় বারুইপুরের অত্যন্ত ব্যস্ততম বাণিজ্য কেন্দ্র কাছারি বাজারের প্রবেশমুখে একটি বৈদ্যুতিক খুঁটি ও ওভারহেড ডিস্ট্রিবিউশন বক্স থেকে হঠাৎ তীব্র শর্ট সার্কিটের কারণে আগুন ও ঘন কালো ধোঁয়া বের হতে দেখে চরম আতঙ্ক ছড়িয়ে পড়ে। বাজারে তখন শত শত ক্রেতা ও বিক্রেতার ভিড় ছিল।

প্রত্যক্ষদর্শীরা জানান, বাজারের সংযোগকারী প্রধান ল্যাম্পপোস্ট ও তারের জটে হঠাৎ পটকা ফাটার মতো শব্দ হতে থাকে এবং স্ফুলিঙ্গের সঙ্গে তার গলতে শুরু করে। মুহূর্তের মধ্যে পুরো এলাকা ধোঁয়ায় ঢেকে যায় এবং সংলগ্ন কয়েকটি কাপড়ের ও প্লাস্টিকের দোকানে আগুন ছড়িয়ে পড়ার আশঙ্কা তৈরি হয়। বিপদের গুরুত্ব বুঝে স্থানীয় কয়েকজন সচেতন ব্যবসায়ী দ্রুত শুকনো বালু ও বহনযোগ্য ফায়ার এক্সটিংগুইশার দিয়ে আগুন নিয়ন্ত্রণে আনার চেষ্টা করেন এবং জরুরি ভিত্তিতে বারুইপুর বিদ্যুৎ বণ্টন কোম্পানি (WBSEDCL) ও বারুইপুর দমকল কেন্দ্রে ফোন করেন।

বিদ্যুৎ দপ্তর কালবিলম্ব না করে কাছারি মোড় ও স্টেশন ফিডারের প্রধান পাওয়ার গ্রিড বন্ধ করে দিলে বিপদ মারাত্মক রূপ ধারণ করতে পারেনি। দমকলের একটি ইঞ্জিন ঘটনাস্থলে পৌঁছে পরিস্থিতি পুরোপুরি নিয়ন্ত্রণে আনে। বিদ্যুৎ দপ্তরের কর্মীরা জানান, অতিরিক্ত লোড ও পুরনো তারের ঘর্ষণের কারণেই এই শর্ট সার্কিট ঘটেছিল। ক্ষতিগ্রস্ত ট্রান্সফর্মার বক্স ও তার রাতেই দ্রুত মেরামত করে বিদ্যুৎ পরিষেবা স্বাভাবিক করা হয়েছে।`
  }
];

polishedNightArticles.forEach(pa => {
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
  'art-1795108322717-jtvr', // ব্যারাকপুর
  'art-1795108320775-c3v8', // Happy Children's Day
  'art-1795108320035-2y04', // কোন স্কুলের স্টুডেন্ট তুমি
  'art-1795108319872-rmwg', // ঘূর্ণি ঝড় ধেয়ে আসছে
  'art-1795108318236-zpue', // পুরনো সোয়েটারকে বলো টাটা
  'art-1795108316080-hoiz', // যোগাযোগ ও ভর্তি সংক্রান্ত তথ্য
  'art-1795108315472-puuh', // আগুনে পুড়ে বাসন্তী
  'art-1795108315288-t7mb', // বাঁদরের বাদরামি
  'art-1795108315125-d6dy'  // দীঘা সমুদ্রে পর্যটক
];

const initialCount = articles.length;
newsData.articles = articles.filter(a => !spamDraftIds.includes(a.id));
console.log(`✓ Pruned ${initialCount - newsData.articles.length} spam/out-of-area drafts. Total articles: ${newsData.articles.length}`);

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf-8');
console.log('✓ Saved news_data.json\n');


// 2. UPDATE NOTICES DATA
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));
const newNotice = {
  id: 'not-sdo-2026-1119-winter-health',
  memoNo: 'Memo No: 1420/SDO/HEALTH-WINTER/2026',
  title: 'বারুইপুর মহকুমার সমস্ত ব্লকে শীতকালীন মরশুমি ইনফ্লুয়েঞ্জা ও শ্বাসকষ্টজনিত রোগ প্রতিরোধে প্রাথমিক স্বাস্থ্যকেন্দ্রে বিশেষ ওপিডি ও ওষুধের ব্যবস্থা সংক্রান্ত বিজ্ঞপ্তি',
  titleEn: 'Advisory on Enhanced Winter OPD Services and Essential Medicine Stocks for Seasonal Influenza Across Baruipur Sub-Division',
  departmentId: 'hospital',
  departmentName: 'মহকুমা স্বাস্থ্য প্রশাসন ও এসডিও দপ্তর',
  publishedDate: '2026-11-19',
  publishedDateFormatted: '১৯ নভেম্বর, ২০২৬',
  category: 'স্বাস্থ্য ও চিকিৎসা পরিষেবা',
  isUrgent: false,
  summary: 'ঋতু পরিবর্তনের ফলে শিশু ও বয়স্কদের শ্বাসকষ্ট ও সর্দি-জ্বর বৃদ্ধি পাওয়ায় বারুইপুর মহকুমা হাসপাতাল ও ব্লক প্রাথমিক স্বাস্থ্যকেন্দ্রগুলিতে অতিরিক্ত ওপিডি কাউন্টার ও অ্যান্টি-অ্যালার্জিক ওষুধের মজুত রাখার নির্দেশ।',
  content: `শীতের প্রাক্কালে তাপমাত্রার দ্রুত ওঠানামার কারণে বারুইপুর মহকুমা জুড়ে ভাইরাল ফিভার, সিজনাল অ্যালার্জি ও ব্রঙ্কাইটিসের প্রকোপ বৃদ্ধি পাচ্ছে। এই প্রেক্ষিতে স্বাস্থ্য দপ্তর ও মহকুমা প্রশাসনের পক্ষ থেকে নিম্নরূপ স্বাস্থ্যবিধি ও নির্দেশিকা জারি করা হলো:\n\n১. বারুইপুর মহকুমা হাসপাতাল, হরিণডাঙা গ্রামীণ হাসপাতাল ও সংলগ্ন সমস্ত বিপিএইচসি (BPHC)-তে সকালের নিয়মিত ওপিডি ছাড়াও শিশু ও প্রবীণদের জন্য অতিরিক্ত ফিভার ক্লিনিক চালু থাকবে।\n২. সমস্ত সরকারি স্বাস্থ্যকেন্দ্রে প্যারাসিটামল, কাফ সিরাপ, নেবুলাইজার সলিউশন এবং প্রয়োজনীয় অ্যান্টিবায়োটিকের পর্যাপ্ত বাফার স্টক বজায় রাখতে হবে।\n৩. শিশুদের তীব্র শ্বাসকষ্ট বা দীর্ঘস্থায়ী জ্বর দেখা দিলে স্থানীয় হাতুড়ে চিকিৎসকের শরণাপন্ন না হয়ে অবিলম্বে নিকটবর্তী সরকারি হাসপাতালে নিয়ে আসার পরামর্শ দেওয়া হচ্ছে।\n৪. ধুলোবালি ও শীতের কুয়াশা এড়াতে বাইরে বেরোনোর সময় মাস্ক ব্যবহারের স্বাস্থ্যবিধি অনুসরণ করুন। জরুরি প্রয়োজনে স্বাস্থ্য দপ্তরের টোল-ফ্রি হেল্পলাইনে যোগাযোগ করতে বলা হচ্ছে।`,
  pdfUrl: 'https://s24pgs.gov.in/notice/',
  pdfSize: '510 KB',
  signatory: 'সহকারী মুখ্য স্বাস্থ্য আধিকারিক (ACMOH), বারুইপুর মহকুমা',
  status: 'active',
  sourceUrl: 'https://s24pgs.gov.in/notice/',
  sourcePortalName: 's24pgs.gov.in (স্বাস্থ্য প্রশাসন)'
};

noticesData.notices = noticesData.notices.filter(n => n.id !== newNotice.id);
noticesData.notices.unshift(newNotice);
noticesData.lastUpdated = '2026-11-19';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✓ Added Notice: ${newNotice.memoNo} - ${newNotice.title.substring(0, 50)}...`);
console.log(`✓ Total notices: ${noticesData.notices.length}\n`);


// 3. UPDATE TENDERS DATA
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));
const newTender = {
  id: 'ten-zp-2026-1119-solar-lights',
  nitNumber: 'WBZP/S24PGS/NIT-48/SOLAR-LIGHT/2026',
  title: 'বারুইপুর ব্লকের বিভিন্ন পঞ্চায়েত এলাকার গ্রামীণ সংযোগ সড়ক ও স্বাস্থ্য উপকেন্দ্রে সোলার স্ট্রিট লাইট সংস্থাপন ও ৩ বছরের রক্ষণাবেক্ষণ প্রকল্প',
  titleEn: 'Supply, Installation & 3-Year Maintenance of High-Efficiency Solar Street Lights across Rural Roads and Sub-Centers in Baruipur Block',
  authorityId: 'panchayat',
  authorityName: 'দক্ষিণ ২৪ পরগনা জেলা পরিষদ (Zilla Parishad)',
  department: 'পুনর্নবীকরণযোগ্য শক্তি ও গ্রামীণ পরিকাঠামো শাখা',
  location: 'বারুইপুর ব্লকের বিভিন্ন গ্রাম পঞ্চায়েত এলাকা (মাদরাত, কল্যাণপুর, ধপধপি)',
  category: 'সৌরশক্তি ও গ্রামীণ আলো (Renewable Energy)',
  estimatedValue: '₹১৮,৫০,০০০',
  estimatedValueNum: 1850000,
  emdAmount: '₹৩৭,০০০',
  tenderFee: '₹১,৫০০',
  publishDate: '২০২৬-১১-১৯',
  closingDate: '২০২৬-১২-১২',
  bidOpeningDate: '২০২৬-১২-১৫',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBZP/S24PGS/NIT-48/SOL/2026',
  eligibility: 'সৌর স্ট্রিট লাইট ও এলইডি আলোকসজ্জা সংস্থাপনে সরকারি বা আধা-সরকারি প্রকল্পে ন্যূনতম ৩ বছরের অভিজ্ঞতাসম্পন্ন এমএনআরই (MNRE) অনুমোদিত ভেন্ডার।',
  sourcePortalName: 'wbtenders.gov.in'
};

tendersData.tenders = tendersData.tenders.filter(t => t.id !== newTender.id);
tendersData.tenders.unshift(newTender);
tendersData.lastUpdated = '2026-11-19';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✓ Added Tender: ${newTender.nitNumber} - ${newTender.title.substring(0, 50)}...`);
console.log(`✓ Total tenders: ${tendersData.tenders.length}\n`);


// 4. UPDATE BUY & SALES (PROPERTIES DATA)
const propertiesData = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf-8'));
const newProperty = {
  id: "prop-brp-033",
  title: "বারুইপুর রেলওয়ে স্টেশন রোড ও পুরাতন বাজার সংলগ্ন ৩৫০ বর্গফুটের রানিং কমার্শিয়াল দোকান/শো-রুম স্পেস বিক্রয়",
  titleEn: "350 SqFt Running Prime Commercial Shop / Showroom Space for Sale near Baruipur Railway Station & Puratan Bazar",
  category: "commercial",
  categoryNameBn: "বাণিজ্যিক দোকান (Commercial Shop)",
  location: "স্টেশন রোড, পুরাতন বাজার প্রবেশমুখ, বারুইপুর পুর এলাকা",
  locationArea: "Station Road / Puratan Bazar",
  price: "₹১৮.০০ লক্ষ (এককালীন হস্তান্তর মূল্য)",
  priceNum: 1800000,
  priceUnit: "total",
  configuration: "৩৫০ বর্গফুট গ্রাউন্ড ফ্লোর শপ + রোলিং শাটার + গ্লাস ফ্রন্ট ডিসপ্লে",
  areaSqFt: "৩৫০ বর্গফুট",
  facing: "উত্তর-পূর্ব মুখী (প্রধান পিচ রাস্তার ওপর বিশাল ফুটফল)",
  floorInfo: "গ্রাউন্ড ফ্লোর (সরাসরি রাস্তা সংলগ্ন ফ্রন্ট শপ)",
  possessionStatus: "তাৎক্ষণিক হস্তান্তর (Immediate Possession)",
  reraStatus: "বারুইপুর পুরসভা অনুমোদিত বাণিজ্যিক ট্রেড লাইসেন্স যোগ্য",
  approvalStatus: "সম্পূর্ণ রায়তি ও নিষ্কণ্টক আইনি দলিল সহ প্রস্তুত",
  bankLoanApproved: "বাণিজ্যিক ব্যবসার জন্য যেকোনো জাতীয়কৃত ব্যাংক থেকে ঋণ সুবিধা",
  amenities: [
    "গ্রাউন্ড ফ্লোর মেইন রোড ফ্রন্টে ২৪ ঘণ্টা ক্রেতাদের বিশাল আনাগোনা",
    "পৃথক বাণিজ্যিক বিদ্যুৎ মিটার ও সার্বক্ষণিক জলের ব্যবস্থা",
    "ফার্মেসি, মিষ্টির দোকান, প্যাথলজি বা কাপড়ের শোরুমের জন্য আদর্শ",
    "বারুইপুর রেল স্টেশন থেকে মাত্র ২ মিনিটের হাঁটা পথ"
  ],
  description: "বারুইপুরের সর্বোচ্চ ভিড়যুক্ত এলাকা স্টেশন রোড ও পুরাতন বাজারের মোড়ে অবস্থিত ৩৫০ বর্গফুটের তৈরি বাণিজ্যিক দোকান। ফ্রন্ট রোড ভিউ, টাইলস ফ্লোরিং এবং মজবুত রিলিং শাটার সহ প্রস্তুত। রেডি ইনভেস্টমেন্ট ও নিয়মিত মাসিক ভাড়ার জন্য অতুলনীয় সুযোগ।",
  imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
  images: [
    "/images/baruipur-real-estate-flats-guide.jpg"
  ],
  featured: true,
  contactPerson: "তারক নাথ সাহা (বারুইপুর ট্রেডার্স কনসালটেন্সি)",
  contactPhone: "+91 98308 11492",
  contactWhatsapp: "+91 98308 11492",
  publishedAt: "২০২৬-১১-১৯"
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

console.log('🎉 ১৯ নভেম্বর (রাত) সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
