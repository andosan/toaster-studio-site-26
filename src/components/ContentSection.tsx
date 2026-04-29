import styles from "./ContentSection.module.css";

type Props = {
  numeral: string;
  label: string;
  children: React.ReactNode;
};

export function ContentSection({ numeral, label, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.marker}>
        <span className={styles.num}>{numeral}</span>
        <span>{label}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
