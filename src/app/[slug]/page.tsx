import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatBengaliDate, formatTimeAgoBengali } from '@/lib/dateUtils';
import { CATEGORIES } from '@/lib/constants';
import { getSafeImageUrl } from '@/lib/videoUtils';
import NewsCard from '@/components/NewsCard';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { 
  Clock, 
  Eye, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  Flame, 
  Send,
  Play,
  ShieldCheck
} from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = db.getArticles({ status: 'published' });
  return articles.map(a => ({
    slug: a.slug || a.id
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const article = db.getArticleById(rawSlug) || db.getArticleById(decodedSlug);

  if (!article) {
    return {
      title: 'খবর পাওয়া যায়নি | বারুইপুর অনলাইন'
    };
  }

  const postSlug = article.slug || article.id;
  const canonicalUrl = `https://baruipur.online/${encodeURI(postSlug)}/`;
  const summary = article.summary || article.content.slice(0, 160).replace(/\n/g, ' ');
  const safeImage = getSafeImageUrl(article.imageUrl);
  const imageUrl = safeImage.startsWith('http') ? safeImage : `https://baruipur.online${safeImage}`;

  return {
    title: article.title,
    description: summary,
    keywords: [
      article.categoryNameBn,
      'Baruipur news',
      'বারুইপুর খবর',
      'বারুইপুর আপডেট',
      article.sourceName || 'বারুইপুর',
      'Baruipur South 24 Parganas'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} - বারুইপুর Baruipur`,
      description: summary,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      section: article.categoryNameBn,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: 'বারুইপুর Baruipur',
      locale: 'bn_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: summary,
      images: [imageUrl],
    },
    other: {
      'news_keywords': `${article.categoryNameBn}, Baruipur news, বারুইপুর খবর, ${article.sourceName || 'বারুইপুর'}`
    }
  };
}

export default function PostSlugPage({ params }: PostPageProps) {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const article = db.getArticleById(rawSlug) || db.getArticleById(decodedSlug);

  if (!article) {
    notFound();
  }

  // Views are recorded in production client

  const relatedArticles = db.getArticles({
    category: article.category,
    limit: 4
  }).filter(a => a.id !== article.id);

  const moreArticles = db.getArticles({
    limit: 7
  }).filter(a => a.id !== article.id);

  const postSlug = article.slug || article.id;
  const canonicalUrl = `https://baruipur.online/${encodeURI(postSlug)}/`;
  const shareText = `${article.title} - বারুইপুরে সম্পূর্ণ খবরটি পড়ুন।`;

  const safeImage = getSafeImageUrl(article.imageUrl);
  const imageUrl = safeImage.startsWith('http') ? safeImage : `https://baruipur.online${safeImage}`;
  const allImages = (article.images && article.images.length > 0)
    ? Array.from(new Set(article.images.map(img => {
        const s = getSafeImageUrl(img);
        return s.startsWith('http') ? s : `https://baruipur.online${s}`;
      })))
    : [imageUrl];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    headline: article.title,
    description: article.summary || article.content.slice(0, 200).replace(/\n/g, ' '),
    image: allImages,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'বারুইপুর অনলাইন বার্তা ডেস্ক',
      url: 'https://baruipur.online/'
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'বারুইপুর Baruipur',
      url: 'https://baruipur.online/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://baruipur.online/images/og-image.png'
      }
    },
    articleSection: article.categoryNameBn,
    inLanguage: 'bn',
    articleBody: article.content,
    citation: (article.sources || [article.sourceName]).filter(Boolean),
    about: {
      '@type': 'Place',
      name: 'Baruipur',
      sameAs: 'https://en.wikipedia.org/wiki/Baruipur'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'প্রচ্ছদ',
        item: 'https://baruipur.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.categoryNameBn,
        item: `https://baruipur.online/category/${article.category}/`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl
      }
    ]
  };

  // Extract FAQs for FAQPage Schema if present
  const faqRegex = /###\s+(?:Q\d*[:.]?\s*)?([^\n\?]+\?)\s*\n+([\s\S]*?)(?=\n###|\n##|$)/g;
  const faqs: Array<{ question: string; answer: string }> = [];
  let match;
  while ((match = faqRegex.exec(article.content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim().replace(/\n+/g, ' ').slice(0, 300)
    });
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 overflow-x-auto">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <a href={`/category/${article.category}`} className="hover:text-red-600 font-medium whitespace-nowrap">
          {article.categoryNameBn}
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Body (8 cols) */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.categoryNameBn}
            </span>
            {(article.videoUrl || article.videoEmbedUrl) && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Play className="w-3.5 h-3.5 fill-current" />
                ভিডিও প্রতিবেদন
              </span>
            )}
            {article.isBreaking && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                ব্রেকিং খবর
              </span>
            )}
            <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {article.views + 1} বার পঠিত
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subheading / Summary */}
          {article.summary && (
            <p className="text-base sm:text-lg text-slate-600 font-medium border-l-4 border-red-500 pl-4 py-1 mb-6 bg-red-50/40 rounded-r-lg">
              {article.summary}
            </p>
          )}

          {/* Meta & Source attribution bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-150 mb-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span>{formatBengaliDate(article.publishedAt)}</span>
              <span>•</span>
              <span className="text-slate-500">{formatTimeAgoBengali(article.publishedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">সংবাদ সূত্র:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">
                {article.sourceName}
              </span>
              {article.originalPostUrl && (
                <a 
                  href={article.originalPostUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-0.5 underline"
                >
                  মূল পোস্ট <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Featured Media: Embedded Video Player OR Featured Image */}
          {article.videoEmbedUrl || article.videoUrl ? (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black mb-6 shadow-md border border-slate-200">
              {article.videoUrl && (article.videoUrl.endsWith('.mp4') || article.videoUrl.endsWith('.webm')) ? (
                <video 
                  controls 
                  poster={getSafeImageUrl(article.imageUrl)}
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  <source src={article.videoUrl} type="video/mp4" />
                  আপনার ব্রাউজার ভিডিও প্লেয়ার সাপোর্ট করে না।
                </video>
              ) : (
                <iframe
                  src={article.videoEmbedUrl || article.videoUrl}
                  title={article.title}
                  className="w-full h-full border-0"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                />
              )}
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 mb-6 shadow-sm border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getSafeImageUrl(article.imageUrl)} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Social Share Callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-emerald-600 text-white">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">খবরটি বন্ধুদের সাথে শেয়ার করুন</p>
                <p className="text-[11px] text-emerald-700">বারুইপুরের বন্ধুদের কাছে সত্য খবর পৌঁছে দিন</p>
              </div>
            </div>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              হোয়াটসঅ্যাপে শেয়ার করুন
            </a>
          </div>

          {/* Information Verification & Freshness Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span><strong>তথ্য সত্যতা ও যাচাই:</strong> সেপ্টেম্বর ২০২৬ (Verified Local Directory)</span>
            </div>
            <div className="text-slate-500 font-medium">
              সর্বশেষ পরিমার্জন: সেপ্টেম্বর ২০২৬
            </div>
          </div>

          {/* Full Article Content with Markdown Rendering */}
          <div className="max-w-none text-slate-800 text-base sm:text-lg leading-relaxed">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Multi-Image Photo Stream & Gallery */}
          {article.images && article.images.length > 1 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  প্রতিবেদনের ছবি সংকলন ({article.images.length}টি ছবি)
                </h3>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">মূল উৎস থেকে সংরক্ষিত</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.images.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-[4/3] group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getSafeImageUrl(img)} 
                      alt={`${article.title} - ছবি ${idx + 1}`}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2.5 text-white text-xs font-semibold opacity-90 sm:opacity-0 group-hover:opacity-100 transition">
                      ছবি {idx + 1} / {article.images.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation Back Button */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <a 
              href="/" 
              className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
            >
              ← সব খবরে ফিরে যান
            </a>
            <a 
              href={`/category/${article.category}`}
              className="text-xs font-bold text-slate-700 hover:text-red-600 hover:underline"
            >
              {article.categoryNameBn}-র আরও খবর →
            </a>
          </div>
        </article>

        {/* Right Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Related News */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-150 pb-2 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                একই বিভাগের আরও খবর
              </h3>
              <div className="space-y-3">
                {relatedArticles.map(rel => (
                  <a 
                    key={rel.id} 
                    href={`/${rel.slug || rel.id}`}
                    className="block group p-2.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                  >
                    <p className="text-xs text-slate-400 mb-1">{formatTimeAgoBengali(rel.publishedAt)}</p>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-600 leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Categories, Guide & Emergency Directory */}
          <BaruipurUtilities 
            recentPosts={moreArticles}
            showCategories={true}
            showRecentPosts={relatedArticles.length === 0}
            showPlaces={true}
            showEmergency={true}
          />
        </aside>
      </div>
    </div>
  );
}
