import React from 'react';
import type { Metadata } from 'next';
import { getAllPlaces } from '@/lib/places';
import PlacesListClient from '@/components/PlacesListClient';
import { 
  ChevronRight, 
  Landmark
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নাগরিক নির্দেশিকা',
  description: 'বারুইপুর পৌরসভা, আদালত, রবীন্দ্র ভবন, মা শিবানী পীঠ, নেতাজির পৈতৃক ভিটে, ধপধপি কালীবাড়ি, হাসপাতাল ও পিকনিক স্পট সহ প্রধান স্থানের পূর্ণাঙ্গ নির্দেশিকা।',
  keywords: [
    'Baruipur Municipality', 'Baruipur Police District', 'Baruipur College', 'Baruipur Court',
    'Baruipur Rabindra Bhawan', 'Maa Shibani Pith', 'Baruipur Jora Shiva Mandir', 'Subhash Bhavan Kodalia',
    'Dhapdhapi Kali Mandir', 'Baruipur Cathedral Church', 'Baruipur Puratan Bazar', 'Neeldeep Garden',
    'Baruipur Film City', 'Baruipur BDO', 'Baruipur SDO', 'Baruipur Town Library',
    'Baruipur Mahaprabhu Tala', 'Baruipur Women Police Station', 'Baruipur Aranyak', 'Baruipur Rajbari',
    'Baruipur Happy Valley', 'Baruipur Swimming pool', 'Baruipur Rashmath', 'Baruipur bypass', 'Baruipur guide'
  ],
  alternates: {
    canonical: 'https://baruipur.online/places/',
  },
  openGraph: {
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য - বারুইপুর অনলাইন',
    description: 'আদালত, রবীন্দ্র ভবন, মা শিবানী পীঠ, নেতাজির ভিটে, পৌরসভা, আরণ্যক ও রাজবাড়ির পূর্ণাঙ্গ তথ্য ও নির্দেশিকা।',
    url: 'https://baruipur.online/places/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নির্দেশিকা',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও তথ্য | বারুইপুর Baruipur',
    description: 'বারুইপুরের ঐতিহাসিক, আধ্যাত্মিক ও প্রশাসনিক ২৮টি গুরুত্বপূর্ণ স্থানের পূর্ণাঙ্গ তথ্যকোষ।',
  }
};

