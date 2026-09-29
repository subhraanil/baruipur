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

  return (
    <div className={`my-6 w-full overflow-hidden ${className}`}>
      {/* Discreet Ad label header */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5 px-1">
        <span>{label}</span>
        <span className="text-[9px] opacity-75">Google AdSense Space</span>
      </div>

      {slotId ? (
        /* Live AdSense Ins Element */
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
      ) : (
        /* Reserved Ad Placement Placeholder (Ready for future ad code) */
        <div 
          className={`w-full bg-gradient-to-b from-slate-50 to-slate-100/60 border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition hover:border-slate-400 ${config.containerHeight}`}
        >
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200/80 shadow-2xs px-3 py-1 rounded-full text-slate-600 text-[11px] font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>বিজ্ঞাপন স্লট সংরক্ষিত (Ad Space Reserved)</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {config.badge}
          </p>
          <p className="text-[10px] text-slate-400 mt-1 max-w-sm">
            Google AdSense অ্যাকাউন্ট: <code className="bg-slate-200/60 px-1 py-0.5 rounded font-mono text-[9px]">ca-pub-4871015401102715</code>
          </p>
        </div>
      )}
    </div>
  );
}
