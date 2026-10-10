'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
import { Link } from '@/i18n/navigation';
import { COMPANIES, companyText } from '@/lib/companies';

const ROW = '11.5rem';
const CELL =
  'flex h-(--co-row) w-full flex-col border-e border-b border-border bg-background p-4 text-start transition-colors hover:bg-cream-2 sm:p-5';

function setTop(el: HTMLElement, top: number) {
  const prev = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  el.scrollTop = top;
  el.style.scrollBehavior = prev;
}

function scrollPage(dy: number) {
  const root = document.scrollingElement ?? document.documentElement;
  setTop(root, root.scrollTop + dy);
}

/** Inside the list, scroll the list. At the start or the end, the same gesture leaves onto the page. */
function chain(el: HTMLElement, dy: number) {
  if (dy === 0) return;
  const max = Math.max(0, el.scrollHeight - el.clientHeight);
  const top = el.scrollTop;
  if ((dy < 0 && top <= 0) || (dy > 0 && top >= max - 1)) {
    scrollPage(dy);
    return;
  }
  const next = Math.min(max, Math.max(0, top + dy));
  setTop(el, next);
  const left = dy - (next - top);
  if (Math.abs(left) > 0.5) scrollPage(left);
}

function useChainScroll(on: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;

    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
    let detach = () => {};

    const connect = () => {
      detach();
      detach = () => {};
      if (desktop.matches) return;
      detach = bindMobile(el);
    };

    connect();
    desktop.addEventListener('change', connect);
    return () => {
      desktop.removeEventListener('change', connect);
      detach();
    };
  }, [on]);

  return ref;
}

function bindMobile(el: HTMLDivElement) {
  let lastY = 0;
  let lastT = 0;
  let vel = 0;
  let raf = 0;
  let ease = 0;
  let goal = el.scrollTop;
  let stamp = 0;
  const stop = () => cancelAnimationFrame(raf);

  const glide = (now: number) => {
    const dt = Math.min(34, stamp ? now - stamp : 16);
    stamp = now;
    const diff = goal - el.scrollTop;
    if (Math.abs(diff) < 0.4) {
      setTop(el, goal);
      ease = 0;
      stamp = 0;
      return;
    }
    const k = 1 - Math.exp(-dt / 110);
    setTop(el, el.scrollTop + diff * k);
    ease = requestAnimationFrame(glide);
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    stop();
    let dy = event.deltaY;
    if (event.deltaMode === 1) dy *= 16;
    else if (event.deltaMode === 2) dy *= el.clientHeight;
    if (dy === 0) return;
    event.preventDefault();

    const max = Math.max(0, el.scrollHeight - el.clientHeight);
    const next = Math.min(max, Math.max(0, goal + dy));
    const left = dy - (next - goal);
    goal = next;
    if (Math.abs(left) > 0.5) scrollPage(left);
    if (!ease) ease = requestAnimationFrame(glide);
  };

  const onStart = (event: TouchEvent) => {
    if (event.touches.length !== 1) return;
    stop();
    cancelAnimationFrame(ease);
    ease = 0;
    goal = el.scrollTop;
    lastY = event.touches[0].clientY;
    lastT = performance.now();
    vel = 0;
  };

  const onMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) return;
    const y = event.touches[0].clientY;
    const now = performance.now();
    const dy = lastY - y;
    const dt = Math.max(8, now - lastT);
    vel = dy / dt;
    lastY = y;
    lastT = now;
    if (dy === 0) return;
    event.preventDefault();
    chain(el, dy);
    goal = el.scrollTop;
  };

  const onEnd = () => {
    const tick = () => {
      vel *= 0.92;
      if (Math.abs(vel) < 0.02) return;
      chain(el, vel * 16);
      goal = el.scrollTop;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };

  const onThumbDown = (event: PointerEvent) => {
    const bar = el.offsetWidth - el.clientWidth;
    if (bar < 2) return;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const onBar = rtl
      ? event.offsetX <= bar + 2
      : event.offsetX >= el.clientWidth - 2;
    if (!onBar) return;
    cancelAnimationFrame(ease);
    ease = 0;
    stamp = 0;
    goal = el.scrollTop;
    const up = () => {
      goal = el.scrollTop;
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointerup', up);
  };

  el.addEventListener('pointerdown', onThumbDown);
  el.addEventListener('wheel', onWheel, { passive: false });
  el.addEventListener('touchstart', onStart, { passive: true });
  el.addEventListener('touchmove', onMove, { passive: false });
  el.addEventListener('touchend', onEnd);
  el.addEventListener('touchcancel', stop);
  return () => {
    stop();
    cancelAnimationFrame(ease);
    el.removeEventListener('pointerdown', onThumbDown);
    el.removeEventListener('wheel', onWheel);
    el.removeEventListener('touchstart', onStart);
    el.removeEventListener('touchmove', onMove);
    el.removeEventListener('touchend', onEnd);
    el.removeEventListener('touchcancel', stop);
  };
}

export function CompanyList({
  onPick,
  scroll = false,
}: {
  onPick?: (slug: string) => void;
  scroll?: boolean;
}) {
  const locale = useLocale();
  const scroller = useChainScroll(scroll);

  return (
    <div
      ref={scroll ? scroller : undefined}
      className={
        scroll
          ? 'box-content h-[calc(11.5rem*3+1px)] overflow-y-auto border border-dashed border-navy/25 lg:h-[calc(11.5rem*2+1px)] [@media(hover:none),_(pointer:coarse)]:touch-pan-x [@media(hover:none),_(pointer:coarse)]:overscroll-none [@media(hover:none),_(pointer:coarse)]:[scroll-behavior:auto]'
          : 'border border-dashed border-navy/25'
      }
    >
      <ul
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="grid grid-cols-2 text-start lg:grid-cols-3"
        style={{ ['--co-row' as string]: ROW }}
      >
        {COMPANIES.map((company, i) => {
          const text = companyText(company, locale);
          const lastAlone =
            i === COMPANIES.length - 1 && COMPANIES.length % 2 === 1;
          const body = (
            <>
              <span className="co-mark text-navy">{text.name}</span>
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
                  className={CELL}
                >
                  {body}
                </button>
              ) : (
                <Link href={`/companies/${company.slug}`} className={CELL}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {scroll ? <div aria-hidden className="h-px" /> : null}
    </div>
  );
}

export function Companies() {
  const t = useTranslations('companies');
  const locale = useLocale();
  const [slug, setSlug] = useState<string | null>(null);
  const active = COMPANIES.find((company) => company.slug === slug);
  const copy = active ? companyText(active, locale) : null;

  return (
    <section
      id="companies"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="wrap py-24 max-md:py-12"
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
          <CompanyList onPick={setSlug} scroll />
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
                {active.cover ? (
                  <Image
                    src={active.cover.desktop}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                  />
                ) : null}
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
