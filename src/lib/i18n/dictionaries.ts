import type { Locale } from "./config";
import en from "@/content/en/common.json";
import id from "@/content/id/common.json";

/** Bentuk kamus diturunkan dari versi EN; versi ID wajib punya struktur yang sama (dicek oleh TypeScript). */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, id };

/** Dipakai di Server Components. Komponen klien menerima potongan kamus lewat props. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type LevelId = keyof Dictionary["levels"];
export const levelIds: LevelId[] = ["kindergarten", "primary", "secondary", "high-school"];
