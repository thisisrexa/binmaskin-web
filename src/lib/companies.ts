import type { StaticImageData } from 'next/image';

import { galleryImage } from '@/lib/gallery-images';
import { workCover } from '@/lib/work-covers';

export interface CompanyCopy {
  name: string;
  summary: string;
}

export interface GalleryFrame {
  src: StaticImageData;
  altEn: string;
  altAr: string;
  fit?: 'contain' | 'cover';
  position?: string;
  plan?: { src: StaticImageData; altEn: string; altAr: string };
}

export interface Company {
  slug: string;
  mark: string;
  cover: { mobile: StaticImageData; desktop: StaticImageData };
  frames: [GalleryFrame, GalleryFrame, GalleryFrame];
  en: CompanyCopy;
  ar: CompanyCopy;
}

function frame(
  group: string,
  file: string,
  ...[altEn, altAr, fit, position, plan]: [
    string,
    string,
    ('contain' | 'cover')?,
    string?,
    [string, string, string]?,
  ]
): GalleryFrame {
  return {
    src: galleryImage(group, file),
    altEn,
    altAr,
    ...(fit ? { fit } : {}),
    ...(position ? { position } : {}),
    ...(plan
      ? {
          plan: {
            src: galleryImage(group, plan[0]),
            altEn: plan[1],
            altAr: plan[2],
          },
        }
      : {}),
  };
}

