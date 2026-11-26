'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  HealthcareFacility, 
  FacilityType, 
  SPECIALTY_OPTIONS 
} from '@/lib/healthcare';
import { formatPhoneForDisplay, formatPhoneForTel } from '@/lib/formatters';
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
  Users,
  Activity,
  CreditCard,
  HeartPulse,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  facilities: HealthcareFacility[];
}

export type MainHealthCategory = 'all' | 'doctors' | 'hospitals' | 'diagnostic' | 'swasthya-sathi';

interface CategoryCardInfo {
  key: MainHealthCategory;
  titleBn: string;
  subtitleBn: string;
  badgeBn: string;
  icon: any;
  colorClass: string;
  activeClass: string;
  descriptionBn: string;
}

const CATEGORY_CARDS: CategoryCardInfo[] = [
  {
    key: 'all',
    titleBn: 'সব স্বাস্থ্য পরিষেবা',
    subtitleBn: 'হাসপাতাল, পলিক্লিনিক ও ল্যাব',
    badgeBn: 'সম্পূর্ণ তালিকা',
    icon: HeartPulse,
    colorClass: 'text-slate-700',
    activeClass: 'bg-slate-900 text-white border-slate-900 shadow-md',
    descriptionBn: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার সমস্ত হাসপাতাল, নার্সিং হোম, পলিক্লিনিক এবং ডায়াগনস্টিক সেন্টারের সার্বিক তথ্য।'
  },
  {
    key: 'doctors',
    titleBn: 'ডাক্তার ও ওপিডি চেম্বার',
    subtitleBn: '১০০+ বিশেষজ্ঞ ডাক্তারের ওপিডি শিডিউল',
    badgeBn: 'ডাক্তার রোস্টার',
    icon: Stethoscope,
    colorClass: 'text-rose-600',
    activeClass: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200',
    descriptionBn: 'বারুইপুরের বিভিন্ন পলিক্লিনিক ও মেডিসিন চেম্বারে ১০০+ অভিজ্ঞ বিশেষজ্ঞ ডাক্তারের বসার দিন, ওপিডি সময়সূচি ও অ্যাপয়েন্টমেন্ট বুকিং নম্বর।'
  },
  {
    key: 'hospitals',
    titleBn: 'নার্সিংহোম ও হাসপাতাল',
    subtitleBn: 'হাই মেডিকেল, নমিতা সেবায়তন, ওয়েলকিন',
    badgeBn: 'ইনপেশেন্ট ও আইসিইউ',
    icon: Building2,
    colorClass: 'text-blue-600',
    activeClass: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200',
    descriptionBn: 'বারুইপুর মহকুমা হাসপাতাল (SDH) ও শীর্ষস্থানীয় বেসরকারি নার্সিংহোমের বেড সংখ্যা, অপারেশন থিয়েটার, আইসিইউ ও ২৪ ঘণ্টা জরুরি পরিষেবা।'
  },
  {
    key: 'diagnostic',
    titleBn: 'ডায়াগনস্টিক ও প্যাথলজি',
    subtitleBn: 'রক্ত পরীক্ষা, ডিজিটাল এক্স-রে ও ইউএসজি',
    badgeBn: 'ল্যাব ও স্ক্যান',
    icon: Activity,
    colorClass: 'text-emerald-600',
    activeClass: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200',
    descriptionBn: 'রক্ত পরীক্ষা, ডিজিটাল এক্স-রে, ৪-ডি আল্ট্রাসনোগ্রাফি (USG), সিটি স্ক্যান ও ইসিজি পরীক্ষার নির্ভরযোগ্য ডায়াগনস্টিক সেন্টার।'
  },
  {
    key: 'swasthya-sathi',
    titleBn: 'স্বাস্থ্যসাথী পরিষেবা কেন্দ্র',
    subtitleBn: 'সরকারি কার্ড গ্রাহ্য নার্সিংহোমের তালিকা',
    badgeBn: 'বিনামূল্যে চিকিৎসা',
    icon: ShieldCheck,
    colorClass: 'text-amber-600',
    activeClass: 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200',
    descriptionBn: 'পশ্চিমবঙ্গ সরকারের স্বাস্থ্যসাথী স্মার্ট কার্ডের মাধ্যমে ক্যাশলেস অস্ত্রোপচার ও অন্তঃবিভাগীয় চিকিৎসা পরিষেবা প্রদানকারী নথিভুক্ত কেন্দ্র।'
  }
];

