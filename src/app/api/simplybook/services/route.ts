/**
 * API route: GET /api/simplybook/services
 *
 * Proxies the SimplyBook getEventList call so the API key never
 * reaches the browser.  Runs on the Cloudflare Workers edge runtime.
 */
import { NextResponse } from "next/server";
import { getEventList } from "@/lib/simplybook";

export const runtime = "edge";

export async function GET() {
  try {
    const events = await getEventList();
    return NextResponse.json({ ok: true, data: events });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
