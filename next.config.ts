import type { NextConfig } from 'next';

// The site is served from the root of whetstone-dev.github.io, so there is no basePath.
// Each skill keeps its own site under a sub-path of the same domain (e.g. /network-engineering/).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;
