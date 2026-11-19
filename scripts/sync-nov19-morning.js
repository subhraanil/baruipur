const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const PROPERTIES_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ১৯ নভেম্বর ২০২৬ (সকাল) সম্পূর্ণ সিঙ্ক ও পরিমার্জন');
console.log('===============================================================\n');

// 1. UPDATE & POLISH NEWS ARTICLES
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
const articles = newsData.articles || newsData;

// Articles to polish & publish
const polishedArticles = [
  {
    id: 'art-1795068040288-llph',
    slug: 'baruipur-municipality-board-dissolution-bjp-tmc-political-clash-2026',
    title: 'বারুইপুর পুরবোর্ড ভাঙা নিয়ে রাজনৈতিক চাপানউতোর তুঙ্গে: চেয়ারম্যানের পদত্যাগের পর বিজেপির সাংবাদিক বৈঠক ও পাল্টা তৃণমূলের বক্তব্য',
    titleEn: 'Political Turmoil Over Baruipur Municipality Board Dissolution: BJP Press Conference Following Chairman Resignation and TMC Rebuttal',
    summary: 'মেয়াদ শেষের আগেই বারুইপুর পুরবোর্ড ভেঙে দেওয়া ও চেয়ারম্যানের পদত্যাগকে কেন্দ্র করে মহকুমায় চরম রাজনৈতিক চাপানউতোর। বিজেপির তোপ দাগার বিপরীতে নাগরিক পরিষেবা সচল রাখার বার্তা শাসকদলের।',
    category: 'administration-civic',
    categoryBn: 'প্রশাসন ও পুর পরিষেবা',
    status: 'published',
    source: 'Baruipur Barta / On-Field Press',
    sourceUrl: 'https://baruipur.online/news/baruipur-municipality-board-dissolution-bjp-tmc-political-clash-2026',
    author: 'বারুইপুর বার্তা ডেস্ক',
    published_at: '2026-11-19T10:15:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সকাল ১০:১৫',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/a59bf5eca81050daa36af62b7eae1013.jpg',
      '/images/crawled/ac3387efd211f167d8cc111ad0076106.jpg'
    ],
    views: 412,
    likes: 38,
    shares: 24,
    tags: ['বারুইপুর পুরসভা', 'পুরবোর্ড', 'চেয়ারম্যান পদত্যাগ', 'বিজেপি', 'তৃণমূল কংগ্রেস', 'দক্ষিণ ২৪ পরগনা রাজনীতি', 'নাগরিক পরিষেবা'],
    content: `বারুইপুর পুরসভার বর্তমান পুরবোর্ডের স্বাভাবিক মেয়াদ শেষের মাত্র তিন মাস আগেই চেয়ারম্যানের পদত্যাগ এবং কার্যনির্বাহী বোর্ড ভেঙে দেওয়ার সিদ্ধান্ত ঘিরে বারুইপুর মহকুমা রাজনীতিতে চরম আলোড়ন সৃষ্টি হয়েছে। গতকালের এই নাটকীয় ঘটনার রেশ ধরে আজ সকাল থেকেই ময়দানে নেমে পড়েছে রাজনৈতিক দলগুলি। পুরভবন সংলগ্ন কার্যালয়ে সাংবাদিক সম্মেলন করে শাসকদল ও প্রাক্তন পুরবোর্ডের বিরুদ্ধে দুর্নীতির মারাত্মক অভিযোগ তুলেছে ভারতীয় জনতা পার্টি (বিজেপি)। পাল্টা জবাব দিয়ে তৃণমূল কংগ্রেস নেতৃত্ব জানিয়েছে, সাংগঠনিক রদবদল ও দলীয় শৃঙ্খলা মেনেই পদক্ষেপ নেওয়া হয়েছে এবং শহরের স্বাভাবিক নাগরিক পরিষেবায় কোনো প্রভাব পড়তে দেওয়া হবে না।

আজ সকালে আয়োজিত সাংবাদিক বৈঠকে বিজেপির রাজ্য কমিটির সদস্য উত্তম কর এবং বারুইপুর পশ্চিম বিধানসভার দলীয় নেতৃত্ব একযোগে অভিযোগ করেন, "পৌরসভায় সরকারি আর্থিক সহায়তায় অনিয়ম, স্বজনপোষণ এবং সাধারণ কাউন্সিলরদের ওপর চাপ সৃষ্টির কারণেই অভ্যন্তরীণ অসন্তোষ চরমে উঠেছিল। নিজেদের ব্যর্থতা ঢাকতেই মেয়াদের অন্তিম লগ্নে বোর্ড ভেঙে দিয়ে প্রশাসক বসানোর পথ তৈরি করা হচ্ছে।" বিজেপি নেতৃত্বের দাবি, অবিলম্বে সমস্ত আর্থিক খরচের শ্বেতপত্র প্রকাশ করতে হবে এবং ওয়ার্ডে ওয়ার্ডে জমে থাকা আবর্জনা, বেহাল রাস্তা ও নিকাশি সমস্যার দ্রুত স্থায়ী সমাধান করতে হবে।

অন্যদিকে, বিরোধীদের এই সমস্ত অভিযোগ সম্পূর্ণ উড়িয়ে দিয়েছে তৃণমূল পুর নেতৃত্ব। পদত্যাগী চেয়ারম্যান ও পুর প্রতিনিধিরা জানান, দলীয় শীর্ষ নেতৃত্বের নির্দেশ এবং প্রশাসনিক পুনর্গঠনের লক্ষ্যেই এই পদক্ষেপ নেওয়া হয়েছে। পুর প্রশাসকমণ্ডলীর এক শীর্ষ আধিকারিক জানান, "বারুইপুরবাসীর পানীয় জল, জঞ্জাল নিষ্কাশন, স্ট্রিট লাইট বা স্বাস্থ্য পরিষেবা কোনো অবস্থাতেই ব্যাহত হবে না। পুর আইন মেনেই জেলা প্রশাসনের পক্ষ থেকে মহকুমা শাসক (SDO) ও পদস্থ আধিকারিকদের সমন্বয়ে প্রশাসক কমিটি দায়িত্ব গ্রহণ করবে।"

উল্লেখ্য, বারুইপুর পুরসভার ১৭টি ওয়ার্ডের সাধারণ মানুষ যাতে কোনো সরকারি শংসাপত্র, জন্ম-মৃত্যু সার্টিফিকেট বা পরিষেবা পেতে হয়রানির শিকার না হন, তার জন্য পুরভবনে হেল্পডেস্ক সচল রাখার নির্দেশ দিয়েছেন জেলাশাসক। আগামী পুরভোটের প্রাক্কালে বারুইপুরের এই রাজনৈতিক সমীকরণ দক্ষিণ ২৪ পরগনার রাজনৈতিক মহলে নতুন মাত্রা যোগ করেছে।`
  },
  {
    id: 'art-1795068023326-8zq9',
    slug: 'sonarpur-burglary-during-kali-puja-immersion-cash-gold-stolen-police-probe',
    title: 'কালীপুজোর বিসর্জনের মাঝে সোনারপুরে ফাঁকা বাড়িতে দুঃসাহসিক চুরি: নগদ টাকা ও ৬ লক্ষাধিক টাকার গয়না লুট, তদন্তে পুলিশ',
    titleEn: 'Daring Burglary in Sonarpur During Kali Puja Immersion: Cash and Gold Ornaments Worth Over 6 Lakhs Looted, Police Probe Underway',
    summary: 'পরিবারের সকলে কালীপ্রতিমা বিসর্জনের শোভাযাত্রায় যোগ দিতে গিয়েছিলেন। সেই সুযোগে ঘরের তালা ও আলমারির লকার ভেঙে সর্বস্ব লুঠ করে চম্পট দিল দুষ্কৃতী দল। সোনারপুর থানার পুলিশ তদন্তে নেমেছে।',
    category: 'crime',
    categoryBn: 'আইনশৃঙ্খলা ও অপরাধ',
    status: 'published',
    source: 'Sonarpur Police / Local Crime Desk',
    sourceUrl: 'https://baruipur.online/news/sonarpur-burglary-during-kali-puja-immersion-cash-gold-stolen-police-probe',
    author: 'অপরাধ সংবাদদাতা, সোনারপুর',
    published_at: '2026-11-19T09:45:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সকাল ০৯:৪৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/c8d02a42c167ef3dc4288c0c07b6050e.jpg',
      '/images/crawled/345d676a9620c498d5545b2df7a80265.jpg'
    ],
    views: 385,
    likes: 22,
    shares: 19,
    tags: ['সোনারপুর', 'চুরি', 'কালীপুজো বিসর্জন', 'বারুইপুর পুলিশ জেলা', 'সোনার গয়না লুট', 'তদন্ত'],
    content: `উৎসবের আনন্দের মাঝেই সোনারপুর থানা এলাকার একটি জনবহুল আবাসিক পাড়ায় ঘটে গেল চরম দুঃসাহসিক চুরির ঘটনা। এলাকার পারিবারিক কালীপুজোর প্রতিমা বিসর্জনের শোভাযাত্রা দেখতে পরিবারের সমস্ত সদস্য যখন বাইরে ছিলেন, ঠিক সেই সুযোগকে কাজে লাগিয়ে তালা ভেঙে ফাঁকা বাড়িতে ঢুকে নগদ টাকা ও বিপুল পরিমাণ সোনার গয়না নিয়ে চম্পট দিয়েছে দুষ্কৃতীরা।

পুলিশ ও স্থানীয় সূত্রে জানা গিয়েছে, সোনারপুর থানা এলাকার সুভাষপল্লির বাসিন্দা সমীরণ মুখোপাধ্যায়ের বাড়িতে এই চুরির ঘটনা ঘটে। পরিবারের সদস্যরা জানান, গতকাল রাতে এলাকার ক্লাবের প্রতিমা বিসর্জনের শোভাযাত্রা উপলক্ষে বাড়ির মূল গেটে ও প্রধান দরজায় তালা দিয়ে তাঁরা বাইরে গিয়েছিলেন। রাত প্রায় সাড়ে এগারোটা নাগাদ বাড়ি ফিরে এসে তাঁরা দেখতে পান প্রধান কাঠের দরজার তালা ভাঙা অবস্থায় ঝুলছে। ভেতরে ঢুকে দেখা যায় শোবার ঘরের সমস্ত আলমারি ও ড্রয়ার খোলা, জিনিসপত্র মেঝেতে লন্ডভন্ড হয়ে পড়ে রয়েছে।

পরিবারের দাবি, আলমারির লকারে রাখা প্রায় নগদ দেড় লক্ষ টাকা এবং প্রায় ১০ ভরির বেশি সোনার গয়না (যার আনুমানিক বাজারমূল্য প্রায় ৬ লক্ষাধিক টাকা) খোয়া গিয়েছে। খবর পেয়ে রাতেই ঘটনাস্থলে পৌঁছায় সোনারপুর থানার পুলিশ এবং বারুইপুর পুলিশ জেলার তদন্তকারী দল। এলাকার সিসিটিভি ক্যামেরার ফুটেজ খতিয়ে দেখে সন্দেহভাজনদের গতিবিধি চিহ্নিত করার চেষ্টা চালানো হচ্ছে। 

স্থানীয় বাসিন্দাদের অভিযোগ, উৎসব বা বিসর্জনের দিনগুলিতে পাড়ায় পুলিশি টহলদারি আরও বাড়ানো উচিত ছিল। কোনো পরিচিত ব্যক্তি আগে থেকেই বাড়ির গতিবিধির ওপর নজর রাখছিল কি না, তাও তদন্ত করে দেখছেন পুলিশ আধিকারিকরা।`
  },
  {
    id: 'art-1795068037823-73ak',
    slug: 'baruipur-pond-excavation-damage-house-boundary-wall-collapse-civic-complaint',
    title: 'বারুইপুরে জেসিবি দিয়ে অপরিকল্পিতভাবে পুকুর সংস্কারের জেরে বিপত্তি: ধসে গেল সংলগ্ন দোতলা বাড়ির সেফটি ট্যাঙ্ক ও বাউন্ডারি পাঁচিল, ক্ষোভ',
    titleEn: 'Unplanned Pond Excavation in Baruipur Causes Damage: Septic Tank and Boundary Wall of Adjacent Two-Storey House Collapse',
    summary: 'পৌরসভার নিয়ম উপেক্ষা করে কোনো সুরক্ষা বাঁধ ছাড়াই গভীর মাটি কাটার জের। দোতলা বসতবাড়ির সেফটি ট্যাঙ্ক ও বাউন্ডারি দেওয়াল ধসে পড়ে এলাকায় চরম আতঙ্ক। পুরসভায় দায়ের লিখিত অভিযোগ।',
    category: 'municipality',
    categoryBn: 'পৌরসভা ও স্থানীয় খবর',
    status: 'published',
    source: 'Baruipur Update Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-pond-excavation-damage-house-boundary-wall-collapse-civic-complaint',
    author: 'নাগরিক প্রতিনিধি, বারুইপুর',
    published_at: '2026-11-19T09:15:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সকাল ০৯:১৫',
    readTime: '৩ মিনিট',
    images: [
      '/images/crawled/6c615db3ee7c939ba4c638e30b2370e7.jpg'
    ],
    views: 310,
    likes: 19,
    shares: 15,
    tags: ['বারুইপুর পুরসভা', 'পুকুর সংস্কার', 'বাড়ি ক্ষতি', 'জেসিবি', 'নিরাপত্তা বিধি', 'নাগরিক ক্ষোভ'],
    content: `পৌর নিয়মকানুন ও সংলগ্ন বসতবাড়ির কাঠামোগত নিরাপত্তার তোয়াক্কা না করে জেসিবি (JCB) নামিয়ে অপরিকল্পিতভাবে পুকুর সংস্কার করতে গিয়ে ঘটে গেল বড়সড় দুর্ঘটনা। মাটির বাঁধ ধসে গিয়ে একটি দোতলা আবাসিক বাড়ির কংক্রিটের সেফটি ট্যাঙ্ক ও দীর্ঘ বাউন্ডারি প্রাচীর পুকুরের গর্ভে ভেঙে পড়েছে। এই ঘটনার জেরে এলাকায় চরম উত্তেজনা ও আতঙ্ক ছড়িয়ে পড়ে।

ঘটনাটি ঘটেছে বারুইপুর পুরসভার অন্তর্গত ৬ নম্বর ওয়ার্ড সংলগ্ন একটি আবাসিক পল্লিতে। স্থানীয় সূত্রে জানা গিয়েছে, একটি ব্যক্তিগত মালিকানাধীন বৃহৎ জলাশয় সংস্কার ও গভীর করার কাজ চলছিল। কিন্তু পুকুরের পার থেকে বসতবাড়ির সীমানার দূরত্ব রক্ষা না করে এবং পর্যাপ্ত পাইলিং বা বাঁশের খাঁচা না বসিয়েই সরাসরি বিশাল আকারের এক্সকাভেটর বা জেসিবি দিয়ে মাটি কাটার কাজ শুরু হয়। এর ফলেই তীব্র কম্পন ও অতিরিক্ত মাটি ক্ষয়ের কারণে সংলগ্ন দোতলা বাড়ির সীমানা পাঁচিল ও ভূগর্ভস্থ সেফটি ট্যাঙ্ক হঠাৎ বিকট শব্দে ধসে পড়ে।

ক্ষতিগ্রস্ত বাড়ির মালিক জানান, "বাড়ি ধসে পড়ার উপক্রম দেখে আমরা কোনোমতে পরিবার নিয়ে বাইরে বেরিয়ে আসি। এই ঝুঁকিপূর্ণ মাটি কাটার বিরুদ্ধে আগেই আপত্তি জানানো হয়েছিল, কিন্তু কোনো কর্ণপাত করা হয়নি।" খবর পেয়ে ঘটনাস্থলে পুরসভার স্যানিটেশন ও ইঞ্জিনিয়ারিং বিভাগের কর্মীরা আসেন। বিপদ এড়াতে আপাতত ওই পুকুরের মাটি কাটার কাজ সম্পূর্ণ বন্ধ করে দেওয়া হয়েছে। পুর কর্তৃপক্ষ জানিয়েছে, অনুমতিহীনভাবে বা অতিরিক্ত গভীরে মাটি কেটে সংলগ্ন সম্পত্তির ক্ষতি করা কঠোর আইনবিরুদ্ধ, তদন্ত সাপেক্ষে দ্রুত আইনি পদক্ষেপ নেওয়া হবে।`
  },
  {
    id: 'art-1795068027155-59un',
    slug: 'baruipur-puratan-bazar-doltala-150-year-ancient-jagaddhatri-puja-history',
    title: 'বারুইপুর পুরাতন বাজার দোলতলায় প্রায় ১৫০ বছরের প্রাচীন জগদ্ধাত্রী পুজো: জমিদার আমলের ঐতিহ্য, জাগ্রত দেবীর ভোগ ও ভক্তদের ঢল',
    titleEn: '150-Year Ancient Jagaddhatri Puja of Baruipur Puratan Bazar Doltala: Zamindari Heritage, Sacred Bhog, and Devotional Gathering',
    summary: 'বারুইপুরের প্রাচীনতম ঐতিহ্যবাহী পুজো ও ধর্মীয় সংস্কৃতির অন্যতম প্রতীক পুরাতন বাজারের জগদ্ধাত্রী মন্দির। দেড় শতাব্দীর পুরনো নিয়ম মেনে আজও অনুষ্ঠিত হয় বলিদান ও মহাপ্রসাদ বিতরণ।',
    category: 'culture',
    categoryBn: 'উৎসব ও সংস্কৃতি',
    status: 'published',
    source: 'Heritage Baruipur Desk',
    sourceUrl: 'https://baruipur.online/news/baruipur-puratan-bazar-doltala-150-year-ancient-jagaddhatri-puja-history',
    author: 'ঐতিহ্য ও সংস্কৃতি বিভাগ',
    published_at: '2026-11-19T08:30:00+05:30',
    date: '১৯ নভেম্বর, ২০২৬',
    time: 'সকাল ০৮:৩০',
    readTime: '৪ মিনিট',
    images: [
      '/images/crawled/bb0ae7b9c448257cfa88f5036ccdaaa3.jpg'
    ],
    views: 520,
    likes: 47,
    shares: 31,
    tags: ['বারুইপুর জগদ্ধাত্রী পুজো', 'পুরাতন বাজার', 'দোলতলা', 'বারুইপুরের ইতিহাস', 'প্রাচীন ঐতিহ্য', 'লোকসংস্কৃতি'],
    content: `দক্ষিণ ২৪ পরগনার প্রাচীন জনপদ বারুইপুরের বুকজুড়ে ছড়িয়ে রয়েছে বহু শতবর্ষ প্রাচীন ঐতিহাসিক ও ধর্মীয় ঐতিহ্য। তার মধ্যেই অন্যতম হলো বারুইপুর পুরাতন বাজার দোলতলার প্রায় ১৫০ বছরের প্রাচীন ঐতিহ্যবাহী জগদ্ধাত্রী পুজো। জমিদার আমল থেকে শুরু হওয়া এই পুজো আজও স্বমহিমায় এবং প্রাচীন শাস্ত্রীয় নিয়ম নিষ্ঠা মেনে উদযাপিত হয়ে আসছে।

স্থানীয় প্রবীণ ও মন্দির ট্রাস্ট সূত্রে জানা যায়, প্রায় দেড় শতাব্দী পূর্বে তৎকালীন ব্যবসায়ী ও জমিদার পরিবারের উদ্যোগে এই পূজার সূচনা হয়েছিল। আদি গঙ্গার প্রবাহ সংলগ্ন বারুইপুর পুরাতন বাজার তখন ছিল মহকুমার প্রধান বাণিজ্য কেন্দ্র। সেখানে ব্যবসা-বাণিজ্যের মঙ্গল কামনায় এবং মহামারী থেকে এলাকাবাসীকে রক্ষা করতে শুরু হয় দেবী জগদ্ধাত্রীর আরাধনা। কালের নিয়মে জমিদারি প্রথা বিলুপ্ত হলেও স্থানীয় ব্যবসায়ী ও এলাকাবাসীর আন্তরিক প্রচেষ্টায় সেই পূজার ঐতিহ্য একটুও ম্লান হয়নি।

এখানে দেবী অত্যন্ত জাগ্রত বলে সর্বস্তরের মানুষের দৃঢ় বিশ্বাস রয়েছে। নবমী তিথিতে চার প্রহরের বিশেষ পূজা, ষোড়শোপচারে আরতি এবং বাৎসরিক বলিদানের প্রাচীন রীতি আজও অক্ষুণ্ণ রাখা হয়েছে। দূর-দূরান্ত থেকে ভক্তরা দেবীর চরণে ডালি দিতে এবং মানত করতে ভিড় জমান। পুজো শেষে কয়েক হাজার মানুষের মধ্যে বিতরণ করা হয় দেবীর অন্নভোগ ও খিচুড়ি প্রসাদ। আধুনিক থিম সংস্কৃতির ভিড়ে বারুইপুর পুরাতন বাজারের এই সাবেকিয়ানা ও পারম্পর্য আজও মহকুমাবাসীকে ঐতিহ্যের গভীর টানে আপ্লুত করে।`
  }
];

