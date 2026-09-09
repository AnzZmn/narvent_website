"use client";

import { useCallback, useRef, useState } from "react";
import OfferingsBackdrop from "./OfferingsBackdrop";
import OfferingCard from "./OfferingCard";
import { OFFERINGS } from "./offerings.data";
import "./our-offerings.css";

/* Narvent — "Our Offerings" section, phone layout (390 × 693, 9:16).
   Swipe carousel with a peeking next card; tabs swap the card set.
   Fonts expected on the page: Archivo (sans). Tailwind only. */

const CARD_STRIDE = 302; // 290px card + 12px gap
const RAIL_PAD = 20;

type Props = {
  knowMoreHref?: string;
  /** Renders inside a 390×693 device shell. Set false to fill the parent. */
  framed?: boolean;
};

export default function OurOfferingsMobile({
  knowMoreHref = "#know-more",
  framed = true,
}: Props) {
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const rail = useRef<HTMLDivElement>(null);

  const active = OFFERINGS[tab];
  const count = active.cards.length;

  const scrollToCard = useCallback((i: number) => {
    const el = rail.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - el.offsetLeft - RAIL_PAD,
      behavior: "smooth",
    });
  }, []);

  const pickTab = (i: number) => {
    setTab(i);
    setIndex(0);
    rail.current?.scrollTo({ left: 0, behavior: "auto" });
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const next = Math.round(e.currentTarget.scrollLeft / CARD_STRIDE);
    const clamped = Math.max(0, Math.min(count - 1, next));
    if (clamped !== index) setIndex(clamped);
  };

  const section = (
    <section className="relative flex h-full flex-col overflow-hidden bg-[#faf9fd]">
      {/* Readability wash over the network field. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_40%_at_50%_30%,#ffffff_0%,rgba(250,249,253,0.86)_55%,rgba(250,249,253,0)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex flex-col items-center gap-4 px-5 pt-[26px] opacity-0 [animation:nv-rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
          <h2 className="text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#4a34cf]">
            Our Offerings
          </h2>

          <div
            role="tablist"
            aria-label="Workforce categories"
            className="flex w-full gap-[7px]"
          >
            {OFFERINGS.map((t, i) => {
              const on = i === tab;
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pickTab(i)}
                  className={`h-10 flex-1 rounded-[20px] border text-xs font-semibold transition-colors ${
                    on
                      ? "border-[#191428]/[0.14] bg-[#d6f24b] text-[#191428]"
                      : "border-[#191428]/[0.12] bg-white/70 text-[#191428]/60 hover:bg-white"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <p className="mt-0.5 text-center text-[15px] font-bold leading-[1.25] tracking-[-0.01em] text-[#191428]">
            {active.subtitle}
          </p>
        </header>

        <div
          ref={rail}
          onScroll={onScroll}
          className="nv-rail mt-[18px] flex min-h-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden px-5 pb-1"
        >
          {active.cards.map((c) => (
            <OfferingCard
              key={c.title}
              offering={c}
              knowMoreHref={knowMoreHref}
            />
          ))}
        </div>

        <div className="flex h-[52px] shrink-0 items-center justify-center gap-1.5">
          {active.cards.map((c, i) => (
            <button
              key={c.title}
              type="button"
              aria-label={`Go to ${c.title}`}
              onClick={() => {
                setIndex(i);
                scrollToCard(i);
              }}
              className={`h-1 rounded-sm border-0 p-0 transition-all duration-200 ${
                i === index ? "w-6 bg-[#4a34cf]" : "w-2.5 bg-[#191428]/[0.16]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );

  if (!framed) return section;

  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(70%_50%_at_50%_0%,#ffffff,#e3dff1_74%)] px-4 pb-16 pt-8">
      <div className="h-[693px] w-[390px] overflow-hidden rounded-[34px] border border-[#191428]/10 shadow-[0_30px_80px_rgba(58,44,110,0.18)]">
        {section}
      </div>
    </div>
  );
}
