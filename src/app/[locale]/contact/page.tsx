import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { contactContent, fill } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { mapsLink, site, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { BrandIcon } from "@/components/icons/BrandIcon";

const PATH = "/contact";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = contactContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = contactContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const l = c("labels");

  const channels = [
    {
      icon: <BrandIcon id="whatsapp" className="size-6" />,
      label: l.whatsapp,
      value: site.contact.phoneDisplay,
      href: whatsappLink(dict.whatsapp.general),
      external: true,
      tone: "bg-[#1f9d55] text-white",
    },
    { icon: <Phone className="size-6" aria-hidden />, label: l.phone, value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneE164}`, external: false, tone: "bg-brand-600 text-white" },
    { icon: <Mail className="size-6" aria-hidden />, label: l.email, value: site.contact.email, href: `mailto:${site.contact.email}`, external: false, tone: "bg-accent-600 text-white" },
  ];

  return (
    <>
      <PageHero title={hero.title} image="/images/campus/building.webp" tone="brand" lang={hero.lang} />

      <section className="py-16 lg:py-20">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-card border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float"
            >
              <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${ch.tone}`}>{ch.icon}</span>
              <p className="mt-4 text-sm text-muted">{ch.label}</p>
              <p className="mt-1 font-semibold break-words text-ink group-hover:text-accent-600">{ch.value}</p>
              {ch.external && <span className="sr-only">({dict.ui.opensInNewTab})</span>}
            </a>
          ))}
          <div className="rounded-card bg-surface p-6">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-navy-700 text-white">
              <Clock className="size-6" aria-hidden />
            </span>
            <p className="mt-4 text-sm text-muted">{l.hours}</p>
            <p className="mt-1 font-semibold text-ink">{site.officeHours.days[locale]}</p>
            <p className="font-semibold text-ink">{site.officeHours.time}</p>
            <p className="mt-1 text-sm text-muted">{site.officeHours.closed[locale]}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="campuses-title" className="bg-surface bg-dots py-16 lg:py-20">
        <div className="container-page">
          <h2 id="campuses-title" className="text-3xl font-bold text-ink sm:text-4xl">
            {l.campuses}
          </h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {site.campuses.map((campus) => (
              <li key={campus.id} className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
                <iframe
                  title={fill(l.mapTitle, { name: campus.name[locale] })}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(campus.mapsQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full border-0 bg-line"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-ink">{campus.name[locale]}</h3>
                    {campus.status && (
                      <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent-700">{campus.status[locale]}</span>
                    )}
                  </div>
                  <p className="mt-2 flex flex-1 gap-2 text-ink/80">
                    <MapPin className="mt-1 size-4 shrink-0 text-accent-600" aria-hidden />
                    {campus.address}
                  </p>
                  <a
                    href={mapsLink(campus.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-accent-600"
                  >
                    {dict.footer.viewOnMap}
                    <ExternalLink className="size-3.5" aria-hidden />
                    <span className="sr-only">({dict.ui.opensInNewTab})</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="follow-title" className="py-16">
        <div className="container-page flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="follow-title" className="text-2xl font-bold text-ink">
            {l.follow}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {site.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors [--icon-bg:var(--color-brand-50)] hover:bg-brand-600 hover:text-white hover:[--icon-bg:var(--color-brand-600)]"
                >
                  <BrandIcon id={s.id as Parameters<typeof BrandIcon>[0]["id"]} className="size-5" />
                  <span className="sr-only">
                    {s.label} ({dict.ui.opensInNewTab})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
