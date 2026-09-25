'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState, useSyncExternalStore } from 'react';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PostCard } from '@/lib/blog-meta';

import { Eyebrow } from '@/components/sections/eyebrow';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ResponsiveCover } from '@/components/ui/responsive-cover';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { coverFrame } from '@/lib/blog-meta';
import { COMPANIES, companyText } from '@/lib/companies';
import { formatDate } from '@/lib/utils';

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
      <div
        className={`film-frame relative overflow-hidden bg-navy ${coverFrame()}`}
      >
        <ResponsiveCover
          mobile={post.coverMobile}
          desktop={post.cover}
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

function WorkSlide({
  company,
  i,
}: {
  company: (typeof COMPANIES)[number];
  i: number;
}) {
  const locale = useLocale();
  const copy = companyText(company, locale);

  return (
    <div className="film-frame relative aspect-3/4 overflow-hidden bg-navy md:aspect-video">
      <ResponsiveCover
        mobile={company.cover.mobile}
        desktop={company.cover.desktop}
        sizes="(max-width: 768px) 90vw, 80vw"
        priority={i === 0}
      />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-navy/80 via-navy/25 to-transparent px-4 pt-14 pb-4 text-cream md:px-6 md:pb-5">
        <h3 className="text-[clamp(1.15rem,1.7vw,1.55rem)] text-cream">
          {copy.name}
        </h3>
        <span className="line-clamp-2 max-w-104 text-[0.9rem] text-cream/70">
          {copy.summary}
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
    <section className="overflow-hidden py-24 max-md:py-16">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </Reveal>
        <div className="min-[1440px]:ps-12.5">
          <Reveal delay={0.08}>
            <h2>{t.rich('title', { em: (c) => <em>{c}</em> })}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
              {t('lead')}
            </p>
          </Reveal>
        </div>
      </div>
      <div
        id="work"
        className="mx-auto mt-10 w-full max-w-[2560px]"
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
              {COMPANIES.map((company, i) => (
                <CarouselItem key={company.slug}>
                  <WorkSlide company={company} i={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="px-[8px]">
            <WorkSlide company={COMPANIES[0]} i={0} />
          </div>
        )}
        <FilmDots
          count={COMPANIES.length}
          index={workIdx}
          ms={WORK_MS}
          paused={paused || hot === 'work'}
          live={!!api && !reduce}
          onPick={(i) => api?.scrollTo(i)}
        />
      </div>
      {posts.length > 0 ? (
        <div className="mx-auto -mt-4 w-full max-w-[2560px]">
          <div className="wrap">
            <Eyebrow className="mb-3 hidden sm:flex">{tb('eyebrow')}</Eyebrow>
          </div>
          <div
            onPointerEnter={() => setHot('blog')}
            onPointerLeave={() => setHot((v) => (v === 'blog' ? null : v))}
          >
            {ready ? (
              <Carousel
                className="film film-blog"
                setApi={setBlogApi}
                opts={{ align: 'center', loop: true, direction, duration: 25 }}
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
