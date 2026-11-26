import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, Phone, ShieldAlert, Hospital, Flame, TrainTrack, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর ডিরেক্টরি | Baruipur Online',
  description: 'বারুইপুর পুলিশ জেলা, মহকুমা হাসপাতাল, দমকল, অ্যাম্বুলেন্স, পৌরসভা ও রেলওয়ের যাচাইকৃত ২৪x৭ জরুরি যোগাযোগ নম্বর।',
  alternates: {
    canonical: 'https://baruipur.online/emergency-contacts/',
  },
  openGraph: {
    title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর ডিরেক্টরি',
    description: 'বারুইপুর পুলিশ জেলা, মহকুমা হাসপাতাল, দমকল, অ্যাম্বুলেন্স, পৌরসভা ও রেলওয়ের ২৪x৭ যাচাইকৃত জরুরি যোগাযোগ নম্বর।',
    url: 'https://baruipur.online/emergency-contacts/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/places/baruipur-subdivisional-hospital.jpg',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর জরুরি হেল্পলাইন ও হাসপাতাল ডিরেক্টরি',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর জরুরি হেল্পলাইন ও প্রয়োজনীয় ফোন নম্বর | Baruipur Online',
    description: 'পুলিশ, হাসপাতাল, অ্যাম্বুলেন্স, দমকল ও পৌরসভার ২৪x৭ জরুরি নম্বর ডিরেক্টরি।',
    images: ['https://baruipur.online/images/places/baruipur-subdivisional-hospital.jpg'],
    site: '@BaruipurOnline'
  }
};

export default function EmergencyContactsPage() {
  const directory = [
    {
      category: 'পুলিশ ও আইনশৃঙ্খলা (Police & Administration)',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      items: [
        { name: 'জরুরি জাতীয় পুলিশ হেল্পলাইন', number: '112', desc: '২৪ ঘণ্টা টোল-ফ্রি জরুরি পরিষেবা' },
        { name: 'বারুইপুর পুলিশ জেলা কন্ট্রোল রুম', number: '033-2433-0083', desc: '২৪ ঘণ্টা জেলা পুলিশ কন্ট্রোল (বিকল্প: 033-2433-1312)' },
        { name: 'বারুইপুর পুলিশ সুপার অফিস (SP Office)', number: '033-2433-0010', desc: 'বারুইপুর পুলিশ জেলা সদর দপ্তর' },
        { name: 'কন্ট্রোল রুম মোবাইল (Baruipur PD)', number: '9147888037', desc: 'তাৎক্ষণিক পুলিশ সহায়তা' },
        { name: 'সাইবার ক্রাইম হেল্পলাইন (Cyber Cell)', number: '1930', desc: 'অনলাইন প্রতারণা ও সাইবার অপরাধ' }
      ]
    },
    {
      category: 'স্বাস্থ্য, হাসপাতাল ও অ্যাম্বুলেন্স (Health & Ambulance)',
      icon: <Hospital className="w-5 h-5 text-teal-600" />,
      items: [
        { name: 'জাতীয় অ্যাম্বুলেন্স হেল্পলাইন', number: '102', desc: 'বিনামূল্যে সরকারি অ্যাম্বুলেন্স পরিষেবা (বা 108)' },
        { name: 'বারুইপুর মহকুমা হাসপাতাল (Main)', number: '033-2433-5303', desc: 'কুলপি রোড, বারুইপুর - 700144' },
        { name: 'বারুইপুর হাসপাতাল (Emergency)', number: '8100820190', desc: '২৪x৭ জরুরি বিভাগ ও প্রাথমিক চিকিৎসা' },
        { name: 'বারুইপুর হাসপাতাল (Enquiry)', number: '8100820174', desc: 'সাধারণ অনুসন্ধান ও ওপিডি তথ্য' }
      ]
    },
    {
      category: 'দমকল ও বিপর্যয় মোকাবিলা (Fire & Disaster)',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      items: [
        { name: 'দমকল জরুরি সেবা (Fire Control)', number: '101', desc: 'টোল-ফ্রি দমকল কন্ট্রোল' },
        { name: 'বারুইপুর ফায়ার স্টেশন', number: '033-2433-2555', desc: 'বারুইপুর দমকল কেন্দ্র' }
      ]
    },
    {
      category: 'পৌরসভা, প্রশাসন ও বিদ্যুৎ (Municipality & Admin)',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      items: [
        { name: 'বারুইপুর পৌরসভা কার্যালয়', number: '033-2433-8201', desc: 'কুলপি রোড, বারুইপুর - 700144' },
        { name: 'মহকুমা শাসক দপ্তর (SDO Baruipur)', number: '033-2433-8579', desc: 'বারুইপুর মহকুমা প্রশাসন' },
        { name: 'বিদ্যুৎ গোলযোগ হেল্পলাইন (WBSEDCL)', number: '19121', desc: '২৪x৭ বিদ্যুৎ বিচ্ছিন্নতা অভিযোগ' }
      ]
    },
    {
      category: 'রেলওয়ে ও যাতায়াত (Railway & Transit)',
      icon: <TrainTrack className="w-5 h-5 text-blue-600" />,
      items: [
        { name: 'ভারতীয় রেলওয়ে জরুরি হেল্পলাইন', number: '139', desc: 'ট্রেনের সময়সূচি, অভিযোগ ও নিরাপত্তা' }
      ]
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <nav className="flex items-center gap-1.5 text-[14px] text-[#667085] mb-6">
        <a href="/" className="hover:text-[#245B91] font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-[#142B4A] font-bold">জরুরি হেল্পলাইন নম্বর</span>
      </nav>

      <div className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-[#D93636] text-white text-[14px] font-bold px-3 py-1 rounded-md mb-4">
          <Phone className="w-4 h-4" />
          ২৪x৭ সিটিজেন জরুরি হেল্পলাইন
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
