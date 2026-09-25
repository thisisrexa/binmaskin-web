import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { ResponsiveCover } from '@/components/ui/responsive-cover';
import { Link } from '@/i18n/navigation';
import { getPosts } from '@/lib/blog';
import { coverFrame } from '@/lib/blog-meta';
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getPosts(locale);

  return (
    <main className="wrap py-16 pb-24 md:py-24">
      <h1 className="page-title max-w-copy">{t('title')}</h1>
      <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
        {t('lead')}
      </p>
      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div
                className={`relative overflow-hidden bg-navy ${coverFrame()}`}
              >
                <ResponsiveCover
                  mobile={post.coverMobile}
                  desktop={post.cover}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <time
                className="mt-4 block text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case"
                dateTime={post.date}
              >
                {formatDate(post.date, locale)}
              </time>
              <h2 className="card-title mt-2">{post.title}</h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
