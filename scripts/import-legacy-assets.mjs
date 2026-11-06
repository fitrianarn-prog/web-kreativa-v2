// Mengimpor aset dari situs WordPress lama (kreativaglobal.sch.id) ke public/.
//
// Pemakaian:
//   node scripts/import-legacy-assets.mjs [folder-sumber]
// Default folder sumber: .legacy-assets/raw (struktur sama dengan wp-content/uploads/YYYY/MM/...).
//
// Foto dikonversi ke WebP (lebar maksimum per entri), logo & ikon tetap PNG (transparansi),
// PDF & video disalin apa adanya. Nama file dirapikan agar deskriptif.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(process.argv[2] ?? ".legacy-assets/raw");
const PUBLIC = path.resolve("public");

/** [sumber relatif uploads, tujuan relatif public, opsi] */
const MAP = [
  // --- Brand ---
  ["2026/03/logo-KGS-normal.png", "images/brand/logo-kreativa-cambridge.png", { png: true }],
  ["2026/01/Kreativa-Cambridge-05-scaled.png", "images/brand/logo-kreativa-cambridge-white.png", { png: true, width: 1200 }],
  ["2024/01/cropped-LOGO-kgs-copy.png", "images/brand/logo-kreativa-stacked.png", { png: true }],
  ["2024/01/LOGO-kgs-combine-e1760061746936.png", "images/brand/logo-kreativa-shield.png", { png: true, width: 512 }],
  ["2026/02/cambridge-logo.png", "images/brand/cambridge-international-school.png", { png: true }],
  ["2025/11/logo-kreativa-and-etc-part-of-14.png", "images/brand/partners-strip.png", { png: true }],
  ["2024/04/icon-blue-01-e1713425062646.png", "images/brand/element-lifelong-learning.png", { png: true }],
  ["2024/04/icon-blue-02-e1713425126772.png", "images/brand/element-be-a-star.png", { png: true }],
  ["2024/04/icon-blue-03-e1713425151107.png", "images/brand/element-critical-thinking.png", { png: true }],
  ["2024/04/icon-blue-04-e1713425177263.png", "images/brand/element-future-leader.png", { png: true }],
  ["2024/04/icon-blue-05-e1713425095357.png", "images/brand/element-resilience.png", { png: true }],

  // --- Home ---
  ["2025/11/kreativa-video-bg.mp4", "videos/home-hero.mp4", { copy: true }],
  ["2025/11/spmb-kreativa-potrait-e1763371665663.jpg", "images/home/students-campus.webp", {}],
  ["2025/11/capstone.jpg", "images/home/program-capstone.webp", {}],
  ["2025/11/intership.jpg", "images/home/program-internship.webp", {}],
  ["2025/11/mun.jpg", "images/home/program-clubs.webp", {}],

  // --- People ---
  ["2025/11/Screenshot-2025-11-14-at-15.37.36.png", "images/people/syauqi-robbani.webp", {}],
  ["2025/11/Screenshot-2025-11-14-at-15.40.29.png", "images/people/yorga-permana.webp", {}],
  ["2026/02/syauqii-e1771727728942.png", "images/people/syauqi-robbani-alma-mater.webp", {}],
  ["2026/02/yorgaa-e1771727692815.png", "images/people/yorga-permana-alma-mater.webp", {}],
  ["2025/10/syauqiyor-e1761892997557.png", "images/people/founder-board-graduation.webp", {}],
  ["2026/10/nurhayati.jpg", "images/people/nurhayati.webp", { width: 900 }],
  ...["Hanif", "Braja", "Irma", "Yola", "Aya", "Desi", "Dini", "Mega", "Faura", "Iqbal", "Azka"].map((n) => [
    `2025/08/${n === "Hanif" || n === "Braja" || n === "Iqbal" ? "Mr" : "Ms"}-${n}.png`,
    `images/people/teachers/${n.toLowerCase()}.webp`,
    { width: 600 },
  ]),

  // --- About & campus ---
  ["2025/11/Sayuqi-video.jpg", "images/about/founder-video-poster.webp", {}],
  ["2025/11/kreativa-global-shadow.png", "images/about/building-render.webp", {}],
  ["2025/08/krativa-global-building-new.jpeg", "images/campus/building.webp", {}],
  ["2025/08/gedung-kreativa-1-scaled.jpg", "images/campus/building-front.webp", { width: 1920 }],
  ["2025/11/kreativa-teachers-day.jpeg-scaled.jpg", "images/campus/school-community.webp", { width: 1920 }],
  ["2025/11/vision-lands.png", "images/campus/vision-landscape.webp", {}],
  ["2025/11/mission-lands.png", "images/campus/mission-landscape.webp", {}],
  ["2026/10/visi-primary.jpg", "images/campus/vision-primary.webp", {}],
  ["2026/10/Misi-1.jpg", "images/campus/mission-primary.webp", {}],

  // --- Facilities (render gedung) ---
  ["2025/08/25_LOBBY.png", "images/facilities/lobby.webp", { width: 1920 }],
  ["2025/08/151__LAB-STEM.png", "images/facilities/stem-lab.webp", { width: 1920 }],
  ["2025/08/132_R-KONSUL-SISWA.png", "images/facilities/counseling-room.webp", { width: 1920 }],
  ["2025/08/185_TOILET-PR.png", "images/facilities/restroom.webp", { width: 1920 }],
  ["2025/08/38_KELAS-TK-B.png", "images/facilities/kindergarten-b-classroom.webp", { width: 1920 }],
  ["2025/08/173_RSG.png", "images/facilities/multipurpose-hall.webp", { width: 1920 }],
  ["2025/08/129_LAB-BAHASA.png", "images/facilities/language-lab.webp", { width: 1920 }],
  ["2025/08/45_OUTDOOR-TK.png", "images/facilities/kindergarten-outdoor.webp", { width: 1920 }],
  ["2025/08/35_KELAS-TK-A.png", "images/facilities/kindergarten-a-classroom.webp", { width: 1920 }],
  ["2025/08/122_PERPUS.png", "images/facilities/library.webp", { width: 1920 }],
  ["2025/08/80_KREATIVAMART.png", "images/facilities/kreativamart.webp", { width: 1920 }],
  ["2025/08/190_LAPANGAN4_1.png", "images/facilities/sports-field.webp", { width: 1920 }],

  // --- Kindergarten ---
  ["2025/08/Kindergarten-c.jpg", "images/kindergarten/slide-1.webp", {}],
  ["2025/08/Kindergarten-d.jpg", "images/kindergarten/slide-2.webp", {}],
  ["2025/08/Kindergarten-e.jpg", "images/kindergarten/slide-3.webp", {}],
  ["2025/08/Kindergarten-f.jpg", "images/kindergarten/slide-4.webp", {}],
  ["2024/12/kindergarten-A-Holistic-Approach.jpg", "images/kindergarten/holistic-approach.webp", {}],
  ["2024/12/kegiatan-harian.jpeg", "images/kindergarten/daily-activities.webp", {}],

  // --- Primary ---
  ["2025/08/primary-a.jpg", "images/primary/classroom-1.webp", {}],
  ["2025/08/primary-d.jpg", "images/primary/classroom-2.webp", {}],
  // cropBottom: buang pita teks yang tertanam di gambar (judul kini dirender sebagai HTML).
  ...["03", "05", "09", "11", "13"].map((n, i) => [`2025/11/brosur_${n}.jpg`, `images/primary/student-life-${i + 1}.webp`, { cropBottom: 0.34 }]),
  ...["03", "05", "07", "09", "11", "18", "19", "20", "21", "22"].map((n, i) => [`2025/11/club-5_${n}.jpg`, `images/primary/club-${i + 1}.webp`, { cropBottom: 0.25 }]),

  // --- Secondary & High School ---
  ["2025/11/WhatsApp-Image-2025-10-30-at-18.41.49-1.jpeg", "images/secondary/student-life-1.webp", {}],
  ["2025/11/WhatsApp-Image-2025-10-30-at-18.50.06-1.jpeg", "images/secondary/student-life-2.webp", {}],
  ["2025/11/WhatsApp-Image-2025-10-30-at-18.56.44.jpeg", "images/secondary/student-life-3.webp", {}],
  ["2025/11/e98be12b-6481-43cd-95be-33eba5a0e4cb-1.jpg", "images/secondary/student-life-4.webp", {}],
  ["2025/11/dl.beatsnoop.com-3000-98vA026J7X-1.jpg", "images/high-school/internship.webp", { width: 1600 }],
  ["2025/11/idea.png", "images/clubs/innovation-lab.png", { png: true, width: 256 }],
  ["2025/11/entrepreneurship.png", "images/clubs/young-entrepreneurs.png", { png: true, width: 256 }],
  ["2025/11/debate.png", "images/clubs/debate-mun.png", { png: true, width: 256 }],
  ["2025/11/extracurricular-activities.png", "images/clubs/creative-arts.png", { png: true, width: 256 }],
  ["2025/11/languange.png", "images/clubs/languages-culture.png", { png: true, width: 256 }],
  ["2025/11/group.png", "images/clubs/organization.png", { png: true, width: 256 }],

  // --- Admission & Career ---
  ["2024/02/online-university-21.jpg", "images/career/hero.webp", {}],
  ...["20", "21", "22", "23", "25"].map((n, i) => [
    `2026/10/WhatsApp-Image-2026-10-14-at-09.53.${n}.jpg`,
    `images/career/poster-${i + 1}.webp`,
    { width: 1200 },
  ]),

  // --- Brosur 2027/2028 (nama .pdf.pdf diperbaiki) ---
  ["2026/09/01-Brosur-Kreativa-Global-Kindergarten-2027-2028.pdf.pdf", "brochures/kreativa-global-kindergarten-2027-2028.pdf", { copy: true }],
  ["2026/09/02-Brosur-Kreativa-Global-Primary-School-2027-2028.pdf", "brochures/kreativa-global-primary-school-2027-2028.pdf", { copy: true }],
  ["2026/09/03-Brosur-Kreativa-Global-Secondary-School-2027-2028.pdf", "brochures/kreativa-global-secondary-school-2027-2028.pdf", { copy: true }],
  ["2026/09/04-Brosur-Kreativa-Global-High-School-2027-2028.pdf", "brochures/kreativa-global-high-school-2027-2028.pdf", { copy: true }],
];

const DEFAULT_WIDTH = 1600;
let done = 0;
const missing = [];

for (const [src, dest, opt] of MAP) {
  const from = path.join(SRC, src);
  const to = path.join(PUBLIC, dest);
  if (!fs.existsSync(from)) {
    missing.push(src);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (opt.copy) {
    fs.copyFileSync(from, to);
  } else {
    let img = sharp(from).rotate().resize({ width: opt.width ?? DEFAULT_WIDTH, withoutEnlargement: true });
    if (opt.cropBottom) {
      // Dua tahap: resize dulu, baru potong (sharp menjalankan extract sebelum resize dalam satu pipeline).
      const { data, info } = await img.toBuffer({ resolveWithObject: true });
      img = sharp(data).extract({ left: 0, top: 0, width: info.width, height: Math.round(info.height * (1 - opt.cropBottom)) });
    }
    img = opt.png ? img.png({ compressionLevel: 9, palette: false }) : img.webp({ quality: 78 });
    await img.toFile(to);
  }
  done++;
}

console.log(`Selesai: ${done} aset ditulis ke public/.`);
if (missing.length) {
  console.warn(`Tidak ditemukan (${missing.length}):\n  ${missing.join("\n  ")}`);
  process.exitCode = 1;
}
