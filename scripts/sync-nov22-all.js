const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২২ নভেম্বর ২০২৬ সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================\n');

// 1. UPDATE & POLISH NEWS ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
const articles = newsData.articles || newsData;

const polishedNov22Articles = [
  {
    id: 'art-1795328622543-kjcd',
    slug: 'baruipur-police-district-felicitates-seven-officers-exemplary-service-sp-dr-arvind-kumar-anand',
    title: 'নিষ্ঠা ও দৃষ্টান্তমূলক পুলিশি কাজের স্বীকৃতি: বারুইপুর পুলিশ জেলার ৭ আধিকারিক ও কর্মীকে বিশেষ শংসাপত্র প্রদান পুলিশ সুপারের',
    titleEn: 'Recognition of Dedication & Exemplary Policing: Baruipur Police District SP Dr. Arvind Kumar Anand IPS Felicitates Seven Personnel',
    summary: 'অপরাধ দমন, অস্ত্র উদ্ধার ও দ্রুত তদন্ত সম্পন্ন করায় বারুইপুর পুলিশ জেলার সাতজন সাহসী পুলিশ কর্মীকে সংবর্ধনা জানালেন পুলিশ সুপার ড. অরবিন্দ কুমার আনন্দ (আইপিএস)।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও পুলিশ জেলা',
    status: 'published',
    source: 'Baruipur Police District PR',
    sourceUrl: 'https://baruipur.online/news/baruipur-police-district-felicitates-seven-officers-exemplary-service-sp-dr-arvind-kumar-anand',
    author: 'পুলিশ ও প্রশাসন ডেস্ক',
    published_at: '2026-11-22T10:45:00+05:30',
    date: '২২ নভেম্বর, ২০২৬',
    time: 'সকাল ১০:৪৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/edeb86c3f4c77af3c28e761c42f0b99a.jpg'
    ],
    views: 430,
    likes: 42,
    shares: 26,
    tags: ['বারুইপুর পুলিশ জেলা', 'পুলিশ সুপার', 'ড. অরবিন্দ কুমার আনন্দ', 'সংবর্ধনা', 'আইনশৃঙ্খলা', 'দক্ষিণ ২৪ পরগনা'],
    content: `দক্ষিণ ২৪ পরগনার বারুইপুর পুলিশ জেলায় আইনশৃঙ্খলার সুষ্ঠু রূপায়ণ, নিষিদ্ধ মাদক ও অস্ত্র পাচার রোধ এবং সাধারণ মানুষের নিরাপত্তা সুনিশ্চিত করতে যে সমস্ত পুলিশ আধিকারিক ও কর্মী দিনরাত এক করে কর্তব্য পালন করছেন, তাঁদের বিশেষ সম্মাননা জ্ঞাপন করা হলো। আজ বারুইপুর পুলিশ লাইন্সের সম্মেলন কক্ষে আয়োজিত এক অনুষ্ঠানে পুলিশ সুপার ড. অরবিন্দ কুমার আনন্দ (আইপিএস) সাতজন পুলিশ কর্মীর হাতে আনুষ্ঠানিক প্রশংসা পত্র (Appreciation Letter) ও স্মারক তুলে দেন।

পুলিশ সুপার জানান, সাম্প্রতিক সময়ে সুন্দরবন ও মহকুমা এলাকায় একাধিক জটিল অপরাধের রহস্যভেদ, অবৈধ আগ্নেয়াস্ত্র উদ্ধার এবং উপকূলবর্তী দুর্যোগের সময় সাধারণ মানুষকে উদ্ধারকার্যে তাঁদের ভূমিকা ছিল অত্যন্ত প্রশংসনীয়। এই ধরনের কাজের স্বীকৃতি অন্য পুলিশ কর্মীদের মধ্যেও নতুন কর্মোদ্দীপনা সৃষ্টি করবে।

সম্মাননা প্রাপক আধিকারিকরা জানান, জেলা পুলিশের এই স্বীকৃতি তাঁদের দায়িত্ববোধ আরও বহুগুণ বাড়িয়ে দিল। মহকুমাজুড়ে অপরাধমুক্ত ও নিরাপদ পরিবেশ বজায় রাখতে পুলিশ সর্বদা সাধারণ মানুষের সেবায় অঙ্গীকারবদ্ধ থাকবে। অনুষ্ঠানে অতিরিক্ত পুলিশ সুপার ও সমস্ত থানার ওসিরা উপস্থিত ছিলেন।`
  },
  {
    id: 'art-1795328618639-n8rv',
    slug: 'south-24-parganas-mahila-congress-rally-in-baruipur-against-price-rise',
    title: 'নিত্যপ্রয়োজনীয় সামগ্রী ও ভোজ্যতেলের অস্বাভাবিক মূল্যবৃদ্ধির প্রতিবাদে বারুইপুরে জেলা মহিলা কংগ্রেসের বিশাল মিছিল ও বিক্ষোভ সমাবেশ',
    titleEn: 'Massive Protest Rally in Baruipur by District Mahila Congress Protesting Unprecedented Price Rise of Essential Commodities',
    summary: 'আলু, পেঁয়াজ, দুধ ও নিত্যপ্রয়োজনীয় জিনিসপত্রের লাগামহীন দাম বাড়ার বিরুদ্ধে বারুইপুর স্টেশন রোড ও কাছারি মোড়ে থালা-বাসন বাজিয়ে অভিনব প্রতিবাদ মিছিল মহিলা কংগ্রেসের।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও জনস্বার্থ',
    status: 'published',
    source: 'Baruipur Barta / On-Field Bureau',
    sourceUrl: 'https://baruipur.online/news/south-24-parganas-mahila-congress-rally-in-baruipur-against-price-rise',
    author: 'রাজনৈতিক সংবাদদাতা, বারুইপুর',
    published_at: '2026-11-22T10:15:00+05:30',
    date: '২২ নভেম্বর, ২০২৬',
    time: 'সকাল ১০:১৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/b5121e3621e16398c52d3e24dd43f8da.jpg'
    ],
    views: 380,
    likes: 31,
    shares: 19,
    tags: ['বারুইপুর', 'মহিলা কংগ্রেস', 'মূল্যবৃদ্ধি', 'প্রতিবাদ মিছিল', 'কাছারি মোড়', 'বাজার দর'],
    content: `দৈনন্দিন খাদ্যসামগ্রী, রান্নার গ্যাস, ভোজ্যতেল এবং শিশুদের দুধের মাত্রাতিরিক্ত মূল্যবৃদ্ধির প্রতিবাদে আজ বারুইপুর মহকুমা শহরে এক বিশাল প্রতিবাদ মিছিল করল দক্ষিণ ২৪ পরগনা জেলা মহিলা কংগ্রেস। পশ্চিমবঙ্গ প্রদেশ কংগ্রেসের আহ্বানে এই কর্মসূচিতে শত শত মহিলা কর্মী-সমর্থক খালি হাঁড়ি ও থালা-বাসন হাতে নিয়ে বারুইপুর রেলওয়ে স্টেশন চত্বর থেকে কাছারি মোড় পর্যন্ত পদযাত্রা করেন।

মিছিল শেষে কাছারি মোড়ে আয়োজিত পথসভায় মহিলা কংগ্রেস নেত্রীরা অভিযোগ করেন, "নিত্যপণ্যের লাগামহীন দাম বৃদ্ধিতে সাধারণ মধ্যবিত্ত ও খেটে খাওয়া মানুষের সংসার চালানো অসম্ভব হয়ে পড়েছে। অথচ কালোবাজারি রুখতে সরকারের কোনো কার্যকর নজরদারি নেই।" অবিলম্বে বাজার নিয়ন্ত্রণে টাস্ক ফোর্সের নিয়মিত তল্লাশি এবং ন্যায্য মূল্যের দোকান থেকে প্রয়োজনীয় সামগ্রী সরবরাহের জোর দাবি জানানো হয়।

বিক্ষোভকারীরা জানান, কেন্দ্র ও রাজ্য সরকারের অবিলম্বে সাধারণ মানুষের কষ্ট লাঘবে শুল্ক ছাড় ও বিকল্প ব্যবস্থা গ্রহণ করা উচিত। দাবি পূরণ না হলে আগামী দিনে মহকুমা জুড়ে আরও বৃহত্তর গণআন্দোলনের হুঁশিয়ারি দেওয়া হয়েছে। মিছিল ঘিরে বারুইপুর থানার পুলিশ কড়া নিরাপত্তা বজায় রেখেছিল।`
  },
  {
    id: 'art-1795328632167-avu7',
    slug: 'baruipur-ajeya-sangha-bijoya-sammilani-two-day-cultural-festival-2026',
    title: 'বারুইপুর অজেয় সংঘের ঐতিহ্যবাহী বিজয়া সম্মিলনী ২০২৬: দুদিন ব্যাপী বর্ণাঢ্য সাংস্কৃতিক উৎসব ও কৃতী সংবর্ধনা',
    titleEn: 'Baruipur Ajeya Sangha Celebrates Grand Two-Day Bijoya Sammilani 2026 with Cultural Events & Felicitations',
    summary: 'বারুইপুর শহরের অন্যতম অগ্রণী সামাজিক প্রতিষ্ঠান অজেয় সংঘের পরিচালনায় সাড়ম্বরে অনুষ্ঠিত হলো বাৎসরিক বিজয়া সম্মিলনী। স্থানীয় প্রবীণ ও মাধ্যমিক-উচ্চমাধ্যমিকের কৃতীদের সংবর্ধনা।',
    category: 'culture',
    categoryBn: 'উৎসব ও সংস্কৃতি',
    status: 'published',
    source: 'Local Club Network Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-ajeya-sangha-bijoya-sammilani-two-day-cultural-festival-2026',
    author: 'সাংস্কৃতিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-22T09:30:00+05:30',
    date: '২২ নভেম্বর, ২০২৬',
    time: 'সকাল ০৯:৩০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/f9c714781ff0a136088a0443a051662c.jpg',
      '/images/crawled/1887faf1824badd15925027949aa9a8c.jpg',
      '/images/crawled/385c9553af4121b9226357ec7be1fcce.jpg'
    ],
    views: 460,
    likes: 48,
    shares: 28,
    tags: ['বারুইপুর', 'অজেয় সংঘ', 'বিজয়া সম্মিলনী', 'সাংস্কৃতিক অনুষ্ঠান', 'কৃতী সংবর্ধনা', 'সামাজিক সম্প্রীতি'],
    content: `বারুইপুরের শতাব্দীপ্রাচীন ঐতিহ্য ও ক্রীড়া-সাংস্কৃতিক পরিমণ্ডলের অন্যতম প্রাণকেন্দ্র অজেয় সংঘের উদ্যোগে মহাসমারোহে উদযাপিত হলো দুদিন ব্যাপী বিজয়া সম্মিলনী ও সাংস্কৃতিক উৎসব ২০২৬। ২১ ও ২২ নভেম্বর ক্লাব প্রাঙ্গণে এই উপলক্ষে নানা বয়সের মানুষের স্বতঃস্ফূর্ত সমাবেশ ঘটে।

অনুষ্ঠানের শুভ সূচনায় এলাকার বরিষ্ঠ নাগরিকদের উত্তরীয় ও মিষ্টিমুখ করিয়ে সংবর্ধনা জানানো হয়। পাশাপাশি এ বছর মাধ্যমিক ও উচ্চমাধ্যমিক পরীক্ষায় মহকুমার বিভিন্ন বিদ্যালয় থেকে সেরা ফল করা কৃতী ছাত্রছাত্রীদের হাতে শিক্ষামূলক পুরস্কার তুলে দেন ক্লাব কর্মকর্তারা। সন্ধ্যায় স্থানীয় ও কলকাতার জনপ্রিয় সংগীত শিল্পীদের পরিবেশনায় রবীন্দ্রসঙ্গীত, আধুনিক গান ও নাটক মঞ্চস্থ হয়।

ক্লাব সভাপতি ও সাধারণ সম্পাদক জানান, বিজয়ার প্রীতি ও শুভেচ্ছা বিনিময়ের মাধ্যমে সমাজের সমস্ত স্তরের মানুষের মধ্যে ভ্রাতৃত্ববোধ সুদৃঢ় করাই এই অনুষ্ঠানের মূল উদ্দেশ্য। স্থানীয় বাসিন্দারা ক্লাবের এই বর্ণাঢ্য উদ্যোগকে সাধুবাদ জানিয়েছেন।`
  },
  {
    id: 'art-20261122-weather-clears-diamond-circus-rasmath',
    slug: 'weather-clears-in-baruipur-after-cyclone-diamond-circus-rasmath-preparations-complete',
    title: 'ঘূর্ণিঝড় \'আকভান\'-এর মেঘ কেটে বারুইপুরে ঝলমলে রোদ: রাস মাঠে ডায়মন্ড সার্কাসের প্রস্তুতি সম্পন্ন, কাল থেকেই শুরু হচ্ছে শো',
    titleEn: 'Sunny Skies Return to Baruipur as Cyclone Akvan Weakens: Diamond Circus Preparations Completed at Rasmath',
    summary: 'টানা দুদিনের বৃষ্টির অবসান ঘটিয়ে দক্ষিণ ২৪ পরগনায় ফিরল স্বস্তির রোদ। রাস মাঠে জল নিষ্কাশন সম্পন্ন করে সোমবার থেকেই ডায়মন্ড সার্কাসের উদ্বোধনী প্রদর্শনীর চূড়ান্ত ঘোষণা মেলা কমিটির।',
    category: 'municipality',
    categoryBn: 'আবহাওয়া ও বিনোদন',
    status: 'published',
    source: 'Baruipur Civic & Mela Desk',
    sourceUrl: 'https://baruipur.online/news/weather-clears-in-baruipur-after-cyclone-diamond-circus-rasmath-preparations-complete',
    author: 'বারুইপুর বার্তা ডেস্ক',
    published_at: '2026-11-22T08:50:00+05:30',
    date: '২২ নভেম্বর, ২০২৬',
    time: 'সকাল ০৮:৫০',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/1466ab9adfd2a521be6e920a3f8ba959.jpg'
    ],
    views: 590,
    likes: 54,
    shares: 41,
    tags: ['বারুইপুর', 'আবহাওয়া', 'রাস মাঠ', 'ডায়মন্ড সার্কাস', 'রাসমেলা ২০২৬', 'সার্কাস শো'],
    content: `বঙ্গোপসাগরে নিম্নচাপ ও ঘূর্ণিঝড় 'আকভান'-এর প্রভাব কেটে গিয়ে আজ সকাল থেকেই বারুইপুর ও সংলগ্ন দক্ষিণ ২৪ পরগনায় দেখা মিলেছে ঝলমলে মিষ্টি রোদের। আকাশে মেঘের ঘনঘটা কেটে যাওয়ায় সাধারণ মানুষের পাশাপাশি স্বস্তির নিঃশ্বাস ফেলেছেন বারুইপুর রাসমেলা ও ডায়মন্ড সার্কাসের উদ্যোক্তারা।

টানা বৃষ্টিতে রাস মাঠের যে সমস্ত অংশে সাময়িক জল জমেছিল, পৌরসভার উদ্যোগে পাম্প চালিয়ে সেই জল নিষ্কাশন করা হয়েছে এবং মাঠে শুকনো বালি ও ছাই ফেলে চলাচলের সম্পূর্ণ উপযোগী করে তোলা হয়েছে। ডায়মন্ড সার্কাস কর্তৃপক্ষের পক্ষ থেকে জানানো হয়েছে, বৃষ্টির কারণে উদ্বোধনী শো স্থগিত রাখা হলেও সোমবার বিকেল থেকে প্রতিদিন তিনটি করে শো (দুপুর ১টা, বিকেল ৪টা এবং সন্ধ্যা ৭টা) নিয়মিত প্রদর্শিত হবে।

আন্তর্জাতিক মানের অ্যাক্রোব্যাট, রাশিয়ান জিমন্যাস্ট এবং জাদুকরী শারীরিক কসরতের প্রস্তুতি দেখতে আজ সকাল থেকেই মেলা মাঠে ভিড় জমিয়েছেন বহু উৎসাহী দর্শক। রাসমেলা পূর্ববর্তী এই সার্কাস বারুইপুরবাসীর শীতকালীন বিনোদনের সেরা আকর্ষণ হয়ে উঠবে বলে আশা প্রকাশ করেছেন উদ্যোক্তারা।`
  }
];

