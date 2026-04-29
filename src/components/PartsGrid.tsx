import { getTranslations } from "next-intl/server";
import { SectionLabel } from "./SectionLabel";
import styles from "./PartsGrid.module.css";

const PART_KEYS = ["client", "audience", "work", "people"] as const;

export async function PartsGrid() {
  const t = await getTranslations("home.integral");

  const ledeText = t("lede");
  const emphasis = t("ledeEmphasis");
  const [before, after] = ledeText.split(emphasis);

  return (
    <section className={styles.section}>
      <SectionLabel>{t("label")}</SectionLabel>
      <p className={styles.lede}>
        {before}
        <em>{emphasis}</em>
        {after}
      </p>

      <div className={styles.grid}>
        {PART_KEYS.map((key) => (
          <article key={key} className={styles.part}>
            <div className={styles.number}>{t(`parts.${key}.number`)}</div>
            <h3 className={styles.title}>{t(`parts.${key}.title`)}</h3>
            <p className={styles.body}>{t(`parts.${key}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
