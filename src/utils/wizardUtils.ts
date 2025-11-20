import type { StepId, WizardState, AccountTypeConfig, PlanConfig } from '../types/wizard';
import { BASE_STEPS, STEPS_WITH_ADD_PLAN } from '../config/wizardSteps';

export function getSteps(state: WizardState): StepId[] {
  return state.isAddingNewPlan ? STEPS_WITH_ADD_PLAN : BASE_STEPS;
}

export function getSelectedAccount(state: WizardState): AccountTypeConfig | undefined {
  return state.accountTypes.find(a => a.id === state.selectedAccountTypeId);
}

export function getSelectedPlan(state: WizardState): PlanConfig | undefined {
  const account = getSelectedAccount(state);
  return account?.plan.find(p => p.id === state.selectedPlanId);
}

export function requiresExtraInfo(state: WizardState): boolean {
  const selectedPlan = getSelectedPlan(state);
  return Boolean(selectedPlan?.isExtraInfoRequired || state.newPlan.isExtraInfoRequired);
}

export function isNextDisabled(state: WizardState): boolean {
  switch (state.step) {
    case 'account':
      return state.selectedAccountTypeId === null;

    case 'plan':
      return !state.isAddingNewPlan && state.selectedPlanId === null;

    case 'addPlan':
      return state.newPlan.name.trim().length === 0;

    case 'info': {
      const firstNameMissing = state.info.firstName.trim().length === 0;
      const lastNameMissing = state.info.lastName.trim().length === 0;

      const descriptionRequired = requiresExtraInfo(state);
      const descriptionMissing =
        descriptionRequired && state.info.description.trim().length === 0;

      return firstNameMissing || lastNameMissing || descriptionMissing;
    }

    default:
      return false;
  }
}

// keep backward compatibility with existing imports
export const computeIsNextDisabled = isNextDisabled;

export function getNextStep(current: StepId, steps: StepId[]): StepId | null {
  const index = steps.indexOf(current);
  if (index === -1 || index === steps.length - 1) return null;
  return steps[index + 1];
}

export function getPrevStep(current: StepId, steps: StepId[]): StepId | null {
  const index = steps.indexOf(current);
  if (index <= 0) return null;
  return steps[index - 1];
}
