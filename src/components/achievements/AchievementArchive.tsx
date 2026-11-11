"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { ResolvedAchievement } from "@/lib/achievements";
import { Competitions, LevelPill, Photo, Results, classYear } from "./parts";

export type ArchiveLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  levelLabel: string;
  allLevels: string;
  yearLabel: string;
  allYears: string;
  clear: string;
  loadMore: string;
  count: string;
  countOne: string;
  emptyTitle: string;
  emptyBody: string;
};

type Props = {
  items: ResolvedAchievement[];
  levels: { id: string; name: string }[];
  years: number[];
  labels: ArchiveLabels;
};

/** Jumlah kartu awal & tambahan per klik "Load More". */
const PAGE_SIZE = 12;

function ArchiveCard({ item }: { item: ResolvedAchievement }) {
  return (
    <li className="h-full">
      <article className="flex h-full gap-4 rounded-xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand-200 hover:shadow-card">
        {/* Foto 3:4 sedang (96–112px) — informasi tetap jadi fokus. */}
        <Photo item={item} sizes="112px" className="w-24 rounded-lg sm:w-28" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-snug font-semibold text-ink">{item.recipient}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <LevelPill>{item.levelName}</LevelPill>
            <span className="text-xs text-muted">{classYear(item)}</span>
          </div>
          <p className="mt-3 text-sm leading-snug font-semibold text-brand-600">
            <Results item={item} />
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            <Competitions item={item} />
          </p>
        </div>
      </article>
    </li>
  );
}

const control =
  "h-12 w-full rounded-xl border border-line bg-white text-sm text-ink transition-colors hover:border-brand-200 focus:border-brand-400 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-400";

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${control} appearance-none pr-10 pl-4`}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" />
    </label>
  );
}

/**
 * Arsip prestasi: pencarian (nama, prestasi, kompetisi) + filter jenjang & tahun, bekerja bersamaan tanpa reload.
 * Menampilkan PAGE_SIZE kartu lalu "Load More"; jumlah tampil di-reset setiap kali pencarian/filter berubah.
 */
export function AchievementArchive({ items, levels, years, labels }: Props) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [year, setYear] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(
      (a) =>
        (level === "all" || a.level === level) &&
        (year === "all" || String(a.year) === year) &&
        words.every((w) => a.search.includes(w)),
    );
  }, [items, query, level, year]);

  const active = query !== "" || level !== "all" || year !== "all";
  const shown = results.slice(0, visible);

  // Setiap perubahan pencarian/filter mengembalikan jumlah tampil ke halaman pertama.
  const update = (fn: () => void) => {
    fn();
    setVisible(PAGE_SIZE);
  };
  const clear = () =>
    update(() => {
      setQuery("");
      setLevel("all");
      setYear("all");
    });

  const countText = results.length === 1 ? labels.countOne : labels.count.replace("{count}", String(results.length));

  return (
    <div>
      <div role="search" className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1fr)_13rem_11rem]">
        <label className="relative col-span-2 block md:col-span-1">
          <span className="sr-only">{labels.searchLabel}</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => update(() => setQuery(e.target.value))}
            placeholder={labels.searchPlaceholder}
            className={`${control} pr-4 pl-11 placeholder:text-muted`}
          />
        </label>
        <Select
          label={labels.levelLabel}
          value={level}
          onChange={(v) => update(() => setLevel(v))}
          options={[{ value: "all", label: labels.allLevels }, ...levels.map((l) => ({ value: l.id, label: l.name }))]}
        />
        <Select
          label={labels.yearLabel}
          value={year}
          onChange={(v) => update(() => setYear(v))}
          options={[{ value: "all", label: labels.allYears }, ...years.map((y) => ({ value: String(y), label: String(y) }))]}
        />
      </div>

      <div className="mt-5 flex min-h-9 items-center justify-between gap-4 border-b border-line pb-4">
        <p aria-live="polite" className="text-sm text-muted">
          {countText}
        </p>
        {active && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50 hover:text-accent-700"
          >
            <X className="size-3.5" aria-hidden />
            {labels.clear}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <ArchiveCard key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-line px-6 py-14 text-center">
          <p className="font-semibold text-ink">{labels.emptyTitle}</p>
          <p className="mt-1 text-sm text-muted">{labels.emptyBody}</p>
          <button
            type="button"
            onClick={clear}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50"
          >
            <X className="size-3.5" aria-hidden />
            {labels.clear}
          </button>
        </div>
      )}

      {results.length > visible && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex h-12 items-center rounded-full border border-brand-200 px-7 text-sm font-semibold text-brand-600 transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
          >
            {labels.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
