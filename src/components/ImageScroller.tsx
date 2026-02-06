"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Horizontal auto-scrolling image carousel.
 * Fades in when the user scrolls it into view.
 * Accepts an array of image sources; defaults to colour placeholders.
 */
export default function ImageScroller({
  images,
}: {
  images?: { src: string; alt: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const defaultImages = [
    { src: "", alt: "Photo 1", color: "#9ca3af" },
    { src: "", alt: "Photo 2", color: "#9ca3af" },
    { src: "", alt: "Photo 3", color: "#9ca3af" },
    { src: "", alt: "Photo 4", color: "#9ca3af" },
    { src: "", alt: "Photo 5", color: "#9ca3af" },
    { src: "", alt: "Photo 6", color: "#9ca3af" },
    { src: "", alt: "Photo 7", color: "#9ca3af" },
    { src: "", alt: "Photo 8", color: "#9ca3af" },
  ];

  const items = images
    ? images.map((img) => ({ ...img, color: "#888" }))
    : defaultImages;

  /* Auto-scroll: slowly move the container to the right, loop back */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let speed = 0.5; // px per frame

    const step = () => {
      if (!el) return;
      el.scrollLeft += speed;

      // If we've scrolled past half (the duplicated set), reset silently
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => {
      speed = 0;
    };
    const resume = () => {
      speed = 0.5;
    };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  /* Fade in when scrolled down, fade out when back at top */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Duplicate items so the scroll loops seamlessly
  const allItems = [...items, ...items];

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -350 : 350;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left arrow */}
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
        style={{
          flex: "0 0 7.5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "15rem",
          color: "#111827",
          height: "450px",
        }}
      >
        &#8249;
      </button>

      {/* Card scroller — 85% width */}
      <div
        ref={scrollRef}
        style={{
          flex: "0 0 85%",
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          padding: "2rem 0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide scrollbar for Webkit */}
        <style>{`
          .image-scroller::-webkit-scrollbar { display: none; }
        `}</style>

      {allItems.map((item, i) => (
        <div
          key={i}
          style={{
            flex: "0 0 338px",
            height: "450px",
            borderRadius: "0",
            backgroundColor: item.color,
            backgroundImage: item.src ? `url(${item.src})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#d1d5db",
              fontSize: "1.125rem",
              fontWeight: 500,
            }}
          >
            {item.alt}
          </span>
        </div>
      ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
        style={{
          flex: "0 0 7.5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "15rem",
          color: "#111827",
          height: "450px",
        }}
      >
        &#8250;
      </button>
    </div>
  );
}
