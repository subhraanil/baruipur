import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getAllFacilities, 
  getFacilityBySlug, 
  HealthcareFacility 
} from '@/lib/healthcare';
import { 
  Hospital, 
  Building2, 
  Pill, 
  Stethoscope, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight,
  ShieldCheck,
  Share2,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const facilities = getAllFacilities();
  return facilities.map((fac) => ({
    slug: fac.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const facility = getFacilityBySlug(params.slug);
  if (!facility) {
    return {
      title: 'চিকিৎসাকেন্দ্র পাওয়া যায়নি | Baruipur Online',
    };
  }

  return {
    title: `${facility.nameBn} বারুইপুর | ডাক্তার তালিকা, ওপিডি সময়সূচি ও অ্যাপয়েন্টমেন্ট ফোন`,
    description: `${facility.nameBn} (${facility.nameEn}): ঠিকানা, ওপিডি ডাক্তারদের রোস্টার, বসার দিন ও সময়, ভিজিটিং ফি, প্যাথলজিক্যাল টেস্ট এবং যোগাযোগের নম্বর।`,
    alternates: {
      canonical: `https://baruipur.online/health-directory/${facility.slug}/`,
    },
    openGraph: {
      title: `${facility.nameBn} - ওপিডি ডাক্তার তালিকা ও বুকিং`,
      description: `${facility.taglineBn}. ঠিকানা: ${facility.addressBn}`,
      url: `https://baruipur.online/health-directory/${facility.slug}/`,
      type: 'website',
    }
  };
}

export default function FacilityDetailPage({ params }: Props) {
  const facility = getFacilityBySlug(params.slug);

  if (!facility) {
    notFound();
  }

  // Schema.org MedicalBusiness / Hospital / Pharmacy JSON-LD
  const schemaType = 
    facility.type === 'hospital' ? 'Hospital' :
    facility.type === 'pharmacy_opd' ? 'Pharmacy' :
    'MedicalBusiness';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: facility.nameBn,
    alternateName: facility.nameEn,
    description: facility.overviewBn,
    url: `https://baruipur.online/health-directory/${facility.slug}/`,
    telephone: facility.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.addressBn,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '700144',
      addressCountry: 'IN'
    },
    openingHours: facility.isOpen24Hours ? 'Mo-Su 00:00-24:00' : 'Mo-Sa 08:00-21:00',
    medicalSpecialty: facility.doctors.map(d => d.specialtyEn),
    employee: facility.doctors.map(d => ({
      '@type': 'Physician',
      name: d.nameBn,
      alternateName: d.nameEn,
      medicalSpecialty: d.specialtyEn,
      description: `${d.degrees} - ${d.specialtyBn}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-red-600 transition">প্রচ্ছদ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/health-directory/" className="hover:text-red-600 transition">স্বাস্থ্য ও ডাক্তার চেম্বার</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-red-600 truncate max-w-[200px] sm:max-w-none">{facility.nameBn}</span>
          </nav>

          {/* Facility Header Hero Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 p-6 sm:p-10 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-sm">
                  {facility.typeBn}
                </span>
                {facility.isOpen24Hours && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ২৪x৭ খোলা
                  </span>
                )}
                {facility.swasthyaSathiAccepted && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> স্বাস্থ্যসাথী গ্রহণযোগ্য
                  </span>
                )}
                {facility.bedCapacity && (
                  <span className="text-xs text-slate-300 font-medium">
                    • {facility.bedCapacity}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
                {facility.nameBn}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium mb-4">
                {facility.nameEn}
              </p>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl mb-6">
                {facility.taglineBn}
              </p>

              {/* Fast Booking / Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-700/60">
                <a
                  href={`tel:${facility.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition shadow-md shadow-red-900/30"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>কল করুন: {facility.phone}</span>
                </a>

                {facility.whatsapp && (
                  <a
                    href={`https://wa.me/${facility.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি baruipur.online থেকে ${facility.nameBn}-এর ডাক্তার ও ওপিডি সময়সূচি সম্পর্কে জানতে যোগাযোগ করছি।`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition shadow-md shadow-emerald-900/30"
                  >
                    <span>হোয়াটসঅ্যাপ মেসেজ</span>
                  </a>
                )}

                <a
                  href={facility.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition backdrop-blur-sm"
                >
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>গুগল ম্যাপে দেখুন</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                </a>
              </div>
            </div>

            {/* Quick Metadata Info Strip */}
            <div className="bg-slate-50 px-6 sm:px-10 py-4 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div>
                <strong className="block text-slate-900 font-bold mb-0.5">ঠিকানা ও ল্যান্ডমার্ক:</strong>
                <p className="text-slate-600 leading-snug">{facility.addressBn} ({facility.landmarkBn})</p>
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-0.5">খোলার সময়সূচি:</strong>
                <p className="text-slate-600 leading-snug">{facility.openingHoursBn}</p>
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-0.5">জরুরি ও বিকল্প হেল্পলাইন:</strong>
                <p className="text-rose-600 font-bold leading-snug">
                  {facility.emergencyPhone || facility.altPhone || 'উপলব্ধ নয়'}
                </p>
              </div>
            </div>

            {/* Overview / Introduction */}
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 mb-2">প্রতিষ্ঠান পরিচিতি</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {facility.overviewBn}
                </p>
              </div>

              {/* Key Facilities & Diagnostics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>প্রধান চিকিৎসা ও সেবা সুবিধা</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {facility.keyServicesBn.map((svc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-black">•</span>
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {facility.diagnosticFacilitiesBn && facility.diagnosticFacilitiesBn.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>ডায়াগনস্টিক ও প্যাথলজি সুবিধা</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {facility.diagnosticFacilitiesBn.map((diag, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 font-black">•</span>
                          <span>{diag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Doctors OPD Schedule Roster Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
                  <UserCheck className="w-6 h-6 text-red-600" />
                  <span>ডাক্তারদের ওপিডি রোস্টার ও চেম্বার সময়সূচি</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  এখানে মোট <span className="font-bold text-slate-800">{facility.doctors.length}</span> জন বিশেষজ্ঞ চিকিৎসকের নিয়মিত বসার সময়সূচি ও ভিজিটিং ফি তালিকাভুক্ত।
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>সরাসরি অ্যাপয়েন্টমেন্ট বুকিং</span>
              </span>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facility.doctors.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-black text-slate-900 text-base sm:text-lg">
                          {doc.nameBn}
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                          {doc.degrees}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 flex-shrink-0">
                        {doc.specialtyBn}
                      </span>
                    </div>

                    {doc.experienceBn && (
                      <p className="text-xs text-emerald-700 font-bold mb-3">
                        ✓ {doc.experienceBn}
                      </p>
                    )}

                    <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="font-bold text-slate-800">বসার দিন:</span>
                        <span>{doc.daysBn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-bold text-slate-800">সময়সূচি:</span>
                        <span>{doc.timingBn}</span>
                        {doc.roomNo && <span className="text-slate-400">({doc.roomNo})</span>}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-700">
                        <span className="font-bold">ভিজিটিং ফি:</span>
                        <span className="font-black px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                          {doc.visitingFeeBn}
                        </span>
                      </div>
                      {doc.notesBn && (
                        <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                          বিশেষ উল্লেখ: {doc.notesBn}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Booking CTA Buttons */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      সিরিয়াল বুকিং:
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${doc.appointmentPhone.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{doc.appointmentPhone}</span>
                      </a>
                      {doc.appointmentWhatsapp && (
                        <a
                          href={`https://wa.me/${doc.appointmentWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি ${doc.nameBn}-এর চেম্বারের সিরিয়াল নিতে যোগাযোগ করছি (${facility.nameBn})।`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                        >
                          <span>হোয়াটসঅ্যাপ</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Back link */}
          <div className="text-center">
            <Link
              href="/health-directory/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-800 hover:text-red-600 text-sm font-bold shadow-sm transition"
            >
              <span>← বারুইপুরের সমস্ত স্বাস্থ্যকেন্দ্র ও ডাক্তার তালিকা দেখুন</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
