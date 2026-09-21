import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-6 flex items-center gap-3.5 text-[0.6875rem] font-normal tracking-[0.22em] text-accent uppercase",
        "before:h-px before:w-9 before:shrink-0 before:bg-accent/60 before:content-['']",
        "ar:text-[0.8125rem] ar:tracking-normal ar:normal-case",
        className,
      )}
    >
      {children}
    </p>
  );
}
