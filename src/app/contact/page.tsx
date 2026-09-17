'use client';

import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'সাধারণ তথ্য বা অনুসন্ধান',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">যোগাযোগ</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          ২৪x৭ হেল্পডেস্ক
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          যোগাযোগ করুন (Contact Baruipur Online)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          বারুইপুর সংক্রান্ত যেকোনো তথ্য, বিজ্ঞাপনী অনুসন্ধান, প্রেস বিজ্ঞপ্তি বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-red-600">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">ঠিকানা</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              বারুইপুর অনলাইন সম্পাদকীয় দপ্তর<br />
              বারুইপুর সদর, দক্ষিণ ২৪ পরগনা<br />
              পশ্চিমবঙ্গ - ৭০০১৪৪
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-emerald-600">
              <Mail className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">ইমেল যোগাযোগ</h3>
            </div>
            <p className="text-xs text-slate-600">
              খবর ও তথ্যের জন্য:<br />
              <a href="mailto:editor@baruipur.online" className="text-red-600 font-semibold hover:underline">
                editor@baruipur.online
              </a>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-blue-600">
              <Phone className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">জরুরি হেল্পলাইন</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              জরুরি নাগরিক সহায়তা ও পুলিশ/হাসপাতাল ফোন ডিরেক্টরি দেখতে ভিজিট করুন:
            </p>
            <a href="/emergency-contacts" className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg block text-center border border-blue-200 hover:bg-blue-100 transition">
              জরুরি নম্বর ডিরেক্টরি →
            </a>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            বার্তা পাঠান
          </h2>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-1">আপনার বার্তা সফলভাবে গৃহীত হয়েছে!</h3>
              <p className="text-xs text-emerald-700">
                আমাদের সম্পাদকীয় টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: রাহুল সরকার"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="১০ সংখ্যার মোবাইল নম্বর"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ইমেল আইডি</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">বিষয়</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option>সাধারণ তথ্য বা অনুসন্ধান</option>
                  <option>তথ্য সংশোধন বা অভিযোগ</option>
                  <option>বিজ্ঞাপন বা ব্যবসায়িক ডিরেক্টরি অন্তর্ভুক্তি</option>
                  <option>সংবাদ বা প্রেস রিলিজ</option>
                  <option>অন্যান্য</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">আপনার বার্তা *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="বিস্তারিত বার্তা এখানে লিখুন..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow transition"
              >
                <Send className="w-4 h-4" />
                বার্তা পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
