type Stat = { value: string; label: string; note: string };

const STATS: Stat[] = [
  { value: "30K+", label: "Registered talent", note: "Across South India" },
  {
    value: "5,000+",
    label: "Successfull projects",
    note: "Delivered end-to-end",
  },
  { value: "100+", label: "Trusted clients", note: "Enterprise and AI teams" },
  { value: "₹6M +", label: "Annual payouts", note: "Statutory handled by us" },
];

export default function BusinessStats() {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-[18px] gap-y-5 border-t border-[#191428]/10 pt-6 opacity-0 [animation:nv-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_0.32s_both]">
      {STATS.map((s) => (
        <div key={s.label}>
          <dt className="var(--font-display) text-[21px] font-semibold leading-none tracking-[0.02em] text-[#4a34cf] text-center">
            {s.value}
          </dt>
          <dd className="mt-[7px] text-[12.5px] font-semibold text-[#191428] text-center">
            {s.label}
          </dd>
          <dd className="mt-0.5 text-[11px] text-[#191428]/45 text-center">
            {s.note}
          </dd>
        </div>
      ))}
    </dl>
  );
}
