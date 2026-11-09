import React from 'react';
import type { Metadata } from 'next';
import { getActiveNotices, getNoticeDepartments } from '@/lib/notices';
import NoticesClient from './NoticesClient';
import { Bell, FileText, CheckCircle2, Building2, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর সরকারি জরুরি নোটিস ও বিজ্ঞপ্তি ২০২৬ | Baruipur Official Notices & Circulars',
  description: 'বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), মহকুমা হাসপাতাল, আদালত, পঞ্চায়েত, বিদ্যুৎ পর্ষদ (WBSEDCL), আরটিও ও পুলিশ জেলার তারিখভিত্তিক গুরুত্বপূর্ণ নোটিস ও সার্কুলার। অফিসিয়াল PDF ডাউনলোড।',
  alternates: {
    canonical: 'https://baruipur.online/notices',
  },
  openGraph: {
    title: 'বারুইপুর সরকারি জরুরি নোটিস ও বিজ্ঞপ্তি ২০২৬ | Baruipur Online',
    description: 'বারুইপুরের সমস্ত প্রশাসনিক দপ্তর ও গ্রাম পঞ্চায়েতের তারিখভিত্তিক জরুরি সরকারি নোটিস, সার্কুলার ও অফিসিয়াল PDF ডাউনলোড লিংক।',
    url: 'https://baruipur.online/notices',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function NoticesPage() {
  const notices = getActiveNotices();
  const departments = getNoticeDepartments();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
            <Bell className="w-3.5 h-3.5 animate-pulse" />
            <span>প্রশাসনিক নোটিস ও সার্কুলার ডেস্ক (Official Public Circulars)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            বারুইপুর সরকারি জরুরি নোটিস ও প্রশাসনিক বিজ্ঞপ্তি
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), মহকুমা হাসপাতাল, বারুইপুর মহকুমা আদালত, পঞ্চায়েত সমিতি, বিদ্যুৎ দপ্তর (WBSEDCL), পরিবহণ দপ্তর (ARTO), ভূমি সংস্কার (BL&LRO), শিক্ষা দপ্তর ও পুলিশ জেলার সমস্ত বিজ্ঞপ্তি তারিখ অনুযায়ী এক ছাতার তলায়। মূল নোটিস সরাসরি অনলাইনে পড়ুন অথবা মূল অফিসিয়াল PDF ডাউনলোড করুন।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>যাচাইকৃত অফিশিয়াল মেমো ও সার্কুলার</span>
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>১০টি প্রধান প্রশাসনিক দপ্তর ও পঞ্চায়েত</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>তারিখভিত্তিক (Date-Wise) নিয়মিত আপডেট</span>
            </span>
          </div>
        </div>

        {/* Client Interactive Component */}
        <NoticesClient initialNotices={notices} departments={departments} />
      </div>
    </div>
  );
}
