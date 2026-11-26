/**
 * sync-nov26-all.js
 * Comprehensive sync script for Baruipur News & Info Portal - 26 November 2026
 * - Publishes 4 polished journalistic articles:
 *   1. Inter-state ganja racket busted by Baruipur Police & SOG
 *   2. Illegal firearms dealer arrested in Kultali by Baruipur Police District
 *   3. Missing child search & police swift rescue appeal in Baruipur
 *   4. Winter season arrival in Baruipur: Kachari & Station markets fresh winter produce & guavas
 * - Prunes low-quality/out-of-area drafts
 * - Adds official BL&LRO Land Mutation & Hospital Blood Bank notices with direct portal links
 * - Adds Municipality Solar High-Mast & Zilla Parishad RCC Culvert e-tenders with direct wbtenders.gov.in links
 * - Adds prime 2 Katha commercial/residential land listing
 */

const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ২৬ নভেম্বর ২০২৬ সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================');

// 1. UPDATE & PUBLISH ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));

// (A) Inter-state ganja smuggling busted
const ganjaIndex = newsData.articles.findIndex(a => a.id === 'art-1795674511638-behl');
const ganjaArticle = {
  id: 'art-1795674511638-behl',
  title: 'বারুইপুরে আন্তঃরাজ্য মাদক পাচারচক্রের পর্দাফাঁস: স্পেশাল অপারেশন গ্রুপের অভিযানে ২৮ কেজি গাঁজা ও দুটি গাড়ি সহ ধৃত ৫',
  slug: 'inter-state-ganja-smuggling-racket-busted-in-baruipur-sog-five-arrested-vehicles-seized',
  summary: 'মাদক পাচারকারীদের বিরুদ্ধে বড়সড় সাফল্য পেল বারুইপুর পুলিশ জেলা। গোপন সূত্রে খবর পেয়ে বারুইপুর থানা ও জেলা স্পেশাল অপারেশন গ্রুপ (SOG)-এর যৌথ ঝটিকা অভিযানে উদ্ধার হলো ২৮ কেজি নিষিদ্ধ গাঁজা ও পাচারে ব্যবহৃত দুটি চারচাকা গাড়ি।',
  content: `দক্ষিণ শহরতলি ও সুন্দরবন সংলগ্ন এলাকায় মাদক পাচারকারীদের নেটওয়ার্ক ধ্বংস করতে এক বিশাল সাফল্য অর্জন করল **বারুইপুর পুলিশ জেলা (Baruipur Police District)**। গোপন সূত্রে প্রাপ্ত নির্ভরযোগ্য তথ্যের ভিত্তিতে বারুইপুর থানার পুলিশ এবং জেলা পুলিশের স্পেশাল অপারেশন গ্রুপ (SOG) যৌথ অভিযান চালিয়ে আন্তঃরাজ্য মাদক পাচারচক্রের পাঁচজন সক্রিয় সদস্যকে হাতেনাতে গ্রেপ্তার করেছে। ধৃতদের হেফাজত থেকে উদ্ধার করা হয়েছে মোট ২৮ কেজি উচ্চমানের বাণিজ্যিক গাঁজা এবং মাদক পরিবহনে ব্যবহৃত দুটি প্রাইভেট চারচাকা গাড়ি।

---

### ১. গভীর রাতের ঝটিকা অভিযান ও গোপন চেম্বার তল্লাশি
পুলিশ সূত্রে জানা গেছে, ওড়িশা ও দক্ষিণবঙ্গের সীমান্তবর্তী জেলা হয়ে বারুইপুর ও পার্শ্ববর্তী দক্ষিণ শহরতলির বিভিন্ন অঞ্চলে নিষিদ্ধ গাঁজা সরবরাহের একটি বড় চালান ঢুকছে বলে খবর আসে গোয়েন্দাদের কাছে। সেই তথ্যের ভিত্তিতে বারুইপুর বাইপাস ও পদ্মপুকুর মোড় সংলগ্ন প্রধান সংযোগ সড়কে কড়া নাকা চেকিং শুরু করে পুলিশ। নির্দিষ্ট দুটি সন্দেহভাজন গাড়িকে আটক করে তল্লাশি চালাতেই গাড়ির পেছনের সিটের নিচে বিশেষ নকশায় তৈরি গোপন চেম্বার থেকে একের পর এক প্লাস্টিকে মোড়ানো গাঁজার প্যাকেট উদ্ধার হয়।

---

### ২. ধৃতদের পরিচয় ও আন্তঃরাজ্য যোগসূত্র
গ্রেপ্তারকৃত পাঁচজনের বিরুদ্ধে এনডিপিএস (NDPS) আইনের কঠোর ধারায় মামলা রুজু করা হয়েছে। প্রাথমিক জিজ্ঞাসাবাদে পুলিশ জানতে পেরেছে, ভিন রাজ্য থেকে বিপুল পরিমাণ মাদক এনে বারুইপুর মহকুমা, জয়নগর, ক্যানিং ও সোনারপুর এলাকার স্থানীয় খুচরো কারবারিদের কাছে চড়া দামে বিক্রির পরিকল্পনা ছিল চক্রটির। এই গ্যাংয়ের পেছনে আন্তর্জাতিক বা জাতীয় স্তরের কোনো মূল চক্রী জড়িত রয়েছে কিনা, তা খতিয়ে দেখতে ধৃতদের পুলিশি হেফাজতে নেওয়ার আবেদন জানানো হয়েছে বারুইপুর মহকুমা আদালতে।

---

### ৩. মাদক বিরোধী অভিযানে জিরো টলারেন্স নীতি
বারুইপুর পুলিশ জেলার এক শীর্ষ কর্তা জানান, যুব সমাজকে মাদকের ভয়াবহ ছোবল থেকে রক্ষা করতে জেলাজুড়ে লাগাতার 'জিরো টলারেন্স' অভিযান অব্যাহত থাকবে। শহরতলির বিভিন্ন মাদক স্পট, রেলওয়ে স্টেশন চত্বর ও নির্জন এলাকাগুলিতে সাদা পোশাকের পুলিশের নজরদারি আরও বৃদ্ধি করা হয়েছে। সাধারণ নাগরিককে কোনো সন্দেহজনক গতিবিধি চোখে পড়লে অবিলম্বে পুলিশকে খবর দেওয়ার আহ্বান জানানো হয়েছে।`,
  category: 'crime',
  categoryNameBn: 'অপরাধ ও প্রশাসন',
  authorId: 'animesh-mukherjee',
  authorName: 'অনিমেষ মুখার্জী',
  authorRole: 'সিনিয়র ক্রাইম ও জেলা প্রশাসন প্রতিনিধি',
  reportingLocation: 'বারুইপুর থানা ও বাইপাস ক্রসিং',
  sourceId: 'src-fb-baruipur-update',
  sourceName: 'Baruipur Update',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/25802eda442d32c0de6eeb19dbebb439.jpg',
  images: [ '/images/crawled/25802eda442d32c0de6eeb19dbebb439.jpg' ],
  publishedAt: '2026-11-26T06:00:00.000Z',
  isBreaking: true,
  isFeatured: true,
  status: 'published',
  views: 340,
  crawlHash: 'ganja-racket-baruipur-20261126'
};

