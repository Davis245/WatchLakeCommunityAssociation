import ImageScroller from "@/components/ImageScroller";
import EventsCalendar from "@/components/EventsCalendar";

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
          background: "linear-gradient(to bottom, #d1d5db 50%, #ffffff 50%)",
          marginTop: "-225px", /* pull up by half the card height */
          position: "relative",
          zIndex: 10,
          paddingBottom: "2rem",
        }}
      >
        <ImageScroller />
      </section>

      {/* About section */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            About Us
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#4b5563",
              marginBottom: "1.5rem",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#4b5563",
            }}
          >
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
            omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </section>

      {/* Events Calendar section */}
      <section
        style={{
          backgroundColor: "#f9fafb",
          padding: "5rem 2rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Events Calendar
        </h2>
        <EventsCalendar />
      </section>
    </>
  );
}
