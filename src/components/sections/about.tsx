import { useTranslations } from 'next-intl';

import { Eyebrow } from '@/components/sections/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { StatsCounter } from '@/components/ui/stats-counter';
import { COMPANIES } from '@/lib/companies';

const STATS: {
  n: 1 | 2 | 3 | 4;
  value?: number;
  minDigits?: number;
  suffix?: string;
}[] = [
  { n: 1, value: COMPANIES.length, minDigits: 2 },
  { n: 2 },
  { n: 3, value: 100, suffix: '%' },
  { n: 4 },
];

export function About() {
  const t = useTranslations('about');
  const tq = useTranslations('quote');

  return (
    <section
      id="about"
      className="wrap grid items-center gap-x-16 gap-y-12 py-24 max-md:py-16 lg:grid-cols-2"
    >
      <div className="mx-auto flex max-w-copy flex-col lg:mx-0">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </Reveal>
        <div className="min-[1440px]:ps-12.5">
          <Reveal delay={0.08}>
            <h2 className="whitespace-pre-line">
              {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-[1.125rem] text-muted-foreground">
              {t('lead')}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="about-quote mt-10 border-s-2 border-accent ps-8 text-start leading-[1.45] whitespace-pre-line text-foreground italic">
              {tq('text')}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-md grid-cols-2 place-items-center gap-x-6 gap-y-10 self-center text-center sm:gap-x-10 lg:mx-0 lg:max-w-none lg:place-items-stretch lg:gap-y-14 lg:pt-10 lg:text-start">
        {STATS.map((stat, i) => (
          <Reveal key={stat.n} delay={i * 0.08}>
            <div className="stat-n">
              {stat.value != null ? (
                <StatsCounter
                  value={stat.value}
                  minDigits={stat.minDigits}
                  suffix={stat.suffix}
                  duration={1.4}
                />
              ) : (
                t(`v${stat.n}`)
              )}
            </div>
            <div className="stat-l">{t(`s${stat.n}`)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
