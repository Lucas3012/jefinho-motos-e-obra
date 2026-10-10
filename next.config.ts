import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantém o site 100% dinâmico (Render = servidor Node, dados vem do Supabase)
  reactStrictMode: true,
};

export default nextConfig;
