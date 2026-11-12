import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'অ্যাডমিন ড্যাশবোর্ড | বারুইপুর অনলাইন',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
