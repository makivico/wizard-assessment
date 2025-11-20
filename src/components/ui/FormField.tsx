import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './FormField.module.scss';

interface FormFieldProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export function FormField({
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  error,
  required,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        <div className={styles.labelRow}>
          <span>{label}</span>
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
        />
        <div>{error && required && <span className={styles.error}>* {error}</span>}</div>
      </label>
    </div>
  );
}
