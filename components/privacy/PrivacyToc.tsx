"use client";

import { useEffect, useState } from "react";
import { SECTIONS, sectionNumber, slugify } from "./privacy-content";

/**
 * Table of contents.
 * - Mobile: a collapsed <details> of pill links above the clauses.
 * - lg and up: a sticky sidebar that tracks the reader's position.
 */
export default function PrivacyToc() {
  const [active, setActive] = useState(slugify(SECTIONS[0].title));

  useEffect(() => {
    let last = 0;

    // Last clause whose heading has passed under the sticky header wins.
    // Scroll-position based rather than an IntersectionObserver band, which
    // collapses to nothing on short viewports.
    const sync = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-privacy-section]")
      );
      if (!nodes.length) return;
      let current = nodes[0];
      for (const n of nodes) {
        if (n.getBoundingClientRect().top <= 140) current = n;
        else break;
      }
      setActive(current.id);
    };

    // Timestamp gate rather than rAF: sync() is a handful of rect reads, and a
    // frame loop can be starved in embedded contexts.
    const onScroll = () => {
      const t = Date.now();
      if (t - last < 100) return;
      last = t;
      sync();
    };

    sync();
    // Capture phase on document, so a scroll container between the page and
    // the window still reaches us.
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const label =
    "font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2ecff]/[0.35]";

  return (
    <>
      {/* Mobile */}
      <details className="rounded-xl border border-white/[0.09] bg-white/[0.02] px-3.5 py-3 lg:hidden">
        <summary className={`${label} cursor-pointer list-none`}>
          Contents &middot; {SECTIONS.length} sections
        </summary>
        <nav className="mt-3 flex flex-wrap gap-1.5">
          {SECTIONS.map((s, i) => {
            const id = slugify(s.title);
            return (
              <a
                key={id}
                href={`#${id}`}
                className={[
                  "flex min-h-11 items-center gap-2 rounded-full border px-[11px] text-[12.5px] font-medium",
                  active === id
                    ? "border-[var(--color-1)] bg-white/[0.055] text-white"
                    : "border-white/10 text-[#f2ecff]/[0.62] active:bg-white/[0.06]",
                ].join(" ")}
              >
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#f2ecff]/30">
                  {sectionNumber(i)}
                </span>
                {s.title}
              </a>
            );
          })}
        </nav>
      </details>

      {/* Desktop */}
      <aside className="hidden self-start lg:sticky lg:top-[100px] lg:block">
        <div className={`${label} border-b border-white/[0.08] pb-3.5`}>Contents</div>
        <nav className="mt-2.5 flex max-h-[60vh] flex-col gap-px overflow-y-auto">
          {SECTIONS.map((s, i) => {
            const id = slugify(s.title);
            const on = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={[
                  "flex items-baseline gap-2.5 rounded-md border-l-2 px-2.5 py-[7px]",
                  "text-[13px] font-medium leading-[1.35] tracking-[-0.01em] transition-colors",
                  on
                    ? "border-[var(--color-1)] bg-white/[0.055] text-white"
                    : "border-transparent text-[#f2ecff]/50 hover:bg-white/[0.03] hover:text-white",
                ].join(" ")}
              >
                <span className="w-5 flex-none font-[family-name:var(--font-mono)] text-[11px] font-medium text-[#f2ecff]/30">
                  {sectionNumber(i)}
                </span>
                <span>{s.title}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
