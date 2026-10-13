import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, ShieldCheck, Cookie, Lock, Eye, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি (Privacy Policy) - বারুইপুর অনলাইন | Baruipur Online',
  description: 'বারুইপুর অনলাইনের গোপনীয়তা নীতি। কুকি নীতি, গুগল অ্যাডসেন্স (Google AdSense), ব্যক্তিগত তথ্য সুরক্ষা ও ডেটা সংগ্রহ সংক্রান্ত স্বচ্ছ নীতিমালা।',
  alternates: {
    canonical: 'https://baruipur.online/privacy-policy/',
  },
  openGraph: {
    title: 'গোপনীয়তা নীতি - বারুইপুর অনলাইন Baruipur Online',
    description: 'ব্যক্তিগত তথ্য সুরক্ষা, কুকি এবং বিজ্ঞাপন নীতি সংক্রান্ত নির্দেশিকা।',
    url: 'https://baruipur.online/privacy-policy/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'article',
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/about" className="hover:text-red-600 font-medium">আমাদের সম্পর্কে</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">গোপনীয়তা নীতি</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          ব্যবহারকারী সুরক্ষা ও স্বচ্ছতা
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর অনলাইন (<a href="https://baruipur.online" className="underline text-white font-medium">https://baruipur.online</a>) ব্যবহারকারীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে সম্পূর্ণ প্রতিশ্রুতিবদ্ধ। এই নীতিমালায় কীভাবে তথ্য সংগৃহীত, ব্যবহৃত ও সুরক্ষিত রাখা হয় তা বিশদে ব্যাখ্যা করা হয়েছে।
        </p>
        <p className="text-xs text-slate-400 mt-2">
          সর্বশেষ সংস্করণ ও কার্যকর তারিখ: ১৩ অক্টোবর ২০২৬
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* 1. Introduction & Consent */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            ১. সাধারণ সম্মতি (General Consent)
          </h2>
          <p className="mb-3">
            আপনি যখন বারুইপুর অনলাইন ওয়েবসাইট ব্রাউজ করেন, সংবাদ বা গাইড পাঠ করেন, নাগরিক সংবাদ জমা দেন অথবা আমাদের সাথে যোগাযোগ করেন, তখন আপনি এই গোপনীয়তা নীতিমালায় বর্ণিত নিয়মে তথ্য সংগ্রহ ও ব্যবহারে সম্মতি প্রদান করছেন।
          </p>
        </section>

        {/* 2. Google AdSense & Advertising Cookies (Strict AdSense Requirement) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-600" />
            ২. গুগল অ্যাডসেন্স ও বিজ্ঞাপন কুকি নীতি (Google AdSense & Advertising Cookies)
          </h2>
          <p className="mb-3">
            আমাদের ওয়েবসাইটের পরিচালন ও সার্ভার ব্যয় নির্বাহের জন্য আমরা তৃতীয় পক্ষের বিজ্ঞাপন নেটওয়ার্ক যেমন <strong>Google AdSense</strong> ব্যবহার করি। গুগল সহ তৃতীয় পক্ষের বিজ্ঞাপন প্রদানকারীরা এই নীতিমালার অধীনে বিজ্ঞাপন পরিবেশন করে থাকে:
          </p>
          <ul className="space-y-2.5 list-disc pl-5 text-slate-600 mb-4">
            <li>
              <strong>কুকিজ ও ওয়েব বীকন:</strong> গুগল (Google) সহ তৃতীয় পক্ষের বিজ্ঞাপনদাতারা আপনার পূর্ববর্তী ভিজিটের উপর ভিত্তি করে প্রাসঙ্গিক বিজ্ঞাপন দেখানোর জন্য কুকিজ (Cookies) যেমন DoubleClick DART কুকি ব্যবহার করতে পারে।
            </li>
            <li>
              <strong>ব্যক্তিগতকৃত বিজ্ঞাপন (Personalized Ads):</strong> বিজ্ঞাপনী কুকিজ ব্যবহারের মাধ্যমে গুগল এবং তাদের অংশীদার নেটওয়ার্কগুলো আপনাকে এবং অন্যান্য ভিজিটরদের তাদের ব্রাউজিং পছন্দ অনুযায়ী বিজ্ঞাপন প্রদর্শন করে থাকে।
            </li>
            <li>
              <strong>বিজ্ঞাপন পছন্দ নিয়ন্ত্রণ (Opt-out):</strong> আপনি যেকোনো সময় গুগলের বিজ্ঞাপন সেটিংস পেজ (<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-medium">Google Ads Settings</a>) ভিজিট করে ব্যক্তিগতকৃত বিজ্ঞাপন অপ্ট-আউট (নিষ্ক্রিয়) করতে পারেন। বিকল্পভাবে, আপনি <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-medium">aboutads.info</a> ওয়েবসাইট থেকে তৃতীয় পক্ষের বিজ্ঞাপন কুকিজ বন্ধ করতে পারেন।
            </li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              গুগল কীভাবে অংশীদার ওয়েবসাইট থেকে ডেটা ব্যবহার করে সে সম্পর্কে বিস্তারিত জানতে গুগলের অফিশিয়াল নীতি পড়ুন: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="underline font-bold">How Google uses information from sites or apps that use our services</a>।
            </p>
          </div>
        </section>

        {/* 3. Information We Collect */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            ৩. আমরা কী কী তথ্য সংগ্রহ করি (Information We Collect)
          </h2>
          <p className="mb-3">আমরা দুই ধরনের তথ্য সংগ্রহ করতে পারি:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
              <h3 className="font-bold text-slate-900 mb-2">ক. স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য (Log Data)</h3>
              <ul className="text-xs sm:text-sm space-y-1 text-slate-600 list-disc pl-4">
                <li>ইন্টারনেট প্রোটোকল (IP) ঠিকানা</li>
                <li>ব্রাউজারের ধরন ও ভাষা সংস্করণ</li>
                <li>ভিজিটের সময় এবং পেজ প্রদর্শনের সময়কাল</li>
                <li>রেফারাল ইউআরএল (যেখান থেকে ভিজিটর এসেছেন)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
              <h3 className="font-bold text-slate-900 mb-2">খ. ব্যবহারকারীর সরাসরি প্রদত্ত তথ্য</h3>
              <ul className="text-xs sm:text-sm space-y-1 text-slate-600 list-disc pl-4">
                <li>যোগাযোগ ও সহায়তা ফর্মের মাধ্যমে প্রেরিত নাম ও ইমেল</li>
                <li>নাগরিক সংবাদ প্রেরণের সময় প্রদত্ত তথ্য ও বিবরণ</li>
                <li>প্রতিক্রিয়া ও মন্তব্যসমূহ</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Google Analytics & Tracking Tools */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            ৪. অ্যানালিটিক্স ও পরিমাপ ব্যবস্থা (Google Analytics)
          </h2>
          <p className="mb-3 text-slate-600">
            আমরা পাঠকদের পছন্দ, সর্বাধিক পঠিত সংবাদের প্রবণতা এবং পেজ লোডিং গতি বিশ্লেষণের জন্য <strong>Google Analytics (GA4)</strong> ব্যবহার করি। এটি কোনো ব্যবহারকারীর ব্যক্তিগত পরিচয়যোগ্য তথ্য (PII) প্রকাশ করে না এবং শুধুমাত্র সামগ্রিক ট্রাফিক প্রবণতা বুঝতে সহায়তা করে।
          </p>
        </section>

        {/* 5. Data Protection & Sharing */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" />
            ৫. তথ্য সুরক্ষা ও গোপনীয়তা রক্ষা (Data Protection)
          </h2>
          <p className="mb-3 text-slate-600">
            বারুইপুর অনলাইন কোনো অবস্থাতেই ব্যবহারকারীদের ব্যক্তিগত ইমেল, ফোন নম্বর বা তথ্য কোনো বাণিজ্যিক সংস্থা বা তৃতীয় পক্ষের কাছে বিক্রি, লিজ বা বাজারজাত করে না। তবে আইন প্রয়োগকারী সংস্থার বৈধ আইনি নোটিশ বা আদালতের নির্দেশ মেনে চলার ক্ষেত্রে প্রয়োজনীয় আইনগত বাধ্যবাধকতা সংরক্ষিত থাকবে।
          </p>
        </section>

        {/* 6. Children's Information */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            ৬. শিশুদের তথ্যের নিরাপত্তা (Children's Privacy - COPPA)
          </h2>
          <p className="text-slate-600">
            বারুইপুর অনলাইন ১৩ বছরের কম বয়সী শিশুদের কাছ থেকে কোনো ব্যক্তিগত শনাক্তকরণযোগ্য তথ্য ইচ্ছাকৃতভাবে সংগ্রহ করে না। যদি কোনো পিতা-মাতা মনে করেন তাদের সন্তান আমাদের সিস্টেমে কোনো তথ্য জমা দিয়েছে, তবে অবিলম্বে আমাদের সাথে যোগাযোগ করলে আমরা তা দ্রুত মুছে ফেলার ব্যবস্থা গ্রহণ করব।
          </p>
        </section>

        {/* 7. Contact for Privacy Inquiries */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            ৭. গোপনীয়তা সংক্রান্ত যোগাযোগ (Contact Us)
          </h2>
          <p className="mb-4 text-slate-600">
            আমাদের গোপনীয়তা নীতি বা ডেটা হ্যান্ডলিং সংক্রান্ত যেকোনো প্রশ্ন বা আপত্তির ক্ষেত্রে সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-xs sm:text-sm text-slate-700 space-y-1">
            <p><strong>ইমেল:</strong> <a href="mailto:editor@baruipur.online" className="text-red-600 underline">editor@baruipur.online</a> / <a href="mailto:subhranil.naskar@gmail.com" className="text-red-600 underline">subhranil.naskar@gmail.com</a></p>
            <p><strong>ঠিকানা:</strong> বারুইপুর পৌরসভা ওয়ার্ড এলাকা, বারুইপুর, দক্ষিণ ২৪ পরগনা, পশ্চিমবঙ্গ - ৭৪৩৩০২</p>
            <p><strong>যোগাযোগ পেজ:</strong> <a href="/contact" className="text-red-600 underline">https://baruipur.online/contact/</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
