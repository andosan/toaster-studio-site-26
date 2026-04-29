import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./Header.module.css";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className={styles.header}>
      <div className={styles.wordmark}>
        {t("wordmarkPrefix")} <span>{t("wordmarkSuffix")}</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/build">{t("nav.build")}</Link>
        <Link href="/adopt">{t("nav.adopt")}</Link>
        <Link href="/manifest">{t("nav.manifest")}</Link>
        <Link href="/work">{t("nav.work")}</Link>
        <Link href="/contact">{t("nav.contact")}</Link>
      </nav>
    </header>
  );
}
