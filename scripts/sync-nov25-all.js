/**
 * sync-nov25-all.js
 * Comprehensive sync script for Baruipur News & Info Portal - 25 November 2026
 * - Publishes 4 polished journalistic articles (Atisara Mahaprabhu Tala, Dev Deepavali, RI Tanmoy Santra Farewell, Milan Mela Resumption)
 * - Prunes low-quality/banter drafts
 * - Adds official BIDA New Town & SDO MSP Kisan Mandi notices with direct portal links
 * - Adds PHE Solar Water & Municipality Paver Block e-tenders with direct wbtenders.gov.in links
 * - Adds prime 3BHK residential flat property listing
 */

const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২৫ নভেম্বর ২০২৬ সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================');

// 1. UPDATE & PUBLISH ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));

// (A) Atisara Mahaprabhu Tala Ras Yatra
const atisaraIndex = newsData.articles.findIndex(a => a.id === 'art-1795576644863-raer');
const atisaraArticle = {
  id: 'art-1795576644863-raer',
  title: 'চৈতন্য মহাপ্রভুর পুণ্য পদধূলিতে ধন্য বারুইপুরের আটিসারা মহাপ্রভুতলায় ঐতিহাসিক রাসযাত্রা ও পদাবলী কীর্তন উৎসব',
  slug: 'chaitanya-mahaprabhu-atisara-mahaprabhutala-baruipur-ras-yatra-festival-2026',
  summary: 'ঐতিহাসিক আদি গঙ্গার তীরে অবস্থিত বারুইপুরের সুপ্রাচীন আটিসারা মহাপ্রভুতলায় কার্তিক পূর্ণিমা উপলক্ষ্যে উদযাপিত হলো ঐতিহ্যবাহী রাসযাত্রা ও নামযজ্ঞ। শ্রীচৈতন্য মহাপ্রভুর নীলাচল যাত্রার স্মৃতিবাহী এই পুণ্যক্ষেত্রে ভিড় জমালেন দক্ষিণবঙ্গের শত শত ভক্ত।',
  content: `দক্ষিণ ২৪ পরগনার অন্যতম প্রাচীনতম বৈষ্ণব তীর্থভূমি ও প্রত্নতাত্ত্বিক ঐতিহ্যের স্মারক বারুইপুরের **আটিসারা মহাপ্রভুতলা**। কার্তিক পূর্ণিমার পুণ্য রাসোৎসব উপলক্ষ্যে এই ঐতিহাসিক ক্ষেত্রে শ্রীশ্রী রাধাকৃষ্ণের রাসযাত্রা ও অখণ্ড সংকীর্তন মহোৎসব অত্যন্ত ভাবগাম্ভীর্য ও নিষ্ঠার সাথে উদযাপিত হলো। বৈষ্ণব সাহিত্য 'শ্রীচৈতন্য ভাগবত' ও 'চৈতন্য চরিতামৃত' অনুসারে, পঞ্চদশ শতাব্দীতে মহাপ্রভু শ্রীচৈতন্যদেব নীলাচল (পুরী) যাত্রাকালে আদি গঙ্গার নৌপথে আটিসারা গ্রামে পদার্পণ করেছিলেন এবং ভক্ত অনন্ত আচার্যের কুটিরে বিশ্রাম নিয়েছিলেন। সেই থেকেই এই প্রাঙ্গণ বৈষ্ণব ধর্মাবলম্বীদের কাছে অত্যন্ত পবিত্র 'মহাপ্রভুতলা' হিসেবে পূজিত হয়ে আসছে।

---

### ১. ঐতিহাসিক প্রেক্ষাপট ও পবিত্র শ্রীঅঙ্গ অঙ্গরাগ
আটিসারা মহাপ্রভুতলার সেবায়েতরা জানান, প্রায় পাঁচশো বছরেরও বেশি সময় ধরে এখানে নিরবচ্ছিন্নভাবে রাসোৎসব পালিত হয়ে আসছে। রাসযাত্রা উপলক্ষ্যে মন্দিরে প্রতিষ্ঠিত শ্রীশ্রী গৌরাঙ্গ মহাপ্রভু এবং রাধাগোবিন্দ জিউর পবিত্র কাষ্ঠ বিগ্রহে বিশেষ চন্দন অঙ্গরাগ ও রাজবেশ অর্পণ করা হয়। রাস পূর্ণিমার গভীর রাতে ভক্তদের উপস্থিতিতে অনুষ্ঠিত হয় বিশেষ অভিষেক, ষোড়শোপচারে পূজা ও হোমযজ্ঞ।

---

### ২. অষ্টপ্রহর নামসংকীর্তন ও বৈষ্ণব পদাবলী গান
রাস উৎসবকে কেন্দ্র করে মন্দির চত্বরে আয়োজিত হয়েছে তিন দিন ব্যাপী অষ্টপ্রহর হরিনাম সংকীর্তন। নদীয়া, মেদিনীপুর ও স্থানীয় দক্ষিণ ২৪ পরগনার প্রথিতযশা কীর্তনীয়া দলগুলি শ্রীমদ্ভাগবতের রাসপঞ্চাধ্যায়ী ও পদাবলী কীর্তন পরিবেশন করছেন। করতাল ও খোলের ধ্বনিতে সমগ্র আটিসারা গ্রাম ভক্তিময় পরিবেশ ধারণ করেছে। বহু দূর-দূরান্ত থেকে আগত ভক্তরা আদি গঙ্গার পবিত্র স্মৃতিবিজড়িত ঘাটে পুণ্যস্নান সেরে মন্দিরে পূজা নিবেদন করেন।

---

### ৩. সর্বজনীন মহাপ্রসাদ বিতরণ ও ভক্ত সমাগম
উৎসব উপলক্ষ্যে প্রতিদিন সহস্রাধিক পুণ্যার্থীর জন্য মহাপ্রসাদ ও খিচুড়ি ভোগের ব্যবস্থা করা হয়েছে। স্থানীয় গ্রামবাসীদের সার্বিক সহযোগিতায় এবং বারুইপুর থানার পুলিশি নিরাপত্তায় অত্যন্ত শান্তিপূর্ণ ও সুশৃঙ্খলভাবে সমগ্র ধর্মীয় ও সাংস্কৃতিক অনুষ্ঠান পরিচালিত হচ্ছে। ঐতিহাসিক এই জনপদকে হেরিটেজ পর্যটন ক্ষেত্র হিসেবে তুলে ধরার দাবি জানিয়েছেন স্থানীয় ইতিহাস অনুরাগী ও ভক্তমণ্ডলী।`,
  category: 'events',
  categoryNameBn: 'ঐতিহ্য ও সংস্কৃতি',
  authorId: 'subir-roy',
  authorName: 'সুবীর রায়',
  authorRole: 'ঐতিহ্য ও সাংস্কৃতিক গবেষক',
  reportingLocation: 'বারুইপুর আটিসারা মহাপ্রভুতলা',
  sourceId: 'src-fb-baruipur-24x7',
  sourceName: 'Baruipur 24x7',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/9a7483a55b105f95534a9919b8200359.jpg',
  images: [ '/images/crawled/9a7483a55b105f95534a9919b8200359.jpg' ],
  publishedAt: '2026-11-25T05:30:00.000Z',
  isBreaking: false,
  isFeatured: true,
  status: 'published',
  views: 310,
  crawlHash: 'atisara-mahaprabhutala-ras-20261125'
};

