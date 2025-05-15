
import type {NextConfig} from 'next';

// Configuration for GitHub Pages deployment
const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === "true";
// Ensures GITHUB_REPOSITORY is defined and is a string before trying to split it.
const REPO_NAME = typeof process.env.GITHUB_REPOSITORY === 'string' ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';

const nextConfig: NextConfig = {
  output: 'export', // Required for static export for GitHub Pages
  
  // basePath should be /<repository-name> for project pages on GitHub Pages
  // or empty for user/org pages (e.g., username.github.io) or local development.
  basePath: IS_GITHUB_PAGES && REPO_NAME ? `/${REPO_NAME}` : '',
  
  // assetPrefix should be similar to basePath for assets (CSS, JS, images) to load correctly.
  assetPrefix: IS_GITHUB_PAGES && REPO_NAME ? `/${REPO_NAME}/` : '',

  images: {
    unoptimized: true, // Required for next/image to work with static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
