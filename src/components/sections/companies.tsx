'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import burjSketchMobile from '@/assets/burj-sketch-mobile.png';
import burjSketch from '@/assets/burj-sketch.png';
import { Eyebrow } from '@/components/sections/eyebrow';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/i18n/navigation';
import { COMPANIES, companyText } from '@/lib/companies';

/** Exactly 2 rows (lg 3-col) / 3 rows (2-col) = 6 cells visible; rest scroll. */
const ROW = '11.5rem';

export function Companies() {
  const t = useTranslations('companies');
  const locale = useLocale();
  const [slug, setSlug] = useState<string | null>(null);
  const active = COMPANIES.find((company) => company.slug === slug);
  const copy = active ? companyText(active, locale) : null;

  return (
    <section id="companies" className="wrap py-24 max-md:py-16">
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-10">
        <div className="min-[1440px]:ps-12.5">
          <h2 className="max-w-copy whitespace-pre-line">
            {t.rich('title', { em: (chunks) => <em>{chunks}</em> })}
          </h2>
          <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
            {t('lead')}
          </p>
        </div>

        <div className="relative mx-auto mt-10 h-[min(70vw,24rem)] w-auto lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:top-4 lg:aspect-auto lg:h-auto lg:w-full lg:self-stretch">
          <Image
            src={burjSketchMobile}
            alt=""
            fill
            className="object-contain object-center lg:hidden"
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

        <div className="lg:mt-14 min-[1440px]:ps-12.5 lg:col-start-1">
          <ScrollArea
            type="always"
            className="box-content h-[calc(11.5rem*3+1px)] border border-dashed border-navy/25 lg:h-[calc(11.5rem*2+1px)]"
          >
            <ul
              className="grid grid-cols-2 lg:grid-cols-3"
              style={{ ['--co-row' as string]: ROW }}
            >
              {COMPANIES.map((company, i) => {
                const text = companyText(company, locale);
                const lastAlone =
                  i === COMPANIES.length - 1 && COMPANIES.length % 2 === 1;
                return (
                  <li
                    key={company.slug}
                    className={
                      lastAlone ? 'min-h-0 max-lg:col-span-2' : 'min-h-0'
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setSlug(company.slug)}
                      className="flex h-(--co-row) w-full flex-col border-e border-b border-border bg-background p-4 text-start transition-colors hover:bg-cream-2 sm:p-5"
                    >
                      <span className="co-mark text-navy">{text.name}</span>
                      <span className="mt-auto line-clamp-2 text-[0.9rem] text-muted-foreground">
                        {text.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* ponytail: keeps last-row border-b inside overflow clip */}
            <div aria-hidden className="h-px" />
          </ScrollArea>
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
                    {copy.body}
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
