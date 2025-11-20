import type { ChangeEvent } from 'react';
import styles from './FormField.module.scss';

interface FormTextAreaProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

export function FormTextArea({
  label,
  value,
  placeholder,
  onChange,
  error,
  required,
}: FormTextAreaProps) {
  const hasError = Boolean(error);

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        <div className={styles.labelRow}>
          <span>{label}</span>
        </div>
        <div>
          {hasError && required && <span className={styles.error}>* {error}</span>}
        </div>
        <textarea
          value={value}
          onChange={onChange}
          className={`${styles.textarea} ${hasError ? styles.inputError : ''}`}
          placeholder={placeholder}
          aria-invalid={hasError}
        />
      </label>
    </div>
  );
}
