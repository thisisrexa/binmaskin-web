import { useTranslations } from 'next-intl';

import { BrandMark } from '@/components/layout/brand-mark';
import { CookieSettings } from '@/components/layout/cookie-consent';
import { Link } from '@/i18n/navigation';
import { COMPANY } from '@/lib/company';
import { NAV } from '@/lib/nav';

export function SiteFooter() {
  const t = useTranslations('foot');
  const tn = useTranslations('nav');
  const tl = useTranslations('legal');

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="wrap">
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-8 pt-10 pb-8 md:gap-12 md:pt-16 md:pb-12 lg:grid-cols-[minmax(14rem,1.5fr)_repeat(3,minmax(8rem,1fr))]">
          <div className="col-span-2 lg:col-span-1">
            <BrandMark className="h-10 max-w-full" />
            <p className="mt-6 max-w-copy text-[0.9rem] whitespace-pre-line text-muted-foreground">
              {t('blurb')}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t('company')}
            </h4>
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={
                  item.id === 'about'
                    ? '/about'
                    : item.kind === 'page'
                      ? item.href
                      : `/#${item.id}`
                }
                className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
              >
                {tn(item.id)}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t('legal')}
            </h4>
            {(['security', 'privacy', 'terms', 'cookies'] as const).map(
              (id) => (
                <Link
                  key={id}
                  href={`/${id}`}
                  className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
                >
                  {tl(id)}
                </Link>
              ),
            )}
            <CookieSettings />
          </div>
          <div className="max-lg:col-span-2">
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t('reach')}
            </h4>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
            >
              {COMPANY.email}
            </a>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="phone-ltr">{COMPANY.phone}</span>
            </a>
          </div>
        </div>
        <div
          dir="ltr"
          className="flex items-center justify-between gap-4 border-t border-border py-5 text-[12px] text-faint"
        >
          <span dir="auto">{t('copy')}</span>
          <div className="flex items-center gap-1">
            <Social
              label="Instagram"
              d="M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm4 3.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Zm0 1.6a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Zm5.15-.95a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            />
            <Social
              label="LinkedIn"
              d="M6.2 9.2H3.4V20h2.8V9.2ZM4.8 3.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.6 20h-2.8v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20h-2.8V9.2h2.8v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20Z"
            />
            <Social
              label="WhatsApp"
              d="M12.1 3.4a8.4 8.4 0 0 0-7.2 12.6L3.6 20.6l4.7-1.2a8.4 8.4 0 1 0 3.8-16Zm4.9 11.9c-.2.6-1.2 1.1-1.6 1.1-.4.1-.9.2-3-.8-2.5-1.2-4.1-3.8-4.2-4-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.6.7 2 .7 2.1.1.2 0 .3-.1.5l-.3.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.2.1.4.1.6-.1l.5-.6c.2-.2.3-.2.5-.1l1.9.9c.2.1.4.2.4.3.1.2 0 .7-.2 1.1Z"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-accent"
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="currentColor" d={d} />
      </svg>
    </a>
  );
}
