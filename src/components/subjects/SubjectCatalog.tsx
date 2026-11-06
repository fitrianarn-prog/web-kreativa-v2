"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

export type CatalogSubject = {
  slug: string;
  href: string;
  track: string;
  semester: number;
  credits: number | null;
  title: string;
  tagline?: string;
  /** Teks tambahan untuk pencarian (fokus materi). */
  keywords: string;
};

type Labels = {
  tracks: Record<string, string>;
  table: { subject: string; semester: string; credit: string };
  filters: {
    label: string;
    search: string;
    searchPlaceholder: string;
    track: string;
    allTracks: string;
    semester: string;
    allSemesters: string;
    semesterN: string;
    results: string;
    empty: string;
    reset: string;
  };
  notSpecified: string;
};

type Props = { subjects: CatalogSubject[]; trackOrder: string[]; labels: Labels; contentLang?: string };

const trackColor: Record<string, string> = {
  "applied-science": "bg-level-kindergarten",
  "business-management": "bg-accent-600",
  "leadership-social-science": "bg-navy-700",
};

const normalize = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** Katalog mata pelajaran dengan filter bidang & semester serta pencarian teks. Semua baris dirender di server (SEO). */
export function SubjectCatalog({ subjects, trackOrder, labels, contentLang }: Props) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<string | null>(null);
  const [semester, setSemester] = useState<number | null>(null);
  const f = labels.filters;

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return subjects.filter(
      (s) =>
        (!track || s.track === track) &&
        (!semester || s.semester === semester) &&
        (!q || normalize(`${s.title} ${s.tagline ?? ""} ${s.keywords}`).includes(q)),
    );
  }, [subjects, query, track, semester]);

  const active = query !== "" || track !== null || semester !== null;
  const reset = () => {
    setQuery("");
    setTrack(null);
    setSemester(null);
  };

  const chip = (selected: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      selected ? "bg-brand-600 text-white" : "bg-white text-brand-700 ring-1 ring-line hover:bg-brand-50"
    }`;

  return (
    <div>
      <div role="search" aria-label={f.label} className="rounded-card bg-surface p-5 sm:p-6">
        <label htmlFor="subject-search" className="text-sm font-semibold text-ink">
          {f.search}
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="subject-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={f.searchPlaceholder}
            className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-12 text-ink outline-none focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-200"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
          <fieldset>
            <legend className="text-sm font-semibold text-ink">{f.track}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" aria-pressed={track === null} onClick={() => setTrack(null)} className={chip(track === null)}>
                {f.allTracks}
              </button>
              {trackOrder.map((t) => (
                <button key={t} type="button" aria-pressed={track === t} onClick={() => setTrack(track === t ? null : t)} className={chip(track === t)}>
                  {labels.tracks[t]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold text-ink">{f.semester}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" aria-pressed={semester === null} onClick={() => setSemester(null)} className={chip(semester === null)}>
                {f.allSemesters}
              </button>
              {[1, 2].map((n) => (
                <button key={n} type="button" aria-pressed={semester === n} onClick={() => setSemester(semester === n ? null : n)} className={chip(semester === n)}>
                  {f.semesterN.replace("{n}", String(n))}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {f.results.replace("{n}", String(filtered.length)).replace("{total}", String(subjects.length))}
        </p>
        {active && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-accent-600">
            <X className="size-4" aria-hidden />
            {f.reset}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-line p-10 text-center text-muted">{f.empty}</p>
      ) : (
        <div className="mt-6 space-y-10">
          {trackOrder.map((t) => {
            const rows = filtered.filter((s) => s.track === t);
            if (rows.length === 0) return null;
            return (
              <section key={t} aria-labelledby={`track-${t}`}>
                <h2 id={`track-${t}`} className="flex items-center gap-3 text-2xl font-bold text-ink">
                  <span aria-hidden className={`h-7 w-1.5 rounded-full ${trackColor[t]}`} />
                  {labels.tracks[t]}
                  <span className="text-base font-normal text-muted">({rows.length})</span>
                </h2>
                <div tabIndex={0} className="relative mt-4 overflow-x-auto rounded-card border border-line shadow-card">
                  <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
                    <thead>
                      <tr className="bg-surface text-left text-ink">
                        <th scope="col" className="p-4 font-semibold">
                          {labels.table.subject}
                        </th>
                        <th scope="col" className="w-28 p-4 text-center font-semibold">
                          {labels.table.semester}
                        </th>
                        <th scope="col" className="w-24 p-4 text-center font-semibold">
                          {labels.table.credit}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((s) => (
                        <tr key={s.slug} className="border-t border-line hover:bg-surface/60">
                          <th scope="row" className="p-4 text-left font-normal">
                            <Link href={s.href} lang={contentLang} className="group inline-flex items-start gap-2 font-semibold text-ink hover:text-accent-600">
                              {s.title}
                              <ArrowRight className="mt-0.5 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                            </Link>
                            {s.tagline && (
                              <span lang={contentLang} className="mt-0.5 block text-xs text-muted italic">
                                “{s.tagline}”
                              </span>
                            )}
                          </th>
                          <td className="p-4 text-center tabular-nums">{s.semester}</td>
                          <td className="p-4 text-center tabular-nums">{s.credits ?? labels.notSpecified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
