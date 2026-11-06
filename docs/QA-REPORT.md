# Laporan QA — Kreativa Global School Website v2

Untuk: tim pengembang & pemilik proyek. Tanggal: 5 November 2026 (Fase 5).
Status konten resmi, konflik, dan hal yang menunggu keputusan sekolah ada di `CONTENT_REVIEW.md` — dokumen ini hanya membahas kualitas teknis.

## 1. Ringkasan

| Area | Hasil |
|---|---|
| Build produksi | ✅ `npm run build` — 136 halaman statis (11 rute × 2 bahasa + 110 halaman mata pelajaran + metadata), tanpa warning |
| Lint & typecheck | ✅ `npm run lint`, `npm run typecheck` bersih |
| Lighthouse mobile (12 halaman) | ✅ Performa 91–95 · Aksesibilitas 100 · Best Practices 100 · SEO 100 · CLS 0 |
| Aksesibilitas (axe-core, WCAG 2.2 A/AA + best practice) | ✅ 0 pelanggaran di 24 halaman × desktop/mobile + keadaan interaktif (lihat 3) |
| Uji interaksi (Playwright, Edge) | ✅ 97/97 (Fase 2: 23 · Fase 3: 23 · Fase 4: 51) |
| Tautan internal | ✅ 242 tautan unik dicek: semua 200 dan setiap anchor (#faq, #fees, …) ada di halaman tujuan |
| Redirect URL lama | ✅ 301, satu hop, dengan atau tanpa "/" di akhir |

## 2. Lighthouse (preset mobile: Slow 4G, CPU 4×)

Setiap halaman diukur dalam sesi browser baru (Microsoft Edge headless, server `next start`).

| Halaman | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| /en (Beranda)* | 91 | 100 | 100 | 100 | 3,5 s | 40 ms | 0 |
| /id (Beranda)* | 91 | 100 | 100 | 100 | 3,5 s | 40 ms | 0 |
| /en/about | 93 | 100 | 100 | 100 | 3,2 s | 40 ms | 0 |
| /id/schools/kindergarten | 93 | 100 | 100 | 100 | 3,2 s | 40 ms | 0 |
| /en/schools/primary | 93 | 100 | 100 | 100 | 3,2 s | 40 ms | 0 |
| /id/schools/secondary | 93 | 100 | 100 | 100 | 3,2 s | 40 ms | 0 |
| /en/schools/high-school | 93 | 100 | 100 | 100 | 3,2 s | 40 ms | 0 |
| /id/schools/high-school/subjects | 94 | 100 | 100 | 100 | 3,1 s | 40 ms | 0 |
| /en/…/subjects/global-issues-un-diplomacy-mun | 94 | 100 | 100 | 100 | 3,0 s | 40 ms | 0 |
| /id/admission | 95 | 100 | 100 | 100 | 3,0 s | 40 ms | 0 |
| /en/career | 95 | 100 | 100 | 100 | 3,0 s | 50 ms | 0 |
| /id/contact | 93 | 100 | 100 | 100 | 3,0 s | 50 ms | 0 |

\* **Catatan pengukuran Beranda.** Edge headless tidak mempresentasikan frame video, sehingga Chromium tidak pernah melaporkan LCP saat video hero diputar (`NO_LCP`). Beranda diukur dengan `--force-prefers-reduced-motion` (video tidak diputar, poster tampil). **Ukur ulang Beranda dengan PageSpeed Insights setelah deploy** untuk angka dengan video aktif.

**Catatan lain:**
- Mengukur beberapa halaman berurutan dalam satu sesi browser menurunkan skor halaman berikutnya (TBT naik ke ±1 detik) — artefak pengukuran, bukan sifat halaman. Selalu ukur per halaman di sesi baru.
- LCP 3,0–3,5 s (simulasi Slow 4G) berasal dari gambar hero. Di bawah ambang "good" Lighthouse 2,5 s untuk koneksi lambat; skor tetap ≥ 90. Bisa diperbaiki lagi bila sekolah menyediakan foto hero beresolusi tepat (lihat 6).

## 3. Aksesibilitas

**axe-core 4** (tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`), 12 rute × 2 bahasa × desktop 1366 px & mobile 390 px, ditambah: setiap tab biaya, semua FAQ terbuka, mega menu terbuka (desktop), menu mobile terbuka.

Hasil akhir: **0 pelanggaran**. Satu temuan `target-size` tersisa hanya saat mega menu terbuka menutupi tombol FAQ di belakangnya — keadaan overlay yang memang disengaja, bukan masalah.

Diperbaiki pada Fase 5:
- Carousel testimoni: `role="group"` di `<li>` (tidak valid) → `div`; region carousel diganti grup agar landmark tidak ganda; track bisa difokus keyboard.
- Pengalih bahasa: nama aksesibel kini diawali teks yang terlihat ("EN"/"ID") — WCAG 2.5.3 *Label in Name*.
- Urutan heading (h2 → h4) di diagram kurikulum & panel biaya.
- Kontras: referensi ayat (4,41 → `accent-700`); kartu SDG — warna resmi SDG kini hanya dipakai sebagai lencana angka (teks besar), nama SDG berwarna gelap di latar putih.
- Gambar fasilitas: `alt` yang sama dengan keterangan dihapus (`alt=""`).
- Tabel yang bisa digeser horizontal kini bisa difokus keyboard (`tabIndex=0`).
- Top bar (telepon/email) dan tombol WhatsApp mengambang ditempatkan dalam landmark.
- Menu mobile: pengalih bahasa di dalam dialog bukan landmark kedua.

Sudah ada sejak Fase 2–4 (diuji otomatis): skip link, menu keyboard (`aria-expanded`, Esc, fokus kembali), focus trap menu mobile, tab WAI-ARIA (panah/Home/End), accordion `<details>`, `prefers-reduced-motion` (video hero tidak diputar, animasi mati), `lang="en"` pada teks fallback di halaman /id.

## 4. Performa — perubahan Fase 5

- Video hero baru dimuat & diputar **setelah halaman selesai dimuat dan browser idle** (`preload="none"`, `requestIdleCallback`). Tidak diputar sama sekali bila *reduced motion* atau *Save-Data* aktif. Poster + teks hero tampil lebih dulu; video (±1,2 MB) tidak berebut bandwidth.
- Poster hero di-*preload* dengan `fetchPriority="high"` dan diperkecil 117 KB → 79 KB (1280 px, tertutup gradien).
- JavaScript total ±158 KB (terkompresi), sebagian besar React 19; tidak ada skrip pihak ketiga selain iframe Google Maps (lazy) dan YouTube (dimuat hanya setelah tombol putar diklik).

## 5. Checklist spec Bagian 6

| # | Masalah situs lama | Status |
|---|---|---|
| 1 | "Learn More" Primary/Secondary ke halaman lama | ✅ Ke /schools/primary & /schools/secondary |
| 2 | Footer EN memakai /primary, /secondary | ✅ Diperbaiki |
| 3 | "Selengkapnya" di Beranda ID ke halaman EN | ✅ Semua tautan mengikuti bahasa aktif |
| 4 | Tombol daftar ke 3 domain berbeda | ✅ Satu: admission.kreativaglobal.sch.id (dari `site.json`) |
| 5 | Nomor WA tur berbeda di Beranda ID | ✅ Nomor utama di semua tempat · 🟡 konfirmasi nomor kedua (CONTENT_REVIEW #2) |
| 6 | Sidebar tanpa target; Principal Message tanpa isi | ✅ Navigasi section hanya berisi section yang ada; sambutan Principal SD ditampilkan |
| 7 | Menu & footer SD ID ke dua halaman berbeda | ✅ Satu halaman; kedua URL lama di-redirect |
| 8 | Klaim kurikulum tidak seragam | 🟡 Beranda mengikuti teks live terbaru; FAQ masih menyebut IB — menunggu kalimat resmi (#6) |
| 9 | Alamat No. 40 vs No. 39 | ✅ Satu sumber (`site.json`, No. 39) · 🟡 konfirmasi (#3) |
| 10 | Email .sch.id vs .id | ✅ Satu alamat · 🟡 konfirmasi .id (#4) |
| 11 | Jam buka typo "8am-16pm" | ✅ "08.00 – 16.00 WIB" · 🟡 apakah Sabtu buka (#5) |
| 12 | "7 Moslem Characters" vs "7 Muslim Kreativa" | 🟡 Ditampilkan apa adanya, menunggu nama resmi (#12) |
| 13 | Pembagian kelas SMP bertentangan | 🟡 Struktur EN dipakai; konfirmasi (#7) |
| 14 | Urutan & istilah skema biaya | ✅ Konsisten, tanpa nomor, nama resmi EN/ID |
| 15 | Kredit Negotiation Analysis kosong | 🟡 Tampil "—" sampai ada angka (#Bagian 3) |
| 16 | Typo & nama brosur `.pdf.pdf` | ✅ Tidak ada di situs baru; brosur `.pdf`, URL lama di-redirect |
| 17 | Paragraf "Our Logo" tentang etalase toko | 🟡 Tidak ditampilkan, menunggu teks pengganti (R5) |
| 18 | Halaman ID lama/berbahasa Inggris | 🟡 Teks ID resmi dipakai di mana ada; sisanya fallback EN bertanda `lang="en"` |
| 19 | Rencana Gedung & Profil Guru hanya di ID | ✅ Fasilitas tampil di kedua bahasa · 🟡 profil guru menunggu izin |
| 20 | Tabel/diagram berupa gambar | ✅ Biaya, kurikulum, kredit, SDG, klub, Student Life, info karier — semuanya HTML |
| 21 | Halaman sampah terindeks | ✅ Tidak dimigrasi; 301; sitemap hanya halaman nyata (130 URL) |
| 22 | Testimoni terduplikasi di DOM | ✅ Setiap testimoni dirender sekali |
| 23 | Sisa warna Divi `#2EA3F2` | ✅ Tidak dipakai |

Spec 8.6 (non-fungsional): Lighthouse ≥ 90 ✅ · WebP/AVIF + lazy load ✅ · tabel HTML ✅ · meta EN/ID, hreflang, sitemap ✅ · schema.org `School`/`EducationalOrganization` + `FAQPage` + `Course` ✅ · kontras, alt, keyboard ✅ · **Analytics & event klik ❌ belum** — menunggu ID GA4 dari sekolah.

## 6. Sebelum go-live (wajib)

1. **Keputusan konten sekolah** — terutama tabel kredit SMA (CONTENT_REVIEW #8), seluruh angka biaya 2027/2028 (Bagian 4 butir 1), klaim kurikulum (#6), dan izin foto anak/testimoni (Bagian 4).
2. **Vercel**: set `NEXT_PUBLIC_SITE_URL=https://kreativaglobal.sch.id` di Production; arahkan domain; pastikan `admission.`/`career.` subdomain tetap mengarah ke sistem yang ada.
3. **Setelah deploy**: PageSpeed Insights untuk Beranda (video aktif), Google Search Console (kirim sitemap, pantau 404 dari URL lama), cek pin peta kampus (#19).
4. **Analytics** (opsional, butuh ID GA4): event Enroll Now, Schedule a Tour, Download Brochure, WhatsApp.

## 7. Cara mengulang QA

```bash
npm run lint && npm run typecheck && npm run build && npm start   # http://localhost:3000
```

Skrip uji otomatis (Playwright + axe-core + Lighthouse) dijalankan dari folder kerja sementara pengembang, bukan bagian repo, agar proyek tidak menambah dependensi. Bila tim ingin menjalankannya di CI, skrip dapat dipindahkan ke `scripts/qa/` dengan `playwright-core`, `axe-core`, dan `lighthouse` sebagai devDependencies.
