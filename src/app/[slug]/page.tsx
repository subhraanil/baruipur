import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatBengaliDate, formatTimeAgoBengali } from '@/lib/dateUtils';
import { getSafeImageUrl } from '@/lib/videoUtils';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { 
  Clock, 
  Eye, 
  ExternalLink, 
  ChevronRight, 
  Flame, 
  Play,
  ShieldCheck,
  BookOpen,
  MapPin,
  Building,
  HeartPulse,
  UtensilsCrossed,
  Train
} from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import SocialShareBar from '@/components/SocialShareBar';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getAuthorById, getAuthorForCategory } from '@/lib/authors';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = db.getArticles({ status: 'published' });
  const params: { slug: string }[] = [];
  const seen = new Set<string>();

  articles.forEach(a => {
    if (a.slug && !seen.has(a.slug)) {
      params.push({ slug: a.slug });
      seen.add(a.slug);
    }
    if (a.id && !seen.has(a.id)) {
      params.push({ slug: a.id });
      seen.add(a.id);
    }
    if (a.aliases && Array.isArray(a.aliases)) {
      a.aliases.forEach(al => {
        if (al && !seen.has(al)) {
          params.push({ slug: al });
          seen.add(al);
        }
      });
    }
  });

  return params;
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
  
  let cleanDesc = (article.summary || article.content.slice(0, 180)).replace(/[\r\n]+/g, ' ').replace(/["']/g, '').trim();
  if (cleanDesc.length > 152) {
    const trimmed = cleanDesc.slice(0, 148);
    const lastSpace = trimmed.lastIndexOf(' ');
    cleanDesc = (lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed) + '...';
  }

  const safeImage = getSafeImageUrl(article.imageUrl);
  const imageUrl = safeImage.startsWith('http') ? safeImage : `https://baruipur.online${safeImage}`;
  const cleanTitle = article.title.replace(/["']/g, '').trim();
  const safeAltText = cleanTitle.length > 78 ? (cleanTitle.slice(0, 75) + '...') : cleanTitle;

  const pageTitle = article.title.replace(/["']/g, '').trim();
  const titleDisplay = pageTitle.length > 50 
    ? `${pageTitle.slice(0, 47)}... | বারুইপুর` 
    : `${pageTitle} | বারুইপুর`;

  return {
    title: { absolute: titleDisplay },
    description: cleanDesc,
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
    robots: (article.content || '').split(/\s+/).length < 200 ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: article.title,
      description: cleanDesc,
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
          alt: safeAltText,
        },
      ],
      siteName: 'বারুইপুর Baruipur',
      locale: 'bn_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: cleanDesc,
      images: [imageUrl],
      site: '@BaruipurOnline',
      creator: '@BaruipurOnline'
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

  const relatedArticles = db.getArticles({
    category: article.category,
    limit: 5
  }).filter(a => a.id !== article.id);

  const moreArticles = db.getArticles({
    limit: 7
  }).filter(a => a.id !== article.id);

  const postSlug = article.slug || article.id;
  const canonicalUrl = `https://baruipur.online/${encodeURI(postSlug)}/`;

  const safeImage = getSafeImageUrl(article.imageUrl);
  const imageUrl = safeImage.startsWith('http') ? safeImage : `https://baruipur.online${safeImage}`;
  const allImages = (article.images && article.images.length > 0)
    ? Array.from(new Set(article.images.map(img => {
        const s = getSafeImageUrl(img);
        return s.startsWith('http') ? s : `https://baruipur.online${s}`;
      })))
    : [imageUrl];

  const author = article.authorId 
    ? getAuthorById(article.authorId)
    : getAuthorForCategory(article.category);

  // Bengali Reading Time Calculation
  const wordCount = (article.content || '').split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));
  const bengaliNumerals: Record<string, string> = { '0':'০', '1':'১', '2':'২', '3':'৩', '4':'৪', '5':'৫', '6':'৬', '7':'৭', '8':'৮', '9':'৯' };
  const readTimeBn = String(readTimeMinutes).replace(/\d/g, d => bengaliNumerals[d] || d);
  const wordCountBn = String(wordCount).replace(/\d/g, d => bengaliNumerals[d] || d);

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
      '@type': 'Person',
      name: author.nameBn,
      jobTitle: author.roleBn,
      url: `https://baruipur.online/editorial-team/#${author.id}`,
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: 'বারুইপুর অনলাইন (Baruipur Online)',
        url: 'https://baruipur.online/'
      }
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'বারুইপুর Baruipur',
      url: 'https://baruipur.online/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://baruipur.online/images/logo.png'
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

      {/* Modern Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 overflow-x-auto whitespace-nowrap">
        <a href="/" className="hover:text-red-600 font-medium transition">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <a href={`/category/${article.category}`} className="hover:text-red-600 font-medium whitespace-nowrap transition">
          {article.categoryNameBn}
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Top Leaderboard Ad Space */}
      <AdSenseSlot format="leaderboard" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Article Body (9 cols) */}
        <article className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 lg:p-9 shadow-xs min-w-0">
          {/* Header Badges & Category */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <a 
              href={`/category/${article.category}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full transition shadow-xs inline-block"
              title={`${article.categoryNameBn} বিভাগের সমস্ত খবর দেখুন`}
            >
              {article.categoryNameBn}
            </a>
            {(article.videoUrl || article.videoEmbedUrl) && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
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
            <div className="ml-auto flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                <BookOpen className="w-3 h-3 text-slate-600" />
                {readTimeBn} মিনিট পড়া ({wordCountBn} শব্দ)
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.views + 1} বার পঠিত
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            {article.title}
          </h1>

          {/* Subheading / Summary */}
          {article.summary && (
            <p className="text-base sm:text-lg text-slate-700 font-medium border-l-4 border-red-600 pl-4 py-1.5 mb-6 bg-red-50/40 rounded-r-xl leading-relaxed">
              {article.summary}
            </p>
          )}

          {/* Meta & Byline Attribution Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5 border-y border-slate-150 mb-6 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href={`/editorial-team/#${author.id}`}
                className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-red-600 transition group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={author.avatar} 
                  alt={author.nameBn} 
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover border border-slate-300"
                />
                <span>প্রতিবেদন: {author.nameBn}</span>
                <span className="text-slate-400 font-normal">({author.roleBn})</span>
              </a>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">📍 {article.reportingLocation || author.location}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {article.isGuide ? (
                <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                  ✓ স্থায়ী নির্দেশিকা | যাচাই: {article.verifiedDate || 'অক্টোবর ২০২৬'}
                </span>
              ) : (
                <>
                  <span>{formatBengaliDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span className="text-slate-500">{formatTimeAgoBengali(article.publishedAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Featured Media: Embedded Video Player OR Featured Image */}
          {article.videoEmbedUrl || article.videoUrl ? (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black mb-6 shadow-sm border border-slate-200">
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
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 mb-6 shadow-xs border border-slate-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getSafeImageUrl(article.imageUrl)} 
                alt={article.title.replace(/["']/g, '').length > 78 ? (article.title.replace(/["']/g, '').slice(0, 75) + '...') : article.title.replace(/["']/g, '')}
                width={1200}
                height={675}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white text-xs opacity-90">
                ছবি: বারুইপুর অনলাইন বার্তা ডেস্ক ও ফিল্ড কভারেজ
              </div>
            </div>
          )}

          {/* Interactive Table of Contents */}
          <TableOfContents content={article.content} />

          {/* Social Share Bar Top */}
          <SocialShareBar url={canonicalUrl} title={article.title} />

          {/* Full Article Content with Enhanced Markdown Rendering */}
          <div className="max-w-none text-slate-800 text-base leading-relaxed font-normal">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Social Share Bar Bottom */}
          <SocialShareBar url={canonicalUrl} title={article.title} />

          {/* In-Article Bottom Ad Space */}
          <AdSenseSlot format="responsive" className="my-8" />

          {/* Author Profile & E-E-A-T Credibility Card */}
          <div className="my-8 p-6 bg-gradient-to-br from-slate-50 via-slate-100/60 to-red-50/20 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={author.avatar} 
              alt={author.nameBn} 
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-red-500 shadow-sm shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <a href={`/editorial-team/#${author.id}`} className="hover:text-red-600 transition">
                      {author.nameBn}
                    </a>
                    <span className="text-xs font-normal text-slate-500">({author.nameEn})</span>
                  </h3>
                  <p className="text-xs font-semibold text-red-600">{author.roleBn} • {author.beat}</p>
                </div>
                <a 
                  href={`/editorial-team/#${author.id}`}
                  className="text-xs font-bold text-slate-700 hover:text-red-600 hover:underline transition self-center sm:self-auto"
                >
                  সাংবাদিক প্রোফাইল ও সব খবর →
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {author.bioBn}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-2 border-t border-slate-200/80">
                <span>📍 কর্মক্ষেত্র: <strong className="text-slate-700">{author.location}</strong></span>
                <span>•</span>
                <span>✉️ ইমেল: <a href={`mailto:${author.email}`} className="text-slate-700 hover:text-red-600 font-medium">{author.email}</a></span>
              </div>
            </div>
          </div>

          {/* Multi-Image Photo Stream & Gallery */}
          {article.images && article.images.length > 1 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  প্রতিবেদনের ছবি সংকলন ({article.images.length}টি ছবি)
                </h2>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">গ্রাউন্ড কভারেজ সংকলন</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.images.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs aspect-[4/3] group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getSafeImageUrl(img)} 
                      alt={`${article.title.replace(/["']/g, '').length > 60 ? article.title.replace(/["']/g, '').slice(0, 57) + '...' : article.title.replace(/["']/g, '')} - ছবি ${idx + 1}`}
                      width={800}
                      height={600}
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

          {/* Editorial Source & Field Verification Box */}
          <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                তথ্যসূত্র ও সাংবাদিকতা নীতিমালা (Editorial Verification & Sourcing)
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {article.sourceCategory === 'official' ? 'সরকারি বিজ্ঞপ্তি ভিত্তিক' : 'ফিল্ড ভেরিফায়েড প্রতিবেদন'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div><strong>প্রতিবেদক:</strong> {author.nameBn} ({author.roleBn})</div>
              <div><strong>প্রকাশের তারিখ:</strong> {formatBengaliDate(article.publishedAt)}</div>
              <div><strong>তদন্ত ও সম্পাদনা:</strong> বারুইপুর সেন্ট্রাল নিউজডেস্ক</div>
              <div><strong>সম্পাদকীয় নীতি:</strong> <a href="/editorial-policy" className="text-red-600 hover:underline">নীতিমালা পড়ুন</a> | <a href="/corrections-policy" className="text-red-600 hover:underline">সংশোধনী নীতি</a></div>
            </div>
            {article.originalPostUrl && (
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-slate-500">
                <span>জনস্বার্থ বিজ্ঞপ্তি / সামাজিক মাধ্যম রেফারেন্স:</span>
                <a href={article.originalPostUrl} target="_blank" rel="noreferrer" className="text-red-600 font-semibold hover:underline flex items-center gap-0.5">
                  মূল নোটিশ ও সূত্র দেখুন <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Cross-Directory Discover Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
              বারুইপুরের অন্যান্য গুরুত্বপূর্ণ তথ্য ও নির্দেশিকা
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <a 
                href="/health-directory" 
                className="flex items-center gap-2 p-3 rounded-xl bg-red-50/70 border border-red-200/60 hover:bg-red-100/70 text-red-900 font-bold transition shadow-xs"
              >
                <HeartPulse className="w-4 h-4 text-red-600 shrink-0" />
                <span>স্বাস্থ্য ও ডাক্তার</span>
              </a>
              <a 
                href="/places" 
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 text-amber-900 font-bold transition shadow-xs"
              >
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>দর্শনীয় স্থান</span>
              </a>
              <a 
                href="/organizations" 
                className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 hover:bg-purple-100/70 text-purple-900 font-bold transition shadow-xs"
              >
                <Building className="w-4 h-4 text-purple-700 shrink-0" />
                <span>প্রতিষ্ঠান ও ক্লাব</span>
              </a>
              <a 
                href="/transport" 
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 hover:bg-blue-100/70 text-blue-900 font-bold transition shadow-xs"
              >
                <Train className="w-4 h-4 text-blue-700 shrink-0" />
                <span>পরিবহন ও ট্রেন</span>
              </a>
            </div>
          </div>

          {/* Bottom Navigation Back Button */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
            <a 
              href="/" 
              className="font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
            >
              ← সব খবরে ফিরে যান
            </a>
            <a 
              href={`/category/${article.category}`}
              className="font-bold text-slate-700 hover:text-red-600 hover:underline"
            >
              {article.categoryNameBn}-র আরও খবর →
            </a>
          </div>
        </article>

        {/* Right Sidebar (3 cols) */}
        <aside className="lg:col-span-3 space-y-6 min-w-0">
          {/* Sidebar Top Ad Space */}
          <AdSenseSlot format="sidebar" className="my-0" />

          {/* Related News with Images */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              <h2 className="font-bold text-base text-slate-900 border-b border-slate-150 pb-2.5 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                একই বিভাগের আরও খবর
              </h2>
              <div className="space-y-3.5">
                {relatedArticles.map(rel => {
                  const safeRelImg = getSafeImageUrl(rel.imageUrl);
                  return (
                    <a 
                      key={rel.id} 
                      href={`/${rel.slug || rel.id}`}
                      className="flex gap-3 group p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={safeRelImg} 
                        alt={rel.title} 
                        width={70} 
                        height={55}
                        className="w-16 h-14 rounded-lg object-cover shrink-0 bg-slate-100 border border-slate-200 group-hover:scale-102 transition"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 mb-0.5">{formatTimeAgoBengali(rel.publishedAt)}</p>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-600 leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </a>
                  );
                })}
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
