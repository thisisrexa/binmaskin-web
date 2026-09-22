export { cn } from 'cn';

export function formatDate(iso: string, locale: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(+date)) return iso;
  return new Intl.DateTimeFormat(locale.startsWith('ar') ? 'ar' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'UTC',
  }).format(date);
}

const dateCheck = formatDate('2026-06-18', 'en');

if (
  !dateCheck.includes('18') ||
  !dateCheck.includes('2026') ||
  !/jun/i.test(dateCheck)
) {
  throw new Error('formatDate broke');
}
