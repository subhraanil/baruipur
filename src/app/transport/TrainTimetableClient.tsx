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
  Filter,
  Compass
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
  corridor: string;
  corridorBn: string;
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

interface CorridorConfig {
  id: string;
  titleBn: string;
  titleEn: string;
  routes: {
    up: string;
    down: string;
  };
}

const CORRIDORS: CorridorConfig[] = [
  {
    id: 'sdah',
    titleBn: 'শিয়ালদহ লাইন',
    titleEn: 'Sealdah Line',
    routes: { up: 'brp_sdah', down: 'sdah_brp' }
  },
  {
    id: 'dh',
    titleBn: 'ডায়মন্ড হারবার লাইন',
    titleEn: 'Diamond Harbour Line',
    routes: { up: 'brp_dh', down: 'dh_brp' }
  },
  {
    id: 'lkpr',
    titleBn: 'লক্ষ্মীকান্তপুর লাইন',
    titleEn: 'Lakshmikantapur Line',
    routes: { up: 'brp_lkpr', down: 'lkpr_brp' }
  },
  {
    id: 'nmka',
    titleBn: 'নামখানা লাইন (সরাসরি)',
    titleEn: 'Namkhana Line (Direct)',
    routes: { up: 'brp_nmka', down: 'nmka_brp' }
  }
];

