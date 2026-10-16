const fs = require('fs');
const path = require('path');

const newsDataPath = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const raw = fs.readFileSync(newsDataPath, 'utf8');
const data = JSON.parse(raw);

console.log(`Initial articles count: ${data.articles.length}`);

// 1. Gather extra images before deleting duplicates
const bhattacharyaExtraImages = [];
const policeExtraImages = [];
const bankimExtraImages = [];
const transformerExtraImages = [];

const dupBhattacharya = data.articles.find(a => a.id === 'art-1792156067038-0yio');
if (dupBhattacharya && Array.isArray(dupBhattacharya.images)) {
  bhattacharyaExtraImages.push(...dupBhattacharya.images);
}

const dupPolice = data.articles.find(a => a.id === 'art-1792156059257-b2ml');
if (dupPolice && Array.isArray(dupPolice.images)) {
  policeExtraImages.push(...dupPolice.images);
}

const dupBankim = data.articles.find(a => a.id === 'art-1792156068839-e020');
if (dupBankim && Array.isArray(dupBankim.images)) {
  bankimExtraImages.push(...dupBankim.images);
}

const dupTransformer1 = data.articles.find(a => a.id === 'art-1792156068398-l8ui');
if (dupTransformer1 && Array.isArray(dupTransformer1.images)) {
  transformerExtraImages.push(...dupTransformer1.images);
}
const dupTransformer2 = data.articles.find(a => a.id === 'art-1792156059154-zrhy');
if (dupTransformer2 && Array.isArray(dupTransformer2.images)) {
  transformerExtraImages.push(...dupTransformer2.images);
}

// 2. IDs to delete (duplicates, fragments, promo spam)
const idsToDelete = new Set([
  'art-1792156072626-sb8p', // ad / photo promo
  'art-1792156070830-xggm', // club names fragment
  'art-1792156068839-e020', // merged into Bankimnagar
  'art-1792156068398-l8ui', // merged into Kachari Bazar transformer
  'art-1792156067038-0yio', // merged into Bhattacharya Para
  'art-1792156059257-b2ml', // merged into Police Line puja
  'art-1792156059154-zrhy', // merged into Kachari Bazar transformer
  'art-1792156052781-onnz', // greeting post
  'art-1792121140721-6ozw', // fragmented club list
  'art-1792121139963-l3pa', // fragmented club list
  'art-1792121139532-q51y'  // fragmented club list
]);

data.articles = data.articles.filter(a => !idsToDelete.has(a.id));
console.log(`✓ Removed ${idsToDelete.size} duplicate/fragmentary/ad items`);

// Helper to dedupe array
const uniqueArr = (arr) => Array.from(new Set(arr.filter(Boolean)));

// 3. Attach merged images to existing articles
const bhattacharyaArticle = data.articles.find(a => a.id === 'art-1792121126441-sv1h');
if (bhattacharyaArticle) {
  bhattacharyaArticle.images = uniqueArr([...(bhattacharyaArticle.images || []), ...bhattacharyaExtraImages]);
  console.log(`✓ Bhattacharya Para now has ${bhattacharyaArticle.images.length} images`);
}

const policeArticle = data.articles.find(a => a.id === 'art-1792121122596-ku4n');
if (policeArticle) {
  policeArticle.images = uniqueArr([...(policeArticle.images || []), ...policeExtraImages]);
  console.log(`✓ Police Line Puja now has ${policeArticle.images.length} images`);
}

// 4. Polish the 4 genuine new stories

