import React from 'react';
import { Article } from '@/lib/types';
import NewsCard from '@/components/NewsCard';
import { ArrowRight } from 'lucide-react';

interface NewsCategorySectionProps {
  title: string;
  subtitle?: string;
  categorySlug: string;
  viewAllHref: string;
  accentColor: string;
  badgeDotColor: string;
  articles: Article[];
}

export default function NewsCategorySection({
  title,
  subtitle,
  categorySlug,
  viewAllHref,
  accentColor,
  badgeDotColor,
  articles
}: NewsCategorySectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={`p-4 sm:p-5 rounded-2xl border ${accentColor} shadow-2xs mb-6`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/80">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${badgeDotColor}`}></span>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <a 
          href={viewAllHref} 
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#C62828] transition-colors"
        >
          <span>সব দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {articles.slice(0, 3).map((art) => (
          <NewsCard key={art.id} article={art} variant="standard" />
        ))}
      </div>
    </section>
  );
}