// Update or replace existing in articles
polishedArticles.forEach(pa => {
  const idx = articles.findIndex(a => a.id === pa.id);
  if (idx !== -1) {
    articles[idx] = { ...articles[idx], ...pa };
    console.log(`✓ Updated & published: ${pa.title.substring(0, 50)}...`);
  } else {
    articles.unshift(pa);
    console.log(`✓ Inserted & published: ${pa.title.substring(0, 50)}...`);
  }
});

// Prune useless non-news / spam drafts from recent crawl
const spamDraftIds = [
  'art-1795068041204-qhic', // ব্যারাকপুর বিধায়ক (wrong district)
  'art-1795068036697-k24r', // Happy Children's Day!
  'art-1795068035448-5ubx', // কোন স্কুলের স্টুডেন্ট তুমি
  'art-1795068037193-4foe', // বিদায়ের সুরে...
  'art-1795068023033-igg5', // বাঁদরের বাদরামি...
  'art-1795068035842-cjrv', // ঘাটের অবস্থান ও সংযোগ
  'art-1795068035327-gq62', // ঘূর্ণি ঝড় ধেয়ে আসছে
  'art-1795068024216-7nly', // ইঞ্জিন ভ্যান থেকে মার্বেল পাথর...
  'art-1795068023188-c741'  // আগুনে পুড়ে... বাসন্তী
];

