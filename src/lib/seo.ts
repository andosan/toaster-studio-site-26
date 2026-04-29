import { routing } from "@/i18n/routing";

function resolveSiteUrl(): string {
  // Explicit override — set NEXT_PUBLIC_SITE_URL in Vercel project settings
  // when a real domain is wired up (e.g. https://toaster.studio).
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel auto-injects VERCEL_URL on every deployment (preview + production).
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Local dev fallback.
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

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
