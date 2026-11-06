"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicPathname } from "@/lib/i18n/use-public-pathname";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { levelColorClass, type HeaderLabels, type LevelCard, type NavItem } from "./nav-types";

type Props = {
  locale: Locale;
  homeHref: string;
  items: NavItem[];
  levels: LevelCard[];
  labels: HeaderLabels;
  enrollHref: string;
  tourHref: string;
};

export function MobileNav({ locale, homeHref, items, levels, labels, enrollHref, tourHref }: Props) {
  const pathname = usePublicPathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Kunci scroll halaman, fokus ke tombol tutup, Esc menutup, dan fokus tidak keluar dari dialog.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const root = document.getElementById(dialogId);
        const focusables = root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, dialogId]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={dialogId}
        className="inline-flex size-11 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50 hero-header:text-white hero-header:hover:bg-white/10"
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">{labels.openMenu}</span>
      </button>

      {/* Portal ke <body>: header memakai backdrop-filter, yang membuat elemen position:fixed
          di dalamnya terkurung setinggi header. */}
      {open &&
        createPortal(
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={labels.mainNavigation}
          className="fixed inset-0 z-60 flex flex-col bg-white"
        >
          <div className="container-page flex h-18 shrink-0 items-center justify-between border-b border-line">
            <Link href={homeHref} onClick={() => setOpen(false)} className="flex items-center">
              <Image
                src="/images/brand/logo-kreativa-cambridge.png"
                alt="Kreativa Global School — Cambridge International School"
                width={600}
                height={179}
                className="h-10 w-auto"
              />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50 hero-header:text-white hero-header:hover:bg-white/10"
            >
              <X className="size-6" aria-hidden />
              <span className="sr-only">{labels.closeMenu}</span>
            </button>
          </div>

          <nav aria-label={labels.mainNavigation} className="flex-1 overflow-y-auto">
            <ul className="container-page divide-y divide-line py-2">
              {items.map((item) => {
                if (item.children.length === 0 && item.href) {
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="block py-4 text-lg font-semibold text-ink aria-[current=page]:text-brand-600"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === item.id;
                const panelId = `${dialogId}-${item.id}`;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-ink"
                    >
                      {item.label}
                      <ChevronDown className={`size-5 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    <ul id={panelId} hidden={!isOpen} className="pb-4">
                      {item.href && (
                        <li>
                          <Link href={item.href} className="block rounded-xl px-3 py-2.5 font-medium text-brand-700 hover:bg-brand-50">
                            {labels.overview}
                          </Link>
                        </li>
                      )}
                      {item.id === "schools"
                        ? levels.map((l) => (
                            <li key={l.id}>
                              <Link href={l.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface">
                                <span aria-hidden className={`h-8 w-1.5 rounded-full ${levelColorClass[l.id]}`} />
                                <span>
                                  <span className="block font-medium text-ink">{l.name}</span>
                                  <span className="block text-xs text-muted">{l.grades}</span>
                                </span>
                              </Link>
                            </li>
                          ))
                        : null}
                      {item.children
                        .filter((c) => item.id !== "schools" || !levels.some((l) => l.href === c.href))
                        .map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-xl px-3 py-2.5 text-ink/80 hover:bg-surface hover:text-brand-700">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-page shrink-0 space-y-3 border-t border-line py-4">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Link href={enrollHref} className={buttonClasses("primary", "md")}>
                {labels.enrollNow}
              </Link>
              <a href={tourHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "md")}>
                {labels.scheduleTour}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{labels.languageLabel}</span>
              <LanguageSwitcher current={locale} label={labels.languageLabel} switchToLabel={labels.switchTo} landmark={false} />
            </div>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
