import React from 'react';
import type { Metadata } from 'next';
import { getAllOrganizations } from '@/lib/organizations';
import OrganizationsListClient from '@/components/OrganizationsListClient';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব, সমাজসেবা ট্রাস্ট ও প্রতিষ্ঠান',
  description: 'রিয়েল স্টার ক্লাব, সামারসেট ক্লাব, ফুলতলা বিধান স্মৃতি সংঘ, বার অ্যাসোসিয়েশন, রোটারি ও লায়ন্স ক্লাব সহ মহকুমার নিবন্ধিত প্রতিষ্ঠান সমূহের তালিকা।',
  keywords: [
    'Baruipur Clubs', 'Real Star Club Baruipur', 'Summerset Club', 'Bidhan Smriti Sangha Fultala',
    'Baruipur Bar Association', 'Baruipur Byabsayi Samity', 'Baruipur Blood Donors Forum',
    'Rotary Club of Baruipur', 'Lions Club Baruipur', 'Baruipur NGOs', 'Baruipur Directory',
    'বারুইপুর ক্লাব', 'বারুইপুর সমাজসেবা ট্রাস্ট', 'বারুইপুর সংগঠন'
  ],
  alternates: {
    canonical: 'https://baruipur.online/organizations/',
  },
  openGraph: {
    title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব ও প্রতিষ্ঠান ডিরেক্টরি - বারুইপুর অনলাইন',
    description: 'ঐতিহ্যবাহী ক্লাব, সমাজসেবী ট্রাস্ট, আইনজীবী সমিতি, বণিক সভা ও ব্যবসার নির্ভরযোগ্য যোগাযোগ ও তথ্যকোষ।',
    url: 'https://baruipur.online/organizations/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/organizations/real-star-club.jpg',
        width: 1200,
        height: 630,
        alt: 'বারুইপুরের প্রতিষ্ঠান ও সংগঠন ডিরেক্টরি',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব ও প্রতিষ্ঠান ডিরেক্টরি | Baruipur Online',
    description: 'ঐতিহ্যবাহী ক্লাব, সমাজসেবী ট্রাস্ট, আইনজীবী সমিতি ও খেলাধুলো সংগঠনের নির্ভরযোগ্য যোগাযোগ।',
    images: ['https://baruipur.online/images/organizations/real-star-club.jpg'],
    site: '@BaruipurOnline'
  }
};

export default function OrganizationsPage() {
  const allOrgs = getAllOrganizations();

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'বারুইপুর ক্লাব, সংগঠন, সমাজকল্যাণ ট্রাস্ট ও ব্যবসা ডিরেক্টরি',
    description: 'দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার নিবন্ধিত ক্লাব, দাতব্য ট্রাস্ট, আইনজীবী সমিতি ও বাণিজ্যিক প্রতিষ্ঠানের তালিকা।',
    itemListElement: allOrgs.map((org, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: org.nameBn,
      url: `https://baruipur.online/organizations/${org.slug}/`
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[14px] text-[#667085] mb-6">
          <a href="/" className="hover:text-[#245B91] transition">প্রচ্ছদ</a>
          <span>/</span>
          <span className="text-[#142B4A] font-bold">সংস্থা, ক্লাব ও সংগঠন</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-[#142B4A] rounded-2xl p-6 sm:p-10 text-white shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[14px] font-bold bg-[#F28C28] text-slate-950 mb-4">
              <ShieldCheck className="w-4 h-4" />
              যাচাইকৃত স্থানীয় ডিরেক্টরি • ২৬ নভেম্বর ২০২৬
            </span>
            <h1 className="text-[30px] sm:text-[42px] font-bold text-white mb-4 leading-[1.3]">
              বারুইপুরের ক্লাব, সমাজসেবা ট্রাস্ট ও প্রতিষ্ঠান নির্দেশিকা
            </h1>
            <p className="text-[18px] sm:text-[19px] text-slate-200 leading-[1.85] mb-2">
              ঐতিহ্যবাহী ক্রীড়া ক্লাব, রাসমাঠের টুর্নামেন্ট আয়োজক, রক্তদান ও ত্রাণ ট্রাস্ট, আইনজীবী সমিতি, বণিক সভা এবং শীর্ষস্থানীয় প্রতিষ্ঠানের সার্বিক যোগাযোগ ও তথ্যকোষ।
            </p>
          </div>
        </div>

        {/* Top Ad Space */}
        <AdSenseSlot format="leaderboard" className="mb-8" />

        {/* Interactive Client-Side Filter & Grid */}
        <OrganizationsListClient initialOrgs={allOrgs} />

        {/* Submission Call To Action */}
        <section className="bg-[#142B4A] text-white rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mt-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-[14px] font-bold bg-[#F28C28] text-slate-950 px-3 py-1 rounded-md mb-3">
              <Sparkles className="w-4 h-4" />
              ডিরেক্টরি অন্তর্ভুক্তি
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold mb-2">
              আপনার ক্লাব, স্বেচ্ছাসেবী সংস্থা বা প্রতিষ্ঠান যুক্ত করতে চান?
            </h3>
            <p className="text-[17px] text-slate-200 leading-[1.75]">
              বারুইপুর ও সংলগ্ন অঞ্চলের যে কোনো নিবন্ধিত ক্রীড়া ক্লাব, সমাজসেবা ট্রাস্ট, উৎসব কমিটি বা প্রতিষ্ঠান আমাদের পোর্টালে বিনামূল্যে তালিকাভুক্ত করা হয়।
            </p>
          </div>
          <a
            href="/contact"
            className="bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow whitespace-nowrap transition"
          >
            যোগাযোগ ও তালিকাভুক্তি →
          </a>
        </section>

        {/* Bottom Ad Space */}
        <AdSenseSlot format="leaderboard" className="mt-10" />
      </div>
    </div>
  );
}
