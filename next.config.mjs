// next.config.js

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 💡 CORRECTED KEY FOR APP ROUTER 
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  }, 
  // END CORRECTED KEY
  webpack: (config, { isServer }) => {
    // Получаем __dirname в ESM
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Настройка алиаса (Ensure this path is correct if you use '@' aliases)
    config.resolve.alias = {
      ...config.resolve.alias,
      // You should resolve to the 'src' or 'root' directory where you define '@'
      '@': resolve(__dirname, './src'), // Example if your source code is in 'src'
    };

    return config;
  },
};

export default nextConfig;
