'use client';

import React, { useEffect, useState } from 'react';
import { EMERGENCY_CONTACTS, CATEGORIES } from '@/lib/constants';
import { Article } from '@/lib/types';
import { formatTimeAgoBengali } from '@/lib/dateUtils';
import { 
  Phone, 
  ShieldAlert, 
  HeartPulse, 
  Building2, 
  Flame, 
  Zap, 
  Layers, 
  TrendingUp, 
  MapPin, 
  ChevronRight, 
  Newspaper,
  GraduationCap,
  Sparkles,
  TrainTrack,
  ArrowRight,
  Play
} from 'lucide-react';

interface BaruipurUtilitiesProps {
  showCategories?: boolean;
  showRecentPosts?: boolean;
  recentPosts?: Article[];
  showPlaces?: boolean;
  showEmergency?: boolean;
}

const PLACES_LINKS = [
  { slug: 'baruipur-municipality', name: 'বারুইপুর পৌরসভা', subtitle: '১৭টি ওয়ার্ড ও নাগরিক সেবা' },
  { slug: 'baruipur-police-district', name: 'বারুইপুর পুলিশ জেলা', subtitle: 'আইনশৃঙ্খলা ও হেল্পলাইন' },
  { slug: 'baruipur-college', name: 'বারুইপুর কলেজ', subtitle: 'স্নাতক উচ্চশিক্ষা প্রতিষ্ঠান' },
  { slug: 'baruipur-jail', name: 'বারুইপুর কেন্দ্রীয় সংশোধনাগার', subtitle: 'আধুনিক কেন্দ্রীয় কারাগার' },
  { slug: 'baruipur-film-city', name: 'টেলি একাডেমি ফিল্ম সিটি', subtitle: 'চলচ্চিত্র ও সিরিয়াল শুটিং হাব' },
  { slug: 'baruipur-sdo-office', name: 'বারুইপুর এসডিও অফিস', subtitle: 'মহকুমা শাসক প্রশাসন' },
  { slug: 'baruipur-bdo-office', name: 'বারুইপুর বিডিও অফিস', subtitle: '১৯টি গ্রাম পঞ্চায়েত সেবা' },
  { slug: 'baruipur-women-police-station', name: 'বারুইপুর মহিলা থানা', subtitle: 'নারী ও শিশু সুরক্ষা হেল্পলাইন' },
  { slug: 'baruipur-town-library', name: 'বারুইপুর টাউন লাইব্রেরি', subtitle: 'ঐতিহ্যবাহী পাঠাগার ও রিডিং রুম' },
  { slug: 'baruipur-mahaprabhu-tala-sadabrata-ghat', name: 'মহাপ্রভুতলা ও সদাব্রত ঘাট', subtitle: '৫০০ বছরের প্রাচীন বৈষ্ণব তীর্থ' },
  { slug: 'baruipur-rajbari', name: 'বারুইপুর রাজবাড়ি', subtitle: 'সাবর্ণ চৌধুরীদের ঐতিহাসিক প্রাসাদ' },
  { slug: 'baruipur-aranyak', name: 'বারুইপুর আরণ্যক', subtitle: 'ইকোট্যুরিজম ও পিকনিক গার্ডেন' },
  { slug: 'baruipur-happy-valley', name: 'বারুইপুর হ্যাপি ভ্যালি', subtitle: 'বিনোদন পার্ক, ওয়াটার গেমস ও রিসর্ট' },
  { slug: 'baruipur-rashmath', name: 'বারুইপুর রাসমাঠ', subtitle: '৩৫০ বছরের প্রাচীন রাসমেলা' },
  { slug: 'baruipur-swimming-pool', name: 'বারুইপুর সুইমিং পুল', subtitle: 'সাঁতার প্রশিক্ষণ ও ক্রীড়া কেন্দ্র' },
  { slug: 'baruipur-bypass', name: 'বারুইপুর বাইপাস', subtitle: 'ইএম বাইপাস সংযোগ ও ওভারব্রিজ' },
  { slug: 'baruipur-subdivisional-hospital', name: 'মহকুমা হাসপাতাল', subtitle: 'জরুরি চিকিৎসা ও ব্লাড ব্যাংক' },
  { slug: 'baruipur-junction-railway-station', name: 'বারুইপুর রেল জংশন', subtitle: 'শিয়ালদহ দক্ষিণ রেলওয়ে নেটওয়ার্ক' },
];

