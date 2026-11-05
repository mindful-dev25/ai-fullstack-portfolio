// Validates contact form input and delivers it through Resend (https://resend.com).
//
// Required environment variable:
//   RESEND_API_KEY      Server-only key from the Resend dashboard.
// Optional:
//   CONTACT_FROM_EMAIL  Sender, e.g. "Portfolio <hello@yourdomain.com>". The default
//                       test sender only delivers to the Resend account's own address.

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = { name: 100, email: 254, message: 5000 };

export type ContactMessage = { name: string; email: string; message: string };
export type ContactField = keyof ContactMessage;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContactMessage(input: ContactMessage) {
  const message: ContactMessage = {
    // Collapse whitespace so a name can't add line breaks to the subject.
    name: input.name.replace(/\s+/g, " ").trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  };

  const errors: ContactErrors = {};
  if (!message.name) errors.name = "Please enter your name.";
  else if (message.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (message.email.length > LIMITS.email || !EMAIL_PATTERN.test(message.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message.message) errors.message = "Please enter a message.";
  else if (message.message.length > LIMITS.message) {
    errors.message = `Please keep your message under ${LIMITS.message} characters.`;
  }

  return { message, errors };
}

/** Returns true only when Resend accepted the email for delivery. */
export async function sendContactEmail({ name, email, message }: ContactMessage, to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set, so the message was not sent.");
    return false;
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: email, // Replying goes straight to the visitor
        subject: `Portfolio inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return true;
    console.error(`Contact form: Resend returned ${response.status}: ${await response.text()}`);
  } catch (error) {
    console.error("Contact form: could not reach Resend.", error);
  }
  return false;
}
