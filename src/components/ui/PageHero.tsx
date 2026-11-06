import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type Tone = "brand" | "kindergarten" | "primary" | "secondary" | "high-school" | "navy";

const toneClass: Record<Tone, string> = {
  // Gradien lembut: gelap di sisi teks (kontras), foto tetap terlihat di sisi kanan.
  brand: "from-brand-900/85 via-brand-800/65 to-brand-700/20",
  navy: "from-navy-900/85 via-navy-800/65 to-navy-700/20",
  kindergarten: "from-brand-900/85 via-level-kindergarten/60 to-level-kindergarten/20",
  primary: "from-brand-900/85 via-level-primary/60 to-level-primary/20",
  secondary: "from-brand-900/85 via-level-secondary/60 to-level-secondary/20",
  "high-school": "from-navy-900/85 via-level-high-school/60 to-level-high-school/20",
};

const solidClass: Record<Tone, string> = {
  brand: "bg-brand-700",
  navy: "bg-navy-700",
  kindergarten: "bg-level-kindergarten",
  primary: "bg-level-primary",
  secondary: "bg-level-secondary",
  "high-school": "bg-level-high-school",
};

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  tone?: Tone;
  breadcrumbs?: { label: string; href?: string }[];
  breadcrumbLabel?: string;
  lang?: string;
  children?: ReactNode;
  /** Gambar hero sebagai elemen LCP: dimuat lebih awal. */
  priority?: boolean;
};

/** Hero halaman dalam: foto latar + gradien warna jenjang, judul H1, subjudul, dan tombol opsional. */
export function PageHero({ title, subtitle, eyebrow, image, tone = "brand", breadcrumbs, breadcrumbLabel = "Breadcrumb", lang, children, priority = true }: Props) {
  return (
    <section
      data-header-overlay=""
      className={`relative isolate -mt-[calc(7rem+2px)] overflow-hidden text-white lg:-mt-[calc(7.5rem+2px)] ${solidClass[tone]}`}
    >
      {image && (
        <Image src={image} alt="" fill priority={priority} sizes="100vw" className="-z-20 object-cover" />
      )}
      <div aria-hidden className={`absolute inset-0 -z-10 bg-linear-to-r ${toneClass[tone]}`} />
      {/* Gradien atas tipis agar menu transparan tetap terbaca */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-48 bg-linear-to-b from-brand-900/70 to-transparent" />
      <div className="container-page pt-[calc(7rem+3.5rem)] pb-14 sm:pt-[calc(7rem+4.5rem)] sm:pb-18 lg:pt-[calc(7.5rem+5.5rem)] lg:pb-22">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label={breadcrumbLabel} className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white hover:underline">
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div lang={lang} className="max-w-3xl">
          {eyebrow && <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm">{eyebrow}</p>}
          <h1 className="text-3xl leading-tight font-bold text-balance md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-base font-light text-pretty text-white/90 md:text-xl">{subtitle}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
