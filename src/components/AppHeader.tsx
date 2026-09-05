import type { ReactNode } from 'react';

interface AppHeaderProps {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

/**
 * Consistent kiosk header bar.
 * - `left`  : Back button slot
 * - `title` : Page title (optional)
 * - `right` : Language toggle / Home button slot
 */
export function AppHeader({ title, left, right }: AppHeaderProps) {
  return (
    <header
      className={
        'flex items-center justify-between gap-3 px-4 py-2 ' +
        'border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]'
      }
    >
      <div className="flex min-w-[56px] items-center">{left}</div>

      {title && (
        <h1 className="flex-1 text-center text-base font-semibold text-[var(--color-text-main)] line-clamp-1">
          {title}
        </h1>
      )}

      <div className="flex min-w-[56px] items-center justify-end">{right}</div>
    </header>
  );
}
