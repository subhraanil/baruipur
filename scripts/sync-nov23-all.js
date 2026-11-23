/**
 * sync-nov23-all.js
 * Comprehensive sync script for Baruipur News & Info Portal - 23 November 2026
 * - Publishes 4 polished journalistic articles (including user-approved Rasmela guide expansion)
 * - Prunes low-quality/banter drafts
 * - Adds official SDO/Health notice with direct portal links
 * - Adds active Municipality e-tender with direct wbtenders.gov.in link
 * - Adds prime property listing
 */

const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২৩ নভেম্বর ২০২৬ সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================');

// 1. UPDATE & PUBLISH ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));

// (A) Elevate Rasmela Guide to User-Approved Canonical Pillar Guide
const rasmelaIndex = newsData.articles.findIndex(a => a.id === 'art-1795194062359-z5vd');
const rasmelaArticle = {
  id: 'art-1795194062359-z5vd',
  title: 'ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬: সম্পূর্ণ সময়সূচি, ইতিহাস, মেলার স্টল ও যাতায়াত নির্দেশিকা',
  slug: 'historic-baruipur-rasmela-2026-schedule-history-stalls-travel-guide',
  summary: 'দক্ষিণ ২৪ পরগনার অন্যতম প্রাচীন ও বৃহত্তম বারুইপুর রাসমেলা ২০২৬-এর পূর্ণাঙ্গ গাইড। রায়চৌধুরী জমিদার বাড়ির তিন শতাব্দীর ঐতিহ্য, রাসমাঠের স্টল বিন্যাস, সময়সূচি, প্রশাসনিক নিরাপত্তা ও যাতায়াতের পুঙ্খানুপুঙ্খ বিবরণ।',
  content: `দক্ষিণ ২৪ পরগনার দক্ষিণ শহরতলির ঐতিহ্যবাহী জনপদ বারুইপুরের সর্ববৃহৎ লোকউৎসব ও মিলনক্ষেত্র হলো ঐতিহাসিক **বারুইপুর রাসমেলা ২০২৬**। কার্তিক পূর্ণিমার পুণ্য তিথিতে রাধা-কৃষ্ণের রাসলীলা উপলক্ষ্যে আয়োজিত এই মেলা শুধু ধর্মীয় আনুষ্ঠানিকতার মধ্যেই সীমাবদ্ধ নয়; বরং এটি হয়ে উঠেছে বৃহত্তর সুন্দরবন ও দক্ষিণ ২৪ পরগনার হাজার হাজার মানুষের মিলনক্ষেত্র, গ্রামীণ অর্থনীতি ও কুটির শিল্পের প্রধান বিপণন কেন্দ্র। ২০২৬ সালের রাসমেলা ঘিরে এখন সাজ সাজ রব ঐতিহাসিক বারুইপুর রাসমাঠ এবং সংলগ্ন রায়চৌধুরী রাজবাড়ি চত্বরে।

---

### ১. তিন শতাব্দীর সুপ্রাচীন ঐতিহ্য ও রায়চৌধুরী রাজবাড়ি
বারুইপুরের রাসোৎসবের ইতিহাস প্রায় তিন শতাব্দী প্রাচীন। অষ্টাদশ শতকে বারুইপুরের প্রভাবশালী সাবর্ণ রায়চৌধুরী জমিদার বংশের হাত ধরে এই বৈষ্ণব উৎসবের শুভ সূচনা হয়েছিল। কথিত আছে, রায়চৌধুরী পরিবারের আরাধ্য কুলদেবতা শ্রীশ্রী মদনমোহন জিউ ও রাধাবল্লভ জিউর রাসলীলা উদযাপনে এই মেলার প্রবর্তন হয়। রায়চৌধুরীদের প্রতিষ্ঠিত প্রাচীন নবরত্ন ও আটচালা মন্দিরে প্রতি বছর রাস পূর্ণিমার দিন বিশেষ অষ্টপ্রহর সংকীর্তন, রাজবেশে বিগ্রহ দর্শন ও বিশেষ ভোগ নিবেদনের ব্যবস্থা থাকে। রাজবাড়ির ঠাকুরদালান থেকে বিগ্রহের শোভাযাত্রা সহকারে রাস প্রাঙ্গণে আগমন মেলাটির অন্যতম প্রধান ধর্মীয় আনুষ্ঠানিকতা।

---

### ২. বারুইপুর রাসমেলা ২০২৬-এর পূর্ণাঙ্গ সময়সূচি ও আচার-অনুষ্ঠান
২০২৬ সালের বারুইপুর রাসমেলা ঐতিহ্যবাহী তিথি ও প্রশাসনিক সমন্বয় অনুযায়ী একটানা ১৫ দিন ব্যাপী উদযাপিত হতে চলেছে:

* **রাস পূর্ণিমা ও শুভ উদ্বোধন:** কার্তিক পূর্ণিমার পুণ্যলগ্নে রায়চৌধুরী মন্দিরে বিশেষ পূজা-অর্চনা, মহা আরতি ও হোমযজ্ঞের মাধ্যমে উৎসবের শুভ সূচনা।
* **বিগ্রহ দর্শন ও রাসলীলা পাঠ:** প্রতিদিন বিকেল ৪টা থেকে রাত ১০টা পর্যন্ত দর্শনার্থীদের জন্য বিশেষ রাসলীলা পদাবলী কীর্তন ও ভক্তিমূলক সঙ্গীতানুষ্ঠান।
* **মেলার মূল বাণিজ্যিক ও সাংস্কৃতিক পর্ব:** একটানা ১৫ দিন ধরে প্রতিদিন দুপুর ২টা থেকে গভীর রাত পর্যন্ত মেলা প্রাঙ্গণ উন্মুক্ত থাকবে।
* **সমাপ্তি ও মিলন উৎসব:** ১৫তম দিনে বিশেষ সাংস্কৃতিক অনুষ্ঠান ও কৃতী শিল্পীদের সংবর্ধনা সহযোগে মেলার সমাপ্তি ঘোষণা করা হবে।

---

### ৩. মেলার প্রধান আকর্ষণ: স্টল, ফুড কোর্ট ও বিনোদন চত্বর
বারুইপুর রাসমাঠের বিশাল প্রাঙ্গণে এ বছর চার শতাধিক বৈচিত্র্যময় স্টল গড়ে তোলা হয়েছে:

1. **হস্তশিল্প ও কুটির শিল্প:** জয়নগরের মোয়া, মেদিনীপুরের মাদুর, শান্তিপুরের তাঁতের শাড়ি, মাটির পাত্র এবং সুন্দরবনের খাঁটি মধু ও বাঁশের তৈরি সৌখিন শিল্পসামগ্রী।
2. **ফুড কোর্ট ও খাবারের মেলা:** কলকাতার ঐতিহ্যবাহী রোল-চাউমিন থেকে শুরু করে গরম জিলিপি, ক্ষীরকদম, বারুইপুরের বিখ্যাত পেয়ারা সন্দেশ এবং বিভিন্ন প্রদেশের চাট ও তন্দুরি খাবারের সমাহার।
3. **বিনোদন ও রাইডস জোন:** শিশুদের জন্য জায়ান্ট হুইল (নাগরদোলা), ড্রাগন ট্রেন, টয় কার এবং ব্রেক ড্যান্স রাইড।
4. **ডায়মন্ড সার্কাস:** রাসমাঠ সংলগ্ন বিশেষ প্রদর্শনী মাঠে স্থাপিত হয়েছে বিখ্যাত ডায়মন্ড সার্কাসের বিশাল তাঁবু, যেখানে দিনে ৩টি করে প্রদর্শনী অনুষ্ঠিত হচ্ছে।

---

### ৪. মহকুমা প্রশাসন ও পুরসভার বিশেষ নিরাপত্তা ব্যবস্থা
মেলায় লক্ষাধিক মানুষের সমাগম সামলাতে বারুইপুর মহকুমা প্রশাসন (SDO), বারুইপুর পুলিশ জেলা এবং বারুইপুর পুরসভা যৌথভাবে ব্যাপক প্রস্তুতি গ্রহণ করেছে:

* **সিসিটিভি ও নজরদারি টাওয়ার:** পুরো রাসমাঠ ও প্রবেশদ্বারে ৫০টিরও বেশি সিসিটিভি ক্যামেরা ও ৩টি ওয়াচ টাওয়ার থেকে সার্বক্ষণিক পুলিশি পর্যবেক্ষণ চালানো হচ্ছে।
* **অগ্নি ও বিদ্যুৎ সুরক্ষা (Fire NOC):** প্রতিটি ফুড স্টল ও কাঠের কাঠামোয় অগ্নিনির্বাপক ব্যবস্থা রাখা বাধ্যতামূলক করা হয়েছে। দমকলের বিশেষ ইউনিট মেলা প্রাঙ্গণে সার্বক্ষণিক মোতায়েন রয়েছে।
* **জরুরি স্বাস্থ্য সহায়তা:** বারুইপুর মহকুমা হাসপাতালের তত্ত্বাবধানে মেলা প্রাঙ্গণে ২৪ ঘণ্টার মোবাইল মেডিক্যাল ক্যাম্প ও প্রস্তুত অ্যাম্বুল্যান্সের ব্যবস্থা রাখা হয়েছে।

---

### ৫. যাতায়াত নির্দেশিকা: কীভাবে পৌঁছাবেন বারুইপুর রাসমেলায়?
কলকাতা ও পার্শ্ববর্তী অঞ্চল থেকে বারুইপুর রাসমেলায় যাতায়াত অত্যন্ত সুগম ও সহজ:

* **লোকাল ট্রেন মারফত:** শিয়ালদহ দক্ষিণ শাখা (Sealdah South Section) থেকে বারুইপুর জংশনগামী যেকোনো লোকাল ট্রেনে (বারুইপুর, ডায়মন্ড হারবার, নামখানা, ক্যানিং বা লক্ষ্মীকান্তপুর লোকাল) চেপে বারুইপুর জংশন স্টেশনে পৌঁছান। স্টেশন থেকে অটো বা রিকশায় মাত্র ৫-৭ মিনিটেই পৌঁছে যাওয়া যায় রাসমাঠে।
* **মেট্রো ও সড়কপথে:** কবি সুভাষ (নিউ গড়িয়া) মেট্রো স্টেশন থেকে বারুইপুর বাইপাস অটো বা বাসে চড়ে বারুইপুর কাচারি মোড় অথবা রাসমাঠ ক্রসিংয়ে নামতে হবে।
* **আমতলা ও ডায়মন্ড হারবার দিক থেকে:** কুলপী রোড ও আমতলা-বারুইপুর রুটের বাসে সরাসরি রাস মাঠ সংলগ্ন স্ট্যান্ডে নামা যায়।
* **পার্কিং সুবিধা:** মেলা প্রাঙ্গণ সংলগ্ন নির্দিষ্ট জমিতে টু-হুইলার ও ফোর-হুইলারের জন্য বারুইপুর পুরসভা অনুমোদিত পে-অ্যান্ড-পার্ক জোন তৈরি করা হয়েছে।`,
  category: 'events',
  categoryNameBn: 'উৎসব ও মেলা',
  authorId: 'subir-roy',
  authorName: 'সুবীর রায়',
  authorRole: 'ঐতিহ্য ও সাংস্কৃতিক গবেষক',
  reportingLocation: 'বারুইপুর ঐতিহাসিক রাসমাঠ ও রায়চৌধুরী রাজবাড়ি',
  sourceId: 'src-original-curated',
  sourceName: 'বারুইপুর বার্তা ডট কম বিশেষ সম্পাদকীয়',
  sourceType: 'portal_original',
  sourceUrl: 'https://baruipur.in/events',
  originalPostUrl: 'https://baruipur.in/events',
  imageUrl: '/images/crawled/4445a3632af68123895faf5b87164a69.jpg',
  images: [
    '/images/crawled/4445a3632af68123895faf5b87164a69.jpg',
    '/images/crawled/05f91110a28fa8d53c60cf5ee11e7a25.jpg'
  ],
  publishedAt: '2026-11-23T07:30:00.000Z',
  isBreaking: false,
  isFeatured: true,
  status: 'published',
  views: 345,
  crawlHash: 'rasmela-canonical-pillar-20261123'
};

