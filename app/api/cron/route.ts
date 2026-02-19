import { NextResponse } from "next/server";

const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL!;
const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN!;

export async function GET() {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/cron/jobs`, {
      headers: { Authorization: `Bearer ${GATEWAY_TOKEN}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Gateway returned ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch cron jobs" }, { status: 502 });
  }
}
