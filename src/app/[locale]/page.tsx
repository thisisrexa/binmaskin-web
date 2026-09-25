import { getLocale } from 'next-intl/server';

import { About } from '@/components/sections/about';
import { Companies } from '@/components/sections/companies';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { WorkCarousel } from '@/components/sections/work-carousel';
import { getPosts } from '@/lib/blog';

export default async function HomePage() {
  const locale = await getLocale();
  const posts = getPosts(locale).map(
    ({ slug, title, date, excerpt, cover, coverMobile }) => ({
      slug,
      title,
      date,
      excerpt,
      cover,
      coverMobile,
    }),
  );

  return (
    <main>
      <Hero />
      <Companies />
      <About />
      <WorkCarousel posts={posts} />
      <Contact />
    </main>
  );
}
