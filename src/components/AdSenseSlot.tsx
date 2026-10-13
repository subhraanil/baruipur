'use client';

import React, { useEffect, useRef } from 'react';

export interface AdSenseSlotProps {
  /**
   * Optional Google AdSense data-ad-slot ID.
   * If provided, live Google AdSense ad is rendered.
   * If omitted, a clean, responsive placeholder is displayed marking the reserved ad space.
   */
  slotId?: string;
  /**
   * Ad placement layout format
   */
  format?: 'leaderboard' | 'in-article' | 'in-feed' | 'sidebar' | 'responsive';
  /**
   * Custom label for the ad space (default: "বিজ্ঞাপন • ADVERTISEMENT")
   */
  label?: string;
  /**
   * Additional custom CSS classes
   */
  className?: string;
}

export default function AdSenseSlot({
  slotId,
  format = 'responsive',
  label = 'বিজ্ঞাপন • ADVERTISEMENT',
  className = ''
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    if (slotId && !isPushed.current) {
      try {
        if (typeof window !== 'undefined') {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          isPushed.current = true;
        }
      } catch (err) {
        console.warn('AdSense ad push error:', err);
      }
    }
  }, [slotId]);

  // Dimension and styling variants based on format
  interface AdFormatConfig {
    containerHeight: string;
    badge: string;
    dataAdFormat: string;
    layoutKey?: string;
  }

  const formatConfigs: Record<string, AdFormatConfig> = {
    leaderboard: {
      containerHeight: 'min-h-[90px] sm:min-h-[110px]',
      badge: 'শীর্ষ ব্যানার (Leaderboard 728x90)',
      dataAdFormat: 'horizontal'
    },
    'in-article': {
      containerHeight: 'min-h-[140px] sm:min-h-[200px]',
      badge: 'প্রতিবেদন বিজ্ঞাপন (In-Article Responsive)',
      dataAdFormat: 'fluid',
      layoutKey: '-fb+5w+4e-db+86'
    },
    'in-feed': {
      containerHeight: 'min-h-[120px] sm:min-h-[160px]',
      badge: 'ফিড বিজ্ঞাপন (In-Feed Native)',
      dataAdFormat: 'fluid'
    },
    sidebar: {
      containerHeight: 'min-h-[250px] sm:min-h-[280px]',
      badge: 'সাইডবার বিজ্ঞাপন (Sidebar 300x250)',
      dataAdFormat: 'rectangle'
    },
    responsive: {
      containerHeight: 'min-h-[100px] sm:min-h-[150px]',
      badge: 'রেস্পন্সিভ বিজ্ঞাপন (Auto Responsive)',
      dataAdFormat: 'auto'
    }
  };

  const config = formatConfigs[format] || formatConfigs.responsive;

  if (!slotId) {
    // During review or before ad slots are configured, render nothing to keep the layout clean and policy compliant
    return null;
  }

  return (
    <div className={`my-6 w-full overflow-hidden ${className}`}>
      {/* Discreet Ad label header */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5 px-1">
        <span>{label}</span>
      </div>

      <div className={`w-full bg-white text-center flex items-center justify-center ${config.containerHeight}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4871015401102715"
          data-ad-slot={slotId}
          data-ad-format={config.dataAdFormat}
          data-full-width-responsive="true"
          {...(config.layoutKey ? { 'data-ad-layout-key': config.layoutKey } : {})}
        />
      </div>
    </div>
  );
}
