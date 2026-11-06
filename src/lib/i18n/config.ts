export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

/** Bahasa default: URL-nya tanpa prefiks (`/`, `/about`); bahasa lain memakai prefiks (`/id/about`). */
export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeMeta: Record<Locale, { label: string; short: string; ogLocale: string }> = {
  en: { label: "English", short: "EN", ogLocale: "en_US" },
  id: { label: "Bahasa Indonesia", short: "ID", ogLocale: "id_ID" },
};

/**
 * Nilai yang punya versi per bahasa. `id: null` berarti terjemahan resmi belum ada:
 * halaman /id menampilkan teks EN (dengan atribut lang="en") dan item dicatat di CONTENT_REVIEW.md.
 */
export type Localized<T> = { en: T; id: T | null };

export function localize<T>(value: Localized<T>, locale: Locale): { value: T; lang: Locale; isFallback: boolean } {
  if (locale === "id" && value.id !== null && value.id !== undefined) {
    return { value: value.id, lang: "id", isFallback: false };
  }
  return { value: value.en, lang: "en", isFallback: locale !== "en" };
}
