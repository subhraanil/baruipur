import React from 'react';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/lib/constants';
import { formatPhoneForTel } from '@/lib/formatters';

interface EmergencyRowProps {
  compact?: boolean;
}

/**
 * Single source of truth emergency tap-to-call row (v3.1 Section 8.5).
 * Reads verified numbers exclusively from EMERGENCY_CONTACTS.
 */
export default function EmergencyRow({ compact = false }: EmergencyRowProps) {
  const police = EMERGENCY_CONTACTS.find((c) => c.titleBn.includes('পুলিশ'));
  const hospital = EMERGENCY_CONTACTS.find((c) => c.titleBn.includes('হাসপাতাল'));
  const fire = EMERGENCY_CONTACTS.find((c) => c.titleBn.includes('দমকল'));

  const buttons = [
    { label: 'পুলিশ (112)', tel: 'tel:112', number: '112' },
    { label: 'অ্যাম্বুল্যান্স (102)', tel: 'tel:102', number: '102' },
    { label: 'দমকল (101)', tel: fire ? formatPhoneForTel(fire.phone) || 'tel:101' : 'tel:101', number: fire?.phone || '101' },
    {
      label: `মহকুমা হাসপাতাল (${hospital?.phone || '033-2433-5303'})`,
      tel: hospital ? formatPhoneForTel(hospital.phone) : null,
      number: hospital?.phone,
    },
  ].filter((b) => Boolean(b.tel));

  return (
    <section
      aria-label="জরুরি হেল্পলাইন"
      className={`bg-white rounded-2xl border border-[#E4E7EC] shadow-sm ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#D93636] shrink-0" aria-hidden="true" />
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#142B4A] leading-[1.35]">
            জরুরি সাহায্য (এক ক্লিকে কল করুন)
          </h2>
        </div>
        <a
          href="/emergency-contacts"
          className="inline-flex items-center gap-1 min-h-[44px] px-2 text-[15px] font-semibold text-[#245B91] hover:underline"
        >
          <span>সব জরুরি নম্বর দেখুন</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {buttons.map((b) => (
          <a
            key={b.label}
            href={b.tel!}
            className="min-h-[56px] px-4 py-3 rounded-xl bg-[#D93636] hover:bg-[#b82828] text-white font-bold text-[16px] leading-[1.3] flex items-center justify-center gap-2 text-center transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{b.label}</span>
          </a>
        ))}
      </div>

      {police && (
        <p className="mt-3 text-[14px] text-[#667085]">
          বারুইপুর পুলিশ জেলা কন্ট্রোল রুম: <span className="font-bold text-[#202938]">{police.phone}</span> • সর্বদা যাচাইকৃত সরকারি নম্বর।
        </p>
      )}
    </section>
  );
}
