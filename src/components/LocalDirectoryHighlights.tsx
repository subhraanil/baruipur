import React from 'react';
import { HealthcareFacility } from '@/lib/healthcare';
import { PlaceItem } from '@/lib/places';
import { OrganizationItem } from '@/lib/organizations';
import { Stethoscope, Landmark, Building2, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <section className="space-y-8 my-8" aria-label="বারুইপুর স্থানীয় তথ্য ও ডিরেক্টরি হাইলাইটস">
      {/* 1. Health & Doctor Clinics Spotlight */}
      <div className="bg-white rounded-2xl border border-rose-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4 text-rose-600" />
              স্বাস্থ্য সেবা ও বিশেষজ্ঞ ডাক্তার ওপিডি
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              বারুইপুর স্বাস্থ্য ডিরেক্টরি: শীর্ষ ক্লিনিক ও হাসপাতাল
            </h3>
          </div>
          <a
            href="/health-directory"
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-lg transition self-start sm:self-auto"
          >
            <span>সমস্ত ডাক্তার ও ওপিডি দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {facilities.slice(0, 4).map((fac) => (
            <a
              key={fac.slug}
              href={`/health-directory/${fac.slug}`}
              className="bg-slate-50/70 hover:bg-white p-3.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-rose-700 mb-1.5">
                  <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    {fac.typeBn || 'পলিক্লিনিক'}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {fac.doctorsCount ? `${fac.doctorsCount} জন ডাক্তার` : 'ওপিডি চেম্বার'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-700 transition leading-snug mb-1">
                  {fac.nameBn}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                  <MapPin className="w-3 h-3 inline mr-1 text-slate-400" />
                  {fac.addressBn || fac.landmarkBn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-rose-600">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {fac.phone || fac.altPhone || 'বুকিং চালু'}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">
                  সময়সূচি →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 2. Places & Landmarks Showcase */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4 text-amber-600" />
              প্রশাসনিক ও ঐতিহাসিক স্থান
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              বারুইপুরের ল্যান্ডমার্ক, আদালত ও দর্শনীয় স্থান
            </h3>
          </div>
          <a
            href="/places"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 px-3 py-1.5 rounded-lg transition self-start sm:self-auto"
          >
            <span>সব স্থান দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {places.slice(0, 6).map((place) => (
            <a
              key={place.slug}
              href={`/places/${place.slug}/`}
              className="bg-slate-50/70 hover:bg-white p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mb-1">
                  {place.category === 'admin' ? 'প্রশাসনিক' : place.category === 'judiciary' ? 'বিচার বিভাগীয়' : 'ল্যান্ডমার্ক'}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition leading-snug mb-1 line-clamp-1">
                  {place.nameBn}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {place.taglineBn}
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-800 mt-2 block group-hover:translate-x-0.5 transition-transform">
                গাইড দেখুন →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. Organizations & Clubs Showcase */}
      <div className="bg-white rounded-2xl border border-purple-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-purple-600" />
              সামাজিক ও ক্রীড়া সংগঠন
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              বারুইপুরের ঐতিহ্যবাহী ক্লাব, সমিতি ও প্রতিষ্ঠান
            </h3>
          </div>
          <a
            href="/organizations"
            className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 hover:text-purple-950 bg-purple-50 hover:bg-purple-100/80 px-3 py-1.5 rounded-lg transition self-start sm:self-auto"
          >
            <span>সব ক্লাব ও সমিতি দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {organizations.slice(0, 3).map((org) => (
            <a
              key={org.slug}
              href={`/organizations/${org.slug}/`}
              className="bg-slate-50/70 hover:bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    {org.categoryBn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    স্থাপিত: {org.established}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition text-sm leading-snug mb-1">
                  {org.nameBn}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {org.taglineBn}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-purple-700 pt-2 border-t border-slate-200/80">
                <span>বিস্তারিত তথ্য</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
