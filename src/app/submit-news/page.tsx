'use client';

import React, { useState } from 'react';
import { ChevronRight, Newspaper, Send, Upload, CheckCircle2 } from 'lucide-react';

export default function SubmitNewsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [newsData, setNewsData] = useState({
    name: '',
    phone: '',
    location: '',
    category: 'পৌরসভা ও নাগরিক সমস্যা',
    headline: '',
    description: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsData.consent) {
      alert('অনুগ্রহ করে তথ্যের সত্যতা নিশ্চিতের বক্সে টিক চিহ্ন দিন।');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">নাগরিক সংবাদ জমা দিন</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-8 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          সিটিজেন জার্নালিজম
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          আপনার এলাকার খবর পাঠান (Submit Local News)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          আপনার পাড়া, ওয়ার্ড বা পঞ্চায়েতের কোনো জরুরি ঘটনা, সমস্যা, উৎসব বা সাফল্যের খবর আমাদের জানান। যাচাইয়ের পর তা বারুইপুর অনলাইনে প্রকাশিত হবে।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center text-emerald-900">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">আপনার খবরটি জমা হয়েছে!</h2>
            <p className="text-sm text-emerald-700 max-w-lg mx-auto mb-4">
              বারুইপুর অনলাইন সম্পাদকীয় টিম আপনার প্রেরিত তথ্য যাচাই করে উপযুক্ত হলে তা পোর্টাল ও সোশ্যাল মিডিয়ায় প্রকাশ করবে। নাগরিক সাংবাদিকতায় সহযোগিতার জন্য ধন্যবাদ।
            </p>
            <a href="/" className="inline-block bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition">
              প্রচ্ছদে ফিরে যান
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="পুরো নাম লিখুন"
                  value={newsData.name}
                  onChange={e => setNewsData({ ...newsData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">মোবাইল নম্বর (যাচাইকরণের জন্য) *</label>
                <input
                  type="tel"
                  required
                  placeholder="১০ সংখ্যার ফোন নম্বর"
                  value={newsData.phone}
                  onChange={e => setNewsData({ ...newsData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">ঘটনাস্থল / ওয়ার্ড / এলাকা *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বারুইপুর স্টেশন রোড / ওয়ার্ড ৭"
                  value={newsData.location}
                  onChange={e => setNewsData({ ...newsData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">খবরের বিভাগ *</label>
                <select
                  value={newsData.category}
                  onChange={e => setNewsData({ ...newsData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option>পৌরসভা ও নাগরিক সমস্যা</option>
                  <option>ট্রেন ও যাতায়াত</option>
                  <option>আইনশৃঙ্খলা ও দুর্ঘটনা</option>
                  <option>স্বাস্থ্য ও চিকিৎসা</option>
                  <option>শিক্ষা ও স্কুল-কলেজ</option>
                  <option>উৎসব, মেলা ও সংস্কৃতি</option>
                  <option>অন্যান্য</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">খবরের শিরোনাম *</label>
              <input
                type="text"
                required
                placeholder="সংক্ষিপ্ত ও স্পষ্ট শিরোনাম"
                value={newsData.headline}
                onChange={e => setNewsData({ ...newsData, headline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">বিস্তারিত বিবরণ *</label>
              <textarea
                rows={5}
                required
                placeholder="কী ঘটেছে, কখন ঘটেছে, কারা উপস্থিত ছিলেন এবং বর্তমান পরিস্থিতি কী—বিস্তারিত লিখুন..."
                value={newsData.description}
                onChange={e => setNewsData({ ...newsData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Upload className="w-4 h-4 text-red-600" />
                ছবি বা ভিডিও পাঠানোর নির্দেশিকা:
              </div>
              <p className="text-slate-600">
                ঘটনার ছবি বা ভিডিও থাকলে ফর্ম জমা দেওয়ার পর আমাদের অফিশিয়াল হোয়াটসঅ্যাপে বা ইমেলে (<strong>editor@baruipur.online</strong>) বিবরণ সহ পাঠাতে পারেন।
              </p>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="consent"
                required
                checked={newsData.consent}
                onChange={e => setNewsData({ ...newsData, consent: e.target.checked })}
                className="mt-0.5 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="consent" className="text-slate-600 leading-tight">
                আমি ঘোষণা করছি যে প্রদত্ত তথ্যটি আমার জানা মতে সম্পূর্ণ সত্য এবং কোনো ভুল বা বিভ্রান্তিকর তথ্য নেই। বারুইপুর অনলাইন প্রয়োজনবোধে এই তথ্য সম্পাদনা ও প্রকাশের অধিকার সংরক্ষণ করে।
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow transition"
            >
              <Send className="w-4 h-4" />
              খবর জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
