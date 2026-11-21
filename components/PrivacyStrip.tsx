import Link from 'next/link';
import { UserCheck, Smartphone, AudioLines, ArrowRight } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';

function PrivacyIcon({
  name,
}: {
  name: 'user-check' | 'smartphone' | 'audio-lines';
}) {
  if (name === 'user-check') {
    return <UserCheck className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
  }
  if (name === 'smartphone') {
    return <Smartphone className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
  }
  return <AudioLines className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
}

export default function PrivacyStrip() {
  const { privacyStrip } = siteContent;

  return (
    <RevealSection
      ariaLabelledBy="privacy-strip-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="rounded-[var(--radius-card)] border border-divider bg-surface p-6 shadow-[var(--shadow-soft)] md:p-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2
              id="privacy-strip-heading"
              className="text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
            >
              {privacyStrip.title}
            </h2>

            <Link
              href={privacyStrip.linkHref}
              className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full text-[16px] font-semibold text-primary transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span>{privacyStrip.linkLabel}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-6 border-t border-divider pt-8 md:grid-cols-3 md:gap-8">
            {privacyStrip.points.map((point) => (
              <li key={point.text} className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg">
                  <PrivacyIcon name={point.icon} />
                </span>
                <p className="text-[16px] leading-[1.5] text-ink md:text-[17px]">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RevealSection>
  );
}
