import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, TrainTrack, Bus, Navigation, MapPin } from 'lucide-react';
import TrainTimetableClient from './TrainTimetableClient';
import trainData from '../../data/train_timetable.json';

export const metadata: Metadata = {
  title: 'বারুইপুর ট্রেন টাইম টেবিল ও পরিবহন গাইড: শিয়ালদহ ও ডায়মন্ড হারবার লোকাল ট্রেনের সময়সূচি | Baruipur Online',
  description: 'বারুইপুর জংশন থেকে শিয়ালদহ ও ডায়মন্ড হারবার লোকাল ট্রেনের সম্পূর্ণ সময়সূচি (Baruipur to Sealdah, Diamond Harbour to Baruipur train timetable), বাস রুট, অটো-টোটো ও বাইপাস নির্দেশিকা।',
  keywords: [
    'baruipur to sealdah train time table',
    'baruipur to diamond harbour train time table',
    'diamond harbour to baruipur train timetable',
    'sealdah to baruipur train time',
    'বারুইপুর ট্রেন টাইম টেবিল',
    'বারুইপুর থেকে শিয়ালদহ ট্রেন সময়সূচি',
    'বারুইপুর থেকে ডায়মন্ড হারবার ট্রেন'
  ],
  alternates: {
    canonical: 'https://baruipur.online/transport/',
  }
};

export default function TransportPage() {
  const busRoutes = [
    { 
      route: 'গড়িয়া - বারুইপুর (Baruipur Bypass)', 
      type: 'সরকারি ও মিনিবাস', 
      frequency: 'প্রতি ৫-১০ মিনিট', 
      stops: 'গড়িয়া মোড়, কামালগাজী, রাজপুর, হরিনাভি, সুভাষগ্রাম, পদ্মপুকুর, বারুইপুর স্টেশন' 
    },
    { 
      route: 'হাওড়া / ধর্মতলা - বারুইপুর (SD/C Series)', 
      type: 'WBTC ও প্রাইভেট বাস', 
      frequency: 'প্রতি ১৫-২০ মিনিট', 
      stops: 'ধর্মতলা, এক্সাইড, গড়িয়াহাট, যাদবপুর, গড়িয়া, বারুইপুর কাছারি' 
    },
    { 
      route: 'বারুইপুর - আমতলা (Amtala Connector)', 
      type: 'রুট বাস ও অটো', 
      frequency: 'প্রতি ১৫ মিনিট', 
      stops: 'বারুইপুর পুরাতন বাজার, শাসন, পোলঘাট, আমতলা ক্রসিং' 
    },
    { 
      route: 'বারুইপুর - জয়নগর ও মন্দিরবাজার', 
      type: 'বাস ও ট্রেকার', 
      frequency: 'প্রতি ২০ মিনিট', 
      stops: 'কুলপি রোড ধরে পদ্মপুকুর, দক্ষিণ বারুইপুর, বহরু, জয়নগর বাজার' 
    },
    { 
      route: 'বারুইপুর - ক্যানিং ও বাসন্তী (Sundarbans Gateway)', 
      type: 'বাস ও অটো সংযোগ', 
      frequency: 'প্রতি ২০-৩০ মিনিট', 
      stops: 'বারুইপুর স্টেশন, চম্পাহাটি, ঘটকপুকুর রোড ক্রসিং, ক্যানিং বাস স্ট্যান্ড' 
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">পরিবহন ও ট্রেন সময়সূচি</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <TrainTrack className="w-3.5 h-3.5" />
          নিত্যযাত্রী ও পরিবহন নির্দেশিকা
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
          বারুইপুর পরিবহন ও সম্পূর্ণ ট্রেন সময়সূচি
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর জংশন থেকে শিয়ালদহ ও ডায়মন্ড হারবার লাইনের সমস্ত আপ ও ডাউন ট্রেনের সঠিক সময়সূচি, ৪-লেন বাইপাস ও কলকাতা-দক্ষিণ ২৪ পরগনার প্রধান বাস রুট নির্দেশিকা।
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Interactive Train Timetable */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                লোকাল ট্রেনের সময়সূচি (Train Time Table)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                বারুইপুর ⇄ ডায়মন্ড হারবার ও বারুইপুর ⇄ শিয়ালদহ রুটের পূর্ণাঙ্গ তালিকা
              </p>
            </div>
          </div>

          <TrainTimetableClient 
            routes={trainData.routes as any} 
            updatedAt={trainData.updatedAt} 
          />
        </section>

        {/* Section 2: Bus Routes */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Bus className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">প্রধান বাস রুট ও টার্মিনাস</h2>
              <p className="text-xs sm:text-sm text-slate-500">কলকাতা, গড়িয়া, আমতলা ও সুন্দরবন সংযোগকারী বাস পরিষেবা</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {busRoutes.map((b, i) => (
              <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{b.route}</h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
                  <span>{b.type}</span> • <span>{b.frequency}</span>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>স্টপেজ:</strong> {b.stops}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Bypass & Local Transit */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Navigation className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">বারুইপুর বাইপাস ও সড়ক যোগাযোগ</h2>
              <p className="text-xs sm:text-sm text-slate-500">কমলগাজী ফ্লাইওভার থেকে বারুইপুর ৪-লেন হাইওয়ে</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            ইস্টার্ন মেট্রোপলিটান বাইপাসের সম্প্রসারিত অংশ হিসেবে কমলগাজী থেকে শুরু হয়ে বারুইপুর বাইপাস সরাসরি দক্ষিণ ২৪ পরগনার প্রশাসনিক সদরকে কলকাতার সাথে যুক্ত করেছে। এই প্রশস্ত ৪-লেনের রাস্তা ধরে গড়িয়া থেকে বারুইপুর পৌঁছাতে সময় লাগে মাত্র ২০ থেকে ২৫ মিনিট।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                অটো স্ট্যান্ড
              </div>
              <p className="text-slate-600">১ ও ৪ নম্বর প্ল্যাটফর্ম সংলগ্ন (পদ্মপুকুর, মাদারাত, চম্পাহাটি, মল্লিকপুর)</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                টোটো রুট
              </div>
              <p className="text-slate-600">স্টেশন থেকে রাসমাঠ, কাছারি বাজার, মহকুমা আদালত ও হাসপাতাল মোড়</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                ট্যাক্সি ও অ্যাপ ক্যাব
              </div>
              <p className="text-slate-600">বাইপাস সংলগ্ন এলাকায় ওলা, উবার, স্ন্যাপ-ই ও প্রি-পেইড অটো উপলব্ধ</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