const initialCount = articles.length;
newsData.articles = articles.filter(a => !spamDraftIds.includes(a.id));
console.log(`✓ Pruned ${initialCount - newsData.articles.length} spam/out-of-area drafts. Total articles: ${newsData.articles.length}`);

fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf-8');
console.log('✓ Saved news_data.json\n');


// 2. UPDATE NOTICES DATA
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));
const newNotice = {
  id: 'not-bpd-2026-1119-traffic-winter',
  memoNo: 'Memo No: 2265/BPD/TRAFFIC-ADVISORY/2026',
  title: 'বারুইপুর কাছারি মোড়, রাস মাঠ ও স্টেশন রোড সংযোগে শীতকালীন ভিড় ও ট্রাফিক নিয়ন্ত্রণ সংক্রান্ত নির্দেশিকা',
  titleEn: 'Traffic Advisory on Movement and Parking Regulations around Kachari More, Rasmath and Station Road for Winter Season 2026',
  departmentId: 'police',
  departmentName: 'বারুইপুর পুলিশ জেলা (Baruipur Police)',
  publishedDate: '2026-11-19',
  publishedDateFormatted: '১৯ নভেম্বর, ২০২৬',
  category: 'ট্রাফিক ও জনশৃঙ্খলা',
  isUrgent: true,
  summary: 'রাসমেলা পূর্ববর্তী প্রস্তুতি ও শীতকালীন যানজট এড়াতে বারুইপুর স্টেশন রোড ও কাছারি মোড়ে ভারী পণ্যবাহী গাড়ি চলাচলে সময়সীমা নির্ধারণ ও বিকল্প পার্কিং জোনের বিজ্ঞপ্তি।',
  content: `বারুইপুর পুলিশ জেলা ও ট্রাফিক গার্ডের পক্ষ থেকে শীতকালীন উৎসব, আসন্ন রাসমেলা ও হাটবারের ভিড় নিয়ন্ত্রণে নিম্নলিখিত ট্রাফিক নির্দেশিকা জারি করা হচ্ছে:\n\n১. প্রতিদিন সকাল ৮:০০টা থেকে রাত ৯:০০টা পর্যন্ত বারুইপুর স্টেশন রোড, কাছারি মোড় ও রেলগেট ক্রসিংয়ে ১০ চাকা বা তদূর্ধ্ব ভারী পণ্যবাহী ট্রাক প্রবেশ সম্পূর্ণ নিয়ন্ত্রিত থাকবে।\n২. অটো ও টোটো চলাচলের জন্য স্টেশন রোডে নির্দিষ্ট লেন ও নির্ধারিত ড্রপ-অফ পয়েন্ট মেনে চলতে হবে। কোনো অবস্থাতেই চৌমাথায় যাত্রী তোলা বা নামানো যাবে না।\n৩. কাছারি ময়দান সংলগ্ন মেলা প্রাঙ্গণে ক্রেতা ও দর্শনার্থীদের সুবিধার্থে মহকুমা আদালত প্রাঙ্গণের বিপরীত পাশে এবং পুরাতন বাস টার্মিনালে অস্থায়ী দ্বি-চক্রযান ও চার-চাকা পার্কিং জোন চালু করা হয়েছে।\n৪. আইন অমান্যকারী যানবাহনের বিরুদ্ধে মোটর ভেহিকেলস আইনানুযায়ী কঠোর ব্যবস্থা ও জরিমানা গ্রহণ করা হবে। সুশৃঙ্খল যাতায়াত নিশ্চিতে সকলের সহযোগিতা প্রার্থনীয়।`,
  pdfUrl: 'https://wbpolice.gov.in/WBP/Common/WBP_Notice.aspx',
  pdfSize: '540 KB',
  signatory: 'ডেপুটি পুলিশ সুপারিনটেনডেন্ট (ট্রাফিক), বারুইপুর পুলিশ জেলা',
  status: 'active',
  sourceUrl: 'https://wbpolice.gov.in/WBP/Common/WBP_Notice.aspx',
  sourcePortalName: 'wbpolice.gov.in (বারুইপুর পুলিশ জেলা)'
};

