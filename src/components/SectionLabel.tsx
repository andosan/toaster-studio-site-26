import styles from "./SectionLabel.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "default" | "dark";
};

export function SectionLabel({ children, variant = "default" }: Props) {
  const className =
    variant === "dark"
      ? `${styles.label} ${styles.dark}`
      : styles.label;

  return <div className={className}>{children}</div>;
}
