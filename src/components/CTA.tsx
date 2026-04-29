import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "./SectionLabel";
import styles from "./CTA.module.css";

export async function CTA() {
  const t = await getTranslations("home.cta");

  const text = t("text");
  const emphasis = t("textEmphasis");
  const [before, after] = text.split(emphasis);

  return (
    <section className={styles.section} id="contact">
      <SectionLabel variant="dark">{t("label")}</SectionLabel>
      <p className={styles.text}>
        {before}
        <em>{emphasis}</em>
        {after}
      </p>
      <p className={styles.secondary}>{t("secondary")}</p>
      <Link href="/contact" className={styles.button}>
        {t("button")}
      </Link>
    </section>
  );
}