const RAW = [
  {
    slug: 'bin-maskin-solutions',
    mark: 'Solutions',
    en: {
      name: 'BinMaskin Solutions',
      summary:
        'Delivering integrated technology, digital infrastructure, software, and IT solutions for modern businesses.',
    },
    ar: {
      name: 'بن مسكين للحلول',
      summary:
        'تقديم تقنية متكاملة وبنية تحتية رقمية وبرمجيات وحلول تقنية معلومات للأعمال الحديثة.',
    },
    frames: [
      frame(
        'bin-maskin-solutions',
        '01-sesderma.png',
        'Sesderma system presentation',
        'عرض نظام Sesderma',
      ),
      frame(
        'bin-maskin-solutions',
        '02-shell.png',
        'Shell website design presentation',
        'عرض تصميم موقع Shell',
      ),
      frame(
        'bin-maskin-solutions',
        '03-ai-apps.png',
        'AI applications in development',
        'تطبيقات ذكاء اصطناعي قيد التطوير',
      ),
    ],
  },
  {
    slug: 'operith',
    mark: 'Operith',
    en: {
      name: 'Operith',
      summary:
        'An intelligent operations platform built to simplify workflows, automate processes, and improve business efficiency.',
    },
    ar: {
      name: 'أوبريث',
      summary:
        'منصة عمليات ذكية بُنيت لتبسيط سير العمل وأتمتة العمليات ورفع كفاءة الأعمال.',
    },
    frames: [
      frame(
        'operith',
        '01-brand.png',
        'Operith brand presentation',
        'عرض شعار Operith',
        'contain',
      ),
      frame(
        'operith',
        '02-product-flow.png',
        'Blurred Operith development preview',
        'معاينة مموهة لـ Operith قيد التطوير',
        'contain',
      ),
      frame(
        'operith',
        '03-ops-layer.png',
        'Blurred Operith development preview',
        'معاينة مموهة لـ Operith قيد التطوير',
        'contain',
      ),
    ],
  },
  {
    slug: 'dar-al-hulul',
    mark: 'Dar Al Hulul',
    en: {
      name: 'Dar Al Hulul',
      summary:
        'A digital marketplace designed to connect products, services, and customers through a smarter discovery experience.',
    },
    ar: {
      name: 'دار الحلول',
      summary:
        'سوق رقمي صُمم لربط المنتجات والخدمات والعملاء عبر تجربة اكتشاف أذكى.',
    },
    frames: [
      frame(
        'dar-al-hulul',
        '01-brand.png',
        'Dar Al Hulul brand presentation',
        'عرض شعار دار الحلول',
        'contain',
      ),
      frame(
        'dar-al-hulul',
        '02-experience.png',
        'Blurred Dar Al Hulul development preview',
        'معاينة مموهة لدار الحلول قيد التطوير',
        'contain',
      ),
      frame(
        'dar-al-hulul',
        '03-home-living.png',
        'Blurred Dar Al Hulul development preview',
        'معاينة مموهة لدار الحلول قيد التطوير',
        'contain',
      ),
    ],
  },
  {
    slug: 'bin-maskin-construction',
    mark: 'Construction',
    en: {
      name: 'BinMaskin Construction',
      summary:
        'Delivering reliable construction solutions with a focus on quality, execution, and modern building standards.',
    },
    ar: {
      name: 'بن مسكين للمقاولات',
      summary:
        'تقديم حلول إنشاء موثوقة مع التركيز على الجودة والتنفيذ ومعايير البناء الحديثة.',
    },
    frames: [
      frame(
        'bin-maskin-construction',
        '01-villa-render.png',
        'Architectural rendering of a villa',
        'تصور معماري لفيلا',
        'contain',
        undefined,
        ['01-villa-plan.png', 'Villa plan', 'مخطط الفيلا'],
      ),
      frame(
        'bin-maskin-construction',
        '02-warehouse-render.png',
        'Architectural rendering of a warehouse',
        'تصور معماري لمستودع',
        'contain',
        undefined,
        ['02-warehouse-plan.png', 'Warehouse plan', 'مخطط المستودع'],
      ),
      frame(
        'bin-maskin-construction',
        '03-courtyard-render.png',
        'Architectural concept with an internal courtyard',
        'تصور معماري بفناء داخلي',
        'contain',
        undefined,
        ['03-concept-plan.png', 'Concept plan', 'مخطط تصوري'],
      ),
    ],
  },
  {
    slug: 'deserv-international-group',
    mark: 'DeServ',
    en: {
      name: 'DeServ International Group',
      summary:
        'Engine components and spare parts for marine and power-generation operations.',
    },
    ar: {
      name: 'مجموعة دي سيرف الدولية',
      summary:
        'مكونات وقطع غيار للمحركات المستخدمة في العمليات البحرية وتوليد الطاقة.',
    },
    frames: [
      frame(
        'deserv-international-group',
        '01-pistons-and-rings.png',
        'Pistons and piston rings',
        'مكابس وحلقات مكابس',
        'cover',
      ),
      frame(
        'deserv-international-group',
        '02-pistons.png',
        'Precision pistons',
        'مكابس دقيقة',
        'cover',
      ),
      frame(
        'deserv-international-group',
        '03-piston-rings.png',
        'Piston rings',
        'حلقات المكابس',
        'cover',
      ),
    ],
  },
  {
    slug: 'deserv-technology',
    mark: 'Technologies',
    en: {
      name: 'DeServ Technologies',
      summary:
        'Engine overhaul, turbocharger repair and component reconditioning for marine and power-generation equipment.',
    },
    ar: {
      name: 'دي سيرف للتقنيات',
      summary:
        'عمرة المحركات وإصلاح الشواحن التوربينية وتجديد المكونات للمعدات البحرية ومعدات توليد الطاقة.',
    },
    frames: [
      frame(
        'deserv-technology',
        '01-workshop-machinery.png',
        'Workshop machinery',
        'معدات الورشة',
        'cover',
      ),
      frame(
        'deserv-technology',
        '02-welding.png',
        'Welding in the workshop',
        'اللحام في الورشة',
        'cover',
      ),
      frame(
        'deserv-technology',
        '03-workshop-welding.png',
        'Industrial workshop welding',
        'لحام الورشة الصناعية',
        'cover',
      ),
    ],
  },
  {
    slug: 'bin-maskin-real-estate',
    mark: 'Real Estate',
    en: {
      name: 'BinMaskin Real Estate',
      summary:
        'Focused on real estate opportunities, property development, and long-term value across residential and commercial markets.',
    },
    ar: {
      name: 'بن مسكين للعقارات',
      summary:
        'تركز على فرص العقارات والتطوير العقاري والقيمة طويلة الأمد في الأسواق السكنية والتجارية.',
    },
    frames: [
      frame(
        'bin-maskin-real-estate',
        '01-residential-exterior.png',
        'Residential exterior illustration',
        'صورة توضيحية لواجهة سكنية',
      ),
      frame(
        'bin-maskin-real-estate',
        '02-residential-interior.png',
        'Residential interior illustration',
        'صورة توضيحية لمساحة سكنية داخلية',
      ),
      frame(
        'bin-maskin-real-estate',
        '03-commercial.png',
        'Commercial space illustration',
        'صورة توضيحية لمساحة تجارية',
      ),
    ],
  },
  {
    slug: 'bin-maskin-energy',
    mark: 'Energy',
    en: {
      name: 'BinMaskin Energy',
      summary: 'Inventing and developing innovative energy solutions.',
    },
    ar: {
      name: 'بن مسكين للطاقة',
      summary: 'ابتكار وتطوير حلول جديدة للطاقة.',
    },
    frames: [
      frame(
        'bin-maskin-energy',
        '01-solar.png',
        'Solar integration illustration',
        'صورة توضيحية لتكامل الطاقة الشمسية',
      ),
      frame(
        'bin-maskin-energy',
        '02-innovation-lab.png',
        'Energy innovation illustration',
        'صورة توضيحية لابتكار الطاقة',
      ),
      frame(
        'bin-maskin-energy',
        '03-green-systems.png',
        'Green energy systems illustration',
        'صورة توضيحية لأنظمة الطاقة الخضراء',
      ),
    ],
  },
  {
    slug: 'prime-advanced-general-trading',
    mark: 'Trading',
    en: {
      name: 'Prime Advanced General Trading',
      summary:
        'Exhibition stands and event solutions that turn a brief into a clear physical presence.',
    },
    ar: {
      name: 'برايم أدفانسد للتجارة العامة',
      summary:
        'أجنحة معارض وحلول فعاليات تحوّل متطلبات العمل إلى حضور ملموس وواضح.',
    },
    frames: [
      frame(
        'prime-advanced-general-trading',
        '01-taogent.png',
        'Taogent exhibition stand',
        'جناح معرض Taogent',
      ),
      frame(
        'prime-advanced-general-trading',
        '02-nihao-china.png',
        'Nihao China exhibition stand',
        'جناح معرض Nihao China',
      ),
      frame(
        'prime-advanced-general-trading',
        '03-mtek-copper.png',
        'MTek Copper exhibition stand',
        'جناح معرض MTek Copper',
      ),
    ],
  },
] as const;

export const COMPANIES: Company[] = RAW.map((item) => ({
  ...item,
  cover: {
    mobile: workCover(item.slug, 'mobile'),
    desktop: workCover(item.slug, 'desktop'),
  },
  frames: [...item.frames] as [GalleryFrame, GalleryFrame, GalleryFrame],
}));

export function companyText(company: Company, locale: string) {
  return locale === 'ar' ? company.ar : company.en;
}
