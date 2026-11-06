import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Download, X } from "lucide-react";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type LevelId } from "@/lib/i18n/dictionaries";
import { admissionContent, fill } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formatRupiah, site } from "@/lib/site";
import fees from "@/content/shared/fees.json";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { ButtonLink } from "@/components/ui/ButtonLink";

const PATH = "/admission";

export async function generateMetadata({ params }: PageProps<"/[locale]/admission">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = admissionContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: fill(meta.description, { year: fees.academicYear }) });
}

type Level = (typeof fees.levels)[number];
type Amount = number | undefined;

function Rp({ value, locale }: { value: Amount; locale: Locale }) {
  if (value === undefined) return <>–</>;
  return <span className="tabular-nums">Rp {formatRupiah(value, locale)}</span>;
}

function FeePanel({ level, locale, t, levelName }: { level: Level; locale: Locale; t: Labels; levelName: string }) {
  const columns = level.columns as ("annualTuition" | "annualProgramFee" | "monthlyTuition")[];
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-card bg-brand-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-sm text-white/75">{t.registrationFee}</p>
          <p className="text-2xl font-bold">
            <Rp value={fees.registrationFee} locale={locale} />
          </p>
        </div>
        <a
          href={level.brochure}
          download
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          <Download className="size-4" aria-hidden />
          {t.brochure} — {levelName}
          <span className="text-xs font-normal text-muted">({t.brochureType})</span>
        </a>
      </div>

      <div tabIndex={0} className="relative overflow-x-auto rounded-card border border-line shadow-card">
        <table className="w-full min-w-[480px] border-collapse bg-white text-sm">
          <caption className="sr-only">
            {levelName} — {fill(t.title, { year: fees.academicYear })}
          </caption>
          <thead>
            <tr className="bg-surface text-left text-ink">
              <th scope="col" className="p-4 font-semibold">
                {t.grade}
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="p-4 text-right font-semibold">
                  {t[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {level.grades.map((g) => (
              <tr key={g.grade} className="border-t border-line">
                <th scope="row" className="p-4 text-left font-semibold text-ink">
                  {g.grade}
                </th>
                {columns.map((col) => (
                  <td key={col} className="p-4 text-right">
                    <Rp value={(g as Record<string, Amount | string>)[col] as Amount} locale={locale} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {level.schemes.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-ink">{t.enrollmentFee}</h3>
          <p className="mt-1 text-sm text-muted">{t.enrollmentNote}</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {level.schemes.map((s) => (
              <li key={s.id} className="rounded-card border border-line bg-white p-5 shadow-card">
                <h4 className="font-semibold text-ink">{s.name[locale]}</h4>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {s.installments.map((inst) => (
                    <li key={inst.grade} className="flex items-baseline justify-between gap-3">
                      <span className="text-muted">{fill(t.paidIn, { grade: inst.grade })}</span>
                      <span className="font-semibold text-ink">
                        <Rp value={inst.amount} locale={locale} />
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card bg-surface p-6">
          <h3 className="font-semibold text-ink">{t.including}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/85">
            {level.includes[locale].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-[#1f9d55]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card bg-surface p-6">
          <h3 className="font-semibold text-ink">{t.excluding}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/85">
            {level.excludes[locale].map((item) => (
              <li key={item} className="flex gap-2">
                <X className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-muted">{t.currencyNote}</p>
    </div>
  );
}

type Labels = ReturnType<typeof labelsOf>;
function labelsOf(locale: Locale) {
  return admissionContent(locale)("fees");
}

export default async function AdmissionPage({ params }: PageProps<"/[locale]/admission">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = admissionContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const process = c("process");
  const t = labelsOf(locale);
  const closing = c("closing");
  const applyLabel = dict.ui.applyNow;

  return (
    <>
      <PageHero title={hero.title} subtitle={fill(t.title, { year: fees.academicYear })} image="/images/home/students-campus.webp" tone="brand" lang={hero.lang}>
        <ButtonLink href={site.links.admissionPortal} external size="lg">
          {applyLabel}
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">({dict.ui.opensInNewTab})</span>
        </ButtonLink>
      </PageHero>

      <Section id="process" title={process.title} titleLang={process.lang} lang={process.lang}>
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative rounded-card border border-line bg-white p-6 shadow-card">
              <span aria-hidden className="inline-flex size-10 items-center justify-center rounded-full bg-accent-600 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {i === 0 ? (
                  <>
                    {step.body.split("admission.kreativaglobal.sch.id")[0]}
                    <a href={site.links.admissionPortal} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline underline-offset-2">
                      admission.kreativaglobal.sch.id
                    </a>
                    {step.body.split("admission.kreativaglobal.sch.id")[1]}
                  </>
                ) : (
                  step.body
                )}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="fees" title={fill(t.title, { year: fees.academicYear })} titleLang={t.lang} lang={t.lang} tone="surface">
        <Tabs
          label={t.levelsLabel}
          items={fees.levels.map((level) => {
            const name = dict.levels[level.level as LevelId].name;
            return { id: level.level, label: name, content: <FeePanel level={level} locale={locale} t={t} levelName={name} /> };
          })}
        />
      </Section>

      <section className="pb-20">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-card bg-linear-to-br from-brand-700 to-brand-900 px-6 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between">
            <p lang={closing.lang} className="max-w-2xl text-xl font-semibold text-balance sm:text-2xl">
              {closing.text}
            </p>
            <ButtonLink href={site.links.admissionPortal} external size="lg">
              {applyLabel}
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">({dict.ui.opensInNewTab})</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
