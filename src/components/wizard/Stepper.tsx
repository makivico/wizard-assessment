import styles from './stepper.module.scss';
import type { StepId } from '../../types/wizard';
import { STEP_LABELS } from '../../config/wizardSteps';

interface StepperProps {
  steps: StepId[];
  currentStep: StepId;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isCompleted = index < currentIndex;
        const isFuture = index > currentIndex;
        const isLast = index === steps.length - 1;

        // Show ellipsis in the last circle if it's a future step
        const showEllipsis = isFuture && isLast;

        return (
          <div key={step} className={styles.stepWrapper}>
            <div className={styles.step}>
              <div
                className={[
                  styles.circle,
                  isCurrent ? styles.circleActive : '',
                  isCompleted ? styles.circleCompleted : '',
                  isFuture && !isCurrent ? styles.circleFuture : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {showEllipsis ? '...' : index + 1}
              </div>

              <div className={styles.label}>
                {showEllipsis ? '...' : STEP_LABELS[step]}
              </div>
            </div>

            {/* Connector line to the next step, TODO: change for png image given in assignment */}
            {index < steps.length - 1 && (
              <div
                className={[styles.line, index < currentIndex ? styles.lineCompleted : '']
                  .filter(Boolean)
                  .join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
