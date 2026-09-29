'use client';

import type { RefObject } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Dialog } from 'radix-ui';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type { CarouselApi } from '@/components/ui/carousel';

import { BrandMark } from '@/components/layout/brand-mark';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const SLOTS = ['one', 'two', 'three'] as const;
const LEN = 3;
const DRAG_PX = 14;

function wrap(n: number) {
  return ((n % LEN) + LEN) % LEN;
}

function signedOffset(i: number, active: number) {
  const raw = i - active;
  const alt = raw > 0 ? raw - LEN : raw + LEN;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function useStageSize(ref: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 1 || h < 1) return;
      setSize((prev) =>
        prev && prev.w === w && prev.h === h ? prev : { w, h },
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

function Fan({
  frames,
  onOpen,
}: {
  frames: [string, string, string];
  onOpen: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const rtl = locale === 'ar';
  const stageRef = useRef<HTMLDivElement>(null);
  const stage = useStageSize(stageRef);
  const stageW = stage?.w ?? 0;
  const stageH = stage?.h ?? 0;
  const [active, setActive] = useState(0);
  const draggedRef = useRef(false);

  const cardW = Math.round(
    Math.min(Math.max(stageW * 0.5, 210), Math.min(500, stageW * 0.64)),
  );
  const cardH = Math.round(
    Math.min(Math.max(cardW * 0.76, 220), Math.max(stageH * 0.58, 250)),
  );
  const spacing = Math.round(cardW * 0.58);
  const stepDeg = 12;

  const prev = useCallback(() => setActive((a) => wrap(a - 1)), []);
  const next = useCallback(() => setActive((a) => wrap(a + 1)), []);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto flex h-[min(70dvh,32rem)] w-full max-w-3xl items-center justify-center outline-none lg:h-full lg:max-w-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') (rtl ? next : prev)();
        if (e.key === 'ArrowRight') (rtl ? prev : next)();
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(active);
        }
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pb-8"
        style={{ perspective: '1100px' }}
      >
        <AnimatePresence initial={false}>
          {stage
            ? SLOTS.map((id, i) => {
            const off = signedOffset(i, active);
            const abs = Math.abs(off);
            if (abs > 1) return null;

            const isActive = off === 0;
            const dir = rtl ? -1 : 1;
            const x = off * spacing * dir;
            const y = abs * 10;
            const rotateZ = off * stepDeg * dir;
            const scale = isActive ? 1.05 : 0.86;
            const lift = isActive ? -8 : 8;
            const rotateX = isActive ? 0 : 8;
            const z = -abs * 110;

            return (
              <motion.button
                key={id}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'absolute overflow-hidden bg-cream text-start shadow-[0_22px_50px_rgba(17,28,45,0.16)] ring-1 ring-navy/10 will-change-transform select-none',
                  isActive
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'cursor-pointer',
                )}
                style={{
                  width: cardW,
                  height: cardH,
                  zIndex: 20 - abs,
                  transformStyle: 'preserve-3d',
                }}
                initial={false}
                animate={{
                  opacity: 1,
                  x,
                  y: y + lift,
                  rotateZ,
                  rotateX,
                  scale,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                }
                drag={isActive && !reduce ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onPointerDown={() => {
                  draggedRef.current = false;
                }}
                onDrag={(_, info) => {
                  if (Math.abs(info.offset.x) > DRAG_PX) {
                    draggedRef.current = true;
                  }
                }}
                onDragEnd={(_, info) => {
                  if (reduce) return;

                  const travel = info.offset.x * (rtl ? -1 : 1);
                  const v = info.velocity.x * (rtl ? -1 : 1);
                  const threshold = Math.min(120, cardW * 0.18);

                  if (travel > threshold || v > 650) {
                    draggedRef.current = true;
                    prev();
                    return;
                  }
                  if (travel < -threshold || v < -650) {
                    draggedRef.current = true;
                    next();
                    return;
                  }

                  // framer drag eats click — open on short release
                  if (!draggedRef.current && isActive) onOpen(i);
                  draggedRef.current = false;
                }}
                onClick={() => {
                  if (draggedRef.current) {
                    draggedRef.current = false;
                    return;
                  }
                  if (!isActive) {
                    setActive(i);
                    return;
                  }

                  onOpen(i);
                }}
              >
                <div
                  className="relative size-full overflow-hidden"
                  style={{
                    transform: `translateZ(${z}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Image
                    src={frames[i]}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 72vw, 36vw"
                    className="object-cover"
                    quality={100}
                    draggable={false}
                  />
                  <span className="absolute inset-s-3 bottom-3 text-[10px] tracking-[0.2em] text-cream drop-shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.button>
            );
          })
            : null}
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-40 flex size-12 -translate-1/2 items-center justify-center bg-cream shadow-[0_10px_24px_rgba(17,28,45,0.16)] ring-1 ring-bronze/45 sm:size-14"
        style={
          stage
            ? { top: `calc(50% - ${Math.round(cardH / 2 + 32)}px)` }
            : undefined
        }
      >
        <BrandMark variant="symbol" className="h-6 sm:h-7" />
      </div>

      <div
        className="absolute inset-x-0 bottom-4 z-30 flex justify-center gap-2 sm:bottom-5"
        role="tablist"
      >
        {SLOTS.map((id, i) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`${i + 1} / 3`}
            className={cn(
              'size-1.5 rounded-full transition-colors',
              active === i ? 'bg-navy' : 'bg-navy/25 hover:bg-navy/45',
            )}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Pane({ src, layout }: { src: string; layout: 'hero' | 'stack' }) {
  if (layout === 'stack') {
    return (
      <div className="flex w-full justify-center">
        <Image
          src={src}
          alt=""
          width={1600}
          height={900}
          sizes="92vw"
          className="max-h-[min(32dvh,260px)] w-auto max-w-full object-contain lg:hidden"
          quality={100}
        />
        <div className="relative hidden min-h-0 w-full lg:block lg:h-full">
          <Image
            src={src}
            alt=""
            fill
            sizes="45vw"
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-center lg:hidden">
        <Image
          src={src}
          alt=""
          width={1600}
          height={900}
          sizes="92vw"
          className="max-h-[min(76dvh,820px)] w-auto max-w-full object-contain"
          quality={100}
        />
      </div>
      <div className="relative hidden size-full min-h-0 lg:block">
        <Image
          src={src}
          alt=""
          fill
          sizes="90vw"
          className="object-contain"
          quality={100}
        />
      </div>
    </>
  );
}

function Lightbox({
  frames,
  plan,
  label,
  index,
  onClose,
}: {
  frames: [string, string, string];
  plan: string | null;
  label: string;
  index: number;
  onClose: () => void;
}) {
  const t = useTranslations('companies');
  const tw = useTranslations('work');
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    api?.scrollTo(index, true);
  }, [api, index]);

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-cream/75 supports-backdrop-filter:bg-cream/55 supports-backdrop-filter:backdrop-blur-md" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col outline-none"
        >
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <Dialog.Close className="absolute inset-e-4 top-4 z-10 flex size-10 items-center justify-center text-navy hover:bg-navy/5">
            <XIcon />
            <span className="sr-only">{t('close')}</span>
          </Dialog.Close>
          <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-14 pb-16 sm:px-6 lg:pb-20">
            <Carousel
              className="w-full max-w-[2560px]"
              setApi={setApi}
              opts={{ startIndex: index, loop: true, direction }}
            >
              <CarouselContent className="ml-0">
                {SLOTS.map((id, slot) => (
                  <CarouselItem key={id} className="pl-0">
                    <div
                      className={cn(
                        'mx-auto w-[min(92vw,2560px)]',
                        plan
                          ? 'flex flex-col items-center gap-0.5 lg:grid lg:h-[min(85dvh,920px)] lg:grid-cols-2 lg:items-stretch lg:gap-4'
                          : 'flex justify-center lg:h-[min(78dvh,900px)]',
                      )}
                    >
                      <Pane
                        src={frames[slot]}
                        layout={plan ? 'stack' : 'hero'}
                      />
                      {plan ? <Pane src={plan} layout="stack" /> : null}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-2 lg:bottom-4 lg:gap-3">
            <button
              type="button"
              className="flex size-8 items-center justify-center border border-navy/15 text-navy hover:bg-navy/5 lg:size-11 [&_svg]:size-4 lg:[&_svg]:size-5"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeftIcon className="rtl:rotate-180" />
              <span className="sr-only">{tw('prev')}</span>
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center border border-navy/15 text-navy hover:bg-navy/5 lg:size-11 [&_svg]:size-4 lg:[&_svg]:size-5"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRightIcon className="rtl:rotate-180" />
              <span className="sr-only">{tw('next')}</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CompanyGallery({
  frames,
  plan,
  label,
  className,
}: {
  frames: [string, string, string];
  plan: string | null;
  label: string;
  className?: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[2560px] items-center justify-center',
        className,
      )}
    >
      <Fan frames={frames} onOpen={setOpenAt} />
      {openAt !== null ? (
        <Lightbox
          frames={frames}
          plan={plan}
          label={label}
          index={openAt}
          onClose={() => setOpenAt(null)}
        />
      ) : null}
    </div>
  );
}
