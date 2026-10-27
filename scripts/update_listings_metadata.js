const fs = require('fs');
const path = require('path');

// 1. Update src/app/places/[slug]/page.tsx
const placesPagePath = path.join(__dirname, '../src/app/places/[slug]/page.tsx');
let placesPageContent = fs.readFileSync(placesPagePath, 'utf8');

const oldPlacesTarget = `  const canonicalUrl = \`https://baruipur.online/places/\${place.slug}/\`;
  const title = place.metaTitle || \`\${place.nameBn} (\${place.nameEn}) - বারুইপুর\`;
  const rawDesc = place.metaDescription || place.overview;
  const description = rawDesc.length > 155 ? rawDesc.slice(0, 152) + '...' : rawDesc;`;

const newPlacesReplacement = `  const bilingualName = formatBilingualLocation(place.nameBn, place.nameEn);
  const canonicalUrl = \`https://baruipur.online/places/\${place.slug}/\`;
  const title = \`\${bilingualName} | ইতিহাস, নাগরিক তথ্য ও গাইড\`;
  const rawDesc = \`\${bilingualName}: ঠিকানা, যোগাযোগ, ইতিহাস, নাগরিক পরিষেবা ও প্রশাসনিক সম্পূর্ণ তথ্য নির্দেশিকা।\`;
  const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;`;

// Normalize line endings for replacement
const normalizeLineEndings = (str) => str.replace(/\r\n/g, '\n');
const isCrlf = placesPageContent.includes('\r\n');

let normalizedPlaces = normalizeLineEndings(placesPageContent);
if (normalizedPlaces.includes(oldPlacesTarget)) {
  normalizedPlaces = normalizedPlaces.replace(oldPlacesTarget, newPlacesReplacement);
  normalizedPlaces = normalizedPlaces.replace(
    `alt: place.nameBn.length > 95 ? place.nameBn.slice(0, 92) + '...' : place.nameBn`,
    `alt: bilingualName`
  );
  fs.writeFileSync(placesPagePath, isCrlf ? normalizedPlaces.replace(/\n/g, '\r\n') : normalizedPlaces, 'utf8');
  console.log('✓ Updated src/app/places/[slug]/page.tsx generateMetadata');
} else {
  console.log('Places target not matched directly, checking if already updated or line ending mismatch');
}

// 2. Clean healthcare_data.json nameBn and nameEn
const healthcarePath = path.join(__dirname, '../src/data/healthcare_data.json');
const healthcareRaw = fs.readFileSync(healthcarePath, 'utf8');
const healthcareData = JSON.parse(healthcareRaw);
const facilities = healthcareData.facilities || healthcareData;

