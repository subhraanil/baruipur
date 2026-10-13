import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ব্যবহারের শর্তাবলী (Terms of Service) - বারুইপুর অনলাইন | Baruipur Online',
  description: 'বারুইপুর অনলাইন ওয়েবসাইট ব্যবহারের সাধারণ শর্তাবলী, কপিরাইট, বৌদ্ধিক সম্পত্তি ও দায়মুক্তি সংক্রান্ত নীতিমালা।',
  alternates: {
    canonical: 'https://baruipur.online/terms-of-service/',
  },
  openGraph: {
    title: 'ব্যবহারের শর্তাবলী - বারুইপুর অনলাইন Baruipur Online',
    description: 'ওয়েবসাইট ব্যবহারের সাধারণ নীতিমালা, স্বত্বাধিকার ও দায়বদ্ধতা।',
    url: 'https://baruipur.online/terms-of-service/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'article',
  }
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/about" className="hover:text-red-600 font-medium">আমাদের সম্পর্কে</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">ব্যবহারের শর্তাবলী</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Scale className="w-3.5 h-3.5" />
          আইনি নিয়মাবলী ও স্বত্বাধিকার
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          ব্যবহারের শর্তাবলী (Terms of Service)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর অনলাইন (<a href="https://baruipur.online" className="underline text-white font-medium">https://baruipur.online</a>) ব্যবহারের মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী বিনা শর্তে মেনে নিতে সম্মত হচ্ছেন।
        </p>
        <p className="text-xs text-slate-400 mt-2">
          কার্যকর তারিখ: ১৩ অক্টোবর ২০২৬
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* 1. Acceptance of Terms */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ১. শর্তাবলীর গ্রহণযোগ্যতা (Acceptance of Terms)
          </h2>
          <p className="text-slate-600">
            বারুইপুর অনলাইন একটি উন্মুক্ত আঞ্চলিক তথ্য ও সংবাদ সেবা। আপনি যদি এই শর্তাবলীর কোনো অংশের সাথে সম্মত না হন, তবে অনুগ্রহ করে সাইটটি ব্যবহার করা থেকে বিরত থাকুন। সাইট কর্তৃপক্ষ পূর্ববিজ্ঞপ্তি ছাড়াই যেকোনো সময় শর্তাবলী সংশোধন করার অধিকার সংরক্ষণ করে।
          </p>
        </section>

        {/* 2. Intellectual Property & Content Rights */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            ২. বৌদ্ধিক সম্পত্তি ও কপিরাইট (Intellectual Property)
          </h2>
          <p className="mb-3 text-slate-600">
            বারুইপুর অনলাইনের সমস্ত মৌলিক নিবন্ধ, ক্ষেত্র সমীক্ষা, গাইড, ডিরেক্টরি উপাত্ত এবং লোগো স্বত্বাধিকার সংরক্ষিত (Copyright Protected)।
          </p>
          <ul className="space-y-2 list-disc pl-5 text-slate-600">
            <li>ব্যক্তিগত ও অবাণিজ্যিক ব্যবহারের জন্য তথ্য পাঠ ও শেয়ার করা যাবে।</li>
            <li>ওয়েবসাইটের কোনো প্রতিবেদন বা নির্দেশিকা মূল উৎসের লিঙ্ক (Do-follow Attribution) উল্লেখ ব্যতীত হুবহু অন্য কোনো বাণিজ্যিক প্ল্যাটফর্মে প্রকাশ করা নিষিদ্ধ।</li>
          </ul>
        </section>

        {/* 3. User Conduct & Submissions */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            ৩. ব্যবহারকারীর আচরণ ও নাগরিক সংবাদ (User Conduct)
          </h2>
          <p className="mb-3 text-slate-600">
            আমাদের পোর্টালে কোনো তথ্য, মতামত বা নাগরিক সংবাদ প্রেরণের সময় ব্যবহারকারী নিশ্চিত করবেন যে:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-slate-600">
            <li>প্রেরিত তথ্য সত্য, অতিরঞ্জিত নয় এবং জনস্বার্থ সংশ্লিষ্ট।</li>
            <li>কোনো ব্যক্তি, সম্প্রদায় বা ধর্মের প্রতি বিদ্বেষমূলক, আপত্তিকর বা মানহানিকর কোনো উপাদান নেই।</li>
            <li>আইনশৃঙ্খলা পরিপন্থী বা শান্তি বিঘ্নিত করতে পারে এমন মিথ্যা গুজব ছড়ানোর চেষ্টা করা যাবে না।</li>
          </ul>
        </section>

        {/* 4. Limitation of Liability */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            ৪. দায়বদ্ধতার সীমাবদ্ধতা (Limitation of Liability)
          </h2>
          <p className="text-slate-600">
            বারুইপুর অনলাইন সর্বদা নির্ভুল ও যাচাইকৃত তথ্য উপস্থাপনের আন্তরিক প্রচেষ্টা চালায়। তবে ট্রেন চলাচলের রিয়েল-টাইম সময়সূচি পরিবর্তন, প্রশাসনিক ছুটির কারণে পরিষেবা বন্ধ থাকা, হাসপাতাল বা চিকিৎসকদের চেম্বারের সময় পরিবর্তন ইত্যাদির কারণে ব্যবহারকারীর কোনো আর্থিক বা ব্যক্তিগত ক্ষতির ক্ষেত্রে বারুইপুর অনলাইন কোনোভাবেই দায়ী থাকবে না। যেকোনো চূড়ান্ত সিদ্ধান্ত নেওয়ার পূর্বে সংশ্লিষ্ট প্রতিষ্ঠানের সাথে সরাসরি যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে।
          </p>
        </section>

        {/* 5. External Links & Advertisements */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-red-600" />
            ৫. বহিঃস্থ লিঙ্ক ও বিজ্ঞাপন (External Links & Ads)
          </h2>
          <p className="text-slate-600">
            আমাদের ওয়েবসাইটে তৃতীয় পক্ষের ওয়েবসাইটের লিঙ্ক বা Google AdSense এর মাধ্যমে প্রদর্শিত বিজ্ঞাপন থাকতে পারে। ঐসকল তৃতীয় পক্ষ ওয়েবসাইটের বিষয়বস্তু, পরিষেবা বা গোপনীয়তা নীতির জন্য বারুইপুর অনলাইন কোনো নিয়ন্ত্রণ বা দায়িত্ব বহন করে না।
          </p>
        </section>
      </div>
    </div>
  );
}
