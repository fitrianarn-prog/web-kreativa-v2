import data from "@/content/shared/achievements.json";
import type { Localized } from "./i18n/config";
import type { LevelId } from "./i18n/dictionaries";

export type AchievementCategory = "academic" | "olympiad" | "english" | "sports" | "arts" | "other";

/** Satu penghargaan. Teks memakai { en, id }; `id: null` = nama resmi/terjemahan belum ada (tampil EN). */
export type Award = {
  category: AchievementCategory;
  /** Hasil, mis. "Bronze Medal" / "Medali Perunggu". */
  result: Localized<string>;
  /** Nama kompetisi, mis. "Singapore Math Challenge 2026 (SMC)". */
  competition: Localized<string>;
  /** Tingkat, mis. "National" / "Nasional" (opsional). */
  level?: Localized<string>;
};

/** Satu siswa/tim berprestasi (terverifikasi) — bisa memiliki beberapa penghargaan. */
export type Achievement = {
  id: string;
  /** Nama siswa atau tim (hanya dengan izin orang tua). */
  recipient: string;
  /** Jenjang siswa — menentukan tab tempat kartu tampil. */
  level: LevelId;
  /** Nama kelas resmi, mis. "P3 Integrity" (opsional). */
  className?: string;
  year: number;
  /** Foto di /public, rasio 3:4, mis. "/images/achievements/fayra-2026.webp". */
  image?: string;
  imageAlt?: Localized<string>;
  awards: Award[];
  /** Sumber verifikasi (catatan internal, tidak ditampilkan). */
  source: string;
};

const items = data.items as unknown as Achievement[];

/** Prestasi terbaru lebih dulu (urutan file dipertahankan untuk tahun yang sama). */
export function getAchievements(): Achievement[] {
  return [...items].sort((a, b) => b.year - a.year);
}
