import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPlaces, getPlaceBySlug } from '@/lib/places';
import { 
  Building2, 
  ShieldAlert, 
  Waves, 
  Sparkles, 
  Compass, 
  Hospital, 
  TrainTrack, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Globe, 
  Navigation, 
  CheckCircle2, 
  HelpCircle,
  Landmark,
  ArrowLeft
} from 'lucide-react';

interface PlacePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.map(p => ({
    slug: p.slug
  }));
}

export function generateMetadata({ params }: PlacePageProps): Metadata {
  const place = getPlaceBySlug(params.slug);

  if (!place) {
    return {
      title: 'স্থান পাওয়া যায়নি | বারুইপুর Baruipur'
    };
  }

  const canonicalUrl = `https://baruipur.online/places/${place.slug}/`;
  const title = `${place.nameBn} (${place.nameEn}) - বারুইপুর Baruipur`;
  const description = `${place.overview.slice(0, 160)}...`;

  return {
    title,
    description,
    keywords: [
      place.nameBn,
      place.nameEn,
      'Baruipur',
      'বারুইপুর',
      'দক্ষিণ ২৪ পরগনা',
      place.taglineBn,
      'Baruipur guide'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'বারুইপুর Baruipur',
      locale: 'bn_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default function PlaceDetailPage({ params }: PlacePageProps) {
  const place = getPlaceBySlug(params.slug);

  if (!place) {
    notFound();
  }

  const allPlaces = getAllPlaces();
  const otherPlaces = allPlaces.filter(p => p.slug !== place.slug).slice(0, 4);
  const canonicalUrl = `https://baruipur.online/places/${place.slug}/`;

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': place.schemaType || 'Place',
    name: `${place.nameBn} (${place.nameEn})`,
    description: place.overview,
    url: canonicalUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: place.address,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '743302',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: place.coordinates.lat,
      longitude: place.coordinates.lng
    },
    telephone: place.contact.phone || place.contact.helpline,
    openingHours: place.timings,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Baruipur, South 24 Parganas, West Bengal'
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
        name: 'গুরুত্বপূর্ণ স্থান ও নির্দেশিকা',
        item: 'https://baruipur.online/places/'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: place.nameBn,
        item: canonicalUrl
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 overflow-x-auto">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <a href="/places" className="hover:text-red-600 font-medium whitespace-nowrap">গুরুত্বপূর্ণ স্থান</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-bold truncate">{place.nameBn}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-md border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            বারুইপুর পরিচিতি ও গাইড
          </span>
          <span className="bg-white/10 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
            স্থাপিত: {place.established}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
          {place.nameBn}
        </h1>
        <h2 className="text-lg sm:text-xl font-medium text-red-300 mb-4">
          {place.nameEn}
        </h2>
        <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
          {place.taglineBn}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Overview */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-150 pb-3 mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-red-600" />
              স্থানের সংক্ষিপ্ত পরিচয় ও গুরুত্ব
            </h2>
            <p className="text-base text-slate-700 leading-relaxed text-justify">
              {place.overview}
            </p>
          </section>

          {/* History & Background */}
          {place.history && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-150 pb-3 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-600" />
                ঐতিহাসিক প্রেক্ষাপট ও বিকাশ
              </h2>
              <p className="text-base text-slate-700 leading-relaxed text-justify">
                {place.history}
              </p>
            </section>
          )}

          {/* Key Services / Facilities */}
          {place.keyServices && place.keyServices.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-150 pb-3 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                প্রধান নাগরিক সুবিধা ও সেবাসমূহ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {place.keyServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-150 text-sm text-slate-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How to Reach */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-150 pb-3 mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              যাতায়াত ও পৌঁছানোর নির্দেশিকা
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              {place.howToReach}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                <strong>ঠিকানা:</strong> {place.address} (পিন কোড: ৭৪৩৩০২)
              </span>
            </div>
          </section>

          {/* Frequently Asked Questions (FAQs) */}
          {place.faqs && place.faqs.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-150 pb-3 mb-5 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                প্রয়োজনীয় প্রশ্নোত্তর (FAQs)
              </h2>
              <div className="space-y-4">
                {place.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-start gap-2">
                      <span className="text-red-600 font-bold">প্র:</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 pl-5">
                      <span className="text-emerald-700 font-bold mr-1">উ:</span>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back to Guides */}
          <div className="pt-2">
            <a 
              href="/places" 
              className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              বারুইপুরের অন্যান্য গুরুত্বপূর্ণ স্থান দেখুন
            </a>
          </div>
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Quick Contact Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-150 pb-3 mb-4">
              যোগাযোগ ও সময়সূচি
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {place.contact.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">ফোন নম্বর:</span>
                    <a href={`tel:${place.contact.phone}`} className="font-bold text-slate-900 hover:text-red-600">
                      {place.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {place.contact.helpline && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">জরুরি হেল্পলাইন:</span>
                    <span className="font-bold text-red-600">
                      {place.contact.helpline}
                    </span>
                  </div>
                </div>
              )}

              {place.timings && (
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">সময়সূচি:</span>
                    <span className="text-slate-800 font-medium">
                      {place.timings}
                    </span>
                  </div>
                </div>
              )}

              {place.contact.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">ইমেইল:</span>
                    <span className="text-slate-800">
                      {place.contact.email}
                    </span>
                  </div>
                </div>
              )}

              {place.contact.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">অফিসিয়াল ওয়েবসাইট:</span>
                    <a 
                      href={place.contact.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-red-600 font-semibold hover:underline break-all"
                    >
                      {place.contact.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Administrative Overview Card */}
          {place.administrativeDetails && Object.keys(place.administrativeDetails).length > 0 && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-3 mb-3">
                প্রশাসনিক তথ্য
              </h3>
              <dl className="space-y-2.5 text-xs">
                {Object.entries(place.administrativeDetails).map(([key, val]) => (
                  <div key={key} className="flex justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                    <dt className="text-slate-500 capitalize">{key}:</dt>
                    <dd className="font-semibold text-slate-800 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Other Places Recommendations */}
          {otherPlaces.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900 border-b border-slate-150 pb-3 mb-4">
                বারুইপুরের অন্যান্য স্থান
              </h3>
              <div className="space-y-3">
                {otherPlaces.map(other => (
                  <a
                    key={other.slug}
                    href={`/places/${other.slug}/`}
                    className="block p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition">
                      {other.nameBn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {other.nameEn}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
