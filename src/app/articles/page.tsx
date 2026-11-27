import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import PageHero from '@/components/PageHero';
import AdSlot from '@/components/AdSlot';
import ArticlesClient from './ArticlesClient';
import { toBengaliDigits } from '@/lib/formatters';

export const metadata: Metadata = {
  title: 'বারুইপুর আর্টিকেল ও ব্লগ | ইতিহাস, সংস্কৃতি, খাবার, ভ্রমণ ও নাগরিক গাইড',
  description:
    'বারুইপুরের ইতিহাস, ঐতিহ্য, খাবার ও রেস্তোরাঁ, শিক্ষা, বাজার, উৎসব এবং নাগরিক পরিষেবা নিয়ে লেখা সমস্ত প্রামাণ্য আর্টিকেল ও ব্লগ এক জায়গায়।',
  alternates: {
    canonical: 'https://baruipur.online/articles',
  },
  openGraph: {
    title: 'বারুইপুর আর্টিকেল ও ব্লগ | Baruipur Online',
    description:
      'বারুইপুরের নানা বিষয় নিয়ে লেখা প্রামাণ্য ব্লগ ও বিস্তারিত নাগরিক গাইডের সম্পূর্ণ সংকলন।',
    url: 'https://baruipur.online/articles',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
  },
};

export default function ArticlesPage() {
  const articles = db
    .getArticles()
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((a) => ({
      id: a.id,
      slug: a.slug || a.id,
      title: a.title,
      summary: a.summary,
      content: a.content,
      category: a.category,
      categoryNameBn: a.categoryNameBn,
      imageUrl: a.imageUrl,
      publishedAt: a.publishedAt,
      authorName: a.authorName,
      reportingLocation: a.reportingLocation,
    }));

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <PageHero
          breadcrumbLabel="আর্টিকেল ও ব্লগ"
          badgeText={`মোট ${toBengaliDigits(articles.length)}টি প্রামাণ্য লেখা`}
          title="বারুইপুর আর্টিকেল, ব্লগ ও নাগরিক গাইড"
          description="বারুইপুরের ইতিহাস, সংস্কৃতি, বাজার-বাণিজ্য, খাবার, শিক্ষাপ্রতিষ্ঠান, ভ্রমণ ও নাগরিক জীবন নিয়ে আমাদের নিজস্ব তৈরি সমস্ত বিশেষ লেখা ও ব্লগ এক জায়গায় পড়ুন।"
        />

        <ArticlesClient articles={articles} />

        <AdSlot variant="leaderboard" slotId="articles-bottom" className="mt-10" />
      </div>
    </div>
  );
}
