import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProperties } from '@/lib/properties';
import { Home, MapPin, ArrowRight, Tag, ShieldCheck, PlusCircle, Sparkles } from 'lucide-react';

export default function HomePropertySection() {
  const featuredProperties = getFeaturedProperties().slice(0, 4);

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200/90 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>জমি ও ফ্ল্যাট কেনাবেচা (Real Estate Buy & Sale)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            বারুইপুর রিয়েল এস্টেট ও প্রপার্টি শোকেস
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            নতুন ফ্ল্যাট, নিষ্কণ্টক বাস্তু জমি, সাশ্রয়ী রিসেল বাড়ি এবং ব্যাংক নিলাম প্রপার্টির (SARFAESI) সক্রিয় লিস্টিং
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/property"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 px-4 py-2 rounded-xl transition shrink-0 shadow-2xs"
          >
            <span>সমস্ত সম্পত্তি দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featuredProperties.map((prop) => (
          <Link
            key={prop.id}
            href="/property"
            className="flex flex-col bg-white hover:bg-slate-50/50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 group"
          >
            {/* Image Thumbnail */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-200">
              <Image
                src={prop.imageUrl}
                alt={prop.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                {prop.categoryNameBn.split('(')[0].trim()}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-emerald-700 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                {prop.price}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {prop.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{prop.location}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                  {prop.configuration}
                </span>
                <span className="text-slate-500 font-mono text-[11px] font-medium">
                  {prop.areaSqFt}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Property CTA Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-4 sm:p-5 rounded-2xl border border-emerald-200/80">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-slate-900 block sm:inline">বারুইপুরে আপনার নিজস্ব জমি, বাড়ি বা ফ্ল্যাট বিক্রি করতে চান?</strong>
            <span className="text-slate-600 block text-xs">স্থানীয় আগ্রহী ক্রেতাদের সাথে সরাসরি যোগাযোগের জন্য সম্পূর্ণ বিনামূল্যে লিস্টিং করুন।</span>
          </div>
        </div>
        <Link
          href="/property"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>বিনামূল্যে লিস্টিং দিন</span>
        </Link>
      </div>
    </section>
  );
}
