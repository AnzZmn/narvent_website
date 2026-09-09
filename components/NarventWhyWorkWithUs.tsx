"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Narvent — "Why work with us?" (full-viewport section)
 *
 * Tailwind-only: no inline style objects. Arbitrary-value classes carry the
 * brand hexes so no tailwind.config change is required.
 *
 * Fonts: Archivo (sans) + IBM Plex Mono. Wire them up in layout.tsx via
 * next/font and expose them as `font-sans` / `font-mono`, or add:
 *   fontFamily: { sans: ['Archivo', 'system-ui', 'sans-serif'],
 *                 mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'] }
 */

const PATHS = {
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18",
  shield: "M12 3l7 3v6c0 4-3 6.6-7 9-4-2.4-7-5-7-9V6zM9 12l2 2 4-4",
  eye: "M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6m10 2.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8",
  map: "M9 20l-6 2V7l6-2m0 15 6 2m-6-2V5m6 17 6-2V5l-6 2m0 15V7m0 0L9 5",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
} as const;

type Tint = "blue" | "magenta" | "violet";

const TINT: Record<Tint, { text: string; bar: string; ring: string }> = {
  blue: {
    text: "text-[#5694ff]",
    bar: "bg-[#5694ff]",
    ring: "shadow-[0_0_0_5px_rgba(86,148,255,.18)]",
  },
  magenta: {
    text: "text-[#c156ff]",
    bar: "bg-[#c156ff]",
    ring: "shadow-[0_0_0_5px_rgba(193,86,255,.18)]",
  },
  violet: {
    text: "text-[#8b7cff]",
    bar: "bg-[#8b7cff]",
    ring: "shadow-[0_0_0_5px_rgba(139,124,255,.18)]",
  },
};

type Reason = {
  icon: keyof typeof PATHS;
  tint: Tint;
  kicker: string;
  title: string;
  desc: string;
};

const ITEMS: Reason[] = [
  {
    icon: "clock",
    tint: "blue",
    kicker: "Speed",
    title: "Crews on site in days, not quarters",
    desc: "Tell us the scope and we source, verify and brief in parallel rather than in sequence, so the first shift runs while a tender would still be open.",
  },
  {
    icon: "shield",
    tint: "magenta",
    kicker: "Trust",
    title: "Every worker verified before day one",
    desc: "Identity, documents and role eligibility are checked digitally and stored against the deployment, so the audit trail is ready before anyone asks for it.",
  },
  {
    icon: "eye",
    tint: "violet",
    kicker: "Visibility",
    title: "Watch the work as it happens",
    desc: "Live attendance, geo-tagged proof of task and shift-level status across every site in one dashboard. You see exactly what our ops team sees.",
  },
  {
    icon: "map",
    tint: "blue",
    kicker: "Reach",
    title: "One partner from metro to tier 3",
    desc: "The same contract covers every location we operate in, so a pilot expands into new cities without onboarding a new supplier for each one.",
  },
  {
    icon: "receipt",
    tint: "magenta",
    kicker: "Compliance",
    title: "One invoice, statutory handled",
    desc: "Wages, statutory contributions and consolidated billing sit with us. Your finance team receives a single monthly invoice per deployment.",
  },
];

const BULLETS = [
  "Skill, location and availability matching in real time",
  "Identity checks and role-based eligibility, digitally",
  "Multi-site shift allocation with live status",
];

const KICKER = "font-mono text-[11px] font-semibold uppercase tracking-[.22em]";
const HEAD3 =
  "font-sans font-bold leading-[1.14] tracking-[-.03em] text-white text-balance";

export default function NarventWhyWorkWithUs() {
  const [index, setIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const active = ITEMS[Math.min(index, ITEMS.length - 1)];
  const valid = phone.replace(/\D/g, "").length >= 10;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(ITEMS.length).padStart(2, "0")}`;
  const router = useRouter();

  return (
    <section className="relative box-border flex h-screen min-h-[1040px] flex-col gap-6 bg-black px-7 py-7 font-sans antialiased md:gap-8 md:px-16 md:py-13">
      <div className="mx-auto flex min-h-0 w-full max-w-[1180px] flex-1 flex-col gap-5 md:gap-8">
        <h2 className="shrink-0 text-center font-sans text-[28px] font-bold leading-[1.1] tracking-[-.04em] text-white md:text-[42px]">
          Why work with us?
        </h2>

        {/* ── reason explorer ─────────────────────────────────────────── */}
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(115deg,#07040e_0%,#0f0a22_44%,#141a3c_100%)]">
          <div className="relative flex flex-col overflow-hidden border-r border-white/[0.07] px-5 py-6 md:px-7 md:py-8">
            <div className="pointer-events-none absolute -bottom-[40%] -left-[30%] aspect-square w-[130%] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(86,148,255,.26),rgba(13,5,24,0)_64%)]" />
            <div className={`relative z-[2] shrink-0 ${KICKER} text-white/40`}>
              Five reasons
            </div>

            <div className="relative z-[2] mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-y-auto md:mt-5">
              {ITEMS.map((r, n) => {
                const on = n === Math.min(index, ITEMS.length - 1);
                return (
                  <button
                    key={r.kicker}
                    type="button"
                    onClick={() => setIndex(n)}
                    onMouseEnter={() => setIndex(n)}
                    className={`flex w-full items-center gap-3.5 rounded-[13px] border px-3.5 py-2.5 text-left transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      on
                        ? "border-white/15 bg-white/[0.07]"
                        : "border-transparent bg-transparent hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                        on ? `bg-white ${TINT[r.tint].ring}` : "bg-white/[0.08]"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={on ? "stroke-[#14101f]" : "stroke-white/65"}
                      >
                        <path d={PATHS[r.icon]} />
                      </svg>
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[.2em] ${on ? TINT[r.tint].text : "text-white/35"}`}
                      >
                        {r.kicker}
                      </span>
                      <span
                        className={`font-sans text-[13.5px] font-semibold leading-[1.3] ${on ? "text-white" : "text-white/60"}`}
                      >
                        {r.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex min-h-0 flex-col px-6 py-6 md:px-10 md:py-8">
            <div className="flex shrink-0 items-center justify-between gap-4">
              <div className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-white/40">
                For business
              </div>
              <div className="font-mono text-xs font-semibold text-white/30">
                {counter}
              </div>
            </div>

            <div className="mt-6 flex min-h-0 flex-1 flex-col justify-center md:mt-9">
              <div className={`${KICKER} ${TINT[active.tint].text}`}>
                {active.kicker}
              </div>
              <h3 className={`mt-3.5 text-[24px] md:text-[34px] ${HEAD3}`}>
                {active.title}
              </h3>
              <p className="mt-4 max-w-[46ch] font-sans text-[15.5px] leading-[1.65] text-white/60 text-pretty">
                {active.desc}
              </p>

              <div className="mt-5 flex gap-1.5 md:mt-7">
                {ITEMS.map((r, n) => {
                  const on = n === Math.min(index, ITEMS.length - 1);
                  return (
                    <span
                      key={r.kicker}
                      className={`h-[3px] rounded-sm transition-all duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                        on
                          ? `w-[34px] ${TINT[r.tint].bar}`
                          : "w-3.5 bg-white/15"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <a
              href="#scope"
              className="flex shrink-0 items-center gap-3 self-start rounded-full bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-[#0d0518] transition-colors hover:bg-[#CBB8FF]"
              onClick={(e) => {
                e.preventDefault();
                router.push("/ContactUs");
              }}
            >
              Scope a deployment{" "}
              <span className="font-sans text-[17px] font-normal leading-none">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ── scope / register ────────────────────────────────────────── */}
        <div
          id="scope"
          className="grid shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden rounded-3xl border border-white/10 bg-[#120b1f]"
        >
          <div className="flex flex-col border-r border-white/10 px-6 py-6 md:px-10 md:py-9">
            <div className={`${KICKER} text-[#5694ff]`}>For business</div>
            <h3
              className={`mt-3.5 max-w-[15ch] text-[21px] md:text-[29px] ${HEAD3}`}
            >
              Tell us the scope. We staff it and supervise it.
            </h3>
            <p className="mt-3.5 max-w-[44ch] font-sans text-[14.5px] leading-[1.6] text-white/[0.58] text-pretty">
              One dashboard for sourcing, digital onboarding and verification,
              live deployment, attendance and automated payouts.
            </p>

            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0 md:mt-5">
              {BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.45] text-white/[0.78]"
                >
                  <span className="mt-[7px] size-[5px] shrink-0 rounded-full bg-[#8b7cff]" />
                  {b}
                </li>
              ))}
            </ul>

            <a
              href="/ContactUs"
              className="mt-5 self-start rounded-[10px] bg-[linear-gradient(135deg,#7d5cff,#a855f7)] px-5.5 py-3.5 font-sans text-[14.5px] font-semibold text-white transition-[filter] hover:brightness-110 md:mt-7"
              onClick={(e) => {
                e.preventDefault();
                router.push("/ContactUs");
              }}
            >
              Request a demo
            </a>
          </div>

          <div className="flex flex-col px-6 py-6 md:px-10 md:py-9">
            <div className={`${KICKER} text-[#c156ff]`}>For workers</div>
            <h3
              className={`mt-3.5 max-w-[17ch] text-[21px] md:text-[29px] ${HEAD3}`}
            >
              Register once. Get work near you, every day.
            </h3>
            <p className="mt-3.5 max-w-[42ch] font-sans text-[14.5px] leading-[1.6] text-white/[0.58] text-pretty">
              Free to join. Daily opportunity alerts on your phone, transparent
              day rates, on-time payouts.
            </p>

            <div className="mt-4 flex flex-wrap items-stretch gap-3 md:mt-6">
              <label htmlFor="narvent-phone" className="sr-only">
                Mobile number
              </label>
              <input
                id="narvent-phone"
                type="tel"
                value={phone}
                pattern="[0-9]*"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(value);
                  setSent(false);
                }}
                placeholder="+91 mobile number"
                className="min-w-0 flex-[1_1_220px] rounded-[10px] border border-white/[0.12] bg-[#1b1329] px-4 py-3.5 font-sans text-[14.5px] text-white outline-none placeholder:text-white/[0.34] focus:border-white/25"
              />
              <button
                type="button"
                onClick={() => {
                  if (valid) setSent(true);
                }}
                className="shrink-0 cursor-pointer rounded-[10px] bg-[#efeaff] px-5.5 py-3.5 font-sans text-[14.5px] font-semibold text-[#160b28] transition-colors hover:bg-white"
              >
                {sent ? "Sent ✓" : "Register"}
              </button>
            </div>

            <div className="mt-3 font-mono text-xs text-white/40">
              {sent
                ? "We will call you within 24 hours to finish registration."
                : "No fee, ever · English / हिंदी / മലയാളം"}
            </div>

            <div className="mt-auto pt-5 md:pt-7">
              <div className="h-px bg-white/10" />
              <div className="mt-4 flex gap-8 md:mt-5 md:gap-14">
                <div>
                  <div className="font-mono text-[21px] font-semibold text-[#8b7cff]">
                    46
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[.14em] text-white/40">
                    Jobs today
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[21px] font-semibold text-[#8b7cff]">
                    3 min
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[.14em] text-white/40">
                    To register
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
