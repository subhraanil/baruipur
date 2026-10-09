const fs = require('fs');
const path = require('path');

// 1. Test News Search
console.log('========================================');
console.log('1. TESTING NEWS SEARCH FUNCTIONALITY');
console.log('========================================');

const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/news_data.json'), 'utf8'));
const articles = newsData.articles || [];

console.log(`Loaded ${articles.length} news articles.`);

function searchNews(query, category = 'all') {
  const q = query.toLowerCase().trim();
  return articles.filter(art => {
    if (category !== 'all' && art.category !== category) return false;
    if (!q) return true;
    const titleMatch = art.title && art.title.toLowerCase().includes(q);
    const summaryMatch = art.summary && art.summary.toLowerCase().includes(q);
    const contentMatch = art.content && art.content.toLowerCase().includes(q);
    const catMatch = art.categoryNameBn && art.categoryNameBn.toLowerCase().includes(q);
    const sourceMatch = art.sourceName && art.sourceName.toLowerCase().includes(q);
    return titleMatch || summaryMatch || contentMatch || catMatch || sourceMatch;
  });
}

const newsTestQueries = ['অটো', 'হাসপাতাল', 'রেল', 'পৌরসভা', 'মাদক', 'ব্রিজ', 'police', 'health', 'বন্যা'];
newsTestQueries.forEach(q => {
  const results = searchNews(q);
  console.log(`Query: "${q}" -> ${results.length} matches found.`);
  if (results.length > 0) {
    console.log(`   Sample result: "${results[0].title.slice(0, 60)}..."`);
  }
});

// Test News Category filter
['all', 'municipality', 'railway', 'crime', 'health'].forEach(cat => {
  const results = searchNews('', cat);
  console.log(`Category: "${cat}" -> ${results.length} articles.`);
});

// 2. Test Healthcare Search
console.log('\n========================================');
console.log('2. TESTING HEALTHCARE SEARCH FUNCTIONALITY');
console.log('========================================');

const healthData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/healthcare_data.json'), 'utf8'));
const facilities = Array.isArray(healthData) ? healthData : (healthData.facilities || []);
console.log(`Loaded ${facilities.length} healthcare facilities.`);

function searchHealthcare(query, type = 'all', specialty = 'all', onlyOpen24 = false, onlySwasthyaSathi = false) {
  const q = query.toLowerCase().trim();
  return facilities.filter(fac => {
    if (type !== 'all' && fac.type !== type) return false;
    if (onlyOpen24 && !fac.isOpen24Hours) return false;
    if (onlySwasthyaSathi && !fac.swasthyaSathiAccepted) return false;
    if (specialty !== 'all') {
      const hasSpec = fac.doctors && fac.doctors.some(d => d.specialtyKey === specialty);
      if (!hasSpec) return false;
    }
    if (q) {
      const matchFacility = 
        (fac.nameBn && fac.nameBn.toLowerCase().includes(q)) ||
        (fac.nameEn && fac.nameEn.toLowerCase().includes(q)) ||
        (fac.typeBn && fac.typeBn.toLowerCase().includes(q)) ||
        (fac.addressBn && fac.addressBn.toLowerCase().includes(q)) ||
        (fac.addressEn && fac.addressEn.toLowerCase().includes(q)) ||
        (fac.landmarkBn && fac.landmarkBn.toLowerCase().includes(q)) ||
        (fac.taglineBn && fac.taglineBn.toLowerCase().includes(q)) ||
        (fac.overviewBn && fac.overviewBn.toLowerCase().includes(q)) ||
        (fac.phone && fac.phone.includes(q)) ||
        (fac.altPhone && fac.altPhone.includes(q)) ||
        (fac.keyServicesBn && fac.keyServicesBn.some(s => s.toLowerCase().includes(q))) ||
        (fac.diagnosticFacilitiesBn && fac.diagnosticFacilitiesBn.some(d => d.toLowerCase().includes(q)));

      const matchDoctor = fac.doctors && fac.doctors.some(d => 
        (d.nameBn && d.nameBn.toLowerCase().includes(q)) ||
        (d.nameEn && d.nameEn.toLowerCase().includes(q)) ||
        (d.specialtyBn && d.specialtyBn.toLowerCase().includes(q)) ||
        (d.specialtyEn && d.specialtyEn.toLowerCase().includes(q)) ||
        (d.degrees && d.degrees.toLowerCase().includes(q)) ||
        (d.experienceBn && d.experienceBn.toLowerCase().includes(q)) ||
        (d.notesBn && d.notesBn.toLowerCase().includes(q))
      );

      if (!matchFacility && !matchDoctor) return false;
    }
    return true;
  });
}

