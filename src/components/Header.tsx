'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  CloudSun, 
  Calendar, 
  PhoneCall, 
  Settings, 
  Search, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Building2,
  Bell,
  Home,
  FileText,
  Stethoscope,
  TrainTrack,
  Landmark,
  ShieldAlert,
  ChevronRight,
  ChevronDown,
  Send,
  HeartPulse,
  Compass,
  Flame,
  MapPin,
  GraduationCap,
  Utensils,
  Newspaper,
  BookOpen
} from 'lucide-react';
import { formatBengaliDate } from '@/lib/dateUtils';

interface SubMenuItem {
  label: string;
  href: string;
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

interface MegaMenuConfig {
  id: string;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  activePattern?: RegExp;
  columns: Array<{
    title?: string;
    items: SubMenuItem[];
  }>;
  featured: {
    title: string;
    desc: string;
    href: string;
    btnText: string;
    badge: string;
    accentBg: string;
    borderAccent: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

export default function Header() {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  
  // Mega Menu State
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Accordion Open State
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>('civic');

  useEffect(() => {
    setCurrentDate(formatBengaliDate(new Date()));

    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.')) {
        setIsLocal(true);
      }
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search') || params.get('q');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (menuId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Structured Mega Menu Configuration
  const megaMenus: MegaMenuConfig[] = [
    {
      id: 'news',
      label: 'সংবাদ ও বুলেটিন',
      href: '/category/all',
      activePattern: /^\/category/,
      columns: [
        {
          title: 'প্রশাসন ও পরিকাঠামো',
          items: [
            {
              label: 'পৌরসভা ও নাগরিক পরিষেবা',
              href: '/category/municipality',
              desc: 'রাস্তাঘাট, পানীয় জল ও পুর পরিষেবা সংবাদ',
              icon: Landmark
            },
            {
              label: 'শিয়ালদহ দক্ষিণ রেলওয়ে',
              href: '/category/railway',
              desc: 'লোকাল ট্রেন চলাচল ও রেল জংশনের খবর',
              icon: TrainTrack
            },
            {
              label: 'আইনশৃঙ্খলা ও পুলিশ জেলা',
              href: '/category/crime',
              desc: 'নিরাপত্তা, থানা ও মহকুমা আদালত',
              icon: ShieldAlert
            }
          ]
        },
        {
          title: 'জীবনধারা ও সমাজ',
          items: [
            {
              label: 'স্বাস্থ্য ও চিকিৎসা পরিকাঠামো',
              href: '/category/health',
              desc: 'হাসপাতাল, ওপিডি ও স্বাস্থ্য খবর',
              icon: Stethoscope
            },
            {
              label: 'শিক্ষা ও কেরিয়ার সংবাদ',
              href: '/category/education',
              desc: 'স্কুল, কলেজ ও ভরতি সংক্রান্ত তথ্য',
              icon: GraduationCap
            },
            {
              label: 'উৎসব, ঐতিহ্য ও সংস্কৃতি',
              href: '/category/culture',
              desc: 'রাসমেলা, পূজা ও সাংস্কৃতিক অনুষ্ঠান',
              icon: Sparkles
            },
            {
              label: 'খাবার ও রেস্তোরাঁ নির্দেশিকা',
              href: '/category/food',
              desc: 'ঐতিহ্যবাহী মিষ্টি ও খাবারের দোকান',
              icon: Utensils
            }
          ]
        }
      ],
      featured: {
        title: 'নাগরিক সংবাদ ডেস্ক',
        desc: 'আপনার এলাকার কোনো ঘটনা, ছবি বা ভিডিও প্রতিবেদন সরাসরি আমাদের বার্তা বিভাগে পাঠাতে পারেন।',
        href: '/submit-news',
        btnText: 'সংবাদ জমা দিন →',
        badge: '২৪/৭ সক্রিয়',
        accentBg: 'bg-red-50',
        borderAccent: 'border-red-200',
        icon: Send
      }
    },
    {
      id: 'civic',
      label: 'নাগরিক ও সরকারি সেবা',
      href: '/citizen-services',
      badge: 'লাইভ',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activePattern: /^\/(property|tenders|notices|citizen-services|real-estate)/,
      columns: [
        {
          title: 'সম্পত্তি ও রিয়েল এস্টেট',
          items: [
            {
              label: 'জমি ও ফ্ল্যাট কেনাবেচা',
              href: '/property',
              desc: 'নতুন ফ্ল্যাট, বাস্তু জমি ও ব্যাংক নিলামের লিস্টিং',
              icon: Home,
              badge: '২০+ সক্রিয়',
              badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              highlight: true
            },
            {
              label: 'বিনামূল্যে বিজ্ঞাপন দিন',
              href: '/property',
              desc: 'ফ্ল্যাট বা জমি বিক্রির জন্য সরাসরি ফ্রি লিস্টিং করুন',
              icon: PlusCircle
            }
          ]
        },
        {
          title: 'টেন্ডার ও অফিসিয়াল নোটিস',
          items: [
            {
              label: 'সরকারি ও পৌর টেন্ডার (NIT)',
              href: '/tenders',
              desc: 'বারুইপুর পৌরসভা ও SDO দপ্তরের সক্রিয় দরপত্র',
              icon: FileText,
              badge: '৩৮টি টেন্ডার',
              badgeColor: 'bg-red-100 text-red-800 border-red-200',
              highlight: true
            },
            {
              label: 'জরুরি প্রশাসনিক নোটিস ও সার্কুলার',
              href: '/notices',
              desc: 'অফিসিয়াল PDF বিজ্ঞপ্তি ও নির্দেশিকা',
              icon: Bell,
              badge: '২৫টি নোটিস',
              badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
            },
            {
              label: 'মিউটেশন, কর ও পৌর পরিষেবা',
              href: '/citizen-services',
              desc: 'হোল্ডিং ট্যাক্স ও জন্ম-মৃত্যু সার্টিফিকেটের নিয়ম',
              icon: Landmark
            }
          ]
        }
      ],
      featured: {
        title: 'ফ্রি প্রপার্টি বিজ্ঞাপন হাব',
        desc: 'বারুইপুর ও দক্ষিণ ২৪ পরগনায় জমি, বাড়ি বা ফ্ল্যাট বিক্রি করতে আজই বিনামূল্যে লিস্টিং পোস্ট করুন।',
        href: '/property',
        btnText: 'লিস্টিং ব্রাউজ করুন →',
        badge: 'বিনামূল্যে',
        accentBg: 'bg-emerald-50',
        borderAccent: 'border-emerald-200',
        icon: Home
      }
    },
    {
      id: 'health',
      label: 'স্বাস্থ্য ও ডাক্তার',
      href: '/health-directory',
      badge: 'OPD',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activePattern: /^\/health-directory/,
      columns: [
        {
          title: 'চিকিৎসা প্রতিষ্ঠান',
          items: [
            {
              label: 'ডাক্তার ও ওপিডি চেম্বার',
              href: '/health-directory',
              desc: '১০০+ বিশেষজ্ঞ ডাক্তারের নিয়মিত বসার সময় ও ফি',
              icon: Stethoscope,
              badge: 'রোস্টার',
              badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
            },
            {
              label: 'নার্সিংহোম ও হাসপাতাল',
              href: '/health-directory',
              desc: 'হাই মেডিকেল, নমিতা সেবায়তন, ওয়েলকিন হাসপাতাল',
              icon: HeartPulse
            }
          ]
        },
        {
          title: 'পরীক্ষা ও কার্ড পরিষেবা',
          items: [
            {
              label: 'ডায়াগনস্টিক ও প্যাথলজি',
              href: '/health-directory',
              desc: 'রক্ত পরীক্ষা, ডিজিটাল এক্স-রে ও ইউএসজি সেন্টার',
              icon: Stethoscope
            },
            {
              label: 'স্বাস্থ্যসাথী পরিষেবা কেন্দ্র',
              href: '/health-directory',
              desc: 'সরকারি কার্ড গ্রাহ্য নার্সিংহোমের তালিকা',
              icon: Landmark
            }
          ]
        }
      ],
      featured: {
        title: '২৪/৭ জরুরি স্বাস্থ্য সেবা',
        desc: 'বারুইপুর মহকুমা হাসপাতাল, ব্লাড ব্যাংক ও অ্যাম্বুল্যান্সের জরুরি নম্বরের সরাসরি তালিকা দেখুন।',
        href: '/emergency-contacts',
        btnText: 'জরুরি হেল্পলাইন →',
        badge: 'জরুরি নম্বর',
        accentBg: 'bg-rose-50',
        borderAccent: 'border-rose-200',
        icon: PhoneCall
      }
    },
    {
      id: 'transport',
      label: 'ট্রেন ও যাতায়াত',
      href: '/transport',
      badge: 'সময়সূচি',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      activePattern: /^\/transport/,
      columns: [
        {
          title: 'শিয়ালদহ দক্ষিণ রেলওয়ে',
          items: [
            {
              label: 'শিয়ালদহ - বারুইপুর আপ ও ডাউন',
              href: '/transport',
              desc: 'প্রতি ১০-১৫ মিনিটে লোকাল ট্রেনের লাইভ সময়সূচি',
              icon: TrainTrack,
              badge: 'মেন লাইন'
            },
            {
              label: 'ডায়মন্ড হারবার ও লক্ষ্মীকান্তপুর লাইন',
              href: '/transport',
              desc: 'দক্ষিণ ২৪ পরগনার প্রধান রেলওয়ে সংযোগ',
              icon: TrainTrack
            }
          ]
        },
        {
          title: 'দূরপাল্লা ও লোকাল ট্রাফিক',
          items: [
            {
              label: 'নামখানা স্পেশাল সরাসরি লোকাল',
              href: '/transport',
              desc: 'কাকদ্বীপ ও সুন্দরবন সংযোগকারী ট্রেনের সূচি',
              icon: TrainTrack
            },
            {
              label: 'বাস ও লোকাল অটো স্ট্যান্ড গাইড',
              href: '/transport',
              desc: 'রেল জংশন সংলগ্ন অটো রুট ও বাস টার্মিনাস',
              icon: Compass
            }
          ]
        }
      ],
      featured: {
        title: 'রিয়েলটাইম ট্রেন টাইমটেবিল',
        desc: 'শিয়ালদহ দক্ষিণ বিভাগের সমস্ত আপ ও ডাউন লোকাল ট্রেনের সময়, স্টপেজ ও চলাচলের দিন অনুসন্ধান করুন।',
        href: '/transport',
        btnText: 'টাইমটেবিল দেখুন →',
        badge: 'আপডেট ২০২৬',
        accentBg: 'bg-blue-50',
        borderAccent: 'border-blue-200',
        icon: TrainTrack
      }
    },
    {
      id: 'directory',
      label: 'স্থানীয় ডিরেক্টরি',
      href: '/places',
      activePattern: /^\/(places|organizations|events)/,
      columns: [
        {
          title: 'স্থান ও সংস্কৃতি',
          items: [
            {
              label: 'ঐতিহাসিক স্থান ও ল্যান্ডমার্ক',
              href: '/places',
              desc: 'বারুইপুর রাজবাড়ি, আরণ্যক, মহাপ্রভুতলা ও রাসমাঠ',
              icon: Landmark
            },
            {
              label: 'বাৎসরিক উৎসব ও রাসমেলা ক্যালেন্ডার',
              href: '/events',
              desc: '৩৫০ বছরের প্রাচীন রাসমেলা ও বার্ষিক সাংস্কৃতিক সূচি',
              icon: Sparkles
            }
          ]
        },
        {
          title: 'সংগঠন ও গাইড',
          items: [
            {
              label: 'ক্লাব, সমিতি ও স্বেচ্ছাসেবী প্রতিষ্ঠান',
              href: '/organizations',
              desc: 'রিয়েল স্টার, সামারসেট, রক্তদাতা ফোরাম ট্রাস্ট',
              icon: Building2
            },
            {
              label: 'বারুইপুর স্পেশাল ভ্রমণ গাইড',
              href: '/best-places-to-visit-in-baruipur-travel-guide',
              desc: 'সেরা দর্শনীয় স্থান ও টপ থিংস টু ডু',
              icon: BookOpen
            }
          ]
        }
      ],
      featured: {
        title: 'ঐতিহ্যের বারুইপুর তথ্যকোষ',
        desc: 'দক্ষিণ ২৪ পরগনার প্রধান মহকুমা ও পুর জনপদের ৩৫০+ বছরের ইতিহাস, জমিদার প্রাসাদ ও সংস্কৃতি।',
        href: '/places',
        btnText: 'ডিরেক্টরি দেখুন →',
        badge: 'তথ্যকোষ',
        accentBg: 'bg-amber-50',
        borderAccent: 'border-amber-200',
        icon: Landmark
      }
    }
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/90 shadow-xs sticky top-0 z-50">
      {/* 1. Top Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Date & Live Weather */}
          <div className="flex items-center space-x-3.5">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>{currentDate || 'শুক্রবার, ১১ সেপ্টেম্বর ২০২৬'}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>বারুইপুর: ২৯°সে | আংশিক মেঘলা</span>
            </span>
          </div>

          {/* Right: Quick Emergency & Editorial Links */}
          <div className="flex items-center space-x-3 text-xs">
            <a 
              href="/emergency-contacts" 
              className="inline-flex items-center gap-1.5 text-red-300 hover:text-white font-bold bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800/50 transition shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>জরুরি হেল্পলাইন</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/submit-news" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              সংবাদ পাঠান
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <a 
              href="/editorial-team" 
              className="text-slate-300 hover:text-white font-medium hidden md:inline transition"
            >
              বার্তা পরিষদ
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/about" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              আমাদের পরিচয়
            </a>

            {isLocal && (
              <>
                <span className="text-slate-700">|</span>
                <a 
                  href="/admin" 
                  className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2 py-0.5 rounded font-bold text-xs transition"
                >
                  <Settings className="w-3 h-3" />
                  <span>অ্যাডমিন</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Brand, Search & CTA Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Mobile Drawer Trigger */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
              aria-label="মেনু খুলুন"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a href="/" className="group flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo.png" 
                alt="বারুইপুর অনলাইন - Baruipur Online" 
                width={220}
                height={52}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </a>
          </div>

          {/* Desktop Search Bar with Instant Search Suggestions */}
          <div className="hidden md:flex flex-col items-end gap-1.5 flex-1 max-w-lg ml-auto">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="বারুইপুরে খুঁজুন: ফ্ল্যাট, টেন্ডার, ডাক্তার, ট্রেন বা খবর..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition shadow-2xs"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow-xs"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-600">জনপ্রিয়:</span>
              <a href="/property" className="text-emerald-700 hover:underline font-semibold">ফ্ল্যাট ও জমি</a>
              <span>•</span>
              <a href="/tenders" className="text-red-700 hover:underline font-semibold">পৌর টেন্ডার</a>
              <span>•</span>
              <a href="/health-directory" className="text-rose-700 hover:underline font-semibold">ডাক্তার</a>
              <span>•</span>
              <a href="/transport" className="text-blue-700 hover:underline font-semibold">লোকাল ট্রেন</a>
            </div>
          </div>

          {/* Quick Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-200 shrink-0">
            <a
              href="/property"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl transition shadow-sm hover:shadow"
              title="বিনামূল্যে জমি বা ফ্ল্যাটের বিজ্ঞাপন পোস্ট করুন"
            >
              <PlusCircle className="w-4 h-4" />
              <span>প্রপার্টি বিজ্ঞাপন</span>
            </a>
            <a
              href="/submit-news"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl transition shadow-sm hover:shadow"
              title="আপনার এলাকার সংবাদ ও ছবি পাঠান"
            >
              <Send className="w-4 h-4" />
              <span>সংবাদ পাঠান</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Primary Desktop Mega Menu Navigation Bar */}
      <nav 
        className="border-t border-slate-150 bg-white/98 backdrop-blur-md relative"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center justify-between gap-1 py-1">
            <div className="flex items-center space-x-1">
              {/* Home Link */}
              <a
                href="/"
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  pathname === '/'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>প্রচ্ছদ</span>
              </a>

              {/* Mega Menu Triggers */}
              {megaMenus.map((menu) => {
                const isHovered = activeMegaMenu === menu.id;
                const isActive = menu.activePattern ? menu.activePattern.test(pathname) : false;

                return (
                  <div 
                    key={menu.id} 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                  >
                    <a
                      href={menu.href}
                      onClick={(e) => {
                        // On desktop click, toggle or navigate
                        if (!isHovered) {
                          e.preventDefault();
                          setActiveMegaMenu(menu.id);
                        }
                      }}
                      className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 group ${
                        isActive || isHovered
                          ? 'bg-slate-100 text-slate-900 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-red-700'
                      }`}
                    >
                      <span>{menu.label}</span>
                      {menu.badge && (
                        <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full border ${menu.badgeColor || 'bg-red-100 text-red-800 border-red-200'}`}>
                          {menu.badge}
                        </span>
                      )}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? 'rotate-180 text-red-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    </a>
                  </div>
                );
              })}

              {/* Direct Link: Events */}
              <a
                href="/events"
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  pathname.startsWith('/events')
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-amber-800'
                }`}
              >
                <span>🎡 মেলা ও উৎসব</span>
              </a>
            </div>

            {/* Right Quick Action: Emergency Helpline */}
            <div className="flex items-center gap-2">
              <a
                href="/emergency-contacts"
                className="inline-flex items-center gap-1.5 text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>২৪/৭ পুলিশ ও হাসপাতাল</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3B. Active Desktop Mega Menu Dropdown Panel */}
        {activeMegaMenu && (
          <>
            {/* Backdrop Dimmer to avoid see-through clutter */}
            <div 
              className="fixed inset-0 top-[120px] bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setActiveMegaMenu(null)}
              aria-hidden="true"
            />
            <div 
              className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl mega-menu-dropdown z-50 transition-all duration-200"
              style={{ backgroundColor: '#ffffff', opacity: 1 }}
              onMouseEnter={() => {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              {megaMenus
                .filter(m => m.id === activeMegaMenu)
                .map(menu => (
                  <div key={menu.id} className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 bg-white" style={{ backgroundColor: '#ffffff' }}>
                    <div className="grid grid-cols-12 gap-8">
                      {/* Columns 1 & 2: Menu Categories (8-9 cols) */}
                      <div className="col-span-8 lg:col-span-8 grid grid-cols-2 gap-8 border-r border-slate-150 pr-8">
                        {menu.columns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-3.5">
                            {col.title && (
                              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                                {col.title}
                              </h3>
                            )}
                            <div className="space-y-2">
                              {col.items.map((item, itemIdx) => {
                                const IconComp = item.icon;
                                return (
                                  <a
                                    key={itemIdx}
                                    href={item.href}
                                    className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 ${
                                      item.highlight 
                                        ? 'bg-slate-50/90 hover:bg-red-50/50 border border-slate-200/80 hover:border-red-200'
                                        : 'hover:bg-slate-50 border border-transparent'
                                    }`}
                                  >
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${
                                      item.highlight 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-700'
                                    }`}>
                                      <IconComp className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-bold text-slate-900 group-hover:text-red-700 text-sm leading-snug transition-colors">
                                          {item.label}
                                        </span>
                                        {item.badge && (
                                          <span className={`text-xs font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-600">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Column 3: Featured Interactive Callout Box (4 cols) */}
                      <div className="col-span-4 lg:col-span-4 flex flex-col justify-between">
                        <div className={`p-5 rounded-2xl ${menu.featured.accentBg} border ${menu.featured.borderAccent} shadow-2xs h-full flex flex-col justify-between`}>
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-800 border border-slate-200/60 shadow-2xs">
                                {menu.featured.badge}
                              </span>
                              <menu.featured.icon className="w-5 h-5 text-slate-700 opacity-80" />
                            </div>
                            <h4 className="font-black text-slate-900 text-base mb-1.5 leading-snug">
                              {menu.featured.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                              {menu.featured.desc}
                            </p>
                          </div>

                          <a
                            href={menu.featured.href}
                            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition shadow-xs group"
                          >
                            <span>{menu.featured.btnText}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </nav>

      {/* 4. Upgraded Mobile Slide-Over Drawer with Categorized Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-[340px] sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/logo.png" 
                  alt="বারুইপুর অনলাইন" 
                  className="h-8 w-auto object-contain"
                />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition"
                aria-label="মেনু বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="বারুইপুরে খুঁজুন: ফ্ল্যাট, ডাক্তার, ট্রেন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
                <button type="submit" className="absolute right-3 top-3 text-slate-400 hover:text-red-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Action Buttons (Top of Drawer) */}
            <div className="p-4 pb-2 grid grid-cols-2 gap-2 border-b border-slate-100">
              <a
                href="/property"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>প্রপার্টি দিন</span>
              </a>
              <a
                href="/submit-news"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>সংবাদ দিন</span>
              </a>
            </div>

            {/* Drawer Body: Structured Menu Sections */}
            <div className="p-4 space-y-4 flex-1">
              {/* Highlight Service Cards */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">
                  🌟 শীর্ষ নাগরিক পোর্টাল সেবা
                </div>

                <a
                  href="/property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">জমি ও ফ্ল্যাট কেনাবেচা</h4>
                      <p className="text-xs text-slate-500">নতুন ফ্ল্যাট, বাস্তু জমি ও নিলাম</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    নতুন
                  </span>
                </a>

                <a
                  href="/tenders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">সরকারি ও পৌর টেন্ডার</h4>
                      <p className="text-xs text-slate-500">পৌরসভা ও SDO-র NIT নোটিস</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded-full">
                    NIT
                  </span>
                </a>

                <a
                  href="/notices"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">জরুরি সরকারি নোটিস</h4>
                      <p className="text-xs text-slate-500">দপ্তর ও পঞ্চায়েতের সার্কুলার</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                    নতুন
                  </span>
                </a>

                <a
                  href="/health-directory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">স্বাস্থ্য ও ডাক্তার চেম্বার</h4>
                      <p className="text-xs text-slate-500">নার্সিংহোম ও বিশেষজ্ঞ রোস্টার</p>
                    </div>
                  </div>
                  <span className="text-xs bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full">
                    OPD
                  </span>
                </a>

                <a
                  href="/transport"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <TrainTrack className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">লোকাল ট্রেন সময়সূচি</h4>
                      <p className="text-xs text-slate-500">শিয়ালদহ, ডায়মন্ড হারবার ও নামখানা</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                    টাইমটেবিল
                  </span>
                </a>

                <a
                  href="/emergency-contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 hover:shadow-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">জরুরি হেল্পলাইন নম্বর</h4>
                      <p className="text-xs text-slate-500">পুলিশ, হাসপাতাল ও বিদ্যুৎ</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded-full">
                    ২৪/৭
                  </span>
                </a>
              </div>

              {/* Categorized Directory Links */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1 mb-1">
                  প্রধান বিভাগসমূহ
                </div>

                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>🏠 প্রচ্ছদ (Home)</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/category/all"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>📰 সমস্ত খবর আর্কাইভ</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/places"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🏛️ স্থান ও ল্যান্ডমার্ক ডিরেক্টরি</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/organizations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🏢 প্রতিষ্ঠান, ক্লাব ও সমিতি</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>🎡 উৎসব ও রাসমেলা ক্যালেন্ডার</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="/citizen-services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>📋 নাগরিক পরিষেবা ও গাইড</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
              <p>© ২০২৬ বারুইপুর অনলাইন • সর্বস্বত্ব সংরক্ষিত</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
