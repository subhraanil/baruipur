const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ১৫ নভেম্বর ২০২৬ সিঙ্ক ও আপডেট স্ক্রিপ্ট');
console.log('📅 তারিখ: ১৫ নভেম্বর ২০২৬ (রবিবার)');
console.log('===============================================================\n');

// 1. UPDATE NOTICES FOR 15 NOVEMBER 2026
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));

const freshNov15Notices = [
  {
    id: "not-bm-2026-1115",
    memoNo: "Memo No: 912/BM/MELA-RAS/2026",
    title: "ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬: রাসমঞ্চ ও রাসমাঠ চত্বরে হস্তশিল্প ও অস্থায়ী খাদ্য স্টল বরাদ্দ আবেদন যাচাইকরণ সময়সূচি",
    titleEn: "Baruipur Municipality Notice on Stall Allocation and Document Verification Schedule for Historic Rasmela 2026",
    departmentId: "municipality",
    departmentName: "বারুইপুর পৌরসভা",
    publishedDate: "2026-11-15",
    publishedDateFormatted: "১৫ নভেম্বর, ২০২৬",
    category: "মেলা ও উৎসব সমন্বয়",
    isUrgent: true,
    summary: "আসন্ন রাসমেলায় স্থানীয় হস্তশিল্প কারিগর ও খাদ্য ব্যবসায়ীদের অনুকূলে অস্থায়ী স্টল বণ্টন এবং নথি পরীক্ষার পৌর সময়সূচি ঘোষণা।",
    content: "বারুইপুর পৌরসভা ও রাসমেলা উৎসব কমিটির যৌথ উদ্যোগে জানানো যাচ্ছে:\n\n১. ঐতিহাসিক বারুইপুর রাসমেলা ২০২৬ উপলক্ষে রাসমাঠ ও সংলগ্ন চত্বরে হস্তশিল্প সামগ্রী, কুটির শিল্প এবং মিষ্টি ও খাদ্য সামগ্রীর স্টল স্থাপনের আবেদনপত্র যাচাইকরণ শুরু হচ্ছে।\n২. সমস্ত নথিভুক্ত আবেদনকারীদের ট্রেড লাইসেন্স বা পরিচয়পত্র সহ আগামী ১৭ ও ১৮ নভেম্বর ২০২৬ সকাল ১১টা থেকে বিকাল ৪টার মধ্যে পৌরভবনের দ্বিতীয় তলে মেলা সেলে উপস্থিত থাকার নির্দেশ দেওয়া হচ্ছে।\n৩. মেলা প্রাঙ্গণে সম্পূর্ণ প্লাস্টিক বর্জন ও অগ্নি নির্বাপক ব্যবস্থা রাখা বাধ্যতামূলক। অননুমোদিত কোনো অস্থায়ী ছাউনি বা দখলদারি বরদাস্ত করা হবে না।",
    sourceUrl: "https://s24pgs.gov.in/notice/",
    sourcePortalName: "s24pgs.gov.in (পৌরসভা)",
    pdfUrl: "https://s24pgs.gov.in/notice/",
    signatory: "পৌরপ্রধান ও মেলা সমন্বয়ক, বারুইপুর পৌরসভা",
    status: "active"
  },
  {
    id: "not-sdh-2026-1115",
    memoNo: "Memo No: 3340/SDH-BRP/PEDIATRIC/2026",
    title: "শীতের প্রাক্কালে শিশুদের শ্বাসকষ্ট ও নিউমোনিয়া সতর্কতায় বারুইপুর মহকুমা হাসপাতালে বিশেষ রবিবার পেডিয়াট্রিক ওপিডি হেল্পডেস্ক",
    titleEn: "Baruipur Sub-Divisional Hospital Winter Pediatric Respiratory Care & Helpdesk Advisory",
    departmentId: "hospital",
    departmentName: "বারুইপুর মহকুমা হাসপাতাল",
    publishedDate: "2026-11-15",
    publishedDateFormatted: "১৫ নভেম্বর, ২০২৬",
    category: "স্বাস্থ্য ও চিকিৎসা পরিষেবা",
    isUrgent: false,
    summary: "আবহাওয়া পরিবর্তনের সঙ্গে শিশুদের সর্দি, কাশি, ব্রঙ্কিওলাইটিস ও শ্বাসকষ্টজনিত সমস্যায় সচেতনতা এবং বিনামূল্যে জরুরি ওষুধ প্রদান।",
    content: "বারুইপুর মহকুমা হাসপাতাল কর্তৃপক্ষ অভিভাবক ও স্থানীয় স্বাস্থ্যকর্মীদের অবগতির জন্য জানাচ্ছে:\n\n১. ঋতু পরিবর্তনের কারণে শিশুদের সর্দি-কাশি, শ্বাসকষ্ট ও নিউমোনিয়ার প্রকোপ এড়াতে জরুরি পেডিয়াট্রিক ওপিডি ইউনিট ও শিশু সহায়তা সেল সার্বক্ষণিক সক্রিয় করা হয়েছে।\n২. নবজাতক ও শিশুদের শ্বাসকষ্ট বা টানা জ্বর দেখা দিলে কোনো ফার্মেসি থেকে অ্যান্টিবায়োটিক না কিনে সরাসরি হাসপাতালের আউটডোরে বিশেষজ্ঞ শিশু চিকিৎসকের পরামর্শ নিন।\n৩. হাসপাতালের সেন্ট্রাল নেবুলাইজেশন সেন্টার ও শিশু আইসিইউ (SNCU) ইউনিট সম্পূর্ণ সচল ও প্রস্তুত রয়েছে। জরুরি সহায়তায় ডায়াল করুন ০৩৩-২৪৩৩-০০৩৩।",
    sourceUrl: "https://www.wbhealth.gov.in/pages/notice_circular",
    sourcePortalName: "wbhealth.gov.in",
    pdfUrl: "https://www.wbhealth.gov.in/pages/notice_circular",
    signatory: "সুপারিনটেন্ডেন্ট, বারুইপুর মহকুমা হাসপাতাল",
    status: "active"
  }
];

