import { motion } from 'motion/react';
import type { ReactNode, MouseEventHandler } from 'react';

interface AppButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  id?: string;
}

export function AppButton({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
  id,
}: AppButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold ' +
    'text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-[var(--color-forest)] select-none cursor-pointer ' +
    'min-h-[56px] px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-forest)] text-[var(--color-bone)]',
    secondary: 'bg-[var(--color-brown)] text-[var(--color-bone)]',
    ghost:
      'bg-transparent border border-[var(--color-border-subtle)] text-[var(--color-text-main)]',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      id={id}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.1 }}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
}
