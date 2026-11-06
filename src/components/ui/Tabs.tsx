"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode; lang?: string };

type Props = {
  items: TabItem[];
  label: string;
  className?: string;
  /** "pills" = tombol bulat (default), "underline" = garis bawah. */
  variant?: "pills" | "underline";
};

/**
 * Tab yang mengikuti pola WAI-ARIA: panah kiri/kanan, Home/End, roving tabindex.
 * Semua panel dirender di HTML (panel yang tidak aktif disembunyikan) sehingga isinya tetap terbaca mesin pencari.
 */
export function Tabs({ items, label, className = "", variant = "pills" }: Props) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") focusTab(i + 1);
    else if (e.key === "ArrowLeft") focusTab(i - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(items.length - 1);
    else return;
    e.preventDefault();
  };

  const tabClass = (selected: boolean) =>
    variant === "pills"
      ? `shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
          selected ? "bg-brand-600 text-white shadow-sm" : "bg-white text-brand-700 ring-1 ring-line hover:bg-brand-50"
        }`
      : `shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
          selected ? "border-accent-600 text-ink" : "border-transparent text-muted hover:text-brand-700"
        }`;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 ${variant === "underline" ? "border-b border-line" : ""}`}
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={tabClass(i === active)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${base}-panel-${item.id}`}
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={i !== active}
          tabIndex={0}
          lang={item.lang}
          className="mt-6 outline-none"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
