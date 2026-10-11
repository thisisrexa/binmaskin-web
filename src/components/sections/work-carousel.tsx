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
  labels,
  index,
  ms,
  paused,
  live,
  onPick,
}: {
  labels: string[];
  index: number;
  ms: number;
  paused: boolean;
  live: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div className="film-controls">
      <div
        className="film-dots"
        data-paused={paused ? '' : undefined}
        role="tablist"
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={label}
            onClick={() => onPick(i)}
          >
            {live && i === index ? (
              <span
                key={`${index}-${paused ? 'p' : 'r'}`}
                className="film-dot-bar"
                style={{ animationDuration: `${ms}ms` }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: PostCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={post.title}
      className="group block"
    >
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
    <Link
      href={`/companies/${company.slug}`}
      aria-label={copy.name}
      className="film-frame relative block aspect-3/4 overflow-hidden bg-navy md:aspect-video"
    >
      <ResponsiveCover
        mobile={company.cover.mobile}
        desktop={company.cover.desktop}
        sizes="(max-width: 768px) 90vw, 80vw"
        priority={i === 0}
      />
    </Link>
  );
}

// eslint-disable-next-line complexity -- The paired carousels share visibility, focus, and motion state.
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
        <div className="section-copy min-[1440px]:ps-12.5">
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
        className="mx-auto mt-10 w-full max-w-[2560px]"
        onPointerEnter={() => setHot('work')}
        onPointerLeave={() => setHot((v) => (v === 'work' ? null : v))}
        onFocusCapture={() => setHot('work')}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHot(null);
        }}
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
          labels={COMPANIES.map((company) => companyText(company, locale).name)}
          index={workIdx}
          ms={WORK_MS}
          paused={paused || hot === 'work' || reduce}
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
            onFocusCapture={() => setHot('blog')}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setHot(null);
            }}
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
                      <BlogCard post={post} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="flex gap-[8px] overflow-hidden px-[8px]">
                {posts.map((post) => (
                  <div key={post.slug} className="w-88 shrink-0">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <FilmDots
            labels={posts.map((post) => post.title)}
            index={blogIdx}
            ms={BLOG_MS}
            paused={paused || hot === 'blog' || reduce}
            live={!!blogApi && !reduce}
            onPick={pickBlog}
          />
        </div>
      ) : null}
    </section>
  );
}
