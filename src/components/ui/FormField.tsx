import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './FormField.module.scss';

interface FormFieldProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
