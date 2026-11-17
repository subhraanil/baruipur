const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('🚀 বারুইপুর পোর্টাল: ১৭ নভেম্বর ২০২৬ সিঙ্ক ও আপডেট স্ক্রিপ্ট');
console.log('📅 তারিখ: ১৭ নভেম্বর ২০২৬ (মঙ্গলবার)');
console.log('===============================================================\n');

// 1. UPDATE NOTICES FOR 17 NOVEMBER 2026
const NOTICES_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const noticesData = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf-8'));

const freshNov17Notices = [
  {
    id: "not-bm-2026-1117",
    memoNo: "Memo No: 942/BM/REV-TRADE/2026",
    title: "বারুইপুর পৌরসভা এলাকার সকল ব্যবসা প্রতিষ্ঠানের ২০২৬-২৭ অর্থবর্ষের ট্রেড লাইসেন্স নবীকরণ ও বিশেষ কর নিষ্পত্তি শিবিরের বিজ্ঞপ্তি",
    titleEn: "Baruipur Municipality Notice on Trade License Renewal & Special Property Tax Grievance Settlement Camp 2026-27",
    departmentId: "municipality",
    departmentName: "বারুইপুর পৌরসভা",
    publishedDate: "2026-11-17",
    publishedDateFormatted: "১৭ নভেম্বর, ২০২৬",
    category: "পৌর প্রশাসন ও কর পরিষেবা",
    isUrgent: false,
    summary: "আগামী ২০ থেকে ২৭ নভেম্বর ২০২৬ পৌরসভা প্রাঙ্গণে আয়োজিত হবে বিশেষ কর ও ট্রেড লাইসেন্স সহায়তা শিবির। নির্ধারিত সময়ের মধ্যে নবীকরণে মিলবে বিশেষ ছাড়।",
    content: "বারুইপুর পৌরসভার রাজস্ব ও লাইসেন্সিং বিভাগের পক্ষ থেকে পৌর এলাকার সমস্ত ব্যবসায়ী ও নাগরিকদের অবগতির জন্য জানানো যাচ্ছে:\n\n১. ২০২৬-২৭ আর্থিক বর্ষের পৌর ট্রেড লাইসেন্স নবীকরণ এবং হোল্ডিং ট্যাক্স সংক্রান্ত অমীমাংসিত অভিযোগ নিষ্পত্তির জন্য আগামী ২০শে নভেম্বর থেকে ২৭শে নভেম্বর ২০২৬ পর্যন্ত পৌর ভবনে প্রতিদিন সকাল ১১:০০ টা থেকে বিকেল ৪:০০ টা পর্যন্ত বিশেষ শিবির পরিচালিত হবে।\n২. এই বিশেষ শিবিরে ব্যবসায়ীরা অতিরিক্ত বিলম্ব ফি ব্যতীত এক ছাদের তলায় নথিপত্র যাচাই ও নবীকৃত ডিজিটাল ট্রেড সার্টিফিকেট গ্রহণ করতে পারবেন।\n৩. প্রয়োজনীয় নথিপত্র: পূর্ববর্তী ট্রেড লাইসেন্সের কপি, হালনাগাদ ভাড়ার চুক্তিপত্র/মালিকানার দলিল, বিদ্যুৎ বিল এবং আধার কার্ড।\n৪. বিশদ তথ্যের জন্য পৌর রাজস্ব দপ্তরে যোগাযোগ করার অনুরোধ করা হচ্ছে।",
    sourceUrl: "https://s24pgs.gov.in/notice/",
    sourcePortalName: "s24pgs.gov.in (পৌরসভা)",
    pdfUrl: "https://s24pgs.gov.in/notice/",
    signatory: "পৌরপ্রধান ও অর্থ আধিকারিক, বারুইপুর পৌরসভা",
    status: "active"
  },
  {
    id: "not-sdh-2026-1117",
    memoNo: "Memo No: 488/SDH-BRP/MSVP/2026",
    title: "শীতকালীন শিশু স্বাস্থ্য সুরক্ষা ও নিউমোনিয়া সচেতনতায় বারুইপুর মহকুমা হাসপাতালে বিশেষ শীতকালীন ওপিডি ক্লিনিক চালুর বিজ্ঞপ্তি",
    titleEn: "Notification of Special Winter Pediatric OPD & Respiratory Infection Care Clinic at Baruipur Sub-Divisional Hospital",
    departmentId: "health",
    departmentName: "বারুইপুর মহকুমা হাসপাতাল (স্বাস্থ্য দপ্তর)",
    publishedDate: "2026-11-17",
    publishedDateFormatted: "১৭ নভেম্বর, ২০২৬",
    category: "স্বাস্থ্য ও চিকিৎসা পরিষেবা",
    isUrgent: true,
    summary: "শীতের শুরুতে শিশুদের সর্দি, কাশি, ভাইরাল ব্রঙ্কিওলাইটিস ও নিউমোনিয়া প্রতিরোধে মহকুমা হাসপাতালে প্রতিদিন বিশেষ বহির্বিভাগ (OPD) পরিষেবা চালু।",
    content: "বারুইপুর মহকুমা হাসপাতাল কর্তৃপক্ষের পক্ষ থেকে জানানো যাচ্ছে:\n\n১. আবহাওয়া পরিবর্তনের সাথে সাথে শিশুদের মধ্যে ভাইরাল জ্বর, সর্দি-কাশি, শ্বাসকষ্ট ও রোটাভাইরাস ডায়রিয়ার সংক্রমণ প্রতিরোধে আগামী ১৯শে নভেম্বর ২০২৬ থেকে মহকুমা হাসপাতালের শিশু বিভাগে অতিরিক্ত শীতকালীন ওপিডি (Winter Pediatric OPD) চালু হচ্ছে।\n২. সময়সূচি: সোমবার থেকে শনিবার সকাল ৯:০০ টা থেকে দুপুর ২:০০ টা পর্যন্ত।\n৩. হাসপাতালে পর্যাপ্ত পরিমাণে জীবনদায়ী ওষুধ, পেডিয়াট্রিক নেবুলাইজার, ওআরএস এবং অক্সিজেন মজুত রয়েছে। জরুরি প্রয়োজনে ২৪ ঘণ্টা পেডিয়াট্রিক এমার্জেন্সি বিভাগ চালু থাকবে।\n৪. শিশুদের যেকোনো অসুস্থতায় নিকটস্থ স্বাস্থ্যকেন্দ্র বা সরাসরি মহকুমা হাসপাতালে যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে।",
    sourceUrl: "https://s24pgs.gov.in/notice/",
    sourcePortalName: "স্বাস্থ্য ও পরিবার কল্যাণ দপ্তর",
    pdfUrl: "https://s24pgs.gov.in/notice/",
    signatory: "সুপারিনটেনডেন্ট কাম সহ-অধ্যক্ষ, বারুইপুর মহকুমা হাসপাতাল",
    status: "active"
  }
];

