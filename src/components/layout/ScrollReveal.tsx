"use client";

import { useEffect } from "react";
import { usePublicPathname } from "@/lib/i18n/use-public-pathname";

/** Section yang tidak dianimasikan: hero (di atas lipatan) & yang ditandai data-no-reveal. */
const SECTION_SELECTOR = "main section:not([data-header-overlay]):not([data-no-reveal])";
const STAGGER_MS = 90;
const MAX_STAGGER = 6;
/** Lama transisi terpanjang (lihat globals.css) + jeda; setelahnya atribut dibuang agar gaya asli berlaku lagi. */
const CLEANUP_MS = 1600;

function isList(el: Element) {
  if (el.tagName === "UL" || el.tagName === "OL") return true;
  const display = getComputedStyle(el).display;
  return (display === "grid" || display === "inline-grid") && el.children.length >= 2;
}

/**
 * Pecah sebuah section menjadi blok-blok yang dianimasikan berurutan (stagger):
 * judul, paragraf, lalu tiap item daftar/grid. Elemen bertanda `.reveal` selalu dianimasikan sendiri.
 */
function collectTargets(section: Element): Element[] {
  let root: Element = section;
  // Turun melewati pembungkus tunggal (mis. .container-page).
  for (let depth = 0; depth < 3 && root.children.length === 1 && !isList(root); depth++) root = root.children[0];

  const blocks = root.children.length > 0 ? Array.from(root.children) : [section];
  const targets: Element[] = [];
  for (const block of blocks) {
    if (block.matches(".sr-only, script, style, template")) continue;
    if (block.classList.contains("reveal")) targets.push(block);
    else if (block.querySelector(".reveal")) {
      // Hanya item .reveal terluar (hindari animasi bertumpuk).
      block.querySelectorAll(".reveal").forEach((r) => {
        if (!r.parentElement?.closest(".reveal")) targets.push(r);
      });
    } else if (isList(block) && block.children.length <= 12) targets.push(...Array.from(block.children));
    else targets.push(block);
  }
  return targets;
}

/**
 * Animasi masuk yang halus untuk setiap section saat di-scroll (fade + geser ke atas, gambar sedikit zoom-out).
 * Hanya elemen yang masih di bawah layar saat halaman dibuka yang disembunyikan — konten di layar tidak berkedip,
 * dan tanpa JavaScript/dengan prefers-reduced-motion semua konten langsung tampil.
 */
export function ScrollReveal() {
  const pathname = usePublicPathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const timers = new Set<number>();
    const pending = new Set<HTMLElement>();

    const show = (el: HTMLElement, delay: number) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.reveal = "shown";
      const t = window.setTimeout(() => {
        delete el.dataset.reveal;
        el.style.removeProperty("--reveal-delay");
        timers.delete(t);
      }, CLEANUP_MS + delay);
      timers.add(t);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        entering.forEach((el, i) => {
          observer.unobserve(el);
          pending.delete(el);
          show(el, Math.min(i, MAX_STAGGER) * STAGGER_MS);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    const frame = requestAnimationFrame(() => {
      const viewportBottom = window.innerHeight;
      const sections = Array.from(document.querySelectorAll(SECTION_SELECTOR)).filter(
        (s) => !s.parentElement?.closest("section"),
      );
      for (const section of sections) {
        for (const el of collectTargets(section)) {
          if (!(el instanceof HTMLElement)) continue;
          // Sudah terlihat (atau di atas layar): biarkan apa adanya.
          if (el.getBoundingClientRect().top < viewportBottom) continue;
          el.dataset.reveal = "hidden";
          pending.add(el);
          observer.observe(el);
        }
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      pending.forEach((el) => delete el.dataset.reveal);
    };
  }, [pathname]);

  return null;
}
