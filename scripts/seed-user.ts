/**
 * Seed the initial admin user.
 * Usage: SEED_EMAIL=you@example.com SEED_PASSWORD=secret npx tsx scripts/seed-user.ts
 */
import { auth } from "../lib/auth";

const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;
const name = process.env.SEED_NAME ?? "Chuka";

if (!email || !password) {
  console.error("Set SEED_EMAIL and SEED_PASSWORD env vars before running.");
  process.exit(1);
}

try {
  await auth.api.signUpEmail({ body: { email, password, name } });
  console.log(`✅ User created: ${email}`);
} catch (err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.toLowerCase().includes("already")) {
    console.log(`ℹ️  User already exists: ${email}`);
  } else {
    console.error("❌ Failed:", msg);
    process.exit(1);
  }
}