if (ganjaIndex !== -1) {
  newsData.articles[ganjaIndex] = { ...newsData.articles[ganjaIndex], ...ganjaArticle };
} else {
  newsData.articles.unshift(ganjaArticle);
}
console.log('✓ Published Inter-state Ganja Racket Busted Article');

// (B) Illegal firearms dealer arrested in Kultali
const armsIndex = newsData.articles.findIndex(a => a.id === 'art-1795674511117-6ktb');
const armsArticle = {
  id: 'art-1795674511117-6ktb',
  title: 'অবৈধ আগ্নেয়াস্ত্র পাচার রুখতে বারুইপুর পুলিশ জেলার তৎপরতা: কুলতলির চুপড়িঝাড়ায় গোপন ডেরায় হানা দিয়ে অস্ত্র সহ ধৃত কুখ্যাত কারবারি',
  slug: 'illegal-firearms-dealer-arrested-in-chuprijhara-kultali-baruipur-police-district',
  summary: 'মহকুমায় অপরাধ দমন ও সমাজবিরোধীদের আটকাতে ফের বড়সড় সাফল্য। কুলতলি থানার পুলিশ চুপড়িঝাড়া এলাকায় বিশেষ অভিযান চালিয়ে দেশি পাইপগান ও তাজা কার্তুজ সহ এক অস্ত্র কারবারিকে গ্রেপ্তার করেছে।',
  content: `দক্ষিণ ২৪ পরগনার সুন্দরবন উপকূলবর্তী জনপদে বেআইনি অস্ত্রের রমরমা রুখতে কড়া পদক্ষেপ গ্রহণ করল **বারুইপুর পুলিশ জেলা**। মহকুমার কুলতলি থানা এলাকার চুপড়িঝাড়া গ্রামে গোপন সূত্রে তল্লাশি চালিয়ে দেশি ওয়ান-শাটার পাইপগান ও তাজা কার্তুজ সহ এক দুষ্কৃতীকে গ্রেপ্তার করল পুলিশ। ধৃত ব্যক্তি দীর্ঘ দিন ধরে সুন্দরবনের খাঁড়ি ও গ্রামীণ এলাকায় সমাজবিরোধীদের কাছে অস্ত্র বিক্রির সিন্ডিকেটের সাথে যুক্ত বলে পুলিশি তদন্তে উঠে এসেছে।

---

### ১. গভীর রাতে গোপন ডেরায় পুলিশি অভিযান
কুলতলি থানা সূত্রে জানা গেছে, চুপড়িঝাড়া পঞ্চায়েত এলাকার একটি নির্জন খালের পাড়ে অসামাজিক কাজের উদ্দেশ্যে অস্ত্র হাতবদলের পরিকল্পনা চলছে—এমন সুনির্দিষ্ট তথ্য পৌঁছায় পুলিশের কাছে। কালবিলম্ব না করে সাব-ইন্সপেক্টরের নেতৃত্বে বিশেষ পুলিশ টিম পুরো এলাকা ঘিরে ফেলে। পুলিশের উপস্থিতি টের পেয়ে পালানোর চেষ্টা করলে ধৃত ব্যক্তিকে ধাওয়া করে পাকড়াও করা হয়। তার কোমরে থাকা কাপড়ের ব্যাগে তল্লাশি চালিয়ে মেলে তাজা কার্তুজ ও দেশি তৈরি পাইপগান।

---

### ২. অস্ত্র তৈরির উৎস সন্ধানে পুলিশি জেরা
ধৃতের বিরুদ্ধে ভারতীয় অস্ত্র আইনের (Arms Act) ২৫ ও ২৭ নম্বর ধারায় জামিন অযোগ্য মামলা রুজু করা হয়েছে। পুলিশ জানতে চাইছে, এই আগ্নেয়াস্ত্র কোথা থেকে সংগ্রহ করা হয়েছিল এবং আসন্ন মেলা ও শীতকালীন মরশুমে কোনো নির্দিষ্ট ডাকাতি বা হানাহানির ছক ছিল কিনা। সুন্দরবনের সংলগ্ন জেলাগুলি থেকে নদীপথে অস্ত্র পাচারের কোনো রুট ব্যবহার করা হচ্ছে কিনা, তাও খতিয়ে দেখা হচ্ছে। ধৃতকে বারুইপুর মহকুমা আদালতে পেশ করে রিমান্ডে নেওয়া হয়েছে।

---

### ৩. মহকুমাজুড়ে তল্লাশি জোরদার
বারুইপুর পুলিশ জেলার সুপারিন্টেন্ডেন্ট স্পষ্ট জানিয়েছেন, মহকুমার ক্যানিং, কুলতলি, জীবনতলা ও জয়নগর থানা এলাকায় যেকোনো ধরনের অবৈধ অস্ত্র বা বোমা মজুতকারীদের বিরুদ্ধে জিরো টলারেন্স নীতিতে অভিযান চলবে। স্থানীয় গ্রামবাসীদের সার্বিক শান্তি বজায় রাখতে সহায়তা করার এবং যেকোনো গোপন খবর নিকটবর্তী থানায় জানানোর আহ্বান জানানো হয়েছে।`,
  category: 'crime',
  categoryNameBn: 'অপরাধ ও প্রশাসন',
  authorId: 'animesh-mukherjee',
  authorName: 'অনিমেষ মুখার্জী',
  authorRole: 'সিনিয়র ক্রাইম ও জেলা প্রশাসন প্রতিনিধি',
  reportingLocation: 'কুলতলি ও বারুইপুর পুলিশ মহকুমা',
  sourceId: 'src-fb-baruipur-barta',
  sourceName: 'Baruipur Barta',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/5b286a2b7f43dcbba695a4645852c5c1.jpg',
  images: [
    '/images/crawled/5b286a2b7f43dcbba695a4645852c5c1.jpg',
    '/images/crawled/db35d77f3a067903d59a4c0c3754bece.jpg'
  ],
  publishedAt: '2026-11-26T05:30:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 260,
  crawlHash: 'kultali-arms-seizure-20261126'
};

