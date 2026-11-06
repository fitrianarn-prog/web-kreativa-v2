import type { LevelId } from "@/lib/i18n/dictionaries";

export type NavLink = { label: string; href: string };

export type NavItem = {
  id: string;
  label: string;
  /** Halaman induk (sudah berprefiks bahasa); null bila hanya pengelompokan. */
  href: string | null;
  children: NavLink[];
};

export type LevelCard = {
  id: LevelId;
  name: string;
  grades: string;
  summary: string;
  href: string;
};

export type HeaderLabels = {
  mainNavigation: string;
  openMenu: string;
  closeMenu: string;
  overview: string;
  enrollNow: string;
  scheduleTour: string;
  languageLabel: string;
  switchTo: string;
  schoolsHeading: string;
  schoolsIntro: string;
  catalogLabel: string;
  catalogDescription: string;
  contactUs: string;
};

export const levelColorClass: Record<LevelId, string> = {
  kindergarten: "bg-level-kindergarten",
  primary: "bg-level-primary",
  secondary: "bg-level-secondary",
  "high-school": "bg-level-high-school",
};
