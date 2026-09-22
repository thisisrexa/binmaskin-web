'use client';

import { cn } from 'cn';
import { Label as LabelPrimitive } from 'radix-ui';
import * as React from 'react';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(className)}
      {...props}
    />
  );
}

export { Label };
