import { fontClassName } from '@/lib/fonts';

import './globals.css';

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr" className={fontClassName}>
      <body>
        <main className="relative wrap flex min-h-screen flex-col items-center justify-center py-24 text-center">
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_35%,rgba(138,122,92,0.12),transparent_65%)]"
            aria-hidden="true"
          />
          <p
            className="font-serif text-[clamp(6rem,18vw,12rem)] leading-none text-accent/25 select-none"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="page-title mt-2">Page not found</h1>
          <p className="mt-5 max-w-copy text-[1.05rem] text-muted-foreground">
            The page you asked for does not exist or has moved.
          </p>
          {/* plain <a>: no locale context above the root layout */}
          <a href="/en" className="btn btn-solid mt-12">
            Back to home
          </a>
        </main>
      </body>
    </html>
  );
}
