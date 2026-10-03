'use client';

import React, { useState, useEffect } from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { Article } from '@/lib/types';

interface BreakingNewsTickerProps {
  articles: Article[];
}

export default function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!articles || articles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  const postUrl = `/${currentArticle.slug || currentArticle.id}/`;

  return (
    <div className="bg-slate-900 border-y border-slate-800 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-red-600 text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded shadow-sm tracking-wide shrink-0">
          <Flame className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>তাজা আপডেট</span>
        </div>

        {/* Ticker Headline */}
        <div className="overflow-hidden flex-1 relative min-h-[22px] flex items-center">
          <a
            key={currentArticle.id}
            href={postUrl}
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-amber-300 transition-colors truncate block group"
          >
            <span className="text-amber-400 font-semibold mr-1.5 hidden sm:inline">
              [{currentArticle.categoryNameBn || 'বারুইপুর'}]
            </span>
            <span className="group-hover:underline">
              {currentArticle.title}
            </span>
          </a>
        </div>

        {/* Action Link & Count */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <span className="tabular-nums font-mono text-[11px]">
            {currentIndex + 1}/{articles.length}
          </span>
          <a
            href={postUrl}
            className="text-slate-300 hover:text-white flex items-center gap-0.5 hover:underline"
          >
            <span>পড়ুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
