import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { CookieConsent } from '@/components/layout/cookie-consent';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { routing } from '@/i18n/routing';
import { fontClassName } from '@/lib/fonts';
import { jsonLd, jsonLdScript, pageMetadata } from '@/lib/seo';

import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    titleTemplate: t('titleTemplate'),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'meta' });
  const consent = (await cookies()).get('bm-consent')?.value;
  const showConsent = consent !== 'all' && consent !== 'essential';

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      data-scroll-behavior="smooth"
      className={fontClassName}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(jsonLd(locale, t('description'))),
          }}
        />
        <NextIntlClientProvider>
          <SiteHeader />
          <div className="pt-(--hdr)">{children}</div>
          <SiteFooter />
          <CookieConsent initialOpen={showConsent} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