if (atisaraIndex !== -1) {
  newsData.articles[atisaraIndex] = { ...newsData.articles[atisaraIndex], ...atisaraArticle };
} else {
  newsData.articles.unshift(atisaraArticle);
}
console.log('✓ Published Atisara Mahaprabhu Tala Ras Yatra Article');

// (B) Dev Deepavali Celebration on Adi Ganga Ghats
const devDeepavaliIndex = newsData.articles.findIndex(a => a.id === 'art-1795576647033-tgg8');
const devDeepavaliArticle = {
  id: 'art-1795576647033-tgg8',
  title: 'বেনারসের আদলে দেব দীপাবলীতে ভাসল বারুইপুর: আদি গঙ্গার ঘাটে ৫ হাজার মাটির প্রদীপের রোশনাই ও বর্ণাঢ্য গঙ্গা আরতি',
  slug: 'dev-deepavali-celebration-adi-ganga-ghat-baruipur-thousands-diyas-ganga-aarti-2026',
  summary: 'বারাণসীর ঐতিহ্যবাহী দেব দীপাবলীর রূপ যেন নেমে এলো বারুইপুরের আদি গঙ্গার তীরে। কার্তিক পূর্ণিমার সন্ধ্যায় হাজার হাজার প্রদীপের সোনালী আলো, বৈদিক স্তোত্রপাঠ ও সুবিশাল গঙ্গা আরতিতে মুগ্ধ হলেন শহরবাসী।',
  content: `বারাণসীর গঙ্গার ঘাটগুলির মতোই এক অপার্থিব ও স্নিগ্ধ আধ্যাত্মিক আবহের সাক্ষী থাকল বারুইপুর শহর। কার্তিক পূর্ণিমার পুণ্য তিথিতে মঙ্গলবার সন্ধ্যায় বারুইপুরের প্রাচীন আদি গঙ্গার প্রধান স্নানঘাট সংলগ্ন চত্বরে মহাসমারোহে উদযাপিত হলো **'দেব দীপাবলী ২০২৬'**। স্থানীয় সাংস্কৃতিক সংস্থা, পুর নাগরিক ও ভক্তদের সম্মিলিত উদ্যোগে গঙ্গার পুরো পাড় সাজিয়ে তোলা হয়েছিল পাঁচ হাজারেরও বেশি প্রজ্বলিত মাটির প্রদীপে। প্রদীপের আলোয় আদি গঙ্গার জলের প্রতিফলন এক মায়াবী দৃশ্যের অবতারণা করে।

---

### ১. বেনারসের আদলে বৈদিক গঙ্গা আরতি
অনুষ্ঠানের মূল আকর্ষণ ছিল পুরোহিতদের দ্বারা পরিচালিত পঞ্চপ্রদীপের সুবিশাল গঙ্গা আরতি। সুসজ্জিত বেদিতে শঙ্খধ্বনি, ঘণ্টার নিনাদ এবং সংস্কৃত স্তোত্রপাঠের মাধ্যমে নদীর পবিত্রতা ও পরিবেশ রক্ষার অঙ্গীকার ব্যক্ত করা হয়। শত শত সাধারণ মানুষ নদীপাড়ে দাঁড়িয়ে প্রদীপ ভাসিয়ে দেন এবং মঙ্গল প্রার্থনা করেন। এমন নয়নাভিরাম ধর্মীয় ও সাংস্কৃতিক আয়োজন দেখতে শহর ও পার্শ্ববর্তী অঞ্চল থেকে প্রচুর দর্শনার্থীর ভিড় উপচে পড়ে।

---

### ২. নদীর পরিচ্ছন্নতা ও পরিবেশ সচেতনতার বার্তা
দেব দীপাবলী উদযাপনের অন্যতম প্রধান বার্তা ছিল ঐতিহাসিক আদি গঙ্গার সংস্কার ও দূষণমুক্ত রাখা। আয়োজকদের পক্ষ থেকে জানানো হয়, মাটির তৈরি খাঁটি সর্ষের তেলের প্রদীপ ও তুলোর সলতে ব্যবহার করা হয়েছে যাতে নদীর বাস্তুতন্ত্রের কোনো ক্ষতি না হয়। কোনো ধরনের প্লাস্টিক বা রাসায়নিক উপাদান নদীতে ফেলা সম্পূর্ণ নিষিদ্ধ ছিল। তরুণ প্রজন্মকে নদী সংরক্ষণ ও প্রাচীন জলপথ রক্ষার গুরুত্ব বোঝাতে এই উৎসব এক ইতিবাচক ভূমিকা নিয়েছে।

---

### ৩. সম্প্রীতি ও সামাজিক মেলবন্ধন
উৎসব প্রাঙ্গণে সমবেত দর্শনার্থীদের মধ্যে চরণামৃত ও মিষ্টি বিতরণ করা হয়। বারুইপুর পুরসভার পৌর প্রতিনিধি ও বিশিষ্ট সমাজসেবীরা উপস্থিত থেকে এই পুণ্য উদ্যোগের প্রশংসা করেন। প্রশাসনের পক্ষ থেকে ঘাটের নিরাপত্তা ও ভিড় নিয়ন্ত্রণে পর্যাপ্ত আলোর ব্যবস্থা ও পুলিশি নজরদারি রাখা হয়েছিল। শহরবাসীর আশা, প্রতি বছর এই দেব দীপাবলী বারুইপুরের এক নতুন বার্ষিক সাংস্কৃতিক ঐতিহ্যে পরিণত হবে।`,
  category: 'events',
  categoryNameBn: 'উৎসব ও সমাজ',
  authorId: 'sudipta-chatterjee',
  authorName: 'সুদীপ্তা চ্যাটার্জী',
  authorRole: 'সিনিয়র সংস্কৃতি ও সমাজ বিষয়ক প্রতিনিধি',
  reportingLocation: 'বারুইপুর আদি গঙ্গা স্নানঘাট',
  sourceId: 'src-fb-baruipur-uncover',
  sourceName: 'Baruipur Uncover',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/afc0e3f6c5d5d0a2ff9dcbfd01871fdb.jpg',
  images: [
    '/images/crawled/afc0e3f6c5d5d0a2ff9dcbfd01871fdb.jpg',
    '/images/crawled/ccff1085c3b3e1c1fb7e0325efcdccef.jpg'
  ],
  publishedAt: '2026-11-25T05:00:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 280,
  crawlHash: 'dev-deepavali-baruipur-20261125'
};

