const fs = require('fs');
const path = require('path');

function replaceOrAdd(filePath, targetRegex, replacement) {
  let content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(filePath, content, 'utf-8');
}

// 1. Homepage: src/app/page.tsx
const homePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let homeContent = fs.readFileSync(homePath, 'utf-8').replace(/\r\n/g, '\n');

if (!homeContent.includes('export const metadata: Metadata')) {
  homeContent = homeContent.replace(
    "import React from 'react';",
    "import React from 'react';\nimport type { Metadata } from 'next';"
  );

  const homeMetadata = `
export const metadata: Metadata = {
  title: 'বারুইপুর অনলাইন - দক্ষিণ ২৪ পরগনার শীর্ষ আঞ্চলিক সংবাদ ও তথ্য পোর্টাল',
  description: 'বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে, মহকুমা হাসপাতাল, পুলিশ প্রশাসন ও স্থানীয় সমস্ত খবরের নির্ভরযোগ্য ডিজিটাল ঠিকানা।',
  alternates: {
    canonical: 'https://baruipur.online/',
  },
  openGraph: {
    title: 'বারুইপুর অনলাইন - দক্ষিণ ২৪ পরগনার শীর্ষ আঞ্চলিক সংবাদ ও তথ্য পোর্টাল',
    description: 'বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে, মহকুমা হাসপাতাল, পুলিশ প্রশাসন ও স্থানীয় সমস্ত খবরের নির্ভরযোগ্য ডিজিটাল ঠিকানা।',
    url: 'https://baruipur.online/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন - Baruipur Online News Portal',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর অনলাইন - দক্ষিণ ২৪ পরগনার শীর্ষ সংবাদ পোর্টাল',
    description: 'বারুইপুর মহকুমা ও দক্ষিণ ২৪ পরগনার নির্ভরযোগ্য আঞ্চলিক ডিজিটাল সংবাদ ও তথ্যবাতায়ন।',
    images: ['https://baruipur.online/images/og-image.png'],
    site: '@BaruipurOnline',
    creator: '@BaruipurOnline'
  }
};
`;

  homeContent = homeContent.replace('export default function HomePage()', `${homeMetadata}\nexport default function HomePage()`);
  fs.writeFileSync(homePath, homeContent, 'utf-8');
  console.log('✓ Added OpenGraph and Twitter card to src/app/page.tsx');
}


// 2. Transport: src/app/transport/page.tsx
const transportPath = path.join(__dirname, '..', 'src', 'app', 'transport', 'page.tsx');
let transportContent = fs.readFileSync(transportPath, 'utf-8').replace(/\r\n/g, '\n');

if (!transportContent.includes('openGraph:')) {
  transportContent = transportContent.replace(
    "  alternates: {\n    canonical: 'https://baruipur.online/transport/',\n  }\n};",
    `  alternates: {
    canonical: 'https://baruipur.online/transport/',
  },
  openGraph: {
    title: 'বারুইপুর ট্রেন টাইম টেবিল ও পরিবহন নির্দেশিকা - বারুইপুর অনলাইন',
    description: 'বারুইপুর জংশন থেকে শিয়ালদহ, ডায়মন্ড হারবার, লক্ষ্মীকান্তপুর ও নামখানা লোকাল ট্রেনের সম্পূর্ণ সময়সূচি এবং বাস রুট গাইড।',
    url: 'https://baruipur.online/transport/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/places/baruipur-junction-railway-station.jpg',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর রেলওয়ে স্টেশন ও লোকাল ট্রেন সময়সূচি',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর ট্রেন টাইম টেবিল ও লোকাল ট্রেন সময়সূচি | Baruipur Online',
    description: 'শিয়ালদহ, ডায়মন্ড হারবার ও নামখানা লোকাল ট্রেনের সঠিক সময়সূচি এবং পরিবহন গাইড।',
    images: ['https://baruipur.online/images/places/baruipur-junction-railway-station.jpg'],
    site: '@BaruipurOnline'
  }
};`
  );
  fs.writeFileSync(transportPath, transportContent, 'utf-8');
  console.log('✓ Added OpenGraph and Twitter card to src/app/transport/page.tsx');
}


