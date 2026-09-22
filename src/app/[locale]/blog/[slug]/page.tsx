import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { Link } from '@/i18n/navigation';
import { getPost, getPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getPosts('en').map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <main className="wrap py-16 pb-24 md:py-24">
      <Link
        href="/blog"
        className="text-[11px] tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case"
      >
        {t('back')}
      </Link>
      <h1 className="page-title mt-4 max-w-copy">{post.title}</h1>
      <time
        className="mt-4 block text-[12px] tracking-[0.12em] text-faint uppercase ar:tracking-normal ar:normal-case"
        dateTime={post.date}
      >
        {formatDate(post.date, locale)}
      </time>
      <div className="relative mt-10 aspect-video overflow-hidden">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 1760px) 100vw, 1760px"
          className="object-cover"
        />
      </div>
      <article className="blog-md mt-10">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </article>
    </main>
  );
}
