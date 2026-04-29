import styles from "./Principle.module.css";

type Props = {
  numeral: string;
  label: string;
  headingBefore: string;
  headingEmphasis: string;
  headingAfter: string;
  children: React.ReactNode;
  highlight?: boolean;
};

export function Principle({
  numeral,
  label,
  headingBefore,
  headingEmphasis,
  headingAfter,
  children,
  highlight = false,
}: Props) {
  const className = highlight
    ? `${styles.principle} ${styles.highlight}`
    : styles.principle;

  return (
    <section className={className}>
      <div className={styles.marker}>
        <span className={styles.num}>{numeral}</span>
        {label}
      </div>
      <div className={styles.body}>
        <h2 className={styles.heading}>
          {headingBefore}
          <em>{headingEmphasis}</em>
          {headingAfter}
        </h2>
        {children}
      </div>
    </section>
  );
}
