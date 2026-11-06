import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/legacy-redirects";

const isDev = process.env.NODE_ENV !== "production";

// Pola keamanan diadopsi dari proyek Talenta Juara, disesuaikan untuk kebutuhan Kreativa
// (embed YouTube video profil sekolah; tanpa analytics pihak ketiga sampai ID-nya tersedia).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "media-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://www.google.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Hanya gambar lokal di /images yang dioptimasi; tidak ada sumber remote.
    localPatterns: [{ pathname: "/images/**" }],
    formats: ["image/avif", "image/webp"],
  },
  // Slash di akhir URL dinormalkan oleh src/proxy.ts dalam satu redirect (bukan 308 bawaan lalu 301/307 lagi).
  skipTrailingSlashRedirect: true,
  experimental: {
    // 404 global untuk URL yang tidak cocok dengan rute mana pun (root layout ada di app/[locale]).
    globalNotFound: true,
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
      {
        source: "/brochures/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
