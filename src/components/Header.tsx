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
  Building2,
  Bell,
  Home,
  FileText,
  Stethoscope,
  Landmark,
  ShieldAlert,
  ChevronRight,
  ChevronDown,
  HeartPulse,
  Compass,
  MapPin,
  GraduationCap
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

  // Structured Mega Menu Configuration (5 Core Civic Directory Pillars)
  const megaMenus: MegaMenuConfig[] = [
    {
      id: 'places',
      label: 'স্থান ও ল্যান্ডমার্ক',
      href: '/places',
      badge: '৪৭টি স্থান',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      activePattern: /^\/places/,
      columns: [
        {
          title: 'ঐতিহ্য ও ধর্মীয় তীর্থস্থান',
          items: [
            {
              label: 'বারুইপুর রাজবাড়ি ও জমিদার প্রাসাদ',
              href: '/places/baruipur-rajbari',
              desc: 'সাবর্ণ রায়চৌধুরী জমিদার বংশের শতাব্দীপ্রাচীন ইতিহাস',
              icon: Landmark,
              highlight: true
            },
            {
              label: 'ঐতিহাসিক আটিসারা মহাপ্রভুতলা',
              href: '/places/atisara-mahaprabhu-tala',
              desc: 'শ্রীচৈতন্য মহাপ্রভুর পবিত্র পদধূলিধন্য বৈষ্ণব তীর্থক্ষেত্র',
              icon: Landmark
            },
            {
              label: 'মা শিবানীপীঠ ও দক্ষিণাকালী মন্দির',
              href: '/places/baruipur-maa-shibani-pith',
              desc: 'আদি গঙ্গার তীর সংলগ্ন জাগ্রত শক্তিক্ষেত্র',
              icon: Sparkles
            }
          ]
        },
        {
          title: 'প্রশাসনিক ও নাগরিক ল্যান্ডমার্ক',
          items: [
            {
              label: 'বারুইপুর রেলওয়ে জংশন',
              href: '/places/baruipur-railway-junction',
              desc: 'শিয়ালদহ দক্ষিণ শাখার প্রধান ব্যস্ততম ৪-প্ল্যাটফর্ম জংশন',
              icon: Compass
            },
            {
              label: 'বারুইপুর মহকুমা আদালত কমপ্লেক্স',
              href: '/places/baruipur-sub-divisional-court',
              desc: 'বিচার বিভাগীয় ও আইনি পরিষেবা কেন্দ্র',
              icon: Building2
            },
            {
              label: 'ঐতিহাসিক বারুইপুর রাস মাঠ',
              href: '/places/baruipur-rashmath',
              desc: '৩৫০ বছরের প্রাচীন রাসমেলা ও লোকউৎসবের মিলনভূমি',
              icon: MapPin
            }
          ]
        }
      ],
      featured: {
        title: 'ঐতিহ্যের বারুইপুর তথ্যকোষ',
        desc: 'দক্ষিণ ২৪ পরগনার প্রধান মহকুমা ও প্রাচীন জনপদের ৪৭টিরও বেশি ঐতিহাসিক ল্যান্ডমার্ক ও দর্শনীয় স্থান অন্বেষণ করুন।',
        href: '/places',
        btnText: 'সমস্ত স্থান দেখুন →',
        badge: 'তথ্যকোষ',
        accentBg: 'bg-amber-50',
        borderAccent: 'border-amber-200',
        icon: Landmark
      }
    },
    {
      id: 'organizations',
      label: 'প্রতিষ্ঠান ও সংগঠন',
      href: '/organizations',
      badge: '২৬টি প্রতিষ্ঠান',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      activePattern: /^\/organizations/,
      columns: [
        {
          title: 'সামাজিক ও সাংস্কৃতিক ক্লাব',
          items: [
            {
              label: 'রিয়েল স্টার ক্লাব (Real Star Club)',
              href: '/organizations/real-star-club-baruipur',
              desc: 'ঐতিহ্যবাহী ক্রীড়া, সমাজসেবা ও দুর্গোৎসব',
              icon: Building2,
              highlight: true
            },
            {
              label: 'সামারসেট ক্লাব (Summerset Club)',
              href: '/organizations/summerset-club-baruipur',
              desc: 'শহরের প্রবীণ সাংস্কৃতিক ও সামাজিক প্রতিষ্ঠান',
              icon: Building2
            },
            {
              label: 'ফুলতলা বিধান স্মৃতি সংঘ',
              href: '/organizations/fultala-bidhan-smriti-sangha',
              desc: 'যুবকল্যাণ, রক্তদান ও সামাজিক কর্মকাণ্ড',
              icon: Building2
            }
          ]
        },
        {
          title: 'শিক্ষা প্রতিষ্ঠান ও ট্রাস্ট',
          items: [
            {
              label: 'বারুইপুর হাই স্কুল (এইচ.এস)',
              href: '/organizations/baruipur-high-school',
              desc: '১৮৫৮ সালে প্রতিষ্ঠিত শতাব্দীপ্রাচীন শিক্ষাঙ্গন',
              icon: GraduationCap
            },
            {
              label: 'বারুইপুর কলেজ (Baruipur College)',
              href: '/places/baruipur-college',
              desc: 'কলকাতা বিশ্ববিদ্যালয় অনুমোদিত শীর্ষ ডিগ্রি কলেজ',
              icon: GraduationCap
            },
            {
              label: 'বারুইপুর রক্তদাতা ফোরাম ট্রাস্ট',
              href: '/organizations/baruipur-raktadata-forum-trust',
              desc: 'জরুরি রক্তের চাহিদা মেটাতে ২৪/৭ স্বেচ্ছাসেবী নেটওয়ার্ক',
              icon: HeartPulse
            }
          ]
        }
      ],
      featured: {
        title: 'বারুইপুর ক্লাব ও সংগঠন হাব',
        desc: 'বারুইপুরের শীর্ষস্থানীয় ক্রীড়া ক্লাব, সমাজকল্যাণ সমিতি, লাইব্রেরি ও শিক্ষা প্রতিষ্ঠানসমূহের প্রামাণ্য তালিকা।',
        href: '/organizations',
        btnText: 'সংগঠন তালিকা দেখুন →',
        badge: 'সমাজকল্যাণ',
        accentBg: 'bg-purple-50',
        borderAccent: 'border-purple-200',
        icon: Building2
      }
    },
    {
      id: 'health',
      label: 'স্বাস্থ্য ডিরেক্টরি',
      href: '/health-directory',
      badge: '৩৫+ কেন্দ্র',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activePattern: /^\/health-directory/,
      columns: [
        {
          title: 'চিকিৎসা প্রতিষ্ঠান',
          items: [
            {
              label: 'বারুইপুর মহকুমা হাসপাতাল (SDH)',
              href: '/health-directory/baruipur-subdivisional-hospital',
              desc: '৩০০ শয্যাবিশিষ্ট সরকারি হাসপাতাল ও সার্বক্ষণিক ইমার্জেন্সি',
              icon: HeartPulse,
              badge: '২৪/৭ জরুরি',
              badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
              highlight: true
            },
            {
              label: 'পদ্মপুকুর মাতৃসদন ও হাসপাতাল',
              href: '/health-directory/padmapukur-matri-sadan-baruipur',
              desc: 'পৌর পরিচালিত প্রসূতি ও শিশু চিকিৎসাকেন্দ্র',
              icon: HeartPulse
            },
            {
              label: 'পুবালী ক্লিনিক ও হাসপাতাল',
              href: '/health-directory/pubali-clinic-baruipur',
              desc: 'আধুনিক ওপিডি ও স্পেশালিটি সার্জারি সেন্টার',
              icon: Stethoscope
            }
          ]
        },
        {
          title: 'পরীক্ষা ও বিশেষজ্ঞ ওপিডি',
          items: [
            {
              label: 'ডাক্তার ও ওপিডি চেম্বার তালিকা',
              href: '/health-directory?category=doctors',
              desc: '১০০+ বিশেষজ্ঞ চিকিৎসকের নিয়মিত বসার সময় ও চেম্বার',
              icon: Stethoscope
            },
            {
              label: 'ডায়াগনস্টিক ও প্যাথলজি সেন্টার',
              href: '/health-directory?category=diagnostic',
              desc: 'রক্ত পরীক্ষা, ডিজিটাল এক্স-রে, সিটি স্ক্যান ও ইউএসজি',
              icon: Stethoscope
            },
            {
              label: 'স্বাস্থ্যসাথী অনুমোদিত নার্সিংহোম',
              href: '/health-directory?category=swasthya-sathi',
              desc: 'ক্যাশলেস স্বাস্থ্যসাথী কার্ড গ্রাহ্য হাসপাতালের তালিকা',
              icon: Landmark
            }
          ]
        }
      ],
      featured: {
        title: '২৪/৭ জরুরি স্বাস্থ্য ও অ্যাম্বুল্যান্স',
        desc: 'মহকুমা হাসপাতাল, ব্লাড ব্যাংক ও অ্যাম্বুল্যান্সের জরুরি নম্বরের সরাসরি যাচাইকৃত তালিকা দেখুন।',
        href: '/emergency-contacts',
        btnText: 'জরুরি হেল্পলাইন →',
        badge: '২৪/৭ সক্রিয়',
        accentBg: 'bg-rose-50',
        borderAccent: 'border-rose-200',
        icon: PhoneCall
      }
    },
    {
      id: 'notices',
      label: 'সরকারি নোটিস',
      href: '/notices',
      badge: '৫২টি নোটিস',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      activePattern: /^\/notices/,
      columns: [
        {
          title: 'প্রশাসনিক দপ্তর',
          items: [
            {
              label: 'মহকুমা শাসক (SDO) ও জেলা প্রশাসন',
              href: '/notices?dept=sdo',
              desc: 'আইন-শৃঙ্খলা, উৎসব অনুমতি ও লাইসেন্সিং বিজ্ঞপ্তি',
              icon: Bell,
              highlight: true
            },
            {
              label: 'বারুইপুর পৌরসভা সার্কুলার',
              href: '/notices?dept=municipality',
              desc: 'পৌর কর, ট্রেড লাইসেন্স ও নাগরিক পরিষেবা নোটিস',
              icon: Landmark
            },
            {
              label: 'ভূমি ও ভূমি সংস্কার দপ্তর (BL&LRO)',
              href: '/notices?dept=blro',
              desc: 'জমির মিউটেশন, খতিয়ান সংশোধন ও হিয়ারিং নোটিস',
              icon: FileText
            }
          ]
        },
        {
          title: 'জননিরাপত্তা ও বিদ্যুৎ',
          items: [
            {
              label: 'বারুইপুর পুলিশ জেলা বিজ্ঞপ্তি',
              href: '/notices?dept=police',
              desc: 'ট্রাফিক রুট নিয়ন্ত্রণ, নিরাপত্তা বিধি ও সচেতনতা',
              icon: ShieldAlert
            },
            {
              label: 'বিদ্যুৎ পর্ষদ (WBSEDCL Baruipur)',
              href: '/notices?dept=wbsedcl',
              desc: 'শিডিউলড বিদ্যুৎ রক্ষণাবেক্ষণ ও শাটডাউন নোটিস',
              icon: Bell
            },
            {
              label: 'স্বাস্থ্য দপ্তর ও হাসপাতাল বিজ্ঞপ্তি',
              href: '/notices?dept=hospital',
              desc: 'ওপিডি ক্লিনিক, রক্তদান ও টিকাকরণ বিজ্ঞপ্তি',
              icon: HeartPulse
            }
          ]
        }
      ],
      featured: {
        title: 'সরকারি অফিশিয়াল সার্কুলার ডেস্ক',
        desc: 'সরাসরি s24pgs.gov.in ও wbhealth.gov.in থেকে সংগৃহীত যাচাইকৃত সরকারি মেমো ও বিস্তারিত পাঠ্য।',
        href: '/notices',
        btnText: 'নোটিস ডেস্ক খুলুন →',
        badge: 'অফিশিয়াল',
        accentBg: 'bg-amber-50',
        borderAccent: 'border-amber-200',
        icon: Bell
      }
    },
    {
      id: 'tenders',
      label: 'পৌর ও সরকারি টেন্ডার',
      href: '/tenders',
      badge: '৬৫টি টেন্ডার',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      activePattern: /^\/tenders/,
      columns: [
        {
          title: 'পৌরসভা ও গ্রামীণ পরিকাঠামো',
          items: [
            {
              label: 'বারুইপুর পৌরসভা ই-টেন্ডার',
              href: '/tenders?auth=municipality',
              desc: 'রাস্তা ঢালাই, স্ট্রিট লাইটিং ও বর্জ্য ব্যবস্থাপনা দরপত্র',
              icon: FileText,
              highlight: true
            },
            {
              label: 'বারুইপুর ব্লক ও গ্রাম পঞ্চায়েত সমূহ',
              href: '/tenders?auth=panchayat',
              desc: 'গ্রামীণ রাস্তা, কালভার্ট ও সোলার লাইট টেন্ডার',
              icon: Building2
            },
            {
              label: 'দক্ষিণ ২৪ পরগনা জেলা পরিষদ (ZP)',
              href: '/tenders?auth=zp',
              desc: 'মহকুমা প্রধান গ্রামীণ সড়ক ও সেতু নির্মাণ টেন্ডার',
              icon: FileText
            }
          ]
        },
        {
          title: 'বিশেষায়িত প্রকৌশল ও পূর্ত',
          items: [
            {
              label: 'জনস্বাস্থ্য কারিগরি দপ্তর (PHE)',
              href: '/tenders?auth=phe',
              desc: 'আর্সেনিকমুক্ত জল সরবরাহ ও জল জীবন মিশন পাইপলাইন',
              icon: FileText
            },
            {
              label: 'পূর্ত দপ্তর (PWD Civil & Highway)',
              href: '/tenders?auth=pwd',
              desc: 'বারুইপুর মহকুমা মহাসড়ক ও সরকারি ভবন সংস্কার',
              icon: Landmark
            },
            {
              label: 'পূর্ব রেলওয়ে ও কেন্দ্রীয় ক্রয় (GeM)',
              href: '/tenders?auth=central_gem',
              desc: 'বারুইপুর রেল জংশন ও প্ল্যাটফর্ম শেড উন্নয়ন',
              icon: Compass
            }
          ]
        }
      ],
      featured: {
        title: 'wbtenders.gov.in ইন্টিগ্রেশন',
        desc: 'বারুইপুরের সমস্ত সরকারি দপ্তর ও পৌরসভার সরাসরি অনলাইন ই-টেন্ডার, প্রাক্কলিত মূল্য ও জমা দেওয়ার শেষ তারিখ।',
        href: '/tenders',
        btnText: 'টেন্ডার তালিকা দেখুন →',
        badge: 'সক্রিয় NIT',
        accentBg: 'bg-red-50',
        borderAccent: 'border-red-200',
        icon: FileText
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
              <span>{currentDate || 'বৃহস্পতিবার, ২৬ নভেম্বর ২০২৬'}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>বারুইপুর: ২৭°সে | মনোরম শীতকালীন আবহাওয়া</span>
            </span>
          </div>

          {/* Right: Quick Emergency & Informational Links */}
          <div className="flex items-center space-x-3 text-xs">
            <a 
              href="/emergency-contacts" 
              className="inline-flex items-center gap-1.5 text-red-300 hover:text-white font-bold bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800/50 transition shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>২৪/৭ জরুরি হেল্পলাইন</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/citizen-services" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              নাগরিক পরিষেবা
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="/transport" 
              className="text-slate-300 hover:text-white font-medium hidden sm:inline transition"
            >
              ট্রেন সময়সূচি
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

      {/* 2. Main Brand, Search & Directory Pillar Badges */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
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
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </a>
          </div>

          {/* Desktop Search Bar across Directory */}
          <div className="hidden md:flex flex-col items-end gap-1.5 flex-1 max-w-lg ml-auto">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="বারুইপুরে খুঁজুন: স্থান, হাসপাতাল, ক্লাব, সরকারি নোটিস বা টেন্ডার..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition shadow-2xs"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow-xs"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-600">দ্রুত খুঁজুন:</span>
              <a href="/places" className="text-amber-700 hover:underline font-semibold">স্থান ও রাজবাড়ি</a>
              <span>•</span>
              <a href="/health-directory" className="text-rose-700 hover:underline font-semibold">হাসপাতাল ও ডাক্তার</a>
              <span>•</span>
              <a href="/organizations" className="text-purple-700 hover:underline font-semibold">ক্লাব ও সংগঠন</a>
              <span>•</span>
              <a href="/notices" className="text-blue-700 hover:underline font-semibold">সরকারি নোটিস</a>
              <span>•</span>
              <a href="/tenders" className="text-red-700 hover:underline font-semibold">ই-টেন্ডার</a>
            </div>
          </div>

          {/* Quick Action Emergency CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-200 shrink-0">
            <a
              href="/emergency-contacts"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition shadow-sm hover:shadow"
              title="২৪ ঘণ্টা পুলিশ, দমকল ও হাসপাতাল জরুরি নম্বর"
            >
              <PhoneCall className="w-4 h-4" />
              <span>জরুরি ডিরেক্টরি</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Primary Desktop Mega Menu Navigation Bar (5 Core Pillars) */}
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

              {/* 5 Core Directory Mega Menus */}
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
            </div>

            {/* Right Quick Action: Emergency Services Pill */}
            <div className="flex items-center gap-2">
              <a
                href="/emergency-contacts"
                className="inline-flex items-center gap-1.5 text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>২৪/৭ পুলিশ ও হাসপাতাল হেল্পলাইন</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3B. Active Desktop Mega Menu Dropdown Panel */}
        {activeMegaMenu && (
          <>
            <div 
              className="fixed inset-0 top-[110px] bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
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
                      {/* Columns 1 & 2: Menu Categories (8 cols) */}
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
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                                          {item.label}
                                        </h4>
                                        {item.badge && (
                                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
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

                      {/* Column 3: Featured Pillar Spotlight Card (4 cols) */}
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

      {/* 4. Mobile Slide-Over Drawer with 5 Core Directory Sections */}
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
                  placeholder="বারুইপুরে খুঁজুন: স্থান, হাসপাতাল, ক্লাব..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
                <button type="submit" className="absolute right-3 top-3 text-slate-400 hover:text-red-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Drawer Body: 5 Core Directory Pillars */}
            <div className="p-4 space-y-3.5 flex-1">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">
                🌟 মূল ৫টি নাগরিক ডিরেক্টরি
              </div>

              {/* 1. Places */}
              <a
                href="/places"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">স্থান ও ল্যান্ডমার্ক</h4>
                    <p className="text-xs text-slate-500">ঐতিহাসিক রাজবাড়ি, মন্দির ও দর্শনীয় স্থান</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  ৪৭টি
                </span>
              </a>

              {/* 2. Organizations */}
              <a
                href="/organizations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">প্রতিষ্ঠান ও সংগঠন</h4>
                    <p className="text-xs text-slate-500">ক্লাব, সমিতি, স্কুল, কলেজ ও ট্রাস্ট</p>
                  </div>
                </div>
                <span className="text-xs bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                  ২৬টি
                </span>
              </a>

              {/* 3. Health Directory */}
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
                    <h4 className="font-bold text-slate-900 text-sm">স্বাস্থ্য ডিরেক্টরি</h4>
                    <p className="text-xs text-slate-500">মহকুমা হাসপাতাল, নার্সিংহোম ও ওপিডি</p>
                  </div>
                </div>
                <span className="text-xs bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full">
                  ৩৫+
                </span>
              </a>

              {/* 4. Official Notices */}
              <a
                href="/notices"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">সরকারি জরুরি নোটিস</h4>
                    <p className="text-xs text-slate-500">SDO, পুরসভা, স্বাস্থ্য ও পুলিশ সার্কুলার</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                  ৫২টি
                </span>
              </a>

              {/* 5. Tenders */}
              <a
                href="/tenders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">পৌর ও সরকারি টেন্ডার</h4>
                    <p className="text-xs text-slate-500">wbtenders.gov.in-এর সক্রিয় NIT দরপত্র</p>
                  </div>
                </div>
                <span className="text-xs bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded-full">
                  ৬৫টি
                </span>
              </a>

              {/* Quick Emergency Link */}
              <div className="pt-2">
                <a
                  href="/emergency-contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">২৪/৭ জরুরি হেল্পলাইন</h4>
                      <p className="text-xs text-slate-300">পুলিশ, হাসপাতাল, অ্যাম্বুল্যান্স ও দমকল</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
              <p>© ২০২৬ বারুইপুর অনলাইন • নাগরিক তথ্যকোষ</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
