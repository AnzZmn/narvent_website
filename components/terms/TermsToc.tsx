"use client";

import { useEffect, useState } from "react";
import { SECTIONS, sectionNumber, slugify } from "./terms-content";

/**
 * Table of contents.
 * - Mobile: a collapsed <details> of pill links above the clauses.
 * - lg and up: a sticky sidebar with IntersectionObserver scroll-spy.
 * The observer's rootMargin keeps the active band just under the sticky header,
 * so the highlighted entry matches the heading the reader is actually on.
 */
export default function TermsToc() {
  const [active, setActive] = useState(slugify(SECTIONS[0].title));

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-terms-section]")
    );
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
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
                className="flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-[11px] text-[12.5px] font-medium text-[#f2ecff]/[0.62] active:bg-white/[0.06]"
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
