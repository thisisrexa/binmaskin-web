import { useTranslations } from 'next-intl';

import { BrandMark } from '@/components/layout/brand-mark';
import { LightLines } from '@/components/ui/light-lines';

export function HeroStage() {
  const t = useTranslations('hero');

  return (
    <div
      className="ll-wrap relative isolate size-full overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      <LightLines
        className="absolute inset-0"
        linesOpacity={0.18}
        lightsOpacity={0.95}
        lineColor="rgba(17,28,45,0.22)"
        lightColor="#8A7A5C"
        gradientFrom="transparent"
        gradientTo="transparent"
      >
        <div className="relative flex translate-y-[-8%] flex-col items-center gap-5">
          <span className="pointer-events-none absolute size-44 rounded-full bg-accent/20 blur-3xl" />
          <BrandMark variant="symbol" className="relative h-29" />
          <span className="relative text-[11px] tracking-[0.28em] text-accent uppercase ar:tracking-normal ar:normal-case">
            {t('core')}
          </span>
        </div>
      </LightLines>
    </div>
  );
}
