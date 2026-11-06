"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Header sticky. Di halaman ber-hero, header transparan selama masih di area banner (varian
 * hero-header di globals.css) dan menjadi putih solid + bayangan setelah top bar terlewati.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-site-header=""
      data-scrolled={scrolled ? "" : undefined}
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-[background-color,border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-white/90 hero-header:border-white/15 hero-header:bg-transparent hero-header:backdrop-blur-none hero-header:supports-[backdrop-filter]:bg-transparent ${
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgb(27_24_68/0.25)]" : "border-transparent"
      }`}
    >
      {children}
    </header>
  );
}
