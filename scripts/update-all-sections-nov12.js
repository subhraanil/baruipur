const fs = require('fs');
const path = require('path');

// 1. UPDATE PROPERTIES DATA (BUY & SALE)
const PROP_FILE = path.join(__dirname, '..', 'src', 'data', 'properties_data.json');
const propDb = JSON.parse(fs.readFileSync(PROP_FILE, 'utf-8'));

const newProperties = [
  {
    id: "prop-brp-015",
    title: "পদ্মপুকুর ক্রসিং ও বাইপাস সংযোগে 'সবুজ সাথী গ্রিনস' ২ ও ৩ বিএইচকে রেডি ফ্ল্যাট বিক্রয়",
    titleEn: "Sabuj Sathi Greens 2 & 3 BHK Ready-to-Move Flats at Padmapukur Crossing, Baruipur",
    category: "new_flat",
    categoryNameBn: "নতুন ফ্ল্যাট (New Flat)",
    location: "পদ্মপুকুর মোড়, বারুইপুর বাইপাস রোড",
    locationArea: "Padmapukur More",
    price: "₹২৬.৫০ লক্ষ (২ বিএইচকে) থেকে শুরু",
    priceNum: 2650000,
    priceUnit: "total",
    configuration: "2 BHK (910 SqFt) & 3 BHK (1220 SqFt)",
    areaSqFt: "৯১০ - ১,২২০ বর্গফুট সুপার বিল্ট-আপ",
    facing: "দক্ষিণ ও পূর্বমুখী (South / East Open)",
    floorInfo: "২য়, ৩য় ও ৪র্থ তলা উপলব্ধ (G+4 প্রকল্প)",
    possessionStatus: "রেডি টু মুভ (Immediate Possession)",
    reraStatus: "WBRERA নিবন্ধিত (রেজিস্ট্রেশন ও সিসি প্রাপ্ত)",
    approvalStatus: "বারুইপুর পৌরসভা প্ল্যান অনুমোদিত",
    bankLoanApproved: "SBI, HDFC, ICICI ও Axis ব্যাংক থেকে ৯০% লোন অনুমোদিত",
    amenities: [
      "অটোমেটিক লিফট ও ২৪ ঘণ্টা জেনারেটর ব্যাকআপ",
      "২৪x৭ সিসিটিভি সিকিউরিটি ও ইন্টারকম সুবিধা",
      "রুফটপ কমিউনিটি লাউঞ্জ ও গার্ডেন",
      "কভার্ড টু-হুইলার ও ফোর-হুইলার পার্কিং"
    ],
    description: "পদ্মপুকুর মোড় থেকে মাত্র ২ মিনিটের হাঁটা দূরত্বে অত্যাধুনিক গেটেড আবাসনে রেডি ফ্ল্যাট। স্টেশন ও বাইপাসের দারুণ যোগাযোগ ব্যবস্থা। সম্পূর্ণ আইনি ক্লিয়ারেন্স ও সিসি সহ প্রস্তুত।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: ["/images/baruipur-real-estate-flats-guide.jpg"],
    featured: true,
    contactPerson: "সবুজ সাথী প্রপার্টি সেলস ডেস্ক",
    contactPhone: "+91 98304 11223",
    contactWhatsapp: "+91 98304 11223",
    publishedAt: "২০২৬-১১-১২"
  },
  {
    id: "prop-brp-016",
    title: "ধপধপি ও কুলপি রোড সংযোগে ১২ ফুট ঢালাই রাস্তার ধারে ৪ কাঠা সলিড বাস্তু প্লট বিক্রয়",
    titleEn: "4 Cottah Solid Bastu Plot on 12ft Concrete Road near Dhapdhapi & Kulpi Road Link",
    category: "land_plot",
    categoryNameBn: "বাস্তু জমি ও প্লট (Land & Plot)",
    location: "ধপধপি রোড, কুলপি রোড সংলগ্ন, বারুইপুর",
    locationArea: "Dhapdhapi Road",
    price: "₹১৫.২০ লক্ষ (₹৩.৮০ লক্ষ প্রতি কাঠা)",
    priceNum: 1520000,
    priceUnit: "total",
    configuration: "৪ কাঠা বাস্তু জমি (উঁচু জমি)",
    areaSqFt: "২,৮৮০ বর্গফুট (৪ কাঠা)",
    facing: "পূর্বমুখী (East Facing)",
    floorInfo: "খালি সলিড জমি (বাঁধানো রাস্তার ধারে)",
    possessionStatus: "তাৎক্ষণিক রেজিস্ট্রেশন ও দখলযোগ্য",
    reraStatus: "ব্লিএলআরও (BL&LRO) পর্চা ও মিউটেশন কমপ্লিট",
    approvalStatus: "১০০% নিষ্কণ্টক বাস্তু শ্রেণীভুক্ত জমি",
    bankLoanApproved: "প্লট লোনের জন্য সমস্ত আইনি দলিল প্রস্তুত",
    amenities: [
      "১২ ফুট চওড়া কংক্রিট অ্যাক্সেস রোড",
      "জমির সামনেই বিদ্যুৎ ও পানীয় জলের লাইন",
      "কুলপি রোড থেকে মাত্র ৩০০ মিটার দূরত্ব",
      "আশেপাশে ঘন বসতি, স্কুল ও বাজার"
    ],
    description: "অবিলম্বে বাড়ি তৈরির উপযোগী উঁচু বাস্তু জমি। ২ কাঠা বা সম্পূর্ণ ৪ কাঠা একসাথে কেনার সুযোগ। বিএলএলআরও মিউটেশন ও খাজনা সম্পূর্ণ আপডেটেড।",
    imageUrl: "/images/baruipur-land-plot-sale.jpg",
    images: ["/images/baruipur-land-plot-sale.jpg"],
    featured: true,
    contactPerson: "সৌমেন হালদার",
    contactPhone: "+91 98316 44556",
    contactWhatsapp: "+91 98316 44556",
    publishedAt: "২০২৬-১১-১২"
  },
  {
    id: "prop-brp-017",
    title: "বারুইপুর স্টেশন রোড ও কাছারি বাজারে ৬৫০ বর্গফুট গ্রাউন্ড ফ্লোর বাণিজ্যিক দোকান ও অফিস স্পেস",
    titleEn: "650 SqFt Ground Floor Commercial Shop & Office Space at Baruipur Station Road & Kanchari Bazar",
    category: "commercial",
    categoryNameBn: "বাণিজ্যিক দোকান ও অফিস (Commercial Space)",
    location: "স্টেশন রোড ও কাছারি বাজার মোড়, বারুইপুর",
    locationArea: "Station Road",
    price: "₹৪২.০০ লক্ষ (মাসিক ভাড়ার উচ্চ সম্ভাবনা)",
    priceNum: 4200000,
    priceUnit: "total",
    configuration: "Commercial Showroom / Clinic / Bank Office",
    areaSqFt: "৬৫০ বর্গফুট কার্পেট এরিয়া",
    facing: "মেইন রোড ফেসিং (Main Road Frontage)",
    floorInfo: "গ্রাউন্ড ফ্লোর (রোলিং শাটার ও গ্লাস ডোর সহ)",
    possessionStatus: "তাৎক্ষণিক হস্তান্তরযোগ্য",
    reraStatus: "বাণিজ্যিক কর্পোরেশন/পৌর ট্রেড অ্যাসেসমেন্ট যুক্ত",
    approvalStatus: "পৌরসভা বাণিজ্যিক বিল্ডিং প্ল্যান অনুমোদিত",
    bankLoanApproved: "বিজনেস ও কমার্শিয়াল প্রপার্টি লোন উপলব্ধ",
    amenities: [
      "মেইন রোডের ওপর ১৫ ফুট চওড়া ফ্রন্টেজ",
      "থ্রি-ফেজ বিদ্যুৎ সংযোগ ও নিজস্ব ওয়াশরুম",
      "রেল স্টেশন থেকে মাত্র ২ মিনিট হাঁটা পথ",
      "প্যাথলজি ল্যাব, ফার্মেসি বা শো-রুমের জন্য আদর্শ"
    ],
    description: "বারুইপুরের সবচেয়ে ব্যস্ত বাণিজ্যিক কেন্দ্র কাছারি বাজার ও স্টেশন রোডের সংযোগস্থলে গ্রাউন্ড ফ্লোর দোকান/অফিস স্পেস। উচ্চ ভাড়ার আয় ও ব্যবসার জন্য সেরা ঠিকানা।",
    imageUrl: "/images/baruipur-real-estate-flats-guide.jpg",
    images: ["/images/baruipur-real-estate-flats-guide.jpg"],
    featured: false,
    contactPerson: "তাপস রায়",
    contactPhone: "+91 98301 77889",
    contactWhatsapp: "+91 98301 77889",
    publishedAt: "২০২৬-১১-১১"
  },
  {
    id: "prop-brp-018",
    title: "স্টেট ব্যাংক অফ ইন্ডিয়া (SBI) ই-নিলাম: কল্যাণপুর এলাকায় ২ কাঠা জমিসহ দোতলা আবাসিক বাড়ি",
    titleEn: "SBI E-Auction (SARFAESI): Independent 2-Storey Residential House on 2 Cottah Land at Kalyanpur, Baruipur",
    category: "bank_auction",
    categoryNameBn: "ব্যাংক নিলাম সম্পত্তি (Bank Auction)",
    location: "কল্যাণপুর, বারুইপুর, দক্ষিণ ২৪ পরগনা",
    locationArea: "Kalyanpur",
    price: "রিজার্ভ প্রাইজ: ₹১৯.৫০ লক্ষ (সস্তায় নিলাম সুযোগ)",
    priceNum: 1950000,
    priceUnit: "total",
    configuration: "4 Bed + 2 Bath Independent House (2 Cottah)",
    areaSqFt: "১,৫০০ বর্গফুট বিল্ট-আপ (২ কাঠা জমি)",
    facing: "পশ্চিমমুখী (West Facing)",
    floorInfo: "দোতলা পাকা বাড়ি (G+1)",
    possessionStatus: "ব্যাংক সারফেইসি ফিজিক্যাল পজেশন প্রস্তুত",
    reraStatus: "SARFAESI Act 2002 অফিসিয়াল ব্যাংক নিলাম",
    approvalStatus: "SBI স্ট্রেজড অ্যাসেট রিকভারি ব্রাঞ্চ (SARB) ভেরিফায়েড",
    bankLoanApproved: "ব্যাংক অকশন সার্টিফিকেট ও সম্পূর্ণ লিগ্যাল টাইটেল হস্তান্তর",
    amenities: [
      "দোতলা সম্পূর্ণ পাকা ও রঙিন বাড়ি",
      "নিজস্ব সীমানা প্রাচীর ও গেট",
      "কল্যাণপুর স্টেশন থেকে ৫ মিনিট দূরত্ব",
      "ই-অকশন তারিখ: ২০২৬-১২-১০ (EMD ১০%)"
    ],
    description: "স্টেট ব্যাংক অফ ইন্ডিয়ার সারফেইসি অ্যাক্ট ২০০২ অনুসারে ই-নিলাম। বাজার মূল্যের চেয়ে অনেক কম দামে কল্যাণপুরে ২ কাঠা জমিসহ দোতলা বাড়ি কেনার সুবর্ণ সুযোগ।",
    imageUrl: "/images/baruipur-property-resale-house.jpg",
    images: ["/images/baruipur-property-resale-house.jpg"],
    featured: false,
    contactPerson: "এসবিআই SARB রিকভারি অফিসার (Baruipur Zone)",
    contactPhone: "+91 33 2433 1020",
    contactWhatsapp: "+91 98300 00111",
    publishedAt: "২০২৬-১১-১১"
  }
];

