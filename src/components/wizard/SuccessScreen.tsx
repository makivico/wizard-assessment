import { Button } from '../ui/Button';
import styles from './successScreen.module.scss';

interface SuccessScreenProps {
  onRestart: () => void;
}

export function SuccessScreen({ onRestart }: SuccessScreenProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <span className={styles.check}>✓</span>
        </div>

        <p className={styles.title}>User account created successfully</p>

        <Button variant="primary" onClick={onRestart}>
          Create another account
        </Button>
      </div>
    </div>
  );
}
