'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  HealthcareFacility, 
  FacilityType, 
  SPECIALTY_OPTIONS 
} from '@/lib/healthcare';
import { 
  Search, 
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
  Filter,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface Props {
  facilities: HealthcareFacility[];
}

const TYPE_TABS: { key: 'all' | FacilityType; labelBn: string; countSuffix?: string }[] = [
  { key: 'all', labelBn: 'সব স্বাস্থ্যকেন্দ্র ও চেম্বার' },
  { key: 'nursing_home', labelBn: 'হাসপাতাল ও নার্সিং হোম' },
  { key: 'polyclinic', labelBn: 'পলিক্লিনিক ও চেম্বার' },
  { key: 'pharmacy_opd', labelBn: 'মেডিসিন শপ ও OPD' },
  { key: 'hospital', labelBn: 'সরকারি মহকুমা হাসপাতাল' },
];

export default function HealthcareListClient({ facilities }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | FacilityType>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [onlyOpen24Hours, setOnlyOpen24Hours] = useState(false);
  const [onlySwasthyaSathi, setOnlySwasthyaSathi] = useState(false);

  // Compute total counts
  const totalDoctors = useMemo(() => {
    return facilities.reduce((sum, f) => sum + f.doctors.length, 0);
  }, [facilities]);

  // Filter facilities & doctors
  const filteredFacilities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return facilities.filter(fac => {
      // Type match
      if (selectedType !== 'all' && fac.type !== selectedType) {
        return false;
      }

      // 24 Hours match
      if (onlyOpen24Hours && !fac.isOpen24Hours) {
        return false;
      }

      // Swasthya Sathi match
      if (onlySwasthyaSathi && !fac.swasthyaSathiAccepted) {
        return false;
      }

      // Specialty match: facility must have at least 1 doctor of that specialty
      if (selectedSpecialty !== 'all') {
        const hasSpec = fac.doctors.some(d => d.specialtyKey === selectedSpecialty);
        if (!hasSpec) return false;
      }

      // Search Query matching facility or doctor info
      if (q) {
        const matchFacility = 
          fac.nameBn.toLowerCase().includes(q) ||
          fac.nameEn.toLowerCase().includes(q) ||
          fac.addressBn.toLowerCase().includes(q) ||
          fac.landmarkBn.toLowerCase().includes(q) ||
          fac.taglineBn.toLowerCase().includes(q);

        const matchDoctor = fac.doctors.some(d => 
          d.nameBn.toLowerCase().includes(q) ||
          d.nameEn.toLowerCase().includes(q) ||
          d.specialtyBn.toLowerCase().includes(q) ||
          d.specialtyEn.toLowerCase().includes(q) ||
          d.degrees.toLowerCase().includes(q)
        );

        if (!matchFacility && !matchDoctor) return false;
      }

      return true;
    });
  }, [facilities, selectedType, selectedSpecialty, searchQuery, onlyOpen24Hours, onlySwasthyaSathi]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Header Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:w-3/5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ডাক্তার, রোগ/বিভাগ (যেমন: হৃদরোগ, শিশু, স্ত্রীরোগ) বা নার্সিং হোম খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition text-sm sm:text-base font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-full font-bold"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Specialty Dropdown */}
          <div className="w-full md:w-2/5">
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              রোগ বা বিশেষজ্ঞ বিভাগ নির্বাচন করুন:
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600 pointer-events-none" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white appearance-none cursor-pointer"
              >
                {SPECIALTY_OPTIONS.map((spec) => (
                  <option key={spec.key} value={spec.key}>
                    {spec.nameBn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Facility Type Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {TYPE_TABS.map((tab) => {
            const isActive = selectedType === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedType(tab.key)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm shadow-red-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.key === 'hospital' && <Hospital className="w-3.5 h-3.5" />}
                {tab.key === 'nursing_home' && <Building2 className="w-3.5 h-3.5" />}
                {tab.key === 'pharmacy_opd' && <Pill className="w-3.5 h-3.5" />}
                {tab.key === 'polyclinic' && <Stethoscope className="w-3.5 h-3.5" />}
                {tab.labelBn}
              </button>
            );
          })}
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={onlyOpen24Hours}
              onChange={(e) => setOnlyOpen24Hours(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>২৪x৭ জরুরি পরিষেবা খোলা</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={onlySwasthyaSathi}
              onChange={(e) => setOnlySwasthyaSathi(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>স্বাস্থ্যসাথী কার্ড গ্রহণযোগ্য</span>
          </label>
          <div className="ml-auto text-slate-500 text-xs">
            প্রদর্শন: <span className="font-bold text-red-600">{filteredFacilities.length}</span> টি প্রতিষ্ঠান (মোট {totalDoctors} জন ডাক্তারের ওপিডি শিডিউল)
          </div>
        </div>
      </div>

      {/* Facilities & Doctors List */}
      {filteredFacilities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">কোনো স্বাস্থ্যকেন্দ্র বা ডাক্তার পাওয়া যায়নি</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
            আপনার খোঁজার শব্দ বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedSpecialty('all');
              setOnlyOpen24Hours(false);
              setOnlySwasthyaSathi(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredFacilities.map((fac) => {
            // If specialty filter is active, highlight matching doctors or show filtered doctors
            const displayedDoctors = selectedSpecialty === 'all'
              ? fac.doctors
              : fac.doctors.filter(d => d.specialtyKey === selectedSpecialty);

            return (
              <div 
                key={fac.slug}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-red-300 transition-all duration-200"
              >
                {/* Facility Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                          {fac.typeBn}
                        </span>
                        {fac.isOpen24Hours && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ২৪x৭ পরিষেবা
                          </span>
                        )}
                        {fac.swasthyaSathiAccepted && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> স্বাস্থ্যসাথী
                          </span>
                        )}
                        {fac.bedCapacity && (
                          <span className="text-xs text-slate-500 font-medium">
                            • {fac.bedCapacity}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 group">
                        <Link 
                          href={`/health-directory/${fac.slug}/`}
                          className="hover:text-red-600 transition flex items-center gap-2"
                        >
                          {fac.nameBn}
                          <span className="text-slate-400 text-sm font-normal hidden sm:inline">
                            ({fac.nameEn})
                          </span>
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        <span>{fac.addressBn}</span>
                        <span className="text-slate-400">({fac.landmarkBn})</span>
                      </p>
                    </div>

                    {/* Facility Contact & Action CTAs */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 lg:flex-shrink-0">
                      <a
                        href={`tel:${fac.phone.replace(/[^0-9]/g, '')}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{fac.phone}</span>
                      </a>
                      
                      {fac.whatsapp && (
                        <a
                          href={`https://wa.me/${fac.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি baruipur.online থেকে ${fac.nameBn}-এর ডাক্তারের ওপিডি ও অ্যাপয়েন্টমেন্ট সম্পর্কে জানতে চাই।`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-sm"
                          title="WhatsApp এ সরাসরি মেসেজ করুন"
                        >
                          <span>হোয়াটসঅ্যাপ</span>
                        </a>
                      )}

                      <Link
                        href={`/health-directory/${fac.slug}/`}
                        className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs sm:text-sm font-bold transition"
                      >
                        <span>সম্পূর্ণ প্রোফাইল</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Quick Highlights / Services */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <strong>সময়সূচি:</strong> {fac.openingHoursBn}
                    </span>
                    {fac.emergencyPhone && (
                      <span className="text-rose-600 font-bold">
                        জরুরি হেল্পলাইন: {fac.emergencyPhone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Doctors OPD Schedule Table / Cards */}
                <div className="p-4 sm:p-6 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-red-600" />
                      <span>ডাক্তারদের ওপিডি রোস্টার ও চেম্বার সময়সূচি ({displayedDoctors.length} জন)</span>
                    </h3>
                    {selectedSpecialty !== 'all' && (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-semibold">
                        নির্বাচিত বিশেষজ্ঞ ফিল্টার প্রয়োগ করা হয়েছে
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {displayedDoctors.map((doc) => (
                      <div 
                        key={doc.id}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-red-50/30 hover:border-red-200 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                                {doc.nameBn}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                {doc.degrees}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-800 whitespace-nowrap">
                              {doc.specialtyBn}
                            </span>
                          </div>

                          <div className="mt-2 space-y-1 text-xs text-slate-600">
                            <div className="flex items-center gap-1.5 font-medium text-slate-700">
                              <Calendar className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                              <span>{doc.daysBn}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                              <span>{doc.timingBn}</span>
                              {doc.roomNo && <span className="text-slate-400">({doc.roomNo})</span>}
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                              <span>ফি / দক্ষিণা:</span>
                              <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-800">
                                {doc.visitingFeeBn}
                              </span>
                            </div>
                            {doc.notesBn && (
                              <p className="text-[11px] text-slate-500 italic mt-0.5">
                                • {doc.notesBn}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Doctor Booking Action */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400 font-medium">
                            বুকিং নম্বর:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${doc.appointmentPhone.replace(/[^0-9]/g, '')}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 text-white text-xs font-bold hover:bg-red-600 transition"
                            >
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <span>কল করুন</span>
                            </a>
                            {doc.appointmentWhatsapp && (
                              <a
                                href={`https://wa.me/${doc.appointmentWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি ${doc.nameBn}-এর চেম্বারের অ্যাপয়েন্টমেন্টের সিরিয়াল বুক করতে চাই। (${fac.nameBn})`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                              >
                                <span>হোয়াটসঅ্যাপ</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Full Profile link */}
                  <div className="mt-4 text-right">
                    <Link
                      href={`/health-directory/${fac.slug}/`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                    >
                      <span>{fac.nameBn}-এর সম্পূর্ণ বিবরণ, ল্যাব টেস্ট তালিকা ও গুগল ম্যাপ দেখুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
