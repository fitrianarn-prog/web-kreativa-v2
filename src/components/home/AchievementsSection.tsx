import Image from "next/image";
import { Award } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getAchievements, type AchievementCategory } from "@/lib/achievements";
import { Eyebrow, HeadingDivider } from "@/components/ui/SectionHeading";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: Record<AchievementCategory, string>;
  pendingTitle: string;
  pendingBody: string;
};

type Props = { locale: Locale; copy: Copy };

/**
 * Prestasi Siswa. Data dari src/content/shared/achievements.json (hanya prestasi terverifikasi).
 * - Data kosong + produksi  → section tidak dirender (tanpa konten palsu).
 * - Data kosong + development → kotak penanda "konten dibutuhkan" agar tim tahu section ini ada.
 * - Satu prestasi utama (terbaru, berfoto) tampil besar; sisanya daftar ringkas bergaris.
 */
export function AchievementsSection({ locale, copy }: Props) {
  const items = getAchievements();

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

  const featured = items.find((a) => a.image) ?? items[0];
  const rest = items.filter((a) => a !== featured).slice(0, 5);

  return (
    <section aria-labelledby="achievements-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="achievements-title" className="text-2xl leading-tight font-bold text-balance text-ink md:text-4xl">
            {copy.title}
          </h2>
          <HeadingDivider center={false} />
          <p className="mt-4 text-sm text-pretty text-muted md:text-lg">{copy.subtitle}</p>
        </div>

        <div className={`mt-12 grid gap-10 ${rest.length > 0 ? "lg:grid-cols-12" : ""}`}>
          {/* Prestasi utama */}
          <article className="reveal lg:col-span-7">
            {featured.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt?.[locale] ?? ""}
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-6 flex items-start gap-4">
              <span aria-hidden className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                <Award className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                  {copy.categories[featured.category]} · {featured.year}
                  {featured.level && <> · {featured.level[locale]}</>}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink md:text-2xl">{featured.result[locale]}</h3>
                <p className="mt-1 text-muted">
                  {featured.competition[locale]} — {featured.recipient}
                </p>
              </div>
            </div>
          </article>

          {/* Prestasi lain */}
          {rest.length > 0 && (
            <ul className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-start">
              {rest.map((a) => (
                <li key={a.id} className="reveal flex gap-4 py-5">
                  <span className="w-12 shrink-0 pt-0.5 text-sm font-semibold text-accent-600 tabular-nums">{a.year}</span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-muted uppercase">{copy.categories[a.category]}</p>
                    <h3 className="mt-0.5 font-semibold text-ink">{a.result[locale]}</h3>
                    <p className="text-sm text-muted">
                      {a.competition[locale]} — {a.recipient}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