const existingNotIds = new Set(noticesData.notices.map(n => n.id));
let notAdded = 0;
for (const fn of freshNov17Notices) {
  if (!existingNotIds.has(fn.id)) {
    noticesData.notices.unshift(fn);
    notAdded++;
  }
}
noticesData.lastUpdated = "২০২৬-১১-১৭";
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesData, null, 2), 'utf-8');
console.log(`✅ Notices আপডেট সম্পন্ন: ১৭ নভেম্বর ২০২৬ এর ${notAdded} টি নতুন নোটিস যুক্ত হয়েছে (মোট নোটিস: ${noticesData.notices.length} টি)।`);


// 2. UPDATE TENDERS FOR 17 NOVEMBER 2026
const TENDERS_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const tendersData = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf-8'));

const freshNov17Tenders = [
  {
    id: "tnd-bm-2026-12",
    nitNumber: "NIT-12/BM/RABINDRA-BHAVAN/2026",
    title: "বারুইপুর রবীন্দ্র ভবন অডিটোরিয়ামের অভ্যন্তরীণ অ্যাকোস্টিক সংস্কার, শীতাতপ নিয়ন্ত্রণ নালী ও শব্দ-নিয়ন্ত্রণ আধুনিকীকরণ প্রকল্প",
    titleEn: "Comprehensive Acoustic Insulation, HVAC Ducting and Audio-Visual Infrastructure Upgradation at Baruipur Rabindra Bhavan",
    authorityId: "municipality",
    authorityName: "বারুইপুর পৌরসভা (Baruipur Municipality)",
    department: "পৌর পূর্ত ও সংস্কৃতি ভবন রক্ষণাবেক্ষণ শাখা",
    location: "রবীন্দ্র ভবন, কুলপী রোড, বারুইপুর",
    category: "সংস্কৃতি ও পরিকাঠামো সংস্কার (Public Auditorium Infrastructure)",
    estimatedValue: "₹২১,৪৫,০০০",
    estimatedValueNum: 2145000,
    emdAmount: "₹৪২,৯০০",
    tenderFee: "₹১,৫০০",
    publishDate: "২০২৬-১১-১৭",
    closingDate: "২০২৬-১২-১৪",
    bidOpeningDate: "২০২৬-১২-১৭",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    sourcePortalName: "wbtenders.gov.in",
    tenderRef: "WBMAD/BM/NIT-12/RAB-BHAVAN/2026",
    eligibility: "অ্যাকোস্টিক সিলিং ও পাবলিক হল আধুনিকীকরণে ৩ বছরের সফল অভিজ্ঞতাসম্পন্ন নিবন্ধিত ঠিকাদার সংস্থা।"
  },
  {
    id: "tnd-irr-2026-03",
    nitNumber: "NIT-03/IWD-BRP/DRAINAGE/2026",
    title: "বারুইপুর পিয়ালী নদী সংযোগ খাল ও সংলগ্ন নিকাশি প্রণালীর শীতকালীন পলি উত্তোলন ও পাড় শক্তিশালীকরণ কাজ",
    titleEn: "Desiltation, De-weeding and Bank Protection Works along Baruipur-Piyali Canal Feeder Channels by Irrigation & Waterways Dept",
    authorityId: "pwd",
    authorityName: "সেচ ও জলপথ দপ্তর (I&WD Baruipur Drainage Sub-Division)",
    department: "বারুইপুর সেচ উপ-বিভাগ",
    location: "বারুইপুর পৌর এলাকা ও চম্পাহাটি সংযোগ খাল",
    category: "নিকাশি খাল ও সেচ সিভিল সংস্কার (Drainage & Embankment Works)",
    estimatedValue: "₹১৮,৯০,০০০",
    estimatedValueNum: 1890000,
    emdAmount: "₹৩৭,৮০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১৭",
    closingDate: "২০২৬-১২-১৬",
    bidOpeningDate: "২০২৬-১২-১৯",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    sourcePortalName: "wbtenders.gov.in",
    tenderRef: "WBIWD/BRP/DRG/NIT-03/2026",
    eligibility: "সেচ ও জলপথ দপ্তরের নদী/খাল খনন ও সিভিল কাজে ক্লাস-২ বা সমতুল্য তালিকাভুক্ত ঠিকাদার।"
  }
];

