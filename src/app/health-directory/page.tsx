import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import HealthcareListClient from '@/components/HealthcareListClient';
import { getAllFacilities, SPECIALTY_OPTIONS } from '@/lib/healthcare';
import { 
  Hospital, 
  Stethoscope, 
  PhoneCall, 
  ShieldCheck, 
  HeartHandshake, 
  ChevronRight, 
  HelpCircle,
  Building2,
  Pill,
  Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার গাইড | নার্সিং হোম, পলিক্লিনিক ও ওপিডি সময়সূচি',
  description: 'বারুইপুরের সমস্ত বেসরকারি নার্সিং হোম, মাল্টি-স্পেশালিটি হাসপাতাল, ডাক্তারের চেম্বার ও ওপিডি মেডিসিন শপের সম্পূর্ণ তালিকা। বিশেষজ্ঞ চিকিৎসকদের নাম, ভিজিটিং বার, সময়, ফি ও সিরিয়াল বুকিং ফোন নম্বর।',
  alternates: {
    canonical: 'https://baruipur.online/health-directory/',
  },
  openGraph: {
    title: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার ডিরেক্টরি - Baruipur Online',
    description: 'নার্সিং হোম, পলিক্লিনিক, মেডিসিন শপ ওপিডি এবং বিশেষজ্ঞ চিকিৎসকদের সময়সূচি ও অ্যাপয়েন্টমেন্ট ফোন নম্বর।',
    url: 'https://baruipur.online/health-directory/',
    type: 'website',
  }
};

