import { getTranslations } from "next-intl/server";
import { OscillatorField } from "./OscillatorField";
import styles from "./Hero.module.css";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className={styles.hero}>
      <OscillatorField className={styles.oscillators} />
      <div className={`${styles.top} fade-in`}>
        <span className={styles.edition}>
          <span className={styles.marker} aria-hidden="true" />
          {t("edition")}
        </span>
        <span className={styles.scroll}>{t("scroll")}</span>
      </div>

      <div className={styles.center}>
        <h1 className={styles.headline}>
          <span className={`${styles.lineStatement} fade-in`}>
            {t("lineStatement")}{" "}
            <span className={styles.systemWord}>{t("lineStatementEmphasis")}</span>
            <span className={styles.emDash}>—</span>
          </span>

          <span className={`${styles.lineParts} fade-in`}>
            {t("lineParts")}
          </span>

          <span className={`${styles.lineResolution} fade-in`}>
            {t("lineResolution")}
          </span>
        </h1>
      </div>

      <div className={`${styles.bottom} fade-in`}>
        <p className={styles.verticals}>{t("verticals")}</p>
        <p className={styles.metaRight}>{t("meta")}</p>
      </div>
    </section>
  );
}
