import React from 'react';
import { db } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { CATEGORIES } from '@/lib/constants';
import { Flame, Sparkles, TrendingUp, Radio, Newspaper } from 'lucide-react';


interface PageProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

export default function HomePage() {
  const allArticles = db.getArticles({
    status: 'published'
  });

  const featuredArticle = allArticles.find(a => a.isFeatured) || allArticles[0];
  const sideArticles = allArticles.filter(a => a.id !== featuredArticle?.id).slice(0, 4);
  const remainingArticles = allArticles.filter(a => a.id !== featuredArticle?.id).slice(4);

  const railwayArticles = db.getArticles({ category: 'railway', limit: 3 });
  const municipalityArticles = db.getArticles({ category: 'municipality', limit: 3 });
  const crimeArticles = db.getArticles({ category: 'crime', limit: 3 });

  const homeItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'বারুইপুর অনলাইন - তাজা সংবাদ ও আপডেট',
    description: 'বারুইপুর মহকুমা ও দক্ষিণ ২৪ পরগনার শীর্ষস্থানীয় আঞ্চলিক সংবাদ সংকলন।',
    itemListElement: allArticles.slice(0, 30).map((art, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: art.title,
      url: `https://baruipur.online/${encodeURI(art.slug || art.id)}/`
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeItemListSchema) }}
      />

      {/* Main Grid: News + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: News Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Hero Section */}
          {featuredArticle && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-red-600" />
                  প্রধান ও আলোচিত খবর
                </h2>
              </div>
              <NewsCard article={featuredArticle} variant="featured" />
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

          {/* Latest news list */}
          <section>
            <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-red-600" />
                সর্বশেষ সংবাদ প্রবাহ
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                মোট {allArticles.length} টি খবর
              </span>
            </div>

            {allArticles.length === 0 ? (
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

          {/* Dedicated Category Sections: Municipality & Railways */}
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

          {/* Railway Spotlight */}
          <section className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  শিয়ালদহ দক্ষিণ রেল ও যাতায়াত
                </h3>
                <p className="text-xs text-blue-700">বারুইপুর জংশন ও লোকাল ট্রেন সংক্রান্ত খবর</p>
              </div>
              <a href="/category/railway" className="text-xs font-bold text-blue-700 hover:underline">
                আরও দেখুন →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {railwayArticles.map(art => (
                <NewsCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Train & Emergency Directory Widgets */}
          <BaruipurUtilities />
        </aside>
      </div>
    </div>
  );
}