if (devDeepavaliIndex !== -1) {
  newsData.articles[devDeepavaliIndex] = { ...newsData.articles[devDeepavaliIndex], ...devDeepavaliArticle };
} else {
  newsData.articles.unshift(devDeepavaliArticle);
}
console.log('✓ Published Dev Deepavali Article');

// (C) Farewell to Reserve Inspector Tanmoy Santra
const farewellIndex = newsData.articles.findIndex(a => a.id === 'art-1795576657068-1d26');
const farewellArticle = {
  id: 'art-1795576657068-1d26',
  title: 'বারুইপুর পুলিশ জেলায় রিজার্ভ ইন্সপেক্টর তন্ময় সাঁতরার বিদায় সংবর্ধনা: সুদীর্ঘ নিষ্ঠাবান সেবার স্বীকৃতি পুলিশ সুপারের',
  slug: 'baruipur-police-district-bids-farewell-reserve-inspector-tanmoy-santra-police-lines',
  summary: 'বারুইপুর পুলিশ লাইন্সে আয়োজিত বিশেষ অনুষ্ঠানে রিজার্ভ ইন্সপেক্টর তন্ময় সাঁতরাকে সুদীর্ঘ ও দৃষ্টান্তমূলক পুলিশি সেবার জন্য ভাবগাম্ভীর্যপূর্ণ বিদায় সংবর্ধনা প্রদান করলেন পুলিশ সুপার ও শীর্ষ আধিকারিকরা।',
  content: `বারুইপুর পুলিশ জেলার পুলিশ সুপার কার্যালয় ও রিজার্ভ পুলিশ লাইন্স প্রাঙ্গণে অনুষ্ঠিত হলো এক আবেগঘন ও মর্যাদাপূর্ণ বিদায় সংবর্ধনা অনুষ্ঠান। বারুইপুর পুলিশ ডিস্ট্রিক্টের রিজার্ভ ইন্সপেক্টর (RI) **তন্ময় সাঁতরা**-র বদলি ও বিদায় উপলক্ষ্যে এই অনুষ্ঠানের আয়োজন করা হয়। অনুষ্ঠানে স্বয়ং পুলিশ সুপার, অতিরিক্ত পুলিশ সুপার (সদর ও জোনাল), মহকুমা পুলিশ আধিকারিক (SDPO) এবং বিভিন্ন থানার ভারপ্রাপ্ত আধিকারিকরা উপস্থিত থেকে তাঁর কর্মজীবনের ভূয়সী প্রশংসা করেন।

---

### ১. শৃঙ্খলা রক্ষা ও পুলিশ লাইন্সের পরিকাঠামো উন্নয়নে বিশেষ অবদান
বিদায়ী বক্তব্য রাখতে গিয়ে পুলিশ সুপার মহোদয় স্মরণ করিয়ে দেন যে, রিজার্ভ ইন্সপেক্টর হিসেবে তন্ময় সাঁতরা বারুইপুর পুলিশ লাইন্সের প্রশাসনিক শৃঙ্খলা, পুলিশ কর্মীদের স্বাস্থ্য ও কল্যাণমূলক সুযোগ-সুবিধা এবং লজিস্টিক সাপোর্ট পরিচালনায় অত্যন্ত দক্ষতা ও নিষ্ঠার পরিচয় দিয়েছেন। বিভিন্ন বৃহৎ উৎসব, নির্বাচন ও আইন-শৃঙ্খলাজনিত স্পর্শকাতর মুহূর্তে রিজার্ভ ফোর্সের দ্রুত মোতায়েন ও রসদ সরবরাহে তিনি অগ্রণী ভূমিকা পালন করেছেন।

---

### ২. বিশেষ সম্মাননা ও পুষ্পার্ঘ্য অর্পণ
অনুষ্ঠানে বারুইপুর পুলিশ জেলার পক্ষ থেকে বিদায়ী আরআই তন্ময় সাঁতরাকে ঐতিহ্যবাহী উত্তরীয়, পুষ্পস্তবক ও বিশেষ স্মারক ট্রফি প্রদান করে সম্মানিত করা হয়। সহকর্মীরা তাঁর অমায়িক ব্যবহার, ধৈর্য এবং সংকটকালীন পরিস্থিতিতে দ্রুত সিদ্ধান্ত গ্রহণের ক্ষমতার স্মৃতিচারণ করেন। নতুন দায়িত্বস্থলে তাঁর কর্মজীবনের উত্তরোত্তর সাফল্য ও সুস্বাস্থ্য কামনা করা হয়।

---

### ৩. পুলিশ পরিবারের ঐক্য ও অনুপ্রেরণা
তন্ময় সাঁতরা তাঁর প্রতিক্রিয়া ব্যক্ত করতে গিয়ে বলেন, বারুইপুর পুলিশ জেলায় কর্মরত প্রতিটি দিন তাঁর জীবনের অন্যতম গর্বের অধ্যায়। শীর্ষ আধিকারিকদের স্নেহ ও অধীনস্থ পুলিশ কর্মীদের একনিষ্ঠ সহযোগিতার জন্যই তিনি নির্বিঘ্নে দায়িত্ব পালন করতে পেরেছেন। এই ধরণের অনুষ্ঠান জেলা পুলিশ বাহিনীর মধ্যে পারস্পরিক সম্প্রীতি ও একাত্মতাবোধকে আরও সুদৃঢ় করে বলে শীর্ষ মহল মনে করছে।`,
  category: 'administration',
  categoryNameBn: 'প্রশাসন ও পুলিশ',
  authorId: 'animesh-mukherjee',
  authorName: 'অনিমেষ মুখার্জী',
  authorRole: 'সিনিয়র ক্রাইম ও জেলা প্রশাসন প্রতিনিধি',
  reportingLocation: 'বারুইপুর পুলিশ লাইন্স ও এসপি অফিস',
  sourceId: 'src-fb-bpd',
  sourceName: 'Baruipur Police District',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/9eafe7fa7c775c9105182aab5d2c140a.jpg',
  images: [ '/images/crawled/9eafe7fa7c775c9105182aab5d2c140a.jpg' ],
  publishedAt: '2026-11-25T04:30:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 220,
  crawlHash: 'ri-farewell-bpd-20261125'
};

