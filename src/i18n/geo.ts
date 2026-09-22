import { routing } from './routing';

type Locale = (typeof routing.locales)[number];

/** ISO 3166-1 alpha-2 where Arabic is an official language. */
const ARABIC_COUNTRIES = new Set([
  'AE',
  'BH',
  'DJ',
  'DZ',
  'EG',
  'EH',
  'IQ',
  'JO',
  'KM',
  'KW',
  'LB',
  'LY',
  'MA',
  'MR',
  'OM',
  'PS',
  'QA',
  'SA',
  'SD',
  'SO',
  'SY',
  'TN',
  'YE',
]);

const UNKNOWN_COUNTRY = new Set(['T1', 'XX']);

/** Cloudflare `CF-IPCountry`. Missing / `XX` / `T1` → `en`. */
export function localeFromCountry(country: string | null): Locale {
  if (!country) return routing.defaultLocale;
  const code = country.toUpperCase();
  if (UNKNOWN_COUNTRY.has(code)) return routing.defaultLocale;
  return ARABIC_COUNTRIES.has(code) ? 'ar' : routing.defaultLocale;
}
