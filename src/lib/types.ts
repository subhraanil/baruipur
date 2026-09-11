export type ArticleCategory = 
  | 'all'
  | 'municipality' // পৌরসভা ও নাগরিক
  | 'railway'      // ট্রেন ও যাতায়াত
  | 'crime'        // অপরাধ ও প্রশাসন
  | 'health'       // স্বাস্থ্য ও হাসপাতাল
  | 'education'    // শিক্ষা ও বিদ্যায়তন
  | 'culture'      // উৎসব, সংস্কৃতি ও খেলাধুলা
  | 'general';     // সাধারণ সংবাদ

export interface Article {
  id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  categoryNameBn: string;
  sourceId: string;
  sourceName: string;
  sourceType: 'facebook' | 'telegram' | 'youtube' | 'rss' | 'manual';
  sourceUrl?: string;
  originalPostUrl?: string;
  imageUrl: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  publishedAt: string; // ISO string
  isBreaking?: boolean;
  isFeatured?: boolean;
  status: 'published' | 'draft' | 'archived';
  views: number;
  crawlHash?: string;
}

export interface Source {
  id: string;
  name: string;
  type: 'facebook' | 'telegram' | 'youtube' | 'rss';
  url: string;
  handle?: string;
  defaultCategory: ArticleCategory;
  isActive: boolean;
  autoPublish: boolean;
  lastCrawledAt?: string;
  postsCount: number;
  description?: string;
}

export interface CrawlLog {
  id: string;
  timestamp: string;
  sourceId: string;
  sourceName: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  itemsFetched: number;
  itemsPublished: number;
}

export interface CategoryInfo {
  id: ArticleCategory;
  nameBn: string;
  nameEn: string;
  slug: string;
  color: string;
  iconName: string;
}
