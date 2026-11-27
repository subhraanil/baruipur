'use client';

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { cleanPlainExcerpt, toBengaliDigits } from '@/lib/formatters';
import Tilt3DCard from '@/components/Tilt3DCard';

export interface ArticleCardItem {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  categoryNameBn?: string;
  imageUrl?: string;
  publishedAt: string;
  authorName?: string;
  reportingLocation?: string;
}

interface ArticlesClientProps {
  articles: ArticleCardItem[];
}

const TOPIC_GROUPS = [
  { key: 'all', label: 'সব আর্টিকেল', matches: [] as string[] },
  { key: 'culture', label: 'সংস্কৃতি ও উৎসব', matches: ['culture', 'events', 'culture-events'] },
  { key: 'food', label: 'খাবার ও রেস্তোরাঁ', matches: ['food'] },
  { key: 'travel', label: 'ভ্রমণ ও দর্শনীয় স্থান', matches: ['travel', 'places'] },
  { key: 'lifestyle', label: 'ব্যবসা ও জীবনযাত্রা', matches: ['business-market', 'lifestyle', 'sports-youth'] },
  { key: 'civic', label: 'পৌর ও নাগরিক সেবা', matches: ['municipality', 'civic', 'civic-administration', 'administration-civic', 'general', 'crime'] },
  { key: 'health_edu', label: 'স্বাস্থ্য ও শিক্ষা', matches: ['health', 'health-medical', 'education', 'education-jobs'] },
  { key: 'transport', label: 'যাতায়াত ও রেল', matches: ['transport', 'railway-transport'] },
];

function getTopicLabelBn(cat: string, fallback?: string): string {
  if (fallback && fallback.trim() && !/^[a-z_-]+$/i.test(fallback.trim())) {
    return fallback.trim();
  }
  const found = TOPIC_GROUPS.find((g) => g.matches.includes(cat));
  return found ? found.label : 'বারুইপুর গাইড';
}

function formatDateBn(iso: string): string {
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const topicObj = TOPIC_GROUPS.find((t) => t.key === selectedTopic);

    return articles.filter((a) => {
      const matchesTopic =
        selectedTopic === 'all' ||
        (topicObj && topicObj.matches.includes((a.category || '').toLowerCase()));

      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        (a.summary && a.summary.toLowerCase().includes(q)) ||
        (a.categoryNameBn && a.categoryNameBn.toLowerCase().includes(q)) ||
        (a.reportingLocation && a.reportingLocation.toLowerCase().includes(q));

      return matchesTopic && matchesSearch;
    });
  }, [articles, searchQuery, selectedTopic]);

  return (
    <div className="space-y-6">
      {/* Search & Topic Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E4E7EC] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#667085]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="বারুইপুর বিষয়ক আর্টিকেল, গাইড বা ব্লগ খুঁজুন (যেমন: পেয়ারা, রাসমেলা, স্কুল, খাবার)..."
            className="w-full min-h-[48px] pl-12 pr-4 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] focus:bg-white focus:border-[#245B91] focus:outline-none text-[17px] text-[#202938]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TOPIC_GROUPS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setSelectedTopic(t.key)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-[15px] font-semibold transition-colors ${
                selectedTopic === t.key
                  ? 'bg-[#142B4A] text-white'
                  : 'bg-[#F5F7FA] text-[#202938] hover:bg-[#E4E7EC]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Computed Count */}
      <div className="flex items-center justify-between text-[16px] font-medium text-[#475467]">
        <span>
          মোট <strong className="text-[#142B4A]">{toBengaliDigits(filtered.length)}টি</strong> আর্টিকেল ও ব্লগ
        </span>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E7EC] p-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#667085] mx-auto" />
          <p className="text-[18px] font-bold text-[#142B4A]">কোনো আর্টিকেল পাওয়া যায়নি</p>
          <p className="text-[16px] text-[#667085]">অন্য কোনো বিষয় বা শব্দ দিয়ে খুঁজে দেখুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => {
            const href = `/${art.slug || art.id}`;
            const img =
              art.imageUrl && art.imageUrl.trim()
                ? art.imageUrl
                : '/images/places/baruipur-junction-railway-station.jpg';
            const excerpt = cleanPlainExcerpt(art.summary || art.content, 120, 140);
            const wordCount = (art.content || '').trim().split(/\s+/).length;
            const readMins = Math.max(2, Math.ceil(wordCount / 180));
            const dateStr = formatDateBn(art.publishedAt);

            return (
              <Tilt3DCard key={art.id} className="h-full">
                <article className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm card-3d overflow-hidden flex flex-col h-full">
                  <a href={href} className="block aspect-video w-full bg-slate-100 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-[14px]">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#F5F7FA] text-[#142B4A] font-semibold">
                        {getTopicLabelBn(art.category, art.categoryNameBn)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#667085]">
                        <Clock className="w-3.5 h-3.5" />
                        {toBengaliDigits(readMins)} মিনিট
                      </span>
                    </div>

                    <h2 className="text-[19px] sm:text-[21px] font-bold text-[#202938] leading-[1.4] line-clamp-2">
                      <a href={href} className="hover:text-[#245B91] transition-colors">
                        {art.title}
                      </a>
                    </h2>

                    {excerpt && (
                      <p className="text-[16px] text-[#475467] leading-[1.65] line-clamp-3 flex-1">
                        {excerpt}
                      </p>
                    )}

                    <div className="pt-3 mt-auto border-t border-[#E4E7EC] flex items-center justify-between gap-2 text-[14px] text-[#667085]">
                      <span className="inline-flex items-center gap-1 truncate">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{dateStr}</span>
                      </span>
                      <a
                        href={href}
                        className="inline-flex items-center gap-1 min-h-[44px] px-3.5 py-2 rounded-lg bg-[#142B4A] hover:bg-[#245B91] text-white font-semibold text-[15px] transition-colors shrink-0"
                      >
                        <span>পড়ুন</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Tilt3DCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
