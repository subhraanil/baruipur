/**
 * Sync & Update Notices, Tenders & Property Listings (27 November 2026)
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const NOTICES_FILE = path.join(DATA_DIR, 'notices_data.json');
const TENDERS_FILE = path.join(DATA_DIR, 'tenders_data.json');
const PROPS_FILE = path.join(DATA_DIR, 'properties_data.json');

// 1. Sync Notices
const noticesDb = JSON.parse(fs.readFileSync(NOTICES_FILE, 'utf8'));
const newNotices = [
  {
    id: 'not-wb-etender-transition-2026-1127',
    memoNo: 'Memo No: 4009-FY / WB-eProc',
    departmentId: 'municipality',
    departmentName: 'পশ্চিমবঙ্গ অর্থ ও পৌর দপ্তর (WB Finance / WBMAD)',
    title: 'নতুন রাজ্য ই-টেন্ডার পোর্টাল (tenders.wb.gov.in) ব্যবহার সংক্রান্ত জরুরি বিজ্ঞপ্তি — বারুইপুর পৌরসভা ও পঞ্চায়েত ঠিকাদারদের জন্য',
    titleEn: 'Official Notice on Transition to New West Bengal e-Tender Portal (tenders.wb.gov.in)',
    category: 'টেন্ডার ও প্রশাসন',
    publishedDate: '2026-11-27',
    publishedDateFormatted: '২৭ নভেম্বর ২০২৬',
    isUrgent: true,
    summary: 'বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO) ও দক্ষিণ ২৪ পরগনা জেলা পরিষদের নতুন সমস্ত ই-টেন্ডার এখন থেকে tenders.wb.gov.in পোর্টালে প্রকাশিত হচ্ছে।',
    content: 'সংশ্লিষ্ট সকল ঠিকাদার ও সরবরাহকারী সংস্থাকে জানানো যাচ্ছে যে, পশ্চিমবঙ্গ সরকারের অর্থ দপ্তরের নির্দেশিকা (Memo No. 4009-FY) অনুযায়ী বারুইপুর পৌরসভা, ব্লক অফিস ও পূর্ত দপ্তরের নতুন সমস্ত ই-টেন্ডার (NIT) এবং বিড ডকুমেন্ট এখন থেকে নতুন পোর্টাল tenders.wb.gov.in-এ আপলোড করা হচ্ছে।',
    signatory: 'অর্থ ও প্রকল্প বিভাগ, বারুইপুর',
    sourceUrl: 'https://tenders.wb.gov.in',
    sourceName: 'tenders.wb.gov.in',
  },
  {
    id: 'not-bm-winter-sanitation-2026-1127',
    memoNo: 'Memo No: 942/BM/SAN/2026',
    departmentId: 'municipality',
    departmentName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
    title: 'বারুইপুর পৌরসভার ১ থেকে ১৭ নং ওয়ার্ডে শীতকালীন মশা নিধন, নিকাশি সাফাই ও পানীয় জল সরবরাহ পরিদর্শন সূচি',
    titleEn: 'Baruipur Municipality Ward-Wise Winter Sanitation & Water Supply Inspection Schedule',
    category: 'নাগরিক পরিষেবা',
    publishedDate: '2026-11-27',
    publishedDateFormatted: '২৭ নভেম্বর ২০২৬',
    isUrgent: false,
    summary: 'শীতের মরসুমে ডেঙ্গু প্রতিরোধ ও পরিচ্ছন্নতা বজায় রাখতে বারুইপুর পৌরসভার সকল ওয়ার্ডে বিশেষ সাফাই ও ব্লিচিং স্প্রে অভিযান শুরু হয়েছে।',
    content: 'বারুইপুর পৌরসভার নাগরিকদের অবগতির জন্য জানানো যাচ্ছে যে, প্রতিটি ওয়ার্ডে সকাল ৬:৩০ থেকে দুপুর ১২:০০ পর্যন্ত নিয়মিত আবর্জনা সংগ্রহ ও নিকাশি পরিষ্কারের কাজ চলছে। পানীয় জল সংক্রান্ত অভিযোগের জন্য পৌরসভা অফিসে যোগাযোগ করুন।',
    signatory: 'স্বাস্থ্য ও পরিচ্ছন্নতা বিভাগ, বারুইপুর পৌরসভা',
    sourceUrl: 'https://s24pgs.gov.in/notice/',
    sourceName: 's24pgs.gov.in',
  },
];

for (const n of newNotices) {
  if (!noticesDb.notices.some((x) => x.id === n.id)) {
    noticesDb.notices.unshift(n);
  }
}
fs.writeFileSync(NOTICES_FILE, JSON.stringify(noticesDb, null, 2), 'utf8');
console.log(`✓ Synced notices_data.json (Total: ${noticesDb.notices.length})`);

// 2. Sync Tenders
const tendersDb = JSON.parse(fs.readFileSync(TENDERS_FILE, 'utf8'));
const newTenders = [
  {
    id: 'ten-bm-2026-1127-drinking-water-pipeline',
    nitNumber: 'WBMAD/BM/NIT-48/2026-27',
    authorityId: 'municipality',
    authorityName: 'বারুইপুর পৌরসভা (Baruipur Municipality)',
    department: 'জল সরবরাহ ও প্রকৌশল বিভাগ, বারুইপুর পৌরসভা',
    title: 'বারুইপুর পৌরসভার ২, ৫ ও ৯ নং ওয়ার্ডে পানীয় জলের পাইপলাইন সংস্কার ও নতুন স্ট্যান্ড-পোস্ট স্থাপন প্রকল্প',
    titleEn: 'Repair of Drinking Water Pipeline and Installation of Stand-posts in Wards 2, 5 & 9 of Baruipur Municipality',
    category: 'পানীয় জল ও সিভিল ওয়ার্কস',
    location: 'ওয়ার্ড ২, ৫ ও ৯, বারুইপুর পৌরসভা এলাকা',
    estimatedValue: '₹১২,৪৫,০০০',
    emdAmount: '₹২৪,৯০০',
    publishDate: '২০২৬-১১-২৭',
    closingDate: '২০২৬-১২-২৪',
    status: 'active',
    eligibility: 'WBMAD ও PHE তালিকাভুক্ত অভিজ্ঞ সিভিল/পাইপলাইন ঠিকাদার।',
    sourceUrl: 'https://tenders.wb.gov.in',
  },
  {
    id: 'ten-pwd-2026-1127-kulpi-road-culvert',
    nitNumber: 'PWD/S24P/BRP/NIT-29/2026-27',
    authorityId: 'pwd',
    authorityName: 'পূর্ত দপ্তর (PWD Baruipur Sub-Division)',
    department: 'পশ্চিমবঙ্গ পূর্ত দপ্তর (PWD Roads)',
    title: 'কুলপি রোড ও বারুইপুর বাইপাস সংযোগকারী রাস্তার পাশে কালভার্ট মেরামতি ও বৃষ্টির জল নিষ্কাশন নালা সংস্কার',
    titleEn: 'Repair of Roadside Culverts and Storm Water Drain along Kulpi Road & Baruipur Bypass Link',
    category: 'রাস্তা ও কালভার্ট সংস্কার',
    location: 'কুলপি রোড ও পদ্মপুকুর সংলগ্ন অংশ, বারুইপুর',
    estimatedValue: '₹১৮,৯০,০০০',
    emdAmount: '₹৩৭,৮০০',
    publishDate: '২০২৬-১১-২৭',
    closingDate: '২০২৬-১২-২৬',
    status: 'active',
    eligibility: 'PWD ক্লাস-১ ও ২ সিভিল ও হাইওয়ে কন্ট্রাক্টর।',
    sourceUrl: 'https://tenders.wb.gov.in',
  },
];

for (const t of newTenders) {
  if (!tendersDb.tenders.some((x) => x.id === t.id)) {
    tendersDb.tenders.unshift(t);
  }
}
fs.writeFileSync(TENDERS_FILE, JSON.stringify(tendersDb, null, 2), 'utf8');
console.log(`✓ Synced tenders_data.json (Total: ${tendersDb.tenders.length})`);

// 3. Sync Property & Bank Auction Listings
const propDb = JSON.parse(fs.readFileSync(PROPS_FILE, 'utf8'));
const propArr = Array.isArray(propDb) ? propDb : propDb.properties;
const newProps = [
  {
    id: 'prop-brp-20261127-pnb-auction-subuddhipur',
    title: 'পাঞ্জাব ন্যাশনাল ব্যাংক (PNB) ই-নিলাম: বারুইপুর সুবুদ্ধিপুর এলাকায় ২.৫ কাঠা জমিসহ একতলা আবাসিক বাড়ি',
    titleEn: 'PNB SARFAESI E-Auction: Residential Land & 1-Storey Building (2.5 Cottah) at Subuddhipur, Baruipur',
    category: 'bank_auction',
    categoryNameBn: 'ব্যাংক নিলাম সম্পত্তি (Bank Auction)',
    location: 'সুবুদ্ধিপুর (স্টেশন রোড সংলগ্ন), বারুইপুর, দক্ষিণ ২৪ পরগনা - 700144',
    locationArea: 'Subuddhipur',
    price: 'রিজার্ভ প্রাইজ: ₹২১.৪০ লক্ষ (SARFAESI ই-নিলাম)',
    priceNum: 2140000,
    priceUnit: 'total',
    configuration: '3 Bed + 2 Bath Residential House (2.5 Cottah)',
    areaSqFt: '১,২৫০ বর্গফুট বিল্ট-আপ (২.৫ কাঠা জমি)',
    facing: 'দক্ষিণ-পূর্বমুখী',
    floorInfo: 'একতলা পাকা বাড়ি',
    possessionStatus: 'ব্যাংক ফিজিক্যাল পজেশন (ibapi.in ভেরিফায়েড)',
    reraStatus: 'SARFAESI Act 2002 অফিসিয়াল ব্যাংক নিলাম',
    approvalStatus: 'PNB সার্কেল সাস্ত্র সেন্টার (South 24 Pgs) নোটিস',
    bankLoanApproved: 'অফিশিয়াল IBAPI পোর্টাল থেকে ১০% EMD সহ বিডিং',
    amenities: [
      'বারুইপুর স্টেশন থেকে ৭ মিনিট হাঁটা পথ',
      'পাকা রাস্তা ও পৌরসভার পানীয় জল সংযোগ',
      'ই-অকশন তারিখ: ২০২৬-১২-১৮ (EMD ₹২.১৪ লক্ষ)',
    ],
    description: 'পাঞ্জাব ন্যাশনাল ব্যাংকের সারফেইসি অ্যাক্ট ২০০২ অনুসারে বারুইপুর সুবুদ্ধিপুর মৌজায় ২.৫ কাঠা বাস্তু জমিসহ একতলা বাড়ির ই-নিলাম। অফিশিয়াল সেল নোটিস ও ডকুমেন্ট ibapi.in পোর্টালে উপলব্ধ।',
    imageUrl: '/images/baruipur-property-resale-house.jpg',
    images: ['/images/baruipur-property-resale-house.jpg'],
    featured: true,
    contactPerson: 'PNB অথরাইজড অফিসার (ibapi.in)',
    contactPhone: '',
    contactWhatsapp: '',
    publishedAt: '২০২৬-১১-২৭',
  },
];

for (const np of newProps) {
  if (!propArr.some((x) => x.id === np.id)) {
    propArr.unshift(np);
  }
}
fs.writeFileSync(PROPS_FILE, JSON.stringify(propDb, null, 2), 'utf8');
console.log(`✓ Synced properties_data.json (Total: ${propArr.length})`);
