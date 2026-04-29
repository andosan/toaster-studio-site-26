import { getTranslations } from "next-intl/server";
import styles from "./Footer.module.css";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>{t("copyright")}</span>
      <span>{t("tagline")}</span>
    </footer>
  );
}
