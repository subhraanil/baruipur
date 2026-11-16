const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

console.log('Total articles:', data.articles.length);

// Curated high-engagement stories to feature
const topCuratedIds = {
  'art-20261113-autoagitation': { views: 420, isFeatured: true, isBreaking: true },
  'art-1794463043317-sadk': { views: 395, isFeatured: true, isBreaking: false }, // Rasmela Diamond circus
  'art-20261113-bazargrievance': { views: 360, isFeatured: true, isBreaking: false }, // Puratan bazar stall
  'art-20261113-jagaranikali': { views: 340, isFeatured: true, isBreaking: false }, // Bamakali dance
  'art-20261113-jagadhatrikarnatak': { views: 310, isFeatured: true, isBreaking: false }, // Nuton bhor Jagadhatri
  'art-20261113-sunflowerghora': { views: 280, isFeatured: true, isBreaking: false }, // 10 horse carriage
  'art-1794803444476-qln2': { views: 240, isFeatured: true, isBreaking: false }, // Chhath puja
  'art-1794803446488-5cmy': { views: 210, isFeatured: true, isBreaking: false }, // Girls kabaddi
  'art-1794463061859-ol52': { views: 195, isFeatured: true, isBreaking: false }, // Bhaiphonta immersion
  'art-1794463057601-xezz': { views: 220, isFeatured: false, isBreaking: false } // Fartabad incident
};

let count = 0;
data.articles.forEach(art => {
  if (topCuratedIds[art.id]) {
    const meta = topCuratedIds[art.id];
    art.views = meta.views;
    art.isFeatured = meta.isFeatured;
    if (meta.isBreaking !== undefined) art.isBreaking = meta.isBreaking;
    count++;
  } else if (!art.views || art.views === 0) {
    const lenBonus = art.content ? Math.min(Math.floor(art.content.length / 20), 40) : 0;
    art.views = 35 + lenBonus + Math.floor(Math.random() * 25);
  }
});

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✅ ${count} টি প্রধান সংবাদের ভিউ ও ফিচারড ফ্ল্যাগ হালনাগাদ করা হয়েছে!`);
