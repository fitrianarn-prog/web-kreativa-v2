import type { Locale } from "./i18n/config";
import homeEn from "@/content/en/home.json";
import homeId from "@/content/id/home.json";
import blocksEn from "@/content/en/blocks.json";
import blocksId from "@/content/id/blocks.json";
import aboutEn from "@/content/en/about.json";
import aboutId from "@/content/id/about.json";
import kgEn from "@/content/en/kindergarten.json";
import kgId from "@/content/id/kindergarten.json";
import primaryEn from "@/content/en/primary.json";
import primaryId from "@/content/id/primary.json";
import secondaryEn from "@/content/en/secondary.json";
import secondaryId from "@/content/id/secondary.json";
import hsEn from "@/content/en/high-school.json";
import hsId from "@/content/id/high-school.json";
import subjectsEn from "@/content/en/subjects.json";
import subjectsId from "@/content/id/subjects.json";
import admissionEn from "@/content/en/admission.json";
import admissionId from "@/content/id/admission.json";
import careerEn from "@/content/en/career.json";
import careerId from "@/content/id/career.json";
import contactEn from "@/content/en/contact.json";
import contactId from "@/content/id/contact.json";

/** Konten Beranda: kedua bahasa lengkap. */
export type HomeContent = typeof homeEn;
const home: Record<Locale, HomeContent> = { en: homeEn, id: homeId };
export function getHomeContent(locale: Locale): HomeContent {
  return home[locale];
}

/** Bagian yang memakai teks EN di halaman /id diberi lang="en" (fallback yang disetujui pemilik proyek). */
export type FallbackLang = "en" | undefined;
export type Section<T> = T & { lang: FallbackLang };

/**
 * Konten halaman dengan fallback per section. File EN adalah acuan struktur; file ID boleh tidak memuat
 * section yang belum punya terjemahan resmi (TypeScript memastikan section yang ada berstruktur sama).
 */
function defineContent<T extends Record<string, unknown>>(en: T, id: Partial<T>) {
  return (locale: Locale) => {
    const source: Partial<T> = locale === "id" ? id : en;
    return function section<K extends keyof T>(key: K): Section<T[K]> {
      const own = source[key];
      if (own !== undefined) return { ...(own as object), lang: undefined } as Section<T[K]>;
      return { ...(en[key] as object), lang: locale === "en" ? undefined : "en" } as Section<T[K]>;
    };
  };
}

export const blocksContent = defineContent(blocksEn, blocksId);
export const aboutContent = defineContent(aboutEn, aboutId);
export const kindergartenContent = defineContent(kgEn, kgId);
export const primaryContent = defineContent(primaryEn, primaryId);
export const secondaryContent = defineContent(secondaryEn, secondaryId);
export const highSchoolContent = defineContent(hsEn, hsId);
export const subjectsContent = defineContent(subjectsEn, subjectsId);
export const admissionContent = defineContent(admissionEn, admissionId);
export const careerContent = defineContent(careerEn, careerId);
export const contactContent = defineContent(contactEn, contactId);

/** Ganti placeholder {kunci} di teks konten. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}
