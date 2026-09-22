import { useTranslations } from 'next-intl';

export type LegalId = 'cookies' | 'privacy' | 'security' | 'terms';

export function LegalPage({ id }: { id: LegalId }) {
  const tl = useTranslations('legal');
  const tb = useTranslations(id);

  return (
    <main className="wrap py-16 pb-24 md:py-24">
      <article className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)]">{tl(id)}</h1>
        <p className="mb-12 text-[12px] text-faint">{tl('updated')}</p>
        <div
          className="legal-body"
          dangerouslySetInnerHTML={{ __html: tb.raw('body') as string }}
        />
      </article>
    </main>
  );
}
