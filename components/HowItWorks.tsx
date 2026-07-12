import { CONTAINER, fontDisplay, fontMono } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your tools, APIs, and data sources in minutes — no code required.",
  },
  {
    number: "02",
    title: "Orchestrate",
    description:
      "Design the logic once. Narvent runs it continuously, adapting as conditions change.",
  },
  {
    number: "03",
    title: "Deploy",
    description:
      "Push to production with monitoring, retries, and rollback built in.",
  },
];
export default function HowItWorks() {
  return (
    <section id="workflow" className="relative py-24 sm:py-28 lg:py-32">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ ...fontMono, color: "var(--color-3)" }}
          >
            The process
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={fontDisplay}
          >
            From trigger to deploy in three steps
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute top-8 right-0 left-0 hidden h-px md:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--color-1), var(--color-2), var(--color-3), transparent)",
            }}
          />
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0816] text-xl font-bold"
                style={{ ...fontDisplay, color: "var(--color-2)" }}
              >
                {s.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold" style={fontDisplay}>
                {s.title}
              </h3>
              <p className="mt-3 text-white/55">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
