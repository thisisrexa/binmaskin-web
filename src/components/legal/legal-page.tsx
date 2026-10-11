import type { ReactNode } from 'react';

import ReactMarkdown from 'react-markdown';

import { legalContent } from '@/lib/legal-docs';

export type LegalId = 'cookies' | 'privacy' | 'security' | 'terms';

const CONTACT_RE = /(info@binmaskin\.solutions|\+971 55 612 0279)/;

function wrapContacts(text: string): ReactNode[] {
  return text.split(CONTACT_RE).map((part) =>
    part === 'info@binmaskin.solutions' || part === '+971 55 612 0279' ? (
      <bdi key={part} dir="ltr">
        {part}
      </bdi>
    ) : (
      part
    ),
  );
}

function contactDirection(children: ReactNode): ReactNode {
  if (typeof children === 'string') return wrapContacts(children);
  if (Array.isArray(children)) {
    return children.flatMap((child) =>
      typeof child === 'string' ? wrapContacts(child) : child,
    );
  }

  return children;
}

export function LegalPage({ id, locale }: { id: LegalId; locale: string }) {
  const { body } = legalContent(locale, id);

  return (
    <main className="wrap py-16 pb-24 md:py-24">
      <article className="mx-auto max-w-5xl">
        <div className="legal-body">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p>{contactDirection(children)}</p>,
              li: ({ children }) => <li>{contactDirection(children)}</li>,
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
