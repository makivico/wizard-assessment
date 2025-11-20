import { useState } from 'react';
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

  const steps: StepId[] = getSteps(state);
  const stepConfig = STEP_CONFIG[state.step];
  const isLastStep = state.step === 'info';
  const isNextDisabled = computeIsNextDisabled(state);

  const goToNext = () => {
    const next = getNextStep(state.step, steps);
    if (!next) return;
    dispatch({ type: 'GO_TO_STEP', step: next });
  };

  const goToPrev = () => {
    const prev = getPrevStep(state.step, steps);
    if (!prev) return;
    dispatch({ type: 'GO_TO_STEP', step: prev });
  };

  const handleComplete = () => {
    console.log('Submitting wizard payload:', state);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET' });
    setIsCompleted(false);
  };

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

  if (isCompleted) {
    return (
      <div className={styles.wizard}>
        <SuccessScreen onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      <Stepper steps={steps} currentStep={state.step} />

      <div className={styles.wizard__content}>
        <StepContainer
          stepConfig={stepConfig}
          onNext={goToNext}
          onBack={goToPrev}
          onComplete={handleComplete}
          isLastStep={isLastStep}
          showBack
          isBackDisabled={state.step === 'account'}
          isNextDisabled={isNextDisabled}
        >
          {renderStep(state.step)}
        </StepContainer>
      </div>
    </div>
  );
}
