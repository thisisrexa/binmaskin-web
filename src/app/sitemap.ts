import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getPosts } from '@/lib/blog';
import { hreflang, localePath, SITE } from '@/lib/seo';

const STATIC_PATHS = [
  '/',
  '/about',
  '/blog',
  '/privacy',
  '/terms',
  '/cookies',
  '/security',
];

function languages(path: string) {
  return Object.fromEntries(
    Object.entries(hreflang(path)).map(([lang, href]) => [
      lang,
      `${SITE}${href}`,
    ]),
  );
}

function localized(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const alternates = { languages: languages(path) };
  return routing.locales.map((locale) => ({
    url: `${SITE}${localePath(locale, path)}`,
    ...(lastModified ? { lastModified } : {}),
    alternates,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts(routing.defaultLocale);

  return [
    ...STATIC_PATHS.flatMap((path) => localized(path)),
    ...posts.flatMap((post) =>
      localized(`/blog/${post.slug}`, post.date || undefined),
    ),
  ];
}
