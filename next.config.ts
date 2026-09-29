import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/:locale(en|ar)/card/:username',
        destination: '/:locale/:username',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/card/:username/vcard',
        destination: '/:locale/:username/vcard',
        permanent: true,
      },
      {
        source: '/card/:username',
        destination: '/en/:username',
        permanent: true,
      },
      {
        source: '/card/:username/vcard',
        destination: '/en/:username/vcard',
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 100],
    // TODO: add trusted domains for images (CDN)
  },
};

export default withNextIntl(nextConfig);
