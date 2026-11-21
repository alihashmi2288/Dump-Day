'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteContent } from '@/lib/content';
import { submitWaitlistEmail } from '@/lib/validation';

interface WaitlistProps {
  endpoint: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'invalid' | 'error';

export default function Waitlist({ endpoint }: WaitlistProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { waitlist } = siteContent;

  const attemptSubmit = async (value: string) => {
    setStatus('sending');
    setErrorMessage('');

    const result = await submitWaitlistEmail(value, endpoint);

    if (result.ok) {
      setStatus('success');
      setEmail('');
      return;
    }

    if (result.reason === 'invalid') {
      setStatus('invalid');
      setErrorMessage(waitlist.invalidEmailMessage);
      return;
    }

    setStatus('error');
    setErrorMessage(
      result.reason === 'missing_endpoint'
        ? waitlist.missingEndpointMessage
        : waitlist.networkErrorMessage
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await attemptSubmit(email);
  };

  const handleRetry = async () => {
    await attemptSubmit(email);
  };

  return (
    <RevealSection
      id="waitlist"
      ariaLabelledBy="waitlist-heading"
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="mx-auto max-w-[680px] rounded-[var(--radius-card)] border border-divider bg-surface p-6 shadow-[var(--shadow-soft)] md:p-10">
          <h2
            id="waitlist-heading"
            className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink"
          >
            {waitlist.title}
          </h2>

          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 flex items-start gap-3 rounded-[16px] border border-success/50 bg-success-soft p-4 text-[16px] leading-[1.5] text-ink"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-success"
                strokeWidth={2}
                aria-hidden="true"
              />
              <p>{waitlist.successMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6"
              aria-describedby="waitlist-note"
            >
              <label
                htmlFor="waitlist-email"
                className="block text-[14px] font-medium text-muted"
              >
                {waitlist.emailLabel}
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === 'invalid' || status === 'error') {
                      setStatus('idle');
                      setErrorMessage('');
                    }
                  }}
                  placeholder={waitlist.emailPlaceholder}
                  disabled={status === 'sending'}
                  aria-invalid={status === 'invalid' || status === 'error'}
                  aria-describedby={
                    errorMessage ? 'waitlist-feedback' : 'waitlist-note'
                  }
                  className={`min-h-[48px] flex-1 rounded-full border bg-bg px-5 text-[16px] text-ink placeholder:text-muted/80 transition-colors duration-150 disabled:opacity-60 ${
                    status === 'invalid' || status === 'error'
                      ? 'border-coral'
                      : 'border-divider focus:border-primary'
                  }`}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-7 py-3 text-[16px] font-semibold text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                >
                  {status === 'sending'
                    ? waitlist.sendingButton
                    : waitlist.submitButton}
                </button>
              </div>

              {(status === 'invalid' || status === 'error') && errorMessage && (
                <div
                  id="waitlist-feedback"
                  role="alert"
                  className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-coral/60 bg-coral-soft px-4 py-3 text-[15px] leading-[1.5] text-ink"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{errorMessage}</span>
                  </div>

                  {status === 'error' && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full border border-coral/60 bg-surface px-3.5 py-1.5 text-[14px] font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <RotateCcw
                        className="h-3.5 w-3.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{waitlist.retryLabel}</span>
                    </button>
                  )}
                </div>
              )}
            </form>
          )}

          <p id="waitlist-note" className="mt-4 text-[14px] text-muted">
            {waitlist.note}
          </p>
        </div>
      </div>
    </RevealSection>
  );
}
