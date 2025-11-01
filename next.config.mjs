import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // не блокирует билд при ошибках линтера
    ignoreDuringBuilds: true,
  },
  typescript: {
    // не блокирует билд при ошибках типов
    ignoreBuildErrors: true,
  },
  images: {
    // отключает оптимизацию изображений (ускоряет деплой на Render)
    unoptimized: true,
  },
  serverExternalPackages: ["better-sqlite3"],
  webpack: (config) => {
    // абсолютный alias для импорта через "@/"
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    }

    // возвращаем конфиг, чтобы Next мог использовать alias
    return config
  },
}

export default nextConfig
