const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Remove duplicate and fragmentary posts
const toRemove = [
  'art-1792036755336-e5s9', // memento fragment
  'art-1792036755246-xfjn', // duplicate kachari bazar fire video snippet
  'art-1792036754603-l4yd', // duplicate rishi bankim nagar snippet
  'art-1792036752730-m5aw', // duplicate press club snippet
  'art-1792036752658-b6ds'  // duplicate live fire snippet
];

const initialCount = newsData.articles.length;
newsData.articles = newsData.articles.filter(a => !toRemove.includes(a.id));
console.log(`✓ Removed ${initialCount - newsData.articles.length} duplicate/fragmentary items`);

// 2. Polish Article 1: Festive Railway Rush on Sealdah South Local
const aTrain = newsData.articles.find(a => a.id === 'art-1792036756030-ql5z');
if (aTrain) {
  aTrain.title = 'পুজোর মুখে শিয়ালদহ দক্ষিণ শাখায় উপচে পড়া ভিড়: চতুর্থীতে বারুইপুর জংশনে চরম যাত্রী চাপ';
  aTrain.slug = 'শিয়ালদহ-দক্ষিণ-শাখায়-লোকাল-ট্রেনে-পুজোর-ভিড়-বারুইপুর-জংশন';
  aTrain.category = 'railway';
  aTrain.categoryNameBn = 'রেলওয়ে ও যাতায়াত';
  aTrain.authorId = 'subhranil-naskar';
  aTrain.authorName = 'শুভ্রনীল নস্কর';
  aTrain.authorRole = 'প্রধান সম্পাদক ও পরিবহন প্রতিবেদক';
  aTrain.reportingLocation = 'বারুইপুর জংশন স্টেশন চত্বর';
  aTrain.summary = 'শারদোৎসবের চতুর্থীর সন্ধ্যাতেই শিয়ালদহ-লক্ষ্মীকান্তপুর ও নামখানা রুটের লোকাল ট্রেনগুলিতে উৎসবমুখর মানুষের তিল ধারণের জায়গা নেই। বারুইপুর জংশন স্টেশনে বাড়তি ভিড় সামলাতে কড়া নজরদারি চালাচ্ছে আরপিএফ ও জিআরপি।';
  aTrain.content = `শারদীয় দুর্গোৎসবের শুভ সূচনা হতেই শিয়ালদহ দক্ষিণ রেলওয়ে শাখায় উৎসবমুখর মানুষের ভিড় আছড়ে পড়ল। চতুর্থীর সন্ধ্যা থেকে শিয়ালদহগামী এবং বারুইপুর-লক্ষ্মীকান্তপুর রুটের লোকাল ট্রেনগুলিতে (যেমন ৩৪৭৫২ আপ ও ডাউন ট্রেন) উপচে পড়া যাত্রী লক্ষ্য করা গেছে।

মহকুমার অন্যতম ব্যস্ততম রেল জংশন বারুইপুরে চতুর্থীর বিকেল থেকেই কেনাকাটা ও ঠাকুর দেখতে বের হওয়া মানুষের ভিড় বাড়তে শুরু করে। প্ল্যাটফর্ম থেকে ফুটব্রিজ সর্বত্রই সাধারণ মানুষের দীর্ঘ লাইন চোখে পড়ে। নিত্যযাত্রীদের সাথে সাথে উৎসবমুখী পারিবারিক যাত্রীদের সংখ্যা উল্লেখযোগ্যভাবে বৃদ্ধি পেয়েছে।

যাত্রী ভিড় ও উৎসবের দিনগুলিতে নিরাপত্তা নিশ্চিত করতে পূর্ব রেলওয়ে এবং বারুইপুর জিআরপির পক্ষ থেকে বিশেষ পদক্ষেপ গ্রহণ করা হয়েছে। প্ল্যাটফর্মগুলিতে আরপিএফের অতিরিক্ত জওয়ান মোতায়েন করা হয়েছে। সিসিটিভি ক্যামেরার মাধ্যমে সার্বক্ষণিক নজরদারির পাশাপাশি মহিলা যাত্রীদের সুরক্ষায় সাদা পোশাকের মহিলা পুলিশ কর্মী মোতায়েন রাখা হয়েছে।

রেল সূত্রের খবর, পুজো পরিক্রমার দিনগুলিতে মধ্যরাত পর্যন্ত বিশেষ লোকাল ট্রেন পরিষেবা চালু থাকবে, যাতে দূরদূরান্ত থেকে আগত দর্শনার্থীরা নির্বিঘ্নে ঘরে ফিরতে পারেন।`;
  console.log('✓ Polished Train crowd news (art-1792036756030-ql5z)');
}

