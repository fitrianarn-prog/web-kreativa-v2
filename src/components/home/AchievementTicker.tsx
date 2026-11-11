"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  children: ReactNode;
  labels: { pause: string; play: string; region: string };
};

/** Minimal kartu per setengah lintasan (> kartu yang muat di wadah ±3) agar loop tanpa celah. */
const MIN_ROWS_PER_HALF = 4;
/** Detik per kartu — makin besar makin pelan. */
const SECONDS_PER_ROW = 6;

/**
 * Daftar prestasi di kolom kanan Beranda.
 * - Desktop (≥ lg): bergulir pelan ke atas tanpa henti (minimal 2 kartu; kartu diulang secara visual bila sedikit).
 *   HP & reduced motion: daftar statis (HP: maksimal 4 kartu, jelajah manual).
 * - Berhenti saat kursor di atas / fokus keyboard di dalam; tombol jeda/lanjut (WCAG 2.2.2).
 * - Salinan untuk loop hanya visual: aria-hidden + inert, bukan data tambahan.
 * - Server merender daftar statis dengan tinggi wadah yang sama → tidak ada pergeseran layout saat animasi aktif.
 */
export function AchievementTicker({ children, labels }: Props) {
  const count = Children.count(children);
  const scrollable = count >= 2;
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!scrollable) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, [scrollable]);

  if (count === 0) return null;

  // Tinggi wadah = ±3 kartu (kartu 118px + jarak 12px).
  const frame = scrollable
    ? "lg:h-[24.5rem] lg:overflow-hidden lg:[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
    : "";

  const copiesPerHalf = Math.max(1, Math.ceil(MIN_ROWS_PER_HALF / count));

  if (!animate) {
    return (
      <div role="region" aria-label={labels.region} className={`relative ${frame}`}>
        {/* HP: cukup 4 kartu teratas — sisanya di halaman Prestasi. */}
        <ul className="max-lg:[&>li:nth-child(n+5)]:hidden">{children}</ul>
      </div>
    );
  }

  return (
    <div>
      <div role="region" aria-label={labels.region} className={`group/ticker relative ${frame}`}>
        <div
          className="animate-marquee-y group-focus-within/ticker:[animation-play-state:paused] group-hover/ticker:[animation-play-state:paused]"
          style={{ animationDuration: `${copiesPerHalf * count * SECONDS_PER_ROW}s`, animationPlayState: paused ? "paused" : undefined }}
        >
          {/* Dua setengah lintasan identik; jarak antarkartu = margin-bottom di dalam kartu → -50% tepat satu setengah (tanpa lompatan). */}
          {Array.from({ length: copiesPerHalf * 2 }, (_, i) => (
            <ul key={i} aria-hidden={i > 0 || undefined} inert={i > 0 || undefined}>
              {children}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand-200 hover:text-brand-600"
        >
          {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
          <span className="sr-only">{paused ? labels.play : labels.pause}</span>
        </button>
      </div>
    </div>
  );
}
