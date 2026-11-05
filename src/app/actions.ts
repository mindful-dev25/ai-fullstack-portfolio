"use server";

import { headers } from "next/headers";
import { profile } from "@/data/resume";
import {
  sendContactEmail,
  validateContactMessage,
  type ContactErrors,
  type ContactMessage,
} from "@/lib/contact-email";

export type ContactState = {
  status: "idle" | "success" | "error";
  notice?: string;
  errors?: ContactErrors;
  values?: ContactMessage; // Restores the fields after a failed attempt
};

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, number[]>();

// Best effort: counts are per server instance and reset when it restarts.
function isRateLimited(key: string) {
  const now = Date.now();
  for (const [ip, times] of attempts) {
    const recent = times.filter((time) => now - time < RATE_WINDOW_MS);
    if (recent.length) attempts.set(ip, recent);
    else attempts.delete(ip);
  }
  const recent = attempts.get(key) ?? [];
  if (recent.length >= RATE_LIMIT) return true;
  attempts.set(key, [...recent, now]);
  return false;
}

export async function submitContactForm(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const field = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };

  // Only bots fill in this hidden field. Report success so they don't adapt.
  if (field("website")) return { status: "success", notice: "Thanks! Your message has been sent." };

  const values = { name: field("name"), email: field("email"), message: field("message") };
  const { message, errors } = validateContactMessage(values);
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      notice: `Too many messages in a short time. Please try again later or write to ${profile.email}.`,
      values,
    };
  }

  if (await sendContactEmail(message, profile.email)) {
    return { status: "success", notice: "Thanks! Your message has been sent." };
  }
  return {
    status: "error",
    notice: `Sorry, your message couldn't be sent. Please try again or write to ${profile.email}.`,
    values,
  };
}
