export interface VCardInput {
  given: string;
  family: string;
  fn?: string;
  org: string;
  title: string;
  email: string;
  url: string;
  linkedin: string;
  phone?: string;
}

function esc(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function toVCard(person: VCardInput) {
  const fn = person.fn ?? `${person.given} ${person.family}`;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(fn)}`,
    `N:${esc(person.family)};${esc(person.given)};;;`,
    `ORG:${esc(person.org)}`,
    `TITLE:${esc(person.title)}`,
    `EMAIL;TYPE=INTERNET:${esc(person.email)}`,
    ...(person.phone ? [`TEL;TYPE=CELL:${esc(person.phone)}`] : []),
    `URL:${esc(person.url)}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${esc(person.linkedin)}`,
    'END:VCARD',
  ].join('\r\n');
}

const check = toVCard({
  given: 'Salem',
  family: 'Bin Meskin',
  org: 'BinMaskin Solutions',
  title: 'Co-Founder',
  email: 'salem@binmaskin.solutions',
  phone: '+971507888193',
  url: 'https://binmaskin.solutions',
  linkedin: 'https://ae.linkedin.com/in/salem-bin-meskin-9a5642277',
});

if (
  !check.includes('FN:Salem Bin Meskin') ||
  !check.includes('salem@binmaskin.solutions') ||
  !check.includes('TEL;TYPE=CELL:+971507888193')
) {
  throw new Error('vcard broke');
}