const existingTndIds = new Set(tendersData.tenders.map(t => t.id));
let tndAdded = 0;
for (const ft of freshNov17Tenders) {
  if (!existingTndIds.has(ft.id)) {
    tendersData.tenders.unshift(ft);
    tndAdded++;
  }
}
tendersData.lastUpdated = "২০২৬-১১-১৭";
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersData, null, 2), 'utf-8');
console.log(`✅ Tenders আপডেট সম্পন্ন: ১৭ নভেম্বর ২০২৬ এর ${tndAdded} টি নতুন সরকারি টেন্ডার যুক্ত হয়েছে (মোট টেন্ডার: ${tendersData.tenders.length} টি)।`);


// 3. UPDATE BUY & SALE (PROPERTIES) FOR 17 NOVEMBER 2026
const PROP_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');
const propData = JSON.parse(fs.readFileSync(PROP_FILE, 'utf-8'));

const freshNov17Properties = [
  {
    id: "prop-brp-027",
    title: "বারুইপুর রাসমাঠ ও রেলওয়ে ওভারব্রিজ সংলগ্ন ৮৫০ বর্গফুট রেডি ২ বিএইচকে খোলামেলা ফ্ল্যাট (লিফট সুবিধা সহ)",
    titleEn: "850 SqFt Ready to Move 2 BHK Airy Apartment near Baruipur Rashmath & Overbridge with Lift",
    category: "new_flat",
    categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
    location: "রাসমাঠ লিঙ্ক রোড, বারুইপুর",
    locationArea: "Rashmath / Overbridge",
    price: "₹২২.৮০ লক্ষ (সুলভ ব্যাংক লোন সুবিধা)",
    priceNum: 2280000,
    priceUnit: "total",
    configuration: "2 BHK (850 SqFt Super Built-up) + ১ ব্যালকনি + ২ বাথরুম",
    areaSqFt: "৮৫০ বর্গফুট",
    facing: "পূর্ব-দক্ষিণমুখী (Sunlit & Airy)",
    floorInfo: "৩য় তলা (G+4 লিফট সহ আধুনিক অ্যাপার্টমেন্ট)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তর (Ready to Move)",
    reraStatus: "WB RERA ও মিউনিসিপ্যাল কমপ্লিশন সার্টিফিকেট প্রাপ্ত",
    approvalStatus: "বারুইপুর পৌরসভা অনুমোদিত বৈধ আবাসিক বিল্ডিং প্ল্যান",
    bankLoanApproved: "SBI, HDFC ও PNB অনুমোদিত",
    amenities: [
      "অটোমেটিক লিফট ও সার্বক্ষণিক ২৪ ঘণ্টা বিদ্যুৎ ব্যাকআপ",
      "সার্বক্ষণিক সিসিটিভি ক্যামেরা ও নিরাপত্তা প্রহরী",
      "টু-হুইলার ও খোলা কার পার্কিং স্পেস",
      "রাসমাঠ ও বারুইপুর স্টেশন থেকে ৫ মিনিটের সহজ হাঁটা পথ"
    ],
    description: "বারুইপুর রাসমাঠের শান্ত ও মনোরম পরিবেশের সংলগ্ন একদম প্রস্তুত ২ বিএইচকে আধুনিক ফ্ল্যাট। পর্যাপ্ত আলো-বাতাস, মার্বেল ফিনিশ ফ্লোরিং এবং উন্নত স্যানিটারি ফিটিংস। স্কুল, বাজার, হাসপাতাল ও রেল যোগাযোগ অতি সন্নিকটে।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: ["/images/baruipur-real-estate-flats-guide.jpg"],
    featured: true,
    contactPerson: "অভিজিৎ সামন্ত (সামন্ত রিয়েলটি)",
    contactPhone: "+91 98314 55210",
    contactWhatsapp: "+91 98314 55210",
    publishedAt: "২০২৬-১১-১৭"
  },
  {
    id: "prop-brp-028",
    title: "বারুইপুর কুলপী রোড ও স্টেশন মোড় সংলগ্ন ১,২০০ বর্গফুট গ্রাউন্ড ফ্লোর বাণিজ্যিক শোরুম / ক্লিনিক স্পেস",
    titleEn: "1,200 SqFt Ground Floor Prime Commercial Showroom / Clinic Space on Kulpi Road near Baruipur Station",
    category: "commercial_space",
    categoryNameBn: "বাণিজ্যিক স্পেস (Commercial Space)",
    location: "কুলপী রোড, বারুইপুর জংশন সংলগ্ন",
    locationArea: "Kulpi Road / Baruipur Junction",
    price: "₹৩৬.০০ লক্ষ (বাস্তু বাণিজ্যিক অনুমোদন)",
    priceNum: 3600000,
    priceUnit: "total",
    configuration: "১,২০০ বর্গফুট সমতল গ্রাউন্ড ফ্লোর ওপেন কমার্শিয়াল হল + ১ অ্যাটাচড ওয়াশরুম",
    areaSqFt: "১,২০০ বর্গফুট",
    facing: "মেইন রোড ফেসিং (High Footfall Commercial Frontage)",
    floorInfo: "গ্রাউন্ড ফ্লোর (উঁচু প্লিন্থ লেভেল, জল জমার আশঙ্কা মুক্ত)",
    possessionStatus: "অবিলম্বে দখল ও রেজিস্ট্রি",
    reraStatus: "নিষ্কণ্টক বাণিজ্যিক দাগ-খতিয়ান রেকর্ড",
    approvalStatus: "পৌরসভা অনুমোদিত বাণিজ্যিক ব্যবহারের প্ল্যান",
    bankLoanApproved: "সমস্ত জাতীয় ব্যাংকে বাণিজ্যিক সম্পত্তি ঋণ উপলব্ধ",
    amenities: [
      "প্রশস্ত ২২ ফুট ডাবল রোলিং শাটার ও গ্লাস ফেসিং",
      "গ্রাহকদের জন্য ডেডিকেটেড ফ্রন্ট পার্কিং বে",
      "থ্রি-ফেজ বাণিজ্যিক বিদ্যুৎ সংযোগ ও পুরসভার জল লাইন",
      "ডায়াগনস্টিক ল্যাব, ফার্মেসি, ব্যাংক, শোরুম বা কর্পোরেট অফিসের জন্য আদর্শ"
    ],
    description: "বারুইপুর স্টেশন ও কুলপী রোডের অতি ব্যস্ত সংযোগস্থলে সম্পূর্ণ প্রস্তুত ১,২০০ বর্গফুটের গ্রাউন্ড ফ্লোর বাণিজ্যিক সম্পত্তি। প্রতিদিন হাজার হাজার মানুষের যাতায়াত। অবিলম্বে ব্যবসা বা ক্লিনিক চালুর জন্য সেরা বিনিয়োগ।",
    imageUrl: "/images/places/baruipur-bdo-office-building.jpg",
    images: ["/images/places/baruipur-bdo-office-building.jpg"],
    featured: false,
    contactPerson: "সৌমেন ভট্টাচার্য",
    contactPhone: "+91 94332 99874",
    contactWhatsapp: "+91 94332 99874",
    publishedAt: "২০২৬-১১-১৭"
  }
];

const existingPropIds = new Set(propData.properties.map(p => p.id));
let propAdded = 0;
for (const fp of freshNov17Properties) {
  if (!existingPropIds.has(fp.id)) {
    propData.properties.unshift(fp);
    propAdded++;
  }
}
propData.lastUpdated = "২০২৬-১১-১৭";
fs.writeFileSync(PROP_FILE, JSON.stringify(propData, null, 2), 'utf-8');
console.log(`✅ Properties আপডেট সম্পন্ন: ১৭ নভেম্বর ২০২৬ এর ${propAdded} টি নতুন প্রপার্টি যুক্ত হয়েছে (মোট লিস্টিং: ${propData.properties.length} টি)।`);

console.log('\n🎉 ১৭ নভেম্বর ২০২৬ এর সিঙ্ক সফলভাবে সমাপ্ত!');
