import type { StepId, WizardState, AccountTypeConfig, PlanConfig } from '../types/wizard';
import { BASE_STEPS, STEPS_WITH_ADD_PLAN } from '../config/wizardSteps';

/**
 * Returns the ordered list of step IDs for the current wizard flow.
 * Includes the 'addPlan' step only when user is adding a new plan.
 */
export function getSteps(state: WizardState): StepId[] {
  return state.isAddingNewPlan ? STEPS_WITH_ADD_PLAN : BASE_STEPS;
}

// Finds and returns the currently selected account type configuration
export function getSelectedAccount(state: WizardState): AccountTypeConfig | undefined {
  return state.accountTypes.find(a => a.id === state.selectedAccountTypeId);
}

// Finds and returns the currently selected plan configuration
export function getSelectedPlan(state: WizardState): PlanConfig | undefined {
  const account = getSelectedAccount(state);
  return account?.plan.find(p => p.id === state.selectedPlanId);
}

// Determines whether a description is required
export function requiresExtraInfo(state: WizardState): boolean {
  const selectedPlan = getSelectedPlan(state);
  return Boolean(selectedPlan?.isExtraInfoRequired || state.newPlan.isExtraInfoRequired);
}

// Determines if the Next/Complete button should be disabled on the current step
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

// Get the next step ID or null if at the end
export function getNextStep(current: StepId, steps: StepId[]): StepId | null {
  const index = steps.indexOf(current);
  if (index === -1 || index === steps.length - 1) return null;
  return steps[index + 1];
}

// Get the previous step ID or null if at the beginning
export function getPrevStep(current: StepId, steps: StepId[]): StepId | null {
  const index = steps.indexOf(current);
  if (index <= 0) return null;
  return steps[index - 1];
}
