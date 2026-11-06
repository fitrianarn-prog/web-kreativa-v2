# Kreativa Global School — Website v2

Situs bilingual (EN/ID) Kreativa Global School. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, di-deploy ke Vercel.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000 (EN tanpa prefiks; ID di /id)
npm run lint
npm run typecheck
npm run build && npm start
```

## Struktur

```
src/app/[locale]/            Halaman (EN & ID, slug sama) — root layout ada di sini
src/app/global-not-found.tsx 404 untuk URL yang tidak dikenal
src/app/sitemap.ts, robots.ts
src/proxy.ts                 EN tanpa prefiks (rewrite internal ke /en); /en/... lama → 308 ke versi tanpa prefiks
src/lib/legacy-redirects.ts  301 dari URL WordPress lama
src/content/{en,id}/         Teks per halaman & bahasa (home, about, kindergarten, primary, secondary,
                             high-school, subjects, admission, career, contact, blocks = blok bersama)
src/content/shared/          Satu sumber kebenaran: site.json (kontak, kampus, tautan), fees.json,
                             electives.json, hs-credits.json
src/lib/content.ts           Loader konten + fallback EN per section untuk halaman /id
src/components/              layout/, ui/, blocks/ (blok bersama jenjang), home/, subjects/, icons/, seo/
scripts/                     import-legacy-assets.mjs, build-brand-assets.mjs, build-electives.mjs
docs/SPEC.md                 Spesifikasi
CONTENT_REVIEW.md            Status data resmi, konflik, dan yang perlu persetujuan sekolah
docs/QA-REPORT.md            Hasil QA teknis (Lighthouse, aksesibilitas, checklist spec) + daftar sebelum go-live
```

## Memperbarui data

- **Biaya tahun ajaran baru:** edit `src/content/shared/fees.json` (dan ganti PDF di `public/brochures/`).
- **Kontak/kampus/tautan:** `src/content/shared/site.json`.
- **Kredit High School:** `src/content/shared/hs-credits.json` (label per bahasa di `high-school.json`).
- **Terjemahan ID baru:** tambahkan section yang sama strukturnya ke `src/content/id/<halaman>.json`. Section yang tidak ada di file ID otomatis tampil dalam EN dengan `lang="en"`.
- **Mata pelajaran pilihan:** perbarui `docs/SPEC.md`, lalu jalankan `node scripts/build-electives.mjs`.
- **Aset dari situs lama:** `node scripts/import-legacy-assets.mjs` (sumber: `.legacy-assets/raw`), lalu `node scripts/build-brand-assets.mjs` untuk favicon & gambar Open Graph.

## Deploy (Vercel)

Set `NEXT_PUBLIC_SITE_URL` di Production. Deploy Preview otomatis `Disallow: /` di robots.txt.
