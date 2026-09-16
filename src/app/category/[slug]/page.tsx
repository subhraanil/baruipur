import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { CATEGORIES } from '@/lib/constants';
import NewsCard from '@/components/NewsCard';
import BaruipurUtilities from '@/components/BaruipurUtilities';
import { ChevronRight, Newspaper, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(c => ({
    slug: c.slug
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORIES.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'বিভাগ পাওয়া যায়নি | বারুইপুর অনলাইন'
    };
  }

  const canonicalUrl = `https://baruipur.online/category/${category.slug}/`;
  const title = `${category.nameBn} - বারুইপুর Baruipur`;
  const description = `বারুইপুর মহকুমার ${category.nameBn} সম্পর্কিত সমস্ত সাম্প্রতিক খবর, নাগরিক আপডেট ও সামাজিক মাধ্যমে প্রকাশিত নির্ভরযোগ্য প্রতিবেদন।`;

  return {
    title,
    description,
    keywords: [
      category.nameBn,
      category.nameEn,
      'Baruipur news',
      'বারুইপুর খবর',
      'বারুইপুর আপডেট',
      'দক্ষিণ ২৪ পরগনা'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'বারুইপুর Baruipur',
      locale: 'bn_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'news_keywords': `${category.nameBn}, Baruipur news, বারুইপুর খবর, দক্ষিণ ২৪ পরগনা`
    }
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const articles = db.getArticles({
    category: category.id,
    status: 'published'
  });

  const sidebarArticles = db.getArticles({
    status: 'published',
    limit: 6
  }).filter(a => !articles.some(x => x.id === a.id));

  const canonicalUrl = `https://baruipur.online/category/${category.slug}/`;

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.nameBn} - বারুইপুর Baruipur`,
    description: `বারুইপুর মহকুমার ${category.nameBn} সম্পর্কিত সাম্প্রতিক খবর ও নাগরিক আপডেট।`,
    url: canonicalUrl,
    inLanguage: 'bn',
    isPartOf: {
      '@type': 'WebSite',
      name: 'বারুইপুর Baruipur',
      url: 'https://baruipur.online/'
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
        name: category.nameBn,
        item: canonicalUrl
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((art, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: art.title,
      url: `https://baruipur.online/${encodeURI(art.slug || art.id)}/`
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
        <a href="/" className="hover:text-red-600 font-medium">প্রচ্ছদ</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">{category.nameBn}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className={`${category.color} text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div>
          <span className="text-xs uppercase tracking-wider bg-white/25 px-2.5 py-0.5 rounded font-bold">
            বিভাগীয় সংবাদ
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2">
            {category.nameBn}
          </h1>
          <p className="text-sm text-white/90 mt-1 max-w-xl">
            বারুইপুর মহকুমার {category.nameBn} সম্পর্কিত সমস্ত সাম্প্রতিক খবর, আপডেট ও সামাজিক মাধ্যমে প্রকাশিত তথ্যের নির্ভরযোগ্য সংকলন।
          </p>
        </div>

        <span className="bg-white/20 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0">
          মোট {articles.length} টি খবর
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Stream (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {articles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium mb-3">এই বিভাগে এখনো কোনো খবর নেই।</p>
              <a 
                href="/" 
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                প্রচ্ছদে ফিরে যান
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map(art => (
                <NewsCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          )}

          <div className="pt-4">
            <a 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              প্রচ্ছদে ফিরে যান
            </a>
          </div>
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <BaruipurUtilities 
            recentPosts={sidebarArticles} 
            showCategories={true}
            showRecentPosts={true}
            showPlaces={true}
            showEmergency={true}
          />
        </aside>
      </div>
    </div>
  );
}
