import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localeHref } from "@/lib/routes";
import { mapsLink, site } from "@/lib/site";
import { BrandIcon } from "@/components/icons/BrandIcon";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.4fr_1.2fr]">
        {/* Brand */}
        <div>
          <Image
            src="/images/brand/logo-kreativa-cambridge-white.png"
            alt="Kreativa Global School — Cambridge International School"
            width={1200}
            height={466}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-lg font-semibold leading-snug text-white">{dict.tagline}</p>
          <p className="mt-6 text-xs font-semibold tracking-wider text-white/60 uppercase">{f.followTitle}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-600 [--icon-bg:var(--color-navy-800)] hover:[--icon-bg:var(--color-accent-600)]"
                >
                  <BrandIcon id={s.id as Parameters<typeof BrandIcon>[0]["id"]} className="size-4.5" />
                  <span className="sr-only">
                    {s.label} ({dict.ui.opensInNewTab})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-quick-links">
          <h2 id="footer-quick-links" className="text-sm font-semibold tracking-wider text-white uppercase">
            {f.quickLinksTitle}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {f.quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={localeHref(locale, l.href)} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Address */}
        <div>
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">{f.addressTitle}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {site.campuses.map((c) => (
              <li key={c.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent-200" aria-hidden />
                <div>
                  <p className="font-medium text-white">
                    {c.name[locale]}
                    {c.status && (
                      <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[0.7rem] font-medium text-white/80">
                        {c.status[locale]}
                      </span>
                    )}
                  </p>
                  <p>{c.address}</p>
                  <a
                    href={mapsLink(c.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-200 hover:underline"
                  >
                    {f.viewOnMap}
                    <span className="sr-only"> ({dict.ui.opensInNewTab})</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours & contact */}
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">{f.hoursTitle}</h2>
            <p className="mt-5 flex gap-3 text-sm">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent-200" aria-hidden />
              <span>
                <span className="block text-white">
                  {site.officeHours.days[locale]}: {site.officeHours.time}
                </span>
                <span className="block">{site.officeHours.closed[locale]}</span>
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">{f.contactTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-accent-200" aria-hidden />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all hover:text-white">
                  <Mail className="size-4 shrink-0 text-accent-200" aria-hidden />
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {f.rights}
          </p>
          <p lang="en">Cambridge International School</p>
        </div>
      </div>
    </footer>
  );
}
