import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, ShieldCheck, MapPin, Users, Newspaper, Landmark, Compass, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে (About Us) - বারুইপুর অনলাইন | Baruipur Online',
  description: 'বারুইপুর অনলাইন (Baruipur Online) দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার সামগ্রিক ডিজিটাল তথ্যকোষ, সংবাদ পোর্টাল ও নাগরিক নির্দেশিকা প্ল্যাটফর্ম। জানুন আমাদের লক্ষ্য, কভারেজ এবং সম্পাদকীয় নীতি।',
  alternates: {
    canonical: 'https://baruipur.online/about/',
  },
  openGraph: {
    title: 'আমাদের সম্পর্কে - বারুইপুর অনলাইন Baruipur Online',
    description: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার নির্ভরযোগ্য ডিজিটাল তথ্যকোষ ও নাগরিক পোর্টাল।',
    url: 'https://baruipur.online/about/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'বারুইপুর অনলাইন সম্পর্কে (About Baruipur Online)',
    url: 'https://baruipur.online/about/',
    description: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার শীর্ষস্থানীয় স্বাধীন আঞ্চলিক ডিজিটাল তথ্য প্ল্যাটফর্ম।',
    publisher: {
      '@type': 'Organization',
      name: 'বারুইপুর অনলাইন (Baruipur Online)',
      url: 'https://baruipur.online',
      logo: 'https://baruipur.online/icon-512.png',
      sameAs: ['https://facebook.com/baruipur.online']
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">আমাদের সম্পর্কে</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          <Landmark className="w-3.5 h-3.5" />
          বারুইপুরের ডিজিটাল কণ্ঠস্বর
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          আমাদের সম্পর্কে: বারুইপুর অনলাইন
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর অনলাইন শুধুমাত্র একটি স্থানীয় সংবাদ সংকলন নয়—এটি দক্ষিণ ২৪ পরগনার ঐতিহাসিক ও দ্রুত বর্ধনশীল বারুইপুর মহকুমার একটি নির্ভরযোগ্য, আধুনিক এবং পূর্ণাঙ্গ <strong>ডিজিটাল তথ্য ও নাগরিক নির্দেশিকা প্ল্যাটফর্ম</strong>।
        </p>
      </div>

      <div className="space-y-10 text-slate-700 leading-relaxed">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Compass className="w-6 h-6 text-red-600" />
            আমাদের লক্ষ্য ও উদ্দেশ্য (Our Mission)
          </h2>
          <p className="mb-4">
            কলকাতা সংলগ্ন দক্ষিণ ২৪ পরগনার প্রধান প্রশাসনিক কেন্দ্র বারুইপুর মহকুমা। পৌরসভা, পুলিশ জেলা সদর, জংশন রেলওয়ে, মহকুমা আদালত, হাসপাতাল এবং সুন্দরবনের প্রবেশদ্বার হিসেবে এই অঞ্চলের গুরুত্ব অপরিসীম।
          </p>
          <p className="mb-4">
            আমাদের লক্ষ্য বারুইপুরের নাগরিক, ব্যবসায়ী, শিক্ষার্থী, পর্যটক এবং নিত্যযাত্রীদের এক ছাতার তলায় সত্যনিষ্ঠ আঞ্চলিক সংবাদ, যাচাইকৃত নাগরিক সেবা, জরুরি হেল্পলাইন ও সহায়ক গাইড পৌঁছে দেওয়া। আমরা ক্লিকবেইট বা অপ্রাসঙ্গিক বিজ্ঞাপনের ভিড়ে স্থানীয় মানুষের প্রকৃত তথ্যপ্রয়োজনীয়তাকে অগ্রাধিকার দিই।
          </p>
        </section>

        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            প্ল্যাটফর্মের ৬টি প্রধান স্তম্ভ (The 6 Pillars)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-red-600" />
                ১. স্থানীয় সংবাদ (Local News)
              </h3>
              <p className="text-xs text-slate-600">
                পৌরসভা, পুলিশ প্রশাসন, আইন-শৃঙ্খলা, শিক্ষা ও আঞ্চলিক ঘটনাবলীর ক্রস-ভেরিফাইড তথ্যবহুল প্রতিবেদন।
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-600" />
                ২. বারুইপুর ডিরেক্টরি (Directory)
              </h3>
              <p className="text-xs text-slate-600">
                সরকারি দপ্তর, হাসপাতাল, বিদ্যালয়, কলেজ, বাজার, ব্যাঙ্ক ও প্রয়োজনীয় প্রতিষ্ঠানের যাচাইকৃত ঠিকানা ও ফোন নম্বর।
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                ৩. স্পেশাল গাইড (Pillar Guides)
              </h3>
              <p className="text-xs text-slate-600">
                দর্শনীয় স্থান, ঐতিহ্যবাহী রাজবাড়ি, কেনাকাটার বাজার, রেস্তোরাঁ ও খাদ্য সংস্কৃতি এবং শিক্ষাপ্রতিষ্ঠানের স্থায়ী তথ্যকোষ।
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-purple-600" />
                ৪. নাগরিক পরিষেবা (Citizen Services)
              </h3>
              <p className="text-xs text-slate-600">
                পৌরসভার জন্ম-মৃত্যু সনদ, ট্রেড লাইসেন্স, মিউটেশন, পুলিশ সহায়তা ও বিদ্যুৎ বিল সমাধানের নির্দেশিকা।
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                ৫. পরিবহন ও যাতায়াত (Transport)
              </h3>
              <p className="text-xs text-slate-600">
                শিয়ালদহ দক্ষিণ রেলওয়ে লোকাল ট্রেনের রুট, বাস পরিষেবা, বারুইপুর বাইপাস এবং স্থানীয় অটো/টোটো রুট।
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                ৬. উৎসব ও সংস্কৃতি (Events & Culture)
              </h3>
              <p className="text-xs text-slate-600">
                ঐতিহাসিক বারুইপুর রাসমেলা, দুর্গাপূজা, রাস উৎসব, কালীপূজা ও আঞ্চলিক সাংস্কৃতিক অনুষ্ঠানের ক্যালেন্ডার।
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            আমাদের ভৌগোলিক পরিধি (Geographic Coverage)
          </h2>
          <p className="mb-4">
            বারুইপুর অনলাইন প্রধানত <strong>বারুইপুর পৌরসভা</strong> (১৭টি ওয়ার্ড) এবং <strong>বারুইপুর ব্লক</strong> (১৯টি গ্রাম পঞ্চায়েত)-কে কেন্দ্র করে পরিচালিত। এর পাশাপাশি আমরা সংলগ্ন অঞ্চলসমূহের তথ্য অন্তর্ভুক্ত করি:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">বারুইপুর সদর ও পুর এলাকা</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">সুভাষগ্রাম ও কোদালিয়া</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">পদ্মপুকুর ও যোগীবটতলা</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">মাদারাত ও ধপধপি</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">চম্পাহাটি ও কল্যাণপুর</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">সোনারপুর মহকুমা সংযোগ</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">জয়নগর ও মজিলপুর</div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-center">ক্যানিং ও সুন্দরবন প্রবেশদ্বার</div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            সম্পাদকীয় অঙ্গীকার ও যাচাই প্রক্রিয়া (Editorial Standards)
          </h2>
          <p className="mb-4">
            আমাদের প্ল্যাটফর্মের প্রকাশিত প্রতিটি তথ্য যথাযথ যাচাইয়ের পর অন্তর্ভুক্ত করা হয়। পুলিশি বা প্রশাসনিক সংবাদে স্থানীয় মহকুমা প্রশাসন, বারুইপুর পুলিশ জেলা ও স্থানীয় প্রত্যক্ষদর্শীদের বিবরণ মিলিয়ে নেওয়া হয়।
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/editorial-policy" className="text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 bg-red-50 px-4 py-2 rounded-lg transition">
              সম্পূর্ণ সম্পাদকীয় নীতি পড়ুন →
            </a>
            <a href="/corrections-policy" className="text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg transition">
              সংশোধনী নীতি ও রিপোর্ট →
            </a>
          </div>
        </section>

        <section className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">আমাদের সাথে যোগাযোগ করুন</h2>
            <p className="text-xs sm:text-sm text-red-100">
              আপনার এলাকার খবর, প্রেস রিলিজ বা তথ্য সংশোধনের জন্য আমাদের সম্পাদকীয় ডেস্কে লিখুন।
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/contact" className="bg-white text-red-700 text-xs font-bold px-5 py-2.5 rounded-lg shadow hover:bg-slate-100 transition whitespace-nowrap">
              যোগাযোগ ফর্ম
            </a>
            <a href="/submit-news" className="bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow hover:bg-red-900 transition whitespace-nowrap">
              সংবাদ পাঠান
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
