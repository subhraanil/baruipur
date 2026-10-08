'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Article } from '@/lib/types';
import NewsCard from '@/components/NewsCard';
import { 
  Search, 
  Newspaper, 
  X, 
  Filter, 
  RotateCcw, 
  ChevronDown,
  Sparkles,
  Tag
} from 'lucide-react';

interface NewsStreamClientProps {
  initialArticles: Article[];
  allArticles: Article[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'সব খবর' },
  { id: 'municipality', label: 'পৌরসভা ও শহর' },
  { id: 'railway', label: 'ট্রেন ও যোগাযোগ' },
  { id: 'crime', label: 'আইন ও অপরাধ' },
  { id: 'health', label: 'স্বাস্থ্য' },
  { id: 'politics', label: 'রাজনীতি' },
  { id: 'education', label: 'শিক্ষা ও সমাজ' },
];

export default function NewsStreamClient({ initialArticles, allArticles }: NewsStreamClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(16);
  const streamRef = useRef<HTMLDivElement>(null);

  // Read URL query parameters on mount (e.g. from header global search)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search') || params.get('q');
      const cat = params.get('category');
      
      let shouldScroll = false;
      if (q) {
        setSearchQuery(q);
        shouldScroll = true;
      }
      if (cat) {
        setSelectedCategory(cat);
        shouldScroll = true;
      }

      if (shouldScroll) {
        setTimeout(() => {
          if (streamRef.current) {
            streamRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const isSearching = Boolean(q || selectedCategory !== 'all');

    // When searching or filtering, search across ALL published articles
    const sourcePool = isSearching ? allArticles : initialArticles;

    return sourcePool.filter(art => {
      // Category match
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }

      // Search query match
      if (q) {
        const titleMatch = art.title.toLowerCase().includes(q);
        const summaryMatch = art.summary && art.summary.toLowerCase().includes(q);
        const contentMatch = art.content && art.content.toLowerCase().includes(q);
        const catMatch = art.categoryNameBn && art.categoryNameBn.toLowerCase().includes(q);
        const sourceMatch = art.sourceName && art.sourceName.toLowerCase().includes(q);

        if (!titleMatch && !summaryMatch && !contentMatch && !catMatch && !sourceMatch) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, initialArticles, allArticles]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const hasMore = visibleCount < filteredArticles.length;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setVisibleCount(16);
  };

  return (
    <section id="latest-news-stream" ref={streamRef} className="scroll-mt-24 space-y-4">
      {/* Stream Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-red-600 pb-3">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-red-600 shrink-0" />
          <h3 className="text-lg font-bold text-slate-900">
            সর্বশেষ সংবাদ প্রবাহ
          </h3>
          {(searchQuery || selectedCategory !== 'all') && (
            <span className="text-[11px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              ফিল্টার সক্রিয়
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>মোট {filteredArticles.length} টি খবর</span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold ml-2 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Search & Filter Controls */}
      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200/80 space-y-3">
        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(16);
            }}
            placeholder="খবরের শিরোনাম, বিষয়বস্তু বা এলাকা দিয়ে খুঁজুন (যেমন: অটো, হাসপাতাল, রেল, নিকাশি)..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setVisibleCount(16);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              title="অনুসন্ধান মুছুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <span className="text-slate-400 text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            বিভাগ:
          </span>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setVisibleCount(16);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition text-xs ${
                selectedCategory === tab.id
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Search Summary Pill */}
      {searchQuery && (
        <div className="bg-red-50/80 border border-red-200 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-red-900">
          <span className="font-medium">
            ‘<strong className="font-bold text-red-700">{searchQuery}</strong>’ সম্পর্কিত <strong>{filteredArticles.length}</strong> টি সংবাদ পাওয়া গেছে
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-red-700 hover:text-red-900 font-bold underline ml-2"
          >
            সার্চ মুছুন
          </button>
        </div>
      )}

      {/* News Articles List */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            কোনো খবর পাওয়া যায়নি
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-4">
            {searchQuery 
              ? `‘${searchQuery}’ অনুসন্ধান অনুযায়ী কোনো খবর মেলেনি। বানান যাচাই করুন অথবা অন্য শব্দ দিয়ে চেষ্টা করুন।`
              : 'নির্বাচিত বিভাগে এই মুহূর্তে কোনো খবর নেই।'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সকল খবর দেখুন</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedArticles.map(art => (
            <NewsCard key={art.id} article={art} variant="horizontal" />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl border border-slate-200 shadow-xs transition"
              >
                <span>আরও খবর লোড করুন ({filteredArticles.length - visibleCount} টি বাকি)</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
