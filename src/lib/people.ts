export interface PersonCopy {
  role: string;
  note: string;
  place: string;
}

export interface Person {
  username: string;
  displayName: string;
  given: string;
  family: string;
  email: string;
  linkedin: string;
  telegram: string;
  website: string;
  org: string;
  title: string;
  wallpaperBase: string;
  en: PersonCopy;
  ar: PersonCopy;
}

export const PEOPLE: Person[] = [
  {
    username: 'hani',
    displayName: 'Hani',
    given: 'Hani',
    family: 'Mousavi',
    email: 'info@hani.solutions',
    linkedin: 'https://www.linkedin.com/in/hani-mousavi/',
    telegram: 'https://t.me/hanisolutions',
    website: 'https://hani.solutions',
    org: 'BinMaskin Solutions',
    title: 'Co-Founder',
    wallpaperBase: '/cards/hani-wallpaper',
    en: {
      role: 'Co-Founder, BinMaskin Solutions',
      note: 'Independent digital and building businesses in the United Arab Emirates.',
      place: 'Dubai, UAE',
    },
    ar: {
      role: 'الشريك المؤسس، BinMaskin Solutions',
      note: 'شركات مستقلة في المجالات الرقمية والإنشائية في الإمارات العربية المتحدة.',
      place: 'دبي، الإمارات',
    },
  },
];

export function getPerson(username: string) {
  return PEOPLE.find((person) => person.username === username) ?? null;
}

export function personText(person: Person, locale: string) {
  return locale === 'ar' ? person.ar : person.en;
}
