export function HeroCardCluster() {
  return (
    <div className="relative z-10 mx-4 mt-1.5 h-[266px] overflow-hidden">
      {/* worker id card */}
      <div className="nv-drift-a absolute left-4 top-11 w-[158px] overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
        <div className="bg-[#6d56ff] px-[11px] py-1.5 font-[Archivo] text-[11.5px] font-bold text-white">
          Narvent
        </div>
        <div className="flex flex-col items-center gap-1.5 px-[11px] pb-3.5 pt-3">
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#e9e2ff] font-[Archivo] text-[13px] font-bold text-[#3b2a8c]">
            J
          </span>
          <strong className="font-[Archivo] text-[12.5px] font-bold text-[#14101f]">Jacob U.</strong>
          <span className="font-mono text-[10px] text-[#6b6478]">#10930 &bull; KLPKD</span>
        </div>
      </div>

      {/* live check-ins */}
      <div className="nv-drift-b absolute right-3.5 top-[22px] w-[126px] rounded-[13px] bg-white px-[13px] pb-[13px] pt-3 shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#6d56ff]" />
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.14em] text-[#6b6478]">LIVE</span>
        </div>
        <div className="mt-1.5 font-[Archivo] text-[28px] font-bold leading-none tracking-[-0.03em] text-[#14101f]">
          4/5
        </div>
        <div className="mt-[5px] font-mono text-[9.5px] font-medium tracking-[0.14em] text-[#6b6478]">
          CHECK-INS
        </div>
      </div>

      {/* job card */}
      <div className="nv-drift-c absolute bottom-4 right-4 w-[206px] rounded-xl bg-white px-[13px] pb-[13px] pt-3 shadow-[0_20px_48px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#e6e2f0] pb-2">
          <span className="font-mono text-[10.5px] font-bold text-[#3b2a8c]">Job MY-240981</span>
          <span className="rounded border border-[#6d56ff] px-[5px] py-0.5 font-mono text-[7.5px] font-semibold tracking-[0.1em] text-[#6d56ff]">
            ONGOING
          </span>
        </div>
        <dl className="mt-[9px] grid grid-cols-[42px_1fr] gap-x-2.5 gap-y-1.5 font-mono text-[9.5px]">
          {[
            ["ROLE", "Field Ops"],
            ["LOC", "Kozhikode, KL"],
            ["CREW", "12 GIG TALENTS"],
          ].map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-[#9a94a8]">{label}</dt>
              <dd className="font-[Archivo] text-[10px] font-bold text-[#14101f]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
