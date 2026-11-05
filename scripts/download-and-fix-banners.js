const fs = require('fs');
const path = require('path');
const axios = require('axios');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'news_data.json');

// Curated 1200x630 16:9 high-resolution images for each specific topic
const imagesToDownload = [
  {
    name: 'baruipur-veterinary-pet-care-guide.jpg',
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-gold-jewellery-guide.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-bridal-shopping-guide.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-furniture-craft-guide.jpg',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-classical-dance-music-guide.jpg',
    url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-kali-puja-pandals-lighting.jpg',
    url: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-green-crackers-market.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-real-estate-flats-guide.jpg',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-wbsedcl-electricity-office.jpg',
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-milan-mela-carnival-guide.jpg',
    url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-rasmath-cultural-concert.jpg',
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-banquet-wedding-halls-guide.jpg',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-station-restaurant-dining-guide.jpg',
    url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'baruipur-politics-assembly-guide.jpg',
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'news-bank-fraud-investigation.jpg',
    url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'news-green-environment-plantation.jpg',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'news-cyber-crime-fraud-recovery.jpg',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'news-anti-narcotics-drugs-action.jpg',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  {
    name: 'news-court-justice-life-sentence.jpg',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  // Localization of remaining external Unsplash images
  {
    name: 'baruipur-guava-litchi-farming-guide.jpg',
    url: 'https://images.unsplash.com/photo-1536511135898-349887f4c029?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-plant-nursery-hub.jpg',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-rooftop-cafes-hangout.jpg',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-computer-training-centers.jpg',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-sports-coaching-academies.jpg',
    url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-swimming-pool-guide.jpg',
    url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'joynagar-moa-nolen-gur-guide.jpg',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1200&auto=format&fit=crop&q=85'
  },
  {
    name: 'baruipur-lakshmi-puja-market.jpg',
    url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=1200&auto=format&fit=crop&q=85'
  }
];

async function downloadFile(url, targetPath) {
  try {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 15000
    });
    if (res.status === 200 && res.data.length > 5000) {
      fs.writeFileSync(targetPath, res.data);
      console.log(`✅ Downloaded: ${path.basename(targetPath)} (${Math.round(res.data.length / 1024)} KB)`);
      return true;
    }
  } catch (e) {
    console.error(`❌ Failed ${url}:`, e.message);
  }
  return false;
}

