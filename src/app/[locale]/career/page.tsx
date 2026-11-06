import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Award, BadgeCheck, BookOpenCheck, Brain, Briefcase, CalendarRange, CheckCircle2, Languages, Presentation, School, TrendingUp, Users, Wallet } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { careerContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";

const PATH = "/career";
const HERO_IMAGE = "/images/career/hero.webp";

export async function generateMetadata({ params }: PageProps<"/[locale]/career">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = careerContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description, image: HERO_IMAGE });
}

const developIcons = [BookOpenCheck, Languages, Presentation, Brain, School, TrendingUp];
const benefitIcons = [Wallet, Award, BadgeCheck, TrendingUp];

export default async function CareerPage({ params }: PageProps<"/[locale]/career">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = careerContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const p = c("program");

  const apply = (variant: "primary" | "light" = "primary") => (
    <ButtonLink href={site.links.careerPortal} external size="lg" variant={variant}>
      {hero.apply}
      <ArrowUpRight className="size-4" aria-hidden />
      <span className="sr-only">({dict.ui.opensInNewTab})</span>
    </ButtonLink>
  );

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.body} image={HERO_IMAGE} tone="brand" lang={hero.lang}>
        {apply()}
      </PageHero>

      <div lang={p.lang}>
        <section aria-labelledby="program-title" className="py-16 lg:py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent-600 uppercase">{p.tagline}</p>
              <h2 id="program-title" className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                {p.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/85">{p.intro}</p>
            </div>
            <div className="rounded-card bg-brand-700 p-8 text-white shadow-float">
              <p className="flex items-center gap-3 text-xl font-bold">
                <CalendarRange className="size-6" aria-hidden />
                {p.highlight}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.levels.map((l) => (
                  <li key={l} className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="develop-title" className="bg-surface bg-dots py-16 lg:py-20">
          <div className="container-page">
            <h2 id="develop-title" className="text-3xl font-bold text-ink">
              {p.develop.title}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {p.develop.items.map((item, i) => {
                const Icon = developIcons[i] ?? BookOpenCheck;
                return (
                  <li key={item.title} className="rounded-card bg-white p-6 shadow-card">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="py-16 lg:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <h2 id="benefits-title" className="text-3xl font-bold text-ink">
                {p.benefits.title}
              </h2>
              <ul className="mt-8 space-y-4">
                {p.benefits.items.map((item, i) => {
                  const Icon = benefitIcons[i] ?? Award;
                  return (
                    <li key={item.title} className="flex gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-semibold text-ink">{item.title}</h3>
                        <p className="text-sm text-muted">{item.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-ink">{p.who.title}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.who.items.map((item) => (
                    <li key={item.title} className="rounded-2xl border border-line bg-white p-4 shadow-card">
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <Users className="size-4 text-accent-600" aria-hidden />
                        {item.title}
                      </p>
                      {item.body && <p className="mt-1.5 text-sm text-muted">{item.body}</p>}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink">{p.requirements.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {p.requirements.items.map((r) => (
                    <li key={r} className="flex gap-3 text-ink/85">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#1f9d55]" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="howto-title" className="bg-brand-800 py-16 text-white lg:py-20">
          <div className="container-page">
            <h2 id="howto-title" className="text-3xl font-bold">
              {p.howTo.title}
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.howTo.steps.map((s, i) => (
                <li key={s.title} className="rounded-card bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="text-3xl font-bold text-accent-200">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{s.body}</p>
                </li>
              ))}
            </ol>
            <ol className="mt-10 grid gap-3 md:grid-cols-3">
              {p.timeline.map((t) => (
                <li key={t.period} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <Briefcase className="size-5 shrink-0 text-accent-200" aria-hidden />
                  <div>
                    <p className="font-semibold">{t.period}</p>
                    <p className="text-sm text-white/75">{t.label}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-card bg-linear-to-br from-accent-600 to-accent-700 px-6 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between">
            <div lang={p.lang}>
              <p className="text-2xl font-bold">{p.cta.title}</p>
              <p className="mt-1 text-white/85">{p.cta.body}</p>
              <p className="mt-1 text-sm text-white/75">{p.cta.note}</p>
            </div>
            {apply("light")}
          </div>
        </div>
      </section>
    </>
  );
}
