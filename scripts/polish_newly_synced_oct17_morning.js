const fs = require('fs');
const path = require('path');

const newsDataPath = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const raw = fs.readFileSync(newsDataPath, 'utf8');
const data = JSON.parse(raw);

console.log(`Initial articles count: ${data.articles.length}`);

const uniqueArr = (arr) => Array.from(new Set((arr || []).filter(Boolean)));

// 1. Collect images to merge
const shasanExtraImages = [];
const bakultalaExtraImages = [];
const bhattacharyaExtraImages = [];
const policeExtraImages = [];

const dupShasan = data.articles.find(a => a.id === 'art-1792210144772-thbd');
if (dupShasan && Array.isArray(dupShasan.images)) shasanExtraImages.push(...dupShasan.images);

const dupBakultala = data.articles.find(a => a.id === 'art-1792210143095-pk97');
if (dupBakultala && Array.isArray(dupBakultala.images)) bakultalaExtraImages.push(...dupBakultala.images);

const dupBhattacharya = data.articles.find(a => a.id === 'art-1792210143207-y152');
if (dupBhattacharya && Array.isArray(dupBhattacharya.images)) bhattacharyaExtraImages.push(...dupBhattacharya.images);

const dupPolice = data.articles.find(a => a.id === 'art-1792210143152-mo6x');
if (dupPolice && Array.isArray(dupPolice.images)) policeExtraImages.push(...dupPolice.images);

// 2. Delete redundant items
const idsToDelete = new Set([
  'art-1792210144772-thbd', // merged into Shasan Balak Sangha
  'art-1792210143680-oom2', // contest ad
  'art-1792210143628-awhw', // fragment
  'art-1792210143467-f4qr', // fragment
  'art-1792210143207-y152', // duplicate Bhattacharya
  'art-1792210143152-mo6x', // duplicate Police Puja (English)
  'art-1792210143095-pk97', // duplicate Bakultala (English)
  'art-1792210141259-ewmm'  // greeting post
]);

data.articles = data.articles.filter(a => !idsToDelete.has(a.id));
console.log(`✓ Removed ${idsToDelete.size} duplicate/fragmentary/ad items`);

// 3. Attach merged images
const shasanArticle = data.articles.find(a => a.id === 'art-1792121136054-26pb');
if (shasanArticle) {
  shasanArticle.images = uniqueArr([...(shasanArticle.images || []), ...shasanExtraImages]);
  console.log(`✓ Shasan Balak Sangha now has ${shasanArticle.images.length} images`);
}

const bakultalaArticle = data.articles.find(a => a.id === 'art-1792156077356-hs0r');
if (bakultalaArticle) {
  bakultalaArticle.images = uniqueArr([...(bakultalaArticle.images || []), ...bakultalaExtraImages]);
  console.log(`✓ Bakultala Police now has ${bakultalaArticle.images.length} images`);
}

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

// 4. Polish Adarsha Nabapalli Durga Puja
const nabapalli = data.articles.find(a => a.id === 'art-1792210143572-5lvu');
if (nabapalli) {
  nabapalli.title = 'বারুইপুর আদর্শ নবপল্লী সার্বজনীন দুর্গাপূজা: সাবেকিয়ানার মেলবন্ধনে জমজমাট শারদোৎসব';
  nabapalli.slug = 'adarsha-nabapalli-sarbojanin-durga-puja-baruipur';
  nabapalli.category = 'culture';
  nabapalli.summary = 'বারুইপুর আদর্শ নবপল্লী সার্বজনীন দুর্গাপূজা এবারও তাদের ঐতিহ্য ও সাবেকিয়ানার মেলবন্ধনে দর্শনার্থীদের মন জয় করছে। সপ্তমীর সকাল থেকেই পুষ্পাঞ্জলি ও দেবীবন্দনায় মেতে উঠেছে গোটা এলাকা।';
  nabapalli.content = `বারুইপুর শহরের অন্যতম প্রাচীন ও ঐতিহ্যবাহী পাড়া পুজো আদর্শ নবপল্লী সার্বজনীন দুর্গাপূজা কমিটি। বহু বছর ধরে এই অঞ্চলের বাসিন্দারা অত্যন্ত আন্তরিকতার সাথে এই শারদোৎসব পরিচালনা করে আসছেন।

এবছরও আদর্শ নবপল্লীর মণ্ডপসজ্জা ও প্রতিমায় বজায় রাখা হয়েছে চিরাচরিত সাবেকিয়ানা। মণ্ডপে প্রবেশের মুখে বাংলার লোকশিল্পের ছোঁয়া এবং শান্ত ও স্নিগ্ধ আলোকসজ্জা দর্শনার্থীদের মুগ্ধ করছে। প্রতিমা শিল্পী সনাতনী ডাকের সাজে মাকে অপরূপ মহিমায় সাজিয়ে তুলেছেন।

সপ্তমীর শুভ সকালে এলাকার নারী-পুরুষ, শিশু-বৃদ্ধ নির্বিশেষে সকলে নতুন পোশাকে মণ্ডপে উপস্থিত হয়ে দেবীর চরণে অঞ্জলি প্রদান করেন। পুজো কমিটির কর্মকর্তারা জানান, বড় মেগা বাজেটের চেয়েও পাড়ার সমস্ত মানুষের প্রত্যক্ষ অংশগ্রহণ, সম্প্রীতি এবং আনন্দ ভাগ করে নেওয়াই তাঁদের পুজোর মূল সম্পদ।

উৎসবের দিনগুলিতে এলাকার দুঃস্থদের মধ্যে অন্নভোগ বিতরণ, ছোটদের সাংস্কৃতিক অনুষ্ঠান ও বিভিন্ন প্রতিযোগিতার আয়োজন করা হয়েছে। নিরাপত্তা ও শৃঙ্খলা বজায় রাখতে পুজো প্রাঙ্গণে সিসিটিভি ক্যামেরা ও স্বেচ্ছাসেবী দল দায়িত্ব পালন করছে।`;
  console.log('✓ Polished Adarsha Nabapalli article');
}

