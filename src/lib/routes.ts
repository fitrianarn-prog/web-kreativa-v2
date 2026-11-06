import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import electives from "@/content/shared/electives.json";

/**
 * Slug halaman sama untuk kedua bahasa (/about ↔ /id/about; bahasa Inggris tanpa prefiks), sehingga
 * pengalih bahasa cukup menambah/membuang prefiks /id. ID anchor (#faq, #fees, …) juga sama di kedua bahasa.
 */
export const pagePaths = [
  "/",
  "/about",
  "/schools/kindergarten",
  "/schools/primary",
  "/schools/secondary",
  "/schools/high-school",
  "/schools/high-school/subjects",
  "/admission",
  "/career",
  "/contact",
] as const;

export const subjectPath = (slug: string) => `/schools/high-school/subjects/${slug}`;

/** Semua path yang dirender (untuk sitemap). */
export function allPaths(): string[] {
  return [...pagePaths, ...electives.subjects.map((s) => subjectPath(s.slug))];
}

/** `/about` + `en` → `/about`; `/about` + `id` → `/id/about`; `/` + `id` → `/id`. Hash/anchor dipertahankan. */
export function localeHref(locale: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  const [base, hash] = path.split("#");
  const clean = base === "/" || base === "" ? "" : base;
  const href = locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
  return `${href}${hash ? `#${hash}` : ""}`;
}

/** Ganti bahasa pada pathname yang sedang dibuka (pathname browser: `/about` atau `/id/about`). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const first = pathname.split("/")[1] ?? "";
  const rest = hasLocale(first) ? pathname.slice(first.length + 1) || "/" : pathname || "/";
  return localeHref(target, rest);
}