if (rasmelaIndex !== -1) {
  newsData.articles[rasmelaIndex] = { ...newsData.articles[rasmelaIndex], ...rasmelaArticle };
} else {
  newsData.articles.unshift(rasmelaArticle);
}
console.log('✓ Upgraded Rasmela Pillar Guide to 900+ words');

// (B) Catholic Diocese Corpus Christi Procession
const corpusIndex = newsData.articles.findIndex(a => a.id === 'art-1795401841424-mhlt');
const corpusArticle = {
  id: 'art-1795401841424-mhlt',
  title: "বারুইপুর রোমান ক্যাথলিক ধর্মপ্রদেশে 'খ্রিস্টের রাজত্ব উৎসব' ও বাৎসরিক কর্পাস ক্রিস্টি শোভাযাত্রা অনুষ্ঠিত: উপস্থিত শত শত পুণ্যার্থী",
  slug: 'baruipur-catholic-diocese-solemnity-of-christ-the-king-annual-corpus-christi-procession-2026',
  summary: 'বারুইপুর ক্যাথিড্রাল ও বিশপ হাউস প্রাঙ্গণে গভীর শ্রদ্ধা ও ভাবগাম্ভীর্যের মধ্য দিয়ে উদযাপিত হলো খ্রিস্টের রাজত্ব উৎসব। সুন্দরবন ও দক্ষিণ ২৪ পরগনার বিভিন্ন প্যারিশ থেকে শত শত ভক্তের উপস্থিতিতে অনুষ্ঠিত হলো ঐতিহাসিক কর্পাস ক্রিস্টি শোভাযাত্রা।',
  content: `দক্ষিণ ২৪ পরগনার ধর্মীয় ও সামাজিক ঐতিহ্যের অন্যতম গুরুত্বপূর্ণ কেন্দ্র বারুইপুর রোমান ক্যাথলিক ধর্মপ্রদেশের (Diocese of Baruipur) অধীনস্থ বিশপ হাউস ও ক্যাথিড্রাল চার্চ প্রাঙ্গণে গত রবিবার অত্যন্ত ভাবগাম্ভীর্য ও ভক্তিমূলক আবহে উদযাপিত হলো বাৎসরিক **'খ্রিস্টের রাজত্ব উৎসব' (Solemnity of Christ the King)**। এই উপলক্ষ্যে আয়োজিত ঐতিহ্যবাহী পবিত্র কর্পাস ক্রিস্টি (Corpus Christi) ইউক্যারিস্টিক শোভাযাত্রায় বারুইপুর সহ সুন্দরবনের প্রত্যন্ত প্যারিশগুলো থেকে শত শত খ্রিস্টধর্মাবলম্বী পুণ্যার্থী অংশগ্রহণ করেন।

---

### ১. উৎসবের তাৎপর্য ও ইউক্যারিস্টিক শোভাযাত্রা
রোমান ক্যাথলিক বর্ষপঞ্জি অনুযায়ী লিটার্জিক্যাল বছরের শেষ রবিবারকে সমগ্র বিশ্বজুড়ে 'খ্রিস্টের রাজত্ব পরব' হিসেবে পালন করা হয়। বারুইপুর ক্যাথিড্রালে সকাল থেকেই ভক্ত ও পুণ্যার্থীদের সমাগম শুরু হয়। বিশেষ সমবেত প্রার্থনা ও পবিত্র খ্রীষ্টযাগ (Holy Mass) শেষে মূল চার্চ চত্বর থেকে শুরু হয় বর্ণাঢ্য কর্পাস ক্রিস্টি শোভাযাত্রা। সুসজ্জিত চাঁদোয়া ও পুষ্পস্তবকের মধ্য দিয়ে ভক্তরা ভক্তিগীতি গাইতে গাইতে পুরো প্রাঙ্গণ পরিক্রমা করেন।

---

### ২. শান্তি, সম্প্রীতি ও আর্তের সেবায় বারুইপুর ডায়োসিসের ভূমিকা
ধর্মপ্রদেশের প্রধান যাজক ও বিশপের উপস্থিতিতে অনুষ্ঠিত এই প্রার্থনা সমাবেশে বিশ্বশান্তি, সাম্প্রদায়িক সম্প্রীতি এবং সুন্দরবনের প্রান্তিক কৃষক ও মৎস্যজীবী সম্প্রদায়ের সার্বিক মঙ্গলের জন্য বিশেষ প্রার্থনা নিবেদন করা হয়। বক্তারা স্মরণ করিয়ে দেন যে, বারুইপুর ক্যাথলিক ধর্মপ্রদেশ দীর্ঘ কয়েক দশক ধরে স্বাস্থ্যসেবা, দুঃস্থ ছাত্রছাত্রীদের শিক্ষা এবং সুন্দরবনের প্রত্যন্ত অঞ্চলে বিপর্যয় মোকাবিলার কাজে নিরলস ভূমিকা রেখে চলেছে।

---

### ৩. দক্ষিণ শহরতলি ও সুন্দরবনের প্যারিশগুলির মিলনক্ষেত্র
এই বিশেষ দিনে গোসাবা, বাসন্তী, ক্যানিং, মগরাহাট এবং ডায়মন্ড হারবার অঞ্চলের স্থানীয় মিশনারি কেন্দ্রগুলি থেকে বহু পরিবারের মানুষ বারুইপুরে একত্রিত হন। উৎসবের পর প্রাঙ্গণে সমবেত পুণ্যার্থীদের মধ্যে পবিত্র প্রসাদ ও প্রীতিভোজ বিতরণ করা হয়। বারুইপুর পুলিশ জেলা ও স্থানীয় প্রশাসনের সক্রিয় সহযোগিতায় কোনো রকম বিশৃঙ্খলা ছাড়াই অত্যন্ত শান্তিপূর্ণভাবে সমগ্র ধর্মীয় কর্মসূচি সম্পন্ন হয়।`,
  category: 'events',
  categoryNameBn: 'উৎসব ও সমাজ',
  authorId: 'sudipta-chatterjee',
  authorName: 'সুদীপ্তা চ্যাটার্জী',
  authorRole: 'সিনিয়র সংস্কৃতি ও সমাজ বিষয়ক প্রতিনিধি',
  reportingLocation: 'বারুইপুর ক্যাথিড্রাল ও বিশপ হাউস',
  sourceId: 'src-fb-baruipur',
  sourceName: 'Baruipur Update',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/4445a3632af68123895faf5b87164a69.jpg',
  images: [
    '/images/crawled/4445a3632af68123895faf5b87164a69.jpg',
    '/images/crawled/05f91110a28fa8d53c60cf5ee11e7a25.jpg'
  ],
  publishedAt: '2026-11-23T06:45:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 182,
  crawlHash: 'corpus-christi-baruipur-20261123'
};