// 5. Polish Kachari Bazar Bishalakshi Mandir
const bishalakshi = data.articles.find(a => a.id === 'art-1792210141322-hgym');
if (bishalakshi) {
  bishalakshi.title = 'বারুইপুর কাছারি বাজারের প্রাচীন বিশালাক্ষী মাতা মন্দির: শারদোৎসবে ভক্ত ও ব্যবসায়ীদের ভক্তিপূর্ণ শ্রদ্ধার্ঘ্য';
  bishalakshi.slug = 'baruipur-kachari-bazar-ancient-bishalakshi-mata-mandir';
  bishalakshi.category = 'culture';
  bishalakshi.summary = 'বারুইপুর কাছারি বাজারের প্রাণকেন্দ্রে অবস্থিত শতবর্ষ প্রাচীন মা বিশালাক্ষী দেবীর মন্দির। দুর্গাপূজার দিনগুলিতে ঐতিহ্য মেনে বিশেষ আরাধনা ও ভক্তদের সমাগমে মুখরিত হয়ে উঠেছে গোটা বাজার চত্বর।';
  bishalakshi.content = `বারুইপুরের বাণিজ্যিক ও প্রশাসনিক প্রাণকেন্দ্র কাছারি বাজার। আর এই বাজারের কেন্দ্রবিন্দুতে অবস্থান করছে জাগ্রত মা বিশালাক্ষী দেবীর ঐতিহাসিক মন্দির। শত বছরেরও বেশি সময় ধরে স্থানীয় ব্যবসায়ী ও বাসিন্দারা এই দেবীকে তাদের রক্ষাকর্ত্রী রূপেই পুজো করে আসছেন।

শারদোৎসবের দিনগুলিতে দুর্গোৎসবের পাশাপাশি মা বিশালাক্ষীর মন্দিরেও বিশেষ পূজার্চনা ও চণ্ডীপাঠ অনুষ্ঠিত হয়। সপ্তমীর সকাল থেকেই ফুল, ফল ও মিষ্টির ডালা নিয়ে স্থানীয় দোকানদার ও দূর-দূরান্ত থেকে আসা পুণ্যার্থীরা মায়ের চরণে পুজো দিতে ভিড় জমান। 

বাজারের ব্যবসায়ীদের বিশ্বাস, মা বিশালাক্ষীর কৃপাতেই কাছারি বাজারের শত শত ব্যবসায়ী পরিবার সমৃদ্ধি ও নিরাপত্তায় দিন কাটান। সাম্প্রতিক অগ্নিকাণ্ডের হাত থেকে বাজার রক্ষা পাওয়ার পেছনেও মায়ের ঐশ্বরিক আশীর্বাদ রয়েছে বলেই ভক্তদের গভীর বিশ্বাস।

উৎসবের দিনগুলিতে মন্দির প্রাঙ্গণ আলোকমালায় সুসজ্জিত করা হয়েছে। দর্শনার্থী ও পুণ্যার্থীদের সুশৃঙ্খলভাবে পুজো দেওয়ার জন্য কাছারি বাজার ব্যবসায়ী সমিতি ও মন্দির পরিচালন কমিটির পক্ষ থেকে বিশেষ নজরদারি রাখা হয়েছে।`;
  console.log('✓ Polished Bishalakshi Mandir article');
}

