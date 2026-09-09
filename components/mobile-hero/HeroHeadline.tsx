function SwapWord({ a, b }: { a: string; b: string }) {
  return (
    <span className="relative block py-[5px]">
      <span className="invisible">{a}</span>
      <span className="nv-word-a absolute left-0 top-[5px] text-[#5694ff]">{a}</span>
      <span className="nv-word-b absolute left-0 top-[5px] text-[#5694ff]">{b}</span>
    </span>
  );
}

export function HeroHeadline() {
  return (
    <div className="relative z-10 px-5 pt-[26px]">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5694ff]">
        India&apos;s largest frontline workforce network
      </p>

      <h1 className="mt-4 flex flex-col font-[Archivo] text-[40px] font-extrabold leading-none tracking-[-0.035em] text-white">
        <span className="nv-rise">The</span>
        <SwapWord a="WorkForce" b="Network" />
        <span className="nv-rise nv-rise-1 py-[5px]">Layer for every</span>
        <SwapWord a="Business" b="Worker" />
        <span className="nv-rise nv-rise-2 py-[5px]">Everywhere.</span>
      </h1>

      <p className="mt-5 font-[Archivo] text-[15px] leading-[1.55] text-[rgba(242,236,255,0.62)] [text-wrap:pretty]">
        AI-powered workforce infrastructure for managed staffing, gig services and enterprise
        operations from sourcing and verification to deployment, attendance and payouts.
      </p>

      <div className="mt-6 flex flex-col gap-2.5">
        <a
          href="#business"
          className="flex h-[52px] items-center justify-between rounded-lg bg-[#5694ff] px-5 font-[Archivo] text-base font-semibold text-[#0b0715] transition-colors hover:bg-[#7fb0ff]"
        >
          Hire from the pool <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href="#workers"
          className="flex h-[52px] items-center justify-between rounded-lg border border-white/[0.18] bg-[rgba(10,6,18,0.4)] px-5 font-[Archivo] text-base font-medium text-white transition-colors hover:border-white/40"
        >
          Join the talent pool <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
