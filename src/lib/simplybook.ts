/**
 * SimplyBook.me API client utility
 *
 * SimplyBook uses a JSON-RPC 2.0 API. This file provides helpers for
 * authenticating and making requests to the SimplyBook API from
 * Cloudflare Workers (edge runtime).
 *
 * Docs: https://simplybook.me/en/api/developer-api
 *
 * Environment variables required (set in .env.local):
 *   SIMPLYBOOK_API_KEY      – your API key
 *   SIMPLYBOOK_SECRET_KEY   – your secret key
 *   NEXT_PUBLIC_SIMPLYBOOK_COMPANY – your company login / subdomain
 */

const SIMPLYBOOK_ADMIN_API = "https://user-api.simplybook.me/admin";
const SIMPLYBOOK_LOGIN_URL = "https://user-api.simplybook.me/login";

// ---------------------------------------------------------------------------
// Auth – get a session token
// ---------------------------------------------------------------------------

interface AuthTokenResponse {
  token: string;
}

/**
 * Authenticate with SimplyBook and return a temporary session token.
 */
export async function getSimplyBookToken(): Promise<string> {
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY;
  const apiKey = process.env.SIMPLYBOOK_API_KEY;

  if (!company || !apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SIMPLYBOOK_COMPANY or SIMPLYBOOK_API_KEY env vars"
    );
  }

  const res = await fetch(SIMPLYBOOK_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "getToken",
      params: [company, apiKey],
      id: 1,
    }),
  });

  const data = (await res.json()) as { result: string };
  return data.result;
}

// ---------------------------------------------------------------------------
// Generic JSON-RPC helper
// ---------------------------------------------------------------------------

export async function simplybookRPC<T = unknown>(
  method: string,
  params: unknown[] = [],
  token?: string
): Promise<T> {
  const sessionToken = token ?? (await getSimplyBookToken());
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY!;

  const res = await fetch(SIMPLYBOOK_ADMIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Company-Login": company,
      "X-Token": sessionToken,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: 1,
    }),
  });

  const data = (await res.json()) as { result: T; error?: unknown };

  if (data.error) {
    throw new Error(`SimplyBook RPC error: ${JSON.stringify(data.error)}`);
  }

  return data.result;
}

// ---------------------------------------------------------------------------
// Convenience methods (add more as needed)
// ---------------------------------------------------------------------------

/** Get all available service categories */
export async function getEventList(token?: string) {
  return simplybookRPC("getEventList", [], token);
}

/** Get available time slots for a given date + service */
export async function getStartTimeMatrix(
  from: string,
  to: string,
  eventId: number,
  unitId?: number,
  token?: string
) {
  return simplybookRPC<Record<string, string[]>>(
    "getStartTimeMatrix",
    [from, to, eventId, unitId ?? 0, 1],
    token
  );
}

/** Create a booking */
export async function book(
  eventId: number,
  unitId: number,
  date: string,
  time: string,
  clientData: Record<string, string>,
  token?: string
) {
  return simplybookRPC(
    "book",
    [eventId, unitId, date, time, clientData],
    token
  );
}
