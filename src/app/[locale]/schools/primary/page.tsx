import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blocksContent, primaryContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import {
  CharacterGrid,
  CurriculumFramework,
  EducationInitiative,
  FounderBoard,
  LearningObjectives,
  QuranVerse,
  StudentLifeGrid,
  VisionMission,
} from "@/components/blocks/SchoolBlocks";
import { CtaBand } from "@/components/blocks/CtaBand";

const PATH = "/schools/primary";

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/primary">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = primaryContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: "/images/campus/building-front.webp" });
}

export default async function PrimaryPage({ params }: PageProps<"/[locale]/schools/primary">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = primaryContent(locale);
  const labels = blocksContent(locale)("sections");
  const dict = getDictionary(locale);
  const hero = c("hero");
  const principal = c("principal");
  const english = c("english");
  const life = c("studentLife");
  const clubs = c("clubs");
  const closing = c("closing");

  const nav = [
    { id: "vision-mission", label: labels.visionMission },
    { id: "founder", label: labels.founderBoard },
    { id: "principal", label: labels.principal },
    { id: "education", label: labels.initiative },
    { id: "learning", label: labels.objectives },
    { id: "characters", label: labels.characters },
    { id: "curriculum", label: labels.curriculumFramework },
    { id: "english", label: labels.english },
    { id: "student-life", label: labels.studentLife },
    { id: "clubs", label: labels.clubs },
  ];

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        eyebrow={dict.levels.primary.grades}
        image="/images/campus/building-front.webp"
        tone="primary"
        lang={hero.lang}
      />
      <SectionNav items={nav} label={labels.onThisPage} />
      <QuranVerse locale={locale} />
      <VisionMission locale={locale} title={labels.visionMission} />
      <FounderBoard locale={locale} />

      <Section id="principal" title={labels.principal} lang={principal.lang}>
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <figure className="lg:sticky lg:top-40 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface">
              <Image src={principal.image} alt={principal.name} fill sizes="(min-width: 1024px) 288px, 100vw" className="object-cover object-top" />
            </div>
            <figcaption className="mt-4">
              <span className="block text-lg font-bold text-ink">{principal.name}</span>
              <span className="block text-sm font-semibold text-accent-600">{principal.role}</span>
              <span className="block text-sm text-muted">{principal.credential}</span>
            </figcaption>
          </figure>
          <blockquote className="relative rounded-card bg-surface p-7 sm:p-10">
            <Quote className="size-9 text-accent-500" aria-hidden />
            <p className="mt-4 text-lg font-semibold text-ink">{principal.greeting}</p>
            <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
              {principal.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-semibold text-brand-700">{principal.signoff}</p>
          </blockquote>
        </div>
      </Section>

      <EducationInitiative locale={locale} />
      <LearningObjectives locale={locale} />
      <CharacterGrid locale={locale} />
      <CurriculumFramework locale={locale} only="primary" />

      <Section id="english" title={english.title} intro={english.subtitle} titleLang={english.lang} lang={english.lang}>
        <ol className="grid gap-6 lg:grid-cols-2">
          {english.phases.map((phase, pi) => (
            <li key={phase.title} className="rounded-card border border-line bg-white p-7 shadow-card">
              <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">{phase.grades}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{phase.title}</h3>
              <ul className="mt-5 space-y-3">
                {phase.steps.map((s) => (
                  <li key={s.label} className="rounded-xl bg-surface p-4">
                    <p className="text-sm font-semibold text-brand-700">{s.label}</p>
                    <p className="mt-1 text-sm text-ink/80">{s.body}</p>
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 text-sm font-semibold tracking-wide text-muted uppercase">{english.objectivesLabel}</h4>
              <ul className="mt-3 space-y-2">
                {phase.objectives.map((o) => (
                  <li key={o} className="flex gap-3 text-sm text-ink/80">
                    <span aria-hidden className={`mt-2 size-1.5 shrink-0 rounded-full ${pi === 0 ? "bg-accent-500" : "bg-brand-600"}`} />
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <StudentLifeGrid id="student-life" title={labels.studentLife} items={life.items} lang={life.lang} wide />

      <Section id="clubs" title={labels.clubs} lang={clubs.lang}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clubs.items.map((club) => (
            <li key={club.title} className="group relative aspect-square overflow-hidden rounded-card">
              <Image src={club.image} alt="" fill sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-900/85 via-brand-900/10 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-0 p-4 font-semibold text-white">{club.title}</h3>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} text={closing.text} lang={closing.lang} />
    </>
  );
}
