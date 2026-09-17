import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, Building2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর নাগরিক ও সরকারি পরিষেবা নির্দেশিকা (Citizen Services) | Baruipur Online',
  description: 'বারুইপুর পৌরসভা জন্ম-মৃত্যু সনদ, ট্রেড লাইসেন্স, মিউটেশন, পুলিশ সহায়তা, এসডিও-বিডিও শংসাপত্র ও সরকারি প্রকল্পের নির্দেশিকা।',
  alternates: {
    canonical: 'https://baruipur.online/citizen-services/',
  }
};

export default function CitizenServicesPage() {
  const services = [
    {
      title: 'বারুইপুর পৌরসভা নাগরিক সেবা (Municipal Services)',
      desc: '১৭টি ওয়ার্ডের বাসিন্দাদের জন্য নিয়মিত নাগরিক ও পুর পরিষেবা',
      items: [
        { name: 'জন্ম ও মৃত্যু শংসাপত্র (Birth & Death Certificate)', req: 'হাসপাতালের ডিসচার্জ সার্টিফিকেট, পিতামাতার আধার ও আবেদনপত্র', time: '৭-১৫ কার্যদিবস' },
        { name: 'নতুন ট্রেড লাইসেন্স ও নবায়ন (Trade License)', req: 'দোকান/ব্যবসার চুক্তিপত্র, ট্যাক্স রসিদ ও পরিচয়পত্র', time: '৩-৭ কার্যদিবস' },
        { name: 'সম্পত্তি কর ও মিউটেশন (Property Tax & Mutation)', req: 'দলিল, পরচা ও পূর্ববর্তী বছরের খাজনা রসিদ', time: 'পৌর কর বিভাগ' },
        { name: 'নতুন পানীয় জল সংযোগ (Water Connection)', req: 'গৃহস্থালির মালিকানা প্রমাণ ও পৌর আবেদনপত্র', time: 'জল সরবরাহ বিভাগ' }
      ]
    },
    {
      title: 'পুলিশ ও আইনি সহায়তা (Police Assistance)',
      desc: 'বারুইপুর পুলিশ জেলা ও স্থানীয় থানার আইনি সেবা',
      items: [
        { name: 'এফআইআর ও সাধারণ ডায়েরি (FIR & GD)', req: 'নিকটস্থ থানায় লিখিত অভিযোগ বা পশ্চিমবঙ্গ পুলিশের অনলাইন পোর্টাল', time: 'অবিলম্বে' },
        { name: 'মহিলা থানার বিশেষ সহায়তা (Women Assistance)', req: 'পারিবারিক অশান্তি ও নারী নির্যাতনের বিরুদ্ধে বিশেষ কাউন্সেলিং সেল', time: '২৪ ঘণ্টা হেল্পলাইন' },
        { name: 'সাইবার ক্রাইম অভিযোগ (Cyber Crime Reporting)', req: 'লেনদেনের স্ক্রিনশট, ব্যাঙ্ক স্টেটমেন্ট ও অভিযোগপত্র (cybercrime.gov.in)', time: '২৪ ঘণ্টা' }
      ]
    },
    {
      title: 'মহকুমা (SDO) ও ব্লক (BDO) প্রশাসনিক সেবা',
      desc: 'সরকারি শংসাপত্র ও সমাজকল্যাণমূলক প্রকল্পের সুবিধা',
      items: [
        { name: 'জাতিগত শংসাপত্র (SC / ST / OBC Certificate)', req: 'বংশতালিকা, রক্তসম্পর্কের প্রমাণ ও স্থায়ী বাসিন্দার প্রমাণপত্র', time: 'SDO অফিস বারুইপুর' },
        { name: 'লক্ষ্মীর ভাণ্ডার ও কন্যাশ্রী প্রকল্প', req: 'স্বাস্থ্যসাথী কার্ড, আধার কার্ড ও ব্যাঙ্ক পাসবই', time: 'স্থানীয় পঞ্চায়েত বা পৌরসভা' },
        { name: 'বার্ধক্য ও বিধবা ভাতা (Social Pensions)', req: 'বয়সের প্রমাণপত্র, পারিবারিক আয়ের শংসাপত্র ও আধার', time: 'BDO অফিস বারুইপুর' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">নাগরিক পরিষেবা</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5" />
          নাগরিক সেবা পোর্টাল
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
          বারুইপুর নাগরিক ও সরকারি পরিষেবা নির্দেশিকা
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          পৌরসভা, পুলিশ প্রশাসন, মহকুমা আদালত ও ব্লক কার্যালয় থেকে প্রয়োজনীয় সরকারি সেবা ও শংসাপত্র পাওয়ার ধাপে ধাপে নির্দেশিকা।
        </p>
      </div>

      <div className="space-y-8">
        {services.map((group, idx) => (
          <section key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{group.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">{group.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{item.name}</h3>
                    <p className="text-xs text-slate-600 mb-3">
                      <strong>প্রয়োজনীয় কাগজপত্র:</strong> {item.req}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>সময়সীমা / দপ্তর:</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">আপনার ওয়ার্ডের কাউন্সিলরকে খুঁজছেন?</h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              বারুইপুর পৌরসভার ১৭টি ওয়ার্ডের বর্তমান কাউন্সিলরদের নাম ও যোগাযোগের ফোন নম্বর তালিকা দেখুন।
            </p>
          </div>
          <a
            href="/places/baruipur-municipality/"
            className="bg-white text-emerald-900 text-xs font-bold px-5 py-2.5 rounded-lg shadow hover:bg-slate-100 transition whitespace-nowrap"
          >
            ১৭ ওয়ার্ড কাউন্সিলর ডিরেক্টরি →
          </a>
        </section>
      </div>
    </div>
  );
}
