import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'নাগরিক সংবাদ জমা দিন (Submit Local News) - বারুইপুর অনলাইন',
  description: 'বারুইপুর মহকুমার নাগরিক সাংবাদিকতায় যুক্ত হোন। আপনার এলাকার গুরুত্বপূর্ণ ঘটনা, সমস্যা বা সাফল্যের খবর আমাদের কাছে সরাসরি পাঠান।',
  alternates: {
    canonical: 'https://baruipur.online/submit-news/',
  },
  openGraph: {
    title: 'নাগরিক সংবাদ জমা দিন - বারুইপুর অনলাইন',
    description: 'আপনার এলাকার যেকোনো খবর বা সমস্যা সরাসরি আমাদের বার্তা বিভাগে পাঠান।',
    url: 'https://baruipur.online/submit-news/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'নাগরিক সংবাদ জমা দিন - বারুইপুর অনলাইন',
      }
    ]
  }
};

export default function SubmitNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
