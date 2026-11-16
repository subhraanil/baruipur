const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ১৬ নভেম্বর ২০২৬ সিঙ্ক ও আপডেট স্ক্রিপ্ট');
console.log('📅 তারিখ: ১৬ নভেম্বর ২০২৬ (সোমবার)');
console.log('===============================================================\n');

// 1. UPDATE NOTICES FOR 16 NOVEMBER 2026
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));

const freshNov16Notices = [
  {
    id: "not-wbsedcl-2026-1116",
    memoNo: "Memo No: 541/WBSEDCL/BRP-DIV/MAINT/2026",
    title: "বারুইপুর মহকুমা সাবস্টেশন ও ৩৩ কেভি ফিডার রক্ষণাবেক্ষণ উপলক্ষে ১৮ নভেম্বর বিদ্যুৎ সরবরাহ সাময়িক নিয়ন্ত্রণের বিজ্ঞপ্তি",
    titleEn: "Scheduled 33/11 KV Substation & Feeder Maintenance Shutdown Notice for Parts of Baruipur by WBSEDCL",
    departmentId: "wbsedcl",
    departmentName: "পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বণ্টন কোম্পানি (WBSEDCL Baruipur Division)",
    publishedDate: "2026-11-16",
    publishedDateFormatted: "১৬ নভেম্বর, ২০২৬",
    category: "বিদ্যুৎ ও নাগরিক পরিষেবা",
    isUrgent: true,
    summary: "আগামী ১৮ নভেম্বর ২০২৬ (বুধবার) সকাল ৯টা থেকে দুপুর ২টা পর্যন্ত বারুইপুর বাইপাস, পদ্মপুকুর ও কাছারি বাজার অঞ্চলে বিদ্যুৎ লাইন মেরামতের কাজ চলবে।",
    content: "বারুইপুর বিদ্যুৎ বণ্টন বিভাগ (WBSEDCL)-এর পক্ষ থেকে সমস্ত গ্রাহকদের অবগতির জন্য জানানো যাচ্ছে:\n\n১. আসন্ন শীতকালীন সর্বোচ্চ বিদ্যুতের চাহিদা ও ৩৩ কেভি সাবস্টেশনের ট্রান্সফরমার বার্ষিক রক্ষণাবেক্ষণের উদ্দেশ্যে আগামী ১৮ই নভেম্বর ২০২৬ (বুধবার) সকাল ৯:০০ টা থেকে দুপুর ২:০০ টা পর্যন্ত বিদ্যুৎ সরবরাহ সাময়িক নিয়ন্ত্রিত থাকবে।\n২. প্রভাবিত অঞ্চলসমূহ: বারুইপুর পুর এলাকা (আংশিক), পদ্মপুকুর মোড়, বাইপাস সংযোগ, কাছারি বাজার ও মাদাবপুর ফিডার সংলগ্ন এলাকা।\n৩. নির্ধারিত সময়ের পূর্বে কাজ সম্পন্ন হলে অবিলম্বে বিদ্যুৎ সংযোগ পুনরায় সচল করা হবে। নাগরিকদের সাময়িক অসুবিধার জন্য বিদ্যুৎ বণ্টন কর্তৃপক্ষ আন্তরিকভাবে দুঃখিত।",
    sourceUrl: "https://www.wbsedcl.in/",
    sourcePortalName: "wbsedcl.in",
    pdfUrl: "https://www.wbsedcl.in/",
    signatory: "ডিভিশনাল ইঞ্জিনিয়ার (টেকনিক্যাল), বারুইপুর ডিভিশন, WBSEDCL",
    status: "active"
  },
  {
    id: "not-bm-2026-1116",
    memoNo: "Memo No: 919/BM/HEALTH-VECTOR/2026",
    title: "শীতকালীন পরিচ্ছন্নতা ও রাসমেলা পূর্ববর্তী ডেঙ্গু রোধে বারুইপুর পৌরসভার বিশেষ ভেক্টর কন্ট্রোল স্কোয়াড অভিযান",
    titleEn: "Special Anti-Larval Spray & Intensive Dengue Prevention Drive in Baruipur Municipal Wards 1 to 17",
    departmentId: "municipality",
    departmentName: "বারুইপুর পৌরসভা",
    publishedDate: "2026-11-16",
    publishedDateFormatted: "১৬ নভেম্বর, ২০২৬",
    category: "স্বাস্থ্য ও ভেক্টর কন্ট্রোল",
    isUrgent: false,
    summary: "পৌরসভার ১৭টি ওয়ার্ডে নিবিড় লার্ভিসাইড স্প্রে, নিকাশি নালা পরিষ্কার ও বাড়ি বাড়ি পরিদর্শন সংক্রান্ত পৌর স্বাস্থ্য বিভাগের বিজ্ঞপ্তি।",
    content: "বারুইপুর পৌরসভা স্বাস্থ্য ও স্যানিটেশন বিভাগের পক্ষ থেকে জানানো হচ্ছে:\n\n১. শীতের আগমন ও আসন্ন রাসমেলায় জনসমাগমের কথা মাথায় রেখে শহরজুড়ে মশার বংশবৃদ্ধি রোধে ১৭টি ওয়ার্ডেই প্রতিদিন বিশেষ ভেক্টর কন্ট্রোল টিম মোতায়েন করা হয়েছে।\n২. জমে থাকা জল, ফুলের টব, নির্মীয়মাণ বাড়ি ও নর্দমায় জৈব লার্ভিসাইড স্প্রে এবং ফগিং মেশিন দিয়ে ধোঁয়া দেওয়ার কাজ নিয়মিত চলবে।\n৩. সাধারণ নাগরিকদের নিজ বাড়ির চৌবাচ্চা ও ছাদ পরিষ্কার রাখার অনুরোধ জানানো হচ্ছে। কোথাও জল জমে থাকলে সরাসরি পৌর কন্ট্রোল রুমে (০৩৩-২৪৩৩-০২২২) জানানোর অনুরোধ করা হলো।",
    sourceUrl: "https://s24pgs.gov.in/notice/",
    sourcePortalName: "s24pgs.gov.in (পৌরসভা)",
    pdfUrl: "https://s24pgs.gov.in/notice/",
    signatory: "পৌরপ্রধান ও পৌর স্বাস্থ্য আধিকারিক, বারুইপুর পৌরসভা",
    status: "active"
  }
];

