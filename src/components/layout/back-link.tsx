'use client';

import type { ReactNode } from 'react';

import { useEffect } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

let currentPath: string | null = null;
let hasInternalHistory = false;

export function NavigationHistory() {
  const pathname = usePathname();

  useEffect(() => {
    if (currentPath !== null && currentPath !== pathname) {
      hasInternalHistory = true;
    }

    currentPath = pathname;
  }, [pathname]);

  return null;
}

export function BackLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (!hasInternalHistory) return;
        event.preventDefault();
        window.history.back();
      }}
    >
      {children}
    </Link>
  );
}
