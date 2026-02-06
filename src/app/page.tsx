export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to Watch Lake Community Association
      </h1>
      <p className="mt-6 text-lg text-gray-600">
        Your community hub for events, bookings, and local information.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <a
          href="/booking"
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          Book Now
        </a>
        <a
          href="#about"
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold shadow hover:bg-gray-50"
        >
          Learn More
        </a>
      </div>

      <div id="about" className="mt-20 text-left">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          The Watch Lake Community Association brings neighbours together
          through shared events, facility bookings, and community programs.
          Use our online booking system to reserve community spaces and
          sign up for upcoming events.
        </p>
      </div>
    </section>
  );
}
