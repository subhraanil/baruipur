/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Deterministic Build ID to prevent universal HTML hash churn across untouched pages
  generateBuildId: async () => {
    if (process.env.NEXT_BUILD_ID) {
      return process.env.NEXT_BUILD_ID;
    }
    if (process.env.GITHUB_SHA) {
      return `b-${process.env.GITHUB_SHA.slice(0, 8)}`;
    }
    return 'baruipur-static-v1';
  },
};

export default nextConfig;
