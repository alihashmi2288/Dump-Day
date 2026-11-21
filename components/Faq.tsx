'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { faq } = siteContent;

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <RevealSection
      ariaLabelledBy="faq-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="mx-auto max-w-[760px]">
          <h2
            id="faq-heading"
            className="text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-balance"
          >
            {faq.title}
          </h2>

          <div className="mt-8 divide-y divide-divider rounded-[var(--radius-card)] border border-divider bg-surface shadow-[var(--shadow-soft)] md:mt-10">
            {faq.items.map((item) => {
              const isOpen = openId === item.id;
              const buttonId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div key={item.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-semibold leading-[1.4] text-ink transition-colors duration-150 hover:text-primary md:px-8 md:text-[18px]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-6 pb-6 pt-0 text-[16px] leading-[1.55] text-muted md:px-8 md:text-[18px]"
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
