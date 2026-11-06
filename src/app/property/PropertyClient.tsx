'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Building, 
  MapPin, 
  Tag, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Home, 
  Layers, 
  Compass, 
  Search, 
  Filter, 
  ExternalLink,
  X,
  PlusCircle,
  Gavel
} from 'lucide-react';
import { Property, PropertyCategory } from '@/lib/properties';

interface PropertyClientProps {
  initialProperties: Property[];
  categories: PropertyCategory[];
  locations: string[];
}

export default function PropertyClient({ initialProperties, categories, locations }: PropertyClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProperty, setActiveModalProperty] = useState<Property | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  // Listing Form State
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [propertyType, setPropertyType] = useState('flat');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [listingSuccess, setListingSuccess] = useState(false);

  const filteredProperties = useMemo(() => {
    return initialProperties.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesLoc = selectedLocation === 'all' || p.location.includes(selectedLocation) || p.locationArea.toLowerCase().includes(selectedLocation.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.configuration.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchesCat && matchesLoc && matchesSearch;
    });
  }, [initialProperties, selectedCategory, selectedLocation, searchQuery]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setActiveModalProperty(null);
    }, 2500);
  };

  const handleListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListingSuccess(true);
    setTimeout(() => {
      setListingSuccess(false);
      setShowSubmitModal(false);
      setSellerName('');
      setSellerPhone('');
      setPropertyLocation('');
      setExpectedPrice('');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Search, Filter & Submit Listing Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="সম্পত্তির ধরন, এলাকা বা বাজেট লিখে খুঁজুন (উদাঃ ২ বিএইচকে, বাস্তু জমি, বাইপাস, নিলাম)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">📍 সমস্ত এলাকা</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap ml-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>বিনামূল্যে প্রপার্টি বিজ্ঞাপন দিন</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map(cat => {
            const count = cat.id === 'all' 
              ? initialProperties.length 
              : initialProperties.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.id === 'bank_auction' && <Gavel className="w-3.5 h-3.5 text-amber-400" />}
                {cat.id === 'land_plot' && <Compass className="w-3.5 h-3.5 text-emerald-400" />}
                {cat.id === 'new_flat' && <Building className="w-3.5 h-3.5 text-blue-400" />}
                <span>{cat.name.split(' (')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-600 px-1">
        <span>মোট <strong>{filteredProperties.length}</strong> টি সম্পত্তি পাওয়া গেছে</span>
        <span className="text-xs text-slate-500">যাচাইকৃত নথি ও সরাসরি যোগাযোগের সুযোগ</span>
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Home className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">আপনার অনুসন্ধানের কোনো সম্পত্তি মেলেনি</h3>
          <p className="text-slate-500 text-sm mt-1">দয়া করে অন্য ক্যাটাগরি বা এলাকা নির্বাচন করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => {
            const isAuction = property.category === 'bank_auction';
            return (
              <div
                key={property.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm flex items-center gap-1 ${
                      isAuction ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      {isAuction && <Gavel className="w-3 h-3" />}
                      {property.categoryNameBn.split(' (')[0]}
                    </span>
                    {property.featured && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Price Tag on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs text-slate-200 block">মূল্য:</span>
                      <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow">
                        {property.price}
                      </span>
                    </div>
                    <span className="bg-black/60 backdrop-blur-md text-xs px-2.5 py-1 rounded-md text-slate-200 font-mono">
                      {property.areaSqFt}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-emerald-700 transition">
                      {property.title}
                    </h3>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                        {property.configuration}
                      </span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                        {property.facing}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                        {property.possessionStatus}
                      </span>
                    </div>

                    {/* Approval Notice */}
                    <p className="text-xs text-slate-500 flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{property.approvalStatus}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProperty(property)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold transition text-center"
                    >
                      বিস্তারিত দেখুন
                    </button>
                    <a
                      href={`https://wa.me/${property.contactWhatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`নমস্কার, আমি baruipur.online এ আপনার সম্পত্তিটি দেখলাম: ${property.title} (${property.price})। এটি কি উপলব্ধ আছে?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-2.5 rounded-xl transition"
                      title="হোয়াটসঅ্যাপে চ্যাট করুন"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${property.contactPhone.replace(/[^\d+]/g, '')}`}
                      className="bg-red-50 hover:bg-red-100 text-red-700 p-2.5 rounded-xl transition"
                      title="সরাসরি কল করুন"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Property Details Modal */}
      {activeModalProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setActiveModalProperty(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md text-xs font-bold inline-block">
                {activeModalProperty.categoryNameBn}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {activeModalProperty.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{activeModalProperty.location}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-700 block">সম্পত্তির মূল্য:</span>
                <span className="text-2xl font-extrabold text-emerald-900">{activeModalProperty.price}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">সাইজ / ক্ষেত্রফল:</span>
                <span className="text-base font-bold text-slate-800">{activeModalProperty.areaSqFt}</span>
              </div>
            </div>

            {/* Details Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">কনফিগারেশন:</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.configuration}</span>
              </div>
              <div>
                <span className="text-slate-400 block">দিক (Facing):</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.facing}</span>
              </div>
              <div>
                <span className="text-slate-400 block">হস্তান্তর স্ট্যাটাস:</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.possessionStatus}</span>
              </div>
              <div>
                <span className="text-slate-400 block">অনুমোদন:</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.approvalStatus}</span>
              </div>
              <div>
                <span className="text-slate-400 block">ব্যাংক লোন:</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.bankLoanApproved}</span>
              </div>
              <div>
                <span className="text-slate-400 block">RERA স্ট্যাটাস:</span>
                <span className="font-semibold text-slate-800">{activeModalProperty.reraStatus}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">সম্পত্তির বিবরণ:</h4>
              <p>{activeModalProperty.description}</p>
            </div>

            {/* Amenities */}
            {activeModalProperty.amenities && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">সুযোগ-সুবিধাসমূহ:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalProperty.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">সরাসরি বিক্রেতা/এজেন্সির সাথে যোগাযোগ করুন:</h4>
              <div className="text-xs text-slate-600">
                যোগাযোগের ব্যক্তি: <strong>{activeModalProperty.contactPerson}</strong> | ফোন: <strong>{activeModalProperty.contactPhone}</strong>
              </div>

              {inquirySent ? (
                <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl text-xs font-bold text-center">
                  ✅ আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="আপনার নাম *"
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="আপনার মোবাইল নম্বর *"
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
                    >
                      কল ব্যাক বা ভিজিট বুক করুন
                    </button>
                    <a
                      href={`tel:${activeModalProperty.contactPhone.replace(/[^\d+]/g, '')}`}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>সরাসরি কল</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Free Listing Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">আপনার সম্পত্তি বিক্রি বা ভাড়া দিন</h3>
              <p className="text-xs text-slate-500">বারুইপুর অনলাইনের মাধ্যমে হাজার হাজার স্থানীয় ক্রেতার কাছে পৌঁছান সম্পূর্ণ বিনামূল্যে।</p>
            </div>

            {listingSuccess ? (
              <div className="bg-emerald-100 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">ধন্যবাদ! লিস্টিং আবেদন জমা পড়েছে।</h4>
                <p className="text-xs text-emerald-700">আমাদের রিয়েল এস্টেট ভেরিফিকেশন টিম নথিপত্র যাচাই করে ২৪ ঘণ্টার মধ্যে লিস্টিং লাইভ করে দেবে।</p>
              </div>
            ) : (
              <form onSubmit={handleListingSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="সম্পূর্ণ নাম লিখুন"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">মোবাইল নম্বর (হোয়াটসঅ্যাপ সহ) *</label>
                  <input
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="+91 ৯৮৩০০০০০০০"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">সম্পত্তির ধরন *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="flat">নতুন/পুরোনো ফ্ল্যাট</option>
                      <option value="land">বাস্তু জমি / প্লট</option>
                      <option value="house">স্বাধীন বাড়ি</option>
                      <option value="commercial">দোকান / বাণিজ্যিক</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">প্রত্যাশিত মূল্য *</label>
                    <input
                      type="text"
                      required
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      placeholder="উদাঃ ২৫ লক্ষ টাকা"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">এলাকা ও অবস্থান *</label>
                  <input
                    type="text"
                    required
                    value={propertyLocation}
                    onChange={(e) => setPropertyLocation(e.target.value)}
                    placeholder="উদাঃ পদ্মপুকুর মোড় / বারুইপুর বাইপাস"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm mt-2"
                >
                  বিনামূল্যে লিস্টিং রিকোয়েস্ট পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Buyer's Legal Advisory Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>বারুইপুরে জমি বা ফ্ল্যাট কেনার আগে ক্রেতাদের জন্য বিশেষ আইনি সতর্কতা</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1.5">
            <h5 className="font-bold text-white text-sm">১. পরচা ও দাগ খতিয়ান যাচাই</h5>
            <p>জমি কেনার আগে অবশ্যই ‘বাংলারভূমি’ পোর্টালে জমির শ্রেণি ‘বাস্তু’ কিনা এবং পিওআর (POR) বর্তমান মালিকের নামে নথিভুক্ত কিনা খতিয়ে দেখুন।</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1.5">
            <h5 className="font-bold text-white text-sm">২. পৌরসভা স্যাংশন প্ল্যান</h5>
            <p>ফ্ল্যাট কেনার ক্ষেত্রে বারুইপুর পুরসভা কর্তৃক অনুমোদিত বিল্ডিং প্ল্যান ও কমপ্লিশন সার্টিফিকেট (CC) রয়েছে কিনা নিশ্চিত করুন।</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1.5">
            <h5 className="font-bold text-white text-sm">৩. ব্যাংক অকশন প্রপার্টি সুবিধা</h5>
            <p>ব্যাংক ই-নিলাম প্রপার্টির ক্ষেত্রে ব্যাংক সরাসরি নিষ্কন্টক সার্টিফিকেট প্রদান করে, ফলে টাইটেল সংক্রান্ত কোনো মামলা বা জটিলতা থাকে না।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
