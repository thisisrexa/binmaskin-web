'use client';

import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import type { NavItem } from '@/lib/nav';

import { BrandMark } from '@/components/layout/brand-mark';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === '/';

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-70 h-0.5 bg-transparent"
        aria-hidden="true"
      >
        <i className="scroll-progress block size-full bg-accent" />
      </div>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-lg">
        <div className="wrap">
          <div className="flex h-(--hdr) items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Binmaskin home"
              className="flex min-h-11 shrink-0 items-center"
            >
              <BrandMark
                className="h-[22px] max-w-[min(46vw,240px)] md:h-[26px]"
                priority
              />
            </Link>
            <nav
              className="hidden gap-8 text-[12px] font-normal tracking-[0.14em] text-muted-foreground uppercase lg:flex ar:tracking-normal ar:normal-case"
              aria-label="Primary"
            >
              {NAV.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  home={home}
                  className="nav-link"
                  label={t(item.id)}
                />
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <div
                className="hidden h-11 items-stretch border border-border bg-transparent sm:inline-flex"
                role="group"
                aria-label="Language"
              >
                <LangSwitch locale={locale} pathname={pathname} />
              </div>
              <div className="hidden lg:block">
                <NavLink
                  item={{ id: 'contact', kind: 'section' }}
                  home={home}
                  className="btn btn-solid btn-sm"
                  label={t('cta')}
                />
              </div>
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger
                    className="icon-btn inline-flex"
                    aria-label="Menu"
                    aria-expanded={open}
                  >
                    <Menu />
                  </SheetTrigger>
                  <SheetContent
                    side={locale === 'ar' ? 'left' : 'right'}
                    showCloseButton={false}
                    className="max-w-none gap-0 border-0 bg-cream p-0 shadow-none data-[side=left]:w-full data-[side=right]:w-full sm:data-[side=left]:max-w-none sm:data-[side=right]:max-w-none"
                  >
                    <SheetTitle className="sr-only">{t('home')}</SheetTitle>
                    <div className="flex h-full flex-col">
                      <div className="border-b border-border/80">
                        <div className="wrap">
                          <div className="flex h-(--hdr) items-center justify-between gap-4">
                            <span className="flex min-h-11 shrink-0 items-center">
                              <BrandMark className="h-[22px] max-w-[min(46vw,240px)] md:h-[26px]" />
                            </span>
                            <button
                              type="button"
                              className="icon-btn inline-flex"
                              aria-label="Close"
                              onClick={() => setOpen(false)}
                            >
                              <X />
                            </button>
                          </div>
                        </div>
                      </div>
                      <nav className="flex flex-1 flex-col px-(--gutter) pt-2 pb-8">
                        {home ? (
                          <a
                            href="#home"
                            className="m-link"
                            onClick={() => setOpen(false)}
                          >
                            {t('home')}
                          </a>
                        ) : (
                          <Link
                            href="/"
                            className="m-link"
                            onClick={() => setOpen(false)}
                          >
                            {t('home')}
                          </Link>
                        )}
                        {NAV.map((item) => (
                          <NavLink
                            key={item.id}
                            item={item}
                            home={home}
                            className="m-link"
                            label={t(item.id)}
                            onClick={() => setOpen(false)}
                          />
                        ))}
                        <div className="mt-10 inline-flex h-11 w-fit items-stretch border border-border sm:hidden">
                          <LangSwitch locale={locale} pathname={pathname} />
                        </div>
                      </nav>
                      <div className="px-(--gutter) pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                        <NavLink
                          item={{ id: 'contact', kind: 'section' }}
                          home={home}
                          className="btn btn-solid w-full"
                          label={t('cta')}
                          onClick={() => setOpen(false)}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function NavLink({
  item,
  home,
  className,
  label,
  onClick,
}: {
  item: NavItem;
  home: boolean;
  className: string;
  label: string;
  onClick?: () => void;
}) {
  if (item.kind === 'page') {
    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {label}
      </Link>
    );
  }
  if (home) {
    return (
      <a href={`#${item.id}`} className={className} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link href={`/#${item.id}`} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}

function LangSwitch({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  return (
    <>
      <Link
        href={pathname}
        locale="en"
        aria-pressed={locale === 'en'}
        className={cn(
          'flex min-w-11 items-center px-3.5 text-[11px] tracking-[0.16em] uppercase transition-colors',
          locale === 'en'
            ? 'bg-navy text-cream'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="ar"
        aria-pressed={locale === 'ar'}
        className={cn(
          'flex min-w-11 items-center px-3.5 font-sans-ar text-[13px] transition-colors',
          locale === 'ar'
            ? 'bg-navy text-cream'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        عربي
      </Link>
    </>
  );
}
