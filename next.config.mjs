// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // УСТАРЕВШИЙ IMPORT В ESM С Next.js 15 БОЛЬШЕ НЕ НУЖЕН:
  // import { fileURLToPath } from 'url';
  // import { dirname, resolve } from 'path';
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ИСПРАВЛЕНИЕ 1: Перенос ключа для Next.js 15 (устраняет предупреждение)
  // Мы предполагаем, что вы используете 'bcryptjs', а не нативный 'bcrypt'
  serverExternalPackages: ['better-sqlite3', 'sqlite3'], 

  // ИСПРАВЛЕНИЕ 2: Секция Webpack удалена, 
  // так как ручная настройка алиасов в Next.js 15 часто конфликтует
  // (Это должно устранить ошибку "Module not found: Can't resolve '@/...'" )
  
  // Если ошибка "Module not found" сохранится, 
  // вам нужно проверить файл tsconfig.json (см. ниже).
};

export default nextConfig;
