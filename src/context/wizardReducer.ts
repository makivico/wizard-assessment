// Wizard reducer and initial state for managing the multi-step wizard flow.
import configJson from '../data/accountConfig.json';
import type {
  WizardState,
  WizardAction,
  WizardConfig,
  NewPlanDraft,
} from '../types/wizard';

const wizardConfig = configJson as WizardConfig;

const initialNewPlan: NewPlanDraft = {
  name: '',
  isExtraInfoRequired: false,
};

export const initialState: WizardState = {
  step: 'account',
  isAddingNewPlan: false,
  accountTypes: wizardConfig.accountType,
  selectedAccountTypeId: null,
  selectedPlanId: null,
  newPlan: initialNewPlan,
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

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_ACCOUNT_TYPE':
      // only clear plan/info when the account actually changes
      if (action.id === state.selectedAccountTypeId) {
        return {
          ...state,
          selectedAccountTypeId: action.id,
          isAddingNewPlan: false,
          newPlan: initialNewPlan,
        };
      }
      return {
        ...state,
        selectedAccountTypeId: action.id,
        selectedPlanId: null,
        isAddingNewPlan: false,
        newPlan: initialNewPlan,
        info: initialState.info,
      };
    case 'SET_PLAN':
      if (action.id === state.selectedPlanId) {
        return {
          ...state,
          selectedPlanId: action.id,
          isAddingNewPlan: false,
          newPlan: initialNewPlan,
        };
      }
      return {
        ...state,
        selectedPlanId: action.id,
        isAddingNewPlan: false,
        newPlan: initialNewPlan,
        info: initialState.info,
      };
    case 'START_ADD_NEW_PLAN':
      return {
        ...state,
        selectedPlanId: null,
        isAddingNewPlan: true,
        newPlan: initialNewPlan,
        info: initialState.info,
      };
    case 'UPDATE_NEW_PLAN':
      return {
        ...state,
        newPlan: { ...state.newPlan, ...action.payload },
      };
    case 'SET_INFO_FIELD':
      return {
        ...state,
        info: { ...state.info, [action.field]: action.value },
      };
    case 'GO_TO_STEP':
      // Move to a specific step
      return { ...state, step: action.step };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
