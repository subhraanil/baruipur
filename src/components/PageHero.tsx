import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  breadcrumbLabel: string;
  badgeText: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

/**
 * Unified #142B4A Navy Hero component shared across all category/directory listing pages.
 */
export default function PageHero({
  breadcrumbLabel,
  badgeText,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px] text-[#667085] mb-6">
        <a href="/" className="hover:text-[#245B91] font-medium transition-colors">
          প্রচ্ছদ
        </a>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-[#142B4A] font-bold truncate">{breadcrumbLabel}</span>
      </nav>

      <div className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-[#F28C28] text-slate-950 text-[14px] font-bold px-3 py-1 rounded-md mb-4">
            {badgeText}
          </span>
          <h1 className="text-[30px] sm:text-[42px] font-bold text-white mb-4 leading-[1.3]">
            {title}
          </h1>
          <p className="text-[18px] sm:text-[19px] text-slate-200 leading-[1.85]">
            {description}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </>
  );
}
