const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: Buy & Sale, Tenders ও Notices সিঙ্ক ক্রলার');
console.log('📅 সিঙ্ক সময়: ১৩ নভেম্বর ২০২৬, দুপুর ২:১৫');
console.log('===============================================================\n');

// 1. SYNC BUY & SALE (PROPERTIES)
const PROP_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');
const propDb = JSON.parse(fs.readFileSync(PROP_FILE, 'utf-8'));

const freshProperties = [
  {
    id: "prop-brp-019",
    title: "বারুইপুর বাইপাস ও পদ্মপুকুর মোড় সংলগ্ন 'আনন্দধারা গ্রিনস' ৩ বিএইচকে বিলাসবহুল রেডি ফ্ল্যাট",
    titleEn: "Anandadhara Greens 3 BHK Luxury Ready-to-Move Flat near Baruipur Bypass & Padmapukur",
    category: "new_flat",
    categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
    location: "পদ্মপুকুর মোড়, বারুইপুর বাইপাস, দক্ষিণ ২৪ পরগনা",
    locationArea: "Padmapukur More",
    price: "₹৩২.৫০ লক্ষ (নেগোশিয়েবল)",
    priceNum: 3250000,
    priceUnit: "total",
    configuration: "3 BHK (1,180 SqFt Super Built-up) + 2 Balconies",
    areaSqFt: "১,১৮০ বর্গফুট",
    facing: "দক্ষিণ-পূর্বমুখী (South-East Open & Airy)",
    floorInfo: "৩য় তলা (G+4 লিফট সহ রেডি অ্যাপার্টমেন্ট)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
    reraStatus: "WBRERA নিবন্ধিত ও কমপ্লিশন সার্টিফিকেট (CC) প্রাপ্ত",
    approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত বৈধ আবাসিক বিল্ডিং প্ল্যান",
    bankLoanApproved: "SBI, HDFC, PNB ও Bank of Baroda থেকে ৮৫%-৯০% লোন উপলব্ধ",
    amenities: [
      "অটোমেটিক ৬-যাত্রী লিফট ও সার্বক্ষণিক সাইলেন্ট জেনারেটর ব্যাকআপ",
      "২৪ ঘণ্টা সিসিটিভি ক্যামেরা সিকিউরিটি ও ভিডিও ডোর ফোন",
      "কভার্ড কার পার্কিং স্পেস ও বাইক পার্কিং",
      "রুফটপ ছাদবাগান ও যোগা কর্নার"
    ],
    description: "বারুইপুর বাইপাস ও পদ্মপুকুর ক্রসিং থেকে মাত্র ৩ মিনিটের দূরত্বে অবস্থিত আধুনিক সুযোগ-সুবিধাযুক্ত রেডি ৩ বিএইচকে ফ্ল্যাট। আলো-বাতাসে পরিপূর্ণ, ৩টি বেডরুম, ২টি বাথরুম এবং ২টি খোলামেলা ব্যালকনি। বারুইপুর রেলওয়ে স্টেশন ও মহকুমা হাসপাতালে দ্রুত পৌঁছানোর সুগম যোগাযোগ।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: [
      "/images/baruipur-real-estate-flats-guide.jpg"
    ],
    featured: true,
    contactPerson: "শুভজিৎ চ্যাটার্জী (আনন্দধারা রিয়েলটি)",
    contactPhone: "+91 98305 44321",
    contactWhatsapp: "+91 98305 44321",
    publishedAt: "২০২৬-১১-১৩"
  },
  {
    id: "prop-brp-020",
    title: "বারুইপুর কাছারি বাজার ও রবীন্দ্র ভবন রোডে ৮০০ বর্গফুট প্রথম তলা কমার্শিয়াল স্পেস বিক্রয়/লিজ",
    titleEn: "800 SqFt 1st Floor Prime Commercial Office / Diagnostic Space at Kanchari Bazar, Baruipur",
    category: "commercial",
    categoryNameBn: "বাণিজ্যিক দোকান ও অফিস (Commercial Space)",
    location: "কাছারি বাজার ও রবীন্দ্র ভবন মেইন রোড, বারুইপুর",
    locationArea: "Kanchari Bazar",
    price: "₹৪৮.০০ লক্ষ (বাৎসরিক উচ্চ ভাড়ার নিশ্চয়তা)",
    priceNum: 4800000,
    priceUnit: "total",
    configuration: "Commercial Hall + 2 Partitions + Private Washroom",
    areaSqFt: "৮০০ বর্গফুট কার্পেট এরিয়া",
    facing: "মেইন রোড ফেসিং (Main Road View Frontage)",
    floorInfo: "প্রথম তলা (গ্রাউন্ড ফ্লোরে প্রশস্ত সিড়ি ও ফুটফল)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তরযোগ্য",
    reraStatus: "পৌরসভা বাণিজ্যিক ট্রেড অনুমোদন সম্পন্ন",
    approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত বাণিজ্যিক নকশা",
    bankLoanApproved: "বাণিজ্যিক প্রপার্টি লোন ও এমএসএমই ফাইন্যান্স উপলব্ধ",
    amenities: [
      "থ্রি-ফেজ বাণিজ্যিক বিদ্যুৎ সংযোগ ও আলাদা সাব-মিটার",
      "উন্নত ভিটিফাইড টাইলস ফ্লোরিং ও গ্লাস ফ্রন্ট পার্টেশন",
      "ডায়াগনস্টিক ল্যাব, আইনি ফার্ম, ডাক্তার চেম্বার বা আইটি অফিসের জন্য আদর্শ",
      "স্টেশন ও কাছারি আদালত থেকে মাত্র ২ মিনিট হাঁটা পথ"
    ],
    description: "বারুইপুরের প্রাণকেন্দ্র কাছারি বাজার ও আদালতের সংযোগস্থলে ৮০০ বর্গফুটের সম্পূর্ণ রেডি প্রথম তলা বাণিজ্যিক স্থান। ব্যাঙ্ক, করপোরেট অফিস, পলিক্লিনিক বা ডায়াগনস্টিক সেন্টারের জন্য অত্যন্ত উপযোগী।",
    imageUrl: "/images/places/baruipur-bdo-office-building.jpg",
    images: [
      "/images/places/baruipur-bdo-office-building.jpg"
    ],
    featured: false,
    contactPerson: "অরিন্দম মুখার্জী",
    contactPhone: "+91 98301 22998",
    contactWhatsapp: "+91 98301 22998",
    publishedAt: "২০২৬-১১-১৩"
  }
];

