import type { LegalId } from '@/components/legal/legal-page';

export const LEGAL_DOCS = ['privacy', 'terms', 'cookies', 'security'] as const;

export function isLegalDoc(value: string): value is LegalId {
  return (LEGAL_DOCS as readonly string[]).includes(value);
}
