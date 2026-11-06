import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blocksContent, getHomeContent, highSchoolContent } from "@/lib/content";
import { localeHref } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import credits from "@/content/shared/hs-credits.json";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import { ButtonLink } from "@/components/ui/ButtonLink";
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

const PATH = "/schools/high-school";
const HERO_IMAGE = "/images/high-school/internship.webp";

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/high-school">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = highSchoolContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: HERO_IMAGE });
}

const cell = (v: number | null) => (v === null ? "–" : String(v));

export default async function HighSchoolPage({ params }: PageProps<"/[locale]/schools/high-school">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = highSchoolContent(locale);
  const labels = blocksContent(locale)("sections");
  const dict = getDictionary(locale);
  const hero = c("hero");
  const t = c("credits");
  const life = c("studentLife");
  const columns = credits.columns as (keyof typeof t.columns)[];

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
      <PageHero title={hero.title} subtitle={hero.subtitle} eyebrow={dict.levels["high-school"].grades} image={HERO_IMAGE} tone="high-school" lang={hero.lang} />
      <SectionNav items={nav} label={labels.onThisPage} />
      <QuranVerse locale={locale} />
      <VisionMission locale={locale} title={labels.visionMission} />
      <FounderBoard locale={locale} />
      <EducationInitiative locale={locale} />
      <LearningObjectives locale={locale} />
      <CharacterGrid locale={locale} />
      <CurriculumFramework locale={locale} only="secondary" />

      <Section id="pathway" title={t.title} lang={t.lang} titleLang={t.lang}>
        <div className="space-y-8">
          {credits.groups.map((group) => {
            const groupId = group.id as keyof typeof t.groups;
            return (
              <div key={group.id} tabIndex={0} className="relative overflow-x-auto rounded-card border border-line shadow-card">
                <table className="w-full min-w-[640px] border-collapse bg-white text-sm">
                  <caption className="bg-level-high-school px-5 py-3.5 text-left text-base font-semibold text-white">{t.groups[groupId]}</caption>
                  <thead>
                    <tr className="bg-surface text-left text-ink">
                      <th scope="col" className="p-4 font-semibold">
                        {t.subjectHeader}
                      </th>
                      {columns.map((col) => (
                        <th key={col} scope="col" className="w-36 p-4 text-center font-semibold">
                          {t.columns[col]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.id} className="border-t border-line">
                        <th scope="row" className="p-4 text-left font-normal text-ink/85">
                          {t.rows[row.id as keyof typeof t.rows]}
                        </th>
                        {row.credits.map((v, i) => (
                          <td key={i} className="p-4 text-center tabular-nums">
                            {cell(v)}
                            {group.total === null && group.percent && (
                              <span className="ml-1 text-muted">({group.percent[i]}%)</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {group.total && (
                    <tfoot>
                      <tr className="border-t-2 border-line bg-brand-50 font-semibold text-ink">
                        <th scope="row" className="p-4 text-left">
                          {t.totalLabel}
                        </th>
                        {group.total.map((v, i) => (
                          <td key={i} className="p-4 text-center tabular-nums">
                            {v} <span className="font-normal text-muted">({group.percent[i]}%)</span>
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            );
          })}

          <div tabIndex={0} className="relative overflow-x-auto rounded-card bg-level-high-school text-white shadow-card">
            <table className="w-full min-w-[640px] text-sm">
              <tbody>
                <tr>
                  <th scope="row" className="p-5 text-left text-base font-semibold">
                    {t.grandTotalLabel}
                  </th>
                  {credits.grandTotal.map((v, i) => (
                    <td key={i} className="w-36 p-5 text-center text-lg font-bold tabular-nums">
                      <span className="sr-only">{t.columns[columns[i]]}: </span>
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <ButtonLink href={localeHref(locale, "/schools/high-school/subjects")} variant="secondary" size="lg">
            {t.catalogButton}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Section>

      <StudentLifeGrid id="student-life" title={labels.studentLife} items={life.items} lang={life.lang} />
      <ClubGrid locale={locale} id="clubs" title={labels.clubs} />
      <CtaBand locale={locale} text={getHomeContent(locale).cta.title} />
    </>
  );
}
