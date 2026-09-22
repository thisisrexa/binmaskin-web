'use client';

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('status');

  return (
    <main className="relative wrap flex min-h-[calc(100svh-var(--hdr))] flex-col items-center justify-center py-24 text-center">
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_35%,rgba(140,58,43,0.1),transparent_65%)]"
        aria-hidden="true"
      />
      <span className="mb-8 block h-px w-16 bg-accent" aria-hidden="true" />
      <h1 className="page-title">{t('errTitle')}</h1>
      <p className="mt-5 max-w-copy text-[1.05rem] text-muted-foreground">
        {t('errText')}
      </p>
      <button type="button" onClick={reset} className="btn btn-solid mt-12">
        <span>{t('errRetry')}</span>
        <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 8h11M9.5 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>
    </main>
  );
}
