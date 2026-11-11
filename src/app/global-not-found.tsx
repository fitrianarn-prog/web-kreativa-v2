import type { Metadata } from "next";
import Link from "next/link";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "404 — Kreativa Global School",
  robots: { index: false },
};

/** 404 untuk URL yang tidak cocok dengan rute mana pun (root layout berada di app/[locale]). */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh items-center justify-center bg-surface px-4">
        <main className="max-w-lg text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- halaman ini dirender di luar pipeline next/image */}
          <img
            src="/images/brand/logo-kreativa-cambridge.png"
            alt="Kreativa Global School — Cambridge International School"
            width={600}
            height={179}
            className="mx-auto h-14 w-auto"
          />
          <p className="mt-10 text-6xl font-bold text-brand-600">404</p>
          <h1 className="mt-3 text-xl font-semibold text-ink">Page not found</h1>
          <p className="text-muted" lang="id">
            Halaman tidak ditemukan
          </p>
          <p className="mt-4 text-sm text-muted">
            The page may have moved as part of our new website. <span lang="id">Halaman mungkin telah dipindahkan.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Home (English)
            </Link>
            <Link
              href="/id"
              lang="id"
              className="rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Beranda (Indonesia)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
