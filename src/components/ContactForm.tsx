"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/resume";
import { Icon } from "./icons";

const fieldClass =
  "w-full rounded-xl border border-line bg-page px-4 py-3 text-ink transition-colors placeholder:text-ink-3 focus:border-accent focus:outline-none";

/**
 * There is no mail backend, so sending opens the visitor's email app with the
 * message filled in. Swap handleSubmit for an API call to send from the page.
 */
export function ContactForm() {
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name"));
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${name}\n${data.get("email")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-2 block font-medium text-ink">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project or role"
          className={`${fieldClass} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-glow"
      >
        <Icon name="send" width={18} height={18} />
        Send Message
      </button>
      <p aria-live="polite" className="text-center text-sm text-ink-3">
        {opened
          ? `Your email app should have opened. If not, write to ${profile.email}.`
          : "Sending opens your email app with this message filled in."}
      </p>
    </form>
  );
}
