import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

// Font brand Kreativa (Brand Guideline): Poppins.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// Hanya /en dan /id; segmen lain → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#3b358d",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.defaultTitle, template: `%s | ${site.name}` },
    applicationName: site.name,
    ...pageMetadata({ locale, path: "/", description: dict.meta.defaultDescription }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={poppins.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-100 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.ui.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <ScrollReveal />
        <aside aria-label="WhatsApp">
          <WhatsAppFloat
            defaultMessage={dict.whatsapp.general}
            hours={`${site.officeHours.days[locale]}, ${site.officeHours.time}`}
            labels={{ ...dict.whatsappWidget, opensInNewTab: dict.ui.opensInNewTab }}
          />
        </aside>
        <JsonLd data={organizationJsonLd(locale, dict.meta.defaultDescription)} />
      </body>
    </html>
  );
}
