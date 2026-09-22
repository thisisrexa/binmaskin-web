import { useTranslations } from 'next-intl';

import { Eyebrow } from '@/components/sections/eyebrow';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('status');

  return (
    <main className="relative wrap flex min-h-[calc(100svh-var(--hdr))] flex-col items-center justify-center py-24 text-center">
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_35%,rgba(138,122,92,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <p
        className="font-serif text-[clamp(6rem,18vw,12rem)] leading-none text-accent/25 select-none"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="page-title">{t('nfTitle')}</h1>
      <p className="mt-5 max-w-copy text-[1.05rem] text-muted-foreground">
        {t('nfText')}
      </p>
      <Link href="/" className="btn btn-solid mt-12">
        <span>{t('nfBack')}</span>
        <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 8h11M9.5 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </Link>
    </main>
  );
}
