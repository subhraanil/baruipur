import React from 'react';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FeaturedGuidesSection() {
  const guides = [
    {
      title: 'বারুইপুর দুর্গোৎসব পরিক্রমা: সেরা ১৫টি মণ্ডপ, রুট ও পার্কিং',
      desc: 'পদ্মপুকুর, ফুলতলা ৩ নম্বর গেট, সাহাপাড়া, রাসমাঠ ও সাবর্ণ রাজবাড়ি পূজার রুট ও নো-এন্ট্রি গাইড।',
      category: 'শারদ পরিক্রমা ২০২৬',
      categoryColor: 'bg-red-100 text-red-800 border-red-200',
      href: '/baruipur-durga-puja-parikrama-pandal-guide-2026/'
    },
    {
      title: 'বারুইপুরের সেরা রেস্তোরাঁ, ক্যাফে ও ফুড গাইড',
      desc: 'আমিনিয়া, খাঁটি বিরিয়ানি, ক্যাফে ব্লিস, সুবীর সুইটসের ছানার জিলিপি ও ঐতিহ্যবাহী মিষ্টির ঠিকানা।',
      category: 'খাবার ও ক্যাফে',
      categoryColor: 'bg-orange-100 text-orange-800 border-orange-200',
      href: '/best-restaurants-cafes-and-food-guide-in-baruipur/'
    },
    {
      title: 'বারুইপুরের সেরা বিবাহ ভবন ও ব্যাঙ্কুয়েট হল ডিরেক্টরি',
      desc: 'পৌরসভা উৎসব ভবন, শুভম ব্যাঙ্কুয়েট, আনন্দ লোক, রবীন্দ্র ভবন ও ভেন্যু ধারণক্ষমতা তালিকা।',
      category: 'বিবাহ ভবন ও ভেন্যু',
      categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
      href: '/best-banquet-halls-and-marriage-venues-in-baruipur/'
    },
    {
      title: 'বারুইপুরে ফ্ল্যাট ও জমি কেনার বিশেষজ্ঞ গাইড',
      desc: 'বাইপাস কানেক্টিভিটি, প্রতি স্কয়ার ফুট বাজারদর, পৌরসভা স্যাংশন প্ল্যান ও আইনি চেকলিস্ট।',
      category: 'রিয়েল এস্টেট ও আবাসন',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      href: '/baruipur-real-estate-property-and-flat-buying-guide/'
    },
    {
      title: 'বারুইপুরের সেরা স্কুল: CBSE, ICSE ও WBBSE গাইড',
      desc: 'বারুইপুর হাই স্কুল (১৮৫৮), সেন্ট মন্টফোর্ট, ওয়েলকিন ন্যাশনাল ও ভর্তি সংক্রান্ত পূর্ণাঙ্গ নির্দেশিকা।',
      category: 'শিক্ষা ও বিদ্যায়তন',
      categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      href: '/top-schools-in-baruipur-education-admission-guide/'
    },
    {
      title: 'বারুইপুরের শপিং মল, ব্র্যান্ড শোরুম ও বাজার গাইড',
      desc: 'প্যান্টালুনস, রিলায়েন্স ট্রেন্ডস, পুরাতন বাজার, স্বর্ণালঙ্কার প্রতিষ্ঠান ও পাইকারি বাজার।',
      category: 'কেনাকাটা ও বাজার',
      categoryColor: 'bg-pink-100 text-pink-800 border-pink-200',
      href: '/shopping-malls-and-top-brands-in-baruipur-market-guide/'
    },
    {
      title: 'বারুইপুরের দর্শনীয় স্থান: ঐতিহ্য, প্রকৃতি ও ভ্রমণ গাইড',
      desc: 'রায়চৌধুরী রাজবাড়ি, আরণ্যক ইকো পার্ক, শিবানীপীঠ, মহাপ্রভুতলা ও পর্যটন নির্দেশিকা।',
      category: 'দর্শনীয় স্থান',
      categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
      href: '/best-places-to-visit-in-baruipur-travel-guide/'
    },
    {
      title: 'বারুইপুর ব্লকের ১৯টি গ্রাম পঞ্চায়েত তালিকা ও প্রশাসনিক নির্দেশিকা',
      desc: 'পঞ্চায়েত প্রধান, প্রধান কার্যালয়, ভৌগোলিক সীমানা ও গ্রামীণ নাগরিক পরিষেবা তথ্যবাতায়ন।',
      category: 'প্রশাসন ও পঞ্চায়েত',
      categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
      href: '/baruipur-block-panchayat-list/'
    }
  ];

  return (
    <section id="featured-guides" className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-800 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            স্থায়ী তথ্যকোষ ও নির্দেশিকা
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            বারুইপুর স্পেশাল গাইড (Featured Lifestyle & Civic Guides)
          </h2>
        </div>
        <span className="text-xs text-emerald-400 bg-slate-800 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold self-start sm:self-auto flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          ৮টি যাচাইকৃত বিশেষ গাইড
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {guides.map((g, idx) => (
          <a
            key={idx}
            href={g.href}
            className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/70 hover:border-slate-500 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block mb-2 ${g.categoryColor}`}>
                {g.category}
              </span>
              <h3 className="font-bold text-white group-hover:text-red-300 transition-colors text-sm leading-snug mb-2">
                {g.title}
              </h3>
              <p className="text-xs text-slate-300/90 line-clamp-2 mb-3">
                {g.desc}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-red-400 pt-2 border-t border-slate-700/60">
              <span>সম্পূর্ণ গাইড পড়ুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
