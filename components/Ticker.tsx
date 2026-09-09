const ITEMS = [
  "46 ROLES OPEN TODAY",
  "DATA ANNOTATION · KOCHI",
  "ASSET AUDIT · 4 CITIES",
  "FIELD SURVEY · COIMBATORE",
  "WAREHOUSE OPS · HYDERABAD",
];

export default function TickerNew() {
  return (
    <section
      id="network"
      className="overflow-hidden relative border-y border-white/[0.07] pb-3 pt-5"
    >
      <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-11 font-[family-name:var(--font-mono)] text-[16px] font-medium tracking-[0.1em] text-[#ffffff]/80">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-11">
            {item}
            <span className="text-[#6d56ff]">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
