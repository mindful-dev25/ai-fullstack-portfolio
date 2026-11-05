"use client";

import { Icon } from "./icons";

export function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be blocked; the theme still applies for this page view.
    }
  };

  // Both icons render and CSS shows the right one, so server and client markup
  // match regardless of the theme set before hydration.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-accent-2 transition hover:scale-105"
    >
      <Icon name="sun" className="dark:hidden" />
      <Icon name="moon" className="hidden dark:block" />
    </button>
  );
}