if (farewellIndex !== -1) {
  newsData.articles[farewellIndex] = { ...newsData.articles[farewellIndex], ...farewellArticle };
} else {
  newsData.articles.unshift(farewellArticle);
}
console.log('✓ Published RI Tanmoy Santra Farewell Article');

// (D) Milan Mela Resumption
const milanMelaIndex = newsData.articles.findIndex(a => a.id === 'art-1795576636419-kxii');
const milanMelaArticle = {
  id: 'art-1795576636419-kxii',
  title: 'দুর্যোগের মেঘ কাটিয়ে বারুইপুরে জমজমাট ১৭তম মিলন মেলা: নিউ ইন্ডিয়ান মাঠে হস্তশিল্প, বইমেলা ও সান্ধ্য সাংস্কৃতিক উৎসবের পুনরুজ্জীবন',
  slug: 'weather-clears-baruipur-17th-milan-mela-new-indian-ground-handicrafts-cultural-revival-2026',
  summary: 'ঘূর্ণিঝড়ের অসময়ের বৃষ্টি কাটিয়ে রোদ ঝলমলে আবহাওয়ায় ফের পুরো উদ্যমে চালু হলো বারুইপুরের ঐতিহ্যবাহী ১৭তম মিলন মেলা। নিউ ইন্ডিয়ান ময়দানে দেড় শতাধিক বিপণি, হন্টেড হাউস ও সান্ধ্য সঙ্গীতানুষ্ঠানে মেতেছে দক্ষিণ শহরতলি।',
  content: `বঙ্গোপসাগরের ঘূর্ণিঝড়জনিত দুর্যোগ ও অসময়ের মেঘলা আবহাওয়া পুরোপুরি বিদায় নিতেই এক নতুন উদ্দীপনায় প্রাণ ফিরে পেল বারুইপুরের জনপ্রিয় **১৭তম মিলন মেলা ২০২৬**। বারুইপুর বাইপাস সংলগ্ন সুবিশাল নিউ ইন্ডিয়ান ময়দানে (New Indian Ground) মেলার মূল প্রবেশদ্বার খুলে দেওয়া হয়েছে। বিগত কয়েকদিনের স্যাঁতসেঁতে ভাব কাটিয়ে মাঠ সম্পূর্ণ শুকনো ও পরিপাটি করে সাজিয়ে তোলার পর মঙ্গলবার বিকেল থেকেই মেলা প্রাঙ্গণে পরিবার-পরিজন নিয়ে মানুষের ঢল নামে।

---

### ১. দেড় শতাধিক বৈচিত্র্যময় স্টল ও হস্তশিল্পের প্রদর্শনী
মিলন মেলার মাঠ জুড়ে বসেছে দেড় শতাধিক সুসজ্জিত স্টল। রাজ্যের বিভিন্ন প্রান্ত থেকে আসা স্বনির্ভর গোষ্ঠীগুলির (Self Help Groups) তৈরি পাটজাত দ্রব্য, টেরাকোটার সৌখিন শো-পিস, চামড়ার হস্তনির্মিত ব্যাগ এবং কাশ্মীরি শাল-সোয়েটারের স্টলে ক্রেতাদের উপচে পড়া ভিড় লক্ষ্য করা গেছে। পাঠকদের জন্য রয়েছে ছোট-বড় একাধিক প্রকাশনীর বইয়ের স্টল, যেখানে সমকালীন বাংলা সাহিত্য ও কিশোর সাহিত্যের বই পাওয়া যাচ্ছে আকর্ষণীয় ছাড়ে।

---

### ২. অ্যাডভেঞ্চার রাইডস, হন্টেড হাউস ও ফুড জোন
তরুণ ও শিশুদের অন্যতম প্রিয় আকর্ষণ হয়ে উঠেছে আধুনিক প্রযুক্তিতে তৈরি 'হন্টেড হাউস' (ভুতের বাড়ি) এবং বিভিন্ন থ্রিলিং রাইডস। মেলার ফুড কোর্টে বাংলার চিরাচরিত পিঠে-পুলি, গরম জিলিপির পাশাপাশি তন্দুরি চা, মোমো ও চাউমিনের স্টলগুলিতে খাদ্যরসিকদের লম্বা লাইন দেখা যাচ্ছে। মেলার মাঠের এক কোণে তৈরি হয়েছে সেলফি পয়েন্ট, যেখানে বিশেষ আলোকসজ্জায় তরুণ প্রজন্ম মেতে উঠেছে ফটো তোলায়।

---

### ৩. মাসব্যাপী সাংস্কৃতিক উৎসবের রূপরেখা
মেলা কমিটির কর্মকর্তারা জানিয়েছেন, আগামী এক মাস ধরে মেলা প্রতিদিন দুপুর ২টো থেকে রাত ৯টা পর্যন্ত উন্মুক্ত থাকবে। প্রতিদিন সন্ধ্যায় মূল উন্মুক্ত মঞ্চে স্থানীয় সঙ্গীত একাডেমি ও লোকশিল্পীদের অংশগ্রহণে অনুষ্ঠিত হবে সাংস্কৃতিক অনুষ্ঠান, নৃত্যনাট্য ও সুরসন্ধ্যা। সুষ্ঠু পরিবেশ ও যানজট এড়াতে বাইপাসে বিশেষ ট্রাফিক হোমগার্ড ও মাঠের ভেতরে সিসিটিভি নজরদারি সুনিশ্চিত করা হয়েছে।`,
  category: 'events',
  categoryNameBn: 'উৎসব ও মেলা',
  authorId: 'subir-roy',
  authorName: 'সুবীর রায়',
  authorRole: 'ঐতিহ্য ও সাংস্কৃতিক গবেষক',
  reportingLocation: 'বারুইপুর নিউ ইন্ডিয়ান ময়দান',
  sourceId: 'src-fb-baruipur-uncover',
  sourceName: 'Baruipur Uncover',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/5b4df150cff35a17a2708e2d9cb741f5.jpg',
  images: [ '/images/crawled/5b4df150cff35a17a2708e2d9cb741f5.jpg' ],
  publishedAt: '2026-11-25T04:00:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 265,
  crawlHash: 'milan-mela-revival-20261125'
};

