"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = { src: string; poster: string; pauseLabel: string; playLabel: string };

/**
 * Video latar hero. Tidak memakai atribut autoPlay: video baru dimuat & diputar lewat JavaScript setelah
 * halaman selesai dimuat, bila pengguna tidak meminta reduced motion / hemat data.
 * Tombol jeda/putar memenuhi WCAG 2.2.2 (konten bergerak > 5 detik).
 */
export function HeroVideo({ src, poster, pauseLabel, playLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hemat data: jangan putar otomatis bila pengunjung mengaktifkan mode hemat data.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    // Putar setelah halaman selesai dimuat & browser idle: poster + teks hero tampil lebih dulu (LCP),
    // dan file video (±1,2 MB) tidak berebut bandwidth dengan konten utama.
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      // Bisa ditolak browser (mode hemat daya); poster tetap tampil.
      video.play().catch(() => {});
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 2500 });
      else timer = setTimeout(start, 800);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute top-[calc(7rem+1rem)] right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6 lg:top-[calc(7.5rem+1.5rem)]"
      >
        {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
        <span className="sr-only">{playing ? pauseLabel : playLabel}</span>
      </button>
    </>
  );
}
