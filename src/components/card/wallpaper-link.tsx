'use client';

import { useEffect, useState } from 'react';

import sizes from '@/lib/wallpaper-sizes.json';

const SIZES = sizes.sizes.map(([w, h]) => ({ w, h }));
const DESKTOP = { w: sizes.desktop[0], h: sizes.desktop[1] };

function pick(w: number, h: number) {
  const ratio = h / w;
  let best = SIZES[0];
  let bestScore = Number.POSITIVE_INFINITY;

  for (const s of SIZES) {
    const score = Math.abs(s.h / s.w - ratio) + Math.abs(s.w - w) / 10000;

    if (score < bestScore) {
      bestScore = score;
      best = s;
    }
  }

  return best;
}

export function WallpaperLink({
  base,
  label,
}: {
  base: string;
  label: string;
}) {
  const [href, setHref] = useState(`${base}-${DESKTOP.w}x${DESKTOP.h}.png`);

  useEffect(() => {
    const w = window.screen.width;
    const h = window.screen.height;
    const size = Math.min(w, h) < 820 ? pick(w, h) : DESKTOP;
    setHref(`${base}-${size.w}x${size.h}.png`);
  }, [base]);

  return (
    <a href={href} download className="btn w-full">
      {label}
    </a>
  );
}