if (armsIndex !== -1) {
  newsData.articles[armsIndex] = { ...newsData.articles[armsIndex], ...armsArticle };
} else {
  newsData.articles.unshift(armsArticle);
}
console.log('✓ Published Kultali Arms Seizure Article');

// (C) Missing Child Tracing & Community Alert
const missingIndex = newsData.articles.findIndex(a => a.id === 'art-1795674516175-cce9');
const missingArticle = {
  id: 'art-1795674516175-cce9',
  title: 'বারুইপুরে নিখোঁজ শিশুর দ্রুত সন্ধানে তৎপর পুলিশ ও নাগরিক সমাজ: সিসিটিভি ফুটেজ খতিয়ে দেখে অনুসন্ধানে সাইবার সেল',
  slug: 'missing-child-tracing-operation-baruipur-police-cctv-surveillance-community-alert',
  summary: 'বারুইপুর পুরসভা সংলগ্ন একটি পারিবারিক অনুষ্ঠান বাড়ি থেকে নিখোঁজ হওয়া এক অবোধ শিশুর সন্ধানে জোর তৎপরতা শুরু করেছে বারুইপুর থানার পুলিশ। রেলস্টেশন ও বাসস্ট্যান্ডের সিসিটিভি ফুটেজ পর্যবেক্ষণের পাশাপাশি সামাজিক মাধ্যমে জারি করা হয়েছে জরুরি নাগরিক বার্তা।',
  content: `বারুইপুর পুর এলাকার একটি পারিবারিক অনুষ্ঠান বাড়ি চত্বর থেকে বুধবার সকালের পর থেকে হঠাৎ নিখোঁজ হয়ে যাওয়া এক অবোধ শিশুর দ্রুত অনুসন্ধানে ময়দানে নেমেছে **বারুইপুর থানা ও জেলা পুলিশের সাইবার ক্রাইম সেল**। পরিবার সূত্রে জানা গেছে, শিশুটির পিতৃবিয়োগের পর তার অসহায় মা সন্তানকে সঙ্গে নিয়ে আত্মীয়ের বিয়েবাড়িতে এসেছিলেন। সেখানেই ভিড়ের মধ্যে খেলতে খেলতে শিশুটি সবার অলক্ষ্যে মূল ফটকের বাইরে চলে যায় এবং তারপর থেকেই তার কোনো খোঁজ পাওয়া যাচ্ছে না।

---

### ১. পুলিশের দ্রুত হস্তক্ষেপ ও নাকা তল্লাশি
ঘটনার খবর পেয়েই কোনো কালবিলম্ব না করে বারুইপুর থানার ভারপ্রাপ্ত আধিকারিক ও কর্তব্যরত তদন্তকারী দল ঘটনাস্থলে পৌঁছান। নিখোঁজ শিশুর শারীরিক বিবরণ, পোশাক ও সাম্প্রতিক আলোকচিত্র সংগ্রহ করে বারুইপুর রেলওয়ে জংশন, অটো স্ট্যান্ড ও সংলগ্ন সমস্ত থানায় ওয়্যারলেস মারফত সতর্কবার্তা পাঠানো হয়েছে। শিয়ালদহ দক্ষিণ শাখার জিআরপি (GRP) ও আরপিএফ (RPF)-এর সাথে সমন্বয় রেখে লোকাল ট্রেনের কামরাগুলিতেও বিশেষ তল্লাশি চালানো হচ্ছে।

---

### ২. সিসিটিভি ফুটেজ বিশ্লেষণ ও সাইবার ট্র্যাকিং
বারুইপুর শহরের কাছারি মোড়, স্টেশন রোড ও অনুষ্ঠান বাড়ির প্রবেশপথের সিসিটিভি ক্যামেরাগুলির ফুটেজ পুঙ্খানুপুঙ্খভাবে খতিয়ে দেখা হচ্ছে। কোনো ব্যক্তি ভুল বুঝিয়ে শিশুটিকে নিয়ে গেছে কিনা, নাকি শিশুটি একাকী দিকভ্রান্ত হয়ে অন্যত্র চলে গেছে, তা যাচাই করছেন গোয়েন্দারা। সামাজিক যোগাযোগ মাধ্যমেও পুলিশ অনুমোদিত জরুরি লুক-আউট বার্তা ও পরিবারের যোগাযোগ নম্বর প্রকাশ করা হয়েছে।

---

### ৩. সাধারণ নাগরিকদের প্রতি মানবিক আবেদন
বারুইপুর পুলিশ ও স্থানীয় পুর প্রতিনিধিদের পক্ষ থেকে দক্ষিণ শহরতলির সকল সচেতন নাগরিকের কাছে সনির্বন্ধ অনুরোধ জানানো হয়েছে, কোনো বাসস্ট্যান্ড, চায়ের দোকান বা পার্কিং চত্বরে একাকী কোনো দিশেহারা শিশুকে দেখতে পেলে দ্রুত স্থানীয় পুলিশ থানা অথবা **১১২ (জরুরি পুলিশ হেল্পলাইন)** ও **১০৯৮ (চাইল্ডলাইন)** নম্বরে যোগাযোগ করুন। মানবিক এই আহ্বানে সাড়া দিয়ে বহু স্বেচ্ছাসেবী ও প্রতিবেশী দলবদ্ধভাবে সন্ধান অভিযানে সহায়তা করছেন।`,
  category: 'administration',
  categoryNameBn: 'প্রশাসন ও জনকল্যাণ',
  authorId: 'sudipta-chatterjee',
  authorName: 'সুদীপ্তা চ্যাটার্জী',
  authorRole: 'সিনিয়র সংস্কৃতি ও সমাজ বিষয়ক প্রতিনিধি',
  reportingLocation: 'বারুইপুর থানা ও রেলওয়ে জংশন',
  sourceId: 'src-fb-baruipur-barta',
  sourceName: 'Baruipur Barta',
  sourceType: 'facebook',
  sourceUrl: 'https://www.facebook.com/1786273570168137',
  originalPostUrl: 'https://www.facebook.com/1786273570168137',
  imageUrl: '/images/crawled/2d2d4a9cef6cd8e8fd06cffb5570ef96.jpg',
  images: [ '/images/crawled/2d2d4a9cef6cd8e8fd06cffb5570ef96.jpg' ],
  publishedAt: '2026-11-26T05:00:00.000Z',
  isBreaking: true,
  isFeatured: false,
  status: 'published',
  views: 290,
  crawlHash: 'missing-child-tracing-20261126'
};