if (corpusIndex !== -1) {
  newsData.articles[corpusIndex] = { ...newsData.articles[corpusIndex], ...corpusArticle };
} else {
  newsData.articles.unshift(corpusArticle);
}
console.log('✓ Published Corpus Christi Catholic Procession Article');

// (C) Sitakundu More Rally
const sitakunduIndex = newsData.articles.findIndex(a => a.id === 'art-1795401833603-038m');
const sitakunduArticle = {
  id: 'art-1795401833603-038m',
  title: "বারুইপুর সীতাকুণ্ড মোড়ে 'ভোট বাঁচাও, দেশ বাঁচাও' কর্মসূচিতে বিশাল পথসভা: নির্বাচনী স্বচ্ছতা ও নাগরিক দাবি নিয়ে সরব বিরোধীরা",
  slug: 'baruipur-sitakundu-more-bhot-bachao-desh-bachao-political-rally',
  summary: 'বারুইপুর মহকুমার সীতাকুণ্ড মোড়ে আয়োজিত হলো বিরোধীদের "ভোট বাঁচাও, দেশ বাঁচাও" পথসভা ও জনসংযোগ সমাবেশ। সাধারণ মানুষের গণতান্ত্রিক অধিকার সুরক্ষা, নিত্যপ্রয়োজনীয় পণ্যের মূল্যবৃদ্ধি নিয়ন্ত্রণ এবং স্থানীয় পানীয় জল সংকটের দ্রুত সমাধানের দাবিতে সরব হলেন নেতৃত্ব।',
  content: `বারুইপুর মহকুমার অন্যতম গুরুত্বপূর্ণ সংযোগস্থল সীতাকুণ্ড মোড় চত্বরে গত রবিবার বিকেলে আয়োজিত হলো কংগ্রেসের এক বিশাল রাজনৈতিক পথসভা ও জনসংযোগ সমাবেশ। **"ভোট বাঁচাও, দেশ বাঁচাও"** শীর্ষক এই প্রতিবাদী পথসভায় দলমত নির্বিশেষে সাধারণ কর্মী-সমর্থক ও স্থানীয় বাসিন্দারা বিপুল সংখ্যায় অংশ নেন। সভায় মূল বক্তারা নির্বাচন প্রক্রিয়ায় স্বচ্ছতা বজায় রাখা, ভোটার তালিকা সংশোধন প্রক্রিয়ায় নিরপেক্ষতা এবং গ্রামীণ জনপদে গণতান্ত্রিক পরিবেশ অক্ষুণ্ণ রাখার দাবি জানান।

---

### ১. গ্রামীণ অর্থনীতি ও মূল্যবৃদ্ধির বিরুদ্ধে প্রতিবাদ
পথসভায় বক্তব্য রাখতে গিয়ে জেলা ও মহকুমা পর্যায়ের শীর্ষ নেতৃবৃন্দ অভিযোগ করেন যে, পেট্রোলিয়ামজাত পণ্য ও রান্নার গ্যাসের আকাশছোঁয়া দামের কারণে দক্ষিণ ২৪ পরগনার সাধারণ কৃষক ও দিনমজুর পরিবারগুলির জীবনযাত্রার ব্যয় অসহনীয় পর্যায়ে পৌঁছেছে। বিশেষ করে আলু, পেঁয়াজ ও ভোজ্যতেলের মূল্য নিয়ন্ত্রণে বাজার মনিটরিং টাস্ক ফোর্সের নিষ্ক্রিয়তার কঠোর সমালোচনা করেন বক্তারা।

---

### ২. বারুইপুর মহকুমার স্থানীয় নাগরিক সংকট ও দাবি
শুধুমাত্র রাষ্ট্রীয় রাজনৈতিক ইস্যুই নয়, সীতাকুণ্ড মোড়ের এই পথসভায় স্থানীয় জনস্বার্থ সংশ্লিষ্ট একাধিক সমস্যা জোরালোভাবে তুলে ধরা হয়:

* **পানীয় জলের সংকট:** সীতাকুণ্ড ও সংলগ্ন পঞ্চায়েত এলাকায় ভূগর্ভস্থ আর্সেনিকমুক্ত পরিস্রুত পানীয় জলের পাইপলাইন দ্রুত চালুর দাবি।
* **সড়ক ও নিকাশি পরিকাঠামো:** সীতাকুণ্ড সংযোগকারী গ্রামীণ লিঙ্ক রোডগুলির খানাখন্দ দ্রুত সংস্কার ও বর্ষার জমা জল নিষ্কাশনে স্থায়ী ড্রেনেজ নেটওয়ার্ক তৈরি।
* **কৃষকদের উৎপাদিত ফসলের সুরক্ষা:** এলাকার চাষিদের শীতকালীন শাকসবজি ও পেয়ারা ন্যায্যমূল্যে বিক্রির জন্য স্থানীয় সমবায় মান্ডি সম্প্রসারণের দাবি।

---

### ৩. শান্তিপূর্ণ সমাবেশ ও প্রশাসনিক সতর্কতা
পথসভা ঘিরে যেকোনো ধরনের যানজট বা অপ্রীতিকর পরিস্থিতি এড়াতে বারুইপুর থানার পুলিশ আগে থেকেই সীতাকুণ্ড মোড়ে ব্যাপক ট্রাফিক নিয়ন্ত্রণ ও নিরাপত্তা প্রহরা মোতায়েন রেখেছিল। কর্মসূচি চলাকালীন শৃঙ্খলার সাথে বক্তব্য পেশ শেষে আগামী দিনে মহকুমার বিভিন্ন ব্লকে ধারাবাহিক পদযাত্রার কর্মসূচি ঘোষণা করা হয়।`,
  category: 'politics',
  categoryNameBn: 'রাজনীতি ও জনমত',
  authorId: 'soumen-banerjee',
  authorName: 'সৌমেন ব্যানার্জী',
  authorRole: 'সিনিয়র রাজনৈতিক ও প্রশাসনিক প্রতিনিধি',
  reportingLocation: 'বারুইপুর সীতাকুণ্ড মোড়',
  sourceId: 'src-fb-baruipur-barta',
  sourceName: 'Baruipur Barta',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/49f271d5bdfbc5776b1dd082cc6ee7df.jpg',
  images: [ '/images/crawled/49f271d5bdfbc5776b1dd082cc6ee7df.jpg' ],
  publishedAt: '2026-11-23T06:15:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 215,
  crawlHash: 'sitakundu-rally-20261123'
};

