import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, buildCanonical } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { ContentSection } from "@/components/ContentSection";
import { PhaseBlock } from "@/components/PhaseBlock";
import { TierGrid } from "@/components/TierGrid";
import { CTA } from "@/components/CTA";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

const PHASE_KEYS = ["audit", "pilot", "embed"] as const;
const TIER_KEYS = ["advisory", "handsOn"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adopt" });

  return {
    title: t("title"),
    description: t("lede"),
    alternates: {
      canonical: buildCanonical(locale, "/adopt"),
      ...buildAlternates("/adopt"),
    },
  };
}

export default async function AdoptPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("adopt");
  const s = (key: string) => t(`sections.${key}`);

  const phases = PHASE_KEYS.map((key) => ({
    num: t(`sections.how.phases.${key}.num`),
    name: t(`sections.how.phases.${key}.name`),
    time: t(`sections.how.phases.${key}.time`),
    body: t(`sections.how.phases.${key}.body`),
  }));

  const tiers = TIER_KEYS.map((key) => ({
    tag: t(`sections.cost.tiers.${key}.tag`),
    name: t(`sections.cost.tiers.${key}.name`),
    price: t(`sections.cost.tiers.${key}.price`),
    hours: t(`sections.cost.tiers.${key}.hours`),
    body: t(`sections.cost.tiers.${key}.body`),
  }));

  const pageStyle = { "--accent": "var(--green)" } as CSSProperties;

  return (
    <div style={pageStyle}>
      <Header />
      <main>
        <PageTitle
          breadcrumb={t("breadcrumb")}
          heading={t("heading")}
          lede={t("lede")}
        />

        <ContentSection numeral={s("what.numeral")} label={s("what.label")}>
          <h2>{s("what.h2")}</h2>
          <p>{s("what.p1")}</p>
          <p className="muted">{s("what.p2Muted")}</p>
          <p>
            <strong>{s("what.p3Strong")}</strong>
            {s("what.p3")}
          </p>
        </ContentSection>

        <ContentSection numeral={s("who.numeral")} label={s("who.label")}>
          <h2>{s("who.h2")}</h2>
          <p>{s("who.p1")}</p>
          <p className="muted">{s("who.p2Muted")}</p>
        </ContentSection>

        <ContentSection numeral={s("how.numeral")} label={s("how.label")}>
          <h2>{s("how.h2")}</h2>
          <p className="muted">{s("how.leadMuted")}</p>
          <PhaseBlock phases={phases} />
        </ContentSection>

        <ContentSection
          numeral={s("delivers.numeral")}
          label={s("delivers.label")}
        >
          <h2>{s("delivers.h2")}</h2>
          <p>{s("delivers.p1")}</p>
          <p className="muted">{s("delivers.p2Muted")}</p>
        </ContentSection>

        <ContentSection numeral={s("cost.numeral")} label={s("cost.label")}>
          <h2>{s("cost.h2")}</h2>
          <TierGrid tiers={tiers} />
          <p className="muted" style={{ marginTop: "1.5rem" }}>
            {s("cost.afterTiersMuted")}
          </p>
          <p className={styles.footnote}>{s("cost.footnote")}</p>
        </ContentSection>

        <ContentSection numeral={s("next.numeral")} label={s("next.label")}>
          <h2>{s("next.h2")}</h2>
          <p>{s("next.p1")}</p>
          <p className="muted">{s("next.p2Muted")}</p>
        </ContentSection>

        <CTA namespace="adopt.cta" />
      </main>
      <Footer />
    </div>
  );
}
