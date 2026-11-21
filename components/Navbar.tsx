import Link from 'next/link';
import { siteContent } from '@/lib/content';

interface NavbarProps {
  playStoreUrl: string;
  isPrivacyPage?: boolean;
}

export default function Navbar({
  playStoreUrl,
  isPrivacyPage = false,
}: NavbarProps) {
  const hasPlayStore = Boolean(playStoreUrl);
  const ctaLabel = hasPlayStore
    ? siteContent.nav.ctaPlayStore
    : siteContent.nav.ctaEarlyAccess;
  const ctaHref = hasPlayStore
    ? playStoreUrl
    : isPrivacyPage
      ? '/#waitlist'
      : '#waitlist';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-primary"
      >
        {siteContent.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-40 border-b border-divider bg-nav-bg backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full py-1 text-[17px] font-semibold tracking-[-0.015em] text-ink"
          >
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 rounded-full bg-primary"
            />
            <span>{siteContent.appName}</span>
          </Link>

          <nav
            aria-label="Primary"
            className="flex items-center gap-6 md:gap-8"
          >
            <div className="hidden items-center gap-7 md:flex">
              {siteContent.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[15px] font-medium text-muted transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {hasPlayStore ? (
              <a
                href={ctaHref}
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2 text-[14px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5 md:px-5 md:text-[15px]"
              >
                {ctaLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2 text-[14px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5 md:px-5 md:text-[15px]"
              >
                {ctaLabel}
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