async function run() {
  console.log('--- Step 1: Downloading Curated High-Resolution Topic Banners ---');
  for (const item of imagesToDownload) {
    const target = path.join(IMAGES_DIR, item.name);
    if (!fs.existsSync(target) || fs.statSync(target).size < 10000) {
      await downloadFile(item.url, target);
    } else {
      console.log(`⚡ Existing valid image: ${item.name}`);
    }
  }

  console.log('\n--- Step 2: Updating news_data.json with Relevant Banners ---');
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  const articleUpdates = {
    // 1. Veterinary Pet Care
    'art-guide-baruipur-veterinary-pet-care': {
      imageUrl: '/images/baruipur-veterinary-pet-care-guide.jpg'
    },
    // 2. Gold Jewellery Showrooms
    'art-guide-baruipur-gold-jewellery-showrooms': {
      imageUrl: '/images/baruipur-gold-jewellery-guide.jpg'
    },
    // 3. Wedding & Bridal Shopping
    'art-guide-baruipur-wedding-bridal-shopping': {
      imageUrl: '/images/baruipur-bridal-shopping-guide.jpg'
    },
    // 4. Wooden Furniture Market
    'art-guide-baruipur-furniture-market-wooden-craft-home-decor': {
      imageUrl: '/images/baruipur-furniture-craft-guide.jpg'
    },
    // 5. Music & Classical Dance Academies
    'art-guide-baruipur-music-dance-academies': {
      imageUrl: '/images/baruipur-classical-dance-music-guide.jpg'
    },
    // 6. Kali Puja Pandals & Lighting
    'art-guide-baruipur-best-kali-puja-pandals': {
      imageUrl: '/images/baruipur-kali-puja-pandals-lighting.jpg'
    },
    // 7. Green Crackers Market
    'art-guide-baruipur-green-crackers-baji-bazar': {
      imageUrl: '/images/baruipur-green-crackers-market.jpg'
    },
    // 8. Real Estate Property & Flats
    'art-guide-real-estate-property': {
      imageUrl: '/images/baruipur-real-estate-flats-guide.jpg'
    },
    // 9. WBSEDCL Electricity Office
    'art-guide-baruipur-electricity-office': {
      imageUrl: '/images/baruipur-wbsedcl-electricity-office.jpg'
    },
    // 10. Milan Mela Carnival Guide
    'art-baruipur-milan-mela-2026-guide': {
      imageUrl: '/images/baruipur-milan-mela-carnival-guide.jpg'
    },
    // 11. Rasmath Cultural Concert
    'art-1793525947166-rasmath': {
      imageUrl: '/images/baruipur-rasmath-cultural-concert.jpg'
    },
    // 12. Banquet & Marriage Halls
    'art-guide-banquet-marriage-halls': {
      imageUrl: '/images/baruipur-banquet-wedding-halls-guide.jpg'
    },
    // 13. Restaurants near station
    'art-guide-baruipur-restaurant-near-station': {
      imageUrl: '/images/baruipur-station-restaurant-dining-guide.jpg'
    },
    // 14. Political Profile
    'art-guide-baruipur-politics': {
      imageUrl: '/images/baruipur-politics-assembly-guide.jpg'
    },
    // 15. Gram Panchayat Directory (Fix broken file path)
    'art-guide-baruipur-block-panchayat-list': {
      imageUrl: '/images/places/baruipur-bdo-office-building.jpg'
    },
    // 16. Police posts that shared police crest logo
    'art-1789388786133-gtpx': {
      imageUrl: '/images/news-bank-fraud-investigation.jpg'
    },
    'art-1789388790158-otg5': {
      imageUrl: '/images/news-green-environment-plantation.jpg'
    },
    'art-1789388790158-7hne': {
      imageUrl: '/images/news-cyber-crime-fraud-recovery.jpg'
    },
    'art-1789388794046-amz1': {
      imageUrl: '/images/news-anti-narcotics-drugs-action.jpg'
    },
    'art-1789388794046-hlkv': {
      imageUrl: '/images/news-court-justice-life-sentence.jpg'
    },
    // 17. Localize external URLs
    'art-guide-baruipur-guava-litchi-farming-history-markets': {
      imageUrl: '/images/baruipur-guava-litchi-farming-guide.jpg'
    },
    'art-guide-baruipur-padmapukur-plant-nursery-hub': {
      imageUrl: '/images/baruipur-plant-nursery-hub.jpg'
    },
    'art-guide-baruipur-best-rooftop-cafes-hangout-spots': {
      imageUrl: '/images/baruipur-rooftop-cafes-hangout.jpg'
    },
    'art-guide-baruipur-computer-training-skill-centers': {
      imageUrl: '/images/baruipur-computer-training-centers.jpg'
    },
    'art-guide-baruipur-cricket-football-coaching-academies': {
      imageUrl: '/images/baruipur-sports-coaching-academies.jpg'
    },
    'art-guide-baruipur-swimming-pool-admission-fees': {
      imageUrl: '/images/baruipur-swimming-pool-guide.jpg'
    },
    'art-guide-joynagar-moa-nolen-gur-authenticity': {
      imageUrl: '/images/joynagar-moa-nolen-gur-guide.jpg'
    },
    'art-lakshmi-puja-market-baruipur-2026': {
      imageUrl: '/images/baruipur-lakshmi-puja-market.jpg'
    },
    'art-guide-picnic-spots-resorts-baruipur': {
      imageUrl: '/images/places/neeldeep-garden-baruipur.jpg'
    },
    'art-guide-neelkothi-history-baruipur': {
      imageUrl: '/images/places/atghara-heritage-site.jpg'
    }
  };

  let updatedCount = 0;
  data.articles.forEach(article => {
    if (articleUpdates[article.id]) {
      const update = articleUpdates[article.id];
      article.imageUrl = update.imageUrl;
      if (article.images && article.images.length > 0) {
        article.images[0] = update.imageUrl;
      } else {
        article.images = [update.imageUrl];
      }
      updatedCount++;
      console.log(`🎯 Updated [${article.id}]: ${article.imageUrl}`);
    }
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 Successfully updated ${updatedCount} articles with relevant high-res banners.`);
}

run();
