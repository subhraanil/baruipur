import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllOrganizations, getOrganizationBySlug } from '@/lib/organizations';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Users2, 
  Trophy, 
  HeartHandshake, 
  Scale, 
  Briefcase, 
  Share2, 
  MessageCircle, 
  Navigation,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const orgs = getAllOrganizations();
  return orgs.map((org) => ({
    slug: org.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const org = getOrganizationBySlug(params.slug);
  if (!org) return { title: 'প্রতিষ্ঠান পাওয়া যায়নি | বারুইপুর' };

  return {
    title: `${org.nameBn} - ${org.nameEn} | বারুইপুর ডিরেক্টরি`,
    description: org.metaDescription || org.taglineBn,
    alternates: {
      canonical: `https://baruipur.online/organizations/${org.slug}/`,
    },
    openGraph: {
      title: `${org.nameBn} | বারুইপুর ডিরেক্টরি`,
      description: org.metaDescription || org.taglineBn,
      url: `https://baruipur.online/organizations/${org.slug}/`,
      siteName: 'বারুইপুর Baruipur',
      locale: 'bn_IN',
      type: 'article',
      images: [
        {
          url: org.coverImage.startsWith('http') ? org.coverImage : `https://baruipur.online${org.coverImage}`,
          alt: org.nameBn,
        }
      ],
    }
  };
}

export default function OrganizationDetailPage({ params }: Props) {
  const org = getOrganizationBySlug(params.slug);
  if (!org) notFound();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': org.schemaType || 'Organization',
    name: org.nameBn,
    alternateName: org.nameEn,
    description: org.overview,
    url: `https://baruipur.online/organizations/${org.slug}/`,
    logo: `https://baruipur.online${org.coverImage}`,
    image: org.images?.map(i => i.url.startsWith('http') ? i.url : `https://baruipur.online${i.url}`) || [`https://baruipur.online${org.coverImage}`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: org.pincode,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: org.coordinates.lat,
      longitude: org.coordinates.lng
    },
    telephone: org.contact.phone || undefined,
    email: org.contact.email || undefined
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: org.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {org.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <a href="/" className="hover:text-red-600 transition">প্রচ্ছদ</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="/organizations" className="hover:text-red-600 transition">সংস্থা ও সংগঠন</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold line-clamp-1">{org.nameBn}</span>
        </nav>

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8">
          <div className="relative h-64 sm:h-80 w-full bg-slate-900">
            <img
              src={org.coverImage}
              alt={org.nameBn}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                {org.categoryBn}
              </span>
              {org.registrationType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                  <Award className="w-3 h-3 text-amber-300" />
                  {org.registrationType}
                </span>
              )}
            </div>

            {/* Title & Tagline in Hero */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {org.established}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                {org.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl line-clamp-2">
                {org.taglineBn}
              </p>
            </div>
          </div>

          {/* Quick Action Contact Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {org.contact.phone && (
                <a
                  href={`tel:${org.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>ফোন: {org.contact.phone}</span>
                </a>
              )}
              {org.contact.whatsapp && (
                <a
                  href={`https://wa.me/91${org.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপ</span>
                </a>
              )}
              {org.contact.facebookUrl && (
                <a
                  href={org.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <span>ফেসবুক পেজ</span>
                </a>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{org.timings || 'নিয়মিত কার্যক্রম'}</span>
            </div>
          </div>
        </div>

        {/* Top Ad Space */}
        <AdSenseSlot format="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-600" />
                সংক্ষিপ্ত বিবরণ ও পরিচিতি
              </h2>
              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{org.overview}</p>
              </div>
            </section>

            {/* History Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                প্রতিষ্ঠার ইতিহাস ও ঐতিহ্য
              </h2>
              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{org.history}</p>
              </div>
            </section>

            {/* Key Activities Section */}
            {org.keyActivities && org.keyActivities.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  প্রধান কর্মকাণ্ড ও সামাজিক উদ্যোগসমূহ
                </h2>
                <ul className="space-y-3">
                  {org.keyActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-200">
                        {idx + 1}
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Services Offered (if any) */}
            {org.servicesOffered && org.servicesOffered.length > 0 && (
              <section className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100">
                <h2 className="text-lg font-black text-emerald-950 mb-3 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" />
                  উপলব্ধ নাগরিক ও স্বাস্থ্য পরিষেবা
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {org.servicesOffered.map((srv, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* In-Article Ad Space */}
            <AdSenseSlot format="in-article" className="my-6" />

            {/* FAQs Section */}
            {org.faqs && org.faqs.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  সাধারণ জিজ্ঞাসা (Frequently Asked Questions)
                </h2>
                <div className="space-y-4">
                  {org.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-start gap-2">
                        <span className="text-red-600 font-black">Q.</span>
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Area (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Leadership & Key People Card */}
            {org.keyPeople && org.keyPeople.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-indigo-600" />
                  দায়িত্বপ্রাপ্ত কর্মকর্তা ও পদাধিকারী
                </h3>
                <div className="divide-y divide-slate-100">
                  {org.keyPeople.map((person, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{person.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{person.roleEn}</p>
                      </div>
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full text-[11px] border border-indigo-100">
                        {person.roleBn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address & Direction Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                ঠিকানা ও যোগাযোগের তথ্য
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">পূর্ণ ঠিকানা:</strong>
                    <span>{org.address}</span>
                    {org.landmark && (
                      <p className="text-[11px] text-slate-500 mt-0.5">ল্যান্ডমার্ক: {org.landmark}</p>
                    )}
                  </div>
                </div>

                {org.contact.phone && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">যোগাযোগ নম্বর:</strong>
                      <a href={`tel:${org.contact.phone}`} className="text-emerald-700 hover:underline font-semibold">
                        {org.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {org.contact.email && (
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">ইমেইল:</strong>
                      <a href={`mailto:${org.contact.email}`} className="text-blue-700 hover:underline">
                        {org.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">কীভাবে পৌঁছাবেন:</strong>
                    <span>{org.howToReach}</span>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(org.nameBn + ' ' + org.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>গুগল ম্যাপে লোকেশন দেখুন</span>
              </a>
            </div>

            {/* Sidebar Ad Space */}
            <AdSenseSlot format="sidebar" className="my-0" />
          </aside>
        </div>

        {/* Back Link */}
        <div className="border-t border-slate-200 pt-6">
          <a
            href="/organizations"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল সংস্থা, ক্লাব ও প্রতিষ্ঠান তালিকায় ফিরে যান</span>
          </a>
        </div>
      </div>
    </div>
  );
}
