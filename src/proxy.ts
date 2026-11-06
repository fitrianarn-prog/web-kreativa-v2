import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/lib/i18n/config";

/**
 * Bahasa Inggris (default) tanpa prefiks; Bahasa Indonesia di bawah /id.
 *   /            → rewrite internal ke /en (URL di browser tetap "/")
 *   /about       → rewrite internal ke /en/about
 *   /id/about    → diteruskan apa adanya
 *   /en/about    → 308 ke /about (URL lama ber-prefiks /en dibuang prefiksnya)
 *   /about/      → 308 ke /about (slash di akhir dibuang)
 * URL lama WordPress sudah ditangani lebih dulu oleh redirects() di next.config.ts.
 */
export function proxy(request: NextRequest) {
  // Pakai URL mentah: NextURL bisa menambahkan kembali slash di akhir saat diformat (→ loop redirect).
  const target = new URL(request.url);
  const raw = target.pathname;
  let pathname = raw.length > 1 && raw.endsWith("/") ? raw.replace(/\/+$/, "") || "/" : raw;
  const first = pathname.split("/")[1] ?? "";

  // Prefiks bahasa default dibuang → satu hop bersama normalisasi slash.
  if (first === defaultLocale) pathname = pathname.slice(defaultLocale.length + 1) || "/";

  if (pathname !== raw) {
    target.pathname = pathname;
    return NextResponse.redirect(target, 308);
  }
  if (first === "id") return;

  target.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(target);
}

export const config = {
  // Lewati aset internal Next, API, dan file statis (apa pun yang berekstensi, mis. sitemap.xml, .webp, .pdf).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
