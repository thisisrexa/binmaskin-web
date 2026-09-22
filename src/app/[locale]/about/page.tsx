import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/seo';

const STATS = [1, 2, 3, 4] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return pageMetadata({
    locale,
    path: '/about',
    title: t('eyebrow'),
    description: t('lead'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tq = await getTranslations({ locale, namespace: 'quote' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <main className="wrap py-16 pb-24 md:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-16">
        <article>
          <p className="mb-6 text-[0.6875rem] tracking-[0.22em] text-accent uppercase ar:text-[0.8125rem] ar:tracking-normal ar:normal-case">
            {t('eyebrow')}
          </p>
          <h1 className="page-title max-w-copy whitespace-pre-line">
            {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
          </h1>
          <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
            {t('lead')}
          </p>
          <div className="mt-8 flex max-w-copy flex-col gap-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
          <p className="about-quote mt-10 max-w-copy border-s-2 border-accent ps-6 leading-[1.45] whitespace-pre-line italic">
            {tq('text')}
          </p>
        </article>
        <div className="relative aspect-3/4 bg-navy lg:sticky lg:top-[calc(var(--hdr)+1.5rem)]">
          <Image
            src="/blog/sample.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-cover object-[70%_center]"
            priority
          />
        </div>
      </div>
      <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 lg:grid-cols-4">
        {STATS.map((n) => (
          <div key={n}>
            <dt className="stat-n">{t(`v${n}`)}</dt>
            <dd className="stat-l mt-2">{t(`s${n}`)}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-14">
        <Link href="/#contact" className="btn btn-solid">
          {tn('cta')}
        </Link>
      </div>
    </main>
  );
}