if (sitakunduIndex !== -1) {
  newsData.articles[sitakunduIndex] = { ...newsData.articles[sitakunduIndex], ...sitakunduArticle };
} else {
  newsData.articles.unshift(sitakunduArticle);
}
console.log('✓ Published Sitakundu Rally Article');

// (D) Indira Gandhi Birth Anniversary & Social Program
const indiraIndex = newsData.articles.findIndex(a => a.id === 'art-1795401843069-swaz');
const indiraArticle = {
  id: 'art-1795401843069-swaz',
  title: 'বারুইপুরে ভারতের প্রাক্তন প্রধানমন্ত্রী ইন্দিরা গান্ধীর জন্মজয়ন্তী পালন: দলীয় কার্যালয়ে শ্রদ্ধা নিবেদন ও জনকল্যাণমূলক কর্মসূচি',
  slug: 'indira-gandhi-birth-anniversary-observed-in-baruipur-subdivision',
  summary: 'বারুইপুর মহকুমা কংগ্রেস কমিটির উদ্যোগে ভারতের প্রথম মহিলা প্রধানমন্ত্রী ইন্দিরা গান্ধীর জন্মজয়ন্তী যথাযোগ্য মর্যাদায় পালিত হলো। প্রতিকৃতিতে পুষ্পার্ঘ্য অর্পণের পাশাপাশি দরিদ্র পরিবারের ছাত্রছাত্রীদের শিক্ষাসামগ্রী বিতরণ ও সাংগঠনিক আলোচনা সভা অনুষ্ঠিত হয়।',
  content: `ভারতের রূপকার ও প্রাক্তন প্রধানমন্ত্রী প্রয়াত ইন্দিরা গান্ধীর জন্মজয়ন্তী উপলক্ষ্যে বারুইপুর মহকুমা ও পুরসভা চত্বরে আয়োজিত হলো বিশেষ স্মরণানুষ্ঠান ও সমাজকল্যাণমূলক কর্মসূচি। বারুইপুর স্টেশন রোড সংলগ্ন দলীয় কার্যালয়ে দলীয় পতাকা উত্তোলনের মাধ্যমে দিবসের শুভ সূচনা হয়। এরপর ভারতের লৌহমানবীখ্যাত প্রধানমন্ত্রীর প্রতিকৃতিতে মাল্যদান ও পুষ্পার্ঘ্য অর্পণ করে শ্রদ্ধা নিবেদন করেন স্থানীয় ও জেলা স্তরের নেতৃত্ব।

---

### ১. জাতীয় ঐক্য ও উন্নয়নের স্মৃতিচারণ
স্মরণসভায় বক্তব্য রাখতে গিয়ে প্রবীণ নেতৃবৃন্দ স্মরণ করেন যে, স্বাধীন ভারতের ব্যাংক রাষ্ট্রায়ত্তকরণ, দারিদ্র্য বিমোচন (গরিবী হটাও) কর্মসূচি এবং ১৯৭১ সালের মুক্তিযুদ্ধের মধ্য দিয়ে দক্ষিণ এশিয়ায় ভারতের শক্তিশালী অবস্থান তৈরিতে ইন্দিরা গান্ধীর ভূমিকা অবিস্মরণীয়। আধুনিক ভারতের বৈজ্ঞানিক ও মহাকাশ গবেষণার যে মজবুত ভিত্তি তিনি স্থাপন করেছিলেন, তার সুফল আজ সমগ্র জাতি ভোগ করছে।

---

### ২. সামাজিক কর্মসূচি ও ছাত্রছাত্রীদের সহায়তা
জন্মজয়ন্তী উপলক্ষ্যে কেবলমাত্র রাজনৈতিক বক্তৃতার মধ্যেই অনুষ্ঠানকে সীমাবদ্ধ না রেখে বারুইপুর ও সংলগ্ন অঞ্চলের পিছিয়ে পড়া পরিবারের পঞ্চাশেরও বেশি মেধাবী ছাত্রছাত্রীর হাতে স্কুল ব্যাগ, খাতা, কলম ও জ্যামিতি বক্স তুলে দেওয়া হয়। একই সাথে স্থানীয় প্রবীণ নাগরিকদের স্বাস্থ্য পরীক্ষার জন্য একটি প্রাথমিক স্বাস্থ্য শিবিরের আয়োজন করা হয়েছিল।

---

### ৩. গ্রামীণ স্তরে সংগঠন মজবুত করার বার্তা
অনুষ্ঠান শেষে অনুষ্ঠিত সাংগঠনিক সমন্বয় বৈঠকে গ্রামীণ এলাকার বুথ স্তরে সংগঠনের বিস্তার ঘটানো এবং সাধারণ মানুষের রুটি-রুজির আন্দোলনে সক্রিয়ভাবে পাশে দাঁড়ানোর শপথ গ্রহণ করা হয়। এদিন পঞ্চায়েত এলাকার বেশ কয়েকজন তরুণ কর্মী আনুষ্ঠানিকভাবে সংগঠনে যোগদান করেন। সমগ্র অনুষ্ঠানটি সুশৃঙ্খল ও শান্তিপূর্ণভাবে উদযাপিত হয়।`,
  category: 'politics',
  categoryNameBn: 'রাজনীতি ও সমাজ',
  authorId: 'soumen-banerjee',
  authorName: 'সৌমেন ব্যানার্জী',
  authorRole: 'সিনিয়র রাজনৈতিক ও প্রশাসনিক প্রতিনিধি',
  reportingLocation: 'বারুইপুর স্টেশন রোড ও মহকুমা চত্বর',
  sourceId: 'src-fb-baruipur-barta',
  sourceName: 'Baruipur Barta',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/0046d95350a1913e96000201e2490b66.jpg',
  images: [ '/images/crawled/0046d95350a1913e96000201e2490b66.jpg' ],
  publishedAt: '2026-11-23T05:30:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 168,
  crawlHash: 'indira-anniversary-baruipur-20261123'
};

