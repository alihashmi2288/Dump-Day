import type { MetadataRoute } from 'next';
import { getAppConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getAppConfig();
  const lastModified = new Date('2026-11-19');

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
