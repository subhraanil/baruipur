'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Article } from '@/lib/types';
import { formatTimeAgoBengali } from '@/lib/dateUtils';
import { getSafeImageUrl } from '@/lib/videoUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Play, 
  Share2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FeaturedNewsSliderProps {
  articles: Article[];
  autoPlayInterval?: number;
}

export default function FeaturedNewsSlider({ 
  articles, 
  autoPlayInterval = 5000 
}: FeaturedNewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = articles.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play timer (pauses on hover/touch)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, autoPlayInterval, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swiped left -> next slide
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev slide
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!articles || articles.length === 0) {
    return null;
  }

  const currentArticle = articles[currentIndex];
  const postUrl = `/${currentArticle.slug || currentArticle.id}`;
  const safeImgUrl = getSafeImageUrl(currentArticle.imageUrl);
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';
  const hasVideo = Boolean(currentArticle.videoUrl || currentArticle.videoEmbedUrl);

  const categoryColorMap: Record<string, string> = {
    municipality: 'bg-emerald-600',
    railway: 'bg-blue-600',
    crime: 'bg-rose-700',
    health: 'bg-teal-600',
    education: 'bg-indigo-600',
    culture: 'bg-amber-600',
    general: 'bg-red-600'
  };

  const badgeColor = categoryColorMap[currentArticle.category] || 'bg-red-600';

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${postUrl}` : postUrl;
    const text = encodeURIComponent(`*${currentArticle.title}*\n\nপড়ুন বারুইপুরে:\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Convert numbers to Bengali digits
  const toBengaliNumber = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image & Overlay */}
      <div className="relative aspect-[16/10] sm:aspect-[21/10] min-h-[340px] sm:min-h-[400px] w-full overflow-hidden bg-slate-950">
        {articles.map((art, idx) => {
          const isActive = idx === currentIndex;
          const imgUrl = getSafeImageUrl(art.imageUrl);

          return (
            <div
              key={art.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={art.title}
                onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark Gradient Overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />
            </div>
          );
        })}

        {/* Top Floating Header: Badges & Counter */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            <span className={`${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
              {currentArticle.categoryNameBn}
            </span>
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              তাজা খবর
            </span>
            {hasVideo && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Play className="w-3 h-3 fill-current" />
                ভিডিও
              </span>
            )}
          </div>

          {/* Slide Indicator Badge */}
          <div className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow">
            {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(total)}
          </div>
        </div>

        {/* Video Play Icon Indicator if applicable */}
        {hasVideo && (
          <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Slide Bottom Info & Content (Clickable) */}
        <a 
          href={postUrl} 
          className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-20 text-white block group/link"
        >
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {formatTimeAgoBengali(currentArticle.publishedAt)}
            </span>
            <span>•</span>
            <span className="text-slate-300 font-medium">
              সূত্র: {currentArticle.sourceName}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug tracking-tight mb-2 group-hover/link:text-red-300 transition-colors">
            {currentArticle.title}
          </h2>

          {/* Summary Preview */}
          {currentArticle.summary && (
            <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 max-w-3xl leading-relaxed mb-4">
              {currentArticle.summary}
            </p>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-400 group-hover/link:text-red-300 group-hover/link:translate-x-1 transition-all">
              সম্পূর্ণ খবর পড়ুন <ArrowRight className="w-4 h-4" />
            </span>

            <button
              onClick={handleShare}
              title="হোয়াটসঅ্যাপে শেয়ার করুন"
              className="p-2 rounded-lg bg-white/10 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">শেয়ার</span>
            </button>
          </div>
        </a>

        {/* Prev / Next Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
              }}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation Bar */}
      {total > 1 && (
        <div className="bg-slate-950/90 py-2.5 px-4 flex items-center justify-center gap-2 border-t border-slate-800/80">
          {articles.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'w-7 h-2 bg-red-600' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
