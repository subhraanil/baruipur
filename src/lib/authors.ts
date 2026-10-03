export interface Author {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  bioBn: string;
  bioEn: string;
  avatar: string;
  email: string;
  twitter?: string;
  beat: string;
  location: string;
}

export const EDITORIAL_AUTHORS: Record<string, Author> = {
  'subhranil-naskar': {
    id: 'subhranil-naskar',
    nameBn: 'শুভ্রনীল নস্কর',
    nameEn: 'Subhranil Naskar',
    roleBn: 'প্রধান সম্পাদক ও প্রকাশক',
    roleEn: 'Chief Editor & Publisher',
    bioBn: 'দক্ষিণ ২৪ পরগনা ও বারুইপুর মহকুমার সমাজ, পৌর রাজনীতি ও আঞ্চলিক উন্নয়ন বিষয়ক বিশেষজ্ঞ সাংবাদিক। দীর্ঘ ৮ বছরেরও বেশি সময় ধরে মহকুমার জনস্বার্থ ও অনুসন্ধানমূলক সাংবাদিকতায় যুক্ত।',
    bioEn: 'Senior regional journalist covering South 24 Parganas, civic infrastructure, and public policy for over 8 years.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    email: 'subhranil@baruipur.online',
    beat: 'মহকুমা প্রশাসন, নগরোন্নয়ন ও রাজনীতি',
    location: 'বারুইপুর সদর'
  },
  'animesh-mukherjee': {
    id: 'animesh-mukherjee',
    nameBn: 'অনিমেষ মুখার্জী',
    nameEn: 'Animesh Mukherjee',
    roleBn: 'সিনিয়র ক্রাইম ও জেলা প্রশাসন প্রতিনিধি',
    roleEn: 'Senior Crime & Police Beat Reporter',
    bioBn: 'বারুইপুর পুলিশ জেলা, মহকুমা আদালত ও সুন্দরবন উপকূলীয় অঞ্চলের আইনশৃঙ্খলা ও বিচার ব্যবস্থা সংক্রান্ত নিয়মিত গ্রাউন্ড রিপোর্টার।',
    bioEn: 'Specialized correspondent covering Baruipur Police District, Subdivisional Court trials and regional law enforcement.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    email: 'crime@baruipur.online',
    beat: 'আইনশৃঙ্খলা, আদালত ও পুলিশ প্রশাসন',
    location: 'বারুইপুর আদালত চত্বর'
  },
  'priyabrata-mondal': {
    id: 'priyabrata-mondal',
    nameBn: 'প্রিয়ব্রত মণ্ডল',
    nameEn: 'Priyabrata Mondal',
    roleBn: 'নাগরিক পরিষেবা ও রেল পরিকাঠামো সংবাদদাতা',
    roleEn: 'Civic & Railway Infrastructure Correspondent',
    bioBn: 'শিয়ালদহ দক্ষিণ রেলওয়ে শাখা, বারুইপুর জংশন এবং ১৭টি ওয়ার্ডের নিকাশি, পানীয় জল ও নাগরিক সমস্যা কেন্দ্রিক অনুসন্ধানী প্রতিবেদক।',
    bioEn: 'Investigative correspondent reporting on Sealdah South railway division, transit networks and municipal public services.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    email: 'civic@baruipur.online',
    beat: 'রেলপথ, পৌর পরিষেবা ও গণপরিবহন',
    location: 'বারুইপুর জংশন'
  },
  'mousumi-sengupta': {
    id: 'mousumi-sengupta',
    nameBn: 'মৌসুমী সেনগুপ্ত',
    nameEn: 'Mousumi Sengupta',
    roleBn: 'সংস্কৃতি, ঐতিহ্য ও শিক্ষা প্রতিনিধি',
    roleEn: 'Culture, Heritage & Education Reporter',
    bioBn: 'বারুইপুরের ঐতিহাসিক রাসমেলা, রাজবাড়ি, প্রাচীন লোকউৎসব, বিদ্যালয় ও স্থানীয় সমাজকল্যাণমূলক প্রতিষ্ঠানের বিশেষ নিবন্ধকার।',
    bioEn: 'Cultural writer and education correspondent covering regional festivals, Rashmela, schools and heritage conservation.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    email: 'culture@baruipur.online',
    beat: 'ঐতিহ্য, রাসমেলা, শিক্ষা ও সমাজসেবা',
    location: 'বারুইপুর রাসমাঠ'
  },
  'desk-team': {
    id: 'desk-team',
    nameBn: 'বারুইপুর অনলাইন বার্তা ডেস্ক',
    nameEn: 'Baruipur Online Editorial Bureau',
    roleBn: 'কেন্দ্রীয় বার্তা ও ফ্যাক্ট-চেক বিভাগ',
    roleEn: 'Central Newsdesk & Fact-Checking Unit',
    bioBn: 'বারুইপুর মহকুমার মাঠপর্যায়ের প্রত্যক্ষদর্শী, সরকারি বিজ্ঞপ্তি ও ফিল্ড তথ্যাবলীর দ্রুত যাচাইকরণ ও প্রকাশনা টিম।',
    bioEn: 'Central verification, fact-checking and regional news desk based out of Baruipur headquarters.',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80',
    email: 'editor@baruipur.online',
    beat: 'ব্রেকিং নিউজ ও ফ্যাক্ট-চেকিং',
    location: 'বারুইপুর সেন্ট্রাল ব্যুরো'
  }
};

export const DEFAULT_AUTHOR = EDITORIAL_AUTHORS['subhranil-naskar'];

export function getAuthorById(id?: string): Author {
  if (!id) return DEFAULT_AUTHOR;
  return EDITORIAL_AUTHORS[id] || DEFAULT_AUTHOR;
}

export function getAuthorForCategory(category: string): Author {
  switch (category) {
    case 'crime':
      return EDITORIAL_AUTHORS['animesh-mukherjee'];
    case 'railway':
    case 'municipality':
      return EDITORIAL_AUTHORS['priyabrata-mondal'];
    case 'culture':
    case 'education':
      return EDITORIAL_AUTHORS['mousumi-sengupta'];
    case 'health':
    case 'general':
    default:
      return EDITORIAL_AUTHORS['subhranil-naskar'];
  }
}

export function getAllAuthors(): Author[] {
  return Object.values(EDITORIAL_AUTHORS);
}
