import React from 'react';
import { db } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import FeaturedNewsSlider from '@/components/FeaturedNewsSlider';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getFeaturedOrganizations } from '@/lib/organizations';
import { getAllPlaces } from '@/lib/places';
import { 
  Sparkles, 
  TrendingUp, 
  Newspaper, 
  Landmark, 
  Compass, 
  ShieldAlert, 
  Hospital, 
  TrainTrack, 
  Bus, 
  GraduationCap, 
  ShoppingBag, 
  Utensils, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Users,
  Award
} from 'lucide-react';

interface PageProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

export default function HomePage() {
  // Strictly exclude evergreen guides from breaking and latest news
  // db.getArticles returns articles sorted by publishedAt DESCENDING (newest first)
  const newsArticles = db.getArticles({
    status: 'published',
    excludeGuides: true
  });

  const featuredOrganizations = getFeaturedOrganizations(6);
  const places = getAllPlaces().slice(0, 6);

  // Top 5 most recent news articles for the interactive hero slider
  const sliderArticles = newsArticles.slice(0, 5);
  const sliderArticleIds = new Set(sliderArticles.map(a => a.id));

  // Next recent articles for 2x2 grid
  const sideArticles = newsArticles.filter(a => !sliderArticleIds.has(a.id)).slice(0, 4);
  const sideArticleIds = new Set(sideArticles.map(a => a.id));

  // Remaining articles for the chronological stream
  const remainingArticles = newsArticles.filter(a => !sliderArticleIds.has(a.id) && !sideArticleIds.has(a.id)).slice(0, 16);

  const railwayArticles = db.getArticles({ category: 'railway', limit: 3, excludeGuides: true });
  const municipalityArticles = db.getArticles({ category: 'municipality', limit: 3, excludeGuides: true });
  const crimeArticles = db.getArticles({ category: 'crime', limit: 3, excludeGuides: true });

  const quickAccessItems = [
    { label: 'জরুরি ডিরেক্টরি', icon: <ShieldAlert className="w-5 h-5 text-rose-600" />, href: '/emergency-contacts', bg: 'hover:bg-rose-50' },
    { label: 'স্থান ও ল্যান্ডমার্ক', icon: <Landmark className="w-5 h-5 text-amber-600" />, href: '/places', bg: 'hover:bg-amber-50' },
    { label: 'প্রতিষ্ঠান ও ক্লাব', icon: <Building2 className="w-5 h-5 text-purple-600" />, href: '/organizations', bg: 'hover:bg-purple-50' },
    { label: 'লোকাল ট্রেন আপডেট', icon: <TrainTrack className="w-5 h-5 text-blue-600" />, href: '/transport', bg: 'hover:bg-blue-50' },
    { label: 'নাগরিক পরিষেবা', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, href: '/citizen-services', bg: 'hover:bg-emerald-50' },
    { label: 'মেলা ও উৎসব', icon: <Sparkles className="w-5 h-5 text-amber-500" />, href: '/events', bg: 'hover:bg-amber-50' },
    { label: 'বারুইপুর পৌরসভা', icon: <Building2 className="w-5 h-5 text-teal-600" />, href: '/places/baruipur-municipality/', bg: 'hover:bg-teal-50' },
    { label: 'হাসপাতাল সেবা', icon: <Hospital className="w-5 h-5 text-red-600" />, href: '/emergency-contacts', bg: 'hover:bg-red-50' },
    { label: 'স্কুল নির্দেশিকা', icon: <GraduationCap className="w-5 h-5 text-indigo-600" />, href: '/top-schools-in-baruipur-education-admission-guide/', bg: 'hover:bg-indigo-50' },
    { label: 'শপিং মল ও বাজার', icon: <ShoppingBag className="w-5 h-5 text-pink-600" />, href: '/shopping-malls-and-top-brands-in-baruipur-market-guide/', bg: 'hover:bg-pink-50' },
    { label: 'খাবার ও রেস্তোরাঁ', icon: <Utensils className="w-5 h-5 text-orange-600" />, href: '/best-restaurants-cafes-and-sweets-in-baruipur-food-guide/', bg: 'hover:bg-orange-50' },
    { label: 'দর্শনীয় স্থানসমূহ', icon: <MapPin className="w-5 h-5 text-cyan-600" />, href: '/best-places-to-visit-in-baruipur-travel-guide/', bg: 'hover:bg-cyan-50' }
  ];

  const homeItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'বারুইপুর অনলাইন - সংবাদ, ডিরেক্টরি ও নাগরিক প্ল্যাটফর্ম',
    description: 'বারুইপুর মহকুমা ও দক্ষিণ ২৪ পরগনার শীর্ষস্থানীয় আঞ্চলিক ডিজিটাল তথ্যকোষ ও সংবাদ প্ল্যাটফর্ম।',
    itemListElement: newsArticles.slice(0, 20).map((art, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: art.title,
      url: `https://baruipur.online/${encodeURI(art.slug || art.id)}/`
    }))
  };

  return (
    <div className="space-y-6">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeItemListSchema) }}
      />

      {/* Visually hidden H1 for SEO semantics */}
      <h1 className="sr-only">বারুইপুর অনলাইন: আপনার স্থানীয় সংবাদ, গাইড ও তথ্যকোষ</h1>

      {/* 1. Breaking News Live Ticker */}
      <BreakingNewsTicker articles={sliderArticles} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 2. QUICK ACCESS GRID (12 Interactive Civic & Lifestyle Tiles) */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              এক নজরে বারুইপুর (Quick Access)
            </h2>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">১২টি নাগরিক ও তথ্য সেবা</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {quickAccessItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/90 shadow-xs transition flex flex-col items-center text-center group ${item.bg}`}
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 group-hover:scale-110 transition mb-1 sm:mb-1.5">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-red-600 transition leading-tight">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Top Leaderboard Ad Space */}
        <AdSenseSlot format="leaderboard" className="mb-8" />

        {/* Main Grid: News + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: News Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8" id="latest-news">
            {/* Top Hero Section: Interactive Slider of Latest News */}
            {sliderArticles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-red-600" />
                      প্রধান ও আলোচিত খবর
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 hidden sm:inline-flex items-center gap-1">
                    সর্বশেষ তাজা খবর
                  </span>
                </div>
                <FeaturedNewsSlider articles={sliderArticles} />
              </section>
            )}

            {/* Sub-featured trending stories (2x2 grid) */}
            {sideArticles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    তাজা স্থানীয় প্রতিবেদন
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sideArticles.map(art => (
                    <NewsCard key={art.id} article={art} variant="standard" />
                  ))}
                </div>
              </section>
            )}

            {/* In-Feed Native Ad Space */}
            <AdSenseSlot format="in-feed" className="my-6" />

            {/* Organizations & Clubs Showcase Carousel / Grid */}
            <section className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-5 sm:p-7 shadow-md border border-purple-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 border-b border-purple-800/50 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5 text-purple-300" />
                    নতুন ডিরেক্টরি বিভাগ
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    বারুইপুরের শীর্ষ ক্লাব, প্রতিষ্ঠান ও সমিতি
                  </h3>
                </div>
                <a 
                  href="/organizations" 
                  className="inline-flex items-center gap-1 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-1.5 rounded-lg transition self-start sm:self-auto"
                >
                  <span>সব প্রতিষ্ঠান দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {featuredOrganizations.map((org) => (
                  <a
                    key={org.slug}
                    href={`/organizations/${org.slug}/`}
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-4 rounded-xl border border-white/10 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2 py-0.5 rounded-full">
                          {org.categoryBn}
                        </span>
                        <span className="text-[10px] text-purple-300">
                          {org.established}
                        </span>
                      </div>
                      <h4 className="font-bold text-white group-hover:text-amber-300 transition text-sm leading-snug mb-1">
                        {org.nameBn}
                      </h4>
                      <p className="text-xs text-purple-200/80 line-clamp-2 mb-3">
                        {org.taglineBn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-purple-300 pt-2 border-t border-white/10">
                      <span>বিস্তারিত তথ্য</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Places Hub Showcase */}
            <section className="bg-amber-50/70 rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-200">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-700" />
                    ঐতিহাসিক ও নাগরিক ল্যান্ডমার্ক
                  </h3>
                  <p className="text-xs text-amber-800">পৌরসভা, মহকুমা আদালত, রাজবাড়ি ও পর্যটন কেন্দ্র</p>
                </div>
                <a href="/places" className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline">
                  সব স্থান →
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {places.map((place) => (
                  <a
                    key={place.slug}
                    href={`/places/${place.slug}/`}
                    className="bg-white p-3 rounded-xl border border-amber-200/60 hover:border-amber-400 hover:shadow-xs transition group flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition leading-snug mb-1 line-clamp-1">
                        {place.nameBn}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {place.taglineBn}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 mt-2 block">
                      গাইড দেখুন →
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* Latest news list */}
            <section>
              <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-red-600" />
                  সর্বশেষ সংবাদ প্রবাহ
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  মোট {newsArticles.length} টি খবর
                </span>
              </div>

              {newsArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
                  <p className="text-slate-500 font-medium mb-3">অনুসন্ধান অনুযায়ী কোনো খবর পাওয়া যায়নি।</p>
                  <a 
                    href="/" 
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    সব খবর দেখুন
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {remainingArticles.map(art => (
                    <NewsCard key={art.id} article={art} variant="horizontal" />
                  ))}
                </div>
              )}
            </section>

            {/* 6. DEDICATED SHOWCASE: FEATURED BARUIPUR GUIDES */}
            <section id="featured-guides" className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800">
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                    <Compass className="w-4 h-4" />
                    স্থায়ী তথ্যকোষ ও নির্দেশিকা
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    বারুইপুর স্পেশাল গাইড (Featured Guides)
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 bg-slate-800/90 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                  ✓ যাচাইকৃত তথ্য ২০২৬
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="/top-things-to-do-in-baruipur-complete-experience-guide/"
                  className="bg-slate-800/80 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold bg-cyan-900/60 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded-full inline-block mb-2">
                      অভিজ্ঞতা ও ভ্রমণ
                    </span>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm sm:text-base leading-snug mb-1">
                      বারুইপুরে কী কী করবেন: ভ্রমণ ও স্থানীয় অভিজ্ঞতা
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      রাসমেলা, রাজবাড়ির ঐতিহ্যবাহী পদচারণা, সদাব্রত ঘাট, পেয়ারা বাগান ও এক দিনের ভ্রমণ পরিকল্পনা।
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/50">
                    <span>সম্পূর্ণ গাইড পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a 
                  href="/best-places-to-visit-in-baruipur-travel-guide/"
                  className="bg-slate-800/80 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold bg-amber-900/60 text-amber-300 border border-amber-700 px-2 py-0.5 rounded-full inline-block mb-2">
                      দর্শনীয় স্থান
                    </span>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm sm:text-base leading-snug mb-1">
                      বারুইপুরের দর্শনীয় স্থান: ঐতিহ্য, প্রকৃতি ও ভ্রমণ গাইড
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      রায়চৌধুরী রাজবাড়ি, আরণ্যক ইকো পার্ক, শিবানীপীঠ, মহাপ্রভুতলা ও পর্যটন নির্দেশিকা।
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/50">
                    <span>সম্পূর্ণ গাইড পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a 
                  href="/shopping-malls-and-top-brands-in-baruipur-market-guide/"
                  className="bg-slate-800/80 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold bg-pink-900/60 text-pink-300 border border-pink-700 px-2 py-0.5 rounded-full inline-block mb-2">
                      কেনাকাটা ও বাজার
                    </span>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm sm:text-base leading-snug mb-1">
                      বারুইপুরের শপিং মল, ব্র্যান্ড ও বাজার গাইড
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      প্যান্টালুনস, রিলায়েন্স ট্রেন্ডস, পুরাতন বাজার, স্বর্ণালঙ্কার প্রতিষ্ঠান ও পাইকারি বাজার।
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/50">
                    <span>সম্পূর্ণ গাইড পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a 
                  href="/top-schools-in-baruipur-education-admission-guide/"
                  className="bg-slate-800/80 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold bg-indigo-900/60 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded-full inline-block mb-2">
                      শিক্ষা ও ভর্তি
                    </span>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm sm:text-base leading-snug mb-1">
                      বারুইপুরের স্কুল: CBSE, ICSE ও WBBSE গাইড
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      বারুইপুর হাই স্কুল (১৮৫৮), সেন্ট মন্টফোর্ট, ওয়েলকিন ন্যাশনাল ও ভর্তি নির্দেশিকা।
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/50">
                    <span>সম্পূর্ণ গাইড পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a 
                  href="/best-restaurants-cafes-and-sweets-in-baruipur-food-guide/"
                  className="sm:col-span-2 bg-slate-800/80 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold bg-orange-900/60 text-orange-300 border border-orange-700 px-2 py-0.5 rounded-full inline-block mb-2">
                      খাবার ও মিষ্টি
                    </span>
                    <h4 className="font-bold text-white group-hover:text-red-400 transition text-sm sm:text-base leading-snug mb-1">
                      বারুইপুরের রেস্তোরাঁ, ক্যাফে ও মিষ্টির গাইড
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      দ্যা ওয়ান বারুইপুর, সিলভার স্পুন, আসমা হোটেলের বিরিয়ানি, কামধেনু ও ঐতিহ্যবাহী পেয়ারা মাখা।
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/50">
                    <span>সম্পূর্ণ খাদ্য নির্দেশিকা পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </a>
              </div>
            </section>

            {/* 7. Dedicated Category Sections: Municipality & Railways */}
            {/* Municipality Spotlight */}
            <section className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    পৌরসভা ও নাগরিক পরিকাঠামো
                  </h3>
                  <p className="text-xs text-emerald-700">রাস্তাঘাট, নিকাশি ও পুর পরিষেবা</p>
                </div>
                <a href="/category/municipality" className="text-xs font-bold text-emerald-700 hover:underline">
                  আরও দেখুন →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {municipalityArticles.map(art => (
                  <NewsCard key={art.id} article={art} variant="standard" />
                ))}
              </div>
            </section>

            {/* Crime & Police District Spotlight */}
            <section className="bg-rose-50/50 p-5 rounded-xl border border-rose-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                    আইনশৃঙ্খলা ও বারুইপুর পুলিশ জেলা
                  </h3>
                  <p className="text-xs text-rose-700">থানা, প্রশাসন ও মহকুমার নিরাপত্তা সংবাদ</p>
                </div>
                <a href="/category/crime" className="text-xs font-bold text-rose-700 hover:underline">
                  আরও দেখুন →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {crimeArticles.map(art => (
                  <NewsCard key={art.id} article={art} variant="standard" />
                ))}
              </div>
            </section>

            {/* Events & Festivals Banner */}
            <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">
                  উৎসব ও মেলা
                </span>
                <h3 className="text-xl font-bold">বারুইপুরের উৎসব ও সাংস্কৃতিক ক্যালেন্ডার ২০২৬</h3>
                <p className="text-xs text-amber-100 mt-1">
                  ঐতিহাসিক বারুইপুর রাসমেলা, দুর্গাপূজা ও আঞ্চলিক লোকউৎসবের বাৎসরিক নির্ঘণ্ট।
                </p>
              </div>
              <a 
                href="/events" 
                className="bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow whitespace-nowrap transition"
              >
                ইভেন্ট ক্যালেন্ডার দেখুন →
              </a>
            </section>
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sidebar Top Ad Space */}
            <AdSenseSlot format="sidebar" className="my-0" />

            <BaruipurUtilities 
              recentPosts={newsArticles.slice(4, 11)} 
              showCategories={true}
              showRecentPosts={true}
              showPlaces={true}
              showEmergency={true}
            />
          </aside>
        </div>

        {/* Bottom Leaderboard Ad Space */}
        <AdSenseSlot format="leaderboard" className="mt-10" />
      </div>
    </div>
  );
}
