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
  serverExternalPackages: ['better-sqlite3'],
  webpack: (config, { isServer }) => {
    // Получаем __dirname в ESM
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Настройка алиаса
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname), // вместо '.' используем реальный путь
    };

    return config;
  },
};

export default nextConfig;
