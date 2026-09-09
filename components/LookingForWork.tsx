"use client";

import { useState } from "react";
import RoleCard from "./RoleCard";
import { COL_A, COL_B } from "../lib/lookingForWork";

export default function LookingForWork() {
  const [paused, setPaused] = useState(false);
  const playState = paused ? ("paused" as const) : ("running" as const);

  return (
    <section
      className="relative grid h-screen items-center gap-10 overflow-hidden bg-[#0b0813] [grid-template-columns:repeat(auto-fit,minmax(560px,1fr))]"
      id="forworkers"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[280px] top-[20%] h-[700px] w-[760px] blur-[40px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%,rgba(109,86,255,.20),transparent 64%)",
        }}
      />

      {/* left — worker CTA */}
      <div className="relative z-10 min-w-0 max-w-[760px] px-[clamp(32px,4vw,64px)]">
        <div className="font-[family-name:var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.28em] text-[#5694ff]">
          Are you looking for work?
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-[18px]">
          <span className="text-[clamp(72px,10vw,150px)] font-extrabold leading-[0.86] tracking-[-0.05em] text-[#c9f24d]">
            30000
          </span>
          <span className="text-[clamp(34px,4.2vw,60px)] font-bold leading-none tracking-[-0.03em] text-white">
            people
          </span>
        </div>
        <h2 className="mt-3.5 text-[clamp(34px,4.2vw,60px)] font-bold leading-[1.06] tracking-[-0.035em] text-white text-pretty">
          already work through Narvent.
        </h2>

        <p className="mt-[26px] max-w-[480px] text-[17px] leading-[1.6] text-[#f2ecff]/60 text-pretty">
          Register once and we match you to work near you — day shifts, project
          crews and remote tasks. Alerts come to your phone, attendance is
          marked on the app, payouts land on time.
        </p>

        <form
          className="mt-8 flex max-w-[520px] flex-wrap gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            inputMode="tel"
            aria-label="Mobile number"
            placeholder="+91 mobile number"
            className="min-w-0 flex-[1_1_240px] rounded-[10px] border border-white/[0.18] bg-[#0b0813]/60 px-[18px] py-4 text-base text-[#f2ecff] outline-none placeholder:text-[#f2ecff]/40 focus:border-[#c9f24d]"
          />
          <button
            type="submit"
            className="rounded-[10px] bg-[#c9f24d] px-[30px] py-4 text-base font-semibold text-[#0a0a0a] transition-colors hover:bg-[#dcff70]"
          >
            Register free
          </button>
        </form>
        <div className="mt-3.5 font-[family-name:var(--font-mono)] text-[13px] text-[#f2ecff]/40">
          No fee, ever · English / हिंदी / മലയാളം
        </div>

        <div className="mt-11 flex flex-wrap gap-9 border-t border-white/[0.09] pt-[26px]">
          {[
            { figure: "46", label: "Jobs open today" },
            { figure: "129", label: "Locations" },
            { figure: "3 min", label: "To register" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-[family-name:var(--font-mono)] text-2xl font-semibold leading-none text-[#5694ff]">
                {s.figure}
              </div>
              <div className="mt-1.5 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em] text-[#f2ecff]/[0.42]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right — two opposing marquee columns, bleeding off the right edge */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative flex h-screen min-w-0 justify-start gap-6 overflow-hidden [mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)]"
      >
        <div
          className="flex flex-none flex-col gap-6 self-start will-change-transform motion-reduce:!animate-none"
          style={{
            animation: "col-up 44s linear infinite",
            animationPlayState: playState,
          }}
        >
          {[...COL_A, ...COL_A].map((role, i) => (
            <RoleCard key={`${role.id}-${i}`} role={role} />
          ))}
        </div>

        {/* hidden below 760px — one column only on phones */}
        <div
          className="hidden flex-none flex-col gap-6 self-start will-change-transform motion-reduce:!animate-none min-[761px]:flex"
          style={{
            animation: "col-down 56s linear infinite",
            animationPlayState: playState,
            marginTop: -120,
          }}
        >
          {[...COL_B, ...COL_B].map((role, i) => (
            <RoleCard key={`${role.id}-${i}`} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
