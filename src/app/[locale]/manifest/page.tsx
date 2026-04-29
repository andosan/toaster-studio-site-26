import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, buildCanonical, SITE_URL } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Principle } from "@/components/Principle";
import { CTA } from "@/components/CTA";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "manifest" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: buildCanonical(locale, "/manifest"),
      ...buildAlternates("/manifest"),
    },
  };
}

export default async function ManifestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("manifest");
  const tHeader = await getTranslations("header");

  const pageStyle = { "--accent": "var(--teal)" } as CSSProperties;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t("cover.heading"),
    description: t("metaDescription"),
    inLanguage: locale,
    url: buildCanonical(locale, "/manifest"),
    dateModified: "2026-04-01",
    author: {
      "@type": "Organization",
      name: "Toaster Studio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Toaster Studio",
      url: SITE_URL,
    },
  };

  return (
    <div style={pageStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className={styles.cover}>
          <div className={styles.coverMeta}>
            <div className={styles.coverMetaLine}>
              <span className={styles.marker} aria-hidden />
              <Link href="/">{tHeader("wordmarkPrefix")}</Link>
              <span className={styles.divider}>/</span>
              <span>{t("breadcrumb")}</span>
            </div>
            <div>
              {t("cover.metaLineOne")}
              <br />
              {t("cover.metaLineTwo")}
            </div>
          </div>
          <div className={styles.coverContent}>
            <h1 className={styles.heading}>{t("cover.heading")}</h1>
            <p className={styles.lede}>{t("cover.lede")}</p>
          </div>
        </section>

        <Principle
          numeral={t("principles.one.numeral")}
          label={t("principles.one.label")}
          headingBefore={t("principles.one.h2Before")}
          headingEmphasis={t("principles.one.h2Em")}
          headingAfter={t("principles.one.h2After")}
        >
          <p>{t("principles.one.p1")}</p>
          <p className="muted">{t("principles.one.p2Muted")}</p>
        </Principle>

        <Principle
          numeral={t("principles.two.numeral")}
          label={t("principles.two.label")}
          headingBefore={t("principles.two.h2Before")}
          headingEmphasis={t("principles.two.h2Em")}
          headingAfter={t("principles.two.h2After")}
        >
          <p>{t("principles.two.p1")}</p>
          <p
            className="muted"
            dangerouslySetInnerHTML={{
              __html: t.raw("principles.two.p2MutedHtml") as string,
            }}
          />
        </Principle>

        <Principle
          numeral={t("principles.three.numeral")}
          label={t("principles.three.label")}
          headingBefore={t("principles.three.h2Before")}
          headingEmphasis={t("principles.three.h2Em")}
          headingAfter={t("principles.three.h2After")}
          highlight
        >
          <p>{t("principles.three.p1")}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw("principles.three.p2Html") as string,
            }}
          />
          <p className="muted">{t("principles.three.p3Muted")}</p>
        </Principle>

        <Principle
          numeral={t("principles.four.numeral")}
          label={t("principles.four.label")}
          headingBefore={t("principles.four.h2Before")}
          headingEmphasis={t("principles.four.h2Em")}
          headingAfter={t("principles.four.h2After")}
        >
          <p>{t("principles.four.p1")}</p>
          <p className="muted">{t("principles.four.p2Muted")}</p>
        </Principle>

        <Principle
          numeral={t("principles.five.numeral")}
          label={t("principles.five.label")}
          headingBefore={t("principles.five.h2Before")}
          headingEmphasis={t("principles.five.h2Em")}
          headingAfter={t("principles.five.h2After")}
        >
          <p>{t("principles.five.p1")}</p>
          <p
            className="muted"
            dangerouslySetInnerHTML={{
              __html: t.raw("principles.five.p2MutedHtml") as string,
            }}
          />
        </Principle>

        <section className={styles.colophon}>
          <span className={styles.colophonText}>{t("colophon.text")}</span>
          <span>{t("colophon.version")}</span>
        </section>

        <CTA namespace="manifest.cta" />
      </main>
      <Footer />
    </div>
  );
}
