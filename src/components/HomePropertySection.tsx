import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProperties } from '@/lib/properties';
import { Home, MapPin, ArrowRight, Tag, ShieldCheck, PlusCircle } from 'lucide-react';

export default function HomePropertySection() {
  const featuredProperties = getFeaturedProperties().slice(0, 4);

  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Home className="w-4 h-4" />
            <span>জমি ও ফ্ল্যাট কেনাবেচা (Buy & Sale)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            বারুইপুর রিয়েল এস্টেট ও প্রপার্টি শোকেস
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            নতুন ফ্ল্যাট, বাস্তু জমি, সাশ্রয়ী রিসেল বাড়ি এবং ব্যাংক নিলাম প্রপার্টির নির্ভরযোগ্য লিস্টিং
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/property"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition shrink-0"
          >
            <span>সমস্ত সম্পত্তি দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredProperties.map((prop) => (
          <Link
            key={prop.id}
            href="/property"
            className="flex flex-col bg-slate-50 hover:bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition group"
          >
            {/* Image Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-200">
              <Image
                src={prop.imageUrl}
                alt={prop.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                {prop.categoryNameBn.split('(')[0].trim()}
              </div>
              <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                {prop.price}
              </div>
            </div>

            {/* Details */}
            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700">
                  {prop.title}
                </h3>
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{prop.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-600">
                <span className="font-medium bg-slate-200/70 px-1.5 py-0.5 rounded">
                  {prop.configuration}
                </span>
                <span className="text-slate-500 font-mono">
                  {prop.areaSqFt}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Property CTA Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-4 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>আপনার নিজস্ব জমি, বাড়ি বা ফ্ল্যাট বিক্রি করতে চান?</strong> স্থানীয় ক্রেতাদের কাছে পৌঁছাতে বিনামূল্যে লিস্টিং করুন।
          </span>
        </div>
        <Link
          href="/property"
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>বিনামূল্যে লিস্টিং দিন</span>
        </Link>
      </div>
    </section>
  );
}
