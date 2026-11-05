"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { experience } from "@/data/resume";
import { Icon } from "./icons";
import { RichText, TagList } from "./ui";

/** One job at a time: a company list beside the selected job's details. */
export function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Standard tab keyboard support: arrows move between jobs, Home/End jump.
  const onKeyDown = (event: KeyboardEvent) => {
    const last = experience.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-6">
      <div
        role="tablist"
        aria-label="Jobs"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {experience.map((job, i) => (
          <button
            key={job.company}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={(event) => {
              setActive(i);
              event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            className={`shrink-0 cursor-pointer rounded-xl border px-4 py-2.5 text-left whitespace-nowrap transition-colors lg:whitespace-normal ${
              i === active
                ? "border-accent bg-surface shadow-sm"
                : "border-transparent hover:border-line hover:bg-surface"
            }`}
          >
            <span className={`block font-semibold ${i === active ? "text-accent" : "text-ink"}`}>{job.company}</span>
            <span className="block text-sm text-ink-2">{job.period}</span>
          </button>
        ))}
      </div>

      {/* On desktop the panels share one grid cell, so switching jobs doesn't
          move the page: the tallest job sets the height. */}
      <div className="grid">
        {experience.map((job, i) => (
          <div
            key={job.company}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            className={`card p-5 sm:p-6 lg:[grid-area:1/1] ${i === active ? "" : "hidden lg:invisible lg:block"}`}
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-bold text-ink sm:text-2xl">{job.title}</h3>
              <p className="flex items-center gap-1.5 text-sm text-ink-2">
                <Icon name="pin" width={15} height={15} className="shrink-0" />
                {job.location}
              </p>
            </div>
            <ul className="mb-5 flex flex-col gap-2.5">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                  <Icon name="chevron" width={15} height={15} className="mt-1.5 shrink-0 text-accent" />
                  <span>
                    <RichText text={highlight} />
                  </span>
                </li>
              ))}
            </ul>
            <TagList items={job.tags} />
          </div>
        ))}
      </div>
    </div>
  );
}
