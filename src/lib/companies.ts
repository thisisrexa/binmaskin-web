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
  cover: CompanyCover;
  en: CompanyCopy;
  ar: CompanyCopy;
}

const RAW = [
  {
    slug: 'bin-maskin-solutions',
    mark: 'Solutions',
    en: {
      name: 'Bin Maskin Solutions',
      summary:
        'Delivering integrated technology, digital infrastructure, software, and IT solutions for modern businesses.',
      body: 'Delivering integrated technology, digital infrastructure, software, and IT solutions for modern businesses.',
    },
    ar: {
      name: 'Bin Maskin Solutions',
      summary:
        'تقديم تقنية متكاملة وبنية تحتية رقمية وبرمجيات وحلول تقنية معلومات للأعمال الحديثة.',
      body: 'تقديم تقنية متكاملة وبنية تحتية رقمية وبرمجيات وحلول تقنية معلومات للأعمال الحديثة.',
    },
  },
  {
    slug: 'time-out',
    mark: 'Time Out',
    en: {
      name: 'Time Out',
      summary:
        'A fashion and apparel trading brand focused on contemporary clothing, quality products, and everyday style.',
      body: 'A fashion and apparel trading brand focused on contemporary clothing, quality products, and everyday style.',
    },
    ar: {
      name: 'Time Out',
      summary:
        'علامة لتجارة الأزياء والملابس، تركز على الملابس العصرية والمنتجات عالية الجودة والأناقة اليومية.',
      body: 'علامة لتجارة الأزياء والملابس، تركز على الملابس العصرية والمنتجات عالية الجودة والأناقة اليومية.',
    },
  },
  {
    slug: 'dar-al-hulul',
    mark: 'Dar Al Hulul',
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
    slug: 'operith',
    mark: 'Operith',
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
    slug: 'bin-maskin-real-estate',
    mark: 'Real Estate',
    en: {
      name: 'Bin Maskin Real Estate',
      summary:
        'Focused on real estate opportunities, property development, and long-term value across residential and commercial markets.',
      body: 'Focused on real estate opportunities, property development, and long-term value across residential and commercial markets.',
    },
    ar: {
      name: 'Bin Maskin Real Estate',
      summary:
        'تركز على فرص العقارات والتطوير العقاري والقيمة طويلة الأمد في الأسواق السكنية والتجارية.',
      body: 'تركز على فرص العقارات والتطوير العقاري والقيمة طويلة الأمد في الأسواق السكنية والتجارية.',
    },
  },
  {
    slug: 'bin-maskin-construction',
    mark: 'Construction',
    en: {
      name: 'Bin Maskin Construction',
      summary:
        'Delivering reliable construction solutions with a focus on quality, execution, and modern building standards.',
      body: 'Delivering reliable construction solutions with a focus on quality, execution, and modern building standards.',
    },
    ar: {
      name: 'Bin Maskin Construction',
      summary:
        'تقديم حلول إنشاء موثوقة مع التركيز على الجودة والتنفيذ ومعايير البناء الحديثة.',
      body: 'تقديم حلول إنشاء موثوقة مع التركيز على الجودة والتنفيذ ومعايير البناء الحديثة.',
    },
  },
  {
    slug: 'bin-maskin-building-materials',
    mark: 'Materials',
    en: {
      name: 'Bin Maskin Building Materials',
      summary:
        'Supplying essential construction and building materials for residential, commercial, and industrial projects.',
      body: 'Supplying essential construction and building materials for residential, commercial, and industrial projects.',
    },
    ar: {
      name: 'Bin Maskin Building Materials',
      summary:
        'توريد مواد البناء والإنشاء الأساسية للمشاريع السكنية والتجارية والصناعية.',
      body: 'توريد مواد البناء والإنشاء الأساسية للمشاريع السكنية والتجارية والصناعية.',
    },
  },
  {
    slug: 'bin-maskin-solar',
    mark: 'Solar',
    en: {
      name: 'Bin Maskin Solar',
      summary:
        'Providing modern solar and renewable energy solutions designed for efficient and sustainable development.',
      body: 'Providing modern solar and renewable energy solutions designed for efficient and sustainable development.',
    },
    ar: {
      name: 'Bin Maskin Solar',
      summary:
        'تقديم حلول طاقة شمسية ومتجددة حديثة، مصممة لتنمية كفؤة ومستدامة.',
      body: 'تقديم حلول طاقة شمسية ومتجددة حديثة، مصممة لتنمية كفؤة ومستدامة.',
    },
  },
  {
    slug: 'prime-advanced-general-trading',
    mark: 'Trading',
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

export const COMPANIES: Company[] = RAW.map((company) => ({
  ...company,
  cover: {
    mobile: `/work/${company.slug}-mobile.png`,
    desktop: `/work/${company.slug}-desktop.png`,
  },
}));

export function companyText(company: Company, locale: string) {
  return locale === 'ar' ? company.ar : company.en;
}
