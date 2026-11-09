'use client';

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Building2, 
  Calendar, 
  Coins, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Filter,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { Tender, TenderAuthority } from '@/lib/tenders';

interface TendersClientProps {
  initialTenders: Tender[];
  authorities: TenderAuthority[];
}

export default function TendersClient({ initialTenders, authorities }: TendersClientProps) {
  const [selectedAuthority, setSelectedAuthority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTenders = useMemo(() => {
    return initialTenders.filter(tender => {
      const matchesAuthority = selectedAuthority === 'all' || tender.authorityId === selectedAuthority;
      const matchesStatus = statusFilter === 'all' || tender.status === statusFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        tender.title.toLowerCase().includes(query) ||
        tender.nitNumber.toLowerCase().includes(query) ||
        tender.department.toLowerCase().includes(query) ||
        tender.category.toLowerCase().includes(query) ||
        tender.location.toLowerCase().includes(query);

      return matchesAuthority && matchesStatus && matchesSearch;
    });
  }, [initialTenders, selectedAuthority, statusFilter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="টেন্ডারের বিষয়, এনআইটি নম্বর বা কাজের ধরন লিখে খুঁজুন (উদাঃ রাস্তা, সিসিটিভি, ড্রেন)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="active">🟢 সক্রিয় (Active)</option>
              <option value="evaluation">🟡 মূল্যায়ন চলছে</option>
              <option value="closed">⚪ সম্পন্ন</option>
            </select>
          </div>
        </div>

        {/* Authority Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <button
            onClick={() => setSelectedAuthority('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedAuthority === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🏛️ সকল দপ্তর ({initialTenders.length})
          </button>
          {authorities.map(auth => {
            const count = initialTenders.filter(t => t.authorityId === auth.id).length;
            return (
              <button
                key={auth.id}
                onClick={() => setSelectedAuthority(auth.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedAuthority === auth.id
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {auth.shortName || auth.name.split(' (')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tenders Count Header */}
      <div className="flex items-center justify-between text-sm text-slate-600 px-1">
        <span>মোট <strong>{filteredTenders.length}</strong> টি টেন্ডার বিজ্ঞপ্তি পাওয়া গেছে</span>
        <span className="text-xs text-slate-500">অফিসিয়াল ই-টেন্ডার পোর্টাল: wbtenders.gov.in</span>
      </div>

      {/* Tenders List */}
      {filteredTenders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">কোনো টেন্ডার বিজ্ঞপ্তি মেলেনি</h3>
          <p className="text-slate-500 text-sm mt-1">দয়া করে অন্য কি-ওয়ার্ড বা ফিল্টার নির্বাচন করুন।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTenders.map((tender) => (
            <div 
              key={tender.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all p-5 sm:p-6 space-y-4"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    {tender.nitNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {tender.authorityName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    সক্রিয় টেন্ডার (Live)
                  </span>
                </div>
              </div>

              {/* Title & Department */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {tender.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  {tender.titleEn}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block">আনুমানিক মূল্য (Estimated):</span>
                  <span className="text-base font-bold text-slate-900">{tender.estimatedValue}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">বায়না মূল্য (EMD):</span>
                  <span className="text-base font-bold text-slate-700">{tender.emdAmount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">প্রকাশের তারিখ:</span>
                  <span className="font-semibold text-slate-700">{tender.publishDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-red-600 font-medium">জমার শেষ তারিখ:</span>
                  <span className="font-bold text-red-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {tender.closingDate}
                  </span>
                </div>
              </div>

              {/* Location & Eligibility */}
              <div className="text-xs text-slate-600 space-y-1">
                <div>
                  <strong className="text-slate-800">কাজের এলাকা:</strong> {tender.location}
                </div>
                <div>
                  <strong className="text-slate-800">যোগ্যতার মাপকাঠি:</strong> {tender.eligibility}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-mono">
                  রেফারেন্স: {tender.tenderRef}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={tender.portalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    <span>e-Tender পোর্টালে দেখুন ও আবেদন করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guidelines Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>সরকারি ই-টেন্ডারে অংশগ্রহণের সাধারণ নির্দেশিকা ও নিয়মাবলী</span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          পশ্চিমবঙ্গ সরকারের সমস্ত পৌরসভা ও প্রশাসনিক টেন্ডার কেন্দ্রীয় ই-প্রোকিউরমেন্ট পোর্টাল (<strong>wbtenders.gov.in</strong>)-এর মাধ্যমে অনলাইনে জমা দিতে হয়। টেন্ডারে অংশগ্রহণের জন্য ঠিকাদারদের বৈধ <strong>Digital Signature Certificate (DSC Class 3)</strong>, আপডেট জিএসটি রেজিস্ট্রেশন শংসাপত্র, ট্রেড লাইসেন্স ও আইটি রিটার্ন ফাইলিং থাকা আবশ্যক।
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://wbtenders.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
          >
            <span>wbtenders.gov.in ওপেন করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="/citizen-services"
            className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium px-4 py-2 rounded-xl text-xs transition"
          >
            <span>বারুইপুর পৌরসভা হেল্পডেস্ক</span>
          </a>
        </div>
      </div>
    </div>
  );
}
