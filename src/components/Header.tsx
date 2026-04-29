"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.css";

const ACCENT_BY_ROUTE: Record<string, string> = {
  "/build": "var(--brown)",
  "/adopt": "var(--green)",
  "/manifest": "var(--teal)",
};

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();

  const navItems = [
    { href: "/build", label: t("nav.build") },
    { href: "/adopt", label: t("nav.adopt") },
    { href: "/manifest", label: t("nav.manifest") },
    { href: "/work", label: t("nav.work") },
    { href: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark}>
        {t("wordmarkPrefix")} <span>{t("wordmarkSuffix")}</span>
      </Link>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const accent = ACCENT_BY_ROUTE[item.href];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? styles.active : undefined}
              style={isActive && accent ? { ["--active-accent" as string]: accent } : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
