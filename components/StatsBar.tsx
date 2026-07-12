import { cn, CONTAINER, fontDisplay, gradientText } from "@/lib/utils";

const STATS = [
  { value: "2.4M+", label: "Workflows run monthly" },
  { value: "180+", label: "Native integrations" },
  { value: "12ms", label: "Avg. trigger latency" },
  { value: "99.98%", label: "Platform uptime" },
];
export default function StatsBar() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02]">
      <div
        className={cn(CONTAINER, "grid grid-cols-2 gap-8 py-10 sm:grid-cols-4")}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col items-center gap-1 text-center sm:items-start sm:text-left",
              i > 0 && "sm:border-l sm:border-white/5 sm:pl-8",
            )}
          >
            <span
              className="text-2xl font-bold sm:text-3xl"
              style={{ ...fontDisplay, ...gradientText }}
            >
              {s.value}
            </span>
            <span className="text-xs text-white/50 sm:text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
