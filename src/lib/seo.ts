import { routing } from "@/i18n/routing";

export const SITE_URL = "https://toaster.studio";

export function buildAlternates(pathname: string = "") {
  const normalised = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = normalised === "/" ? "" : normalised;

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }

  return { languages };
}

export function buildCanonical(locale: string, pathname: string = "") {
  const normalised = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = normalised === "/" ? "" : normalised;
  return `${SITE_URL}/${locale}${path}`;
}
