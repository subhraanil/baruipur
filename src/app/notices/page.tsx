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
    <div className="min-h-screen bg-[#F5F7FA] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#F28C28] text-slate-950 px-3 py-1 rounded-md text-[14px] font-bold">
            <Bell className="w-4 h-4" />
            <span>প্রশাসনিক নোটিস ও সার্কুলার ডেস্ক</span>
          </div>

          <h1 className="text-[30px] sm:text-[42px] font-bold text-white leading-[1.3]">
            বারুইপুর সরকারি জরুরি নোটিস ও প্রশাসনিক বিজ্ঞপ্তি
          </h1>

          <p className="text-[18px] sm:text-[19px] text-slate-200 leading-[1.85] max-w-3xl">
            বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), মহকুমা হাসপাতাল, আদালত, পঞ্চায়েত, বিদ্যুৎ দপ্তর (WBSEDCL), পরিবহণ দপ্তর ও পুলিশ জেলার সমস্ত বিজ্ঞপ্তি ও অফিসিয়াল PDF।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[14px] text-slate-300 border-t border-[#1f3d66]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>যাচাইকৃত অফিশিয়াল মেমো ও সার্কুলার</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-sky-300" />
              <span>{departments.length}টি প্রধান প্রশাসনিক দপ্তর</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>সর্বশেষ যাচাই: ২৬ নভেম্বর ২০২৬</span>
            </span>
          </div>
        </div>

        {/* Client Interactive Component */}
        <NoticesClient initialNotices={notices} departments={departments} />
      </div>
    </div>
  );
}
