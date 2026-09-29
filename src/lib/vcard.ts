export interface VCardInput {
  given: string;
  family: string;
  org: string;
  title: string;
  email: string;
  url: string;
  linkedin: string;
}

function esc(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function toVCard(person: VCardInput) {
  const fn = `${person.given} ${person.family}`;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(fn)}`,
    `N:${esc(person.family)};${esc(person.given)};;;`,
    `ORG:${esc(person.org)}`,
    `TITLE:${esc(person.title)}`,
    `EMAIL;TYPE=INTERNET:${esc(person.email)}`,
    `URL:${esc(person.url)}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${esc(person.linkedin)}`,
    'END:VCARD',
  ].join('\r\n');
}

const check = toVCard({
  given: 'Hani',
  family: 'Mousavi',
  org: 'BinMaskin Solutions',
  title: 'Co-Founder',
  email: 'info@hani.solutions',
  url: 'https://hani.solutions',
  linkedin: 'https://www.linkedin.com/in/hani-mousavi/',
});

if (
  !check.includes('FN:Hani Mousavi') ||
  !check.includes('info@hani.solutions')
) {
  throw new Error('vcard broke');
}
