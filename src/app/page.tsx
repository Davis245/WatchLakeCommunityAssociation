export default function Home() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d1d5db",
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
  );
}