export default function BaruipurUtilities({
  showCategories = true,
  showRecentPosts = true,
  recentPosts: initialPosts,
  showPlaces = true,
  showEmergency = true
}: BaruipurUtilitiesProps) {
  const [posts, setPosts] = useState<Article[]>(initialPosts || []);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      setPosts(initialPosts);
    } else if (showRecentPosts) {
      fetch('/api/articles?limit=6')
        .then(res => res.json())
        .then(data => {
          if (data.data && Array.isArray(data.data)) {
            setPosts(data.data.slice(0, 6));
          }
        })
        .catch(() => {});
    }
  }, [initialPosts, showRecentPosts]);

  const iconMap: Record<string, any> = {
    Newspaper,
    Building2,
    TrainTrack,
    ShieldAlert,
    Hospital: HeartPulse,
    HeartPulse,
    GraduationCap,
    Sparkles,
    Flame,
    Zap,
    Phone
  };

  return (
    <div className="space-y-6">
      {/* 1. News Categories Widget */}
      {showCategories && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">সংবাদ বিভাগ সমূহ</h3>
                <p className="text-xs text-slate-500">বিষয়ভিত্তিক আঞ্চলিক খবর</p>
              </div>
            </div>
            <a href="/category/all" className="text-xs font-bold text-red-600 hover:underline">
              সব দেখুন →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {CATEGORIES.map(cat => {
              const IconComp = iconMap[cat.iconName] || Newspaper;
              return (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-150 hover:border-red-300 hover:bg-red-50/40 transition group text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-md flex items-center justify-center text-white ${cat.color} group-hover:scale-105 transition shrink-0`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-800 group-hover:text-red-700">
                      {cat.nameBn}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. More Posts / Trending News Widget */}
      {showRecentPosts && posts.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">আরও তাজা সংবাদ</h3>
                <p className="text-xs text-slate-500">সর্বশেষ আঞ্চলিক আপডেট</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <div className="space-y-3.5">
            {posts.slice(0, 6).map((art, idx) => {
              const displayImg = art.imageUrl || (art.images && art.images[0]) || '';
              return (
                <a
                  key={art.id || idx}
                  href={`/${encodeURI(art.slug || art.id)}/`}
                  className="flex gap-3 items-start group p-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                >
                  {displayImg ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayImg}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                      {(art.videoUrl || art.videoEmbedUrl) && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition">
                      <Newspaper className="w-6 h-6" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-red-600">
                        {art.categoryNameBn || 'খবর'}
                      </span>
                      <span>•</span>
                      <span>{formatTimeAgoBengali(art.publishedAt)}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 line-clamp-2 leading-snug transition">
                      {art.title}
                    </h4>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <a 
              href="/category/all" 
              className="text-xs text-red-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              সব প্রকাশিত সংবাদ দেখুন →
            </a>
          </div>
        </div>
      )}

      {/* 3. Important Places Guide Widget */}
      {showPlaces && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-700/80 pb-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">বারুইপুর দর্শনীয় স্থান ও গাইড</h3>
              <p className="text-xs text-slate-300">গুরুত্বপূর্ণ প্রতিষ্ঠান ও ল্যান্ডমার্ক</p>
            </div>
          </div>

          <div className="space-y-1.5">
            {PLACES_LINKS.map((place, idx) => (
              <a
                key={idx}
                href={`/places/${place.slug}/`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition group text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-100 group-hover:text-amber-300 transition">
                    {place.name}
                  </span>
                  <p className="text-[10px] text-slate-400">{place.subtitle}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition" />
              </a>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-700/80 text-center">
            <a 
              href="/places/" 
              className="text-xs text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              সম্পূর্ণ বারুইপুর ডিরেক্টরি দেখুন →
            </a>
          </div>
        </div>
      )}

      {/* 4. Baruipur Emergency Directory */}
      {showEmergency && (
        <div id="emergency-section" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">বারুইপুর জরুরি হেল্পলাইন</h3>
              <p className="text-xs text-slate-500">প্রয়োজনে সরাসরি ডায়াল করুন</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {EMERGENCY_CONTACTS.slice(0, 5).map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Phone;
              const cleanPhone = item.phone.replace(/[^0-9]/g, '');

              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-red-50/50 border border-slate-200 transition group">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-white border border-slate-200 text-red-600 group-hover:border-red-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.titleBn}</h4>
                      <p className="text-[11px] text-slate-500">{item.note}</p>
                    </div>
                  </div>

                  <a 
                    href={`tel:${cleanPhone}`}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded flex items-center gap-1 shrink-0 shadow-sm"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{item.phone}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
