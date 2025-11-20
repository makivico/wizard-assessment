import { useEffect } from 'react';
import { getSelectedAccount } from '../../../utils/wizardUtils';
import { useWizard } from '../../../context/WizardContext';
import { Button } from '../../ui/Button';
import styles from './PlanStep.module.scss';

export function PlanStep() {
  const { state, dispatch } = useWizard();

  useEffect(() => {
    const acct = getSelectedAccount(state);
    const valid = acct?.plan.some(p => p.id === state.selectedPlanId);
    if (!valid && state.selectedPlanId !== null) {
      dispatch({ type: 'SET_ACCOUNT_TYPE', id: state.selectedAccountTypeId! });
    }
  }, [state.selectedAccountTypeId]);

  const selectedAccount = state.accountTypes.find(
    acc => acc.id === state.selectedAccountTypeId
  );

  if (!selectedAccount) {
    return <p>Please select an account type first.</p>;
  }

  const selectPlan = (id: number) => () => dispatch({ type: 'SET_PLAN', id: Number(id) });

  const handleAddNew = () => {
    dispatch({ type: 'START_ADD_NEW_PLAN' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {selectedAccount.plan.map(plan => (
          <Button
            key={plan.id}
            variant={
              !state.isAddingNewPlan && state.selectedPlanId === plan.id
                ? 'primary'
                : 'secondary'
            }
            onClick={selectPlan(plan.id)}
          >
            {plan.name}
          </Button>
        ))}

        <Button
          variant={state.isAddingNewPlan ? 'primary' : 'secondary'}
          onClick={handleAddNew}
        >
          Add new
        </Button>
      </div>
    </div>
  );
}
