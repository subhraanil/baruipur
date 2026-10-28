import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সংবাদ বা নাগরিক সমস্যা পাঠান (Submit News) - বারুইপুর অনলাইন',
  description: 'আপনার এলাকার ঘটে যাওয়া গুরুত্বপূর্ণ খবর, নাগরিক সমস্যা বা ভিডিও সরাসরি বারুইপুর অনলাইন বার্তা ডেস্কে পাঠান।',
  alternates: {
    canonical: 'https://baruipur.online/submit-news/',
  },
  openGraph: {
    title: 'সংবাদ পাঠান - বারুইপুর অনলাইন বার্তা ডেস্ক',
    description: 'আপনার এলাকার সমস্যা বা ঘটনার বিবরণ সরাসরি সংবাদ ডেস্কে পৌঁছে দিন।',
    url: 'https://baruipur.online/submit-news/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন সংবাদ প্রেরণ পোর্টাল',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সংবাদ বা নাগরিক সমস্যা পাঠান | Baruipur Online',
    description: 'আপনার এলাকার সমস্যা বা ঘটনা সরাসরি বারুইপুর অনলাইন ডেস্কে পাঠান।',
    images: ['https://baruipur.online/images/og-image.png'],
    site: '@BaruipurOnline'
  }
};

export default function SubmitNewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
