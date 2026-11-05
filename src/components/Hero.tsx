import { profile } from "@/data/resume";
import { Icon } from "./icons";
import { NeuralCanvas } from "./NeuralCanvas";

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pt-20 pb-24 sm:px-6"
    >
      {/* Decorative orbit rings and glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="absolute aspect-square w-[min(92vw,44rem)] rounded-full bg-accent opacity-5" />
        <svg viewBox="0 0 1000 1000" className="absolute w-[max(115vw,70rem)] max-w-none" fill="none">
          <g className="orbit orbit-slow">
            <ellipse cx="500" cy="500" rx="345" ry="330" stroke="var(--accent)" strokeOpacity=".2" strokeWidth="3" />
          </g>
          <g className="orbit orbit-medium">
            <ellipse cx="500" cy="500" rx="400" ry="240" stroke="var(--accent-2)" strokeOpacity=".16" strokeWidth="2.5" />
          </g>
          <g className="orbit orbit-reverse">
            <ellipse cx="500" cy="500" rx="300" ry="440" stroke="var(--accent)" strokeOpacity=".1" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <NeuralCanvas className="pointer-events-none absolute inset-x-0 top-1/2 h-[min(62svh,36rem)] w-full -translate-y-[42%]" />

      <div className="relative flex flex-col items-center text-center">
        <p className="hero-in mb-4 font-mono text-accent">&lt;Hello World /&gt;</p>
        <h1 className="hero-in mb-4 text-5xl font-bold tracking-tight text-ink [animation-delay:100ms] sm:text-7xl lg:text-8xl">
          I&apos;m{" "}
          <span className="shimmer-text">
            {first} {rest.join(" ")}
          </span>
        </h1>
        <p className="hero-in mb-6 text-xl font-medium text-ink [animation-delay:200ms] sm:text-3xl">{profile.role}</p>
        <p className="hero-in mb-9 rounded-full border border-line bg-glass px-6 py-2.5 text-base font-medium text-ink text-balance backdrop-blur-sm [animation-delay:300ms] sm:text-xl">
          {profile.tagline}
        </p>
        <div className="hero-in flex flex-wrap justify-center gap-4 [animation-delay:400ms]">
          <a
            href="#contact"
            className="rounded-xl bg-accent px-7 py-3.5 font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            className="rounded-xl border-2 border-accent bg-glass px-7 py-3.5 font-semibold text-ink backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-accent/10"
          >
            View Projects
          </a>
        </div>
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.name}`}
          className="hero-in mt-8 grid size-11 place-items-center rounded-full border border-line bg-glass text-ink-2 backdrop-blur-sm transition [animation-delay:500ms] hover:text-accent"
        >
          <Icon name="mail" />
        </a>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="bob absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-2 transition-colors hover:text-accent"
      >
        <Icon name="arrowDown" />
      </a>
    </section>
  );
}
