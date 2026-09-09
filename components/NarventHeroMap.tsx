"use client";

import { useEffect, useRef } from "react";
import { Particles } from "./ui/particles";
import Link from "next/link";
import SplitText from "./SplitText";
import { ArrowRight } from "lucide-react";
import { MarqueeDemo } from "./Marquee";
import HeroPointerProvider from "./HeroPointerContext";
import Image from "next/image";
import NarventMap from "./NarventMapNight";

const SANS = "Archivo, system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const STATS = [
  { figure: "100+", label: "Clients" },
  { figure: "120+", label: "Locations" },
  { figure: "5,000+", label: "Projects run" },
  { figure: "₹6M+", label: "Annual payouts" },
];

const CSS = `
.nf summary { list-style: none; }
.nf summary::-webkit-details-marker { display: none; }
.nf details[open] .nf-chev { transform: rotate(180deg); }
.nf-scroll::-webkit-scrollbar { width: 6px; }
.nf-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.16); border-radius: 99px; }
@keyframes nf-travel { 0% { offset-distance: 0%; } 34% { offset-distance: 42%; } 47% { offset-distance: 42%; } 83% { offset-distance: 90%; } 95% { offset-distance: 90%; } 100% { offset-distance: 100%; } }
@keyframes nf-pop { 0%,32% { opacity: 0; transform: translateY(5px) scale(.86); } 38%,45% { opacity: 1; transform: translateY(0) scale(1); } 51%,81% { opacity: 0; transform: translateY(5px) scale(.86); } 87%,93% { opacity: 1; transform: translateY(0) scale(1); } 99%,100% { opacity: 0; transform: translateY(5px) scale(.86); } }
@keyframes nf-ring { 0% { transform: scale(.6); opacity: .55; } 70%,100% { transform: scale(2.2); opacity: 0; } }
@keyframes nf-dash { to { stroke-dashoffset: -260; } }
@media (prefers-reduced-motion: reduce) { .nf g, .nf circle { animation: none !important; } }
`;

export type NarventFaqProps = {
  /** how many workers move on the map at once */
  density?: "Calm" | "Busy" | "Peak";
  /** speed multiplier for the worker animation */
  pace?: number;
  /** dotted route overlay on the roads */
  routes?: "Visible" | "Hidden";
  /** street-name labels on the background map */
  mapLabels?: "Visible" | "Hidden";
  /** opacity of the background map, 0–1 */
  mapOpacity?: number;
  className?: string;
};