const existingNotIds = new Set(noticesData.notices.map(n => n.id));
for (const fn of freshNov15Notices) {
  if (!existingNotIds.has(fn.id)) {
    noticesData.notices.unshift(fn);
  }
}
noticesData.lastUpdated = "২০২৬-১১-১৫";
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✅ Notices আপডেট সম্পন্ন: ১৫ নভেম্বর ২০২৬ এর নতুন নোটিস যুক্ত হয়েছে (মোট নোটিস: ${noticesData.notices.length} টি)।`);


// 2. UPDATE TENDERS FOR 15 NOVEMBER 2026
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));

const freshNov15Tenders = [
  {
    id: "tnd-bpd-2026-08",
    nitNumber: "NIT-08/BPD/SURVEILLANCE-CCTV/2026",
    title: "বারুইপুর পুলিশ জেলা সদর, ট্রাফিক ফাঁড়ি ও গুরুত্বপূর্ণ রেল ক্রসিংয়ে স্মার্ট সিসিটিভি নজরদারি ক্যামেরা ও অপটিক্যাল ফাইবার নেটওয়ার্ক বার্ষিক সম্প্রসারণ",
    titleEn: "Annual Expansion & Maintenance of Smart High-Definition CCTV Surveillance and OFC Network for Baruipur Police District Headquarters and Traffic Outposts",
    authorityId: "police",
    authorityName: "বারুইপুর পুলিশ জেলা (Baruipur Police District)",
    department: "জেলা পুলিশ টেলিযোগাযোগ ও সাইবার সিকিউরিটি সেল",
    location: "বারুইপুর কাছারি মোড়, স্টেশন রোড ও রেল ক্রসিং জংশন",
    category: "আইটি ও পুলিশ নিরাপত্তা প্রযুক্তি (IT & Surveillance)",
    estimatedValue: "₹১৮,৪০,০০০",
    estimatedValueNum: 1840000,
    emdAmount: "₹৩৬,৮০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১৫",
    closingDate: "২০২৬-১২-১০",
    bidOpeningDate: "২০২৬-১২-১৩",
    status: "active",
    portalLink: "https://wbpolice.gov.in/WBP/Common/WBP_Tender.aspx",
    sourcePortalName: "wbpolice.gov.in",
    tenderRef: "WBPD/BPD/NIT-08/CCTV-OFC/2026",
    eligibility: "রাজ্য বা কেন্দ্রীয় পুলিশ বিভাগে সিসিটিভি ক্যামেরা ও নেটওয়ার্ক পরিকাঠামো রূপায়নে অভিজ্ঞ ও ক্লাস-১ রেজিস্টার্ড ভেন্ডর।"
  },
  {
    id: "tnd-bdo-2026-12",
    nitNumber: "NIT-12/BDO-BRP/JALSWAPNA-PUMP/2026",
    title: "বারুইপুর ব্লকের অন্তর্গত মল্লিকপুর ও ধপধপি গ্রাম পঞ্চায়েত এলাকায় জলস্বপ্ন প্রকল্পে সৌরচালিত পানীয় জল পাম্পিং সিস্টেম বার্ষিক মেরামত ও প্রতিস্থাপন",
    titleEn: "Annual Repair, Solar Pumping Unit Maintenance and Piped Drinking Water Pipeline Expansion under Jal Swapna Project in Mallikpur & Dhapdhabi GPs",
    authorityId: "panchayat",
    authorityName: "বারুইপুর পঞ্চায়েত সমিতি ও বিডিও কার্যালয় (Baruipur BDO Office)",
    department: "জনস্বাস্থ্য কারিগরি ও গ্রামীণ জল সরবরাহ শাখা",
    location: "মল্লিকপুর ও ধপধপি ১ ও ২ গ্রাম পঞ্চায়েত এলাকা",
    category: "পানীয় জল ও সৌর পাম্প (Drinking Water Infra)",
    estimatedValue: "₹২৪,৮০,০০০",
    estimatedValueNum: 2480000,
    emdAmount: "₹৪৯,৬০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১৫",
    closingDate: "২০২৬-১২-০৮",
    bidOpeningDate: "২০২৬-১২-১১",
    status: "active",
    portalLink: "https://s24pgs.gov.in/tender/",
    sourcePortalName: "s24pgs.gov.in (BDO & Gram Panchayats)",
    tenderRef: "WBP&RD/BRP-BDO/NIT-12/WATER/2026",
    eligibility: "পশ্চিমবঙ্গ সরকারের PHE বা পঞ্চায়েত দফতরে সাবমার্সিবল পাম্প ও পাইপলাইন রূপায়নে ৩ বছরের অভিজ্ঞতাসম্পন্ন ঠিকাদার।"
  }
];

const existingTndIds = new Set(tendersData.tenders.map(t => t.id));
for (const ft of freshNov15Tenders) {
  if (!existingTndIds.has(ft.id)) {
    tendersData.tenders.unshift(ft);
  }
}
tendersData.lastUpdated = "২০২৬-১১-১৫";
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✅ Tenders আপডেট সম্পন্ন: ১৫ নভেম্বর ২০২৬ এর নতুন সরকারি টেন্ডার যুক্ত হয়েছে (মোট টেন্ডার: ${tendersData.tenders.length} টি)।`);


