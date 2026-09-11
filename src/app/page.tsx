import React from 'react';
import { db } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { CATEGORIES } from '@/lib/constants';
import { Flame, Sparkles, TrendingUp, Radio, Newspaper } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

export default function HomePage({ searchParams }: PageProps) {
  const searchQuery = searchParams?.search;
  const categoryFilter = searchParams?.category;

  const allArticles = db.getArticles({
    search: searchQuery,
    category: categoryFilter,
    status: 'published'
  });

  const featuredArticle = allArticles.find(a => a.isFeatured) || allArticles[0];
  const sideArticles = allArticles.filter(a => a.id !== featuredArticle?.id).slice(0, 4);
  const remainingArticles = allArticles.filter(a => a.id !== featuredArticle?.id).slice(4);

  const railwayArticles = db.getArticles({ category: 'railway', limit: 3 });
  const municipalityArticles = db.getArticles({ category: 'municipality', limit: 3 });
  const crimeArticles = db.getArticles({ category: 'crime', limit: 3 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Search Alert / Title if active */}
      {searchQuery && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
          <p className="text-slate-800 text-sm">
            অনুসন্ধান ফলাফল: <strong className="text-red-600 font-bold">&quot;{searchQuery}&quot;</strong> ({allArticles.length} টি সংবাদ পাওয়া গিয়েছে)
          </p>
          <a href="/" className="text-xs text-red-600 font-bold hover:underline">
            সমস্ত খবর দেখুন
          </a>
        </div>
      )}

      {/* Main Grid: News + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: News Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Hero Section */}
          {featuredArticle && !searchQuery && (
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
          {sideArticles.length > 0 && !searchQuery && (
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

          {/* Search Results list or remaining articles */}
          <section>
            <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-red-600" />
                {searchQuery ? 'অনুসন্ধানের খবর' : 'সর্বশেষ সংবাদ প্রবাহ'}
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
                {(searchQuery ? allArticles : remainingArticles).map(art => (
                  <NewsCard key={art.id} article={art} variant="horizontal" />
                ))}
              </div>
            )}
          </section>

          {/* Dedicated Category Sections: Municipality & Railways */}
          {!searchQuery && (
            <>
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
            </>
          )}
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