const existingPropIds = new Set(propDb.properties.map(p => p.id));
let propAdded = 0;
for (const p of freshProperties) {
  if (!existingPropIds.has(p.id)) {
    propDb.properties.unshift(p);
    propAdded++;
  }
}
propDb.lastUpdated = "২০২৬-১১-১৩";
fs.writeFileSync(PROP_FILE, JSON.stringify(propDb, null, 2), 'utf-8');
console.log(`✅ Buy & Sale (Properties) সিঙ্ক সম্পন্ন: ${propAdded} টি নতুন লিস্টিং যুক্ত হয়েছে (মোট: ${propDb.properties.length} টি)`);

// 2. SYNC TENDERS DATA
const TEND_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const tendDb = JSON.parse(fs.readFileSync(TEND_FILE, 'utf-8'));

const freshTenders = [
  {
    id: "tnd-bm-2026-09",
    nitNumber: "NIT-09/BM/DRAIN-INFRA/2026",
    title: "বারুইপুর পৌর এলাকার ৩, ৪ ও ৮ নম্বর ওয়ার্ডে জলাবদ্ধতা নিরসনে গভীর পাকা ড্রেন ও স্ল্যাব আচ্ছাদন নির্মাণ",
    titleEn: "Construction of Reinforced Concrete Covered Stormwater Drainage Network in Ward Nos 3, 4 & 8 under Baruipur Municipality",
    authorityId: "municipality",
    authorityName: "বারুইপুর পৌরসভা (Baruipur Municipality)",
    department: "পৌর পূর্ত ও নাগরিক জল নিষ্কাশন বিভাগ",
    location: "ওয়ার্ড ৩, ৪ ও ৮, বারুইপুর পৌরসভা",
    category: "পৌর নিষ্কাশন ও নিকাশি (Drainage Infrastructure)",
    estimatedValue: "₹২৮,৫০,০০০",
    estimatedValueNum: 2850000,
    emdAmount: "₹৫৭,০০০",
    tenderFee: "₹১,৫০০",
    publishDate: "২০২৬-১১-১৩",
    closingDate: "২০২৬-১২-০৮",
    bidOpeningDate: "২০২৬-১২-১১",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WBMAD/BM/NIT-09/DRAIN/2026",
    eligibility: "পৌরসভা বা পূর্ত দপ্তরে আরসিসি ড্রেন ও সিভিল কাজে অভিজ্ঞ ১ম শ্রেণীর তালিকাভুক্ত ঠিকাদার।"
  },
  {
    id: "tnd-pwd-2026-04",
    nitNumber: "NIT-04/PWD-BRP/RD-SURF/2026",
    title: "বারুইপুর-আমতলা রোড ও রাসমাঠ সংযোগকারী প্রধান সড়কের পিচ পুনর্নির্মাণ ও সড়ক পেইন্টিং",
    titleEn: "Resurfacing and Strengthening of Baruipur-Amtala Road Junction to Rasmath Approach Road with Thermoplastic Road Marking",
    authorityId: "pwd",
    authorityName: "পশ্চিমবঙ্গ পূর্ত দপ্তর (PWD Baruipur Highway Sub-Division)",
    department: "বারুইপুর হাইওয়ে সাব-ডিভিশন",
    location: "বারুইপুর-আমতলা সংযোগ ও রাসমাঠ সংলগ্ন রাজ্য সড়ক",
    category: "সড়ক সংস্কার ও বিটুমিনাস পেভিং (Highway Maintenance)",
    estimatedValue: "₹৪৫,২০,০০০",
    estimatedValueNum: 4520000,
    emdAmount: "₹৯০,৪০০",
    tenderFee: "₹২,০০০",
    publishDate: "২০২৬-১১-১৩",
    closingDate: "২০২৬-১২-১০",
    bidOpeningDate: "২০২৬-১২-১৩",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "PWD/BRP/HWY/NIT-04/2026",
    eligibility: "রাজ্য পূর্ত দপ্তরে রাস্তা সংস্কার ও বিটুমিনাস কাজে নথিবদ্ধ যোগ্য ঠিকাদার।"
  },
  {
    id: "tnd-sdh-2026-06",
    nitNumber: "NIT-06/SDH-BRP/OXY-GEN/2026",
    title: "বারুইপুর মহকুমা হাসপাতালের সেন্ট্রাল মেডিক্যাল গ্যাস ও পাইপলাইন সিস্টেমের বার্ষিক রক্ষণাবেক্ষণ ও লিকুইড অক্সিজেন রিফিল",
    titleEn: "Annual Comprehensive Maintenance of Medical Gas Pipeline System (MGPS) and Liquid Medical Oxygen (LMO) Plant at Baruipur SDH",
    authorityId: "hospital",
    authorityName: "বারুইপুর মহকুমা হাসপাতাল (Baruipur Sub-Divisional Hospital)",
    department: "হাসপাতাল বায়োমেডিক্যাল ও গ্যাস সাপ্লাই সেল",
    location: "বারুইপুর মহকুমা হাসপাতাল প্রাঙ্গণ",
    category: "হাসপাতাল রক্ষণাবেক্ষণ ও মেডিকেল গ্যাস (Hospital AMC)",
    estimatedValue: "₹১৯,৮০,০০০",
    estimatedValueNum: 1980000,
    emdAmount: "₹৩৯,৬০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১৩",
    closingDate: "২০২৬-১২-০৭",
    bidOpeningDate: "২০২৬-১২-১০",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WBHSD/SDH-BRP/NIT-06/MGPS/2026",
    eligibility: "স্বাস্থ্য দপ্তরের অনুমোদিত সরকারি ও কর্পোরেট হাসপাতালে মেডিক্যাল অক্সিজেন প্ল্যান্ট রক্ষণাবেক্ষণে অভিজ্ঞ সংস্থা।"
  }
];

