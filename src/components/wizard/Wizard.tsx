import { useState, useMemo, useCallback } from 'react';
import { useWizard } from '../../context/WizardContext';
import type { StepId } from '../../types/wizard';
import { Stepper } from './Stepper';
import { AccountStep } from './steps/AccountStep';
import { PlanStep } from './steps/PlanStep';
import { AddPlanStep } from './steps/AddPlanStep';
import { InfoStep } from './steps/InfoStep';
import { STEP_CONFIG } from '../../config/wizardSteps';
import { StepContainer } from './StepContainer';
import { SuccessScreen } from './SuccessScreen';
import styles from './wizard.module.scss';
import {
  getSteps,
  isNextDisabled as computeIsNextDisabled,
  getNextStep,
  getPrevStep,
} from '../../utils/wizardUtils';

export function Wizard() {
  const { state, dispatch } = useWizard();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps: StepId[] = useMemo(() => getSteps(state), [state]);

  const stepConfig = useMemo(() => STEP_CONFIG[state.step], [state]);
  const isLastStep = state.step === 'info';
  const isNextDisabled = useMemo(() => computeIsNextDisabled(state), [state]);

  // Move to next step
  const goToNext = useCallback(() => {
    const next = getNextStep(state.step, steps);
    if (!next) return;
    dispatch({ type: 'GO_TO_STEP', step: next });
  }, [state.step, steps, dispatch]);

  // Move to previous step
  const goToPrev = useCallback(() => {
    const prev = getPrevStep(state.step, steps);
    if (!prev) return;
    dispatch({ type: 'GO_TO_STEP', step: prev });
  }, [state, steps, dispatch]);

  // Final submit
  const handleComplete = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // simulated API call (fake fetch)
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.95) reject(new Error('Network error'));
          else resolve();
        }, 800);
      });
      console.log('Submitting wizard payload:', state);
      setIsCompleted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restart wizard
  const handleRestart = () => {
    dispatch({ type: 'RESET' });
    setIsCompleted(false);
  };

  // Render the current step component
  const renderStep = (step: StepId) => {
    switch (step) {
      case 'account':
        return <AccountStep />;
      case 'plan':
        return <PlanStep />;
      case 'addPlan':
        return <AddPlanStep />;
      case 'info':
        return <InfoStep />;
      default:
        return null;
    }
  };

  // Show success screen after completion
  if (isCompleted) {
    return (
      <div className={styles.wizard}>
        <SuccessScreen onRestart={handleRestart} />
      </div>
    );
  }

  // Main wizard UI
  return (
    <div className={styles.wizard}>
      <Stepper steps={steps} currentStep={state.step} />
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.wizard__content}>
        <StepContainer
          stepConfig={stepConfig}
          onNext={goToNext}
          onBack={goToPrev}
          onComplete={handleComplete}
          isLastStep={isLastStep}
          showBack
          isBackDisabled={state.step === 'account'}
          isNextDisabled={isNextDisabled || isSubmitting}
        >
          {renderStep(state.step)}
        </StepContainer>
      </div>
    </div>
  );
}
