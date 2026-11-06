import type { ReactNode } from "react";
import { Eyebrow, HeadingDivider } from "@/components/ui/SectionHeading";

type Props = {
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  /** "en" bila isi section memakai teks EN di halaman /id (fallback). */
  lang?: string;
  /** Bahasa judul (diisi "en" hanya bila judulnya juga fallback EN). */
  titleLang?: string;
  tone?: "white" | "surface" | "brand";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

const tones = {
  white: "bg-white",
  surface: "bg-surface bg-dots",
  brand: "bg-linear-to-br from-brand-700 to-brand-800 text-white",
};

/** Section konten standar dengan H2. */
export function Section({ id, title, eyebrow, intro, lang, titleLang, tone = "white", align = "left", children, className = "" }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const light = tone === "brand";
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`py-14 lg:py-20 ${tones[tone]} ${className}`}>
      <div className="container-page">
        {title && (
          <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
            <h2 id={headingId} lang={titleLang} className={`text-2xl leading-tight font-bold text-balance md:text-4xl ${light ? "text-white" : "text-ink"}`}>
              {title}
            </h2>
            <HeadingDivider center={align === "center"} />
            {intro && (
              <p lang={lang} className={`mt-4 text-sm text-pretty md:text-lg ${light ? "text-white/80" : "text-muted"}`}>
                {intro}
              </p>
            )}
          </div>
        )}
        <div lang={lang} className={title ? "mt-10" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