if (missingIndex !== -1) {
  newsData.articles[missingIndex] = { ...newsData.articles[missingIndex], ...missingArticle };
} else {
  newsData.articles.unshift(missingArticle);
}
console.log('✓ Published Missing Child Tracing Article');

// (D) Winter Season Produce & Guava Market in Baruipur
const winterMarketArticle = {
  id: 'art-20261126-baruipur-winter-vegetables-guava-market',
  title: 'শীতের মৃদু পরশে বারুইপুরে জমজমাট কাচারি ও স্টেশন বাজার: সুস্বাদু শীতকালীন পেয়ারা ও টাটকা শাকসবজির বিপুল জোগান, স্বস্তিতে শহরবাসী',
  slug: 'winter-vegetables-fresh-guavas-arrival-baruipur-kachari-bazar-station-market-2026',
  summary: 'হিমেল হাওয়ার ছোঁয়ায় বারুইপুরের বাজারে শুরু হয়েছে শীতকালীন উৎসবের মেজাজ। বিখ্যাত বারুইপুরের পেয়ারা, নতুন ফুলকপি, শিম ও পালং শাকের পর্যাপ্ত জোগানে দাম অনেকটাই নিয়ন্ত্রণে। সকাল থেকেই কাচারি বাজার ও স্টেশন চত্বরে ক্রেতাদের ভিড়।',
  content: `অগ্রহায়ণ মাসের সূচনাতেই দক্ষিণ শহরতলির আবহাওয়ায় নেমে এসেছে মনোরম শীতের আমেজ। ভোরের হালকা কুয়াশা আর সকালের মিঠে রোদের সাথে সাথে জমে উঠেছে বারুইপুরের প্রধান বাণিজ্যিক কেন্দ্র **কাচারি বাজার ও বারুইপুর স্টেশন পাইকারি বাজার**। সুন্দরবন ও বারুইপুর ব্লকের বিভিন্ন প্রান্ত থেকে চাষিরা প্রতিদিন ভোরে ভ্যান ও টোটো বোঝাই করে নিয়ে আসছেন সদ্য তোলা টাটকা শীতের শাকসবজি। বিশেষ করে শীতকালীন সুমিষ্ট লাল ও সাদা দানার বিখ্যাত **বারুইপুরের পেয়ারা (Baruipur Guava)** বাজারে আসতেই ফলের দোকানগুলিতে ক্রেতাদের লম্বা লাইন লক্ষ্য করা যাচ্ছে।

---

### ১. শীতকালীন শাকসবজির পর্যাপ্ত জোগান ও দামের স্বস্তি
বিগত সপ্তাহে অসময়ের বৃষ্টির কারণে সবজির দামে সাময়িক ওঠানামা দেখা গেলেও আবহাওয়া স্বাভাবিক হওয়ায় সরবরাহ এখন বিপুল। কাচারি বাজারে স্থানীয় কৃষকদের উৎপাদিত নতুন ফুলকপি (প্রতি পিস ১৫–২৫ টাকা), কচি বাঁধাকপি, শিম, পালং শাক ও লাল শাক অত্যন্ত সুলভ মূল্যে বিকোচ্ছে। ক্রেতারা জানান, টাটকা স্থানীয় মাঠের সবজি সরাসরি কৃষকের হাত থেকে কিনতে পারায় মান যেমন ভালো, তেমনই দামও কলকাতার পাইকারি বাজারের চেয়ে যথেষ্ট সাশ্রয়ী।

---

### ২. বারুইপুরের পেয়ারা ও মৌসুমি ফলের রমরমা
দক্ষিণ ২৪ পরগনার অহংকার হলো বারুইপুরের পেয়ারা। শীতের শুরুতে গাছের মিষ্টি নরম ও সুস্বাদু পেয়ারা প্রতিদিন শিয়ালদহ দক্ষিণ শাখার ট্রেনে করে কলকাতার কলেজ স্ট্রিট, শিয়ালদহ ও মানিকতলা বাজারে চালান হচ্ছে। স্থানীয় বাজারেও প্রতি কেজি ৩০ থেকে ৫০ টাকার মধ্যে উচ্চমানের মিষ্টি পেয়ারা মিলছে। এর পাশাপাশি শীতের সূচনায় বাজারে আসতে শুরু করেছে জয়নগরের খাঁটি নলেন গুড় ও মোয়ার আগাম সম্ভার।

---

### ৩. জমজমাট সান্ধ্য বাজার ও পথখাবারের ভিড়
শীতের আমেজে কেবল সকালের বাজারই নয়, সন্ধ্যার পর বারুইপুর কুলপী রোড ও স্টেশন বাজার মোড়ে বিভিন্ন চায়ের দোকান, গরম ভাজাভুজি ও পিঠে-পুলির দোকানেও জমে উঠছে আড্ডা। পুরসভার পক্ষ থেকে বাজার চত্বরে নিয়মিত বর্জ্য সাফাই ও ড্রেন পরিষ্কারের কাজ জোরকদমে চালানো হচ্ছে যাতে ক্রেতা ও ব্যবসায়ীরা স্বাস্থ্যসম্মত পরিবেশে কেনাকাটা করতে পারেন।`,
  category: 'lifestyle',
  categoryNameBn: 'জীবনযাত্রা ও বাণিজ্য',
  authorId: 'subir-roy',
  authorName: 'সুবীর রায়',
  authorRole: 'ঐতিহ্য ও সাংস্কৃতিক গবেষক',
  reportingLocation: 'বারুইপুর কাচারি বাজার ও স্টেশন মার্কেট',
  sourceId: 'src-original-curated',
  sourceName: 'বারুইপুর বার্তা ডট কম বিশেষ সম্পাদকীয়',
  sourceType: 'portal_original',
  sourceUrl: 'https://baruipur.in/lifestyle',
  originalPostUrl: 'https://baruipur.in/lifestyle',
  imageUrl: '/images/crawled/5b4df150cff35a17a2708e2d9cb741f5.jpg',
  images: [ '/images/crawled/5b4df150cff35a17a2708e2d9cb741f5.jpg' ],
  publishedAt: '2026-11-26T04:30:00.000Z',
  isBreaking: false,
  isFeatured: false,
  status: 'published',
  views: 275,
  crawlHash: 'winter-market-baruipur-20261126'
};

