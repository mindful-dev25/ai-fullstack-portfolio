"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/resume";
import { Icon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the link for whichever section crosses the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          else if (entry.target.id === "about" && window.scrollY < 200) setActive("");
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const { href } of navLinks) {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-glass backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label={`${profile.name}, back to top`} className="gradient-text text-2xl font-bold">
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === href ? "true" : undefined}
                className={`font-medium transition-colors hover:text-accent ${
                  active === href ? "text-accent" : "text-ink-2"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-glow sm:flex"
          >
            <Icon name="download" width={18} height={18} />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-medium text-ink-2 hover:bg-surface hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resumeUrl} className="block rounded-lg px-3 py-2.5 font-semibold text-accent">
              Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
