"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Item = { name: string; role: string; quote: string };
type Props = {
  items: Item[];
  labels: { previous: string; next: string; slideLabel: string; region: string };
};

/**
 * Carousel testimoni berbasis scroll-snap: setiap testimoni dirender SEKALI (situs lama menduplikasi DOM),
 * bisa digeser dengan sentuhan/trackpad, dan tombol sebelumnya/berikutnya untuk mouse & keyboard. Tanpa autoplay.
 */
export function TestimonialCarousel({ items, labels }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[aria-roledescription=slide]");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const navBtn =
    "inline-flex size-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-40";

  return (
    <div role="group" aria-roledescription="carousel" aria-label={labels.region}>
      {/* div (bukan ul/li): role="group" pada slide tidak diizinkan di <li>. */}
      <div
        ref={trackRef}
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] motion-reduce:scroll-auto sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <div
            key={t.name}
            role="group"
            aria-roledescription="slide"
            aria-label={labels.slideLabel.replace("{n}", String(i + 1)).replace("{total}", String(items.length))}
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <figure className="flex h-full flex-col rounded-2xl bg-white p-7 md:p-8">
              <Quote className="size-8 text-accent-500" aria-hidden />
              <blockquote className="mt-4 flex-1 text-ink/85">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} disabled={atStart} className={navBtn}>
          <ChevronLeft className="size-5" aria-hidden />
          <span className="sr-only">{labels.previous}</span>
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={atEnd} className={navBtn}>
          <ChevronRight className="size-5" aria-hidden />
          <span className="sr-only">{labels.next}</span>
        </button>
      </div>
    </div>
  );
}
