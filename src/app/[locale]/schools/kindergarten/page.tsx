import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Clock, Star } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blocksContent, getHomeContent, kindergartenContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import { CtaBand } from "@/components/blocks/CtaBand";
import { ApproachAccordion } from "@/components/kindergarten/ApproachAccordion";

const PATH = "/schools/kindergarten";
const HERO_IMAGE = "/images/kindergarten/slide-2.webp";

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/kindergarten">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = kindergartenContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: HERO_IMAGE });
}

export default async function KindergartenPage({ params }: PageProps<"/[locale]/schools/kindergarten">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = kindergartenContent(locale);
  const labels = blocksContent(locale)("sections");
  const dict = getDictionary(locale);
  const hero = c("hero");
  const curriculum = c("curriculum");
  const approach = c("approach");
  const holistic = c("holistic");
  const daily = c("daily");
  const hours = c("hours");
  const mk = c("muslimKreativa");

  // Pilar pembelajaran: urutan sama dengan halaman EN; bagian tanpa terjemahan resmi tampil EN.
  const pillars = [
    { key: "thematic", data: c("thematic") },
    { key: "steam", data: c("steam") },
    { key: "literacy", data: c("literacy") },
    { key: "islamic", data: c("islamic") },
    { key: "independence", data: c("independence") },
  ] as const;

  const nav = [
    { id: "curriculum", label: curriculum.title, lang: curriculum.lang },
    { id: "approach", label: pillars[0].data.title, lang: pillars[0].data.lang },
    { id: "muslim-kreativa", label: mk.title, lang: mk.lang },
    { id: "subjects", label: holistic.title, lang: holistic.lang },
    { id: "daily", label: daily.title, lang: daily.lang },
  ];

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} eyebrow={dict.levels.kindergarten.grades} image={HERO_IMAGE} tone="kindergarten" lang={hero.lang} />
      <SectionNav items={nav} label={labels.onThisPage} />

      <Section id="curriculum" title={curriculum.title} titleLang={curriculum.lang} lang={curriculum.lang}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-ink/85">
            {curriculum.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["/images/kindergarten/slide-1.webp", "/images/kindergarten/slide-3.webp"].map((src, i) => (
              <div key={src} className={`relative aspect-[3/4] overflow-hidden rounded-card ${i === 1 ? "mt-10" : ""}`}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="approach"
        tone="surface"
        eyebrow={curriculum.title}
        title={approach.title}
        intro={approach.intro}
        titleLang={approach.lang}
        lang={approach.lang}
      >
        <ApproachAccordion items={pillars.map(({ key, data }) => ({ key, title: data.title, paragraphs: data.paragraphs, lang: data.lang }))} />
      </Section>

      <Section id="muslim-kreativa" title={mk.title} intro={mk.intro} titleLang={mk.lang} lang={mk.lang}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mk.traits.map((trait, i) => (
            <li key={trait} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
              <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="font-medium text-ink">{trait}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-2 text-ink/80">
          <Star className="mt-1 size-4 shrink-0 text-accent-500" aria-hidden />
          {mk.outro}
        </p>
      </Section>

      <Section id="subjects" title={holistic.title} titleLang={holistic.lang} lang={holistic.lang} tone="surface">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            {holistic.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {holistic.areas.map((a, i) => (
                <li key={a} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-ink shadow-card">
                  <BookOpen className="size-4 shrink-0 text-level-kindergarten" aria-hidden />
                  <span className="sr-only">{i + 1}. </span>
                  {a}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image src="/images/kindergarten/slide-4.webp" alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <section id="daily" className="py-16 lg:py-20">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div lang={daily.lang} className="rounded-card border border-line bg-white p-7 shadow-card sm:p-9">
            <h2 className="text-2xl font-bold text-ink">{daily.title}</h2>
            <ol className="mt-6 space-y-3">
              {daily.items.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <span className="text-ink/85">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div lang={hours.lang} className="rounded-card bg-level-kindergarten p-7 text-white shadow-card sm:p-9">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Clock className="size-6" aria-hidden />
              {hours.title}
            </h2>
            <dl className="mt-6 divide-y divide-white/15">
              {hours.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-white/75">{r.label}</dt>
                  <dd className="font-semibold">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} text={getHomeContent(locale).cta.title} />
    </>
  );
}
