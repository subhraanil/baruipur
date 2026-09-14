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
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">লাইভ</span>
              <h2 className="text-2xl font-black text-white">বারুইপুর</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে এবং দক্ষিণ ২৪ পরগনার প্রত্যন্ত অঞ্চলের প্রতি মুহূর্তের তাজা খবর ও প্রয়োজনীয় নাগরিক তথ্য।
            </p>

          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              সংবাদ বিভাগ
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <a 
                    href={`/category/${cat.slug}`}
                    className="hover:text-red-400 transition flex items-center gap-1.5"
                  >
                    <span className="text-red-500 text-xs">›</span>
                    {cat.nameBn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines preview */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-400" />
              বারুইপুর জরুরি নম্বর
            </h3>
            <ul className="space-y-2 text-xs">
              {EMERGENCY_CONTACTS.slice(0, 4).map((c, i) => (
                <li key={i} className="bg-slate-800/50 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200">{c.titleBn}</div>
                  <a href={`tel:${c.phone.replace(/[^0-9]/g, '')}`} className="text-red-400 font-bold hover:underline">
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links & Admin */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              পোর্টাল ও তথ্যসূত্র
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
                <a href="/llms.txt" target="_blank" className="hover:text-red-400 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> AI ও LLM নির্দেশিকা (llms.txt)
                </a>
              </li>
              <li>
                <a href="/category/municipality" className="hover:text-slate-200 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> বারুইপুর পৌরসভা আপডেট
                </a>
              </li>
              <li>
                <a href="/category/railway" className="hover:text-slate-200 transition flex items-center gap-1">
                  <span className="text-slate-500">›</span> শিয়ালদহ দক্ষিণ ট্রেন খবর
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
