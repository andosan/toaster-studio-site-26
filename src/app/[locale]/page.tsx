import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, buildCanonical } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: { absolute: t("title") },
    description: t("lede"),
    alternates: {
      canonical: buildCanonical(locale, ""),
      ...buildAlternates(""),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("lede")}</p>
    </main>
  );
}
