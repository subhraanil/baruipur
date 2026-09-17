import React from 'react';
import type { Metadata } from 'next';
import { getAllPlaces } from '@/lib/places';
import { 
  Building2, 
  ShieldAlert, 
  Waves, 
  Sparkles, 
  Compass, 
  Hospital, 
  TrainTrack, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight,
  Landmark,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নাগরিক নির্দেশিকা | বারুইপুর Baruipur',
  description: 'বারুইপুর পৌরসভা, বারুইপুর পুলিশ জেলা, বারুইপুর কলেজ, সংশোধনাগার (জেল), ফিল্ম সিটি, বিডিও ও এসডিও অফিস, টাউন লাইব্রেরি, মহাপ্রভুতলা ও সদাব্রত ঘাট, মহিলা থানা, আরণ্যক, রাজবাড়ি ও হ্যাপি ভ্যালি সহ শহরের গুরুত্বপূর্ণ সকল স্থান ও প্রতিষ্ঠানের পূর্ণাঙ্গ তথ্যকোষ।',
  keywords: [
    'Baruipur Municipality', 'Baruipur Police District', 'Baruipur College', 'Baruipur Jail',
    'Baruipur Film City', 'Baruipur BDO', 'Baruipur SDO', 'Baruipur Town Library',
    'Baruipur Mahaprabhu Tala and Sadabrata Ghat', 'Baruipur Women Police Station',
    'Baruipur Aranyak', 'Baruipur Rajbari', 'Baruipur Happy Valley',
    'Baruipur Swimming pool', 'Baruipur Rashmath', 'Baruipur bypass', 'বারুইপুর কলেজ',
    'বারুইপুর জেল', 'বারুইপুর ফিল্ম সিটি', 'বারুইপুর রাজবাড়ি', 'মহাপ্রভুতলা ও সদাব্রত ঘাট', 'Baruipur guide'
  ],
  alternates: {
    canonical: 'https://baruipur.online/places/',
  },
  openGraph: {
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',
    description: 'পৌরসভা, কলেজ, সংশোধনাগার, ফিল্ম সিটি, বিডিও, এসডিও, লাইব্রেরি, মহাপ্রভুতলা, মহিলা থানা, আরণ্যক, রাজবাড়ি ও হ্যাপি ভ্যালির পূর্ণাঙ্গ তথ্য ও নির্দেশিকা।',
    url: 'https://baruipur.online/places/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',
    description: 'বারুইপুরের ঐতিহাসিক ও প্রশাসনিক সকল গুরুত্বপূর্ণ স্থানের পূর্ণাঙ্গ তথ্যকোষ।',
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'civic': return <Building2 className="w-6 h-6 text-emerald-600" />;
    case 'police': return <ShieldAlert className="w-6 h-6 text-rose-600" />;
    case 'sports': return <Waves className="w-6 h-6 text-cyan-600" />;
    case 'culture': return <Sparkles className="w-6 h-6 text-amber-600" />;
    case 'education': return <GraduationCap className="w-6 h-6 text-purple-600" />;
    case 'infrastructure': return <Compass className="w-6 h-6 text-blue-600" />;
    case 'health': return <Hospital className="w-6 h-6 text-teal-600" />;
    case 'transit': return <TrainTrack className="w-6 h-6 text-indigo-600" />;
    default: return <Landmark className="w-6 h-6 text-slate-600" />;
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
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-lg border border-slate-700/50">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5" />
            বারুইপুর পরিচিতি ও নির্দেশিকা
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            বারুইপুরের গুরুত্বপূর্ণ স্থান ও প্রধান প্রতিষ্ঠান
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ঐতিহাসিক পৌরসভা থেকে শুরু করে পুলিশ জেলা সদর, আধুনিক সুইমিং পুল কমপ্লেক্স, শতবর্ষ প্রাচীন রাসমাঠ কিংবা কলকাতার সাথে সংযোগকারী আধুনিক ৪-লেনের বাইপাস—বারুইপুরের প্রতিটি প্রধান স্থানের পূর্ণাঙ্গ তথ্য, ইতিহাস, যোগাযোগের নম্বর ও নাগরিক পরিষেবা নির্দেশিকা।
          </p>
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <article 
            key={place.slug}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-red-50 transition">
                  {getCategoryIcon(place.category)}
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  {place.established}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition mb-1 leading-snug">
                <a href={`/places/${place.slug}/`}>
                  {place.nameBn}
                </a>
              </h2>
              <h3 className="text-xs font-semibold text-slate-500 mb-3 tracking-wide">
                {place.nameEn}
              </h3>

              <p className="text-xs text-red-700 font-semibold mb-3">
                {place.taglineBn}
              </p>

              <p className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                {place.overview}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-150 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
                {place.contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-700">{place.contact.phone}</span>
                  </div>
                )}
                {place.timings && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="line-clamp-1 text-slate-500">{place.timings}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
              <span>সম্পূর্ণ তথ্য ও নির্দেশিকা পড়ুন</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