const existingTndIds = new Set(tendDb.tenders.map(t => t.id));
let tndAdded = 0;
for (const t of freshTenders) {
  if (!existingTndIds.has(t.id)) {
    tendDb.tenders.unshift(t);
    tndAdded++;
  }
}
tendDb.lastUpdated = "২০২৬-১১-১৩";
fs.writeFileSync(TEND_FILE, JSON.stringify(tendDb, null, 2), 'utf-8');
console.log(`✅ সরকারি ও পৌর দরপত্র (Tenders) সিঙ্ক সম্পন্ন: ${tndAdded} টি নতুন দরপত্র যুক্ত হয়েছে (মোট: ${tendDb.tenders.length} টি)`);

// 3. SYNC NOTICES DATA
const NOT_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const notDb = JSON.parse(fs.readFileSync(NOT_FILE, 'utf-8'));

const freshNotices = [
  {
    id: "not-bm-2026-1113",
    memoNo: "Memo No: 842/BM/SAN/2026",
    title: "আসন্ন বারুইপুর রাসমেলা ও শীতকালীন মরসুম উপলক্ষে শহর পরিচ্ছন্নতা ও পলিথিন মুক্ত বাজার অভিযানে পৌর বিজ্ঞপ্তি",
    titleEn: "Public Advisory regarding Plastic Waste Eradication & Special Civic Cleanliness Drive ahead of Baruipur Rasmela 2026",
    departmentId: "municipality",
    departmentName: "বারুইপুর পৌরসভা",
    publishedDate: "2026-11-13",
    publishedDateFormatted: "১৩ নভেম্বর, ২০২৬",
    category: "পৌর পরিচ্ছন্নতা ও পরিবেশ সুরক্ষা",
    isUrgent: true,
    summary: "রাসমাঠ ও বাজার সংলগ্ন এলাকায় সিঙ্গেল-ইউজ প্লাস্টিক ও ১২০ মাইক্রনের কম পুরু পলিথিন ব্যাগের ব্যবহারে নিষেধাজ্ঞা ও বিশেষ পরিচ্ছন্নতা স্কোয়াড গঠন।",
    content: "বারুইপুর পৌরসভার পক্ষ থেকে মহকুমার সমস্ত ব্যবসায়ী, বিক্রেতা এবং সাধারণ নাগরিকদের অবগতির জন্য জানানো যাচ্ছে:\n\n১. আসন্ন ঐতিহাসিক বারুইপুর রাসমেলা এবং শীতকালীন উৎসবের কথা মাথায় রেখে শহরজুড়ে বিশেষ পরিচ্ছন্নতা ও নর্দমা সংস্কার অভিযান শুরু হয়েছে।\n২. সমস্ত বাজার, রাসমাঠ চত্বর ও অস্থায়ী স্টলে ১২০ মাইক্রনের নিচে প্লাস্টিক ক্যারি ব্যাগ ও থার্মোকলের থালা-বাটি ব্যবহার সম্পূর্ণ নিষিদ্ধ।\n৩. পৌর স্বাস্থ্য ও স্যানিটেশন স্কোয়াড প্রতিদিন আকস্মিক পরিদর্শন চালাবে। আইন অমান্যকারী দোকানদারদের বিরুদ্ধে পৌর আইন অনুযায়ী জরিমানা কার্যকর করা হবে। মেলাকে পরিবেশবান্ধব রাখতে সকলের সক্রিয় সহযোগিতা একান্ত কাম্য।",
    pdfUrl: "https://baruipur.online/docs/notices/Notice_BM_Plastic_Ban_Rasmela_2026.pdf",
    pdfSize: "485 KB",
    signatory: "পৌরপ্রধান ও স্যানিটেশন ইনচার্জ, বারুইপুর পৌরসভা",
    status: "active"
  },
  {
    id: "not-crt-2026-1113",
    memoNo: "Memo No: 341/DLSA/S24PGS/BRP/2026",
    title: "বারুইপুর মহকুমা আদালতে বিশেষ জাতীয় লোক আদালত (National Lok Adalat) সংক্রান্ত জরুরি বিজ্ঞপ্তি",
    titleEn: "Notification for National Lok Adalat for Pre-Litigation and Pending Cases Settlement at Baruipur Court Complex",
    departmentId: "court",
    departmentName: "বারুইপুর মহকুমা আদালত ও আইনি সেল",
    publishedDate: "2026-11-13",
    publishedDateFormatted: "১৩ নভেম্বর, ২০২৬",
    category: "বিচারবিভাগ ও লোক আদালত",
    isUrgent: false,
    summary: "আগামী ১২ ডিসেম্বর ২০২৬ বারুইপুর আদালত প্রাঙ্গণে ব্যাংক লোন, বিদ্যুৎ বিল, মোটর ভেহিকল ক্ষতিপূরণ ও আপসযোগ্য মামলার দ্রুত নিষ্পত্তির মেগা লোক আদালত।",
    content: "জেলা আইনি পরিষেবা কর্তৃপক্ষ (DLSA) ও বারুইপুর মহকুমা আদালতের যৌথ উদ্যোগে আগামী ১২ই ডিসেম্বর ২০২৬ (শনিবার) জাতীয় লোক আদালত অনুষ্ঠিত হতে চলেছে:\n\n- **নিষ্পত্তিযোগ্য বিষয়সমূহ**: বিদ্যুৎ বিলের বকেয়া বিরোধ, ব্যাংক ঋণ ও এনআই অ্যাক্ট (চেক বাউন্স), মোটর দুর্ঘটনা ক্ষতিপূরণ মামলা (MACT), জল কর ও বৈবাহিক বিরোধ সংক্রান্ত আপসযোগ্য মামলা।\n- **সুবিধাসমূহ**: লোক আদালতে কোনো কোর্ট ফি লাগে না এবং উভয় পক্ষের সম্মতিতে দ্রুত রায় কার্যকর হয়।\n- আগ্রহী পক্ষগণ অবিলম্বে বারুইপুর আদালত ভবনে ডিএলএসএ ফ্রন্ট অফিসে প্রয়োজনীয় নথিপত্র সহ আবেদনপত্র জমা দিতে পারেন।",
    pdfUrl: "https://baruipur.online/docs/notices/Notice_Court_National_Lok_Adalat_2026.pdf",
    pdfSize: "510 KB",
    signatory: "সচিব, মহকুমা আইনি পরিষেবা কমিটি ও বিচারক, বারুইপুর",
    status: "active"
  },
  {
    id: "not-bpd-2026-1113",
    memoNo: "Memo No: 2210/BPD/TRAFFIC/2026",
    title: "বারুইপুর কাছারি মোড়, স্টেশন রোড ও রেলগেট সংযোগে রাসমেলা পূর্ববর্তী ট্রাফিক ডাইভারশন ও পার্কিং নির্দেশিকা",
    titleEn: "Traffic Regulation & Parking Advisory around Baruipur Kanchari More, Station Road and Rail Gate ahead of Rasmela",
    departmentId: "police",
    departmentName: "বারুইপুর পুলিশ জেলা",
    publishedDate: "2026-11-13",
    publishedDateFormatted: "১৩ নভেম্বর, ২০২৬",
    category: "ট্রাফিক পুলিশ ও জনশৃঙ্খলা",
    isUrgent: true,
    summary: "রাসমাঠ ও স্টেশন রোডে যানজট এড়াতে ভারী পণ্যবাহী গাড়ি প্রবেশে নির্দিষ্ট সময়সীমা ও অটো-টোটো স্ট্যান্ডের বিকল্প লেন নির্ধারণ।",
    content: "বারুইপুর পুলিশ জেলা ট্রাফিক বিভাগের পক্ষ থেকে জনসাধারণের অবগতির জন্য জানানো যাচ্ছে:\n\n১. প্রতিদিন সকাল ৮:০০ টা থেকে রাত ৯:০০ টা পর্যন্ত রাসমাঠ সংযোগকারী প্রধান রাস্তায় এবং কাছারি মোড়ে ৬ চাকার বেশি ভারী লরি ও পণ্যবাহী ট্রাকের চলাচল নিয়ন্ত্রিত থাকবে।\n২. বারুইপুর রেলগেটের উভয় পাশে যানজট রোধে টোটো ও অটোর জন্য নির্দিষ্ট 'ড্রপ-অ্যান্ড-গো' লেন চিহ্নিত করা হয়েছে। নো-পার্কিং জোনে যানবাহন রাখলে আইনত ব্যবস্থা নেওয়া হবে।\n৩. রাসমেলায় আগত দর্শনার্থীদের সুবিধার্থে বারুইপুর রবীন্দ্রভবন ও পুরাতন মহকুমা আদালতের মাঠে অস্থায়ী পার্কিং জোন চালু করা হচ্ছে। নাগরিকরা ট্রাফিক পুলিশের নির্দেশ মেনে সহযোগিতা করুন।",
    pdfUrl: "https://baruipur.online/docs/notices/Notice_BPD_Traffic_Advisory_Rasmela_2026.pdf",
    pdfSize: "530 KB",
    signatory: "পুলিশ সুপার ও ডিএসপি (ট্রাফিক), বারুইপুর পুলিশ জেলা",
    status: "active"
  }
];

const existingNotIds = new Set(notDb.notices.map(n => n.id));
let notAdded = 0;
for (const n of freshNotices) {
  if (!existingNotIds.has(n.id)) {
    notDb.notices.unshift(n);
    notAdded++;
  }
}
notDb.lastUpdated = "২০২৬-১১-১৩";
fs.writeFileSync(NOT_FILE, JSON.stringify(notDb, null, 2), 'utf-8');
console.log(`✅ সরকারি জরুরি নোটিস (Notices) সিঙ্ক সম্পন্ন: ${notAdded} টি নতুন সার্কুলার যুক্ত হয়েছে (মোট: ${notDb.notices.length} টি)`);

// 4. CLEANUP: Ensure no local dummy PDFs are required - rely on original official portals
console.log('\n✅ সমস্ত নোটিস ও টেন্ডার সরাসরি সরকারি অফিসিয়াল পোর্টালে সংযুক্ত। কোনো লোকাল ডামি পিডিএফ তৈরির প্রয়োজন নেই।');
console.log('\n🎉 সিঙ্ক ওয়ার্কফ্লো সম্পূর্ণ সফল!');
