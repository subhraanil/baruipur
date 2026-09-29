import Script from 'next/script';

/**
 * Common Tracking & Analytics Head Component
 * Central place for all website tracking scripts, tags, and measurement codes.
 * Included across the entire website via RootLayout (src/app/layout.tsx).
 */
export default function TrackingHead() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-B1VQNH8TG8"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B1VQNH8TG8');
          `,
        }}
      />
    </>
  );
}
