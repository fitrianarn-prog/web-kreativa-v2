import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary, levelIds } from "@/lib/i18n/dictionaries";
import { achievementsContent } from "@/lib/content";
import { achievementYears, resolveAchievements, type ResolvedAchievement } from "@/lib/achievements";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow, HeadingDivider } from "@/components/ui/SectionHeading";
import { AchievementArchive } from "@/components/achievements/AchievementArchive";
import { Competitions, LevelPill, Photo, Results, classYear } from "@/components/achievements/parts";

const PATH = "/achievements";

/**
 * Bagian "Featured" baru tampil bila data sudah cukup banyak — dengan sedikit data, prestasi yang sama
 * akan muncul dua kali (featured + arsip) tanpa menambah informasi.
 */
const FEATURED_MIN_TOTAL = 7;
const FEATURED_MAX = 3;

export async function generateMetadata({ params }: PageProps<"/[locale]/achievements">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const c = achievementsContent(locale);
  const items = resolveAchievements(locale);
  return pageMetadata({
    locale,
    path: PATH,
    title: c("meta").title,
    description: c("heroIntro").subtitle,
    image: items.find((a) => a.featured && a.image)?.image,
  });
}

/** Featured: strip editorial 3 kolom bergaris pemisah (bukan kartu besar, bukan tata letak Beranda). */
function FeaturedStrip({ items, title }: { items: ResolvedAchievement[]; title: string }) {
  return (
    <section aria-labelledby="featured-title" className="pt-16 lg:pt-20">
      <div className="container-page">
        <h2 id="featured-title" className="text-xl font-bold text-ink md:text-2xl">
          {title}
        </h2>
        <ul className="mt-8 grid gap-10 border-y border-line py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 md:px-8 md:first:pl-0 md:last:pr-0">
              <Photo item={item} sizes="128px" className="w-28 rounded-xl lg:w-32" />
              <div className="min-w-0">
                <LevelPill>{item.levelName}</LevelPill>
                <h3 className="mt-3 text-2xl leading-tight font-bold text-ink">{item.recipient}</h3>
                <p className="mt-1 text-xs text-muted">{classYear(item)}</p>
                <p className="mt-3 text-sm leading-snug font-semibold text-brand-600">
                  <Results item={item} />
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <Competitions item={item} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function AchievementsPage({ params }: PageProps<"/[locale]/achievements">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = achievementsContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const intro = c("heroIntro");
  const archive = c("archive");

  const items = resolveAchievements(locale);
  const featured = items.length >= FEATURED_MIN_TOTAL ? items.filter((a) => a.featured).slice(0, FEATURED_MAX) : [];

  return (
    <>
      {/* Hero editorial ringkas: tanpa foto/gradien. */}
      <section className="border-b border-line bg-surface">
        <div className="container-page py-14 lg:py-20">
          <div lang={hero.lang} className="max-w-3xl">
            {hero.eyebrow !== hero.title && <Eyebrow>{hero.eyebrow}</Eyebrow>}
            <h1 className="text-3xl leading-tight font-bold text-balance text-ink md:text-5xl">{hero.title}</h1>
            <HeadingDivider center={false} />
            <p lang={intro.lang} className="mt-5 max-w-2xl text-base text-pretty text-muted md:text-lg">
              {intro.subtitle}
            </p>
          </div>
        </div>
      </section>

      {featured.length > 0 && <FeaturedStrip items={featured} title={c("featured").title} />}

      <section aria-labelledby="archive-title" className="py-16 lg:py-20">
        <div className="container-page">
          <h2 id="archive-title" className="mb-6 text-xl font-bold text-ink md:text-2xl">
            {archive.title}
          </h2>
          <AchievementArchive
            items={items}
            levels={levelIds.map((id) => ({ id, name: dict.levels[id].name }))}
            years={achievementYears(items)}
            labels={archive}
          />
        </div>
      </section>
    </>
  );
}
