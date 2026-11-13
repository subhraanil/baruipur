'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { formatTimeAgoBengali } from '@/lib/dateUtils';
import { getSafeImageUrl } from '@/lib/videoUtils';
import { Share2, Clock, Flame, Play, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
}

export default function NewsCard({ article, variant = 'standard' }: NewsCardProps) {
  const postUrl = `/${article.slug || article.id}`;
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${postUrl}` 
    : postUrl;

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(`*${article.title}*\n\nপড়ুন বারুইপুর অনলাইনে:\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const categoryColorMap: Record<string, string> = {
    municipality: 'bg-emerald-600',
    railway: 'bg-blue-600',
    crime: 'bg-rose-700',
    health: 'bg-teal-600',
    education: 'bg-indigo-600',
    culture: 'bg-amber-600',
    food: 'bg-orange-600',
    general: 'bg-[#C62828]'
  };

  const badgeColor = categoryColorMap[article.category] || 'bg-[#C62828]';
  const hasVideo = Boolean(article.videoUrl || article.videoEmbedUrl);
  const safeImgUrl = getSafeImageUrl(article.imageUrl);
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';

  // Only consider 'breaking' if published within the last 24 hours
  const isRecentBreaking = Boolean(
    article.isBreaking && 
    article.publishedAt && 
    (Date.now() - new Date(article.publishedAt).getTime() < 24 * 60 * 60 * 1000)
  );

  const safeAlt = (text: string, max = 78) => {
    if (!text) return 'বারুইপুর সংবাদ';
    const clean = text.replace(/["']/g, '');
    return clean.length > max ? clean.slice(0, max - 3) + '...' : clean;
  };

  const cleanSummary = (text?: string) => {
    if (!text) return '';
    return text.replace(/###.*?\n/g, '').replace(/[*_#]/g, '').trim();
  };

  // 1. Ultra-Compact Horizontal Variant (Recommended for Latest News Feed)
  if (variant === 'horizontal') {
    const summary = cleanSummary(article.summary);

    return (
      <article className="editorial-card bg-white rounded-2xl border border-slate-200/80 p-3.5 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-row gap-3 sm:gap-4 items-start group">
        {/* Compact Thumbnail */}
        <a 
          href={postUrl} 
          className="relative w-24 sm:w-32 aspect-[16/11] rounded-lg overflow-hidden bg-slate-100 shrink-0 block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={safeImgUrl} 
            alt={safeAlt(article.title)}
            width={200}
            height={138}
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <div className="w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3 h-3 fill-current translate-x-0.5" />
              </div>
            </div>
          )}
        </a>

        {/* Content Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            {/* Meta Row */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs`}>
                {article.categoryNameBn || 'খবর'}
              </span>
              {isRecentBreaking && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                  <Flame className="w-2.5 h-2.5" />
                  ব্রেকিং
                </span>
              )}
              <span className="text-slate-400 text-[11px] flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3 text-slate-400" />
                {article.isGuide ? 'স্থায়ী গাইড' : formatTimeAgoBengali(article.publishedAt)}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-xs sm:text-[14px] font-bold text-slate-900 group-hover:text-[#C62828] transition-colors leading-snug line-clamp-2 mb-1">
              <a href={postUrl}>
                {article.title}
              </a>
            </h3>

            {/* Clean Short 1-Line Excerpt (Desktop only to prevent clutter) */}
            {summary && (
              <p className="hidden sm:block text-slate-500 text-xs line-clamp-1 leading-relaxed">
                {summary}
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 truncate max-w-[150px]">
              {article.authorName || 'বারুইপুর বার্তা ডেস্ক'}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 transition-colors"
                title="হোয়াটসঅ্যাপে শেয়ার করুন"
              >
                <Share2 className="w-3 h-3" />
                <span className="hidden sm:inline">শেয়ার</span>
              </button>
              <a href={postUrl} className="text-[#C62828] font-bold hover:underline flex items-center gap-0.5">
                <span>পড়ুন</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. Standard Vertical Card (Used in Category Highlights)
  return (
    <article className="editorial-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group">
      <a href={postUrl} className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={safeImgUrl} 
          alt={safeAlt(article.title)}
          width={600}
          height={338}
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs`}>
            {article.categoryNameBn || 'খবর'}
          </span>
          {hasVideo && (
            <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
              <Play className="w-2.5 h-2.5 fill-current" />
              ভিডিও
            </span>
          )}
          {isRecentBreaking && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs animate-pulse">
              <Flame className="w-2.5 h-2.5" />
              ব্রেকিং
            </span>
          )}
        </div>

        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center shadow group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 backdrop-blur-xs">
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            </div>
          </div>
        )}
      </a>

      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              {article.isGuide ? 'স্থায়ী গাইড' : formatTimeAgoBengali(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="truncate text-slate-500 text-[11px] font-medium">
              {article.authorName || 'বারুইপুর বার্তা ডেস্ক'}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#C62828] transition-colors line-clamp-2 mb-1.5">
            <a href={postUrl}>
              {article.title}
            </a>
          </h3>

          {article.summary && (
            <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
              {cleanSummary(article.summary)}
            </p>
          )}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-[11px]"
          >
            <Share2 className="w-3 h-3" />
            <span>হোয়াটসঅ্যাপ</span>
          </button>

          <a href={postUrl} className="text-[#C62828] font-bold hover:underline flex items-center gap-0.5 text-xs">
            <span>সম্পূর্ণ খবর</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
