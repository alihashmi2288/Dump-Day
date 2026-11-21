export interface EmailValidationResult {
  valid: boolean;
  normalized: string;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(raw: string): EmailValidationResult {
  const normalized = raw.trim().toLowerCase();
  if (!normalized || !EMAIL_PATTERN.test(normalized)) {
    return {
      valid: false,
      normalized,
      error: 'Please enter a valid email address.',
    };
  }
  return { valid: true, normalized };
}

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'missing_endpoint' | 'network' };

export async function submitWaitlistEmail(
  rawEmail: string,
  endpoint: string,
  fetchImpl: typeof fetch = fetch
): Promise<WaitlistSubmitResult> {
  const check = validateEmail(rawEmail);
  if (!check.valid) {
    return { ok: false, reason: 'invalid' };
  }

  const trimmedEndpoint = endpoint.trim();
  if (!trimmedEndpoint) {
    return { ok: false, reason: 'missing_endpoint' };
  }

  try {
    const response = await fetchImpl(trimmedEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: check.normalized }),
    });

    if (!response.ok) {
      return { ok: false, reason: 'network' };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
