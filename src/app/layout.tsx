import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://baruipur.online'),
  title: {
    default: 'বারুইপুর Baruipur - দক্ষিণ ২৪ পরগনার শীর্ষস্থানীয় আঞ্চলিক সংবাদ ও আপডেট',
    template: '%s | বারুইপুর Baruipur'
  },
  description: 'বারুইপুর মহকুমা, পৌরসভা, হাসপাতাল, শিয়ালদহ দক্ষিণ রেলওয়ে, পুলিশ প্রশাসন ও স্থানীয় সমস্ত খবরের নির্ভরযোগ্য ডিজিটাল ঠিকানা।',
  keywords: [
    'Baruipur', 'Baruipur news', 'Baruipur update', 'Baruipur live', 'Baruipur municipality',
    'বারুইপুর', 'বারুইপুর খবর', 'বারুইপুর লাইভ', 'বারুইপুর আপডেট', 'দক্ষিণ ২৪ পরগনা সংবাদ',
    'শিয়ালদহ লোকাল ট্রেন', 'বারুইপুর জংশন', 'বারুইপুর পুলিশ জেলা', 'বারুইপুর মহকুমা হাসপাতাল'
  ],
  authors: [{ name: 'বারুইপুর অনলাইন বার্তা ডেস্ক', url: 'https://baruipur.online' }],
  creator: 'বারুইপুর Baruipur',
  publisher: 'বারুইপুর Baruipur',
  alternates: {
    canonical: 'https://baruipur.online/',
    types: {
      'application/rss+xml': 'https://baruipur.online/feed.xml'
    }
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
  openGraph: {
    title: 'বারুইপুর Baruipur - ২৪x৭ তাজা আঞ্চলিক খবর ও আপডেট',
    description: 'বারুইপুর মহকুমা ও দক্ষিণ ২৪ পরগনার সামাজিক যোগাযোগ মাধ্যম ও সংবাদের নির্ভরযোগ্য সংকলন।',
    url: 'https://baruipur.online/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বারুইপুর Baruipur - ২৪x৭ তাজা খবর',
    description: 'বারুইপুর মহকুমা ও দক্ষিণ ২৪ পরগনার নির্ভরযোগ্য আঞ্চলিক সংবাদ পোর্টাল।',
  },
  other: {
    'geo.region': 'IN-WB',
    'geo.placename': 'Baruipur',
    'geo.position': '22.3654;88.4325',
    'ICBM': '22.3654, 88.4325',
    'news_keywords': 'Baruipur, Baruipur news, Baruipur update, বারুইপুর, বারুইপুর খবর, দক্ষিণ ২৪ পরগনা'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'বারুইপুর Baruipur',
    alternateName: ['বারুইপুর অনলাইন', 'Baruipur Online', 'Baruipur News', 'বারুইপুর খবর'],
    url: 'https://baruipur.online/',
    description: 'বারুইপুর মহকুমা, পৌরসভা, শিয়ালদহ দক্ষিণ রেলওয়ে ও দক্ষিণ ২৪ পরগনা অঞ্চলের নির্ভরযোগ্য ডিজিটাল সংবাদ ও সামাজিক তথ্যবাতায়ন।',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '743302',
      addressCountry: 'IN'
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Baruipur'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'South 24 Parganas'
      }
    ],
    knowsAbout: [
      'Baruipur',
      'Baruipur news',
      'Baruipur Municipality',
      'Baruipur Police District',
      'Sealdah South Local Trains',
      'বারুইপুর',
      'বারুইপুর খবর',
      'দক্ষিণ ২৪ পরগনা'
    ],
    sameAs: [
      'https://en.wikipedia.org/wiki/Baruipur'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'বারুইপুর অনলাইন - Baruipur Online',
    alternateName: 'Baruipur News',
    url: 'https://baruipur.online/',
    inLanguage: 'bn'
  };

  return (
    <html lang="bn">
      <head>
        <link rel="alternate" type="application/rss+xml" title="বারুইপুর অনলাইন RSS Feed" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 font-bengali">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
