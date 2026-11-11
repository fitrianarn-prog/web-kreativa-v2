import Image from "next/image";
import type { ResolvedAchievement, ResolvedText } from "@/lib/achievements";

/**
 * Potongan tampilan prestasi yang dipakai bersama Beranda (server) & halaman /achievements (klien).
 * Tanpa hook/state agar bisa dipakai di kedua sisi.
 */

/** Teks dengan lang="en" bila fallback. */
export function T({ value }: { value: ResolvedText }) {
  return value.lang ? <span lang={value.lang}>{value.text}</span> : <>{value.text}</>;
}

/** Pemisah bulat tebal di tengah antar-penghargaan; pembaca layar mendengar koma. */
export function Dot() {
  return (
    <>
      <span aria-hidden className="mx-1.5 inline-block size-1.5 rounded-full bg-black align-middle" />
      <span className="sr-only">, </span>
    </>
  );
}

export function Results({ item }: { item: ResolvedAchievement }) {
  return item.awards.map((a, i) => (
    <span key={i}>
      {i > 0 && <Dot />}
      <T value={a.result} />
    </span>
  ));
}

export function Competitions({ item }: { item: ResolvedAchievement }) {
  return item.awards.map((a, i) => (
    <span key={i}>
      {i > 0 && <Dot />}
      <T value={a.competition} />
      {a.level && (
        <>
          {" ("}
          <T value={a.level} />
          {")"}
        </>
      )}
    </span>
  ));
}

export function LevelPill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.625rem] font-semibold tracking-wider whitespace-nowrap text-brand-600 uppercase">
      {children}
    </span>
  );
}

/** Foto siswa rasio 3:4 (= rasio asli foto, wajah & medali tidak terpotong). */
export function Photo({ item, sizes, className = "" }: { item: ResolvedAchievement; sizes: string; className?: string }) {
  return (
    <div className={`relative aspect-3/4 shrink-0 overflow-hidden bg-surface ${className}`}>
      {item.image && (
        <Image src={item.image} alt={item.imageAlt.text} lang={item.imageAlt.lang} fill sizes={sizes} className="object-cover" />
      )}
    </div>
  );
}

/** "P3 Integrity · 2026" (bagian yang ada saja). */
export function classYear(item: ResolvedAchievement): string {
  return [item.className, item.year].filter(Boolean).join(" · ");
}