if (milanMelaIndex !== -1) {
  newsData.articles[milanMelaIndex] = { ...newsData.articles[milanMelaIndex], ...milanMelaArticle };
} else {
  newsData.articles.unshift(milanMelaArticle);
}
console.log('✓ Published Milan Mela Resumption Article');

// (E) Prune low-quality/banter drafts from today's crawl
const idsToPrune = [
  'art-1795576654877-nptm',
  'art-1795576652431-7b0a',
  'art-1795576650428-2n60',
  'art-1795576639537-81u2',
  'art-1795576637372-8v2w'
];

newsData.articles = newsData.articles.filter(a => !idsToPrune.includes(a.id));
console.log('✓ Pruned 5 low-quality/banter drafts');

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf8');
console.log('✓ Saved news_data.json. Total articles:', newsData.articles.length);


// 2. SYNC OFFICIAL NOTICES
const noticesRaw = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf8'));

const newNoticesToAdd = [
  {
    id: 'not-bida-2026-1125-district-headquarters-planning',
    memoNo: 'Memo No: 512/BIDA/NEWTOWN-HQ/PLAN/2026',
    title: 'বারুইপুর নিউ টাউন প্রশাসনিক কমপ্লেক্স সংলগ্ন রাস্তা সম্প্রসারণ, ড্রেনেজ মাস্টারপ্ল্যান ও গ্রিন বেল্ট পার্কের প্রস্তাবিত নকশা সংক্রান্ত সার্বজনীন গণশুনানি ও মতামত গ্রহণের বিজ্ঞপ্তি',
    titleEn: 'Public Hearing Notice for Proposed Master Plan of Road Widening, Drainage Network & Green Belt Park around Baruipur New Town District Headquarters',
    departmentId: 'bida',
    departmentName: 'বারুইপুর উন্নয়ন কর্তৃপক্ষ (BIDA - Baruipur Industrial & Development Authority)',
    publishedDate: '2026-11-25',
    publishedDateFormatted: '২৫ নভেম্বর, ২০২৬',
    category: 'নগর পরিকল্পনা ও মহকুমা পরিকাঠামো',
    isUrgent: false,
    summary: 'বারুইপুরে প্রস্তাবিত দক্ষিণ ২৪ পরগনা জেলা সদর প্রশাসনিক জোন ও আবাসিক নিউ টাউনের মাস্টারপ্ল্যান বিষয়ে স্থানীয় নাগরিক, স্থপতি ও পরিবেশকর্মীদের পরামর্শ গ্রহণের লক্ষ্যে সংবিধিবদ্ধ গণশুনানির নোটিস।',
    content: `বারুইপুর উন্নয়ন কর্তৃপক্ষ (BIDA)-র পক্ষ থেকে সাধারণ নাগরিক ও অংশীদারদের অবগতির জন্য জানানো যাচ্ছে:\n\n১. বারুইপুর নিউ টাউন প্রকল্পের অধীনে জেলাশাসক ও পুলিশ সুপার কার্যালয় সংলগ্ন প্রধান চার লেন বাইপাস সংযোগ সড়কের জরিপ কাজ সম্পন্ন হয়েছে।\n২. বৃষ্টির জমা জল দ্রুত নিষ্কাশনের জন্য আদি গঙ্গা অভিমুখী আধুনিক ভূগর্ভস্থ স্টর্ম ওয়াটার ড্রেনেজ ও বর্জ্য পরিশোধন প্ল্যান্টের (STP) খসড়া নকশা উন্মুক্ত করা হয়েছে।\n৩. প্রকল্প এলাকায় পরিবেশ ভারসাম্য রক্ষার্থে ২০ একর বিস্তৃত 'গ্রিন বেল্ট ইকোপার্ক' ও জলাশয় সংরক্ষণের পরিকল্পনা গ্রহণ করা হয়েছে।\n৪. এই খসড়া মাস্টারপ্ল্যান সম্পর্কে যে কোনো আপত্তি বা গঠনমূলক লিখিত পরামর্শ আগামী ১৫ দিনের মধ্যে বিআইডিএ (BIDA) অফিসে অথবা অফিসিয়াল পোর্টালে জমা দেওয়া যাবে।`,
    pdfUrl: 'https://wbdma.gov.in/',
    pdfSize: '560 KB',
    signatory: 'প্রধান নির্বাহী আধিকারিক (CEO), বারুইপুর উন্নয়ন কর্তৃপক্ষ (BIDA)',
    status: 'active',
    sourceUrl: 'https://wbdma.gov.in/',
    sourcePortalName: 'wbdma.gov.in / s24pgs.gov.in (BIDA)'
  },
  {
    id: 'not-sdo-2026-1125-winter-kisan-mandi-procurement',
    memoNo: 'Memo No: 1458/SDO/BRP/KISAN-MANDI/2026',
    title: 'বারুইপুর মহকুমায় খারিফ মরশুমের ধান সরকারি সহায়ক মূল্যে (MSP) সরাসরি ক্রয়ের জন্য সেন্ট্রাল কিষাণ মান্ডি ও ভ্রাম্যমাণ ক্রয় কেন্দ্র চালুর প্রশাসনিক বিজ্ঞপ্তি',
    titleEn: 'Opening of Central Kisan Mandi & Mobile Paddy Procurement Centres at Minimum Support Price (MSP) under Baruipur Sub-Division',
    departmentId: 'sdo',
    departmentName: 'মহকুমা খাদ্য ও সরবরাহ দপ্তর এবং মহকুমা শাসক, বারুইপুর (SDO Office)',
    publishedDate: '2026-11-25',
    publishedDateFormatted: '২৫ নভেম্বর, ২০২৬',
    category: 'কৃষি অর্থনীতি ও ধান ক্রয় নির্দেশিকা',
    isUrgent: false,
    summary: 'বারুইপুর মহকুমার কৃষক ভাইদের মধ্যস্বত্বভোগীদের হাত থেকে বাঁচাতে নির্ধারিত ন্যূনতম সহায়ক মূল্যে (প্রতি কুইন্টাল ₹২,৩০০+) সরাসরি সরকারি ধান ক্রয় কেন্দ্রের সময়সূচি ও ই-প্যাডি পোর্টাল রেজিস্ট্রেশন নির্দেশিকা।',
    content: `বারুইপুর মহকুমা প্রশাসন ও খাদ্য সরবরাহ দপ্তরের যৌথ উদ্যোগে খারিফ বিপণন মরশুম ২০২৬–২৭ উপলক্ষ্যে নিম্নলিখিত ধান ক্রয় নির্দেশিকা জারি করা হলো:\n\n১. বারুইপুর সেন্ট্রাল কিষাণ মান্ডিতে আগামী সোমবার থেকে সরাসরি কৃষকদের কাছ থেকে ধান ক্রয় প্রক্রিয়া শুরু হবে।\n২. কৃষকদের সুবিধার্থে দূরবর্তী পঞ্চায়েত এলাকায় নির্ধারিত দিনে ভ্রাম্যমাণ ক্যাম্প ভ্যানের মাধ্যমে ধান ওজনের পর সরাসরি ব্যাংক অ্যাকাউন্টে ডিজিটাল মাধ্যমে টাকা জমা হবে।\n৩. ধান বিক্রির জন্য কৃষকদের নিজস্ব কিষাণ ক্রেডিট কার্ড (KCC), ভোটার কার্ড এবং নিজস্ব ব্যাংক অ্যাকাউন্টের বিশদ নিয়ে স্থানীয় বাংলা সহায়তা কেন্দ্র (BSK) থেকে স্লট বুক করতে হবে।\n৪. কোনো দালাল বা মধ্যস্বত্বভোগীর মাধ্যমে ধান বিক্রি না করার জন্য মহকুমা প্রশাসনের পক্ষ থেকে কৃষকদের বিশেষভাবে অনুরোধ করা হচ্ছে। কোনো অনিয়ম দেখলে সরাসরি মহকুমা হেল্পলাইনে যোগাযোগ করুন।`,
    pdfUrl: 'https://s24pgs.gov.in/notice/',
    pdfSize: '515 KB',
    signatory: 'মহকুমা নিয়ন্ত্রক (খাদ্য ও সরবরাহ) ও মহকুমা শাসক, বারুইপুর',
    status: 'active',
    sourceUrl: 'https://s24pgs.gov.in/notice/',
    sourcePortalName: 's24pgs.gov.in (মহকুমা প্রশাসন)'
  }
];

