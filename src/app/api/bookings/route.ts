/**
 * API route: GET /api/bookings?month=2026-02
 *
 * Fetches bookings from SimplyBook for the given month and returns them
 * as "Private Event" entries (personal details stripped).
 */
import { NextRequest, NextResponse } from "next/server";
import { getBookings } from "@/lib/simplybook";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month"); // e.g. "2026-02"

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json(
      { error: "month query param required, e.g. ?month=2026-02" },
      { status: 400 }
    );
  }

  const [year, mon] = month.split("-").map(Number);
  const startDate = `${month}-01`;
  const lastDay = new Date(year, mon, 0).getDate();
  const endDate = `${month}-${String(lastDay).padStart(2, "0")}`;

  try {
    const bookings = await getBookings(startDate, endDate);

    // Strip personal info — only expose date, time, and generic title
    const events = (Array.isArray(bookings) ? bookings : []).map((b) => ({
      date: b.start_date?.split(" ")[0] ?? b.start_date,
      startTime: b.start_time ?? b.start_date?.split(" ")[1] ?? "",
      endTime: b.end_time ?? b.end_date?.split(" ")[1] ?? "",
      title: "Private Event",
    }));

    return NextResponse.json(
      { events },
      {
        headers: {
          // Cache for 60s so we don't hammer the SimplyBook API
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching bookings:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
