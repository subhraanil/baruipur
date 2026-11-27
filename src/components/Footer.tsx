import React from 'react';
import { ShieldAlert, MessageSquareWarning } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#142B4A] text-slate-200 pt-10 pb-8 mt-12 border-t border-[#1f3d66]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Column 1: Brand & Correction */}
          <div className="space-y-4">
            <a href="/" className="inline-block bg-white rounded-xl p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="বারুইপুর অনলাইন"
                width={210}
                height={52}
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-[14px] text-slate-300 leading-[1.6]">
              বারুইপুর মহকুমা ও পৌরসভার যাচাইকৃত নাগরিক তথ্যকোষ — স্বাস্থ্য, স্থান, সংগঠন, সরকারি নোটিস ও ই-টেন্ডারের নির্ভরযোগ্য ঠিকানা।
            </p>
            <a
              href="/contact?report=true"
              className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[14px] font-medium transition-colors"
            >
              <MessageSquareWarning className="w-4 h-4 shrink-0" />
              <span>ভুল তথ্য সংশোধন করুন</span>
            </a>
          </div>

          {/* Column 2: Directory */}
          <div>
            <h3 className="text-white font-bold text-[18px] mb-3">নাগরিক ডিরেক্টরি</h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href="/health-directory" className="hover:text-white text-slate-300 transition-colors">
                  স্বাস্থ্য ও ডাক্তার ডিরেক্টরি
                </a>
              </li>
              <li>
                <a href="/places" className="hover:text-white text-slate-300 transition-colors">
                  দর্শনীয় স্থান ও ল্যান্ডমার্ক
                </a>
              </li>
              <li>
                <a href="/organizations" className="hover:text-white text-slate-300 transition-colors">
                  সামাজিক সংগঠন ও ক্লাব
                </a>
              </li>
              <li>
                <a href="/transport" className="hover:text-white text-slate-300 transition-colors">
                  লোকাল ট্রেন ও যাতায়াত
                </a>
              </li>
              <li>
                <a href="/property?category=bank_auction" className="hover:text-white text-slate-300 transition-colors">
                  ব্যাংক নিলাম ও প্রপার্টি
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:text-white text-slate-300 transition-colors">
                  আর্টিকেল ও ব্লগ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Government & Emergency */}
          <div>
            <h3 className="text-white font-bold text-[18px] mb-3">সরকারি ও জরুরি</h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href="/notices" className="hover:text-white text-slate-300 transition-colors">
                  সরকারি নোটিস ও সার্কুলার
                </a>
              </li>
              <li>
                <a href="/tenders" className="hover:text-white text-slate-300 transition-colors">
                  পাবলিক ই-টেন্ডার
                </a>
              </li>
              <li>
                <a href="/citizen-services" className="hover:text-white text-slate-300 transition-colors">
                  পৌর ও নাগরিক পরিষেবা
                </a>
              </li>
              <li>
                <a
                  href="/emergency-contacts"
                  className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition-colors"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>২৪/৭ জরুরি হেল্পলাইন</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Sitemaps */}
          <div>
            <h3 className="text-white font-bold text-[18px] mb-3">তথ্য ও নীতিমালা</h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href="/about" className="hover:text-white text-slate-300 transition-colors">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white text-slate-300 transition-colors">
                  যোগাযোগ ও হেল্পডেস্ক
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-white text-slate-300 transition-colors">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-white text-slate-300 transition-colors">
                  আইনি দাবিত্যাগ
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-white text-slate-300 transition-colors">
                  সাইটম্যাপ (XML)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px] text-slate-400">
          <p>© ২০২৬ বারুইপুর অনলাইন (Baruipur Online) — সর্বস্বত্ব সংরক্ষিত।</p>
          <p>সর্বশেষ যাচাই: ২৬ নভেম্বর ২০২৬ • বারুইপুর, দক্ষিণ ২৪ পরগনা</p>
        </div>
      </div>
    </footer>
  );
}
