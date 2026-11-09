'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  ArrowRight,
  PlusCircle,
  Building2,
  Bell,
  Home,
  FileText,
  Stethoscope,
  TrainTrack,
  Landmark,
  ShieldAlert,
  ChevronRight,
  Send
} from 'lucide-react';
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
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search') || params.get('q');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navLinks = [
    {
      label: 'প্রচ্ছদ',
      href: '/',
      isActive: pathname === '/',
      badge: null,
      color: 'hover:text-red-600'
    },
    {
      label: '📰 তাজা সংবাদ',
      href: '/#latest-news',
      isActive: false,
      badge: null,
      color: 'hover:text-red-600'
    },
    {
      label: '🏡 জমি ও ফ্ল্যাট',
      href: '/property',
      isActive: pathname.startsWith('/property') || pathname.startsWith('/real-estate'),
      badge: 'নতুন',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      color: 'hover:text-emerald-700'
    },
    {
      label: '🏛️ সরকারি টেন্ডার',
      href: '/tenders',
      isActive: pathname.startsWith('/tenders'),
      badge: 'NIT',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      color: 'hover:text-red-700'
    },
    {
      label: '📢 জরুরি নোটিস',
      href: '/notices',
      isActive: pathname.startsWith('/notices'),
      badge: 'সার্কুলার',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      color: 'hover:text-amber-700'
    },
    {
      label: '🏥 স্বাস্থ্য ও ডাক্তার',
      href: '/health-directory',
      isActive: pathname.startsWith('/health-directory'),
      badge: 'OPD',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      color: 'hover:text-rose-800'
    },
    {
      label: '🚆 পরিবহন ও ট্রেন',
      href: '/transport',
      isActive: pathname.startsWith('/transport'),
      badge: 'লোকাল',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      color: 'hover:text-blue-700'
    },
    {
      label: '🏛️ স্থান ও ল্যান্ডমার্ক',
      href: '/places',
      isActive: pathname.startsWith('/places'),
      badge: null,
      color: 'hover:text-amber-800'
    },
    {
      label: '🏢 প্রতিষ্ঠান ও ক্লাব',
      href: '/organizations',
      isActive: pathname.startsWith('/organizations'),
      badge: null,
      color: 'hover:text-purple-800'
    },
    {
      label: '🍽️ খাবার ও রেস্তোরাঁ',
      href: '/category/food',
      isActive: pathname === '/category/food',
      badge: null,
      color: 'hover:text-orange-700'
    },
    {
      label: '📋 নাগরিক পরিষেবা',
      href: '/citizen-services',
      isActive: pathname.startsWith('/citizen-services'),
      badge: null,
      color: 'hover:text-teal-800'
    },
    {
      label: '🎡 উৎসব ও মেলা',
      href: '/events',
      isActive: pathname.startsWith('/events'),
      badge: null,
      color: 'hover:text-amber-700'
    }
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/90 shadow-xs sticky top-0 z-50">
      {/* 1. Top Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Date & Weather */}
          <div className="flex items-center space-x-3.5">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>{currentDate || 'শুক্রবার, ১১ সেপ্টেম্বর ২০২৬'}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>বারুইপুর: ২৯°সে | আংশিক মেঘলা</span>
            </span>
          </div>

          {/* Right: Quick Emergency & Editorial Links */}
          <div className="flex items-center space-x-3 text-xs">
            <a 
              href="/emergency-contacts" 
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40 transition"
            >
              <PhoneCall className="w-3 h-3 text-red-400 animate-pulse" />
              <span>জরুরি হেল্পলাইন</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/submit-news" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              সংবাদ পাঠান
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <a 
              href="/editorial-team" 
              className="text-slate-300 hover:text-white font-medium hidden md:inline transition"
            >
              বার্তা পরিষদ
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/about" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              আমাদের পরিচয়
            </a>

            {isLocal && (
              <>
                <span className="text-slate-700">|</span>
                <a 
                  href="/admin" 
                  className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2 py-0.5 rounded font-bold text-[11px] transition"
                >
                  <Settings className="w-3 h-3" />
                  <span>অ্যাডমিন</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
              aria-label="মেনু খুলুন"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a href="/" className="group flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo.png" 
                alt="বারুইপুর অনলাইন - Baruipur Online" 
                width={210}
                height={50}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Search Bar with Quick Suggestion Tags */}
          <div className="hidden md:flex flex-col items-end gap-1.5 flex-1 max-w-lg ml-auto">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="বারুইপুরে খুঁজুন: ফ্ল্যাট, টেন্ডার, ডাক্তার, ট্রেন বা খবর..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-4 pr-11 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition shadow-2xs"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow-xs"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-500">জনপ্রিয়:</span>
              <a href="/property" className="text-emerald-700 hover:underline font-medium">ফ্ল্যাট ও জমি</a>
              <span>•</span>
              <a href="/tenders" className="text-red-700 hover:underline font-medium">পৌর টেন্ডার</a>
              <span>•</span>
              <a href="/health-directory" className="text-rose-700 hover:underline font-medium">ডাক্তার</a>
              <span>•</span>
              <a href="/transport" className="text-blue-700 hover:underline font-medium">লোকাল ট্রেন</a>
            </div>
          </div>

          {/* Quick Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 shrink-0">
            <a
              href="/property"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-2 rounded-xl transition shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>প্রপার্টি লিস্টিং</span>
            </a>
            <a
              href="/submit-news"
              className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-bold px-3 py-2 rounded-xl transition shadow-2xs"
            >
              <Send className="w-3.5 h-3.5 text-red-600" />
              <span>সংবাদ দিন</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Primary Desktop Navigation Bar */}
      <nav className="border-t border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  item.isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : `text-slate-700 hover:bg-slate-100 ${item.color}`
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                    item.isActive 
                      ? 'bg-white/20 text-white border-white/30' 
                      : item.badgeColor
                  }`}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 4. Upgraded Modern Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-[340px] sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/logo.png" 
                  alt="বারুইপুর অনলাইন" 
                  className="h-8 w-auto object-contain"
                />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition"
                aria-label="মেনু বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="বারুইপুরে খুঁজুন: ফ্ল্যাট, ডাক্তার, ট্রেন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
                <button type="submit" className="absolute right-3 top-3 text-slate-400 hover:text-red-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Drawer Body: Categorized Menu Blocks */}
            <div className="p-4 space-y-5 flex-1">
              {/* Highlight Service Cards */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
                  🌟 শীর্ষ পোর্টাল সেবা
                </div>

                <a
                  href="/property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">জমি ও ফ্ল্যাট কেনাবেচা</h4>
                      <p className="text-[10px] text-slate-500">নতুন ফ্ল্যাট, বাস্তু জমি ও নিলাম</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    নতুন
                  </span>
                </a>

                <a
                  href="/tenders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">সরকারি ও পৌর টেন্ডার</h4>
                      <p className="text-[10px] text-slate-500">পৌরসভা ও SDO-র NIT নোটিস</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded-full">
                    NIT
                  </span>
                </a>

                <a
                  href="/notices"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">জরুরি সরকারি নোটিস</h4>
                      <p className="text-[10px] text-slate-500">দপ্তর ও পঞ্চায়েতের সার্কুলার</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                    নতুন
                  </span>
                </a>

                <a
                  href="/health-directory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">স্বাস্থ্য ও ডাক্তার চেম্বার</h4>
                      <p className="text-[10px] text-slate-500">নার্সিংহোম ও বিশেষজ্ঞ রোস্টার</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full">
                    OPD
                  </span>
                </a>

                <a
                  href="/emergency-contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">জরুরি হেল্পলাইন নম্বর</h4>
                      <p className="text-[10px] text-slate-500">পুলিশ, হাসপাতাল ও বিদ্যুৎ</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                    ২৪/৭
                  </span>
                </a>
              </div>

              {/* Main Directory & Navigation Links */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1 mb-1">
                  প্রধান বিভাগসমূহ
                </div>

                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>🏠 প্রচ্ছদ (Home)</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/#latest-news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>📰 তাজা সংবাদ প্রবাহ</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/transport"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🚆 পরিবহন ও লোকাল ট্রেন</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/places"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🏛️ স্থান ও ল্যান্ডমার্ক ডিরেক্টরি</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/organizations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🏢 প্রতিষ্ঠান, ক্লাব ও সমিতি</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/category/food"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🍽️ খাবার ও রেস্তোরাঁ নির্দেশিকা</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/citizen-services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>📋 পুর পরিষেবা ও ফর্ম</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🎡 উৎসব ও রাসমেলা ক্যালেন্ডার</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="/property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>বিনামূল্যে প্রপার্টি বিজ্ঞাপন দিন</span>
                </a>

                <a
                  href="/submit-news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  <Send className="w-4 h-4 text-red-600" />
                  <span>নাগরিক সংবাদ জমা দিন</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
              <p>© ২০২৬ বারুইপুর অনলাইন • সর্বস্বত্ব সংরক্ষিত</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
