import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { localize, type Locale, type Localized } from "@/lib/i18n/config";
import { levelIds, type LevelId } from "@/lib/i18n/dictionaries";
import { getAchievements, type Achievement, type AchievementCategory } from "@/lib/achievements";
import { site } from "@/lib/site";
import { Eyebrow, HeadingDivider } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: Record<AchievementCategory, string>;
  viewPost: string;
  emptyTitle: string;
  emptyBody: string;
  tabsLabel: string;
  pendingTitle: string;
  pendingBody: string;
};

type Props = { locale: Locale; copy: Copy; levelNames: Record<LevelId, string>; opensInNewTab: string };

/** Teks per bahasa + atribut lang bila fallback ke EN. */
function Text({ value, locale }: { value: Localized<string>; locale: Locale }) {
  const t = localize(value, locale);
  return t.isFallback ? <span lang={t.lang}>{t.value}</span> : <>{t.value}</>;
}

/** Pemisah bulat tebal di tengah ("•") antar-penghargaan; pembaca layar mendengar koma. */
function Dot() {
  return (
    <>
      <span aria-hidden className="mx-1.5 inline-block size-1.5 rounded-full bg-black align-middle" />
      <span className="sr-only">, </span>
    </>
  );
}

function AchievementCard({
  item,
  index,
  locale,
  levelName,
}: {
  item: Achievement;
  index: number;
  locale: Locale;
  levelName: string;
}) {
  const alt = item.imageAlt ? localize(item.imageAlt, locale) : null;
  return (
    // animate-rise diputar ulang setiap kali panel tab ditampilkan (display none → block).
    <li className="w-[78%] max-w-80 shrink-0 animate-rise snap-start sm:w-auto sm:max-w-none" style={{ animationDelay: `${index * 90}ms` }}>
      <article className="group flex h-full flex-col rounded-card bg-white p-3 shadow-card ring-1 ring-line/60 transition-shadow duration-300 hover:shadow-float">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
          {item.image && (
            <Image
              src={item.image}
              alt={alt?.value ?? ""}
              lang={alt?.isFallback ? alt.lang : undefined}
              fill
              sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 80vw"
              className="animate-kenburns object-cover object-[50%_25%]"
              // Fase berbeda per kartu agar tidak bergerak serempak.
              style={{ animationDelay: `-${index * 3.5}s` }}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-line bg-surface px-3 py-1 text-[0.625rem] font-semibold tracking-wider text-muted uppercase">
              {levelName}
            </span>
            {item.className && <span className="truncate text-xs text-muted">{item.className}</span>}
          </div>
          <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">
            {item.recipient}
            <span className="block text-base text-brand-600">
              {item.awards.map((a, i) => (
                <span key={i}>
                  {i > 0 && <Dot />}
                  <Text value={a.result} locale={locale} />
                </span>
              ))}
            </span>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {item.awards.map((a, i) => (
              <span key={i}>
                {i > 0 && <Dot />}
                <Text value={a.competition} locale={locale} />
                {a.level && (
                  <>
                    {" ("}
                    <Text value={a.level} locale={locale} />
                    {")"}
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
      </article>
    </li>
  );
}

function EmptyLevel({ level, copy, instagramUrl, opensInNewTab }: { level: string; copy: Copy; instagramUrl?: string; opensInNewTab: string }) {
  return (
    <div className="animate-rise flex flex-col items-center rounded-card border border-dashed border-brand-200 bg-white/70 px-6 py-14 text-center">
      <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Sparkles className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{copy.emptyTitle}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{copy.emptyBody.replace("{level}", level)}</p>
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800"
        >
          @kreativaglobal
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">(Instagram, {opensInNewTab})</span>
        </a>
      )}
    </div>
  );
}

/**
 * Prestasi Siswa. Data dari src/content/shared/achievements.json (hanya prestasi terverifikasi).
 * - Data kosong + produksi  → section tidak dirender (tanpa konten palsu).
 * - Data kosong + development → kotak penanda "konten dibutuhkan" agar tim tahu section ini ada.
 * - Ada data → tab per jenjang; tiap tab berisi grid kartu siswa (foto bergerak pelan). Tab pertama yang aktif
 *   adalah jenjang pertama yang punya data.
 */
export function AchievementsSection({ locale, copy, levelNames, opensInNewTab }: Props) {
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

  const instagram = site.social.find((s) => s.id === "instagram");
  const byLevel = levelIds.map((level) => ({ level, items: items.filter((a) => a.level === level) }));
  const firstWithData = Math.max(0, byLevel.findIndex((g) => g.items.length > 0));

  return (
    <section aria-labelledby="achievements-title" className="bg-surface bg-dots py-20 lg:py-28">
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
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand-600 hover:text-brand-800 md:self-auto"
            >
              {copy.viewPost}
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">({opensInNewTab})</span>
            </a>
          )}
        </div>

        <Tabs
          className="mt-10"
          label={copy.tabsLabel}
          defaultIndex={firstWithData}
          items={byLevel.map(({ level, items: group }) => ({
            id: level,
            label: levelNames[level],
            content:
              group.length > 0 ? (
                // HP: deretan geser horizontal (tidak memanjang ke bawah); sm+: grid 2 → 4 kolom.
                <ul className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
                  {group.map((item, i) => (
                    <AchievementCard key={item.id} item={item} index={i} locale={locale} levelName={levelNames[level]} />
                  ))}
                </ul>
              ) : (
                <EmptyLevel level={levelNames[level]} copy={copy} instagramUrl={instagram?.url} opensInNewTab={opensInNewTab} />
              ),
          }))}
        />
      </div>
    </section>
  );
}
