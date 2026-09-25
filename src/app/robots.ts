import type { MetadataRoute } from 'next';

import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
