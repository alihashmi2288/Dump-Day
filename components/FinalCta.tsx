import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';

interface FinalCtaProps {
  playStoreUrl: string;
}

export default function FinalCta({ playStoreUrl }: FinalCtaProps) {
  const hasPlayStore = Boolean(playStoreUrl);
  const label = hasPlayStore
    ? siteContent.hero.primaryPlayStore
    : siteContent.hero.primaryEarlyAccess;
  const href = hasPlayStore ? playStoreUrl : '#waitlist';

  return (
    <RevealSection
      ariaLabelledBy="final-cta-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 text-center md:px-8">
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-[600px] text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
        >
          {siteContent.finalCta.title}
        </h2>

        <div className="mt-8 flex justify-center">
          {hasPlayStore ? (
            <a
              href={href}
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-8 py-3 text-[16px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              {label}
            </a>
          ) : (
            <a
              href={href}
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-8 py-3 text-[16px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              {label}
            </a>
          )}
        </div>
      </div>
    </RevealSection>
  );
}
