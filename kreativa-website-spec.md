# Kreativa Global School — Spesifikasi Website untuk Rebuild (v2)

> Sumber: crawl penuh https://kreativaglobal.sch.id pada 5 November 2026 (semua menu EN + ID, sitemap WordPress, konten tersembunyi di accordion/tab, serta teks di dalam gambar seperti tabel biaya & poster karier).
> Dokumen ini ditulis agar bisa langsung diberikan ke **Claude Code** sebagai brief/`SPEC.md`. Teks konten dikutip apa adanya (bahasa asli) supaya bisa dipakai sebagai seed content.

---

## 0. Cara memakai dokumen ini di Claude Code

1. Taruh file ini di root repo baru sebagai `docs/SPEC.md`.
2. Buat `CLAUDE.md` singkat yang merujuk ke file ini (contoh ada di **Bagian 9**).
3. Jalankan prompt awal di **Bagian 9** — Claude Code akan men-scaffold proyek, memindahkan konten di Bagian 3–4 ke file data (`content/*.json` / MDX), lalu membangun halaman satu per satu.
4. Gunakan **Bagian 6** (daftar masalah) sebagai checklist QA, dan **Bagian 8** sebagai redirect map dari URL lama.

---

## 1. Ringkasan situs lama

| Aspek | Temuan |
|---|---|
| CMS / Theme | WordPress + **Divi** (child theme "Divi Child v1.0.0"), plugin: `addons-for-divi`, `table-for-divi`, `testimonial-free` |
| Bahasa | Bilingual. EN di root (`/`), ID di prefix `/id/` |
| Font | **Poppins** (body & heading) |
| Warna dominan | Ungu/indigo `#3B358D` (top bar, header tabel), pink/merah CTA `#EA3B5F` / `#EC3C5F`, navy `#1E2A5E` (High School), ungu `#4729C2` / `#3A2EAE`, latar lembut `#F5F6FB`, biru default Divi `#2EA3F2` (sisa default, sebaiknya dibuang) |
| Header | Top bar: "Contact Us" (→ `/#kontak`), switch bahasa EN 🇬🇧 / ID 🇮🇩. Baris utama: logo Kreativa + logo "Cambridge International School", tombol **Enroll Now** (pink), menu hamburger |
| Header halaman jenjang | Hero berwarna per jenjang (mis. Primary = pink) berisi logo + "Kreativa Global / Primary School", tombol "Enroll Now", sidebar sub-navigasi anchor yang sticky |
| Floating | Tombol WhatsApp mengambang kanan bawah → `https://wa.me/6285186664140` |
| Media | Video YouTube di About: `https://www.youtube.com/embed/Bjcf2EFxpjk` |
| Sosial media | Instagram `instagram.com/kreativaglobal`, Facebook `facebook.com/kreativaglobal.id`, TikTok `tiktok.com/@kreativaglobal`, X `x.com/kreativaglobal`, YouTube `youtube.com/@kreativaglobal`, LinkedIn `id.linkedin.com/school/kreativaglobal` |
| Sistem eksternal | Pendaftaran: `admission.kreativaglobal.sch.id` (lihat isu domain di Bagian 6). Karier: `career.kreativaglobal.sch.id` |

---

## 2. Sitemap & Navigasi

### 2.1 Menu utama (EN)

```
Contact Us            → /#kontak
EN / ID               → / , /id/beranda/
About Us              → /about/
  ├─ Founder Message      → /about/#founder-message
  ├─ Vision & Mission     → /about/#vision-mission
  ├─ Curriculum Framework → /about/#curriculum-framework
  ├─ Our Story            → /about/#our-story
  ├─ Our Brand            → /about/#our-brand
  └─ FAQ                  → /about/#faq
Our School            → (tanpa halaman, hanya parent)
  ├─ Kindergarten         → /kindergarten/
  ├─ Primary School       → /primary-school/
  ├─ Secondary School     → /secondary-school/
  └─ High School          → /high-school/
Admission             → /admission/
  ├─ Admission Process    → /admission/#process
  └─ School Fees          → /admission/#fees
Career                → /career/
[Enroll Now]          → /admission/  (di beberapa halaman → /id/registrasi/)
```

### 2.2 Menu utama (ID)

```
Hubungi Kami          → /id/beranda/#kontak
Tentang Kami          → /id/tentang/
  ├─ Pesan Pendiri        → #pesan-pendiri
  ├─ Visi & Misi          → #visi-misi
  ├─ Kerangka Kurikulum   → #kerangka-kurikulum
  ├─ Sejarah              → #sejarah-kami
  ├─ Brand Kami           → #brand-kami
  └─ Tanya Jawab          → #tanya-jawab
Sekolah Kami          → #
  ├─ TK                   → /id/tk/
  ├─ SD                   → /id/sd-kreativa-global/   (catatan: ada juga /id/sd/ versi lama)
  ├─ SMP                  → /id/smp/
  └─ SMA                  → /id/sma/
Registrasi            → /id/registrasi/
  ├─ Proses Penerimaan    → #process
  └─ Biaya Pendidikan     → #fees
Karir                 → /id/karir/
[Daftar Sekarang]     → /id/registrasi/
```

### 2.3 Footer (sama di semua halaman, versi EN/ID)

- **Quick Links / Tautan Cepat:** About us, Kindergarten, Primary, Secondary, High School, Admission (ID: Tentang Kami, TK, SD, SMP, SMA, Pendaftaran). Link footer mengarah ke `/about`, `/kindergarten`, `/primary`, `/secondary`, `/high-school`, `/admission` (EN) dan `/id/tentang`, `/id/tk`, `/id/sd`, `/id/smp`, `/id/sma`, `/id/registrasi` (ID).
- **Address / Alamat**
  - Campus 1: Jl. Parakan Saat I No. 39, Kota Bandung (Under Construction)
  - Campus 2: Jl. Soekarno-Hatta No. 729, Kota Bandung
  - Campus 3: Jl. Soekarno-Hatta No. 668, Kota Bandung
- **Opening Hours:** EN "Mon-Fri: 8am-16pm, Sun & PH: Closed" · ID "Senin-Jum'at: 08.00-16.00, Sabtu & Libur Nasional: Libur"
- **Contact Us:** +6285186664140 · info@kreativaglobal.sch.id (versi ID menulis info@kreativaglobal.id)
- Ikon sosial media (6 akun di Bagian 1) + "© 2026 Kreativa Global School"

### 2.4 Halaman yang benar-benar dipakai menu (wajib di-rebuild)

| # | EN | ID | Catatan |
|---|---|---|---|
| 1 | `/` | `/id/beranda/` | Home |
| 2 | `/about/` | `/id/tentang/` | ID punya section tambahan "Rencana Gedung Kami" |
| 3 | `/kindergarten/` | `/id/tk/` | Konten ID ≠ EN (versi lama) |
| 4 | `/primary-school/` | `/id/sd-kreativa-global/` | Versi ID masih berbahasa Inggris; ada `/id/sd/` versi lama dengan profil guru |
| 5 | `/secondary-school/` | `/id/smp/` | Versi ID = layout lama, konten berbeda |
| 6 | `/high-school/` | `/id/sma/` | ID sudah diterjemahkan (sebagian) |
| 7 | `/subject-catalog/` | — | Dilink dari High School/SMA |
| 8 | `/course-catalog/{slug}/` ×55 | — | Detail mata pelajaran pilihan (Lampiran A) |
| 9 | `/admission/` | `/id/registrasi/` | Proses + biaya |
| 10 | `/career/` | `/id/karir/` | Poster program guru |

---

## 3. Konten per halaman

### 3.1 Home — `/` (EN) dan `/id/beranda/` (ID)

**Hero** (foto latar siswa di kelas, overlay ungu)
- EN H1: "Nurturing Global Leaders with Islamic Values"
- EN sub: "Integrating world-class Cambridge and IB curricula with a strong Islamic foundation, from Kindergarten to High School."
- ID H1: "Mencetak Pemimpin Global Berkarakter Islami"
- ID sub: "Kurikulum Cambridge & IB berstandar global dengan fondasi Islam yang kuat, untuk jenjang TK hingga SMA."
- CTA: **Enroll Now / Daftar Sekarang** → `/admission/` (ID → `/id/registrasi/`) · **Schedule a School Tour / Jadwalkan Tur Sekolah** → `/#ready`

**Why Kreativa? — Our Core Advantages** (4 kartu ikon)
| EN | ID |
|---|---|
| **International Curriculum** — A seamless blend of Cambridge and Islamic values to foster academic excellence and faith. | **Kurikulum Internasional** — Kurikulum Cambridge yang dipadukan dengan nilai-nilai Islam untuk prestasi akademik dan pembentukan karakter. |
| **Expert-Led Vision Strategy** — Founded and guided by visionary leaders and graduates from world-renowned universities, ensuring excellence. | **Dipimpin Pakar yang Visioner** — Dipimpin oleh para pemimpin visioner dan lulusan universitas top dunia, kami berkomitmen memberikan standar pendidikan terbaik. |
| **Faith & Character Building** — Dedicated programs to shape resilient, compassionate, and principled Muslim leaders. | **Pembentukan Akhlak & Karakter** — Program pembinaan karakter untuk menumbuhkan generasi Muslim yang tangguh, cerdas dan berakhlak mulia. |
| **University & Career Readiness** — Real-world exposure through internships, capstone projects, global insight, and university prep. | **Kesiapan Universitas & Karier** — Persiapan universitas top dunia, pembangunan portofolio, dan pengalaman karier melalui magang, capstone dan mentoring. |

**Meet Our Visionaries / Pemimpin Visioner Kreativa** — "Guided by leaders committed to integrating global excellence with profound values."
- **Mr. Syauqi Robbani, MPA** — Founder – Harvard University Graduate — "…shaping future leaders through global excellence and strong Islamic values to inspire a purposeful and better world." (ID: "…kami berkomitmen membentuk pemimpin masa depan melalui standar global yang berpijak pada nilai-nilai Islam, agar lahir generasi yang memberi makna bagi dunia..")
- **Mr. Yorga Permana, PhD** — Board of Trustees – LSE Graduate (ID: Dewan Pembina) — "…we prepare learners with the curiosity and future-ready expertise needed to lead in an ever-evolving global ecosystem." (ID: "…kami membekali peserta didik dengan rasa ingin tahu, karakter, dan keterampilan masa depan untuk memimpin dalam ekosistem global yang terus berubah.")
- Foto: foto portrait + foto wisuda (hover/flip).

**Our Academic Levels / Jenjang Pendidikan Kami** — "A complete educational journey designed for each stage of development."
| Level | EN | ID | Link "Learn More / Selengkapnya" |
|---|---|---|---|
| Kindergarten (TK) | Developing analytical skills, independent thought, personal responsibility, and social skills. | Mengembangkan keterampilan analitis, kemandirian berpikir, tanggung jawab pribadi, serta kemampuan sosial dalam lingkungan belajar yang menyenangkan. | `/kindergarten/` |
| Primary (SD) | Building strong foundations in literacy, numeracy, and critical inquiry in a supportive environment. | Membangun fondasi yang kuat dalam literasi, numerasi, dan kemampuan berpikir kritis melalui lingkungan yang suportif dan mendorong rasa ingin tahu. | `/primary/` ⚠️ (seharusnya `/primary-school/`) |
| Secondary (SMP) | Developing analytical skills, independent thought, personal responsibility, and leadership. | Mengasah kemampuan analitis, kemandirian dalam berpikir, rasa tanggung jawab, serta membangun jiwa kepemimpinan sebagai bekal menuju jenjang berikutnya. | `/secondary/` ⚠️ |
| High School (SMA) | Preparing for top universities with specialized tracks, leadership development, and career readiness. | Mempersiapkan siswa untuk memasuki universitas top dunia melalui jalur peminatan, pengembangan kepemimpinan, serta kesiapan karier yang matang. | `/high-school/` |

**Our Signature Programs / Program Unggulan Kami** — "This is how we build competence. We show, not just tell." (ID: "Inilah cara kami membangun kompetensi — bukan sekadar bercerita, tetapi menunjukkan melalui pengalaman nyata.")
1. **Kreativa Capstone Exhibition** (ID: Eksibisi Capstone Kreativa) — Students research, design, and present real-world solutions, integrating science, creativity, and leadership. This pinnacle project showcases their ability to solve complex problems and create tangible impact.
2. **Internship & Industry Exposure** (ID: Magang & Dunia Industri) — We bridge academia with the professional world through real-world learning. Our students gain invaluable experience via professional placements with partner companies and organizations.
3. **Student Clubs (MUN & Robotics)** (ID: Klub MUN & Robotika) — Fostering teamwork, innovation, and global perspectives through specialized clubs like Model United Nations (MUN) and Robotics, preparing students for international stages and technological challenges.

