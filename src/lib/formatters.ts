/**
 * Shared Civic Directory Formatting & Normalization Utilities
 * - Latin digits (0-9) for phone numbers
 * - Bengali digits (০-৯) for counts
 * - Safe tel: link sanitization (prevents empty tel: links)
 * - Clean plain-text excerpts (120-140 chars) without markdown/HTML
 * - Fixed canonical specialty list & Bengali category labels
 */

export function toBengaliDigits(input: string | number): string {
  const enToBn: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  };
  return String(input).replace(/[0-9]/g, (d) => enToBn[d] || d);
}

export function toLatinDigits(input: string | number): string {
  const bnToEn: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };
  return String(input).replace(/[০-৯]/g, (d) => bnToEn[d] || d);
}

/**
 * Returns a clean Latin-digit phone string for display, or null if no valid phone exists.
 */
export function formatPhoneForDisplay(raw?: string | null): string | null {
  if (!raw) return null;
  const latin = toLatinDigits(raw).trim();
  const digits = latin.replace(/[^0-9]/g, '');
  if (digits.length < 3) return null;
  // Ignore obvious dummy placeholders
  if (digits.endsWith('00000') && digits.length >= 10) return null;
  // Return first clean segment if separated by / or parentheses
  const firstSegment = latin.split(/[/,(]/)[0].trim();
  return /\d{3,}/.test(firstSegment) ? firstSegment : digits;
}

/**
 * Returns a safe `tel:` href value (e.g. `tel:03324335303` or `tel:+919073085883`),
 * or `null` if there is no valid phone number. Never returns an empty `tel:`.
 */
export function formatPhoneForTel(raw?: string | null): string | null {
  const display = formatPhoneForDisplay(raw);
  if (!display) return null;
  const cleaned = display.replace(/[^0-9+]/g, '');
  const digitsOnly = cleaned.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 3) return null;
  return `tel:${cleaned}`;
}

/**
 * Strips markdown headings, bold/italic markers, bullet lists, numbered prefixes, and extra whitespace,
 * returning a clean 120-140 character plain-text excerpt.
 */
export function cleanPlainExcerpt(raw?: string | null, minLen = 120, maxLen = 140): string {
  if (!raw) return '';
  let text = raw
    // Remove markdown headings (# ## ###)
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    // Remove markdown links [label](url) -> label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold/italic/code markers
    .replace(/[*_`~>]/g, '')
    // Remove bullet points and leading list numbers like "1." or "1)"
    .replace(/^\s*[-•*]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    // Remove stray single digits at start of sentences
    .replace(/\b[0-9০-৯]{1,2}\s+(?=[অ-হক-হা-ৌ])/g, '')
    // Collapse newlines & spaces
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (text.length <= maxLen) return text;
  const sliced = text.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(' ');
  const cut = lastSpace >= minLen - 20 ? sliced.slice(0, lastSpace) : sliced;
  return cut.replace(/[।,;:\-]+$/, '').trim() + '…';
}

export const PLACE_CATEGORY_BN: Record<string, string> = {
  civic: 'প্রশাসন ও নাগরিক পরিষেবা',
  administration: 'প্রশাসনিক ভবন',
  municipality: 'পৌর পরিষেবা',
  health: 'স্বাস্থ্য ও হাসপাতাল',
  education: 'শিক্ষা প্রতিষ্ঠান',
  heritage: 'ঐতিহ্য ও ইতিহাস',
  temple: 'মন্দির ও তীর্থস্থান',
  spiritual: 'আধ্যাত্মিক স্থান',
  market: 'বাজার ও বাণিজ্য',
  transport: 'যাতায়াত ও স্টেশন',
  park: 'পার্ক ও বিনোদন',
  sports: 'ক্রীড়া ও স্টেডিয়াম',
  culture: 'সংস্কৃতি ও উৎসব',
  landmark: 'দর্শনীয় স্থান',
};

export function getPlaceCategoryBn(category?: string, fallbackBn?: string): string {
  if (fallbackBn && !/^[a-z_-]+$/i.test(fallbackBn.trim())) {
    return fallbackBn.trim();
  }
  const key = (category || '').toLowerCase().trim();
  return PLACE_CATEGORY_BN[key] || 'দর্শনীয় স্থান';
}

export const ORG_CATEGORY_BN: Record<string, string> = {
  club: 'ক্রীড়া ও সমাজসেবা ক্লাব',
  sports: 'ক্রীড়া সংস্থা',
  welfare: 'সমাজকল্যাণ ও ট্রাস্ট',
  cultural: 'সাংস্কৃতিক সংস্থা',
  trade: 'ব্যবসায়ী ও বণিক সমিতি',
  professional: 'পেশাজীবী সংগঠন',
  ngo: 'স্বেচ্ছাসেবী সংস্থা',
  blood: 'রক্তদান ও স্বাস্থ্য সেবা',
};

export function getOrgCategoryBn(category?: string, fallbackBn?: string): string {
  if (fallbackBn && !/^[a-z_-]+$/i.test(fallbackBn.trim())) {
    return fallbackBn.trim();
  }
  const key = (category || '').toLowerCase().trim();
  return ORG_CATEGORY_BN[key] || 'সামাজিক সংগঠন';
}

export const CANONICAL_SPECIALTIES = [
  { key: 'general_medicine', bn: 'জেনারেল মেডিসিন' },
  { key: 'pediatrics', bn: 'শিশুরোগ বিশেষজ্ঞ' },
  { key: 'gynaecology', bn: 'স্ত্রী ও প্রসূতিরোগ' },
  { key: 'orthopedics', bn: 'অর্থোপেডিক ও হাড়' },
  { key: 'cardiology', bn: 'হৃদরোগ (কার্ডিওলজি)' },
  { key: 'ent', bn: 'নাক, কান ও গলা (ENT)' },
  { key: 'dermatology', bn: 'চর্মরোগ (ডার্মাটোলজি)' },
  { key: 'ophthalmology', bn: 'চক্ষুরোগ বিশেষজ্ঞ' },
  { key: 'dentistry', bn: 'দন্ত চিকিৎসা' },
  { key: 'general_surgery', bn: 'জেনারেল সার্জারি' },
  { key: 'gastroenterology', bn: 'গ্যাস্ট্রো ও লিভার' },
  { key: 'neurology', bn: 'স্নায়ুরোগ (নিউরোলজি)' },
  { key: 'pulmonology', bn: 'বক্ষব্যাধি ও ফুসফুস' },
  { key: 'endocrinology', bn: 'হরমোন ও ডায়াবেটিস' },
  { key: 'psychiatry', bn: 'মানসিক স্বাস্থ্য' },
  { key: 'urology', bn: 'ইউরোলজি ও কিডনি' },
] as const;

/**
 * Normalizes a tender or notice closing date (Bengali or Latin digits) and checks if closing within 7 days.
 */
export function isClosingSoon(rawDate?: string): boolean {
  if (!rawDate) return false;
  const en = toLatinDigits(rawDate).trim();
  const parsed = new Date(en);
  if (isNaN(parsed.getTime())) return false;
  const diffDays = Math.ceil((parsed.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 10;
}
