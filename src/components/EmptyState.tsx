import type { ReactNode } from 'react';
import { useLanguage } from '../context/useLanguage';

interface EmptyStateProps {
  icon?: ReactNode;
  title: { id: string; en: string };
  description: { id: string; en: string };
  action?: ReactNode;
}

/**
 * Reusable empty state component with full bilingual support.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && <div className="mb-6 text-[var(--color-border-subtle)]">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold text-[var(--color-text-main)]">
        {title[language]}
      </h3>
      <p className="max-w-md text-[var(--color-text-muted)]">
        {description[language]}
      </p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
