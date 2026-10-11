import type { ReactNode } from 'react';

import { useTranslations } from 'next-intl';

import { InstagramIcon } from '@/components/icons/instagram';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { WhatsAppIcon } from '@/components/icons/whatsapp';
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
          <div className="flex items-center gap-3">
            <Social label="Instagram" icon={<InstagramIcon />} />
            <Social label="LinkedIn" icon={<LinkedInIcon />} />
            <Social
              label="WhatsApp"
              href={`https://wa.me/${COMPANY.whatsapp}`}
              icon={<WhatsAppIcon />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  label,
  icon,
  href = '#',
}: {
  label: string;
  icon: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(href.startsWith('http')
        ? { target: '_blank', rel: 'noopener' }
        : {})}
      className="inline-flex text-muted-foreground transition-colors hover:text-accent [&_svg]:size-6"
    >
      {icon}
    </a>
  );
}
