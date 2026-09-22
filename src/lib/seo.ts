import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import { COMPANY } from '@/lib/company';

export const SITE = (
  process.env.NEXT_PUBLIC_APP_URL ?? COMPANY.website
).replace(/\/$/, '');

const ICONS: Metadata['icons'] = {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  apple: '/apple-touch-icon.png',
};

export function localePath(locale: string, path = '') {
  const suffix =
    !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function hreflang(path = '') {
  const suffix =
    !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return {
    en: localePath('en', suffix),
    ar: localePath('ar', suffix),
    'x-default': localePath(routing.defaultLocale, suffix),
  };
}

export function pageMetadata({
  locale,
  path = '',
  title,
  description,
  titleTemplate,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  titleTemplate?: string;
}): Metadata {
  const url = localePath(locale, path);
  const ogLocale = locale === 'ar' ? 'ar_AE' : 'en_AE';

  return {
    metadataBase: new URL(SITE),
    title: titleTemplate ? { default: title, template: titleTemplate } : title,
    description,
    applicationName: COMPANY.name,
    authors: [{ name: COMPANY.legalEn, url: SITE }],
    creator: COMPANY.legalEn,
    publisher: COMPANY.legalEn,
    alternates: {
      canonical: url,
      languages: hreflang(path),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      alternateLocale: [locale === 'ar' ? 'en_AE' : 'ar_AE'],
      url,
      siteName: COMPANY.name,
      title,
      description,
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
    icons: ICONS,
    manifest: '/site.webmanifest',
    robots: { index: false, follow: false, nocache: true },
  };
}

export function jsonLd(locale: string, description: string) {
  const orgId = `${SITE}/#org`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
        name: locale === 'ar' ? COMPANY.legalAr : COMPANY.legalEn,
        alternateName: COMPANY.name,
        url: SITE,
        logo: `${SITE}/brand/symbol.svg`,
        image: `${SITE}/og.png`,
        email: COMPANY.email,
        telephone: COMPANY.phoneTel,
        description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        openingHours: 'Su-Th 09:00-18:00',
        identifier: [
          {
            '@type': 'PropertyValue',
            name: 'Trade licence',
            value: COMPANY.licence,
          },
          {
            '@type': 'PropertyValue',
            name: 'Dubai Chamber',
            value: COMPANY.chamber,
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: COMPANY.name,
        description,
        inLanguage: [...routing.locales],
        publisher: { '@id': orgId },
      },
    ],
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
