import { Mic, Layers, Calendar } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';

function StepIcon({ name }: { name: 'mic' | 'layers' | 'calendar' }) {
  if (name === 'mic') {
    return <Mic className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
  }
  if (name === 'layers') {
    return <Layers className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
  }
  return <Calendar className="h-5 w-5 text-primary" strokeWidth={1.9} aria-hidden="true" />;
}

export default function Steps() {
  const { steps } = siteContent;

  return (
    <RevealSection
      id={steps.id}
      ariaLabelledBy="steps-heading"
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2
          id="steps-heading"
          className="text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
        >
          {steps.title}
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-3 md:gap-8">
          {steps.items.map((item) => (
            <li
              key={item.number}
              className="rounded-[var(--radius-card)] border border-divider bg-surface p-6 shadow-[var(--shadow-soft)] md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg text-[15px] font-semibold text-primary tabular-nums">
                  {item.number}
                </span>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg">
                  <StepIcon name={item.icon} />
                </div>
              </div>

              <h3 className="mt-6 text-[20px] font-semibold leading-[1.3] text-ink">
                {item.title}
              </h3>

              <p className="mt-3 text-[16px] leading-[1.5] text-muted md:text-[18px]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
