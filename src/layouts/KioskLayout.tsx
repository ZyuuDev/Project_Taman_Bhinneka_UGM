import type { ReactNode } from 'react';

interface KioskLayoutProps {
  children: ReactNode;
}

/**
 * Root portrait layout for the kiosk application.
 * Uses min-height: 100dvh to avoid fixed-vh quirks on kiosk browsers.
 * Safe for both short and long pages (scrollable content).
 */
export function KioskLayout({ children }: KioskLayoutProps) {
  return (
    <div
      className={
        'flex min-h-[100dvh] flex-col ' +
        'bg-[var(--color-bone)] text-[var(--color-text-main)]'
      }
    >
      {children}
    </div>
  );
}
