import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুরের উৎসব ও সাংস্কৃতিক অনুষ্ঠান ক্যালেন্ডার ২০২৬ (Events Guide) | Baruipur Online',
  description: 'ঐতিহাসিক বারুইপুর রাসমেলা, দুর্গাপূজা, রাস উৎসব, কালীপূজা ও স্থানীয় সাংস্কৃতিক উৎসবের পূর্ণাঙ্গ বার্ষিক সময়সূচি ও নির্দেশিকা।',
  alternates: {
    canonical: 'https://baruipur.online/events/',
  }
};

export default function EventsPage() {
  const annualCalendar = [
    { month: 'জানুয়ারি (January)', event: 'বারুইপুর বইমেলা ও সরস্বতী পূজা', location: 'বারুইপুর রাসমাঠ ও বিদ্যালয় প্রাঙ্গণ', highlight: 'বার্ষিক বই প্রদর্শনী ও বিদ্যাদেবীর আরাধনা' },
    { month: 'মার্চ (March)', event: 'মহাশিবরাত্রি ও দোলযাত্রা', location: 'শিবানীপীঠ ও রাজবাড়ি মন্দির প্রাঙ্গণ', highlight: 'ঐতিহাসিক আবীর খেলা ও ভক্ত সমাগম' },
    { month: 'এপ্রিল (April)', event: 'পয়লা বৈশাখ ও চৈত্র সংক্রান্তি মেলা', location: 'কাছারি বাজার ও স্টেশন সংলগ্ন অঞ্চল', highlight: 'হালখাতা ও বাংলা নববর্ষের সাংস্কৃতিক অনুষ্ঠান' },
    { month: 'জুলাই (July)', event: 'রথযাত্রা মহোৎসব', location: 'বারুইপুর জগন্নাথ মন্দির ও সদাব্রত ঘাট', highlight: 'ঐতিহ্যবাহী রথটান ও মেলা' },
    { month: 'সেপ্টেম্বর (September)', event: 'বিশ্বকর্মা পূজা ও গণেশোৎসব', location: 'স্টেশন স্ট্যান্ড ও স্থানীয় বাজার', highlight: 'শিল্পোৎসব ও মণ্ডপ সজ্জা' },
    { month: 'অক্টোবর (October)', event: 'শারদীয়া দুর্গাপূজা ও লক্ষ্মীপূজা', location: 'বারুইপুর শহর ও মহকুমার সকল ক্লাব', highlight: 'থিম পূজা, আলোকসজ্জা ও সাংস্কৃতিক আসর' },
    { month: 'নভেম্বর (November)', event: 'ঐতিহাসিক বারুইপুর রাসমেলা ও কালীপূজা', location: 'বারুইপুর রাসমাঠ', highlight: '২৫০+ বছরের প্রাচীন রাজবাড়ির মেলা ও ১৫ দিনব্যাপী লোকউৎসব' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">উৎসব ও অনুষ্ঠান</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          ঐতিহ্য ও সাংস্কৃতিক উৎসব
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
          বারুইপুরের উৎসব ও অনুষ্ঠান নির্দেশিকা
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          শতবর্ষ প্রাচীন রাসমেলা থেকে শুরু করে দুর্গাপূজা, বইমেলা ও ক্রীড়া প্রতিযোগিতা—বারুইপুরের সাংস্কৃতিক উৎসবের ২০২৬ সালের বার্ষিক ক্যালেন্ডার।
        </p>
      </div>

      <div className="space-y-10">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            ঐতিহ্যবাহী মেলা স্পটলাইট
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            ঐতিহাসিক বারুইপুর রাসমেলা (Baruipur Rash Mela)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            ১৭৫০-এর দশকে বারুইপুরের রায়চৌধুরী জমিদার পরিবারের হাত ধরে শুরু হওয়া বারুইপুর রাসমেলা দক্ষিণ ২৪ পরগনার অন্যতম বৃহত্তম এবং প্রাচীনতম লোকউৎসব। প্রতি বছর কার্তিক পূর্ণিমায় মদনমোহন জিউর শোভাযাত্রার মাধ্যমে এই উৎসব শুরু হয়। রাসমাঠ জুড়ে আয়োজিত ১৫ দিনব্যাপী এই মেলায় লক্ষাধিক দর্শনার্থীর সমাগম ঘটে। কৃষি সরঞ্জাম, হস্তশিল্প, নাগরদোলা ও মিষ্টির দোকান এই মেলার অন্যতম আকর্ষণ।
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-amber-200">📍 স্থান: বারুইপুর রাসমাঠ</span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-amber-200">📅 সময়কাল: প্রতি বছর নভেম্বর (কার্তিক পূর্ণিমা)</span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-amber-200">🎟️ প্রবেশমূল্য: সম্পূর্ণ বিনামূল্যে</span>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-red-50 text-red-600">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">বারুইপুর বার্ষিক সাংস্কৃতিক ক্যালেন্ডার ২০২৬</h2>
              <p className="text-xs sm:text-sm text-slate-500">মাসভিত্তিক উৎসব, মেলার স্থান ও বিশিষ্টতা</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3 border-b">মাস</th>
                  <th className="p-3 border-b">প্রধান উৎসব বা অনুষ্ঠান</th>
                  <th className="p-3 border-b">স্থান</th>
                  <th className="p-3 border-b">বিশিষ্টতা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {annualCalendar.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.month}</td>
                    <td className="p-3 font-semibold text-red-600">{row.event}</td>
                    <td className="p-3 text-slate-600">{row.location}</td>
                    <td className="p-3 text-slate-600">{row.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
