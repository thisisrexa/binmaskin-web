import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { localeFromCountry } from './i18n/geo';
import { routing } from './i18n/routing';

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // next-intl has no geo hook; cookie + path prefix still win over this header.
  request.headers.set(
    'accept-language',
    localeFromCountry(request.headers.get('cf-ipcountry')),
  );
  return handleI18n(request);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
