import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, CalendarDays, Coins } from "lucide-react";
import electives from "@/content/shared/electives.json";
import { hasLocale, locales, localize } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { fill, subjectsContent } from "@/lib/content";
import { localeHref, subjectPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/blocks/CtaBand";
import { getHomeContent } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => electives.subjects.map((s) => ({ locale, slug: s.slug })));
}

const find = (slug: string) => electives.subjects.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[locale]/schools/high-school/subjects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const subject = find(slug);
  if (!hasLocale(locale) || !subject) return {};
  const { value } = localize({ en: subject.en, id: subject.id }, locale);
  return pageMetadata({ locale, path: subjectPath(slug), title: value.title, description: value.objective.slice(0, 300) });
}

export default async function SubjectPage({ params }: PageProps<"/[locale]/schools/high-school/subjects/[slug]">) {
  const { locale, slug } = await params;
  const subject = find(slug);
  if (!hasLocale(locale) || !subject) notFound();
  const dict = getDictionary(locale);
  const c = subjectsContent(locale);
  const t = c("detail");
  const tracks = c("tracks");
  const { value, lang, isFallback } = localize({ en: subject.en, id: subject.id }, locale);
  const contentLang = isFallback ? lang : undefined;
  const tagline = "tagline" in value ? (value.tagline as string | undefined) : undefined;
  const trackName = tracks[subject.track as keyof typeof tracks] as string;
  const catalogHref = localeHref(locale, "/schools/high-school/subjects");
  const related = electives.subjects.filter((s) => s.track === subject.track && s.slug !== subject.slug).slice(0, 6);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: value.title,
    description: value.objective,
    inLanguage: lang,
    url: `${SITE_URL}${localeHref(locale, subjectPath(slug))}`,
    provider: { "@type": "EducationalOrganization", name: site.name, sameAs: SITE_URL },
    educationalLevel: "High School (Junior College)",
    ...(subject.credits ? { numberOfCredits: subject.credits } : {}),
  };

  const facts = [
    { icon: Layers, label: t.track, value: trackName },
    { icon: CalendarDays, label: t.semester, value: String(subject.semester) },
    { icon: Coins, label: t.credits, value: subject.credits ? String(subject.credits) : t.notSpecified },
  ];

  return (
    <>
      <PageHero
        title={value.title}
        subtitle={tagline ? `“${tagline}”` : undefined}
        tone="high-school"
        lang={contentLang}
        breadcrumbLabel={dict.ui.breadcrumb}
        breadcrumbs={[
          { label: dict.levels["high-school"].name, href: localeHref(locale, "/schools/high-school") },
          { label: t.breadcrumb, href: catalogHref },
          { label: value.title },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_20rem]">
          <article lang={contentLang} className="min-w-0">
            {isFallback && (
              <p lang={locale} className="mb-8 rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink">
                {dict.ui.untranslatedNotice}
              </p>
            )}
            <h2 className="text-2xl font-bold text-ink">{t.objective}</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/85">{value.objective}</p>
            <h2 className="mt-10 text-2xl font-bold text-ink">{t.focus}</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/85">{value.focus}</p>
            <h3 className="mt-10 text-xl font-bold text-ink">{t.outcomes}</h3>
            <ul className="mt-4 space-y-3">
              {value.outcomes.map((o) => (
                <li key={o} className="flex gap-3 rounded-xl bg-surface p-4 text-ink/85">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-level-high-school" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
            <Link href={catalogHref} lang={locale} className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-accent-600">
              <ArrowLeft className="size-4" aria-hidden />
              {t.back}
            </Link>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <dl className="divide-y divide-line rounded-card border border-line bg-white shadow-card">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-4">
                  <f.icon className="size-5 shrink-0 text-accent-600" aria-hidden />
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="ml-auto text-right text-sm font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            {related.length > 0 && (
              <nav aria-labelledby="related-title" className="rounded-card bg-surface p-5">
                <h2 id="related-title" className="font-semibold text-ink">
                  {fill(t.related, { track: trackName })}
                </h2>
                <ul className="mt-3 space-y-1">
                  {related.map((r) => {
                    const rv = localize({ en: r.en, id: r.id }, locale);
                    return (
                      <li key={r.slug}>
                        <Link
                          href={localeHref(locale, subjectPath(r.slug))}
                          lang={rv.isFallback ? rv.lang : undefined}
                          className="group flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-ink/80 hover:bg-white hover:text-brand-700"
                        >
                          {rv.value.title}
                          <ArrowRight className="mt-0.5 size-3.5 shrink-0 opacity-0 group-hover:opacity-100" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} text={getHomeContent(locale).cta.title} />
      <JsonLd data={courseJsonLd} />
    </>
  );
}