const cleanFacilitiesMap = {
  'star-medical-centre-baruipur': {
    nameBn: 'স্টার মেডিক্যাল ক্লিনিক',
    nameEn: 'Star Medical Clinic'
  },
  'kabita-sebayatan-baruipur': {
    nameBn: 'কবিতা সেবায়তন',
    nameEn: 'Kabita Sebayatan Doctors Chamber & Diagnostic Centre'
  },
  'apollo-clinic-baruipur': {
    nameBn: 'অ্যাপোলো ক্লিনিক',
    nameEn: 'Apollo Clinic'
  },
  'namita-sebayatan-baruipur': {
    nameBn: 'নমিতা সেবায়তন',
    nameEn: 'Namita Sebayatan Doctors Chamber & Polyclinic'
  },
  'mangaldeep-puratan-bazar-baruipur': {
    nameBn: 'মঙ্গলদীপ ফার্মেসী ও ডক্টরস চেম্বার',
    nameEn: 'Mangal Deep Pharmacy & Doctors Chamber'
  },
  'hai-medical-centre-baruipur': {
    nameBn: 'হাই মেডিকেল সেন্টার',
    nameEn: 'Hai Medical Centre'
  },
  'easycure-clinic-and-pharmacy-baruipur': {
    nameBn: 'ইজিকিওর ক্লিনিক ও ফার্মেসী',
    nameEn: 'Easycure Clinic & Pharmacy'
  },
  'jito-health-sastasundar-baruipur': {
    nameBn: 'জিতো হেলথ',
    nameEn: 'JITO Health (SastaSundar)'
  },
  'shatabdi-diagnostic-pvt-ltd-baruipur': {
    nameBn: 'শতাব্দী ডায়াগনস্টিক প্রাইভেট লিমিটেড',
    nameEn: 'Shatabdi Diagnostic Pvt. Ltd.'
  },
  'metropolis-diagnostic-baruipur': {
    nameBn: 'মেট্রোপলিস ডায়াগনস্টিক',
    nameEn: 'Metropolis Labs Diagnostic Centre'
  },
  'life-zone-nursing-home-baruipur': {
    nameBn: 'লাইফ জোন নার্সিং হোম ও ডায়াগনস্টিক',
    nameEn: 'Life Zone Nursing Home & Diagnostic'
  },
  'kalyan-medical-center-baruipur': {
    nameBn: 'কল্যাণ মেডিকেল সেন্টার',
    nameEn: 'Kalyan Medical Center'
  },
  'the-panacea-diagnostics-centre-baruipur': {
    nameBn: 'দ্য প্যানাসিয়া ডায়াগনস্টিকস সেন্টার',
    nameEn: 'The Panacea Diagnostics Centre'
  },
  'accuhealth-diagnostics-baruipur': {
    nameBn: 'অ্যাকিউহেলথ ডায়াগনস্টিকস',
    nameEn: 'AccuHealth Diagnostics'
  },
  'oval-healthcare-services-baruipur': {
    nameBn: 'ওভাল হেলথকেয়ার সার্ভিসেস',
    nameEn: 'Oval Healthcare Services'
  },
  'tulip-polyclinic-baruipur': {
    nameBn: 'টিউলিপ পলিক্লিনিক',
    nameEn: 'Tulip Polyclinic'
  },
  'mahendra-clinic-baruipur': {
    nameBn: 'মহেন্দ্র ক্লিনিক',
    nameEn: 'Mahendra Clinic'
  },
  'baruipur-subdivisional-hospital-opd': {
    nameBn: 'বারুইপুর মহকুমা হাসপাতাল',
    nameEn: 'Baruipur Subdivisional Hospital (Govt OPD)'
  }
};

