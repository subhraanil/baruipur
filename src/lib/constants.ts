import { CategoryInfo, Source } from './types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameBn: 'সব খবর', nameEn: 'All News', slug: 'all', color: 'bg-red-600', iconName: 'Newspaper' },
  { id: 'municipality', nameBn: 'পৌরসভা ও নাগরিক', nameEn: 'Municipality', slug: 'municipality', color: 'bg-emerald-600', iconName: 'Building2' },
  { id: 'railway', nameBn: 'ট্রেন ও যাতায়াত', nameEn: 'Rail & Traffic', slug: 'railway', color: 'bg-blue-600', iconName: 'TrainTrack' },
  { id: 'crime', nameBn: 'অপরাধ ও প্রশাসন', nameEn: 'Police & Crime', slug: 'crime', color: 'bg-rose-700', iconName: 'ShieldAlert' },
  { id: 'health', nameBn: 'স্বাস্থ্য ও হাসপাতাল', nameEn: 'Health & Hospital', slug: 'health', color: 'bg-teal-600', iconName: 'Hospital' },
  { id: 'education', nameBn: 'শিক্ষা ও স্কুল', nameEn: 'Education', slug: 'education', color: 'bg-indigo-600', iconName: 'GraduationCap' },
  { id: 'culture', nameBn: 'উৎসব ও খেলাধুলা', nameEn: 'Culture & Sports', slug: 'culture', color: 'bg-amber-600', iconName: 'Sparkles' },
];

export const INITIAL_SOURCES: Source[] = [
  {
    id: 'src-1',
    name: 'বারুইপুর বার্তা টেলিগ্রাম (Baruipur Updates TG)',
    type: 'telegram',
    url: 'https://t.me/s/baruipur_news_update',
    handle: 'baruipur_news_update',
    defaultCategory: 'general',
    isActive: true,
    autoPublish: true,
    postsCount: 12,
    description: 'টেলিগ্রামের সক্রিয় বারুইপুর লোকাল রিপোর্টার চ্যানেল',
  },
  {
    id: 'src-2',
    name: 'বারুইপুর লোকাল নিউজ ফেসবুক (Baruipur News FB)',
    type: 'facebook',
    url: 'https://facebook.com/BaruipurLocalNews24',
    handle: 'BaruipurLocalNews24',
    defaultCategory: 'municipality',
    isActive: true,
    autoPublish: true,
    postsCount: 18,
    description: 'বারুইপুর মহকুমার নিত্যদিনের নাগরিক খবর ও আপডেট',
  },
  {
    id: 'src-3',
    name: 'শিয়ালদহ দক্ষিণ রেলওয়ে প্যাসেঞ্জার ফোরাম (Train Alerts)',
    type: 'rss',
    url: 'https://t.me/s/sealdah_south_rail',
    handle: 'sealdah_south_rail',
    defaultCategory: 'railway',
    isActive: true,
    autoPublish: true,
    postsCount: 9,
    description: 'বারুইপুর জংশন, ক্যানিং, ডায়মন্ড হারবার ও নামখানা লোকাল ট্রেনের রিয়েল-টাইম খবর',
  },
  {
    id: 'src-4',
    name: 'বারুইপুর লাইভ বুলেটিন (YouTube Channel)',
    type: 'youtube',
    url: 'https://youtube.com/@BaruipurLiveOfficial',
    handle: '@BaruipurLiveOfficial',
    defaultCategory: 'general',
    isActive: true,
    autoPublish: true,
    postsCount: 7,
    description: 'ভিডিও সংবাদ ও স্পেশাল গ্রাউন্ড রিপোর্টিং',
  }
];

export const EMERGENCY_CONTACTS = [
  { titleBn: 'বারুইপুর পুলিশ জেলা কন্ট্রোল রুম', phone: '033-2433-8200', altPhone: '112', icon: 'ShieldAlert', note: '২৪ ঘণ্টা সক্রিয়' },
  { titleBn: 'বারুইপুর মহকুমা হাসপাতাল (জরুরি বিভাগ)', phone: '033-2433-8244', altPhone: '102 (অ্যাম্বুলেন্স)', icon: 'Hospital', note: 'জরুরি চিকিৎসা ও অ্যাম্বুলেন্স' },
  { titleBn: 'বারুইপুর দমকল কেন্দ্র (Fire Brigade)', phone: '033-2433-8101', altPhone: '101', icon: 'Flame', note: 'দমকল ও উদ্ধারকার্য' },
  { titleBn: 'বারুইপুর পৌরসভা হেল্পলাইন (Municipality)', phone: '033-2433-8260', altPhone: '1800-345-5555', icon: 'Building2', note: 'নাগরিক পরিষেবা ও অভিযোগ' },
  { titleBn: 'বারুইপুর জংশন রেলওয়ে অনুসন্ধান', phone: '139', altPhone: '033-2433-7221', icon: 'TrainTrack', note: 'ট্রেনের সময়সূচি ও তথ্য' },
  { titleBn: 'বিদ্যুৎ বিপর্যয় অভিযোগ (WBSEDCL Baruipur)', phone: '19121', altPhone: '8900793503', icon: 'Zap', note: 'বিদ্যুৎ পরিষেবা সংক্রান্ত' }
];

export const TRAIN_UPDATES = [
  {
    trainName: 'শিয়ালদহ - বারুইপুর লোকাল (34612)',
    time: 'সকাল ০৮:১৫',
    status: 'অন-টাইম',
    statusColor: 'text-emerald-600 bg-emerald-50',
    platform: 'প্ল্যাটফর্ম নং ২'
  },
  {
    trainName: 'ক্যানিং - শিয়ালদহ লোকাল (via Baruipur)',
    time: 'সকাল ০৮:৪০',
    status: '১০ মিনিট লেট',
    statusColor: 'text-amber-600 bg-amber-50',
    platform: 'প্ল্যাটফর্ম নং ৩'
  },
  {
    trainName: 'ডায়মন্ড হারবার - শিয়ালদহ ফাস্ট লোকাল',
    time: 'সকাল ০৯:০৫',
    status: 'অন-টাইম',
    statusColor: 'text-emerald-600 bg-emerald-50',
    platform: 'প্ল্যাটফর্ম নং ১'
  },
  {
    trainName: 'নামখানা - শিয়ালদহ মাতৃভূমি লোকাল',
    time: 'সকাল ০৯:২৫',
    status: 'স্বাভাবিক চলাচল',
    statusColor: 'text-emerald-600 bg-emerald-50',
    platform: 'প্ল্যাটফর্ম নং ৪'
  }
];