// Story A: Bakultala Police recovery
const bakultala = data.articles.find(a => a.id === 'art-1792156077356-hs0r');
if (bakultala) {
  bakultala.title = 'বারুইপুর পুলিশ জেলার বকুলতলা থানার সাফল্য: ১৮টি চোরাই মোবাইল উদ্ধার, ধৃত ১';
  bakultala.slug = 'bakultala-police-recovers-18-stolen-mobiles-arrests-one-baruipur';
  bakultala.category = 'crime';
  bakultala.summary = 'বারুইপুর পুলিশ জেলার বকুলতলা থানার পুলিশের বিশেষ অভিযানে পশ্চিম বাইশহাটা থেকে ১৮টি চুরি যাওয়া স্মার্টফোন উদ্ধার করা হয়েছে। ঘটনায় গ্রেপ্তার করা হয়েছে এক যুবককে।';
  bakultala.content = `বারুইপুর পুলিশ জেলার বকুলতলা থানার পুলিশ এক বিশেষ গোপন সূত্রে অভিযান চালিয়ে চুরি যাওয়া ১৮টি বহুমূল্য স্মার্টফোন উদ্ধার করতে সক্ষম হয়েছে। উৎসবের মরশুমে যখন জেলাজুড়ে নিরাপত্তা কড়াকড়ি চলছে, সেই সময় পুলিশের এই সক্রিয়তা সাধারণ মানুষের মধ্যে স্বস্তি ফিরিয়ে দিয়েছে।

পুলিশ সূত্রে খবর, বিশ্বস্ত মারফত খবর মেলে যে পশ্চিম বাইশহাটা এলাকার একটি নির্দিষ্ট দোকানে চোরাই মোবাইল কেনাবেচার কারবার চলছে। খবর পাওয়ামাত্রই বকুলতলা থানার একটি বিশেষ টিম ওই দোকানে আচমকা হানা দেয়। তল্লাশি চালিয়ে সেখান থেকে ১৮টি সন্দেহজনক স্মার্টফোন উদ্ধার করা হয়। 

দোকানে উপস্থিত একরামুল মিস্ত্রী ওরফে সামিম (২২) নামের এক যুবককে আটক করে জিজ্ঞাসাবাদ করা হলে সে উদ্ধার হওয়া ফোনগুলির কোনো বৈধ রসিদ বা মালিকানার কাগজপত্র দেখাতে ব্যর্থ হয়। সন্তোষজনক উত্তর না মেলায় তাকে তাৎক্ষণিকভাবে গ্রেপ্তার করা হয়।

বারুইপুর পুলিশ জেলার এক শীর্ষ আধিকারিক জানান, উৎসবের ভিড়ে মোবাইল চুরির চক্র আটকাতে মহকুমা জুড়ে নজরদারি বাড়ানো হয়েছে। ধৃতের বিরুদ্ধে ভারতীয় ন্যায় সংহিতা (BNS)-র নির্দিষ্ট ধারায় স্বতঃপ্রণোদিত মামলা রুজু করা হয়েছে। এই চোরাই ফোনগুলির প্রকৃত মালিকদের শনাক্ত করে তাঁদের হাতে ফোন ফিরিয়ে দেওয়ার আইনি প্রক্রিয়া শুরু করেছে পুলিশ। পাশাপাশি এই চক্রের সঙ্গে আর কারা জড়িত রয়েছে, তা জানতে ধৃতকে হেফাজতে নিয়ে বিস্তারিত জেরা চলছে।`;
  console.log('✓ Polished Bakultala Police recovery article');
}

// Story B: Rishi Bankimnagar Durga Puja
const bankim = data.articles.find(a => a.id === 'art-1792156075395-hntg');
if (bankim) {
  bankim.title = "বারুইপুর ঋষি বঙ্কিমনগর আদি সার্বজনীন দুর্গোৎসবের ৪৫তম বর্ষ: ভাবনা 'আহ্বান', নজর কাড়ছে দৃষ্টিনন্দন মণ্ডপ";
  bankim.slug = 'rishi-bankimnagar-durga-puja-45th-year-aahwan-theme-baruipur';
  bankim.category = 'culture';
  bankim.images = uniqueArr([...(bankim.images || []), ...bankimExtraImages]);
  bankim.summary = "বারুইপুরের ঐতিহ্যবাহী ঋষি বঙ্কিমনগর আদি সার্বজনীন দুর্গোৎসবে এবছর ৪৫তম বর্ষে বিশেষ আকর্ষণ তাদের থিম 'আহ্বান'। প্রাকৃতিক উপাদান ও গ্রামীণ আবহের শৈল্পিক সংমিশ্রণে মণ্ডপটি দর্শনার্থীদের নজর কাড়ছে।";
  bankim.content = `বারুইপুর পৌরসভার অন্যতম সুপরিচিত ও ঐতিহ্যবাহী শারদোৎসব ঋষি বঙ্কিমনগর আদি সার্বজনীন দুর্গোৎসব কমিটি এবার ৪৫তম বর্ষে পদার্পণ করল। প্রতি বছরের মতো এবারও তাদের মণ্ডপসজ্জা ও প্রতিমায় ফুটে উঠেছে বিশেষ শৈল্পিক ভাবনা, যার পোশাকি নাম 'আহ্বান'।

পঞ্চমীর শুভ সন্ধ্যায় প্রদীপ প্রজ্জ্বলন ও মঙ্গল শঙ্খধ্বনির মাধ্যমে এই উৎসবের আনুষ্ঠানিক উদ্বোধন সম্পন্ন হয়। পুজো উদ্যোক্তারা জানান, 'আহ্বান' ভাবনার মধ্য দিয়ে আধুনিকতার যান্ত্রিক জীবন ছেড়ে প্রকৃতির সান্নিধ্যে ফিরে আসা এবং পারস্পরিক সম্প্রীতি ও ভ্রাতৃত্ববোধ গড়ে তোলার বার্তা দেওয়া হয়েছে। 

মণ্ডপটি তৈরিতে ব্যবহার করা হয়েছে নানা ধরনের প্রাকৃতিক ও পরিবেশবান্ধব উপকরণ। বাঁশ, বেত, কাঠের নিখুঁত নকশা এবং নরম আলোকসজ্জায় এক স্বর্গীয় আবহ সৃষ্টি করা হয়েছে। প্রতিমাতেও রয়েছে সনাতনী মাতৃরূপ ও শিল্পকলার অপূর্ব সমন্বয়।

মণ্ডপের উদ্বোধনের পর থেকেই স্থানীয় বাসিন্দাদের পাশাপাশি দূর-দূরান্তের দর্শনার্থীরা ভিড় জমাচ্ছেন। কমিটির পক্ষ থেকে জানানো হয়েছে, দর্শনার্থীদের সুবিধার জন্য বিশেষ স্বেচ্ছাসেবক দল, সিসিটিভি নজরদারি এবং পানীয় জলের সুব্যবস্থা রাখা হয়েছে। উৎসবের দিনগুলিতে সাংস্কৃতিক অনুষ্ঠান ও প্রসাদ বিতরণেরও আয়োজন করা হয়েছে।`;
  console.log('✓ Polished Rishi Bankimnagar Durga Puja article');
}

