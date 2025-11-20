import { createContext, useContext, useReducer, type Dispatch } from 'react';
import type { ReactNode } from 'react';
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

const initialState: WizardState = {
  step: 'account',
  isAddingNewPlan: false,
  accountTypes: wizardConfig.accountType,
  selectedAccountTypeId: null,
  selectedPlanId: null,
  newPlan: initialNewPlan,
  info: {
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    startDate: '',
    location: '',
    language: '',
    description: '',
  },
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_ACCOUNT_TYPE':
      return {
        ...state,
        selectedAccountTypeId: action.id,
        selectedPlanId: null,
        isAddingNewPlan: false,
        newPlan: initialNewPlan,
      };
    case 'SET_PLAN':
      return {
        ...state,
        selectedPlanId: action.id,
        isAddingNewPlan: false,
        newPlan: initialNewPlan,
      };
    case 'START_ADD_NEW_PLAN':
      return {
        ...state,
        selectedPlanId: null,
        isAddingNewPlan: true,
        newPlan: initialNewPlan,
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
      return { ...state, step: action.step };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const WizardContext = createContext<{
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
} | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
}
