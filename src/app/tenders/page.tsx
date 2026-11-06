import React from 'react';
import type { Metadata } from 'next';
import { getAllTenders, getTenderAuthorities } from '@/lib/tenders';
import TendersClient from './TendersClient';
import { FileText, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার নোটিস ২০২৬ | Baruipur Municipality & Govt Tenders',
  description: 'বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), পুলিশ জেলা, ব্লক পঞ্চায়েত সমিতি ও পূর্ত দপ্তরের সক্রিয় সরকারি ই-টেন্ডার ও কাজের তালিকা। NIT নম্বর ও আবেদন নির্দেশিকা।',
  alternates: {
    canonical: 'https://baruipur.online/tenders',
  },
  openGraph: {
    title: 'বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার নোটিস ২০২৬ | Baruipur Online',
    description: 'বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), পুলিশ জেলা, ব্লক পঞ্চায়েত সমিতি ও পূর্ত দপ্তরের সক্রিয় সরকারি ই-টেন্ডার ও কাজের তালিকা।',
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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>পশ্চিমবঙ্গ ই-টেন্ডার পোর্টাল সমন্বয় (e-Procurement)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            বারুইপুর সরকারি টেন্ডার ও পৌর ই-টেন্ডার ডিরেক্টরি
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            বারুইপুর পৌরসভা, মহকুমা শাসক দপ্তর (SDO), বারুইপুর পুলিশ জেলা, পঞ্চায়েত সমিতি ও পূর্ত দপ্তরের সমস্ত সক্রিয় ই-টেন্ডার ও কাজের তালিকা এক ছাতার তলায়। ঠিকাদার ও সরবরাহকারীদের জন্য নোটিস ইনভাইটিং টেন্ডার (NIT), কাজের বিবরণী ও আবেদন লিংক।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>যাচাইকৃত অফিশিয়াল বিজ্ঞপ্তি</span>
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>৫টি প্রধান প্রশাসনিক দপ্তর</span>
            </span>
            <span>নিয়মিত আপডেট: wbtenders.gov.in</span>
          </div>
        </div>

        {/* Client Interactive Component */}
        <TendersClient initialTenders={tenders} authorities={authorities} />
      </div>
    </div>
  );
}
