import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ ও বার্তা ডেস্ক (Contact Us) - বারুইপুর অনলাইন',
  description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর, বিজ্ঞাপনী যোগাযোগ, সংবাদ পরিবেশন ও সাধারণ অনুসন্ধানের ঠিকানা ও হেল্পলাইন।',
  alternates: {
    canonical: 'https://baruipur.online/contact/',
  },
  openGraph: {
    title: 'যোগাযোগ ও বার্তা ডেস্ক - বারুইপুর অনলাইন',
    description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর, বিজ্ঞাপনী যোগাযোগ ও সাধারণ অনুসন্ধানের ঠিকানা।',
    url: 'https://baruipur.online/contact/',
    siteName: 'বারুইপুর অনলাইন',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'বারুইপুর অনলাইন যোগাযোগ ও বার্তা ডেস্ক',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'যোগাযোগ ও বার্তা ডেস্ক | Baruipur Online',
    description: 'বারুইপুর অনলাইন সম্পাদকীয় দফতর ও যোগাযোগের অফিসিয়াল পোর্টাল।',
    images: ['https://baruipur.online/images/og-image.png'],
    site: '@BaruipurOnline'
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
