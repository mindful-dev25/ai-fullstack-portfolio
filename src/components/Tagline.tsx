"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 3500;

/** Pill under the role that cycles through taglines. */
export function Tagline({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % items.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    // Changing the key restarts the fade-in for each new line.
    <p
      key={index}
      className="hero-in rounded-full border border-line bg-glass px-6 py-2 text-lg font-medium text-balance text-ink backdrop-blur-sm [animation-duration:0.5s] md:text-xl"
    >
      {items[index]}
    </p>
  );
}