newProperties.forEach(p => {
  if (!propDb.properties.some(existing => existing.id === p.id)) {
    propDb.properties.unshift(p);
    console.log(`Added property: ${p.id}`);
  }
});
propDb.lastUpdated = new Date().toISOString();
fs.writeFileSync(PROP_FILE, JSON.stringify(propDb, null, 2), 'utf-8');

// 2. UPDATE TENDERS DATA
const TEND_FILE = path.join(__dirname, '..', 'src', 'data', 'tenders_data.json');
const tendDb = JSON.parse(fs.readFileSync(TEND_FILE, 'utf-8'));

const newTenders = [
  {
    id: "tnd-bm-2026-08",
    nitNumber: "NIT-08/BM/CIVIL/2026-27",
    title: "বারুইপুর পৌরসভার ৯, ১১ ও ১৬ নম্বর ওয়ার্ডে হাই-ড্রেন কভারিং, পেভার ব্লক ফুটপাথ ও আরসিসি নিকাশি নালা নির্মাণ",
    titleEn: "Construction of Covered High-Drain, Interlocking Paver Block Footpath & RCC Drainage Network in Ward No 9, 11 & 16 under Baruipur Municipality",
    authorityId: "municipality",
    authorityName: "বারুইপুর পৌরসভা",
    department: "নিকাশি ও পূর্ত প্রকৌশল শাখা",
    location: "ওয়ার্ড ৯, ১১ ও ১৬, বারুইপুর পৌরসভা",
    category: "নিকাশি ও ফুটপাথ নির্মাণ (Drainage & Civil)",
    estimatedValue: "₹৩৮,৭০,০০০",
    estimatedValueNum: 3870000,
    emdAmount: "₹৭৭,৪০০",
    tenderFee: "₹২,৫০০",
    publishDate: "২০২৬-১১-১২",
    closingDate: "২০২৬-১২-০৪",
    bidOpeningDate: "২০২৬-১২-০৭",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WBMAD/BM/NIT-08/CIVIL/2026",
    eligibility: "পুরসভা বা পিডব্লিউডি-তে কংক্রিট ড্রেন ও পেভমেন্ট নির্মাণে ন্যূনতম ৩ বছরের অভিজ্ঞতা সম্পন্ন প্রথম/দ্বিতীয় শ্রেণির ঠিকাদার।"
  },
  {
    id: "tnd-sdo-2026-06",
    nitNumber: "NIT-06/SDO/BRP/SOLAR/2026",
    title: "বারুইপুর মহকুমা দুর্যোগ ব্যবস্থাপনা সেল ও ত্রাণ গুদামাগারে ১০ কিলোওয়াট অন-গ্রিড সোলার পাওয়ার প্ল্যান্ট ও হাই-বে এলইডি স্থাপন",
    titleEn: "Installation & Commissioning of 10 kWp Grid-Connected Solar PV System and Industrial LED High-Bay Lights at SDO Relief Godown, Baruipur",
    authorityId: "sdo",
    authorityName: "মহকুমা শাসক দপ্তর, বারুইপুর",
    department: "দুর্যোগ ব্যবস্থাপনা ও পুনর্নবীকরণযোগ্য শক্তি সেল",
    location: "বারুইপুর এসডিও ত্রাণ গুদাম ভবন",
    category: "সৌর বিদ্যুৎ ও আলোকসজ্জা (Solar & Electrical)",
    estimatedValue: "₹১১,৫০,০০০",
    estimatedValueNum: 1150000,
    emdAmount: "₹২৩,০০০",
    tenderFee: "₹১,০০০",
    publishDate: "২০২৬-১১-১১",
    closingDate: "২০২৬-১২-০২",
    bidOpeningDate: "২০২৬-১২-০৪",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WB/SDO/BRP/NIT-06/SOLAR/2026",
    eligibility: "MNRE ও WBREDA অনুমোদিত সোলার সিস্টেম ইন্টিগ্রেটর ও বৈধ ইলেকট্রিক্যাল কন্ট্রাক্টর।"
  },
  {
    id: "tnd-gp-gob-2026-07",
    nitNumber: "NIT-07/DGP-GP/ROAD/2026",
    title: "দক্ষিণ গোবিন্দপুর ও নবগ্রাম গ্রাম পঞ্চায়েতের ৬টি সংসদে গ্রামীণ কংক্রিট রাস্তা ঢালাই ও আরসিসি কালভার্ট পুনর্নির্মাণ",
    titleEn: "Construction of Rigid Cement Concrete Village Roads and Box Culverts across 6 Sansads of Dakshin Gobindapur & Nabagram Gram Panchayats",
    authorityId: "panchayat",
    authorityName: "দক্ষিণ গোবিন্দপুর ও নবগ্রাম গ্রাম পঞ্চায়েত",
    department: "পঞ্চায়েত গ্রামীণ সড়ক ও পরিকাঠামো শাখা",
    location: "দক্ষিণ গোবিন্দপুর ও নবগ্রাম, বারুইপুর ব্লক",
    category: "গ্রামীণ রাস্তা ও কালভার্ট (Rural Road Works)",
    estimatedValue: "₹২৪,৩০,০০০",
    estimatedValueNum: 2430000,
    emdAmount: "₹৪৮,৬০০",
    tenderFee: "₹১,৫০০",
    publishDate: "২০২৬-১১-১১",
    closingDate: "২০২৬-১২-০৫",
    bidOpeningDate: "২০২৬-১২-০৮",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WB/GP/BRP/DGP-NBG/NIT-07/2026",
    eligibility: "পঞ্চায়েত সমিতি বা জেলা পরিষদে কংক্রিট রোড নির্মাণে নথিভুক্ত অভিজ্ঞ ঠিকাদার।"
  },
  {
    id: "tnd-wbsedcl-2026-03",
    nitNumber: "NIT-03/WBSEDCL/BRP-DIV/LT/2026",
    title: "বারুইপুর পুরাতন বাজার ও কাছারি বাজার ঘনবসতিপূর্ণ এলাকায় খোলা তারের বদলে নিরাপদ এবিসি (Aerial Bunched Cable) সংযোগ রূপান্তর",
    titleEn: "Replacement of Bare Low Tension Overhead Conductors with Insulated Aerial Bunched (AB) Cable across Baruipur Puratan Bazar & Kanchari Bazar",
    authorityId: "wbsedcl",
    authorityName: "পশ্চিমবঙ্গ বিদ্যুৎ বণ্টন কোম্পানি (WBSEDCL Baruipur)",
    department: "বারুইপুর টাউন ইলেকট্রিক সাপ্লাই ও সেফটি শাখা",
    location: "পুরাতন বাজার, কাছারি রোড ও রাসমাঠ সংলগ্ন এলাকা",
    category: "বৈদ্যুতিক সুরক্ষা ও এলটি নেটওয়ার্ক (Electrical Safety)",
    estimatedValue: "₹৩৬,৮০,০০০",
    estimatedValueNum: 3680000,
    emdAmount: "₹৭৩,৬০০",
    tenderFee: "₹২,০০০",
    publishDate: "২০২৬-১১-১২",
    closingDate: "২০২৬-১২-০৬",
    bidOpeningDate: "২০২৬-১২-০৯",
    status: "active",
    portalLink: "https://wbtenders.gov.in/nicgep/app",
    tenderRef: "WBSEDCL/BRP-DIV/NIT-03/ABC/2026",
    eligibility: "WBSEDCL-এ LT এবিসি ক্যাবল স্ট্রিংগিং ও পোল ইরেকশনের বৈধ কন্ট্রাক্টরস লাইসেন্সধারী সংস্থা।"
  }
];

