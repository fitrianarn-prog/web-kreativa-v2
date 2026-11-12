# Content Review — Kreativa Global School Website v2

Dokumen kerja untuk **tim sekolah (editorial/admisi)** dan **pengembang**. Berisi status setiap informasi resmi yang dipakai situs baru.
Aturan: informasi akademik, keuangan, dan kelembagaan **tidak diubah diam-diam**. Semua koreksi di Bagian 5 berstatus **usulan** sampai disetujui sekolah.

- Sumber utama: `docs/SPEC.md` (crawl situs lama per 5 Nov 2026), diverifikasi ulang terhadap halaman & gambar asli kreativaglobal.sch.id.
- Terakhir diperbarui: 5 November 2026 (Fase 5 — QA). Hasil QA teknis: `docs/QA-REPORT.md`.
- Legenda status: ✅ terkonfirmasi · ⚠️ konflik · ❓ belum ada · 🟡 perlu persetujuan

---

## 1. Informasi terkonfirmasi ✅

| Item | Nilai yang dipakai | Dasar konfirmasi |
|---|---|---|
| WhatsApp/telepon utama | +62 851-8666-4140 | Dikonfirmasi pemilik proyek (5 Nov 2026) |
| Domain situs | https://kreativaglobal.sch.id | Dikonfirmasi pemilik proyek |
| Portal pendaftaran | https://admission.kreativaglobal.sch.id/ | Dikonfirmasi pemilik proyek |
| Biaya TA 2027/2028 (semua jenjang & skema) | `src/content/shared/fees.json` | Setiap angka dicocokkan ulang dengan **gambar tabel asli** di /admission — semuanya sesuai transkripsi spec |
| Istilah biaya versi ID | "Biaya dengan Satu/Dua/Tiga/Enam Angsuran", daftar "Termasuk/Tidak Termasuk" | Diambil apa adanya dari /id/registrasi |
| Biaya pendaftaran | Rp 1.000.000 (semua jenjang) | Halaman /admission & /id/registrasi |
| Daftar SDG yang didukung | SDG 4, 5, 9, 10, 17 | Gambar `Screenshot-2025-10-31…jpg` di halaman jenjang (sebelumnya tercatat "belum ada" di spec) |
| Tabel kredit High School | Angka per mata pelajaran sesuai HTML asli /high-school | Lihat juga konflik #8 |
| 55 mata pelajaran pilihan | 14 Applied Science · 22 Business & Management · 19 Leadership & Social Science | Diparse otomatis dari spec (`scripts/build-electives.mjs`) |
| Teks Beranda (EN & ID) | Hero, Keunggulan, Pemimpin Visioner, Jenjang, Program Unggulan, Testimoni, CTA | Diambil apa adanya dari halaman live `/` dan `/id/beranda/` (dicek 5 Nov 2026), termasuk judul section & deskripsi program versi ID yang tidak ada di spec |
| Teks resmi versi ID halaman dalam | Tentang, SMA (dipakai juga untuk blok bersama di SD & SMP), TK, Registrasi, Karir, hero SD | Diambil apa adanya dari /id/tentang, /id/sma, /id/tk, /id/registrasi, /id/karir, /id/sd-kreativa-global (dicek 5 Nov 2026) |
| Nama SDG versi ID | Pendidikan Berkualitas, Kesetaraan Gender, Industri, Inovasi dan Infrastruktur, Berkurangnya Kesenjangan, Kemitraan untuk Mencapai Tujuan | Nama resmi SDGs berbahasa Indonesia (bukan terjemahan pengembang). Warna kartu mengikuti warna resmi SDG |
| Warna logo | Ungu ±#3B358D, pink ±#EA3B5F | Cocok dengan file logo resmi yang dipakai situs lama |

## 2. Informasi yang saling bertentangan ⚠️

