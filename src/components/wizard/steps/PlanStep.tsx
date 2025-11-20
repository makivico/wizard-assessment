import { useWizard } from '../../../context/WizardContext';
import { Button } from '../../ui/Button';
import styles from './PlanStep.module.scss';

export function PlanStep() {
  const { state, dispatch } = useWizard();

  const selectedAccount = state.accountTypes.find(
    acc => acc.id === state.selectedAccountTypeId
  );

  if (!selectedAccount) {
    return <p>Please select an account type first.</p>;
  }

  const handleSelectPlan = (planId: number) => {
    dispatch({ type: 'SET_PLAN', id: planId });
  };

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
            onClick={() => handleSelectPlan(plan.id)}
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
