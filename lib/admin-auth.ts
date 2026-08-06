import "server-only";

// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `node:crypto` so this file works identically in Next.js Middleware
// (Edge runtime) and in regular server route handlers (Node runtime).

export const ADMIN_COOKIE_NAME = "travelmark_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret-change-me";
}

async function hmac(message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Sign a session token for a given admin username. */
export async function createSessionToken(username: string) {
  const signature = await hmac(username);
  return `${username}.${signature}`;
}

/** Verify a session token cookie value is valid and untampered. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [username, signature] = token.split(".");
  if (!username || !signature) return false;

  const expected = await hmac(username);
  if (expected.length !== signature.length) return false;

  // Constant-time-ish comparison (character XOR accumulation).
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Check submitted admin credentials against configured env values. */
export function checkCredentials(username: string, password: string) {
  const validUsername = process.env.ADMIN_USERNAME ?? "admin";
  const validPassword = process.env.ADMIN_PASSWORD ?? "change-me";
  return username === validUsername && password === validPassword;
}
