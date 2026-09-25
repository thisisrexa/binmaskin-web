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
      <article className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="text-[11px] tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case"
        >
          {t('back')}
        </Link>
        <div className="prose mt-8 max-w-none prose-headings:font-normal prose-headings:text-navy prose-p:text-soft prose-li:text-soft prose-strong:text-navy prose-a:text-accent">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <>
                  <h1>{children}</h1>
                  <time
                    className="mt-4 mb-8 block text-[12px] text-faint not-prose"
                    dateTime={post.date}
                  >
                    {formatDate(post.date, locale)}
                  </time>
                  <div
                    className={`not-prose relative mb-10 overflow-hidden ${coverFrame()}`}
                  >
                    <ResponsiveCover
                      mobile={post.coverMobile}
                      desktop={post.cover}
                      sizes="(max-width: 1024px) 100vw, 64rem"
                    />
                  </div>
                </>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
