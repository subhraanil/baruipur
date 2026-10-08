'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PlaceItem } from '@/lib/places';
import { 
  Building2, 
  ShieldAlert, 
  Waves, 
  Sparkles, 
  Compass, 
  Hospital, 
  TrainTrack, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight,
  Landmark,
  GraduationCap,
  Map,
  Camera,
  Video,
  Search,
  X,
  RotateCcw,
  Filter
} from 'lucide-react';

interface PlacesListClientProps {
  places: PlaceItem[];
}

const CATEGORY_CONFIG: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'সব স্থান ও প্রতিষ্ঠান', icon: <Landmark className="w-4 h-4 text-slate-600" /> },
  { id: 'civic', label: 'পৌরসভা ও প্রশাসন', icon: <Building2 className="w-4 h-4 text-emerald-600" /> },
  { id: 'police', label: 'পুলিশ ও নিরাপত্তা', icon: <ShieldAlert className="w-4 h-4 text-rose-600" /> },
  { id: 'health', label: 'স্বাস্থ্য ও হাসপাতাল', icon: <Hospital className="w-4 h-4 text-teal-600" /> },
  { id: 'education', label: 'শিক্ষা ও প্রতিষ্ঠান', icon: <GraduationCap className="w-4 h-4 text-purple-600" /> },
  { id: 'culture', label: 'দর্শনীয় স্থান ও ঐতিহ্য', icon: <Sparkles className="w-4 h-4 text-amber-600" /> },
  { id: 'sports', label: 'খেলাধুলা ও বিনোদন', icon: <Waves className="w-4 h-4 text-cyan-600" /> },
  { id: 'infrastructure', label: 'পরিকাঠামো ও উন্নয়ন', icon: <Compass className="w-4 h-4 text-blue-600" /> },
  { id: 'transit', label: 'পরিবহন ও স্টেশন', icon: <TrainTrack className="w-4 h-4 text-indigo-600" /> },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'civic':
    case 'Government & Civic Administration':
      return <Building2 className="w-4 h-4 text-emerald-600" />;
    case 'police': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
    case 'sports': return <Waves className="w-4 h-4 text-cyan-600" />;
    case 'culture': return <Sparkles className="w-4 h-4 text-amber-600" />;
    case 'education': return <GraduationCap className="w-4 h-4 text-purple-600" />;
    case 'infrastructure': return <Compass className="w-4 h-4 text-blue-600" />;
    case 'health': return <Hospital className="w-4 h-4 text-teal-600" />;
    case 'transit': return <TrainTrack className="w-4 h-4 text-indigo-600" />;
    default: return <Landmark className="w-4 h-4 text-slate-600" />;
  }
};

