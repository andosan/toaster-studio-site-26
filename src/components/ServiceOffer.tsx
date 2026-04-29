import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "./SectionLabel";
import styles from "./ServiceOffer.module.css";

const SERVICES = [
  { key: "build", id: "build", href: "/build" },
  { key: "adopt", id: "adopt", href: "/adopt" },
] as const;

export async function ServiceOffer() {
  const t = await getTranslations("home.services");

  return (
    <section className={styles.section}>
      <SectionLabel>{t("label")}</SectionLabel>
      <p className={styles.intro}>{t("intro")}</p>

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <article
            key={service.key}
            id={service.id}
            className={styles.service}
          >
            <div className={styles.tag}>{t(`${service.key}.tag`)}</div>
            <h3 className={styles.title}>{t(`${service.key}.title`)}</h3>
            <p className={styles.summary}>{t(`${service.key}.summary`)}</p>
            <p className={styles.body}>{t(`${service.key}.body`)}</p>
            <div className={styles.meta}>
              <span>{t(`${service.key}.metaPrice`)}</span>
              <span>{t(`${service.key}.metaScope`)}</span>
            </div>
            <Link href={service.href} className={styles.cta}>
              {t(`${service.key}.cta`)}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
