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
  Menu, 
  X,
  Share2,
  Bell
} from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { formatBengaliDate } from '@/lib/dateUtils';

export default function Header() {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setCurrentDate(formatBengaliDate(new Date()));

    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.')) {
        setIsLocal(true);
      }
    }
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
              href="/emergency-contacts" 
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>জরুরি ডিরেক্টরি</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="/submit-news" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline"
            >
              সংবাদ পাঠান
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/about" 
              className="text-slate-300 hover:text-white font-medium"
            >
              আমাদের সম্পর্কে
            </a>
            {isLocal && (
              <>
                <span className="text-slate-700">|</span>
                <a 
                  href="/admin" 
                  className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2.5 py-0.5 rounded font-semibold transition"
                >
                  <Settings className="w-3 h-3" />
                  <span>অ্যাডমিন</span>
                </a>
              </>
            )}
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
              <div className="flex items-baseline gap-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition">
                  বারুইপুর
                </h1>
                <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-red-600 tracking-tight">
                  Baruipur
                </span>
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


      {/* Primary Navigation Bar */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto py-1">
            <a
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-bold whitespace-nowrap transition-all ${
                pathname === '/' 
                  ? 'bg-red-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              প্রচ্ছদ
            </a>
            <a
              href="/#latest-news"
              className="px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              📰 তাজা সংবাদ
            </a>
            <a
              href="/places"
              className={`px-3 py-2 rounded-md text-sm font-bold whitespace-nowrap transition-all ${
                pathname.startsWith('/places') 
                  ? 'bg-red-600 text-white shadow-sm' 
                  : 'text-amber-800 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              🏛️ স্থান ও ল্যান্ডমার্ক
            </a>
            <a
              href="/organizations"
              className={`px-3 py-2 rounded-md text-sm font-bold whitespace-nowrap transition-all ${
                pathname.startsWith('/organizations') 
                  ? 'bg-red-600 text-white shadow-sm' 
                  : 'text-purple-800 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              🏢 প্রতিষ্ঠান ও ক্লাব
            </a>
            <a
              href="/#featured-guides"
              className="px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition"
            >
              🧭 স্পেশাল গাইড
            </a>
            <a
              href="/transport"
              className={`px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
                pathname.startsWith('/transport') 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              🚆 পরিবহন ও ট্রেন
            </a>
            <a
              href="/citizen-services"
              className={`px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
                pathname.startsWith('/citizen-services') 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              📋 নাগরিক পরিষেবা
            </a>
            <a
              href="/events"
              className={`px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
                pathname.startsWith('/events') 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              🎡 উৎসব ও মেলা
            </a>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="বারুইপুরের খবর বা প্রতিষ্ঠান খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                  />
                  <button type="submit" className="absolute right-3 top-3 text-slate-500">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Navigation Sections */}
              <div className="space-y-1 px-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">
                  প্রধান বিভাগ
                </div>
                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-red-50 hover:text-red-600 transition"
                >
                  <span className="text-base">🏠</span> প্রচ্ছদ (Home)
                </a>
                <a
                  href="/#latest-news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="text-base">📰</span> তাজা সংবাদ প্রবাহ
                </a>
              </div>

              <div className="space-y-1 px-1 border-t border-slate-100 pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">
                  ডিরেক্টরি ও তথ্যকোষ
                </div>
                <a
                  href="/places"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-amber-800 bg-amber-50/50 hover:bg-amber-100/60 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">🏛️</span> স্থান ও ল্যান্ডমার্ক ডিরেক্টরি
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                    Places
                  </span>
                </a>
                <a
                  href="/organizations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-purple-800 bg-purple-50/50 hover:bg-purple-100/60 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">🏢</span> প্রতিষ্ঠান, ক্লাব ও সংগঠন
                  </span>
                  <span className="text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded font-semibold">
                    Orgs
                  </span>
                </a>
                <a
                  href="/#featured-guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-cyan-800 hover:bg-cyan-50 transition"
                >
                  <span className="text-base">🧭</span> স্পেশাল গাইড (Guides)
                </a>
              </div>

              <div className="space-y-1 px-1 border-t border-slate-100 pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">
                  নাগরিক ও দৈনন্দিন সেবা
                </div>
                <a
                  href="/transport"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-blue-800 hover:bg-blue-50 transition"
                >
                  <span className="text-base">🚆</span> লোকাল ট্রেন ও পরিবহন (Transport)
                </a>
                <a
                  href="/citizen-services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-emerald-800 hover:bg-emerald-50 transition"
                >
                  <span className="text-base">📋</span> পুরসভা ও নাগরিক পরিষেবা
                </a>
                <a
                  href="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-amber-800 hover:bg-amber-50 transition"
                >
                  <span className="text-base">🎡</span> বার্ষিক মেলা ও উৎসব ক্যালেন্ডার
                </a>
                <a
                  href="/emergency-contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/70 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">🚓</span> ২৪/৭ জরুরি হেল্পলাইন নম্বর
                  </span>
                  <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded font-bold">
                    HOTLINE
                  </span>
                </a>
              </div>

              <div className="space-y-1 px-1 border-t border-slate-100 pt-2 text-xs text-slate-600">
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="/submit-news"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg bg-slate-100 text-center font-bold text-slate-800 hover:bg-slate-200"
                  >
                    ✉️ সংবাদ পাঠান
                  </a>
                  <a
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg bg-slate-100 text-center font-bold text-slate-800 hover:bg-slate-200"
                  >
                    ℹ️ আমাদের সম্পর্কে
                  </a>
                </div>
              </div>

              {isLocal && (
                <div className="pt-2 border-t border-slate-100">
                  <a 
                    href="/admin" 
                    className="block px-3 py-2.5 rounded-lg bg-red-600 text-white text-center font-bold text-sm shadow"
                  >
                    অ্যাডমিন ড্যাশবোর্ড
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
