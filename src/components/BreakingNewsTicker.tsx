'use client';

import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/lib/types';

interface BreakingNewsTickerProps {
  articles: Article[];
}

export default function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!articles || articles.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles, isPaused]);

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  const postUrl = `/${currentArticle.slug || currentArticle.id}/`;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  return (
    <div 
      className="bg-slate-900 border-b border-slate-800 text-white shadow-xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="তাজা সংবাদ ও গুরুত্বপূর্ণ আপডেট"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-[#C62828] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded shadow-xs tracking-wide shrink-0">
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

        {/* Interactive Controls & Counter */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
          <span className="tabular-nums font-mono text-[11px] hidden sm:inline text-slate-400 mr-1">
            {currentIndex + 1}/{articles.length}
          </span>
          <button
            onClick={handlePrev}
            aria-label="পূর্ববর্তী খবর"
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="পরবর্তী খবর"
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