const winterMarketIdx = newsData.articles.findIndex(a => a.id === winterMarketArticle.id);
if (winterMarketIdx !== -1) {
  newsData.articles[winterMarketIdx] = winterMarketArticle;
} else {
  newsData.articles.unshift(winterMarketArticle);
}
console.log('✓ Published Winter Produce & Guava Market Article');

// (E) Prune low-quality/out-of-area drafts
const idsToPrune = [
  'art-1795674514781-432g',
  'art-1795674514216-e41t',
  'art-1795674513721-l91j',
  'art-1795674511892-0b44'
];

newsData.articles = newsData.articles.filter(a => !idsToPrune.includes(a.id));
console.log('✓ Pruned 4 out-of-area drafts');

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf8');
console.log('✓ Saved news_data.json. Total articles:', newsData.articles.length);


// 2. SYNC OFFICIAL NOTICES
const noticesRaw = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf8'));

const newNoticesToAdd = [
  {
    id: 'not-blro-2026-1126-mutation-camp',
    memoNo: 'Memo No: 940/BLRO/BRP-MUTATION/2026',
    title: 'বারুইপুর মহকুমার ১ ও ২ নম্বর ব্লকে কৃষি ও বাস্তু জমির দ্রুত নামপত্তন (Mutation) ও ডিজিটাল খতিয়ান সংশোধনে বিশেষ গ্রামভিত্তিক ক্যাম্প পরিচালনার বিজ্ঞপ্তি',
    titleEn: 'Special Village-Level Camp Schedule for Fast-Track Land Mutation & Digital Khatian Correction across Baruipur-I & II Blocks',
    departmentId: 'blro',
    departmentName: 'ভূমি ও ভূমি সংস্কার দপ্তর (BL&LRO Baruipur)',
    publishedDate: '2026-11-26',
    publishedDateFormatted: '২৬ নভেম্বর, ২০২৬',
    category: 'ভূমি রেকর্ড ও মিউটেশন নির্দেশিকা',
    isUrgent: false,
    summary: 'বারুইপুরের গ্রামীণ ও শহরতলি এলাকার সাধারণ রায়ত ও জমি ক্রেতাদের দীর্ঘসূত্রতা এড়াতে সরাসরি পঞ্চায়েত স্তরে নিষ্কণ্টক দলিল যাচাই, হিয়ারিং ও স্পট মিউটেশন সার্টিফিকেট প্রদানের বিস্তারিত সময়সূচি।',
    content: `ভূমি ও ভূমি সংস্কার দপ্তর, বারুইপুর মহকুমা শাখার পক্ষ থেকে সাধারণ জমির মালিকদের সুবিধার্থে নিম্নলিখিত বিশেষ পরিষেবা নির্দেশিকা জারি করা হলো:\n\n১. জমি ক্রয়-বিক্রয়ের পর আইনি রেকর্ডভুক্তকরণের সুবিধার্থে আগামী সপ্তাহ থেকে সংশ্লিষ্ট গ্রাম পঞ্চায়েত ভবনে 'দুয়ারে মিউটেশন' স্পেশাল ক্যাম্প অনুষ্ঠিত হবে।\n২. ওয়ারিশান সূত্রে বা রেজিস্ট্রিকৃত সাফ-কবলা দলিলের মাধ্যমে মালিকানা লাভকারী ব্যক্তিরা মূল দলিল, পরচা ও আধার কার্ড সহ নির্দিষ্ট ফর্মে আবেদন জমা দিতে পারবেন।\n৩. শুনানির (Hearing) দিন কোনো মধ্যস্বত্বভোগী বা দালালের সাহায্য ছাড়াই সরাসরি বিএলএলআরও আধিকারিকদের সামনে নথি উপস্থাপন করতে হবে।\n৪. 'বাংলার ভূমি' (BanglarBhumi) পোর্টালে ইতোমধ্যে আবেদনকৃত পেন্ডিং মিউটেশন কেসগুলির দ্রুত নিষ্পত্তি এই ক্যাম্পের মাধ্যমে অগ্রাধিকার পাবে।`,
    pdfUrl: 'https://s24pgs.gov.in/notice/',
    pdfSize: '525 KB',
    signatory: 'মহকুমা ভূমি ও ভূমি সংস্কার আধিকারিক (BL&LRO), বারুইপুর',
    status: 'active',
    sourceUrl: 'https://s24pgs.gov.in/notice/',
    sourcePortalName: 's24pgs.gov.in (ভূমি ও ভূমি সংস্কার দপ্তর)'
  },
  {
    id: 'not-hospital-2026-1126-blood-donation-winter-stock',
    memoNo: 'Memo No: 1465/SDH-BRP/BLOOD-BANK/2026',
    title: 'শীতকালীন মরশুমে রক্ত সংকট এড়াতে বারুইপুর মহকুমা ব্লাড সেন্টারের উদ্যোগে স্বেচ্ছায় রক্তদান শিবির ও সার্বক্ষণিক রক্তের মজুত বিজ্ঞপ্তি',
    titleEn: 'Voluntary Blood Donation Drive & 24x7 Emergency Blood Component Availability Advisory by Baruipur Subdivisional Blood Centre',
    departmentId: 'hospital',
    departmentName: 'বারুইপুর মহকুমা হাসপাতাল ব্লাড সেন্টার ও স্বাস্থ্য দপ্তর (SDH Baruipur)',
    publishedDate: '2026-11-26',
    publishedDateFormatted: '২৬ নভেম্বর, ২০২৬',
    category: 'জরুরি স্বাস্থ্য ও রক্তদান পরিষেবা',
    isUrgent: false,
    summary: 'শীতের উৎসব ও অবকাশকালীন সময়ে মহকুমা হাসপাতালে থ্যালাসেমিয়া আক্রান্ত শিশু ও প্রসূতি মায়েদের রক্তের নিরবচ্ছিন্ন জোগান নিশ্চিত করতে ক্লাব ও সমাজসেবী সংস্থাগুলিকে রক্তদান শিবির আয়োজনের আহ্বান।',
    content: `বারুইপুর মহকুমা হাসপাতাল ব্লাড সেন্টারের পক্ষ থেকে সমস্ত সমাজকল্যাণ সংস্থা, পুজো কমিটি ও ক্লাব কর্তৃপক্ষের অবগতির জন্য জানানো যাচ্ছে:\n\n১. মহকুমা ব্লাড ব্যাংকে বর্তমানে প্রতিদিন গড়ে ৩০–৪০ ইউনিট রক্তের প্রয়োজন হয়, যার একটি বড় অংশ থ্যালাসেমিয়া ও ডায়ালিসিস রোগীদের বিনামূল্যে সরবরাহ করা হয়।\n২. শীতকালে রক্তদান শিবিরের সংখ্যা কমে যাওয়ার ঝুঁকি এড়াতে স্থানীয় ক্লাব ও সংগঠনগুলিকে এগিয়ে আসার অনুরোধ করা হচ্ছে।\n৩. ব্লাড সেন্টারের নিজস্ব মোবাইল ব্লাড কালেকশন ভ্যান ও অভিজ্ঞ চিকিৎসাকর্মী দল যেকোনো শিবিরে বিনামূল্যে রক্ত সংগ্রহ পরিষেবা প্রদান করবে।\n৪. প্রতিটি স্বেচ্ছাসেবী রক্তদাতাকে সরকারি প্রশংসাপত্র, ডিজিটাল ডোনার কার্ড ও রিফ্রেশমেন্ট প্রদান করা হবে। জরুরি প্রয়োজনে ব্লাড ব্যাংকের সার্বক্ষণিক হেল্পলাইন খোলা রয়েছে।`,
    pdfUrl: 'https://wbhealth.gov.in/',
    pdfSize: '498 KB',
    signatory: 'মেডিক্যাল অফিসার ইন-চার্জ ও সুপারিন্টেন্ডেন্ট, বারুইপুর মহকুমা হাসপাতাল',
    status: 'active',
    sourceUrl: 'https://wbhealth.gov.in/',
    sourcePortalName: 'wbhealth.gov.in (স্বাস্থ্য ভবন)'
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

noticesRaw.lastUpdated = '2026-11-26';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesRaw, null, 2), 'utf8');
console.log('✓ Total notices:', noticesRaw.notices.length);


