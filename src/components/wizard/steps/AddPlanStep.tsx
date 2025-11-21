import { useWizard } from '../../../context/WizardContext';
import { FormField } from '../../ui/FormField';
import type { NewPlanDraft } from '../../../types/wizard';
import styles from './AddPlanStep.module.scss';

// Step for adding a new plan:
export function AddPlanStep() {
  const { state, dispatch } = useWizard();

  const update = (payload: Partial<NewPlanDraft>) =>
    dispatch({ type: 'UPDATE_NEW_PLAN', payload });

  return (
    <div className={styles.container}>
      <FormField
        label="Plan name"
        value={state.newPlan.name}
        placeholder="Enter plan name"
        onChange={e => update({ name: e.target.value })}
      />
      {/* Checkbox for requiring description */}
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
