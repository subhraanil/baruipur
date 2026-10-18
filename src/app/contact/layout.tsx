import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ ও সম্পাদকীয় দপ্তর (Contact Us) - বারুইপুর অনলাইন',
  description: 'বারুইপুর অনলাইন বার্তা বিভাগের সাথে সরাসরি যোগাযোগ করুন। সংবাদ ও তথ্য প্রেরণ, বিজ্ঞাপন ও প্রেস রিলিজ সংক্রান্ত যোগাযোগের ঠিকানা।',
  alternates: {
    canonical: 'https://baruipur.online/contact/',
  },
  openGraph: {
    title: 'যোগাযোগ ও বার্তা বিভাগ - বারুইপুর অনলাইন',
    description: 'সংবাদ ও তথ্য প্রেরণ, বিজ্ঞাপন ও প্রেস রিলিজ সংক্রান্ত যোগাযোগের তথ্য।',
    url: 'https://baruipur.online/contact/',
    siteName: 'বারুইপুর Baruipur',
    locale: 'bn_IN',
    type: 'website',
    images: [
      {
        url: 'https://baruipur.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'যোগাযোগ - বারুইপুর অনলাইন',
      }
    ]
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
