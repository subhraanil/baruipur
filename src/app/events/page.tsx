import React from 'react';
import type { Metadata } from 'next';
import { 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  MapPin, 
  Clock, 
  Coins, 
  Trophy, 
  Flame, 
  Flag, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  Users, 
  ShoppingBag, 
  Music, 
  Waves
} from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'বারুইপুরের উৎসব, মেলা ও বার্ষিক অনুষ্ঠান ক্যালেন্ডার ২০২৬ (Events Guide) | Baruipur Online',
  description: 'বারুইপুর মিলন মেলা (নিউ ইন্ডিয়ান গ্রাউন্ড), ঐতিহাসিক রাসমেলা, সেরা দুর্গাপূজা ও কালীপূজা মণ্ডপ, এবং রাসমাঠের রিয়েল স্টার ফুটবল ও সামারসেট ক্রিকেট টুর্নামেন্টের পূর্ণাঙ্গ নির্দেশিকা ও বার্ষিক ক্যালেন্ডার।',
  keywords: [
    'বারুইপুর মিলন মেলা',
    'Baruipur Milan Mela',
    'বারুইপুর রাসমেলা',
    'বারুইপুর দুর্গাপূজা',
    'বারুইপুর কালীপূজা',
    'Real Star Club Baruipur',
    'Somerset Club Cricket Baruipur',
    'নিউ ইন্ডিয়ান গ্রাউন্ড',
    'বারুইপুর রাসমাঠ',
    'Events in Baruipur'
  ],
  alternates: {
    canonical: 'https://baruipur.online/events/',
  },
  openGraph: {
    title: 'বারুইপুরের উৎসব, মেলা ও বার্ষিক অনুষ্ঠান ক্যালেন্ডার ২০২৬ | Baruipur Online',
    description: 'মিলন মেলা, ঐতিহাসিক রাসমেলা, রাসমাঠের ফুটবল-ক্রিকেট টুর্নামেন্ট, প্রজাতন্ত্র দিবস এবং দুর্গাপূজা ও কালীপূজার সেরা মণ্ডপ তালিকা।',
    url: 'https://baruipur.online/events/',
    type: 'website',
    locale: 'bn_IN',
    siteName: 'বারুইপুর Baruipur',
  }
};

