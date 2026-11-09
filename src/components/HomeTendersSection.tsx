import React from 'react';
import Link from 'next/link';
import { getActiveTenders } from '@/lib/tenders';
import { FileText, ArrowRight, Building2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function HomeTendersSection() {
  const activeTenders = getActiveTenders().slice(0, 3);

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200/90 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>অফিশিয়াল ই-টেন্ডার নোটিস (e-Procurement NIT)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            বারুইপুর পৌরসভা ও সরকারি টেন্ডার ডিরেক্টরি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            বারুইপুর পৌরসভা, এসডিও, গ্রাম পঞ্চায়েত, আদালত, হাসপাতাল, বিদ্যুৎ পর্ষদ (WBSEDCL), পূর্ত (PWD), আরটিও ও বিএলএলআরও-র সক্রিয় সরকারি নোটিস
          </p>
        </div>

        <Link
          href="/tenders"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200/70 px-4 py-2 rounded-xl transition self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <span>সকল টেন্ডার দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {activeTenders.map((tender) => (
          <div
            key={tender.id}
            className="flex flex-col justify-between bg-white hover:bg-red-50/20 rounded-2xl p-5 border border-slate-200/90 hover:border-red-300 shadow-2xs hover:shadow-md transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-red-600" />
                  <span className="truncate max-w-[150px]">{tender.authorityName}</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                  সক্রিয় দরপত্র
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                {tender.title}
              </h3>

              <div className="text-[11px] text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 truncate">
                NIT: {tender.nitNumber}
              </div>
            </div>

            <div className="pt-3.5 mt-4 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">আনুমানিক মূল্য:</span>
                <span className="font-bold text-slate-900">{tender.estimatedValue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">জমার শেষ তারিখ:</span>
                <span className="font-bold text-rose-600">{tender.closingDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 px-5 py-3.5 rounded-2xl text-xs text-slate-600 border border-slate-200/70">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>পশ্চিমবঙ্গ সরকারের সেন্ট্রাল e-Procurement পোর্টাল (wbtenders.gov.in) অনুমোদিত কাজের তালিকা</span>
        </div>
        <Link
          href="/tenders"
          className="text-red-700 hover:text-red-800 font-bold flex items-center gap-1 shrink-0"
        >
          <span>আবেদন নির্দেশিকা ও NIT ফাইল দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
