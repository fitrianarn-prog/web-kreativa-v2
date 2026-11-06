import type { Metadata } from "next";
import { locales, localeMeta, defaultLocale, type Locale } from "@/lib/i18n/config";
import { localeHref } from "@/lib/routes";
import { SITE_URL, site } from "@/lib/site";

export const DEFAULT_OG_IMAGE = "/images/og/default.jpg";

const absolute = (path: string) => `${SITE_URL}${path}`;

/** URL absolut tiap bahasa untuk satu halaman (dipakai metadata hreflang & sitemap). */
export function alternateUrls(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absolute(localeHref(l, path));
  languages["x-default"] = absolute(localeHref(defaultLocale, path));
  return languages;
}

type PageMetaInput = {
  locale: Locale;
  /** Path tanpa prefiks bahasa, mis. "/about". */
  path: string;
  title?: string;
  description: string;
  image?: string;
};

/** Metadata standar setiap halaman: canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata({ locale, path, title, description, image }: PageMetaInput): Metadata {
  const url = absolute(localeHref(locale, path));
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: alternateUrls(path) },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      ...(title ? { title } : {}),
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", ...(title ? { title } : {}), description, images: [ogImage] },
  };
}

/** JSON-LD organisasi sekolah — dirender sekali di layout. */
export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: absolute(localeHref(locale, "/")),
    logo: absolute("/images/brand/logo-kreativa-stacked.png"),
    image: absolute(DEFAULT_OG_IMAGE),
    description,
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    slogan: locale === "id" ? "Membuka Potensi, Mewujudkan Mimpi" : "Unlocking Potential, Empowering Dreams",
    address: site.campuses.map((c) => ({
      "@type": "PostalAddress",
      name: c.name[locale],
      streetAddress: c.address.replace(/, Kota Bandung$/, ""),
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    })),
    sameAs: site.social.map((s) => s.url),
  };
}