// 3. Emergency Contacts: src/app/emergency-contacts/page.tsx
const emergencyPath = path.join(__dirname, '..', 'src', 'app', 'emergency-contacts', 'page.tsx');
let emergencyContent = fs.readFileSync(emergencyPath, 'utf-8').replace(/\r\n/g, '\n');

if (!emergencyContent.includes('openGraph:')) {
  emergencyContent = emergencyContent.replace(
    "  alternates: {\n    canonical: 'https://baruipur.online/emergency-contacts/',\n  }\n};",
    `  alternates: {
    canonical: 'https://baruipur.online/emergency-contacts/',
  },
  openGraph: {
    title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর ডিরেক্টরি',
    description: 'বারুইপুর পুলিশ জেলা, মহকুমা হাসপাতাল, দমকল, অ্যাম্বুলেন্স, পৌরসভা ও রেলওয়ের ২৪x৭ যাচাইকৃত জরুরি যোগাযোগ নম্বর।',
    url: 'https://baruipur.online/emergency-contacts/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/places/baruipur-subdivisional-hospital.jpg',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর জরুরি হেল্পলাইন ও হাসপাতাল ডিরেক্টরি',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর | Baruipur Online',
    description: 'পুলিশ, হাসপাতাল, অ্যাম্বুলেন্স, দমকল ও পৌরসভার ২৪x৭ জরুরি নম্বর ডিরেক্টরি।',
    images: ['https://baruipur.online/images/places/baruipur-subdivisional-hospital.jpg'],
    site: '@BaruipurOnline'
  }
};`
  );
  fs.writeFileSync(emergencyPath, emergencyContent, 'utf-8');
  console.log('✓ Added OpenGraph and Twitter card to src/app/emergency-contacts/page.tsx');
}


// 4. Citizen Services: src/app/citizen-services/page.tsx
const citizenPath = path.join(__dirname, '..', 'src', 'app', 'citizen-services', 'page.tsx');
let citizenContent = fs.readFileSync(citizenPath, 'utf-8').replace(/\r\n/g, '\n');

if (!citizenContent.includes('openGraph:')) {
  citizenContent = citizenContent.replace(
    "  alternates: {\n    canonical: 'https://baruipur.online/citizen-services/',\n  }\n};",
    `  alternates: {
    canonical: 'https://baruipur.online/citizen-services/',
  },
  openGraph: {
    title: 'বারুইপুর নাগরিক ও সরকারি পরিষেবা নির্দেশিকা (Citizen Services)',
    description: 'বারুইপুর পৌরসভা জন্ম-মৃত্যু সনদ, ট্রেড লাইসেন্স, মিউটেশন, পুলিশ সহায়তা ও এসডিও-বিডিও সরকারি প্রকল্পের নির্দেশিকা।',
    url: 'https://baruipur.online/citizen-services/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/places/baruipur-municipality.jpg',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর পৌরসভা ও নাগরিক পরিষেবা',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর নাগরিক ও সরকারি পরিষেবা নির্দেশিকা | Baruipur Online',
    description: 'পৌরসভা শংসাপত্র, ট্রেড লাইসেন্স, মিউটেশন ও সরকারি প্রকল্পের সহজ গাইড।',
    images: ['https://baruipur.online/images/places/baruipur-municipality.jpg'],
    site: '@BaruipurOnline'
  }
};`
  );
  fs.writeFileSync(citizenPath, citizenContent, 'utf-8');
  console.log('✓ Added OpenGraph and Twitter card to src/app/citizen-services/page.tsx');
}


// 5. Health Directory Hub: src/app/health-directory/page.tsx
const healthHubPath = path.join(__dirname, '..', 'src', 'app', 'health-directory', 'page.tsx');
let healthHubContent = fs.readFileSync(healthHubPath, 'utf-8').replace(/\r\n/g, '\n');

