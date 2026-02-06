import type { Metadata } from "next";
import SimplyBookWidget from "@/components/SimplyBookWidget";

export const metadata: Metadata = {
  title: "Book | Watch Lake Community Association",
  description: "Reserve a community space or sign up for an upcoming event.",
};

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Book a Space or Event</h1>
      <p className="mt-2 text-gray-600">
        Use the calendar below to find availability and make a reservation.
      </p>

      <div className="mt-8">
        <SimplyBookWidget />
      </div>
    </section>
  );
}
