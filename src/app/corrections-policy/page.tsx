import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, RefreshCw, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সংশোধনী নীতি (Corrections Policy) - বারুইপুর অনলাইন | Baruipur Online',
  description: 'বারুইপুর অনলাইনের তথ্য ত্রুটি সংশোধন প্রক্রিয়া, যোগাযোগের পদ্ধতি এবং স্বচ্ছতা নীতি।',
  alternates: {
    canonical: 'https://baruipur.online/corrections-policy/',
  }
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/about" className="hover:text-red-600 font-medium">আমাদের সম্পর্কে</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">সংশোধনী নীতি</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <RefreshCw className="w-3.5 h-3.5" />
          দায়িত্বশীল তথ্য পরিবেশন
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          ভুল সংশোধন নীতি (Corrections Policy)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          সত্যনিষ্ঠতা আমাদের সর্বোচ্চ অঙ্গীকার। আমাদের কোনো প্রতিবেদনে যদি কোনো তথ্যগত, নাম, তারিখ বা পরিসংখ্যানগত ভুল থাকে, আমরা তা দ্রুত সংশোধন করতে দ্বিধাবোধ করি না।
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            আমাদের সংশোধন প্রক্রিয়া (Correction Workflow)
          </h2>
          <ol className="space-y-3 text-sm list-decimal pl-5 text-slate-600">
            <li><strong>রিপোর্ট গ্রহণ:</strong> পাঠক বা সংশ্লিষ্ট ব্যক্তি যেকোনো খবরের লিঙ্কের সাথে সংশোধনের অনুরোধ ইমেল বা যোগাযোগ ফর্মের মাধ্যমে পাঠাতে পারেন।</li>
            <li><strong>যাচাইকরণ:</strong> অভিযোগ প্রাপ্তির ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমাদের সম্পাদকীয় টিম সংশ্লিষ্ট তথ্য পুনঃযাচাই করে।</li>
            <li><strong>সংশোধন সম্পাদন:</strong> তথ্যগত ভুল প্রমাণিত হলে অবিলম্বে পৃষ্ঠায় আপডেট করা হয় এবং যেখানে প্রযোজ্য সেখানে একটি 'আপডেট বা সংশোধনী' নোট যুক্ত করা হয়।</li>
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            কীভাবে সংশোধনের অনুরোধ পাঠাবেন?
          </h2>
          <p className="text-sm mb-4">
            অনুগ্রহ করে নিম্নলিখিত তথ্যগুলি সহ আমাদের কাছে বার্তা পাঠান:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5 mb-4">
            <div>• সংবাদের লিঙ্ক (URL) বা শিরোনাম</div>
            <div>• কোন তথ্যটি সংশোধন প্রয়োজন (যেমন: ফোন নম্বর, ব্যক্তির নাম, সাল, পদবী)</div>
            <div>• সঠিক তথ্য এবং তার সমর্থনে যেকোনো নির্ভরযোগ্য প্রমাণ বা তথ্যসূত্র</div>
            <div>• আপনার নাম ও যোগাযোগের ফোন নম্বর</div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:corrections@baruipur.online" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition">
              <Mail className="w-4 h-4" />
              ইমেল করুন: corrections@baruipur.online
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-300 transition">
              যোগাযোগ ফর্ম ব্যবহার করুন
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
