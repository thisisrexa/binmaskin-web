import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { ResponsiveCover } from '@/components/ui/responsive-cover';
import { Link } from '@/i18n/navigation';
import { getPost, getPosts } from '@/lib/blog';
import { coverFrame } from '@/lib/blog-meta';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import StaggerText from '@/components/ui/stagger-text';

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
    <main className="wrap py-12 pb-24 md:py-24">
      <article className="mx-auto max-w-5xl">
        <div className="flex justify-between items-baseline mb-6">
          <Link
            href="/blog"
            className="text-xs tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case"
          >
            {t('back')}
          </Link>
          <time className="block text-xs text-faint" dateTime={post.date}>
            {formatDate(post.date, locale)}
          </time>
        </div>
        <h1 className="text-3xl! lg:text-5xl!">{post.title}</h1>
        <div className={`relative mt-8 mb-10 overflow-hidden ${coverFrame()}`}>
          <ResponsiveCover
            mobile={post.coverMobile}
            desktop={post.cover}
            sizes="(max-width: 1024px) 100vw, 64rem"
            priority
          />
        </div>
        <div className="prose max-w-none prose-headings:font-normal prose-headings:text-navy prose-p:text-soft prose-a:text-accent prose-strong:text-navy prose-li:text-soft">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