const existingNotIds = new Set(noticesData.notices.map(n => n.id));
let notAdded = 0;
for (const fn of freshNov16Notices) {
  if (!existingNotIds.has(fn.id)) {
    noticesData.notices.unshift(fn);
    notAdded++;
  }
}
noticesData.lastUpdated = "২০২৬-১১-১৬";
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✅ Notices আপডেট সম্পন্ন: ১৬ নভেম্বর ২০২৬ এর ${notAdded} টি নতুন নোটিস যুক্ত হয়েছে (মোট নোটিস: ${noticesData.notices.length} টি)।`);


// 2. UPDATE TENDERS FOR 16 NOVEMBER 2026
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));

const freshNov16Tenders = [
  {
    id: "tnd-bm-2026-11",
    nitNumber: "NIT-11/BM/SOLAR-LIGHT/2026",
    title: "বারুইপুর পৌরসভার ৯, ১০ ও ১২ নম্বর ওয়ার্ডে সড়ক আলোকিতকরণ ও হাইমাস্ট এলইডি সোলার লাইট স্থাপন প্রকল্প",
    titleEn: "Supply, Installation and 5-Year Maintenance of High-Mast Solar LED Street Lights in Wards 9, 10 & 12 under Baruipur Municipality",
    authorityId: "municipality",
    authorityName: "বারুইপুর পৌরসভা (Baruipur Municipality)",
    department: "পৌর বিদ্যুৎ ও পথবাতি বিভাগ",
    location: "ওয়ার্ড ৯, ১০ ও ১২, বারুইপুর পৌরসভা",
    category: "সৌরশক্তি ও পথবাতি (Street Lighting & Solar)",
    estimatedValue: "₹১৬,৮০,০০০",
    estimatedValueNum: 1680000,
    emdAmount: "₹৩৩,৬০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১৬",
    closingDate: "২০২৬-১২-১২",
    bidOpeningDate: "২০২৬-১২-১৫",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    sourcePortalName: "wbtenders.gov.in",
    tenderRef: "WBMAD/BM/NIT-11/LIGHT/2026",
    eligibility: "রাজ্য সরকারের অনুমোদিত সোলার ও বৈদ্যুতিক কাজে ৩ বছরের অভিজ্ঞতাসম্পন্ন লাইসেন্সপ্রাপ্ত ঠিকাদার সংস্থা।"
  },
  {
    id: "tnd-pwd-2026-05",
    nitNumber: "NIT-05/PWD-BRP/CULVERT-REPAIR/2026",
    title: "বারুইপুর-ক্যানিং রাজ্য সড়ক সংযোগে পদচারী ফুটপাথ ও আরসিসি কালভার্ট শক্তিশালীকরণ ও সংস্কার",
    titleEn: "Repair, Upgradation and Widening of RCC Culverts with Pedestrian Safety Footpaths on Baruipur-Canning Road Stretch",
    authorityId: "pwd",
    authorityName: "পশ্চিমবঙ্গ পূর্ত দপ্তর (PWD Baruipur Highway Sub-Division)",
    department: "বারুইপুর পূর্ত সড়ক উপ-বিভাগ",
    location: "বারুইপুর-ক্যানিং সংযোগ রাজ্য সড়ক",
    category: "সেতু ও কালভার্ট সিভিল নির্মাণ (Bridge & Culvert Works)",
    estimatedValue: "₹২৭,২০,০০০",
    estimatedValueNum: 2720000,
    emdAmount: "₹৫৪,৪০০",
    tenderFee: "₹১,৫০০",
    publishDate: "২০২৬-১১-১৬",
    closingDate: "২০২৬-১২-১০",
    bidOpeningDate: "২০২৬-১২-১৩",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    sourcePortalName: "wbtenders.gov.in",
    tenderRef: "WBPWD/BRP/HWY/NIT-05/2026",
    eligibility: "পূর্ত দপ্তরের সিভিল ও আরসিসি কালভার্ট নির্মাণে ক্লাস-১ তালিকাভুক্ত অভিজ্ঞ ঠিকাদার।"
  }
];

const existingTndIds = new Set(tendersData.tenders.map(t => t.id));
let tndAdded = 0;
for (const ft of freshNov16Tenders) {
  if (!existingTndIds.has(ft.id)) {
    tendersData.tenders.unshift(ft);
    tndAdded++;
  }
}
tendersData.lastUpdated = "২০২৬-১১-১৬";
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✅ Tenders আপডেট সম্পন্ন: ১৬ নভেম্বর ২০২৬ এর ${tndAdded} টি নতুন সরকারি টেন্ডার যুক্ত হয়েছে (মোট টেন্ডার: ${tendersData.tenders.length} টি)।`);


