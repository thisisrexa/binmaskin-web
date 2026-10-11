import type { StaticImageData } from 'next/image';

import w0 from '@/assets/work/bin-maskin-construction/desktop.png';
import w1 from '@/assets/work/bin-maskin-construction/mobile.png';
import w2 from '@/assets/work/bin-maskin-energy/desktop.png';
import w3 from '@/assets/work/bin-maskin-energy/mobile.png';
import w4 from '@/assets/work/bin-maskin-real-estate/desktop.png';
import w5 from '@/assets/work/bin-maskin-real-estate/mobile.png';
import w6 from '@/assets/work/bin-maskin-solutions/desktop.png';
import w7 from '@/assets/work/bin-maskin-solutions/mobile.png';
import w8 from '@/assets/work/dar-al-hulul/desktop.png';
import w9 from '@/assets/work/dar-al-hulul/mobile.png';
import w10 from '@/assets/work/deserv-international-group/desktop.png';
import w11 from '@/assets/work/deserv-international-group/mobile.png';
import w12 from '@/assets/work/deserv-technology/desktop.png';
import w13 from '@/assets/work/deserv-technology/mobile.png';
import w14 from '@/assets/work/operith/desktop.png';
import w15 from '@/assets/work/operith/mobile.png';
import w16 from '@/assets/work/prime-advanced-general-trading/desktop.png';
import w17 from '@/assets/work/prime-advanced-general-trading/mobile.png';

const WORK: Record<string, StaticImageData> = {
  'bin-maskin-construction/desktop.png': w0,
  'bin-maskin-construction/mobile.png': w1,
  'bin-maskin-energy/desktop.png': w2,
  'bin-maskin-energy/mobile.png': w3,
  'bin-maskin-real-estate/desktop.png': w4,
  'bin-maskin-real-estate/mobile.png': w5,
  'bin-maskin-solutions/desktop.png': w6,
  'bin-maskin-solutions/mobile.png': w7,
  'dar-al-hulul/desktop.png': w8,
  'dar-al-hulul/mobile.png': w9,
  'deserv-international-group/desktop.png': w10,
  'deserv-international-group/mobile.png': w11,
  'deserv-technology/desktop.png': w12,
  'deserv-technology/mobile.png': w13,
  'operith/desktop.png': w14,
  'operith/mobile.png': w15,
  'prime-advanced-general-trading/desktop.png': w16,
  'prime-advanced-general-trading/mobile.png': w17,
};

export function workCover(
  slug: string,
  kind: 'desktop' | 'mobile',
): StaticImageData {
  const file = `${slug}/${kind}.png`;

  if (!Object.hasOwn(WORK, file)) {
    throw new Error(`work cover missing: ${file}`);
  }

  return WORK[file];
}
