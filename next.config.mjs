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
  // 💡 ЭКСПЕРИМЕНТАЛЬНЫЙ КЛЮЧ ДЛЯ ВНЕШНИХ ПАКЕТОВ В APP ROUTER
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3', 'sqlite3', 'bcrypt'],
  },
  webpack: (config, { isServer }) => {
    // Получаем __dirname в ESM
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Настройка алиаса @
    config.resolve.alias = {
      ...config.resolve.alias,
      // ВНИМАНИЕ: Убедитесь, что 'src' — это ваша корневая папка для кода
      '@': resolve(__dirname, './src'), 
    };

    return config;
  },
};

export default nextConfig;
