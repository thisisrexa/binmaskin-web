import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getPosts } from '@/lib/blog';
import { COMPANIES } from '@/lib/companies';
import { localePath, SITE } from '@/lib/seo';

const STATIC_PATHS = [
  '/',
  '/about',
  '/blog',
  '/privacy',
  '/terms',
  '/cookies',
  '/security',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      urls.push({ url: `${SITE}${localePath(locale, path)}` });
    }

    for (const post of getPosts(locale)) {
      urls.push({
        url: `${SITE}${localePath(locale, `/blog/${post.slug}`)}`,
        lastModified: post.date || undefined,
      });
    }

    for (const company of COMPANIES) {
      urls.push({
        url: `${SITE}${localePath(locale, `/companies/${company.slug}`)}`,
      });
    }
  }

  return urls;
}
