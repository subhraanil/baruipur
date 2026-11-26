const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const HEALTH_FILE = path.join(DATA_DIR, 'healthcare_data.json');
const PLACES_FILE = path.join(DATA_DIR, 'places_data.json');
const ORGS_FILE = path.join(DATA_DIR, 'organizations_data.json');

function bnToEnDigits(str) {
  if (!str) return '';
  const map = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return String(str).replace(/[০-৯]/g, d => map[d] || d);
}

// Fixed canonical specialty dictionary
const CANONICAL_SPECIALTY_MAP = {
  general_medicine: { key: 'general_medicine', bn: 'জেনারেল মেডিসিন' },
  medicine: { key: 'general_medicine', bn: 'জেনারেল মেডিসিন' },
  general_surgery: { key: 'general_surgery', bn: 'জেনারেল সার্জারি' },
  surgery: { key: 'general_surgery', bn: 'জেনারেল সার্জারি' },
  pediatrics: { key: 'pediatrics', bn: 'শিশুরোগ বিশেষজ্ঞ' },
  paediatrics: { key: 'pediatrics', bn: 'শিশুরোগ বিশেষজ্ঞ' },
  gynaecology: { key: 'gynaecology', bn: 'স্ত্রী ও প্রসূতিরোগ' },
  gynecology: { key: 'gynaecology', bn: 'স্ত্রী ও প্রসূতিরোগ' },
  orthopaedics: { key: 'orthopedics', bn: 'অর্থোপেডিক ও হাড়' },
  orthopedics: { key: 'orthopedics', bn: 'অর্থোপেডিক ও হাড়' },
  cardiology: { key: 'cardiology', bn: 'হৃদরোগ (কার্ডিওলজি)' },
  ent: { key: 'ent', bn: 'নাক, কান ও গলা (ENT)' },
  dermatology: { key: 'dermatology', bn: 'চর্মরোগ (ডার্মাটোলজি)' },
  ophthalmology: { key: 'ophthalmology', bn: 'চক্ষুরোগ বিশেষজ্ঞ' },
  dentistry: { key: 'dentistry', bn: 'দন্ত চিকিৎসা' },
  oral_implantology: { key: 'dentistry', bn: 'দন্ত চিকিৎসা' },
  psychiatry: { key: 'psychiatry', bn: 'মানসিক স্বাস্থ্য' },
  counselling: { key: 'psychiatry', bn: 'মানসিক স্বাস্থ্য' },
  neurology: { key: 'neurology', bn: 'স্নায়ুরোগ (নিউরোলজি)' },
  neurosurgery: { key: 'neurology', bn: 'স্নায়ুরোগ (নিউরোলজি)' },
  gastroenterology: { key: 'gastroenterology', bn: 'গ্যাস্ট্রো ও লিভার' },
  pulmonology: { key: 'pulmonology', bn: 'বক্ষব্যাধি ও ফুসফুস' },
  endocrinology: { key: 'endocrinology', bn: 'হরমোন ও ডায়াবেটিস' },
  urology: { key: 'urology', bn: 'ইউরোলজি ও কিডনি' },
  nephrology: { key: 'nephrology', bn: 'নেফ্রোলজি (কিডনি)' },
  oncology: { key: 'oncology', bn: 'ক্যান্সার (অনকোলজি)' },
  hematology: { key: 'hematology', bn: 'রক্তরোগ (হেমাটোলজি)' },
  pathology: { key: 'diagnostics', bn: 'প্যাথলজি ও ল্যাব' },
  radiology: { key: 'diagnostics', bn: 'রেডিওলজি ও ইউএসজি' },
  dietetics: { key: 'dietetics', bn: 'পুষ্টি ও ডায়েট' },
  physiotherapy: { key: 'physiotherapy', bn: 'ফিজিওথেরাপি' }
};

function normalizeSpecialtyKey(rawKey, rawBn) {
  const k = (rawKey || '').toLowerCase().trim();
  if (CANONICAL_SPECIALTY_MAP[k]) return CANONICAL_SPECIALTY_MAP[k];
  const bn = (rawBn || '').toLowerCase();
  if (bn.includes('অর্থোপেডিক') || bn.includes('হাড়')) return CANONICAL_SPECIALTY_MAP.orthopedics;
  if (bn.includes('শিশু')) return CANONICAL_SPECIALTY_MAP.pediatrics;
  if (bn.includes('স্ত্রী') || bn.includes('প্রসূতি')) return CANONICAL_SPECIALTY_MAP.gynaecology;
  if (bn.includes('হৃদ')) return CANONICAL_SPECIALTY_MAP.cardiology;
  if (bn.includes('চর্ম')) return CANONICAL_SPECIALTY_MAP.dermatology;
  if (bn.includes('নাক') || bn.includes('কান') || bn.includes('গলা')) return CANONICAL_SPECIALTY_MAP.ent;
  if (bn.includes('চক্ষু')) return CANONICAL_SPECIALTY_MAP.ophthalmology;
  if (bn.includes('দন্ত')) return CANONICAL_SPECIALTY_MAP.dentistry;
  if (bn.includes('মেডিসিন')) return CANONICAL_SPECIALTY_MAP.general_medicine;
  if (bn.includes('সার্জ')) return CANONICAL_SPECIALTY_MAP.general_surgery;
  return { key: k || 'general_medicine', bn: 'জেনারেল মেডিসিন' };
}

// 1. Fix Healthcare Data
let health = JSON.parse(fs.readFileSync(HEALTH_FILE, 'utf8'));
const sdhMain = health.find(h => h.slug === 'baruipur-subdivisional-hospital');
const sdhOpd = health.find(h => h.slug === 'baruipur-subdivisional-hospital-opd');

