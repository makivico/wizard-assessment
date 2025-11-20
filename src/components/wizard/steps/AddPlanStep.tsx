import { useWizard } from '../../../context/WizardContext';
import { FormField } from '../../ui/FormField';
import styles from './AddPlanStep.module.scss';

export function AddPlanStep() {
  const { state, dispatch } = useWizard();

  const update = (payload: any) => dispatch({ type: 'UPDATE_NEW_PLAN', payload });

  return (
    <div className={styles.container}>
      <FormField
        label="Plan name"
        value={state.newPlan.name}
        placeholder="Enter plan name"
        onChange={e => update({ name: e.target.value })}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={state.newPlan.isExtraInfoRequired}
          onChange={e => update({ isExtraInfoRequired: e.target.checked })}
        />
        <span>Description is required for the plan</span>
      </label>
    </div>
  );
}