export default function TrainTimetableClient({ routes, updatedAt }: Props) {
  const [activeCorridorId, setActiveCorridorId] = useState<string>('sdah');
  const [activeRouteId, setActiveRouteId] = useState<string>('brp_sdah');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');
  const [dayFilter, setDayFilter] = useState<'all' | 'daily' | 'weekdays'>('all');

  const activeRoute = routes[activeRouteId] || routes['brp_sdah'];

  // Handle corridor selection
  const handleSelectCorridor = (corridorId: string) => {
    setActiveCorridorId(corridorId);
    const corr = CORRIDORS.find(c => c.id === corridorId);
    if (corr) {
      setActiveRouteId(corr.routes.up);
    }
  };

  // Switch to the opposite direction
  const handleSwapRoute = () => {
    const swapMap: Record<string, string> = {
      'brp_sdah': 'sdah_brp',
      'sdah_brp': 'brp_sdah',
      'brp_dh': 'dh_brp',
      'dh_brp': 'brp_dh',
      'brp_lkpr': 'lkpr_brp',
      'lkpr_brp': 'brp_lkpr',
      'brp_nmka': 'nmka_brp',
      'nmka_brp': 'brp_nmka'
    };
    if (swapMap[activeRouteId]) {
      setActiveRouteId(swapMap[activeRouteId]);
    }
  };

  // Current corridor definition
  const currentCorridor = useMemo(() => {
    return CORRIDORS.find(c => c.id === activeCorridorId) || CORRIDORS[0];
  }, [activeCorridorId]);

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

  return (
    <div className="space-y-6">
      {/* 1. Main Line / Corridor Selection Tabs */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-red-600" />
          রেলওয়ে লাইন বেছে নিন (Select Railway Line):
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {CORRIDORS.map(corridor => {
            const isCorridorActive = activeCorridorId === corridor.id;
            const upCount = routes[corridor.routes.up]?.totalTrains || 0;
            const downCount = routes[corridor.routes.down]?.totalTrains || 0;
            const totalCorridorTrains = upCount + downCount;

            return (
              <button
                key={corridor.id}
                onClick={() => handleSelectCorridor(corridor.id)}
                className={`py-3 px-4 rounded-2xl text-left border transition relative ${
                  isCorridorActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${
                    isCorridorActive ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {corridor.titleEn}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isCorridorActive ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {totalCorridorTrains} ট্রেন
                  </span>
                </div>
                <div className="font-black text-sm sm:text-base">
                  {corridor.titleBn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Direction Selection (Up / Down) */}
      <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* UP Button */}
          <button
            onClick={() => setActiveRouteId(currentCorridor.routes.up)}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              activeRouteId === currentCorridor.routes.up
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{routes[currentCorridor.routes.up]?.fromBn} ➔ {routes[currentCorridor.routes.up]?.toBn}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
              activeRouteId === currentCorridor.routes.up ? 'bg-red-800 text-red-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {routes[currentCorridor.routes.up]?.totalTrains} টি
            </span>
          </button>

          {/* DOWN Button */}
          <button
            onClick={() => setActiveRouteId(currentCorridor.routes.down)}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              activeRouteId === currentCorridor.routes.down
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{routes[currentCorridor.routes.down]?.fromBn} ➔ {routes[currentCorridor.routes.down]?.toBn}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
              activeRouteId === currentCorridor.routes.down ? 'bg-red-800 text-red-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {routes[currentCorridor.routes.down]?.totalTrains} টি
            </span>
          </button>
        </div>

        <button
          onClick={handleSwapRoute}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl transition border border-slate-200 shadow-sm"
          title="বিপরীত দিকের ট্রেনের সময় দেখতে ক্লিক করুন"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-red-600" />
          <span>দিক পরিবর্তন (Swap)</span>
        </button>
      </div>

      {/* 3. Route Summary Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
              <Train className="w-4 h-4" />
              <span>পূর্ব রেলওয়ে শিয়ালদহ দক্ষিণ বিভাগ • {activeRoute.corridorBn}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {activeRoute.titleBn}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              মোট ট্রেনের সংখ্যা: <strong>{activeRoute.totalTrains} টি</strong> | রুট: <strong>{activeRoute.fromBn} ({activeRoute.from}) ➔ {activeRoute.toBn} ({activeRoute.to})</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={activeRoute.erailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition border border-blue-200"
            >
              <span>eRail অফিসিয়াল পৃষ্ঠা</span>
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
              {activeRoute.id.includes('nmka') ? '১ ঘণ্টা ৫০ মিনিট' : activeRoute.id.includes('lkpr') ? '৫৫-৬০ মিনিট' : activeRoute.id.includes('dh') ? '৪৮-৫০ মিনিট' : '৪৫-৫০ মিনিট'}
            </span>
            <span className="text-[10px] text-slate-400 block">দূরত্ব অনুযায়ী</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5">ফ্রিকোয়েন্সি</span>
            <span className="text-sm font-black text-blue-700">
              {activeRoute.id.includes('nmka') ? 'নির্দিষ্ট সময়' : activeRoute.id.includes('lkpr') ? 'প্রতি ২০-৩০ মিনিট' : activeRoute.id.includes('dh') ? 'প্রতি ২০-২৫ মিনিট' : 'প্রতি ১০-১৫ মিনিট'}
            </span>
            <span className="text-[10px] text-slate-400 block">সার্ভিস ধরন</span>
          </div>
        </div>
      </div>

      {/* 4. Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ট্রেন নম্বর (যেমন: 34712, 34792, 34812) বা নাম দিয়ে খুঁজুন..."
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

      {/* 5. Trains Table / Mobile Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            প্রদর্শিত ট্রেন: <strong className="text-slate-900">{filteredTrains.length}</strong> / {activeRoute.totalTrains} টি
          </div>
          <div className="text-[11px] text-slate-400">
            ছাড়ার সময়ের ক্রমানুসারে সাজানো
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

      {/* 6. Passenger Guidance Notice */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 text-xs text-blue-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
          <Info className="w-4 h-4 text-blue-600" />
          <span>নিত্যযাত্রী ও বকখালি/গঙ্গাসাগর তীর্থযাত্রী সহায়িকা:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
          <li><strong>নামখানা ও বকখালি সংযোগ:</strong> বারুইপুর থেকে সরাসরি নামখানা লোকাল (৩৪৭৯২, ৩৪৭৯৪ ইত্যাদি) রয়েছে। এছাড়াও ৩১টি লক্ষ্মীকান্তপুর ট্রেনের যেকোনোটিতে চড়ে লক্ষ্মীকান্তপুর জংশনে পৌঁছে সেখান থেকে নামখানাগামী কানেক্টিং ট্রেনে যাতায়াত করা যায়।</li>
          <li><strong>টিকিট বুকিং:</strong> সাধারণ ও মাসিক টিকিট UTS মোবাইল অ্যাপের মাধ্যমে কিউআর কোড স্ক্যান করে দ্রুত বুক করা যায়।</li>
          <li><strong>প্ল্যাটফর্ম তথ্য:</strong> বারুইপুর জংশনে ১ ও ২ নম্বর প্ল্যাটফর্ম থেকে মূলত শিয়ালদহমুখী ট্রেন এবং ৩ ও ৪ নম্বর প্ল্যাটফর্ম থেকে ডায়মন্ড হারবার, লক্ষ্মীকান্তপুর, ক্যানিং ও নামখানামুখী ট্রেন চলাচল করে।</li>
          <li><strong>জরুরি হেল্পলাইন:</strong> ২৪ ঘণ্টা রেলওয়ে সহায়তা ও নিরাপত্তা হেল্পলাইন নম্বর <strong>139</strong>।</li>
        </ul>
      </div>
    </div>
  );
}
