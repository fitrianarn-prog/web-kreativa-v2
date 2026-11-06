import Link from "next/link";
import { buttonClasses } from "@/components/ui/ButtonLink";

// Dipakai bila notFound() dipanggil di dalam halaman berbahasa. Bahasa tidak tersedia di sini
// (not-found tidak menerima params), jadi teks ditampilkan dalam dua bahasa.
export default function LocaleNotFound() {
  return (
    <section className="container-page flex flex-col items-center py-28 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">
        Page not found <span className="text-muted">·</span> <span lang="id">Halaman tidak ditemukan</span>
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses("secondary")}>
          Back to home
        </Link>
        <Link href="/id" lang="id" className={buttonClasses("outline")}>
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