// Story C: Sharad Samman Awards
const awards = data.articles.find(a => a.id === 'art-1792156068235-yta6');
if (awards) {
  awards.title = 'বারুইপুর মিডিয়া গ্রুপ ও শিব শংকর বস্ত্রালয় শারদ সম্মান ২০২৬: সেরা পাড়ার মণ্ডপ ঋষি বঙ্কিমনগর ও দৌলতাবাদ নিউ মিতালী সংঘ';
  awards.slug = 'baruipur-media-group-sharad-samman-2026-winners-announced';
  awards.category = 'culture';
  awards.summary = 'শারদোৎসব ২০২৬ উপলক্ষে বারুইপুর মিডিয়া গ্রুপ ও শিব শংকর বস্ত্রালয়ের যৌথ উদ্যোগে ঘোষিত হলো শারদ সম্মান। সেরা পাড়ার মণ্ডপের খেতাব ছিনিয়ে নিল ঋষি বঙ্কিমনগর আদি সার্বজনীন ও দৌলতাবাদ নিউ মিতালী সংঘ।';
  awards.content = `বাঙালির শ্রেষ্ঠ উৎসব দুর্গাপূজার আবহে বারুইপুর ও পার্শ্ববর্তী অঞ্চলের সেরা পুজো কমিটিগুলিকে উৎসাহিত করতে আয়োজিত হলো 'শিব শংকর বস্ত্রালয় শারদ আগমনী সম্মান ২০২৬'। বারুইপুর মিডিয়া গ্রুপের যৌথ উদ্যোগে প্রতি বছরের মতো এবারও স্থানীয় ক্লাব ও সার্বজনীন পুজো মণ্ডপগুলির শিল্পকর্মকে স্বীকৃতি দেওয়া হয়েছে।

বিশেষ বিচারকমণ্ডলীর মূল্যায়নের ভিত্তিতে ২০২৬ সালের 'পাড়ার সেরা মণ্ডপ' বিভাগে প্রথম স্থান অধিকার করেছে বারুইপুর ঋষি বঙ্কিমনগর আদি সার্বজনীন দুর্গোৎসব পূজা কমিটি। তাদের থিম 'আহ্বান' এবং পরিবেশবান্ধব শৈল্পিক মণ্ডপসজ্জা বিচারকদের ভূয়সী প্রশংসা লাভ করেছে।

অন্যদিকে, দক্ষিণ ২৪ পরগনা জেলার বিস্তীর্ণ অঞ্চলের সেরা উদ্যোগ হিসেবে 'পাড়ার সেরা মণ্ডপের জেলা সেরা সম্মান' অর্জন করেছে দৌলতাবাদ নিউ মিতালী সংঘ। পাশাপাশি গড়িয়া মিতালী সংঘের নবদুর্গা আরাধনাও বিশেষ জুরি অ্যাওয়ার্ড লাভ করেছে।

আয়োজকদের পক্ষ থেকে জানানো হয়, বড় বাজেটের মেগা পুজোর ভিড়ে মফস্বল ও পাড়া-মহল্লার যেসব পুজো কমিটি অসাধারণ শিল্পবোধ, পরিচ্ছন্নতা এবং সামাজিক দায়বদ্ধতার পরিচয় দেয়, তাদের তুলে ধরাই এই শারদ সম্মানের মূল উদ্দেশ্য। সম্মান পেয়ে প্রতিটি পুজো কমিটির কর্মকর্তা ও স্থানীয়দের মধ্যে ব্যাপক উৎসাহ-উদ্দীপনা লক্ষ্য করা গেছে।`;
  console.log('✓ Polished Sharad Samman Awards article');
}

