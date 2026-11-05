import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  number,
  title,
  subtitle,
  children,
}: {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-14 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-7 flex flex-col items-center text-center">
          <p className="mb-1 font-mono text-sm text-accent">{number}.</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
          {subtitle && <p className="mt-3 max-w-2xl text-ink-2">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-tag px-2.5 py-0.5 font-mono text-xs text-ink-2">{children}</li>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

/** Renders resume text, turning **marked** phrases into highlighted metrics. */
export function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
