'use client';

import React, { useState } from 'react';
import { Home, Search, HeartPulse, PhoneCall, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <>
      {moreOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/50"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute bottom-[68px] inset-x-0 bg-white rounded-t-2xl border-t border-slate-200 p-4 space-y-2 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-[18px] text-slate-900">আরও বিভাগ</span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="/places" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                স্থান ও ঐতিহ্য
              </a>
              <a href="/organizations" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                সংগঠন ও ক্লাব
              </a>
              <a href="/notices" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                সরকারি নোটিস
              </a>
              <a href="/tenders" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                ই-টেন্ডার
              </a>
              <a href="/transport" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                লোকাল ট্রেন
              </a>
              <a href="/category/all" className="min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium text-[16px]">
                সিটিজেন গাইড
              </a>
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="মোবাইল বটম নেভিগেশন"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-5 h-[68px] items-center">
          <a
            href="/"
            className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[14px] font-medium ${
              isActive('/') ? 'text-blue-800 font-bold' : 'text-slate-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>হোম</span>
          </a>

          <a
            href="/search"
            className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[14px] font-medium ${
              isActive('/search') ? 'text-blue-800 font-bold' : 'text-slate-700'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>খুঁজুন</span>
          </a>

          <a
            href="/health-directory"
            className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[14px] font-medium ${
              isActive('/health-directory') ? 'text-blue-800 font-bold' : 'text-slate-700'
            }`}
          >
            <HeartPulse className="w-5 h-5" />
            <span>স্বাস্থ্য</span>
          </a>

          <a
            href="/emergency-contacts"
            className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[14px] font-bold ${
              isActive('/emergency-contacts') ? 'text-red-800' : 'text-red-700'
            }`}
          >
            <PhoneCall className="w-5 h-5" />
            <span>জরুরি</span>
          </a>

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[14px] font-medium ${
              moreOpen ? 'text-blue-800 font-bold' : 'text-slate-700'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span>আরও</span>
          </button>
        </div>
      </nav>
    </>
  );
}