facilities.forEach(fac => {
  if (cleanFacilitiesMap[fac.slug]) {
    fac.nameBn = cleanFacilitiesMap[fac.slug].nameBn;
    fac.nameEn = cleanFacilitiesMap[fac.slug].nameEn;
  } else {
    // Strip parenthetical English from nameBn if any
    fac.nameBn = fac.nameBn.replace(/\s*\([A-Za-z0-9\s.,&|'’\-\[\]\+\/]+.*?\)\s*/g, ' ').trim();
    // Strip trailing Baruipur if in nameEn
    fac.nameEn = fac.nameEn.replace(/[\s,\-]+Baruipur\s*$/i, '').trim();
  }
});

fs.writeFileSync(healthcarePath, JSON.stringify(healthcareData, null, 2), 'utf8');
console.log('✓ Cleaned nameBn and nameEn in healthcare_data.json');

// 3. Update organizations_data.json metaTitle & metaDescription
const orgsPath = path.join(__dirname, '../src/data/organizations_data.json');
const orgsRaw = fs.readFileSync(orgsPath, 'utf8');
const orgsData = JSON.parse(orgsRaw);
const orgList = orgsData.organizations || orgsData;

function formatOrgBilingual(bn, en) {
  let cBn = bn.replace(/\s*\([A-Za-z0-9\s.,&|'’\-\[\]\+\/]+.*?\)\s*/g, ' ')
              .replace(/\s*\(আইনজীবী সমিতি\)\s*/g, ' ')
              .replace(/[\s,\-]+বারুইপুর\s*$/, '')
              .trim();
  let cEn = en.replace(/[\s,\-]+Baruipur\s*$/i, '').trim();
  return `${cBn}, বারুইপুর (${cEn}, Baruipur)`;
}

orgList.forEach(org => {
  const bilingual = formatOrgBilingual(org.nameBn, org.nameEn);
  org.metaTitle = `${bilingual} | ইতিহাস, সমাজসেবা ও যোগাযোগের তথ্য`;
  const rawDesc = `${bilingual}: ক্লাবের ইতিহাস, ক্রীড়া ও ফুটবল টুর্নামেন্ট, রক্তদান শিবির, সমাজকল্যাণমূলক কর্মকাণ্ড এবং যোগাযোগের সম্পূর্ণ তথ্য।`;
  org.metaDescription = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
});

fs.writeFileSync(orgsPath, JSON.stringify(orgsData, null, 2), 'utf8');
console.log('✓ Updated metaTitle and metaDescription in organizations_data.json');

// 4. Update places_data.json metaTitle & metaDescription
const placesPath = path.join(__dirname, '../src/data/places_data.json');
const placesRaw = fs.readFileSync(placesPath, 'utf8');
const placesData = JSON.parse(placesRaw);
const placeList = placesData.places || placesData;

function formatPlaceBilingual(bn, en) {
  let cBn = bn
    .replace(/\s*\([A-Za-z0-9\s.,&|'’\-\[\]\+\/]+.*?\)\s*/g, ' ')
    .replace(/\s*\(পূর্বে.*?\)\s*/g, ' ')
    .replace(/\s*\(সরকারি বহির্বিভাগ.*?\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর জেল\)\s*/g, ' ')
    .replace(/\s*\(পশ্চিমবঙ্গ টেলি একাডেমি\)\s*/g, ' ')
    .replace(/\s*\(সমষ্টি উন্নয়ন আধিকারিকের করণ\)\s*/g, ' ')
    .replace(/\s*\(এসডিও অফিস\)\s*/g, ' ')
    .replace(/\s*\(শহর সাধারণ পাঠাগার\)\s*/g, ' ')
    .replace(/\s*\(সাবর্ণ রায়চৌধুরী জমিদার বাড়ি\)\s*/g, ' ')
    .replace(/\s*\(কোদালিয়া\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর কোর্ট\)\s*/g, ' ')
    .replace(/\s*\(শ্রী শ্রী রামকৃষ্ণ বিবেকানন্দ মন্দির\)\s*/g, ' ')
    .replace(/\s*\(শ্রী শ্রী রক্ষা কালী মন্দির\)\s*/g, ' ')
    .replace(/[\s,\-]+বারুইপুর\s*$/, '')
    .trim();
  let cEn = en.replace(/[\s,\-]+Baruipur\s*$/i, '').trim();
  return `${cBn}, বারুইপুর (${cEn}, Baruipur)`;
}

placeList.forEach(p => {
  const bilingual = formatPlaceBilingual(p.nameBn, p.nameEn);
  p.metaTitle = `${bilingual} | ইতিহাস, নাগরিক তথ্য ও গাইড`;
  const rawDesc = `${bilingual}: ঠিকানা, যোগাযোগ, ইতিহাস, নাগরিক পরিষেবা ও প্রশাসনিক সম্পূর্ণ তথ্য নির্দেশিকা।`;
  p.metaDescription = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
});

fs.writeFileSync(placesPath, JSON.stringify(placesData, null, 2), 'utf8');
console.log('✓ Updated metaTitle and metaDescription in places_data.json');

// 5. Update restaurant guide in news_data.json
const newsPath = path.join(__dirname, '../src/data/news_data.json');
const newsRaw = fs.readFileSync(newsPath, 'utf8');
const newsData = JSON.parse(newsRaw);

const restGuide = newsData.articles.find(a => a.slug === 'best-restaurants-in-baruipur-family-dining-biryani-guide');
if (restGuide) {
  restGuide.summary = 'বারুইপুরের শীর্ষ ২০টি সেরা রেস্তোরাঁ ও ফ্যামিলি ডাইনিং পূর্ণাঙ্গ গাইড: ভূকেমন, বারুইপুর (Bhookemon, Baruipur), দ্য সিলভার স্পুন, বারুইপুর (The Silver Spoon, Baruipur), দ্য ওয়ান, বারুইপুর (The One, Baruipur), আসমা ধাবা, বারুইপুর (Asma Dhaba, Baruipur), বেডউইন, বারুইপুর (Bedouin, Baruipur), কেএফসি, বারুইপুর (KFC, Baruipur) সহ গুগল রেটিং, রিভিউ, ম্যাপ লিংক, ফোন ও সিগনেচার ডিশ।';
  fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2), 'utf8');
  console.log('✓ Updated restaurant guide summary in news_data.json');
}
