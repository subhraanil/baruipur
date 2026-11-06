'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  ShieldAlert, 
  Landmark, 
  Building2, 
  TrainTrack, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ShoppingBag, 
  Utensils, 
  MapPin,
  CalendarDays,
  Home,
  FileText,
  Send,
  ArrowRight,
  Filter
} from 'lucide-react';

interface QuickItem {
  id: string;
  label: string;
  desc: string;
  category: 'civic' | 'property' | 'health' | 'transit' | 'lifestyle';
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  badgeColor: string;
  accentBg: string;
  iconColor: string;
  borderHover: string;
}

export default function QuickAccessDirectory() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const items: QuickItem[] = [
    {
      id: 'property',
      label: 'জমি ও ফ্ল্যাট কেনাবেচা',
      desc: 'নতুন ফ্ল্যাট, বাস্তু জমি ও ব্যাংক নিলাম',
      category: 'property',
      icon: Home,
      href: '/property',
      badge: 'নতুন লিস্টিং',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accentBg: 'bg-emerald-50/80 group-hover:bg-emerald-100/90',
      iconColor: 'text-emerald-700',
      borderHover: 'hover:border-emerald-300 hover:shadow-emerald-100/50'
    },
    {
      id: 'tenders',
      label: 'সরকারি ও পৌর টেন্ডার',
      desc: 'পৌরসভা, SDO ও পূর্ত দপ্তরের NIT নোটিস',
      category: 'civic',
      icon: FileText,
      href: '/tenders',
      badge: 'সক্রিয় NIT',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      accentBg: 'bg-red-50/80 group-hover:bg-red-100/90',
      iconColor: 'text-red-700',
      borderHover: 'hover:border-red-300 hover:shadow-red-100/50'
    },
    {
      id: 'health',
      label: 'ডাক্তার ও ওপিডি চেম্বার',
      desc: 'নার্সিংহোম, পলিক্লিনিক ও বিশেষজ্ঞ তালিকা',
      category: 'health',
      icon: Stethoscope,
      href: '/health-directory',
      badge: 'OPD রোস্টার',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      accentBg: 'bg-rose-50/80 group-hover:bg-rose-100/90',
      iconColor: 'text-rose-700',
      borderHover: 'hover:border-rose-300 hover:shadow-rose-100/50'
    },
    {
      id: 'emergency',
      label: 'জরুরি হেল্পলাইন ডিরেক্টরি',
      desc: 'পুলিশ, হাসপাতাল, বিদ্যুৎ ও দমকল',
      category: 'health',
      icon: ShieldAlert,
      href: '/emergency-contacts',
      badge: '২৪/৭ সক্রিয়',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      accentBg: 'bg-amber-50/80 group-hover:bg-amber-100/90',
      iconColor: 'text-amber-700',
      borderHover: 'hover:border-amber-300 hover:shadow-amber-100/50'
    },
    {
      id: 'transport',
      label: 'লোকাল ট্রেন ও যাতায়াত',
      desc: 'শিয়ালদহ দক্ষিণ রেলওয়ে ও অটো রুট',
      category: 'transit',
      icon: TrainTrack,
      href: '/transport',
      badge: 'BRP জংশন',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      accentBg: 'bg-blue-50/80 group-hover:bg-blue-100/90',
      iconColor: 'text-blue-700',
      borderHover: 'hover:border-blue-300 hover:shadow-blue-100/50'
    },
    {
      id: 'municipality',
      label: 'বারুইপুর পৌরসভা',
      desc: 'নাগরিক পরিষেবা, ওয়ার্ড ও প্রশাসনিক তথ্য',
      category: 'civic',
      icon: Landmark,
      href: '/places/baruipur-municipality/',
      badge: '১৭টি ওয়ার্ড',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      accentBg: 'bg-teal-50/80 group-hover:bg-teal-100/90',
      iconColor: 'text-teal-700',
      borderHover: 'hover:border-teal-300 hover:shadow-teal-100/50'
    },
    {
      id: 'places',
      label: 'স্থান ও ঐতিহ্যবাহী ল্যান্ডমার্ক',
      desc: 'রাজবাড়ি, রাসমাঠ ও পর্যটন নির্দেশিকা',
      category: 'civic',
      icon: MapPin,
      href: '/places',
      badge: 'দর্শনীয় স্থান',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      accentBg: 'bg-indigo-50/80 group-hover:bg-indigo-100/90',
      iconColor: 'text-indigo-700',
      borderHover: 'hover:border-indigo-300 hover:shadow-indigo-100/50'
    },
    {
      id: 'food',
      label: 'সেরা খাবার ও রেস্তোরাঁ',
      desc: 'বিরিয়ানি, ক্যাফে, মিষ্টি ও ফ্যামিলি ডাইনিং',
      category: 'lifestyle',
      icon: Utensils,
      href: '/best-restaurants-cafes-and-food-guide-in-baruipur/',
      badge: 'ফুড গাইড',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      accentBg: 'bg-orange-50/80 group-hover:bg-orange-100/90',
      iconColor: 'text-orange-700',
      borderHover: 'hover:border-orange-300 hover:shadow-orange-100/50'
    },
    {
      id: 'orgs',
      label: 'প্রতিষ্ঠান, ক্লাব ও সমিতি',
      desc: 'ক্রীড়া ক্লাব, স্বেচ্ছাসেবী সংগঠন ও এনজিও',
      category: 'civic',
      icon: Building2,
      href: '/organizations',
      badge: 'সংগঠন',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      accentBg: 'bg-purple-50/80 group-hover:bg-purple-100/90',
      iconColor: 'text-purple-700',
      borderHover: 'hover:border-purple-300 hover:shadow-purple-100/50'
    },
    {
      id: 'services',
      label: 'পৌর ও নাগরিক পরিষেবা',
      desc: 'ট্যাক্স, সার্টিফিকেট ও অভিযোগ নম্বর',
      category: 'civic',
      icon: CheckCircle2,
      href: '/citizen-services',
      badge: 'হেল্পডেস্ক',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      accentBg: 'bg-cyan-50/80 group-hover:bg-cyan-100/90',
      iconColor: 'text-cyan-700',
      borderHover: 'hover:border-cyan-300 hover:shadow-cyan-100/50'
    },
    {
      id: 'events',
      label: 'উৎসব ও রাসমেলা নির্ঘণ্ট',
      desc: 'ঐতিহাসিক রাস উৎসব ও বাৎসরিক ক্যালেন্ডার',
      category: 'lifestyle',
      icon: CalendarDays,
      href: '/events',
      badge: 'মেলা ২০২৬',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      accentBg: 'bg-amber-50/80 group-hover:bg-amber-100/90',
      iconColor: 'text-amber-700',
      borderHover: 'hover:border-amber-300 hover:shadow-amber-100/50'
    },
    {
      id: 'education',
      label: 'স্কুল ও শিক্ষা প্রতিষ্ঠান',
      desc: 'CBSE, ICSE ও সরকারি স্কুল নির্দেশিকা',
      category: 'civic',
      icon: GraduationCap,
      href: '/top-schools-in-baruipur-education-admission-guide/',
      badge: 'শিক্ষা গাইড',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
      accentBg: 'bg-violet-50/80 group-hover:bg-violet-100/90',
      iconColor: 'text-violet-700',
      borderHover: 'hover:border-violet-300 hover:shadow-violet-100/50'
    }
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter(item => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className="mb-10" aria-labelledby="quick-access-heading">
      {/* Container with modern clean styling */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>এক নজরে বারুইপুর পোর্টাল হাব</span>
            </div>
            <h2 id="quick-access-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              জরুরি পরিষেবা ও নাগরিক কুইক অ্যাক্সেস ডিরেক্টরি
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              বারুইপুর মহকুমা ও পৌরসভার সমস্ত প্রয়োজনীয় পরিষেবা, সম্পত্তি, টেন্ডার ও হেল্পলাইন এক ক্লিকে
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60 hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>১২টি ভেরিফায়েড সার্ভিস</span>
            </span>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            সকল পরিষেবা ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('property')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'property'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            🏡 জমি ও প্রপার্টি
          </button>
          <button
            onClick={() => setActiveTab('civic')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'civic'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-800'
            }`}
          >
            🏛️ প্রশাসন ও টেন্ডার
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'health'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-800'
            }`}
          >
            🏥 স্বাস্থ্য ও জরুরি
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'transit'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-800'
            }`}
          >
            🚆 যাতায়াত ও ট্রেন
          </button>
          <button
            onClick={() => setActiveTab('lifestyle')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'lifestyle'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🍽️ খাবার ও উৎসব
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 group ${item.borderHover}`}
              >
                {/* Micro Badge */}
                {item.badge && (
                  <div className="flex justify-end mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor} tracking-tight`}>
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Icon Tile */}
                <div className="flex items-center gap-2.5 my-2">
                  <div className={`w-11 h-11 rounded-2xl ${item.accentBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-red-700 transition-colors text-xs sm:text-sm leading-snug">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-red-600 transition-colors">
                  <span>প্রবেশ করুন</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
