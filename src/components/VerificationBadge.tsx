import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface VerificationBadgeProps {
  verifiedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
  updatedAt?: string;
  reportHref?: string;
}

/**
 * Computed freshness/verification badge (v3.1 Section 10.9).
 * Never defaults to build time or fabricated dates.
 */
export default function VerificationBadge({
  verifiedAt,
  sourceName,
  sourceUrl,
  updatedAt,
  reportHref = '/contact?report=true',
}: VerificationBadgeProps) {
  if (!verifiedAt && !updatedAt) {
    return null;
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-[14px]">
      {verifiedAt && sourceName ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#23845B] border border-emerald-200 font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            যাচাইকৃত · {verifiedAt} ·{' '}
            {sourceUrl ? (
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {sourceName}
              </a>
            ) : (
              sourceName
            )}
          </span>
        </span>
      ) : updatedAt ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F7FA] text-[#667085] border border-[#E4E7EC] font-medium">
          <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>আপডেট করা হয়েছে {updatedAt}</span>
        </span>
      ) : null}

      <a href={reportHref} className="text-[#245B91] font-medium hover:underline">
        ভুল তথ্য জানান
      </a>
    </div>
  );
}