**What Our Community Says / Apa Kata Komunitas Kami** — carousel testimoni ("Voices of trust from our parents and students.")
| Nama | Peran | Testimoni (EN) |
|---|---|---|
| Afiona Luthfiranti | Parent of K1 Student | Kreativa's Islamic–international curriculum fits us well. In three months, Alula grew from shy to social and added new surahs. She's thriving in confidence, learning, and faith. |
| Dyan Getmy | Parent of P1 Student | We chose Kreativa because its values aligned with our family's. Within three months, Ataris became more expressive, emotionally mature, and confident. Kreativa truly became a safe and fun place for him to grow and enjoy his childhood. |
| Bunga Ayu | Parent of K1 Student | We chose Kreativa Global because we wanted a school that would foster children with a global perspective while remaining grounded in Islamic values. In just three months, Kehan has mastered several surahs (chapters), prayer movements, and daily etiquette. May Kreativa continue to shape a golden generation ready to face the future. |
| Mutiara Adi | Parent of P1 Student | Kreativa helps children discover their potential without pressure. In two years, our children have become happier, more disciplined in their prayers, and more confident in problem-solving—all while still enjoying the learning process. |
| Rahmaniyar | Parent of K2 Student | We chose Kreativa because of its strong Islamic values. In recent months, Dastan has grown into a more independent, confident, and obedient child—now leading, praying, and learning happily with warm and caring teachers. |

Versi ID (urutan: Mutiara Adi, Bunga Ayu, Rahmaniyar, Afiona, Dyan):
- Mutiara Adi: "Kreativa membuka potensi setiap anak tanpa tekanan. Dalam dua tahun, anak-anak kami menjadi lebih bahagia, disiplin dalam berdoa, dan percaya diri dalam memecahkan masalah serta gemar belajar."
- Bunga Ayu: "Kami memilih Kreativa Global karena kami menginginkan sekolah yang mendidik anak-anak berwawasan global dan berakar pada nilai-nilai Islam. Hanya dalam tiga bulan, Kehan menguasai surah, doa, dan adab. Semoga Kreativa terus membentuk generasi emas."
- Rahmaniyar: "Kami memilih Kreativa karena nilai-nilai Islamnya yang kuat. Dastan telah tumbuh mandiri, percaya diri, dan beriman — kini memimpin, berdoa, dan belajar dengan gembira di bawah bimbingan guru-guru yang penuh kasih sayang."
- Afiona Luthfiranti: "Kurikulum Islam–internasional Kreativa sangat sesuai dengan kebutuhan kami. Dalam tiga bulan, Alula yang awalnya pemalu kini menjadi lebih percaya diri, mudah bersosialisasi, dan menambah hafalan surah baru. Ia berkembang pesat dalam kepercayaan diri, belajar, dan keimanannya."
- Dyan Getmy: "Kami memilih Kreativa karena nilai-nilainya selaras dengan nilai-nilai kami. Dalam tiga bulan, Ataris menjadi lebih ekspresif, lebih dewasa secara emosional, dan lebih percaya diri. Kreativa menjadi tempat yang aman dan bahagia baginya untuk tumbuh dan menikmati masa kecilnya."
- Label peran ID: "Orang Tua Siswa K1/K2/P1".

**CTA penutup** (`id="ready"`) — EN: "Ready to Nurture Your Child's Potential? Schedule a school tour to see our community firsthand or begin your enrollment process today." ID: "Siap Mengembangkan Potensi Terbaik Anak Anda? Jadwalkan kunjungan sekolah untuk melihat lingkungan kami secara langsung, atau mulai proses pendaftaran sekarang." Tombol: Enroll Now + Schedule a School Tour (→ WhatsApp `wa.me/6285186664140`; versi ID → `wa.me/6285717692595` ⚠️).

---

### 3.2 About — `/about/` (EN) dan `/id/tentang/` (ID)

**Intro**
- EN: "About Us — Kreativa Global School is a future-oriented Islamic International School offering holistic education from Kindergarten to Junior College. We integrate the Cambridge Curriculum and Kurikulum Merdeka to nurture academic excellence, spiritual values, and global awareness in every learner."
- ID: "Tentang Kami — Kreativa Global School adalah Islamic International School di Bandung Timur yang menawarkan lingkungan belajar yang nyaman, fasilitas unggul, dan tenaga pengajar berkualitas. Kami mengintegrasikan nilai-nilai Islam dengan Kurikulum Cambridge untuk membentuk generasi berkarakter, berwawasan global, dan siap menghadapi masa depan."
- Video YouTube embed `Bjcf2EFxpjk`.

**#founder-message — Syauqi Robbani, MPA** · Founder · Harvard University, Master in Public Administration
> "As the founder of Kreativa Global School, I highlight the importance of English language proficiency in global competition and the need to enhance English language skills in Indonesia. Economic development and progress rely on the complexity of economics and STEM abilities, and it's essential for Indonesia to develop these skills to drive innovation.
> I also acknowledge the crucial role of emotional maturity and Islamic values in education, as they shape children's characters and habits. With Kreativa Global School's mission focused on building a strong foundation in STEM, emotional maturity, and Islamic values, we are committed to helping students prepare for a successful future."

(ID: "Sebagai pendiri Kreativa Global School, saya menyoroti pentingnya bahasa Inggris dalam kompetisi global dan perlunya meningkatkan kemampuan berbahasa Inggris di Indonesia. Pembangunan ekonomi dan kemajuan bergantung pada kompleksitas ekonomi dan kemampuan STEM, serta bahwa Indonesia harus mengembangkan kemampuan ini untuk mendorong inovasi. Syauqi juga mengakui bahwa kematangan emosional dan nilai-nilai Islam memiliki peran penting dalam pendidikan, karena membentuk karakter dan kebiasaan anak-anak. Dengan misi Kreativa Global School yang fokus pada membangun pondasi kuat dalam STEM, kematangan emosional, dan nilai-nilai Islam, Kreativa Global School bertekad untuk membantu siswa mempersiapkan masa depan yang sukses.")

**#vision-mission** — lihat blok bersama **4.1**. (Gambar: `visi-scaled.jpg`, `Misi-scaled.jpg`.)

**#curriculum-framework** — 2 tab: **Primary** dan **Secondary & High School** (ID: "Kerangka Kurikulum SD" / "Kerangka Kurikulum SMP & SMA"). Isinya gambar diagram — transkripsi di blok **4.5**.

**#our-story — Harnessing Indonesia's Potential:**
> Indonesia boasts the world's fourth-largest population, a powerful resource for human capital development. We can learn from India's success in placing skilled professionals in global firms. However, to become a major player, Indonesia needs to address the challenge of limited English proficiency. This hinders communication and collaboration in today's interconnected world.
>
> Brilliant ideas are only half the battle. The ability to express them clearly and thoughtfully is essential. Furthermore, a nation's progress hinges on continuous innovation, fuelled by a strong foundation in STEM fields. The World Economic Forum highlights the growing importance of skills like structured thinking, problem-solving, and innovation. These, combined with emotional intelligence and strong character, are the building blocks for a well-rounded future generation.
>
> **Kreativa Global School: Bridging the Gap** — Kreativa Global School was founded to address this very need. We aim to equip the younger generation with exceptional English language skills from a young age, cultivate their talents in STEM fields, and instil the confidence to thrive on the global stage. These qualities are nurtured within a framework of Islamic values, providing a moral compass for navigating the complexities of our ever-changing world.

(ID: "Sejarah Kami — Memanfaatkan Potensi Indonesia … Kreativa Global School: Menyambung Kesenjangan …" — terjemahan penuh tersedia di halaman lama.)

**#our-brand**
- **Our Tagline: "Unlocking Potential, Empowering Dreams"** (ID: "Membuka Potensi, Mewujudkan Mimpi")
  > Within each individual lies a wellspring of potential, a reservoir of dreams waiting to be realized. But unlocking this potential and empowering those dreams requires more than just individual motivation. It necessitates a supportive environment, a nurturing ground where skills are honed, confidence is built, and aspirations are ignited.
  > In today's interconnected world, nations that thrive are those that invest in their human capital. A nation's most valuable resource isn't its natural resources, but its people – their ingenuity, creativity, and problem-solving abilities. When we empower individuals to unlock their potential, we empower them to become active participants in shaping a brighter future, not just for themselves, but for their communities and the world at large.
- **Our Logo** — paragraf pengantar (teks lama: "In today's digital world, website acts like a shop window… our logo is legally protected under the watchful eye of our legal team.") + 5 elemen logo (ikon `icon-blue-01..05`):
  1. **Life Long Learning** — Learning never stops. It's about growing, exploring, and developing ourselves constantly. By embracing learning throughout life, we become better equipped to handle life's changes and complexities. Let's start learning and keep going forever.
  2. **Be a Star** — A star burns brightly because of its internal fire. Discover your passion – that one thing that ignites your enthusiasm and motivates you to excel. When you pursue your passion, work doesn't feel like work – it becomes an exciting journey of exploration and self-discovery.
  3. **Resilience** — Resilience means facing challenges with inner strength. Stay positive, believe in yourself, and lean on your support system. Each challenge makes you stronger.
  4. **Critical Thinking** — Critical thinking is crucial. It helps us make smart decisions, solve problems, and be better people. Let's sharpen our critical thinking skills to make the world a better place for everyone.
  5. **Be a Future Leader** — Let's help create future leaders by nurturing important qualities like vision, communication, and integrity. We can make the world better by supporting and guiding the next generation.
  (ID: Pembelajaran Seumur Hidup, Menjadi Bintang, Pemikiran Kritis, Menjadi Pemimpin Masa Depan, Ketangguhan.)

**#faq** (accordion)
| Q | A |
|---|---|
| What is Kreativa Global School? | Kreativa Global School is the first international Islamic school in East Bandung. It provides an education system with an international perspective while embedding Islamic values. |
| What languages are used as the medium of instruction? | The medium of instruction at Kreativa Global School is English for all subjects and activities. It further enhances subjects such as Science, Mathematics, and English Literacy. |
| Who are the teachers? | Teachers at Kreativa Global School are experienced professionals with 2-5 years of experience from international schools. |
| What are the core values? | Kreativa Global School focuses on three core values: Spirituality, Strong Character, and Academic Excellence. |
| What curriculum does Kreativa Global School follow? | Kreativa Global School integrates the best components of the IB, Cambridge, National, and a unique Islamic curriculum. It utilizes the CAS method from IB for project-based learning, Cambridge for subject matter, and adjusts to national standards for national exams. |
| How is the Islamic curriculum implemented? | Through daily spiritual and character-building practices such as Tahfidz, Murojaah, morning Dhikr, Asmaul Husna, communal Dhuha and Dhuhr prayers, storytelling of Nabawi Sirah and Muslim scholars and heroes. The school collaborates with reputable Tahfidz institutions and issues a daily habit report for parents. |
| What facilities does Kreativa Global School have? | By its fourth year, Kreativa Global School has completed its facilities, which include a five-story building with a swimming pool on the top floor. |
| What does the annual tuition fee cover? | The annual tuition fee includes the tuition for one year, building fee, annual activity fee, catering, textbooks, and uniform costs, excluding extracurricular fees. |
| Where is Kreativa Global School located? | Jl. Parakan Saat 1 No.40, Soekarno Hatta, Kota Bandung. ⚠️ (footer: No. 39) |

ID (Tanya Jawab) memakai 9 pertanyaan yang sama (terjemahan), mis. "Apa itu Kreativa Global School?", "Berapa biaya sekolah tahunan di Kreativa Global School?", "Di manakah lokasi Sekolah Global Kreativa?".

**Khusus ID — "Rencana Gedung Kami"** (galeri render gedung, 12 gambar `/wp-content/uploads/2025/08/`): Lobby, Lab STEM, Ruang Konsultasi Siswa, Toilet, Kelas TK B, RSG (ruang serbaguna), Lab Bahasa, Outdoor TK, Kelas TK A, Perpustakaan, KreativaMart, Lapangan. → **Rekomendasi:** jadikan section "Facilities / Fasilitas" di kedua bahasa.

---

### 3.3 Kindergarten — `/kindergarten/` (EN)

