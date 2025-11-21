import type { ReactNode } from 'react';
import styles from '../wizard/steps/StepContainer.module.scss';
import { Button } from '../ui/Button';
import type { StepConfig } from '../../config/wizardSteps';

interface StepContainerProps {
  stepConfig: StepConfig;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
  showBack?: boolean;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
}

export function StepContainer({
  stepConfig,
  children,
  onNext,
  onBack,
  onComplete,
  isLastStep = false,
  showBack = true,
  isNextDisabled = false,
  isBackDisabled = true,
}: StepContainerProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{stepConfig.title}</h2>
      {stepConfig.subtitle && <p className={styles.subtitle}>{stepConfig.subtitle}</p>}

      {/* Main step content */}
      <div className={styles.content}>{children}</div>

      {/* Navigation buttons */}
      <div className={styles.footer}>
        {showBack && onBack && (
          <Button variant="ghost" onClick={onBack} disabled={isBackDisabled}>
            Prev
          </Button>
        )}

        {!isLastStep && onNext && (
          <Button variant="primary" onClick={onNext} disabled={isNextDisabled}>
            Next
          </Button>
        )}

        {isLastStep && onComplete && (
          <Button variant="primary" onClick={onComplete} disabled={isNextDisabled}>
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}