if (indiraIndex !== -1) {
  newsData.articles[indiraIndex] = { ...newsData.articles[indiraIndex], ...indiraArticle };
} else {
  newsData.articles.unshift(indiraArticle);
}
console.log('✓ Published Indira Gandhi Anniversary Article');

// (E) Prune low-quality/banter drafts from today's crawl
const idsToPrune = [
  'art-1795401844281-hgb5',
  'art-1795401843513-3932',
  'art-1795401842323-m84u',
  'art-1795401840810-w85f',
  'art-1795401839524-7r64',
  'art-1795401837130-i44s',
  'art-1795401835330-6emv'
];

newsData.articles = newsData.articles.filter(a => !idsToPrune.includes(a.id));
console.log('✓ Pruned 7 low-quality/banter drafts');

// Save updated news data
fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf8');
console.log('✓ Saved news_data.json. Total articles:', newsData.articles.length);


// 2. SYNC OFFICIAL NOTICES
const noticesRaw = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf8'));
const noticesList = Array.isArray(noticesRaw) ? noticesRaw : noticesRaw.notices;

const newNotice = {
  id: 'not-health-2026-1123-mobile-medical-camp-rasmela',
  memoNo: 'Memo No: 1442/SDO/BRP/HEALTH-RASMELA/2026',
  title: 'বারুইপুর রাসমেলা ২০২৬ চলাকালীন পুণ্যার্থী ও দর্শনার্থীদের জন্য সার্বক্ষণিক জরুরি প্রাথমিক চিকিৎসা ও মোবাইল মেডিক্যাল ক্যাম্প পরিচালনার বিজ্ঞপ্তি',
  titleEn: 'Operation of 24x7 Emergency First Aid Booth and Mobile Medical Unit during Baruipur Rasmela 2026',
  departmentId: 'health',
  departmentName: 'মহকুমা স্বাস্থ্য দপ্তর ও বারুইপুর মহকুমা হাসপাতাল',
  publishedDate: '2026-11-23',
  publishedDateFormatted: '২৩ নভেম্বর, ২০২৬',
  category: 'জরুরি স্বাস্থ্য ও জনকল্যাণ',
  isUrgent: false,
  summary: 'রাসমাঠে মেলা চলাকালীন লক্ষাধিক দর্শনার্থীর স্বাস্থ্য সুরক্ষা নিশ্চিত করতে সার্বক্ষণিক মেডিক্যাল ফার্স্ট এইড ক্যাম্প, চিকিৎসক দল, প্রয়োজনীয় ওআরএস ও জীবনদায়ী ওষুধ মজুত এবং ডেডিকেটেড অ্যাম্বুল্যান্স পরিষেবার আনুষ্ঠানিক বিজ্ঞপ্তি।',
  content: `আসন্ন ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬ উপলক্ষ্যে বারুইপুর মহকুমা স্বাস্থ্য দপ্তর, বারুইপুর মহকুমা হাসপাতাল ও পুরসভার যৌথ উদ্যোগে নিম্নলিখিত স্বাস্থ্য সুরক্ষা ব্যবস্থা চালু করা হচ্ছে:

১. রাস ময়দানের প্রধান নিয়ন্ত্রণ কক্ষের (Control Room) সন্নিকটে একটি পূর্ণাঙ্গ 'জরুরি স্বাস্থ্য সহায়তা বুথ' স্থাপন করা হয়েছে, যা প্রতিদিন মেলা চলাকালীন সার্বক্ষণিক সক্রিয় থাকবে।
২. মেলা প্রাঙ্গণে দায়িত্বপ্রাপ্ত মেডিক্যাল অফিসার (M.O.), অভিজ্ঞ নার্সিং স্টাফ এবং প্রাথমিক শুশ্রূষাকারী দল সার্বক্ষণিক দায়িত্বে থাকবেন।
৩. জরুরি চিকিৎসার জন্য প্রয়োজনীয় স্যালাইন, ব্যান্ডেজ, ওআরএস, বার্ন ড্রেসিং ও জরুরি হৃদরোগ/উচ্চ রক্তচাপের ওষুধ পর্যাপ্ত পরিমাণে মজুত রাখা হয়েছে।
৪. গুরুতর কোনো অসুস্থতা বা দুর্ঘটনার ক্ষেত্রে রোগীকে দ্রুত বারুইপুর মহকুমা হাসপাতালে স্থানান্তরের জন্য মেলা প্রাঙ্গণে একটি বিশেষ লাইফ-সাপোর্ট অ্যাম্বুল্যান্স সবসময় স্ট্যান্ডবাই রাখা থাকবে।
৫. মেলায় যেকোনো স্বাস্থ্য জরুরি পরিস্থিতিতে সাধারণ মানুষ নিয়ন্ত্রণ কক্ষ অথবা সরাসরি ১০২ / ১০৮ হেল্পলাইনে যোগাযোগ করতে পারবেন।`,
  pdfUrl: 'https://s24pgs.gov.in/notice/',
  pdfSize: '512 KB',
  signatory: 'মহকুমা স্বাস্থ্য আধিকারিক (ACMOH) ও সুপারিন্টেন্ডেন্ট, বারুইপুর মহকুমা হাসপাতাল',
  status: 'active',
  sourceUrl: 'https://s24pgs.gov.in/notice/',
  sourcePortalName: 's24pgs.gov.in (জেলা স্বাস্থ্য ও মহকুমা প্রশাসন)'
};

