export function toBengaliNumber(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
}

export function formatBengaliDate(dateInput: Date | string): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayName = days[d.getDay()];
  const dateNum = toBengaliNumber(d.getDate());
  const monthName = months[d.getMonth()];
  const yearNum = toBengaliNumber(d.getFullYear());

  return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
}

export function formatTimeAgoBengali(dateInput: Date | string): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) {
    return 'এইমাত্র';
  } else if (diffMin < 60) {
    return `${toBengaliNumber(diffMin)} মিনিট আগে`;
  } else if (diffHours < 24) {
    return `${toBengaliNumber(diffHours)} ঘণ্টা আগে`;
  } else if (diffDays === 1) {
    return 'গতকাল';
  } else if (diffDays < 30) {
    return `${toBengaliNumber(diffDays)} দিন আগে`;
  } else {
    return formatBengaliDate(d);
  }
}
