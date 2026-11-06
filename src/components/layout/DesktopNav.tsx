"use client";

import Link from "next/link";
import { usePublicPathname } from "@/lib/i18n/use-public-pathname";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, BookOpenText, ChevronDown } from "lucide-react";
import { levelColorClass, type HeaderLabels, type LevelCard, type NavItem } from "./nav-types";

type Props = {
  items: NavItem[];
  levels: LevelCard[];
  catalogHref: string;
  labels: HeaderLabels;
};

const isActive = (pathname: string, href: string | null) =>
  !!href && (pathname === href || pathname.startsWith(`${href}/`));

export function DesktopNav({ items, levels, catalogHref, labels }: Props) {
  const pathname = usePublicPathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseId = useId();

  // Tutup saat pindah halaman (reset saat render, tanpa efek), klik di luar, atau tombol Esc.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenId(null);
  }
  useEffect(() => {
    if (!openId) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [openId]);

  const openNow = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  };

  const onKeyDown = (e: KeyboardEvent, id: string) => {
    if (e.key === "Escape" && openId === id) {
      setOpenId(null);
      document.getElementById(`${baseId}-${id}-btn`)?.focus();
    }
  };

  return (
    <nav ref={navRef} aria-label={labels.mainNavigation} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active =
            isActive(pathname, item.href) || item.children.some((c) => isActive(pathname, c.href.split("#")[0]));
          const linkCls = `relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
            active
              ? "text-brand-700 hero-header:text-white"
              : "text-ink/80 hover:text-brand-700 hero-header:text-white/90 hero-header:hover:text-white"
          }`;

          if (item.children.length === 0 && item.href) {
            return (
              <li key={item.id}>
                <Link href={item.href} className={linkCls} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                  {active && <ActiveDot />}
                </Link>
              </li>
            );
          }

          const open = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const isSchools = item.id === "schools";

          return (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => openNow(item.id)}
              onMouseLeave={closeSoon}
              onKeyDown={(e) => onKeyDown(e, item.id)}
            >
              <button
                id={`${baseId}-${item.id}-btn`}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => (open ? setOpenId(null) : openNow(item.id))}
                className={`${linkCls} inline-flex items-center gap-1`}
              >
                {item.label}
                <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                {active && <ActiveDot />}
              </button>

              <div
                id={panelId}
                hidden={!open}
                className={`absolute top-full pt-3 ${isSchools ? "left-1/2 w-[min(860px,92vw)] -translate-x-1/2" : "left-0 w-72"}`}
              >
                <div className="overflow-hidden rounded-card border border-line bg-white shadow-float">
                  {isSchools ? (
                    <SchoolsPanel levels={levels} catalogHref={catalogHref} labels={labels} pathname={pathname} />
                  ) : (
                    <ul className="p-2">
                      {item.href && (
                        <li>
                          <Link
                            href={item.href}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                          >
                            {labels.overview}: {item.label}
                            <ArrowRight className="size-4" aria-hidden />
                          </Link>
                        </li>
                      )}
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-xl px-3 py-2.5 text-sm text-ink/80 hover:bg-surface hover:text-brand-700"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveDot() {
  return <span aria-hidden className="absolute inset-x-0 -bottom-0.5 mx-auto block size-1 rounded-full bg-accent-500" />;
}

function SchoolsPanel({
  levels,
  catalogHref,
  labels,
  pathname,
}: {
  levels: LevelCard[];
  catalogHref: string;
  labels: HeaderLabels;
  pathname: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_15rem]">
      <div className="p-5">
        <p className="text-xs font-semibold tracking-wider text-muted uppercase">{labels.schoolsHeading}</p>
        <p className="mt-1 text-sm text-muted">{labels.schoolsIntro}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {levels.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="group flex h-full gap-3 rounded-2xl border border-transparent p-3 transition-colors hover:border-line hover:bg-surface"
              >
                <span aria-hidden className={`mt-1 h-10 w-1.5 shrink-0 rounded-full ${levelColorClass[l.id]}`} />
                <span>
                  <span className="flex items-center gap-1 font-semibold text-ink group-hover:text-brand-700">
                    {l.name}
                    <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </span>
                  <span className="block text-xs font-medium text-brand-600">{l.grades}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">{l.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={catalogHref}
        className="group flex flex-col justify-between bg-navy-700 p-5 text-white transition-colors hover:bg-navy-800"
      >
        <BookOpenText className="size-8 text-accent-200" aria-hidden />
        <span>
          <span className="block font-semibold">{labels.catalogLabel}</span>
          <span className="mt-1 block text-xs leading-relaxed text-white/75">{labels.catalogDescription}</span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-200">
            {labels.overview}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </span>
      </Link>
    </div>
  );
}
