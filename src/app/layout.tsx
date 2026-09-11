import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'বারুইপুর বার্তা - দক্ষিণ ২৪ পরগনার শীর্ষস্থানীয় আঞ্চলিক সংবাদ ও আপডেট',
  description: 'বারুইপুর পৌরসভা, মহকুমা হাসপাতাল, শিয়ালদহ দক্ষিণ রেলওয়ে, পুলিশ প্রশাসন ও স্থানীয় সমস্ত খবরের নির্ভরযোগ্য ঠিকানা।',
  keywords: 'Baruipur news, Baruipur Live, Baruipur Barta, South 24 Parganas news, বারুইপুর খবর, শিয়ালদহ লোকাল ট্রেন, বারুইপুর পৌরসভা',
  openGraph: {
    title: 'বারুইপুর বার্তা - ২৪x৭ তাজা খবর',
    description: 'বারুইপুরের সমস্ত সামাজিক যোগাযোগ মাধ্যম ও সংবাদের নির্ভরযোগ্য সংকলন।',
    locale: 'bn_IN',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
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
