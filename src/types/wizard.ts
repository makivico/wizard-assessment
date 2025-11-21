// All wizard step identifiers
export type StepId = 'account' | 'plan' | 'addPlan' | 'info';

export interface PlanConfig {
  id: number;
  name: string;
  isExtraInfoRequired: boolean;
}

export interface AccountTypeConfig {
  id: number;
  name: string;
  plan: PlanConfig[];
}

export interface WizardConfig {
  accountType: AccountTypeConfig[];
}

export interface NewPlanDraft {
  name: string;
  isExtraInfoRequired: boolean;
}

export interface InfoFormState {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  startDate: string;
  location: string;
  language: string;
  description: string;
}

// Initial state when wizard loads
export interface WizardState {
  step: StepId;
  isAddingNewPlan: boolean;
  accountTypes: AccountTypeConfig[];
  selectedAccountTypeId: number | null;
  selectedPlanId: number | null;
  newPlan: NewPlanDraft;
  info: InfoFormState;
}

export const initialWizardState: WizardState = {
  step: 'account',
  isAddingNewPlan: false,
  accountTypes: [],
  selectedAccountTypeId: null,
  selectedPlanId: null,
  newPlan: { name: '', isExtraInfoRequired: false },
  info: {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    startDate: '',
    location: '',
    language: '',
    description: '',
  },
};

export type WizardAction =
  | { type: 'SET_ACCOUNT_TYPE'; id: number }
  | { type: 'SET_PLAN'; id: number }
  | { type: 'START_ADD_NEW_PLAN' }
  | { type: 'UPDATE_NEW_PLAN'; payload: Partial<NewPlanDraft> }
  | { type: 'SET_INFO_FIELD'; field: keyof InfoFormState; value: string }
  | { type: 'GO_TO_STEP'; step: StepId }
  | { type: 'RESET' };
