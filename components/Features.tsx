import { Mic, Lightbulb, Timer, Feather } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteContent, type LifeArea } from '@/lib/content';

const areaTileClasses: Record<LifeArea, { bg: string; dot: string }> = {
  study: { bg: 'bg-area-study-soft', dot: 'text-ink' },
  personal: { bg: 'bg-area-personal-soft', dot: 'text-ink' },
  work: { bg: 'bg-area-work-soft', dot: 'text-ink' },
  health: { bg: 'bg-area-health-soft', dot: 'text-ink' },
};

function FeatureIcon({
  name,
}: {
  name: 'mic' | 'lightbulb' | 'timer' | 'feather';
}) {
  if (name === 'mic') {
    return <Mic className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />;
  }
  if (name === 'lightbulb') {
    return <Lightbulb className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />;
  }
  if (name === 'timer') {
    return <Timer className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />;
  }
  return <Feather className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />;
}

export default function Features() {
  const { features } = siteContent;

  return (
    <RevealSection
      ariaLabelledBy="features-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2
          id="features-heading"
          className="max-w-[680px] text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
        >
          {features.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {features.items.map((item) => {
            const tile = areaTileClasses[item.area];
            return (
              <article
                key={item.id}
                className="rounded-[var(--radius-card)] border border-divider bg-surface p-6 shadow-[var(--shadow-soft)] md:p-8"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-[14px] ${tile.bg} ${tile.dot}`}
                >
                  <FeatureIcon name={item.icon} />
                </div>

                <h3 className="mt-5 text-[20px] font-semibold leading-[1.3] text-ink md:text-[22px]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[16px] leading-[1.5] text-muted md:text-[18px]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
