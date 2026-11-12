"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Minus, Plus } from "lucide-react";

export type ApproachItem = { key: string; title: string; paragraphs: string[]; lang?: string };

/**
 * Pendekatan belajar TK — akordeon horizontal.
 * - ≥ xl: 5 panel sejajar; panel aktif ±39% lebar (flex-grow 2.6 : 1), sisanya ringkas. Teks selalu horizontal & rata kiri-atas.
 * - < xl (tablet & HP): akordeon vertikal (panel horizontal terlalu sempit untuk judul).
 * - Selalu tepat satu panel terbuka (panel pertama bawaan). Panah kiri/kanan/atas/bawah, Home, End berpindah antartombol.
 * - Konten panel tertutup memakai `inert` (tidak terbaca/terfokus); transisi mati saat prefers-reduced-motion.
 */
export function ApproachAccordion({ items }: { items: ApproachItem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <ul className="flex flex-col gap-3 xl:min-h-[27rem] xl:flex-row">
      {items.map((item, i) => {
        const open = i === active;
        const number = String(i + 1).padStart(2, "0");
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={item.key}
            lang={item.lang}
            className={`group/panel relative overflow-hidden rounded-card transition-[flex-grow,background-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none xl:basis-0 ${
              open ? "bg-brand-400 text-white xl:grow-[2.6]" : "bg-brand-50/70 text-brand-500 hover:bg-brand-50 xl:grow"
            }`}
          >
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex w-full items-center gap-4 p-5 pr-16 text-left focus-visible:-outline-offset-4 xl:flex-col xl:items-start xl:gap-4 xl:p-6 xl:pr-6 ${
                  open ? "cursor-default" : "cursor-pointer after:absolute after:inset-0"
                }`}
              >
                <span
                  aria-hidden
                  className={`shrink-0 text-4xl leading-none font-bold tracking-tight tabular-nums xl:text-[2.75rem] ${open ? "text-white/90" : "text-brand-300"}`}
                >
                  {number}
                </span>
                <span
                  className={`leading-snug font-bold ${open ? "text-lg text-white xl:pr-10 xl:text-2xl" : "text-base text-brand-500 xl:text-[0.9375rem]"}`}
                >
                  <span className="sr-only">{number}. </span>
                  {item.title}
                </span>
              </button>
            </h3>

            {/* Indikator plus/minus (dekoratif; status dibacakan lewat aria-expanded). */}
            <span
              aria-hidden
              className={`pointer-events-none absolute top-5 right-5 inline-flex size-8 items-center justify-center rounded-full border transition-colors duration-300 xl:top-6 xl:right-6 ${
                open ? "border-white/30 text-white" : "border-brand-100 text-brand-400 group-hover/panel:border-brand-200"
              }`}
            >
              {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
            </span>

            {/* Deskripsi: grid 0fr→1fr = transisi tinggi (vertikal); di xl lebar teks tetap agar tidak "mengalir ulang" saat panel melebar. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                open ? "grid-rows-[1fr] opacity-100 delay-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-3 px-5 pb-6 text-sm leading-relaxed text-white xl:w-[24rem] xl:px-6 xl:pb-7">
                  {item.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
