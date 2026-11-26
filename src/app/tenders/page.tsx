import React from 'react';
import type { Metadata } from 'next';
import { getAllTenders, getTenderAuthorities } from '@/lib/tenders';
import TendersClient from './TendersClient';
import { FileText, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার নোটিস ২০২৬ | Baruipur Municipality, SDO, Court, Hospital & Govt Tenders',
  description: 'বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), গ্রাম পঞ্চায়েত সমূহ, মহকুমা আদালত, মহকুমা হাসপাতাল, বিদ্যুৎ পর্ষদ (WBSEDCL), পূর্ত দপ্তর (PWD), এআরটিও ও বিএলএলআরও-র সক্রিয় সরকারি ই-টেন্ডার ও কাজের তালিকা।',
  alternates: {
    canonical: 'https://baruipur.online/tenders',
  },
  openGraph: {
    title: 'বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার নোটিস ২০২৬ | Baruipur Online',
    description: 'বারুইপুর পৌরসভা, এসডিও, গ্রাম পঞ্চায়েত, আদালত, হাসপাতাল, বিদ্যুৎ দপ্তর, পূর্ত দপ্তর, আরটিও ও ভূমি সংস্কার দপ্তরের সমস্ত সরকারি ই-টেন্ডার তালিকা।',
    url: 'https://baruipur.online/tenders',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function TendersPage() {
  const tenders = getAllTenders();
  const authorities = getTenderAuthorities();

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#F28C28] text-slate-950 px-3 py-1 rounded-md text-[14px] font-bold">
            <FileText className="w-4 h-4" />
            <span>পশ্চিমবঙ্গ ই-টেন্ডার পোর্টাল সমন্বয় (e-Procurement)</span>
          </div>

          <h1 className="text-[30px] sm:text-[42px] font-bold text-white leading-[1.3]">
            বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার ডিরেক্টরি
          </h1>

          <p className="text-[18px] sm:text-[19px] text-slate-200 leading-[1.85] max-w-3xl">
            বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), গ্রাম পঞ্চায়েত, আদালত, হাসপাতাল, বিদ্যুৎ পর্ষদ (WBSEDCL), পূর্ত দপ্তর (PWD) এবং বিএলএলআরও-র সমস্ত সক্রিয় ই-টেন্ডার তালিকা।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[14px] text-slate-300 border-t border-[#1f3d66]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>যাচাইকৃত অফিশিয়াল বিজ্ঞপ্তি</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-sky-300" />
              <span>{authorities.length}টি সরকারি প্রশাসনিক কর্তৃপক্ষ</span>
            </span>
            <span>উৎস: wbtenders.gov.in • সর্বশেষ যাচাই: ২৬ নভেম্বর ২০২৬</span>
          </div>
        </div>

        {/* Client Interactive Component */}
        <TendersClient initialTenders={tenders} authorities={authorities} />
      </div>
    </div>
  );
}
