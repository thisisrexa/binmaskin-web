import type { StaticImageData } from 'next/image';

import g0 from '@/assets/companies/bin-maskin-construction/01-villa-plan.png';
import g1 from '@/assets/companies/bin-maskin-construction/01-villa-render.png';
import g2 from '@/assets/companies/bin-maskin-construction/02-warehouse-plan.png';
import g3 from '@/assets/companies/bin-maskin-construction/02-warehouse-render.png';
import g4 from '@/assets/companies/bin-maskin-construction/03-concept-plan.png';
import g5 from '@/assets/companies/bin-maskin-construction/03-courtyard-render.png';
import g6 from '@/assets/companies/bin-maskin-energy/01-solar.png';
import g7 from '@/assets/companies/bin-maskin-energy/02-innovation-lab.png';
import g8 from '@/assets/companies/bin-maskin-energy/03-green-systems.png';
import g9 from '@/assets/companies/bin-maskin-real-estate/01-residential-exterior.png';
import g10 from '@/assets/companies/bin-maskin-real-estate/02-residential-interior.png';
import g11 from '@/assets/companies/bin-maskin-real-estate/03-commercial.png';
import g12 from '@/assets/companies/bin-maskin-solutions/01-sesderma.png';
import g13 from '@/assets/companies/bin-maskin-solutions/02-shell.png';
import g14 from '@/assets/companies/bin-maskin-solutions/03-ai-apps.png';
import g15 from '@/assets/companies/dar-al-hulul/01-brand.png';
import g16 from '@/assets/companies/dar-al-hulul/02-experience.png';
import g17 from '@/assets/companies/dar-al-hulul/03-home-living.png';
import g18 from '@/assets/companies/deserv-international-group/01-pistons-and-rings.png';
import g19 from '@/assets/companies/deserv-international-group/02-pistons.png';
import g20 from '@/assets/companies/deserv-international-group/03-piston-rings.png';
import g21 from '@/assets/companies/deserv-technology/01-workshop-machinery.png';
import g22 from '@/assets/companies/deserv-technology/02-welding.png';
import g23 from '@/assets/companies/deserv-technology/03-workshop-welding.png';
import g24 from '@/assets/companies/operith/01-brand.png';
import g25 from '@/assets/companies/operith/02-product-flow.png';
import g26 from '@/assets/companies/operith/03-ops-layer.png';
import g27 from '@/assets/companies/prime-advanced-general-trading/01-taogent.png';
import g28 from '@/assets/companies/prime-advanced-general-trading/02-nihao-china.png';
import g29 from '@/assets/companies/prime-advanced-general-trading/03-mtek-copper.png';

export const GALLERY: Record<string, StaticImageData> = {
  'bin-maskin-construction/01-villa-plan.png': g0,
  'bin-maskin-construction/01-villa-render.png': g1,
  'bin-maskin-construction/02-warehouse-plan.png': g2,
  'bin-maskin-construction/02-warehouse-render.png': g3,
  'bin-maskin-construction/03-concept-plan.png': g4,
  'bin-maskin-construction/03-courtyard-render.png': g5,
  'bin-maskin-energy/01-solar.png': g6,
  'bin-maskin-energy/02-innovation-lab.png': g7,
  'bin-maskin-energy/03-green-systems.png': g8,
  'bin-maskin-real-estate/01-residential-exterior.png': g9,
  'bin-maskin-real-estate/02-residential-interior.png': g10,
  'bin-maskin-real-estate/03-commercial.png': g11,
  'bin-maskin-solutions/01-sesderma.png': g12,
  'bin-maskin-solutions/02-shell.png': g13,
  'bin-maskin-solutions/03-ai-apps.png': g14,
  'dar-al-hulul/01-brand.png': g15,
  'dar-al-hulul/02-experience.png': g16,
  'dar-al-hulul/03-home-living.png': g17,
  'deserv-international-group/01-pistons-and-rings.png': g18,
  'deserv-international-group/02-pistons.png': g19,
  'deserv-international-group/03-piston-rings.png': g20,
  'deserv-technology/01-workshop-machinery.png': g21,
  'deserv-technology/02-welding.png': g22,
  'deserv-technology/03-workshop-welding.png': g23,
  'operith/01-brand.png': g24,
  'operith/02-product-flow.png': g25,
  'operith/03-ops-layer.png': g26,
  'prime-advanced-general-trading/01-taogent.png': g27,
  'prime-advanced-general-trading/02-nihao-china.png': g28,
  'prime-advanced-general-trading/03-mtek-copper.png': g29,
};

export function galleryImage(slug: string, file: string): StaticImageData {
  const key = `${slug}/${file}`;

  if (!Object.hasOwn(GALLERY, key)) {
    throw new Error(`gallery image missing: ${key}`);
  }

  return GALLERY[key];
}
