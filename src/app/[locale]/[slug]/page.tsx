import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';

import {
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
} from '@/components/card/icons';
import { ShareCard } from '@/components/card/share-card';
import { WallpaperLink } from '@/components/card/wallpaper-link';
import { LegalPage } from '@/components/legal/legal-page';
import { BrandMark } from '@/components/layout/brand-mark';
import { isLegalDoc, LEGAL_DOCS } from '@/lib/legal-docs';
import { getPerson, PEOPLE, personText } from '@/lib/people';
import { localePath, pageMetadata, SITE } from '@/lib/seo';

export function generateStaticParams() {
  return [
    ...LEGAL_DOCS.map((slug) => ({ slug })),
    ...PEOPLE.map((person) => ({ slug: person.username })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (isLegalDoc(slug)) {
    const tl = await getTranslations({ locale, namespace: 'legal' });
    const tm = await getTranslations({ locale, namespace: 'meta' });
    return pageMetadata({
      locale,
      path: `/${slug}`,
      title: tl(slug),
      description: tm(`${slug}Desc`),
    });
  }

  const person = getPerson(slug);
  if (!person) return {};
  const copy = personText(person, locale);
  return pageMetadata({
    locale,
    path: `/${slug}`,
    title: person.displayName,
    description: copy.role,
  });
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (isLegalDoc(slug)) {
    return <LegalPage id={slug} />;
  }

  const person = getPerson(slug);
  if (!person) notFound();

  const copy = personText(person, locale);
  const t = await getTranslations({ locale, namespace: 'card' });
  const url = `${SITE}${localePath(locale, `/${person.username}`)}`;
  const qr = (
    await QRCode.toString(url, {
      type: 'svg',
      margin: 1,
      errorCorrectionLevel: 'H',
      color: { dark: '#111C2D', light: '#00000000' },
    })
  ).replace('<svg ', '<svg class="h-full w-full" ');

  return (
    <main className="wrap py-10 md:py-16">
      <article className="mx-auto flex w-full max-w-105 flex-col gap-5 border border-border bg-background p-5 sm:p-6">
        <header className="flex items-center justify-between gap-4">
          <BrandMark className="h-[18px] w-auto max-w-38" />
          <span className="text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
            {t('badge')}
          </span>
        </header>

        <div>
          <p className="text-[11px] tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case">
            {person.org}
          </p>
          <h1 className="mt-2 font-serif text-[3.25rem] leading-none font-normal">
            {person.displayName}
          </h1>
          <p className="mt-2 text-[1.05rem]">{copy.role}</p>
          <p className="mt-1.5 text-[0.95rem] text-muted-foreground">
            {copy.note}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={localePath(locale, `/${person.username}/vcard`)}
            download={`${person.username}.vcf`}
            className="btn btn-solid"
          >
            {t('save')}
          </a>
          <ShareCard
            url={url}
            title={person.displayName}
            label={t('share')}
            copied={t('copied')}
          />
        </div>

        <nav className="grid gap-2 grid-cols-4" aria-label={t('links')}>
          <Tile
            href={`mailto:${person.email}`}
            label={t('email')}
            icon={<MailIcon className="size-5" />}
          />
          <Tile
            href={person.linkedin}
            label={t('linkedin')}
            icon={<LinkedinIcon className="size-5" />}
            external
          />
          <Tile
            href={person.website}
            label={t('website')}
            icon={<GlobeIcon className="size-5" />}
            external
          />
          <Tile
            href={person.telegram}
            label={t('telegram')}
            icon={<TelegramIcon className="size-5" />}
            external
          />
        </nav>

        <section className="flex items-center gap-5 border border-border p-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t('scan')}
            </p>
            <p className="mt-2 font-serif text-xl leading-snug">
              {t('qrTitle')}
            </p>
          </div>
          <div className="relative size-24 shrink-0">
            <div dangerouslySetInnerHTML={{ __html: qr }} />
            <span className="absolute inset-0 m-auto flex size-7 items-center justify-center bg-background">
              <BrandMark variant="symbol" className="size-5" />
            </span>
          </div>
        </section>

        <WallpaperLink base={person.wallpaperBase} label={t('wallpaperSave')} />

        <footer className="flex items-center justify-between gap-4 border-t border-border pt-4 text-[11px] tracking-[0.14em] text-faint uppercase ar:tracking-normal ar:normal-case">
          <span>{copy.place}</span>
          <a href={person.website} className="hover:text-accent">
            {person.website.replace(/^https?:\/\//, '')}
          </a>
        </footer>
      </article>
    </main>
  );
}

function Tile({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex aspect-square flex-col items-center justify-center gap-3 border border-border p-2 text-center transition-colors hover:bg-cream-2"
    >
      <span className="text-accent">{icon}</span>
      <span className="text-[10px] leading-tight tracking-[0.06em] uppercase ar:tracking-normal ar:normal-case">
        {label}
      </span>
    </a>
  );
}
