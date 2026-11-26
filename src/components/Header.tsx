'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  PhoneCall,
  ChevronDown,
  Menu,
  X,
  Sun,
  CloudSun,
  Calendar,
} from 'lucide-react';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<'gov' | 'guide' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateStr, setDateStr] = useState('২৬ নভেম্বর ২০২৬');
  const [weatherStr, setWeatherStr] = useState('বারুইপুর ২৪°C • পরিষ্কার আবহাওয়া');

  useEffect(() => {
    try {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('bn-BD', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now);
      setDateStr(formatted);
    } catch {
      // Fallback kept
    }

    // Fetch live Baruipur weather silently (Open-Meteo, no API key needed)
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=22.3654&longitude=88.4325&current=temperature_2m,weather_code'
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.current?.temperature_2m !== undefined) {
          const temp = Math.round(data.current.temperature_2m);
          const bnDigits = String(temp).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
          setWeatherStr(`বারুইপুর ${bnDigits}°C`);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (q) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    } else {
      window.location.href = '/search';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Slim Top Utility Bar: Date, Weather & Emergency Quick Strip */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 min-h-[40px] py-1.5 flex items-center justify-between gap-3 text-[14px]">
          <div className="flex items-center gap-4 min-w-0">
            <span className="inline-flex items-center gap-1.5 truncate">
              <Calendar className="w-4 h-4 text-slate-300 shrink-0" />
              <span>{dateStr}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <CloudSun className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{weatherStr}</span>
            </span>
          </div>

          <a
            href="/emergency-contacts"
            className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-1 rounded-md text-[14px] whitespace-nowrap transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span>জরুরি: 112 / 102 / হাসপাতাল</span>
          </a>
        </div>
      </div>

      {/* Main Header Row: Logo | Search (wide) | সাহায্য */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-5">
        {/* Logo */}
        <a href="/" className="shrink-0 flex items-center" aria-label="বারুইপুর অনলাইন হোম">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="বারুইপুর অনলাইন"
            width={176}
            height={44}
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </a>

        {/* Wide Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ডাক্তার, হাসপাতাল, স্থান, সংগঠন, নোটিস বা টেন্ডার খুঁজুন..."
              aria-label="ডিরেক্টরি অনুসন্ধান"
              className="w-full min-h-[44px] pl-11 pr-24 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-700 focus:outline-none text-[16px] text-slate-900"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] px-4 rounded-lg bg-slate-900 hover:bg-blue-900 text-white font-medium text-[14px] transition-colors"
            >
              খুঁজুন
            </button>
          </div>
        </form>

        {/* Right Actions: Emergency Button (সাহায্য) + Mobile Search/Menu */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          <a
            href="/search"
            aria-label="অনুসন্ধান"
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
          >
            <Search className="w-5 h-5" />
          </a>

          <a
            href="/emergency-contacts"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-[16px] leading-[1.2] shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span>সাহায্য</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="মেনু"
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-slate-300 bg-white text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Nav (6 items): স্বাস্থ্য · স্থান · সরকারি · সংগঠন · গাইড · যাতায়াত */}
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="hidden md:block border-t border-slate-100 bg-white"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center gap-1">
          <a
            href="/health-directory"
            className="inline-flex items-center min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            স্বাস্থ্য
          </a>
          <a
            href="/places"
            className="inline-flex items-center min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            স্থান
          </a>

          {/* সরকারি Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'gov' ? null : 'gov')}
              onMouseEnter={() => setOpenDropdown('gov')}
              aria-expanded={openDropdown === 'gov'}
              className="inline-flex items-center gap-1 min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span>সরকারি</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === 'gov' && (
              <div className="absolute left-0 top-full w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <a
                  href="/notices"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  সরকারি নোটিস ও বিজ্ঞপ্তি
                </a>
                <a
                  href="/tenders"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  পাবলিক ই-টেন্ডার
                </a>
                <a
                  href="/citizen-services"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  নাগরিক পরিষেবা গাইড
                </a>
              </div>
            )}
          </div>

          <a
            href="/organizations"
            className="inline-flex items-center min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            সংগঠন
          </a>

          {/* গাইড Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'guide' ? null : 'guide')}
              onMouseEnter={() => setOpenDropdown('guide')}
              aria-expanded={openDropdown === 'guide'}
              className="inline-flex items-center gap-1 min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span>গাইড</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === 'guide' && (
              <div className="absolute left-0 top-full w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <a
                  href="/places/baruipur-rashmath"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  বারুইপুর রাসমেলা ও রাসমাঠ
                </a>
                <a
                  href="/places/baruipur-rajbari"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  বারুইপুর রাজবাড়ি ও ঐতিহ্য
                </a>
                <a
                  href="/citizen-services"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  পৌর ও নাগরিক পরিষেবা
                </a>
                <a
                  href="/category/all"
                  className="block px-4 py-2.5 text-[16px] text-slate-800 hover:bg-slate-50 hover:text-blue-800"
                >
                  সকল সিটিজেন গাইড
                </a>
              </div>
            )}
          </div>

          <a
            href="/transport"
            className="inline-flex items-center min-h-[44px] px-4 py-2 text-[16px] font-medium leading-[1.2] text-slate-900 hover:text-blue-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            যাতায়াত
          </a>

          <div className="ml-auto flex items-center text-[14px] text-slate-600 gap-1">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>{weatherStr}</span>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <a href="/health-directory" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            স্বাস্থ্য ও ডাক্তার ডিরেক্টরি
          </a>
          <a href="/places" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            দর্শনীয় স্থান ও ল্যান্ডমার্ক
          </a>
          <a href="/notices" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            সরকারি নোটিস
          </a>
          <a href="/tenders" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            পাবলিক ই-টেন্ডার
          </a>
          <a href="/organizations" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            সংগঠন ও ক্লাব
          </a>
          <a href="/category/all" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            সিটিজেন গাইড (রাসমেলা ও পরিষেবা)
          </a>
          <a href="/transport" className="block min-h-[44px] py-2.5 px-3 rounded-lg text-[16px] font-medium text-slate-900 hover:bg-slate-50">
            লোকাল ট্রেন ও যাতায়াত
          </a>
        </div>
      )}
    </header>
  );
}
