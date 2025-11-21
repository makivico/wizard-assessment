import type { StepId } from '../types/wizard';

export interface StepConfig {
  id: StepId;
  title: string;
  subtitle?: string;
}

export const STEP_CONFIG: Record<StepId, StepConfig> = {
  account: { id: 'account', title: 'Account' },
  plan: { id: 'plan', title: 'Plan' },
  addPlan: { id: 'addPlan', title: 'Add new plan' },
  info: { id: 'info', title: 'Information' },
};

// Default step order
export const BASE_STEPS: StepId[] = ['account', 'plan', 'info'];

// Step order when adding a new plan
export const STEPS_WITH_ADD_PLAN: StepId[] = ['account', 'plan', 'addPlan', 'info'];

export const STEP_LABELS: Record<StepId, string> = {
  account: 'Account',
  plan: 'Plan',
  addPlan: 'Add new plan',
  info: 'Information',
};
