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
  ArrowLeft,
  Users,
  Camera,
  Video,
  ExternalLink,
  Coins,
  Calendar,
  Star
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
  const image = place.coverImage || place.images?.[0]?.url || 'https://baruipur.online/images/baruipur-logo.png';

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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: place.nameBn
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
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
  const primaryImage = place.coverImage || place.images?.[0]?.url || '';

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': place.schemaType || 'Place',
    name: `${place.nameBn} (${place.nameEn})`,
    description: place.overview,
    url: canonicalUrl,
    image: primaryImage,
    hasMap: place.gmbMapUrl || `https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`,
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

      {/* Hero Header with optional Cover Image Background */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-lg border border-slate-800 bg-slate-950">
        {primaryImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-xs scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${primaryImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              বারুইপুর পরিচিতি ও গাইড
            </span>
            <span className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              স্থাপিত: {place.established}
            </span>
            {place.entryFee && (
              <span className="bg-emerald-600/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                <Coins className="w-3 h-3" />
                {place.entryFee}
              </span>
            )}
            {place.bestTimeToVisit && (
              <span className="bg-amber-500/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm hidden sm:inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {place.bestTimeToVisit}
              </span>
            )}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Highlights Grid */}
          {place.highlights && place.highlights.length > 0 && (
            <section className="bg-gradient-to-br from-amber-50/80 via-white to-red-50/50 rounded-2xl border border-amber-200/80 p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
                প্রধান বৈশিষ্ট্য ও এক নজরে তথ্য (Key Highlights)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {place.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

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

          {/* Photo Gallery Section */}
          {place.images && place.images.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-5">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-red-600" />
                  আলোকচিত্র ও দৃশ্যপট (Photo Gallery)
                </h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  মোট {place.images.length} টি ছবি
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {place.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col shadow-xs hover:shadow-md transition duration-300"
                  >
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={img.url} 
                        alt={img.captionBn}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        {img.captionBn}
                      </p>
                      {img.captionEn && (
                        <p className="text-[11px] text-slate-400 mt-1">
                          {img.captionEn}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Embedded Video Tour & Documentary */}
          {place.videoEmbedUrl && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-5">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  ভিডিও ট্যুর ও তথ্যচিত্র (Video Tour)
                </h2>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  ভিডিও দেখুন
                </span>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-black">
                <iframe
                  src={place.videoEmbedUrl}
                  title={place.videoTitleBn || place.nameBn}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {place.videoTitleBn && (
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-medium flex items-center justify-between">
                  <span>{place.videoTitleBn}</span>
                  {place.videoUrl && (
                    <a 
                      href={place.videoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-red-600 hover:underline flex items-center gap-1 text-xs shrink-0"
                    >
                      <span>ইউটিউবে খুলুন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </p>
              )}
            </section>
          )}

          {/* Interactive Google Maps & GMB Embed Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                গুগল ম্যাপে অবস্থান ও ডিরেকশন (Google Maps & GMB)
              </h2>
              <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                লাইভ জিপিএস
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              নিচের ইন্টার‍্যাক্টিভ গুগল ম্যাপের মাধ্যমে সঠিক অবস্থান দেখে নিন অথবা সরাসরি দিকনির্দেশনা ও রিভিউ দেখতে বাটনগুলিতে ক্লিক করুন।
            </p>

            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 mb-4">
              <iframe
                src={place.gmbEmbedUrl || `https://maps.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&hl=bn&z=16&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${place.nameBn} গুগল ম্যাপ অবস্থান`}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                গুগল ম্যাপে দিকনির্দেশনা (Get Directions)
              </a>
              {place.gmbMapUrl && (
                <a
                  href={place.gmbMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  গুগল বিজনেস প্রোফাইল ও রিভিউ (GMB)
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </a>
              )}
            </div>
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

          {/* 17 Municipal Wards & Councillors Directory */}
          {place.wards && place.wards.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-150 pb-4 mb-5 gap-2">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    পৌরসভার ১৭টি ওয়ার্ডের কাউন্সিলর ও ফোন নম্বর
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    নাগরিক সমস্যা, প্রত্যয়ন পত্র ও পরিষেবা সংক্রান্ত প্রয়োজনে সংশ্লিষ্ট ওয়ার্ডের কাউন্সিলরের সাথে সরাসরি যোগাযোগ করুন
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0 self-start sm:self-auto">
                  মোট ১৭ টি ওয়ার্ড
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {place.wards.map((ward) => (
                  <div 
                    key={ward.wardNo}
                    className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-blue-600 text-white tracking-wide">
                          ওয়ার্ড নং {ward.wardNo}
                        </span>
                        {ward.designationBn && (
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {ward.designationBn}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-0.5">
                        {ward.nameBn}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 font-medium">
                        {ward.nameEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">যোগাযোগ:</span>
                      {ward.phone ? (
                        <a 
                          href={`tel:${ward.phone}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          <span>{ward.phone}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">পৌরসভা অফিস</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <strong>পৌর প্রধান কার্যালয় হেল্পলাইন:</strong> 033-2433-8201 / 033-2433-8260
                  <span className="mx-2 hidden sm:inline">|</span>
                  <strong className="block sm:inline mt-1 sm:mt-0">জরুরি টোল-ফ্রি:</strong> 1800-345-5555
                </div>
                <span className="text-[11px] text-slate-400">তথ্যসূত্র: বারুইপুর পৌরসভা অফিশিয়াল রেকর্ড</span>
              </div>
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
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    {other.coverImage && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <img 
                          src={other.coverImage} 
                          alt={other.nameBn} 
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition truncate">
                        {other.nameBn}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {other.nameEn}
                      </p>
                    </div>
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
