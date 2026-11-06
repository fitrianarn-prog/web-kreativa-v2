# Kreativa Global School — website v2

@AGENTS.md

- Spesifikasi lengkap: `docs/SPEC.md` (konten, sitemap, biaya, redirect, isu yang harus diperbaiki). Jangan diubah; salinan lampiran asli ada di `kreativa-website-spec.md`.
- Status data resmi & konflik: `CONTENT_REVIEW.md`. Perbarui setiap kali menemukan konflik/kekosongan baru.
- Stack: Next.js 16.3 (App Router) + React 19 + TypeScript strict + Tailwind v4 (`@theme` di `src/app/globals.css`). Ikon: `lucide-react`; ikon merek: `src/components/icons/BrandIcon.tsx`.
- Next 16: `middleware` → `src/proxy.ts`; `params` berupa Promise; pakai `PageProps<'/…'>` / `LayoutProps<'/…'>`. Baca `node_modules/next/dist/docs/` sebelum memakai API yang belum familiar.

## Aturan konten
- Teks halaman diambil dari `src/content/{en,id}/*.json` — jangan hardcode copy di komponen.
- Biaya, kontak, kampus, tautan eksternal, tahun ajaran **hanya** di `src/content/shared/` (`fees.json`, `site.json`).
- `electives.json` dibangun dari spec: `node scripts/build-electives.mjs` — jangan edit manual.
- Jangan mengarang terjemahan atau informasi resmi. Terjemahan resmi yang belum ada → **hapus section itu dari file ID** (loader `defineContent` di `src/lib/content.ts` otomatis fallback ke EN dan mengembalikan `lang: "en"`, pasang di elemen pembungkusnya). Untuk data per item (electives) pakai `Localized<T>` / `id: null`. Catat di CONTENT_REVIEW.md.
- Section konten harus berupa objek (bukan string/array) agar bisa diberi `lang`.
- Tabel/diagram yang dulu berupa gambar WAJIB dibuat ulang sebagai HTML.
- Blok bersama halaman jenjang (visi-misi, pendiri, inisiatif + SDG, tujuan, 7 karakter, kerangka kurikulum, klub): `src/components/blocks/SchoolBlocks.tsx` + `src/content/{en,id}/blocks.json`.

## Aturan teknis
- Server Components secara default; `"use client"` hanya untuk bagian interaktif (menu, carousel, accordion, tab, filter).
- Rute: `/[locale]/…` dengan slug sama untuk EN & ID; anchor ID (`#faq`, `#fees`, …) sama di kedua bahasa. Gunakan `localeHref()` dari `src/lib/routes.ts`. URL bahasa Inggris tanpa prefiks (`/about`; proxy me-rewrite ke `/en/about`), ID di `/id/about`. Di komponen klien pakai `usePublicPathname()` (bukan `usePathname()`) agar tidak terjadi hydration mismatch.
- Metadata halaman lewat `pageMetadata()` di `src/lib/seo.ts` (canonical + hreflang + OG).
- Gambar lokal di `public/images/**` via `next/image`. Aset situs lama: `node scripts/import-legacy-assets.mjs`.
- Aksesibilitas: menu bisa dipakai keyboard (`aria-expanded`, Esc), hormati `prefers-reduced-motion`, kontras AA (CTA pakai `accent-600`, bukan `accent-500`, untuk teks putih). Tab pakai `src/components/ui/Tabs.tsx`; accordion pakai `<details>`.
- Kontainer `overflow-x-auto` (tabel) wajib `relative`: elemen `sr-only` (absolute) di dalamnya bisa melebarkan halaman mobile.
- Gaya visual mengikuti web Talenta Juara (permintaan pemilik proyek, Nov 2026): skala & gaya komponen saja — font tetap Poppins sesuai Brand Guideline Kreativa; teks abu-abu netral `ink` #4D4D4F, skala huruf diperkecil di `@theme` (globals.css), label section berbentuk pil + garis pemisah (`Eyebrow`, `HeadingDivider`), latar section `bg-surface bg-dots`. Warna tetap warna Kreativa (provisional): brand-600 #3B358D, pink logo #EA3B5F dilembutkan (accent-600 #BF4467 untuk CTA), navy-700 #1E2A5E. Jangan memakai warna/logo/aset Talenta Juara.
- Header transparan di atas hero: beri atribut `data-header-overlay` pada section hero (Beranda & `PageHero` sudah) dan tarik hero ke atas `-mt-[calc(7rem+2px)] lg:-mt-[calc(7.5rem+2px)]`. Styling pakai varian Tailwind `hero-header:` / `hero-topbar:` (globals.css, murni CSS :has). Header jadi putih solid setelah scroll > 40px atau saat menu terbuka.
- Tombol WhatsApp mengambang (`WhatsAppFloat`) = panel pesan ala Talenta Juara, tapi tanpa kolom nomor pengirim & tanpa notifikasi Telegram (situs ini tidak punya backend); "Kirim" membuka wa.me ke nomor di `site.json`.
- Sebelum menyatakan halaman selesai: `npm run lint`, `npm run typecheck`, `npm run build`, lalu cek checklist `docs/SPEC.md` Bagian 6.
- Jangan ubah apa pun di `../web-talentajuara-dev` (hanya referensi). Jangan deploy tanpa persetujuan.
