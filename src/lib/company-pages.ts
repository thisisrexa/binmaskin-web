import fs from 'node:fs';
import path from 'node:path';

import { parseFrontmatter } from '@/lib/blog';
import { COMPANIES } from '@/lib/companies';

export interface CompanyPage {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
}

const ROOT = path.join(process.cwd(), 'content/companies');

export function getCompanyPage(locale: string, slug: string) {
  const localPath = path.join(ROOT, locale, `${slug}.md`);
  const fallback = path.join(ROOT, 'en', `${slug}.md`);
  const filePath = fs.existsSync(localPath)
    ? localPath
    : fs.existsSync(fallback)
      ? fallback
      : null;
  if (!filePath) return null;

  const { data, body } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    body,
  } satisfies CompanyPage;
}

for (const locale of ['en', 'ar'] as const) {
  for (const company of COMPANIES) {
    const page = getCompanyPage(locale, company.slug);

    if (!page?.title || !page.body) {
      throw new Error(`company page missing: ${locale}/${company.slug}`);
    }
  }
}
