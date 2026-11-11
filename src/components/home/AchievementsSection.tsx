import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { resolveAchievements, type ResolvedAchievement } from "@/lib/achievements";
import { localeHref } from "@/lib/routes";
import { Eyebrow, HeadingDivider } from "@/components/ui/SectionHeading";
import { Competitions, LevelPill, Photo, Results, classYear } from "@/components/achievements/parts";
import { AchievementTicker } from "./AchievementTicker";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  listLabel: string;
  pause: string;
  play: string;
  pendingTitle: string;
  pendingBody: string;
};

type Props = { locale: Locale; copy: Copy };

/** Kartu di daftar kanan yang ditampilkan di Beranda (sisanya ada di halaman Prestasi). */
const MAX_LIST = 8;

/** Prestasi utama (kiri, statis): foto sedang; tipografi lebih menonjol daripada foto. */
function Featured({ item }: { item: ResolvedAchievement }) {
  return (
    <article className="grid items-center gap-6 sm:grid-cols-[11rem_1fr] lg:grid-cols-[13rem_1fr] lg:gap-8 xl:grid-cols-[15rem_1fr]">
      {/* Tinggi foto: ±235px (HP) · 277px (lg) · 320px (xl). */}
      <Photo item={item} sizes="(min-width: 1280px) 240px, 208px" className="w-44 rounded-2xl sm:w-full" />
      <div>
        <LevelPill>{item.levelName}</LevelPill>
        <h3 className="mt-4 text-3xl leading-tight font-bold text-ink md:text-4xl">{item.recipient}</h3>
        <p className="mt-1 text-sm text-muted">{classYear(item)}</p>
        <p className="mt-5 text-lg leading-snug font-semibold text-brand-600 md:text-xl">
          <Results item={item} />
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          <Competitions item={item} />
        </p>
      </div>
    </article>
  );
}

/** Kartu memanjang (kanan): thumbnail 72px + detail; tinggi ±118px. mb-3 (bukan gap) agar loop ticker mulus. */
function Row({ item, href }: { item: ResolvedAchievement; href: string }) {
  return (
    <li className="mb-3">
      <Link
        href={href}
        className="flex items-center gap-4 rounded-xl border border-line bg-white px-3 py-2.5 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/40"
      >
        <Photo item={item} sizes="72px" className="w-18 rounded-lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-semibold text-ink">{item.recipient}</h3>
            <LevelPill>{item.levelName}</LevelPill>
          </div>
          <p className="mt-1 line-clamp-1 text-sm font-semibold text-brand-600">
            <Results item={item} />
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
            <Competitions item={item} />
          </p>
        </div>
      </Link>
    </li>
  );
}

/**
 * Beranda — "Celebrating Excellence". Data: src/content/shared/achievements.json (sama dengan halaman /achievements).
 * - Data kosong + produksi  → section tidak dirender (tanpa konten palsu).
 * - Data kosong + development → kotak penanda "konten dibutuhkan".
 * - Ada data → kiri: prestasi `featured` (statis); kanan: daftar prestasi lain (AchievementTicker).
 */
export function AchievementsSection({ locale, copy }: Props) {
  const items = resolveAchievements(locale);

  if (items.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section aria-labelledby="achievements-title" className="py-20 lg:py-28">
        <div className="container-page">
          <div className="rounded-2xl border-2 border-dashed border-brand-200 p-8 text-center">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id="achievements-title" className="text-2xl font-bold text-ink">
              {copy.pendingTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{copy.pendingBody}</p>
          </div>
        </div>
      </section>
    );
  }

  const pageHref = localeHref(locale, "/achievements");
  const featured = items.find((a) => a.featured && a.image) ?? items.find((a) => a.image) ?? items[0];
  const rest = items.filter((a) => a !== featured).slice(0, MAX_LIST);

  return (
    <section aria-labelledby="achievements-title" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id="achievements-title" className="text-2xl leading-tight font-bold text-balance text-ink md:text-4xl">
              {copy.title}
            </h2>
            <HeadingDivider center={false} />
            <p className="mt-4 text-sm text-pretty text-muted md:text-lg">{copy.subtitle}</p>
          </div>
          <Link
            href={pageHref}
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-accent-200 px-5 py-2.5 text-sm font-semibold text-accent-600 transition-colors duration-300 hover:border-accent-600 hover:bg-accent-600 hover:text-white md:self-auto"
          >
            {copy.cta}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </Link>
        </div>

        <div className={`mt-12 grid items-center gap-12 ${rest.length > 0 ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
          <Featured item={featured} />
          {rest.length > 0 && (
            <AchievementTicker labels={{ pause: copy.pause, play: copy.play, region: copy.listLabel }}>
              {rest.map((item) => (
                <Row key={item.id} item={item} href={pageHref} />
              ))}
            </AchievementTicker>
          )}
        </div>
      </div>
    </section>
  );
}
