# Binmaskin Solutions

Marketing site for [Salem Binmaskin Solutions](https://binmaskin.solutions) — a
Dubai technology firm covering digital presence, infrastructure, security, and
bespoke software.

English and Arabic. Next.js App Router, Tailwind CSS 4, next-intl.

## Stack

- Next.js 16 (App Router, `proxy.ts` for locale routing)
- React 19
- Tailwind CSS 4
- next-intl (`/en`, `/ar`)
- shadcn/ui (Sheet, Select, Carousel)
- [Vengeance UI](https://www.vengenceui.com/) Light Lines on the desktop hero
  (CSS-driven)

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Locale prefix is always on,
so you land on `/en` or `/ar`.

```bash
pnpm build
pnpm start
pnpm lint
```

## Content and brand

Copy lives in `messages/en.json` and `messages/ar.json`. Company facts (legal
names, licence, chamber, phone, email) live in `src/lib/company.ts` and match
the Binmaskin brand pack:

|               |                           |
| ------------- | ------------------------- |
| Legal (EN)    | SALEM BINMASKIN SOLUTIONS |
| Legal (AR)    | سالم بن مسكين للحلول      |
| Trade licence | 1395363                   |
| Dubai Chamber | 552755                    |
| Email         | info@binmaskin.solutions  |
| Phone         | +971 50 231 6702          |

Brand tokens: navy `#111C2D`, gold `#8A7A5C`, ivory `#F7F4EF`. Type: Fraunces +
Outfit (Latin), Amiri + IBM Plex Sans Arabic (Arabic) via `next/font`.

Logos, favicons, OG image, and PWA icons are under `public/brand`,
`public/icons`, and `src/app` (`icon.svg`, `apple-icon.png`, `favicon.ico`).

## Routes

| Path                         |                |
| ---------------------------- | -------------- |
| `/en`, `/ar`                 | Home           |
| `/en/privacy`, `/ar/privacy` | Privacy policy |
| `/en/terms`, `/ar/terms`     | Terms of use   |
| `/en/cookies`, `/ar/cookies` | Cookie notice  |

Legal pages use the same header and footer as the rest of the site.

## Notes

- Hero Light Lines are hidden below the `md` breakpoint and when
  `prefers-reduced-motion` is set.
- Simple motion (reveal, hero stagger, scroll progress) is CSS. The work
  carousel is the remaining client island that needs Embla.
- VAT is not charged in the current brand stationery; no TRN is shown.

## Deploy

Vercel is the expected host. Set the production domain to `binmaskin.solutions`
so `metadataBase` and Open Graph URLs resolve correctly.
