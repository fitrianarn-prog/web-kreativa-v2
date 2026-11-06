"use client";

import { useEffect, useRef, useState } from "react";

type Props = { items: { id: string; label: string; lang?: string }[]; label: string };

/**
 * Navigasi section sticky (pengganti sidebar anchor situs lama). Tautan anchor biasa — tetap bekerja tanpa
 * JavaScript; JS hanya menandai section yang sedang terlihat (aria-current) dan menggeser chip aktif ke layar.
 */
export function SectionNav({ items, label }: Props) {
  const [current, setCurrent] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        // Section teratas yang masih terlihat di area atas layar.
        const first = items.find((i) => visible.has(i.id));
        if (first) setCurrent(first.id);
        // Di atas section pertama (mis. kembali ke hero): tidak ada yang aktif.
        else if (sections[0].getBoundingClientRect().top > window.innerHeight * 0.45) setCurrent(null);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!current) return;
    const link = listRef.current?.querySelector<HTMLElement>(`a[href="#${current}"]`);
    link?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  return (
    <nav aria-label={label} className="sticky top-18 z-30 border-b border-line bg-white/95 backdrop-blur lg:top-20">
      <ul
        ref={listRef}
        className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              lang={item.lang}
              aria-current={current === item.id ? "location" : undefined}
              className="block rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:bg-surface hover:text-brand-700 aria-[current=location]:bg-brand-600 aria-[current=location]:text-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
