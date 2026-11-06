import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { allPaths, localeHref } from "@/lib/routes";
import { alternateUrls } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localeHref(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.5 : 0.8,
      alternates: { languages: alternateUrls(path) },
    })),
  );
}
