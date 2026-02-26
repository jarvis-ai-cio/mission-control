import { NextResponse } from "next/server";

const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL;
const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;

export async function POST() {
  if (!GATEWAY_URL || !GATEWAY_TOKEN) {
    return NextResponse.json(
      { error: "Gateway not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${GATEWAY_URL}/hooks/wake`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GATEWAY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "trigger: full memory sync" }),
    });

    if (!res.ok) {
      throw new Error(`Gateway returned ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
