import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { getAppConfig } from '@/lib/config';
import { siteContent } from '@/lib/content';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const config = getAppConfig();

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    url: '/',
    siteName: siteContent.appName,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#12141A' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: siteContent.appName,
    description: siteContent.seo.description,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Android',
    url: config.siteUrl,
    ...(config.playStoreUrl ? { downloadUrl: config.playStoreUrl } : {}),
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
