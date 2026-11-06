import site from "@/content/shared/site.json";

export { site };

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? site.siteUrl).replace(/\/$/, "");

/** Tautan WhatsApp dengan pesan yang sudah terisi. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function formatRupiah(amount: number, locale: "en" | "id" = "id"): string {
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", { maximumFractionDigits: 0 }).format(amount);
}
