import styles from './button.module.scss';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...props} />
  );
}
