import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'fr'
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
