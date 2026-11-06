import data from "@/content/shared/achievements.json";
import type { Locale } from "./i18n/config";

export type AchievementCategory = "academic" | "olympiad" | "english" | "sports" | "arts" | "other";

/** Satu prestasi terverifikasi. Teks yang perlu diterjemahkan memakai { en, id }. */
export type Achievement = {
  id: string;
  category: AchievementCategory;
  /** Nama kompetisi, mis. "SASMO 2026". */
  competition: Record<Locale, string>;
  /** Hasil, mis. "Gold Medal" / "Medali Emas". */
  result: Record<Locale, string>;
  /** Nama siswa atau tim (hanya dengan izin orang tua). */
  recipient: string;
  /** Tingkat, mis. "International" / "Internasional" (opsional). */
  level?: Record<Locale, string>;
  year: number;
  /** Foto di /public, mis. "/images/achievements/sasmo-2026.webp" (opsional). */
  image?: string;
  imageAlt?: Record<Locale, string>;
  /** Sumber verifikasi (catatan internal, tidak ditampilkan). */
  source: string;
};

const items = data.items as unknown as Achievement[];

/** Prestasi terbaru lebih dulu. */
export function getAchievements(): Achievement[] {
  return [...items].sort((a, b) => b.year - a.year);
}