export default function EventsPage() {
  const annualCalendar = [
    { 
      month: 'জানুয়ারি (January)', 
      event: 'বারুইপুর বইমেলা, সরস্বতী পূজা ও প্রজাতন্ত্র দিবস কুচকাওয়াজ', 
      location: 'পদ্মপুকুর মোড়, রাসমাঠ ও মহকুমার শিক্ষাপ্রতিষ্ঠান', 
      highlight: 'বার্ষিক বই প্রদর্শনী, বিদ্যাদেবীর আরাধনা এবং ২৬ জানুয়ারি রাসমাঠে মহকুমা প্রশাসনের বর্ণাঢ্য কুচকাওয়াজ ও ক্রীড়া উৎসব।' 
    },
    { 
      month: 'ফেব্রুয়ারি (February)', 
      event: 'রিয়েল স্টার ফুটবল উৎসব ও জেলা ক্রীড়া প্রতিযোগিতা', 
      location: 'বারুইপুর রাসমাঠ ক্রীড়া প্রাঙ্গণ', 
      highlight: 'রিয়েল স্টার ক্লাবের বার্ষিক নকআউট ফুটবল টুর্নামেন্ট, জমজমাট নৈশ ম্যাচ ও তারকাদের উপস্থিতি।' 
    },
    { 
      month: 'মার্চ (March)', 
      event: 'মহাশিবরাত্রি, দোলযাত্রা ও প্রাচীন দোলমঞ্চে বারুণী মেলা', 
      location: 'মা শিবানীপীঠ, রাজবাড়ি মন্দির ও ২০০ বছরের প্রাচীন দোলমঞ্চ', 
      highlight: 'ঐতিহাসিক আবীর খেলা, দোলমঞ্চে ভক্ত সমাগম ও মহাপ্রভুর মহিমাকীর্তন উৎসব।' 
    },
    { 
      month: 'এপ্রিল (April)', 
      event: 'চৈত্র সংক্রান্তি ও চড়ক মেলা, পয়লা বৈশাখ ও সামারসেট ক্রিকেট ফাইনাল', 
      location: 'কাছারি বাজার, শিবানীপীঠ চত্বর ও রাসমাঠ', 
      highlight: 'বাংলা নববর্ষের হালখাতা উৎসব এবং রাসমাঠে সামারসেট ক্লাবের ক্রিকেট টুর্নামেন্টের ফাইনাল ও সঙ্গীতানুষ্ঠান।' 
    },
    { 
      month: 'মে (May)', 
      event: 'রবীন্দ্র-নজরুল জয়ন্তী ও বসন্ত সাংস্কৃতিক উৎসব', 
      location: 'বারুইপুর রবীন্দ্র ভবন ও সংস্কৃতি কেন্দ্র', 
      highlight: 'নাটক, রবীন্দ্রসংগীত ও নৃত্যনাট্যের জমকালো সাংস্কৃতিক সান্ধ্য আসর।' 
    },
    { 
      month: 'জুন (June)', 
      event: 'পরিবেশ সচেতনতা দিবস ও বৃক্ষরোপণ উৎসব', 
      location: 'গ্রিন সিটি মিশন এলাকা ও মহকুমা প্রাঙ্গণ', 
      highlight: 'পৌরসভা ও সামাজিক সংগঠনগুলির যৌথ উদ্যোগে চারা গাছ বিতরণ ও পদযাত্রা।' 
    },
    { 
      month: 'জুলাই (July)', 
      event: 'ঐতিহাসিক রথযাত্রা মহোৎসব ও মেলা', 
      location: 'সদাব্রত ঘাট, রাসমাঠ ও জগন্নাথ মন্দির রোড', 
      highlight: 'সাড়ে তিন শতাব্দীর প্রাচীন রথটান, উল্টোরথ ও রাসমাঠে জিলিপি-পাপড়ের আনন্দমেলা।' 
    },
    { 
      month: 'আগস্ট (August)', 
      event: 'স্বাধীনতা দিবস (১৫ আগস্ট) ও রাখিবন্ধন উৎসব', 
      location: 'বারুইপুর মহকুমা শাসক দপ্তর, থানা ও রাসমাঠ', 
      highlight: 'জাতীয় পতাকা উত্তোলন, প্রভাতফেরি ও সাম্প্রদায়িক সম্প্রীতির রাখিবন্ধন।' 
    },
    { 
      month: 'সেপ্টেম্বর (September)', 
      event: 'বিশ্বকর্মা পূজা ও গণেশ মহোৎসব', 
      location: 'বারুইপুর রেল জংশন স্ট্যান্ড, অটো-টোটো স্ট্যান্ড ও শিল্পাঞ্চল', 
      highlight: 'সার্জিক্যাল ও কুটির শিল্পাঞ্চলে যন্ত্রপূজা এবং চোখধাঁধানো আলোকসজ্জা।' 
    },
    { 
      month: 'অক্টোবর (October)', 
      event: 'শারদীয়া দুর্গাপূজা ও লক্ষ্মীপূজা', 
      location: 'ফুলতলা, পদ্মপুকুর, প্রগতি সংঘ ও রাজবাড়ি সহ ৫০+ মণ্ডপ', 
      highlight: 'বিশাল থিম মণ্ডপ, রাজবাড়ির ৩০০ বছরের বনেদি কামান দাগা পূজা ও বিজয়ার শোভাযাত্রা।' 
    },
    { 
      month: 'নভেম্বর (November)', 
      event: 'ঐতিহাসিক বারুইপুর রাসমেলা, মহা শ্যামাপূজা ও বারুইপুর মিলন মেলা সূচনা', 
      location: 'বারুইপুর রাসমাঠ ও নিউ ইন্ডিয়ান গ্রাউন্ড (রবীন্দ্র ভবনের বিপরীতে)', 
      highlight: '২৫০+ বছরের প্রাচীন রাজবাড়ির রাসমেলা এবং নিউ ইন্ডিয়ান গ্রাউন্ডে মাসব্যাপী জমকালো মিলন মেলার শুভ সূচনা।' 
    },
    { 
      month: 'ডিসেম্বর (December)', 
      event: 'বারুইপুর মিলন মেলা (Milan Mela) ও শীতকালীন উৎসব', 
      location: 'নিউ ইন্ডিয়ান গ্রাউন্ড (কুলপী রোড, রবীন্দ্র ভবনের সামনে)', 
      highlight: 'লাইভ মৎসকন্যা প্রদর্শনী, সুনামি ও নাগরদোলা রাইড, মেগা ফুড কোর্ট ও হস্তশিল্প মেলা।' 
    }
  ];

  const durgaPujas = [
    {
      name: 'ফুলতলা বিধানস্মৃতি সংঘ (Fultala Bidhan Smriti Sangha)',
      area: 'ফুলতলা / বারুইপুর বাইপাস মোড়',
      type: 'মেগা থিম পূজা ও বিশাল প্যান্ডেল',
      highlight: 'বারুইপুর মহকুমার অন্যতম প্রধান ভিড় টানার কেন্দ্র। প্রতি বছর অনন্য শৈল্পিক থিম, আকাশছোঁয়া মণ্ডপ ও আধুনিক লাইট অ্যান্ড সাউন্ডের অপূর্ব মেলবন্ধন ঘটে এখানে।'
    },
    {
      name: 'পদ্মপুকুর ইয়ুথ ক্লাব (Padmapukur Youth Club)',
      area: 'পদ্মপুকুর মোড়, কুলপী রোড',
      type: 'সৃজনশীল কনসেপ্ট থিম ও আলোকসজ্জা',
      highlight: 'শহরের প্রাণকেন্দ্রে অবস্থিত এই ক্লাবের পূজা দর্শনার্থীদের অন্যতম প্রধান আকর্ষণ। সূক্ষ্ম শিল্পকর্ম, প্রতিমার অনন্য রূপ এবং সামাজিক বার্তা বহনকারী মণ্ডপসজ্জা এদের বৈশিষ্ট্য।'
    },
    {
      name: 'বারুইপুর প্রগতি সংঘ (Baruipur Pragati Sangha)',
      area: 'স্টেশন রোড সংলগ্ন',
      type: 'ঐতিহ্য ও আধুনিক থিমের মেলবন্ধন',
      highlight: 'বারুইপুরের অন্যতম প্রাচীন ও মর্যাদাপূর্ণ দুর্গাপূজা। জমকালো আলোকসজ্জা, সাংস্কৃতিক অনুষ্ঠান এবং শৃঙ্খলাপরায়ণ উৎসব পরিচালনার জন্য সুপরিচিত।'
    },
    {
      name: 'শাসন বালক সংঘ (Sasan Balak Sangha)',
      area: 'শাসন রোড, বারুইপুর',
      type: 'আকর্ষণীয় থিম ও শৈল্পিক প্রতিমা',
      highlight: 'শাসন রোডের জনপ্রিয় এই পূজা দর্শনার্থীদের নজর কাড়ে উদ্ভাবনী উপাদানে নির্মিত মণ্ডপ ও নান্দনিক প্রতিমা ভাস্কর্যের জন্য।'
    },
    {
      name: 'ভাই ভাই সঙ্ঘ (Bhai Bhai Sangha, Subuddhipur)',
      area: 'সুবুদ্ধিপুর, বারুইপুর',
      type: 'পারিবারিক আবহ ও থিম প্যাভিলিয়ন',
      highlight: 'সুবুদ্ধিপুর এলাকার অন্যতম প্রাণবন্ত পুজো। সামাজিক সেবামূলক কর্মসূচি এবং ঐতিহ্যবাহী পুষ্পাঞ্জলি ও প্রসাদ বিতরণের জন্য খ্যাত।'
    },
    {
      name: 'বারুইপুর সার্বজনীন দুর্গোৎসব (Puratan Bazar)',
      area: 'পুরাতন বাজার, কুলপী রোড',
      type: 'শতবর্ষ প্রাচীন সার্বজনীন সাবেকি পূজা',
      highlight: 'বারুইপুরের প্রাচীনতম সার্বজনীন দুর্গোৎসব। বিশুদ্ধ সাবেকি একচালার প্রতিমা, ঐতিহ্যবাহী ঢাকের বাদ্য এবং ব্যবসায়ী সম্প্রদায়ের আন্তরিক মিলনমেলা।'
    },
    {
      name: 'বারুইপুর রাজবাড়ি দুর্গোৎসব (Roychowdhury Heritage Puja)',
      area: 'রাজবাড়ি নাটমন্দির চত্বর',
      type: '৩০০ বছরের প্রাচীন জমিদারি বনেদি পূজা',
      highlight: '১৭ শতাব্দী থেকে শুরু হওয়া জমিদার বংশের ঐতিহ্য। অষ্টমীতে প্রাচীন কামান দাগা, আটচালা নাটমন্দিরে দেবীবন্দনা এবং দশমীতে রূপোর পাখা ও ঝাঁটা সহযোগে ঐতিহাসিক বিসর্জন।'
    }
  ];

  const kaliPujas = [
    {
      name: 'ফুলতলা বিধান স্মৃতি সঙ্ঘ কালীপূজা',
      area: 'ফুলতলা, বারুইপুর',
      highlight: 'দুর্গাপূজার মতোই কালীপূজাতেও চোখধাঁধানো চন্দননগরের ইলেকট্রিক আলোকসজ্জা, বিশাল প্রতিমা ও দৃষ্টিনন্দন মণ্ডপ সজ্জায় শহর কাঁপায়।'
    },
    {
      name: 'পদ্মপুকুর ইয়ুথ ক্লাব শ্যামাপূজা',
      area: 'পদ্মপুকুর চত্বর',
      highlight: 'কার্তিক অমাবস্যার রাতে মোহময় আলোর মায়াজাল ও আধুনিক ভাবনার শ্যামাপূজা নিয়ে হাজির হয় এই ক্লাব।'
    },
    {
      name: 'ঐতিহাসিক মা শিবানীপীঠ কালীপূজা (Shibanipith)',
      area: 'কুলপী রোড, বারুইপুর',
      highlight: 'জাগ্রত সিদ্ধ শক্তিপীঠে কার্তিক অমাবস্যার গভীর রাতের তন্ত্রোক্ত নিশাপূজা, বিশেষ হোমযজ্ঞ ও দূর-দূরান্ত থেকে আসা ভক্তদের মাঝে মহাপ্রসাদ বিতরণ।'
    },
    {
      name: 'সুবুদ্ধিপুর ভাই ভাই সঙ্ঘ কালীপূজা',
      area: 'সুবুদ্ধিপুর রোড',
      highlight: 'জমকালো আলোকমালা, ভক্তিগীতি ও গভীর রাত পর্যন্ত ভক্তদের পুষ্পাঞ্জলির সুব্যবস্থা।'
    },
    {
      name: 'মাদারাত শ্রীশ্রী রক্ষা কালী মন্দির',
      area: 'মাদারাত বাজার',
      highlight: 'শতাব্দীপ্রাচীন জাগ্রত রক্ষা কালী পূজা উপলক্ষে বাৎসরিক লোকউৎসব ও গ্রামীণ মেলার আনন্দমুখর পরিবেশ।'
    },
    {
      name: 'বারুইপুর কালীবাড়ি (মা জগত্তারিণী মন্দির)',
      area: 'কাছারি বাজার সংলগ্ন',
      highlight: 'শহরের অন্যতম প্রাচীন ধর্মীয় কেন্দ্র। ঐতিহ্যের রাতজাগা উপাসনা, সহস্র প্রদীপ প্রজ্জ্বলন ও ভক্তদের সমাগম।'
    }
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'বারুইপুরের প্রধান উৎসব ও মেলা সমূহ ২০২৬',
    description: 'বারুইপুর মিলন মেলা, ঐতিহাসিক রাসমেলা, রাসমাঠের টুর্নামেন্ট এবং দুর্গাপূজা ও কালীপূজার তালিকা',
    itemListElement: [
      {
        '@type': 'Event',
        position: 1,
        name: 'বারুইপুর মিলন মেলা (Baruipur Milan Mela)',
        startDate: '2026-11-05',
        endDate: '2026-12-15',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'New Indian Ground (রবীন্দ্র ভবনের বিপরীতে)',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kulpi Road, Near Baruipur Railway Station',
            addressLocality: 'Baruipur',
            postalCode: '700144',
            addressRegion: 'West Bengal',
            addressCountry: 'IN'
          }
        },
        description: 'লাইভ মৎসকন্যা শো, সুনামি রাইড, নাগরদোলা, মেগা ফুড কোর্ট ও হস্তশিল্প সম্বলিত বারুইপুরের মাসব্যাপী শীতকালীন মেগা মিলন মেলা।'
      },
      {
        '@type': 'Event',
        position: 2,
        name: 'ঐতিহাসিক বারুইপুর রাসমেলা (Baruipur Rash Mela)',
        startDate: '2026-11-23',
        endDate: '2026-12-08',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'বারুইপুর রাসমাঠ',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Baruipur',
            postalCode: '700144',
            addressRegion: 'West Bengal',
            addressCountry: 'IN'
          }
        },
        description: '১৭৫০ সালের রায়চৌধুরী জমিদারি আমল থেকে চলে আসা দক্ষিণ ২৪ পরগনার প্রাচীনতম লোকউৎসব ও ১৫ দিনব্যাপী মেলা।'
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 overflow-x-auto">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-bold truncate">উৎসব, মেলা ও অনুষ্ঠান নির্দেশিকা</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            বারুইপুর ইভেন্টস ও ফেস্টিভ্যাল গাইড ২০২৬
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            বারুইপুরের উৎসব, মেলা ও বার্ষিক অনুষ্ঠান নির্দেশিকা
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-3xl mb-6 font-normal">
            বিখ্যাত <strong>বারুইপুর মিলন মেলা</strong>, ২৫০ বছরের প্রাচীন <strong>ঐতিহাসিক রাসমেলা</strong>, সেরা দুর্গাপূজা ও কালীপূজা মণ্ডপ পরিক্রমা এবং রাসমাঠের <strong>রিয়েল স্টার ফুটবল</strong> ও <strong>সামারসেট ক্রিকেট</strong> টুর্নামেন্টের সম্পূর্ণ বিস্তারিত ও বার্ষিক ক্যালেন্ডার।
          </p>

          {/* Quick Anchor Badges */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <a href="#milan-mela" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>🎡 বারুইপুর মিলন মেলা</span>
            </a>
            <a href="#rash-mela" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>🪔 ঐতিহাসিক রাসমেলা</span>
            </a>
            <a href="#rashmath-sports" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>⚽ রাসমাঠের টুর্নামেন্ট</span>
            </a>
            <a href="#durga-puja" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>🏮 সেরা দুর্গাপূজা</span>
            </a>
            <a href="#kali-puja" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>🔥 সেরা কালীপূজা</span>
            </a>
            <a href="#annual-calendar" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
              <span>📅 ১২ মাসের ক্যালেন্ডার</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Leaderboard Ad */}
      <AdSenseSlot format="leaderboard" className="mb-8" />

      <div className="space-y-12">
        {/* Section 1: Baruipur Milan Mela Spotlight */}
        <section id="milan-mela" className="bg-gradient-to-br from-amber-500/10 via-white to-red-500/10 rounded-3xl border-2 border-amber-300 p-6 sm:p-9 shadow-md relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                শীতকালীন মেগা কার্নিভাল স্পটলাইট
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                বারুইপুর মিলন মেলা (Baruipur Milan Mela)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                দক্ষিণ ২৪ পরগনার অন্যতম বৃহত্তম মাসব্যাপী শীতকালীন বিনোদন, রাইডস ও হস্তশিল্প মেগা মেলা
              </p>
            </div>
            <a
              href="https://www.facebook.com/milanmelabaruipur/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs self-start"
            >
              <span>অফিসিয়াল ফেসবুক পেজ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
            প্রতি বছর শীতের শুরুতে <strong>নভেম্বর ও ডিসেম্বর</strong> মাস জুড়ে বারুইপুরের কুলপী রোডে <strong>নিউ ইন্ডিয়ান গ্রাউন্ডে</strong> (বারুইপুর রবীন্দ্র ভবনের ঠিক বিপরীতে) অনুষ্ঠিত হয় সুবিশাল <strong>বারুইপুর মিলন মেলা</strong>। শিশু থেকে শুরু করে পরিবার-পরিজন সকলের জন্য এই মেলা একটি অন্যতম প্রধান আকর্ষণ। চোখধাঁধানো অ্যামিউজমেন্ট পার্ক, আন্তর্জাতিক মানের বিশেষ প্রদর্শনী, সুবিশাল ফুড কোর্ট এবং সারা ভারতের ঐতিহ্যবাহী হস্তশিল্পের সম্ভার নিয়ে এই মেলা জমজমাট রূপ নেয়।
          </p>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block uppercase">স্থান (Venue)</span>
                <strong className="text-xs sm:text-sm text-slate-900 block leading-snug">নিউ ইন্ডিয়ান গ্রাউন্ড</strong>
                <span className="text-[11px] text-slate-500">কুলপী রোড, রবীন্দ্র ভবনের বিপরীতে (স্টেশন সংলগ্ন)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block uppercase">সময়কাল (Duration)</span>
                <strong className="text-xs sm:text-sm text-slate-900 block leading-snug">নভেম্বর ও ডিসেম্বর</strong>
                <span className="text-[11px] text-slate-500">প্রতি বছর একটানা প্রায় ১ মাস ব্যাপী মেলা</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block uppercase">সময়সূচি (Timings)</span>
                <strong className="text-xs sm:text-sm text-slate-900 block leading-snug">বিকাল ৩:৩০ – রাত ৯:৩০</strong>
                <span className="text-[11px] text-slate-500">শনি-রবি ও ছুটির দিনে রাত ১০:০০ পর্যন্ত</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
              <Coins className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block uppercase">প্রবেশমূল্য (Entry Fee)</span>
                <strong className="text-xs sm:text-sm text-slate-900 block leading-snug">মাত্র ₹১০ (জনপ্রতি)</strong>
                <span className="text-[11px] text-slate-500">ছোট শিশুদের প্রবেশ সম্পূর্ণ বিনামূল্যে</span>
              </div>
            </div>
          </div>

          {/* Major Highlights Box */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs">
            <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              মিলন মেলার প্রধান আকর্ষণ ও বিশেষ বিনোদন (Major Attractions)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <Waves className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm mb-1">লাইভ মৎসকন্যা প্রদর্শনী (Live Mermaid Show):</strong>
                  <span className="text-slate-700 leading-relaxed">
                    মেলার অন্যতম সেরা চমক হলো বিশেষ জলকুণ্ডে জাতীয় ও আন্তর্জাতিক মানের পেশাদার অ্যাকোয়া পারফর্মারদের লাইভ আন্ডারওয়াটার মৎসকন্যা প্রদর্শনী, যা ছোট-বড় সকল দর্শনার্থীদের মুগ্ধ করে।
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <Compass className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm mb-1">রোমাঞ্চকর রাইডস ও অ্যামিউজমেন্ট পার্ক:</strong>
                  <span className="text-slate-700 leading-relaxed">
                    সুনামি রাইড (Tsunami Ride), বিশালাকার নাগরদোলা (Giant Wheel), ব্রেকডান্স, ড্রাগন ট্রেন, বাচ্চাদের জাম্পিং ক্যাসেল ও ওয়াটার জর্বিং সহ নানা রোমাঞ্চকর রাইড।
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <ShoppingBag className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm mb-1">হস্তশিল্প, হোম ডেকর ও কেনাকাটার বাজার:</strong>
                  <span className="text-slate-700 leading-relaxed">
                    কাশ্মীরি শাল ও কার্পেট, সাহারানপুরের কাঠের কারুকার্য, রাজস্থানি হোম ডেকর, নিত্যপ্রয়োজনীয় কিচেনওয়্যার, মাটির তৈজসপত্র, বাচ্চাদের খেলনা ও সাশ্রয়ী শীতবস্ত্রের সুবিশাল সমাহার।
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <Flame className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm mb-1">মেগা ফুড কোর্ট ও রসনা তৃপ্তি:</strong>
                  <span className="text-slate-700 leading-relaxed">
                    গরম গরম মুচমুচে জিলিপি, স্টিমড মোমো, কলকাতার রোল ও বিরিয়ানি, চাউমিন, পাভ ভাজি, কফি, কুলফি ও শিশুদের ক্যান্ডি ফ্লসের জন্য আলাদা ফুড কর্নার।
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Historic Rash Mela Spotlight */}
        <section id="rash-mela" className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border border-red-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            ঐতিহ্যবাহী লোকউৎসব স্পটলাইট
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            ঐতিহাসিক বারুইপুর রাসমেলা (Historic Baruipur Rash Mela)
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
            ১৭৫০-এর দশকে বারুইপুরের জমিদার রায়চৌধুরী পরিবারের হাত ধরে শুরু হওয়া বারুইপুর রাসমেলা দক্ষিণ ২৪ পরগনার প্রাচীনতম ও সর্ববৃহৎ লোকউৎসব। প্রতি বছর কার্তিক পূর্ণিমায় মদনমোহন জিউর মন্দির থেকে বর্ণাঢ্য শোভাযাত্রার মাধ্যমে এই মেলার সূচনা হয়। রাসমাঠ চত্বরে একটানা ১৫ থেকে ২০ দিন ধরে মেলা চলে। বাংলার ঐতিহ্যবাহী কৃষি যন্ত্রপাতি, তেরাকোটা সামগ্রী, গ্রামীণ মিষ্টি, নাগরদোলা, পুতুল নাচ ও যাত্রা প্রদর্শনী এই মেলার চিরায়ত বৈশিষ্ট্য।
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              স্থান: বারুইপুর রাসমাঠ (পদ্মপুকুর ও কাছারি বাজার সংযোগস্থল)
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              সময়কাল: প্রতি বছর নভেম্বর (কার্তিক পূর্ণিমা)
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              প্রবেশমূল্য: সম্পূর্ণ বিনামূল্যে
            </span>
          </div>
        </section>

        {/* Section 3: Rash Math Tournaments & Civic Celebrations */}
        <section id="rashmath-sports" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
              <Trophy className="w-3 h-3" />
              ক্রীড়া ও জাতীয় ঐতিহ্য
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              বারুইপুর রাসমাঠের টুর্নামেন্ট ও জাতীয় উৎসব (Rash Math Arena)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              খেলাধুলা ও মহকুমা প্রশাসনের ঐতিহ্যবাহী জাতীয় উদযাপনের প্রধান কেন্দ্র বারুইপুর রাসমাঠ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Real Star Club Football */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-300 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                    ফুটবল উৎসব
                  </span>
                  <Trophy className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  রিয়েল স্টার ক্লাব বারুইপুর ফুটবল টুর্নামেন্ট
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  রিয়েল স্টার ক্লাব (Real Star Club) কর্তৃক বারুইপুর রাসমাঠে আয়োজিত বার্ষিক নকআউট ফুটবল টুর্নামেন্ট সমগ্র দক্ষিণ ২৪ পরগনার অন্যতম সেরা ক্রীড়া মহোৎসব। ফ্লাডলাইটে জমজমাট নৈশ ম্যাচ, কলকাতা ও বিভিন্ন জেলার নামীদামী ক্লাবের প্রতিদ্বন্দ্বিতা এবং উপচে পড়া ফুটবলপ্রেমীদের কলরবে রাসমাঠ মুখরিত হয়ে ওঠে। ফাইনালে থাকে তারকা ব্যক্তিত্বদের উপস্থিতি ও বিশেষ সাংস্কৃতিক আসর।
                </p>
              </div>
              <a
                href="https://www.facebook.com/realstarclub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 self-start transition"
              >
                <span>রিয়েল স্টার ফেসবুক পেজ</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Somerset Club Cricket */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800">
                    ক্রিকেট টুর্নামেন্ট
                  </span>
                  <Trophy className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  সামারসেট ক্লাব ক্রিকেট টুর্নামেন্ট (Somerset Club)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  বারুইপুরের রাসমাঠে সামারসেট ক্লাব প্রতি বছর মর্যাদাপূর্ণ ক্রিকেট টুর্নামেন্ট আয়োজন করে। বহু স্থানীয় ও জেলা পর্যায়ের সেরা ক্রিকেট টিম এই টুর্নামেন্টে অংশ নেয়। চরম উত্তেজনাপূর্ণ ফাইনাল খেলার পাশাপাশি জমকালো সাংস্কৃতিক অনুষ্ঠান ও খ্যাতনামা সঙ্গীতশিল্পীদের (যেমন দেবলীনা নন্দী ও অন্যান্য শিল্পীদের) সরাসরি পারফরম্যান্স এই টুর্নামেন্টের অন্যতম প্রধান আকর্ষণ।
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md self-start">
                প্রতি বছর মার্চ–এপ্রিল মাসে আয়োজিত
              </span>
            </div>

            {/* Republic Day Celebration */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-amber-300 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                    জাতীয় অনুষ্ঠান
                  </span>
                  <Flag className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  ২৬ জানুয়ারি প্রজাতন্ত্র দিবস উদযাপন (Republic Day)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  প্রতি বছর ২৬ জানুয়ারি ভারতের প্রজাতন্ত্র দিবস উপলক্ষে বারুইপুর রাসমাঠে মহকুমা প্রশাসন, পৌরসভা ও স্থানীয় বিদ্যালয়গুলির যৌথ উদ্যোগে মহকুমা পর্যায়ের মূল রাষ্ট্রীয় কুচকাওয়াজ ও পতাকা উত্তোলন অনুষ্ঠান অনুষ্ঠিত হয়। বিভিন্ন স্কুলের ছাত্রছাত্রীদের মনোজ্ঞ মার্চপাস্ট, ক্যারাটে প্রদর্শনী, ক্রীড়া প্রতিযোগিতা এবং কৃতি ব্যক্তিত্বদের নাগরিক সংবর্ধনা প্রদান করা হয়।
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md self-start">
                ২৬ জানুয়ারি সকাল ৮:৩০ টা থেকে
              </span>
            </div>
          </div>
        </section>

        {/* In-Article Ad Slot */}
        <AdSenseSlot format="in-article" className="my-6" />

        {/* Section 4: Top Durga Puja Clubs & Pandals */}
        <section id="durga-puja" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                শারদীয় দুর্গোৎসব গাইড
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                বারুইপুরের সেরা দুর্গাপূজা মণ্ডপ ও ঐতিহ্যবাহী ক্লাব
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                প্যান্ডেল হপিং ও দেবী দর্শনের জন্য বারুইপুর মহকুমার সবচেয়ে জনপ্রিয় পূজা মণ্ডপসমূহ
              </p>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full self-start sm:self-auto">
              আশ্বিন–কার্তিক (অক্টোবর)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {durgaPujas.map((puja, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-red-300 hover:shadow-xs transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
                      {puja.type}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">#{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {puja.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{puja.area}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {puja.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>প্যান্ডেল হপিং পরামর্শ:</strong> বারুইপুরের ফুলতলা ও পদ্মপুকুরের মণ্ডপগুলিতে সপ্তমী থেকে নবমীর সন্ধ্যায় প্রচুর ভিড় হয়। ভিড় এড়িয়ে প্রতিমা ও নিখুঁত মণ্ডপশিল্প দর্শন করতে চাইলে পঞ্চমী, ষষ্ঠী বা দুপুরের সময় পরিদর্শনের পরামর্শ দেওয়া হচ্ছে। স্টেশন মোড় থেকে সব মণ্ডপেই সহজে অটো বা টোটো পাওয়া যায়।
            </div>
          </div>
        </section>

        {/* Section 5: Top Kali Puja Clubs & Mandirs */}
        <section id="kali-puja" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
                <Flame className="w-3 h-3" />
                মহোৎসব ও শক্তি আরাধনা
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                বারুইপুরের সেরা কালীপূজা মণ্ডপ ও জাগ্রত শক্তিপীঠ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                কার্তিক অমাবস্যার দীপাবলি উৎসব ও রাতজাগা শ্যামাপূজার বিশিষ্ট মণ্ডপ ও মন্দিরসমূহ
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto">
              কার্তিক অমাবস্যা (নভেম্বর)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kaliPujas.map((puja, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white hover:border-indigo-300 hover:shadow-xs transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{puja.area}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {puja.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {puja.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Full 12-Month Calendar Table */}
        <section id="annual-calendar" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div className="p-3 rounded-2xl bg-red-50 text-red-600">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">বারুইপুর বার্ষিক সাংস্কৃতিক ক্যালেন্ডার ২০২৬</h2>
              <p className="text-xs sm:text-sm text-slate-500">মাসভিত্তিক উৎসব, মেলার স্থান ও বিশিষ্টতা</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800 whitespace-nowrap">মাস</th>
                  <th className="p-3.5 border-b border-slate-800">প্রধান উৎসব বা অনুষ্ঠান</th>
                  <th className="p-3.5 border-b border-slate-800">স্থান</th>
                  <th className="p-3.5 border-b border-slate-800">বিশিষ্টতা ও আকর্ষণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {annualCalendar.map((row, i) => (
                  <tr key={i} className="hover:bg-amber-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap bg-slate-50/50">{row.month}</td>
                    <td className="p-3.5 font-bold text-red-600 leading-snug">{row.event}</td>
                    <td className="p-3.5 text-slate-700 leading-relaxed">{row.location}</td>
                    <td className="p-3.5 text-slate-600 leading-relaxed">{row.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Visitor Guidelines & Transit Tips */}
        <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            মেলা ও উৎসবে যাতায়াত ও প্রয়োজনীয় গাইডলাইন (Visitor Guidelines)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ট্রেন ও বাস যোগাযোগ
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                শিয়ালদহ দক্ষিণ শাখা থেকে ডায়মন্ড হারবার, ক্যানিং ও নামখানা লাইনের যেকোনো লোকালে বারুইপুর জংশন পৌঁছানো যায়। স্টেশন থেকে নিউ ইন্ডিয়ান গ্রাউন্ড (মিলন মেলা) ও রাসমাঠ উভয়ই মাত্র ৩-৭ মিনিটের দূরত্বে অবস্থিত।
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                সেরা সময় ও ভিড় এড়ানোর টিপস
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                মিলন মেলা ও রাসমেলায় সাধারণ ছুটির দিন ও উইকএন্ডে সন্ধ্যা ৬টা থেকে রাত ৮:৩০ পর্যন্ত প্রচণ্ড ভিড় হয়। খোলামেলা উপভোগ ও শিশুদের সাথে নিরাপদে ঘুরতে চাইলে বিকেল ৪টা থেকে ৫:৩০ এর মধ্যে মেলায় পৌঁছানো সবচেয়ে সুবিধাজনক।
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-blue-600" />
                পার্কিং ও কেনাকাটার সুবিধা
              </strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                রবীন্দ্র ভবন চত্বর ও স্টেশন সংলগ্ন নির্ধারিত পার্কিং জোনে বাইক ও গাড়ি পার্কিংয়ের সুব্যবস্থা থাকে। অধিকাংশ দোকানে অনলাইন ইউপিআই (UPI) পেমেন্ট সুবিধা থাকলেও ছোটখাটো স্টলে ক্যাশ সাথে রাখা বাঞ্ছনীয়।
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions (FAQs) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-5 flex items-center gap-2 border-b border-slate-200 pb-3">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            সাধারণ প্রশ্নোত্তর (FAQs)
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-start gap-2">
                <span className="text-red-600 font-bold">প্র:</span>
                <span>বারুইপুর মিলন মেলা কবে এবং কোথায় হয়?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-5">
                <span className="text-emerald-700 font-bold mr-1">উ:</span>
                বারুইপুর মিলন মেলা প্রতি বছর নভেম্বর ও ডিসেম্বর মাস জুড়ে কুলপী রোডে বারুইপুর রবীন্দ্র ভবনের ঠিক বিপরীতে নিউ ইন্ডিয়ান গ্রাউন্ডে (New Indian Ground) অনুষ্ঠিত হয়।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-start gap-2">
                <span className="text-red-600 font-bold">প্র:</span>
                <span>মিলন মেলার প্রবেশমূল্য এবং সময়সূচি কী?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-5">
                <span className="text-emerald-700 font-bold mr-1">উ:</span>
                মেলার প্রবেশমূল্য সাধারণত মাত্র ₹১০ টাকা। প্রতিদিন মেলা শুরু হয় বিকেল ৩:৩০ টা থেকে এবং চলে রাত ৯:৩০ টা পর্যন্ত (ছুটির দিন ও উইকএন্ডে রাত ১০:০০ টা পর্যন্ত)।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-start gap-2">
                <span className="text-red-600 font-bold">প্র:</span>
                <span>রাসমাঠের প্রধান ক্রীড়া টুর্নামেন্টগুলি কী কী?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-5">
                <span className="text-emerald-700 font-bold mr-1">উ:</span>
                রাসমাঠের প্রধান ক্রীড়া উৎসবের মধ্যে রয়েছে রিয়েল স্টার ক্লাবের বার্ষিক নকআউট ফুটবল টুর্নামেন্ট (Real Star Club Football Tournament) এবং সামারসেট ক্লাবের ক্রিকেট টুর্নামেন্ট (Somerset Club Cricket Tournament)। এছাড়া প্রতি বছর ২৬ জানুয়ারি প্রজাতন্ত্র দিবসের মহকুমা কুচকাওয়াজ ও ক্রীড়া উৎসব রাসমাঠেই অনুষ্ঠিত হয়।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-start gap-2">
                <span className="text-red-600 font-bold">প্র:</span>
                <span>বারুইপুরে দুর্গাপূজা ও কালীপূজায় প্যান্ডেল হপিং করার সেরা জায়গা কোনটি?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-5">
                <span className="text-emerald-700 font-bold mr-1">উ:</span>
                দুর্গাপূজায় ফুলতলা বিধানস্মৃতি সংঘ, পদ্মপুকুর ইয়ুথ ক্লাব, প্রগতি সংঘ, শাসন বালক সংঘ এবং শতাব্দীপ্রাচীন বারুইপুর রাজবাড়ি প্রধান আকর্ষণ। কালীপূজায় ফুলতলা, পদ্মপুকুর, সুবুদ্ধিপুর ভাই ভাই সঙ্ঘ এবং ঐতিহাসিক মা শিবানীপীঠ শক্তি আরাধনার অন্যতম জনপ্রিয় তীর্থ।
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