export default function PlacesListClient({ places }: PlacesListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search') || params.get('q');
      const cat = params.get('category');
      if (q) setSearchQuery(q);
      if (cat && CATEGORY_CONFIG.some(c => c.id === cat)) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  // Filter places
  const filteredPlaces = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return places.filter((place) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'civic') {
          if (place.category !== 'civic' && place.category !== 'Government & Civic Administration') {
            return false;
          }
        } else if (place.category !== selectedCategory) {
          return false;
        }
      }

      // Search match
      if (q) {
        const nameBnMatch = place.nameBn.toLowerCase().includes(q);
        const nameEnMatch = place.nameEn.toLowerCase().includes(q);
        const catMatch = place.category.toLowerCase().includes(q);
        const taglineMatch = place.taglineBn && place.taglineBn.toLowerCase().includes(q);
        const addressMatch = place.address && place.address.toLowerCase().includes(q);
        const overviewMatch = place.overview && place.overview.toLowerCase().includes(q);
        const phoneMatch = place.contact?.phone && place.contact.phone.includes(q);
        const servicesMatch = place.keyServices && place.keyServices.some(s => s.toLowerCase().includes(q));
        const highlightsMatch = place.highlights && place.highlights.some(h => h.toLowerCase().includes(q));

        if (!nameBnMatch && !nameEnMatch && !catMatch && !taglineMatch && !addressMatch && !overviewMatch && !phoneMatch && !servicesMatch && !highlightsMatch) {
          return false;
        }
      }

      return true;
    });
  }, [places, selectedCategory, searchQuery]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="স্থানের নাম, ঠিকানা, বিভাগ বা বিবরণ দিয়ে খুঁজুন (যেমন: পৌরসভা, আদালত, রাজবাড়ি, সুইমিং পুল)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              title="অনুসন্ধান মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <span className="text-slate-400 text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            বিভাগ:
          </span>
          {CATEGORY_CONFIG.map((cat) => {
            const count = cat.id === 'all' 
              ? places.length 
              : places.filter(p => cat.id === 'civic' ? (p.category === 'civic' || p.category === 'Government & Civic Administration') : p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition flex items-center gap-1.5 text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Search & Stats Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          মোট <strong>{filteredPlaces.length}</strong> টি স্থান প্রদর্শিত হচ্ছে
          {selectedCategory !== 'all' && ' (নির্বাচিত বিভাগে)'}
        </span>
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>সকল ফিল্টার মুছুন</span>
          </button>
        )}
      </div>

      {/* Active Query Alert */}
      {searchQuery && (
        <div className="bg-red-50/80 border border-red-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-red-900">
          <span>
            ‘<strong className="font-bold text-red-700">{searchQuery}</strong>’ সম্পর্কিত <strong>{filteredPlaces.length}</strong> টি স্থান পাওয়া গেছে
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-red-700 hover:text-red-900 font-bold underline ml-2"
          >
            সার্চ মুছুন
          </button>
        </div>
      )}

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            কোনো স্থান পাওয়া যায়নি
          </h4>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-4">
            {searchQuery 
              ? `‘${searchQuery}’ অনুসন্ধান অনুযায়ী কোনো স্থান মেলেনি। অনুগ্রহ করে অন্য নাম বা বিভাগ দিয়ে অনুসন্ধান করুন।`
              : 'নির্বাচিত বিভাগে কোনো স্থান খুঁজে পাওয়া যায়নি।'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সকল স্থান দেখুন</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const mapUrl = place.gmbMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.nameEn + ' Baruipur ' + place.address)}`;
            const phoneRaw = place.contact?.phone ? place.contact.phone.replace(/[^0-9]/g, '') : '';
            const coverImg = place.coverImage || place.images?.[0]?.url;

            return (
              <article 
                key={place.slug}
                className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Cover Image Thumbnail */}
                {coverImg && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={coverImg} 
                      alt={place.nameBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/90 text-slate-800 px-2.5 py-1 rounded-full backdrop-blur-xs shadow-xs">
                        {getCategoryIcon(place.category)}
                        <span className="uppercase tracking-wide">{place.category === 'Government & Civic Administration' ? 'civic' : place.category}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {place.videoEmbedUrl && (
                          <span className="p-1.5 rounded-full bg-red-600 text-white shadow-xs" title="ভিডিও উপলব্ধ">
                            <Video className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {place.images && place.images.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                            <Camera className="w-3 h-3" />
                            <span>{place.images.length}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Image Overlay Tagline */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium line-clamp-1">
                      {place.established && `স্থাপিত: ${place.established}`}
                      {place.entryFee && ` • ফি: ${place.entryFee}`}
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col">
                  {/* Name */}
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition mb-0.5 leading-snug">
                    <a href={`/places/${place.slug}/`}>
                      {place.nameBn}
                    </a>
                  </h2>
                  <h3 className="text-xs font-semibold text-slate-500 mb-2">
                    {place.nameEn}
                  </h3>

                  <p className="text-xs text-red-700 font-medium mb-3 line-clamp-1">
                    {place.taglineBn}
                  </p>

                  {/* Scannable Metadata Rows */}
                  <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs text-slate-600 mb-4 border border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{place.address}</span>
                    </div>
                    {place.contact?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <a href={`tel:${phoneRaw}`} className="font-bold text-slate-800 hover:text-red-600 transition truncate">
                          {place.contact.phone}
                        </a>
                      </div>
                    )}
                    {place.timings && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="line-clamp-1 text-slate-500">{place.timings}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Details | Map | Call */}
                  <div className="mt-auto grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`/places/${place.slug}/`}
                      className="bg-slate-900 hover:bg-red-600 text-white text-xs font-bold py-2 px-2 rounded-lg text-center transition flex items-center justify-center gap-1"
                    >
                      <span>বিস্তারিত</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 border border-slate-200"
                    >
                      <Map className="w-3 h-3 text-blue-600" />
                      <span>ম্যাপ</span>
                    </a>

                    {phoneRaw ? (
                      <a
                        href={`tel:${phoneRaw}`}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold py-2 px-2 rounded-lg text-center transition flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>কল</span>
                      </a>
                    ) : (
                      <span className="bg-slate-50 text-slate-400 text-xs font-semibold py-2 px-2 rounded-lg text-center border border-slate-100">
                        সরাসরি
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
