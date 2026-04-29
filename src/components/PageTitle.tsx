import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./PageTitle.module.css";

type Props = {
  breadcrumb: string;
  heading: string;
  lede: string;
};

export async function PageTitle({ breadcrumb, heading, lede }: Props) {
  const t = await getTranslations("header");

  return (
    <section className={styles.pageTitle}>
      <div className={styles.breadcrumb}>
        <span className={styles.marker} aria-hidden />
        <Link href="/">{t("wordmarkPrefix")}</Link>
        <span className={styles.divider}>/</span>
        <span>{breadcrumb}</span>
      </div>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.lede}>{lede}</p>
    </section>
  );
}