| # | Topik | Versi yang ada | Yang dipakai sementara | Butuh keputusan |
|---|---|---|---|---|
| 1 | Domain pendaftaran | `admission.kreativaglobal.id`, `admission.kreativaglobal.sch.id`, `admission.indonesiajuara.id` | `admission.kreativaglobal.sch.id` (dikonfirmasi) | Matikan/redirect dua domain lain |
| 2 | Nomor WA tur di Beranda ID | 6285717692595 vs nomor utama 6285186664140. Per 5 Nov 2026, tombol tur di CTA Beranda ID live **masih** ke 6285717692595 | Nomor utama di semua tempat, termasuk CTA tur Beranda ID | Apakah nomor kedua masih dipakai? |
| 3 | Alamat kampus | FAQ: "Jl. Parakan Saat 1 **No. 40**" · Footer: "Jl. Parakan Saat I **No. 39**" | No. 39. Jawaban FAQ "Di mana lokasi…" kini menampilkan ketiga alamat kampus langsung dari `site.json`, jadi tidak lagi menulis No. 40. Pertanyaan ID "Sekolah Global Kreativa" diseragamkan menjadi "Kreativa Global School" | Nomor yang benar |
| 4 | Email | EN: info@kreativaglobal.**sch.id** · ID: info@kreativaglobal.**id** | info@kreativaglobal.sch.id | Apakah alamat .id masih aktif? |
| 5 | Jam operasional kantor | EN: "Mon–Fri 8am–16pm, Sun & PH: Closed" (tersirat Sabtu buka) · ID: "Sabtu & Libur Nasional: Libur" | Versi konsolidasi spec 4.7: Senin–Jumat 08.00–16.00 WIB; Sabtu, Minggu & libur nasional tutup | Apakah Sabtu buka? |
| 6 | Klaim kurikulum | Home: "Cambridge **and IB**" · About EN: "Cambridge Curriculum and **Kurikulum Merdeka**" · About ID: "Kurikulum Cambridge" · FAQ: "**IB**, Cambridge, National, Islamic" + "metode CAS dari IB" · jangkauan "to High School" vs "to Junior College" | Beranda memakai teks hero live terbaru (tanpa IB). Intro About dan FAQ ditampilkan **apa adanya** sesuai sumber, sehingga klaim IB masih muncul di FAQ | Satu kalimat resmi tentang kurikulum. Setelah itu FAQ "Kurikulum apa…" dan intro About diselaraskan |
| 7 | Pembagian kelas SMP | ID lama (/id/smp): Lower Secondary kelas 7–8, IGCSE kelas 9–10 · EN: S1–S3 = kelas 7–9, S4 = kelas 10 (masuk High School) | Struktur EN. Isi /id/smp **tidak dipakai** karena bertentangan, jadi halaman SMP versi ID menampilkan bagian khusus SMP dalam EN (`lang="en"`) | Konfirmasi struktur resmi + terjemahan ID halaman SMP |
| 8 | **Tabel kredit High School (Supporting Subject)** | Jumlah baris S4 = 4+2+2+2+2 = **12**, tertulis **14**. JC2 = 4+2+2+2+2 = **12**, tertulis **10**. Akibatnya total S4 seharusnya 46 (tertulis 48) dan JC2 54 (tertulis 52), persentase ikut berubah | **Ditampilkan apa adanya** sesuai sumber (`src/content/shared/hs-credits.json`), termasuk total yang tidak cocok | **Wajib diputuskan sebelum go-live:** angka baris atau totalnya yang benar? (Selisih sudah ada di HTML situs lama, bukan salah transkripsi) |
| 9 | Penomoran skema biaya | EN: Skema 1 = sekali bayar · ID: Skema 1 = enam angsuran (urutan terbalik) | Skema ditampilkan **tanpa nomor**, dengan nama, urutan konsisten (sekali bayar lebih dulu) | Setujui penamaan tanpa nomor |
| 10 | Istilah program luar negeri (ID) | SD: "Program Pengalaman Belajar di Luar Negeri" · SMP/SMA: "Program Imersi Luar Negeri" | Dipakai apa adanya per jenjang | Satukan istilah? |
| 11 | Visi & Misi (versi ID) | Visi About: "Mewujudkan generasi pembelajar sepanjang hayat…" · Visi SMA: "Menumbuhkan pembelajar sepanjang hayat…". Misi About dan SMA juga berbeda redaksi | Versi **halaman Tentang** dipakai di semua halaman (About, SD, SMP, SMA) | Pilih satu versi resmi |
| 12 | Nama profil karakter | "7 Moslem Characters of Kreativa Learners" (SD/SMP/SMA) vs "7 Muslim Kreativa" (TK) · ID: "7 Karakter Muslim Peserta Didik Kreativa" | Ditampilkan apa adanya per halaman (ejaan "Moslem" belum diubah, lihat R4) | Satu nama resmi |
| 13 | Nama Board of Trustees | "Mr. Yorga Permana, PhD" (Beranda) vs "Muhammad Yorga Permana, Ph.D" (halaman jenjang) | Masing-masing mengikuti sumbernya | Penulisan resmi |
| 14 | Label menu pendaftaran (ID) | Menu: "Registrasi" · Footer: "Pendaftaran" | Mengikuti situs lama (menu "Registrasi", footer "Pendaftaran") | Satukan? |
| 15 | Nama file gambar biaya | Berlabel "2627" padahal header tabel "2027/2028" | 2027/2028 (sesuai isi gambar) | — (informasi saja) |
| 16 | Urutan testimoni | Halaman EN dan ID live menampilkan 5 testimoni dengan urutan berbeda | Mengikuti urutan masing-masing halaman live | — (informasi saja) |
| 17 | Isi TK versi ID | /id/tk lama berbeda isi dengan EN: hero "Menghasilkan Generasi Unggul, Adaptif, dan Berdaya Saing Global" (EN: "Nurturing generations with character…"), "Integrasi STEM" + menyebut pendekatan Montessori (EN: "STEAM Integration" tanpa Montessori), "Nilai-nilai Islami" 2 paragraf (EN: "Islamic Values at the Core" 1 paragraf) | Halaman /id memakai teks ID resmi untuk bagian yang ada padanannya. Thematic Learning, Literacy & Phonics, Independence, dan 7 Muslim Kreativa tampil EN | Samakan isi EN–ID (terutama klaim Montessori) |
| 18 | Konten khusus /id/sd lama | Kurikulum SD (Cambridge + STEM, "terinspirasi IB"), Keunggulan Kurikulum Cambridge-STEM, Kegiatan Harian SD, Jam Belajar 07:30–14:00, Rasio 1:22, Profil Guru (11 orang) — **tidak ada di versi EN** | Tidak ditampilkan (tidak ada padanan EN; klaim "terinspirasi IB" terkait konflik #6; profil guru butuh izin, Bagian 4 butir 4) | Masukkan ke halaman SD? Jika ya, sediakan versi EN-nya |
| 19 | Pin peta kampus | Halaman Kontak menyematkan Google Maps berdasarkan **teks alamat** (geocoding Google). Pin Kampus 1 (Parakan Saat I No. 39) dan Kampus 3 (Soekarno-Hatta No. 668) tampak di area yang hampir sama | Peta tetap ditampilkan + tautan "Lihat di Google Maps" | Kirim tautan/koordinat Google Maps resmi per kampus |

## 3. Informasi yang belum ada ❓

**Brand**
- Brand Guideline resmi (aturan logo, kode warna, tipografi). Token warna di `src/app/globals.css` bersifat **provisional**; tint/shade dan `accent-600` (#D12F53, untuk kontras AA) adalah turunan, bukan warna resmi.
- Warna resmi per jenjang. Yang terlihat di situs lama hanya Primary = pink dan High School = navy. TK (#4729C2) dan SMP (#3B358D) diambil dari palet situs lama sebagai sementara.
- File logo vektor (SVG). Saat ini memakai PNG dari WordPress.

**Konten**
- Kredit mata pelajaran *Introduction to Negotiation Analysis* (kosong di sumber; tampil "—").
- Sambutan Principal untuk SMP dan SMA (sidebar lama menautkan "Principal Message" tanpa isi). Sambutan Principal hanya ada untuk SD (Nurhayati, SP., MSM).
- Misi hanya berisi 2 poin. Apakah memang lengkap?
- Terjemahan ID judul & pengantar section pendekatan belajar TK (`#approach`, 12 Nov 2026): "A Thoughtful Approach to Early Learning" / "Five integrated approaches that nurture curiosity, character, and a strong foundation for future learning." (teks EN dari pemilik proyek). Halaman /id menampilkan versi EN (`lang="en"`) sampai ada terjemahan resmi.
- Teks pengganti paragraf "Our Logo" (teks lama membahas website sebagai etalase toko).
- Koordinat/pin Google Maps per kampus. Saat ini tautan memakai pencarian alamat.
- ID Google Analytics/GA4 (situs belum memasang analytics).

**Teks yang ditulis/diterjemahkan pengembang — perlu ditinjau sekolah** (bukan teks resmi dari situs lama)
- Label kolom tabel biaya versi ID (di situs lama berupa gambar): "Kelas", "Biaya Sekolah Tahunan", "Biaya Program Tahunan", "Biaya Sekolah Bulanan", "Uang Pangkal" (untuk *Enrollment Fee*), "dibayar di P1", "Pilih salah satu skema pembayaran uang pangkal."
- Label fasilitas versi EN (versi ID dari judul gambar "Rencana Gedung Kami"): Student Counseling Room, Multipurpose Hall, Kindergarten Outdoor Area, dll.
- Deskripsi meta (SEO) tiap halaman, label navigasi "Di halaman ini", label filter/pencarian katalog, label halaman Kontak, catatan "Numbers in brackets are Cambridge syllabus codes." di tabel SMP.

**Terjemahan Bahasa Indonesia** (sampai tersedia, halaman /id menampilkan teks EN dengan `lang="en"`)
- TK: Thematic Learning, Literacy & Phonics, Independence & Life Skills, 7 Muslim Kreativa (versi ID lama tidak memuatnya).
- SD: sambutan Principal, English Learning Framework, Student Life, Clubs, kalimat penutup (`/id/sd-kreativa-global` memang masih berbahasa Inggris). Blok bersama (visi, pendiri, inisiatif, tujuan, 7 karakter) sudah memakai teks ID dari /id/sma.
- SMP: hero, Curriculum Pathway, Student Life, kalimat penutup (lihat konflik #7).
- Diagram Kerangka Kurikulum (isi diagram; judul & label tab sudah ID).
- SMA: deskripsi Student Life.
- 55 halaman detail mata pelajaran pilihan.
- Program Teacher Development (Karir). Poster sumber berbahasa Inggris.
- Daftar "Termasuk/Tidak Termasuk" biaya sudah tersedia dalam bahasa ID.

## 4. Perlu persetujuan sekolah sebelum go-live 🟡

1. **Seluruh angka biaya 2027/2028**. Sudah dicocokkan dengan gambar sumber, tetapi tetap perlu konfirmasi akhir bagian keuangan.
2. Klaim yang perlu bukti/izin:
   - "the first international Islamic school in East Bandung" (FAQ)
   - "five-story building with a swimming pool on the top floor" (FAQ)
   - "Teachers … 2–5 years of experience from international schools" (FAQ)
   - "Cambridge International School" pada logo header (pastikan status & aturan pemakaian logo Cambridge)
3. Render gedung (12 gambar) berasal dari section **"Rencana Gedung Kami"**. Akan diberi label "rencana/render", bukan foto fasilitas jadi.
4. Profil guru dari `/id/sd` (11 orang): apakah data dan izin publikasinya masih berlaku?
5. Testimoni orang tua yang menyebut nama anak: pastikan izin publikasi masih berlaku.
6. Foto siswa (hero, student life, klub): pastikan izin penggunaan gambar anak.
7. Token warna provisional dan arah visual (lihat Bagian 3).
8. Kebijakan fallback terjemahan (teks EN di halaman ID). Sudah disetujui pemilik proyek; tetap tercatat di sini untuk transparansi.

## 5. Usulan koreksi (rekomendasi — belum diterapkan pada konten resmi)

| # | Usulan | Alasan |
|---|---|---|
| R1 | Satukan pernyataan kurikulum menjadi satu kalimat resmi untuk Home, About, dan FAQ | Konflik #6 menurunkan kredibilitas |
| R2 | Perbaiki tabel kredit Supporting Subject (S4 & JC2) | Konflik #8: jumlah tidak cocok |
| R3 | Pakai satu istilah "Program Imersi Luar Negeri" untuk semua jenjang | Konflik #10 |
| R4 | Seragamkan nama "7 Muslim Characters of Kreativa Learners" (perbaiki ejaan "Moslem") | Konflik #12 |
| R5 | Tulis ulang paragraf "Our Logo" agar membahas filosofi logo, bukan website | Isu #17 di spec |
| R6 | Jadikan "Rencana Gedung Kami" section **Fasilitas** di kedua bahasa | Isu #19 di spec |
| R7 | Perbaiki typo sumber: "themeselves", "Incuiry-based", "languange", "krativa", "primay", "higschool", "Curious Learner" vs "Pembelajar yang Penasaran" (padanan ID kurang tepat, usul: "Pembelajar yang Ingin Tahu") | Isu #16 di spec |
| R8 | Teks jam buka EN: ganti "8am-16pm" menjadi "08.00–16.00 WIB" | Typo format jam |

## 6. Catatan teknis untuk tim

- **URL lama ke URL baru:** 301 sesuai spec 8.5 (`src/lib/legacy-redirects.ts`), **satu hop** baik dengan maupun tanpa "/" di akhir (mis. `/about/` → `/en/about`). URL baru yang diakhiri "/" dinormalkan dengan 308 (mis. `/en/about/` → `/en/about`).
- **Penyimpangan dari spec 8.5:** `/home/` diarahkan ke `/en`, bukan `/id`, karena `/home` adalah beranda versi EN.
- **Tautan brosur PDF lama** (`/wp-content/uploads/2026/09/…`) diarahkan ke `/brochures/…` agar tautan yang sudah dibagikan lewat WhatsApp tetap berfungsi. Nama file KG `.pdf.pdf` sudah diperbaiki.
- **Beranda:** poster video hero dibuat dari foto `school-community` (`scripts/build-brand-assets.mjs`), karena frame video tidak bisa diekstrak di lingkungan build. Video tidak diputar otomatis bila pengunjung memilih *reduced motion*, dan ada tombol jeda/putar. Gambar logo universitas (Harvard/Telkom/LSE) dari situs lama **tidak dipakai** karena memuat logo pihak ketiga; cukup teks "Harvard University Graduate"/"LSE Graduate".
- **Fase 4 — keputusan penyajian** (isi tidak diubah, hanya cara tampil):
  - Paragraf pengantar "Our Logo" (membahas website sebagai etalase toko) **tidak ditampilkan**; lima elemen logo tetap tampil. Menunggu teks pengganti (usulan R5).
  - Judul "English Learning Framework for EFL* Students": tanda * dihapus karena catatan kakinya tidak ada di sumber.
  - Foto Student Life & Klub SD di situs lama memuat judul yang tertanam di gambar. Pita teks itu dipotong (`cropBottom` di `scripts/import-legacy-assets.mjs`) dan judul dirender sebagai HTML.
  - Foto Student Life SMP/SMA dipasangkan ke kartu berdasarkan isi foto (urutan unggahan situs lama tidak jelas). Mohon dicek.
  - 5 poster karier tidak ditampilkan sebagai gambar; seluruh isinya sudah ditranskripsi menjadi HTML di halaman Karir.
  - Profil guru (/id/sd) belum ditampilkan sampai izin publikasi dikonfirmasi (Bagian 4 butir 4).
  - Kalimat penutup halaman TK, SMA, About, dan detail mata pelajaran memakai judul CTA Beranda ("Ready to Nurture Your Child's Potential?") karena halaman tersebut tidak punya kalimat penutup sendiri.
- **Aset dari situs lama:** diimpor oleh `scripts/import-legacy-assets.mjs`. Arsip mentah ada di `.legacy-assets/` (tidak masuk git).

## 7. Redesain Beranda (6 Nov 2026): konten & aset yang dibutuhkan

**Prestasi Siswa:** komponen sudah siap (`src/components/home/AchievementsSection.tsx`, data di `src/content/shared/achievements.json`), tetapi **belum ada satu pun prestasi terverifikasi**, jadi section ini tidak tampil di situs live (di `npm run dev` muncul kotak penanda). Per prestasi dibutuhkan:
- nama kompetisi, hasil/peringkat, tingkat (kota/nasional/internasional), tahun, kategori (akademik/olimpiade/bahasa Inggris/olahraga/seni/lainnya);
- nama siswa/tim **dengan izin orang tua**;
- foto asli (lebih disukai horizontal ≥ 1600 px) dan sumber verifikasi (sertifikat/rilis resmi).
- Catatan: Instagram resmi memiliki highlight berjudul "Sasmo 2026". Ini bukan data hasil lomba, jadi tidak dipakai.
- Halaman `/achievements` (ID: `/id/achievements`) dibuat 11 Nov 2026; CTA Beranda "The Brilliance Goes On" / "Kilau Prestasi Terus Berlanjut" mengarah ke sana (teks final dari pemilik proyek).
- **Update 9 Nov 2026 — section Prestasi kini tampil di situs live** (atas permintaan pemilik proyek), berisi 4 siswa / 5 penghargaan dari carousel Instagram @kreativaglobal "Kindergarten-Primary Proud Moments!" (±5 Nov 2026), slide 2–5: Fayra (P3 Integrity) – Juara 1 Pre-Alpha, Skate Indonesia 2026: the 5th ISI Asia Championship; Sakha (P1 Curious) – Juara 1 Fast Building Junior, National Competition SGD-RC 2026; Asyfiyah (P1 Adventurous) – Perunggu SMC 2026 & Perak Hobbies Fest Skatecross 2026; Haidar (P2 Empathetic) – Perunggu SMC 2026. Tampilan (11 Nov 2026): Beranda — kiri prestasi `featured` (Fayra, pilihan pengembang), kanan daftar kartu (bergulir otomatis pelan di desktop; diam di HP). Halaman Prestasi — hero, bagian "Featured" (baru tampil bila ≥ 7 prestasi), arsip dengan pencarian + filter jenjang & tahun + Load More (12/klik). Semua siswa saat ini = jenjang SD. Perlu ditindaklanjuti:
  - **Izin orang tua** untuk nama & foto keempat siswa di website belum dikonfirmasi.
  - Foto = crop screenshot (±290–350 px lebar, agak buram di layar retina) → ganti dengan foto asli dari tim sekolah, rasio 3:4.
  - Slide 6–12 carousel belum diterima (kemungkinan berisi prestasi lain).
  - Kategori ditentukan pengembang: SMC → Olimpiade; ISI Asia & Skatecross → Olahraga; SGD-RC → "Prestasi" (jenis lomba tidak disebut di slide). Tingkat "Nasional" hanya untuk SGD-RC (tertulis "National Competition").
  - Halaman /id/achievements: subjudul hero & meta description belum ada terjemahan resmi → tampil EN (`lang="en"`). Eyebrow & judul ID sama-sama "Prestasi Siswa", jadi eyebrow disembunyikan. Teks UI ID yang ditulis pengembang: "Prestasi Unggulan", "Semua Prestasi", "Jenjang", "Tahun prestasi", "{n} prestasi", "Prestasi tidak ditemukan" + penjelasannya, label jeda/lanjut gulir.
  - Pilihan prestasi `featured` (Fayra) ditentukan pengembang — ubah `featured` di achievements.json bila sekolah memilih lain.
  - Terjemahan ID hasil lomba ("Juara 1", "Medali Perunggu/Perak"), alt foto, subjudul section, label "Lihat lainnya di Instagram" ditulis pengembang. Nama kompetisi tidak diterjemahkan (`id: null`).

**Foto:**
- Foto Program Unggulan (`program-capstone/internship/clubs.webp`), foto jenjang SMP (`secondary/student-life-2.webp`), dan foto Visi/Misi tampak seperti gambar AI/stok, bukan foto kegiatan asli Kreativa. Sebaiknya diganti foto asli.
- Hero masih memakai video lama (foto bersama di depan gedung). Untuk hero yang lebih kuat dibutuhkan video/foto kegiatan belajar asli resolusi tinggi (≥ 1920 px).

**Brand Guideline:** kode warna resmi, aturan tipografi (selain Poppins), dan elemen grafis resmi belum ada. Warna saat ini masih turunan logo & situs lama.

**Teks UI yang ditulis pengembang (perlu disetujui):** judul/subjudul section Prestasi (EN/ID), label kategori prestasi, label "Explore our schools / Jelajahi jenjang sekolah" pada navigasi jenjang di hero.
