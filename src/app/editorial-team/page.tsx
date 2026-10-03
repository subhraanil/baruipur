import React from 'react';
import type { Metadata } from 'next';
import { ChevronRight, Mail, MapPin, ShieldCheck, Newspaper, Award, ExternalLink, Phone } from 'lucide-react';
import { getAllAuthors } from '@/lib/authors';

export const metadata: Metadata = {
  title: 'সম্পাদকীয় পরিষদ ও সাংবাদিক দল (Editorial Team) - বারুইপুর অনলাইন',
  description: 'বারুইপুর অনলাইন বার্তা বিভাগের পেশাদার সম্পাদকীয় দল, গ্রাউন্ড রিপোর্টার, সংবাদ কভারেজ ক্ষেত্র এবং সত্যনিষ্ঠ সাংবাদিকতার অঙ্গীকারনামা।',
  alternates: {
    canonical: 'https://baruipur.online/editorial-team/',
  },
  openGraph: {
    title: 'সম্পাদকীয় পরিষদ ও সাংবাদিক দল - বারুইপুর অনলাইন',
    description: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার অভিজ্ঞ ও প্রত্যয়ী সাংবাদিক দল।',
    url: 'https://baruipur.online/editorial-team/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function EditorialTeamPage() {
  const authors = getAllAuthors();

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'সম্পাদকীয় পরিষদ ও সাংবাদিক দল - বারুইপুর অনলাইন',
    url: 'https://baruipur.online/editorial-team/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: authors.map((a, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Person',
          name: a.nameBn,
          alternateName: a.nameEn,
          jobTitle: a.roleBn,
          email: a.email,
          image: a.avatar,
          worksFor: {
            '@type': 'NewsMediaOrganization',
            name: 'বারুইপুর অনলাইন (Baruipur Online)',
            url: 'https://baruipur.online/'
          }
        }
      }))
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />

      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">সম্পাদকীয় পরিষদ</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          দায়িত্বশীল আঞ্চলিক সাংবাদিকতা (E-E-A-T)
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          সম্পাদকীয় পরিষদ ও সাংবাদিক দল
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          বারুইপুর অনলাইন কেবল তথ্যের সমাহার নয়—আমাদের প্রতিটি সংবাদ স্থানীয়ভাবে মাঠপর্যায়ে কর্মরত অভিজ্ঞ সাংবাদিক ও বিষয়ভিত্তিক সংবাদদাতাদের দ্বারা সংগৃহীত, সত্যতা যাচাইকৃত এবং দায়িত্বশীলভাবে পরিমার্জিত।
        </p>
      </div>

      {/* Journalistic Credibility Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">স্বতন্ত্র ফিল্ড রিপোর্টিং</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              পৌরসভা, আদালত ও রেলস্টেশন চত্বরে উপস্থিত থেকে সরাসরি স্থানীয় প্রত্যক্ষদর্শী ও সরকারি কর্মকর্তাদের মতামতের ভিত্তিতে সত্য সংবাদ পরিবেশন।
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">কঠোর ফ্যাক্ট-চেকিং</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              যেকোনো সামাজিক মাধ্যমের দাবি প্রকাশের পূর্বে সরকারি সার্কুলার, পুলিশি প্রেস রিলিজ ও মহকুমা প্রশাসনের মাধ্যমে তথ্য ক্রুশ-ভেরিফাই করা হয়।
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">স্বচ্ছ লেখক পরিচয় ও যোগাযোগ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রতিটি সংবাদের নিচে প্রতিবেদকের নাম, বিট এবং সরাসরি যোগাযোগের ঠিকানা উল্লেখ থাকে, যাতে পাঠকরা নির্ভয়ে মতামত ও সংশোধনী জানাতে পারেন।
            </p>
          </div>
        </div>
      </div>

      {/* Authors Profiles Grid */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          আমাদের সাংবাদিক ও সম্পাদকীয় ব্যক্তিবর্গ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <div 
              key={author.id} 
              id={author.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between scroll-mt-24"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={author.avatar} 
                    alt={author.nameBn} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-500 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {author.nameBn}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      {author.nameEn}
                    </p>
                    <span className="inline-block bg-red-50 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
                      {author.roleBn}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {author.bioBn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-150 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">কভারেজ বিট:</span>
                  <span className="text-slate-600">{author.beat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="font-semibold text-slate-800">কর্মস্থল / এলাকা:</span>
                  <span className="text-slate-600">{author.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="font-semibold text-slate-800">সরাসরি ইমেল:</span>
                  <a href={`mailto:${author.email}`} className="text-red-600 hover:underline break-all">
                    {author.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Contact & Office Info */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            কোনো সংবাদে ভুলত্রুটি লক্ষ্য করেছেন বা তথ্য জানাতে চান?
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            বারুইপুর অনলাইন সত্যনিষ্ঠ সাংবাদিকতায় অঙ্গীকারবদ্ধ। যেকোনো তথ্য সংশোধনের আবেদন ৪৮ ঘণ্টার মধ্যে যাচাই করে পরিমার্জন করা হয়।
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a 
            href="/corrections-policy" 
            className="text-xs font-bold text-slate-800 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            সংশোধনী নীতিমালা
          </a>
          <a 
            href="/contact" 
            className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow transition"
          >
            বার্তা দপ্তরে যোগাযোগ
          </a>
        </div>
      </div>
    </div>
  );
}