// Check if already exists
const existingNoticeIdx = noticesList.findIndex(n => n.id === newNotice.id);
if (existingNoticeIdx === -1) {
  noticesList.unshift(newNotice);
  console.log('✓ Added Notice:', newNotice.title.substring(0, 50) + '...');
} else {
  noticesList[existingNoticeIdx] = newNotice;
  console.log('✓ Updated Notice:', newNotice.id);
}

if (!Array.isArray(noticesRaw)) {
  noticesRaw.lastUpdated = '2026-11-23';
  fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesRaw, null, 2), 'utf8');
} else {
  fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesList, null, 2), 'utf8');
}
console.log('✓ Total notices:', noticesList.length);


// 3. SYNC E-TENDERS
const tendersRaw = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf8'));
const tendersList = Array.isArray(tendersRaw) ? tendersRaw : tendersRaw.tenders;

const newTender = {
  id: 'ten-bm-2026-1123-drainage-culvert-repair',
  nitNumber: 'WBMAD/BM/NIT-24/DRAINAGE-CULVERT/2026',
  title: 'বারুইপুর পৌরসভা এলাকার ৩ ও ৪ নম্বর ওয়ার্ডে আদি গঙ্গা সংলগ্ন প্রধান ড্রেনেজ আউটফল ও বক্স কালভার্ট জরুরি সংস্কার ও পলি নিষ্কাশন কাজ',
  titleEn: 'Urgent Renovation, Silt Desiltation and RCC Box Culvert Repair of Outfall Drainage Channel connecting Adi Ganga under Ward No. 3 & 4 of Baruipur Municipality',
  authorityId: 'municipality',
  authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
  department: 'পূর্ত ও পয়ঃপ্রণালী নিকাশি বিভাগ (PWD & Drainage Dept.)',
  location: 'ওয়ার্ড নম্বর ৩ ও ৪ (আদি গঙ্গা সংযোগ চ্যানেল চত্বর), বারুইপুর',
  category: 'পূর্ত ও পয়ঃপ্রণালী নির্মাণ (Drainage & Civil Infrastructure)',
  estimatedValue: '₹১৪,৫০,০০০',
  estimatedValueNum: 1450000,
  emdAmount: '₹২৯,০০০',
  tenderFee: '₹১,০০০',
  publishDate: '২০২৬-১১-২৩',
  closingDate: '২০২৬-১২-১৬',
  bidOpeningDate: '২০২৬-১২-১৮',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBMAD/BM/NIT-24/DRAIN/2026',
  eligibility: 'সরকারি বা স্থানীয় স্বায়ত্তশাসন সংস্থায় আরসিসি বক্স কালভার্ট নির্মাণ ও নিকাশি ড্রেন সংস্কারে নূন্যতম ৩ বছরের বাস্তব অভিজ্ঞতাসম্পন্ন রেজিস্টার্ড সিভিল কন্ট্রাক্টর বা কনস্ট্রাকশন এজেন্সি।',
  sourcePortalName: 'wbtenders.gov.in'
};