// Story D: Kachari Bazar Transformer Fire
const transformer = data.articles.find(a => a.id === 'art-1792156068977-zkg5');
if (transformer) {
  transformer.title = 'বারুইপুর কাছারি বাজারে ট্রান্সফরমারে বিস্ফোরণ ও তীব্র আতঙ্ক: পুজো মরশুমে বিদ্যুৎ বিপর্যয় রোধে সক্রিয় দমকল ও প্রশাসন';
  transformer.slug = 'baruipur-kachari-bazar-transformer-blast-fire-incident';
  transformer.category = 'local';
  transformer.images = uniqueArr([...(transformer.images || []), ...transformerExtraImages]);
  transformer.summary = 'বারুইপুর কাছারি বাজার সংলগ্ন মসজিদ ও ব্যবসায়ী সমিতির ভবনের সামনে বৈদ্যুতিক ট্রান্সফরমারে আচমকা বিস্ফোরণ ঘটে আগুন ধরে যায়। পুজোর কেনাকাটায় ব্যস্ত বাজারে তীব্র আতঙ্ক ছড়ায়, দ্রুত পরিস্থিতি নিয়ন্ত্রণে আনে দমকল।';
  transformer.content = `শারদোৎসবের মুখে চরম ব্যস্ততার মধ্যেই বারুইপুর কাছারি বাজারে বৈদ্যুতিক ট্রান্সফরমারে আচমকা বিস্ফোরণ ও ভয়াবহ অগ্নিকাণ্ডের ঘটনায় ব্যাপক চাঞ্চল্য ও আতঙ্ক ছড়াল। কাচারি বাজার ব্যবসায়ী সমিতির ভবন ও স্থানীয় মসজিদ সংলগ্ন এলাকার প্রধান ট্রান্সফর্মারটিতে এই দুর্ঘটনা ঘটে।

প্রত্যক্ষদর্শীরা জানান, বিকেলে যখন বাজারে পুজো উপলক্ষে প্রচুর ক্রেতা ও ব্যবসায়ীদের ভিড় ছিল, তখনই প্রচণ্ড শব্দে ট্রান্সফর্মারটি ফেটে যায় এবং সঙ্গে সঙ্গে দাউদাউ করে আগুন জ্বলতে শুরু করে। আগুনের লেলিহান শিখা ও কালো ধোঁয়ায় চারপাশ ঢেকে যায়। আতঙ্কিত হয়ে পথচারী ও ক্রেতারা দিগ্বিদিক ছুটোছুটি শুরু করেন।

ব্যবসায়ী সমিতির সদস্য ও স্থানীয় দোকানদাররা তাৎক্ষণিকভাবে অগ্নিনির্বাপক যন্ত্র ও বালি-জল নিয়ে আগুন নেভানোর প্রাথমিক চেষ্টা চালান এবং বিদ্যুৎ দফতরে খবর দিয়ে সংযোগ বিচ্ছিন্ন করান। খবর পেয়ে দ্রুত ঘটনাস্থলে পৌঁছায় দমকলের ইঞ্জিন এবং বারুইপুর থানার পুলিশ। দমকল কর্মীদের তৎপরতায় কিছুক্ষণের মধ্যেই আগুন সম্পূর্ণ নিয়ন্ত্রণে আসে, ফলে সংলগ্ন দোকানপাট বড়সড় ক্ষয়ক্ষতির হাত থেকে রক্ষা পায়।

ব্যবসায়ীরা জানান, পুজোর মুখে অতিরিক্ত বিদ্যুৎ লোডের কারণেই হয়তো এই বিভ্রাট ঘটেছে। উৎসবের দিনগুলিতে যাতে নিরবচ্ছিন্ন ও নিরাপদ বিদ্যুৎ সরবরাহ বজায় থাকে, সেজন্য দ্রুত ক্ষতিগ্রস্ত ট্রান্সফর্মারটি মেরামত বা প্রতিস্থাপন করার জন্য বিদ্যুৎ পর্ষদের আধিকারিকরা কাজ শুরু করেছেন।`;
  console.log('✓ Polished Kachari Bazar Transformer article');
}

fs.writeFileSync(newsDataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nFinal articles count: ${data.articles.length}`);
console.log('🎉 Successfully polished evening news data!');
