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
} from 'lucide-react';
import { getAllPlaces } from '@/lib/places';
import { getAllOrganizations } from '@/lib/organizations';
import { getAllFacilities } from '@/lib/healthcare';
import { getActiveNotices } from '@/lib/notices';
import { getAllTenders } from '@/lib/tenders';
import DirectoryCard from '@/components/DirectoryCard';
import AdSlot from '@/components/AdSlot';
import {
  CANONICAL_SPECIALTIES,
  getOrgCategoryBn,
  getPlaceCategoryBn,
  isClosingSoon,
  toBengaliDigits,
} from '@/lib/formatters';

export default function HomePage() {
  const places = getAllPlaces();
  const orgs = getAllOrganizations();
  const healthFacilities = getAllFacilities();
  const notices = getActiveNotices();
  const tenders = getAllTenders();

  const totalDoctors = healthFacilities.reduce(
    (sum, h) => sum + (Array.isArray(h.doctors) ? h.doctors.length : h.doctorsCount || 0),
    0
  );

  const featuredNotices = notices.slice(0, 5);
  const featuredTenders = tenders.slice(0, 5);

  // Featured health: Pubali Clinic (Featured), Baruipur Subdivisional Hospital, and Kabita Sebayatan / 3rd
  const sdh = healthFacilities.find((h) => h.slug === 'baruipur-subdivisional-hospital');
  const pubali = healthFacilities.find((h) => h.slug === 'pubali-clinic-baruipur');
  const othersHealth = healthFacilities.filter(
    (h) => h.slug !== 'baruipur-subdivisional-hospital' && h.slug !== 'pubali-clinic-baruipur'
  );
  const featuredHealth = [pubali, sdh, othersHealth[0]].filter(Boolean).slice(0, 3);

  // Places: 6 cards (avoid duplicating Pubali Clinic in top 6 if possible, or show top 6 landmarks/civic centers)
  const featuredPlaces = places
    .filter((p) => p.slug !== 'pubali-clinic-baruipur')
    .slice(0, 6);

  // Organizations: 4 cards
  const featuredOrgs = orgs.slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      {/* 1. Hero with One Big Search Box & 6 Intent Tiles */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="space-y-3 max-w-[700px]">
          <h1 className="text-[28px] sm:text-[40px] font-bold text-slate-900 leading-[1.3]">
            বারুইপুর নাগরিক তথ্যকোষ ও পাবলিক ডিরেক্টরি
          </h1>
          <p className="text-[17px] sm:text-[18px] text-slate-700 leading-[1.75]">
            ডাক্তার, হাসপাতাল, দর্শনীয় স্থান, ক্লাব ও সংগঠন, সরকারি নোটিস, ই-টেন্ডার এবং লোকাল ট্রেনের যাচাইকৃত তথ্য খুঁজুন এক জায়গায়।
          </p>
        </div>

        {/* Big Search Box */}
        <form action="/search" method="GET" className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="search"
              name="q"
              placeholder="ডাক্তার, হাসপাতাল, স্থান, ক্লাব, নোটিস বা টেন্ডার লিখুন..."
              aria-label="বারুইপুর ডিরেক্টরিতে খুঁজুন"
              className="w-full min-h-[52px] pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-700 focus:outline-none text-[17px] text-slate-900"
            />
          </div>
          <button
            type="submit"
            className="min-h-[52px] px-7 py-3 rounded-xl bg-slate-900 hover:bg-blue-900 text-white font-bold text-[16px] leading-[1.2] transition-colors shrink-0"
          >
            অনুসন্ধান করুন
          </button>
        </form>

        {/* 6 Intent Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <a
            href="/search?type=doctor"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Stethoscope className="w-6 h-6 text-blue-700" />
            <span>ডাক্তার খুঁজুন</span>
          </a>

          <a
            href="/health-directory"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Hospital className="w-6 h-6 text-emerald-700" />
            <span>হাসপাতাল/জরুরি</span>
          </a>

          <a
            href="/notices"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Bell className="w-6 h-6 text-amber-700" />
            <span>নোটিস</span>
          </a>

          <a
            href="/tenders"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <FileText className="w-6 h-6 text-slate-700" />
            <span>টেন্ডার</span>
          </a>

          <a
            href="/transport"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <TrainTrack className="w-6 h-6 text-indigo-700" />
            <span>ট্রেন</span>
          </a>

          <a
            href="/places/baruipur-rashmath"
            className="min-h-[84px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-slate-900 font-bold text-[16px] leading-[1.2] text-center transition-colors"
          >
            <Sparkles className="w-6 h-6 text-purple-700" />
            <span>রাসমেলা</span>
          </a>
        </div>
      </section>

      {/* 2. "সরকারি আপডেট": Notices and Tenders Side by Side */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[22px] sm:text-[30px] font-bold text-slate-900 leading-[1.4]">
            সরকারি আপডেট
          </h2>
          <span className="text-[14px] text-slate-600 font-medium">
            মোট {toBengaliDigits(notices.length)}টি নোটিস • {toBengaliDigits(tenders.length)}টি টেন্ডার
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Official Notices Column */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[18px] sm:text-[22px] font-bold text-slate-900 leading-[1.4] flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-700" />
                <span>সরকারি নোটিস</span>
              </h3>
              <a
                href="/notices"
                className="inline-flex items-center gap-1 min-h-[44px] px-2 text-[16px] font-medium text-blue-800 hover:underline"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="divide-y divide-slate-100">
              {featuredNotices.map((n) => (
                <a
                  key={n.id}
                  href={`/notices?id=${encodeURIComponent(n.id)}`}
                  className="block py-3 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors space-y-1.5"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[14px] text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {n.publishedDate}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                      {n.departmentName}
                    </span>
                    {n.isUrgent && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                        জরুরি
                      </span>
                    )}
                  </div>
                  <p className="text-[17px] font-bold text-slate-900 leading-[1.5] line-clamp-2">
                    {n.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Public E-Tenders Column */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[18px] sm:text-[22px] font-bold text-slate-900 leading-[1.4] flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                <span>পাবলিক ই-টেন্ডার</span>
              </h3>
              <a
                href="/tenders"
                className="inline-flex items-center gap-1 min-h-[44px] px-2 text-[16px] font-medium text-blue-800 hover:underline"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="divide-y divide-slate-100">
              {featuredTenders.map((t) => {
                const closingSoon = isClosingSoon(t.closingDate);
                return (
                  <a
                    key={t.id}
                    href={`/tenders?id=${encodeURIComponent(t.id)}`}
                    className="block py-3 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[14px] text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        শেষ তারিখ: {t.closingDate}
                      </span>
                      {closingSoon && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                          শীঘ্রই শেষ হচ্ছে
                        </span>
                      )}
                    </div>
                    <p className="text-[17px] font-bold text-slate-900 leading-[1.5] line-clamp-2">
                      {t.title}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Health: 3 Cards + Doctor by Specialty Strip */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[22px] sm:text-[30px] font-bold text-slate-900 leading-[1.4]">
              স্বাস্থ্য ও চিকিৎসা পরিষেবা
            </h2>
            <p className="text-[16px] text-slate-700">
              {toBengaliDigits(healthFacilities.length)}টি হাসপাতাল ও ক্লিনিক • {toBengaliDigits(totalDoctors)}+ বিশেষজ্ঞ ডাক্তার
            </p>
          </div>
          <a
            href="/health-directory"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-[16px] leading-[1.2] hover:bg-blue-900 transition-colors"
          >
            <span>সকল স্বাস্থ্য কেন্দ্র</span>
            <ArrowRight className="w-4 h-4" />
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
                  ? '২৪ ঘণ্টা খোলা'
                  : h!.swasthyaSathiAccepted
                  ? 'স্বাস্থ্যসাথী'
                  : 'খোলা আছে'
              }
              phone={h!.phone}
              mapUrl={h!.googleMapUrl}
              isFeatured={Boolean(h!.isFeatured)}
            />
          ))}
        </div>

        {/* Doctor by Specialty Strip */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-[18px] sm:text-[22px] font-bold text-slate-900 leading-[1.4]">
            বিভাগ অনুযায়ী বিশেষজ্ঞ ডাক্তার খুঁজুন
          </h3>
          <div className="flex flex-wrap gap-2">
            {CANONICAL_SPECIALTIES.map((spec) => (
              <a
                key={spec.key}
                href={`/search?type=doctor&q=${encodeURIComponent(spec.bn)}`}
                className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-900 font-medium text-[14px] leading-[1.5] transition-colors"
              >
                {spec.bn}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed-Size Ad Slot */}
      <AdSlot variant="leaderboard" slotId="home-mid-leaderboard" />

      {/* 4. Places: 6 Cards */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[22px] sm:text-[30px] font-bold text-slate-900 leading-[1.4]">
              বারুইপুরের দর্শনীয় ও গুরুত্বপূর্ণ স্থান
            </h2>
            <p className="text-[16px] text-slate-700">
              {toBengaliDigits(places.length)}টি যাচাইকৃত ঐতিহাসিক ও প্রশাসনিক স্থান
            </p>
          </div>
          <a
            href="/places"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-[16px] leading-[1.2] hover:bg-blue-900 transition-colors"
          >
            <span>সকল স্থান ({toBengaliDigits(places.length)})</span>
            <ArrowRight className="w-4 h-4" />
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
              statusLabel={p.timings ? 'খোলা আছে' : undefined}
              phone={p.phone || p.contact?.phone}
              mapUrl={p.gmbMapUrl}
              isFeatured={Boolean(p.isFeatured)}
            />
          ))}
        </div>
      </section>

      {/* 5. Organizations: 4 Cards */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[22px] sm:text-[30px] font-bold text-slate-900 leading-[1.4]">
              সামাজিক সংগঠন, ক্লাব ও প্রতিষ্ঠান
            </h2>
            <p className="text-[16px] text-slate-700">
              {toBengaliDigits(orgs.length)}টি যাচাইকৃত ক্লাব ও জনকল্যাণমূলক সংস্থা
            </p>
          </div>
          <a
            href="/organizations"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-[16px] leading-[1.2] hover:bg-blue-900 transition-colors"
          >
            <span>সকল সংগঠন ({toBengaliDigits(orgs.length)})</span>
            <ArrowRight className="w-4 h-4" />
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
              statusLabel="সক্রিয়"
              phone={o.contact?.phone}
              mapUrl={o.gmbMapUrl}
            />
          ))}
        </div>
      </section>

      {/* 6. Seasonal Guide Banner */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-[700px]">
          <span className="inline-block px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-[14px]">
            মৌসুমি বিশেষ গাইড
          </span>
          <h2 className="text-[22px] sm:text-[30px] font-bold leading-[1.4]">
            বারুইপুর রাসমেলা ও শীতকালীন পিকনিক গাইড ২০২৬
          </h2>
          <p className="text-[17px] text-slate-200 leading-[1.7]">
            ঐতিহ্যবাহী বারুইপুর রাসমাঠ, অতিসার মহাপ্রভুতলা এবং পরিবারের সাথে শীতের পিকনিক ও ভ্রমণের সেরা ঠিকানা জানুন।
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="/places/baruipur-rashmath"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[16px] leading-[1.2] transition-colors"
          >
            রাসমেলা গাইড
          </a>
          <a
            href="/category/all"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-[16px] leading-[1.2] transition-colors"
          >
            সকল গাইড
          </a>
        </div>
      </section>

      {/* 7. Trust Strip */}
      <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-[15px] text-slate-800 leading-[1.6]">
            <strong>সর্বশেষ যাচাই: ২৬ নভেম্বর ২০২৬</strong> — {toBengaliDigits(places.length)}টি স্থান,{' '}
            {toBengaliDigits(healthFacilities.length)}টি স্বাস্থ্য কেন্দ্র, {toBengaliDigits(totalDoctors)}+ ডাক্তার,{' '}
            {toBengaliDigits(orgs.length)}টি সংগঠন, {toBengaliDigits(notices.length)}টি নোটিস ও{' '}
            {toBengaliDigits(tenders.length)}টি টেন্ডার।
          </div>
        </div>
        <a
          href="/contact?report=true"
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-[16px] leading-[1.2] shrink-0 transition-colors"
        >
          <MessageSquareWarning className="w-4 h-4 text-amber-700" />
          <span>ভুল তথ্য জানান</span>
        </a>
      </section>
    </div>
  );
}
