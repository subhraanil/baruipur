import React from 'react';
import { Phone, MapPin, ArrowUpRight, Star } from 'lucide-react';
import { cleanPlainExcerpt, formatPhoneForDisplay, formatPhoneForTel } from '@/lib/formatters';

export interface DirectoryCardProps {
  title: string;
  href: string;
  imageUrl?: string;
  excerpt?: string;
  categoryLabel: string;
  areaLabel?: string;
  statusLabel?: string;
  phone?: string | null;
  mapUrl?: string | null;
  isFeatured?: boolean;
}

export default function DirectoryCard({
  title,
  href,
  imageUrl,
  excerpt,
  categoryLabel,
  areaLabel = 'বারুইপুর',
  statusLabel,
  phone,
  mapUrl,
  isFeatured = false,
}: DirectoryCardProps) {
  const safeTel = formatPhoneForTel(phone);
  const displayPhone = formatPhoneForDisplay(phone);
  const cleanExcerpt = cleanPlainExcerpt(excerpt, 120, 140);
  const safeImage = imageUrl && imageUrl.trim() ? imageUrl : '/images/places/baruipur-junction-railway-station.jpg';

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col h-full">
      {/* 16:9 Image */}
      <a href={href} className="relative block aspect-video w-full bg-slate-100 overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {isFeatured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[14px] leading-none px-2.5 py-1.5 rounded-lg shadow-sm">
            <Star className="w-3.5 h-3.5 fill-slate-950" />
            Featured
          </span>
        )}
      </a>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* 3 Chips: Category, Area, Status/Open */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium text-[14px] leading-[1.5]">
            {categoryLabel}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 font-medium text-[14px] leading-[1.5]">
            {areaLabel}
          </span>
          {statusLabel && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-medium text-[14px] leading-[1.5]">
              {statusLabel}
            </span>
          )}
        </div>

        {/* Title (max 2 lines) */}
        <h3 className="text-[18px] sm:text-[22px] font-bold text-slate-900 leading-[1.4] line-clamp-2">
          <a href={href} className="hover:text-blue-800 transition-colors">
            {title}
          </a>
        </h3>

        {/* 120-140 char plain-text excerpt */}
        {cleanExcerpt && (
          <p className="text-slate-700 text-[16px] leading-[1.6] line-clamp-3 flex-1">
            {cleanExcerpt}
          </p>
        )}

        {/* Action Buttons (>= 44px tap targets) */}
        <div className="pt-2 mt-auto border-t border-slate-100 flex flex-wrap items-center gap-2">
          {safeTel && displayPhone && (
            <a
              href={safeTel}
              title={`কল করুন: ${displayPhone}`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-[16px] leading-[1.2] transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>কল</span>
            </a>
          )}
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-[16px] leading-[1.2] transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>ম্যাপ</span>
            </a>
          )}
          <a
            href={href}
            className="inline-flex items-center justify-center gap-1 min-h-[44px] px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-900 text-white font-medium text-[16px] leading-[1.2] ml-auto transition-colors"
          >
            <span>বিস্তারিত</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </article>
  );
}
