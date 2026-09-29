import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Eyebrow } from '@/components/sections/eyebrow';
import { StaggerText } from '@/components/ui/stagger-text';
import { Link } from '@/i18n/navigation';
import { getPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getPosts(locale);
  const featured = posts[0];
  const sides = posts.slice(1);

  return (
    <main className="wrap py-12 pb-20 md:py-20">
      <div className="flex flex-col items-center border-b border-border pb-10 text-center">
        <Eyebrow className="after:h-px after:w-9 after:shrink-0 after:bg-accent/60 after:content-['']">
          {t('eyebrow')}
        </Eyebrow>
        <h1 className="page-title">
          <StaggerText>{t('title')}</StaggerText>
        </h1>
        <p className="mt-4 max-w-copy text-[1.125rem] text-muted-foreground">
          {t('lead')}
        </p>
        <p className="mt-5 text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
          {t('notes', { count: posts.length })}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-2 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-stretch">
          <Link
            href={`/blog/${featured.slug}`}
            aria-label={featured.title}
            className="group block min-h-0 min-w-0"
          >
            <div className="relative aspect-3/4 overflow-hidden bg-navy">
              <Image
                src={featured.coverMobile}
                alt=""
                fill
                priority
                quality={100}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Link>

          {sides.length > 0 ? (
            <div className="grid min-h-0 grid-cols-1 gap-2 lg:h-full lg:grid-cols-2 lg:grid-rows-3">
              {sides.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                  className="group block h-full min-h-0 max-lg:h-auto"
                >
                  <div className="relative aspect-video h-full min-h-0 overflow-hidden bg-navy lg:aspect-auto">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