// 3. UPDATE BUY & SALE (PROPERTIES) FOR 15 NOVEMBER 2026
const PROP_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');
const propData = JSON.parse(fs.readFileSync(PROP_FILE, 'utf-8'));

const freshNov15Properties = [
  {
    id: "prop-brp-023",
    title: "বারুইপুর পদ্মপুকুর ও কুলপি রোড সংলগ্ন আধুনিক ৩ বিএইচকে ১,২২০ বর্গফুট প্রিমিয়াম কর্নার ফ্ল্যাট",
    titleEn: "1,220 SqFt Premium 3 BHK Corner Flat near Padmapukur & Kulpi Road Baruipur",
    category: "new_flat",
    categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
    location: "পদ্মপুকুর মোড়, কুলপি রোড, বারুইপুর",
    locationArea: "Padmapukur / Kulpi Road",
    price: "₹৩৪.৫০ লক্ষ (সহজ ব্যাংক লোন)",
    priceNum: 3450000,
    priceUnit: "total",
    configuration: "3 BHK (1,220 SqFt Super Built-up) + 2 ব্যালকনি + 2 বাথরুম",
    areaSqFt: "১,২২০ বর্গফুট",
    facing: "দক্ষিণ-পূর্ব কর্নার (South-East Open Corner)",
    floorInfo: "৩য় তলা (G+4 লিফট সহ আধুনিক হাউজিং কমপ্লেক্স)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
    reraStatus: "WB RERA রেজিস্টার্ড ও অকুপ্যান্সি সার্টিফিকেট প্রাপ্ত",
    approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত প্ল্যান",
    bankLoanApproved: "SBI, HDFC, Axis ও Bank of Baroda অনুমোদিত",
    amenities: [
      "অটোমেটিক ৮ জনের ক্যাপাসিটি লিফট ও সার্বক্ষণিক পাওয়ার ব্যাকআপ",
      "কভার্ড টু-হুইলার ও ফোর-হুইলার ডেডিকেটেড কার পার্কিং",
      "কম্পাউন্ড গার্ডেন, শিশুদের খেলার জায়গা ও রুফটপ ওয়াকিং ট্র্যাক",
      "২৪ ঘণ্টা পৌরসভার পরিশোধিত পানীয় জল ও সিসিটিভি নিরাপত্তা"
    ],
    description: "বারুইপুর পদ্মপুকুর মোড় থেকে মাত্র ২০০ মিটার দূরে শান্ত ও নিরিবিলি আবাসিক অঞ্চলে অবস্থিত ৩ বিএইচকে কর্নার ফ্ল্যাট। আলো-বাতাসে পরিপূর্ণ, প্রশস্ত লিভিং কাম ডাইনিং হল এবং ২টি বারান্দা। বারুইপুর রেল জংশন ও বাজার মাত্র ৫ মিনিটের দূরত্বে।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: ["/images/baruipur-real-estate-flats-guide.jpg"],
    featured: true,
    contactPerson: "অভিজিৎ মুখার্জী (আনন্দধারা রিয়েলটি)",
    contactPhone: "+91 98314 22310",
    contactWhatsapp: "+91 98314 22310",
    publishedAt: "২০২৬-১১-১৫"
  },
  {
    id: "prop-brp-024",
    title: "সুভাষগ্রাম ও চম্পাহাটি সংযোগ রোডে ২ কাঠা পাকা রাস্তার কর্নার প্লট (বাড়ি বা বাণিজ্যিক উপযুক্ত)",
    titleEn: "2 Cottah Prime Corner Residential/Commercial Land on Subhasgram-Champahati Link Road",
    category: "residential_land",
    categoryNameBn: "বাস্তু জমি (Residential Land)",
    location: "সুভাষগ্রাম সংলগ্ন চম্পাহাটি সংযোগ রোড, বারুইপুর",
    locationArea: "Subhasgram / Champahati Road",
    price: "₹১৪.৫০ লক্ষ প্রতি কাঠা (মোট ২৯ লক্ষ)",
    priceNum: 2900000,
    priceUnit: "total",
    configuration: "২ কাঠা উঁচু পাকা রাস্তার সংলগ্ন বাস্তু প্লট (1,440 SqFt)",
    areaSqFt: "১,৪৪০ বর্গফুট (২ কাঠা)",
    facing: "উত্তর-পূর্ব কর্নার (Double Side Road Facing: 22 Ft & 16 Ft)",
    floorInfo: "উঁচু মাটি ভরাট করা নিষ্কণ্টক জমি (Waterlogging Free)",
    possessionStatus: "তাৎক্ষণিক রেজিস্ট্রি ও বাউন্ডারি দখল",
    reraStatus: "একক মালিকানাধীন পরিষ্কার টাইটেল ডিড ও হাল পর্চা",
    approvalStatus: "ব্লক ও বিএলএলআরও পর্চা হালনাগাদ ও মিউটেশন সম্পন্ন",
    bankLoanApproved: "জাতীয়কৃত ব্যাংকের জমি কেনা ও বাড়ি তৈরির লোন সুবিধা",
    amenities: [
      "২২ ফুট চওড়া মূল পিচ রাস্তা ও ১৬ ফুট সংযোগ রাস্তার কর্নার পজিশন",
      "বিদ্যুৎ ট্রান্সফরমার ও পাইপলাইনের পানীয় জলের সুবিধা একেবারে সংলগ্ন",
      "দোকান, গোডাউন, নার্সিং হোম বা নিজস্ব বিলাসবহুল বাড়ি তৈরির জন্য আদর্শ",
      "সুভাষগ্রাম ও মল্লিকপুর স্টেশন সংযোগ অটো-টোটো রুটের উপরেই অবস্থিত"
    ],
    description: "বারুইপুরের অত্যন্ত দ্রুত বর্ধনশীল সুভাষগ্রাম-চম্পাহাটি সংযোগ সড়কে ২ কাঠা উঁচু নিষ্কণ্টক বাস্তু জমি। দু'পাশে পাকা রাস্তা থাকায় বাড়ি বা বাণিজ্যিক উভয় কাজেই অত্যন্ত লাভজনক বিনিয়োগ। সরাসরি মালিকের সাথে চুক্তি, কোনো মধ্যস্বত্বভোগী নেই।",
    imageUrl: "/images/places/baruipur-bdo-office-building.jpg",
    images: ["/images/places/baruipur-bdo-office-building.jpg"],
    featured: false,
    contactPerson: "সুজয় কুমার নস্কর",
    contactPhone: "+91 98305 61789",
    contactWhatsapp: "+91 98305 61789",
    publishedAt: "২০২৬-১১-১৫"
  }
];

const existingPropIds = new Set(propData.properties.map(p => p.id));
for (const fp of freshNov15Properties) {
  if (!existingPropIds.has(fp.id)) {
    propData.properties.unshift(fp);
  }
}
propData.lastUpdated = "২০২৬-১১-১৫";
fs.writeFileSync(PROP_FILE, JSON.stringify(propData, null, 2), 'utf-8');
console.log(`✅ Buy & Sale (Properties) আপডেট সম্পন্ন: ১৫ নভেম্বর ২০২৬ এর ২টি নতুন লিস্টিং যুক্ত হয়েছে (মোট লিস্টিং: ${propData.properties.length} টি)।`);

console.log('\n🎉 ১৫ নভেম্বর ২০২৬ এর নোটিস, টেন্ডার ও প্রপার্টি সফলভাবে সিঙ্ক হয়েছে!');
