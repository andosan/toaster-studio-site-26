import styles from "./TierGrid.module.css";

type Tier = {
  tag: string;
  name: string;
  price: string;
  hours: string;
  body: string;
};

type Props = {
  tiers: Tier[];
};

export function TierGrid({ tiers }: Props) {
  return (
    <div className={styles.grid}>
      {tiers.map((tier) => (
        <div key={tier.name} className={styles.tier}>
          <div className={styles.tag}>{tier.tag}</div>
          <div className={styles.name}>{tier.name}</div>
          <div className={styles.price}>{tier.price}</div>
          <div className={styles.hours}>{tier.hours}</div>
          <p className={styles.body}>{tier.body}</p>
        </div>
      ))}
    </div>
  );
}
