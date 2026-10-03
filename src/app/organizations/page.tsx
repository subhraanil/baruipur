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
  title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব, সমাজসেবা ট্রাস্ট, সংগঠন ও ব্যবসা নির্দেশিকা | বারুইপুর Baruipur',
  description: 'রিয়েল স্টার ক্লাব, সামারসেট ক্লাব, ফুলতলা বিধান স্মৃতি সংঘ, বারুইপুর বার অ্যাসোসিয়েশন, ব্যবসায়ী সমিতি, ব্লাড ডোনার্স ফোরাম, রোটারি ও লায়ন্স ক্লাব সহ মহকুমার নিবন্ধিত ক্লাব, এনজিও, চ্যারিটি ট্রাস্ট ও ব্যবসায়িক প্রতিষ্ঠানের পূর্ণাঙ্গ তালিকা।',
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
    title: 'বারুইপুরের শীর্ষস্থানীয় ক্লাব, প্রতিষ্ঠান ও সমাজসেবা ট্রাস্ট ডিরেক্টরি',
    description: 'ঐতিহ্যবাহী ক্লাব, সমাজসেবী ট্রাস্ট, আইনজীবী সমিতি, বণিক সভা ও ব্যবসার নির্ভরযোগ্য যোগাযোগ ও তথ্যকোষ।',
    url: 'https://baruipur.online/organizations/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <a href="/" className="hover:text-red-600 transition">প্রচ্ছদ</a>
          <span>/</span>
          <span className="text-slate-800 font-semibold">সংস্থা, ক্লাব ও সংগঠন</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden border border-slate-800">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              যাচাইকৃত স্থানীয় ডিরেক্টরি ২০২৬
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
              বারুইপুরের ক্লাব, সমাজসেবা ট্রাস্ট ও প্রতিষ্ঠান নির্দেশিকা
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-2">
              ঐতিহ্যবাহী ক্রীড়া ক্লাব, রাসমাঠের টুর্নামেন্ট আয়োজক, রক্তদান ও ত্রাণ ট্রাস্ট, আইনজীবী সমিতি, বণিক সভা এবং শীর্ষস্থানীয় বাণিজ্যিক প্রতিষ্ঠানের সার্বিক যোগাযোগ ও তথ্যকোষ।
            </p>
          </div>
        </div>

        {/* Top Ad Space */}
        <AdSenseSlot format="leaderboard" className="mb-8" />

        {/* Interactive Client-Side Filter & Grid */}
        <OrganizationsListClient initialOrgs={allOrgs} />

        {/* Submission Call To Action */}
        <section className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              ডিরেক্টরি অন্তর্ভুক্তি
            </span>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              আপনার ক্লাব, স্বেচ্ছাসেবী সংস্থা বা প্রতিষ্ঠান যুক্ত করতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              বারুইপুর ও সংলগ্ন অঞ্চলের যে কোনো নিবন্ধিত ক্রীড়া ক্লাব, সমাজসেবা ট্রাস্ট, উৎসব কমিটি বা বাণিজ্যিক প্রতিষ্ঠান আমাদের পোর্টালে বিনামূল্যে তালিকাভুক্ত করা হয়।
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
