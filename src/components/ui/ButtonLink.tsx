import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // CTA utama (Enroll / Daftar) — accent-600 agar teks putih lolos kontras AA
  primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm shadow-accent-700/20",
  secondary: "bg-brand-600 text-white hover:bg-brand-700",
  outline: "border border-brand-200 text-brand-700 hover:border-brand-600 hover:bg-brand-50",
  light: "bg-white text-brand-700 hover:bg-brand-50",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;
}

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Tautan eksternal: dibuka di tab baru + rel aman. */
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, external, children, ...rest }: Props) {
  const cls = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={String(rest.href)} target="_blank" rel="noopener noreferrer" className={cls} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  // Anchor di halaman yang sama (#ready): <a> biasa agar browser menggulir & memperbarui URL secara native.
  if (typeof rest.href === "string" && rest.href.startsWith("#")) {
    return (
      <a href={rest.href} className={cls} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  return (
    <Link {...rest} className={cls}>
      {children}
    </Link>
  );
}
