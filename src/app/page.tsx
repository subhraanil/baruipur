import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import NewsStreamClient from '@/components/NewsStreamClient';
import FeaturedHeroGrid from '@/components/FeaturedHeroGrid';
import QuickAccessDirectory from '@/components/QuickAccessDirectory';
import LocalDirectoryHighlights from '@/components/LocalDirectoryHighlights';
import FeaturedGuidesSection from '@/components/FeaturedGuidesSection';
import NewsCategorySection from '@/components/NewsCategorySection';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getFeaturedOrganizations } from '@/lib/organizations';
import { getAllPlaces } from '@/lib/places';
import { getAllFacilities } from '@/lib/healthcare';
import { 
  TrendingUp, 
  ArrowRight,
  CalendarDays
} from 'lucide-react';

interface PageProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

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
  // Strictly exclude evergreen guides from breaking and latest news
  // db.getArticles returns articles sorted by publishedAt DESCENDING (newest first)
  const newsArticles = db.getArticles({
    status: 'published',
    excludeGuides: true
  });

  // All published articles including guides for full search and category filtering in stream
  const allStreamArticles = db.getArticles({
    status: 'published'
  });

  // Local Directory Data
  const healthcareFacilities = getAllFacilities();
  const places = getAllPlaces();
  const featuredOrganizations = getFeaturedOrganizations(6);

  // Top 4 most recent articles for the Editorial Hero Grid (1 lead + 3 secondary)
  const leadArticle = newsArticles[0];
  const secondaryArticles = newsArticles.slice(1, 4);
  const heroArticleIds = new Set([leadArticle?.id, ...secondaryArticles.map(a => a.id)].filter(Boolean));

  // Next recent articles for 2x2 trending grid
  const sideArticles = newsArticles.filter(a => !heroArticleIds.has(a.id)).slice(0, 4);
  const sideArticleIds = new Set(sideArticles.map(a => a.id));

  // Remaining articles for the chronological stream
  const remainingArticles = newsArticles.filter(a => !heroArticleIds.has(a.id) && !sideArticleIds.has(a.id)).slice(0, 16);

  // Category specific articles
  const municipalityArticles = db.getArticles({ category: 'municipality', limit: 3, excludeGuides: true });
  const railwayArticles = db.getArticles({ category: 'railway', limit: 3, excludeGuides: true });
  const crimeArticles = db.getArticles({ category: 'crime', limit: 3, excludeGuides: true });
  const cultureArticles = db.getArticles({ category: 'culture', limit: 3, excludeGuides: true });

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

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* 2. Featured Editorial Hero Grid (Section 8) */}
        {leadArticle && (
          <FeaturedHeroGrid
            leadArticle={leadArticle}
            secondaryArticles={secondaryArticles}
          />
        )}

        {/* 3. Quick Access Directory Grid (Section 9) */}
        <QuickAccessDirectory />

        {/* Top Leaderboard Ad Space */}
        <AdSenseSlot format="leaderboard" className="mb-8" />

        {/* 4. Main Two-Column Layout (Section 10, 11, 12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: News Content & Local Spotlights (9 cols) */}
          <div className="lg:col-span-9 space-y-8 min-w-0" id="latest-news">
            {/* Sub-featured trending local stories (2x2 grid) */}
            {sideArticles.length > 0 && (
              <section aria-labelledby="trending-stories-heading">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <h2 id="trending-stories-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#C62828]" />
                    তাজা স্থানীয় প্রতিবেদন
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">দক্ষিণ ২৪ পরগনা</span>
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

            {/* News Category Spotlights (Section 11) */}
            <div className="space-y-6">
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
                  title="শিয়ালদহ দক্ষিণ রেলওয়ে ও ট্রেন আপডেট"
                  subtitle="লোকাল ট্রেন, বাতিল ও সময়সূচি সংক্রান্ত খবর"
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
                  subtitle="থানা, নিরাপত্তা ও মহকুমা প্রশাসনের খবর"
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
                  subtitle="রাসমেলা, পূজা ও সাংস্কৃতিক অনুষ্ঠান"
                  categorySlug="culture"
                  viewAllHref="/category/culture"
                  accentColor="border-amber-200/80 bg-amber-50/40"
                  badgeDotColor="bg-amber-600"
                  articles={cultureArticles}
                />
              )}
            </div>

            {/* Latest News Feed with Live Category Filter & Search (Section 10) */}
            <NewsStreamClient 
              initialArticles={remainingArticles}
              allArticles={allStreamArticles}
            />

            {/* Local Directory Highlights (Section 12: Health, Places, Organizations) */}
            <LocalDirectoryHighlights
              facilities={healthcareFacilities}
              places={places}
              organizations={featuredOrganizations}
            />

            {/* Featured Guides Section (Section 12 & 15: Evergreen Guides) */}
            <FeaturedGuidesSection />

            {/* Events & Festivals Banner */}
            <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                  বাৎসরিক নির্ঘণ্ট
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  বারুইপুরের উৎসব ও মেলা ক্যালেন্ডার ২০২৬
                </h3>
                <p className="text-xs text-amber-100 mt-0.5">
                  ঐতিহাসিক বারুইপুর রাসমেলা, রাসমাঠের অনুষ্ঠান ও আঞ্চলিক লোকউৎসব।
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

          {/* Right Column: Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-6 min-w-0" aria-label="বারুইপুর ইউটিলিটি ও ডিরেক্টরি">
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
        <AdSenseSlot format="leaderboard" className="mt-8" />
      </div>
    </div>
  );
}
