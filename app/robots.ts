import type { MetadataRoute } from 'next';
import { getAppConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getAppConfig();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