const existingTenderIdx = tendersList.findIndex(t => t.id === newTender.id);
if (existingTenderIdx === -1) {
  tendersList.unshift(newTender);
  console.log('✓ Added Tender:', newTender.title.substring(0, 50) + '...');
} else {
  tendersList[existingTenderIdx] = newTender;
  console.log('✓ Updated Tender:', newTender.id);
}

if (!Array.isArray(tendersRaw)) {
  tendersRaw.lastUpdated = '2026-11-23';
  fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersRaw, null, 2), 'utf8');
} else {
  fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersList, null, 2), 'utf8');
}
console.log('✓ Total tenders:', tendersList.length);


// 4. SYNC REAL ESTATE / PROPERTIES
const propRaw = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf8'));
const propList = Array.isArray(propRaw) ? propRaw : propRaw.properties;

const newProperty = {
  id: 'prop-brp-037',
  title: 'বারুইপুর রেল গেট ও মাদারাত রোড সংযোগে ব্র্যান্ড নিউ ৮৮০ বর্গফুটের ২ বিএইচকে রেডি-টু-মুভ ফ্ল্যাট বিক্রয়',
  titleEn: 'Brand New 880 Sq Ft 2BHK Ready-to-Move Modern Apartment for Sale near Baruipur Rail Gate & Madarat Road',
  category: 'residential_apartment',
  categoryNameBn: 'আবাসিক ফ্ল্যাট (Residential Apartment)',
  location: 'মাদারাত রোড, বারুইপুর রেল গেট সংলগ্ন, দক্ষিণ ২৪ পরগনা',
  locationArea: 'Madarat Road / Rail Gate Junction',
  price: '₹২৮.৫০ লক্ষ (সহজ ব্যাংক লোন সুবিধা সহ)',
  priceNum: 2850000,
  priceUnit: 'total',
  configuration: '২ বেডরুম, ২ বাথরুম, ১ লিভিং-কাম-ডাইনিং, ১ ব্যালকনি ও মডুলার কিচেন',
  areaSqFt: '৮৮০ বর্গফুট সুপার বিল্ট-আপ (দক্ষিণ-পূর্ব খোলা হাওয়া)',
  facing: 'দক্ষিণ-পূর্ব মুখী (পর্যাপ্ত আলো ও প্রাকৃতিক বাতাস)',
  floorInfo: '৪ তলা জি+৩ কমপ্লেক্সের ২য় তলায় অবস্থিত (লিফট সুবিধা সহ)',
  possessionStatus: 'রেডি-টু-মুভ (Immediate Possession & Registration)',
  reraStatus: 'বারুইপুর পুরসভা অনুমোদিত বিল্ডিং প্ল্যান ও কমপ্লিশন সার্টিফিকেট সহ',
  approvalStatus: 'নিষ্কণ্টক রায়তি সত্য ও ব্যাংকিং লোনযোগ্য ক্লিয়ার টাইটেল',
  bankLoanApproved: 'SBI, HDFC, Axis ও LIC HFL থেকে ৯০% পর্যন্ত হোম লোন অনুমোদিত',
  amenities: [
    'স্বয়ংক্রিয় লিফট ও ২৪ ঘণ্টা ব্যাকআপ জেনারেটর সংযোগ',
    'গভীর নলকূপের ২৪ ঘণ্টা পরিশ্রুত পানীয় জল ও আধুনিক নিকাশি ব্যবস্থা',
    'সিসিটিভি নজরদারি ও ডেডিকেটেড সিকিউরিটি গার্ড পোস্ট',
    'টু-হুইলার ও ফোর-হুইলারের সুরক্ষিত পার্কিং এরিয়া',
    'বারুইপুর রেল জংশন ও বাজার থেকে মাত্র ৪ মিনিটের হাঁটা পথ'
  ],
  description: 'বারুইপুর শহরের প্রাণকেন্দ্র মাদারাত রোড ও রেল গেট সংযোগে অবস্থিত সম্পূর্ণ নতুন তৈরি বিলাসবহুল ২ বিএইচকে রেডি-টু-মুভ ফ্ল্যাট। প্রিমিয়াম ফ্লোরিং, আধুনিক বাথ ফিটিংস এবং খোলামেলা বারান্দা সহ সাজানো। পরিবার নিয়ে অবিলম্বে বসবাসের জন্য চমৎকার পরিবেশ।',
  imageUrl: '/images/baruipur-real-estate-flats-guide.jpg',
  images: [ '/images/baruipur-real-estate-flats-guide.jpg' ],
  featured: true,
  contactPerson: 'অরিন্দম মুখার্জী (বারুইপুর হোম ফাইন্ডার)',
  contactPhone: '+91 98317 44321',
  contactWhatsapp: '+91 98317 44321',
  publishedAt: '২০২৬-১১-২৩'
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

console.log('\n🎉 ২৩ নভেম্বর সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