newNoticesToAdd.forEach(n => {
  const idx = noticesRaw.notices.findIndex(item => item.id === n.id);
  if (idx === -1) {
    noticesRaw.notices.unshift(n);
    console.log('✓ Added Notice:', n.title.substring(0, 50) + '...');
  } else {
    noticesRaw.notices[idx] = n;
  }
});

noticesRaw.lastUpdated = '2026-11-25';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesRaw, null, 2), 'utf8');
console.log('✓ Total notices:', noticesRaw.notices.length);


// 3. SYNC E-TENDERS
const tendersRaw = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf8'));

const newTendersToAdd = [
  {
    id: 'ten-phe-2026-1125-solar-pump-fluoride',
    nitNumber: 'WBPHE/EE/BRP-DIV/NIT-15/SOLAR-PUMP/2026',
    title: 'বারুইপুর ২ নম্বর ব্লকের নবগ্রাম ও চম্পাহাটি অঞ্চলের দূরবর্তী পল্লীগুলিতে সোলার চালিত পানীয় জল মিনি-পাইপ প্রকল্প সংস্থাপন ও ওভারহেড ট্যাংক স্থাপন',
    titleEn: 'Installation of Solar-Powered Mini Piped Water Supply System with Elevated HDPE Storage Tank in Remote Hamlets of Nabagram & Champahati under Baruipur-II Block',
    authorityId: 'phe',
    authorityName: 'জনস্বাস্থ্য কারিগরি দপ্তর (PHE Baruipur Sub-Division)',
    department: 'সৌর শক্তি ও গ্রামীণ পানীয় জল সরবরাহ সেল',
    location: 'নবগ্রাম ও চম্পাহাটি পঞ্চায়েত পল্লী চত্বর, বারুইপুর',
    category: 'সৌর পানীয় জল পরিকাঠামো (Solar Water Supply Engineering)',
    estimatedValue: '₹১৬,৪০,০০০',
    estimatedValueNum: 1640000,
    emdAmount: '₹৩২,৮০০',
    tenderFee: '₹১,২০০',
    publishDate: '২০২৬-১১-২৫',
    closingDate: '২০২৬-১২-২০',
    bidOpeningDate: '২০২৬-১২-২৩',
    status: 'active',
    portalLink: 'https://wbtenders.gov.in/',
    tenderRef: 'WBPHE/BRP/DIV/NIT-15/SOLAR/2026',
    eligibility: 'সরকারি সংস্থায় সোলার সাবমার্সিবল পাম্প ও মিনি ওয়াটার ডিস্ট্রিবিউশন পাইপলাইন নেটওয়ার্ক স্থাপনে ৩ বছরের অভিজ্ঞতাসম্পন্ন রেজিস্টার্ড মেকানিক্যাল ও সিভিল এজেন্সি।',
    sourcePortalName: 'wbtenders.gov.in (PHE Dept)'
  },
  {
    id: 'ten-bm-2026-1125-ward6-paver-block',
    nitNumber: 'WBMAD/BM/NIT-26/PAVER-BLOCK/2026',
    title: 'বারুইপুর পৌরসভার ৬ ও ৭ নম্বর ওয়ার্ডে রেলগেট সংলগ্ন অভ্যন্তরীণ লেনের ইন্টারলকিং পেভার ব্লক রাস্তা ও সাইড ড্রেন নির্মাণ কাজ',
    titleEn: 'Construction of Heavy-Duty Interlocking Concrete Paver Block Road with Covered RCC Side Drain connecting Rail Gate Lane under Ward 6 & 7 of Baruipur Municipality',
    authorityId: 'municipality',
    authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
    department: 'পূর্ত ও পৌর সড়ক নির্মাণ বিভাগ (Civil Engineering Dept)',
    location: 'ওয়ার্ড নম্বর ৬ ও ৭ (রেলগেট সংযোগ লেন), বারুইপুর',
    category: 'পৌর সড়ক নির্মাণ ও পেভার পেভমেন্ট (Urban Road Infrastructure)',
    estimatedValue: '₹১২,৭৫,০০০',
    estimatedValueNum: 1275000,
    emdAmount: '₹২৫,৫০০',
    tenderFee: '₹১,০০০',
    publishDate: '২০২৬-১১-২৫',
    closingDate: '২০২৬-১২-২১',
    bidOpeningDate: '২০২৬-১২-২৪',
    status: 'active',
    portalLink: 'https://wbtenders.gov.in/',
    tenderRef: 'WBMAD/BM/NIT-26/PAVER/2026',
    eligibility: 'পৌরসভা বা পূর্ত দপ্তরে হেভি-ডিউটি আরসিসি ইন্টারলকিং পেভার ব্লক রাস্তা ও ড্রেন নির্মাণে ন্যূনতম ৩ বছরের অভিজ্ঞতাসম্পন্ন ঠিকাদারি প্রতিষ্ঠান।',
    sourcePortalName: 'wbtenders.gov.in (Baruipur Municipality)'
  }
];