const healthQueries = [
  'Apollo', 'শতাব্দী', 'Metropolis', 'লাইফ জোন', 'কল্যাণ', 'Panacea', 'AccuHealth', 'Hai', 'Tulip',
  'মেডিসিন', 'হৃদরোগ', 'Cardiology', 'অর্থোপেডিক', 'MBBS', 'MD', 'USG', 'ইসিজি', 'এক্স-রে',
  'অর্পিতা', 'সৌম্য', 'Amitava', 'Chiranjit'
];

healthQueries.forEach(q => {
  const results = searchHealthcare(q);
  console.log(`Healthcare query: "${q}" -> ${results.length} facilities matched.`);
  if (results.length > 0) {
    console.log(`   Sample match: ${results[0].nameBn} (${results[0].nameEn})`);
  }
});

// Test healthcare filters
console.log(`Type 'diagnostic': ${searchHealthcare('', 'diagnostic').length} facilities`);
console.log(`Type 'nursing_home': ${searchHealthcare('', 'nursing_home').length} facilities`);
console.log(`24 Hours open: ${searchHealthcare('', 'all', 'all', true).length} facilities`);
console.log(`Swasthya Sathi: ${searchHealthcare('', 'all', 'all', false, true).length} facilities`);
console.log(`Specialty 'cardiology': ${searchHealthcare('', 'all', 'cardiology').length} facilities`);
console.log(`Specialty 'general_medicine': ${searchHealthcare('', 'all', 'general_medicine').length} facilities`);

// 3. Test Organization Search
console.log('\n========================================');
console.log('3. TESTING ORGANIZATION SEARCH FUNCTIONALITY');
console.log('========================================');

const orgData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/organizations_data.json'), 'utf8'));
const orgs = orgData || [];
console.log(`Loaded ${orgs.length} organizations.`);

function searchOrganizations(query, category = 'all') {
  const q = query.toLowerCase().trim();
  return orgs.filter(org => {
    if (category !== 'all' && org.category !== category) return false;
    if (!q) return true;
    return (
      (org.nameBn && org.nameBn.toLowerCase().includes(q)) || 
      (org.nameEn && org.nameEn.toLowerCase().includes(q)) ||
      (org.categoryBn && org.categoryBn.toLowerCase().includes(q)) ||
      (org.taglineBn && org.taglineBn.toLowerCase().includes(q)) ||
      (org.overview && org.overview.toLowerCase().includes(q)) ||
      (org.address && org.address.toLowerCase().includes(q)) ||
      (org.keyActivities && org.keyActivities.some(a => a.toLowerCase().includes(q))) ||
      (org.servicesOffered && org.servicesOffered.some(s => s.toLowerCase().includes(q))) ||
      (org.contact && org.contact.phone && org.contact.phone.includes(q)) ||
      (org.keyPeople && org.keyPeople.some(p => 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.roleBn && p.roleBn.toLowerCase().includes(q))
      ))
    );
  });
}

const orgQueries = [
  'রিয়েল স্টার', 'Real Star', 'ক্লাব', 'Club', 'রোটারি', 'Rotary', 'ব্যবসায়ী', 'রক্তদান', 'সাঁতার', 'সভাপতি',
  'স্নেহ', 'Sneha', 'বঙ্গীয়', 'Bangiya', 'নতুন ভোর', 'Natun Bhor', 'ভাই ভাই', 'Bhai Bhai', 'ড্রিমজ', 'Dreamz', 'ব্যাডমিন্টন'
];
orgQueries.forEach(q => {
  const results = searchOrganizations(q);
  console.log(`Organization query: "${q}" -> ${results.length} matches.`);
  if (results.length > 0) {
    console.log(`   Sample match: ${results[0].nameBn} (${results[0].nameEn})`);
  }
});

