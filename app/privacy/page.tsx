import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAppConfig } from '@/lib/config';
import { siteContent } from '@/lib/content';

// TODO: Before public launch, review and verify every privacy statement below
// against the final shipped Dump & Day mobile app behavior and Google's current
// Gemini API data handling and retention terms.

export const metadata: Metadata = {
  title: siteContent.seo.privacyTitle,
  description: siteContent.seo.privacyDescription,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: siteContent.seo.privacyTitle,
    description: siteContent.seo.privacyDescription,
    url: '/privacy',
    siteName: siteContent.appName,
    type: 'website',
  },
};

export default function PrivacyPage() {
  const config = getAppConfig();
  const { privacyPage } = siteContent;

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Navbar playStoreUrl={config.playStoreUrl} isPrivacyPage />

      <main id="main-content" className="flex-1 py-12 md:py-20">
        <article className="mx-auto max-w-[720px] px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full text-[15px] font-medium text-muted transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            <span>{privacyPage.backLabel}</span>
          </Link>

          <header className="mt-6 border-b border-divider pb-8">
            <h1 className="text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
              {privacyPage.title}
            </h1>
            <p className="mt-4 text-[16px] leading-[1.6] text-muted md:text-[18px]">
              {privacyPage.intro}
            </p>
            <p className="mt-4 text-[14px] font-medium text-muted">
              {privacyPage.lastUpdatedLabel}: {privacyPage.lastUpdatedDate}
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {privacyPage.sections.map((section) => (
              <section key={section.heading} aria-labelledby={`privacy-${section.heading.toLowerCase().replace(/\s+/g, '-')}`}>
                <h2
                  id={`privacy-${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[22px] font-semibold leading-[1.3] text-ink md:text-[24px]"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[16px] leading-[1.6] text-muted md:text-[18px]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.heading === 'Contact' && (
                    <p>
                      <a
                        href={`mailto:${config.contactEmail}`}
                        className="font-semibold text-primary underline underline-offset-4 transition-colors duration-150 hover:text-ink"
                      >
                        {config.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer contactEmail={config.contactEmail} />
    </div>
  );
}
