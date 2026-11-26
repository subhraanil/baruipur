import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Landmark, 
  Building2, 
  Stethoscope, 
  Bell, 
  FileText, 
  Search, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  HeartPulse, 
  Compass, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { getAllPlaces } from '@/lib/places';
import { getFeaturedOrganizations, getAllOrganizations } from '@/lib/organizations';
import { getAllFacilities } from '@/lib/healthcare';
import { getActiveNotices } from '@/lib/notices';
import { getActiveTenders } from '@/lib/tenders';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'বারুইপুর অনলাইন - স্থান, প্রতিষ্ঠান, স্বাস্থ্য ডিরেক্টরি, সরকারি নোটিস ও টেন্ডার পোর্টাল',
  description: 'বারুইপুর মহকুমা ও পৌরসভার সমস্ত দর্শনীয় স্থান, স্বাস্থ্য পরিষেবা, সমাজকল্যাণ প্রতিষ্ঠান, জরুরি সরকারি নোটিস ও সক্রিয় ই-টেন্ডারের প্রামাণ্য নাগরিক ডিজিটাল তথ্যকোষ।',
  alternates: {
    canonical: 'https://baruipur.online/',
  },
  openGraph: {
    title: 'বারুইপুর অনলাইন - স্থান, প্রতিষ্ঠান, স্বাস্থ্য ডিরেক্টরি, সরকারি নোটিস ও টেন্ডার পোর্টাল',
    description: 'বারুইপুর মহকুমা ও পৌরসভার সমস্ত দর্শনীয় স্থান, স্বাস্থ্য পরিষেবা, সমাজকল্যাণ প্রতিষ্ঠান, জরুরি সরকারি নোটিস ও সক্রিয় ই-টেন্ডারের প্রামাণ্য নাগরিক ডিজিটাল তথ্যকোষ।',
    url: 'https://baruipur.online/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন - Baruipur Online Civic Directory Portal',
        type: 'image/png',
      }
    ]
  }
};

