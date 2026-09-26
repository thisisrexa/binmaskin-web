import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import type { PostCard } from '@/lib/blog-meta';

import { Eyebrow } from '@/components/sections/eyebrow';
import { Link } from '@/i18n/navigation';
import { getPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return pageMetadata({
    locale,
    path: '/blog',
    title: t('title'),
    description: t('lead'),
  });
}

function num(n: number) {
  return String(n).padStart(2, '0');
}

function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8h11M9.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getPosts(locale);
  const featured = posts[0];
  const sides = posts.slice(1, 4);
  const rest = posts.slice(4);

  return (
    <main className="wrap py-12 pb-20 md:py-20">
      <div className="flex flex-col items-center border-b border-border pb-10 text-center">
        <Eyebrow className="after:h-px after:w-9 after:shrink-0 after:bg-accent/60 after:content-['']">
          {t('eyebrow')}
        </Eyebrow>
        <h1 className="page-title">{t('title')}</h1>
        <p className="mt-4 max-w-copy text-[1.125rem] text-muted-foreground">
          {t('lead')}
        </p>
        <p className="mt-5 text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
          {t('notes', { count: posts.length })}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-stretch">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block min-w-0 lg:pe-2"
          >
            <div className="relative aspect-3/4 overflow-hidden bg-navy">
              <Image
                src={featured.coverMobile}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Link>

          <div className="pt-4 lg:col-start-1 lg:row-start-2 lg:pe-2">
            <PortraitCopy
              n={1}
              post={featured}
              locale={locale}
              read={t('read')}
            />
          </div>

          {sides.length > 0 ? (
            <div className="mt-10 flex flex-col gap-10 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-full lg:min-h-0 lg:gap-2">
              {sides.map((post, i) => (
                <SidePost
                  key={post.slug}
                  post={post}
                  n={i + 2}
                  locale={locale}
                  read={t('read')}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-12 grid gap-x-2 gap-y-10 border-t border-border pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-3/4 overflow-hidden bg-navy">
                  <Image
                    src={post.coverMobile}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3">
                  <PortraitCopy n={i + 5} post={post} locale={locale} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}

function PortraitCopy({
  n,
  post,
  locale,
  read,
}: {
  n: number;
  post: PostCard;
  locale: string;
  read?: string;
}) {
  return (
    <>
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-[0.95rem] text-accent italic">
          {num(n)}
        </span>
        <time
          className="text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case"
          dateTime={post.date}
        >
          {formatDate(post.date, locale)}
        </time>
      </div>
      <h2 className="mt-2 text-[1.35rem]! leading-tight! font-normal!">
        {read ? (
          <Link href={`/blog/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        ) : (
          post.title
        )}
      </h2>
      <p className="mt-2 line-clamp-3 text-[0.95rem] leading-snug text-muted-foreground">
        {post.excerpt}
      </p>
      {read ? (
        <Link
          href={`/blog/${post.slug}`}
          className="mt-3 inline-flex items-center gap-2 text-[0.9rem] text-accent"
        >
          {read}
          <Arrow />
        </Link>
      ) : null}
    </>
  );
}

function SidePost({
  post,
  n,
  locale,
  read,
}: {
  post: PostCard;
  n: number;
  locale: string;
  read: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-h-0 flex-col gap-3 lg:grid lg:flex-1 lg:grid-cols-[minmax(0,1.11fr)_minmax(0,1fr)] lg:items-stretch lg:gap-2 lg:overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-navy lg:aspect-auto lg:h-full">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 28vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 lg:h-full lg:min-h-0 lg:justify-center lg:overflow-hidden lg:py-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif text-[1.05rem] text-accent italic">
            {num(n)}
          </span>
          <time
            className="text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case"
            dateTime={post.date}
          >
            {formatDate(post.date, locale)}
          </time>
        </div>
        <h3 className="line-clamp-2 text-[1.35rem]! leading-[1.2]! lg:text-[1.55rem]! lg:leading-[1.15]!">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[0.95rem] leading-snug text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 text-[0.9rem] text-accent">
          {read}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