export default function HealthcareDirectoryPage() {
  const facilities = getAllFacilities();
  const totalDoctors = facilities.reduce((sum, f) => sum + f.doctors.length, 0);

  // Schema.org MedicalWebPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'বারুইপুর স্বাস্থ্য, নার্সিং হোম ও ডাক্তার চেম্বার ওপিডি ডিরেক্টরি',
    description: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার সমস্ত হাসপাতাল, নার্সিং হোম, পলিক্লিনিক এবং বিশেষজ্ঞ ডাক্তারদের ওপিডি সময়সূচি ও বুকিং তথ্য।',
    url: 'https://baruipur.online/health-directory/',
    about: {
      '@type': 'MedicalCondition',
      name: 'Healthcare Services and Medical Consultation in Baruipur'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Baruipur Online',
      url: 'https://baruipur.online'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-red-600 transition">প্রচ্ছদ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-red-600">স্বাস্থ্য ও ডাক্তার চেম্বার ডিরেক্টরি</span>
          </nav>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8 pointer-events-none">
              <Hospital className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-bold mb-4">
                <HeartHandshake className="w-4 h-4 text-rose-200" />
                <span>বারুইপুর ও দক্ষিণ ২৪ পরগনা স্বাস্থ্য ডিরেক্টরি</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                বারুইপুর স্বাস্থ্য, নার্সিং হোম ও ডাক্তার চেম্বার গাইড
              </h1>

              <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-medium mb-6">
                বারুইপুর মহকুমার সমস্ত বেসরকারি নার্সিং হোম, পলিক্লিনিক ও মেডিসিন শপ যেখানে ডাক্তারদের ওপিডি হয়—তাদের নির্ভরযোগ্য তালিকা। প্রতিটি প্রতিষ্ঠানের নাম, ঠিকানা, অ্যাপয়েন্টমেন্ট বুকিং নম্বর এবং কোন কোন স্পেশালিস্ট ডাক্তার বসেন তার সার্বিক নির্দেশিকা। সম্পূর্ণ ডাক্তারের ওপিডি শিডিউল দেখতে সংশ্লিষ্ট প্রতিষ্ঠানের প্রোফাইল লিঙ্কে ক্লিক করুন।
              </p>

              {/* Quick Summary Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-900 font-bold">
                <div className="bg-white/95 rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-red-600">{facilities.length} টি</div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">স্বাস্থ্যকেন্দ্র ও চেম্বার</div>
                </div>
                <div className="bg-white/95 rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-blue-600">{totalDoctors}+ জন</div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">অভিজ্ঞ বিশেষজ্ঞ ডাক্তার</div>
                </div>
                <div className="bg-white/95 rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-emerald-600">১৬+ টি</div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">চিকিৎসা বিভাগ</div>
                </div>
                <div className="bg-white/95 rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-amber-600">২৪x৭</div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">জরুরি ও ট্রমা সহায়তা</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Notice Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <PhoneCall className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-amber-900">
                  জরুরি পরিস্থিতিতে সরাসরি সরকারি সহায়তা ও অ্যাম্বুলেন্স:
                </h2>
                <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
                  বারুইপুর মহকুমা হাসপাতাল ইমার্জেন্সি: <strong className="font-bold">033-2433-8244</strong> | সরকারি অ্যাম্বুলেন্স: <strong className="font-bold">102</strong> | জাতীয় জরুরি হেল্পলাইন: <strong className="font-bold">112</strong>
                </p>
              </div>
            </div>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex-shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>জরুরি ডায়াল ১১২</span>
            </a>
          </div>

          {/* Interactive Healthcare List Component */}
          <HealthcareListClient facilities={facilities} />

          {/* Helpful Information & Patient Guide Section */}
          <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-red-600" />
              <span>বারুইপুরে ডাক্তার বুকিং ও স্বাস্থ্যসেবা নির্দেশিকা (FAQ)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="text-red-600 font-black">১.</span> ডাক্তারের ওপিডি সিরিয়াল কীভাবে বুক করবেন?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  প্রতিটি চেম্বারের নামের পাশে থাকা <strong className="text-slate-800">"কল করুন"</strong> অথবা <strong className="text-slate-800">"হোয়াটসঅ্যাপ"</strong> বাটনে ক্লিক করে সরাসরি ক্লিনিকে যোগাযোগ করুন। সাধারণত ১ দিন বা কয়েক ঘণ্টা আগে ফোন করে সিরিয়াল নম্বর সংগ্রহ করা সুবিধাজনক।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="text-red-600 font-black">২.</span> বারুইপুরে কোন নার্সিং হোমে স্বাস্থ্যসাথী কার্ড চলে?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  ওয়েলকিন মেডিকেয়ার হাসপাতাল, প্যারামাউন্ট নার্সিং হোম এবং বারুইপুর হসপিটাল অ্যান্ড রিসার্চ ইনস্টিটিউটে স্বাস্থ্যসাথী কার্ড ও সরকার অনুমোদিত ক্যাশলেস প্যাকেজে অস্ত্রোপচার ও ভর্তি সেবা উপলব্ধ। এছাড়া সরকারি মহকুমা হাসপাতালে সমস্ত চিকিৎসা সম্পূর্ণ বিনামূল্যে।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="text-red-600 font-black">৩.</span> ওষুধের দোকানে কি অভিজ্ঞ ডাক্তার বসেন?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  হ্যাঁ, ফ্রাঙ্ক রস ফার্মেসি, অ্যাপোলো ক্লিনিক ও স্থানীয় বিখ্যাত ওষুধের দোকানগুলিতে (যেমন মণ্ডল মেডিকেল) প্রতিদিন সকালে ও সন্ধ্যায় মেডিসিন, শিশু ও চর্মরোগের সিনিয়র চিকিৎসকরা নির্ধারিত সময়ে রোগী দেখেন।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="text-red-600 font-black">৪.</span> ডাক্তারদের ভিজিটিং ফি বা দক্ষিণা কেমন?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  বারুইপুর এলাকায় জেনারেল ফিজিশিয়ানদের পরামর্শ ফি সাধারণত ₹ ৪০০ থেকে ₹ ৬০০ এবং সুপার স্পেশালিস্ট (কার্ডিওলজি, নিউরোলজি, ইউরোলজি) চিকিৎসকদের ফি ₹ ৭০০ থেকে ₹ ৯০০-এর মধ্যে থাকে। সরকারি মহকুমা হাসপাতালে টিকিট ফি মাত্র ₹২।
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 text-center">
              * দাবিত্যাগ: চিকিৎসকদের বসার দিন ও সময়সূচি ক্লিনিক কর্তৃপক্ষের অভ্যন্তরীণ নিয়মে পরিবর্তন সাপেক্ষ। দর্শনের পূর্বে প্রদত্ত ফোনে কনফার্ম করে নেওয়া সমীচীন।
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
