import styles from "./PhaseBlock.module.css";

type Phase = {
  num: string;
  name: string;
  time: string;
  body: string;
};

type Props = {
  phases: Phase[];
};

export function PhaseBlock({ phases }: Props) {
  return (
    <div className={styles.phases}>
      {phases.map((phase) => (
        <div key={phase.name} className={styles.phase}>
          <div className={styles.header}>
            <span className={styles.num}>{phase.num}</span>
            <span className={styles.name}>{phase.name}</span>
            <span className={styles.time}>{phase.time}</span>
          </div>
          <p className={styles.body}>{phase.body}</p>
        </div>
      ))}
    </div>
  );
}
