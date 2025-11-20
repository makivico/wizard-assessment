import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import type { StepId } from '../../types/wizard';
import { Stepper } from './Stepper';
import { AccountStep } from './steps/AccountStep';
import { PlanStep } from './steps/PlanStep';
import { AddPlanStep } from './steps/AddPlanStep';
import { InfoStep } from './steps/InfoStep';
import { BASE_STEPS, STEPS_WITH_ADD_PLAN, STEP_CONFIG } from '../../config/wizardSteps';
import { StepContainer } from './StepContainer';
import { SuccessScreen } from './SuccessScreen';
import styles from './wizard.module.scss';

export function Wizard() {
  const { state, dispatch } = useWizard();
  const [isCompleted, setIsCompleted] = useState(false);

  const steps: StepId[] = state.isAddingNewPlan ? STEPS_WITH_ADD_PLAN : BASE_STEPS;

  const stepConfig = STEP_CONFIG[state.step];
  const isLastStep = state.step === 'info';

  const isNextDisabled = (() => {
    switch (state.step) {
      case 'account':
        return state.selectedAccountTypeId === null;

      case 'plan':
        // If user is adding new plan, Next goes to addPlan, no existing plan required
        return !state.isAddingNewPlan && state.selectedPlanId === null;

      case 'addPlan':
        // Require new plan name
        return state.newPlan.name.trim().length === 0;

      case 'info': {
        const firstNameOk = state.info.firstName.trim().length > 0;

        const selectedAccount = state.accountTypes.find(
          a => a.id === state.selectedAccountTypeId
        );

        const selectedPlan = selectedAccount?.plan.find(
          p => p.id === state.selectedPlanId
        );

        const descriptionRequired =
          selectedPlan?.isExtraInfoRequired || state.newPlan.isExtraInfoRequired;

        const descriptionOk = !descriptionRequired
          ? true
          : state.info.description.trim().length > 0;

        return !(firstNameOk && descriptionOk);
      }

      default:
        return false;
    }
  })();

  // Navigation handlers
  const goToNext = () => {
    const currentIndex = steps.indexOf(state.step);
    if (currentIndex === -1 || currentIndex === steps.length - 1) return;
    const nextStep = steps[currentIndex + 1];
    dispatch({ type: 'GO_TO_STEP', step: nextStep });
  };

  const goToPrev = () => {
    const currentIndex = steps.indexOf(state.step);
    if (currentIndex <= 0) return;
    const prevStep = steps[currentIndex - 1];
    dispatch({ type: 'GO_TO_STEP', step: prevStep });
  };

  const handleComplete = () => {
    // Simulate submission
    console.log('Submitting wizard payload:', state);
    setIsCompleted(true); // show success screen
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET' }); // reset reducer state
    setIsCompleted(false); // show wizard again
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
          showBack={true}
          isBackDisabled={state.step === 'account'}
          isNextDisabled={isNextDisabled}
        >
          {renderStep(state.step)}
        </StepContainer>
      </div>
    </div>
  );
}
