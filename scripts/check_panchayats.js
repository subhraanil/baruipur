const fs = require('fs');

const places = JSON.parse(fs.readFileSync('src/data/places_data.json', 'utf8'));
const bdo = places.find(p => p.slug === 'baruipur-bdo-office');

console.log('BDO Place found:', Boolean(bdo));
if (bdo) {
  console.log('Name:', bdo.nameBn);
  console.log('Administrative Details:', bdo.administrativeDetails);
}
