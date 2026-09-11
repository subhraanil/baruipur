import React from 'react';
import { CATEGORIES, EMERGENCY_CONTACTS } from '@/lib/constants';
import { Phone, Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">লাইভ</span>
              <h2 className="text-2xl font-black text-white">বারুইপুর বার্তা</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে এবং দক্ষিণ ২৪ পরগনার প্রত্যন্ত অঞ্চলের প্রতি মুহূর্তের তাজা খবর ও প্রয়োজনীয় নাগরিক তথ্য।
            </p>

          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              সংবাদ বিভাগ
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <a 
                    href={`/category/${cat.slug}`}
                    className="hover:text-red-400 transition flex items-center gap-1.5"
                  >
                    <span className="text-red-500 text-xs">›</span>
                    {cat.nameBn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines preview */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-400" />
              বারুইপুর জরুরি নম্বর
            </h3>
            <ul className="space-y-2 text-xs">
              {EMERGENCY_CONTACTS.slice(0, 4).map((c, i) => (
                <li key={i} className="bg-slate-800/50 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200">{c.titleBn}</div>
                  <a href={`tel:${c.phone.replace(/[^0-9]/g, '')}`} className="text-red-400 font-bold hover:underline">
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links & Admin */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
              কমিউনিটি ও নিয়ন্ত্রণ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#emergency-section" className="hover:text-slate-200 transition">
                  সম্পূর্ণ জরুরি ডিরেক্টরি
                </a>
              </li>
              <li>
                <a href="#train-section" className="hover:text-slate-200 transition">
                  শিয়ালদহ দক্ষিণ লোকাল ট্রেন সময়সূচি
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} বারুইপুর বার্তা (Baruipur Live). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            বারুইপুরের নাগরিকদের জন্য নিষ্ঠার সাথে নির্মিত <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
