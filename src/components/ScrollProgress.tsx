"use client";

import { useEffect, useRef } from "react";

/** Thin indicator on the right edge showing how far down the page you are. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? root.scrollTop / scrollable : 0;
      // The thumb is 10vh tall, so travel the remaining 90vh.
      el.style.transform = `translateY(${progress * 90}vh)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="accent-gradient pointer-events-none fixed top-0 right-0 z-50 h-[10vh] w-1 rounded-full"
    />
  );
}
