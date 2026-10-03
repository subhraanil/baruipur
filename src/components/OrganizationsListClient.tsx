'use client';

import React, { useState, useMemo } from 'react';
import { OrganizationItem } from '@/lib/organizations';
import { 
  Building2, 
  Trophy, 
  HeartHandshake, 
  Briefcase, 
  Scale, 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Users2, 
  Calendar 
} from 'lucide-react';

interface OrganizationsListClientProps {
  initialOrgs: OrganizationItem[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'club': return <Trophy className="w-4 h-4 text-amber-600" />;
    case 'charity': return <HeartHandshake className="w-4 h-4 text-rose-600" />;
    case 'association': return <Scale className="w-4 h-4 text-indigo-600" />;
    case 'business': return <Briefcase className="w-4 h-4 text-emerald-600" />;
    default: return <Building2 className="w-4 h-4 text-slate-600" />;
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'club': return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'charity': return 'bg-rose-50 text-rose-800 border-rose-200';
    case 'association': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    case 'business': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    default: return 'bg-slate-50 text-slate-800 border-slate-200';
  }
};

export default function OrganizationsListClient({ initialOrgs }: OrganizationsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'সকল প্রতিষ্ঠান', count: initialOrgs.length },
    { id: 'club', label: '🏆 ক্লাব ও স্পোর্টস', count: initialOrgs.filter(o => o.category === 'club').length },
    { id: 'charity', label: '❤️ দাতব্য ও ট্রাস্ট', count: initialOrgs.filter(o => o.category === 'charity').length },
    { id: 'association', label: '⚖️ সংগঠন ও সমিতি', count: initialOrgs.filter(o => o.category === 'association').length },
    { id: 'business', label: '💼 ব্যবসা ও বাণিজ্য', count: initialOrgs.filter(o => o.category === 'business').length },
  ];

  const filteredOrgs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialOrgs.filter((org) => {
      const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
      const matchesSearch = !q || 
        org.nameBn.toLowerCase().includes(q) || 
        org.nameEn.toLowerCase().includes(q) ||
        org.taglineBn.toLowerCase().includes(q) ||
        org.overview.toLowerCase().includes(q) ||
        org.address.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialOrgs, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search Input Box */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ক্লাব, ট্রাস্ট, সমিতি বা ব্যবসার নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Organizations Grid */}
      {filteredOrgs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm my-8">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">কোনো প্রতিষ্ঠান পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mb-4">আপনার অনুসন্ধানের সাথে মিল রেখে কোনো রেকর্ড খুঁজে পাওয়া যায়নি।</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            সব প্রতিষ্ঠান পুনরায় দেখুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOrgs.map((org) => (
            <div
              key={org.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Card Header Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={org.coverImage || '/images/places/baruipur-bypass.jpg'}
                  alt={org.nameBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${getCategoryBadgeClass(org.category)}`}>
                    {getCategoryIcon(org.category)}
                    {org.categoryBn}
                  </span>
                </div>

                {/* Established Year */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {org.established}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition mb-1 leading-snug">
                    <a href={`/organizations/${org.slug}/`}>
                      {org.nameBn}
                    </a>
                  </h2>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {org.nameEn}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {org.taglineBn}
                  </p>

                  {/* Key Details List */}
                  <div className="space-y-2 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{org.address}</span>
                    </div>
                    {org.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800">{org.contact.phone}</span>
                      </div>
                    )}
                    {org.keyPeople && org.keyPeople[0] && (
                      <div className="flex items-center gap-2">
                        <Users2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{org.keyPeople[0].roleBn}: <strong className="text-slate-800">{org.keyPeople[0].name}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-1.5">
                    {org.contact.phone && (
                      <a
                        href={`tel:${org.contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition text-xs font-semibold"
                        title="সরাসরি কল করুন"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {org.contact.whatsapp && (
                      <a
                        href={`https://wa.me/91${org.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition text-xs font-semibold"
                        title="হোয়াটসঅ্যাপে যোগাযোগ"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <a
                    href={`/organizations/${org.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition group/btn"
                  >
                    <span>বিস্তারিত তথ্য</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
