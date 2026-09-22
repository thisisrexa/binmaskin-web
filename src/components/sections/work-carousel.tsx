'use client';

import type { StaticImageData } from 'next/image';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PostCard } from '@/lib/blog';

import { Eyebrow } from '@/components/sections/eyebrow';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { formatDate } from '@/lib/utils';

import sample from '../../../public/work/sample.png';

const SLIDES: {
  img: StaticImageData;
  line: 'd1' | 'd2' | 'd3' | 'd4';
  year: string;
}[] = [
  { img: sample, line: 'd1', year: '2025' },
  { img: sample, line: 'd2', year: '2025' },
  { img: sample, line: 'd3', year: '2026' },
  { img: sample, line: 'd4', year: '2026' },
];

const WORK_MS = 5600;
const BLOG_MS = 4800;

function useSnap(api: CarouselApi | undefined) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIdx(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);
  return idx;
}

function useReduceMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

function useAutoplay(
  api: CarouselApi | undefined,
  ms: number,
  paused: boolean,
) {
  const reduce = useReduceMotion();
  useEffect(() => {
    if (!api || paused || reduce) return;
    const id = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, ms);
    return () => window.clearInterval(id);
  }, [api, ms, paused, reduce]);
}

function FilmDots({
  count,
  index,
  ms,
  paused,
  live,
  onPick,
}: {
  count: number;
  index: number;
  ms: number;
  paused: boolean;
  live: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div
      className="film-dots"
      data-paused={paused ? '' : undefined}
      role="tablist"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`${i + 1} / ${count}`}
          onClick={() => onPick(i)}
        >
          {live && i === index ? (
            <span
              key={`${index}-${paused}`}
              className="film-dot-bar"
              style={{ animationDuration: `${ms}ms` }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}

function BlogCard({ post, locale }: { post: PostCard; locale: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-16/10 overflow-hidden bg-navy">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="22rem"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <time
        className="mt-3 block text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case"
        dateTime={post.date}
      >
        {formatDate(post.date, locale)}
      </time>
      <h3 className="card-title mt-1">{post.title}</h3>
    </Link>
  );
}

function WorkSlide({ s, i }: { s: (typeof SLIDES)[number]; i: number }) {
  const t = useTranslations('work');

  return (
    <div className="relative aspect-3/4 overflow-hidden bg-navy md:aspect-video">
      <Image
        src={s.img}
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 80vw"
        placeholder="blur"
        className="object-cover"
        draggable={false}
        priority={i === 0}
      />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-navy/80 via-navy/25 to-transparent px-4 pt-14 pb-4 text-cream md:px-6 md:pb-5">
        <span className="text-[11px] tracking-[0.14em] text-bronze uppercase ar:tracking-normal ar:normal-case">
          {s.year}
        </span>
        <h3 className="text-[clamp(1.15rem,1.7vw,1.55rem)] text-cream">
          {t(s.line)}
        </h3>
        <span className="line-clamp-1 max-w-104 text-[0.9rem] text-cream/70">
          {t(`${s.line}p`)}
        </span>
      </span>
    </div>
  );
}

export function WorkCarousel({ posts }: { posts: PostCard[] }) {
  const t = useTranslations('work');
  const tb = useTranslations('blog');
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [blogApi, setBlogApi] = useState<CarouselApi>();
  const [hidden, setHidden] = useState(false);
  const workIdx = useSnap(api);
  const blogSnap = useSnap(blogApi);
  const reduce = useReduceMotion();
  const [hot, setHot] = useState<'blog' | 'work' | null>(null);
  const ready = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const paused = hidden;
  const blogIdx = posts.length ? blogSnap % posts.length : 0;
  // ponytail: 3 copies so a short journal still fills a wide row; drop when posts >= 6
  const blogCopies = posts.length >= 6 ? 1 : 3;
  const blogSlides = Array.from(
    { length: posts.length * blogCopies },
    (_, i) => ({
      post: posts[i % posts.length],
      key: `${posts[i % posts.length].slug}-${i}`,
    }),
  );

  useAutoplay(api, WORK_MS, paused || hot === 'work');
  useAutoplay(blogApi, BLOG_MS, paused || hot === 'blog');

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const pickBlog = (i: number) => {
    if (!blogApi || posts.length === 0) return;
    const snap = blogApi.selectedScrollSnap();
    blogApi.scrollTo(snap - (snap % posts.length) + i);
  };

  return (
    <section id="work" className="overflow-hidden py-24 max-md:py-16">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2>{t.rich('title', { em: (c) => <em>{c}</em> })}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
            {t('lead')}
          </p>
        </Reveal>
      </div>
      <div
        className="mt-10"
        onPointerEnter={() => setHot('work')}
        onPointerLeave={() => setHot((v) => (v === 'work' ? null : v))}
      >
        {ready ? (
          <Carousel
            className="film film-work"
            setApi={setApi}
            opts={{ align: 'center', loop: true, direction, duration: 25 }}
          >
            <CarouselContent>
              {SLIDES.map((s, i) => (
                <CarouselItem key={s.line}>
                  <WorkSlide s={s} i={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="px-[8px]">
            <WorkSlide s={SLIDES[0]} i={0} />
          </div>
        )}
      </div>
      <FilmDots
        count={SLIDES.length}
        index={workIdx}
        ms={WORK_MS}
        paused={paused || hot === 'work'}
        live={!!api && !reduce}
        onPick={(i) => api?.scrollTo(i)}
      />
      {posts.length > 0 ? (
        <div className="mt-8">
          <div className="wrap">
            <Eyebrow>{tb('eyebrow')}</Eyebrow>
          </div>
          <div
            className="mt-4"
            onPointerEnter={() => setHot('blog')}
            onPointerLeave={() => setHot((v) => (v === 'blog' ? null : v))}
          >
            {ready ? (
              <Carousel
                className="film film-blog"
                setApi={setBlogApi}
                opts={{ align: 'start', loop: true, direction, duration: 25 }}
              >
                <CarouselContent>
                  {blogSlides.map(({ post, key }, i) => (
                    <CarouselItem
                      key={key}
                      aria-hidden={i >= posts.length || undefined}
                    >
                      <BlogCard post={post} locale={locale} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="flex gap-[8px] overflow-hidden px-[8px]">
                {posts.map((post) => (
                  <div key={post.slug} className="w-88 shrink-0">
                    <BlogCard post={post} locale={locale} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <FilmDots
            count={posts.length}
            index={blogIdx}
            ms={BLOG_MS}
            paused={paused || hot === 'blog'}
            live={!!blogApi && !reduce}
            onPick={pickBlog}
          />
        </div>
      ) : null}
    </section>
  );
}
