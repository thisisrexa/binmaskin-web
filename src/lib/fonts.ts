import {
  Amiri,
  IBM_Plex_Sans_Arabic,
  Newsreader,
  Outfit,
} from 'next/font/google';

export const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const ibmAr = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-ar',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontClassName = `${outfit.variable} ${newsreader.variable} ${ibmAr.variable} ${amiri.variable}`;