newTenders.forEach(t => {
  if (!tendDb.tenders.some(existing => existing.id === t.id)) {
    tendDb.tenders.unshift(t);
    console.log(`Added tender: ${t.id}`);
  }
});
tendDb.lastUpdated = new Date().toISOString();
fs.writeFileSync(TEND_FILE, JSON.stringify(tendDb, null, 2), 'utf-8');

// 3. UPDATE IMPORTANT NOTICES DATA
const NOT_FILE = path.join(__dirname, '..', 'src', 'data', 'notices_data.json');
const notDb = JSON.parse(fs.readFileSync(NOT_FILE, 'utf-8'));

const newNotices = [
  {
    id: "not-bm-2026-1112",
    memoNo: "Memo No: 858/BM/HEALTH/2026",
    title: "শীতকালীন মশা ও ডেঙ্গু প্রতিরোধে বারুইপুর পৌরসভার ১-১৭ নং ওয়ার্ডে স্পেশাল ফগিং, ব্লিচিং ও ড্রেন সাফাই রোস্টার",
    titleEn: "Wards 1-17 Winter Anti-Dengue Larvicide Spraying, Fogging and Comprehensive Drain Desiltation Schedule under Baruipur Municipality",
    departmentId: "municipality",
    departmentName: "বারুইপুর পৌরসভা",
    publishedDate: "2026-11-12",
    publishedDateFormatted: "১২ নভেম্বর, ২০২৬",
    category: "জনস্বাস্থ্য ও ডেঙ্গু প্রতিরোধ",
    isUrgent: true,
    summary: "নভেম্বর-ডিসেম্বর মাসে মশার উপদ্রব এবং ডেঙ্গু জীবাণু ধ্বংস করতে পৌরসভার প্রতিটি ওয়ার্ডে প্রতিদিন সকাল ও সন্ধ্যায় ফগিং ও লার্ভিসাইড স্প্রে করার সময়সূচি।",
    content: `বারুইপুর পৌর এলাকার সমস্ত সম্মানিত নাগরিকবৃন্দকে জানানো যাচ্ছে যে, শীতের সূচনায় জমা জলে এডিস মশার লার্ভা বৃদ্ধি রোধ করতে পৌরসভার স্বাস্থ্য ও স্যানিটেশন বিভাগের উদ্যোগে বিশেষ অভিযান শুরু হচ্ছে:

১. **ওয়ার্ডভিত্তিক ফগিং রুটিন**: প্রতিদিন বিকাল ৪:৩০ টা হইতে সন্ধ্যা ৭:৩০ টা পর্যন্ত পৌরসভার ভেক্টর কন্ট্রোল টিম রোটেশন পদ্ধতিতে ১ থেকে ১৭ নম্বর ওয়ার্ডের অলিগলিতে থার্মাল ফগিং পরিচালনা করবে।
২. **লার্ভিসাইড ও ব্লিচিং প্রয়োগ**: সকাল ৭:০০ টা হইতে দুপুর ১২:০০ টা পর্যন্ত সমস্ত উন্মুক্ত নিকাশি নালা, নির্মীয়মাণ আবাসন এবং জলাশয়ের পাড়ে লার্ভানাশক ও ব্লিচিং পাউডার ছড়ানো হবে।
৩. **নাগরিকদের প্রতি নির্দেশ**: বাড়ির ছাদে বা উঠোনে পরিত্যক্ত টায়ার, ভাঙা পাত্র বা এসির ট্রেতে তিন দিনের বেশি জল জমতে দেবেন না। স্বাস্থ্যকর্মীরা পরিদর্শনে এলে সহযোগিতা করুন।`,
    pdfUrl: "https://baruipur.online/docs/notices/Notice_BM_Winter_Vector_Control_2026.pdf",
    pdfSize: "470 KB",
    signatory: "পৌরপ্রধান ও স্বাস্থ্য ইন-চার্জ, বারুইপুর পৌরসভা",
    status: "active"
  },
  {
    id: "not-sdo-2026-1112",
    memoNo: "Memo No: 1218/SDO/BRP/WEL/2026",
    title: "বারুইপুর মহকুমা প্রশাসনের উদ্যোগে 'স্টুডেন্ট ক্রেডিট কার্ড' ও 'যুবশ্রী' বিশেষ সহায়তা মেলা সংক্রান্ত বিজ্ঞপ্তি",
    titleEn: "Public Notice for Special Sub-Divisional Camp for West Bengal Student Credit Card & Yuvasree Assistance Scheme at Baruipur",
    departmentId: "sdo",
    departmentName: "মহকুমা শাসক দপ্তর, বারুইপুর",
    publishedDate: "2026-11-12",
    publishedDateFormatted: "১২ নভেম্বর, ২০২৬",
    category: "শিক্ষা ঋণ ও যুব কল্যাণ",
    isUrgent: false,
    summary: "আগামী ২৪ নভেম্বর বারুইপুর রবীন্দ্রভবন প্রাঙ্গণে উচ্চশিক্ষা ঋণ ও বেকার ভাতা সংক্রান্ত পেন্ডিং ফাইল নিষ্পত্তি ও নতুন আবেদন গ্রহণের মেগা ক্যাম্প।",
    content: `বারুইপুর মহকুমার সমস্ত ছাত্রছাত্রী এবং শিক্ষিত বেকার যুবক-যুবতীদের জানানো যাচ্ছে যে, পশ্চিমবঙ্গ সরকারের 'স্টুডেন্ট ক্রেডিট কার্ড' (WBSCC) এবং 'যুবশ্রী' প্রকল্পের সুবিধা দ্রুত পৌঁছে দিতে মহকুমা প্রশাসন এক বিশেষ ক্যাম্পের আয়োজন করেছে:

- **তারিখ ও সময়**: ২৪শে নভেম্বর ২০২৬ (মঙ্গলবার), সকাল ১১:০০ টা হইতে বিকাল ৪:০০ টা।
- **স্থান**: বারুইপুর রবীন্দ্রভবন ও মহকুমা শাসক দপ্তর সংলগ্ন মেলা প্রাঙ্গণ।
- **উপস্থিত থাকবে**: মহকুমা শিক্ষা সেল, লিড ডিস্ট্রিক্ট ব্যাংক ম্যানেজার (LDM) ও বিভিন্ন জাতীয়কৃত ব্যাংকের প্রতিনিধি। যাঁদের ঋণ আবেদন ব্যাংক স্তরে আটকে রয়েছে, তাঁরা মূল রসিদ সহ সরাসরি সমাধান পেতে পারবেন।`,
    pdfUrl: "https://baruipur.online/docs/notices/Notice_SDO_Student_Credit_Card_Mela_2026.pdf",
    pdfSize: "525 KB",
    signatory: "মহকুমা শাসক (SDO), বারুইপুর মহকুমা",
    status: "active"
  },
  {
    id: "not-wbse-2026-1111",
    memoNo: "Memo No: 925/WBSEDCL/BRP/SOLAR/2026",
    title: "বারুইপুরে 'পিএম সূর্য ঘর' রুফটপ সোলার ভর্তুকি প্রকল্প ও স্মার্ট নেট-মিটারিং সচেতনতা শিবিরের বিজ্ঞপ্তি",
    titleEn: "Notification for Rooftop Solar Subsidy Enrollment & Net-Metering Facilitation Camp under Baruipur Division WBSEDCL",
    departmentId: "wbsedcl",
    departmentName: "পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বণ্টন কোম্পানি",
    publishedDate: "2026-11-11",
    publishedDateFormatted: "১১ নভেম্বর, ২০২৬",
    category: "সৌর বিদ্যুৎ ও ভর্তুকি",
    isUrgent: false,
    summary: "বাড়ির ছাদে ১ থেকে ৩ কিলোওয়াট সোলার প্যানেল বসিয়ে ৭৮,০০০ টাকা পর্যন্ত সরকারি ভর্তুকি ও ফ্রি নেট-মিটারিং অনুমোদনের হেল্পডেস্ক।",
    content: `পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বণ্টন কোম্পানির (WBSEDCL) বারুইপুর ডিভিশনের সমস্ত গৃহস্থ গ্রাহকদের অবগতির জন্য জানানো যাচ্ছে:

১. পরিবেশবান্ধব সৌরবিদ্যুৎ ব্যবহার বৃদ্ধি ও মাসিক বিদ্যুৎ বিল সাশ্রয়ের লক্ষ্যে আবাসিক গ্রাহকরা ১ থেকে ৩ কিলোওয়াট পর্যন্ত রুফটপ সোলার সিস্টেমে কেন্দ্র ও রাজ্যের যৌথ ভর্তুকি লাভ করতে পারবেন।
২. অনলাইন পোর্টালে (pmsuryaghar.gov.in) রেজিস্ট্রেশন ও নেট-মিটারিং টেকনিক্যাল ফিজিবিলিটি ক্লিয়ারেন্স এখন মাত্র ৭ দিনের মধ্যে অনুমোদিত হচ্ছে।
৩. বারুইপুর সাব-ডিভিশন অফিসে প্রতি সপ্তাহে বৃহস্পতি ও শুক্রবার সকাল ১১টা থেকে দুপুর ৩টা পর্যন্ত 'সোলার হেল্পডেস্ক' চালু থাকবে। গ্রাহকরা সর্বশেষ বিদ্যুৎ বিল ও আধার কার্ড নিয়ে বিস্তারিত জানতে পারবেন।`,
    pdfUrl: "https://baruipur.online/docs/notices/Notice_WBSEDCL_Rooftop_Solar_Camp_2026.pdf",
    pdfSize: "460 KB",
    signatory: "ডিভিশনাল ম্যানেজার, বারুইপুর ডিভিশন, WBSEDCL",
    status: "active"
  },
  {
    id: "not-bpd-2026-1111",
    memoNo: "Memo No: 2178/BPD/CYBER/2026",
    title: "অনলাইন প্রতারণা, ডিজিটাল অ্যারেস্ট ভীতি ও ভুয়ো ঋণ অ্যাপ জালিয়াতি রোধে বারুইপুর সাইবার থানার জরুরি সতর্কবার্তা",
    titleEn: "Urgent Public Advisory against Digital Arrest Scams, Phishing Links and Fake Loan Apps by Baruipur Police Cyber Cell",
    departmentId: "police",
    departmentName: "বারুইপুর পুলিশ জেলা",
    publishedDate: "2026-11-11",
    publishedDateFormatted: "১১ নভেম্বর, ২০২৬",
    category: "সাইবার নিরাপত্তা ও জনসচেতনতা",
    isUrgent: true,
    summary: "ফোনে পুলিশ বা সিবিআই পরিচয় দিয়ে 'ডিজিটাল অ্যারেস্ট'-এর ভয় দেখালে বা অজানা কেওয়াইসি লিংকে ওটিপি না দেওয়ার কঠোর পুলিশি পরামর্শ।",
    content: `বারুইপুর পুলিশ জেলার সাইবার ক্রাইম সেলের পক্ষ থেকে মহকুমার সমস্ত নাগরিক, প্রবীণ পেনশনভোগী এবং তরুণদের সতর্ক করা হচ্ছে যে সাম্প্রতিক সময়ে সাইবার অপরাধীরা নতুন কৌশলে আর্থিক প্রতারণা চালাচ্ছে:

১. **ভুয়ো 'ডিজিটাল অ্যারেস্ট' (Digital Arrest) কল**: কোনো সরকারি পুলিশ, কাস্টমস, ইডি বা সিবিআই ভিডিও কলের মাধ্যমে কাউকে গ্রেপ্তার করে না এবং ব্যাংক অ্যাকাউন্ট ভেরিফিকেশনের নামে টাকা দাবি করে না। এই ধরনের ফোন এলে অবিলম্বে কেটে দিন।
২. **বিদ্যুৎ বিল বা ব্যাংক কেওয়াইসি আপডেট মেসেজ**: অচেনা মোবাইল নম্বর থেকে আসা হোয়াটসঅ্যাপ এপিকে (APK) ফাইল বা শর্ট লিংকে ক্লিক করবেন না।
৩. কোনো আর্থিক প্রতারণার শিকার হলে কালবিলম্ব না করে প্রথম ১ ঘণ্টার (Golden Hour) মধ্যে জাতীয় সাইবার হেল্পলাইন **১৯৩০ (1930)** নম্বরে কল করুন অথবা cybercrime.gov.in পোর্টালে অভিযোগ জানান, যাতে টাকাটি ফ্রিজ করা সম্ভব হয়।`,
    pdfUrl: "https://baruipur.online/docs/notices/Notice_BPD_Cyber_Safety_Advisory_2026.pdf",
    pdfSize: "510 KB",
    signatory: "পুলিশ সুপার ও সাইবার ক্রাইম সেল, বারুইপুর পুলিশ জেলা",
    status: "active"
  }
];

newNotices.forEach(n => {
  if (!notDb.notices.some(existing => existing.id === n.id)) {
    notDb.notices.unshift(n);
    console.log(`Added notice: ${n.id}`);
  }
});
notDb.lastUpdated = new Date().toISOString();
fs.writeFileSync(NOT_FILE, JSON.stringify(notDb, null, 2), 'utf-8');

console.log('✓ Successfully updated properties, tenders, and notices for Nov 12, 2026!');
