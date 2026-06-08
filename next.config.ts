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
};

export default nextConfig;