export default function NarventHeroMapDesktop({
  density = "Calm",
  pace = 0.5,
  routes = "Visible",
  mapLabels = "Hidden",
  mapOpacity = 0.85,
  className,
}: NarventFaqProps) {
  const mapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const p = Number(pace) || 0.7;
    const shown = { Calm: 8, Busy: 16, Peak: 24 }[density] ?? 16;

    svg.querySelectorAll<SVGGElement>("[data-w]").forEach((g) => {
      if (!g.dataset.baseDur) {
        const cs = getComputedStyle(g);
        g.dataset.baseDur = String(parseFloat(cs.animationDuration) || 24);
        g.dataset.baseDelay = String(parseFloat(cs.animationDelay) || 0);
      }
      const d = Number(g.dataset.baseDur) / p;
      const dl = Number(g.dataset.baseDelay) / p;
      g.style.animationDuration = d + "s";
      g.style.animationDelay = dl + "s";
      g.style.display = Number(g.dataset.w) < shown ? "" : "none";
      const b = g.querySelector<SVGGElement>('[data-bubble="1"]');
      if (b) {
        b.style.animationDuration = d + "s";
        b.style.animationDelay = dl + "s";
      }
    });

    const r = svg.querySelector<SVGGElement>('[data-routes="1"]');
    if (r) r.style.display = routes === "Visible" ? "" : "none";
    const l = svg.querySelector<SVGGElement>('[data-role="label"]');
    if (l) l.style.display = mapLabels === "Visible" ? "" : "none";
  }, [density, pace, routes, mapLabels]);

  return (
    <section
      className={`nf relative flex min-h-svh flex-col bg-black text-white antialiased overflow-hidden ${className ?? ""}`}
      style={{ fontFamily: SANS }}
      id="Hero"
    >
      <style>{CSS}</style>
      <div style={{ position: "absolute", inset: 0, opacity: mapOpacity }}>
        <NarventMap />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(88% 50% at 50% 50%, rgba(13,5,24,.9) 26%, rgba(13,5,24,.44) 68%, rgba(13,5,24,.2) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,#0d0518 0%,rgba(13,5,24,0) 16%,rgba(13,5,24,0) 84%,#0d0518 100%)",
        }}
      />

      {/* Ambient light + dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_82%_at_50%_50%,rgba(109,86,255,0.34),transparent_68%),radial-gradient(46%_50%_at_12%_8%,rgba(109,86,255,0.22),transparent_70%)]" />

      <header className="relative z-20 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-6 px-[clamp(28px,5vw,100px)] py-[26px]">
        <span className="flex gap-2 items-center">
          <Image
            src="/NarventSVG.svg"
            alt="logo"
            className="object-contain"
            width={20}
            height={20}
          />
          <Link
            href="/#Hero"
            className="justify-self-start text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff]"
          >
            Narvent.
          </Link>
        </span>
        <nav className="flex gap-[34px] text-sm font-medium">
          <Link
            href="/#forworkers"
            className="text-white/80 transition-colors hover:text-white"
          >
            For Workers
          </Link>
          <Link
            href="/#Business"
            className="text-white/80 transition-colors hover:text-white"
          >
            For Business
          </Link>
          <Link
            href="/#faq"
            className="text-white/80 transition-colors hover:text-white"
          >
            FAQ
          </Link>
        </nav>
        <Link
          href="/ContactUs"
          className="justify-self-end rounded-lg border border-white/[0.16] bg-[#0a0612]/60 px-4 py-[9px] text-[13px] font-medium text-white transition-colors hover:border-[var(--color-1)]/60 hover:text-[var(--color-1)]"
        >
          Contact Us
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <div
            className={`${MONO} text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--color-1)]`}
          >
            India&apos;s largest frontline workforce network
          </div>

          <h1
            className="mt-[22px] flex flex-col  md:text-[100px] text-center
    md:leading-[0.95]
    md:tracking-[-0.055em]
    4xl:text-[100px]

    aspect-video:text-[100px]


    aspect-wide:text-[56px]
    aspect-wide:leading-[0.9]
    aspect-wide:tracking-[-0.065em]

	    font-extrabold text-white"
          >
            <SplitText
              text="The"
              delay={50}
              className="text-white"
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              swapDuration={0.45}
              swapInterval={6000}
            />

            <SplitText
              text="Talent"
              className=""
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              highlightWords={["Talent"]}
              highlightClassName="text-[var(--color-1)]"
              swapWords={[["Talent", "Network"]]}
              swapDuration={0.45}
              swapInterval={6000}
            />

            <SplitText
              text="Layer for every"
              className="text-white py-2 px-5"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />

            <SplitText
              text="Business"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              highlightWords={["Business"]}
              highlightClassName="text-[var(--color-1)]"
              swapWords={[["Business", "Talent"]]}
              swapDuration={0.45}
              swapInterval={6000}
            />

            <SplitText
              text="Everywhere."
              className="text-white py-2"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />
          </h1>

          <p className="mt-7 max-w-[520px] text-[18px] text-center font-normal leading-[1.55] text-[#f2ecff]/[0.62] [text-wrap:pretty]">
            AI-powered workforce infrastructure for managed staffing, gig
            services and enterprise operations from sourcing and verification to
            deployment, attendance and payouts.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="#Business"
              className="group flex items-center gap-3 rounded-md border border-[var(--color-1)]/45 bg-[var(--color-1)]/[0.04] px-[22px] py-3.5 text-[18px] font-medium tracking-[-0.02em] text-[var(--color-1)] transition-colors hover:border-[var(--color-1)] hover:bg-[var(--color-1)]/[0.12]"
            >
              Hire from the pool
              <ArrowRight className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="https://www.talent.narvent.in/join"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href =
                  "https://wa.me/918848780644?text=Hi%2C%20I%20am%20available%20to%20work";
              }}
              className="group flex items-center gap-3 rounded-md border border-white/[0.14] bg-white/[0.03] px-[22px] py-3.5 text-[18px] font-medium tracking-[-0.02em] text-white transition-colors hover:border-[#5694ff]/60 hover:bg-[#5694ff]/[0.14]"
            >
              find work.
              <ArrowRight className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
            </Link>
          </div>

          <div className="mt-11 flex flex-wrap gap-[34px] border-t border-white/[0.08] pt-[26px] justify-center items-center text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className={`${MONO} text-2xl font-semibold leading-none text-[#5694ff]`}
                >
                  {s.figure}
                </div>
                <div
                  className={`${MONO} mt-[7px] text-[15px] font-medium uppercase tracking-[-0.04em] text-[#f2ecff]/[0.42]`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="overflow-hidden mx-25 my-10">
        <MarqueeDemo />
      </footer>
    </section>
  );
}