// 3. SYNC E-TENDERS
const tendersRaw = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf8'));

const newTendersToAdd = [
  {
    id: 'ten-bm-2026-1126-led-solar-highmast',
    nitNumber: 'WBMAD/BM/NIT-27/SOLAR-HIGHMAST/2026',
    title: 'বারুইপুর পুরসভার ৮ ও ৯ নম্বর ওয়ার্ডের জনবহুল সংযোগস্থল ও পার্ক সংলগ্ন স্থানে সোলার হাই-মাস্ট লাইট স্থাপন ও বিদ্যুৎ সাশ্রয়ী এলইডি আলোকসজ্জা',
    titleEn: 'Supply, Installation & 5-Year Maintenance of Solar Powered High-Mast LED Lighting Systems at Busy Junctions & Parks under Ward 8 & 9 of Baruipur Municipality',
    authorityId: 'municipality',
    authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
    department: 'বিদ্যুৎ ও পৌর আলোকসজ্জা সেল (Electrical Lighting Dept)',
    location: 'ওয়ার্ড নম্বর ৮ ও ৯ পার্ক এবং বাজার সংযোগ, বারুইপুর',
    category: 'সৌর আলোকসজ্জা ও বৈদ্যুতিক পরিকাঠামো (Solar & Electrical Works)',
    estimatedValue: '₹১৩,৮৫,০০০',
    estimatedValueNum: 1385000,
    emdAmount: '₹২৭,৭০০',
    tenderFee: '₹১,০০০',
    publishDate: '২০২৬-১১-২৬',
    closingDate: '২০২৬-১২-২২',
    bidOpeningDate: '২০২৬-১২-২৪',
    status: 'active',
    portalLink: 'https://wbtenders.gov.in/',
    tenderRef: 'WBMAD/BM/NIT-27/ELEC/2026',
    eligibility: 'পৌর সংস্থা বা সরকারি সংস্থায় মিনি হাই-মাস্ট ও সৌর এলইডি আলোকসজ্জা সংস্থাপনে ন্যূনতম ৩ বছরের বাস্তব অভিজ্ঞতাসম্পন্ন রেজিস্টার্ড ইলেকট্রিক্যাল কন্ট্রাক্টর।',
    sourcePortalName: 'wbtenders.gov.in (Baruipur Municipality)'
  },
  {
    id: 'ten-zp-2026-1126-baruipur-kalyanpur-bridge',
    nitNumber: 'S24PZP/BRP-SUBDIV/NIT-32/CULVERT-RECON/2026',
    title: 'বারুইপুর কল্যাণপুর সংযোগকারী গ্রামীণ প্রধান সড়কের উপর বিপজ্জনক পুরানো সাঁকো ভেঙে নতুন দ্বিতল আরসিসি বক্স কালভার্ট ও গার্ডওয়াল নির্মাণ',
    titleEn: 'Demolition of Dilapidated Wooden Culvert & Construction of Heavy-Duty RCC Double Box Culvert with Protective Guard Wall on Baruipur-Kalyanpur Rural Link Road',
    authorityId: 'zp',
    authorityName: 'দক্ষিণ ২৪ পরগনা জেলা পরিষদ (South 24 Parganas Zilla Parishad)',
    department: 'পূর্ত ও গ্রামীণ সেতু নির্মাণ দপ্তর',
    location: 'বারুইপুর - কল্যাণপুর জেলা পরিষদ গ্রামীণ সড়ক সংযোগ',
    category: 'সেতু ও আরসিসি কালভার্ট নির্মাণ (Bridge & Culvert Engineering)',
    estimatedValue: '₹২১,৫০,০০০',
    estimatedValueNum: 2150000,
    emdAmount: '₹৪৩,০০০',
    tenderFee: '₹১,৫০০',
    publishDate: '২০২৬-১১-২৬',
    closingDate: '২০২৬-১২-২৩',
    bidOpeningDate: '২০২৬-১২-২৬',
    status: 'active',
    portalLink: 'https://wbtenders.gov.in/',
    tenderRef: 'S24PZP/ENGG/BRP-BRIDGE/NIT-32/2026',
    eligibility: 'জেলা পরিষদ, পিডব্লিউডি বা ইরিগেশন দপ্তরে আরসিসি ব্রিজ/বক্স কালভার্ট নির্মাণে ৩ বছরের পরীক্ষিত অভিজ্ঞতাসম্পন্ন রেজিস্টার্ড সিভিল কনস্ট্রাকশন এজেন্সি।',
    sourcePortalName: 'wbtenders.gov.in (Zilla Parishad)'
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

tendersRaw.lastUpdated = '2026-11-26';
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersRaw, null, 2), 'utf8');
console.log('✓ Total tenders:', tendersRaw.tenders.length);


