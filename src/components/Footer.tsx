import React from 'react';
import { CATEGORIES, EMERGENCY_CONTACTS } from '@/lib/constants';
import { Phone, Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-2xl font-black text-white">বারুইপুর</h2>
              <span className="text-lg font-bold text-red-500">Baruipur</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে এবং দক্ষিণ ২৪ পরগনার প্রত্যন্ত অঞ্চলের প্রতি মুহূর্তের তাজা খবর ও প্রয়োজনীয় নাগরিক তথ্য।
            </p>
          </div>

          {/* Quick Pillars & Directory */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              প্ল্যাটফর্মের মূল স্তম্ভ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/places" className="hover:text-amber-400 transition flex items-center gap-1.5 font-medium text-amber-300">
                  <span className="text-amber-500">›</span> বারুইপুর ডিরেক্টরি (Directory)
                </a>
              </li>
              <li>
                <a href="/transport" className="hover:text-blue-400 transition flex items-center gap-1.5 font-medium text-blue-300">
                  <span className="text-blue-500">›</span> পরিবহন ও লোকাল ট্রেন (Transport)
                </a>
              </li>
              <li>
                <a href="/citizen-services" className="hover:text-emerald-400 transition flex items-center gap-1.5 font-medium text-emerald-300">
                  <span className="text-emerald-500">›</span> নাগরিক পরিষেবা গাইড (Services)
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-purple-400 transition flex items-center gap-1.5 font-medium text-purple-300">
                  <span className="text-purple-500">›</span> উৎসব ও মেলা ক্যালেন্ডার (Events)
                </a>
              </li>
              <li>
                <a href="/#featured-guides" className="hover:text-red-400 transition flex items-center gap-1.5 font-medium">
                  <span className="text-red-500">›</span> ৫টি বিশেষ লাইফস্টাইল গাইড
                </a>
              </li>
              <li>
                <a href="/places/baruipur-municipality/" className="hover:text-slate-200 transition flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-slate-600">›</span> ১৭ ওয়ার্ড কাউন্সিলর তালিকা
                </a>
              </li>
            </ul>
          </div>

          {/* Trust, Governance & Editorial */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              স্বচ্ছতা ও সম্পাদকীয় নীতি
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> আমাদের সম্পর্কে (About Us)
                </a>
              </li>
              <li>
                <a href="/editorial-policy" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> সম্পাদকীয় নীতি (Editorial Policy)
                </a>
              </li>
              <li>
                <a href="/corrections-policy" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> ভুল সংশোধনী নীতি (Corrections)
                </a>
              </li>
              <li>
                <a href="/submit-news" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> নাগরিক সংবাদ পাঠান (Submit News)
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> যোগাযোগ ও হেল্পডেস্ক (Contact)
                </a>
              </li>
              <li>
                <a href="/emergency-contacts" className="hover:text-red-400 transition flex items-center gap-1.5 font-bold text-rose-400">
                  <span className="text-rose-500 text-xs">›</span> জরুরি হেল্পলাইন ডিরেক্টরি
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links, SEO & AI Feeds */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              সাইটম্যাপ ও AI ডেটা
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/sitemap.xml" target="_blank" className="hover:text-red-400 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> XML সাইটম্যাপ (Sitemap)
                </a>
              </li>
              <li>
                <a href="/sitemap-news.xml" target="_blank" className="hover:text-red-400 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> গুগল নিউজ সাইটম্যাপ
                </a>
              </li>
              <li>
                <a href="/feed.xml" target="_blank" className="hover:text-red-400 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> আরএসএস ফিড (RSS Feed)
                </a>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" className="hover:text-red-400 transition flex items-center gap-1 font-semibold text-emerald-400">
                  <span className="text-emerald-500">›</span> AI ও LLM ম্যানিফেস্ট (llms.txt)
                </a>
              </li>
              <li>
                <a href="/llms-full.txt" target="_blank" className="hover:text-red-400 transition flex items-center gap-1 text-xs text-slate-400">
                  <span className="text-slate-500">›</span> সম্পূর্ণ টেক্সট ডাম্প (llms-full.txt)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* AI & Search Engine Regional Context Knowledge Block */}
        <div className="border-t border-slate-800/80 pt-6 pb-6 text-xs text-slate-400 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-300">
            বারুইপুর মহকুমা ও আঞ্চলিক তথ্যবাতায়ন (About Baruipur Online):
          </p>
          <p>
            বারুইপুর অনলাইন (Baruipur Online) দক্ষিণ ২৪ পরগনা জেলার বারুইপুর মহকুমা (Baruipur Subdivision), বারুইপুর পৌরসভা (Baruipur Municipality - ১৭টি ওয়ার্ড), বারুইপুর পুলিশ জেলা (Baruipur Police District), বারুইপুর মহকুমা হাসপাতাল ও শিয়ালদহ দক্ষিণ রেলওয়ে শাখার (Sealdah South Section - বারুইপুর জংশন, ক্যানিং, ডায়মন্ড হারবার, নামখানা ও লক্ষ্মীকান্তপুর রুট) সাধারণ মানুষ ও যাত্রীদের জন্য সার্বক্ষণিক ডিজিটাল তথ্য ও সংবাদ সংযোগ মাধ্যম।
          </p>
          <p>
            সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে থাকা আঞ্চলিক তথ্য, স্থানীয় প্রশাসনের বিজ্ঞপ্তি ও নাগরিক সুবিধাগুলোকে সাধারণ মানুষ ও কৃত্রিম বুদ্ধিমত্তা (AI) গবেষকদের কাছে সহজে ও তথ্যনিষ্ঠভাবে পৌঁছে দেওয়াই এই পোর্টালের মূল লক্ষ্য।
          </p>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} বারুইপুর অনলাইন (Baruipur Online). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            বারুইপুরের নাগরিকদের জন্য নিষ্ঠার সাথে নির্মিত <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