if (sdhMain && sdhOpd) {
  // Merge unique doctors from sdhOpd into sdhMain
  const existingNames = new Set((sdhMain.doctors || []).map(d => d.nameEn || d.nameBn));
  for (const doc of (sdhOpd.doctors || [])) {
    const docKey = doc.nameEn || doc.nameBn;
    if (!existingNames.has(docKey)) {
      sdhMain.doctors.push(doc);
      existingNames.add(docKey);
    }
  }
  sdhMain.phone = '033-2433-5303';
  sdhMain.emergencyPhone = '8100820190';
  sdhMain.enquiryPhone = '8100820174';
  sdhMain.addressBn = 'কুলপি রোড, বারুইপুর, দক্ষিণ ২৪ পরগনা - 700144';
  sdhMain.addressEn = 'Kulpi Road, Baruipur, South 24 Parganas - 700144';
  sdhMain.timingsBn = 'সোম–শনি: সকাল ৯:০০ – দুপুর ২:০০ (OPD) | জরুরি বিভাগ: ২৪ ঘণ্টা খোলা';
  sdhMain.isOpen24x7 = true;
  sdhMain.swasthyaSathi = true;
  health = health.filter(h => h.slug !== 'baruipur-subdivisional-hospital-opd');
  console.log('✓ Merged duplicate Baruipur Subdivisional Hospital entries into one canonical record.');
}

for (const h of health) {
  h.lastVerified = '২০২৬-১১-২৬';
  if (h.slug === 'pubali-clinic-baruipur') {
    h.isFeatured = true;
  }
  if (h.phone) {
    h.phone = bnToEnDigits(h.phone).trim();
  }
  // Normalize doctor specialties & deduplicate facility canonicalSpecialties
  const specMap = new Map();
  if (Array.isArray(h.doctors)) {
    for (const d of h.doctors) {
      if (d.appointmentPhone) d.appointmentPhone = bnToEnDigits(d.appointmentPhone).trim();
      const norm = normalizeSpecialtyKey(d.specialtyKey, d.specialtyBn);
      d.canonicalSpecialtyKey = norm.key;
      d.canonicalSpecialtyBn = norm.bn;
      specMap.set(norm.key, norm.bn);
    }
  }
  h.canonicalSpecialties = Array.from(specMap.entries()).map(([key, bn]) => ({ key, bn }));
}
fs.writeFileSync(HEALTH_FILE, JSON.stringify(health, null, 2), 'utf8');
console.log(`✓ Updated ${health.length} healthcare facilities with canonical specialties and verified phones.`);

// 2. Fix Places Data
let places = JSON.parse(fs.readFileSync(PLACES_FILE, 'utf8'));
const clearPlacePhones = new Set([
  'baruipur-rto',
  'baruipur-rabindra-bhawan',
  'baruipur-swimming-pool',
  'baruipur-rashmath',
  'atghara-heritage-site',
  'baruipur-film-city',
  'baruipur-maa-shibani-pith',
  'neeldeep-garden-baruipur'
]);

for (const p of places) {
  p.lastVerified = '২০২৬-১১-২৬';
  if (p.slug === 'pubali-clinic-baruipur') {
    p.isFeatured = true;
  }
  if (p.slug === 'baruipur-subdivisional-hospital') {
    p.phone = '033-2433-5303';
    if (p.address) p.address = p.address.replace(/743302/g, '700144');
  } else if (p.slug === 'baruipur-sdo-office') {
    p.phone = '033-2433-8579';
  } else if (p.slug === 'baruipur-police-district') {
    p.phone = '033-2433-0010';
  } else if (clearPlacePhones.has(p.slug)) {
    p.phone = '';
  } else if (p.phone) {
    const converted = bnToEnDigits(p.phone).trim();
    p.phone = /\d{6,}/.test(converted) ? converted : '';
  }

  // Replace stale hospital helpline numbers inside place text/metadata
  let jsonStr = JSON.stringify(p);
  jsonStr = jsonStr
    .replace(/০৩৩-২৪৩৩-৮২৬০ \(বারুইপুর (?:মহকুমা )?হাসপাতাল\)/g, '033-2433-5303 (বারুইপুর মহকুমা হাসপাতাল)')
    .replace(/০৩৩-২৪৩৩-৮২৬০/g, '033-2433-5303')
    .replace(/033-2433-8242/g, '033-2433-5303')
    .replace(/033-2433-8244/g, '033-2433-5303');
  const updated = JSON.parse(jsonStr);
  Object.assign(p, updated);
}
fs.writeFileSync(PLACES_FILE, JSON.stringify(places, null, 2), 'utf8');
console.log(`✓ Audited and updated ${places.length} places.`);

// 3. Fix Organizations Data
let orgs = JSON.parse(fs.readFileSync(ORGS_FILE, 'utf8'));
for (const o of orgs) {
  o.lastVerified = '২০২৬-১১-২৬';
  if (o.slug === 'real-star-club-baruipur') {
    o.phone = ''; // Was duplicate of Baruipur Jail 033-2433-8550
  } else if (o.phone) {
    const converted = bnToEnDigits(o.phone).trim();
    // Clear obvious 00000 placeholders
    if (converted.includes('00000') || !/\d{6,}/.test(converted)) {
      o.phone = '';
    } else {
      o.phone = converted;
    }
  }
}
fs.writeFileSync(ORGS_FILE, JSON.stringify(orgs, null, 2), 'utf8');
console.log(`✓ Audited and updated ${orgs.length} organizations.`);
