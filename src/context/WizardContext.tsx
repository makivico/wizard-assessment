/* eslint-disable react-refresh/only-export-components */
//TODO: Split file in two: context and hook

// Context and provider for the multi-step wizard state management
import { createContext, useContext, useReducer, type Dispatch } from 'react';
import type { ReactNode } from 'react';
import type { WizardState, WizardAction } from '../types/wizard';
import { wizardReducer, initialState } from './wizardReducer';

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

// Custom hook for consuming wizard context
export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
}
