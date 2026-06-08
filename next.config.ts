import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow all relative /public images (default) + no external domains needed
    unoptimized: false,
  },
};

export default nextConfig;
