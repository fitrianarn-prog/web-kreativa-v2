import { brandPaths, type BrandIcon as BrandIconId } from "./brand-paths";

type Props = { id: BrandIconId | "linkedin"; className?: string };

/** Ikon brand media sosial (lucide-react 1.x tidak lagi menyediakan ikon merek). */
export function BrandIcon({ id, className = "size-5" }: Props) {
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="22" height="22" rx="4" fill="currentColor" />
        <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="var(--icon-bg, #fff)">
          in
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d={brandPaths[id]} />
    </svg>
  );
}
