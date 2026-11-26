import React from 'react';
import type { Metadata } from 'next';
import { getAllProperties, getPropertyCategories, getPropertyLocations } from '@/lib/properties';
import PropertyClient from './PropertyClient';
import { Home, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর জমি, ফ্ল্যাট ও সম্পত্তি কেনাবেচা ২০২৬ | Buy & Sale Real Estate Baruipur',
  description: 'বারুইপুরে নতুন ফ্ল্যাট, বাস্তু জমি, প্লট, পুরোনো বাড়ি রিসেল, বাণিজ্যিক দোকান ও ব্যাংক নিলাম প্রপার্টি (SARFAESI)। সরাসরি মালিক ও বিশ্বস্ত ডেভেলপারের সাথে যোগাযোগের সুযোগ।',
  alternates: {
    canonical: 'https://baruipur.online/property',
  },
  openGraph: {
    title: 'বারুইপুর জমি, ফ্ল্যাট ও সম্পত্তি কেনাবেচা ডিরেক্টরি | Baruipur Online',
    description: 'বারুইপুরে নতুন ফ্ল্যাট, আবাসিক বাস্তু জমি, রিসেল বাড়ি এবং ব্যাংক নিলাম প্রপার্টি খুঁজুন বা বিনামূল্যে আপনার সম্পত্তি লিস্ট করুন।',
    url: 'https://baruipur.online/property',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function PropertyPage() {
  const properties = getAllProperties();
  const categories = getPropertyCategories();
  const locations = getPropertyLocations();

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F28C28] text-slate-950 px-3.5 py-1 rounded-md text-[14px] font-bold">
            <Home className="w-4 h-4" />
            <span>বারুইপুর প্রপার্টি ও ব্যাংক নিলাম ডিরেক্টরি ২০২৬</span>
          </div>

          <h1 className="text-[30px] sm:text-[42px] font-bold leading-[1.3]">
            বারুইপুর জমি, ফ্ল্যাট ও ব্যাংক নিলাম সম্পত্তি (SARFAESI)
          </h1>

          <p className="text-[18px] sm:text-[19px] text-slate-200 leading-[1.85] max-w-3xl">
            বারুইপুর বাইপাস, স্টেশন রোড, কল্যাণপুর ও পদ্মপুকুর অঞ্চলের নতুন ফ্ল্যাট, বাস্তু জমি, রিসেল বাড়ি এবং ব্যাংক নিলাম প্রপার্টির (Bank Auction / SARFAESI) যাচাইকৃত ডিরেক্টরি।
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-[14px] text-slate-300 border-t border-[#1f3d66]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>যাচাইকৃত খতিয়ান ও লিগ্যাল সার্চিং</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>বারুইপুর পৌরসভা ও ব্লক এলাকা</span>
            </span>
            <span className="text-amber-300 font-semibold">
              সর্বশেষ যাচাই: ২৬ নভেম্বর ২০২৬
            </span>
          </div>
        </div>

        {/* Official SARFAESI Bank Auction Guide Banner */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#142B4A]">
              ব্যাংক নিলাম প্রপার্টি (SARFAESI E-Auction) কেনার আগে জরুরি তথ্য
            </h2>
            <p className="text-[16px] text-[#475467] leading-[1.65]">
              SBI, PNB, Bank of Baroda ও Canara Bank-এর বারুইপুর নিলাম সম্পত্তিতে অংশ নিতে <strong>১. Sale Notice</strong> যাচাই করুন, <strong>২. Physical vs Symbolic Possession</strong> দেখুন, এবং <strong>১০% EMD</strong> জমা দিন অফিশিয়াল পোর্টালে।
            </p>
          </div>
          <a
            href="https://ibapi.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#245B91] text-white font-bold text-[16px] shrink-0 transition-colors"
          >
            অফিশিয়াল IBAPI পোর্টাল
          </a>
        </div>

        {/* Client Interactive Component */}
        <PropertyClient 
          initialProperties={properties} 
          categories={categories} 
          locations={locations} 
        />
      </div>
    </div>
  );
}