// Remove if already exists, then unshift
noticesData.notices = noticesData.notices.filter(n => n.id !== newNotice.id);
noticesData.notices.unshift(newNotice);
noticesData.lastUpdated = '2026-11-19';
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✓ Added Notice: ${newNotice.memoNo} - ${newNotice.title.substring(0, 50)}...`);
console.log(`✓ Total notices: ${noticesData.notices.length}\n`);


// 3. UPDATE TENDERS DATA
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));
const newTender = {
  id: 'ten-bm-2026-1119-water-supply',
  nitNumber: 'WBMAD/BM/NIT-21/WATER-SUPPLY/2026',
  title: 'বারুইপুর পুরসভার ৮ ও ৯ নম্বর ওয়ার্ডে পানীয় জল পাইপলাইন নেটওয়ার্ক সম্প্রসারণ ও ডিস্ট্রিবিউশন ভালভ সংস্থাপন',
  titleEn: 'Expansion of Piped Drinking Water Distribution Network and Sluice Valve Installation in Ward 8 & 9 under Baruipur Municipality',
  authorityId: 'municipality',
  authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
  department: 'পানি সরবরাহ ও জনস্বাস্থ্য কারিগরি বিভাগ',
  location: 'ওয়ার্ড ৮ ও ৯ (মাস্টারপাড়া, রেলগেট ও সংলগ্ন এলাকা), বারুইপুর',
  category: 'পানীয় জল প্রকল্প (Water Infrastructure)',
  estimatedValue: '₹১৫,৮০,০০০',
  estimatedValueNum: 1580000,
  emdAmount: '₹৩১,৬০০',
  tenderFee: '₹১,০০০',
  publishDate: '২০২৬-১১-১৯',
  closingDate: '২০২৬-১২-১০',
  bidOpeningDate: '২০২৬-১২-১২',
  status: 'active',
  portalLink: 'https://wbtenders.gov.in/',
  tenderRef: 'WBMAD/BM/NIT-21/WTR/2026',
  eligibility: 'পৌরসভা, পিএইচই (PHE) বা কেএমডিএ এলাকায় পানীয় জল পাইপলাইন বসানো ও ডিস্ট্রিবিউশন নেটওয়ার্ক রক্ষণাবেক্ষণে ৩ বছরের অভিজ্ঞতাসম্পন্ন ঠিকাদারি সংস্থা।',
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
  id: "prop-brp-032",
  title: "বারুইপুর কাছারি মোড় ও মহকুমা আদালত সংলগ্ন ১,২২০ বর্গফুট ৩ বিএইচকে সাউথ-ফেসিং প্রিমিয়াম রেডি ফ্ল্যাট",
  titleEn: "1,220 SqFt 3 BHK South-Facing Premium Ready Apartment near Baruipur Kachari More & Sub-Divisional Court",
  category: "new_flat",
  categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
  location: "কাছারি মোড় সংলগ্ন, বারুইপুর পুর এলাকা",
  locationArea: "Kachari More / Court Area",
  price: "₹৩৬.৫০ লক্ষ (সহজ ব্যাংক ঋণ উপলব্ধ)",
  priceNum: 3650000,
  priceUnit: "total",
  configuration: "3 BHK (১,২২০ বর্গফুট সুপার বিল্ট-আপ) + ২টি ব্যালকনি + ২টি ওয়েস্টার্ন বাথরুম",
  areaSqFt: "১,২২০ বর্গফুট",
  facing: "দক্ষিণ-পূর্ব মুখী (খোলামেলা ও আলো-বাতাসময়)",
  floorInfo: "৩য় তলা (G+4 লিফট সহ রেডি অ্যাপার্টমেন্ট)",
  possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
  reraStatus: "WB RERA ও পৌর কমপ্লিশন সার্টিফিকেট (CC) প্রাপ্ত",
  approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত বৈধ আবাসিক বিল্ডিং প্ল্যান",
  bankLoanApproved: "SBI, HDFC ও PNB থেকে ৮০%-৮৫% গৃহঋণ সুবিধা",
  amenities: [
    "অটোমেটিক ৬-যাত্রী লিফট ও ২৪ ঘণ্টা নিরবচ্ছিন্ন সাইলেন্ট জেনারেটর ব্যাকআপ",
    "গ্রাউন্ড ফ্লোরে রিজার্ভড কভার্ড কার পার্কিং ও সিসিটিভি নজরদারি",
    "রুফটপ ছাদবাগান, যোগা ডেক ও কমিউনিটি স্পেস",
    "বারুইপুর কাছারি মোড়, আদালত ও রেলওয়ে স্টেশনের হাঁটা পথ"
  ],
  description: "বারুইপুরের প্রাণকেন্দ্র কাছারি মোড় ও আদালতের অতি নিকটে অবস্থিত সম্পূর্ণ রেডি ৩ বিএইচকে বিলাসবহুল ফ্ল্যাট। ভিট্রিফাইড টাইলস ফ্লোরিং, গ্রানাইট স্ল্যাব কিচেন এবং পর্যাপ্ত আলো-বাতাস সমৃদ্ধ। সমস্ত স্কুল, হাসপাতাল ও বাজার কয়েক মিনিটের দূরত্বে।",
  imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
  images: [
    "/images/baruipur-real-estate-flats-guide.jpg"
  ],
  featured: true,
  contactPerson: "অভিজিৎ মুখার্জি (সাউথ বেঙ্গল প্রপার্টিজ)",
  contactPhone: "+91 98312 77410",
  contactWhatsapp: "+91 98312 77410",
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

console.log('🎉 ১৯ নভেম্বর (সকাল) সম্পূর্ণ সিঙ্ক ও পরিমার্জন সফলভাবে সম্পন্ন!');
