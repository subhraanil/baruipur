'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { formatTimeAgoBengali } from '@/lib/dateUtils';
import { getSafeImageUrl } from '@/lib/videoUtils';
import { Share2, Clock, Flame, Play } from 'lucide-react';

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
    const text = encodeURIComponent(`*${article.title}*\n\nপড়ুন বারুইপুরে:\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const categoryColorMap: Record<string, string> = {
    municipality: 'bg-emerald-600',
    railway: 'bg-blue-600',
    crime: 'bg-rose-700',
    health: 'bg-teal-600',
    education: 'bg-indigo-600',
    culture: 'bg-amber-600',
    general: 'bg-red-600'
  };

  const badgeColor = categoryColorMap[article.category] || 'bg-red-600';
  const hasVideo = Boolean(article.videoUrl || article.videoEmbedUrl);
  const safeImgUrl = getSafeImageUrl(article.imageUrl);
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';

  if (variant === 'featured') {
    return (
      <div className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all border border-slate-200">
        <a href={postUrl} className="block">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={safeImgUrl} 
              alt={article.title}
              onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                {article.categoryNameBn}
              </span>
              {hasVideo && (
                <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <Play className="w-3 h-3 fill-current" />
                  ভিডিও
                </span>
              )}
              {article.isBreaking && (
                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  তাজা খবর
                </span>
              )}
            </div>

            {/* Video Play Overlay */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 backdrop-blur-sm">
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Overlay Headline & Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3 text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.isGuide ? 'স্থায়ী গাইড • সেপ্টেম্বর ২০২৬' : formatTimeAgoBengali(article.publishedAt)}
                </span>
                <span>•</span>
                <span>সূত্র: {article.sourceName}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug group-hover:text-red-300 transition">
                {article.title}
              </h2>
              <p className="hidden sm:block text-slate-200 text-sm mt-2 line-clamp-2">
                {article.summary}
              </p>
            </div>
          </div>
        </a>

        {/* Action bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {article.views ? `${article.views} বার পঠিত` : 'নতুন সংযোজিত'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full font-medium transition"
              title="হোয়াটসঅ্যাপে শেয়ার করুন"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>শেয়ার</span>
            </button>
            <a 
              href={postUrl}
              className="text-red-600 font-bold hover:underline"
            >
              সম্পূর্ণ পড়ুন →
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 group">
        <a href={postUrl} className="relative sm:w-48 sm:shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-md overflow-hidden bg-slate-100 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={safeImgUrl} 
            alt={article.title}
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              </div>
            </div>
          )}
        </a>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`${badgeColor} text-white text-[11px] font-bold px-2 py-0.5 rounded`}>
                {article.categoryNameBn}
              </span>
              {hasVideo && (
                <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  ভিডিও
                </span>
              )}
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.isGuide ? 'স্থায়ী গাইড • সেপ্টেম্বর ২০২৬' : formatTimeAgoBengali(article.publishedAt)}
              </span>
            </div>

            <a href={postUrl}>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition leading-snug line-clamp-2">
                {article.title}
              </h3>
            </a>

            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 line-clamp-2">
              {article.summary}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 truncate max-w-[150px]">
              সূত্র: {article.sourceName}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                title="হোয়াটসঅ্যাপে শেয়ার করুন"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>শেয়ার</span>
              </button>
              <a href={postUrl} className="text-red-600 font-bold hover:underline">
                পড়ুন →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group">
      <a href={postUrl} className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={safeImgUrl} 
          alt={article.title}
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`${badgeColor} text-white text-[11px] font-bold px-2 py-0.5 rounded shadow`}>
            {article.categoryNameBn}
          </span>
          {hasVideo && (
            <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
              <Play className="w-2.5 h-2.5 fill-current" />
              ভিডিও
            </span>
          )}
          {article.isBreaking && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
              <Flame className="w-3 h-3" />
              তাজা
            </span>
          )}
        </div>

        {/* Play Icon on Card */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center shadow group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 backdrop-blur-sm">
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            </div>
          </div>
        )}
      </a>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.isGuide ? 'স্থায়ী গাইড • সেপ্টেম্বর ২০২৬' : formatTimeAgoBengali(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="truncate">সূত্র: {article.sourceName}</span>
          </div>

          <a href={postUrl}>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-600 transition line-clamp-2">
              {article.title}
            </h3>
          </a>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2">
            {article.summary}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>হোয়াটসঅ্যাপ</span>
          </button>

          <a href={postUrl} className="text-red-600 font-bold hover:underline">
            সম্পূর্ণ খবর →
          </a>
        </div>
      </div>
    </div>
  );
}
