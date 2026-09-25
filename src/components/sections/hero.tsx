import { useTranslations } from 'next-intl';

import { HeroStage } from '@/components/sections/hero-stage';
import { HeroTitle } from '@/components/sections/hero-title';
import { Reveal } from '@/components/ui/reveal';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-var(--hdr))] w-full flex-col justify-center overflow-hidden bg-linear-to-b from-cream-2 to-cream py-[clamp(2.75rem,7vh,5.5rem)]"
    >
      <div className="relative z-10 wrap flex flex-1 items-center">
        <div className="grid w-full items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.82fr)]">
          <div className="max-w-160 min-w-0 min-[1440px]:ps-(--logo-w)">
            <Reveal className="hero-status mb-8 flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase ar:text-xs ar:tracking-normal ar:normal-case">
              <span
                className="size-1.5 shrink-0 bg-accent"
                aria-hidden="true"
              />
              <span>{t('status')}</span>
            </Reveal>
            <HeroTitle />
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-copy text-[1.125rem] text-muted-foreground">
                {t('lead')}
              </p>
            </Reveal>
            <Reveal
              delay={0.24}
              className="mt-12 flex flex-wrap gap-3 max-md:flex-col"
            >
              <a href="#contact" className="btn btn-solid max-md:w-full">
                <span>{t('cta1')}</span>
                <svg
                  className="arr"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 8h11M9.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </a>
              <a href="#companies" className="btn max-md:w-full">
                {t('cta2')}
              </a>
            </Reveal>
            <Reveal
              delay={0.32}
              className="mt-[clamp(2rem,5vh,3.25rem)] border-t border-border pt-6 text-[12px] tracking-[0.04em] text-faint"
            >
              {t('trust1')}
            </Reveal>
          </div>
          <div className="relative hidden h-full min-h-[min(26rem,52vh)] lg:block">
            <HeroStage />
          </div>
        </div>
      </div>
    </section>
  );
}
