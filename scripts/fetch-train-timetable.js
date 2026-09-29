/**
 * scripts/fetch-train-timetable.js
 * Fetches latest train timetables from eRail for:
 * 1. Baruipur to Diamond Harbour (BRP -> DH)
 * 2. Diamond Harbour to Baruipur (DH -> BRP)
 * 3. Baruipur to Sealdah (BRP -> SDAH)
 * 4. Sealdah to Baruipur (SDAH -> BRP)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const stationNameBn = {
  'SDAH': 'শিয়ালদহ',
  'Sealdah': 'শিয়ালদহ',
  'BRP': 'বারুইপুর জংশন',
  'Baruipur Jn': 'বারুইপুর জংশন',
  'DH': 'ডায়মন্ড হারবার',
  'Diamond Harbour': 'ডায়মন্ড হারবার',
  'SPR': 'সোনারপুর জংশন',
  'Sonarpur Jn': 'সোনারপুর জংশন',
  'BLN': 'বালিগঞ্জ জংশন',
  'Ballygunge Jn': 'বালিগঞ্জ জংশন',
  'LKPR': 'লক্ষ্মীকান্তপুর',
  'Lakshmikantapur': 'লক্ষ্মীকান্তপুর',
  'NMKA': 'নামখানা',
  'Namkhana': 'নামখানা',
  'KWDP': 'কাকদ্বীপ',
  'Kakdwip': 'কাকদ্বীপ',
  'CG': 'ক্যানিং',
  'Canning': 'ক্যানিং',
  'MJT': 'মাঝেরহাট',
  'Majerhat': 'মাঝেরহাট'
};

function getBnStation(codeOrName) {
  return stationNameBn[codeOrName] || codeOrName;
}

function getBnTrainName(trainName, origin, dest) {
  const origBn = getBnStation(origin);
  const destBn = getBnStation(dest);
  return `${origBn} - ${destBn} লোকাল`;
}

function parseDuration(durStr) {
  // Format "00:48" or "01:05"
  const parts = durStr.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  if (h > 0) {
    return `${h} ঘণ্টা ${m} মিনিট`;
  }
  return `${m} মিনিট`;
}

function parseDurationMinutes(durStr) {
  const parts = durStr.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h * 60 + m;
}

function fetchRoute(from, to) {
  return new Promise((resolve, reject) => {
    const url = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&hours=-1&Language=0&Cache=true`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parts = data.split('^');
        const trains = [];
        for (let i = 1; i < parts.length; i++) {
          const t = parts[i].split('~');
          if (t.length > 13 && t[0].trim()) {
            const rawDur = t[12].trim().replace('.', ':');
            const depTime = t[10].trim().replace('.', ':');
            const arrTime = t[11].trim().replace('.', ':');
            const days = t[13].trim();
            const originName = t[2].trim();
            const destName = t[4].trim();

            trains.push({
              trainNo: t[0].trim(),
              trainName: t[1].trim(),
              trainNameBn: getBnTrainName(t[1].trim(), originName, destName),
              origin: originName,
              originCode: t[3].trim(),
              originBn: getBnStation(t[3].trim()) || getBnStation(originName),
              destination: destName,
              destCode: t[5].trim(),
              destBn: getBnStation(t[5].trim()) || getBnStation(destName),
              departure: depTime,
              arrival: arrTime,
              durationTextBn: parseDuration(rawDur),
              durationMin: parseDurationMinutes(rawDur),
              days: days,
              daysTextBn: days === '1111110' ? 'সোম - শনি (রবি বাদে)' : (days === '1111111' ? 'প্রতিদিন' : 'বিশেষ সূচি'),
              daysTextEn: days === '1111110' ? 'Mon - Sat (Ex. Sun)' : (days === '1111111' ? 'Daily' : 'Special Schedule')
            });
          }
        }
        trains.sort((a, b) => a.departure.localeCompare(b.departure));
        resolve(trains);
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching train timetables from eRail...');
  
  const routeConfigs = [
    {
      id: 'brp_dh',
      from: 'BRP',
      fromBn: 'বারুইপুর জংশন',
      fromEn: 'Baruipur Jn',
      to: 'DH',
      toBn: 'ডায়মন্ড হারবার',
      toEn: 'Diamond Harbour',
      titleBn: 'বারুইপুর থেকে ডায়মন্ড হারবার ট্রেনের সময়সূচি',
      titleEn: 'Baruipur to Diamond Harbour Train Time Table',
      erailUrl: 'https://erail.in/trains-between-stations/BRP/DH'
    },
    {
      id: 'brp_sdah',
      from: 'BRP',
      fromBn: 'বারুইপুর জংশন',
      fromEn: 'Baruipur Jn',
      to: 'SDAH',
      toBn: 'শিয়ালদহ',
      toEn: 'Sealdah',
      titleBn: 'বারুইপুর থেকে শিয়ালদহ ট্রেনের সময়সূচি',
      titleEn: 'Baruipur to Sealdah Train Time Table',
      erailUrl: 'https://erail.in/trains-between-stations/BRP/SDAH'
    },
    {
      id: 'dh_brp',
      from: 'DH',
      fromBn: 'ডায়মন্ড হারবার',
      fromEn: 'Diamond Harbour',
      to: 'BRP',
      toBn: 'বারুইপুর জংশন',
      toEn: 'Baruipur Jn',
      titleBn: 'ডায়মন্ড হারবার থেকে বারুইপুর ট্রেনের সময়সূচি',
      titleEn: 'Diamond Harbour to Baruipur Train Time Table',
      erailUrl: 'https://erail.in/trains-between-stations/DH/BRP'
    },
    {
      id: 'sdah_brp',
      from: 'SDAH',
      fromBn: 'শিয়ালদহ',
      fromEn: 'Sealdah',
      to: 'BRP',
      toBn: 'বারুইপুর জংশন',
      toEn: 'Baruipur Jn',
      titleBn: 'শিয়ালদহ থেকে বারুইপুর ট্রেনের সময়সূচি',
      titleEn: 'Sealdah to Baruipur Train Time Table',
      erailUrl: 'https://erail.in/trains-between-stations/SDAH/BRP'
    }
  ];

  const result = {
    updatedAt: new Date().toISOString(),
    routes: {}
  };

  for (const rc of routeConfigs) {
    console.log(`Fetching ${rc.fromEn} to ${rc.toEn}...`);
    const trains = await fetchRoute(rc.from, rc.to);
    result.routes[rc.id] = {
      ...rc,
      totalTrains: trains.length,
      firstTrain: trains[0] ? `${trains[0].departure} (${trains[0].trainNo})` : '',
      lastTrain: trains.length > 0 ? `${trains[trains.length - 1].departure} (${trains[trains.length - 1].trainNo})` : '',
      trains: trains
    };
    console.log(`✓ ${rc.fromEn} -> ${rc.toEn}: ${trains.length} trains fetched.`);
  }

  const outPath = path.join(__dirname, '../src/data/train_timetable.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nSuccessfully saved complete train timetables to: ${outPath}`);
}

run().catch(err => {
  console.error('Error fetching timetable:', err);
  process.exit(1);
});
