import fs from 'fs';
import path from 'path';
import { Article, Source, CrawlLog } from './types';
import { INITIAL_SOURCES } from './constants';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'news_data.json');

interface DatabaseSchema {
  articles: Article[];
  sources: Source[];
  crawlLogs: CrawlLog[];
}

const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'বারুইপুর জংশনে আধুনিক ফুটওভার ব্রিজ ও এসকেলেটর প্রকল্পের কাজ শুরু',
    slug: 'baruipur-junction-new-foot-overbridge-escalator',
    summary: 'যাত্রী স্বাচ্ছন্দ্য বাড়াতে শিয়ালদহ দক্ষিণ শাখার গুরুত্বপূর্ণ স্টেশন বারুইপুর জংশনে নতুন আধুনিক ফুটওভার ব্রিজ ও এসকেলেটর বসানোর অনুমোদন দিল পূর্ব রেলওয়ে কর্তৃপক্ষ।',
    content: 'শিয়ালদহ দক্ষিণ শাখার অত্যন্ত ব্যস্ত স্টেশন বারুইপুর জংশনে প্রতিদিন কয়েক লক্ষ নিত্যযাত্রী যাতায়াত করেন। যাত্রী সংখ্যা ক্রমাগত বৃদ্ধির কারণে পুরোনো ফুটওভার ব্রিজে ভিড়ের চাপ সামলানো কঠিন হয়ে পড়ছিল। এই পরিস্থিতি দূর করতে পূর্ব রেলওয়ের পক্ষ থেকে আধুনিক ফুটওভার ব্রিজ, র্যাম্প এবং বয়স্ক ও বিশেষভাবে সক্ষম যাত্রীদের জন্য এসকেলেটর তৈরির কাজ দ্রুত গতিতে শুরু হয়েছে। রেল সূত্রে খবর, আগামী কয়েক মাসের মধ্যে এই প্রকল্পের কাজ সম্পূর্ণ হবে। স্থানীয় বিধায়ক ও রেলওয়ে প্যাসেঞ্জার অ্যাসোসিয়েশনের প্রতিনিধিরা এই উদ্যোগকে স্বাগত জানিয়েছেন।',
    category: 'railway',
    categoryNameBn: 'ট্রেন ও যাতায়াত',
    sourceId: 'src-3',
    sourceName: 'শিয়ালদহ দক্ষিণ রেলওয়ে ফোরাম',
    sourceType: 'rss',
    sourceUrl: 'https://t.me/s/sealdah_south_rail',
    imageUrl: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    isBreaking: true,
    isFeatured: true,
    status: 'published',
    views: 342,
    crawlHash: 'hash-art-1'
  },
  {
    id: 'art-2',
    title: 'বারুইপুর মহকুমা হাসপাতালে নতুন ১০০ শয্যার বিশেষ শিশু ও প্রসূতি বিভাগ চালু',
    slug: 'baruipur-sub-divisional-hospital-new-pediatric-ward',
    summary: 'দক্ষিণ ২৪ পরগনার বিস্তীর্ণ অঞ্চলের রোগীদের উন্নত চিকিৎসার লক্ষ্যে বারুইপুর মহকুমা হাসপাতালে আধুনিক পরিকাঠামো সহ নতুন ১০০ বেডের স্পেশাল ওয়ার্ড চালু হলো।',
    content: 'বারুইপুর মহকুমা হাসপাতালকে ঘিরে সুন্দরবনের প্রান্তিক অঞ্চল এবং ক্যানিং, জয়নগর, মন্দিরবাজারের হাজার হাজার মানুষ চিকিৎসার ভরসা পান। জেলা স্বাস্থ্য দপ্তরের বিশেষ আর্থিক সহায়তায় হাসপাতালে নতুন ১০০ শয্যার হাই-টেক মাদার অ্যান্ড চাইল্ড কেয়ার ইউনিট (SNCU ও PICU সহ) আনুষ্ঠানিকভাবে চালু হলো। হাসপাতালের সুপার জানান, এই নতুন ওয়ার্ড চালু হওয়ায় কলকাতা বা পিজি হাসপাতালে রেফার করার প্রয়োজনীয়তা অনেকটাই কমবে। হাসপাতালে আধুনিক ভেন্টিলেটর এবং ২৪ ঘণ্টা অক্সিজেন সাপোর্ট ইউনিটও বসানো হয়েছে।',
    category: 'health',
    categoryNameBn: 'স্বাস্থ্য ও হাসপাতাল',
    sourceId: 'src-1',
    sourceName: 'বারুইপুর টেলিগ্রাম',
    sourceType: 'telegram',
    sourceUrl: 'https://t.me/s/baruipur_news_update',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    isBreaking: false,
    isFeatured: true,
    status: 'published',
    views: 520,
    crawlHash: 'hash-art-2'
  },
  {
    id: 'art-3',
    title: 'পৌরসভার বিশেষ সাফাই অভিযান: বারুইপুর বাজার সংলগ্ন এলাকায় নিকাশি সংস্কার',
    slug: 'baruipur-municipality-drainage-cleaning-campaign',
    summary: 'বর্ষায় জল জমার সমস্যা চিরতরে মেটাতে বারুইপুর পৌরসভার চেয়ারম্যানের নেতৃত্বে কুলপি রোড ও বারুইপুর কাছারি বাজার চত্বরে যুদ্ধকালীন তৎপরতায় নিকাশি নালা সাফাই শুরু।',
    content: 'বারুইপুর শহরের অন্যতম ব্যস্ত বাণিজ্যকেন্দ্র কাছারি বাজার এবং স্টেশন সংলগ্ন এলাকায় জল নিকাশি গতিশীল রাখতে বিশেষ অভিযান শুরু করেছে বারুইপুর পৌরসভা। জেসিবি মেশিন নামিয়ে ভূগর্ভস্থ নালা ও প্রধান ড্রেনগুলির জমে থাকা পলি ও প্লাস্টিক বর্জ্য পরিষ্কার করা হচ্ছে। পুর কর্তৃপক্ষ সাধারণ ব্যবসায়ীদের অনুরোধ জানিয়েছেন, কোনোভাবেই নিষিদ্ধ সিঙ্গেল-ইউজ প্লাস্টিক নালা বা রাস্তায় না ফেলার জন্য। নির্দেশিকা অমান্য করলে জরিমানা ধার্য করা হবে বলে জানানো হয়েছে।',
    category: 'municipality',
    categoryNameBn: 'পৌরসভা ও নাগরিক',
    sourceId: 'src-2',
    sourceName: 'বারুইপুর লোকাল নিউজ ফেসবুক',
    sourceType: 'facebook',
    sourceUrl: 'https://facebook.com/BaruipurLocalNews24',
    imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    isBreaking: false,
    isFeatured: false,
    status: 'published',
    views: 185,
    crawlHash: 'hash-art-3'
  },
  {
    id: 'art-4',
    title: 'বারুইপুর পুলিশ জেলার উদ্যোগে সাইবার ক্রাইম সচেতনতা শিবির ও হেল্পলাইন প্রচার',
    slug: 'baruipur-police-district-cyber-crime-awareness',
    summary: 'অনলাইন প্রতারণা, লটারি ও ওটিপি জালিয়াতি রুখতে সাধারণ মানুষকে সচেতন করতে বারুইপুর পুলিশ ডিস্ট্রিক্টের পক্ষ থেকে স্কুল-কলেজে সচেতনতা কর্মশালা অনুষ্ঠিত।',
    content: 'বর্তমান সময়ে ডিজিটাল ব্যাংকিং ও সোশ্যাল মিডিয়ার মাধ্যমে নিত্যনতুন প্রতারণার ফাঁদে পা দিচ্ছেন বহু নাগরিক। এই সমস্যা রুখতে বারুইপুর জেলা পুলিশের সাইবার ক্রাইম থানার স্পেশাল টিম বারুইপুর হাইস্কুল এবং বিভিন্ন পঞ্চায়েত এলাকায় গিয়ে বিশেষ সচেতনতা সভার আয়োজন করে। পুলিশের আধিকারিকরা স্পষ্ট জানিয়েছেন, ব্যাঙ্ক বা পুলিশ কখনো কারো কাছে ওটিপি, পাসওয়ার্ড বা ব্যক্তিগত তথ্য চায় না। কোনো প্রতারণার ঘটনা ঘটলে অবিলম্বে জাতীয় হেল্পলাইন ১৯৩০ নম্বরে অথবা বারুইপুর সাইবার থানায় যোগাযোগের নির্দেশ দেওয়া হয়েছে।',
    category: 'crime',
    categoryNameBn: 'অপরাধ ও প্রশাসন',
    sourceId: 'src-1',
    sourceName: 'বারুইপুর টেলিগ্রাম',
    sourceType: 'telegram',
    sourceUrl: 'https://t.me/s/baruipur_news_update',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    isBreaking: false,
    isFeatured: false,
    status: 'published',
    views: 298,
    crawlHash: 'hash-art-4'
  },
  {
    id: 'art-5',
    title: 'দক্ষিণ ২৪ পরগনা জেলা বিজ্ঞান প্রদর্শনীতে প্রথম স্থান অর্জন বারুইপুর হাই স্কুলের',
    slug: 'baruipur-high-school-district-science-fair-winner',
    summary: 'পরিবেশবান্ধব সৌরশক্তি ও স্বয়ংক্রিয় কৃষিসেচ প্রকল্প প্রদর্শন করে জেলা স্তরের বিজ্ঞান মেলায় সেরার শিরোপা ছিনিয়ে নিল বারুইপুরের পড়ুয়ারা।',
    content: 'জেলা শিক্ষা দপ্তরের উদ্যোগে আয়োজিত জেলাভিত্তিক বিজ্ঞান ও পরিবেশ মেলায় তাক লাগাল বারুইপুর হাই স্কুলের ছাত্রছাত্রীরা। দশম ও একাদশ শ্রেণির একদল ছাত্র আধুনিক আইওটি (IoT) সেন্সর চালিত এমন এক স্বয়ংক্রিয় সেচ ব্যবস্থা মডেল তৈরি করেছে যা আবহাওয়ার পূর্বাভাস ও মাটির আর্দ্রতা বুঝে জমিতে প্রয়োজনীয় জল সরবরাহ করে। বিচারকমণ্ডলী এই উদ্ভাবনী ভাবনার ভূয়সী প্রশংসা করে রাজ্য স্তরের প্রতিযোগিতার জন্য তাদের নির্বাচিত করেন।',
    category: 'education',
    categoryNameBn: 'শিক্ষা ও স্কুল',
    sourceId: 'src-2',
    sourceName: 'বারুইপুর লোকাল নিউজ ফেসবুক',
    sourceType: 'facebook',
    sourceUrl: 'https://facebook.com/BaruipurLocalNews24',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    isBreaking: false,
    isFeatured: false,
    status: 'published',
    views: 142,
    crawlHash: 'hash-art-5'
  },
  {
    id: 'art-6',
    title: 'আসন্ন শীতে বারুইপুর রাসমেলা ও কুটিরশিল্প উৎসবের প্রস্তুতি শুরু: বৈঠক ডাকল কমিটি',
    slug: 'baruipur-raas-mela-cottage-industry-festival-prep',
    summary: 'ঐতিহাসিক বারুইপুর রাসমেলা ও হস্তশিল্প প্রদর্শনীকে সুষ্ঠু ও সুশৃঙ্খলভাবে সম্পন্ন করতে স্থানীয় প্রশাসন, ব্যবসায়ী সমিতি ও নাগরিক প্রতিনিধিদের যৌথ বৈঠক অনুষ্ঠিত।',
    content: 'বারুইপুর মহকুমার অন্যতম প্রাচীন ও ঐতিহ্যবাহী মেলা হলো বারুইপুর রাসমেলা। প্রতি বছর স্থানীয় হস্তশিল্প, পেয়ারা ও মরশুমি ফল, মাটির সামগ্রী এবং গ্রামীণ সংস্কৃতির এক অনন্য মিলনমেলা গড়ে ওঠে রাসমাঠে। আসন্ন উৎসব উপলক্ষে মেলার নিরাপত্তা, অগ্নি-নির্বাপণ ব্যবস্থা, সিসিটিভি নজরদারি এবং পার্কিং ব্যবস্থা সুনিশ্চিত করতে পুলিশ ও পুর প্রতিনিধিদের সমন্বয় বৈঠক অনুষ্ঠিত হলো। স্থানীয় উদ্যোক্তারা আশা করছেন এবার মেলায় রেকর্ডসংখ্যক দর্শনার্থীর সমাগম ঘটবে।',
    category: 'culture',
    categoryNameBn: 'উৎসব ও খেলাধুলা',
    sourceId: 'src-4',
    sourceName: 'বারুইপুর লাইভ বুলেটিন',
    sourceType: 'youtube',
    sourceUrl: 'https://youtube.com/@BaruipurLiveOfficial',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    isBreaking: false,
    isFeatured: false,
    status: 'published',
    views: 410,
    crawlHash: 'hash-art-6'
  }
];

function initDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.articles) && Array.isArray(data.sources)) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading database file, initializing defaults:', err);
  }

  const initialData: DatabaseSchema = {
    articles: INITIAL_ARTICLES,
    sources: INITIAL_SOURCES,
    crawlLogs: [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        sourceId: 'system',
        sourceName: 'সিস্টেম ইনিশিয়ালাইজেশন',
        status: 'success',
        message: 'বারুইপুর লাইভ সিস্টেম ও ডাটাবেস সফলভাবে প্রস্তুত হয়েছে।',
        itemsFetched: 6,
        itemsPublished: 6
      }
    ]
  };

  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write initial db:', err);
  }

  return initialData;
}

function getDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.articles) && Array.isArray(data.sources)) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  return initDatabase();
}

function saveDatabase(data: DatabaseSchema) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database:', err);
  }
}

export const db = {
  getArticles(filter?: { category?: string; status?: string; search?: string; limit?: number; featured?: boolean }): Article[] {
    const currentDb = getDb();
    let list = [...currentDb.articles];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter(a => a.status === filter.status);
    } else if (!filter?.status) {
      list = list.filter(a => a.status === 'published');
    }

    if (filter?.category && filter.category !== 'all') {
      list = list.filter(a => a.category === filter.category);
    }

    if (filter?.featured) {
      list = list.filter(a => a.isFeatured);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
    }

    list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (filter?.limit && filter.limit > 0) {
      list = list.slice(0, filter.limit);
    }

    return list;
  },

  getArticleById(idOrSlug: string): Article | undefined {
    const currentDb = getDb();
    if (!idOrSlug) return undefined;
    const clean = idOrSlug.trim();
    let decoded = clean;
    try {
      decoded = decodeURIComponent(clean);
    } catch(e) {}
    return currentDb.articles.find(a => 
      a.id === clean || 
      a.id === decoded ||
      a.slug === clean || 
      a.slug === decoded ||
      (a.slug && decodeURIComponent(a.slug) === decoded)
    );
  },

  saveArticle(article: Article): Article {
    const currentDb = getDb();
    const existingIndex = currentDb.articles.findIndex(a => a.id === article.id || (article.crawlHash && a.crawlHash === article.crawlHash));
    if (existingIndex >= 0) {
      currentDb.articles[existingIndex] = { ...currentDb.articles[existingIndex], ...article };
    } else {
      currentDb.articles.unshift(article);
    }
    saveDatabase(currentDb);
    return article;
  },

  deleteArticle(id: string): boolean {
    const currentDb = getDb();
    const prevLen = currentDb.articles.length;
    currentDb.articles = currentDb.articles.filter(a => a.id !== id);
    if (currentDb.articles.length !== prevLen) {
      saveDatabase(currentDb);
      return true;
    }
    return false;
  },

  incrementViews(id: string) {
    const currentDb = getDb();
    const article = currentDb.articles.find(a => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      saveDatabase(currentDb);
    }
  },

  getSources(): Source[] {
    const currentDb = getDb();
    return [...currentDb.sources];
  },

  getSourceById(id: string): Source | undefined {
    const currentDb = getDb();
    return currentDb.sources.find(s => s.id === id);
  },

  saveSource(source: Source): Source {
    const currentDb = getDb();
    const index = currentDb.sources.findIndex(s => s.id === source.id);
    if (index >= 0) {
      currentDb.sources[index] = { ...currentDb.sources[index], ...source };
    } else {
      currentDb.sources.unshift(source);
    }
    saveDatabase(currentDb);
    return source;
  },

  deleteSource(id: string): boolean {
    const currentDb = getDb();
    const prevLen = currentDb.sources.length;
    currentDb.sources = currentDb.sources.filter(s => s.id !== id);
    if (currentDb.sources.length !== prevLen) {
      saveDatabase(currentDb);
      return true;
    }
    return false;
  },

  getCrawlLogs(): CrawlLog[] {
    const currentDb = getDb();
    return [...currentDb.crawlLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  addCrawlLog(log: CrawlLog) {
    const currentDb = getDb();
    currentDb.crawlLogs.unshift(log);
    if (currentDb.crawlLogs.length > 100) {
      currentDb.crawlLogs = currentDb.crawlLogs.slice(0, 100);
    }
    saveDatabase(currentDb);
  },

  hasArticleWithHash(hash: string): boolean {
    if (!hash) return false;
    const currentDb = getDb();
    return currentDb.articles.some(a => a.crawlHash === hash);
  }
};
