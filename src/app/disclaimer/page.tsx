import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, AlertCircle, Info, Stethoscope, Train, Building2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'দাবিত্যাগ (Disclaimer) - বারুইপুর অনলাইন',
  description: 'বারুইপুর অনলাইনের সাধারণ তথ্য, স্বাস্থ্য ডিরেক্টরি, ট্রেন সময়সূচি ও নাগরিক সেবার আইনি দাবিত্যাগ এবং স্বচ্ছতা বার্তা।',
  alternates: {
    canonical: 'https://baruipur.online/disclaimer/',
  },
  openGraph: {
    title: 'দাবিত্যাগ (Disclaimer) - বারুইপুর অনলাইন',
    description: 'সংবাদ ও তথ্য সংকলন সংক্রান্ত সাধারণ দায়মুক্তি ও সচেতনতা বার্তা।',
    url: 'https://baruipur.online/disclaimer/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'article',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'দাবিত্যাগ - বারুইপুর অনলাইন',
      }
    ]
  }
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/about" className="hover:text-red-600 font-medium">আমাদের সম্পর্কে</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">দাবিত্যাগ</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <AlertCircle className="w-3.5 h-3.5" />
          সচেতনতা ও দায়মুক্তি বার্তা
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          আইনি দাবিত্যাগ (Disclaimer)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর অনলাইন (<a href="https://baruipur.online" className="underline text-white font-medium">https://baruipur.online</a>) একটি স্বাধীন, অপেশাদার ও নাগরিক-বান্ধব স্থানীয় সংবাদ ও তথ্যবাতায়ন।
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* 1. General Information Disclaimer */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            ১. সাধারণ তথ্য পরিবেশন (General Information Purpose)
          </h2>
          <p className="text-slate-600">
            এই ওয়েবসাইটে প্রকাশিত সমস্ত সংবাদ, নিবন্ধ, স্থান বিবরণ ও সময়সূচি কেবল সাধারণ তথ্য পরিবেশন ও জনস্বার্থে সচেতনতা বৃদ্ধির উদ্দেশ্যে প্রকাশিত হয়। আমরা তথ্যের নির্ভুলতা নিশ্চিত করতে সর্বোচ্চ সচেষ্ট হলেও, কোনো তথ্যের পূর্ণাঙ্গতা, সময়োপযোগিতা বা ত্রুটিহীনতার ব্যাপারে কোনো প্রত্যক্ষ বা পরোক্ষ আইনি গ্যারান্টি প্রদান করি না।
          </p>
        </section>

        {/* 2. Medical & Health Directory Disclaimer */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-rose-600" />
            ২. স্বাস্থ্য ও চিকিৎসা তথ্য সংক্রান্ত দাবিত্যাগ (Medical Disclaimer)
          </h2>
          <p className="text-slate-600 mb-3">
            আমাদের স্বাস্থ্য ডিরেক্টরিতে উল্লেখিত হাসপাতাল, পলিক্লিনিক বা ডাক্তারদের ওপিডি সময়সূচি ও সেবা সংক্রান্ত তথ্য কোনো পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা প্রেসক্রিপশনের বিকল্প নয়।
          </p>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-900">
            <strong>জরুরি চিকিৎসার ক্ষেত্রে:</strong> যেকোনো জটিল শারীরিক সমস্যায় অবিলম্বে বারুইপুর মহকুমা হাসপাতাল (Baruipur Sub-divisional Hospital) বা নিকটস্থ যোগ্য চিকিৎসকের শরণাপন্ন হোন অথবা ১০২/১০৮ জরুরি অ্যাম্বুলেন্স সেবায় যোগাযোগ করুন।
          </div>
        </section>

        {/* 3. Railway & Transport Disclaimer */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Train className="w-5 h-5 text-indigo-600" />
            ৩. পরিবহন ও রেলওয়ে সময়সূচি (Transport Disclaimer)
          </h2>
          <p className="text-slate-600">
            শিয়ালদহ দক্ষিণ শাখা (বারুইপুর জংশন, ক্যানিং, ডায়মন্ড হারবার ও নামখানা লাইন)-এর ট্রেনের সময়সূচি ভারতীয় রেলের প্রকাশিত সময়সারণী অনুযায়ী সংকলিত। লাইনে রক্ষণাবেক্ষণ (Power Block), আবহাওয়া বা কারিগরি কারণে সময়সূচি তাৎক্ষণিক পরিবর্তিত হতে পারে। যাত্রার পূর্বে রেলওয়ের অফিশিয়াল NTES অ্যাপ বা স্টেশন অনুসন্ধান কেন্দ্রে যাচাই করে নেওয়া বাঞ্ছনীয়।
          </p>
        </section>

        {/* 4. Non-Governmental Entity Disclosure */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            ৪. সরকারি অনুমোদন সংক্রান্ত সুস্পষ্টকরণ (Non-Government Affiliation)
          </h2>
          <p className="text-slate-600">
            বারুইপুর অনলাইন পশ্চিমবঙ্গ সরকার, ভারত সরকার বা বারুইপুর পৌরসভার অফিশিয়াল দপ্তর নয়। এটি স্থানীয় নাগরিক সাংবাদিকদের দ্বারা পরিচালিত একটি স্বাধীন ডিজিটাল পোর্টাল। সরকারি পরিষেবা সম্পর্কিত যেকোনো চূড়ান্ত শংসাপত্র বা আবেদনের জন্য অনুগ্রহ করে সংশ্লিষ্ট সরকারি দপ্তরে যোগাযোগ করুন।
          </p>
        </section>
      </div>
    </div>
  );
}