export default function HomePage() {
  // Fetch Directory Datasets
  const allPlaces = getAllPlaces();
  const allOrganizations = getAllOrganizations();
  const featuredOrganizations = getFeaturedOrganizations(6);
  const allFacilities = getAllFacilities();
  const activeNotices = getActiveNotices().slice(0, 5);
  const activeTenders = getActiveTenders().slice(0, 5);

  // Top featured places (select prominent heritage & civic landmarks)
  const featuredPlaces = allPlaces.slice(0, 6);

  // Featured healthcare facilities (key hospitals & clinics)
  const featuredHealthcare = allFacilities.slice(0, 4);

  // Our created evergreen lifestyle & heritage guides
  const evergreenGuides = db.getArticles({
    status: 'published'
  }).filter(a => a.isGuide || a.id.startsWith('art-guide') || a.id.includes('-guide')).slice(0, 4);

  // JSON-LD Structured Data
  const portalSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'বারুইপুর অনলাইন - নাগরিক তথ্যকোষ',
    url: 'https://baruipur.online/',
    description: 'বারুইপুর মহকুমা ও পৌরসভার স্থান, প্রতিষ্ঠান, স্বাস্থ্য ডিরেক্টরি, সরকারি নোটিস ও টেন্ডার পোর্টাল।',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://baruipur.online/?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portalSchema) }}
      />

      {/* 1. Hero Section: Premium Civic Directory Portal */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden border-b border-slate-800">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto text-center space-y-6 relative z-10">
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 text-red-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>বারুইপুর পৌর ও মহকুমা ডিজিটাল নাগরিক তথ্যকোষ</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            বারুইপুরের সমস্ত স্থান, প্রতিষ্ঠান, স্বাস্থ্যসেবা, সরকারি নোটিস ও টেন্ডার
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            দক্ষিণ ২৪ পরগনার প্রাচীন ঐতিহাসিক জনপদ বারুইপুরের ৪৭+ দর্শনীয় স্থান, ৩৫+ হাসপাতাল ও ক্লিনিক, ২৬+ সামাজিক সংগঠন, ৫২+ সরকারি সার্কুলার ও ৬৫+ সক্রিয় পৌর ই-টেন্ডারের সম্পূর্ণ নির্ভরযোগ্য তথ্যভাণ্ডার।
          </p>

          {/* Global Unified Directory Search */}
          <div className="max-w-xl mx-auto pt-2">
            <form action="/places" method="GET" className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-1.5 border border-slate-700 focus-within:border-red-500 transition">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="স্থান, হাসপাতাল, সংগঠন, নোটিস বা টেন্ডার খুঁজুন..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-xl transition shadow-xs shrink-0"
              >
                অনুসন্ধান
              </button>
            </form>
          </div>

          {/* Live Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 max-w-4xl mx-auto text-left">
            <Link href="/places" className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-750 p-3 rounded-2xl transition group">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Landmark className="w-4 h-4" />
                <span className="text-xs font-bold">স্থান</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{allPlaces.length}+</div>
              <p className="text-[11px] text-slate-400">ঐতিহাসিক ও পর্যটন</p>
            </Link>

            <Link href="/organizations" className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-750 p-3 rounded-2xl transition group">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold">সংগঠন</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{allOrganizations.length}+</div>
              <p className="text-[11px] text-slate-400">ক্লাব, স্কুল ও ট্রাস্ট</p>
            </Link>

            <Link href="/health-directory" className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-750 p-3 rounded-2xl transition group">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <Stethoscope className="w-4 h-4" />
                <span className="text-xs font-bold">স্বাস্থ্য</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{allFacilities.length}+</div>
              <p className="text-[11px] text-slate-400">হাসপাতাল ও ওপিডি</p>
            </Link>

            <Link href="/notices" className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-750 p-3 rounded-2xl transition group">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Bell className="w-4 h-4" />
                <span className="text-xs font-bold">নোটিস</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">৫২+</div>
              <p className="text-[11px] text-slate-400">সরকারি সার্কুলার</p>
            </Link>

            <Link href="/tenders" className="col-span-2 sm:col-span-1 bg-slate-800/60 hover:bg-slate-800/90 border border-slate-750 p-3 rounded-2xl transition group">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-bold">টেন্ডার</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">৬৫+</div>
              <p className="text-[11px] text-slate-400">সক্রিয় NIT দরপত্র</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core 5 Pillars Interactive Navigation Grid */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            মূল ৫টি নাগরিক ও প্রশাসনিক ডিরেক্টরি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            আপনার প্রয়োজনীয় নাগরিক তথ্য পেতে যেকোনো স্তম্ভে ক্লিক করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Places */}
          <Link
            href="/places"
            className="group p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                {allPlaces.length}টি স্থান
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-amber-800 transition-colors">
                স্থান ও ল্যান্ডমার্ক
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ঐতিহাসিক রাজবাড়ি, প্রাচীন মন্দির, আদালত, রেলওয়ে জংশন ও পর্যটন কেন্দ্র।
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>অন্বেষণ করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Organizations */}
          <Link
            href="/organizations"
            className="group p-5 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-200/80 hover:border-purple-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md">
                {allOrganizations.length}টি প্রতিষ্ঠান
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-purple-800 transition-colors">
                সংগঠন ও প্রতিষ্ঠান
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ঐতিহ্যবাহী সামাজিক ক্লাব, হাইস্কুল, ডিগ্রি কলেজ, স্বেচ্ছাসেবী ট্রাস্ট ও সমিতি।
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
              <span>তালিকা দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Health Directory */}
          <Link
            href="/health-directory"
            className="group p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50/50 border border-rose-200/80 hover:border-rose-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-md">
                {allFacilities.length}টি স্বাস্থ্যকেন্দ্র
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-rose-800 transition-colors">
                স্বাস্থ্য ডিরেক্টরি
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                মহকুমা হাসপাতাল, নার্সিংহোম, ডায়াগনস্টিক, বিশেষজ্ঞ ডাক্তার ও ওপিডি চেম্বার।
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-rose-700 group-hover:translate-x-1 transition-transform">
              <span>স্বাস্থ্যসেবা দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 4: Notices */}
          <Link
            href="/notices"
            className="group p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-200/80 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-md">
                ৫২টি নোটিস
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-blue-800 transition-colors">
                সরকারি নোটিস
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                মহকুমা শাসক (SDO), পুরসভা, ভূমি সংস্কার, ট্রাফিক ও স্বাস্থ্য দপ্তরের সার্কুলার।
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>নোটিস পড়ুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 5: Tenders */}
          <Link
            href="/tenders"
            className="group p-5 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50/50 border border-red-200/80 hover:border-red-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-800 bg-red-100/80 px-2 py-0.5 rounded-md">
                ৬৫টি সক্রিয় NIT
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-red-800 transition-colors">
                পৌর ও সরকারি টেন্ডার
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                পৌরসভা, পূর্ত দপ্তর, পিএইচই, জেলা পরিষদ ও রেলওয়ের সক্রিয় দরপত্র ও বাজেট।
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-red-700 group-hover:translate-x-1 transition-transform">
              <span>টেন্ডার ব্রাউজ করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Section 1: Health Directory Spotlight */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 px-3 py-0.5 rounded-full text-xs font-bold">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>চিকিৎসা ও জরুরি পরিষেবা ডিরেক্টরি</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                বারুইপুর স্বাস্থ্য ও হাসপাতাল কেন্দ্রসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                মহকুমা হাসপাতাল, নার্সিংহোম ও বিশেষজ্ঞ চিকিৎসা ক্লিনিকের সরাসরি যোগাযোগ
              </p>
            </div>

            <Link
              href="/health-directory"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>সম্পূর্ণ স্বাস্থ্য ডিরেক্টরি দেখুন ({allFacilities.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredHealthcare.map((fac) => (
              <div 
                key={fac.slug}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-rose-300 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {fac.typeBn}
                    </span>
                    {fac.isOpen24Hours && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                        ২৪/৭ খোলা
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                    {fac.nameBn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {fac.overviewBn || fac.taglineBn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="font-bold">{fac.phone || fac.emergencyPhone || 'হেল্পলাইন প্রস্তুত'}</span>
                  </div>
                  <Link
                    href={`/health-directory/${fac.slug}`}
                    className="block text-center text-xs font-bold text-rose-700 hover:text-rose-800 bg-white py-1.5 rounded-lg border border-rose-200 transition"
                  >
                    বিবরণ ও ডাক্তার রোস্টার →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 2: Places & Landmarks Spotlight */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full text-xs font-bold">
                <Landmark className="w-3.5 h-3.5" />
                <span>ঐতিহ্য, পর্যটন ও নাগরিক কেন্দ্র</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                স্থান ও দর্শনীয় ল্যান্ডমার্ক ডিরেক্টরি
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                ৩৫০ বছরের প্রাচীন রাজবাড়ি থেকে আধুনিক রেলওয়ে জংশন ও আদালত চত্বর
              </p>
            </div>

            <Link
              href="/places"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>সমস্ত স্থান অন্বেষণ করুন ({allPlaces.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredPlaces.map((place) => (
              <Link
                key={place.slug}
                href={`/places/${place.slug}`}
                className="group rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                {place.coverImage && (
                  <div className="h-44 w-full overflow-hidden bg-slate-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={place.coverImage} 
                      alt={place.nameBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {place.category}
                    </div>
                  </div>
                )}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-800 transition-colors">
                      {place.nameBn}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {place.overview || place.taglineBn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="line-clamp-1">{place.address}</span>
                    </span>
                    <span className="font-bold text-amber-700 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      বিস্তারিত →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section 3: Organizations & Clubs Spotlight */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3 py-0.5 rounded-full text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>সামাজিক ক্লাব, সমিতি ও শিক্ষা প্রতিষ্ঠান</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                বারুইপুর প্রতিষ্ঠান ও সংগঠন ডিরেক্টরি
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                ক্রীড়া ক্লাব, সমাজকল্যাণ সমিতি, লাইব্রেরি ও প্রখ্যাত শিক্ষা প্রতিষ্ঠান
              </p>
            </div>

            <Link
              href="/organizations"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>সমস্ত সংগঠন তালিকা ({allOrganizations.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredOrganizations.map((org) => (
              <Link
                key={org.slug}
                href={`/organizations/${org.slug}`}
                className="group rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden hover:border-purple-400 transition-all flex flex-col justify-between"
              >
                {org.coverImage && (
                  <div className="h-40 w-full overflow-hidden bg-slate-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={org.coverImage} 
                      alt={org.nameBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {org.categoryBn}
                    </div>
                  </div>
                )}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-purple-800 transition-colors">
                      {org.nameBn}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {org.overview || org.taglineBn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                    <span className="text-[11px] text-slate-500">
                      প্রতিষ্ঠা: {org.established || 'ঐতিহ্যবাহী'}
                    </span>
                    <span className="font-bold text-purple-700 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      কার্যক্রম দেখুন →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section 4 & 5: Notices & Tenders Twin Section */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Official Notices Block */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">জরুরি সরকারি নোটিস</h3>
                    <p className="text-xs text-slate-500">SDO, পৌরসভা, স্বাস্থ্য ও পুলিশ সার্কুলার</p>
                  </div>
                </div>
                <Link
                  href="/notices"
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition shrink-0"
                >
                  সমস্ত নোটিস (৫২+) →
                </Link>
              </div>

              <div className="space-y-3">
                {activeNotices.map((notice) => (
                  <Link
                    key={notice.id}
                    href="/notices"
                    className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {notice.departmentName}
                      </span>
                      <span>{notice.publishedDateFormatted || notice.publishedDate}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {notice.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/notices"
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-bold text-slate-700 transition"
            >
              সমস্ত অফিশিয়াল নোটিস ও PDF দেখুন →
            </Link>
          </div>

          {/* Active Tenders Block */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">পৌর ও সরকারি ই-টেন্ডার</h3>
                    <p className="text-xs text-slate-500">wbtenders.gov.in-এর সক্রিয় NIT দরপত্র</p>
                  </div>
                </div>
                <Link
                  href="/tenders"
                  className="text-xs font-bold text-red-700 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition shrink-0"
                >
                  সমস্ত টেন্ডার (৬৫+) →
                </Link>
              </div>

              <div className="space-y-3">
                {activeTenders.map((tender) => (
                  <Link
                    key={tender.id}
                    href="/tenders"
                    className="block p-3 rounded-xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {tender.authorityName}
                      </span>
                      <span className="font-extrabold text-red-700">{tender.estimatedValue}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {tender.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 pt-1 border-t border-slate-200/50">
                      <span>শেষ তারিখ: {tender.closingDate}</span>
                      <span className="text-red-700 font-semibold">NIT বিবরণ →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/tenders"
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-xs font-bold text-slate-700 transition"
            >
              সমস্ত সক্রিয় টেন্ডার ও ডিরেক্টরি দেখুন →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Special Evergreen Lifestyle & Heritage Guides Section */}
      {evergreenGuides.length > 0 && (
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  প্রামাণ্য গাইড
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  বারুইপুর বিশেষ তথ্য ও ঐতিহ্য গাইড
                </h3>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                রাসমেলা, পিকনিক স্পট, সেরা রেস্তোরাঁ ও বিদ্যালয় সংক্রান্ত বিস্তারিত রেফারেন্স
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {evergreenGuides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/${encodeURI(guide.slug || guide.id)}`}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 transition flex flex-col justify-between space-y-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {guide.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    সম্পূর্ণ গাইড পড়ুন →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. 24/7 Emergency & Helplines Strip */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">
                বারুইপুর ২৪/৭ জরুরি নাগরিক হেল্পলাইন
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                পুলিশ কন্ট্রোল রুম (১১২), মহকুমা হাসপাতাল (০৩২১৮-২৫৫০২৯), দমকল (১০১) ও অ্যাম্বুল্যান্স
              </p>
            </div>
          </div>

          <Link
            href="/emergency-contacts"
            className="bg-white text-slate-900 hover:bg-red-50 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
          >
            জরুরি হেল্পলাইন ডিরেক্টরি →
          </Link>
        </div>
      </section>
    </div>
  );
}
