import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { CompanyGallery } from '@/components/companies/company-gallery';
import { Eyebrow } from '@/components/sections/eyebrow';
import { StaggerText } from '@/components/ui/stagger-text';
import { Link } from '@/i18n/navigation';
import { COMPANIES, companyText } from '@/lib/companies';
import { getCompanyPage } from '@/lib/company-pages';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return COMPANIES.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getCompanyPage(locale, slug);
  if (!page) return {};
  return pageMetadata({
    locale,
    path: `/companies/${slug}`,
    title: page.title,
    description: page.excerpt,
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const company = COMPANIES.find((item) => item.slug === slug);
  const page = getCompanyPage(locale, slug);
  if (!company || !page) notFound();
  const t = await getTranslations({ locale, namespace: 'companies' });
  const copy = companyText(company, locale);
  const titleWords = page.title.trim().split(/\s+/).filter(Boolean);
  const accentLastWord = titleWords.length >= 2;

  return (
    <main className="pb-16 lg:grid lg:grid-cols-2 lg:items-start lg:pb-0">
      {company.frames ? (
        <CompanyGallery
          className="lg:sticky lg:top-(--hdr) lg:col-start-2 lg:row-start-1 lg:h-[calc(100dvh-var(--hdr))]"
          frames={company.frames}
          plan={company.plan}
          label={page.title}
        />
      ) : null}
      <article className="wrap pt-6 pb-12 md:pt-12 md:pb-16 lg:col-start-1 lg:row-start-1 lg:ms-0 lg:w-full lg:max-w-none lg:pt-16 lg:pb-20 lg:ps-[max(var(--gutter),calc((100vw-var(--wrap))/2))] lg:pe-14">
        <Link
          href="/#companies"
          className="text-[11px] tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case"
        >
          {t('back')}
        </Link>
        <div className="mt-5 md:mt-8">
          <Eyebrow>{company.mark}</Eyebrow>
          <div className="section-copy">
            <h1 className="page-title max-w-copy">
              {accentLastWord ? (
                <>
                  <StaggerText>{titleWords.slice(0, -1).join(' ')}</StaggerText>
                  <em>
                    <StaggerText delay={(titleWords.length - 1) * 0.03}>
                      {titleWords.at(-1)}
                    </StaggerText>
                  </em>
                </>
              ) : (
                <StaggerText>{page.title}</StaggerText>
              )}
            </h1>
            <p className="mt-5 max-w-copy text-[1.125rem] text-muted-foreground">
              {page.excerpt || copy.summary}
            </p>
            <div className="prose mt-10 max-w-none prose-headings:font-normal prose-headings:text-navy prose-p:text-soft prose-a:text-accent prose-strong:text-navy prose-li:text-soft">
              <ReactMarkdown>{page.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
