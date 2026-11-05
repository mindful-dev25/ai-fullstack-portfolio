import { profile } from "@/data/resume";
import { Icon } from "./icons";
import { NeuralCanvas } from "./NeuralCanvas";
import { Tagline } from "./Tagline";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pt-20 pb-24 sm:px-6"
    >
      {/* Decorative backdrop. Everything is sized from the same base as NeuralCanvas:
          min(125vw, 102svh), so it scales with screen height and fits on phones. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="absolute aspect-square w-[min(78vw,62svh)] rounded-full bg-accent opacity-[0.08]" />
        <svg viewBox="0 0 1000 1000" className="absolute w-[min(125vw,102svh)] max-w-none" fill="none">
          <g className="orbit orbit-slow">
            <ellipse cx="500" cy="470" rx="375" ry="360" stroke="var(--accent)" strokeOpacity=".62" strokeWidth="4.5" />
          </g>
          <g className="orbit orbit-medium">
            <ellipse
              cx="505"
              cy="445"
              rx="445"
              ry="320"
              transform="rotate(-28 505 445)"
              stroke="var(--accent-2)"
              strokeOpacity=".48"
              strokeWidth="3.5"
            />
          </g>
          <g className="orbit orbit-reverse">
            <ellipse
              cx="480"
              cy="530"
              rx="465"
              ry="400"
              transform="rotate(65 480 530)"
              stroke="var(--accent)"
              strokeOpacity=".55"
              strokeWidth="2.5"
            />
          </g>
        </svg>
        <NeuralCanvas className="absolute inset-0 size-full" />
        <div className="hero-fade absolute inset-0" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <p className="hero-in mb-4 font-mono text-sm text-accent md:text-base">&lt;Hello World /&gt;</p>
        <h1 className="hero-in mb-4 text-5xl font-bold tracking-tight text-ink [animation-delay:100ms] md:text-7xl lg:text-8xl">
          I&apos;m <span className="shimmer-text">{profile.name}</span>
        </h1>
        <p className="hero-in mb-6 text-xl font-medium text-ink [animation-delay:200ms] md:text-2xl lg:text-3xl">
          {profile.role}
        </p>
        <div className="hero-in mb-10 flex min-h-12 items-center justify-center [animation-delay:300ms]">
          <Tagline items={profile.taglines} />
        </div>
        <div className="hero-in mb-12 flex flex-wrap justify-center gap-4 [animation-delay:400ms]">
          <a
            href="#contact"
            className="rounded-xl border-2 border-accent bg-accent px-8 py-3.5 font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            className="rounded-xl border-2 border-accent px-8 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-accent/10"
          >
            View Projects
          </a>
        </div>
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.name}`}
          className="hero-in grid size-11 place-items-center rounded-full border border-line text-ink-2 transition [animation-delay:500ms] hover:text-accent"
        >
          <Icon name="mail" />
        </a>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="bob absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-3 transition-colors hover:text-accent"
      >
        <Icon name="arrowDown" width={24} height={24} />
      </a>
    </section>
  );
}
