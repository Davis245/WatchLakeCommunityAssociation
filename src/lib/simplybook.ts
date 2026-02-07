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
 *   NEXT_PUBLIC_SIMPLYBOOK_COMPANY – your company login / subdomain
 *   SIMPLYBOOK_API_KEY             – your public API key (for client/public API)
 *   SIMPLYBOOK_ADMIN_LOGIN         – your admin username (for admin API)
 *   SIMPLYBOOK_ADMIN_PASSWORD      – your admin password (for admin API)
 */

const SIMPLYBOOK_PUBLIC_API = "https://user-api.simplybook.me";
const SIMPLYBOOK_ADMIN_API = "https://user-api.simplybook.me/admin";
const SIMPLYBOOK_LOGIN_URL = "https://user-api.simplybook.me/login";

// ---------------------------------------------------------------------------
// Auth – Public API token (for read-only public data)
// ---------------------------------------------------------------------------

/**
 * Authenticate with SimplyBook public API and return a session token.
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
// Auth – Admin API token (for reading bookings, managing data)
// ---------------------------------------------------------------------------

/**
 * Authenticate with SimplyBook admin API using getUserToken.
 */
export async function getSimplyBookAdminToken(): Promise<string> {
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY;
  const login = process.env.SIMPLYBOOK_ADMIN_LOGIN;
  const password = process.env.SIMPLYBOOK_ADMIN_PASSWORD;

  if (!company || !login || !password) {
    throw new Error(
      "Missing NEXT_PUBLIC_SIMPLYBOOK_COMPANY, SIMPLYBOOK_ADMIN_LOGIN, or SIMPLYBOOK_ADMIN_PASSWORD env vars"
    );
  }

  const res = await fetch(SIMPLYBOOK_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "getUserToken",
      params: [company, login, password],
      id: 1,
    }),
  });

  const data = (await res.json()) as { result: string };
  return data.result;
}

// ---------------------------------------------------------------------------
// Generic JSON-RPC helper
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Generic JSON-RPC helpers
// ---------------------------------------------------------------------------

/** Call the public (client) API — for read-only public info */
export async function simplybookRPC<T = unknown>(
  method: string,
  params: unknown[] = [],
  token?: string
): Promise<T> {
  const sessionToken = token ?? (await getSimplyBookToken());
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY!;

  const res = await fetch(SIMPLYBOOK_PUBLIC_API, {
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

/** Call the admin API — for bookings, management, etc. */
export async function simplybookAdminRPC<T = unknown>(
  method: string,
  params: unknown[] = [],
  token?: string
): Promise<T> {
  const sessionToken = token ?? (await getSimplyBookAdminToken());
  const company = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY!;

  const res = await fetch(SIMPLYBOOK_ADMIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Company-Login": company,
      "X-User-Token": sessionToken,
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
    throw new Error(`SimplyBook admin RPC error: ${JSON.stringify(data.error)}`);
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

/** Get bookings for a date range (requires admin auth). */
export async function getBookings(
  from: string,
  to: string,
  token?: string
) {
  return simplybookAdminRPC<
    Array<{
      id: string;
      start_date: string;
      end_date: string;
      start_time: string;
      end_time: string;
      event: string;
      client: string;
      status: string;
    }>
  >(
    "getBookings",
    [
      {
        date_from: from,
        date_to: to,
        booking_type: "non_cancelled",
      },
    ],
    token
  );
}