export default function PlacesIndexPage() {
  const places = getAllPlaces();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'বারুইপুরের গুরুত্বপূর্ণ স্থান ও নাগরিক নির্দেশিকা',
    description: 'বারুইপুর পৌরসভা, পুলিশ জেলা, সুইমিং পুল, রাসমাঠ ও বাইপাসের বিস্তারিত তথ্যকোষ।',
    url: 'https://baruipur.online/places/',
    isPartOf: {
      '@type': 'WebSite',
      name: 'বারুইপুর Baruipur',
      url: 'https://baruipur.online/'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'প্রচ্ছদ',
        item: 'https://baruipur.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'গুরুত্বপূর্ণ স্থান ও তথ্য',
        item: 'https://baruipur.online/places/'
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Important Places of Baruipur',
    itemListElement: places.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${p.nameBn} (${p.nameEn})`,
      url: `https://baruipur.online/places/${p.slug}/`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'বারুইপুর কোন জেলায় ও কোথায় অবস্থিত? (Where is Baruipur located?)',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'বারুইপুর ভারতের পশ্চিমবঙ্গ রাজ্যের দক্ষিণ ২৪ পরগনা জেলার একটি প্রাচীন মহকুমা শহর। এটি কলকাতা শহর থেকে প্রায় ২৫ কিলোমিটার দক্ষিণে শিয়ালদহ দক্ষিণ রেলওয়ে শাখায় অবস্থিত। এটি বারুইপুর পুলিশ জেলা এবং মহকুমা প্রশাসনের সদর দপ্তর।'
        }
      },
      {
        '@type': 'Question',
        name: 'বারুইপুর কিসের জন্য বিখ্যাত? (What is Baruipur famous for?)',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'বারুইপুর বিশ্বখ্যাত মিষ্টি সাদা ডাঁসা পেয়ারা ও লিচু, ২০০ বছরের ঐতিহাসিক রাসমেলা ও রাস উৎসব, ৩০০ বছরের প্রাচীন সাবর্ণ রায়চৌধুরী রাজবাড়ি (চৌধুরী বাড়ি), পশ্চিমবঙ্গ টেল অ্যাকাডেমি, আধুনিক বারুইপুর সেন্ট্রাল জেল এবং আদি গঙ্গার প্রত্নতাত্ত্বিক ঐতিহ্যের জন্য বিখ্যাত।'
        }
      },
      {
        '@type': 'Question',
        name: 'বারুইপুর থানার জরুরি ফোন নম্বর কত? (Baruipur Police Station Phone Number)',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'বারুইপুর থানার যোগাযোগ ও হেল্পলাইন নম্বর: ০৩৩-২৪৩৩-৮২২২ / ০৩৩-২৪৩৩-৮২২৩। এছাড়া বারুইপুর পুলিশ জেলা কন্ট্রোল রুম নম্বর: ০৩৩-২৪৩৩-০৪০০ এবং জরুরি রাজ্য পুলিশ হেল্পলাইন ১১২ / ১০০।'
        }
      },
      {
        '@type': 'Question',
        name: 'বারুইপুরের প্রধান দর্শনীয় স্থান কোনগুলি?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'বারুইপুরের শীর্ষ দর্শনীয় স্থানগুলির মধ্যে রয়েছে: বারুইপুর রাজবাড়ি, মা শিবানী পীঠ, হ্যাপি ভ্যালি পিকনিক স্পট, নেতাজি সুভাষচন্দ্র বসুর কোদালিয়ার পৈতৃক ভিটে, ঐতিহাসিক রাসমাঠ, পশ্চিমবঙ্গ টেল অ্যাকাডেমি এবং ধপধপি কালীবাড়ি।'
        }
      }
    ]
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">গুরুত্বপূর্ণ স্থান ও নির্দেশিকা</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-lg border border-slate-700/50">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5" />
            বারুইপুর পরিচিতি ও নির্দেশিকা
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            বারুইপুরের গুরুত্বপূর্ণ স্থান ও প্রধান প্রতিষ্ঠান
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ঐতিহাসিক পৌরসভা থেকে শুরু করে পুলিশ জেলা সদর, আধুনিক সুইমিং পুল কমপ্লেক্স, শতবর্ষ প্রাচীন রাসমাঠ, ফিল্ম সিটি, রাজবাড়ি কিংবা কলকাতার সাথে সংযোগকারী আধুনিক বাইপাস—বারুইপুরের প্রতিটি প্রধান স্থানের পূর্ণাঙ্গ তথ্য, ছবি, ভিডিও, যোগাযোগের নম্বর ও গুগল ম্যাপ নির্দেশিকা।
          </p>
        </div>
      </div>

      {/* Interactive Search & Places Directory */}
      <PlacesListClient places={places} />

      {/* Comprehensive Civic & Geographic Overview Section (Optimized for High-Volume Search Queries) */}
      <section className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
          বারুইপুর পরিচিতি: অবস্থান, গুরুত্ব ও বিখ্যাত স্থানসমূহের বিবরণ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-2">
              📍 বারুইপুর কোথায় ও কোন জেলায় অবস্থিত? (Baruipur Location & District)
            </h3>
            <p className="mb-4">
              বারুইপুর ভারতের পশ্চিমবঙ্গ রাজ্যের <strong>দক্ষিণ ২৪ পরগনা (South 24 Parganas)</strong> জেলার একটি অন্যতম প্রধান মহকুমা সদর ও দ্রুত বর্ধনশীল আধুনিক শহর। ভৌগোলিকভাবে এটি কলকাতা মেট্রোপলিটন এলাকার দক্ষিণ প্রান্তে অবস্থিত। শিয়ালদহ দক্ষিণ শাখা থেকে ট্রেনে মাত্র ২৫ কিলোমিটার দক্ষিণে এর অবস্থান। সড়কপথে ই.এম. বাইপাস সম্প্রসারিত বারুইপুর বাইপাস ও সুভাষগ্রাম-কুলপী রোড দিয়ে খুব সহজেই কলকাতা ও সুন্দরবনের সাথে সরাসরি যোগাযোগ স্থাপন করে বারুইপুর।
            </p>
            <h3 className="text-lg font-bold text-red-700 mb-2">
              🏆 বারুইপুর কিসের জন্য বিখ্যাত? (Why is Baruipur Famous?)
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li><strong>বিশ্বখ্যাত পেয়ারা ও লিচু:</strong> বারুইপুরের সাদা শাঁসের মিষ্টি ডাঁসা পেয়ারা ও ধপধপির রসালো বোম্বাই লিচু গোটা ভারতে সমাদৃত।</li>
              <li><strong>বারুইপুর রাসমেলা:</strong> ঐতিহাসিক রাসমাঠে আয়োজিত ২০০ বছরের ঐতিহ্যবাহী রাস উৎসব ও দক্ষিণবঙ্গের বৃহত্তম লোকমেলা।</li>
              <li><strong>ঐতিহাসিক সাবর্ণ রায়চৌধুরী রাজবাড়ি:</strong> ৩০০ বছরের জমিদারি প্রাসাদ ও জনপ্রিয় চলচ্চিত্র শুটিং স্পট।</li>
              <li><strong>প্রশাসনিক ও সংস্কৃতি কেন্দ্র:</strong> পশ্চিমবঙ্গ টেল অ্যাকাডেমি, আধুনিক বারুইপুর সেন্ট্রাল জেল, রবীন্দ্র ভবন ও পুলিশ জেলা সদর।</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-red-700 mb-2">
              📞 জরুরি যোগাযোগ ও হেল্পলাইন ডিরেক্টরি (Emergency Contacts)
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 space-y-2 text-sm">
              <p><strong>বারুইপুর থানা (Police Station):</strong> ০৩৩-২৪৩৩-৮২২২ / ০৩৩-২৪৩৩-৮২২৩</p>
              <p><strong>বারুইপুর পুলিশ জেলা কন্ট্রোল:</strong> ০৩৩-২৪৩৩-০৪০০ | জরুরি পুলিশ: ১১২</p>
              <p><strong>মহকুমা সুপার স্পেশালিটি হাসপাতাল:</strong> ০৩৩-২৪৩৩-৮২৬০</p>
              <p><strong>বারুইপুর পৌরসভা হেল্পলাইন:</strong> ০৩৩-২৪৩৩-৮২৩০</p>
              <p><strong>বারুইপুর বিডিও অফিস (BDO Office):</strong> ০৩৩-২৪৩৩-৮২২১</p>
            </div>

            <h3 className="text-lg font-bold text-red-700 mb-2">
              🌿 বারুইপুরের শীর্ষ পর্যটন ও দর্শনীয় কেন্দ্রসমূহ
            </h3>
            <p className="text-slate-600">
              পরিবার ও বন্ধুদের সাথে ডে-আউটের জন্য <strong>হ্যাপি ভ্যালি পার্ক</strong>, <strong>নীলদীপ গার্ডেন</strong>, আধ্যাত্মিক দর্শনে <strong>মা শিবানী পীঠ</strong> ও <strong>ধপধপি কালীবাড়ি</strong>, সাঁতার প্রশিক্ষণে <strong>পৌর সুইমিং পুল</strong> এবং ইতিহাসপ্রেমীদের জন্য <strong>কোদালিয়ার নেতাজি পৈতৃক ভবন</strong> ও <strong>আটঘরা প্রত্নতাত্ত্বিক ক্ষেত্র</strong> অত্যন্ত জনপ্রিয়।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
