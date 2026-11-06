"use client";

import { useRouter } from "next/navigation";
import { usePublicPathname } from "@/lib/i18n/use-public-pathname";
import type { MouseEvent } from "react";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/routes";

type Props = {
  current: Locale;
  label: string;
  switchToLabel: string;
  tone?: "dark" | "light";
  className?: string;
  /** false = grup biasa (bukan landmark nav), mis. di dalam menu mobile agar tidak ada dua landmark "Language". */
  landmark?: boolean;
};

/**
 * Pengalih EN/ID ke halaman padanan (bukan ke beranda). Anchor (#faq dll.) dipertahankan
 * karena ID anchor sama di kedua bahasa.
 */
export function LanguageSwitcher({ current, label, switchToLabel, tone = "dark", className = "", landmark = true }: Props) {
  const pathname = usePublicPathname();
  const router = useRouter();

  const go = (e: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    router.push(switchLocalePath(pathname, target) + window.location.hash);
  };

  const Wrapper = landmark ? "nav" : "div";
  const wrapperProps = landmark ? {} : { role: "group" as const };
  const base = tone === "light" ? "text-white/75 hover:text-white" : "text-muted hover:text-brand-700 hero-topbar:text-white/80 hero-topbar:hover:text-white";
  const active = tone === "light" ? "bg-white text-brand-700" : "bg-brand-600 text-white hero-topbar:bg-white hero-topbar:text-brand-700";

  return (
    <Wrapper {...wrapperProps} aria-label={label} className={`flex items-center gap-1 ${className}`}>
      {locales.map((l) => {
        const isCurrent = l === current;
        return (
          <a
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            onClick={(e) => go(e, l)}
            aria-current={isCurrent ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${isCurrent ? active : base}`}
          >
            {/* Nama aksesibel diawali teks yang terlihat (EN/ID) — WCAG 2.5.3 Label in Name. */}
            {localeMeta[l].short}
            <span className="sr-only">
              {" "}
              ({isCurrent ? "" : `${switchToLabel} `}
              <span lang={l}>{localeMeta[l].label}</span>)
            </span>
          </a>
        );
      })}
    </Wrapper>
  );
}
