// Redirect 301 dari URL situs WordPress lama ke struktur baru (spec Bagian 8.5 & 7).
// Dipakai oleh next.config.ts. Redirect di next.config dijalankan sebelum src/proxy.ts.
type Redirect = { source: string; destination: string; statusCode: 301 };
type Rule = [source: string, destination: string];

const RULES: Rule[] = [
  // --- EN (tanpa prefiks; /about, /admission, /career sudah sama dengan URL baru, cukup dinormalkan proxy) ---
  ["/faq", "/about#faq"],
  ["/our-building", "/about#facilities"],
  ["/kindergarten", "/schools/kindergarten"],
  ["/kindergarten-play", "/schools/kindergarten"],
  ["/primary-school", "/schools/primary"],
  ["/primary", "/schools/primary"],
  ["/secondary-school", "/schools/secondary"],
  ["/secondary", "/schools/secondary"],
  ["/high-school", "/schools/high-school"],
  ["/junior-college", "/schools/high-school"],
  ["/subject-catalog", "/schools/high-school/subjects"],
  ["/academic", "/schools/high-school/subjects"],
  ["/academic-experience", "/schools/high-school/subjects"],
  ["/course-catalog/:slug", "/schools/high-school/subjects/:slug"],
  ["/course-catalog-content/:path*", "/schools/high-school/subjects"],
  ["/admission-info", "/admission"],
  ["/blank/how-to-apply", "/admission#process"],
  // Catatan: spec 8.5 memetakan /home ke /id; /home adalah beranda versi EN, jadi diarahkan ke / (lihat CONTENT_REVIEW.md).
  ["/home", "/"],

  // --- ID ---
  ["/id/beranda", "/id"],
  ["/id/beranda-lama", "/id"],
  ["/id/tentang", "/id/about"],
  ["/id/tanya-jawab", "/id/about#faq"],
  ["/id/tk", "/id/schools/kindergarten"],
  ["/id/tk-kreativa-global", "/id/schools/kindergarten"],
  ["/id/sd", "/id/schools/primary"],
  ["/id/sd-kreativa-global", "/id/schools/primary"],
  ["/id/smp", "/id/schools/secondary"],
  ["/id/smp-kreativa-global", "/id/schools/secondary"],
  ["/id/sma", "/id/schools/high-school"],
  ["/id/registrasi", "/id/admission"],
  ["/id/karir", "/id/career"],

  // --- Halaman lama/orphan (spec Bagian 7) → beranda ---
  ["/sample-page", "/"],
  ["/auto-draft", "/"],
  ["/article-news", "/"],
  ["/student-life", "/"],
  ["/student-life-2", "/"],
  ["/uncategorized/:path*", "/"],
  ["/id/artikel-berita", "/id"],
  ["/id/kehidupan-kampus", "/id"],
  ["/id/akademik", "/id/schools/high-school/subjects"],
  ["/id/teachers-daily", "/id"],
  ["/id/parenting-feedback", "/id"],
  ["/id/kreativa-global-daily", "/id"],
  ["/id/7-habits-form", "/id"],
  ["/id/uncategorized-id/:path*", "/id"],

  // --- Brosur PDF lama (tautan sering dibagikan lewat WhatsApp) ---
  [
    "/wp-content/uploads/2026/09/01-Brosur-Kreativa-Global-Kindergarten-2027-2028.pdf.pdf",
    "/brochures/kreativa-global-kindergarten-2027-2028.pdf",
  ],
  [
    "/wp-content/uploads/2026/09/02-Brosur-Kreativa-Global-Primary-School-2027-2028.pdf",
    "/brochures/kreativa-global-primary-school-2027-2028.pdf",
  ],
  [
    "/wp-content/uploads/2026/09/03-Brosur-Kreativa-Global-Secondary-School-2027-2028.pdf",
    "/brochures/kreativa-global-secondary-school-2027-2028.pdf",
  ],
  [
    "/wp-content/uploads/2026/09/04-Brosur-Kreativa-Global-High-School-2027-2028.pdf",
    "/brochures/kreativa-global-high-school-2027-2028.pdf",
  ],
];

/**
 * URL WordPress lama selalu berakhiran "/". Sumber diberi "{/}?" (slash opsional) agar /about/ maupun /about
 * langsung 301 ke tujuan dalam SATU hop (redirect trailing-slash bawaan Next dimatikan di next.config.ts).
 * Pola dengan ":path*" sudah mencakup slash di akhir.
 */
export const legacyRedirects: Redirect[] = RULES.map(([source, destination]) => ({
  source: source.endsWith("*") || source.endsWith(".pdf") ? source : `${source}{/}?`,
  destination,
  statusCode: 301,
}));
