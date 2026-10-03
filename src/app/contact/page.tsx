'use client';

import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'সাধারণ তথ্য বা অনুসন্ধান',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const recipients = [
      'subhranil.naskar@gmail.com',
      'subhraanilnaskar@gmail.com',
      'editor@baruipur.online'
    ];

    try {
      // 1. Primary delivery via server-side PHP endpoint on cPanel
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({ success: true }));
        if (data.success !== false) {
          setSubmitted(true);
          return;
        }
      }

      // 2. Secondary fallback via FormSubmit if server PHP returns error or not found (e.g. dev mode)
      const fallbackRes = await fetch('https://formsubmit.co/ajax/subhranil.naskar@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _cc: 'subhraanilnaskar@gmail.com,editor@baruipur.online',
          _subject: `[Baruipur Online] নতুন বার্তা: ${formData.subject} - ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (fallbackRes.ok) {
        setSubmitted(true);
        return;
      }

      throw new Error('সার্ভার থেকে সঠিক প্রত্যুত্তর পাওয়া যায়নি।');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        'বার্তা সরাসরি পাঠাতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি আমাদের ইমেলে পাঠান অথবা নিচের বোতামে ক্লিক করুন।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoLink = `mailto:subhranil.naskar@gmail.com,subhraanilnaskar@gmail.com,editor@baruipur.online?subject=${encodeURIComponent(
    `[Baruipur Online] ${formData.subject || 'নতুন অনুসন্ধান'} - ${formData.name || 'বার্তা'}`
  )}&body=${encodeURIComponent(
    `নাম: ${formData.name}\nফোন: ${formData.phone}\nইমেল: ${formData.email}\nবিষয়: ${formData.subject}\n\nবার্তা:\n${formData.message}`
  )}`;

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
              <h3 className="font-bold text-slate-900 text-sm">শারীরিক সংবাদকক্ষ ও প্রধান কার্যালয়</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              <strong>বারুইপুর অনলাইন সম্পাদকীয় দপ্তর</strong><br />
              রেল স্টেশন রোড, বারুইপুর বাজার সংলগ্ন<br />
              পোস্ট ও থানা: বারুইপুর, মহকুমা: বারুইপুর সদর<br />
              জেলা: দক্ষিণ ২৪ পরগনা, পশ্চিমবঙ্গ - ৭০০১৪৪
            </p>
            <p className="text-[11px] text-slate-500">
              🕒 অফিস সময়: সোম - শনি (সকাল ১০:০০ - সন্ধ্যা ৭:০০)
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-purple-600">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">অভিযোগ প্রতিকার কর্মকর্তা (Grievance Officer)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
              <strong>নাম:</strong> শুভ্রনীল নস্কর (প্রধান সম্পাদক)<br />
              <strong>পদবী:</strong> গ্রিভেন্স ও নোডাল অফিসার<br />
              <strong>ইমেল:</strong> <a href="mailto:editor@baruipur.online" className="text-red-600 hover:underline">editor@baruipur.online</a>
            </p>
            <p className="text-[11px] text-slate-500">
              তথ্য প্রযুক্তি (ডিজিটাল মিডিয়া নীতি) বিধি অনুযায়ী যেকোনো কনটেন্ট সংক্রান্ত অভিযোগ ৪৮ ঘণ্টার মধ্যে নিষ্পত্তি করা হয়।
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-emerald-600">
              <Mail className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">সম্পাদকীয় পরিষদ ও ইমেল</h3>
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p>সংবাদ, প্রেস রিলিজ ও বিজ্ঞাপনের জন্য:</p>
              <a href="mailto:editor@baruipur.online" className="text-red-600 font-bold hover:underline block break-all">
                editor@baruipur.online
              </a>
              <div className="pt-2 border-t border-slate-100">
                <a href="/editorial-team" className="text-xs font-bold text-slate-800 hover:text-red-600 flex items-center gap-1">
                  সাংবাদিকদের তালিকা ও বায়ো দেখুন →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-blue-600">
              <Phone className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-sm">জরুরি হেল্পলাইন ডিরেক্টরি</h3>
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
              <p className="text-xs text-emerald-700 mb-4 leading-relaxed">
                আপনার বার্তাটি আমাদের সম্পাদকীয় দপ্তরের ইমেলে পৌঁছে গেছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    subject: 'সাধারণ তথ্য বা অনুসন্ধান',
                    message: ''
                  });
                }}
                className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-4 py-2 rounded-lg transition"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href={mailtoLink}
                    className="self-start text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition"
                  >
                    সরাসরি ইমেল খুলুন →
                  </a>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: রাহুল সরকার"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
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
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ইমেল আইডি</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">বিষয়</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
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
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    বার্তা পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    বার্তা পাঠান
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
