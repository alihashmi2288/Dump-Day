import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateEmail, submitWaitlistEmail } from './validation';
import { resolveAppConfig } from './config';
import {
  DEMO_SEQUENCE,
  getInitialDemoPhase,
  isConfirmationVisible,
  isGymBlockVisible,
} from './demo-machine';
import { getAvailableScreens } from './screens';

test('validateEmail accepts valid emails and normalizes case/whitespace', () => {
  const result = validateEmail('  Alex.Rivera@Example.COM ');
  assert.equal(result.valid, true);
  assert.equal(result.normalized, 'alex.rivera@example.com');
  assert.equal(result.error, undefined);
});

test('validateEmail rejects empty or malformed email strings', () => {
  for (const bad of ['', '   ', 'not-an-email', 'user@', '@domain.com', 'a@b.c']) {
    const result = validateEmail(bad);
    assert.equal(result.valid, false, `Expected "${bad}" to be invalid`);
    assert.ok(result.error);
  }
});

test('submitWaitlistEmail handles invalid email, missing endpoint, network error, and success', async () => {
  const invalid = await submitWaitlistEmail('bad', 'https://formspree.io/f/test');
  assert.deepEqual(invalid, { ok: false, reason: 'invalid' });

  const missing = await submitWaitlistEmail('hello@example.com', '');
  assert.deepEqual(missing, { ok: false, reason: 'missing_endpoint' });

  let capturedBody = '';
  const successFetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    capturedBody = String(init?.body ?? '');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;

  const ok = await submitWaitlistEmail(
    'Calm.User@Example.org',
    'https://formspree.io/f/abc',
    successFetch
  );
  assert.deepEqual(ok, { ok: true });
  assert.equal(capturedBody, JSON.stringify({ email: 'calm.user@example.org' }));

  const failFetch = (async () =>
    new Response('server error', { status: 500 })) as typeof fetch;
  const failed = await submitWaitlistEmail(
    'user@example.org',
    'https://formspree.io/f/abc',
    failFetch
  );
  assert.deepEqual(failed, { ok: false, reason: 'network' });
});

test('resolveAppConfig handles empty Play Store URL and normalizes site URL', () => {
  const waitlistMode = resolveAppConfig({
    NEXT_PUBLIC_SITE_URL: 'https://dumpandday.app/',
    NEXT_PUBLIC_PLAY_STORE_URL: '',
    NEXT_PUBLIC_WAITLIST_ENDPOINT: 'https://formspree.io/f/xyz',
    NEXT_PUBLIC_CONTACT_EMAIL: 'hi@dumpandday.app',
  });
  assert.equal(waitlistMode.playStoreUrl, '');
  assert.equal(waitlistMode.siteUrl, 'https://dumpandday.app');
  assert.equal(waitlistMode.contactEmail, 'hi@dumpandday.app');

  const launchMode = resolveAppConfig({
    NEXT_PUBLIC_PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=app.dumpday',
  });
  assert.equal(
    launchMode.playStoreUrl,
    'https://play.google.com/store/apps/details?id=app.dumpday'
  );
  assert.equal(launchMode.contactEmail, 'hello@dumpandday.app');
});

test('demo state machine progresses cleanly within 6 seconds and respects reduced motion', () => {
  assert.equal(getInitialDemoPhase(false), 'idle');
  assert.equal(getInitialDemoPhase(true), 'confirmed');
  assert.equal(isGymBlockVisible('idle'), false);
  assert.equal(isGymBlockVisible('listening'), false);
  assert.equal(isGymBlockVisible('sorting'), false);
  assert.equal(isGymBlockVisible('confirmed'), true);
  assert.equal(isConfirmationVisible('confirmed'), true);

  assert.equal(DEMO_SEQUENCE.length, 4);
  assert.equal(DEMO_SEQUENCE[DEMO_SEQUENCE.length - 1].phase, 'confirmed');
  assert.ok(DEMO_SEQUENCE[DEMO_SEQUENCE.length - 1].delayMs <= 6000);
});

test('getAvailableScreens detects real PNG screenshots when present in public/screens', () => {
  const tempPublic = fs.mkdtempSync(path.join(os.tmpdir(), 'dumpday-screens-'));
  try {
    assert.deepEqual(getAvailableScreens(tempPublic), {
      today: false,
      ideas: false,
      timer: false,
    });

    const screensDir = path.join(tempPublic, 'screens');
    fs.mkdirSync(screensDir, { recursive: true });
    fs.writeFileSync(path.join(screensDir, 'today.png'), 'stub');
    fs.writeFileSync(path.join(screensDir, 'timer.png'), 'stub');

    assert.deepEqual(getAvailableScreens(tempPublic), {
      today: true,
      ideas: false,
      timer: true,
    });
  } finally {
    fs.rmSync(tempPublic, { recursive: true, force: true });
  }
});
