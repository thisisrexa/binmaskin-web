export const NAV = [
  { id: 'companies', kind: 'section' },
  { id: 'about', kind: 'section' },
  { id: 'work', kind: 'section' },
  { id: 'blog', kind: 'page', href: '/blog' },
  { id: 'contact', kind: 'section' },
] as const;

export type NavItem = (typeof NAV)[number];
