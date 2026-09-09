"use client";

import { useEffect, useRef, useState } from "react";
import OfferingIcon from "./OfferingIcon";
import { TRACKS } from "./offerings.data";

export default function OurOfferings() {
  const [track, setTrack] = useState(1); // Grey Collar first, as in the design
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const active = TRACKS[track];
  const few = active.cards.length <= 3;

  // rail scrolls back to the start when the track changes
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "auto" });
    setProgress(0);
  }, [track]);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <div className="relative overflow-hidden bg-transparent md:py-40 md:px-30 h-auto aspect-wide:scale-[0.75] md:scale-[0.8] hidden md:block">
      <div className="relative z-10">
        <h2 className="text-center text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--color-1)] md:text-[46px]">
          Our Offerings
        </h2>

        <div
          role="tablist"
          className="mt-12 flex flex-wrap justify-center gap-3.5 px-6 md:mt-[66px]"
        >
          {TRACKS.map((t, i) => {
            const on = i === track;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setTrack(i)}
                className={`rounded-full px-[30px] py-[13px] text-base font-medium transition-colors duration-200 ${
                  on
                    ? "bg-[#c9f24d] text-[#0a0a0a]"
                    : "bg-[#2a2a2a] text-white/[0.92] hover:bg-[#343434]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <h3 className="mt-12 px-6 text-center text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-white md:mt-[62px] md:text-[30px]">
          {active.subhead}
        </h3>

        <div
          ref={railRef}
          onScroll={onScroll}
          className={`mt-[46px] flex gap-[30px] overflow-x-auto px-6 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10 ${
            few ? "md:justify-center" : ""
          }`}
          style={{ scrollSnapType: "x proximity" }}
        >
          {active.cards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[604px] w-[435px] flex-none flex-col rounded-[20px] bg-[linear-gradient(180deg,#232323_0%,#1b1b1b_100%)] p-[34px] pb-[30px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="h-[34px] w-[34px] text-white/95">
                <OfferingIcon name={card.icon} />
              </div>

              <h4 className="mt-11 text-[23px] font-semibold leading-[1.28] tracking-[-0.01em] text-white">
                {card.title}
              </h4>

              <p className="mt-4 text-[14.5px] leading-[1.5] text-white/[0.82]">
                {card.blurb}
              </p>

              <ul className="mt-6 flex list-disc flex-col gap-[11px] pl-5">
                {card.points.map((p) => (
                  <li
                    key={p}
                    className="text-[14.5px] leading-[1.45] text-white/90"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-auto flex items-center justify-center gap-2.5 rounded-full bg-white px-5 py-[15px] text-base font-semibold text-black transition-colors hover:bg-[#c9f24d]"
              >
                Know More{" "}
                <span aria-hidden className="text-lg font-normal leading-none">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>

        {!few && (
          <div className="mt-[34px] flex justify-center gap-1.5">
            <span
              className="h-[3px] w-[66px] rounded-sm transition-colors"
              style={{
                background: progress < 0.5 ? "#fff" : "rgba(255,255,255,.28)",
              }}
            />
            <span
              className="h-[3px] w-[66px] rounded-sm transition-colors"
              style={{
                background: progress >= 0.5 ? "#fff" : "rgba(255,255,255,.28)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
