export interface CompanyCopy {
  name: string;
  summary: string;
  body: string;
}

export interface Company {
  slug: string;
  mark: string;
  cover: string;
  en: CompanyCopy;
  ar: CompanyCopy;
}

const loremEn = {
  summary:
    'Placeholder brief for this subsidiary. The real register replaces this.',
  body: 'Placeholder copy. This drawer holds the company photo, a short description, and a link to the longer note. Swap the text when the real companies are confirmed.',
};

const loremAr = {
  summary: 'نص تجريبي لهذه الشركة. يُستبدل عند تثبيت السجل الحقيقي.',
  body: 'نص تجريبي. هذه اللوحة تعرض صورة الشركة ووصفاً قصيراً ورابطاً للنبذة. يُستبدل النص عند تأكيد الشركات.',
};

export const COMPANIES: Company[] = [
  ['northline', 'Handling', 'Northline', 'نورثلاين', '/blog/sample.png'],
  ['meridian', 'Trading', 'Meridian', 'ميريديان', '/blog/sample.png'],
  ['harbor', 'Barter', 'Harbor', 'هاربور', '/blog/sample.png'],
  ['cedar', 'Rail', 'Cedar Line', 'سيدر', '/blog/sample.png'],
  ['vantage', 'Trip', 'Vantage', 'فانتاج', '/blog/sample.png'],
  ['lumen', 'Logistics', 'Lumen', 'لومن', '/blog/sample.png'],
  ['atlas', 'Works', 'Atlas', 'أطلس', '/blog/sample.png'],
  ['orbit', 'Desk', 'Orbit', 'أوربت', '/blog/sample.png'],
  ['kepler', 'Studio', 'Kepler', 'كيبلر', '/blog/sample.png'],
].map(([slug, mark, en, ar, cover]) => ({
  slug,
  mark,
  cover,
  en: { name: en, ...loremEn },
  ar: { name: ar, ...loremAr },
}));

export function companyText(company: Company, locale: string) {
  return locale === 'ar' ? company.ar : company.en;
}
