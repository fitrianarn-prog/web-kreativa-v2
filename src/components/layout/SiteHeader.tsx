import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary, levelIds } from "@/lib/i18n/dictionaries";
import { localeHref } from "@/lib/routes";
import { site, whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DesktopNav } from "./DesktopNav";
import { HeaderShell } from "./HeaderShell";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import type { HeaderLabels, LevelCard, NavItem } from "./nav-types";

const levelPath = {
  kindergarten: "/schools/kindergarten",
  primary: "/schools/primary",
  secondary: "/schools/secondary",
  "high-school": "/schools/high-school",
} as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const href = (p: string) => localeHref(locale, p);

  const items: NavItem[] = dict.nav.map((n) => ({
    id: n.id,
    label: n.label,
    href: n.href ? href(n.href) : null,
    children: n.children.map((c) => ({ label: c.label, href: href(c.href) })),
  }));

  const levels: LevelCard[] = levelIds.map((id) => ({
    id,
    ...dict.levels[id],
    href: href(levelPath[id]),
  }));

  const labels: HeaderLabels = {
    mainNavigation: dict.ui.mainNavigation,
    openMenu: dict.ui.openMenu,
    closeMenu: dict.ui.closeMenu,
    overview: dict.ui.overview,
    enrollNow: dict.ui.enrollNow,
    scheduleTour: dict.ui.scheduleTour,
    languageLabel: dict.ui.languageLabel,
    switchTo: dict.ui.switchTo,
    schoolsHeading: dict.schoolsMenu.heading,
    schoolsIntro: dict.schoolsMenu.intro,
    catalogLabel: dict.schoolsMenu.catalogLabel,
    catalogDescription: dict.schoolsMenu.catalogDescription,
    contactUs: dict.ui.contactUs,
  };

  const enrollHref = href("/admission");
  const tourHref = whatsappLink(dict.whatsapp.tour);

  return (
    <>
      {/* Top bar — landmark "complementary" agar semua konten berada dalam landmark (axe: region). */}
      <aside
        aria-label={dict.footer.contactTitle}
        data-site-topbar=""
        className="relative z-50 border-b border-line bg-surface text-muted hero-topbar:border-white/15 hero-topbar:bg-transparent hero-topbar:text-white/85"
      >
        <div className="container-page flex h-10 items-center justify-between gap-4 text-xs sm:text-[0.8rem]">
          <div className="flex min-w-0 items-center gap-5">
            <a href={`tel:${site.contact.phoneE164}`} className="inline-flex items-center gap-1.5 hover:text-brand-600 hero-topbar:hover:text-white">
              <Phone className="size-3.5" aria-hidden />
              <span>{site.contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="hidden items-center gap-1.5 hover:text-brand-600 sm:inline-flex hero-topbar:hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden />
              <span>{site.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={href("/contact")} className="hidden font-medium hover:text-brand-600 md:inline hero-topbar:hover:text-white">
              {dict.ui.contactUs}
            </Link>
            <LanguageSwitcher current={locale} label={dict.ui.languageLabel} switchToLabel={dict.ui.switchTo} />
          </div>
        </div>
      </aside>

      <HeaderShell>
        <div className="container-page flex h-18 items-center justify-between gap-3 sm:gap-6 lg:h-20">
          <Link href={href("/")} className="flex shrink-0 items-center">
            <Image
              src="/images/brand/logo-kreativa-cambridge.png"
              alt="Kreativa Global School — Cambridge International School"
              width={600}
              height={179}
              priority
              className="h-10 w-auto sm:h-12 hero-header:hidden"
            />
            {/* Versi putih untuk header transparan di atas hero */}
            <Image
              src="/images/brand/logo-kreativa-cambridge-white.png"
              alt="Kreativa Global School — Cambridge International School"
              width={1200}
              height={466}
              priority
              className="hidden h-12 w-auto sm:h-15 hero-header:block"
            />
          </Link>

          <DesktopNav items={items} levels={levels} catalogHref={href("/schools/high-school/subjects")} labels={labels} />

          <div className="flex items-center gap-2">
            {/* Disembunyikan di layar < 380px agar header tidak melebar; CTA tetap ada di menu mobile. */}
            <div className="max-[379px]:hidden">
              <ButtonLink href={enrollHref} variant="primary" size="md">
                {dict.ui.enrollNow}
              </ButtonLink>
            </div>
            <MobileNav
              locale={locale}
              homeHref={href("/")}
              items={items}
              levels={levels}
              labels={labels}
              enrollHref={enrollHref}
              tourHref={tourHref}
            />
          </div>
        </div>
      </HeaderShell>
    </>
  );
}
