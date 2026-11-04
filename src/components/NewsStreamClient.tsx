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
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface NewsStreamClientProps {
  initialArticles: Article[];
  allArticles: Article[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'সব খবর' },
  { id: 'municipality', label: 'পৌরসভা' },
  { id: 'railway', label: 'রেল ও ট্রেন' },
  { id: 'crime', label: 'আইন ও অপরাধ' },
  { id: 'health', label: 'স্বাস্থ্য' },
  { id: 'culture', label: 'উৎসব ও মেলা' },
  { id: 'food', label: 'খাবার' },
  { id: 'general', label: 'সাধারণ' },
];

export default function NewsStreamClient({ initialArticles, allArticles }: NewsStreamClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Initial 8 stories as recommended
  const [visibleCount, setVisibleCount] = useState(8);
  const streamRef = useRef<HTMLDivElement>(null);

  // Read URL query parameters on mount
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
    const sourcePool = allArticles && allArticles.length > 0 ? allArticles : initialArticles;

    return sourcePool.filter(art => {
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }

      if (q) {
        const titleMatch = art.title.toLowerCase().includes(q);
        const summaryMatch = art.summary && art.summary.toLowerCase().includes(q);
        const catMatch = art.categoryNameBn && art.categoryNameBn.toLowerCase().includes(q);
        if (!titleMatch && !summaryMatch && !catMatch) {
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
    setVisibleCount(8);
  };

  return (
    <section id="latest-news-stream" ref={streamRef} className="scroll-mt-24 space-y-4" aria-label="সর্বশেষ সংবাদ">
      {/* Stream Header & Active Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#C62828] pb-3">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#C62828] shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            সর্বশেষ স্থানীয় সংবাদ (Latest News)
          </h2>
          {(searchQuery || selectedCategory !== 'all') && (
            <span className="text-[11px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              ফিল্টার সক্রিয়
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>মোট {filteredArticles.length} টি সংবাদ</span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#C62828] hover:underline font-bold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Search & Horizontal Category Scroll Row */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/90 space-y-2.5">
        {/* Compact Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(8);
            }}
            placeholder="খবরের শিরোনাম বা বিষয়বস্তু খুঁজুন (যেমন: ট্রেন, পুলিশ, পৌরসভা, বাজি)..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C62828] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setVisibleCount(8);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              title="মুছুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
          <span className="text-slate-400 text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            বিভাগ:
          </span>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setVisibleCount(8);
              }}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition text-xs ${
                selectedCategory === tab.id
                  ? 'bg-[#C62828] text-white font-bold shadow-2xs'
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

      {/* News Articles List (Compact Horizontal Cards) */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            কোনো খবর পাওয়া যায়নি
          </h4>
          <p className="text-slate-500 text-xs max-w-md mx-auto mb-3">
            {searchQuery 
              ? `‘${searchQuery}’ অনুসন্ধান অনুযায়ী কোনো খবর মেলেনি। অন্য শব্দ দিয়ে চেষ্টা করুন।`
              : 'নির্বাচিত বিভাগে কোনো খবর নেই।'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 bg-[#C62828] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সকল খবর দেখুন</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayedArticles.map(art => (
            <NewsCard key={art.id} article={art} variant="horizontal" />
          ))}

          {/* Load More & Full Archive Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            {hasMore ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg border border-slate-200 shadow-2xs transition"
              >
                <span>আরও খবর লোড করুন ({filteredArticles.length - visibleCount} টি বাকি)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : <div />}

            <a
              href="/category/all"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C62828] hover:underline bg-red-50 hover:bg-red-100/70 px-3.5 py-2 rounded-lg transition"
            >
              <span>সকল সংবাদ আর্কাইভ দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
