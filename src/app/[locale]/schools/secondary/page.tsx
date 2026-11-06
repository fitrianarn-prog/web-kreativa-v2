import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blocksContent, secondaryContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import {
  CharacterGrid,
  ClubGrid,
  CurriculumFramework,
  EducationInitiative,
  FounderBoard,
  LearningObjectives,
  QuranVerse,
  StudentLifeGrid,
  VisionMission,
} from "@/components/blocks/SchoolBlocks";
import { CtaBand } from "@/components/blocks/CtaBand";

const PATH = "/schools/secondary";
const HERO_IMAGE = "/images/secondary/student-life-2.webp";

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/secondary">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = secondaryContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: HERO_IMAGE });
}

export default async function SecondaryPage({ params }: PageProps<"/[locale]/schools/secondary">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = secondaryContent(locale);
  const labels = blocksContent(locale)("sections");
  const dict = getDictionary(locale);
  const hero = c("hero");
  const pathway = c("pathway");
  const life = c("studentLife");
  const closing = c("closing");

  const nav = [
    { id: "vision-mission", label: labels.visionMission },
    { id: "founder", label: labels.founderBoard },
    { id: "education", label: labels.initiative },
    { id: "learning", label: labels.objectives },
    { id: "characters", label: labels.characters },
    { id: "curriculum", label: labels.curriculumFramework },
    { id: "pathway", label: labels.pathway },
    { id: "student-life", label: labels.studentLife },
    { id: "clubs", label: labels.clubs },
  ];

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} eyebrow={dict.levels.secondary.grades} image={HERO_IMAGE} tone="secondary" lang={hero.lang} />
      <SectionNav items={nav} label={labels.onThisPage} />
      <QuranVerse locale={locale} />
      <VisionMission locale={locale} title={labels.visionMission} />
      <FounderBoard locale={locale} />
      <EducationInitiative locale={locale} />
      <LearningObjectives locale={locale} />
      <CharacterGrid locale={locale} />
      <CurriculumFramework locale={locale} only="secondary" />

      <Section id="pathway" title={labels.pathway} intro={pathway.note} lang={pathway.lang}>
        <div tabIndex={0} className="relative overflow-x-auto rounded-card border border-line shadow-card">
          <table className="w-full min-w-[720px] border-collapse bg-white text-left text-sm">
            <thead>
              <tr className="bg-level-secondary text-white">
                <td className="w-40 p-4" />
                {pathway.columns.map((col) => (
                  <th key={col} scope="col" className="p-4 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pathway.rows.map((row) => (
                <tr key={row.label} className="border-t border-line align-top">
                  <th scope="row" className="bg-surface p-4 font-semibold text-ink">
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="p-4">
                      <ul className="space-y-1.5 text-ink/85">
                        {cell.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <StudentLifeGrid id="student-life" title={labels.studentLife} items={life.items} lang={life.lang} />
      <ClubGrid locale={locale} id="clubs" title={labels.clubs} />
      <CtaBand locale={locale} text={closing.text} lang={closing.lang} />
    </>
  );
}