- Hero H1: **Kindergarten** — "Nurturing generations with character, knowledge, and Qur'anic values for global competitiveness." (+ slider gambar 5 slide)
- **Our Kindergarten Curriculum** — Our program is built upon Kurikulum Merdeka Fase Fondasi, enriched with a play-based, inquiry-driven, and theme-integrated learning approach, while being grounded in Islamic values. Through meaningful learning experiences, children are encouraged to explore, ask questions, discover, and develop strong character in a joyful and nurturing environment.
- **Thematic Learning** — Every term, children explore the world through meaningful thematic blocks from Friends, Family & Me to Space and the Future. Each theme weaves together literacy, numeracy, science, arts, and social development into one connected learning experience. Children don't just learn subjects, they explore ideas, ask questions, and make sense of the world around them.
- **STEAM Integration** — Creativity and critical thinking are built into every theme. Through hands-on projects and open-ended exploration, children engage with Science, Technology, Engineering, Arts, and Mathematics in ways that feel natural and exciting, building real skills through real experiences.
- **Literacy & Phonics** — English is developed through two pathways running side by side: contextual immersion within every thematic unit and a structured Phonics programme that builds phonemic awareness and early reading skills systematically. This approach is designed for young English as Foreign Language learners, ensuring children develop confidence in English at their own pace.
- **Islamic Values at the Core** — Faith is not a separate subject, it is woven into everything. Each day, children grow in aqidah, akhlak, and everyday Islamic habits through routines, dua, stories, and learning experiences that connect them to Allah as Creator and to one another as a community.
- **Independence & Life Skills** — At KGS Kindergarten, independence is a daily practice. From the moment children arrive, they take ownership of their day: hanging up their bags, tidying their workspace, preparing their materials, and caring for their belongings. Through consistent routines and loving encouragement, children grow in four areas of independence: self-care, responsibility for belongings, social independence and learning readiness all grounded in the Islamic values of self-discipline.
- **7 Muslim Kreativa** — Every learning experience at KGS Kindergarten is designed to nurture our 7 Muslim Kreativa learner profile, growing children who are: Faithful Thinkers · Noble in Character · Self-Disciplined · Curious Learners · Healthy in Mind & Body · Organized & Responsible · Impactful to Community. These are not just values we teach, they are qualities we live and practice together, every day.
- **Subjects: A Holistic Approach** — Our curriculum is designed to be comprehensive and aligned with the themes established by the National Department of Early Childhood Education. This means we cover 30 distinct themes, each one further explored through 7 key learning areas: Islamic Studies · Practical Life Skills · Sensorial & Science Exploration · Language Development · Math, Technology & Engineering Integration · Cultural Awareness · Art & Creativity. (gambar `kindergarten-A-Holistic-Approach.jpg`)
- **Daily Activities** — Duha prayer · Morning dhikr · Recitations and Tahfidz of the Qur'an · Teaching and learning activity · Congregational Dhuhr prayer · Sirah Nabawiyah (gambar `kegiatan-harian.jpeg`)
- **School Operating Hours** — School days: Monday–Friday · Time: 07.30–13.30 WIB · Arrival: 07.25 WIB · Return: 13.30 WIB

