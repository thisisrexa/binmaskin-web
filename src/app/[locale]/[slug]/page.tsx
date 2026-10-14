import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';

import { ShareCard } from '@/components/card/share-card';
import { WallpaperLink } from '@/components/card/wallpaper-link';
import { GlobeIcon } from '@/components/icons/globe';
import { InstagramIcon } from '@/components/icons/instagram';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { MailIcon } from '@/components/icons/mail';
import { TelegramIcon } from '@/components/icons/telegram';
import { WhatsAppIcon } from '@/components/icons/whatsapp';
import { BrandMark } from '@/components/layout/brand-mark';
import { LegalPage } from '@/components/legal/legal-page';
import { isLegalDoc, LEGAL_DOCS, legalContent } from '@/lib/legal-docs';
import { getPerson, PEOPLE, personText, type Person } from '@/lib/people';
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
    const { title, description } = legalContent(locale, slug);
    return pageMetadata({
      locale,
      path: `/${slug}`,
      title,
      description,
    });
  }

  const person = getPerson(slug);
  if (!person) return {};
  const copy = personText(person, locale);
  return pageMetadata({
    locale,
    path: `/${slug}`,
    title: copy.name,
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
    return <LegalPage id={slug} locale={locale} />;
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

  const tiles = cardTiles(person, t);

  return (
    <main className="wrap py-10 md:py-16">
      <article
        className={`mx-auto flex w-full flex-col gap-5 border border-border bg-background p-5 sm:p-6 ${person.username === 'salem' ? 'max-w-124' : 'max-w-105'}`}
      >
        <header className="flex items-center justify-between gap-4">
          <BrandMark className="h-[18px] w-auto max-w-38" />
          <span className="text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
            {t('badge')}
          </span>
        </header>

        <div>
          <p className="text-[11px] tracking-[0.16em] text-accent uppercase ar:tracking-normal ar:normal-case">
            {copy.org}
          </p>
          <h1 className="mt-2 font-serif text-[3.25rem] leading-none font-normal">
            {copy.name}
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
            title={copy.name}
            label={t('share')}
            copied={t('copied')}
          />
        </div>

        <nav
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))`,
          }}
          aria-label={t('links')}
        >
          {tiles.map((tile) => (
            <Tile key={tile.label} {...tile} />
          ))}
        </nav>

        <section className="flex items-center gap-5 border border-border p-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t('scan')}
            </p>
            <p className="mt-2 font-serif text-xl/snug">{t('qrTitle')}</p>
          </div>
          <div className="relative size-24 shrink-0">
            <div dangerouslySetInnerHTML={{ __html: qr }} />
            <span className="absolute inset-0 m-auto flex size-7 items-center justify-center bg-background">
              <BrandMark variant="symbol" className="size-5" />
            </span>
          </div>
        </section>

        {person.wallpaperBase ? (
          <WallpaperLink
            base={person.wallpaperBase}
            label={t('wallpaperSave')}
          />
        ) : null}

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

function cardTiles(
  person: Person,
  t: (key: string) => string,
): { href: string; label: string; icon: React.ReactNode; external?: boolean }[] {
  const icon = 'size-5';
  return [
    {
      href: `mailto:${person.email}`,
      label: t('email'),
      icon: <MailIcon className={icon} />,
    },
    {
      href: person.linkedin,
      label: t('linkedin'),
      icon: <LinkedInIcon className={icon} />,
      external: true,
    },
    {
      href: person.website,
      label: t('website'),
      icon: <GlobeIcon className={icon} />,
      external: true,
    },
    ...(person.whatsapp
      ? [
          {
            href: person.whatsapp,
            label: t('whatsapp'),
            icon: <WhatsAppIcon className={icon} />,
            external: true,
          },
        ]
      : []),
    ...(person.instagram
      ? [
          {
            href: person.instagram,
            label: t('instagram'),
            icon: <InstagramIcon className={icon} />,
            external: true,
          },
        ]
      : []),
    ...(person.telegram
      ? [
          {
            href: person.telegram,
            label: t('telegram'),
            icon: <TelegramIcon className={icon} />,
            external: true,
          },
        ]
      : []),
  ];
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