// 3. Polish Article 2: Ward 3 Homeless Home Charity ahead of Puja
const aCharity = newsData.articles.find(a => a.id === 'art-1792036753767-1sbh');
if (aCharity) {
  aCharity.title = 'শারদীয়ার আনন্দ ভাগ করে নিতে বারুইপুর ৩ নম্বর ওয়ার্ডের হোমলেস হোমে বস্ত্র বিতরণ উদ্যোগ';
  aCharity.slug = 'বারুইপুর-৩-নম্বর-ওয়ার্ড-হোমলেস-হোমে-বস্ত্র-বিতরণ';
  aCharity.category = 'culture';
  aCharity.categoryNameBn = 'উৎসব ও সমাজকল্যাণ';
  aCharity.authorId = 'mousumi-sengupta';
  aCharity.authorName = 'মৌসুমী সেনগুপ্ত';
  aCharity.authorRole = 'সংস্কৃতি, ঐতিহ্য ও সমাজকল্যাণ প্রতিনিধি';
  aCharity.reportingLocation = 'বারুইপুর ৩ নম্বর ওয়ার্ড';
  aCharity.summary = 'পুজোর আনন্দ সবার মাঝে ছড়িয়ে দিতে বারুইপুর পৌরসভার ৩ নম্বর ওয়ার্ড এলাকার হোমলেস হোমের প্রবীণ ও দুঃস্থ আবাসিকদের হাতে নতুন বস্ত্র ও মিষ্টি তুলে দেওয়া হলো। স্থানীয় নেতৃত্ব ও সমাজসেবীদের মানবিক উদ্যোগ।';
  aCharity.content = `উৎসব মানেই সকলের সাথে আনন্দ ভাগ করে নেওয়া। সেই মানবিক মূল্যবোধকে সামনে রেখে শারদীয়ার প্রাক্কালে এক অনন্য সামাজিক উদ্যোগ গৃহীত হলো বারুইপুরে। বারুইপুর পৌরসভার ৩ নম্বর ওয়ার্ড এলাকায় অবস্থিত 'হোমলেস হোম'-এর আবাসিক প্রবীণ ও দুঃস্থ মানুষের হাতে নতুন পোশাক ও শারদীয়ার উপহার তুলে দেওয়া হয়।

স্থানীয় যুব ও সমাজসেবী কর্মীদের উদ্যোগে আয়োজিত এই বস্ত্র বিতরণ অনুষ্ঠানে উপস্থিত ছিলেন স্থানীয় নেতৃবৃন্দ ও বিশিষ্ট নাগরিকগণ। প্রতিটি আবাসিকের মুখে উৎসবের আলো পৌঁছে দিতে ধুতি, শাড়ি, নতুন জামাকাপড় এবং মিষ্টি বিতরণ করা হয়।

উদ্যোক্তারা জানান, "পুজোর দিনগুলিতে অনেকেই পরিবার-পরিজনহীন অবস্থায় একাকিত্বে দিন কাটান। তাঁদের মুখে একটু হাসি ফোটানোই আমাদের এই ক্ষুদ্র প্রয়াসের মূল লক্ষ্য। উৎসব যেন কোনো ভেদাভেদ না রেখে প্রতিটি মানুষের জীবনে সুখ ও শান্তি বয়ে নিয়ে আসে।"

নতুন পোশাক হাতে পেয়ে হোমলেস হোমের আবাসিক প্রবীণদের চোখেমুখে খুশির ঝিলিক দেখা যায়। স্থানীয় সচেতন নাগরিক সমাজ এই ধরনের উদ্যোগকে সাধুবাদ জানিয়েছেন।`;
  console.log('✓ Polished Homeless Home Charity news (art-1792036753767-1sbh)');
}

fs.writeFileSync(dataPath, JSON.stringify(newsData, null, 2), 'utf8');
console.log('🎉 Done updating news_data.json!');
