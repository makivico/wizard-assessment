import styles from './stepper.module.scss';
import type { StepId } from '../../types/wizard';
import { STEP_LABELS } from '../../config/wizardSteps';

interface StepperProps {
  steps: StepId[];
  currentStep: StepId;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = steps.indexOf(currentStep) > index;

        return (
          <div key={step} className={styles.step}>
            <div
              className={
                isActive
                  ? styles.circleActive
                  : isCompleted
                    ? styles.circleCompleted
                    : styles.circle
              }
            >
              {index + 1}
            </div>
            <div className={styles.label}>{STEP_LABELS[step]}</div>
          </div>
        );
      })}
    </div>
  );
}
