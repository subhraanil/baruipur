'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { formatTimeAgoBengali } from '@/lib/dateUtils';
import { getSafeImageUrl } from '@/lib/videoUtils';
import { Clock, Play, ArrowRight, Flame, Sparkles, Newspaper } from 'lucide-react';

interface FeaturedHeroGridProps {
  leadArticle: Article;
  secondaryArticles: Article[];
}

export default function FeaturedHeroGrid({ leadArticle, secondaryArticles }: FeaturedHeroGridProps) {
  if (!leadArticle) return null;

  const leadUrl = `/${leadArticle.slug || leadArticle.id}/`;
  const leadImg = getSafeImageUrl(leadArticle.imageUrl);
  const fallbackImg = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';
  const leadHasVideo = Boolean(leadArticle.videoUrl || leadArticle.videoEmbedUrl);

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

  const getBadgeColor = (category?: string) => {
    return (category && categoryColorMap[category]) || 'bg-[#C62828]';
  };

  const safeAlt = (text: string, max = 80) => {
    if (!text) return 'বারুইপুর সংবাদ';
    const clean = text.replace(/["']/g, '');
    return clean.length > max ? clean.slice(0, max - 3) + '...' : clean;
  };

  const cleanSummary = (text?: string) => {
    if (!text) return '';
    return text.replace(/###.*?\n/g, '').replace(/[*_#]/g, '').trim();
  };

  return (
    <section className="mb-8" aria-label="প্রধান ও আলোচিত সংবাদ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        {/* Main Lead Story (7 cols on desktop) */}
        <article className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
          <a href={leadUrl} className="block relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leadImg}
              alt={safeAlt(leadArticle.title)}
              width={800}
              height={450}
              onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
              <span className={`${getBadgeColor(leadArticle.category)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs`}>
                {leadArticle.categoryNameBn || 'বারুইপুর'}
              </span>
              {leadHasVideo && (
                <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Play className="w-3 h-3 fill-current" />
                  ভিডিও
                </span>
              )}
              {leadArticle.isBreaking && (
                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  ব্রেকিং
                </span>
              )}
            </div>

            {leadHasVideo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-13 h-13 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 backdrop-blur-xs">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            )}
          </a>

          {/* Lead Content Box */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Metadata row */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5 font-medium flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {formatTimeAgoBengali(leadArticle.publishedAt)}
                </span>
                <span>•</span>
                <span className="text-slate-600">
                  {leadArticle.authorName || 'বারুইপুর বার্তা ডেস্ক'}
                </span>
                {leadArticle.reportingLocation && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline text-slate-600">
                      স্থান: {leadArticle.reportingLocation}
                    </span>
                  </>
                )}
              </div>

              {/* Lead Headline */}
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-[#C62828] transition-colors leading-snug mb-3">
                <a href={leadUrl}>
                  {leadArticle.title}
                </a>
              </h2>

              {/* Summary / Excerpt */}
              {leadArticle.summary && (
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {cleanSummary(leadArticle.summary)}
                </p>
              )}
            </div>

            {/* Read more button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#C62828]">
              <a href={leadUrl} className="flex items-center gap-1.5 hover:underline group-hover:gap-2 transition-all">
                <span>সম্পূর্ণ খবর পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-slate-400 font-normal">
                {leadArticle.views ? `${leadArticle.views} বার পঠিত` : 'তাজা প্রতিবেদন'}
              </span>
            </div>
          </div>
        </article>

        {/* Secondary Stories Cohesive Editorial Panel (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse"></span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Newspaper className="w-4 h-4 text-[#C62828]" />
                আরও শীর্ষ সংবাদ (Top Stories)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              সর্বশেষ তাজা খবর
            </span>
          </div>

          {/* List with Dividers */}
          <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-around">
            {secondaryArticles.slice(0, 3).map((art, idx) => {
              const artUrl = `/${art.slug || art.id}/`;
              const artImg = getSafeImageUrl(art.imageUrl);
              const hasVideo = Boolean(art.videoUrl || art.videoEmbedUrl);
              const summary = cleanSummary(art.summary);

              return (
                <article
                  key={art.id || idx}
                  className="py-3 sm:py-3.5 first:pt-2 last:pb-2 group flex gap-3.5 items-start transition-colors"
                >
                  {/* Thumbnail */}
                  <a 
                    href={artUrl} 
                    className="relative w-24 sm:w-28 aspect-[16/11] rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-2xs group-hover:shadow-xs transition-all"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artImg}
                      alt={safeAlt(art.title)}
                      width={200}
                      height={138}
                      onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                          <Play className="w-3 h-3 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}
                  </a>

                  {/* Content details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`${getBadgeColor(art.category)} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs`}>
                        {art.categoryNameBn || 'খবর'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {formatTimeAgoBengali(art.publishedAt)}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#C62828] transition-colors leading-snug line-clamp-2 mb-1">
                      <a href={artUrl}>
                        {art.title}
                      </a>
                    </h4>

                    {summary && (
                      <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {summary}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Panel Footer Link */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#C62828]">
            <a href="/#latest-news" className="flex items-center gap-1 hover:underline">
              <span>সকল সংবাদ প্রবাহ দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-[11px] text-slate-400 font-normal">
              ২৪x৭ আপডেট
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
