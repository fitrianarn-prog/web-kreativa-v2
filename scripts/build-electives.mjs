// Membangun src/content/shared/electives.json dari docs/SPEC.md
// (tabel Bagian 3.7 untuk semester & kredit, Lampiran A untuk isi tiap mata pelajaran).
// Jalankan ulang bila SPEC.md diperbarui:  node scripts/build-electives.mjs
import fs from "node:fs";

const spec = fs.readFileSync("docs/SPEC.md", "utf8").replace(/\r\n/g, "\n");

const TRACKS = [
  { id: "applied-science", heading: "Applied Science" },
  { id: "business-management", heading: "Business & Management" },
  { id: "leadership-social-science", heading: "Leadership & Social Science" },
];

// --- 1. Tabel semester/kredit di Bagian 3.7 ---
const catalog = spec.slice(spec.indexOf("### 3.7"), spec.indexOf("### 3.8"));
const meta = new Map();
for (const track of TRACKS) {
  const start = catalog.indexOf(`**${track.heading} (`);
  const end = catalog.indexOf("\n\n**", start + 5);
  const block = catalog.slice(start, end === -1 ? undefined : end);
  for (const line of block.split("\n")) {
    const m = line.match(/^\|\s*(.+?)\s*\|\s*([12])\s*\|\s*(.+?)\s*\|$/);
    if (!m) continue;
    const credits = /^\d+$/.test(m[3]) ? Number(m[3]) : null;
    meta.set(m[1], { track: track.id, semester: Number(m[2]), credits });
  }
}

// --- 2. Isi per mata pelajaran di Lampiran A ---
const appendix = spec.slice(spec.indexOf("## Lampiran A"));
const entries = [];
const re = /\*\*(.+?)\*\* \(`([a-z0-9-]+)`\)(?: — tagline: "(.+?)")?\n- \*Objective:\* (.+)\n- \*Focus:\* (.+)\n- Outcomes: (.+)/g;
let m;
while ((m = re.exec(appendix))) {
  const [, title, slug, tagline, objective, focus, outcomes] = m;
  const info = meta.get(title);
  if (!info) throw new Error(`Judul tidak ditemukan di tabel 3.7: ${title}`);
  entries.push({
    slug,
    track: info.track,
    semester: info.semester,
    credits: info.credits,
    en: {
      title,
      ...(tagline ? { tagline } : {}),
      objective: objective.trim(),
      focus: focus.trim(),
      outcomes: outcomes.replace(/\.$/, "").split(" · ").map((s) => s.trim()),
    },
    // Terjemahan ID belum tersedia di sumber: halaman /id memakai fallback EN (lihat CONTENT_REVIEW.md).
    id: null,
  });
}

if (entries.length !== meta.size) {
  throw new Error(`Jumlah tidak cocok: Lampiran A ${entries.length}, tabel 3.7 ${meta.size}`);
}

const out = {
  _source: "docs/SPEC.md — Bagian 3.7 & Lampiran A (dibangun oleh scripts/build-electives.mjs; jangan edit manual)",
  tracks: TRACKS.map((t) => t.id),
  subjects: entries,
};
fs.writeFileSync("src/content/shared/electives.json", JSON.stringify(out, null, 2) + "\n");
const count = (id) => entries.filter((e) => e.track === id).length;
console.log(`OK: ${entries.length} mata pelajaran (${TRACKS.map((t) => `${t.heading} ${count(t.id)}`).join(", ")})`);
console.log("Kredit kosong:", entries.filter((e) => e.credits === null).map((e) => e.slug).join(", ") || "-");
