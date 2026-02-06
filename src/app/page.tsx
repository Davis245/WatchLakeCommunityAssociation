import ImageScroller from "@/components/ImageScroller";

export default function Home() {
  return (
    <>
      {/* Hero — extra bottom padding to make room for the overlapping scroller */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d1d5db",
          paddingTop: "225px", /* match bottom padding to keep text centered */
          paddingBottom: "225px", /* half the card height (450/2) */
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          Watch Lake Green Lake
          <br />
          Community Association
        </h1>
      </section>

      {/* Horizontal image scroller — overlaps the hero by 50% of card height */}
      <section
        style={{
          backgroundColor: "transparent",
          marginTop: "-225px", /* pull up by half the card height */
          position: "relative",
          zIndex: 10,
          paddingBottom: "2rem",
        }}
      >
        <ImageScroller />
      </section>
    </>
  );
}
