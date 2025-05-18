import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
  
  // Locales
  i18n: {
    locales: ['default', 'fr', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
};

export default nextConfig;
