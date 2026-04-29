import styles from "./StepBlock.module.css";

type Step = {
  name: string;
  body: string;
};

type Props = {
  steps: Step[];
};

export function StepBlock({ steps }: Props) {
  return (
    <div className={styles.steps}>
      {steps.map((step) => (
        <div key={step.name} className={styles.step}>
          <p className={styles.name}>{step.name}</p>
          <p
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        </div>
      ))}
    </div>
  );
}
