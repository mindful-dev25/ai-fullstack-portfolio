import { featuredProjects, profile, skills, socials, stats, type SkillIcon } from "@/data/resume";
import { posts } from "@/data/posts";
import { ContactForm } from "./ContactForm";
import { ExperienceTabs } from "./ExperienceTabs";
import { Icon, type IconName } from "./icons";
import { PostDialog } from "./PostDialog";
import { PostMeta } from "./PostMeta";
import { Reveal } from "./Reveal";
import { Section, TagList } from "./ui";

const skillIcons: Record<SkillIcon, IconName> = {
  code: "code",
  server: "server",
  brain: "brain",
  database: "database",
  layout: "layout",
  cloud: "cloud",
};

export function About() {
  return (
    <Section id="about" number="01" title="About Me">
      <Reveal className="card mb-5 grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <p className="self-center leading-relaxed text-ink-2">{profile.summary}</p>
        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end gap-0.5 text-center lg:justify-center">
              <dt className="text-xs text-ink-2">{label}</dt>
              <dd className="gradient-text mx-auto w-fit text-2xl font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, icon, items }, i) => (
          <Reveal key={title} delay={(i % 3) * 60} className="card card-hover p-4">
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`grid size-8 place-items-center rounded-lg ${
                  i % 2 ? "bg-accent-2/15 text-accent-2" : "bg-accent/15 text-accent"
                }`}
              >
                <Icon name={skillIcons[icon]} width={17} height={17} />
              </span>
              <h3 className="font-semibold text-ink">{title}</h3>
            </div>
            <TagList items={items} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      number="02"
      title="Experience"
      subtitle="From distributed backends at Spotify to applied AI at Blackboard"
    >
      <Reveal>
        <ExperienceTabs />
      </Reveal>
    </Section>
  );
}

export function FeaturedProjects() {
  return (
    <Section
      id="projects"
      number="03"
      title="Featured Projects"
      subtitle="A selection of AI-powered applications and developer tools I've built"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 60} className="card card-hover relative flex flex-col overflow-hidden p-5">
            <div aria-hidden="true" className="accent-gradient absolute inset-x-0 top-0 h-1" />
            <p className="mb-3 w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">Featured</p>
            <h3 className="mb-2 text-lg leading-snug font-bold text-ink">{item.title}</h3>
            <p className="mb-2 text-sm leading-relaxed text-ink-2">{item.description}</p>
            <p className="mb-4 grow text-sm leading-relaxed text-ink-2">{item.impact}</p>
            <TagList items={item.tags} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Blog() {
  return (
    <Section
      id="blog"
      number="04"
      title="Blog & Insights"
      subtitle="Lessons from shipping AI systems to production"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60} className="card card-hover flex flex-col gap-3 p-5">
            <TagList items={post.tags} />
            <h3 className="text-lg leading-snug font-bold text-ink">{post.title}</h3>
            <p className="grow text-sm leading-relaxed text-ink-2">{post.summary}</p>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <PostMeta date={post.date} isoDate={post.isoDate} readTime={post.readTime} />
              <PostDialog post={post} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      number="05"
      title="Get In Touch"
      subtitle="Have a project in mind or an AI engineering role to discuss? I'd love to hear about it."
    >
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
        <Reveal className="flex flex-col gap-3">
          <h3 className="gradient-text w-fit text-2xl font-bold">Let&apos;s Build Something</h3>
          <p className="leading-relaxed text-ink-2">
            Whether you need agents and RAG pipelines in production, a full stack engineer to take a product from idea
            to launch, or just want to talk about LLMs, send me a note. I enjoy a good conversation.
          </p>
          <a href={`mailto:${profile.email}`} className="card card-hover flex items-center gap-3 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
              <Icon name="mail" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-ink-2">Email</span>
              <span className="block font-medium break-words text-ink">{profile.email}</span>
            </span>
          </a>
          <div className="card flex items-center gap-3 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-2/15 text-accent-2">
              <Icon name="pin" />
            </span>
            <span>
              <span className="block text-xs text-ink-2">Location</span>
              <span className="block font-medium text-ink">{profile.location}</span>
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {socials.map(({ label, handle, href, icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-3 p-3"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-lg ${
                    i % 2 ? "bg-accent-2/15 text-accent-2" : "bg-accent/15 text-accent"
                  }`}
                >
                  <Icon name={icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-ink-2">{label}</span>
                  <span className="block font-medium break-words text-ink">{handle}</span>
                </span>
              </a>
            ))}
          </div>
          <p className="flex items-center gap-3 rounded-2xl border border-accent/50 border-l-4 border-l-accent bg-surface p-3 text-sm text-ink-2">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
            Currently open to new opportunities
          </p>
        </Reveal>
        <Reveal delay={60}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

// A fixed value: Cache Components doesn't allow new Date() in a prerendered page.
const COPYRIGHT_YEAR = 2026;

const footerLinkClass =
  "block rounded-lg border border-line bg-glass p-2 text-ink-2 backdrop-blur-sm transition-all duration-300 hover:text-accent hover:shadow-glow";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="gradient-text text-xl font-bold">{profile.initials}</span>
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-ink-3">
            © {COPYRIGHT_YEAR} {profile.name}. Built with
            <Icon name="heart" width={14} height={14} className="fill-current text-pink-500" />
            <span className="sr-only">love</span>
            and React.
          </p>
        </div>
        <ul className="flex items-center gap-4">
          {socials.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={footerLinkClass}
              >
                <Icon name={icon} />
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={footerLinkClass}>
              <Icon name="mail" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
