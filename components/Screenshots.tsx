import Image from 'next/image';
import PhoneMock from '@/components/PhoneMock';
import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';
import type { ScreenAvailability } from '@/lib/screens';

interface ScreenshotsProps {
  availableScreens: ScreenAvailability;
}

export default function Screenshots({ availableScreens }: ScreenshotsProps) {
  const { screenshots } = siteContent;

  return (
    <RevealSection
      ariaLabelledBy="screenshots-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2
          id="screenshots-heading"
          className="text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
        >
          {screenshots.title}
        </h2>

        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
          {screenshots.items.map((screen) => {
            const hasRealImage = availableScreens[screen.id];

            return (
              <figure
                key={screen.id}
                className="w-[82vw] max-w-[300px] shrink-0 snap-center md:w-full md:max-w-none"
              >
                {hasRealImage ? (
                  <div className="relative mx-auto aspect-[9/19] w-full max-w-[292px] overflow-hidden rounded-[var(--radius-phone)] border-[6px] border-phone-bezel bg-phone-screen shadow-[var(--shadow-phone)]">
                    <Image
                      src={`/screens/${screen.filename}`}
                      alt={screen.alt}
                      fill
                      sizes="(min-width: 768px) 292px, 82vw"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div role="img" aria-label={screen.alt}>
                    <PhoneMock
                      variant={screen.id}
                      showGymBlock={screen.id === 'today'}
                      compact
                    />
                  </div>
                )}

                <figcaption className="mt-5 text-center text-[16px] font-medium text-muted">
                  {screen.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
