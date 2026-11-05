"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "@/app/actions";
import { LIMITS, type ContactField } from "@/lib/contact-email";
import { Icon } from "./icons";

const fieldClass =
  "w-full rounded-xl border border-line bg-page px-3.5 py-2.5 text-ink transition-colors placeholder:text-ink-3 focus:border-accent focus:outline-none aria-invalid:border-red-500";

const initialState: ContactState = { status: "idle" };

/** Sends the message from the server, so the visitor stays on the page. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  const fieldProps = (name: ContactField) => ({
    id: name,
    name,
    required: true,
    maxLength: LIMITS[name],
    defaultValue: state.values?.[name],
    "aria-invalid": state.errors?.[name] ? true : undefined,
    "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name: ContactField) =>
    state.errors?.[name] && (
      <p id={`${name}-error`} className="mt-1.5 text-xs text-red-500">
        {state.errors[name]}
      </p>
    );

  return (
    <form action={formAction} className="card flex h-full flex-col gap-3.5 p-5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input {...fieldProps("name")} autoComplete="name" placeholder="Your name" className={fieldClass} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
          {fieldError("email")}
        </div>
      </div>
      {/* The message box takes any spare height so the card matches the column beside it. */}
      <div className="flex grow flex-col">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          {...fieldProps("message")}
          rows={3}
          placeholder="Tell me about your project or role"
          className={`${fieldClass} grow resize-y`}
        />
        {fieldError("message")}
      </div>
      {/* Spam trap: hidden from people, but simple bots fill it in. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-on-accent transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Icon name="send" width={18} height={18} />
        {pending ? "Sending..." : "Send Message"}
      </button>
      <p
        aria-live="polite"
        className={`text-center text-sm empty:hidden ${state.status === "error" ? "text-red-500" : "text-accent"}`}
      >
        {pending ? "" : state.notice}
      </p>
    </form>
  );
}
