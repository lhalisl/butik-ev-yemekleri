import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow all relative /public images (default) + no external domains needed
    unoptimized: false,
  },
  // iyzipay does dynamic require() of its resource files at runtime, which the
  // bundler can't statically analyze. Keep it external so it loads from
  // node_modules on the server.
  serverExternalPackages: ['iyzipay'],
  // ...and force Vercel's file tracing to include the whole iyzipay package
  // (incl. lib/resources, which it reads via fs at runtime) in the payment
  // serverless functions — otherwise: ENOENT scandir .../iyzipay/lib/resources.
  outputFileTracingIncludes: {
    '/api/payment/**': ['./node_modules/iyzipay/**'],
  },
};

export default nextConfig;
