import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, TrainTrack, Bus, Navigation } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুর পরিবহন গাইড: লোকাল ট্রেন, বাস রুট ও বাইপাস নির্দেশিকা | Baruipur Online',
  description: 'শিয়ালদহ দক্ষিণ রেলওয়ে বারুইপুর জংশন লোকাল ট্রেনের সময়সূচি ও রুট (ক্যানিং, ডায়মন্ড হারবার, নামখানা), কলকাতা-বারুইপুর বাস নেটওয়ার্ক এবং ৪-লেনের বাইপাস নির্দেশিকা।',
  alternates: {
    canonical: 'https://baruipur.online/transport/',
  }
};

export default function TransportPage() {
  const trainRoutes = [
    { destination: 'শিয়ালদহ (Sealdah)', frequency: 'প্রতি ১০-১৫ মিনিট অন্তর', duration: '৪৫-৫৫ মিনিট', firstTrain: '০৩:৫০ ভোর', lastTrain: '২৩:৩৫ রাত' },
    { destination: 'ডায়মন্ড হারবার (Diamond Harbour)', frequency: 'প্রতি ২০-৩০ মিনিট অন্তর', duration: '৫০-৬০ মিনিট', firstTrain: '০৪:১৫ ভোর', lastTrain: '২৩:১০ রাত' },
    { destination: 'ক্যানিং (Canning - Sundarbans)', frequency: 'প্রতি ২৫-৩৫ মিনিট অন্তর', duration: '৪০-৫০ মিনিট', firstTrain: '০৪:০০ ভোর', lastTrain: '২২:৪৫ রাত' },
    { destination: 'লক্ষ্মীকান্তপুর ও নামখানা (Namkhana)', frequency: 'প্রতি ৩০-৪০ মিনিট অন্তর', duration: '১ ঘণ্টা ২৫ মিনিট', firstTrain: '০৪:৩০ ভোর', lastTrain: '২২:১৫ রাত' }
  ];

  const busRoutes = [
    { route: 'গড়িয়া - বারুইপুর (Baruipur Bypass)', type: 'সরকারি ও মিনিবাস', frequency: 'প্রতি ৫-১০ মিনিট', stops: 'গড়িয়া মোড়, রাজপুর, হরিনাভি, সুভাষগ্রাম, পদ্মপুকুর, বারুইপুর স্টেশন' },
    { route: 'হাওড়া / ধর্মতলা - বারুইপুর (SD/C Series)', type: 'WBTC ও প্রাইভেট বাস', frequency: 'প্রতি ১৫-২০ মিনিট', stops: 'ধর্মতলা, এক্সাইড, গড়িয়াহাট, যাদবপুর, গড়িয়া, বারুইপুর কাছারি' },
    { route: 'বারুইপুর - আমতলা (Amtala Connector)', type: 'রুট বাস ও অটো', frequency: 'প্রতি ১৫ মিনিট', stops: 'বারুইপুর পুরাতন বাজার, পোলঘাট, আমতলা ক্রসিং' },
    { route: 'বারুইপুর - জয়নগর ও মন্দিরবাজার', type: 'বাস ও ট্রেকার', frequency: 'প্রতি ২০ মিনিট', stops: 'কুলপি রোড ধরে পদ্মপুকুর, দক্ষিণ বারুইপুর, জয়নগর বাজার' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">পরিবহন ও যাতায়াত</span>
      </nav>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <TrainTrack className="w-3.5 h-3.5" />
          যাতায়াত ও গণপরিবহন হাব
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
          বারুইপুর পরিবহন ও ট্রেন নির্দেশিকা
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          শিয়ালদহ দক্ষিণ রেলওয়ে জংশন, ৪-লেনের আধুনিক বাইপাস এবং কলকাতা-দক্ষিণ ২৪ পরগনার প্রধান বাস ও অটো রুটের পূর্ণাঙ্গ সময়সূচি ও গাইড।
        </p>
      </div>

      <div className="space-y-10">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <TrainTrack className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">বারুইপুর জংশন রেলওয়ে (শিয়ালদহ দক্ষিণ শাখা)</h2>
              <p className="text-xs sm:text-sm text-slate-500">৪টি প্ল্যাটফর্ম | প্রতিদিন আড়াই লক্ষাধিক নিত্যযাত্রী</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3 border-b">গন্তব্য ও লাইন</th>
                  <th className="p-3 border-b">ফ্রিকোয়েন্সি</th>
                  <th className="p-3 border-b">সময়কাল</th>
                  <th className="p-3 border-b">প্রথম ট্রেন</th>
                  <th className="p-3 border-b">শেষ ট্রেন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainRoutes.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{r.destination}</td>
                    <td className="p-3 text-slate-600">{r.frequency}</td>
                    <td className="p-3 text-slate-600">{r.duration}</td>
                    <td className="p-3 font-semibold text-emerald-700">{r.firstTrain}</td>
                    <td className="p-3 font-semibold text-rose-700">{r.lastTrain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs text-blue-950">
            <strong>যাত্রী সহায়িকা:</strong> প্ল্যাটফর্ম ১ ও ২ দিয়ে সাধারণত শিয়ালদহগামী ও প্ল্যাটফর্ম ৩ ও ৪ দিয়ে ক্যানিং, ডায়মন্ড হারবার ও নামখানাগামী ট্রেন চলাচল করে। রেলওয়ে হেল্পলাইন নম্বর: <strong>139</strong>।
          </div>
        </section>

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
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>অটো স্ট্যান্ড:</strong> ১ ও ৪ নম্বর প্ল্যাটফর্ম সংলগ্ন (পদ্মপুকুর, মাদারাত, চম্পাহাটি)
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>টোটো রুট:</strong> স্টেশন থেকে রাসমাঠ, কাছারি বাজার ও হাসপাতাল
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>ট্যাক্সি ও অ্যাপ ক্যাব:</strong> বাইপাস সংলগ্ন এলাকায় ওলা, উবার ও প্রি-পেইড অটো উপলব্ধ
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
