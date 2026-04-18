/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // F2-JARVIS UI lit des fichiers du repo (studio/, marketing/, etc.)
  // via API routes Next.js côté serveur.
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Dark mode par défaut (F2 style)
  // tailwind config gère darkMode: 'class'
};

export default nextConfig;
