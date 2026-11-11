import data from "@/content/shared/achievements.json";
import { localize, type Locale, type Localized } from "./i18n/config";
import { getDictionary, type LevelId } from "./i18n/dictionaries";

export type AchievementCategory = "academic" | "olympiad" | "english" | "sports" | "arts" | "other";

/** Satu penghargaan. Teks memakai { en, id }; `id: null` = nama resmi/terjemahan belum ada (tampil EN). */
export type Award = {
  /** Catatan internal (tidak ditampilkan, tidak dipakai sebagai filter). */
  category: AchievementCategory;
  /** Hasil, mis. "Bronze Medal" / "Medali Perunggu". */
  result: Localized<string>;
  /** Nama kompetisi, mis. "Singapore Math Challenge 2026 (SMC)". */
  competition: Localized<string>;
  /** Tingkat, mis. "National" / "Nasional" (opsional). */
  level?: Localized<string>;
};

/**
 * Satu siswa/tim berprestasi (terverifikasi) — bisa memiliki beberapa penghargaan.
 * Sumber tunggal untuk Beranda & halaman /achievements (siap diganti CMS: cukup ganti `data`).
 */
export type Achievement = {
  id: string;
  /** Nama siswa atau tim (hanya dengan izin orang tua). */
  recipient: string;
  /** Jenjang siswa. */
  level: LevelId;
  /** Nama kelas resmi, mis. "P3 Integrity" (opsional). */
  className?: string;
  year: number;
  /** Ditonjolkan di Beranda & bagian "Featured" halaman Prestasi (pilihan editorial). */
  featured?: boolean;
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

/** Teks siap tampil + bahasa aslinya (lang="en" bila fallback di halaman /id). */
export type ResolvedText = { text: string; lang?: "en" };

export type ResolvedAward = { result: ResolvedText; competition: ResolvedText; level?: ResolvedText };

/** Prestasi yang sudah diterjemahkan untuk satu bahasa — data polos, aman dikirim ke komponen klien. */
export type ResolvedAchievement = {
  id: string;
  recipient: string;
  level: LevelId;
  levelName: string;
  className?: string;
  year: number;
  featured: boolean;
  image?: string;
  imageAlt: ResolvedText;
  awards: ResolvedAward[];
  /** Teks pencarian (nama, prestasi, kompetisi — kedua bahasa), huruf kecil. */
  search: string;
};

function resolveText(value: Localized<string>, locale: Locale): ResolvedText {
  const t = localize(value, locale);
  return t.isFallback ? { text: t.value, lang: "en" } : { text: t.value };
}

export function resolveAchievements(locale: Locale): ResolvedAchievement[] {
  const levels = getDictionary(locale).levels;
  return getAchievements().map((a) => {
    const texts = a.awards.flatMap((w) => [w.result.en, w.result.id, w.competition.en, w.competition.id]);
    return {
      id: a.id,
      recipient: a.recipient,
      level: a.level,
      levelName: levels[a.level].name,
      className: a.className,
      year: a.year,
      featured: a.featured ?? false,
      image: a.image,
      imageAlt: a.imageAlt ? resolveText(a.imageAlt, locale) : { text: "" },
      awards: a.awards.map((w) => ({
        result: resolveText(w.result, locale),
        competition: resolveText(w.competition, locale),
        level: w.level ? resolveText(w.level, locale) : undefined,
      })),
      search: [a.recipient, ...texts].filter(Boolean).join(" ").toLowerCase(),
    };
  });
}

/** Tahun yang tersedia di data, terbaru lebih dulu (untuk filter — tidak di-hardcode). */
export function achievementYears(list: { year: number }[]): number[] {
  return [...new Set(list.map((a) => a.year))].sort((a, b) => b - a);
}
