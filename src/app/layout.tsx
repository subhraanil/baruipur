import type { Metadata } from 'next';
import { Noto_Sans_Bengali, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import TrackingHead from '@/components/TrackingHead';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://baruipur.online'),
  title: {
    default: 'বারুইপুর অনলাইন | নাগরিক তথ্যকোষ, স্বাস্থ্য, স্থান, সরকারি নোটিস ও ই-টেন্ডার ডিরেক্টরি',
    template: '%s | বারুইপুর অনলাইন',
  },
  description:
    'বারুইপুর মহকুমা ও পৌরসভার যাচাইকৃত নাগরিক ডিরেক্টরি: হাসপাতাল ও বিশেষজ্ঞ ডাক্তার, দর্শনীয় স্থান, ক্লাব ও সংগঠন, সরকারি নোটিস, ই-টেন্ডার এবং লোকাল ট্রেনের সময়সূচি।',
  authors: [{ name: 'বারুইপুর অনলাইন তথ্যকোষ ডেস্ক', url: 'https://baruipur.online' }],
  creator: 'বারুইপুর অনলাইন',
  publisher: 'বারুইপুর অনলাইন',
  alternates: {
    canonical: 'https://baruipur.online/',
    types: {
      'application/rss+xml': 'https://baruipur.online/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'বারুইপুর অনলাইন — নাগরিক তথ্যকোষ ও পাবলিক ডিরেক্টরি',
    description:
      'বারুইপুরের হাসপাতাল, বিশেষজ্ঞ ডাক্তার, দর্শনীয় স্থান, ক্লাব, সরকারি নোটিস ও ই-টেন্ডারের নির্ভরযোগ্য নাগরিক ডিরেক্টরি।',
    url: 'https://baruipur.online/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন - নাগরিক তথ্যকোষ ও পাবলিক ডিরেক্টরি',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর অনলাইন — নাগরিক তথ্যকোষ ও পাবলিক ডিরেক্টরি',
    description:
      'বারুইপুরের হাসপাতাল, বিশেষজ্ঞ ডাক্তার, দর্শনীয় স্থান, সরকারি নোটিস ও ই-টেন্ডার ডিরেক্টরি।',
    images: ['https://baruipur.online/images/og-image.png'],
  },
  other: {
    'geo.region': 'IN-WB',
    'geo.placename': 'Baruipur',
    'geo.position': '22.3654;88.4325',
    ICBM: '22.3654, 88.4325',
    'google-adsense-account': 'ca-pub-4871015401102715',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'বারুইপুর অনলাইন',
    alternateName: ['Baruipur Online', 'Baruipur Civic Directory'],
    url: 'https://baruipur.online/',
    description:
      'বারুইপুর মহকুমা ও পৌরসভার নাগরিক তথ্যকোষ: স্বাস্থ্য ও ডাক্তার ডিরেক্টরি, দর্শনীয় স্থান, সংগঠন, সরকারি নোটিস ও ই-টেন্ডার।',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://baruipur.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const civicOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'বারুইপুর অনলাইন (Baruipur Online)',
    url: 'https://baruipur.online/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '700144',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Baruipur' },
      { '@type': 'AdministrativeArea', name: 'South 24 Parganas' },
    ],
  };

  return (
    <html lang="bn" className={`${notoSansBengali.variable} ${inter.variable}`}>
      <head>
        <TrackingHead />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(civicOrgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#202938] pb-20 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#142B4A] focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-lg"
        >
          মূল বিষয়বস্তুতে যান
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