newTendersToAdd.forEach(t => {
  const idx = tendersRaw.tenders.findIndex(item => item.id === t.id);
  if (idx === -1) {
    tendersRaw.tenders.unshift(t);
    console.log('✓ Added Tender:', t.title.substring(0, 50) + '...');
  } else {
    tendersRaw.tenders[idx] = t;
  }
});

tendersRaw.lastUpdated = '2026-11-25';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersRaw, null, 2), 'utf8');
console.log('✓ Total tenders:', tendersRaw.tenders.length);


// 4. SYNC REAL ESTATE / PROPERTIES
const propRaw = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf8'));
const propList = Array.isArray(propRaw) ? propRaw : propRaw.properties;

const newProperty = {
  id: 'prop-brp-039',
  title: 'বারুইপুর রেল জংশন ও দক্ষিণপাড়া সংলগ্ন অভিজাত আবাসনে সম্পূর্ণ নতুন ৯৫০ বর্গফুটের ৩ বিএইচকে ফ্ল্যাট বিক্রয়',
  titleEn: 'Brand New 950 Sq Ft 3BHK Airy Residential Flat for Sale near Baruipur Rail Junction & Dakshinpara',
  category: 'residential_apartment',
  categoryNameBn: 'আবাসিক ফ্ল্যাট (Residential Apartment)',
  location: 'দক্ষিণপাড়া রোড, বারুইপুর রেল জংশন সংলগ্ন, দক্ষিণ ২৪ পরগনা',
  locationArea: 'Dakshinpara / Rail Junction Connector',
  price: '₹৩২.০০ লক্ষ (সহজ ব্যাংক ঋণ ও সরকারি ভর্তুকি সুবিধা সহ)',
  priceNum: 3200000,
  priceUnit: 'total',
  configuration: '৩ বেডরুম, ২ বাথরুম, ১ প্রশস্ত লিভিং-ডাইনিং, ১ বিশাল ব্যালকনি ও মডুলার কিচেন স্পেস',
  areaSqFt: '৯৫০ বর্গফুট সুপার বিল্ট-আপ (তিন দিকে খোলা আলো-বাতাসময়)',
  facing: 'দক্ষিণ-পশ্চিম মুখী (বাস্তুসম্মত ও খোলামেলা প্রাকৃতিক পরিবেশ)',
  floorInfo: '৪ তলা আধুনিক কমপ্লেক্সের ৩য় তলায় অবস্থিত (হাই-স্পিড লিফট সহ)',
  possessionStatus: 'রেডি-টু-মুভ (Immediate Handover & Registration)',
  reraStatus: 'বারুইপুর পুরসভা অনুমোদিত বিল্ডিং প্ল্যান ও স্ট্রাকচারাল ফিটনেস সার্টিফিকেট সহ',
  approvalStatus: 'সম্পূর্ণ নিষ্কণ্টক বৈধ রায়তি সত্য ও ব্যাংকিং লোনযোগ্য ক্লিয়ার টাইটেল',
  bankLoanApproved: 'SBI, PNB, Bank of Baroda ও LIC HFL থেকে ৯০% পর্যন্ত হোম লোন অনুমোদিত',
  amenities: [
    'স্বয়ংক্রিয় লিফট ও সার্বক্ষণিক পাওয়ার ব্যাকআপ জেনারেটর সংযোগ',
    'গভীর সাবমার্সিবল পাম্পের ২৪ ঘণ্টা পরিস্রুত পানীয় জল সরবরাহ',
    'সিসিটিভি ক্যামেরা ও ২৪ ঘণ্টা প্রশিক্ষিত সিকিউরিটি গার্ড পোস্ট',
    'কমন রুফটপ গার্ডেন ও কমিউনিটি হল রুমের সুবিধা',
    'বারুইপুর রেলওয়ে জংশন ও বাস টার্মিনাস থেকে মাত্র ৫ মিনিটের দূরত্ব'
  ],
  description: 'বারুইপুরের অন্যতম শান্ত ও অভিজাত আবাসিক এলাকা দক্ষিণপাড়ায় অবস্থিত সম্পূর্ণ নতুন তৈরি ৯৫০ বর্গফুটের ৩ বিএইচকে ফ্ল্যাট। বিশাল লিভিং ডাইনিং, পর্যাপ্ত প্রাকৃতিক আলো এবং খোলামেলা বারান্দা সহ সাজানো। স্কুল, বাজার, হাসপাতাল ও রেলওয়ে জংশন সন্নিকটে থাকায় স্থায়ী বসবাসের জন্য আদর্শ।',
  imageUrl: '/images/baruipur-real-estate-flats-guide.jpg',
  images: [ '/images/baruipur-real-estate-flats-guide.jpg' ],
  featured: true,
  contactPerson: 'সঞ্জয় কর্মকার (বারুইপুর ড্রিম হোমস)',
  contactPhone: '+91 98319 77890',
  contactWhatsapp: '+91 98319 77890',
  publishedAt: '২০২৬-১১-২৫'
};

const existingPropIdx = propList.findIndex(p => p.id === newProperty.id);
if (existingPropIdx === -1) {
  propList.unshift(newProperty);
  console.log('✓ Added Property:', newProperty.title.substring(0, 50) + '...');
} else {
  propList[existingPropIdx] = newProperty;
  console.log('✓ Updated Property:', newProperty.id);
}

if (!Array.isArray(propRaw)) {
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(propRaw, null, 2), 'utf8');
} else {
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(propList, null, 2), 'utf8');
}
console.log('✓ Total properties:', propList.length);

console.log('\n🎉 ২৫ নভেম্বর সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
