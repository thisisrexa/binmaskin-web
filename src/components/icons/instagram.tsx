import type { SVGProps } from 'react';

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7" />
      <path d="M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0" />
      <path d="M17 7v.01" />
    </svg>
  );
}