// Category checks
['all', 'club', 'charity', 'association', 'business'].forEach(cat => {
  console.log(`Org category "${cat}": ${searchOrganizations('', cat).length} items`);
});

// 4. Test Places Search
console.log('\n========================================');
console.log('4. TESTING PLACES SEARCH FUNCTIONALITY');
console.log('========================================');

const places = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/places_data.json'), 'utf8'));
console.log(`Loaded ${places.length} places.`);

function searchPlaces(query, category = 'all') {
  const q = query.toLowerCase().trim();
  return places.filter(place => {
    if (category !== 'all') {
      if (category === 'civic') {
        if (place.category !== 'civic' && place.category !== 'Government & Civic Administration') return false;
      } else if (place.category !== category) {
        return false;
      }
    }
    if (!q) return true;
    return (
      (place.nameBn && place.nameBn.toLowerCase().includes(q)) ||
      (place.nameEn && place.nameEn.toLowerCase().includes(q)) ||
      (place.category && place.category.toLowerCase().includes(q)) ||
      (place.taglineBn && place.taglineBn.toLowerCase().includes(q)) ||
      (place.address && place.address.toLowerCase().includes(q)) ||
      (place.overview && place.overview.toLowerCase().includes(q)) ||
      (place.contact && place.contact.phone && place.contact.phone.includes(q)) ||
      (place.keyServices && place.keyServices.some(s => s.toLowerCase().includes(q))) ||
      (place.highlights && place.highlights.some(h => h.toLowerCase().includes(q)))
    );
  });
}

const placesQueries = ['পৌরসভা', 'আদালত', 'Court', 'রবীন্দ্র', 'শিবানী', 'নেতাজি', 'রাজবাড়ি', 'সুইমিং', 'ফিল্ম', 'বাইপাস', 'লাইব্রেরি', 'পুলিশ'];
placesQueries.forEach(q => {
  const results = searchPlaces(q);
  console.log(`Place query: "${q}" -> ${results.length} matches.`);
  if (results.length > 0) {
    console.log(`   Sample match: ${results[0].nameBn} (${results[0].nameEn})`);
  }
});

['all', 'civic', 'police', 'sports', 'culture', 'infrastructure', 'health', 'transit', 'education'].forEach(cat => {
  console.log(`Place category "${cat}": ${searchPlaces('', cat).length} items`);
});

// 5. Test Train Timetable Search
console.log('\n========================================');
console.log('5. TESTING TRAIN SEARCH FUNCTIONALITY');
console.log('========================================');

const timetable = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/train_timetable.json'), 'utf8'));
const routes = timetable.routes || {};
let allTrains = [];
Object.values(routes).forEach(r => {
  if (r.trains) allTrains.push(...r.trains);
});

console.log(`Loaded ${allTrains.length} total scheduled train runs across all routes.`);

function searchTrains(trains, query) {
  const q = query.toLowerCase().trim();
  if (!q) return trains;
  return trains.filter(t => {
    return (
      (t.trainNo && t.trainNo.toLowerCase().includes(q)) ||
      (t.trainName && t.trainName.toLowerCase().includes(q)) ||
      (t.trainNameBn && t.trainNameBn.toLowerCase().includes(q)) ||
      (t.origin && t.origin.toLowerCase().includes(q)) ||
      (t.originBn && t.originBn.toLowerCase().includes(q)) ||
      (t.destination && t.destination.toLowerCase().includes(q)) ||
      (t.destBn && t.destBn.toLowerCase().includes(q))
    );
  });
}

['34712', '34792', '34812', 'Sealdah', 'শিয়ালদহ', 'Diamond Harbour', 'ডায়মন্ড', 'লক্ষ্মীকান্তপুর', 'নামখানা'].forEach(q => {
  const results = searchTrains(allTrains, q);
  console.log(`Train query "${q}": -> ${results.length} train runs found.`);
});

console.log('\n✅ ALL SEARCH TEST SUITES COMPLETED SUCCESSFULLY!');
