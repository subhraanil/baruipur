import React from 'react';
import { HealthcareFacility } from '@/lib/healthcare';
import { PlaceItem } from '@/lib/places';
import { OrganizationItem } from '@/lib/organizations';
import { 
  Stethoscope, 
  Landmark, 
  Building2, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Calendar,
  FolderTree
} from 'lucide-react';

interface LocalDirectoryHighlightsProps {
  facilities: HealthcareFacility[];
  places: PlaceItem[];
  organizations: OrganizationItem[];
}

export default function LocalDirectoryHighlights({
  facilities,
  places,
  organizations
}: LocalDirectoryHighlightsProps) {
  return (
    <section className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs my-8" aria-label="বারুইপুর স্থানীয় তথ্য ও ডিরেক্টরি">
      {/* Directory Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <FolderTree className="w-4 h-4 text-slate-600" />
            নাগরিক তথ্য ও সেবা বাতায়ন
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            বারুইপুর স্থানীয় ডিরেক্টরি (Local Information Directory)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ডাক্তার চেম্বার, প্রশাসনিক অফিস, ঐতিহাসিক ল্যান্ডমার্ক ও ক্লাবের প্রয়োজনীয় তথ্যাবলী
          </p>
        </div>
      </div>

      {/* 3 Columns Utility Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pillar 1: Health & OPD Doctors */}
        <div className="bg-white rounded-xl border border-rose-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <Stethoscope className="w-4 h-4" />
                </span>
                স্বাস্থ্য ও ডাক্তার ওপিডি
              </h3>
              <a href="/health-directory" className="text-[11px] font-bold text-rose-700 hover:underline">
                সকল ডাক্তার →
              </a>
            </div>

            <div className="space-y-2.5">
              {facilities.slice(0, 5).map((fac) => (
                <a
                  key={fac.slug}
                  href={`/health-directory/${fac.slug}`}
                  className="block p-3 rounded-xl bg-slate-50/70 hover:bg-rose-50/40 border border-slate-100 hover:border-rose-200 transition group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                      {fac.typeBn || 'ক্লিনিক'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {fac.doctorsCount ? `${fac.doctorsCount} জন ডাক্তার` : 'ওপিডি চেম্বার'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-rose-700 transition leading-snug line-clamp-1 mb-1">
                    {fac.nameBn}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                    {fac.addressBn || fac.landmarkBn}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-rose-700 pt-1.5 border-t border-slate-200/60">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {fac.phone || 'বুকিং চালু'}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform font-bold">
                      সময়সূচি দেখুন →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a 
            href="/health-directory"
            className="mt-3 block text-center text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/80 py-2 rounded-lg transition"
          >
            সম্পূর্ণ স্বাস্থ্য ডিরেক্টরি দেখুন →
          </a>
        </div>

        {/* Pillar 2: Places & Landmarks */}
        <div className="bg-white rounded-xl border border-amber-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <Landmark className="w-4 h-4" />
                </span>
                স্থান ও প্রশাসনিক ল্যান্ডমার্ক
              </h3>
              <a href="/places" className="text-[11px] font-bold text-amber-800 hover:underline">
                সকল স্থান →
              </a>
            </div>

            <div className="space-y-2.5">
              {places.slice(0, 3).map((place) => (
                <a
                  key={place.slug}
                  href={`/places/${place.slug}/`}
                  className="block p-3 rounded-xl bg-slate-50/70 hover:bg-amber-50/40 border border-slate-100 hover:border-amber-200 transition group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {place.category === 'admin' ? 'প্রশাসনিক' : place.category === 'judiciary' ? 'আদালত' : 'ঐতিহাসিক'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {place.established ? `স্থাপিত: ${place.established}` : 'বারুইপুর'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition leading-snug line-clamp-1 mb-1">
                    {place.nameBn}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mb-2">
                    {place.taglineBn}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-800 pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-500">বিস্তারিত নির্দেশিকা</span>
                    <span className="group-hover:translate-x-0.5 transition-transform font-bold">
                      গাইড পড়ুন →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a 
            href="/places"
            className="mt-3 block text-center text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100/80 py-2 rounded-lg transition"
          >
            সকল স্থান ও ল্যান্ডমার্ক দেখুন →
          </a>
        </div>

        {/* Pillar 3: Clubs & Organizations */}
        <div className="bg-white rounded-xl border border-purple-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                  <Building2 className="w-4 h-4" />
                </span>
                ক্লাব, সমিতি ও প্রতিষ্ঠান
              </h3>
              <a href="/organizations" className="text-[11px] font-bold text-purple-800 hover:underline">
                সকল ক্লাব →
              </a>
            </div>

            <div className="space-y-2.5">
              {organizations.slice(0, 3).map((org) => (
                <a
                  key={org.slug}
                  href={`/organizations/${org.slug}/`}
                  className="block p-3 rounded-xl bg-slate-50/70 hover:bg-purple-50/40 border border-slate-100 hover:border-purple-200 transition group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                      {org.categoryBn}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      স্থাপিত: {org.established}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-purple-800 transition leading-snug line-clamp-1 mb-1">
                    {org.nameBn}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mb-2">
                    {org.taglineBn}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-800 pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-500">সামাজিক ও ক্রীড়া তথ্য</span>
                    <span className="group-hover:translate-x-0.5 transition-transform font-bold">
                      বিবরণ দেখুন →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a 
            href="/organizations"
            className="mt-3 block text-center text-xs font-bold text-purple-800 bg-purple-50 hover:bg-purple-100/80 py-2 rounded-lg transition"
          >
            সকল ক্লাব ও প্রতিষ্ঠান দেখুন →
          </a>
        </div>
      </div>
    </section>
  );
}
