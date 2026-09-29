import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import aboutSketch from '@/assets/about-sketch.png';
import { Reveal } from '@/components/ui/reveal';
import { StatsCounter } from '@/components/ui/stats-counter';
import { Link } from '@/i18n/navigation';
import { COMPANIES } from '@/lib/companies';
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
    <main className="mx-auto max-w-[1440px] pb-24">
      <div className="lg:grid lg:grid-cols-2 lg:items-stretch">
        <article className="wrap py-16 md:py-24 lg:ms-0 lg:w-full lg:max-w-none lg:py-24 lg:ps-[max(var(--gutter),calc((100vw-var(--wrap))/2))] lg:pe-12">
          <p className="mb-6 text-[0.6875rem] tracking-[0.22em] text-accent uppercase ar:text-[0.8125rem] ar:tracking-normal ar:normal-case">
            {t('eyebrow')}
          </p>
          <Reveal>
            <h1 className="page-title max-w-copy text-[clamp(1.7rem,2.8vw,2.45rem)]! leading-[1.2] whitespace-pre-line">
              {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
            </h1>
          </Reveal>
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
          <Link href="/#contact" className="btn btn-solid mt-10">
            {tn('cta')}
          </Link>
        </article>
        <div className="relative mx-(--gutter) aspect-3/4 lg:sticky lg:top-(--hdr) lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[calc(100dvh-var(--hdr))]">
          <Image
            src={aboutSketch}
            alt=""
            fill
            className="object-contain object-center"
            priority
            quality={100}
          />
        </div>
      </div>
      <div className="wrap">
        <div className="mx-auto mt-16 grid w-full max-w-md grid-cols-2 place-items-center gap-x-6 gap-y-10 border-t border-border pt-10 text-center sm:gap-x-10 lg:mx-0 lg:flex lg:max-w-none lg:justify-between lg:gap-x-0 lg:text-start">
          {STATS.map((n, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="stat-n">
                {n === 1 ? (
                  <StatsCounter
                    value={COMPANIES.length}
                    minDigits={2}
                    duration={0.8}
                  />
                ) : n === 3 ? (
                  <StatsCounter value={100} suffix="%" duration={0.8} />
                ) : (
                  t(`v${n}`)
                )}
              </div>
              <div className="stat-l mt-2">{t(`s${n}`)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