polishedNov22Articles.forEach(pa => {
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
  'art-1795328644311-ixds', // ইন্দিরা গান্ধী
  'art-1795328643367-v7rd', // ঘূর্ণি ঝড় ধেয়ে আসছে
  'art-1795328643212-zsib', // কোন স্কুলের স্টুডেন্ট তুমি
  'art-1795328643035-moyn', // এই বৃষ্টিতে অফিস ছুটি
  'art-1795328634165-1ql3', // পুরনো সোয়েটারকে টাটা
  'art-1795328623072-vsmv'  // দীঘা সমুদ্রে পর্যটক
];

const initialCount = articles.length;
newsData.articles = articles.filter(a => !spamDraftIds.includes(a.id));
console.log(`✓ Pruned ${initialCount - newsData.articles.length} spam/out-of-area drafts. Total articles: ${newsData.articles.length}`);

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf-8');
console.log('✓ Saved news_data.json\n');


// 2. UPDATE NOTICES DATA
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));
const newNotice = {
  id: 'not-sdo-2026-1122-rasmela-noc-stalls',
  memoNo: 'Memo No: 1435/SDO/BRP/RASMELA-NOC/2026',
  title: 'বারুইপুর রাসমেলা ২০২৬ প্রাঙ্গণে বাণিজ্যিক স্টল, ফুড কোর্ট ও রাইডস বসানোর জন্য অগ্নি ও বিদ্যুৎ সুরক্ষা এনওসি (NOC) সংক্রান্ত সংবিধিবদ্ধ নির্দেশিকা',
  titleEn: 'Mandatory Fire & Electrical Safety NOC Guidelines for Stalls, Food Courts and Amusement Rides at Baruipur Rasmela 2026',
  departmentId: 'sdo',
  departmentName: 'মহকুমা শাসক (SDO Baruipur) ও দমকল বিভাগ',
  publishedDate: '2026-11-22',
  publishedDateFormatted: '২২ নভেম্বর, ২০২৬',
  category: 'মেলা ও জনশৃঙ্খলা বিধি',
  isUrgent: false,
  summary: 'রাসমাঠে মেলা চলাকালীন অগ্নিকাণ্ড রোধে সমস্ত অস্থায়ী কাঠামো, ফাস্টফুডের দোকান ও বিদ্যুৎ সংযোগে দমকল ও সিইএসসি/ডব্লিউবিএসইডিসিএল-এর সংবিধিবদ্ধ সুরক্ষা মানদণ্ড পালনের বিজ্ঞপ্তি।',
  content: `আসন্ন ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬ সুষ্ঠু, নিরাপদ ও নির্বিঘ্নে পরিচালনার লক্ষ্যে মহকুমা প্রশাসন, দমকল বিভাগ ও বারুইপুর পুরসভার পক্ষ থেকে নিম্নলিখিত নির্দেশিকা জারি করা হলো:\n\n১. মেলা প্রাঙ্গণে যেকোনো ধরনের স্টল, প্রদর্শনী মণ্ডপ বা ফুড স্টল নির্মাণের ক্ষেত্রে অদাহ্য পদার্থ (নন-ইনফ্লেমেবল শিট) ব্যবহারের অগ্রাধিকার দিতে হবে।\n২. গ্যাস সিলিন্ডার ব্যবহারকারী প্রতিটি খাবারের দোকানে বাধ্যতামূলকভাবে বৈধ অগ্নিনির্বাপক যন্ত্র (Fire Extinguisher) এবং বালতিভর্তি শুকনো বালু রাখতে হবে।\n৩. অনুমোদনহীন কোনো হুকিং বা কাট-তার দিয়ে বিদ্যুৎ সংযোগ সম্পূর্ণ নিষিদ্ধ। সমস্ত ক্যাবলিং অনুমোদিত লাইসেন্সপ্রাপ্ত ঠিকাদার মারফত করাতে হবে।\n৪. মেলা শুরুর পূর্বে দমকল দপ্তর ও মহকুমা প্রশাসনের যৌথ পরিদর্শনের পর ফিটনেস সার্টিফিকেট সংগ্রহ করা বাধ্যতামূলক। শর্ত লঙ্ঘনে আইনানুগ ব্যবস্থা গ্রহণ করা হবে।`,
  pdfUrl: 'https://s24pgs.gov.in/notice/',
  pdfSize: '535 KB',
  signatory: 'মহকুমা শাসক ও প্রশাসনিক কমিটি, বারুইপুর মহকুমা',
  status: 'active',
  sourceUrl: 'https://s24pgs.gov.in/notice/',
  sourcePortalName: 's24pgs.gov.in (মহকুমা প্রশাসন)'
};

