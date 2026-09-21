export const NAV_SECTIONS = ["businesses", "about", "work", "contact"] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
