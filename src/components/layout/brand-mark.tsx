import Image from 'next/image';

import { cn } from '@/lib/utils';

const MARKS = {
  wordmark: {
    src: '/brand/wordmark.svg',
    alt: 'Binmaskin Solutions',
    width: 480,
    height: 52,
  },
  symbol: {
    src: '/brand/symbol.svg',
    alt: '',
    width: 232,
    height: 232,
  },
} as const;

export function BrandMark({
  variant = 'wordmark',
  className,
  priority = false,
}: {
  variant?: keyof typeof MARKS;
  className?: string;
  priority?: boolean;
}) {
  const mark = MARKS[variant];
  return (
    <Image
      src={mark.src}
      alt={mark.alt}
      width={mark.width}
      height={mark.height}
      className={cn('size-auto', className)}
      priority={priority}
      unoptimized
    />
  );
}
