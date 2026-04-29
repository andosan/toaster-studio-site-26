import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, buildCanonical } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PartsGrid } from "@/components/PartsGrid";
import { ServiceOffer } from "@/components/ServiceOffer";
import { CTA } from "@/components/CTA";
import { SectionLabel } from "@/components/SectionLabel";
import styles from "./page.module.css";

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

const WORK_KEYS = ["first", "second", "third", "fourth"] as const;
const LOGO_COUNT = 15;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PartsGrid />
        <ServiceOffer />

        <section className={styles.section}>
          <SectionLabel>{t("liveProof.label")}</SectionLabel>
          <div className={styles.placeholder}>
            <span className={styles.placeholderTag}>{t("liveProof.tag")}</span>
            <p className={styles.placeholderTitle}>{t("liveProof.title")}</p>
            <p className={styles.placeholderNote}>{t("liveProof.note")}</p>
          </div>
        </section>

        <section className={styles.section} id="work">
          <SectionLabel>{t("work.label")}</SectionLabel>
          <h2 className={styles.workIntro}>{t("work.intro")}</h2>
          <p className={styles.workSubtitle}>{t("work.subtitle")}</p>

          <ol className={styles.workList}>
            {WORK_KEYS.map((key) => (
              <li key={key} className={styles.workItem}>
                <div className={styles.workNum}>
                  {t(`work.items.${key}.number`)}
                </div>
                <div className={styles.workContent}>
                  <h4>{t(`work.items.${key}.title`)}</h4>
                  <p>{t(`work.items.${key}.body`)}</p>
                </div>
                <div className={styles.workTag}>
                  {t(`work.items.${key}.tag`)}
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.workFooter}>
            <a href="#">{t("work.footer")}</a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.reference}`}>
          <SectionLabel>{t("reference.label")}</SectionLabel>
          <p className={styles.referenceTitle}>{t("reference.title")}</p>

          <div className={styles.logoGrid} aria-label="Reference logos">
            {Array.from({ length: LOGO_COUNT }, (_, i) => (
              <div key={i} className={styles.logoCell}>
                Logo {i + 1}
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
