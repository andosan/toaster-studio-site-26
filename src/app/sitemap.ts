import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

const ROUTES: { path: string; priority?: number }[] = [
  { path: "", priority: 1 },
  { path: "/build", priority: 0.9 },
  { path: "/adopt", priority: 0.9 },
  { path: "/manifest", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => {
      const languages: Record<string, string> = {};
      for (const l of routing.locales) {
        languages[l] = `${SITE_URL}/${l}${path}`;
      }

      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      };
    })
  );
}