if (!healthHubContent.includes('twitter:')) {
  healthHubContent = healthHubContent.replace(
    "      {\n        url: 'https://baruipur.online/images/og-image.png',\n        width: 1200,\n        height: 630,\n        alt: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার গাইড',\n      }\n    ]\n  }\n};",
    `      {\n        url: 'https://baruipur.online/images/health/star-medical-clinic-board.jpg',\n        width: 1200,\n        height: 630,\n        alt: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার গাইড',\n        type: 'image/jpeg'\n      }\n    ]\n  },\n  twitter: {\n    card: 'summary_large_image',\n    title: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার ডিরেক্টরি | Baruipur Online',\n    description: 'বারুইপুরের হাসপাতাল, নার্সিং হোম ও বিশেষজ্ঞ চিকিৎসকদের ওপিডি সময়সূচি ও সিরিয়াল নম্বর।',\n    images: ['https://baruipur.online/images/health/star-medical-clinic-board.jpg'],\n    site: '@BaruipurOnline'\n  }\n};`
  );
  fs.writeFileSync(healthHubPath, healthHubContent, 'utf-8');
  console.log('✓ Added Twitter card to src/app/health-directory/page.tsx');
}


// 6. Organizations Hub: src/app/organizations/page.tsx
const orgsHubPath = path.join(__dirname, '..', 'src', 'app', 'organizations', 'page.tsx');
let orgsHubContent = fs.readFileSync(orgsHubPath, 'utf-8').replace(/\r\n/g, '\n');

if (!orgsHubContent.includes('twitter:')) {
  orgsHubContent = orgsHubContent.replace(
    "      {\n        url: 'https://baruipur.online/images/og-image.png',\n        width: 1200,\n        height: 630,\n        alt: 'বারুইপুরের প্রতিষ্ঠান ও সংগঠন ডিরেক্টরি',\n      }\n    ]\n  }\n};",
    `      {\n        url: 'https://baruipur.online/images/organizations/real-star-club.jpg',\n        width: 1200,\n        height: 630,\n        alt: 'বারুইপুরের প্রতিষ্ঠান ও সংগঠন ডিরেক্টরি',\n        type: 'image/jpeg'\n      }\n    ]\n  },\n  twitter: {\n    card: 'summary_large_image',\n    title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব ও প্রতিষ্ঠান ডিরেক্টরি | Baruipur Online',\n    description: 'ঐতিহ্যবাহী ক্লাব, সমাজসেবী ট্রাস্ট, আইনজীবী সমিতি ও খেলাধুলো সংগঠনের নির্ভরযোগ্য যোগাযোগ।',\n    images: ['https://baruipur.online/images/organizations/real-star-club.jpg'],\n    site: '@BaruipurOnline'\n  }\n};`
  );
  fs.writeFileSync(orgsHubPath, orgsHubContent, 'utf-8');
  console.log('✓ Added Twitter card to src/app/organizations/page.tsx');
}


// 7. Places Hub: src/app/places/page.tsx
const placesHubPath = path.join(__dirname, '..', 'src', 'app', 'places', 'page.tsx');
let placesHubContent = fs.readFileSync(placesHubPath, 'utf-8').replace(/\r\n/g, '\n');

