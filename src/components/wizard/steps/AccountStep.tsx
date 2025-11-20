import { useWizard } from '../../../context/WizardContext';
import type { AccountTypeConfig } from '../../../types/wizard';
import { Button } from '../../ui/Button';
import styles from './AccountStep.module.scss';

export function AccountStep() {
  const { state, dispatch } = useWizard();

  const handleSelect = (account: AccountTypeConfig) => {
    dispatch({ type: 'SET_ACCOUNT_TYPE', id: account.id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {state.accountTypes.map(account => {
          const isSelected = state.selectedAccountTypeId === account.id;

          return (
            <Button
              key={account.id}
              type="button"
              variant={isSelected ? 'primary' : 'secondary'}
              onClick={() => handleSelect(account)}
            >
              {account.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
