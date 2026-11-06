import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import NewsStreamClient from '@/components/NewsStreamClient';
import FeaturedHeroGrid from '@/components/FeaturedHeroGrid';
import QuickAccessDirectory from '@/components/QuickAccessDirectory';
import LocalDirectoryHighlights from '@/components/LocalDirectoryHighlights';
import FeaturedGuidesSection from '@/components/FeaturedGuidesSection';
import HomePropertySection from '@/components/HomePropertySection';
import HomeTendersSection from '@/components/HomeTendersSection';
import NewsCategorySection from '@/components/NewsCategorySection';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import AdSenseSlot from '@/components/AdSenseSlot';
import { Landmark, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { getFeaturedOrganizations } from '@/lib/organizations';
import { getAllPlaces } from '@/lib/places';
import { getAllFacilities } from '@/lib/healthcare';

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

export default function HomePage() {
  // 1. Fetch all published news articles excluding evergreen guides (sorted newest first)
  const newsArticles = db.getArticles({
    status: 'published',
    excludeGuides: true
  });

  // Track displayed article IDs to guarantee ZERO repetition across the entire homepage!
  const usedArticleIds = new Set<string>();

  // 2. Featured News: 1 Main Lead Story + 4 Secondary Stories (Editorial Grid)
  const leadArticle = newsArticles[0];
  const secondaryArticles = newsArticles.slice(1, 5);
  if (leadArticle?.id) usedArticleIds.add(leadArticle.id);
  secondaryArticles.forEach(a => { if (a?.id) usedArticleIds.add(a.id); });

  // 3. Latest News: 8 Compact Stories (strictly excluding featured stories)
  const latestNewsArticles = newsArticles.filter(a => !usedArticleIds.has(a.id)).slice(0, 8);
  latestNewsArticles.forEach(a => usedArticleIds.add(a.id));

  // 4. Category Highlights: 4 Key Categories (3 unique stories each, strictly excluding already displayed ones!)
  const municipalityArticles = db.getArticles({ category: 'municipality', limit: 15, excludeGuides: true })
    .filter(a => !usedArticleIds.has(a.id))
    .slice(0, 3);
  municipalityArticles.forEach(a => usedArticleIds.add(a.id));

  const railwayArticles = db.getArticles({ category: 'railway', limit: 15, excludeGuides: true })
    .filter(a => !usedArticleIds.has(a.id))
    .slice(0, 3);
  railwayArticles.forEach(a => usedArticleIds.add(a.id));

  const crimeArticles = db.getArticles({ category: 'crime', limit: 15, excludeGuides: true })
    .filter(a => !usedArticleIds.has(a.id))
    .slice(0, 3);
  crimeArticles.forEach(a => usedArticleIds.add(a.id));

  const cultureArticles = db.getArticles({ category: 'culture', limit: 15, excludeGuides: true })
    .filter(a => !usedArticleIds.has(a.id))
    .slice(0, 3);
  cultureArticles.forEach(a => usedArticleIds.add(a.id));

  // 5. Local Directory Data (Icon-based, Utility Dashboard style)
  const healthcareFacilities = getAllFacilities();
  const places = getAllPlaces();
  const featuredOrganizations = getFeaturedOrganizations(6);

  // Pool for client-side search in latest stream (excluding lead story)
  const streamPool = newsArticles.filter(a => a.id !== leadArticle?.id);

  // SEO Schema
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
      <BreakingNewsTicker articles={newsArticles.slice(0, 5)} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-3">
        {/* Civic Portal Highlight Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700/60 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white">
                  বারুইপুর মহকুমা ও পৌর ডিজিটাল তথ্যবাতায়ন
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 bg-red-950/80 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  ২৪/৭ লাইভ
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                পৌরসভার ১৭টি ওয়ার্ড • শিয়ালদহ দক্ষিণ রেলওয়ে জংশন • মহকুমা আদালত, হাসপাতাল ও পুলিশ জেলা
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href="/property"
              className="inline-flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-2xs"
            >
              <span>🏡 ফ্ল্যাট ও জমি</span>
            </a>
            <a
              href="/tenders"
              className="inline-flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-2xs"
            >
              <span>🏛️ সরকারি টেন্ডার</span>
            </a>
            <a
              href="/health-directory"
              className="inline-flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-2xs"
            >
              <span>🏥 ডাক্তার ও ওপিডি</span>
            </a>
            <a
              href="/transport"
              className="inline-flex items-center gap-1.5 bg-blue-600/90 hover:bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-2xs"
            >
              <span>🚆 লোকাল ট্রেন</span>
            </a>
          </div>
        </div>

        {/* 2. Featured News: 1 Main Story + 3 Secondary Stories (Editorial Grid) */}
        {leadArticle && (
          <FeaturedHeroGrid
            leadArticle={leadArticle}
            secondaryArticles={secondaryArticles}
          />
        )}

        {/* 3. Quick Access Directory Grid (12 Civic & Lifestyle Tiles) */}
        <QuickAccessDirectory />

        {/* Top Leaderboard Ad Slot */}
        <AdSenseSlot format="leaderboard" className="mb-6" />

        {/* 4. Main Two-Column Layout (News Content Left + Utilities Sidebar Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: News Content & Local Spotlights (9 cols) */}
          <div className="lg:col-span-9 space-y-7 min-w-0" id="latest-news">
            {/* 4A. Latest News Feed: 8 Compact Stories with Horizontal Category Scroll */}
            <NewsStreamClient 
              initialArticles={latestNewsArticles}
              allArticles={streamPool}
            />

            {/* In-Feed Native Ad Slot */}
            <AdSenseSlot format="in-feed" className="my-6" />

            {/* 4B. Category Highlights: 4 Categories (3 Distinct Stories Each) */}
            <div className="space-y-5">
              {/* Municipality Spotlight */}
              {municipalityArticles.length > 0 && (
                <NewsCategorySection
                  title="পৌরসভা ও নাগরিক পরিকাঠামো"
                  subtitle="রাস্তাঘাট, পানীয় জল ও পুর পরিষেবা সংবাদ"
                  categorySlug="municipality"
                  viewAllHref="/category/municipality"
                  accentColor="border-emerald-200/80 bg-emerald-50/40"
                  badgeDotColor="bg-emerald-600"
                  articles={municipalityArticles}
                />
              )}

              {/* Railways & Transport Spotlight */}
              {railwayArticles.length > 0 && (
                <NewsCategorySection
                  title="শিয়ালদহ দক্ষিণ রেলওয়ে ও লোকাল ট্রেন"
                  subtitle="ট্রেন চলাচল, বাতিল ও সময়সূচি সংক্রান্ত খবর"
                  categorySlug="railway"
                  viewAllHref="/category/railway"
                  accentColor="border-blue-200/80 bg-blue-50/40"
                  badgeDotColor="bg-blue-600"
                  articles={railwayArticles}
                />
              )}

              {/* Law & Order / Crime Spotlight */}
              {crimeArticles.length > 0 && (
                <NewsCategorySection
                  title="আইনশৃঙ্খলা ও বারুইপুর পুলিশ জেলা"
                  subtitle="নিরাপত্তা, থানা ও মহকুমা প্রশাসনের খবর"
                  categorySlug="crime"
                  viewAllHref="/category/crime"
                  accentColor="border-rose-200/80 bg-rose-50/40"
                  badgeDotColor="bg-rose-700"
                  articles={crimeArticles}
                />
              )}

              {/* Culture & Festivals Spotlight */}
              {cultureArticles.length > 0 && (
                <NewsCategorySection
                  title="উৎসব, সংস্কৃতি ও ঐতিহ্যের বারুইপুর"
                  subtitle="পূজা, রাসমেলা ও সাংস্কৃতিক অনুষ্ঠান"
                  categorySlug="culture"
                  viewAllHref="/category/culture"
                  accentColor="border-amber-200/80 bg-amber-50/40"
                  badgeDotColor="bg-amber-600"
                  articles={cultureArticles}
                />
              )}
            </div>

            {/* 4C. Local Information Directory: Health, Places, Organizations (Utility Layout) */}
            <LocalDirectoryHighlights
              facilities={healthcareFacilities}
              places={places}
              organizations={featuredOrganizations}
            />

            {/* 4D. Real Estate & Property Buy/Sell Showcase */}
            <HomePropertySection />

            {/* 4E. Official Municipal & Govt Tenders Section */}
            <HomeTendersSection />

            {/* 4F. Evergreen Lifestyle Guides: 8 Verified Special Guides */}
            <FeaturedGuidesSection />

            {/* 4E. Annual Events Calendar Banner */}
            <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                  বাৎসরিক নির্ঘণ্ট
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  বারুইপুরের উৎসব ও মেলা ক্যালেন্ডার ২০২৬
                </h3>
                <p className="text-xs text-amber-100 mt-0.5">
                  ঐতিহাসিক বারুইপুর রাসমেলা, রাসমাঠের অনুষ্ঠান ও আঞ্চলিক লোকউৎসবের সূচি।
                </p>
              </div>
              <a 
                href="/events" 
                className="bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs whitespace-nowrap transition"
              >
                ইভেন্ট ক্যালেন্ডার দেখুন →
              </a>
            </section>
          </div>

          {/* Right Column: Utilities & Emergency Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-6 min-w-0" aria-label="বারুইপুর ইউটিলিটি ও ডিরেক্টরি">
            {/* Sidebar Top Ad Slot */}
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

        {/* Bottom Leaderboard Ad Slot */}
        <AdSenseSlot format="leaderboard" className="mt-8" />
      </div>
    </div>
  );
}
