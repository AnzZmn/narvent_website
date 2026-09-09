const ITEMS = [
  "Data annotation · Kochi",
  "Asset audit · 4 cities",
  "Field survey · Coimbatore",
  "Retail store audit · Kozhikode",
];

function Row() {
  return (
    <div className="flex gap-[26px] whitespace-nowrap pr-[26px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[rgba(25,20,40,0.5)]">
      {ITEMS.map((item) => (
        <span key={item}>&#9670; {item}</span>
      ))}
    </div>
  );
}

export function HeroTicker() {
  return (
    <div className="relative z-10 overflow-hidden border-t border-[rgba(20,16,31,0.09)] bg-[rgba(242,240,248,0.92)] py-[13px]">
      <div className="nv-ticker flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
