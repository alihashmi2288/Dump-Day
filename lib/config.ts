export interface AppConfig {
  appName: string;
  playStoreUrl: string;
  waitlistEndpoint: string;
  contactEmail: string;
  siteUrl: string;
}

export function resolveAppConfig(env: Record<string, string | undefined>): AppConfig {
  const rawSiteUrl =
    env.NEXT_PUBLIC_SITE_URL?.trim() ||
    env.APP_URL?.trim() ||
    'https://dumpandday.app';

  const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '');

  return {
    appName: 'Dump & Day',
    playStoreUrl: env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() || '',
    waitlistEndpoint: env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim() || '',
    contactEmail: env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@dumpandday.app',
    siteUrl: normalizedSiteUrl,
  };
}

export function getAppConfig(): AppConfig {
  return resolveAppConfig({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL,
    NEXT_PUBLIC_WAITLIST_ENDPOINT: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  });
}
