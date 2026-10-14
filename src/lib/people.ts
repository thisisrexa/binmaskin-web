export interface PersonCopy {
  name: string;
  org: string;
  title: string;
  role: string;
  note: string;
  place: string;
}

export interface Person {
  username: string;
  given: string;
  family: string;
  email: string;
  linkedin: string;
  website: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  telegram?: string;
  wallpaperBase?: string;
  en: PersonCopy;
  ar: PersonCopy;
}

export const PEOPLE: Person[] = [
  {
    username: 'hani',
    given: 'Hani',
    family: 'Mousavi',
    email: 'info@hani.solutions',
    linkedin: 'https://www.linkedin.com/in/hani-mousavi/',
    telegram: 'https://t.me/hanisolutions',
    website: 'https://hani.solutions',
    wallpaperBase: '/cards/hani-wallpaper',
    en: {
      name: 'Hani',
      org: 'BinMaskin Solutions',
      title: 'Co-Founder',
      role: 'Co-Founder, BinMaskin Solutions',
      note: 'Independent digital and building businesses in the United Arab Emirates.',
      place: 'Dubai, UAE',
    },
    ar: {
      name: 'هاني',
      org: 'بن مسكين للحلول',
      title: 'شريك مؤسس',
      role: 'الشريك المؤسس، بن مسكين للحلول',
      note: 'شركات مستقلة في المجالات الرقمية والإنشائية في الإمارات العربية المتحدة.',
      place: 'دبي، الإمارات',
    },
  },
  {
    username: 'salem',
    given: 'Salem',
    family: 'Bin Meskin',
    email: 'salem@binmaskin.solutions',
    phone: '+971507888193',
    linkedin: 'https://ae.linkedin.com/in/salem-bin-meskin-9a5642277',
    whatsapp: 'https://wa.me/971507888193',
    instagram: 'https://www.instagram.com/binmaskin.solutions/',
    website: 'https://binmaskin.solutions',
    wallpaperBase: '/cards/salem-wallpaper',
    en: {
      name: 'Salem',
      org: 'BinMaskin Solutions',
      title: 'Co-Founder',
      role: 'Co-Founder, BinMaskin Solutions',
      note: 'Building independent digital and construction businesses in the United Arab Emirates.',
      place: 'Dubai, UAE',
    },
    ar: {
      name: 'سالم',
      org: 'بن مسكين للحلول',
      title: 'شريك مؤسس',
      role: 'شريك مؤسس، بن مسكين للحلول',
      note: 'نطوّر أعمالاً مستقلة في القطاع الرقمي وقطاع البناء في دولة الإمارات العربية المتحدة.',
      place: 'دبي، الإمارات العربية المتحدة',
    },
  },
];

export function getPerson(username: string) {
  return PEOPLE.find((person) => person.username === username) ?? null;
}

export function personText(person: Person, locale: string) {
  return locale === 'ar' ? person.ar : person.en;
}
