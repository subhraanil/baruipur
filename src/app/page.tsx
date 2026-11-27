import React from 'react';
import {
  Search,
  Stethoscope,
  Hospital,
  Bell,
  FileText,
  TrainTrack,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageSquareWarning,
  ExternalLink,
} from 'lucide-react';
import { getAllPlaces } from '@/lib/places';
import { getAllOrganizations } from '@/lib/organizations';
import { getAllFacilities } from '@/lib/healthcare';
import { getActiveNotices } from '@/lib/notices';
import { getAllTenders } from '@/lib/tenders';
import { getAllProperties } from '@/lib/properties';
import { db } from '@/lib/db';
import DirectoryCard from '@/components/DirectoryCard';
import AdSlot from '@/components/AdSlot';
import Hero3DStack from '@/components/Hero3DStack';
import EmergencyRow from '@/components/EmergencyRow';
import {
  CANONICAL_SPECIALTIES,
  getOrgCategoryBn,
  getPlaceCategoryBn,
  isClosingSoon,
  toBengaliDigits,
  toLatinDigits,
} from '@/lib/formatters';

const HOME_PLACE_CATEGORIES = new Set([
  'culture',
  'heritage',
  'landmark',
  'sports',
  'tourism',
  'park',
  'temple',
]);

export default function HomePage() {
  const places = getAllPlaces();
  const orgs = getAllOrganizations();
  const healthFacilities = getAllFacilities();
  const notices = getActiveNotices();
  const tenders = getAllTenders();
  const properties = getAllProperties();

  const bankAuctionsCount = properties.filter((p) => p.category === 'bank_auction').length;
  const curatedGuides = db
    .getArticles()
    .filter((a) => a.status === 'published')
    .slice(0, 3);

  const totalDoctors = healthFacilities.reduce(
    (sum, h) => sum + (Array.isArray(h.doctors) ? h.doctors.length : h.doctorsCount || 0),
    0
  );

  const now = new Date();
  const featuredNotices = notices.slice(0, 5);
  const activeTenders = tenders.filter((t) => {
    if (!t.closingDate) return true;
    const d = new Date(toLatinDigits(t.closingDate).trim());
    return isNaN(d.getTime()) || d >= now;
  });
  const featuredTenders = activeTenders.slice(0, 5);

  // H3 Seasonal FeaturedEvent (only shown between startsAt and endsAt)
  const seasonalEvent = {
    titleBn: 'বারুইপুর রাসমেলা ২০২৬ — সময়সূচি, স্টল ও ট্রাফিক নির্দেশিকা',
    startsAt: '2026-11-15T00:00:00+05:30',
    endsAt: '2026-12-05T23:59:59+05:30',
    guideHref: '/places/baruipur-rashmath',
    noticeHref: '/notices',
  };
  const showSeasonalStrip =
    now >= new Date(seasonalEvent.startsAt) && now <= new Date(seasonalEvent.endsAt);

  // Rule 11: One entity, one appearance per page
  const seenEntityIds = new Set<string>();

  // H6 Health: 1 government hospital + 2 others (deterministic)
  const sdh = healthFacilities.find((h) => h.slug === 'baruipur-subdivisional-hospital');
  const pubali = healthFacilities.find((h) => h.slug === 'pubali-clinic-baruipur');
  const othersHealth = healthFacilities.filter(
    (h) => h.slug !== 'baruipur-subdivisional-hospital' && h.slug !== 'pubali-clinic-baruipur'
  );
  const featuredHealth = [sdh, pubali, othersHealth[0]].filter(Boolean).slice(0, 3);
  featuredHealth.forEach((h) => {
    if (h) seenEntityIds.add(h.slug);
  });

  // H7 Heritage, Culture & Tourism Places ONLY (exclude health, civic, police, infrastructure)
  const featuredPlaces = places
    .filter((p) => !seenEntityIds.has(p.slug) && HOME_PLACE_CATEGORIES.has((p.category || '').toLowerCase()))
    .slice(0, 6);
  featuredPlaces.forEach((p) => seenEntityIds.add(p.slug));

  // H8 Organizations: max 2 per category, deduped
  const orgCatCounts: Record<string, number> = {};
  const featuredOrgs = orgs
    .filter((o) => {
      if (seenEntityIds.has(o.slug)) return false;
      const c = o.category || 'club';
      if ((orgCatCounts[c] || 0) >= 2) return false;
      orgCatCounts[c] = (orgCatCounts[c] || 0) + 1;
      return true;
    })
    .slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* H2. Split Hero: Short H1 + Keyword Sub-line + Search + 6 Intent Tiles | 3D Civic Stack */}
      <section className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3 max-w-[700px]">
              <h1 className="text-[30px] sm:text-[42px] font-bold text-[#142B4A] leading-[1.3]">
                আপনার বারুইপুর, সব তথ্য এক জায়গায়
              </h1>
              <p className="text-[18px] sm:text-[19px] text-[#202938] leading-[1.85]">
                বারুইপুরের সমস্ত স্থান, প্রতিষ্ঠান, স্বাস্থ্যসেবা, সরকারি নোটিস, ব্যাংক নিলাম প্রপার্টি ও ই-টেন্ডার।
              </p>
            </div>

            <form action="/search" method="GET" className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  placeholder="বারুইপুরে কী খুঁজছেন?"
                  aria-label="বারুইপুর ডিরেক্টরিতে খুঁজুন"
                  className="w-full min-h-[54px] pl-12 pr-4 py-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] focus:bg-white focus:border-[#245B91] focus:outline-none text-[18px] text-[#202938]"
                />
              </div>
              <button
                type="submit"
                className="min-h-[54px] px-7 py-3 rounded-xl bg-[#142B4A] hover:bg-[#245B91] text-white font-bold text-[16px] leading-[1.3] transition-colors shrink-0"
              >
                অনুসন্ধান করুন
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <Hero3DStack
              activeTendersCount={activeTenders.length}
              placesCount={places.length}
              bankAuctionsCount={bankAuctionsCount}
            />
          </div>
        </div>

        {/* H4. Quick Access (6 Intent Tiles) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 mt-6 border-t border-[#E4E7EC]">
          <a
            href="/search?type=doctor"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-blue-50 hover:border-[#245B91] text-[#142B4A] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Stethoscope className="w-6 h-6 text-[#245B91]" aria-hidden="true" />
            <span>ডাক্তার খুঁজুন</span>
          </a>

          <a
            href="/health-directory"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-emerald-50 hover:border-[#23845B] text-[#142B4A] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Hospital className="w-6 h-6 text-[#23845B]" aria-hidden="true" />
            <span>হাসপাতাল</span>
          </a>

          <a
            href="/notices"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-amber-50 hover:border-[#F28C28] text-[#142B4A] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Bell className="w-6 h-6 text-amber-700" aria-hidden="true" />
            <span>সরকারি নোটিস</span>
          </a>

          <a
            href="/tenders"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-slate-100 hover:border-[#142B4A] text-[#142B4A] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <FileText className="w-6 h-6 text-[#142B4A]" aria-hidden="true" />
            <span>ই-টেন্ডার</span>
          </a>

          <a
            href="/transport"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-indigo-50 hover:border-[#245B91] text-[#142B4A] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <TrainTrack className="w-6 h-6 text-[#245B91]" aria-hidden="true" />
            <span>যাতায়াত</span>
          </a>

          <a
            href="/emergency-contacts"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-[#D93636] font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Sparkles className="w-6 h-6 text-[#D93636]" aria-hidden="true" />
            <span>জরুরি নম্বর</span>
          </a>
        </div>
      </section>

      {/* H3. Seasonal Event Strip (Date-Gated) */}
      {showSeasonalStrip && (
        <section
          aria-label="মৌসুমি উৎসব তথ্য"
          className="bg-white rounded-2xl border border-[#E4E7EC] border-l-4 border-l-[#F28C28] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded bg-[#F28C28] text-[#142B4A] font-bold text-[14px]">
              চলমান উৎসব ও অনুষ্ঠান
            </span>
            <p className="text-[18px] font-bold text-[#142B4A] leading-snug">
              {seasonalEvent.titleBn}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={seasonalEvent.guideHref}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl bg-[#F28C28] hover:bg-amber-400 text-[#142B4A] font-bold text-[15px] transition-colors"
            >
              রাসমেলা গাইড
            </a>
            <a
              href={seasonalEvent.noticeHref}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl border border-[#142B4A] text-[#142B4A] hover:bg-[#F5F7FA] font-semibold text-[15px] transition-colors"
            >
              ট্রাফিক নোটিস
            </a>
          </div>
        </section>
      )}

      {/* H4b. Single-Source Emergency Row */}
      <EmergencyRow />

      {/* H5. সাম্প্রতিক আপডেট (Notices & Tenders Side-by-Side w/ Memo, NIT, PDF/Source) */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-[#142B4A] leading-[1.38]">
            সাম্প্রতিক আপডেট
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Official Notices Panel */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
              <h3 className="text-[19px] sm:text-[22px] font-bold text-[#142B4A] flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-700" aria-hidden="true" />
                <span>সরকারি নোটিস</span>
              </h3>
              <a
                href="/notices"
                className="inline-flex items-center gap-1 min-h-[44px] px-2 text-[16px] font-semibold text-[#245B91] hover:underline"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="divide-y divide-[#E4E7EC]">
              {featuredNotices.map((n) => (
                <div key={n.id} className="py-3 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#667085]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {n.publishedDate}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#F5F7FA] text-[#142B4A] font-medium">
                      {n.departmentName}
                    </span>
                    {n.memoNo && <span className="font-mono text-[14px]">{n.memoNo}</span>}
                    {n.isUrgent && (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-[#D93636] font-bold">
                        জরুরি
                      </span>
                    )}
                  </div>
                  <a
                    href={`/notices?id=${encodeURIComponent(n.id)}`}
                    className="block text-[17px] font-bold text-[#202938] hover:text-[#245B91] leading-[1.5] line-clamp-2"
                  >
                    {n.title}
                  </a>
                  {n.sourceUrl && (
                    <a
                      href={n.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-[#245B91] hover:underline"
                    >
                      <span>মূল সূত্র / PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Public E-Tenders Panel */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
              <h3 className="text-[19px] sm:text-[22px] font-bold text-[#142B4A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#142B4A]" aria-hidden="true" />
                <span>পাবলিক ই-টেন্ডার</span>
              </h3>
              <a
                href="/tenders"
                className="inline-flex items-center gap-1 min-h-[44px] px-2 text-[16px] font-semibold text-[#245B91] hover:underline"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="divide-y divide-[#E4E7EC]">
              {featuredTenders.map((t) => {
                const closingSoon = isClosingSoon(t.closingDate);
                return (
                  <div key={t.id} className="py-3 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#667085]">
                      <span className="px-2 py-0.5 rounded bg-[#F5F7FA] text-[#142B4A] font-medium">
                        {t.authorityName}
                      </span>
                      {t.nitNumber && <span className="font-mono text-[14px]">NIT: {t.nitNumber}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        শেষ: {t.closingDate}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          closingSoon
                            ? 'bg-[#F28C28] text-[#142B4A]'
                            : 'bg-emerald-50 text-[#23845B]'
                        }`}
                      >
                        {closingSoon ? 'শীঘ্রই শেষ' : 'সক্রিয়'}
                      </span>
                    </div>
                    <a
                      href={`/tenders?id=${encodeURIComponent(t.id)}`}
                      className="block text-[17px] font-bold text-[#202938] hover:text-[#245B91] leading-[1.5] line-clamp-2"
                    >
                      {t.title}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fixed-Size Ad Slot #1 (Between H5 and H6) */}
      <AdSlot variant="leaderboard" slotId="home-mid-leaderboard" />

      {/* H6. স্বাস্থ্য ও চিকিৎসা পরিষেবা */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-bold text-[#142B4A] leading-[1.38]">
              স্বাস্থ্য ও চিকিৎসা পরিষেবা
            </h2>
            <p className="text-[17px] text-[#667085]">
              হাসপাতাল, ক্লিনিক ও {toBengaliDigits(totalDoctors)}+ বিশেষজ্ঞ ডাক্তারের ওপিডি তালিকা
            </p>
          </div>
          <a
            href="/health-directory"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#142B4A] text-white font-semibold text-[16px] hover:bg-[#245B91] transition-colors"
          >
            <span>সকল স্বাস্থ্য কেন্দ্র</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredHealth.map((h) => (
            <DirectoryCard
              key={h!.slug}
              title={h!.nameBn}
              href={`/health-directory/${h!.slug}`}
              imageUrl={h!.coverImage}
              excerpt={h!.overviewBn || h!.taglineBn}
              categoryLabel={h!.typeBn}
              areaLabel={h!.landmarkBn || 'বারুইপুর'}
              statusLabel={
                h!.isOpen24Hours
                  ? '২৪×৭ খোলা'
                  : h!.swasthyaSathiAccepted
                  ? 'স্বাস্থ্যসাথী'
                  : undefined
              }
              phone={h!.phone}
              mapUrl={h!.googleMapUrl}
              isFeatured={Boolean(h!.isFeatured)}
            />
          ))}
        </div>

        {/* Top 8 Specialty Chips */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-3">
          <h3 className="text-[19px] sm:text-[22px] font-bold text-[#142B4A]">
            বিভাগ অনুযায়ী ডাক্তার খুঁজুন
          </h3>
          <div className="flex flex-wrap gap-2">
            {CANONICAL_SPECIALTIES.slice(0, 8).map((spec) => (
              <a
                key={spec.key}
                href={`/search?type=doctor&q=${encodeURIComponent(spec.bn)}`}
                className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-lg bg-[#F5F7FA] hover:bg-blue-50 hover:text-[#245B91] text-[#202938] font-medium text-[15px] transition-colors"
              >
                {spec.bn}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* H7. ঐতিহ্য, ঘোরাঘুরি ও উৎসব (Heritage / Culture / Tourism Places ONLY, Deduped) */}
      {featuredPlaces.length >= 3 && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[24px] sm:text-[32px] font-bold text-[#142B4A] leading-[1.38]">
                ঐতিহ্য, ঘোরাঘুরি ও উৎসব
              </h2>
              <p className="text-[17px] text-[#667085]">
                বারুইপুরের ঐতিহাসিক স্থান, মন্দির, পিকনিক স্পট ও সাংস্কৃতিক কেন্দ্র
              </p>
            </div>
            <a
              href="/places"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#142B4A] text-white font-semibold text-[16px] hover:bg-[#245B91] transition-colors"
            >
              <span>সব স্থান দেখুন</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map((p) => (
              <DirectoryCard
                key={p.slug}
                title={p.nameBn}
                href={`/places/${p.slug}`}
                imageUrl={p.coverImage}
                excerpt={p.overview || p.taglineBn}
                categoryLabel={getPlaceCategoryBn(p.category, p.categoryBn)}
                areaLabel={p.area || 'বারুইপুর'}
                phone={p.phone || p.contact?.phone}
                mapUrl={p.gmbMapUrl}
                isFeatured={Boolean(p.isFeatured)}
              />
            ))}
          </div>
        </section>
      )}

      {/* H8. প্রতিষ্ঠান ও সংগঠন */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-bold text-[#142B4A] leading-[1.38]">
              প্রতিষ্ঠান ও সামাজিক সংগঠন
            </h2>
            <p className="text-[17px] text-[#667085]">
              বারুইপুরের ক্রীড়া ক্লাব, সমাজকল্যাণ ট্রাস্ট ও ব্যবসায়ী সমিতি
            </p>
          </div>
          <a
            href="/organizations"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#142B4A] text-white font-semibold text-[16px] hover:bg-[#245B91] transition-colors"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOrgs.map((o) => (
            <DirectoryCard
              key={o.slug}
              title={o.nameBn}
              href={`/organizations/${o.slug}`}
              imageUrl={o.coverImage}
              excerpt={o.overview || o.taglineBn}
              categoryLabel={getOrgCategoryBn(o.category, o.categoryBn)}
              areaLabel={o.landmark || 'বারুইপুর'}
              phone={o.contact?.phone}
              mapUrl={o.gmbMapUrl}
            />
          ))}
        </div>
      </section>

      {/* Fixed-Size Ad Slot #2 (Between H8 and H10) */}
      <AdSlot variant="leaderboard" slotId="home-lower-leaderboard" />

      {/* H10. বারুইপুর আর্টিকেল ও ব্লগ */}
      {curatedGuides.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[24px] sm:text-[32px] font-bold text-[#142B4A] leading-[1.38]">
                বারুইপুর আর্টিকেল ও ব্লগ
              </h2>
              <p className="text-[17px] text-[#667085]">
                স্থানীয় বাজার, উৎসব, নাগরিক পরিষেবা ও ঐতিহ্যের বিস্তারিত লেখা ও নির্দেশিকা
              </p>
            </div>
            <a
              href="/articles"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#142B4A] text-white font-semibold text-[16px] hover:bg-[#245B91] transition-colors"
            >
              <span>সকল আর্টিকেল ও ব্লগ</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedGuides.map((g) => (
              <DirectoryCard
                key={g.id}
                title={g.title}
                href={`/${g.slug}`}
                imageUrl={g.imageUrl}
                excerpt={g.summary || g.content}
                categoryLabel={g.categoryNameBn || 'বারুইপুর গাইড'}
                areaLabel={g.reportingLocation || 'বারুইপুর'}
              />
            ))}
          </div>
        </section>
      )}

      {/* H11. Trust Strip */}
      <section className="bg-white rounded-xl border border-[#E4E7EC] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#23845B] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <div className="text-[15px] text-[#202938] leading-[1.6]">
            সমস্ত সরকারি নোটিস ও ডিরেক্টরি তথ্য স্থানীয় দপ্তর ও পোর্টাল থেকে যাচাইকৃত। কোনো তথ্যে ভুল থাকলে আমাদের জানান।
            {' '}
            <a href="/disclaimer" className="text-[#245B91] underline font-medium">
              আইনি দাবিত্যাগ দেখুন
            </a>
          </div>
        </div>
        <a
          href="/contact?report=true"
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-[#142B4A] bg-white hover:bg-[#F5F7FA] text-[#142B4A] font-bold text-[15px] shrink-0 transition-colors"
        >
          <MessageSquareWarning className="w-4 h-4 text-amber-700" aria-hidden="true" />
          <span>তথ্য সংশোধন করুন</span>
        </a>
      </section>
    </div>
  );
}
