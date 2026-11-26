'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Stethoscope, Building2, FileText, Landmark, BookOpen, Phone, ArrowUpRight } from 'lucide-react';
import { formatPhoneForDisplay, formatPhoneForTel, toBengaliDigits } from '@/lib/formatters';

export interface SearchItem {
  id: string;
  type: 'place' | 'health' | 'doctor' | 'org' | 'notice' | 'tender' | 'guide';
  typeBn: string;
  title: string;
  subtitle: string;
  area?: string;
  phone?: string | null;
  href: string;
  keywords: string;
}

interface SearchClientProps {
  items: SearchItem[];
}

const TYPE_FILTERS = [
  { key: 'all', label: 'সব ফলাফল' },
  { key: 'doctor', label: 'ডাক্তার' },
  { key: 'health', label: 'হাসপাতাল ও ক্লিনিক' },
  { key: 'place', label: 'স্থান' },
  { key: 'org', label: 'সংগঠন' },
  { key: 'notice', label: 'নোটিস' },
  { key: 'tender', label: 'টেন্ডার' },
  { key: 'guide', label: 'গাইড' },
] as const;

export default function SearchClient({ items }: SearchClientProps) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const t = params.get('type');
      if (q) setQuery(q);
      if (t) setActiveType(t);
    }
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => {
        if (activeType !== 'all' && item.type !== activeType) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.area && item.area.toLowerCase().includes(q)) ||
          item.keywords.toLowerCase().includes(q)
        );
      })
      .slice(0, 60);
  }, [items, query, activeType]);

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'doctor':
      case 'health':
        return <Stethoscope className="w-5 h-5 text-emerald-700" />;
      case 'place':
        return <MapPin className="w-5 h-5 text-blue-700" />;
      case 'org':
        return <Building2 className="w-5 h-5 text-purple-700" />;
      case 'notice':
        return <Landmark className="w-5 h-5 text-amber-700" />;
      case 'tender':
        return <FileText className="w-5 h-5 text-slate-700" />;
      case 'guide':
        return <BookOpen className="w-5 h-5 text-teal-700" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Big Search Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ডাক্তার, হাসপাতাল, স্থান, ক্লাব, সরকারি নোটিস বা টেন্ডার খুঁজুন..."
            className="w-full min-h-[52px] pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-700 focus:outline-none text-[17px] text-slate-900"
            autoFocus
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveType(f.key)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-[16px] font-medium transition-colors ${
                activeType === f.key
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-[16px] font-medium text-slate-700">
        মোট <span className="font-bold text-slate-900">{toBengaliDigits(results.length)}</span>টি ফলাফল পাওয়া গেছে
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-700">
          আপনার খোঁজার সাথে মিলে এমন কোনো তথ্য পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item) => {
            const safeTel = formatPhoneForTel(item.phone);
            const displayPhone = formatPhoneForDisplay(item.phone);
            return (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between gap-3 hover:border-slate-300 hover:shadow-sm transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[14px] font-medium">
                        {item.typeBn}
                      </span>
                      {item.area && (
                        <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 text-[14px] font-medium">
                          {item.area}
                        </span>
                      )}
                    </div>
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 leading-[1.4] line-clamp-2">
                      <a href={item.href} className="hover:text-blue-800">
                        {item.title}
                      </a>
                    </h2>
                    <p className="text-[15px] text-slate-700 line-clamp-2">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {safeTel && displayPhone && (
                    <a
                      href={safeTel}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-emerald-700 text-white text-[16px] font-medium hover:bg-emerald-800"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{displayPhone}</span>
                    </a>
                  )}
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 min-h-[44px] px-4 py-2 rounded-lg bg-slate-900 text-white text-[16px] font-medium hover:bg-blue-900 ml-auto"
                  >
                    <span>বিস্তারিত</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