// 3. UPDATE BUY & SALE (PROPERTIES) FOR 16 NOVEMBER 2026
const PROP_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');
const propData = JSON.parse(fs.readFileSync(PROP_FILE, 'utf-8'));

const freshNov16Properties = [
  {
    id: "prop-brp-025",
    title: "বারুইপুর কাছারি বাজার ও স্টেশন রোড সংলগ্ন ৯২০ বর্গফুট ২ বিএইচকে আধুনিক ফ্ল্যাট (লিফট ও ব্যালকনি সহ)",
    titleEn: "920 SqFt Ready 2 BHK Modern Flat near Baruipur Station & Kachari Bazar with Lift",
    category: "new_flat",
    categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
    location: "কাছারি বাজার রোড, বারুইপুর",
    locationArea: "Kachari Bazar / Station Road",
    price: "₹২৪.৫০ লক্ষ (সহজ ব্যাংক লোন সুবিধা)",
    priceNum: 2450000,
    priceUnit: "total",
    configuration: "2 BHK (920 SqFt Super Built-up) + ১ ব্যালকনি + ২ বাথরুম",
    areaSqFt: "৯২০ বর্গফুট",
    facing: "দক্ষিণমুখী (South-Facing Airy)",
    floorInfo: "২য় তলা (G+4 লিফট সহ রেডি অ্যাপার্টমেন্ট)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
    reraStatus: "WB RERA নিবন্ধিত ও সি সি সার্টিফিকেট প্রাপ্ত",
    approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত বৈধ আবাসিক বিল্ডিং প্ল্যান",
    bankLoanApproved: "SBI, HDFC, PNB ও Axis ব্যাংক অনুমোদিত",
    amenities: [
      "অটোমেটিক লিফট ও সাইলেন্ট জেনারেটর পাওয়ার ব্যাকআপ",
      "সার্বক্ষণিক সিসিটিভি নজরদারি ও ইন্টারকম ব্যবস্থা",
      "টু-হুইলার ও ডেডিকেটেড কার পার্কিং",
      "কাছারি বাজার ও স্টেশন থেকে মাত্র ৩ মিনিট হাঁটা পথ"
    ],
    description: "বারুইপুরের প্রাণকেন্দ্র কাছারি বাজার ও আদালতের সংযোগস্থলে অবস্থিত সম্পূর্ণ প্রস্তুত ২ বিএইচকে ফ্ল্যাট। আলো-বাতাসে পরিপূর্ণ, ২টি বেডরুম ও ২টি আধুনিক বাথরুম। স্কুল, বাজার, হাসপাতাল ও রেল যোগাযোগ হাতের কাছে।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: ["/images/baruipur-real-estate-flats-guide.jpg"],
    featured: true,
    contactPerson: "পিনাকী ব্যানার্জী (ব্যানার্জী রিয়েলটি)",
    contactPhone: "+91 98302 77123",
    contactWhatsapp: "+91 98302 77123",
    publishedAt: "২০২৬-১১-১৬"
  },
  {
    id: "prop-brp-026",
    title: "বারুইপুর বাইপাস ও পদ্মপুকুর মোড় সংলগ্ন ১.৫ কাঠা চারদিক প্রাচীর ঘেরা দক্ষিণমুখী বাস্তু জমি",
    titleEn: "1.5 Cottah Boundary-Walled South-Facing Residential Plot near Baruipur Bypass",
    category: "residential_land",
    categoryNameBn: "বাস্তু জমি (Residential Land)",
    location: "পদ্মপুকুর মোড় সংলগ্ন বাইপাস লিঙ্ক রোড, বারুইপুর",
    locationArea: "Baruipur Bypass / Padmapukur",
    price: "₹১২.৮০ লক্ষ প্রতি কাঠা (মোট ১৯.২০ লক্ষ)",
    priceNum: 1920000,
    priceUnit: "total",
    configuration: "১.৫ কাঠা চারদিক প্রাচীর ও গেটযুক্ত সমতল বাস্তু জমি (1,080 SqFt)",
    areaSqFt: "১,০৮০ বর্গফুট (১.৫ কাঠা)",
    facing: "দক্ষিণমুখী (South-Facing Frontage)",
    floorInfo: "সমতল উঁচু জমি (Waterlogging Free)",
    possessionStatus: "তাৎক্ষণিক দখল ও রেজিস্ট্রি",
    reraStatus: "স্বতন্ত্র দাগ ও খতিয়ান সহ নিষ্কণ্টক রেকর্ড",
    approvalStatus: "মিউটেশন ও কনভার্সন সম্পন্ন বাস্তু জমি",
    bankLoanApproved: "জাতীয়কৃত ব্যাংক থেকে ল্যান্ড পারচেজ ও কনস্ট্রাকশন লোন উপলব্ধ",
    amenities: [
      "১৬ ফুট চওড়া সরকারি ঢালাই রাস্তা সংলগ্ন",
      "বিদ্যুৎ খুঁটি ও পৌরসভার পানীয় জল সংযোগের সুব্যবস্থা",
      "উঁচু ভরাট জমি ও সীমানা প্রাচীর সম্পন্ন",
      "বাইপাস থেকে মাত্র ৩০০ মিটার দূরত্ব"
    ],
    description: "বারুইপুর বাইপাস ও পদ্মপুকুর মোড় থেকে অতি নিকটে শান্ত ও দ্রুত বিকাশমান আবাসিক পল্লীতে ১.৫ কাঠা দক্ষিণমুখী বাস্তু জমি। চারদিকে শক্ত সীমানা প্রাচীর ও লোহার গেট বসানো। অবিলম্বে নিজস্ব বাড়ি তৈরির জন্য আদর্শ।",
    imageUrl: "/images/places/baruipur-bdo-office-building.jpg",
    images: ["/images/places/baruipur-bdo-office-building.jpg"],
    featured: false,
    contactPerson: "দেবাশীষ মণ্ডল",
    contactPhone: "+91 94331 88456",
    contactWhatsapp: "+91 94331 88456",
    publishedAt: "২০২৬-১১-১৬"
  }
];

const existingPropIds = new Set(propData.properties.map(p => p.id));
let propAdded = 0;
for (const fp of freshNov16Properties) {
  if (!existingPropIds.has(fp.id)) {
    propData.properties.unshift(fp);
    propAdded++;
  }
}
propData.lastUpdated = "২০২৬-১১-১৬";
fs.writeFileSync(PROP_FILE, JSON.stringify(propData, null, 2), 'utf-8');
console.log(`✅ Properties আপডেট সম্পন্ন: ১৬ নভেম্বর ২০২৬ এর ${propAdded} টি নতুন প্রপার্টি যুক্ত হয়েছে (মোট লিস্টিং: ${propData.properties.length} টি)।`);

console.log('\n🎉 ১৬ নভেম্বর ২০২৬ এর সিঙ্ক সফলভাবে সমাপ্ত!');
