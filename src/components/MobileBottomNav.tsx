'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Stethoscope, FileText, Landmark, PhoneCall } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'প্রচ্ছদ',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      label: 'সংবাদ',
      href: '/#latest-news',
      icon: Newspaper,
      isActive: false
    },
    {
      label: 'প্রপার্টি',
      href: '/property',
      icon: Landmark,
      isActive: pathname.startsWith('/property') || pathname.startsWith('/real-estate'),
      badge: 'নতুন'
    },
    {
      label: 'টেন্ডার',
      href: '/tenders',
      icon: FileText,
      isActive: pathname.startsWith('/tenders'),
      badge: 'NIT'
    },
    {
      label: 'স্বাস্থ্য',
      href: '/health-directory',
      icon: Stethoscope,
      isActive: pathname.startsWith('/health-directory')
    }
  ];

  return (
    <nav 
      aria-label="মোবাইল দ্রুত নেভিগেশন"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1.5 pb-[calc(0.45rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[46px] py-1 px-1.5 rounded-xl transition-all duration-200 ${
                item.isActive 
                  ? 'text-red-600 font-extrabold bg-red-50/70' 
                  : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-50'
              }`}
            >
              {item.badge && (
                <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs">
                  {item.badge}
                </span>
              )}
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${item.isActive ? 'text-red-600 scale-110' : 'text-slate-500'}`} />
              <span className="text-[10px] leading-tight">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
