import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locale as getLocaleParam } from 'next/root-params';

import ar from '../../messages/ar.json';
import en from '../../messages/en.json';
import { routing } from './routing';

const catalogs = { en, ar };

export default getRequestConfig(async ({ locale: override }) => {
  const locale = override ?? (await getLocaleParam());
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: catalogs[locale],
  };
});
