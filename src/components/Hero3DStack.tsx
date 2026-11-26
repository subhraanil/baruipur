import React from 'react';
import { Hospital, FileText, TrainTrack, ArrowRight, Landmark } from 'lucide-react';
import { toBengaliDigits } from '@/lib/formatters';

interface Hero3DStackProps {
  activeTendersCount: number;
  placesCount: number;
  bankAuctionsCount: number;
}

/**
 * Pure CSS 3D layered civic snapshot stack for the desktop Hero.
 * Zero external JS / WebGL — 100% GPU-composited transforms.
 */
export default function Hero3DStack({
  activeTendersCount,
  placesCount,
  bankAuctionsCount,
}: Hero3DStackProps) {
  return (
    <div className="hidden lg:flex items-center justify-center perspective-1000 py-4">
      <div className="relative w-full max-w-[380px] preserve-3d hero-float-3d space-y-3.5">
        {/* Layer 1: Emergency & Hospital Card */}
        <a
          href="/health-directory/baruipur-subdivisional-hospital"
          className="block rounded-2xl bg-[#142B4A] text-white p-4 shadow-xl border border-[#245B91] transform hover:translate-x-1 transition-transform"
          style={{ transform: 'translateZ(36px)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D93636] flex items-center justify-center shrink-0">
                <Hospital className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[14px] text-amber-300 font-bold block">২৪×৭ জরুরি স্বাস্থ্য</span>
                <p className="text-[16px] font-bold leading-snug">বারুইপুর মহকুমা হাসপাতাল</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-[14px] text-slate-200">
            <span>মূল: 033-2433-5303</span>
            <span className="font-bold text-amber-300">জরুরি: 8100820190</span>
          </div>
        </a>

        {/* Layer 2: Tenders & Bank Auctions */}
        <a
          href="/property?category=bank_auction"
          className="block rounded-2xl bg-white text-[#202938] p-4 shadow-lg border border-[#E4E7EC] transform hover:translate-x-1 transition-transform ml-4"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F28C28]/20 text-[#b45309] flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[14px] text-[#667085] font-medium block">ব্যাংক নিলাম ও ই-টেন্ডার</span>
                <p className="text-[16px] font-bold text-[#142B4A]">
                  {toBengaliDigits(bankAuctionsCount)}টি ব্যাংক নিলাম • {toBengaliDigits(activeTendersCount)}টি টেন্ডার
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#245B91] shrink-0" />
          </div>
        </a>

        {/* Layer 3: Local Trains & Places */}
        <a
          href="/transport"
          className="block rounded-2xl bg-[#F5F7FA] text-[#202938] p-4 shadow-md border border-[#E4E7EC] transform hover:translate-x-1 transition-transform ml-8"
          style={{ transform: 'translateZ(8px)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#245B91]/15 text-[#245B91] flex items-center justify-center shrink-0">
                <TrainTrack className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[14px] text-[#667085] font-medium block">শিয়ালদহ দক্ষিণ শাখা</span>
                <p className="text-[16px] font-bold text-[#142B4A]">
                  লোকাল ট্রেন সময়সূচি ও {toBengaliDigits(placesCount)}টি স্থান
                </p>
              </div>
            </div>
            <FileText className="w-4 h-4 text-[#667085] shrink-0" />
          </div>
        </a>
      </div>
    </div>
  );
}
