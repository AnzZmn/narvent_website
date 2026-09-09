import { MarqueeDemoVertical } from "./JobMarquee";
import { useState } from "react";

export default function WhatTheyDo() {
  const [phone, setPhone] = useState("");
  return (
    <section
      className="relative grid h-screen items-center gap-10 overflow-hidden  [grid-template-columns:repeat(auto-fit,minmax(560px,1fr))] md:px-15 bg-[#0d0a1a]"
      id="forworkers"
    >
      <div
        aria-hidden
        className="absolute -left-[280px] top-[20%] h-[700px] w-[760px] blur-[40px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%,rgba(109,86,255,.20),transparent 64%)",
        }}
      />

      {/* left — worker CTA */}
      <div className="relative z-10 min-w-0 max-w-[760px] px-[clamp(32px,4vw,64px)]">
        <div className="font-[family-name:var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.28em] text-[#5694ff]">
          31598 people already joined narvent
        </div>

        <div className="mt-6 flex flex-row items-baseline gap-x-[18px]">
          <span className="text-[clamp(64px,13vw,64px)] font-extrabold leading-[0.86] tracking-[-0.05em] text-[#c9f24d]">
            are you looking for work?
          </span>
        </div>
        <h2 className="mt-3.5 text-[clamp(28px,4.2vw,28px)] font-bold leading-[1.06] tracking-[-0.035em] text-white/[0.7] text-pretty">
          Find flexible work near you — from field operations and audits to AI
          data projects, warehouse shifts and remote tasks.
        </h2>

        <p className="mt-[26px] max-w-[480px] text-[17px] leading-[1.6] text-[#f2ecff]/60 text-pretty">
          Register once. Get matched with work based on your location, skills
          and availability
        </p>

        <form
          className="mt-8 flex max-w-[520px] flex-wrap gap-3"
          onSubmit={(e) => {
            e.preventDefault();

            if (!phone) return;

            window.location.href = `/register?contact=${encodeURIComponent(phone)}`;
          }}
        >
          <input
            className="min-w-0 flex-[1_1_240px] rounded-[10px] border border-white/[0.18] bg-[#0b0813]/60 px-[18px] py-4 text-base text-[#f2ecff] outline-none placeholder:text-[#f2ecff]/40 focus:border-[#c9f24d] nv-input"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            minLength={10}
            placeholder="+91 mobile number"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(value);
            }}
          />
          <button
            type="submit"
            className="rounded-[10px] bg-[#c9f24d] px-[30px] py-4 text-base font-semibold text-[#0a0a0a] transition-colors hover:bg-[#dcff70]"
          >
            find work.
          </button>
        </form>
        <div className="mt-3.5 font-[family-name:var(--font-mono)] text-[13px] text-[#f2ecff]/40">
          No fee, ever · English / हिंदी / മലയാളം
        </div>

        <div className="mt-11 flex flex-wrap gap-9 border-t border-white/[0.09] pt-[26px]">
          {[
            { figure: "46", label: "Jobs open today" },
            { figure: "120+", label: "Locations" },
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

      <div className="hidden md:block aspect-wide:scale-[0.75] md:scale-[0.80]">
        <MarqueeDemoVertical />
      </div>
    </section>
  );
}