noticesData.notices = noticesData.notices.filter(n => n.id !== newNotice.id);
noticesData.notices.unshift(newNotice);
noticesData.lastUpdated = '2026-11-22';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✓ Added Notice: ${newNotice.memoNo} - ${newNotice.title.substring(0, 50)}...`);
console.log(`✓ Total notices: ${noticesData.notices.length}\n`);


// 3. UPDATE TENDERS DATA
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));
const newTender = {
  id: 'ten-bm-2026-1122-led-streetlighting',
  nitNumber: 'WBMAD/BM/NIT-23/LED-STREETLIGHT/2026',
  title: 'বারুইপুর পুরসভার কুলপী রোড, স্টেশন রোড ও নবনির্মিত বাইপাস সংযোগে উচ্চ ক্ষমতাসম্পন্ন স্মার্ট এলইডি স্ট্রিট লাইট সংস্থাপন ও পোল ফিটিংস',
  titleEn: 'Supply, Installation & Commissioning of Smart Energy-Efficient LED Street Light Fittings on Kulpi Road, Station Road & Bypass Connectors under Baruipur Municipality',
  authorityId: 'municipality',
  authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
  department: 'বিদ্যুৎ ও পৌর আলোকসজ্জা বিভাগ',
  location: 'কুলপী রোড, বারুইপুর স্টেশন রোড ও বাইপাস ক্রসিং',
  category: 'বৈদ্যুতিক পরিকাঠামো (Electrical Lighting)',
  estimatedValue: '₹১৬,৭৫,০০০',
  estimatedValueNum: 1675000,
  emdAmount: '₹৩৩,৫০০',
  tenderFee: '₹১,০০০',
  publishDate: '২০২৬-১১-২২',
  closingDate: '২০২৬-১২-১৫',
  bidOpeningDate: '২০২৬-১২-১৭',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBMAD/BM/NIT-23/ELEC/2026',
  eligibility: 'সরকারি বা পুর সংস্থায় এলইডি স্ট্রিট লাইটিং, আন্ডারগ্রাউন্ড ক্যাবলিং ও অটোমেটিক টাইমার প্যানেল ইনস্টলেশনে ৩ বছরের অভিজ্ঞতাসম্পন্ন বৈদ্যুতিক ঠিকাদারি লাইসেন্সধারী এজেন্সি।',
  sourcePortalName: 'wbtenders.gov.in'
};

tendersData.tenders = tendersData.tenders.filter(t => t.id !== newTender.id);
tendersData.tenders.unshift(newTender);
tendersData.lastUpdated = '2026-11-22';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✓ Added Tender: ${newTender.nitNumber} - ${newTender.title.substring(0, 50)}...`);
console.log(`✓ Total tenders: ${tendersData.tenders.length}\n`);


