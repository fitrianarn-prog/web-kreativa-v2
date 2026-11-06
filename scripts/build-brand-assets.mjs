// Membuat aset turunan dari logo & foto yang sudah diimpor:
//   src/app/icon.png, src/app/apple-icon.png (shield logo), public/images/og/default.jpg (1200x630)
// Jalankan setelah scripts/import-legacy-assets.mjs:  node scripts/build-brand-assets.mjs
import fs from "node:fs";
import sharp from "sharp";

const SHIELD_SRC = ".legacy-assets/raw/2024/01/LOGO-kgs-combine-e1760061746936.png";

// Shield saja (bagian atas file logo; teks putih di bawahnya tidak terlihat di latar terang).
// (dua tahap: dalam satu pipeline sharp menjalankan trim sebelum extract)
const top = await sharp(SHIELD_SRC).extract({ left: 0, top: 0, width: 1522, height: 1040 }).png().toBuffer();
const shield = await sharp(top).trim().png().toBuffer();

async function square(size, background) {
  const inner = Math.round(size * 0.84);
  const logo = await sharp(shield).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: logo, gravity: "center" }])
    .png();
}

await (await square(512, { r: 0, g: 0, b: 0, alpha: 0 })).toFile("src/app/icon.png");
await (await square(180, { r: 255, g: 255, b: 255, alpha: 1 })).toFile("src/app/apple-icon.png");

// Open Graph default: foto komunitas sekolah + gradasi brand + logo putih.
fs.mkdirSync("public/images/og", { recursive: true });
const W = 1200;
const H = 630;
const gradient = Buffer.from(
  `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0.2" stop-color="#1b1844" stop-opacity="0"/><stop offset="0.62" stop-color="#1b1844" stop-opacity="0.82"/><stop offset="1" stop-color="#1b1844" stop-opacity="0.96"/>
  </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
);
const logo = await sharp("public/images/brand/logo-kreativa-cambridge-white.png").resize({ width: 520 }).toBuffer();
await sharp("public/images/campus/school-community.webp")
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([
    { input: gradient, top: 0, left: 0 },
    { input: logo, left: 56, top: H - 56 - Math.round((520 * 466) / 1200) },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/images/og/default.jpg");

console.log("OK: src/app/icon.png, src/app/apple-icon.png, public/images/og/default.jpg");

// Poster video hero Beranda (tampil sebelum video dimuat, atau sebagai pengganti saat reduced motion).
// Tertutup gradien ungu → 1280 px & kualitas 60 cukup (elemen LCP Beranda, jadi dibuat ringan).
await sharp("public/images/campus/school-community.webp")
  .resize(1280, 720, { fit: "cover" })
  .webp({ quality: 60 })
  .toFile("public/images/home/hero-poster.webp");
console.log("OK: public/images/home/hero-poster.webp");
