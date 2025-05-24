// /** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     serverActions: false,
//   },
// };

// module.exports = withBundleAnalyzer(nextConfig);
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  eslint: {
    // Ignores lint errors during production build (OK for CI, but fix lints in dev)
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize images automatically with Next.js
  images: {
    unoptimized: false, // 🔄 Turned off manual mode
    formats: ['image/webp'], // Enable WebP conversion
    minimumCacheTTL: 60, // Cache optimized images
    domains: ['yourdomain.com'], // Add your domain here
  },

  experimental: {
    serverActions: false, // Disable for now unless using App Router
    // Optional: Enable scroll restoration if using App Router
    scrollRestoration: true,
  },

  // ✅ Modern performance features
  reactStrictMode: true, // Helps catch issues early
  swcMinify: true, // Uses Next.js's native JS compiler
  compress: true, // Enables gzip compression

  // ✅ Advanced optimization for bundle splitting
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },

  // ✅ Internationalization if needed
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = withBundleAnalyzer(nextConfig);
