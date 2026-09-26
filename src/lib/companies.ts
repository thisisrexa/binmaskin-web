export interface CompanyCopy {
  name: string;
  summary: string;
  body: string;
}

export interface CompanyCover {
  mobile: string;
  desktop: string;
}

export interface Company {
  slug: string;
  mark: string;
  cover: CompanyCover | null;
  en: CompanyCopy;
  ar: CompanyCopy;
}

const RAW: {
  slug: string;
  mark: string;
  /** ponytail: false = navy fallback. Set true after public/work/{slug}-mobile.png and -desktop.png exist. */
  cover: boolean;
  en: CompanyCopy;
  ar: CompanyCopy;
}[] = [
  {
    slug: 'bin-maskin-solutions',
    mark: 'Solutions',
    cover: true,
    en: {
      name: 'BinMaskin Solutions',
      summary:
        'Delivering integrated technology, digital infrastructure, software, and IT solutions for modern businesses.',
      body: 'Delivering integrated technology, digital infrastructure, software, and IT solutions for modern businesses.',
    },
    ar: {
      name: 'BinMaskin Solutions',
      summary:
        'تقديم تقنية متكاملة وبنية تحتية رقمية وبرمجيات وحلول تقنية معلومات للأعمال الحديثة.',
      body: 'تقديم تقنية متكاملة وبنية تحتية رقمية وبرمجيات وحلول تقنية معلومات للأعمال الحديثة.',
    },
  },
  {
    slug: 'operith',
    mark: 'Operith',
    cover: true,
    en: {
      name: 'Operith',
      summary:
        'An intelligent operations platform built to simplify workflows, automate processes, and improve business efficiency.',
      body: 'An intelligent operations platform built to simplify workflows, automate processes, and improve business efficiency.',
    },
    ar: {
      name: 'Operith',
      summary:
        'منصة عمليات ذكية بُنيت لتبسيط سير العمل وأتمتة العمليات ورفع كفاءة الأعمال.',
      body: 'منصة عمليات ذكية بُنيت لتبسيط سير العمل وأتمتة العمليات ورفع كفاءة الأعمال.',
    },
  },
  {
    slug: 'dar-al-hulul',
    mark: 'Dar Al Hulul',
    cover: true,
    en: {
      name: 'Dar Al Hulul',
      summary:
        'A digital marketplace designed to connect products, services, and customers through a smarter discovery experience.',
      body: 'A digital marketplace designed to connect products, services, and customers through a smarter discovery experience.',
    },
    ar: {
      name: 'Dar Al Hulul',
      summary:
        'سوق رقمي صُمم لربط المنتجات والخدمات والعملاء عبر تجربة اكتشاف أذكى.',
      body: 'سوق رقمي صُمم لربط المنتجات والخدمات والعملاء عبر تجربة اكتشاف أذكى.',
    },
  },
  {
    slug: 'bin-maskin-construction',
    mark: 'Construction',
    cover: true,
    en: {
      name: 'BinMaskin Construction',
      summary:
        'Delivering reliable construction solutions with a focus on quality, execution, and modern building standards.',
      body: 'Delivering reliable construction solutions with a focus on quality, execution, and modern building standards.',
    },
    ar: {
      name: 'BinMaskin Construction',
      summary:
        'تقديم حلول إنشاء موثوقة مع التركيز على الجودة والتنفيذ ومعايير البناء الحديثة.',
      body: 'تقديم حلول إنشاء موثوقة مع التركيز على الجودة والتنفيذ ومعايير البناء الحديثة.',
    },
  },
  {
    slug: 'deserv-international-group',
    mark: 'DeServ',
    cover: true,
    en: {
      name: 'DeServ International Group',
      summary:
        'An international group coordinating services and commercial activity across markets.',
      body: 'An international group coordinating services and commercial activity across markets.',
    },
    ar: {
      name: 'DeServ International Group',
      summary: 'مجموعة دولية تنسّق الخدمات والنشاط التجاري عبر الأسواق.',
      body: 'مجموعة دولية تنسّق الخدمات والنشاط التجاري عبر الأسواق.',
    },
  },
  {
    slug: 'deserv-technology',
    mark: 'Technology',
    cover: true,
    en: {
      name: 'DeServ Technology',
      summary:
        'Technology services for organisations that need reliable systems, support, and clear digital delivery.',
      body: 'Technology services for organisations that need reliable systems, support, and clear digital delivery.',
    },
    ar: {
      name: 'DeServ Technology',
      summary:
        'خدمات تقنية للمؤسسات التي تحتاج أنظمة موثوقة ودعماً وتسليماً رقمياً واضحاً.',
      body: 'خدمات تقنية للمؤسسات التي تحتاج أنظمة موثوقة ودعماً وتسليماً رقمياً واضحاً.',
    },
  },
  {
    slug: 'bin-maskin-real-estate',
    mark: 'Real Estate',
    cover: true,
    en: {
      name: 'BinMaskin Real Estate',
      summary:
        'Focused on real estate opportunities, property development, and long-term value across residential and commercial markets.',
      body: 'Focused on real estate opportunities, property development, and long-term value across residential and commercial markets.',
    },
    ar: {
      name: 'BinMaskin Real Estate',
      summary:
        'تركز على فرص العقارات والتطوير العقاري والقيمة طويلة الأمد في الأسواق السكنية والتجارية.',
      body: 'تركز على فرص العقارات والتطوير العقاري والقيمة طويلة الأمد في الأسواق السكنية والتجارية.',
    },
  },
  {
    slug: 'bin-maskin-energy',
    mark: 'Energy',
    cover: true,
    en: {
      name: 'BinMaskin Energy',
      summary:
        'Energy solutions for buildings and operations, planned for efficiency and a dependable supply.',
      body: 'Energy solutions for buildings and operations, planned for efficiency and a dependable supply.',
    },
    ar: {
      name: 'BinMaskin Energy',
      summary:
        'حلول طاقة للمباني والعمليات، تُخطَّط للكفاءة واستمرارية الإمداد.',
      body: 'حلول طاقة للمباني والعمليات، تُخطَّط للكفاءة واستمرارية الإمداد.',
    },
  },
  {
    slug: 'prime-advanced-general-trading',
    mark: 'Trading',
    cover: true,
    en: {
      name: 'Prime Advanced General Trading',
      summary:
        'A diversified trading company connecting businesses with products, materials, and commercial opportunities across multiple sectors.',
      body: 'A diversified trading company connecting businesses with products, materials, and commercial opportunities across multiple sectors.',
    },
    ar: {
      name: 'Prime Advanced General Trading',
      summary:
        'شركة تجارة متنوعة تربط الأعمال بالمنتجات والمواد والفرص التجارية عبر قطاعات متعددة.',
      body: 'شركة تجارة متنوعة تربط الأعمال بالمنتجات والمواد والفرص التجارية عبر قطاعات متعددة.',
    },
  },
];

export const COMPANIES: Company[] = RAW.map(({ cover, ...company }) => ({
  ...company,
  cover: cover
    ? {
        mobile: `/work/${company.slug}-mobile.png`,
        desktop: `/work/${company.slug}-desktop.png`,
      }
    : null,
}));

export function companyText(company: Company, locale: string) {
  return locale === 'ar' ? company.ar : company.en;
}
