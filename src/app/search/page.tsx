import React from 'react';
import type { Metadata } from 'next';
import { getAllPlaces } from '@/lib/places';
import { getAllFacilities } from '@/lib/healthcare';
import { getAllOrganizations } from '@/lib/organizations';
import { getActiveNotices } from '@/lib/notices';
import { getAllTenders } from '@/lib/tenders';
import { db } from '@/lib/db';
import { cleanPlainExcerpt, getOrgCategoryBn, getPlaceCategoryBn } from '@/lib/formatters';
import SearchClient, { SearchItem } from './SearchClient';

export const metadata: Metadata = {
  title: 'অনুসন্ধান | বারুইপুর নাগরিক ডিরেক্টরি',
  description: 'বারুইপুরের ডাক্তার, হাসপাতাল, দর্শনীয় স্থান, ক্লাব ও সংগঠন, সরকারি নোটিস ও ই-টেন্ডার খুঁজুন।',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://baruipur.online/search',
  },
};

export default function SearchPage() {
  const places = getAllPlaces();
  const health = getAllFacilities();
  const orgs = getAllOrganizations();
  const notices = getActiveNotices();
  const tenders = getAllTenders();
  const guides = db.getArticles().filter((a) => a.status === 'published');

  const items: SearchItem[] = [];

  for (const h of health) {
    items.push({
      id: h.slug,
      type: 'health',
      typeBn: h.typeBn || 'স্বাস্থ্য কেন্দ্র',
      title: h.nameBn,
      subtitle: cleanPlainExcerpt(h.overviewBn || h.addressBn, 80, 120),
      area: h.area || h.landmarkBn || 'বারুইপুর',
      phone: h.phone,
      href: `/health-directory/${h.slug}`,
      keywords: `${h.nameEn} ${h.addressBn} ${(h.canonicalSpecialties || []).map((s) => s.bn).join(' ')}`,
    });

    if (Array.isArray(h.doctors)) {
      for (const d of h.doctors) {
        items.push({
          id: `${h.slug}-${d.id}`,
          type: 'doctor',
          typeBn: d.canonicalSpecialtyBn || d.specialtyBn || 'বিশেষজ্ঞ চিকিৎসক',
          title: `${d.nameBn} (${d.degrees})`,
          subtitle: `${h.nameBn} • ${d.daysBn || ''} ${d.timingBn || ''}`.trim(),
          area: h.area || h.landmarkBn || 'বারুইপুর',
          phone: d.appointmentPhone || h.phone,
          href: `/health-directory/${h.slug}#doctors`,
          keywords: `${d.nameEn} ${d.specialtyEn} ${d.canonicalSpecialtyBn || ''} ${h.nameBn}`,
        });
      }
    }
  }

  for (const p of places) {
    items.push({
      id: p.slug,
      type: 'place',
      typeBn: getPlaceCategoryBn(p.category, p.categoryBn),
      title: p.nameBn || p.nameEn,
      subtitle: cleanPlainExcerpt(p.overview || p.address, 80, 120),
      area: p.area || 'বারুইপুর',
      phone: p.phone || p.contact?.phone,
      href: `/places/${p.slug}`,
      keywords: `${p.nameEn} ${p.address}`,
    });
  }

  for (const o of orgs) {
    items.push({
      id: o.slug,
      type: 'org',
      typeBn: getOrgCategoryBn(o.category, o.categoryBn),
      title: o.nameBn || o.nameEn,
      subtitle: cleanPlainExcerpt(o.overview || o.address, 80, 120),
      area: o.landmark || 'বারুইপুর',
      phone: o.contact?.phone,
      href: `/organizations/${o.slug}`,
      keywords: `${o.nameEn} ${o.address}`,
    });
  }

  for (const n of notices) {
    items.push({
      id: n.id,
      type: 'notice',
      typeBn: 'সরকারি নোটিস',
      title: n.title,
      subtitle: `${n.departmentName} • ${n.memoNo} (${n.publishedDate})`,
      area: 'বারুইপুর',
      href: `/notices?id=${encodeURIComponent(n.id)}`,
      keywords: `${n.memoNo} ${n.departmentName} ${n.category} ${n.summary}`,
    });
  }

  for (const t of tenders) {
    items.push({
      id: t.id,
      type: 'tender',
      typeBn: 'ই-টেন্ডার',
      title: t.title,
      subtitle: `${t.authorityName || t.department} • NIT: ${t.nitNumber}`,
      area: t.location || 'বারুইপুর',
      href: `/tenders?id=${encodeURIComponent(t.id)}`,
      keywords: `${t.nitNumber} ${t.department} ${t.category}`,
    });
  }

  for (const g of guides) {
    items.push({
      id: g.id,
      type: 'guide',
      typeBn: g.categoryNameBn || 'নাগরিক গাইড',
      title: g.title,
      subtitle: cleanPlainExcerpt(g.summary || g.content, 80, 120),
      area: g.reportingLocation || 'বারুইপুর',
      href: `/${g.slug}`,
      keywords: `${g.categoryNameBn} ${g.reportingLocation || ''}`,
    });
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-[28px] sm:text-[40px] font-bold text-slate-900 leading-[1.3]">
          বারুইপুর ডিরেক্টরি অনুসন্ধান
        </h1>
        <p className="text-[17px] sm:text-[18px] text-slate-700 leading-[1.75] mt-1">
          ডাক্তার, হাসপাতাল, দর্শনীয় স্থান, ক্লাব, সরকারি নোটিস ও ই-টেন্ডার এক জায়গায় খুঁজুন।
        </p>
      </div>
      <SearchClient items={items} />
    </div>
  );
}
