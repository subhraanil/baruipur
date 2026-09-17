import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, CheckCircle2, Eye, FileText, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সম্পাদকীয় নীতি (Editorial Policy) - বারুইপুর অনলাইন | Baruipur Online',
  description: 'বারুইপুর অনলাইনের সংবাদ সংগ্রহ, ফ্যাক্ট-চেকিং, সামাজিক মাধ্যমের তথ্য যাচাই, উৎস স্বীকৃতি এবং বিজ্ঞাপনী নীতি সম্পর্কে জানুন।',
  alternates: {
    canonical: 'https://baruipur.online/editorial-policy/',
  },
  openGraph: {
    title: 'সম্পাদকীয় নীতি - বারুইপুর অনলাইন Baruipur Online',
    description: 'সংবাদ সংগ্রহ, তথ্য যাচাই ও প্রকাশের স্বচ্ছ নীতি নির্দেশিকা।',
    url: 'https://baruipur.online/editorial-policy/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'article',
  }
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/about" className="hover:text-red-600 font-medium">আমাদের সম্পর্কে</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">সম্পাদকীয় নীতি</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Scale className="w-3.5 h-3.5" />
          নৈতিক সাংবাদিকতা ও স্বচ্ছতা
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          বারুইপুর অনলাইনের সম্পাদকীয় নীতি (Editorial Policy)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          বারুইপুর অনলাইন দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার নাগরিকদের জন্য বস্তুনিষ্ঠ, পক্ষপাতহীন ও যাচাইকৃত আঞ্চলিক তথ্য পরিবেশন করতে অঙ্গীকারাবদ্ধ।
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ১. সংবাদ সংগ্রহ ও তথ্য যাচাই (Sourcing & Verification)
          </h2>
          <p className="text-sm mb-3">
            আমরা যেকোনো সংবাদ বা প্রতিবেদন প্রকাশের পূর্বে নির্ভরযোগ্য উৎস থেকে তথ্য যাচাই করি:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5 text-slate-600">
            <li><strong>প্রশাসনিক ও পুলিশি সংবাদ:</strong> বারুইপুর পুলিশ জেলা, মহকুমা প্রশাসন ও স্থানীয় থানার প্রেস বিজ্ঞপ্তি এবং দায়িত্বশীল আধিকারিকদের বক্তব্যের ভিত্তিতে তথ্য সন্নিবেশিত হয়।</li>
            <li><strong>নাগরিক ও পৌর পরিষেবা:</strong> বারুইপুর পৌরসভার নোটিশ ও দায়িত্বপ্রাপ্ত কাউন্সিলর/চেয়ারম্যানের তথ্যকে ভিত্তি ধরা হয়।</li>
            <li><strong>রেলওয়ে আপডেট:</strong> পূর্ব রেলওয়ে শিয়ালদহ ডিভিশনের অফিশিয়াল বুলেটিন ও স্টেশন মাস্টার দপ্তরের তথ্যানুযায়ী যাচাই করা হয়।</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            ২. সামাজিক মাধ্যম ও কমিউনিটি সূত্রের ব্যবহার (Social Media Curation)
          </h2>
          <p className="text-sm mb-3">
            স্থানীয় ফেসবুক পেজ বা নাগরিক সূত্রের খবর প্রকাশের ক্ষেত্রে আমরা কঠোর ফিল্টারিং প্রয়োগ করি:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5 text-slate-600">
            <li>অযাচাইকৃত গুজব, ধর্মীয় উস্কানি, রাজনৈতিক বিদ্বেষ বা ব্যক্তিগত কুৎসামূলক পোস্ট সম্পূর্ণ বর্জন করা হয়।</li>
            <li>কোনো পোস্ট সংকলিত হলে স্পষ্টভাবে মূল সূত্রের নাম উল্লেখ করা হয় এবং মূল লিংকের রেফারেন্স দেওয়া হয়।</li>
            <li>বাণিজ্যিক বিজ্ঞাপন, প্রচারমূলক পোস্ট এবং ভেক্সিংশোভা পোস্ট সংবাদের ছদ্মবেশে প্রকাশ করা হয় না।</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            ৩. উৎস স্বীকৃতি ও স্বচ্ছতা (Attribution Standards)
          </h2>
          <p className="text-sm mb-3">
            আমাদের প্রতিটি নিবন্ধে খবরের প্রকারভেদ স্পষ্টভাবে চিহ্নিত থাকে:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-red-600 block mb-1">মৌলিক প্রতিবেদন</span>
              <p className="text-xs text-slate-600">বারুইপুর অনলাইনের নিজস্ব অনুসন্ধান ও সংকলন।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-emerald-600 block mb-1">প্রাতিষ্ঠানিক সূত্র</span>
              <p className="text-xs text-slate-600">পুলিশ, হাসপাতাল, পৌরসভা বা রেলের অফিশিয়াল প্রেস রিলিজ।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-600 block mb-1">নাগরিক মাধ্যম</span>
              <p className="text-xs text-slate-600">স্থানীয় নাগরিক ফোরাম বা সোশ্যাল মিডিয়া থেকে সংগৃহীত।</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-600" />
            ৪. রাজনৈতিক নিরপেক্ষতা ও বিজ্ঞাপন নীতি (Neutrality & Ads)
          </h2>
          <p className="text-sm mb-3">
            বারুইপুর অনলাইন কোনো রাজনৈতিক দল বা গোষ্ঠীর মুখপত্র নয়। নির্বাচনী বা রাজনৈতিক প্রতিবেদনে সকল প্রধান দলের বক্তব্য বস্তুনিষ্ঠভাবে তুলে ধরা হয়।
          </p>
          <p className="text-sm">
            ভবিষ্যতে কোনো স্পন্সরড বা পেইড পোস্ট অন্তর্ভুক্ত হলে তা স্পষ্টভাবে <strong>'বিজ্ঞাপন'</strong> বা <strong>'Sponsored'</strong> ট্যাগে চিহ্নিত করা হবে। সাধারণ খবরের সাথে বিজ্ঞাপন মেশানো আমাদের নীতির সম্পূর্ণ পরিপন্থী।
          </p>
        </section>

        <section className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-red-900 mb-1">ভুল সংশোধন ও অভিযোগ</h3>
            <p className="text-xs text-red-700">
              কোনো তথ্য ত্রুটিপূর্ণ মনে হলে সরাসরি আমাদের সাথে যোগাযোগ করে সংশোধনের অনুরোধ জানাতে পারেন।
            </p>
          </div>
          <a href="/corrections-policy" className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition whitespace-nowrap shadow">
            সংশোধনী নীতি →
          </a>
        </section>
      </div>
    </div>
  );
}
