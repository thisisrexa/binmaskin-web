'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';

import { Link } from '@/i18n/navigation';
import { readConsent, writeConsent } from '@/lib/consent';

export function CookieSettings() {
  const t = useTranslations('consent');
  return (
    <button
      type="button"
      className="flex min-h-11 items-center py-2 text-start text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
      onClick={() => {
        window.dispatchEvent(new Event('bm-consent-open'));
      }}
    >
      {t('settings')}
    </button>
  );
}

export function CookieConsent({ initialOpen }: { initialOpen: boolean }) {
  const t = useTranslations('consent');
  const titleId = useId();
  const [open, setOpen] = useState(initialOpen);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setAnalytics(readConsent() === 'all');
      setDetails(true);
      setOpen(true);
    };

    window.addEventListener('bm-consent-open', onOpen);
    return () => window.removeEventListener('bm-consent-open', onOpen);
  }, []);

  if (!open) return null;

  const save = (value: 'all' | 'essential') => {
    writeConsent(value);
    setOpen(false);
    setDetails(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 p-3 sm:p-5">
      <div
        role="dialog"
        aria-labelledby={titleId}
        className="mx-auto w-full max-w-3xl border border-border bg-cream shadow-[0_-12px_40px_rgba(17,28,45,0.08)]"
      >
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <p className="text-[11px] tracking-[0.18em] text-accent uppercase ar:tracking-normal ar:normal-case">
            {t('kicker')}
          </p>
          <h2 id={titleId} className="mt-2 text-[1.35rem] font-normal">
            {t('title')}
          </h2>
          <p className="mt-2 max-w-copy text-[0.95rem] text-muted-foreground">
            {t('text')}{' '}
            <Link href="/cookies" className="text-accent underline">
              {t('more')}
            </Link>
          </p>
        </div>

        {details ? (
          <ul className="divide-y divide-border px-5 sm:px-6">
            <li className="flex items-start justify-between gap-6 py-4">
              <div>
                <p className="text-[0.95rem]">{t('essentialTitle')}</p>
                <p className="mt-1 max-w-md text-[0.85rem] text-muted-foreground">
                  {t('essentialBody')}
                </p>
              </div>
              <span className="shrink-0 pt-0.5 text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case">
                {t('always')}
              </span>
            </li>
            <li className="flex items-start justify-between gap-6 py-4">
              <div>
                <p className="text-[0.95rem]">{t('analyticsTitle')}</p>
                <p className="mt-1 max-w-md text-[0.85rem] text-muted-foreground">
                  {t('analyticsBody')}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                aria-label={t('analyticsTitle')}
                onClick={() => setAnalytics((on) => !on)}
                className={`relative mt-1 h-6 w-11 shrink-0 border border-navy/30 ${analytics ? 'bg-navy' : 'bg-transparent'}`}
              >
                <span
                  className={`absolute top-0.5 size-4 ${analytics ? 'inset-e-0.5 bg-cream' : 'inset-s-0.5 bg-navy'}`}
                />
              </button>
            </li>
          </ul>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            className="btn"
            onClick={() => save('essential')}
          >
            {t('reject')}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (!details) {
                setDetails(true);
                return;
              }

              save(analytics ? 'all' : 'essential');
            }}
          >
            {details ? t('save') : t('prefs')}
          </button>
          <button type="button" className="btn" onClick={() => save('all')}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
