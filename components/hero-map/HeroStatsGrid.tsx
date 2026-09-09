const STATS = [
  { figure: "5,000+", label: "Projects run" },
  { figure: "₹5M+", label: "Annual payouts" },
  { figure: "100+", label: "Clients" },
  { figure: "129", label: "Locations" },
];

export function HeroStatsGrid() {
  return (
    <dl className="relative z-10 mt-[34px] grid grid-cols-2 border-t border-[rgba(20,16,31,0.09)]">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={[
            "px-5 py-[18px] text-center",
            i % 2 === 0 ? "border-r border-[rgba(20,16,31,0.09)]" : "",
            i < 2 ? "border-b border-[rgba(20,16,31,0.09)]" : "",
          ].join(" ")}
        >
          <dd className="font-mono text-[23px] font-semibold leading-none text-[#4a34cf]">
            {s.figure}
          </dd>
          <dt className="mt-[7px] font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[rgba(25,20,40,0.45)]">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
