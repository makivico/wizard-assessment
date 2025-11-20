import { useWizard } from '../../../context/WizardContext';
import { FormField } from '../../ui/FormField';
import { FormTextArea } from '../../ui/FormTextArea';
import styles from './InfoStep.module.scss';
import { requiresExtraInfo } from '../../../utils/wizardUtils';

export function InfoStep() {
  const { state, dispatch } = useWizard();

  const handleChange = (field: keyof typeof state.info) => (e: any) => {
    dispatch({
      type: 'SET_INFO_FIELD',
      field,
      value: e.target.value,
    });
  };

  const descriptionRequired = requiresExtraInfo(state);
  const descriptionMissing =
    descriptionRequired && state.info.description.trim().length === 0;

  return (
    <div className={styles.container}>
      <FormField
        label="First name:"
        value={state.info.firstName}
        placeholder="First name"
        onChange={handleChange('firstName')}
      />

      <FormField
        label="Last name:"
        value={state.info.lastName}
        placeholder="Last name"
        onChange={handleChange('lastName')}
      />

      <FormField
        type="text"
        label="Age:"
        value={state.info.age}
        placeholder="Age"
        onChange={handleChange('age')}
      />

      <FormField
        type="email"
        label="Email:"
        value={state.info.email}
        placeholder="Email"
        onChange={handleChange('email')}
      />

      <FormField
        type="date"
        label="Start date:"
        value={state.info.startDate}
        onChange={handleChange('startDate')}
      />

      <FormField
        label="Location:"
        value={state.info.location}
        placeholder="Location"
        onChange={handleChange('location')}
      />

      <FormField
        label="Language:"
        value={state.info.language}
        placeholder="Language"
        onChange={handleChange('language')}
      />

      <FormTextArea
        label="Description:"
        value={state.info.description}
        placeholder="Type the description..."
        onChange={handleChange('description')}
        aria-invalid={descriptionMissing}
      />
      {descriptionMissing && (
        <div role="alert" style={{ color: 'var(--danger, #c93838)', marginTop: 8 }}>
          Description is required for the selected plan.
        </div>
      )}
    </div>
  );
}
