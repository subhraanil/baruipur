import React from 'react';
import Link from 'next/link';
import { getActiveNotices } from '@/lib/notices';
import { Bell, ArrowRight, Building2, Calendar, Download, ExternalLink, AlertTriangle } from 'lucide-react';

export default function HomeNoticesSection() {
  const notices = getActiveNotices().slice(0, 4);

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-amber-200/80 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 animate-pulse text-amber-600" />
            <span>প্রশাসনিক গুরুত্বপূর্ণ নোটিস ও সার্কুলার (Official Notices)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            বারুইপুর সরকারি জরুরি নোটিস ও প্রশাসনিক বিজ্ঞপ্তি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            বারুইপুর পৌরসভা, এসডিও, মহকুমা হাসপাতাল, আদালত, পঞ্চায়েত, বিদ্যুৎ পর্ষদ ও পুলিশ জেলার তারিখভিত্তিক নোটিস
          </p>
        </div>

        <Link
          href="/notices"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-4 py-2 rounded-xl transition self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <span>সকল নোটিস দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`flex flex-col justify-between rounded-2xl p-5 border transition-all duration-300 group ${
              notice.isUrgent 
                ? 'bg-amber-50/30 border-amber-300 hover:border-amber-400 shadow-2xs' 
                : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[170px]">{notice.departmentName}</span>
                </span>
                
                <div className="flex items-center gap-1.5">
                  {notice.isUrgent && (
                    <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-0.5">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      জরুরি
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {notice.publishedDateFormatted}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-800 transition-colors line-clamp-2">
                {notice.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {notice.summary}
              </p>
            </div>

            <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px] truncate max-w-[140px]">
                {notice.memoNo}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/notices"
                  className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-2xs transition"
                >
                  <span>বিস্তারিত পড়ুন</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href={notice.sourceUrl || notice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 transition"
                  title="অফিশিয়াল সরকারি উৎস"
                >
                  <span>মূল সূত্র</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/60 px-5 py-3 rounded-2xl text-xs text-amber-900 border border-amber-200/60">
        <div className="flex items-center gap-2">
          <span className="font-bold">📢 সর্বশেষ আপডেট:</span>
          <span>দক্ষিণ ২৪ পরগনা জেলা ও মহকুমা প্রশাসনের সমস্ত বিজ্ঞপ্তি নিয়মিত সমন্বিত করা হয়</span>
        </div>
        <Link
          href="/notices"
          className="text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1 shrink-0"
        >
          <span>সমস্ত বিজ্ঞপ্তি ও পূর্ববর্তী সার্কুলার আর্কাইভ দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
