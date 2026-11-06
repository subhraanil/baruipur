import React from 'react';
import Link from 'next/link';
import { getActiveTenders } from '@/lib/tenders';
import { FileText, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function HomeTendersSection() {
  const activeTenders = getActiveTenders().slice(0, 3);

  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>অফিশিয়াল ই-টেন্ডার নোটিস</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            বারুইপুর পৌরসভা ও সরকারি টেন্ডার ডিরেক্টরি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            বারুইপুর পৌরসভা, মহকুমা শাসক (SDO), পুলিশ প্রশাসন ও পূর্ত দপ্তরের সক্রিয় কাজের নোটিস (NIT)
          </p>
        </div>

        <Link
          href="/tenders"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition self-start sm:self-auto shrink-0"
        >
          <span>সকল টেন্ডার দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTenders.map((tender) => (
          <div
            key={tender.id}
            className="flex flex-col justify-between bg-slate-50 hover:bg-red-50/30 rounded-xl p-4 border border-slate-200/80 hover:border-red-200 transition group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                  <Building2 className="w-3 h-3 text-red-600" />
                  <span className="truncate max-w-[140px]">{tender.authorityName}</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  সক্রিয়
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-red-700 line-clamp-2">
                {tender.title}
              </h3>

              <div className="text-[11px] text-slate-500 font-mono bg-white px-2 py-1 rounded border border-slate-100 truncate">
                NIT: {tender.nitNumber}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">মূল্য:</span>
                <span className="font-bold text-slate-800">{tender.estimatedValue}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">আবেদনের শেষ:</span>
                <span className="font-medium text-rose-600">{tender.closingDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 px-4 py-2.5 rounded-xl text-xs text-slate-600 border border-slate-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>পশ্চিমবঙ্গ সরকারের সেন্ট্রাল e-Procurement পোর্টাল (wbtenders.gov.in) অনুমোদিত</span>
        </div>
        <Link
          href="/tenders"
          className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 shrink-0"
        >
          <span>আবেদন পদ্ধতি ও বিস্তারিত নির্দেশিকা</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