export default function HealthcareListClient({ facilities }: Props) {
  const [activeCategory, setActiveCategory] = useState<MainHealthCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [onlyOpen24Hours, setOnlyOpen24Hours] = useState(false);

  // Sync state from URL parameters on mount and browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') || params.get('tab') || params.get('filter');
      const q = params.get('search') || params.get('q');
      const s = params.get('specialty');
      const t = params.get('type');

      if (cat) {
        if (cat === 'doctors' || cat === 'doctor' || cat === 'opd' || cat === 'chamber') {
          setActiveCategory('doctors');
        } else if (cat === 'hospitals' || cat === 'hospital' || cat === 'nursing_home') {
          setActiveCategory('hospitals');
        } else if (cat === 'diagnostic' || cat === 'pathology' || cat === 'lab') {
          setActiveCategory('diagnostic');
        } else if (cat === 'swasthya-sathi' || cat === 'swasthya_sathi' || cat === 'card') {
          setActiveCategory('swasthya-sathi');
        } else {
          setActiveCategory('all');
        }
      } else if (t) {
        if (t === 'nursing_home' || t === 'hospital') setActiveCategory('hospitals');
        else if (t === 'polyclinic' || t === 'pharmacy_opd') setActiveCategory('doctors');
        else if (t === 'diagnostic') setActiveCategory('diagnostic');
      }

      if (q) setSearchQuery(q);
      if (s) setSelectedSpecialty(s);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Update active category and push URL parameter
  const handleSelectCategory = (cat: MainHealthCategory) => {
    setActiveCategory(cat);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (cat === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', cat);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    let doctors = 0;
    let hospitals = 0;
    let diagnostic = 0;
    let swasthyaSathi = 0;

    facilities.forEach(fac => {
      if (fac.type === 'polyclinic' || fac.type === 'pharmacy_opd' || fac.doctors.length > 0) doctors++;
      if (fac.type === 'nursing_home' || fac.type === 'hospital') hospitals++;
      if (fac.type === 'diagnostic' || fac.hasDiagnostic || (fac.diagnosticFacilitiesBn && fac.diagnosticFacilitiesBn.length > 0)) diagnostic++;
      if (fac.swasthyaSathiAccepted) swasthyaSathi++;
    });

    return {
      all: facilities.length,
      doctors,
      hospitals,
      diagnostic,
      'swasthya-sathi': swasthyaSathi
    };
  }, [facilities]);

  // Compute total doctors count
  const totalDoctors = useMemo(() => {
    return facilities.reduce((sum, f) => sum + f.doctors.length, 0);
  }, [facilities]);

  // Filter facilities based on category, search query, specialty, and 24x7 toggle
  const filteredFacilities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return facilities.filter(fac => {
      // 1. Subcategory filter
      if (activeCategory === 'doctors') {
        const isDoctorChamber = fac.type === 'polyclinic' || fac.type === 'pharmacy_opd' || fac.doctors.length > 0;
        if (!isDoctorChamber) return false;
      } else if (activeCategory === 'hospitals') {
        const isHospital = fac.type === 'nursing_home' || fac.type === 'hospital';
        if (!isHospital) return false;
      } else if (activeCategory === 'diagnostic') {
        const isDiagnostic = fac.type === 'diagnostic' || fac.hasDiagnostic || (fac.diagnosticFacilitiesBn && fac.diagnosticFacilitiesBn.length > 0);
        if (!isDiagnostic) return false;
      } else if (activeCategory === 'swasthya-sathi') {
        if (!fac.swasthyaSathiAccepted) return false;
      }

      // 2. 24 Hours match
      if (onlyOpen24Hours && !fac.isOpen24Hours) {
        return false;
      }

      // 3. Specialty match: facility must have at least 1 doctor of that specialty
      if (selectedSpecialty !== 'all') {
        const hasSpec = fac.doctors.some(d => d.specialtyKey === selectedSpecialty);
        if (!hasSpec) return false;
      }

      // 4. Search Query matching facility or available specialties/doctors/services
      if (q) {
        const matchFacility = 
          fac.nameBn.toLowerCase().includes(q) ||
          fac.nameEn.toLowerCase().includes(q) ||
          fac.typeBn.toLowerCase().includes(q) ||
          fac.addressBn.toLowerCase().includes(q) ||
          fac.addressEn.toLowerCase().includes(q) ||
          fac.landmarkBn.toLowerCase().includes(q) ||
          fac.taglineBn.toLowerCase().includes(q) ||
          (fac.overviewBn && fac.overviewBn.toLowerCase().includes(q)) ||
          (fac.phone && fac.phone.includes(q)) ||
          (fac.altPhone && fac.altPhone.includes(q)) ||
          (fac.keyServicesBn && fac.keyServicesBn.some(s => s.toLowerCase().includes(q))) ||
          (fac.diagnosticFacilitiesBn && fac.diagnosticFacilitiesBn.some(d => d.toLowerCase().includes(q)));

        const matchDoctor = fac.doctors.some(d => 
          d.nameBn.toLowerCase().includes(q) ||
          d.nameEn.toLowerCase().includes(q) ||
          d.specialtyBn.toLowerCase().includes(q) ||
          d.specialtyEn.toLowerCase().includes(q) ||
          d.degrees.toLowerCase().includes(q) ||
          (d.experienceBn && d.experienceBn.toLowerCase().includes(q)) ||
          (d.notesBn && d.notesBn.toLowerCase().includes(q))
        );

        if (!matchFacility && !matchDoctor) return false;
      }

      return true;
    });
  }, [facilities, activeCategory, selectedSpecialty, searchQuery, onlyOpen24Hours]);

  const activeCardInfo = CATEGORY_CARDS.find(c => c.key === activeCategory) || CATEGORY_CARDS[0];

  return (
    <div className="space-y-8" id="health-directory-content">
      {/* 1. Subcategory Selection Hub (Direct Visual Cards matching Mega Menu) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>স্বাস্থ্য পরিষেবা সাব-ক্যাটাগরি সমূহ</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            সরাসরি ক্লিক করে প্রয়োজনীয় বিভাগে যান
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3">
          {CATEGORY_CARDS.map(card => {
            const Icon = card.icon;
            const count = categoryCounts[card.key];
            const isActive = activeCategory === card.key;

            return (
              <button
                key={card.key}
                onClick={() => handleSelectCategory(card.key)}
                className={`flex flex-col justify-between text-left p-3.5 sm:p-4 rounded-2xl border transition-all text-sm group ${
                  isActive
                    ? `${card.activeClass} ring-2 ring-offset-2 ring-rose-500`
                    : 'bg-white text-slate-700 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-rose-100 group-hover:text-rose-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count} টি
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs sm:text-sm leading-tight line-clamp-1 mb-1">
                    {card.titleBn}
                  </h3>
                  <p className={`text-[11px] leading-tight line-clamp-1 hidden sm:block ${
                    isActive ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {card.subtitleBn}
                  </p>
                </div>

                <div className={`text-[10px] font-bold mt-3 pt-2 border-t flex items-center justify-between ${
                  isActive ? 'border-white/20 text-white/90' : 'border-slate-100 text-rose-700 group-hover:text-rose-800'
                }`}>
                  <span>{card.badgeBn}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Category Banner & Filter Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-5">
        {/* Active Category Description Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-rose-600 shrink-0" />
            <p className="font-medium leading-relaxed">
              <strong className="font-extrabold text-slate-900">{activeCardInfo.titleBn}:</strong>{' '}
              {activeCardInfo.descriptionBn}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-[11px] font-bold">
            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-rose-700">
              {filteredFacilities.length} টি প্রদর্শন হচ্ছে
            </span>
          </div>
        </div>

        {/* Search Input & Specialty Dropdown */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-3/5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="স্বাস্থ্যকেন্দ্রের নাম, ডাক্তার, টেস্ট বা এলাকা লিখে খুঁজুন (যেমন: USG, ইসিজি, রায়চৌধুরী)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition text-sm sm:text-base font-medium"
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
              <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-600 pointer-events-none" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white appearance-none cursor-pointer"
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

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <input
                type="checkbox"
                checked={onlyOpen24Hours}
                onChange={(e) => setOnlyOpen24Hours(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
              <span>২৪x৭ জরুরি পরিষেবা সচল</span>
            </label>

            {activeCategory !== 'swasthya-sathi' && (
              <button
                type="button"
                onClick={() => handleSelectCategory('swasthya-sathi')}
                className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>স্বাস্থ্যসাথী কার্ড গ্রাহ্য কেন্দ্র দেখুন ({categoryCounts['swasthya-sathi']})</span>
              </button>
            )}

            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className="text-slate-500 hover:text-rose-600 underline"
              >
                সব সাব-ক্যাটাগরি রিসেট করুন
              </button>
            )}
          </div>

          <div className="text-slate-500 text-xs">
            প্রদর্শন: <span className="font-bold text-rose-600">{filteredFacilities.length}</span> টি স্বাস্থ্য প্রতিষ্ঠান
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
              setActiveCategory('all');
              setSelectedSpecialty('all');
              setOnlyOpen24Hours(false);
            }}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFacilities.map((fac) => {
            // Use canonical normalized specialties (no near-duplicate strings)
            const specialtyMap = new Map<string, string>();
            if (fac.canonicalSpecialties && fac.canonicalSpecialties.length > 0) {
              fac.canonicalSpecialties.forEach(s => specialtyMap.set(s.key, s.bn));
            } else {
              fac.doctors.forEach(d => {
                const k = d.canonicalSpecialtyKey || d.specialtyKey || d.specialtyBn;
                const label = d.canonicalSpecialtyBn || d.specialtyBn;
                if (label && !specialtyMap.has(k)) {
                  specialtyMap.set(k, label);
                }
              });
            }
            const uniqueSpecialties = Array.from(specialtyMap.values()).slice(0, 5);
            const safeTel = formatPhoneForTel(fac.phone);
            const displayPhone = formatPhoneForDisplay(fac.phone);

            return (
              <div 
                key={fac.slug}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {fac.isFeatured && (
                        <span className="text-[14px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                          Featured
                        </span>
                      )}
                      <span className="text-[14px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/60">
                        {fac.typeBn}
                      </span>
                      {fac.isOpen24Hours && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ২৪x৭
                        </span>
                      )}
                      {fac.swasthyaSathiAccepted && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          স্বাস্থ্যসাথী কার্ড
                        </span>
                      )}
                    </div>
                    {fac.doctorsCount > 0 && (
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        {fac.doctorsCount} জন ডাক্তার
                      </span>
                    )}
                  </div>

                  {/* Facility Name */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-rose-600 transition mb-1 leading-snug">
                    <Link href={`/health-directory/${fac.slug}/`}>
                      {fac.nameBn}
                    </Link>
                  </h3>
                  <div className="text-xs text-slate-500 font-semibold mb-3">
                    {fac.nameEn}
                  </div>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {fac.taglineBn || fac.overviewBn}
                  </p>

                  {/* Key Info Details */}
                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{fac.addressBn}</span>
                    </div>
                    {fac.openingHoursBn && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{fac.openingHoursBn}</span>
                      </div>
                    )}
                  </div>

                  {/* Available Doctor Specialties Preview */}
                  {uniqueSpecialties.length > 0 && (
                    <div className="mb-4 pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                        <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                        <span>উপলব্ধ চিকিৎসা বিশেষজ্ঞ:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {uniqueSpecialties.map((spec, i) => (
                          <span 
                            key={i}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                        {specialtyMap.size > 5 && (
                          <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-md font-bold">
                            +{specialtyMap.size - 5} আরও
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Services Preview */}
                  {fac.diagnosticFacilitiesBn && fac.diagnosticFacilitiesBn.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ডায়াগনস্টিক পরীক্ষা:</span>
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-1">
                        {fac.diagnosticFacilitiesBn.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {safeTel && displayPhone ? (
                    <a
                      href={safeTel}
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-[14px] font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
                    >
                      <Phone className="w-4 h-4 text-emerald-700" />
                      <span>{displayPhone}</span>
                    </a>
                  ) : (
                    <span className="text-[14px] text-slate-500 font-medium">সরাসরি ওপিডি</span>
                  )}

                  <Link
                    href={`/health-directory/${fac.slug}/`}
                    className="inline-flex items-center gap-1 min-h-[44px] text-[14px] font-bold text-white bg-slate-900 hover:bg-blue-900 px-3.5 py-2 rounded-xl transition shadow-xs ml-auto"
                  >
                    <span>ওপিডি ও ডাক্তার তালিকা</span>
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
