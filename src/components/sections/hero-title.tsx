import { useTranslations } from 'next-intl';

import { StaggerText } from '@/components/ui/stagger-text';

export function HeroTitle() {
  const t = useTranslations('hero');

  return (
    <h1 className="max-w-[16ch] text-[clamp(2.5rem,7.2vw,4.85rem)] leading-[1.18] max-md:max-w-none max-md:text-[clamp(2.35rem,11vw,3.1rem)] max-md:leading-[1.22] ar:max-md:leading-[1.38]">
      <span className="block overflow-hidden pb-[0.14em]">
        <StaggerText>{t('l1')}</StaggerText>
      </span>
      <span className="accent relative block overflow-hidden pb-[0.14em] text-accent italic after:absolute after:inset-x-0 after:bottom-[0.06em] after:h-px after:bg-accent/40 after:content-[''] ar:font-normal ar:not-italic">
        <StaggerText delay={0.14}>{t('l2')}</StaggerText>
      </span>
    </h1>
  );
}
