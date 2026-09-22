'use client';

import { fontClassName } from '@/lib/fonts';

import './globals.css';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" dir="ltr" className={fontClassName}>
      <body>
        <main className="relative wrap flex min-h-screen flex-col items-center justify-center py-24 text-center">
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_35%,rgba(140,58,43,0.1),transparent_65%)]"
            aria-hidden="true"
          />
          <span className="mb-8 block h-px w-16 bg-accent" aria-hidden="true" />
          <h1 className="page-title">Something went wrong</h1>
          <p className="mt-5 max-w-copy text-[1.05rem] text-muted-foreground">
            An unexpected error occurred. Try again, or reach us directly.
          </p>
          <button type="button" onClick={reset} className="btn btn-solid mt-12">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
