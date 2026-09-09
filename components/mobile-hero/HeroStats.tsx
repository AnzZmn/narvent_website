const STATS = [
  { figure: "100+", label: "Clients" },
  { figure: "129", label: "Locations" },
  { figure: "5,000+", label: "Projects run" },
  { figure: "₹5M+", label: "Annual payouts" },
];

export function HeroStats() {
  return (
    <dl className="relative z-10 mt-[26px] grid grid-cols-2 gap-x-3.5 gap-y-[18px] border-t border-white/[0.08] px-5 pb-[22px] pt-[18px]">
      {STATS.map((s) => (
        <div key={s.label}>
          <dd className="font-mono text-[22px] font-semibold leading-none text-[#5694ff]">
            {s.figure}
          </dd>
          <dt className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.04em] text-[rgba(242,236,255,0.42)]">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
