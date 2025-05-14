import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,

  experimental: {
    appDir: true, // ← Ajout ici pour être explicite (facultatif si déjà activé par défaut)
  },

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
    defaultLocale: "fr"
  }
};

export default nextConfig;