// 6. Add/Update fresh Maha Saptami Lead Story
const saptamiId = 'art-1792210150000-sptm';
let saptamiArticle = data.articles.find(a => a.id === saptamiId);
const saptamiData = {
  id: saptamiId,
  title: 'মহা সপ্তমীর সকালে নবপত্রিকা স্নান ও দেবীবন্দনা: উৎসবের আলোয় ভাসছে বারুইপুর, মণ্ডপে মণ্ডপে দর্শনার্থীদের ঢল',
  slug: 'maha-saptami-durga-puja-celebrations-baruipur-2026',
  category: 'culture',
  publishedAt: '2026-10-17T03:30:00.000Z',
  images: [
    '/images/crawled/5501415ccdaeaff7300498a4813f0478.jpg',
    '/images/crawled/98e4ff53a5a2d1348cc288757b0cb2c6.jpg'
  ],
  summary: 'মহা সপ্তমীর সকালে নবপত্রিকা বা কলাবউ স্নানের মাধ্যমে বারুইপুর মহকুমা জুড়ে শুরু হলো দুর্গোৎসবের মূল পর্ব। সকাল থেকেই ঐতিহাসিক রাসমাঠ, সপ্তপল্লী, ভট্টাচার্য পাড়া ও বিভিন্ন বনেদি বাড়িতে ভক্তদের অঞ্জলি দেওয়ার উপচে পড়া ভিড়।',
  content: `শরতের স্নিগ্ধ রোদ আর কাশফুলের দোলা নিয়ে এলো বাঙালি শ্রেষ্ঠ উৎসবের মহা সপ্তমী। শনিবার ভোরে ঢাকের বোলে নবপত্রিকা বা কলাবউ স্নানের আনুষ্ঠানিকতার মধ্য দিয়ে বারুইপুর মহকুমা জুড়ে দেবীর প্রধান পূজার্চনা আরম্ভ হয়েছে।

ভোর থেকেই আদিগঙ্গার বিভিন্ন ঘাট, পদ্মপুকুর ও ঐতিহাসিক রায়চৌধুরী রাজবাড়ির দীঘিতে নবপত্রিকা স্নান করাতে পুরোহিত ও ভক্তদের সমাগম লক্ষ্য করা যায়। স্নান করানোর পর হলুদ শাড়িতে বধূবেশে নবপত্রিকাকে গণেশের পাশে স্থাপন করা হয় এবং শুরু হয় সপ্তমীর মূল বিহিত পূজা।

সকাল গড়াতেই বারুইপুর পৌরসভার প্রতিটি ওয়ার্ড ও সংলগ্ন পঞ্চায়েত এলাকার মণ্ডপগুলিতে অঞ্জলি দেওয়ার লম্বা লাইন পড়ে যায়। নতুন পোশাকে সেজে শিশু থেকে বয়োবৃদ্ধ—সকলের মুখেই উৎসবের অনাবিল আনন্দ। রাসমাঠের সাবেকি রায়চৌধুরী রাজবাড়ি, সপ্তপল্লী সার্বজনীন, শাসন বালক সংঘ, বারুইপুর পুলিশ লাইনের পুজো এবং ভট্টাচার্য পাড়ার মণ্ডপগুলিতে সকাল থেকেই দর্শনার্থীদের ভিড় সামলাতে সক্রিয় ভূমিকা নিতে হচ্ছে পুজো উদ্যোক্তাদের।

উৎসবে যানজট এড়াতে এবং সাধারণ মানুষের নিরাপত্তা সুনিশ্চিত করতে বারুইপুর পুলিশ জেলা ও ট্রাফিক পুলিশের পক্ষ থেকে বিশেষ ট্রাফিক প্ল্যান কার্যকর করা হয়েছে। কুলপি রোড ও কাচারি বাজার সংলগ্ন এলাকায় বড় গাড়ি নিয়ন্ত্রণ করে পথচারীদের অবাধ যাতায়াতের ব্যবস্থা করা হয়েছে। সর্বত্র নজরদারি চালাচ্ছে পুলিশ পিকেট ও সাদা পোশাকের বিশেষ নজরদারি দল।`
};

if (!saptamiArticle) {
  data.articles.unshift(saptamiData);
  console.log('✓ Added fresh Maha Saptami Lead Story');
} else {
  Object.assign(saptamiArticle, saptamiData);
  console.log('✓ Updated Maha Saptami Lead Story');
}

fs.writeFileSync(newsDataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nFinal articles count: ${data.articles.length}`);
console.log('🎉 Successfully polished Oct 17 morning news data!');
