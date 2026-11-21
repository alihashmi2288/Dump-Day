import Link from 'next/link';
import Demo from '@/components/Demo';
import { siteContent } from '@/lib/content';

interface HeroProps {
  playStoreUrl: string;
}

export default function Hero({ playStoreUrl }: HeroProps) {
  const hasPlayStore = Boolean(playStoreUrl);
  const primaryLabel = hasPlayStore
    ? siteContent.hero.primaryPlayStore
    : siteContent.hero.primaryEarlyAccess;
  const primaryHref = hasPlayStore ? playStoreUrl : '#waitlist';

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip py-12 md:py-20"
    >
      {/* At most two very soft blurred blobs behind the hero (~12% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 -left-16 h-[340px] w-[340px] rounded-full bg-area-study opacity-[0.12] blur-3xl md:h-[460px] md:w-[460px]" />
        <div className="absolute top-20 -right-16 h-[320px] w-[320px] rounded-full bg-area-health opacity-[0.12] blur-3xl md:h-[440px] md:w-[440px]" />
      </div>

      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink text-balance"
          >
            {siteContent.hero.headline}
          </h1>

          <p className="mt-6 max-w-[540px] text-[16px] leading-[1.5] text-muted md:text-[18px]">
            {siteContent.hero.subtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {hasPlayStore ? (
              <a
                href={primaryHref}
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-7 py-3 text-[16px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {primaryLabel}
              </a>
            ) : (
              <a
                href={primaryHref}
                className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-7 py-3 text-[16px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {primaryLabel}
              </a>
            )}

            <Link
              href={`#${siteContent.steps.id}`}
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full px-1 py-2 text-[16px] font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 hover:text-primary sm:px-3"
            >
              {siteContent.hero.secondaryCta}
            </Link>
          </div>

          <p className="mt-5 text-[14px] font-medium text-muted">
            {siteContent.hero.platformNote}
          </p>
        </div>

        <div className="lg:col-span-5">
          <Demo />
        </div>
      </div>
    </section>
  );
}
