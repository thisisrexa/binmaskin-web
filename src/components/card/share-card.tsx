'use client';

import { useState } from 'react';

export function ShareCard({
  url,
  title,
  label,
  copied,
}: {
  url: string;
  title: string;
  label: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);

  async function share() {
    try {
      await navigator.share({ title, url });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setDone(true);
    } catch {
      setDone(false);
    }
  }

  return (
    <button
      type="button"
      className="btn w-full"
      onClick={() => {
        void share();
      }}
    >
      {done ? copied : label}
    </button>
  );
}
