// next.config.mjs

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
  serverExternalPackages: ['better-sqlite3', 'sqlite3'], 

  // ✅ ИСПРАВЛЕНИЕ: Явное разрешение алиасов через Webpack с использованием ESM-синтаксиса
  webpack: (config, { isServer }) => {
    // Импорт нативных модулей Node.js через require внутри webpack
    const path = require('path'); 
    
    // Добавляем алиас, указывающий @/ на корень проекта
    // path.resolve(__dirname, '.') указывает на корень, где лежит next.config.mjs
    config.resolve.alias['@'] = path.resolve(__dirname, '.'); 

    return config;
  },
};

export default nextConfig;