if (!placesHubContent.includes("images: ['https://baruipur.online/images/places/baruipur-rajbari-facade.jpg']")) {
  placesHubContent = placesHubContent.replace(
    "  twitter: {\n    card: 'summary_large_image',\n    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',\n    description: 'বারুইপুরের ঐতিহাসিক, আধ্যাত্মিক ও প্রশাসনিক ২৮টি গুরুত্বপূর্ণ স্থানের পূর্ণাঙ্গ তথ্যকোষ।',\n  }",
    `  twitter: {\n    card: 'summary_large_image',\n    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও দর্শনীয় স্পট নির্দেশিকা | Baruipur Online',\n    description: 'বারুইপুরের ঐতিহাসিক, আধ্যাত্মিক ও প্রশাসনিক ৩৩টি গুরুত্বপূর্ণ স্থানের পূর্ণাঙ্গ তথ্যকোষ।',\n    images: ['https://baruipur.online/images/places/baruipur-rajbari-facade.jpg'],\n    site: '@BaruipurOnline'\n  }`
  );
  fs.writeFileSync(placesHubPath, placesHubContent, 'utf-8');
  console.log('✓ Added Twitter images to src/app/places/page.tsx');
}


// 8. Category: src/app/category/[slug]/page.tsx
const categoryPath = path.join(__dirname, '..', 'src', 'app', 'category', '[slug]', 'page.tsx');
let categoryContent = fs.readFileSync(categoryPath, 'utf-8').replace(/\r\n/g, '\n');

if (!categoryContent.includes("images: ['https://baruipur.online/images/og-image.png']")) {
  categoryContent = categoryContent.replace(
    "    twitter: {\n      card: 'summary_large_image',\n      title,\n      description,\n    },",
    `    twitter: {\n      card: 'summary_large_image',\n      title,\n      description,\n      images: ['https://baruipur.online/images/og-image.png'],\n      site: '@BaruipurOnline',\n      creator: '@BaruipurOnline'\n    },`
  );
  fs.writeFileSync(categoryPath, categoryContent, 'utf-8');
  console.log('✓ Added Twitter images and site to src/app/category/[slug]/page.tsx');
}


