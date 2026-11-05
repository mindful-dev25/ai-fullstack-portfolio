import {
  certifications,
  education,
  experience,
  featuredWork,
  profile,
  skills,
  stats,
  type SkillIcon,
} from "@/data/resume";
import { posts } from "@/data/posts";
import { ContactForm } from "./ContactForm";
import { Icon, type IconName } from "./icons";
import { PostDialog } from "./PostDialog";
import { PostMeta } from "./PostMeta";
import { Reveal } from "./Reveal";
import { RichText, Section, TagList } from "./ui";

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
      <Reveal className="card mb-8 p-6 sm:p-8">
        <h3 className="gradient-text mb-4 w-fit text-2xl font-bold">The Short Version</h3>
        <p className="mb-5 text-lg leading-relaxed text-ink-2">{profile.summary}</p>
        <p className="text-lg leading-relaxed text-ink-2">
          Expert in{" "}
          {profile.expertise.map((skill, i) => (
            <span key={skill}>
              <span className={i % 2 ? "text-accent-2" : "text-accent"}>{skill}</span>
              {i < profile.expertise.length - 2 && ", "}
              {i === profile.expertise.length - 2 && ", and "}
            </span>
          ))}
          .
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse items-center gap-1 text-center">
              <dt className="text-sm text-ink-2">{label}</dt>
              <dd className="gradient-text text-3xl font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map(({ title, icon, items }, i) => (
          <Reveal key={title} delay={(i % 2) * 80} className="card card-hover p-6">
            <div className="mb-5 flex items-center gap-4">
              <span
                className={`grid size-11 place-items-center rounded-xl ${
                  i % 2 ? "bg-accent-2/15 text-accent-2" : "bg-accent/15 text-accent"
                }`}
              >
                <Icon name={skillIcons[icon]} />
              </span>
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
            </div>
            <TagList items={items} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Reveal className="card card-hover p-6 sm:p-8">
          <span className="mb-5 grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
            <Icon name="graduation" />
          </span>
          <h3 className="mb-1 text-xl font-bold text-ink">{education.degree}</h3>
          <p className="font-semibold text-accent-2">{education.school}</p>
          <p className="mt-1 text-sm text-ink-2">{education.graduated}</p>
        </Reveal>
        <Reveal delay={80} className="card card-hover p-6 sm:p-8">
          <span className="mb-5 grid size-11 place-items-center rounded-xl bg-accent-2/15 text-accent-2">
            <Icon name="award" />
          </span>
          <h3 className="mb-3 text-xl font-bold text-ink">Certifications</h3>
          <ul className="flex flex-col gap-3">
            {certifications.map((certification) => (
              <li key={certification} className="flex gap-3 leading-relaxed text-ink-2">
                <Icon name="chevron" width={16} height={16} className="mt-1.5 shrink-0 text-accent" />
                {certification}
              </li>
            ))}
          </ul>
        </Reveal>
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
      <ol className="relative ml-2 border-l-2 border-line sm:ml-4">
        {experience.map((job, i) => (
          <li key={job.company} className={`relative pl-6 sm:pl-10 ${i < experience.length - 1 ? "pb-14" : ""}`}>
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[9px] grid size-4 place-items-center rounded-full bg-page ring-2 ring-accent"
            >
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            <Reveal>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl font-bold text-ink">{job.title}</h3>
                <p className="flex items-center gap-2 text-sm text-ink-2">
                  <Icon name="calendar" width={16} height={16} className="shrink-0" />
                  {job.period}
                </p>
              </div>
              <p className="mb-5 flex flex-wrap items-center gap-x-2 text-ink-2">
                <Icon name="briefcase" width={16} height={16} className="shrink-0 text-accent-2" />
                <span className="font-semibold text-accent-2">{job.company}</span>
                <span>· {job.location}</span>
              </p>
              <ul className="mb-6 flex flex-col gap-3">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-relaxed text-ink-2">
                    <Icon name="chevron" width={16} height={16} className="mt-1.5 shrink-0 text-accent" />
                    <span>
                      <RichText text={highlight} />
                    </span>
                  </li>
                ))}
              </ul>
              <TagList items={job.tags} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function FeaturedProjects() {
  return (
    <Section
      id="projects"
      number="03"
      title="Featured Projects"
      subtitle="Systems shipped to production, and what they changed"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredWork.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 80} className="card card-hover relative flex flex-col overflow-hidden p-6">
            <div aria-hidden="true" className="accent-gradient absolute inset-x-0 top-0 h-1" />
            <p className="gradient-text w-fit text-4xl font-bold">{item.metric}</p>
            <p className="mb-5 text-sm text-ink-2">{item.metricLabel}</p>
            <h3 className="mb-1 text-xl font-bold text-ink">{item.title}</h3>
            <p className="mb-3 text-sm font-semibold text-accent-2">{item.company}</p>
            <p className="mb-6 grow leading-relaxed text-ink-2">{item.description}</p>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80} className="card card-hover flex flex-col gap-4 p-6">
            <TagList items={post.tags} />
            <h3 className="text-xl font-bold text-ink">{post.title}</h3>
            <p className="grow leading-relaxed text-ink-2">{post.summary}</p>
            <PostMeta date={post.date} isoDate={post.isoDate} readTime={post.readTime} />
            <PostDialog post={post} />
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
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <h3 className="gradient-text w-fit text-3xl font-bold">Let&apos;s Build Something</h3>
          <p className="text-lg leading-relaxed text-ink-2">
            Whether you need agents and RAG pipelines in production, a full stack engineer to take a product from idea
            to launch, or just want to talk about LLMs, send me a note. I enjoy a good conversation.
          </p>
          <a href={`mailto:${profile.email}`} className="card card-hover flex items-center gap-4 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <Icon name="mail" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-ink-2">Email</span>
              <span className="block font-medium break-words text-ink">{profile.email}</span>
            </span>
          </a>
          <div className="card flex items-center gap-4 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-2/15 text-accent-2">
              <Icon name="pin" />
            </span>
            <span>
              <span className="block text-sm text-ink-2">Location</span>
              <span className="block font-medium text-ink">{profile.location}</span>
            </span>
          </div>
          <p className="flex items-center gap-3 rounded-2xl border border-accent/50 border-l-4 border-l-accent bg-surface p-4 text-sm text-ink-2">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
            Currently open to new opportunities
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 text-center text-sm text-ink-2 sm:px-6">
      © {profile.name}. {profile.role}.
    </footer>
  );
}
