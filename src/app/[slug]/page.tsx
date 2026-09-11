import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatBengaliDate, formatTimeAgoBengali } from '@/lib/dateUtils';
import { CATEGORIES } from '@/lib/constants';
import { getSafeImageUrl } from '@/lib/videoUtils';
import NewsCard from '@/components/NewsCard';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { 
  Clock, 
  Eye, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  Flame, 
  Send,
  Play
} from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export default function PostSlugPage({ params }: PostPageProps) {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const article = db.getArticleById(rawSlug) || db.getArticleById(decodedSlug);

  if (!article) {
    notFound();
  }

  // Increment views
  db.incrementViews(article.id);

  const relatedArticles = db.getArticles({
    category: article.category,
    limit: 4
  }).filter(a => a.id !== article.id);

  const postSlug = article.slug || article.id;
  const shareText = `${article.title} - বারুইপুরে সম্পূর্ণ খবরটি পড়ুন।`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 overflow-x-auto">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <a href={`/category/${article.category}`} className="hover:text-red-600 font-medium whitespace-nowrap">
          {article.categoryNameBn}
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Body (8 cols) */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.categoryNameBn}
            </span>
            {(article.videoUrl || article.videoEmbedUrl) && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Play className="w-3.5 h-3.5 fill-current" />
                ভিডিও প্রতিবেদন
              </span>
            )}
            {article.isBreaking && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                ব্রেকিং খবর
              </span>
            )}
            <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {article.views + 1} বার পঠিত
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subheading / Summary */}
          {article.summary && (
            <p className="text-base sm:text-lg text-slate-600 font-medium border-l-4 border-red-500 pl-4 py-1 mb-6 bg-red-50/40 rounded-r-lg">
              {article.summary}
            </p>
          )}

          {/* Meta & Source attribution bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-150 mb-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span>{formatBengaliDate(article.publishedAt)}</span>
              <span>•</span>
              <span className="text-slate-500">{formatTimeAgoBengali(article.publishedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">সংবাদ সূত্র:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">
                {article.sourceName}
              </span>
              {article.originalPostUrl && (
                <a 
                  href={article.originalPostUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-0.5 underline"
                >
                  মূল পোস্ট <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Featured Media: Embedded Video Player OR Featured Image */}
          {article.videoEmbedUrl || article.videoUrl ? (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black mb-6 shadow-md border border-slate-200">
              {article.videoUrl && (article.videoUrl.endsWith('.mp4') || article.videoUrl.endsWith('.webm')) ? (
                <video 
                  controls 
                  poster={getSafeImageUrl(article.imageUrl)}
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  <source src={article.videoUrl} type="video/mp4" />
                  আপনার ব্রাউজার ভিডিও প্লেয়ার সাপোর্ট করে না।
                </video>
              ) : (
                <iframe
                  src={article.videoEmbedUrl || article.videoUrl}
                  title={article.title}
                  className="w-full h-full border-0"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                />
              )}
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 mb-6 shadow-sm border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getSafeImageUrl(article.imageUrl)} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Social Share Callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-emerald-600 text-white">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">খবরটি বন্ধুদের সাথে শেয়ার করুন</p>
                <p className="text-[11px] text-emerald-700">বারুইপুরের বন্ধুদের কাছে সত্য খবর পৌঁছে দিন</p>
              </div>
            </div>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              হোয়াটসঅ্যাপে শেয়ার করুন
            </a>
          </div>

          {/* Full Article Content */}
          <div className="prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom Navigation Back Button */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <a 
              href="/" 
              className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
            >
              ← সব খবরে ফিরে যান
            </a>
            <a 
              href={`/category/${article.category}`}
              className="text-xs font-bold text-slate-700 hover:text-red-600 hover:underline"
            >
              {article.categoryNameBn}-র আরও খবর →
            </a>
          </div>
        </article>

        {/* Right Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Related News */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-150 pb-2 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                একই বিভাগের আরও খবর
              </h3>
              <div className="space-y-3">
                {relatedArticles.map(rel => (
                  <a 
                    key={rel.id} 
                    href={`/${rel.slug || rel.id}`}
                    className="block group p-2.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                  >
                    <p className="text-xs text-slate-400 mb-1">{formatTimeAgoBengali(rel.publishedAt)}</p>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-600 leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Local Utilities (Train live removed as requested, emergency helpline preserved) */}
          <BaruipurUtilities showTrains={false} />
        </aside>
      </div>
    </div>
  );
}
