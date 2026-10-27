/**
 * Utility to format bilingual listing entity names with location:
 * e.g. "স্টার মেডিক্যাল ক্লিনিক, বারুইপুর (Star Medical Clinic, Baruipur)"
 */

export function cleanBengaliName(rawBn: string): string {
  if (!rawBn) return '';
  let bn = rawBn
    .replace(/\s*\([A-Za-z0-9\s.,&|'’\-\[\]\+\/]+.*?\)\s*/g, ' ')
    .replace(/\s*\(পূর্বে.*?\)\s*/g, ' ')
    .replace(/\s*\(সরকারি বহির্বিভাগ.*?\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর জেল\)\s*/g, ' ')
    .replace(/\s*\(পশ্চিমবঙ্গ টেলি একাডেমি\)\s*/g, ' ')
    .replace(/\s*\(সমষ্টি উন্নয়ন আধিকারিকের করণ\)\s*/g, ' ')
    .replace(/\s*\(এসডিও অফিস\)\s*/g, ' ')
    .replace(/\s*\(শহর সাধারণ পাঠাগার\)\s*/g, ' ')
    .replace(/\s*\(সাবর্ণ রায়চৌধুরী জমিদার বাড়ি\)\s*/g, ' ')
    .replace(/\s*\(কোদালিয়া\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর\)\s*/g, ' ')
    .replace(/\s*\(বারুইপুর কোর্ট\)\s*/g, ' ')
    .replace(/\s*\(শ্রী শ্রী রামকৃষ্ণ বিবেকানন্দ মন্দির\)\s*/g, ' ')
    .replace(/\s*\(শ্রী শ্রী রক্ষা কালী মন্দির\)\s*/g, ' ')
    .replace(/\s*\(আইনজীবী সমিতি\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip trailing 'বারুইপুর' variations so we do not duplicate location
  bn = bn.replace(/[\s,\-]+বারুইপুর\s*$/, '').trim();

  // Canonical override for specific listings
  if (bn === 'স্টার মেডিক্যাল ক্লিনিক ও চেম্বার') {
    bn = 'স্টার মেডিক্যাল ক্লিনিক';
  }

  return bn;
}

export function cleanEnglishName(rawEn: string): string {
  if (!rawEn) return '';
  let en = rawEn
    .replace(/\s*\([A-Za-z0-9\s.,&|'’\-\[\]\+\/]+.*?\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip trailing 'Baruipur' variations so we do not duplicate location
  en = en.replace(/[\s,\-]+Baruipur\s*$/i, '').trim();

  return en;
}

export function formatBilingualLocation(rawBn: string, rawEn: string): string {
  const cBn = cleanBengaliName(rawBn);
  const cEn = cleanEnglishName(rawEn);
  return `${cBn}, বারুইপুর (${cEn}, Baruipur)`;
}
