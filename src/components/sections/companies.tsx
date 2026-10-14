'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ScrollArea } from 'radix-ui';
import { useState } from 'react';

import burjSketchMobile from '@/assets/sketches/burj-mobile.png';
import burjSketch from '@/assets/sketches/burj.png';
import { Eyebrow } from '@/components/sections/eyebrow';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Link } from '@/i18n/navigation';
import { COMPANIES, companyText } from '@/lib/companies';

const ROW = '11.5rem';
const CELL =
  'flex h-(--co-row) w-full flex-col border-e border-b border-border p-4 text-start transition-colors sm:p-5';

export function CompanyList({
  onPick,
  activeSlug,
}: {
  onPick?: (slug: string) => void;
  activeSlug?: string;
}) {
  const locale = useLocale();
  const t = useTranslations('companies');
  const companies = COMPANIES;

  return (
    <ScrollArea.Root
      type="always"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative h-[calc(11.5rem*3+1px)] overflow-hidden border border-dashed border-navy/25 lg:h-[calc(11.5rem*2+1px)]"
    >
      <ScrollArea.Viewport className="size-full">
        <ul
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="grid grid-cols-2 text-start lg:grid-cols-3"
          style={{ ['--co-row' as string]: ROW }}
        >
          {companies.map((company, i) => {
            const text = companyText(company, locale);
            const lastAlone =
              i === companies.length - 1 && companies.length % 2 === 1;
            const tone =
              company.slug === activeSlug
                ? 'bg-[#e4ddd2]'
                : 'bg-background hover:bg-cream-2';
            const body = (
              <>
                <span className="co-mark text-navy">{text.name}</span>
                {(company.slug === 'operith' ||
                  company.slug === 'dar-al-hulul') && (
                  <span className="text-[0.7rem] text-accent">
                    {t('inDevelopment')}
                  </span>
                )}
                <span className="mt-auto line-clamp-2 text-[0.9rem] text-muted-foreground">
                  {text.summary}
                </span>
              </>
            );
            return (
              <li
                key={company.slug}
                className={lastAlone ? 'min-h-0 max-lg:col-span-2' : 'min-h-0'}
              >
                {onPick ? (
                  <button
                    type="button"
                    onClick={() => onPick(company.slug)}
                    className={`${CELL} ${tone}`}
                  >
                    {body}
                  </button>
                ) : (
                  <Link
                    href={`/companies/${company.slug}`}
                    className={`${CELL} ${tone}`}
                  >
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="z-10 flex w-2 touch-none bg-cream-2 p-0.5 select-none"
      >
        <ScrollArea.Thumb className="min-w-1 flex-1 rounded-full bg-faint/70" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export function Companies({ activeSlug }: { activeSlug?: string }) {
  const t = useTranslations('companies');
  const locale = useLocale();
  const [slug, setSlug] = useState<string | null>(null);
  const active = COMPANIES.find((company) => company.slug === slug);
  const copy = active ? companyText(active, locale) : null;

  return (
    <section
      id="companies"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={
        activeSlug ? 'wrap pt-8 pb-24 max-md:pb-12' : 'wrap py-24 max-md:py-12'
      }
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-10">
        <div className="section-copy text-start min-[1440px]:ps-12.5">
          <h2 className="max-w-copy whitespace-pre-line">
            {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
          </h2>
          <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
            {t('lead')}
          </p>
        </div>

        <div className="relative mx-auto mt-2 aspect-41/20 w-full overflow-hidden lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-10 lg:aspect-auto lg:h-auto lg:w-full lg:self-stretch lg:overflow-visible">
          <Image
            src={burjSketchMobile}
            alt=""
            fill
            className="object-cover object-[center_36%] lg:hidden"
            quality={100}
          />
          <Image
            src={burjSketch}
            alt=""
            fill
            className="hidden object-contain object-center lg:block"
            quality={100}
          />
        </div>

        <div className="mt-4 min-[1440px]:ps-12.5 lg:col-start-1 lg:mt-14">
          <CompanyList onPick={setSlug} activeSlug={activeSlug} />
        </div>
      </div>

      <Drawer
        open={slug != null}
        onOpenChange={(open) => {
          if (!open) setSlug(null);
        }}
      >
        <DrawerContent className="gap-0 border-border bg-background p-0 data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=bottom]:h-[min(72vh,34rem)] data-[vaul-drawer-direction=bottom]:max-h-[min(72vh,34rem)] data-[vaul-drawer-direction=bottom]:rounded-none">
          {active && copy ? (
            <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.9fr)] md:grid-rows-none">
              <div className="relative aspect-video bg-navy md:aspect-auto md:min-h-0">
                <Image
                  src={active.cover.desktop}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-0 flex-col justify-between gap-6 overflow-y-auto p-[clamp(1.5rem,3vw,2.75rem)]">
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
                    {active.mark}
                  </p>
                  <DrawerTitle className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-normal">
                    {copy.name}
                  </DrawerTitle>
                  <DrawerDescription className="mt-4 max-w-copy text-[1.05rem] leading-relaxed">
                    {copy.summary}
                  </DrawerDescription>
                </div>
                <Link
                  href={`/companies/${active.slug}`}
                  className="btn btn-solid w-full md:w-fit"
                >
                  {t('about')}
                </Link>
              </div>
              <DrawerClose
                className="icon-btn absolute inset-e-3 top-3 hidden bg-background md:inline-flex"
                aria-label={t('close')}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </DrawerClose>
            </div>
          ) : null}
        </DrawerContent>
      </Drawer>
    </section>
  );
}
