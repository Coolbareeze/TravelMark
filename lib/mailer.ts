import "server-only";

/**
 * Minimal email/notification dispatcher for form submissions.
 *
 * If RESEND_API_KEY is set, this sends via Resend (https://resend.com — a
 * single API call, no SMTP setup). Without it, submissions are logged to
 * the server console so local development still works end-to-end. Swap in
 * your provider of choice (Postmark, SES, SendGrid...) by editing this one
 * function — no calling code needs to change.
 */
export async function sendFormNotification(subject: string, data: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@travelmark.co.uk";

  const html = `
    <h2>${subject}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${Object.entries(data)
        .filter(([key]) => key !== "website")
        .map(
          ([key, value]) =>
            `<tr><td style="font-weight:600;text-transform:capitalize">${key}</td><td>${String(value ?? "")}</td></tr>`
        )
        .join("")}
    </table>
  `;

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log(`[form-submission] ${subject}`, data);
    return { delivered: false, reason: "RESEND_API_KEY not configured — logged locally only" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Travel Mark Website <notifications@travelmark.co.uk>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend delivery failed: ${errorText}`);
  }

  return { delivered: true };
}
