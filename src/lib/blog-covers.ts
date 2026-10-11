import type { StaticImageData } from 'next/image';

import img0 from '@/assets/blog/building-for-what-comes-next/desktop.png';
import img1 from '@/assets/blog/building-for-what-comes-next/mobile.png';
import img2 from '@/assets/blog/energy-belongs-in-the-plan/desktop.png';
import img3 from '@/assets/blog/energy-belongs-in-the-plan/mobile.png';
import img4 from '@/assets/blog/from-material-to-structure/desktop.png';
import img5 from '@/assets/blog/from-material-to-structure/mobile.png';
import img6 from '@/assets/blog/one-reply-one-desk/desktop.png';
import img7 from '@/assets/blog/one-reply-one-desk/mobile.png';
import img8 from '@/assets/blog/quality-is-a-site-habit/desktop.png';
import img9 from '@/assets/blog/quality-is-a-site-habit/mobile.png';
import img10 from '@/assets/blog/sample.png';
import img11 from '@/assets/blog/smarter-operations-less-friction/desktop.png';
import img12 from '@/assets/blog/smarter-operations-less-friction/mobile.png';
import img13 from '@/assets/blog/the-new-language-of-modern-real-estate/desktop.png';
import img14 from '@/assets/blog/the-new-language-of-modern-real-estate/mobile.png';

export const BLOG_COVERS: Record<string, StaticImageData> = {
  'building-for-what-comes-next/desktop.png': img0,
  'building-for-what-comes-next/mobile.png': img1,
  'energy-belongs-in-the-plan/desktop.png': img2,
  'energy-belongs-in-the-plan/mobile.png': img3,
  'from-material-to-structure/desktop.png': img4,
  'from-material-to-structure/mobile.png': img5,
  'one-reply-one-desk/desktop.png': img6,
  'one-reply-one-desk/mobile.png': img7,
  'quality-is-a-site-habit/desktop.png': img8,
  'quality-is-a-site-habit/mobile.png': img9,
  'sample.png': img10,
  'smarter-operations-less-friction/desktop.png': img11,
  'smarter-operations-less-friction/mobile.png': img12,
  'the-new-language-of-modern-real-estate/desktop.png': img13,
  'the-new-language-of-modern-real-estate/mobile.png': img14,
};

export function blogCover(name: string): StaticImageData {
  const key = name.startsWith('/') ? name.slice(1) : name;

  if (!Object.hasOwn(BLOG_COVERS, key)) {
    throw new Error(`blog cover missing: ${key}`);
  }

  return BLOG_COVERS[key];
}