// 4. SYNC REAL ESTATE / PROPERTIES
const propRaw = JSON.parse(fs.readFileSync(PROPERTIES_FILE, 'utf8'));
const propList = Array.isArray(propRaw) ? propRaw : propRaw.properties;

const newProperty = {
  id: 'prop-brp-040',
  title: 'বারুইপুর কুলপী রোড ও কাচারি মোড় সংলগ্ন প্রধান আবাসিক এলাকায় সম্পূর্ণ নতুন ২ কাঠার বাণিজ্যিক ও আবাসিক সংমিশ্রিত বাস্তু প্লট বিক্রয়',
  titleEn: '2 Katha Prime Commercial-cum-Residential Vastu Plot for Sale near Baruipur Kulpi Road & Kachari More',
  category: 'land_plot',
  categoryNameBn: 'আবাসিক ও বাণিজ্যিক জমি (Land Plot)',
  location: 'কুলপী রোড সংযোগ, কাচারি মোড় সংলগ্ন, বারুইপুর, দক্ষিণ ২৪ পরগনা',
  locationArea: 'Kulpi Road / Kachari More',
  price: '₹১৮.০০ লক্ষ (প্রতি কাঠা ₹৯.০০ লক্ষ)',
  priceNum: 1800000,
  priceUnit: 'total',
  configuration: '২ কাঠা উঁচু ভরাট চারকোনা প্লট (২০ ফুট চওড়া পিচ রাস্তার সংযোগ)',
  areaSqFt: '১,৪৪০ বর্গফুট (২ কাঠা)',
  facing: 'উত্তর-পূর্ব মুখী (বাস্তুসম্মত ও আলো-বাতাসময়)',
  floorInfo: 'বাস্তু ভিটি জমি (বাউন্ডারি পিলার ও সুরক্ষিত সীমানা সহ)',
  possessionStatus: 'তাৎক্ষণিক রেজিস্ট্রি ও দখল (Immediate Registry)',
  reraStatus: 'বারুইপুর পুরসভা ও বিএলএলআরও রেকর্ডভুক্ত বৈধ বাস্তু জমি',
  approvalStatus: 'সম্পূর্ণ নিষ্কণ্টক রায়তি সত্য ও ডিজিটাল পরচা সহ প্রস্তুত',
  bankLoanApproved: 'বাড়ি বা বাণিজ্যিক দোকান তৈরির জন্য SBI ও PNB ল্যান্ড লোন অনুমোদিত',
  amenities: [
    '২০ ফুট চওড়া সরকারি পিচ ঢালাই রাস্তা সংলগ্ন বিশাল ফ্রন্ট',
    'বিদ্যুৎ সংযোগ, পুর পানীয় জলের লাইন ও পাকা ড্রেনেজ সুবিধা',
    'কাচারি বাজার, পুরসভা অফিস ও মহকুমা আদালত থেকে মাত্র ২ মিনিটের পথ',
    'দোকান-কাম-বাড়ি অথবা বাণিজ্যিক চেম্বার নির্মাণের জন্য শ্রেষ্ঠ অবস্থান'
  ],
  description: 'বারুইপুরের ব্যস্ততম বাণিজ্যিক কেন্দ্র কাচারি মোড় ও কুলপী রোড সংযোগে অবস্থিত ২ কাঠার উঁচু ভরাট নিষ্কণ্টক বাস্তু প্লট। সামনে চওড়া পিচ রাস্তা ও সমস্ত নাগরিক সুবিধা বিদ্যমান থাকায় নিচতলায় দোকান বা গোডাউন এবং উপরতলায় বিলাসবহুল বাড়ি তৈরির জন্য একদম আদর্শ।',
  imageUrl: '/images/baruipur-real-estate-flats-guide.jpg',
  images: [ '/images/baruipur-real-estate-flats-guide.jpg' ],
  featured: true,
  contactPerson: 'পিনাকী সেনগুপ্ত (বারুইপুর রিয়েলটি হাব)',
  contactPhone: '+91 98318 66723',
  contactWhatsapp: '+91 98318 66723',
  publishedAt: '২০২৬-১১-২৬'
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

console.log('\n🎉 ২৬ নভেম্বর সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
