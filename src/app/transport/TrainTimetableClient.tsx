'use client';

import React, { useState, useMemo } from 'react';
import { 
  Train, 
  Clock, 
  Calendar, 
  Search, 
  ArrowUpDown, 
  ExternalLink, 
  ChevronRight, 
  Info,
  CheckCircle,
  Filter
} from 'lucide-react';

export interface TrainItem {
  trainNo: string;
  trainName: string;
  trainNameBn: string;
  origin: string;
  originCode: string;
  originBn: string;
  destination: string;
  destCode: string;
  destBn: string;
  departure: string;
  arrival: string;
  durationTextBn: string;
  durationMin: number;
  days: string;
  daysTextBn: string;
  daysTextEn: string;
}

export interface RouteData {
  id: string;
  from: string;
  fromBn: string;
  fromEn: string;
  to: string;
  toBn: string;
  toEn: string;
  titleBn: string;
  titleEn: string;
  erailUrl: string;
  totalTrains: number;
  firstTrain: string;
  lastTrain: string;
  trains: TrainItem[];
}

interface Props {
  routes: Record<string, RouteData>;
  updatedAt: string;
}

export default function TrainTimetableClient({ routes, updatedAt }: Props) {
  const [activeRouteId, setActiveRouteId] = useState<string>('brp_sdah');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');
  const [dayFilter, setDayFilter] = useState<'all' | 'daily' | 'weekdays'>('all');

  const activeRoute = routes[activeRouteId] || routes['brp_sdah'];

  // Switch to the opposite direction
  const handleSwapRoute = () => {
    const swapMap: Record<string, string> = {
      'brp_sdah': 'sdah_brp',
      'sdah_brp': 'brp_sdah',
      'brp_dh': 'dh_brp',
      'dh_brp': 'brp_dh'
    };
    if (swapMap[activeRouteId]) {
      setActiveRouteId(swapMap[activeRouteId]);
    }
  };

  // Filter trains
  const filteredTrains = useMemo(() => {
    if (!activeRoute || !activeRoute.trains) return [];

    return activeRoute.trains.filter(train => {
      // Search filter (train no, name, origin, destination)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesNo = train.trainNo.toLowerCase().includes(query);
        const matchesName = train.trainName.toLowerCase().includes(query) || train.trainNameBn.toLowerCase().includes(query);
        const matchesOrigin = train.origin.toLowerCase().includes(query) || train.originBn.toLowerCase().includes(query);
        const matchesDest = train.destination.toLowerCase().includes(query) || train.destBn.toLowerCase().includes(query);
        if (!matchesNo && !matchesName && !matchesOrigin && !matchesDest) {
          return false;
        }
      }

      // Time slot filter based on departure time
      if (timeFilter !== 'all') {
        const depHour = parseInt(train.departure.split(':')[0], 10);
        if (timeFilter === 'morning' && (depHour < 4 || depHour >= 11)) return false;
        if (timeFilter === 'afternoon' && (depHour < 11 || depHour >= 16)) return false;
        if (timeFilter === 'evening' && (depHour < 16 || depHour >= 21)) return false;
        if (timeFilter === 'night' && depHour >= 4 && depHour < 21) return false;
      }

      // Day filter
      if (dayFilter === 'daily' && train.days !== '1111111') return false;
      if (dayFilter === 'weekdays' && train.days === '1111111') return false;

      return true;
    });
  }, [activeRoute, searchQuery, timeFilter, dayFilter]);

  const routeTabs = [
    { id: 'brp_sdah', labelBn: 'বারুইপুর ➔ শিয়ালদহ', labelEn: 'BRP to SDAH', badge: `${routes['brp_sdah']?.totalTrains || 77}` },
    { id: 'sdah_brp', labelBn: 'শিয়ালদহ ➔ বারুইপুর', labelEn: 'SDAH to BRP', badge: `${routes['sdah_brp']?.totalTrains || 75}` },
    { id: 'brp_dh', labelBn: 'বারুইপুর ➔ ডায়মন্ড হারবার', labelEn: 'BRP to DH', badge: `${routes['brp_dh']?.totalTrains || 32}` },
    { id: 'dh_brp', labelBn: 'ডায়মন্ড হারবার ➔ বারুইপুর', labelEn: 'DH to BRP', badge: `${routes['dh_brp']?.totalTrains || 32}` },
  ];

  return (
    <div className="space-y-6">
      {/* Route Switcher Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1.5 border border-slate-200">
        {routeTabs.map(tab => {
          const isActive = tab.id === activeRouteId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveRouteId(tab.id)}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                isActive
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
              }`}
            >
              <span>{tab.labelBn}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-red-800 text-red-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.badge} টি ট্রেন
              </span>
            </button>
          );
        })}
      </div>

      {/* Route Header Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
              <Train className="w-4 h-4" />
              <span>ভারতীয় রেলওয়ে শিয়ালদহ দক্ষিণ শাখা সময়সূচি</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {activeRoute.titleBn}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              মোট ট্রেনের সংখ্যা: <strong>{activeRoute.totalTrains} টি</strong> | উৎস ও গন্তব্য: <strong>{activeRoute.fromBn} ({activeRoute.from}) ➔ {activeRoute.toBn} ({activeRoute.to})</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSwapRoute}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition border border-slate-200"
              title="বিপরীত দিকের ট্রেনের সময় দেখতে ক্লিক করুন"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-red-600" />
              <span>উল্টো রুট দেখুন</span>
            </button>
            <a
              href={activeRoute.erailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition border border-blue-200"
            >
              <span>eRail লাইভ স্ট্যাটাস</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 text-center">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5">প্রথম ট্রেন</span>
            <span className="text-sm font-black text-emerald-700">{activeRoute.firstTrain.split(' ')[0]}</span>
            <span className="text-[10px] text-slate-400 block">{activeRoute.firstTrain.split(' ')[1] || ''}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5">শেষ ট্রেন</span>
            <span className="text-sm font-black text-rose-700">{activeRoute.lastTrain.split(' ')[0]}</span>
            <span className="text-[10px] text-slate-400 block">{activeRoute.lastTrain.split(' ')[1] || ''}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5">গড় সময়কাল</span>
            <span className="text-sm font-black text-slate-800">
              {activeRoute.id.includes('dh') ? '৪৮-৫০ মিনিট' : '৪৫-৫০ মিনিট'}
            </span>
            <span className="text-[10px] text-slate-400 block">দূরত্ব অনুযায়ী</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5">ফ্রিকোয়েন্সি</span>
            <span className="text-sm font-black text-blue-700">
              {activeRoute.id.includes('dh') ? '২০-২৫ মিনিট' : '১০-১৫ মিনিট'}
            </span>
            <span className="text-[10px] text-slate-400 block">পিক আওয়ার্স</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ট্রেন নম্বর (যেমন: 34812) বা নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Day Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setDayFilter('all')}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${
                dayFilter === 'all' ? 'bg-white shadow-sm text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সব দিন
            </button>
            <button
              onClick={() => setDayFilter('daily')}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${
                dayFilter === 'daily' ? 'bg-white shadow-sm text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              প্রতিদিন
            </button>
            <button
              onClick={() => setDayFilter('weekdays')}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${
                dayFilter === 'weekdays' ? 'bg-white shadow-sm text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              রবি বাদে
            </button>
          </div>
        </div>

        {/* Time Slot Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] shrink-0 mr-1">
            <Clock className="w-3.5 h-3.5" /> সময়:
          </span>
          {[
            { id: 'all', label: 'সব সময়' },
            { id: 'morning', label: 'সকাল (০৪:০০ - ১১:০০)' },
            { id: 'afternoon', label: 'দুপুর (১১:০০ - ১৬:০০)' },
            { id: 'evening', label: 'সন্ধ্যা (১৬:০০ - ২১:০০)' },
            { id: 'night', label: 'রাত (২১:০০ - ০৪:০০)' },
          ].map((slot) => {
            const isSelected = timeFilter === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => setTimeFilter(slot.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trains List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            প্রদর্শিত ট্রেন: <strong className="text-slate-900">{filteredTrains.length}</strong> / {activeRoute.totalTrains} টি
          </div>
          <div className="text-[11px] text-slate-400">
            সময়ের ক্রমানুসারে সাজানো
          </div>
        </div>

        {filteredTrains.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Train className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-sm text-slate-700">কোনো ট্রেন পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা সার্চ শব্দ মুছে দিন।</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setTimeFilter('all');
                setDayFilter('all');
              }}
              className="mt-3 text-xs font-bold text-red-600 hover:underline"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">ট্রেন নম্বর</th>
                    <th className="py-3 px-4">ট্রেনের নাম ও রুট</th>
                    <th className="py-3 px-4 text-center">ছাড়ার সময় ({activeRoute.from})</th>
                    <th className="py-3 px-4 text-center">পৌঁছানোর সময় ({activeRoute.to})</th>
                    <th className="py-3 px-4 text-center">সময়কাল</th>
                    <th className="py-3 px-4 text-center">চলাচলের দিন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTrains.map((train, idx) => (
                    <tr key={`${train.trainNo}-${idx}`} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <span className="bg-slate-100 px-2 py-1 rounded text-red-700 border border-slate-200">
                          {train.trainNo}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800 text-xs">
                          {train.trainNameBn}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {train.trainName} ({train.origin} ➔ {train.destination})
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono text-sm font-black text-slate-900 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          {train.departure}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono text-sm font-semibold text-slate-700">
                          {train.arrival}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-medium">
                        {train.durationTextBn}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            train.days === '1111111'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {train.daysTextBn}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredTrains.map((train, idx) => (
                <div key={`${train.trainNo}-${idx}`} className="p-4 space-y-2 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-50 text-red-700 font-mono font-bold text-xs px-2 py-0.5 rounded border border-red-200">
                        {train.trainNo}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          train.days === '1111111'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {train.daysTextBn}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      সময়: {train.durationTextBn}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-900">
                    {train.trainNameBn}
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">ছাড়বে ({activeRoute.from})</span>
                      <span className="font-mono text-base font-black text-emerald-700">
                        {train.departure}
                      </span>
                    </div>
                    <div className="text-slate-300 font-bold">➔</div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">পৌঁছাবে ({activeRoute.to})</span>
                      <span className="font-mono text-base font-semibold text-slate-800">
                        {train.arrival}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Helpful Passenger Information Notice */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 text-xs text-blue-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
          <Info className="w-4 h-4 text-blue-600" />
          <span>নিত্যযাত্রী সহায়িকা ও নিয়মাবলী:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
          <li><strong>টিকিট বুকিং:</strong> সাধারণ মাসিক ও লোকাল টিকিট UTS মোবাইল অ্যাপের মাধ্যমে ইউটিএস কিউআর কোড স্ক্যান করে কাটা যায়। স্টেশন কাউন্টারেও সাধারণ টিকিট পাওয়া যায়।</li>
          <li><strong>প্ল্যাটফর্ম নির্দেশিকা:</strong> বারুইপুর জংশনে ১ ও ২ নম্বর প্ল্যাটফর্ম থেকে মূলত শিয়ালদহমুখী ট্রেন এবং ৩ ও ৪ নম্বর প্ল্যাটফর্ম থেকে ডায়মন্ড হারবার, ক্যানিং ও নামখানামুখী ট্রেন চলাচল করে।</li>
          <li><strong>সময় পরিবর্তন:</strong> বিশেষ উৎসব (যেমন গঙ্গাসাগর মেলা বা দুর্গাপূজা) এবং রেলওয়ে মেগা ব্লকের কারণে ট্রেনের সময়সূচিতে সাময়িক পরিবর্তন হতে পারে।</li>
          <li><strong>রেলওয়ে জরুরি হেল্পলাইন:</strong> যেকোনো সমস্যায় ২৪ ঘণ্টা চালু রেলওয়ে হেল্পলাইন নম্বর <strong>139</strong>।</li>
        </ul>
      </div>
    </div>
  );
}
