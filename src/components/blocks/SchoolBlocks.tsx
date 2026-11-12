import type { CSSProperties } from "react";
import Image from "next/image";
import { Eye, Flag, GraduationCap, Globe2, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { blocksContent } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";

/* Blok bersama halaman jenjang & About (spec Bagian 4). Semua server component kecuali Tabs. */

type BlockProps = { locale: Locale; id?: string; tone?: "white" | "surface" };

export function QuranVerse({ locale }: { locale: Locale }) {
  const v = blocksContent(locale)("verse");
  return (
    <section className="bg-brand-50 py-12">
      <figure className="container-page text-center">
        <blockquote>
          <p lang="ar" dir="rtl" className="font-serif text-3xl leading-relaxed text-ink sm:text-4xl">
            {v.arabic}
          </p>
          <p lang={v.lang} className="mx-auto mt-4 max-w-2xl text-lg text-ink/80 italic">
            “{v.translation}”
          </p>
        </blockquote>
        <figcaption className="mt-2 text-sm font-semibold text-accent-700">({v.reference})</figcaption>
      </figure>
    </section>
  );
}

export function VisionMission({ locale, id = "vision-mission", tone = "white", title }: BlockProps & { title?: string }) {
  const c = blocksContent(locale)("visionMission");
  return (
    <Section id={id} title={title} tone={tone} lang={c.lang} titleLang={undefined}>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-card bg-brand-700 p-8 text-white shadow-card sm:p-10">
          <Image src="/images/campus/vision-landscape.webp" alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover opacity-15" />
          <div className="relative">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <Eye className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-2xl font-bold">{c.visionTitle}</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/90">{c.vision}</p>
          </div>
        </article>
        <article className="rounded-card border border-line bg-white p-8 shadow-card sm:p-10">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
            <Flag className="size-6" aria-hidden />
          </span>
          <h3 className="mt-5 text-2xl font-bold text-ink">{c.missionTitle}</h3>
          <ol className="mt-4 space-y-4">
            {c.mission.map((m, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-lg leading-relaxed text-ink/85">{m}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </Section>
  );
}

export function FounderBoard({ locale, id = "founder", tone = "surface" }: BlockProps) {
  const c = blocksContent(locale)("founderBoard");
  return (
    <Section id={id} title={c.title} tone={tone} lang={c.lang} titleLang={c.lang}>
      <div className="grid gap-6 lg:grid-cols-2">
        {c.people.map((p) => (
          <article key={p.id} className="flex flex-col gap-6 rounded-card bg-white p-6 shadow-card sm:flex-row sm:p-8">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-brand-50 sm:size-32">
              <Image src={p.image} alt={p.name} fill sizes="128px" className="object-cover object-top" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">{p.name}</h3>
              <p className="text-sm font-semibold text-accent-600">{p.role}</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {p.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/**
 * Bento SDG: ukuran kartu mengikuti komposisi angka.
 * - Angka 2 digit (10, 17) → kartu lebar (4/6 kolom), angka paling besar.
 * - Angka 1 digit (4, 5) → kartu ringkas (2/6 kolom).
 * - SDG 9 (judul terpanjang) → strip penuh yang pendek, angka di kiri.
 * DOM tetap urut 4·5·9·10·17 (pembaca layar); susunan visual diatur lewat col/row-start.
 * HP (2 kolom): 4|5 · 9 · 10|17. `ink` = warna SDG digelapkan agar angka tetap kontras ≥ 3:1 di latar tint.
 */
type SdgVariant = "compact" | "wide" | "strip";
const sdgStyles: Record<number, { color: string; ink: string; variant: SdgVariant; place: string }> = {
  4: { color: "#C5192D", ink: "#C5192D", variant: "compact", place: "sm:col-span-2 sm:col-start-1 sm:row-start-1" },
  10: { color: "#DD1367", ink: "#C0105A", variant: "wide", place: "sm:col-span-4 sm:col-start-3 sm:row-start-1" },
  17: { color: "#19486A", ink: "#19486A", variant: "wide", place: "sm:col-span-4 sm:col-start-1 sm:row-start-2" },
  5: { color: "#FF3A21", ink: "#CC2A15", variant: "compact", place: "sm:col-span-2 sm:col-start-5 sm:row-start-2" },
  9: { color: "#FD6925", ink: "#B5470D", variant: "strip", place: "col-span-2 sm:col-span-6 sm:row-start-3" },
};
const sdgFallback = { color: "#3B358D", ink: "#3B358D", variant: "strip" as SdgVariant, place: "col-span-2 sm:col-span-6" };

const sdgLayout: Record<SdgVariant, { card: string; number: string }> = {
  compact: { card: "min-h-32 flex-col justify-between p-4", number: "text-[2.5rem] lg:text-[2.75rem]" },
  wide: { card: "min-h-32 items-end gap-4 p-5", number: "text-5xl lg:text-[3.5rem]" },
  strip: { card: "items-center gap-5 px-5 py-4", number: "text-[2.5rem] lg:text-[2.75rem]" },
};

function SdgCard({ number, name }: { number: number; name: string }) {
  const s = sdgStyles[number] ?? sdgFallback;
  const l = sdgLayout[s.variant];
  return (
    <li
      style={{ "--sdg": s.color } as CSSProperties}
      className={`group/sdg relative flex overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--sdg)_8%,white)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--sdg)_13%,white)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${s.place} ${l.card}`}
    >
      {/* Aksen garis tipis warna SDG resmi. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-(--sdg) opacity-80" />
      <p className="flex shrink-0 flex-col leading-none" style={{ color: s.ink }}>
        <span className="text-[0.625rem] font-semibold tracking-[0.2em] uppercase opacity-75">SDG</span>
        <span className={`mt-1 font-bold tracking-tight tabular-nums ${l.number}`}>
          <span className="sr-only">SDG </span>
          {number}
        </span>
      </p>
      <span className={`text-sm leading-snug font-semibold text-balance text-ink ${s.variant === "wide" ? "pb-1.5" : ""}`}>
        {name}
      </span>
    </li>
  );
}

export function EducationInitiative({ locale, id = "education", tone = "white" }: BlockProps) {
  const c = blocksContent(locale)("initiative");
  return (
    <Section id={id} title={c.title} tone={tone} lang={c.lang} titleLang={c.lang}>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 text-lg leading-relaxed text-ink/85 lg:col-span-3">
          {c.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-3 self-start sm:grid-cols-6 lg:col-span-2" aria-label="SDGs">
          {c.sdgs.map((s) => (
            <SdgCard key={s.number} number={s.number} name={s.name} />
          ))}
        </ul>
      </div>
      <div tabIndex={0} className="relative mt-10 overflow-x-auto rounded-card border border-line bg-white p-5">
        <Image src="/images/brand/partners-strip.png" alt={c.partnersAlt} width={1081} height={139} className="h-auto w-full min-w-[640px]" />
      </div>
    </Section>
  );
}

const objectiveIcons = [GraduationCap, Globe2, Sparkles];

export function LearningObjectives({ locale, id = "learning", tone = "surface" }: BlockProps) {
  const c = blocksContent(locale)("objectives");
  return (
    <Section id={id} title={c.title} tone={tone} lang={c.lang} titleLang={c.lang}>
      <div className="grid gap-6 md:grid-cols-3">
        {c.items.map((o, i) => {
          const Icon = objectiveIcons[i] ?? Sparkles;
          return (
            <article key={o.title} className="rounded-card bg-white p-7 shadow-card">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{o.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

const clusterStyles = ["bg-brand-600", "bg-accent-600", "bg-navy-700"];
const clusterText = ["text-brand-600", "text-accent-600", "text-navy-700"];

/**
 * 7 karakter: grid kartu seragam (bukan kolom per cluster — jumlah item per cluster 2/4/1 membuat kolom
 * tengah memanjang). Cluster ditunjukkan lewat warna nomor + label kecil di tiap kartu; baris terakhir di tengah.
 */
export function CharacterGrid({ locale, id = "characters", tone = "white" }: BlockProps) {
  const c = blocksContent(locale)("characters");
  const cards = c.clusters.flatMap((cluster, ci) => cluster.items.map((item) => ({ ...item, cluster: cluster.name, ci })));
  return (
    <Section id={id} title={c.title} intro={c.intro} tone={tone} lang={c.lang} titleLang={c.lang}>
      <ul className="flex flex-wrap justify-center gap-5">
        {cards.map((item, i) => (
          <li
            key={item.title}
            className="flex w-full flex-col rounded-card border border-line bg-white p-6 shadow-card sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${clusterStyles[item.ci]}`}
              >
                {i + 1}
              </span>
              <p className={`text-[0.6875rem] font-semibold tracking-wider uppercase ${clusterText[item.ci]}`}>{item.cluster}</p>
            </div>
            <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Diagram kerangka kurikulum (situs lama berupa gambar) dibuat ulang sebagai HTML. */
export function CurriculumFramework({
  locale,
  id = "curriculum",
  tone = "surface",
  only,
}: BlockProps & { only?: "primary" | "secondary" }) {
  const section = blocksContent(locale);
  const fw = section("curriculumFramework");
  const d = section("curriculumDiagram");

  const primary = (
    <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        {d.primary.stages.map((s, i) => (
          <div key={s.label} className="relative rounded-2xl bg-surface p-6">
            <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">{s.label}</p>
            <p className="mt-1 text-xs text-muted">{d.outcomeLabel}</p>
            <h3 className="mt-1 text-lg font-bold text-ink">{s.outcomeTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.outcomes.map((o) => (
                <li key={o} className="rounded-full bg-white px-3 py-1 text-sm text-ink/80 ring-1 ring-line">
                  {o}
                </li>
              ))}
            </ul>
            {i === 0 && (
              <span aria-hidden className="absolute top-1/2 -right-5 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white md:inline-flex">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted uppercase">{d.pathwayLabel}</h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {d.primary.pathway.map((p) => (
          <li key={p} className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );

  const secondary = (
    <div className="grid gap-4 md:grid-cols-2">
      {d.secondary.stages.map((s, i) => (
        <div key={s.label} className="rounded-card bg-white p-6 shadow-card sm:p-8">
          <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">{s.school}</p>
          <h3 className="mt-1 text-lg font-bold text-ink">{s.label}</h3>
          <p className="mt-5 text-xs font-semibold tracking-wide text-muted uppercase">{d.pathwayLabel}</p>
          <ul className="mt-2 space-y-2">
            {s.pathway.map((p) => (
              <li key={p} className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white ${i === 0 ? "bg-level-secondary" : "bg-level-high-school"}`}>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs font-semibold tracking-wide text-muted uppercase">{d.outcomeLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {s.outcomes.map((o) => (
              <li key={o} className="rounded-full bg-surface px-3 py-1 text-sm text-ink/80 ring-1 ring-line">
                {o}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <Section id={id} title={fw.title} tone={tone} titleLang={fw.lang}>
      {only ? (
        <div lang={d.lang}>{only === "primary" ? primary : secondary}</div>
      ) : (
        <Tabs
          label={fw.title}
          items={[
            { id: "primary", label: fw.tabs.primary, content: primary, lang: d.lang },
            { id: "secondary", label: fw.tabs.secondary, content: secondary, lang: d.lang },
          ]}
        />
      )}
    </Section>
  );
}

export function ClubGrid({ locale, id = "club", tone = "white", title }: BlockProps & { title: string }) {
  const c = blocksContent(locale)("clubs");
  return (
    <Section id={id} title={title} tone={tone} lang={c.lang}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((club) => (
          <li key={club.title} className="flex gap-4 rounded-card border border-line bg-white p-6 shadow-card">
            <Image src={club.icon} alt="" width={56} height={56} className="size-14 shrink-0" />
            <div>
              <h3 lang="en" className="font-semibold text-ink">
                {club.title}
              </h3>
              {club.body && <p className="mt-1.5 text-sm leading-relaxed text-muted">{club.body}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

type LifeItem = { title: string; body?: string | null; image: string };

/** Kartu foto + teks (Student Life). */
export function StudentLifeGrid({ id = "student", title, items, lang, titleLang, tone = "surface", wide = false }: {
  id?: string;
  title: string;
  items: LifeItem[];
  lang?: string;
  titleLang?: string;
  tone?: "white" | "surface";
  /** Gambar melebar (2:1), mis. foto Student Life SD yang pita teksnya sudah dipotong. */
  wide?: boolean;
}) {
  return (
    <Section id={id} title={title} tone={tone} lang={lang} titleLang={titleLang}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
            <div className={`relative ${wide ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
              <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="flex-1 p-6">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              {item.body && <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