**Versi ID `/id/tk/`** (konten lama, berbeda dari EN):
- H1 "Taman Kanak-Kanak" — "Menghasilkan Generasi Unggul, Adaptif, dan Berdaya Saing Global"
- Kurikulum TK (Kurikulum Merdeka + bermain, inkuiri, tematik, nilai Islam), **Integrasi STEM** (menyebut pendekatan terinspirasi **Montessori**), **Nilai-nilai Islami** (2 paragraf tentang shalat harian & sirah Nabi), **Mata Pelajaran: Pendekatan Holistik** (30 tema, 7 bidang: Studi Islam, Keterampilan hidup, Eksplorasi Sensorik & Sains, Perkembangan bahasa, Integrasi Matematika/Teknologi/Engineering, Kesadaran budaya, Seni & Kreativitas), **Kegiatan Harian**, **Operasional** (Senin–Jum'at 07.30–13.30, kedatangan 07.25, kepulangan 13.30).
- Tidak memuat: Thematic Learning, Literacy & Phonics, Independence & Life Skills, 7 Muslim Kreativa → **perlu diterjemahkan ulang dari versi EN.**

---

### 3.4 Primary School — `/primary-school/` (EN)

Layout: hero berwarna pink + **sidebar anchor sticky** dengan item:
`Vision & Mission (#vision) · Founder & Board (#founder) · Education Initiative (#education) · Learning Objectives (#learning) · 7 Moslem Characters (#tujuh) · Curriculum Framework (#curriculum) · English Learning Framework (#english) · Student Life (#student) · Clubs & Competitions (#club) · Academic Experience (tanpa target)`

Konten berurutan:
1. Hero: "Welcome to Kreativa Global Primary School" — "Nurturing generations with character, knowledge, and Qur'anic values for global competitiveness." (gambar gedung `krativa-global-building-new.jpeg`)
2. Ayat: وَمَآ أَرْسَلْنَٰكَ إِلَّا رَحْمَةً لِّلْعَٰلَمِينَ — "And We have not sent you except as a mercy to the worlds. (QS. Al-Anbiya :107)"
3. Vision & Mission → blok **4.1**
4. Founder & Board → blok **4.2**
5. **Principal (khusus Primary)** — **Nurhayati, SP., MSM** · Principal · ITB, Master of Science in Management:
   > Welcome to Kreativa Global School! Dear parents, students, and wonderful visitors,
   > As the Principal, it is a true joy to welcome you to our vibrant school community.
   > At Kreativa, we believe that every child is unique, full of potential, and capable of achieving amazing things. Every day on campus is an exciting journey of discovery, learning, and growth. Our dedicated team of educators is passionately committed to nurturing not only bright minds, but also kind hearts, strong Islamic values, and confident future leaders.
   > We integrate global standards through the Cambridge framework while keeping our students deeply rooted in noble Islamic character and national pride.
   > Through our active and fun learning environment, we encourage children to ask questions, think critically, and build lifelong learning habits. We also ensure that every child receives the personal support they need to thrive at their own pace.
   > We strongly believe that a child's success is built on a strong partnership between home and school. Working hand in hand with you—our wonderful parents—is at the heart of everything we do. Together, we create a safe, supportive, and inspiring environment where our children feel loved, valued, and motivated to reach their highest potential.
   > Thank you for trusting us to be part of your child's educational journey. We look forward to creating many meaningful milestones together with your family this year. Let's join hands to guide, inspire, and shape a great, bright generation for Indonesia!
   > Warmest regards, Principal, Kreativa Global School
6. Education Initiative → blok **4.3**
7. Key Learning Objectives + 7 Moslem Characters → blok **4.4**
8. Curriculum Framework → diagram Primary (blok **4.5**)
9. **English Learning Framework for EFL\* Students — English Learning Journey**
   - **Phase 1: Language Acquisition (Grade 1–3)**
     - 1st & 2nd Grade: Natural process of learning a language, including vocabularies and basic conversation.
     - 3rd Grade: Strengthening early literacy skills and transition toward more structured input.
     - Objectives: Follow simple spoken instructions · Participate in basic conversations · Listen and understand short stories, descriptions, and dialogues · Understand basic sentence structure · Begin forming simple sentences · Read & understand short or early-reader books.
   - **Phase 2: Linguistic Acquisition (Grade 4–6)**
     - 4th & 5th Grade: A structured approach to learning language skills including comprehension and basic grammar.
     - 6th Grade: Strengthening fluency, writing, grammar usage, and academic communication.
     - Objectives: Engage in longer conversations (hobbies, stories, etc.) · Express opinions and ideas clearly · Develop listening comprehension for academic subjects · Identify main ideas and details in a paragraph · Write simple paragraphs using correct structure · Use basic grammar structures correctly.
10. **Student Life** (kartu bergambar — teks ada di dalam gambar): STEM Project & Innovation Week · Spiritual Reflection Circles · Leadership & Public Speaking · Clubs & Enrichment · Academic Competitions
11. **Clubs & Competitions** (10 kartu foto, teks di gambar): Olympiad Club · Quranic · Music · Archery · Roller Blade · Basket Ball · Swimming · Taekwondo · Robotic · Painting
12. Penutup: "Discover more about Kreativa Global Primary School — where faith meets excellence and every learner is prepared to lead with impact."

**Versi ID**
- `/id/sd-kreativa-global/` (dipakai menu): struktur identik, hanya hero yang diterjemahkan ("Selamat datang di SD Kreativa Global — Membina generasi yang berakhlak mulia, berilmu dan berbudi pekerti luhur serta berakhlak mulia dalam rangka daya saing global."), **seluruh isi lain masih bahasa Inggris** dan tidak ada sambutan Kepala Sekolah.
- `/id/sd/` (versi lama, dilink dari footer ID) berisi konten yang **tidak ada di EN** dan layak dipertahankan:
  - **Kurikulum SD**: Cambridge + STEM, pendekatan inkuiri terinspirasi IB. "Keunggulan Kurikulum Cambridge-STEM": Wawasan Global · Standar Akademik Tinggi · Pembelajaran Inovatif · Pendekatan Interdisipliner · Keterampilan Siap Masa Depan. + paragraf pembelajaran inkuiri & "Komitmen Kami terhadap Keunggulan".
  - **Nilai-nilai Islami** (2 paragraf).
  - **Kegiatan Harian**: Shalat Dhuha · Dzikir pagi · Pembacaan dan Tahfidz Al-Qur'an · KBM · Shalat Dzuhur berjamaah · KBM · Sirah Nabawiyah · Ekstrakurikuler.
  - **Jam Belajar**: 07:30–14:00.
  - **Rasio Siswa-Guru 1 : 22**.
  - **Profil Guru** (carousel): Mr Hanif (Primary Teacher), Mr Braja (Primary Teacher), Ms Irma (Academic Head), Ms Yola (School Psychologist), Ms Aya (Vice Principal), Ms Desi, Ms Dini, Ms Mega, Ms Faura, Mr Iqbal (Primary Teacher), Ms Azka (School Admin).

---

### 3.5 Secondary School — `/secondary-school/` (EN)

Sidebar anchor: `Vision & Mission · Founder & Board · Education Initiative · Learning Objectives · 7 Moslem Characters · Curriculum Framework · Curriculum Pathway (#pathway) · Student Life · Clubs & Competitions · Academic Experience`

1. Hero: "Welcome to Kreativa Global Secondary School" — "Grounded in faith, guided by knowledge — nurturing global-minded leaders with integrity and compassion."
2. Ayat QS. Al-Anbiya:107 · Vision & Mission (4.1) · Founder & Board (4.2) · Education Initiative (4.3) · Learning Objectives & 7 Moslem Characters (4.4) · Curriculum Framework (diagram SMP/SMA, 4.5)
3. **Curriculum Pathway** (kode = Cambridge syllabus code)

| | Secondary 1 | Secondary 2 | Secondary 3 |
|---|---|---|---|
| **Core subjects** | English as a Second Language (0876), Mathematics (0862), Science (0893) | English as a Second Language (0510), Mathematics (0580), Biology (0610), Chemistry (0620), Physics (0625), Bahasa Indonesia (0538) | sama dengan Secondary 2 |
| **Supporting** | Bahasa Indonesia, Islamic Studies, Qur'anic Studies, Physical Education, Civics, Digital Literacy (0082), Global Perspectives (1129), Civics/PE/History/Local Content, AI & Coding elective | Islamic Studies, Qur'anic Studies, Computer Science (0478) / ICT (0417), Global Perspectives (1129), History/PE/Civics, AI & Coding elective | Islamic Studies, Qur'anic Studies, Computer Science (0478) / ICT (0417), Global Perspectives (1129), History/Physical Education/Civics, AI & Coding elective |
| **Assessment** | Internal & Checkpoint Assessments; Student portfolio | Internal IGCSE-style preparation; Project & portfolio evaluation | Internal IGCSE-style preparation; Project & portfolio evaluation |

4. **Student Life** (kartu foto + teks):
   - **Faith & Leadership Expedition** — Outdoor, reflective experiences that build faith, resilience, and teamwork.
   - **Global Exchange & Community Service** — Cultural exchange and service projects that build empathy, teamwork, and global awareness.
   - **Personal Mastery Track** — A journey of self-discovery and growth where student learn to understand themselves, build confidence and develop the mindset to lead, create and thrive in life.
   - **Kreativa Capstone Exhibition & Innovation Symposium** — Students research, design, and present real-world solutions — integrating science, creativity, and leadership.
5. **Clubs & Competitions** (ikon): blok **4.6**
6. Penutup: "Discover more about Kreativa Global Secondary School — where faith meets excellence and every learner is prepared to lead with impact."

**Versi ID `/id/smp/`** (layout & konten lama, belum mengikuti struktur EN baru):
- H1 "Sekolah Menengah Pertama" — "Menggunakan Kurikulum Cambridge untuk jenjang Lower Secondary (Kelas 7–8) dan IGCSE (Kelas 9–10)…"
- Kurikulum SMP: 🔹 Mata Pelajaran: Bahasa Inggris, Matematika, Fisika, Biologi, Literasi Digital, Global Perspectives, Bahasa Indonesia, PAI · 🔹 Nasional: PPKn, PJOK, Seni Budaya · 🔹 Landasan: nilai Islami & kepemimpinan · 👥 22 siswa per kelas
- Keunggulan Kurikulum Cambridge-STEAM (5 poin sama dengan SD), Komitmen, Nilai-nilai Islami, Jam Belajar 07:30–14:00.
- ⚠️ Kontradiksi pembagian kelas: ID menyebut IGCSE kelas 9–10, sedangkan EN memakai Secondary 1–3 = kelas 7–9 dan Secondary 4 = kelas 10 (masuk High School).

---

### 3.6 High School — `/high-school/` (EN) dan `/id/sma/` (ID)

Sidebar anchor: `Vision & Mission · Founder & Board · Principal Message (#principal-message, tapi section-nya tidak ada) · Education Initiative · Learning Objectives · 7 Moslem Characters · Curriculum Framework · Curriculum Pathway · Student Life · Clubs & Competitions · Academic Experience`

1. Hero: "Welcome to Kreativa Global High School" — "Laying the foundation for excellence and preparing future leaders for top universities worldwide." (ID: "Selamat datang di SMA Kreativa Global — Meletakkan dasar untuk keunggulan dan mempersiapkan pemimpin masa depan untuk universitas-universitas terkemuka di seluruh dunia.")
2. Blok bersama 4.1–4.5.
3. **Curriculum Pathway — kredit per tahun**

**Core Subject**
| Subject | Secondary 4 | Junior College 1 | Junior College 2 |
|---|---|---|---|
| English as a Second Language | 6 | 4 | 4 |
| Mathematics | 6 | 4 | 4 |
| Biology | 6 | 4 | 4 |
| Chemistry | 6 | 4 | 4 |
| Physics | 6 | 4 | 4 |
| Bahasa Indonesia | 4 | 4 | 4 |
| SAT | – | 2 | 3 |
| IELTS | – | 2 | 3 |
| **Total Credits** | 34 (71%) | 28 (56%) | 30 (58%) |

**Supporting Subject**
| Subject | S4 | JC1 | JC2 |
|---|---|---|---|
| Islamic & Qur'anic Studies | 4 | 4 | 4 |
| Global Perspectives | 2 | 2 | 2 |
| History and Civics | 2 | 2 | 2 |
| Physical Education | 2 | 2 | 2 |
| Art | 2 | – | – |
| Introduction to Business & Management | – | – | 2 |
| **Total Credits** | 14 (29%) | 10 (20%) | 10 (19%) |

**Elective Subject**
| Subject | S4 | JC1 | JC2 |
|---|---|---|---|
| Elective Subject Credits (Applied Science / Business & Management / Leadership & Social Science) | 0 (0%) | 12 (24%) | 12 (23%) |
| **Total Credits (keseluruhan)** | 48 | 50 | 52 |

Tombol **Subject Catalog** → `/subject-catalog/` (lihat 3.7).

4. **Student Life**
   - Faith & Leadership Expedition — Outdoor, reflective experiences that build faith, resilience, and teamwork.
   - Global Exchange & Community Service — Cultural exchange and service projects that build empathy, teamwork, and global awareness.
   - **Internship & Industry Exposure** — Real-world learning through professional placements with partner companies and organizations.
   - **Career & University Readiness Modules** — Guidance and mentoring to prepare for global university admissions, including IELTS, SAT, portfolio, and personal statement coaching.
   - Kreativa Capstone Exhibition & Innovation Symposium — Students research, design, and present real-world solutions — integrating science, creativity, and leadership.
5. Clubs & Competitions → blok **4.6**

ID `/id/sma/` sudah menerjemahkan semua blok kecuali deskripsi Student Life (masih EN). Label ID: Mata Pelajaran Inti / Tambahan / Pilihan, "Katalog Mata Pelajaran".

---

### 3.7 Subject Catalog — `/subject-catalog/` + detail `/course-catalog/{slug}/`

Halaman daftar dengan 3 tabel (kolom: Elective Subject · Semester · Credit). Setiap judul menautkan ke halaman detail. Template detail:

```
H1  {Judul}
    "{tagline}"   (opsional, contoh MUN: "Speak for nations. Solve for humanity.")
H2  Educational Objective   → paragraf
H2  Focus Areas             → paragraf
H3  Expected Learning Outcomes → bullet list (5–6 butir)
```

**Applied Science (14)**
| Subject | Sem | Cr |
|---|---|---|
| Scientific Thinking & Research Method | 1 | 2 |
| The Science and Implications of Generative AI | 1 | 2 |
| Earth & Environmental Science | 1 | 2 |
| Applied Biology: Human Systems & Health | 1 | 2 |
| Physics of Everyday Life | 1 | 2 |
| Chemistry in Medicine & Materials | 1 | 2 |
| Introduction to Engineering & Design Principles | 1 | 2 |
| Introduction to Applied Statistics & Data Visualization | 2 | 2 |
| Biotechnology & Society | 2 | 2 |
| Advanced Data Science & Predictive Analytics | 2 | 2 |
| Mathematics for Economics & Decision Making | 2 | 2 |
| Scientific Research & Academic Writing | 2 | 4 |
| Sustainable Energy Systems | 2 | 2 |
| Global Health & Epidemiology | 2 | 2 |

**Business & Management (22)**
| Subject | Sem | Cr |
|---|---|---|
| Introduction to Budgeting and Financial Management | 1 | 2 |
| Operations & Business Process Management | 1 | 2 |
| Performance Leadership | 1 | 2 |
| Entrepreneurship and Innovation in the Private and Social Sectors | 1 | 2 |
| Microeconomics for Modern Society | 1 | 2 |
| Financial Accounting for Beginners | 1 | 4 |
| Behavioral Economics | 1 | 2 |
| Financial Literacy & Personal Investing | 1 | 4 |
| Start-up Incubator Project | 1 | 2 |
| Design Thinking & Product Innovation | 1 | 2 |
| Marketing & Consumer Psychology | 1 | 4 |
| Business Analytics & Data-Driven Decisions | 2 | 2 |
| Introduction to Global Trade & Development | 2 | 2 |
| Global Macroeconomics & Policy | 2 | 2 |
| Social Entrepreneurship & Innovation | 2 | 2 |
| Principles of Business & Strategic Management | 2 | 4 |
| Innovation Economics & Future Markets | 2 | 2 |
| Business Ethics & Corporate Responsibility | 2 | 2 |
| Digital Entrepreneurship & E-Commerce Strategy | 2 | 2 |
| Introduction to Islamic Economics and Halal Industry | 2 | 2 |
| Project Management & Agile Leadership | 2 | 2 |
| Hospitality and Service Operations | 2 | 2 |

**Leadership & Social Science (19)**
| Subject | Sem | Cr |
|---|---|---|
| Strategy, Structure, and Leadership in Public Service Organizations | 1 | 4 |
| Getting Things Done: Management in a Development Context | 1 | 2 |
| Introduction to Negotiation Analysis | 1 | – ⚠️ |
| Global Issues & UN Diplomacy (MUN) | 1 | 2 |
| Emotional Influences on Decision Making: Bias and Benefit | 1 | 2 |
| Leadership and Personal Branding | 1 | 2 |
| Philanthropy and Public Problem-Solving | 1 | 2 |
| Creative Writing & Journalism | 1 | 2 |
| Introduction to Psychology | 1 | 2 |
| Art, Design, and Identity | 1 | 2 |
| Psychology for Learning and Well-being | 2 | 2 |
| Film, Media, and Society | 2 | 2 |
| Sociology & Culture in Modern Society | 2 | 2 |
| Creative Writing & Storytelling for Change | 2 | 4 |
| Media Literacy & Digital Society | 2 | 2 |
| Psychology of Leadership & Influence | 2 | 4 |
| International Relations & Global Diplomacy | 2 | 2 |
| Cultural Studies: Identity, Gender & Power | 2 | 2 |
| Islamic Civilization History | 2 | 2 |

Isi lengkap 55 halaman detail → **Lampiran A**.

---

### 3.8 Admission — `/admission/` (EN) dan `/id/registrasi/` (ID)

- Hero: "School Admission" + tombol **Apply Now** (ID: "Penerimaan Siswa Baru" + "Daftar Sekarang")

**#process — Admission Process (8 langkah, timeline)**
| # | EN | ID |
|---|---|---|
| 1 | **Application Submission** — Complete the Registration Form at admission.kreativaglobal.sch.id. | **Pengisian Formulir Pendaftaran** — Lengkapi Formulir Pendaftaran di admission.kreativaglobal.sch.id. |
| 2 | **Student Observation** — Through student observations, we learn more about each prospective student and their readiness to begin school. | **Observasi Siswa** — Melalui proses observasi, kami mengenal lebih jauh setiap calon siswa serta kesiapan mereka untuk memulai kegiatan belajar di sekolah. |
| 3 | **Parents Interview** — In this interview, parents will discuss their family values, educational expectations, and their child's development with the school. It's also an opportunity for parents to ask questions and better understand the environment and programs at Kreativa Global School. | **Wawancara Orang Tua** — Pada sesi wawancara, orang tua akan berdiskusi tentang nilai keluarga, harapan pendidikan, serta perkembangan anak bersama pihak sekolah. Ini juga menjadi kesempatan bagi orang tua untuk mengajukan pertanyaan dan mengenal lebih jauh lingkungan serta program di Kreativa Global School. |
| 4 | **Admission Decision** — The school will decide if your child is accepted or not. | **Keputusan Penerimaan** — Sekolah akan menentukan apakah calon siswa diterima atau tidak. |
| 5 | **Enrollment** — If Accepted, Complete enrollment by submitting documents and paying fees. | **Daftar Ulang** — Jika dinyatakan diterima, orang tua dapat melanjutkan proses daftar ulang dengan melengkapi dokumen dan melakukan pembayaran biaya administrasi. |
| 6 | **Uniform Fitting** — The student tries on uniforms. | **Pengukuran dan Fitting Seragam** — Siswa melakukan pengukuran dan mencoba seragam sekolah. |
| 7 | **Parent Orientation** — In the Parents Orientation, parents will learn about the school, meet the teachers, and understand how the school works. Parents will get tips on supporting their child and how to stay informed. This session helps parents feel ready as their child joins Kreativa Global School. | **Orientasi Orang Tua** — … orang tua akan mengenal lebih jauh tentang sekolah, bertemu dengan para guru, serta memahami cara kerja dan budaya sekolah. Orang tua juga akan mendapatkan tips untuk mendukung anak di tahun pertama… |
| 8 | **Student Orientation** — During the Student Orientation, students from all levels will be introduced to the school environment, meet their teachers and new friends, and get to know the learning routines and expectations. They will also learn about school values, daily activities, and important guidelines to help them feel confident, comfortable, and ready to start their journey at Kreativa Global School. | **Orientasi Siswa** — Selama Orientasi Siswa, peserta dari semua jenjang akan diperkenalkan pada lingkungan sekolah, bertemu guru serta teman baru, dan memahami rutinitas serta ekspektasi belajar… |

**#fees — School Fees 2027/2028** (di situs lama tabel berupa **gambar**; di bawah ini sudah ditranskripsi — jadikan tabel HTML)

Semua jenjang: **Registration Fee: Rp 1.000.000** + tombol **Download Brochure** (PDF).

**Kindergarten** — Brosur: `/wp-content/uploads/2026/09/01-Brosur-Kreativa-Global-Kindergarten-2027-2028.pdf.pdf`
| Level | Annual Tuition Fee |
|---|---|
| K1 | 26.000.000 |
| K2 | 27.200.000 |
- Including: School Facilities, School Activities, Curriculum Development, Learning Worksheets, Lunch, and School Uniforms.
- Excluding: Out-of-town Field Trip and Extracurricular Activities.

**Primary School** — Brosur: `/wp-content/uploads/2026/09/02-Brosur-Kreativa-Global-Primary-School-2027-2028.pdf`
Annual Program Fee & Monthly Tuition (sama di semua skema):
| Grade | Annual Program Fee | Monthly Tuition Fee |
|---|---|---|
| P1 | 7.200.000 | 2.200.000 |
| P2 | 7.900.000 | 2.300.000 |
| P3 | 8.600.000 | 2.400.000 |
| P4 | 9.300.000 | 2.500.000 |
| P5 | 10.000.000 | 2.600.000 |
| P6 | 10.800.000 | 2.700.000 |

Enrollment Fee (3 skema):
| Skema | Rincian |
|---|---|
| Scheme 1 — One-time Enrollment Fee | 50.000.000 dibayar di P1 |
| Scheme 2 — Two-time Enrollment Fee | 30.000.000 di P1 + 30.000.000 di P4 |
| Scheme 3 — Six-time Enrollment Fee | 10.500.000 per tahun (P1–P6) |
- Including: School Facilities, School Activities, Curriculum Development, Learning Books, Workbooks, and Worksheets, Lunch, and School Uniforms provided in P1, P3, and P5.
- Excluding: Cambridge Checkpoint, Overseas Immersion Program, Out-of-town Field Trip, and Extracurricular Activities.

**Secondary School** — Brosur: `/wp-content/uploads/2026/09/03-Brosur-Kreativa-Global-Secondary-School-2027-2028.pdf`
| Grade | Scheme 1: One-time Enrollment | Scheme 2: Three-time Enrollment | Annual Program Fee | Monthly Tuition |
|---|---|---|---|---|
| S1 | 31.520.000 | 11.840.000 | 5.500.000 | 2.100.000 |
| S2 | – | 11.840.000 | 6.000.000 | 2.200.000 |
| S3 | – | 11.840.000 | 6.500.000 | 2.300.000 |
- Including: School Facilities, School Activities, Curriculum Development, Books, and School Uniforms.
- Excluding: Cambridge Checkpoint, Overseas Immersion Program, Out-of-town Field Trip, Extracurricular Activities, and Lunch.

**High School** — Brosur: `/wp-content/uploads/2026/09/04-Brosur-Kreativa-Global-High-School-2027-2028.pdf`
| Grade | Scheme 1: One-time Enrollment | Scheme 2: Three-time Enrollment | Annual Program Fee | Monthly Tuition |
|---|---|---|---|---|
| S4 | 45.000.000 | 16.000.000 | 7.500.000 | 2.200.000 |
| JC1 | – | 16.000.000 | 8.000.000 | 2.300.000 |
| JC2 | – | 16.000.000 | 8.500.000 | 2.400.000 |
- Including: School Facilities, School Activities, Curriculum Development, Books, and School Uniforms.
- Excluding: IGCSE Exam, A-Level Assessment, Overseas Immersion Program, Out-of-town Field Trip, Extracurricular Activities, and Lunch.

Penutup: "Kreativa Global: Where your potential is valued, your dreams are nurtured, and your future shines brightly." (ID: "Kreativa Global: Tempat potensimu dihargai, mimpimu tumbuh, dan masa depanmu bersinar.") + Apply Now.

> ⚠️ Angka biaya diambil dari gambar per 5 Nov 2026 — minta pihak sekolah memverifikasi sebelum go-live, dan simpan di satu file data agar mudah diperbarui tiap tahun ajaran.

---

### 3.9 Career — `/career/` (EN) dan `/id/karir/` (ID)

- Hero "Join Our Team" + **Apply Now** → `https://career.kreativaglobal.sch.id/` (ID: "Bergabung Bersama Kami" + "Kirim Lamaran")
- Teks: "Join our enthusiastic and dedicated community committed to creating positive change. We are looking for talented and dedicated individuals with a passion for educating the next generation based on Islamic values."
- 5 poster (gambar, Okt 2026) — **Kreativa Teacher Development Program** ("Grow as an educator. Make an impact."). Transkripsi untuk dijadikan konten HTML:
  - *Intro:* A structured development program combining professional training, mentoring, and real classroom experience to prepare you for a teaching career at Kreativa Global School. **6-Month Paid Program | Jan–Jun 2027** · Kindergarten · Primary · Secondary · High School.
  - *What you'll develop:* (1) Cambridge Curriculum — learn to apply Cambridge curriculum standards and assessment practices; (2) English for Teaching — develop your English communication skills for classroom teaching; (3) Effective Pedagogy — learn to plan and deliver lessons that support student learning; (4) Understanding Students' Cognitive Development — child development, learning psychology, individual learning needs; (5) Classroom Experience — practical experience through classroom observation, microteaching, and guided teaching; (6) Kreativa Teaching Culture — explore long-term career paths in teaching specialization or school leadership.
  - *Compensation & Benefits:* (1) Competitive Compensation — competitive pay throughout the 6-month program; (2) Professional Certification — Kreativa Teaching Academy certificate upon completion; (3) 2-Year Employment Contract — upon meeting program standards; (4) Career Growth Opportunities — teaching specialization and school leadership.
  - *Who can apply:* Fresh Graduates · Experienced Teachers · Subject Specialists (graduates with strong subject knowledge, including those without a teaching background) · Cambridge-Experienced Teachers.
  - *Requirements:* Bachelor's degree in a relevant field from a reputable university · IELTS 6.0+ for Kindergarten–Primary or 6.5+ for Secondary–High School, or equivalent English proficiency · Strong academic or subject knowledge · Commitment to Islamic values and education · Experience with the Cambridge curriculum is preferred.
  - *How to apply:* 01 Apply (submit your application) → 02 Selection (recruitment & assessment) → 03 Development (6-month paid Teacher Development Program) → 04 Employment (successful participants begin teaching at Kreativa Global School). Timeline: Oct–Dec 2026 Application & Selection → Jan–Jun 2027 Teacher Development Program → Jul 2027 Teaching appointment. CTA "Apply Now — scan QR or visit career.kreativaglobal.sch.id" · Academic Year 2027/2028.

---

## 4. Blok konten bersama (jadikan komponen reusable)

### 4.1 Vision & Mission
- **Vision:** "Nurturing lifelong learners with global competence, strong character, and Islamic values to lead with impact."
  ID (About): "Mewujudkan generasi pembelajar sepanjang hayat yang berkompetensi global, berkarakter kuat, serta berlandaskan nilai-nilai Islami, sehingga mampu menjadi pemimpin yang memberi dampak positif bagi masyarakat." · ID (SMA): "Menumbuhkan pembelajar sepanjang hayat yang memiliki kompetensi global, berkarakter kuat, dan berlandaskan nilai-nilai Islam untuk menjadi pemimpin yang memberi dampak." → **pilih satu versi resmi**.
- **Mission:** (1) "Partnering with parents in their role as the primary and lifelong educators." (2) "Empowering teachers as role models who inspire learning and character."
- Selalu didahului ayat QS. Al-Anbiya:107 di halaman jenjang.

### 4.2 Founder & Board (bio panjang)
- **Syauqi Robbani, MPA** — Syauqi pursued his studies at Harvard University and began his career in corporate banking and investment, where he developed strong analytical and leadership foundations. He later established and managed several businesses in healthcare, education, and consumer industries. As CEO of CNA Investment and Founder of Kreativa Global School, Syauqi brings strategic vision and global perspective, connecting international standards with strong Indonesian and Islamic values to build educational institutions that inspire purpose and excellence.
- **Muhammad Yorga Permana, Ph.D** — Lecturer at the School of Business and Management, Institut Teknologi Bandung (SBM ITB), and a graduate of the London School of Economics and Political Science (LSE). His expertise spans innovation, human capital management, the future of work, and organization studies. He earned his PhD from LSE, United Kingdom, and his Master's degree from Eindhoven University of Technology, the Netherlands, both funded by the Indonesia Endowment Fund for Education (LPDP) scholarship. Beyond academia, he serves as Expert Staff at the Ministry of Manpower and Assistant Director for Student Affairs at ITB. Passionate about education and human development, Yorga supports Kreativa Global School in fostering curiosity, collaboration, and character-driven education to nurture Indonesian talents with global competencies for an ever-evolving world of work.
- Terjemahan ID tersedia di `/id/sma/`.

### 4.3 Education Initiative
> Kreativa Global School is a mission-driven education initiative under CNA Investment, an investment firm based in West Java with a focus on healthcare, consumer, and infrastructure sectors. CNA currently operates four hospitals and clinics, eight schools, and several other growing businesses.
> CNA Investment's diverse portfolio from healthcare to education reflects its commitment to advancing human development across West Java. **Kreativa Global School** serves as its flagship education initiative, contributing directly to several **United Nations Sustainable Development (SDGs)**:

- Strip logo: Kreativa | "A Part of CNA Group" – **CNA Investment** | "Operated by" – **Akademi Insan Mulia** | "Affiliated with" – **Sekolah Talenta Juara**, **Edelweiss healthcare group**.
- Daftar ikon SDG ditampilkan sebagai gambar (screenshot) — minta daftar SDG resmi ke sekolah, lalu render sebagai ikon SDG asli.

### 4.4 Key Learning Objectives & 7 Moslem Characters
**Key Learning Objectives**
- **Academic Excellence** — Achieves high standards in national & international assessments · Excels in STEM literacy and global narrative · Ready for top universities in Indonesia and abroad
- **Global Citizen Mindset** — Demonstrates leadership, communication, and growth mindset · Applies critical inquiry and creativity to real-world problems · Confidence in collaboration in global narratives
- **Personal Branding** — Recognizes personal strengths and purpose · Creates innovative solutions through STEM and Capstone projects · Builds a digital portfolio and personal statement

**7 Moslem Characters of Kreativa Learners** — Focus on 3 Clusters: Faith and Values, Personal Development, and Social Impact
| Cluster | Karakter | Deskripsi |
|---|---|---|
| Faith and Values | **Faithful Thinker (Aqidah)** | At Kreativa, faith is the foundation of knowledge — guiding learners to think critically, explore creation, and remain steadfast in tauhid. |
| Faith and Values | **Noble Character (Akhlaq)** | Students embody integrity and adab — honesty, kindness, responsibility, and courage. They learn that true leadership begins with good manners and consistency between words and deeds. |
| Personal Development | **Self Disciplined** | Learners practice self-control and perseverance — mastering themselves before mastering the world. They strive for ihsan (excellence) in study, behavior, and relationships. |
| Personal Development | **Curious Learner** | Curiosity drives growth and innovation. Kreativa learners ask, explore, and innovate through STEM and inquiry, seeing learning as a lifelong act of worship. |
| Personal Development | **Healthy & Strong Mind and Body** | Active body can improve learning process and productivity. A strong body supports a strong mind. Learners stay active and balanced through movement, sports, and gratitude for health. |
| Personal Development | **Organized & Responsible** | Productivity requires focus and organization. In an age of digital overload, learners plan, prioritize, and stay accountable — building habits of order, responsibility, and focus. |
| Social Impact | **Impactful to Community** | Learners grow by giving and serving others. They help others and serve the community — living the Prophet's teaching: The best of people are those most beneficial to others. |

ID: Pemikir Berlandaskan Aqidah · Berakhlak Mulia · Disiplin Diri · Pembelajar yang Penasaran · Pikiran & Tubuh yang Sehat dan Kuat · Teratur & Bertanggung Jawab · Berdampak untuk Komunitas (teks lengkap di `/id/sma/`).

### 4.5 Curriculum Framework (diagram — situs lama berupa gambar, buat ulang sebagai komponen HTML)
**Primary School (SD)** — Grade 1–3 → Grade 4–6
- Curriculum Pathway: Active Learning + Inquiry-based · Cambridge Curriculum – Structured + Subject Based · Kurikulum Nasional Integration · Islamic Values Foundation
- Learning Outcome: (Grade 1–3) **Learning Capacity** — English Skill, Motoric Skill, Social Emotional, Presentation Skill · (Grade 4–6) **Foundation for Academic Rigor** — Build Ownership of Their Own Learning Process

**Secondary (SMP) — Secondary 1–3 (Grade 7–9) → High School (SMA) — Secondary 4 (Grade 10), Junior College 1–2 (Grade 11–12)**
- Curriculum Pathway: SMP = Subject-based, Structured Curriculum · Cambridge + IGCSE Preparation | SMA = Inquiry-based + Capstone Project · SAT + IELTS Preparation | keduanya = Kurikulum Nasional Integration
- Learning Outcome: SMP = Foundation for Academic Rigor · Problem Solving + Collaboration | SMA = Pathway to Global Universities · Leadership + Global Communication

### 4.6 Clubs & Competitions (Secondary & High School)
| Klub | Isi |
|---|---|
| Kreativa Innovation Lab | Research Club, STEM Olympiad Club, Robotic Society |
| Young Entrepreneurs Club | Young CEO Mentorship Program, Finance & Investment Club |
| Debate and Model United Nations (MUN) Club | — |
| Creative Arts and Performance Ensemble | Choir, Music, Theatre Club, Art Exhibitions, Broadcasting |
| Global Languages and Culture Society | English Mastery, Arabic, Mandarin, Korean Club |
| Organization | Student Council, Scout, Red Cross Youth (ID: OSIS, Pramuka, PMR) |

### 4.7 Data operasional (satu sumber kebenaran)
| Item | Nilai |
|---|---|
| Telepon/WA | +62 851-8666-4140 (ada nomor kedua di ID: +62 857-1769-2595 — konfirmasi) |
| Email | info@kreativaglobal.sch.id (konfirmasi apakah info@kreativaglobal.id masih aktif) |
| Jam kantor | Senin–Jumat 08.00–16.00 WIB; Sabtu, Minggu & libur nasional tutup |
| Jam sekolah TK | 07.30–13.30 (datang 07.25) |
| Jam sekolah SD/SMP | 07.30–14.00 |
| Rasio guru:siswa | 1 : 22 |
| Kampus | 3 alamat (lihat 2.3) |

---

## 5. Aset yang perlu dikumpulkan dari situs lama

- Logo Kreativa (shield) + varian "Kreativa Global / {Level} School", logo Cambridge International School.
- Foto hero home, foto founder/board (portrait + wisuda), foto Principal Nurhayati, foto gedung (`krativa-global-building-new.jpeg`).
- 5 ikon elemen logo (`icon-blue-01..05`), gambar Visi/Misi.
- Foto Student Life & Clubs (Primary: `brosur_*.jpg`, `club-5_*.jpg`; Secondary/HS: `WhatsApp-Image-2025-10-30-*`), ikon klub (`idea.png`, `entrepreneurship.png`, `debate.png`, `extracurricular-activities.png`, `languange.png`, `group.png`).
- 12 render gedung (`/wp-content/uploads/2025/08/*`), foto guru (`Ms-Aya.png` dst.).
- 4 PDF brosur 2027/2028, 5 poster karier.
- Logo mitra: CNA Investment, Akademi Insan Mulia, Sekolah Talenta Juara, Edelweiss.

Tips: di Claude Code, minta script kecil untuk mengunduh semua gambar dari `wp-content/uploads` yang dirujuk halaman-halaman di 2.4 ke `public/images/legacy/`, lalu kompres ke WebP/AVIF.

---

## 6. Masalah di situs lama (jadikan checklist perbaikan)

**Link & navigasi**
1. Tombol "Learn More" Primary/Secondary di Home mengarah ke halaman lama `/primary/` dan `/secondary/`, bukan `/primary-school/` dan `/secondary-school/`.
2. Link footer EN memakai `/primary`, `/secondary` (halaman lama).
3. "Selengkapnya" di Beranda ID mengarah ke halaman EN.
4. Tombol Apply/Daftar mengarah ke 3 domain berbeda: `admission.kreativaglobal.id`, `admission.kreativaglobal.sch.id`, dan `admission.indonesiajuara.id` → satukan.
5. Nomor WhatsApp tur di Beranda ID (6285717692595) berbeda dengan nomor utama (6285186664140).
6. Sidebar "Academic Experience" tidak punya target; "Principal Message" di High School tidak punya section; sebaliknya Primary punya sambutan Principal tapi tidak ada di sidebar.
7. Menu SD (ID) ke `/id/sd-kreativa-global/`, footer ke `/id/sd/` — dua halaman berbeda isi.

**Konsistensi konten**
8. Klaim kurikulum tidak seragam: Home = "Cambridge and IB"; About = "Cambridge + Kurikulum Merdeka"; FAQ = "IB, Cambridge, National, Islamic"; jangkauan "to High School" vs "to Junior College".
9. Alamat: FAQ "Parakan Saat 1 No.40" vs footer "No. 39".
10. Email EN `info@kreativaglobal.sch.id` vs ID `info@kreativaglobal.id`.
11. Jam buka EN "8am-16pm" (typo) dan "Sun & PH" vs ID "Sabtu & Libur Nasional".
12. Penamaan "7 Moslem Characters" vs "7 Muslim Kreativa" (KG) → pilih satu.
13. Pembagian kelas SMP di ID (IGCSE kelas 9–10) bertentangan dengan EN (S1–S3 = kelas 7–9, S4 = kelas 10).
14. Urutan skema biaya Primary EN (1 = sekali bayar) terbalik dengan ID (1 = enam angsuran); istilah "One-Times / Three-Time" tidak konsisten. Header "2027/2028" tetapi nama file gambar "2627".
15. Kredit "Introduction to Negotiation Analysis" kosong (–).
16. Typo: "themeselves", "Incuiry-based", "languange", "krativa", "primay", "higschool", nama brosur KG `.pdf.pdf`.
17. Paragraf "Our Logo" berbicara tentang website sebagai etalase toko — perlu ditulis ulang.

**Bilingual**
18. Halaman ID TK, SD, SMP masih versi lama/berbeda struktur; `/id/sd-kreativa-global/` hampir seluruhnya bahasa Inggris; Student Life di `/id/sma/` belum diterjemahkan.
19. Section "Rencana Gedung" dan "Profil Guru" hanya ada di versi ID.

**Teknis/SEO/aksesibilitas**
20. Tabel biaya, diagram kurikulum, Student Life Primary, klub Primary, daftar SDG, dan info karier semuanya **gambar** → tidak terbaca mesin pencari/screen reader.
21. Banyak halaman sampah terindeks di sitemap (Bagian 7).
22. Testimoni diduplikasi di DOM (efek carousel loop).
23. Sisa warna default Divi (`#2EA3F2`) bercampur dengan palet brand.

---

## 7. Halaman lama/orphan di sitemap (tidak ada di menu)

`/sample-page/`, `/auto-draft/`, `/home/`, `/id/beranda-lama/`, `/faq/`, `/id/tanya-jawab/`, `/our-building/`, `/article-news/`, `/id/artikel-berita/`, `/student-life/`, `/student-life-2/`, `/id/kehidupan-kampus/`, `/academic/`, `/id/akademik/`, `/academic-experience/`, `/junior-college/`, `/primary/`, `/secondary/`, `/kindergarten-play/`, `/admission-info/`, `/id/sd/`, `/id/sd-kreativa-global/`, `/id/smp-kreativa-global/`, `/id/tk-kreativa-global/`, `/id/teachers-daily/`, `/id/parenting-feedback/`, `/id/kreativa-global-daily/`, `/id/7-habits-form/`.
Post: `/uncategorized/building-resilience-from-sports-competitiveness-towards-holistic-education/` (+ versi ID `/id/uncategorized-id/membangun-ketangguhan-dari-kompetisi-olahraga-menuju-pendidikan-holistik/`), `/blank/how-to-apply/`, `/course-catalog-content/course-catalog-1/`.

→ Rekomendasi: tidak dimigrasi, tetapi diberi redirect 301 (Bagian 8). Artikel "Building Resilience…" bisa menjadi artikel pertama di section **News** baru jika diinginkan.

---

## 8. Rekomendasi arsitektur versi baru

### 8.1 Stack (saran)
- **Next.js (App Router) + TypeScript + Tailwind CSS**, static export / ISR; i18n dengan segmen `/[locale]` (`en`, `id`; default `id` atau `en` sesuai keputusan sekolah).
- Konten di repo: `content/{en,id}/*.json` atau MDX; biaya & kontak di `content/shared/*.json`. Opsional nanti: headless CMS (Sanity/Strapi/Payload) bila staf ingin mengedit sendiri.
- Font Poppins via `next/font`. Ikon: lucide-react. Carousel: Embla. Accordion/Tabs: Radix UI.
- Form "Schedule a School Tour" → WhatsApp deep link dengan pesan terisi, atau form sederhana (nama, nomor WA, jenjang, tanggal) yang dikirim ke WA/email.

### 8.2 Struktur rute baru
```
/[locale]                         Home
/[locale]/about                   About (+ Facilities/Rencana Gedung, FAQ)
/[locale]/schools/kindergarten
/[locale]/schools/primary
/[locale]/schools/secondary
/[locale]/schools/high-school
/[locale]/schools/high-school/subjects            Subject Catalog (filter per track & semester)
/[locale]/schools/high-school/subjects/[slug]     Detail mata pelajaran
/[locale]/admission               Proses + biaya (tab per jenjang) + brosur
/[locale]/career                  Teacher Development Program
/[locale]/contact                 (baru) peta 3 kampus, jam, WA, email
```

### 8.3 Komponen
`TopBar`, `Header` (logo + Cambridge badge + mega menu + CTA), `LevelHero` (warna per jenjang), `StickySectionNav`, `QuranVerse`, `VisionMission`, `PeopleCard`/`FounderBoard`, `PrincipalMessage`, `EducationInitiative` (+ `PartnerLogos`, `SdgGrid`), `LearningObjectives`, `CharacterGrid` (7 karakter, 3 klaster), `CurriculumFramework` (diagram HTML), `EnglishLearningJourney`, `CurriculumPathwayTable`, `CreditTable`, `StudentLifeGrid`, `ClubGrid`, `SubjectCatalogTable`, `AdmissionTimeline`, `FeeTable` (multi-skema), `TestimonialCarousel`, `CtaBand`, `FaqAccordion`, `Footer`, `WhatsAppFloat`, `LanguageSwitcher` (memetakan ke halaman padanan, bukan ke home).

### 8.4 Model data (contoh)
```ts
type Level = 'kindergarten' | 'primary' | 'secondary' | 'high-school';
type FeeTable = {
  level: Level; academicYear: '2027/2028'; registrationFee: number;
  grades: { grade: string; annualProgramFee?: number; monthlyTuition?: number; annualTuition?: number }[];
  schemes?: { name: string; installments: { grade: string; amount: number }[] }[];
  includes: string[]; excludes: string[]; brochureUrl: string;
};
type Elective = { slug: string; title: string; track: 'Applied Science' | 'Business & Management' | 'Leadership & Social Science';
  semester: 1 | 2; credits: number | null; tagline?: string; objective: string; focus: string; outcomes: string[] };
```

### 8.5 Redirect map (301)
| Lama | Baru |
|---|---|
| `/about/` | `/en/about` |
| `/kindergarten/`, `/kindergarten-play/` | `/en/schools/kindergarten` |
| `/primary-school/`, `/primary/` | `/en/schools/primary` |
| `/secondary-school/`, `/secondary/` | `/en/schools/secondary` |
| `/high-school/`, `/junior-college/` | `/en/schools/high-school` |
| `/subject-catalog/`, `/academic/`, `/academic-experience/` | `/en/schools/high-school/subjects` |
| `/course-catalog/{slug}/` | `/en/schools/high-school/subjects/{slug}` |
| `/admission/`, `/admission-info/`, `/blank/how-to-apply/` | `/en/admission` |
| `/career/` | `/en/career` |
| `/faq/` | `/en/about#faq` |
| `/our-building/` | `/en/about#facilities` |
| `/id/beranda/`, `/id/beranda-lama/`, `/home/` | `/id` |
| `/id/tentang/`, `/id/tanya-jawab/` | `/id/about` |
| `/id/tk/`, `/id/tk-kreativa-global/` | `/id/schools/kindergarten` |
| `/id/sd/`, `/id/sd-kreativa-global/` | `/id/schools/primary` |
| `/id/smp/`, `/id/smp-kreativa-global/` | `/id/schools/secondary` |
| `/id/sma/` | `/id/schools/high-school` |
| `/id/registrasi/` | `/id/admission` |
| `/id/karir/` | `/id/career` |
| lainnya (`/sample-page/`, `/auto-draft/`, `/student-life*`, `/id/kehidupan-kampus/`, `/id/teachers-daily/`, dll.) | `/` atau 410 |

### 8.6 Non-fungsional
- Lighthouse ≥ 90 (mobile), gambar WebP/AVIF + lazy load, semua tabel sebagai HTML.
- SEO: meta per halaman (EN/ID), `hreflang`, sitemap.xml baru, schema.org `School`/`EducationalOrganization` + `FAQPage` + `Course` untuk subject catalog.
- Aksesibilitas: kontras warna, alt text, navigasi keyboard untuk menu & accordion.
- Analytics + event klik "Enroll Now", "Schedule a Tour", "Download Brochure", WhatsApp.

---

## 9. Starter untuk Claude Code

### 9.1 `CLAUDE.md` (contoh)
```md
# Kreativa Global School website v2
- Spesifikasi lengkap: docs/SPEC.md (konten, sitemap, biaya, redirect, isu yang harus diperbaiki).
- Stack: Next.js App Router + TypeScript + Tailwind, i18n /en dan /id.
- Semua teks halaman diambil dari content/{en,id}/*.json — jangan hardcode copy di komponen.
- Data biaya & kontak hanya di content/shared/fees.json dan content/shared/contact.json.
- Tabel/diagram yang dulu berupa gambar WAJIB dibuat ulang sebagai HTML.
- Palet: primary #3B358D, accent #EA3B5F, navy #1E2A5E, surface #F5F6FB. Font Poppins.
- Ikuti checklist docs/SPEC.md Bagian 6 sebelum menyatakan halaman selesai.
```

### 9.2 Prompt awal (tempel ke Claude Code)
```
Baca docs/SPEC.md. Lalu:
1) Scaffold Next.js (App Router, TS, Tailwind) dengan i18n /en dan /id serta layout Header/Footer/WhatsAppFloat sesuai Bagian 2 & 8.3.
2) Ekstrak semua konten Bagian 3–4 dan Lampiran A ke content/{en,id}/*.json dan content/shared/*.json
   (untuk teks ID yang belum ada, tandai "TODO_TRANSLATE" — jangan mengarang).
3) Bangun halaman berurutan: Home → About → 4 halaman jenjang → Subject Catalog + detail → Admission → Career.
4) Terapkan redirect di next.config sesuai tabel 8.5.
5) Jalankan build & lint, lalu laporkan item checklist Bagian 6 yang sudah/belum tertangani.
```

---

## Lampiran A — Isi lengkap 55 mata pelajaran pilihan (High School / Junior College)

Format: **Judul** (`slug`) — *Objective* · *Focus* · Outcomes. Slug = path `/course-catalog/{slug}/` di situs lama.

### A.1 Applied Science

**Scientific Thinking & Research Method** (`scientific-thinking-research-method`)
- *Objective:* This subject empowers students to think like scientists — curious, logical, and evidence-based. It builds a foundation for inquiry and discovery by introducing the principles of scientific reasoning, research methodology, and experimental design. Students learn how scientific knowledge is created, tested, and applied in real-world contexts.
- *Focus:* Students explore how scientific thinking extends beyond laboratories — influencing social policy, business innovation, and everyday problem-solving. They practice designing experiments, analyzing data, and forming hypotheses rooted in observation and logic.
- Outcomes: Understanding the nature and philosophy of science · Steps of the scientific method: questioning, hypothesis, experimentation, analysis · Quantitative and qualitative research methods · Data organization, analysis, and interpretation · Research ethics and integrity · Writing and presenting research findings.

**The Science and Implications of Generative AI** (`the-science-and-implications-of-generative-ai`)
- *Objective:* This subject introduces students to the world of Artificial Intelligence, focusing on the science behind generative models that can produce text, images, and data. Students will understand how AI systems learn and what ethical implications come with their power to shape creativity, communication, and society.
- *Focus:* Learners examine how generative AI models operate, their applications in various fields, and the responsibilities humans hold in using and regulating them.
- Outcomes: Fundamentals of AI and neural networks · Data training and generative modeling · AI applications in science, education, medicine, and art · Ethical and societal issues: bias, privacy, and misinformation · Simulation activities and case studies in applied AI.

**Earth & Environmental Science** (`earth-environmental-science`)
- *Objective:* Students gain an understanding of how Earth's systems function and interact — atmosphere, hydrosphere, geosphere, and biosphere — and how human activity affects them. The subject nurtures environmental literacy and responsibility.
- *Focus:* Learners develop the ability to analyze global environmental challenges and propose sustainable solutions grounded in science and ethics.
- Outcomes: Earth's natural systems and ecological interdependence · Environmental change, pollution, and conservation · Renewable energy and sustainable development · Climate science and global warming analysis · Local and international case studies · Field observation and environmental data collection.

**Applied Biology: Human Systems & Health** (`applied-biology-human-systems-health`)
- *Objective:* This subject explores the human body from a biological and health perspective. It builds understanding of human anatomy, physiology, and genetics while connecting them to real-world applications in medicine and wellness.
- *Focus:* Students analyze how biological systems maintain balance and how disruptions lead to disease. The subject encourages healthy living, empathy in healthcare, and an appreciation of biotechnology's role in human advancement.
- Outcomes: Human organ systems and body regulation · Genetics, heredity, and cellular function · Diseases, immunity, and global health issues · Nutrition, mental health, and preventive medicine · Introduction to medical biotechnology.

**Physics of Everyday Life** (`physics-of-everyday-life`)
- *Objective:* Students explore the physical laws that govern daily life — from gravity and motion to sound, electricity, and energy.
- *Focus:* The subject emphasizes the relevance of physics in modern technology and environmental design. Students learn to connect equations to everyday phenomena, making physics both visual and practical.
- Outcomes: Fundamental laws of motion and energy · Light, sound, and electromagnetism · Renewable energy and real-world applications · Simple experiments and problem-based projects · How physics influences transportation, devices, and architecture.

**Chemistry in Medicine & Materials** (`chemistry-in-medicine-materials`)
- *Objective:* To connect chemistry with real-life innovation in healthcare, medicine, and sustainable materials. Students explore how molecular structures influence properties and design breakthroughs that improve human life.
- *Focus:* Learners study the relationship between chemistry, biology, and engineering — from drug development to biomaterials and nanotechnology.
- Outcomes: Chemical bonding and molecular structure · Biochemical applications in medicine · Synthesis of materials and nanotechnology · Environmental and industrial chemistry · Lab-based simulations and chemical modeling.

**Introduction to Engineering & Design Principles** (`introduction-to-engineering-design-principles`)
- *Objective:* This subject introduces engineering as a creative and problem-solving discipline. Students learn to apply physics, mathematics, and design thinking to create practical solutions for real-world challenges.
- *Focus:* Combining innovation with analytical thinking, learners explore how engineers design systems, build prototypes, and improve efficiency in industries and communities.
- Outcomes: Engineering branches: civil, mechanical, electrical, and environmental · The design process: define, ideate, prototype, test · Systems and process optimization · Engineering ethics and sustainability · Hands-on projects and collaborative challenges.

**Introduction to Applied Statistics & Data Visualization** (`introduction-to-applied-statistics-data-visualization`)
- *Objective:* Students learn to interpret and communicate data effectively — a crucial skill across science, business, and technology.
- *Focus:* This subject emphasizes how numbers tell stories. Learners build skills in data collection, statistical reasoning, and visualization to make informed, data-driven conclusions.
- Outcomes: Fundamentals of descriptive and inferential statistics · Data organization, sampling, and reliability · Correlation, probability, and hypothesis testing · Data visualization tools (Excel, Python, Tableau) · Communicating findings through visuals and reports.

**Biotechnology & Society** (`biotechnology-society`)
- *Objective:* Students investigate how biotechnology is transforming the world through advances in medicine, agriculture, and environmental management.
- *Focus:* The subject blends science, innovation, and ethics — encouraging critical thinking about both the power and responsibility of modern biotech.
- Outcomes: DNA, genetic engineering, and CRISPR technology · Biotechnology in food and agriculture · Biopharmaceuticals and medical innovation · Bioethics and sustainability debates · Real-world biotechnology research case studies.

**Advanced Data Science & Predictive Analytics** (`advanced-data-science-predictive-analytics`)
- *Objective:* This subject equips students with modern computational skills for analyzing large datasets and predicting outcomes. It serves as a bridge between mathematics, computer science, and social applications.
- *Focus:* Learners explore how data shapes decision-making, policy design, and business strategy through hands-on modeling and interpretation.
- Outcomes: Data analysis and machine learning foundations · Predictive modeling and pattern recognition · Forecasting, regression, and classification methods · Data ethics, bias, and digital responsibility · Capstone data project based on real datasets.

**Mathematics for Economics & Decision Making** (`mathematics-for-economics-decision-making`)
- *Objective:* This subject links mathematical logic with economic reasoning, enabling students to understand how data and formulas influence markets and choices.
- *Focus:* Students apply mathematics to model real-world problems in business, finance, and social systems. They develop quantitative insight and decision-making confidence.
- Outcomes: Algebra, calculus, and optimization principles · Probability, statistics, and game theory · Economic modeling and simulation · Behavioral economics and risk analysis · Mathematical projects in real-world decision contexts.

**Scientific Research & Academic Writing** (`scientific-research-academic-writing`)
- *Objective:* This subject guides students through the complete process of scientific research — from inquiry to publication. It strengthens analytical thinking, methodology, and formal communication.
- *Focus:* Students conduct small-scale research projects while learning to structure academic writing, analyze data, and present findings effectively.
- Outcomes: Research design and data methodology · Academic writing structure and referencing · Quantitative and qualitative analysis · Presentation and peer review process · Publishing and ethics in academic work.

**Sustainable Energy Systems** (`sustainable-energy-systems`)
- *Objective:* Students explore the science and innovation behind renewable energy systems, aiming to understand how clean technology supports global sustainability.
- *Focus:* The subject emphasizes interdisciplinary learning, integrating physics, chemistry, and environmental science to solve energy-related challenges.
- Outcomes: Energy sources and global demand · Solar, wind, and hydropower technologies · Battery storage and efficiency systems · Climate change and energy policy · Design project: building a small-scale renewable prototype.

**Global Health & Epidemiology** (`global-health-epidemiology`)
- *Objective:* This subject studies how science informs public health systems, disease control, and global wellness. Students explore the relationships between biology, environment, and society.
- *Focus:* Learners use data and case studies to understand how diseases spread, how health policies are formed, and how scientific innovation can improve lives worldwide.
- Outcomes: Epidemiology and health data systems · Infectious and chronic diseases · Public health and global health infrastructure · Research in disease prevention and vaccination · Designing community-based health awareness projects.

### A.2 Business & Management

**Introduction to Budgeting and Financial Management** (`introduction-to-budgeting-and-financial-management`)
- *Objective:* To equip students with essential financial planning and resource management skills used by organizations and individuals alike. Students will learn how money moves within a business — from income and expense forecasting to investment and risk planning.
- *Focus:* This subject introduces financial management as the language of business. Students gain practical experience in budgeting, interpreting financial statements, and making strategic financial decisions that sustain growth.
- Outcomes: Fundamentals of budgeting and financial planning · Cash flow management and cost control · Reading and analyzing financial reports · Capital allocation and funding sources · Strategic budgeting and forecasting models.

**Operations & Business Process Management** (`operations-business-process-management`)
- *Objective:* To help students understand how organizations deliver products and services efficiently through process design and continuous improvement.
- *Focus:* Students explore the science of operations — where business strategy meets execution. They will learn to design workflows, measure performance, and optimize processes using real-world business cases.
- Outcomes: Introduction to operations and supply chain management · Process mapping and system design · Lean management and Six Sigma principles · Quality control and efficiency strategies · Case study: optimizing a service or product process.

**Performance Leadership** (`performance-leadership`)
- *Objective:* To develop the mindset and skill set of a performance-oriented leader who motivates teams and drives results.
- *Focus:* Students will analyze leadership theories, feedback models, and performance metrics that sustain excellence. This subject integrates behavioral science with management principles.
- Outcomes: Understanding leadership styles and motivation · Goal setting and accountability systems · Coaching and feedback for improvement · Performance metrics and productivity analysis · Leadership simulation and self-assessment.

**Entrepreneurship and Innovation in the Private and Social Sectors** (`entrepreneurship-and-innovation-in-the-private-and-social-sectors`)
- *Objective:* To inspire students to create ventures that address both profit and purpose. The subject introduces entrepreneurship as a catalyst for innovation and positive social change.
- *Focus:* Students will learn how to identify opportunities, design solutions, and build sustainable organizations in both commercial and nonprofit contexts.
- Outcomes: Entrepreneurial mindset and opportunity recognition · Start-up planning and feasibility analysis · Innovation in business and social enterprise · Pitching ideas and attracting investment · Case studies: successful social innovators.

**Microeconomics for Modern Society** (`microeconomics-for-modern-society`)
- *Objective:* To introduce students to the fundamentals of microeconomics and how individuals, households, and firms make decisions in the real economy.
- *Focus:* Students will explore concepts like supply and demand, consumer choice, and market efficiency while connecting theory to real-world business challenges.
- Outcomes: Scarcity, choice, and opportunity cost · Demand, supply, and price mechanisms · Market equilibrium and elasticity · Consumer and producer behavior · Market structures: competition, monopoly, and regulation.

**Financial Accounting for Beginners** (`financial-accounting-for-beginners`)
- *Objective:* To provide students with a strong foundation in accounting principles and financial reporting.
- *Focus:* Students learn how to record, summarize, and interpret financial transactions that reflect an organization's performance.
- Outcomes: Accounting concepts and the accounting cycle · Preparing balance sheets and income statements · Double-entry bookkeeping · Understanding financial ratios and statements · Practical exercises and case analysis.

**Behavioral Economics** (`behavioral-economics`)
- *Objective:* To explore how psychology shapes economic decisions. This subject reveals why people sometimes make irrational choices — and how understanding behavior can improve policy and business design.
- *Focus:* Students combine insights from economics and psychology to understand consumer decisions, biases, and motivation.
- Outcomes: Cognitive biases and heuristics · Decision-making under uncertainty · Behavioral finance and marketing · Nudging and incentive design · Experiments in behavioral research.

**Financial Literacy & Personal Investing** (`financial-literacy-personal-investing`)
- *Objective:* To prepare students for real-world financial independence. Students learn how to manage money, understand investments, and plan for the future.
- *Focus:* Emphasis is placed on practical personal finance, investment strategies, and responsible economic behavior.
- Outcomes: Budgeting and personal financial planning · Saving, credit, and debt management · Stocks, bonds, and mutual funds · Risk, diversification, and investment ethics · Personal investment simulation project.

**Start-up Incubator Project** (`start-up-incubator-project`)
- *Objective:* To transform ideas into ventures. Students experience the full entrepreneurial journey from concept to launch.
- *Focus:* This project-based subject emphasizes innovation, teamwork, and real-world execution — culminating in a start-up pitch.
- Outcomes: Ideation and problem identification · Business model canvas and prototype development · Branding, marketing, and finance · Mentorship and pitch competition · Reflection and business evaluation.

**Marketing & Consumer Psychology** (`marketing-consumer-psychology`)
- *Objective:* To understand how consumers think, feel, and make decisions — and how marketers use psychology to influence them.
- *Focus:* Students bridge theory and practice in branding, market research, and advertising design.
- Outcomes: Marketing mix and consumer journey · Branding and positioning strategies · Digital and social media marketing · Market segmentation and behavior analysis · Psychological drivers of purchasing decisions.

**Design Thinking & Product Innovation** (`design-thinking-product-innovation`)
- *Objective:* To nurture creativity and human-centered innovation. Students learn to solve problems through empathy, experimentation, and iteration.
- *Focus:* Students design products and services that respond to real user needs using design thinking frameworks pioneered by leading global institutions.
- Outcomes: Principles of design thinking · Empathy mapping and problem framing · Ideation, prototyping, and user testing · Product design and innovation strategy · Portfolio project: design for impact.

**Business Analytics & Data-Driven Decisions** (`business-analytics-data-driven-decisions`)
- *Objective:* To develop analytical and data interpretation skills for modern business decision-making.
- *Focus:* Students learn to turn data into actionable insights using statistical tools and dashboards.
- Outcomes: Fundamentals of business analytics · Data visualization and storytelling · Predictive modeling and key metrics · Decision-making under uncertainty · Project: data-driven business proposal.

**Introduction to Global Trade & Development** (`introduction-to-global-trade-development`)
- *Objective:* To explore the global economy and the interconnectedness of nations through trade and development.
- *Focus:* Students learn how global trade shapes economies, influences policy, and affects inequality and sustainability.
- Outcomes: International trade theories and patterns · Globalization and emerging markets · Role of organizations (WTO, IMF, World Bank) · Sustainable development and SDGs · Case studies in trade policy and investment.

**Global Macroeconomics & Policy** (`global-macroeconomics-policy`)
- *Objective:* To understand large-scale economic forces and policies that shape global growth, inflation, and trade.
- *Focus:* Students apply macroeconomic theory to analyze government decisions and international economic challenges.
- Outcomes: National income, GDP, and growth models · Fiscal and monetary policy · Inflation, unemployment, and interest rates · International finance and exchange rates · Policy-making simulations and reports.

**Social Entrepreneurship & Innovation** (`social-entrepreneurship-innovation`)
- *Objective:* To empower students to create innovative solutions for social and environmental problems.
- *Focus:* Students combine entrepreneurial skills with empathy to design projects that create measurable social impact.
- Outcomes: Social enterprise models and strategies · Community needs analysis · Impact measurement and reporting · Funding, scaling, and partnerships · Launching a social impact project.

**Principles of Business & Strategic Management** (`principles-of-business-strategic-management`)
- *Objective:* To provide an overview of how businesses are structured, managed, and led strategically.
- *Focus:* Students learn how vision, planning, and leadership drive business success.
- Outcomes: Business organization and governance · SWOT and competitive analysis · Strategic planning and goal setting · Decision-making frameworks · Leadership in business environments.

**Innovation Economics & Future Markets** (`innovation-economics-future-markets`)
- *Objective:* To analyze how technology and innovation reshape economies and industries.
- *Focus:* Students investigate trends such as automation, digital transformation, and sustainability-driven markets.
- Outcomes: Economic growth and innovation cycles · Emerging industries and digital economies · Innovation ecosystems and policy · Future labor markets and AI economics · Research project on industry innovation.

**Business Ethics & Corporate Responsibility** (`business-ethics-corporate-responsibility`)
- *Objective:* To help students develop moral awareness and decision-making frameworks for ethical leadership.
- *Focus:* The subject explores how ethics influences corporate behavior, governance, and sustainability.
- Outcomes: Ethical theories and business dilemmas · Corporate social responsibility (CSR) · Environmental, Social, and Governance (ESG) · Stakeholder analysis and whistleblowing · Business case studies and debates.

**Digital Entrepreneurship & E-Commerce Strategy** (`digital-entrepreneurship-e-commerce-strategy`)
- *Objective:* To teach students how to build and manage digital businesses using online platforms, data, and marketing.
- *Focus:* Students combine entrepreneurial strategy with technology and user experience design.
- Outcomes: Digital business models and ecosystems · E-commerce management and logistics · Online marketing and analytics · Customer experience and UX design · Project: launching a digital store prototype.

**Introduction to Islamic Economics and Halal Industry** (`introduction-to-islamic-economics-and-halal-industry`)
- *Objective:* To introduce students to ethical finance and the rapidly growing global halal economy.
- *Focus:* Students examine how Islamic principles guide economic activity, trade, and investment with fairness and sustainability.
- Outcomes: Core principles of Islamic economics · Halal industry sectors: food, finance, tourism, and fashion · Zakat, waqf, and social justice in economics · Case studies of halal market trends · Ethics and inclusivity in global trade.

**Project Management & Agile Leadership** (`project-management-agile-leadership`)
- *Objective:* To prepare students to plan, execute, and manage projects effectively using modern agile methods.
- *Focus:* Students develop project management and teamwork skills using global frameworks like Scrum and Kanban.
- Outcomes: Project life cycle and planning tools · Risk management and communication · Agile principles and iterative design · Leadership in project teams · Project simulation and presentation.

**Hospitality and Service Operations** (`hospitality-and-service-operations`)
- *Objective:* To explore the global hospitality industry and the science behind service excellence.
- *Focus:* Students learn how operations, guest experience, and management intersect in hotels, tourism, and service businesses.
- Outcomes: Overview of hospitality and service industries · Service design and customer satisfaction · Event and facility management · Sustainable hospitality and tourism · Industry project or case simulation.

### A.3 Leadership & Social Science

**Strategy, Structure, and Leadership in Public Service Organizations** (`strategy-structure-and-leadership-in-public-service-organizations`)
- *Objective:* This subject prepares students to understand how leadership operates in public service, government, and nonprofit organizations. Students learn how structure, policy, and strategy shape decision-making in institutions that serve communities.
- *Focus:* The subject emphasizes the balance between mission-driven work and strategic management. Students examine real-world models from public agencies and international organizations to understand how leadership decisions affect outcomes and social impact.
- Outcomes: Fundamentals of organizational structure and management · Leadership styles in public and nonprofit sectors · Policy implementation and decision frameworks · Case studies in government, education, and health administration · Ethics, accountability, and innovation in public service.

**Getting Things Done: Management in a Development Context** (`getting-things-done-management-in-a-development-context`)
- *Objective:* This subject introduces students to the realities of managing projects and initiatives in developing contexts — where resources are limited, challenges are complex, and leadership requires creativity.
- *Focus:* Students learn how effective managers plan, coordinate, and evaluate social programs. The subject highlights how development management blends logistics, teamwork, and empathy.
- Outcomes: Fundamentals of project management in social development · Monitoring and evaluation frameworks · Stakeholder mapping and community engagement · Adaptive leadership and problem-solving under constraints · Field-based project simulation and reflection.

**Introduction to Negotiation Analysis** (`introduction-to-negotiation-analysis`)
- *Objective:* To equip students with the essential skills of negotiation and conflict resolution — skills that empower leaders to build consensus, manage disagreement, and achieve win-win outcomes.
- *Focus:* Students learn how psychology, communication, and strategy intersect in negotiation. Through simulations and real-life case studies, they analyze techniques used in diplomacy, business, and everyday interactions.
- Outcomes: Principles of negotiation and conflict dynamics · Interests vs. positions: creating mutual value · Persuasion, communication, and emotional intelligence · Cross-cultural negotiation and mediation · Practical workshops and role-playing exercises.

**Global Issues & UN Diplomacy (MUN)** (`global-issues-un-diplomacy-mun`) — tagline: "Speak for nations. Solve for humanity."
- *Objective:* This subject immerses students in global governance through the United Nations framework. It develops awareness of international relations, diplomacy, and policy-making.
- *Focus:* Students step into the shoes of diplomats, representing nations and negotiating solutions to pressing global issues. They learn to research, debate, and collaborate while understanding the complexities of world affairs.
- Outcomes: Introduction to the UN system and international law · Current global challenges (climate, poverty, conflict, migration) · Diplomatic writing and public speaking · MUN simulation and committee participation · Resolution drafting and international cooperation.

**Emotional Influences on Decision Making: Bias and Benefit** (`emotional-influences-on-decision-making-bias-and-benefit`)
- *Objective:* To explore how emotions and biases influence human choices — in leadership, politics, marketing, and daily life.
- *Focus:* Students analyze how emotions drive judgment and learn strategies for self-awareness and better decision-making. The subject combines insights from psychology, neuroscience, and behavioral economics.
- Outcomes: Emotional intelligence and decision psychology · Cognitive biases and rational choice theory · The role of intuition in leadership · Managing emotions in negotiations and teamwork · Reflective practices and emotional regulation exercises.

**Leadership and Personal Branding** (`leadership-and-personal-branding`)
- *Objective:* To help students discover their leadership identity and learn how to communicate their strengths authentically and confidently.
- *Focus:* Students reflect on who they are, what they stand for, and how they want to be perceived in academic, social, and professional contexts.
- Outcomes: Foundations of personal leadership · Building self-awareness and confidence · Crafting a personal vision and digital identity · Communication and storytelling for influence · Creating a leadership portfolio and presentation.

**Philanthropy and Public Problem-Solving** (`philanthropy-and-public-problem-solving`)
- *Objective:* To introduce students to philanthropy as a force for social innovation and civic responsibility.
- *Focus:* Students learn how charitable organizations, social entrepreneurs, and private donors collaborate to address complex public problems.
- Outcomes: History and philosophy of philanthropy · Designing effective giving and impact initiatives · Partnerships between government, business, and civil society · Evaluating social impact and sustainability · Real-world case studies and proposal development.

**Creative Writing & Journalism** (`creative-writing-journalism`)
- *Objective:* To help students master the art of storytelling — crafting narratives that inform, inspire, and challenge society.
- *Focus:* Students explore the power of the written word across genres such as journalism, creative nonfiction, and opinion writing.
- Outcomes: Writing fundamentals and story structure · Journalism ethics and investigative techniques · Opinion pieces, editorials, and feature writing · Creative writing forms: poetry, fiction, essay · Student publication or digital magazine project.

**Introduction to Psychology** (`introduction-to-psychology`)
- *Objective:* To introduce students to the scientific study of the mind and behavior.
- *Focus:* Students gain insight into cognitive, emotional, and social processes that shape human life. The subject bridges everyday experience with academic psychology.
- Outcomes: Major psychological perspectives and theorists · Perception, learning, memory, and motivation · Personality and emotional development · Mental health and human well-being · Experimental methods in psychology.

**Art, Design, and Identity** (`art-design-and-identity`)
- *Objective:* To explore how art and design shape cultural identity and self-expression.
- *Focus:* Students analyze visual language, symbolism, and aesthetics through historical and contemporary perspectives.
- Outcomes: Art movements and cultural narratives · Visual communication and design principles · Art as social commentary and activism · Personal portfolio and creative exhibition · Field trips to galleries or artist studios.

**Psychology for Learning and Well-being** (`psychology-for-learning-and-well-being`)
- *Objective:* To help students understand how psychological principles enhance learning, resilience, and personal growth.
- *Focus:* Students explore motivation, stress management, and emotional regulation as part of lifelong learning.
- Outcomes: The science of learning and memory · Motivation and mindset theory · Coping strategies and positive psychology · Self-reflection and goal setting · Wellness-based study habits.

**Film, Media, and Society** (`film-media-and-society`)
- *Objective:* To analyze how media and film influence culture, identity, and social change.
- *Focus:* Students critically engage with visual storytelling and its power to reflect — and reshape — the world around them.
- Outcomes: Media theory and film language · Representation and cultural narratives · Media influence on behavior and politics · Filmmaking and digital production basics · Film analysis and review writing.

**Sociology & Culture in Modern Society** (`sociology-culture-in-modern-society`)
- *Objective:* To provide an understanding of how societies function and evolve through institutions, culture, and social interaction.
- *Focus:* Students analyze social behavior, inequality, and global issues through the lens of sociology.
- Outcomes: Foundations of sociology and social structure · Culture, identity, and norms · Inequality, power, and globalization · Social change and modernity · Research on local and global communities.

**Creative Writing & Storytelling for Change** (`creative-writing-storytelling-for-change`)
- *Objective:* To train students to use creative writing as a vehicle for advocacy and empathy.
- *Focus:* Students write stories that give voice to social issues and human experiences.
- Outcomes: Narrative techniques and emotional storytelling · Writing for advocacy and awareness · Character and dialogue development · Publishing and performing written works · Final project: story collection or digital campaign.

**Media Literacy & Digital Society** (`media-literacy-digital-society`)
- *Objective:* To teach students how to navigate, analyze, and create responsibly in the digital age.
- *Focus:* Students learn to evaluate online content, recognize bias, and understand the impact of media on democracy and culture.
- Outcomes: Critical analysis of media messages · Social media and identity · Misinformation and digital ethics · Media production and content creation · Digital citizenship and online safety.

**Psychology of Leadership & Influence** (`psychology-of-leadership-influence`)
- *Objective:* To explore how psychological principles shape leadership, persuasion, and human motivation.
- *Focus:* Students study how great leaders inspire trust, influence decisions, and drive change using emotional intelligence and social insight.
- Outcomes: Motivation and behavior theories · Emotional intelligence and interpersonal dynamics · Persuasion, power, and influence · Leadership communication and decision-making · Leadership personality assessment.

**International Relations & Global Diplomacy** (`international-relations-global-diplomacy`)
- *Objective:* To build understanding of how countries interact, cooperate, and compete on the global stage.
- *Focus:* Students explore foreign policy, international conflict, and diplomacy through both theoretical and practical lenses.
- Outcomes: Theories of international relations · Diplomacy and conflict resolution · Global institutions and governance · International security and development · Crisis simulation and model diplomacy exercise.

**Cultural Studies: Identity, Gender & Power** (`cultural-studies-identity-gender-power`)
- *Objective:* To explore how culture, identity, and social structures shape our understanding of gender, race, and power in society.
- *Focus:* Students critically examine representations in media, politics, and daily life to build awareness and empathy across differences.
- Outcomes: Theories of culture, identity, and intersectionality · Gender and media representation · Global perspectives on diversity and inclusion · Debates on equality and empowerment · Reflection projects and social analysis essays.

**Islamic Civilization History** (`islamic-civilization-history`)
- *Objective:* To explore the rise, contributions, and enduring influence of Islamic civilization across centuries.
- *Focus:* Students study how Islamic history shaped world knowledge, culture, and ethics — from science and philosophy to art and governance.
- Outcomes: The origins and spread of Islamic civilization · Contributions in science, art, and architecture · Key dynasties and cultural exchange · Values of justice, knowledge, and community · Contemporary relevance and interfaith dialogue.

---
*Akhir dokumen.*
