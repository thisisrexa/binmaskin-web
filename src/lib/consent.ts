export type Consent = 'all' | 'essential';

const NAME = 'bm-consent';

export function parseConsent(raw: string | undefined): Consent | null {
  return raw === 'all' || raw === 'essential' ? raw : null;
}

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const hit = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${NAME}=`));
  return parseConsent(hit?.slice(NAME.length + 1));
}

if (parseConsent('all') !== 'all' || parseConsent('no') !== null) {
  throw new Error('consent: parser broke');
}

export function writeConsent(value: Consent) {
  document.cookie = `${NAME}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

/** True only after Accept. Wire Google Analytics behind this. */
export function analyticsAllowed() {
  return readConsent() === 'all';
}
