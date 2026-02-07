"use client";

import { useSimplyBookPopup } from "@/hooks/useSimplyBookPopup";

export default function BookingCards() {
  const openBooking = useSimplyBookPopup();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
        width: "80vw",
        margin: "0 auto",
      }}
    >
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0.75rem",
            padding: "2.5rem 1.5rem",
            minHeight: "330px",
          }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Private Event {n}
          </span>

          <button
            onClick={openBooking}
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
