import type { Metadata } from "next";
import { notFound } from "next/navigation";
import electives from "@/content/shared/electives.json";
import { hasLocale, localize } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { subjectsContent } from "@/lib/content";
import { localeHref, subjectPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SubjectCatalog, type CatalogSubject } from "@/components/subjects/SubjectCatalog";

const PATH = "/schools/high-school/subjects";

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/high-school/subjects">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = subjectsContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: "/images/high-school/internship.webp" });
}

export default async function SubjectCatalogPage({ params }: PageProps<"/[locale]/schools/high-school/subjects">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = subjectsContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const tracks = c("tracks");
  const table = c("table");
  const filters = c("filters");
  const detail = c("detail");

  const subjects: CatalogSubject[] = electives.subjects.map((s) => {
    const { value } = localize({ en: s.en, id: s.id }, locale);
    return {
      slug: s.slug,
      href: localeHref(locale, subjectPath(s.slug)),
      track: s.track,
      semester: s.semester,
      credits: s.credits,
      title: value.title,
      tagline: "tagline" in value ? (value.tagline as string | undefined) : undefined,
      keywords: value.focus,
    };
  });

  // Bila ada mata pelajaran yang belum diterjemahkan, isinya tampil EN (lang="en").
  const fallback = electives.subjects.some((s) => localize({ en: s.en, id: s.id }, locale).isFallback);
  const contentLang = fallback ? "en" : undefined;
  const trackNames: Record<string, string> = Object.fromEntries(electives.tracks.map((id) => [id, tracks[id as keyof typeof tracks] as string]));

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        image="/images/high-school/internship.webp"
        tone="high-school"
        lang={hero.lang}
        breadcrumbLabel={dict.ui.breadcrumb}
        breadcrumbs={[
          { label: dict.levels["high-school"].name, href: localeHref(locale, "/schools/high-school") },
          { label: hero.title },
        ]}
      />
      <section className="py-12 lg:py-16">
        <div className="container-page">
          {contentLang && (
            <p className="mb-6 rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink">{dict.ui.untranslatedNotice}</p>
          )}
          <SubjectCatalog
            subjects={subjects}
            trackOrder={electives.tracks}
            contentLang={contentLang}
            labels={{ tracks: trackNames, table, filters, notSpecified: detail.notSpecified }}
          />
        </div>
      </section>
    </>
  );
}
