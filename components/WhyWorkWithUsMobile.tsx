"use client";

import { useRef, useState } from "react";

type Reason = {
  key: string;
  path: string;
  kicker: string;
  title: string;
  desc: string;
};

const REASONS: Reason[] = [
  {
    key: "speed",
    path: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18",
    kicker: "Speed",
    title: "Crews on site in days, not quarters",
    desc: "Tell us the scope and we source, verify and brief in parallel rather than in sequence, so the first shift runs while a tender would still be open.",
  },
  {
    key: "trust",
    path: "M12 3l7 3v6c0 4-3 6.6-7 9-4-2.4-7-5-7-9V6zM9 12l2 2 4-4",
    kicker: "Trust",
    title: "Every worker verified before day one",
    desc: "Identity, documents and role eligibility are checked digitally and stored against the deployment, so the audit trail is ready before anyone asks for it.",
  },
  {
    key: "visibility",
    path: "M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6m10 2.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8",
    kicker: "Visibility",
    title: "Watch the work as it happens",
    desc: "Live attendance, geo-tagged proof of task and shift-level status across every site in one dashboard. You see exactly what our ops team sees.",
  },
  {
    key: "reach",
    path: "M9 20l-6 2V7l6-2m0 15 6 2m-6-2V5m6 17 6-2V5l-6 2m0 15V7m0 0L9 5",
    kicker: "Reach",
    title: "One partner from metro to tier 3",
    desc: "The same contract covers every location we operate in, so a pilot expands into new cities without onboarding a new supplier for each one.",
  },
  {
    key: "compliance",
    path: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
    kicker: "Compliance",
    title: "One invoice, statutory handled",
    desc: "Wages, statutory contributions and consolidated billing sit with us. Your finance team receives a single monthly invoice per deployment.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function WhyWorkWithUsMobile() {
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const active = REASONS[index];

  const pick = (n: number) => {
    setIndex(n);
    const rail = railRef.current;
    const tile = rail?.children[n] as HTMLElement | undefined;
    if (rail && tile) {
      rail.scrollTo({ left: tile.offsetLeft - rail.offsetLeft - 20, behavior: "smooth" });
    }
  };

  return (
    <section
      data-screen-label="Why work with us · phone, light"
      className="relative flex h-svh flex-col overflow-hidden bg-[#faf9fd] font-[Archivo,system-ui,sans-serif]"
    >
      {/* ambient wash */}
      <div className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,86,255,0.24),rgba(109,86,255,0)_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(109,86,255,0.24),rgba(109,86,255,0)_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_40%_at_50%_26%,#ffffff_0%,rgba(250,249,253,0.84)_56%,rgba(250,249,253,0)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex shrink-0 flex-col items-center gap-1.5 px-5 pb-4 pt-[26px]">
          <h2 className="m-0 text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#4a34cf]">
            Why work with us?
          </h2>
          <p className="m-0 text-[12.5px] font-semibold leading-snug text-[#191428]/55">
            Five reasons enterprises stay with Narvent
          </p>
        </header>

        {/* reason rail */}
        <div
          ref={railRef}
          className="flex shrink-0 snap-x snap-mandatory gap-2.5 overflow-x-auto overflow-y-hidden px-5 pb-3.5 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REASONS.map((r, n) => {
            const on = n === index;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => pick(n)}
                className={[
                  "flex shrink-0 basis-[148px] snap-center cursor-pointer flex-col gap-2 rounded-2xl border px-[13px] pb-[13px] pt-3 text-left transition-all duration-300",
                  on
                    ? "border-[#4a34cf]/30 bg-[#4a34cf]/[0.07] shadow-[0_10px_24px_rgba(74,52,207,0.16)]"
                    : "border-[#141020]/10 bg-white/80 shadow-[0_6px_16px_rgba(58,44,110,0.06)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full transition-colors duration-300",
                    on ? "bg-[#4a34cf]" : "bg-[#4a34cf]/10",
                  ].join(" ")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke={on ? "#ffffff" : "#4a34cf"}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={r.path} />
                  </svg>
                </span>
                <span
                  className={[
                    "font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em]",
                    on ? "text-[#4a34cf]" : "text-[#191428]/40",
                  ].join(" ")}
                >
                  {r.kicker}
                </span>
                <span
                  className={[
                    "text-[12.5px] font-semibold leading-[1.32]",
                    on ? "text-[#191428]" : "text-[#191428]/60",
                  ].join(" ")}
                >
                  {r.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        <div className="relative mx-4 mb-[18px] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-[#141020]/10 bg-white/90 px-5 pb-[18px] pt-5 shadow-[0_14px_34px_rgba(58,44,110,0.1)] backdrop-blur-sm">
          <div className="pointer-events-none absolute -right-16 -top-16 h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(74,52,207,0.09),rgba(74,52,207,0)_70%)]" />

          <div className="flex shrink-0 items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#191428]/40">
            <span>For business</span>
            <span>
              {pad(index + 1)} / {pad(REASONS.length)}
            </span>
          </div>

          <div key={active.key} className="mt-[22px] shrink-0 motion-safe:animate-[fadeUp_0.42s_cubic-bezier(0.16,1,0.3,1)_both]">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a34cf]">
              {active.kicker}
            </div>
            <h3 className="mt-2.5 text-[23px] font-bold leading-[1.16] tracking-[-0.025em] text-[#191428] [text-wrap:pretty]">
              {active.title}
            </h3>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-[#191428]/60 [text-wrap:pretty]">
              {active.desc}
            </p>
          </div>

          <div className="mt-[18px] flex shrink-0 gap-1.5">
            {REASONS.map((r, n) => (
              <button
                key={r.key}
                type="button"
                aria-label={`Show ${r.kicker}`}
                onClick={() => pick(n)}
                className={[
                  "h-1 cursor-pointer rounded-sm transition-all duration-300",
                  n === index ? "w-[30px] bg-[#4a34cf]" : "w-3 bg-[#141020]/15",
                ].join(" ")}
              />
            ))}
          </div>

          <div className="min-h-[14px] flex-1" />

          <a
            href="#scope"
            className="flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-[25px] bg-[#191428] text-[14px] font-semibold text-white transition-colors hover:bg-[#4a34cf]"
          >
            Scope a deployment <span aria-hidden="true" className="text-[15px]">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
