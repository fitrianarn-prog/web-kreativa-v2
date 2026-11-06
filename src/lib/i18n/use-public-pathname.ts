import { usePathname } from "next/navigation";
import { defaultLocale } from "./config";

/**
 * Pathname seperti yang terlihat di browser. Halaman bahasa default di-rewrite oleh src/proxy.ts
 * (/about → /en/about), sehingga saat render server usePathname() bisa mengembalikan /en/about
 * sedangkan di browser /about. Prefiks /en dibuang agar server & klien sama (mencegah hydration mismatch).
 */
export function usePublicPathname(): string {
  const pathname = usePathname() ?? "/";
  const prefix = `/${defaultLocale}`;
  if (pathname === prefix) return "/";
  return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}
