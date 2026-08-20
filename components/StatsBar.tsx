import { cn, CONTAINER, fontDisplay, gradientText } from "@/lib/utils";

const STATS = [
  { value: "30K+", label: "Registered Talent" },
  { value: "100+", label: "Projects Delivered" },
  { value: "₹4 Million+", label: "Total Payouts" },
  { value: "30+", label: "Happy Clients" },
];
export default function StatsBar() {
  return (
    <section className="relative bg-white/[0.02]">
      <div
        className={cn(
          CONTAINER,
          " w-auto grid grid-cols-2 gap-8 py-10 px-10 sm:grid-cols-4 ",
        )}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col items-center gap-1 text-center sm:items-center sm:text-left",
              i > 0 && "sm:border-l sm:border-white/5 sm:pl-8",
            )}
          >
            <span
              className="text-2xl font-bold sm:text-3xl"
              style={{ ...fontDisplay, color: "#001242" }}
            >
              {s.value}
            </span>
            <span className="text-xs text-shadow-gray-400 sm:text-sm">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
