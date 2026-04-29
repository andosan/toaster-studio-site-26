import styles from "./PricingBlock.module.css";

type Row = {
  label: string;
  amount: string;
};

type Props = {
  rows: Row[];
};

export function PricingBlock({ rows }: Props) {
  return (
    <div className={styles.block}>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.amount}>{row.amount}</span>
        </div>
      ))}
    </div>
  );
}
