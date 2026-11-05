const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../src/data/news_data.json');
const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

console.log(`Current sources count: ${rawData.sources.length}`);

// Target sources list
const updatedSources = [
  // 1. Priority Facebook Sources (User explicitly requested)
  {
    id: "src-fb-baruipur360",
    name: "Baruipur 360",
    type: "facebook",
    url: "https://www.facebook.com/baruipur360",
    handle: "baruipur360",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর ৩৬০ স্থানীয় তথ্য, সংস্কৃতি ও সাম্প্রতিক আপডেট",
    lastCrawledAt: null
  },
  {
    id: "src-fb-barta",
    name: "Baruipur Barta",
    type: "facebook",
    url: "https://www.facebook.com/baruipurbarta05",
    handle: "baruipurbarta05",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর বার্তা সংবাদ ও সংস্কৃতি",
    lastCrawledAt: null
  },
  {
    id: "src-fb-update",
    name: "Baruipur Update",
    type: "facebook",
    url: "https://www.facebook.com/BaruipurUpdate",
    handle: "BaruipurUpdate",
    defaultCategory: "railway",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর ট্রেন, ট্রাফিক ও সাম্প্রতিক খবর",
    lastCrawledAt: null
  },
  {
    id: "src-fb-pressclub",
    name: "Baruipur Press Club",
    type: "facebook",
    url: "https://www.facebook.com/BaruipurPressClub0",
    handle: "BaruipurPressClub0",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর প্রেস ক্লাব সাংবাদিক সমাজ",
    lastCrawledAt: null
  },
  {
    id: "src-fb-voice",
    name: "Voice of Baruipur",
    type: "facebook",
    url: "https://www.facebook.com/voiceofbaruipur",
    handle: "voiceofbaruipur",
    defaultCategory: "municipality",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "ভয়েস অফ বারুইপুর নাগরিক কণ্ঠ",
    lastCrawledAt: null
  },

  // 2. Verified Active Core Local Sources
  {
    id: "src-fb-baruipur",
    name: "Baruipur",
    type: "facebook",
    url: "https://www.facebook.com/Baruipur",
    handle: "Baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 20,
    description: "বারুইপুর প্রধান সোশ্যাল পেজ",
    lastCrawledAt: null
  },
  {
    id: "src-fb-police",
    name: "Baruipur Police District",
    type: "facebook",
    url: "https://www.facebook.com/BaruipurPoliceDistrict",
    handle: "BaruipurPoliceDistrict",
    defaultCategory: "crime",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর পুলিশ জেলা অফিসিয়াল আপডেট ও নিরাপত্তা বার্তা",
    lastCrawledAt: null
  },
  {
    id: "src-fb-uncover",
    name: "Baruipur Uncover",
    type: "facebook",
    url: "https://www.facebook.com/profile.php?id=61573762996730",
    handle: "61573762996730",
    defaultCategory: "crime",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর আনকভার আঞ্চলিক তথ্য ও অনুসন্ধান",
    lastCrawledAt: null
  },
  {
    id: "src-fb-24x7",
    name: "Baruipur 24x7",
    type: "facebook",
    url: "https://www.facebook.com/profile.php?id=61550610304058",
    handle: "61550610304058",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "বারুইপুর ২৪x৭ লাইভ নিউজ",
    lastCrawledAt: null
  },
  {
    id: "src-fb-amarshohor",
    name: "Amar Shohor Baruipur",
    type: "facebook",
    url: "https://www.facebook.com/amarshohor.baruipur.7",
    handle: "amarshohor.baruipur.7",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "আমার শহর বারুইপুর ফেসবুক পেজ",
    lastCrawledAt: null
  },
  {
    id: "src-fb-allbaruipur",
    name: "All Baruipur News",
    type: "facebook",
    url: "https://www.facebook.com/allbaruipurnews",
    handle: "allbaruipurnews",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "অল বারুইপুর নিউজ ও স্থানীয় আপডেট",
    lastCrawledAt: null
  },
  {
    id: "src-fb-ramnagar",
    name: "Ramnagar Baruipur",
    type: "facebook",
    url: "https://www.facebook.com/ramnagar.baruipur",
    handle: "ramnagar.baruipur",
    defaultCategory: "municipality",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "রামনগর ও সংলগ্ন অঞ্চলের স্থানীয় নাগরিক আপডেট",
    lastCrawledAt: null
  },

  // 3. News Portals (User requested)
  {
    id: "src-portal-abp",
    name: "ABP Ananda Baruipur",
    type: "portal_abp",
    url: "https://bengali.abplive.com/topic/baruipur",
    searchUrl: "https://bengali.abplive.com/search?s=baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "এবিপি আনন্দ বারুইপুর বিশেষ সংবাদ কভারেজ",
    lastCrawledAt: null
  },
  {
    id: "src-portal-publicapp",
    name: "Public App Baruipur",
    type: "portal_public",
    url: "https://public.app/city/news-in-baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "পাবলিক অ্যাপ বারুইপুর লোকাল ভিডিও ও গ্রাউন্ড রিপোর্ট",
    lastCrawledAt: null
  },
  {
    id: "src-portal-anandabazar",
    name: "Anandabazar Patrika",
    type: "portal_anandabazar",
    url: "https://www.anandabazar.com/topic/baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "আনন্দবাজার পত্রিকা বারুইপুর ও জেলা সংবাদ",
    lastCrawledAt: null
  },
  {
    id: "src-portal-ndtv",
    name: "NDTV Baruipur",
    type: "portal_ndtv",
    url: "https://www.ndtv.com/topic/baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "এনডিটিভি বারুইপুর সংবাদ বুলেটিন",
    lastCrawledAt: null
  },
  {
    id: "src-portal-twitter",
    name: "X / Twitter #Baruipur",
    type: "portal_twitter",
    url: "https://x.com/hashtag/Baruipur",
    defaultCategory: "general",
    isActive: true,
    autoPublish: true,
    postsCount: 0,
    description: "এক্স / টুইটার বারুইপুর রিয়েল-টাইম ট্রেন্ড ও হ্যাশট্যাগ",
    lastCrawledAt: null
  }
];

rawData.sources = updatedSources;

console.log(`Updated sources count: ${rawData.sources.length}`);
fs.writeFileSync(DATA_PATH, JSON.stringify(rawData, null, 2), 'utf8');
console.log('✓ Successfully updated news_data.json sources!');
