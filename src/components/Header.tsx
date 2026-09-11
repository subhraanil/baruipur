'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  CloudSun, 
  Calendar, 
  PhoneCall, 
  Settings, 
  Search, 
  Flame, 
  Menu, 
  X,
  Share2,
  Bell
} from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { formatBengaliDate } from '@/lib/dateUtils';
import { Article } from '@/lib/types';

export default function Header() {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [breakingArticles, setBreakingArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCurrentDate(formatBengaliDate(new Date()));

    // Fetch breaking news articles for ticker
    fetch('/api/articles?limit=5')
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setBreakingArticles(data.data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>{currentDate || 'শুক্রবার, ১১ সেপ্টেম্বর ২০২৬'}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>বারুইপুর: ২৯°সে | আংশিক মেঘলা</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <a 
              href="#emergency-section" 
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>জরুরি ডিরেক্টরি</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="/admin" 
              className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2.5 py-0.5 rounded font-semibold transition"
            >
              <Settings className="w-3 h-3" />
              <span>অ্যাডমিন প্যানেল</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="/" className="group flex flex-col">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  লাইভ
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition">
                  বারুইপুর বার্তা
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                দক্ষিণ ২৪ পরগনার নির্ভরযোগ্য আঞ্চলিক ডিজিটাল সংবাদ পোর্টাল
              </p>
            </a>
          </div>

          {/* Search Form */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative w-64 lg:w-80">
              <input
                type="text"
                placeholder="বারুইপুরের খবর খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-red-600 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-red-50 border-y border-red-100 py-1.5 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded shrink-0 shadow-sm animate-pulse">
            <Flame className="w-3.5 h-3.5" />
            <span>তাজা খবর</span>
          </div>
          <div className="relative flex-1 overflow-hidden h-6 flex items-center">
            <div className="animate-ticker text-sm text-slate-800 font-medium whitespace-nowrap">
              {breakingArticles.length > 0 ? (
                breakingArticles.map((art, idx) => (
                  <a 
                    key={art.id} 
                    href={`/${art.slug || art.id}`}
                    className="inline-flex items-center hover:text-red-600 hover:underline mx-4"
                  >
                    <span className="text-red-600 font-bold mr-2">●</span>
                    {art.title}
                  </a>
                ))
              ) : (
                <span className="text-slate-600">বারুইপুর জংশন, মহকুমা হাসপাতাল ও পৌরসভার সমস্ত তাজা খবর সরাসরি সামাজিক মাধ্যম থেকে ক্রল ও প্রকাশিত হচ্ছে...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto py-1">
            {CATEGORIES.map((cat) => {
              const isActive = cat.slug === 'all' ? pathname === '/' : pathname.includes(`/category/${cat.slug}`);
              return (
                <a
                  key={cat.id}
                  href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                  className={`px-3.5 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {cat.nameBn}
                </a>
              );
            })}
          </div>

          {/* Mobile Category Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
              <form onSubmit={handleSearch} className="mb-3 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="খবর খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 pl-3 pr-9 text-sm"
                  />
                  <button type="submit" className="absolute right-2 top-2 text-slate-500">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-base font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
                >
                  {cat.nameBn}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <a 
                  href="/admin" 
                  className="block px-3 py-2 rounded bg-red-600 text-white text-center font-bold"
                >
                  অ্যাডমিন ড্যাশবোর্ড
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
