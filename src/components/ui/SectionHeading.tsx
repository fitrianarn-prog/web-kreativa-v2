import type { ReactNode } from "react";

/** Label kecil berbentuk pil di atas judul section. */
export function Eyebrow({ light = false, children }: { light?: boolean; children: ReactNode }) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
        light ? "border-white/20 bg-white/10 text-white" : "border-brand-100 bg-brand-50 text-brand-600"
      }`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${light ? "bg-white/70" : "bg-brand-400"}`} />
      {children}
    </p>
  );
}

/** Garis pemisah tipis di bawah judul (aksen pink kecil di tengah). */
export function HeadingDivider({ center = true }: { center?: boolean }) {
  return (
    <span aria-hidden className={`mt-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
      {center && <span className="h-px w-12 bg-current opacity-15" />}
      <span className="h-1 w-8 rounded-full bg-accent-500" />
      <span className="h-px w-12 bg-current opacity-15" />
    </span>
  );
}

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Judul section yang konsisten: eyebrow kecil, H2, dan subjudul opsional. */
export function SectionHeading({ id, eyebrow, title, subtitle, align = "center", tone = "dark", className = "" }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-2xl leading-tight font-bold text-balance md:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <HeadingDivider center={center} />
      {subtitle && <p className={`mt-4 text-sm text-pretty md:text-lg ${light ? "text-white/80" : "text-muted"}`}>{subtitle}</p>}
    </div>
  );
}
