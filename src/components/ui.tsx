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
    <section id={id} className="scroll-mt-16 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-col items-center text-center">
          <p className="mb-2 font-mono text-accent">{number}.</p>
          <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h2>
          <div className="accent-gradient mt-4 h-1 w-20 rounded-full" />
          {subtitle && <p className="mt-6 max-w-2xl text-lg text-ink-2">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-tag px-3 py-1 font-mono text-[0.8rem] text-ink-2">{children}</li>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
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
