import type { StaticImageData } from 'next/image';

export interface PostCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: StaticImageData;
  coverMobile: StaticImageData;
}

export type Post = PostCard & { body: string };

export function coverFrame() {
  return 'aspect-3/4 md:aspect-video';
}

if (coverFrame() !== 'aspect-3/4 md:aspect-video') {
  throw new Error('blog: cover frame broke');
}