// 9. Institutional Pages Twitter Card additions
const institutionalPages = [
  { name: 'about', title: 'আমাদের সম্পর্কে - বারুইপুর অনলাইন', desc: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার নির্ভরযোগ্য ডিজিটাল তথ্যকোষ ও নাগরিক পোর্টাল।' },
  { name: 'editorial-team', title: 'সম্পাদকীয় পরিষদ ও সাংবাদিক প্রতিনিধি - বারুইপুর অনলাইন', desc: 'বারুইপুর অনলাইনের সম্পাদকীয় টিম ও ক্ষেত্রভিত্তিক সাংবাদিকবৃন্দের পরিচিতি।' },
  { name: 'editorial-policy', title: 'সম্পাদকীয় নীতিমালা - বারুইপুর অনলাইন', desc: 'বারুইপুর অনলাইন বার্তা ডেস্কের পক্ষপাতহীন সংবাদ পরিবেশন ও এডিটোরিয়াল গাইডলাইন।' },
  { name: 'corrections-policy', title: 'সংশোধনী ও সত্যতা যাচাই নীতি - বারুইপুর অনলাইন', desc: 'সংবাদের নির্ভুলতা ও দ্রুত সংশোধনের স্বচ্ছ বিধিমালার বিবরণ।' },
  { name: 'events', title: 'বারুইপুরের মেলা ও উৎসব ক্যালেন্ডার - বারুইপুর অনলাইন', desc: 'ঐতিহাসিক রাসমেলা, রথযাত্রা, দুর্গাপূজা ও মেলা সমূহের দিনক্ষণ ও নির্দেশিকা।' },
  { name: 'privacy-policy', title: 'গোপনীয়তা নীতি (Privacy Policy) - বারুইপুর অনলাইন', desc: 'ব্যবহারকারীর ডেটা সুরক্ষা ও নিরাপত্তা সংক্রান্ত তথ্যাবলি।' },
  { name: 'terms-of-service', title: 'ব্যবহারের শর্তাবলী (Terms of Service) - বারুইপুর অনলাইন', desc: 'পোর্টাল ব্যবহারের বিধিবদ্ধ শর্তাবলী ও আইনি নিয়মাবলী।' },
  { name: 'disclaimer', title: 'দাবিত্যাগ ও দায়মুক্তি (Disclaimer) - বারুইপুর অনলাইন', desc: 'তথ্যের উৎস ও নির্ভরযোগ্যতা সংক্রান্ত সাধারণ দাবিত্যাগ।' }
];

institutionalPages.forEach(p => {
  const pPath = path.join(__dirname, '..', 'src', 'app', p.name, 'page.tsx');
  if (fs.existsSync(pPath)) {
    let pContent = fs.readFileSync(pPath, 'utf-8').replace(/\r\n/g, '\n');
    if (!pContent.includes('twitter:')) {
      pContent = pContent.replace(
        "    ]\n  }\n};",
        `    ]\n  },\n  twitter: {\n    card: 'summary_large_image',\n    title: '${p.title}',\n    description: '${p.desc}',\n    images: ['https://baruipur.online/images/og-image.png'],\n    site: '@BaruipurOnline'\n  }\n};`
      );
      fs.writeFileSync(pPath, pContent, 'utf-8');
      console.log(`✓ Added Twitter card to src/app/${p.name}/page.tsx`);
    }
  }
});


// 10. Contact Layout: src/app/contact/layout.tsx
const contactLayoutPath = path.join(__dirname, '..', 'src', 'app', 'contact', 'layout.tsx');
const contactLayoutCode = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ ও বার্তা ডেস্ক (Contact Us) - বারুইপুর অনলাইন',
  description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর, বিজ্ঞাপনী যোগাযোগ, সংবাদ পরিবেশন ও সাধারণ অনুসন্ধানের ঠিকানা ও হেল্পলাইন।',
  alternates: {
    canonical: 'https://baruipur.online/contact/',
  },
  openGraph: {
    title: 'যোগাযোগ ও বার্তা ডেস্ক - বারুইপুর অনলাইন',
    description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর, বিজ্ঞাপনী যোগাযোগ ও সাধারণ অনুসন্ধানের ঠিকানা।',
    url: 'https://baruipur.online/contact/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন যোগাযোগ ও বার্তা ডেস্ক',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'যোগাযোগ ও বার্তা ডেস্ক | Baruipur Online',
    description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর ও যোগাযোগের অফিসিয়াল পোর্টাল।',
    images: ['https://baruipur.online/images/og-image.png'],
    site: '@BaruipurOnline'
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
fs.writeFileSync(contactLayoutPath, contactLayoutCode, 'utf-8');
console.log('✓ Created src/app/contact/layout.tsx with OpenGraph & Twitter Card');


// 11. Submit News Layout: src/app/submit-news/layout.tsx
const submitLayoutPath = path.join(__dirname, '..', 'src', 'app', 'submit-news', 'layout.tsx');
const submitLayoutCode = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সংবাদ বা নাগরিক সমস্যা পাঠান (Submit News) - বারুইপুর অনলাইন',
  description: 'আপনার এলাকার ঘটে যাওয়া গুরুত্বপূর্ণ খবর, নাগরিক সমস্যা বা ভিডিও সরাসরি বারুইপুর অনলাইন বার্তা ডেস্কে পাঠান।',
  alternates: {
    canonical: 'https://baruipur.online/submit-news/',
  },
  openGraph: {
    title: 'সংবাদ পাঠান - বারুইপুর অনলাইন বার্তা ডেস্ক',
    description: 'আপনার এলাকার সমস্যা বা ঘটনার বিবরণ সরাসরি সংবাদ ডেস্কে পৌঁছে দিন।',
    url: 'https://baruipur.online/submit-news/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন সংবাদ প্রেরণ পোর্টাল',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সংবাদ বা নাগরিক সমস্যা পাঠান | Baruipur Online',
    description: 'আপনার এলাকার সমস্যা বা ঘটনা সরাসরি বারুইপুর অনলাইন ডেস্কে পাঠান।',
    images: ['https://baruipur.online/images/og-image.png'],
    site: '@BaruipurOnline'
  }
};

export default function SubmitNewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
fs.writeFileSync(submitLayoutPath, submitLayoutCode, 'utf-8');
console.log('✓ Created src/app/submit-news/layout.tsx with OpenGraph & Twitter Card');


// 12. Polish [slug]/page.tsx Twitter & OG
const postSlugPath = path.join(__dirname, '..', 'src', 'app', '[slug]', 'page.tsx');
let postSlugContent = fs.readFileSync(postSlugPath, 'utf-8').replace(/\r\n/g, '\n');

if (!postSlugContent.includes("site: '@BaruipurOnline'")) {
  postSlugContent = postSlugContent.replace(
    "    twitter: {\n      card: 'summary_large_image',\n      title: article.title,\n      description: cleanDesc,\n      images: [imageUrl],\n    },",
    `    twitter: {\n      card: 'summary_large_image',\n      title: article.title,\n      description: cleanDesc,\n      images: [imageUrl],\n      site: '@BaruipurOnline',\n      creator: '@BaruipurOnline'\n    },`
  );
  fs.writeFileSync(postSlugPath, postSlugContent, 'utf-8');
  console.log('✓ Added Twitter site and creator to src/app/[slug]/page.tsx');
}

// 13. Polish places/[slug]/page.tsx Twitter
const placeDetailPath = path.join(__dirname, '..', 'src', 'app', 'places', '[slug]', 'page.tsx');
let placeDetailContent = fs.readFileSync(placeDetailPath, 'utf-8').replace(/\r\n/g, '\n');

if (!placeDetailContent.includes("site: '@BaruipurOnline'")) {
  placeDetailContent = placeDetailContent.replace(
    "    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n    }",
    `    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n      images: [image.startsWith('http') ? image : \`https://baruipur.online\${image}\`],\n      site: '@BaruipurOnline'\n    }`
  );
  fs.writeFileSync(placeDetailPath, placeDetailContent, 'utf-8');
  console.log('✓ Added Twitter images and site to src/app/places/[slug]/page.tsx');
}

// 14. Polish organizations/[slug]/page.tsx Twitter
const orgDetailPath = path.join(__dirname, '..', 'src', 'app', 'organizations', '[slug]', 'page.tsx');
let orgDetailContent = fs.readFileSync(orgDetailPath, 'utf-8').replace(/\r\n/g, '\n');

if (!orgDetailContent.includes("site: '@BaruipurOnline'")) {
  orgDetailContent = orgDetailContent.replace(
    "    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n    }",
    `    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n      images: [org.coverImage.startsWith('http') ? org.coverImage : \`https://baruipur.online\${org.coverImage}\`],\n      site: '@BaruipurOnline'\n    }`
  );
  fs.writeFileSync(orgDetailPath, orgDetailContent, 'utf-8');
  console.log('✓ Added Twitter images and site to src/app/organizations/[slug]/page.tsx');
}

// 15. Polish health-directory/[slug]/page.tsx Twitter
const healthDetailPath = path.join(__dirname, '..', 'src', 'app', 'health-directory', '[slug]', 'page.tsx');
let healthDetailContent = fs.readFileSync(healthDetailPath, 'utf-8').replace(/\r\n/g, '\n');

if (!healthDetailContent.includes("site: '@BaruipurOnline'")) {
  healthDetailContent = healthDetailContent.replace(
    "    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n    }",
    `    twitter: {\n      card: 'summary_large_image',\n      title,\n      description: cleanDesc,\n      images: [facility.coverImage ? (facility.coverImage.startsWith('http') ? facility.coverImage : \`https://baruipur.online\${facility.coverImage}\`) : 'https://baruipur.online/images/og-image.png'],\n      site: '@BaruipurOnline'\n    }`
  );
  fs.writeFileSync(healthDetailPath, healthDetailContent, 'utf-8');
  console.log('✓ Added Twitter images and site to src/app/health-directory/[slug]/page.tsx');
}

console.log('\n🎉 All OpenGraph and Twitter Cards implemented successfully across all routes!');
