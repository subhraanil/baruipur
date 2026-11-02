import React from 'react';
import { 
  Stethoscope, 
  ShieldAlert, 
  Landmark, 
  Building2, 
  TrainTrack, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ShoppingBag, 
  Utensils, 
  MapPin,
  CalendarDays
} from 'lucide-react';

export default function QuickAccessDirectory() {
  const quickAccessItems = [
    { 
      label: 'ডাক্তার ও স্বাস্থ্য', 
      desc: 'ওপিডি চেম্বার ও ক্লিনিক',
      icon: <Stethoscope className="w-5 h-5 text-red-600" />, 
      href: '/health-directory', 
      accent: 'border-red-100 hover:border-red-300' 
    },
    { 
      label: 'জরুরি ডিরেক্টরি', 
      desc: 'পুলিশ, হাসপাতাল ও ফায়ার',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />, 
      href: '/emergency-contacts', 
      accent: 'border-rose-100 hover:border-rose-300' 
    },
    { 
      label: 'লোকাল ট্রেন আপডেট', 
      desc: 'শিয়ালদহ দক্ষিণ শাখা সময়সূচি',
      icon: <TrainTrack className="w-5 h-5 text-blue-600" />, 
      href: '/transport', 
      accent: 'border-blue-100 hover:border-blue-300' 
    },
    { 
      label: 'স্থান ও ল্যান্ডমার্ক', 
      desc: 'আদালত, রাজবাড়ি ও দর্শনীয় স্থান',
      icon: <Landmark className="w-5 h-5 text-amber-600" />, 
      href: '/places', 
      accent: 'border-amber-100 hover:border-amber-300' 
    },
    { 
      label: 'প্রতিষ্ঠান ও ক্লাব', 
      desc: 'স্থানীয় সমিতি ও সংগঠন',
      icon: <Building2 className="w-5 h-5 text-purple-600" />, 
      href: '/organizations', 
      accent: 'border-purple-100 hover:border-purple-300' 
    },
    { 
      label: 'নাগরিক পরিষেবা', 
      desc: 'পৌরসভা ও পঞ্চায়েত সহায়তা',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, 
      href: '/citizen-services', 
      accent: 'border-emerald-100 hover:border-emerald-300' 
    },
    { 
      label: 'খাবার ও রেস্তোরাঁ', 
      desc: 'সেরা ডাইনিং, মিষ্টি ও বিরিয়ানি',
      icon: <Utensils className="w-5 h-5 text-orange-600" />, 
      href: '/best-restaurants-cafes-and-food-guide-in-baruipur/', 
      accent: 'border-orange-100 hover:border-orange-300' 
    },
    { 
      label: 'স্কুল ও শিক্ষা', 
      desc: 'CBSE, ICSE ও সরকারি স্কুল',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />, 
      href: '/top-schools-in-baruipur-education-admission-guide/', 
      accent: 'border-indigo-100 hover:border-indigo-300' 
    },
    { 
      label: 'বাজার ও শপিং মল', 
      desc: 'পুরাতন বাজার ও ব্র্যান্ড শোরুম',
      icon: <ShoppingBag className="w-5 h-5 text-pink-600" />, 
      href: '/shopping-malls-and-top-brands-in-baruipur-market-guide/', 
      accent: 'border-pink-100 hover:border-pink-300' 
    },
    { 
      label: 'বারুইপুর পৌরসভা', 
      desc: 'নাগরিক দপ্তর ও ওয়ার্ড তথ্য',
      icon: <Building2 className="w-5 h-5 text-teal-600" />, 
      href: '/places/baruipur-municipality/', 
      accent: 'border-teal-100 hover:border-teal-300' 
    },
    { 
      label: 'দর্শনীয় স্থানসমূহ', 
      desc: 'আঞ্চলিক পর্যটন ও ইকো পার্ক',
      icon: <MapPin className="w-5 h-5 text-cyan-600" />, 
      href: '/best-places-to-visit-in-baruipur-travel-guide/', 
      accent: 'border-cyan-100 hover:border-cyan-300' 
    },
    { 
      label: 'উৎসব ও মেলা', 
      desc: 'ঐতিহাসিক রাসমেলা ও ইভেন্ট ক্যালেন্ডার',
      icon: <CalendarDays className="w-5 h-5 text-amber-500" />, 
      href: '/events', 
      accent: 'border-amber-100 hover:border-amber-300' 
    }
  ];

  return (
    <section className="mb-8" aria-labelledby="quick-access-heading">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C62828]" />
          <h2 id="quick-access-heading" className="text-base sm:text-lg font-bold text-slate-900">
            এক নজরে বারুইপুর (Quick Access Directory)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
          ১২টি যাচাইকৃত স্থানীয় পরিষেবা
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {quickAccessItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={`bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center text-center group min-h-[96px] justify-center ${item.accent}`}
          >
            <div className="p-2 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform mb-1.5 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-[#C62828] transition-colors leading-tight mb-0.5">
              {item.label}
            </span>
            <span className="text-[10px] text-slate-400 font-normal line-clamp-1">
              {item.desc}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
