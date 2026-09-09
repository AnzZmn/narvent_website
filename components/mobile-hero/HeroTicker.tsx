const ITEMS = [
  "46 roles open today",
  "Data annotation · Kochi",
  "Asset audit · 4 cities",
  "Field survey · Coimbatore",
];

function Row() {
  return (
    <div className="flex gap-[26px] whitespace-nowrap pr-[26px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[rgba(242,236,255,0.5)]">
      {ITEMS.map((item) => (
        <span key={item}>&#9670; {item}</span>
      ))}
    </div>
  );
}

export function HeroTicker() {
  return (
    <div className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[rgba(10,6,18,0.5)] py-[13px]">
      <div className="nv-ticker flex w-max">
        <Row />
        <Row aria-hidden="true" />
      </div>
    </div>
  );
}
