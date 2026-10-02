const fs = require('fs');
const path = require('path');

const placesFilePath = path.join(__dirname, '../src/data/places_data.json');
const places = JSON.parse(fs.readFileSync(placesFilePath, 'utf8'));

const imageUpdates = {
  'baruipur-municipality': {
    coverImage: '/images/places/baruipur-municipality.jpg',
    images: [
      {
        url: '/images/places/baruipur-municipality.jpg',
        captionBn: 'বারুইপুর পৌরসভা কার্যালয় ও প্রশাসনিক ভবন',
        captionEn: 'Baruipur Municipality Office and Administrative Building'
      }
    ]
  },
  'baruipur-police-district': {
    coverImage: '/images/places/baruipur-police-district.jpg',
    images: [
      {
        url: '/images/places/baruipur-police-district.jpg',
        captionBn: 'বারুইপুর পুলিশ জেলা সদর কার্যালয় ও পুলিশ লাইন',
        captionEn: 'Baruipur Police District Headquarters & Police Lines'
      }
    ]
  },
  'baruipur-swimming-pool': {
    coverImage: '/images/places/baruipur-swimming-pool.jpg',
    images: [
      {
        url: '/images/places/baruipur-swimming-pool.jpg',
        captionBn: 'বারুইপুর পদ্মপুকুর মহকুমা সুইমিং পুল কমপ্লেক্স',
        captionEn: 'Baruipur Subdivisional Swimming Pool Complex'
      }
    ]
  },
  'baruipur-rashmath': {
    coverImage: '/images/places/baruipur-charak-rashmath.jpg',
    images: [
      {
        url: '/images/places/baruipur-charak-rashmath.jpg',
        captionBn: 'ঐতিহাসিক বারুইপুর রাসমাঠ ও চড়ক মেলা প্রাঙ্গণ',
        captionEn: 'Historic Baruipur Rashmath Grounds & Charak Mela'
      }
    ]
  },
  'baruipur-bypass': {
    coverImage: '/images/places/baruipur-bypass.jpg',
    images: [
      {
        url: '/images/places/baruipur-bypass.jpg',
        captionBn: 'বারুইপুর বাইপাস সংযোগকারী প্রধান চার লেনের সড়ক',
        captionEn: 'Baruipur 4-Lane Connecting Bypass Corridor'
      }
    ]
  },
  'baruipur-subdivisional-hospital': {
    coverImage: '/images/places/baruipur-subdivisional-hospital.jpg',
    images: [
      {
        url: '/images/places/baruipur-subdivisional-hospital.jpg',
        captionBn: 'বারুইপুর মহকুমা সুপার স্পেশালিটি হাসপাতাল ভবন',
        captionEn: 'Baruipur Subdivisional Super Speciality Hospital Building'
      }
    ]
  },
  'baruipur-junction-railway-station': {
    coverImage: '/images/places/baruipur-junction-railway-station.jpg',
    images: [
      {
        url: '/images/places/baruipur-junction-railway-station.jpg',
        captionBn: 'বারুইপুর জংশন রেল স্টেশন ও প্ল্যাটফর্ম চত্বর',
        captionEn: 'Baruipur Junction Railway Station Platforms & Entrance'
      }
    ]
  },
  'baruipur-college': {
    coverImage: '/images/places/baruipur-college.jpg',
    images: [
      {
        url: '/images/places/baruipur-college.jpg',
        captionBn: 'বারুইপুর কলেজ ক্যাম্পাস ও প্রধান প্রশাসনিক ভবন',
        captionEn: 'Baruipur College Campus & Main Building'
      }
    ]
  },
  'baruipur-jail': {
    coverImage: '/images/places/baruipur-jail-gate.jpg',
    images: [
      {
        url: '/images/places/baruipur-jail-gate.jpg',
        captionBn: 'বারুইপুর কেন্দ্রীয় সংশোধনাগার প্রধান প্রবেশদ্বার',
        captionEn: 'Baruipur Central Correctional Home Main Entrance Gate'
      },
      {
        url: '/images/places/baruipur-jail-campus.jpg',
        captionBn: 'সংশোধনাগার চত্বর ও প্রাচীর',
        captionEn: 'Correctional Home Campus Perimeter'
      }
    ]
  },
  'baruipur-film-city': {
    coverImage: 'https://img.youtube.com/vi/rY-9inw3wds/hqdefault.jpg',
    images: [
      {
        url: 'https://img.youtube.com/vi/rY-9inw3wds/hqdefault.jpg',
        captionBn: 'বারুইপুর ফিল্ম সিটি ও টেলি-অ্যাকাডেমি শুটিং ফ্লোর',
        captionEn: 'Baruipur Film City & Tele-Academy Shooting Grounds'
      }
    ]
  },
  'baruipur-bdo-office': {
    coverImage: '/images/places/baruipur-bdo-office-building.jpg',
    images: [
      {
        url: '/images/places/baruipur-bdo-office-building.jpg',
        captionBn: 'বারুইপুর বিডিও অফিস ভবন ও চত্বর',
        captionEn: 'Baruipur BDO Office Administrative Building'
      },
      {
        url: '/images/places/baruipur-bdo-office-signage.jpg',
        captionBn: 'কার্যালয়ের মূল প্রবেশদ্বার ও নামফলক',
        captionEn: 'Office Entrance Signage'
      }
    ]
  },
  'baruipur-sdo-office': {
    coverImage: '/images/places/baruipur-sdo-office.jpg',
    images: [
      {
        url: '/images/places/baruipur-sdo-office.jpg',
        captionBn: 'বারুইপুর মহকুমা শাসক (SDO) প্রশাসনিক কমপ্লেক্স',
        captionEn: 'Baruipur Sub-Divisional Officer (SDO) Complex'
      }
    ]
  },
  'baruipur-town-library': {
    coverImage: '/images/places/baruipur-town-library.jpg',
    images: [
      {
        url: '/images/places/baruipur-town-library.jpg',
        captionBn: 'বারুইপুর টাউন লাইব্রেরি ও বিদ্যাসাগর স্মৃতি ভবন',
        captionEn: 'Baruipur Town Library & Vidyasagar Memorial Hall'
      }
    ]
  },
  'baruipur-mahaprabhu-tala-sadabrata-ghat': {
    coverImage: '/images/places/baruipur-mahaprabhu-tala.jpg',
    images: [
      {
        url: '/images/places/baruipur-mahaprabhu-tala.jpg',
        captionBn: 'ঐতিহাসিক বারুইপুর মহাপ্রভু তলা মন্দির',
        captionEn: 'Historic Baruipur Mahaprabhu Tala Temple'
      },
      {
        url: '/images/places/baruipur-sadabrata-ghat.jpg',
        captionBn: 'বারুইপুর সদাব্রত ঘাট ও আদি গঙ্গা তীর',
        captionEn: 'Baruipur Sadabrata Ghat on Adi Ganga Bank'
      }
    ]
  },
  'baruipur-women-police-station': {
    coverImage: '/images/places/baruipur-women-police-station.jpg',
    images: [
      {
        url: '/images/places/baruipur-women-police-station.jpg',
        captionBn: 'বারুইপুর মহিলা থানা কার্যালয়',
        captionEn: 'Baruipur Women Police Station Office'
      }
    ]
  },
  'baruipur-aranyak': {
    coverImage: '/images/places/baruipur-aranyak.jpg',
    images: [
      {
        url: '/images/places/baruipur-aranyak.jpg',
        captionBn: 'বারুইপুর আরণ্যক ইকোপার্ক ও বনভোজন উদ্যান',
        captionEn: 'Baruipur Aranyak Eco Park & Picnic Garden'
      }
    ]
  },
  'baruipur-rajbari': {
    coverImage: '/images/places/baruipur-rajbari-facade.jpg',
    images: [
      {
        url: '/images/places/baruipur-rajbari-facade.jpg',
        captionBn: 'ঐতিহাসিক বারুইপুর রায়চৌধুরী রাজবাড়ির প্রবেশদ্বার ও ফটক',
        captionEn: 'Historic Baruipur Roychowdhury Rajbari Facade'
      }
    ]
  },
  'baruipur-happy-valley': {
    coverImage: '/images/places/baruipur-happy-valley.jpg',
    images: [
      {
        url: '/images/places/baruipur-happy-valley.jpg',
        captionBn: 'বারুইপুর উইকএন্ড রিসর্ট ও সবুজ বাগান লন',
        captionEn: 'Baruipur Weekend Resort Grounds & Green Lawns'
      }
    ]
  },
  'baruipur-rto': {
    coverImage: '/images/places/baruipur-rto-office.jpg',
    images: [
      {
        url: '/images/places/baruipur-rto-office.jpg',
        captionBn: 'বারুইপুর এআরটিও (ARTO) আঞ্চলিক পরিবহন দপ্তর',
        captionEn: 'Baruipur ARTO Regional Transport Office'
      },
      {
        url: '/images/places/baruipur-rto-driving-test.jpg',
        captionBn: 'ড্রাইভিং টেস্ট ট্র্যাক চত্বর',
        captionEn: 'Driving Test Track Area'
      }
    ]
  },
  'baruipur-rabindra-bhawan': {
    coverImage: '/images/places/baruipur-rabindra-bhawan.jpg',
    images: [
      {
        url: '/images/places/baruipur-rabindra-bhawan.jpg',
        captionBn: 'বারুইপুর রবীন্দ্র ভবন প্রেক্ষাগৃহ ও নিউ ইন্ডিয়ান গ্রাউন্ড',
        captionEn: 'Baruipur Rabindra Bhawan Auditorium & New Indian Ground'
      }
    ]
  },
  'baruipur-jora-shiva-mandir': {
    coverImage: '/images/places/baruipur-jora-shiva-mandir.jpg',
    images: [
      {
        url: '/images/places/baruipur-jora-shiva-mandir.jpg',
        captionBn: 'বারুইপুরের ঐতিহ্যবাহী জোড়া শিব মন্দির ও চড়ক চত্বর',
        captionEn: 'Historic Jora Shiva Mandir & Charak Festival Grounds, Baruipur'
      }
    ]
  },
  'netaji-ancestral-house-kodalia': {
    coverImage: '/images/places/netaji-ancestral-house-kodalia.jpg',
    images: [
      {
        url: '/images/places/netaji-ancestral-house-kodalia.jpg',
        captionBn: 'কোড়ালিয়া সুভাষচন্দ্র বসুর পৈতৃক বসতবাড়ি ও স্মৃতিকক্ষ',
        captionEn: 'Netaji Subhas Chandra Bose Ancestral House at Kodalia'
      }
    ]
  },
  'baruipur-maa-shibani-pith': {
    coverImage: '/images/places/baruipur-maa-shibani-pith.jpg',
    images: [
      {
        url: '/images/places/baruipur-maa-shibani-pith.jpg',
        captionBn: 'বারুইপুর মা শিবানী পীঠ মন্দির চত্বর',
        captionEn: 'Baruipur Maa Shibani Pith Temple Complex'
      }
    ]
  },
  'dhapdhapi-dakshina-kali-mandir': {
    coverImage: '/images/places/dhapdhapi-dakshina-kali-mandir.jpg',
    images: [
      {
        url: '/images/places/dhapdhapi-dakshina-kali-mandir.jpg',
        captionBn: 'ঐতিহাসিক ধাপধাপি দক্ষিণা কালী মন্দির চত্বর',
        captionEn: 'Historic Dhapdhapi Dakshina Kali Mandir Premises'
      }
    ]
  },
  'baruipur-cathedral-church': {
    coverImage: '/images/places/baruipur-cathedral-church.jpg',
    images: [
      {
        url: '/images/places/baruipur-cathedral-church.jpg',
        captionBn: 'বারুইপুর রোমান ক্যাথলিক বিশপস হাউস ও ক্যাথেড্রাল চার্চ',
        captionEn: 'Baruipur Roman Catholic Bishop\'s House & Cathedral Church'
      }
    ]
  },
  'baruipur-court': {
    coverImage: '/images/places/baruipur-court.jpg',
    images: [
      {
        url: '/images/places/baruipur-court.jpg',
        captionBn: 'বারুইপুর মহকুমা আদালত ভবন ও বার অ্যাসোসিয়েশন',
        captionEn: 'Baruipur Subdivisional Court & Bar Association Complex'
      }
    ]
  },
  'baruipur-puratan-bazar-kachari-bazar': {
    coverImage: '/images/places/baruipur-puratan-bazar-kachari-bazar.jpg',
    images: [
      {
        url: '/images/places/baruipur-puratan-bazar-kachari-bazar.jpg',
        captionBn: 'বারুইপুর পুরাতন বাজার ও কাচারি বাজার পাইকারি আড়ত',
        captionEn: 'Baruipur Puratan Bazar & Kachari Wholesale Market'
      }
    ]
  },
  'neeldeep-garden-baruipur': {
    coverImage: '/images/places/neeldeep-garden-baruipur.jpg',
    images: [
      {
        url: '/images/places/neeldeep-garden-baruipur.jpg',
        captionBn: 'নীলদীপ গার্ডেন পিকনিক স্পট ও সুইমিং পুল রিসর্ট চত্বর',
        captionEn: 'Neeldeep Garden Picnic Spot & Swimming Pool Resort Lawns'
      }
    ]
  }
};

let updatedCount = 0;
places.forEach(p => {
  if (imageUpdates[p.slug]) {
    p.coverImage = imageUpdates[p.slug].coverImage;
    p.images = imageUpdates[p.slug].images;
    updatedCount++;
  }
});

fs.writeFileSync(placesFilePath, JSON.stringify(places, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} places in places_data.json`);
