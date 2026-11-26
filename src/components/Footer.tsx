import React from 'react';
import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-red-600">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <a href="/" className="inline-block mb-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="bg-white rounded-xl p-2.5 shadow-sm inline-block group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/logo.png" 
                  alt="বারুইপুর অনলাইন - Baruipur Online" 
                  width={200}
                  height={48}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              বারুইপুর মহকুমা, পৌরসভা ও দক্ষিণ ২৪ পরগনার প্রধান নাগরিক তথ্যকোষ ও ডিরেক্টরি প্ল্যাটফর্ম। স্থান ও ল্যান্ডমার্ক, স্বাস্থ্য পরিষেবা, সমাজকল্যাণ সংগঠন, সরকারি নোটিস ও সক্রিয় ই-টেন্ডারের নির্ভরযোগ্য ঠিকানা।
            </p>
          </div>

          {/* 5 Core Directory Pillars */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              মূল ৫টি ডিরেক্টরি স্তম্ভ
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/places" className="hover:text-amber-400 transition flex items-center gap-1.5 font-bold text-amber-300">
                  <span className="text-amber-500">›</span> স্থান ও ল্যান্ডমার্ক (Places Hub)
                </a>
              </li>
              <li>
                <a href="/organizations" className="hover:text-purple-400 transition flex items-center gap-1.5 font-bold text-purple-300">
                  <span className="text-purple-500">›</span> সংস্থা, ক্লাব ও প্রতিষ্ঠান (Organizations)
                </a>
              </li>
              <li>
                <a href="/health-directory" className="hover:text-rose-400 transition flex items-center gap-1.5 font-bold text-rose-300">
                  <span className="text-rose-500">›</span> স্বাস্থ্য ও হাসপাতাল ডিরেক্টরি (Health)
                </a>
                <div className="pl-4 pt-1 flex flex-wrap gap-x-2.5 gap-y-1 text-xs text-slate-400">
                  <a href="/health-directory?category=hospitals" className="hover:text-rose-300">হাসপাতাল</a>
                  <span>•</span>
                  <a href="/health-directory?category=doctors" className="hover:text-rose-300">ডাক্তার</a>
                  <span>•</span>
                  <a href="/health-directory?category=diagnostic" className="hover:text-rose-300">ডায়াগনস্টিক</a>
                  <span>•</span>
                  <a href="/health-directory?category=swasthya-sathi" className="hover:text-rose-300">স্বাস্থ্যসাথী</a>
                </div>
              </li>
              <li>
                <a href="/notices" className="hover:text-amber-400 transition flex items-center gap-1.5 font-bold text-amber-300">
                  <span className="text-amber-500">›</span> সরকারি জরুরি নোটিস (Official Notices)
                </a>
              </li>
              <li>
                <a href="/tenders" className="hover:text-red-400 transition flex items-center gap-1.5 font-bold text-red-300">
                  <span className="text-red-500">›</span> সরকারি ও পৌর ই-টেন্ডার (Govt Tenders)
                </a>
              </li>
            </ul>
          </div>

          {/* Trust, Governance & Policies */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              নাগরিক তথ্য ও নীতি
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> আমাদের সম্পর্কে (About Us)
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> যোগাযোগ ও হেল্পডেস্ক (Contact)
                </a>
              </li>
              <li>
                <a href="/emergency-contacts" className="hover:text-red-400 transition flex items-center gap-1.5 font-bold text-rose-400">
                  <span className="text-rose-500 text-xs">›</span> ২৪/৭ জরুরি হেল্পলাইন ডিরেক্টরি
                </a>
              </li>
              <li>
                <a href="/citizen-services" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500 text-xs">›</span> নাগরিক পরিষেবা গাইড (Services)
                </a>
              </li>
              <li>
                <a href="/transport" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <span className="text-blue-500 text-xs">›</span> লোকাল ট্রেন ও যাতায়াত (Transport)
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-red-400 transition flex items-center gap-1.5 font-medium text-emerald-300">
                  <span className="text-emerald-500 text-xs">›</span> গোপনীয়তা নীতি (Privacy Policy)
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> ব্যবহারের শর্তাবলী (Terms of Service)
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500 text-xs">›</span> আইনি দাবিত্যাগ (Disclaimer)
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links, SEO & AI Feeds */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              সাইটম্যাপ ও AI ম্যানিফেস্ট
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/sitemap.xml" target="_blank" className="hover:text-red-400 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> XML সাইটম্যাপ (Sitemap)
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
                  <span className="text-slate-500">›</span> সম্পূর্ণ ডিরেক্টরি টেক্সট (llms-full.txt)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* AI & Search Engine Regional Context Knowledge Block */}
        <div className="border-t border-slate-800/80 pt-6 pb-6 text-xs text-slate-400 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-300">
            বারুইপুর মহকুমা ও আঞ্চলিক ডিজিটাল তথ্যকোষ (About Baruipur Civic Directory):
          </p>
          <p>
            বারুইপুর অনলাইন (Baruipur Online) দক্ষিণ ২৪ পরগনা জেলার বারুইপুর মহকুমা ও বারুইপুর পৌরসভার ঐতিহাসিক দর্শনীয় স্থান, স্বাস্থ্যসেবা ও ডাক্তার চেম্বার, সামাজিক প্রতিষ্ঠান ও ক্লাব, সরকারি জরুরি সার্কুলার ও পৌরসভার সক্রিয় ই-টেন্ডারের প্রামাণ্য ডিজিটাল তথ্যকোষ। নাগরিক পরিষেবা সহজীকরণ ও সার্বক্ষণিক তথ্য সরবরাহই এই প্ল্যাটফর্মের মূল লক্ষ্য।
          </p>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} বারুইপুর অনলাইন (Baruipur Online). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-of-service" className="hover:text-white transition">Terms of Service</a>
            <span>•</span>
            <a href="/disclaimer" className="hover:text-white transition">Disclaimer</a>
          </div>
          <p className="flex items-center gap-1">
            বারুইপুরের নাগরিকদের জন্য নিষ্ঠার সাথে নির্মিত <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
