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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Home className="w-3.5 h-3.5" />
            <span>বারুইপুর প্রপার্টি বাজার ও রিয়েল এস্টেট পোর্টাল ২০২৬</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            বারুইপুর জমি, ফ্ল্যাট ও সম্পত্তি কেনাবেচা
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
            বারুইপুর বাইপাস, স্টেশন রোড, পদ্মপুকুর ও কাছারি বাজার অঞ্চলের নতুন আবাসিক ফ্ল্যাট, নিষ্কণ্টক বাস্তু জমি, সাশ্রয়ী রিসেল বাড়ি এবং ব্যাংক নিলাম প্রপার্টির (Bank Auction / SARFAESI) নির্ভরযোগ্য ডিরেক্টরি।
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-emerald-200 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>যাচাইকৃত খতিয়ান ও লিগ্যাল সার্চিং</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>বারুইপুর পৌরসভা ও পঞ্চায়েত এলাকা</span>
            </span>
            <span className="text-emerald-300 font-medium">
              সরাসরি যোগাযোগ: শূন্য দালালিমুক্ত বিকল্প
            </span>
          </div>
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
