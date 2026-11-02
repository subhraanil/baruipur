'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Stethoscope, Landmark, PhoneCall } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'হোম',
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
      label: 'স্বাস্থ্য',
      href: '/health-directory',
      icon: Stethoscope,
      isActive: pathname.startsWith('/health-directory')
    },
    {
      label: 'স্থান',
      href: '/places',
      icon: Landmark,
      isActive: pathname.startsWith('/places')
    },
    {
      label: 'জরুরি',
      href: '/emergency-contacts',
      icon: PhoneCall,
      isActive: pathname.startsWith('/emergency-contacts')
    }
  ];

  return (
    <nav 
      aria-label="মোবাইল দ্রুত নেভিগেশন"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-lg transition-colors ${
                item.isActive 
                  ? 'text-[#C62828] font-bold' 
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${item.isActive ? 'text-[#C62828]' : 'text-slate-500'}`} />
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