// 4. UPDATE BUY & SALES (PROPERTIES DATA)
const propertiesData = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf-8'));
const newProperty = {
  id: "prop-brp-036",
  title: "বারুইপুর বাইপাস ও পদ্মপুকুর সংলগ্ন সম্পূর্ণ নতুন ৩ কাঠার বাউন্ডারি ওয়াল ঘেরা আবাসিক বাস্তু প্লট বিক্রয়",
  titleEn: "3 Katha Prime Residential Gated Vastu Plot for Sale near Baruipur Bypass & Padmapukur Junction",
  category: "land_plot",
  categoryNameBn: "আবাসিক জমি/প্লট (Residential Land)",
  location: "পদ্মপুকুর বাইপাস সংযোগ, বারুইপুর, দক্ষিণ ২৪ পরগনা",
  locationArea: "Padmapukur / Bypass Connector",
  price: "₹২৪.০০ লক্ষ (প্রতি কাঠা ₹৮.০০ লক্ষ)",
  priceNum: 2400000,
  priceUnit: "total",
  configuration: "৩ কাঠা চারকোনা ভরাট প্লট (২৪ ফুট চওড়া পিচ ড্রেনেজ রোড ফ্রন্ট)",
  areaSqFt: "২,১৬০ বর্গফুট (৩ কাঠা)",
  facing: "দক্ষিণ-পূর্ব মুখী (বাস্তুসম্মত ও আলোময়)",
  floorInfo: "সম্পূর্ণ নিষ্কণ্টক বাস্তু জমি (৬ ফুট সীমানা প্রাচীর ও গেট সহ)",
  possessionStatus: "তাৎক্ষণিক রেজিস্ট্রি ও দখল (Immediate Registry)",
  reraStatus: "বারুইপুর পুরসভা ও বিএলআরও রেকর্ডভুক্ত বৈধ বাস্তু জমি",
  approvalStatus: "সম্পূর্ণ নিষ্কণ্টক রায়তি দলিল ও ডিজিটাল পর্চা সহ প্রস্তুত",
  bankLoanApproved: "বাড়ি তৈরির জন্য SBI, PNB ও HDFC ল্যান্ড লোন অনুমোদিত",
  amenities: [
    "২৪ ফুট চওড়া পিচ ঢালাই রাস্তা সংলগ্ন বিশাল সম্মুখভাগ",
    "বিদ্যুৎ সংযোগ, পানীয় জলের লাইন ও আন্ডারগ্রাউন্ড ড্রেনেজ সংযোগ প্রস্তুত",
    "শান্ত, নিরাপদ ও দ্রুত বিকাশশীল ভিআইপি আবাসিক এলাকা",
    "বারুইপুর বাইপাস থেকে মাত্র ১ মিনিট ও রেল জংশনের হাঁটা পথ"
  ],
  description: "বারুইপুরের সর্বোচ্চ চাহিদাসম্পন্ন আবাসিক অঞ্চল পদ্মপুকুর বাইপাস সংযোগে অবস্থিত ৩ কাঠার সম্পূর্ণ চারকোনা উঁচু ভরাট বাস্তু প্লট। চারপাশ ৬ ফুট উঁচু মজবুত বাউন্ডারি ওয়াল ও লোহার গেট দিয়ে সুরক্ষিত। অবিলম্বে বিলাসবহুল বাড়ি বা ভিলা তৈরির জন্য একদম আদর্শ।",
  imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
  images: [
    "/images/baruipur-real-estate-flats-guide.jpg"
  ],
  featured: true,
  contactPerson: "শুভময় মুখার্জী (বারুইপুর ল্যান্ড হাব)",
  contactPhone: "+91 98316 55210",
  contactWhatsapp: "+91 98316 55210",
  publishedAt: "২০২৬-১১-২২"
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

console.log('🎉 ২২ নভেম্বর সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
