import React from 'react';
import type { Metadata } from 'next';
import { getAllPlaces } from '@/lib/places';
import PlacesListClient from '@/components/PlacesListClient';
import { 
  ChevronRight, 
  Landmark
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নাগরিক নির্দেশিকা | বারুইপুর Baruipur',
  description: 'বারুইপুর পৌরসভা, আদালত, রবীন্দ্র ভবন ও নিউ ইন্ডিয়ান গ্রাউন্ড, মা শিবানী পীঠ, জোড়া শিব মন্দির, নেতাজির পৈতৃক ভিটে, ধপধপি কালীবাড়ি, ক্যাথিড্রাল চার্চ, পুরাতন বাজার, পুলিশ জেলা, হাসপাতাল, কলেজ ও পিকনিক স্পট সহ শহরের ২৮টি প্রধান স্থানের পূর্ণাঙ্গ তথ্যকোষ।',
  keywords: [
    'Baruipur Municipality', 'Baruipur Police District', 'Baruipur College', 'Baruipur Court',
    'Baruipur Rabindra Bhawan', 'Maa Shibani Pith', 'Baruipur Jora Shiva Mandir', 'Subhash Bhavan Kodalia',
    'Dhapdhapi Kali Mandir', 'Baruipur Cathedral Church', 'Baruipur Puratan Bazar', 'Neeldeep Garden',
    'Baruipur Film City', 'Baruipur BDO', 'Baruipur SDO', 'Baruipur Town Library',
    'Baruipur Mahaprabhu Tala', 'Baruipur Women Police Station', 'Baruipur Aranyak', 'Baruipur Rajbari',
    'Baruipur Happy Valley', 'Baruipur Swimming pool', 'Baruipur Rashmath', 'Baruipur bypass', 'Baruipur guide'
  ],
  alternates: {
    canonical: 'https://baruipur.online/places/',
  },
  openGraph: {
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',
    description: 'আদালত, রবীন্দ্র ভবন, মা শিবানী পীঠ, জোড়া শিব মন্দির, নেতাজির পৈতৃক ভিটে, পৌরসভা, কলেজ, আরণ্যক ও রাজবাড়ির পূর্ণাঙ্গ তথ্য ও নির্দেশিকা।',
    url: 'https://baruipur.online/places/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',
    description: 'বারুইপুরের ঐতিহাসিক, আধ্যাত্মিক ও প্রশাসনিক ২৮টি গুরুত্বপূর্ণ স্থানের পূর্ণাঙ্গ তথ্যকোষ।',
  }
};

export default function PlacesIndexPage() {
  const places = getAllPlaces();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নাগরিক নির্দেশিকা',
    description: 'বারুইপুর পৌরসভা, পুলিশ জেলা, সুইমিং পুল, রাসমাঠ ও বাইপাসের বিস্তারিত তথ্যকোষ।',
    url: 'https://baruipur.online/places/',
    isPartOf: {
      '@type': 'WebSite',
      name: 'বারুইপুর Baruipur',
      url: 'https://baruipur.online/'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'প্রচ্ছদ',
        item: 'https://baruipur.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'গুরুত্বপূর্ণ স্থান ও তথ্য',
        item: 'https://baruipur.online/places/'
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Important Places of Baruipur',
    itemListElement: places.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${p.nameBn} (${p.nameEn})`,
      url: `https://baruipur.online/places/${p.slug}/`
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">গুরুত্বপূর্ণ স্থান ও নির্দেশিকা</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-lg border border-slate-700/50">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5" />
            বারুইপুর পরিচিতি ও নির্দেশিকা
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            বারুইপুরের গুরুত্বপূর্ণ স্থান ও প্রধান প্রতিষ্ঠান
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ঐতিহাসিক পৌরসভা থেকে শুরু করে পুলিশ জেলা সদর, আধুনিক সুইমিং পুল কমপ্লেক্স, শতবর্ষ প্রাচীন রাসমাঠ, ফিল্ম সিটি, রাজবাড়ি কিংবা কলকাতার সাথে সংযোগকারী আধুনিক বাইপাস—বারুইপুরের প্রতিটি প্রধান স্থানের পূর্ণাঙ্গ তথ্য, ছবি, ভিডিও, যোগাযোগের নম্বর ও গুগল ম্যাপ নির্দেশিকা।
          </p>
        </div>
      </div>

      {/* Interactive Search & Places Directory */}
      <PlacesListClient places={places} />
    </div>
  );
}
