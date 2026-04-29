import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, buildCanonical } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { ContentSection } from "@/components/ContentSection";
import { StepBlock } from "@/components/StepBlock";
import { PricingBlock } from "@/components/PricingBlock";
import { CTA } from "@/components/CTA";

type Props = {
  params: Promise<{ locale: string }>;
};

const STEP_KEYS = ["scope", "make", "ship", "after"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "build" });

  return {
    title: t("title"),
    description: t("lede"),
    alternates: {
      canonical: buildCanonical(locale, "/build"),
      ...buildAlternates("/build"),
    },
  };
}

export default async function BuildPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("build");
  const s = (key: string) => t(`sections.${key}`);

  const steps = STEP_KEYS.map((key) => ({
    name: t(`sections.how.steps.${key}.name`),
    body: t.raw(`sections.how.steps.${key}.body`) as string,
  }));

  const pageStyle = { "--accent": "var(--brown)" } as CSSProperties;

  return (
    <div style={pageStyle}>
      <Header />
      <main>
        <PageTitle
          breadcrumb={t("breadcrumb")}
          heading={t("heading")}
          lede={t("lede")}
        />

        <ContentSection
          numeral={s("what.numeral")}
          label={s("what.label")}
        >
          <h2>{s("what.h2")}</h2>
          <p>{s("what.p1")}</p>
          <p className="muted">{s("what.p2")}</p>
        </ContentSection>

        <ContentSection numeral={s("how.numeral")} label={s("how.label")}>
          <h2>{s("how.h2")}</h2>
          <StepBlock steps={steps} />
        </ContentSection>

        <ContentSection numeral={s("who.numeral")} label={s("who.label")}>
          <h2>{s("who.h2")}</h2>
          <p>
            <strong>{s("who.p1Strong")}</strong>
            {s("who.p1")}
          </p>
          <p>
            <strong>{s("who.p2Strong")}</strong>
            {s("who.p2")}
          </p>
        </ContentSection>

        <ContentSection numeral={s("cost.numeral")} label={s("cost.label")}>
          <h2>{s("cost.h2")}</h2>
          <p className="muted">{s("cost.leadMuted")}</p>
          <PricingBlock
            rows={[
              {
                label: t("sections.cost.rows.standardLabel"),
                amount: t("sections.cost.rows.standardAmount"),
              },
              {
                label: t("sections.cost.rows.enterpriseLabel"),
                amount: t("sections.cost.rows.enterpriseAmount"),
              },
            ]}
          />
          <p className="muted" style={{ marginTop: "1.5rem" }}>
            {s("cost.footnoteMuted")}
          </p>
        </ContentSection>

        <ContentSection numeral={s("next.numeral")} label={s("next.label")}>
          <h2>{s("next.h2")}</h2>
          <p>{s("next.p1")}</p>
          <p className="muted">{s("next.p2Muted")}</p>
        </ContentSection>

        <CTA namespace="build.cta" />
      </main>
      <Footer />
    </div>
  );
}
