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
  ChevronRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Users
} from 'lucide-react';

interface Props {
  facilities: HealthcareFacility[];
}

const TYPE_TABS: { key: 'all' | FacilityType; labelBn: string }[] = [
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

  // Compute total doctors count
  const totalDoctors = useMemo(() => {
    return facilities.reduce((sum, f) => sum + f.doctors.length, 0);
  }, [facilities]);

  // Filter facilities
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

      // Search Query matching facility or available specialties/doctors
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
          d.specialtyEn.toLowerCase().includes(q)
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
              placeholder="স্বাস্থ্যকেন্দ্র, নার্সিং হোম, এলাকা বা বিশেষজ্ঞ বিভাগ খুঁজুন..."
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
              ডাক্তারের ক্যাটাগরি বা বিশেষজ্ঞ বিভাগ:
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
            প্রদর্শন: <span className="font-bold text-red-600">{filteredFacilities.length}</span> টি স্বাস্থ্য প্রতিষ্ঠান
          </div>
        </div>
      </div>

      {/* Facilities Clean Listing Grid */}
      {filteredFacilities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">কোনো স্বাস্থ্যপ্রতিষ্ঠান পাওয়া যায়নি</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFacilities.map((fac) => {
            // Extract unique doctor specialties available at this facility
            const specialtyMap = new Map<string, string>();
            fac.doctors.forEach(d => {
              if (d.specialtyKey && !specialtyMap.has(d.specialtyKey)) {
                specialtyMap.set(d.specialtyKey, d.specialtyBn);
              }
            });
            const specialtiesList = Array.from(specialtyMap.entries());

            return (
              <div 
                key={fac.slug}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-red-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Badges */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                        {fac.typeBn}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {fac.isOpen24Hours && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ২৪x৭
                          </span>
                        )}
                        {fac.swasthyaSathiAccepted && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> স্বাস্থ্যসাথী
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group">
                      <Link 
                        href={`/health-directory/${fac.slug}/`}
                        className="hover:text-red-600 transition"
                      >
                        {fac.nameBn}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {fac.nameEn}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {fac.taglineBn}
                    </p>
                  </div>

                  {/* Address, Hours & Fast Info */}
                  <div className="p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">ঠিকানা ও ল্যান্ডমার্ক:</strong>
                        <span className="text-slate-600">{fac.addressBn}</span>
                        {fac.landmarkBn && (
                          <span className="text-slate-400 block text-xs mt-0.5">({fac.landmarkBn})</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">সময়সূচি:</strong>
                        <span className="text-slate-600 text-xs">{fac.openingHoursBn}</span>
                      </div>
                    </div>

                    {/* Available Doctor Specialties / Categories */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-red-600" />
                          <span>উপলব্ধ বিশেষজ্ঞ বিভাগ ({specialtiesList.length}+ টি ক্যাটেগরি)</span>
                        </strong>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Users className="w-3 h-3 text-red-500" />
                          <span>{fac.doctors.length} জন ডাক্তার</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {specialtiesList.map(([key, name]) => {
                          const isHighlighted = selectedSpecialty === key;
                          return (
                            <span 
                              key={key}
                              className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                                isHighlighted
                                  ? 'bg-red-600 text-white shadow-sm'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Appointment Booking Actions & Details Button */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${fac.phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
                      title="অ্যাপয়েন্টমেন্ট বা সিরিয়ালের জন্য সরাসরি কল করুন"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{fac.phone}</span>
                    </a>

                    {fac.whatsapp && (
                      <a
                        href={`https://wa.me/${fac.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি baruipur.online থেকে ${fac.nameBn}-এর ডাক্তারের ওপিডি ও অ্যাপয়েন্টমেন্ট বুকিং সম্পর্কে জানতে চাই।`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                        title="WhatsApp এ সরাসরি মেসেজ করুন"
                      >
                        <span>হোয়াটসঅ্যাপ</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/health-directory/${fac.slug}/`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition shadow-sm"
                  >
                    <span>ডাক্তার তালিকা ও বিস্তারিত</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
