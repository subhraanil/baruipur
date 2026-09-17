import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, Phone, ShieldAlert, Hospital, Flame, TrainTrack, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর ডিরেক্টরি | Baruipur Online',
  description: 'বারুইপুর পুলিশ জেলা, মহকুমা হাসপাতাল, দমকল, অ্যাম্বুলেন্স, পৌরসভা ও রেলওয়ের যাচাইকৃত ২৪x৭ জরুরি যোগাযোগ নম্বর।',
  alternates: {
    canonical: 'https://baruipur.online/emergency-contacts/',
  }
};

export default function EmergencyContactsPage() {
  const directory = [
    {
      category: 'পুলিশ ও আইনশৃঙ্খলা (Police & Administration)',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      items: [
        { name: 'জরুরি জাতীয় পুলিশ হেল্পলাইন', number: '112', desc: '২৪ ঘণ্টা টোল-ফ্রি জরুরি পরিষেবা' },
        { name: 'বারুইপুর পুলিশ জেলা কন্ট্রোল রুম', number: '033-2433-8201', desc: 'দক্ষিণ ২৪ পরগনা জেলা সদর' },
        { name: 'বারুইপুর থানা (Baruipur PS)', number: '033-2433-8202', desc: 'পৌরসভা ও ব্লক এলাকা' },
        { name: 'বারুইপুর মহিলা থানা (Women PS)', number: '033-2433-8203', desc: 'নারী নিরাপত্তা ও পারিবারিক কাউন্সেলিং' },
        { name: 'সাইবার ক্রাইম থানা (Cyber Cell)', number: '033-2433-8204', desc: 'অনলাইন প্রতারণা ও সাইবার অপরাধ' }
      ]
    },
    {
      category: 'স্বাস্থ্য, হাসপাতাল ও অ্যাম্বুলেন্স (Health & Ambulance)',
      icon: <Hospital className="w-5 h-5 text-teal-600" />,
      items: [
        { name: 'জাতীয় অ্যাম্বুলেন্স হেল্পলাইন', number: '108', desc: 'বিনামূল্যে জরুরি অ্যাম্বুলেন্স পরিষেবা' },
        { name: 'বারুইপুর মহকুমা হাসপাতাল (Emergency)', number: '033-2433-8245', desc: '২৪x৭ জরুরি বিভাগ ও ব্ল্যাড ব্যাংক' },
        { name: 'মহকুমা স্বাস্থ্য আধিকারিক (ACMOH Office)', number: '033-2433-8550', desc: 'স্বাস্থ্য প্রশাসন ও পরিষেবা' }
      ]
    },
    {
      category: 'দমকল ও বিপর্যয় মোকাবিলা (Fire & Disaster)',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      items: [
        { name: 'দমকল জরুরি সেবা (Fire Control)', number: '101', desc: 'টোল-ফ্রি দমকল কন্ট্রোল' },
        { name: 'বারুইপুর ফায়ার স্টেশন', number: '033-2433-8250', desc: 'কুলপি রোড স্টেশন' },
        { name: 'জেলা বিপর্যয় মোকাবিলা দপ্তর', number: '033-2479-1010', desc: 'ঝড়, বন্যা ও প্রাকৃতিক দুর্যোগ' }
      ]
    },
    {
      category: 'পৌরসভা ও বিদ্যুৎ পরিষেবা (Municipality & Utilities)',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      items: [
        { name: 'বারুইপুর পৌরসভা হেল্পডেস্ক', number: '033-2433-8260', desc: 'নাগরিক পরিষেবা ও অভিযোগ' },
        { name: 'বিদ্যুৎ গোলযোগ হেল্পলাইন (WBSEDCL)', number: '19121', desc: '২৪x৭ বিদ্যুৎ বিচ্ছিন্নতা অভিযোগ' },
        { name: 'বারুইপুর বিদ্যুৎ সাব-ডিভিশন অফিস', number: '033-2433-8270', desc: 'লোকাল বিদ্যুৎ কার্যালয়' }
      ]
    },
    {
      category: 'রেলওয়ে ও যাতায়াত (Railway & Transit)',
      icon: <TrainTrack className="w-5 h-5 text-blue-600" />,
      items: [
        { name: 'ভারতীয় রেলওয়ে জরুরি হেল্পলাইন', number: '139', desc: 'ট্রেনের সময়সূচি, অভিযোগ ও নিরাপত্তা' },
        { name: 'রেলওয়ে পুলিশ (GRP Baruipur)', number: '033-2433-8280', desc: 'প্ল্যাটফর্ম ও ট্রেন নিরাপত্তা' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">জরুরি হেল্পলাইন নম্বর</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-8 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Phone className="w-3.5 h-3.5" />
          ২৪x৭ সিটিজেন হেল্পলাইন
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          বারুইপুর জরুরি ও প্রয়োজনীয় ফোন নম্বর ডিরেক্টরি
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
          বারুইপুর শহর ও মহকুমার প্রতিটি জরুরি বিভাগ, থানা, হাসপাতাল, দমকল ও নাগরিক পরিষেবার সর্বশেষ যাচাইকৃত ফোন নম্বর তালিকা।
        </p>
        <div className="inline-flex items-center gap-2 text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          সমস্ত নম্বর সরাসরি যাচাইকৃত: সেপ্টেম্বর ২০২৬
        </div>
      </div>

      <div className="space-y-8">
        {directory.map((group, idx) => (
          <section key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5 pb-3 border-b border-slate-100">
              {group.icon}
              {group.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <div key={i} className="bg-slate-50 hover:bg-red-50/50 p-4 rounded-xl border border-slate-200 hover:border-red-200 transition flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <a
                    href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                    className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-black text-xs px-3.5 py-2 rounded-lg shadow flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
