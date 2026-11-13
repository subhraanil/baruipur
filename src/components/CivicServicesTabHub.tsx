'use client';

import React, { useState } from 'react';
import HomePropertySection from '@/components/HomePropertySection';
import HomeTendersSection from '@/components/HomeTendersSection';
import HomeNoticesSection from '@/components/HomeNoticesSection';
import { Home, FileText, Bell, Sparkles } from 'lucide-react';

export default function CivicServicesTabHub() {
  const [activeTab, setActiveTab] = useState<'property' | 'tenders' | 'notices'>('property');

  const tabs = [
    {
      id: 'property' as const,
      label: 'জমি ও ফ্ল্যাট কেনাবেচা',
      sublabel: 'রিয়েল এস্টেট লিস্টিং',
      icon: Home,
      badge: '২০+ সক্রিয়',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeColor: 'bg-emerald-700 text-white shadow-md shadow-emerald-900/20',
      hoverColor: 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-800'
    },
    {
      id: 'tenders' as const,
      label: 'সরকারি ও পৌর টেন্ডার',
      sublabel: 'সক্রিয় NIT নোটিস',
      icon: FileText,
      badge: '৩৮টি দরপত্র',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      activeColor: 'bg-red-700 text-white shadow-md shadow-red-900/20',
      hoverColor: 'hover:bg-red-50 text-slate-700 hover:text-red-800'
    },
    {
      id: 'notices' as const,
      label: 'প্রশাসনিক নোটিস ও সার্কুলার',
      sublabel: 'অফিসিয়াল PDF সহ',
      icon: Bell,
      badge: '২৫টি নোটিস',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      activeColor: 'bg-amber-700 text-white shadow-md shadow-amber-900/20',
      hoverColor: 'hover:bg-amber-50 text-slate-700 hover:text-amber-800'
    }
  ];

  return (
    <section className="space-y-4" aria-label="বারুইপুর নাগরিক ও প্রশাসনিক সেবা হাব">
      {/* Tab Switcher Bar */}
      <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 ${
                  isActive ? tab.activeColor : `bg-slate-50/80 border border-slate-200/60 ${tab.hoverColor}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <div className="text-left">
                  <span className="block leading-tight">{tab.label}</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border hidden md:inline-block ${
                    isActive ? 'bg-white/20 text-white border-white/30' : tab.badgeColor
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium px-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>দৈনিক যাচাইকৃত সরকারি ও স্থানীয় তথ্যবাতায়ন</span>
        </div>
      </div>

      {/* Render Active Hub with Smooth Transition */}
      <div className="transition-all duration-300">
        {activeTab === 'property' && <HomePropertySection />}
        {activeTab === 'tenders' && <HomeTendersSection />}
        {activeTab === 'notices' && <HomeNoticesSection />}
      </div>
    </section>
  );
}
