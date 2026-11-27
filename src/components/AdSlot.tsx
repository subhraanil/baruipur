import React from 'react';

interface AdSlotProps {
  variant?: 'leaderboard' | 'rectangle';
  slotId?: string;
  className?: string;
}

/**
 * Fixed-height AdSense reservation container to prevent Cumulative Layout Shift (CLS).
 */
export default function AdSlot({ variant = 'leaderboard', slotId = 'auto', className = '' }: AdSlotProps) {
  const heightClass = variant === 'rectangle' ? 'min-h-[250px]' : 'min-h-[90px] sm:min-h-[100px]';

  return (
    <aside
      aria-label="বিজ্ঞাপন"
      data-ad-slot={slotId}
      className={`w-full max-w-[1200px] mx-auto my-6 rounded-xl border border-[#E4E7EC] bg-slate-50 flex items-center justify-center overflow-hidden ${heightClass} ${className}`}
    >
      <span className="text-[14px] text-[#667085] font-medium select-none">
        বিজ্ঞাপন
      </span>
    </aside>
  );
}
