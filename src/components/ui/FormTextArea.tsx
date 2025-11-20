import type { ChangeEvent } from 'react';
import styles from './FormField.module.scss';

interface FormTextAreaProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextArea({ label, value, placeholder, onChange }: FormTextAreaProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        <textarea
          value={value}
          onChange={onChange}
          className={styles.textarea}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
