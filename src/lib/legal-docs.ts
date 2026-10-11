import fs from 'node:fs';
import path from 'node:path';

import type { LegalId } from '@/components/legal/legal-page';

export const LEGAL_DOCS = ['privacy', 'terms', 'cookies', 'security'] as const;

export function isLegalDoc(value: string): value is LegalId {
  return (LEGAL_DOCS as readonly string[]).includes(value);
}

export function legalContent(locale: string, id: LegalId) {
  const file = path.join(process.cwd(), 'content/legal', locale, `${id}.md`);
  const body = fs.readFileSync(file, 'utf8');
  const title = /^# (.+)$/m.exec(body)?.[1] ?? '';
  const description =
    body.split(/\r?\n\r?\n/).find((block) => !block.startsWith('#')) ?? '';
  return { body, title, description };
}
