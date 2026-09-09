import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ScatteredCardField from "./ScatteredCards";
import HeroPointerProvider from "./HeroPointerContext";
import { MarqueeDemo } from "./Marquee";
import SplitText from "./SplitText";
import { Particles } from "./ui/particles";

const STATS = [
  { figure: "100+", label: "Clients" },
  { figure: "129", label: "Locations" },
  { figure: "5,000+", label: "Projects run" },
  { figure: "₹5M+", label: "Annual payouts" },
];

const MONO = "font-[family-name:var(--font-mono)]";
const GUTTER = "px-5 sm:px-8 lg:px-[clamp(28px,5vw,100px)]";

// Shared SplitText timing so the five headline lines stay in step.
const LINE = {
  delay: 50,
  duration: 1.25,
  ease: "power3.out",
  splitType: "words" as const,
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 },
  threshold: 0.1,
  rootMargin: "-100px",
  textAlign: "initial" as const,
};

export default function NarventHeroMobile() {
  return (
    <HeroPointerProvider>
      <section
        id="Hero"
        className="
          relative flex w-full max-w-full flex-col overflow-hidden
          bg-[#150b26]
          min-h-[100svh]
          lg:h-[100svh] lg:snap-start"
        style={
          {
            "--scale": "min(100vw / 1920, 100svh / 1080)",
          } as React.CSSProperties
        }
      >
        {/* Canvas particles are desktop-only — they cost battery on phones. */}
        <Particles
          className="absolute inset-0 z-0 hidden md:block"
          quantity={50}
          ease={80}
          refresh
          size={1.5}
        />
        {/* Ambient light + dot grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_62%_at_62%_45%,rgba(109,86,255,0.34),transparent_68%),radial-gradient(46%_50%_at_12%_8%,rgba(109,86,255,0.22),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:22px_22px] opacity-[0.035]" />

        <header
          className={`${GUTTER} relative z-20 grid grid-cols-[1fr_auto] items-center gap-4 py-4 md:py-[26px] lg:grid-cols-[1fr_auto_1fr] lg:gap-6`}
        >
          <Link
            href="#top"
            className="justify-self-start text-[22px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff] md:text-[27px]"
          >
            Narvent.
          </Link>
          {/* The two audience links duplicate the CTAs below, so they drop out
              on phones rather than crowding the bar. */}
          <nav className="hidden gap-[34px] text-sm font-medium md:flex">
            <Link
              href="#workers"
              className="text-white/80 transition-colors hover:text-white"
            >
              For Workers
            </Link>
            <Link
              href="#business"
              className="text-white/80 transition-colors hover:text-white"
            >
              For Business
            </Link>
          </nav>
          <Link
            href="#contact"
            className="flex min-h-11 items-center justify-self-end rounded-lg border border-white/[0.16] bg-[#0a0612]/60 px-3.5 text-[13px] font-medium text-white transition-colors hover:border-[var(--color-1)]/60 hover:text-[var(--color-1)] md:px-4"
          >
            Contact Us
          </Link>
        </header>

        <div
          className={`${GUTTER} relative z-10 grid flex-1 grid-cols-1 items-center gap-10 pb-10 pt-6 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] lg:pb-0 lg:pt-2.5`}
        >
          <div className="min-w-0 max-w-[660px]">
            <div
              className={`${MONO} text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-1)] sm:text-[13px] sm:tracking-[0.26em]`}
            >
              India&apos;s largest frontline workforce network
            </div>

            <h1
              className="
                mt-4 flex flex-col font-extrabold text-white
                text-[38px] leading-[1.02] tracking-[-0.04em]
                sm:text-[52px] sm:leading-[0.98]
                md:mt-[22px] md:text-[64px] md:leading-[0.95] md:tracking-[-0.055em]
                aspect-wide:text-[56px] aspect-wide:leading-[0.9] aspect-wide:tracking-[-0.065em]"
            >
              <SplitText
                {...LINE}
                text="The"
                className="text-white"
                swapDuration={0.45}
                swapInterval={6000}
              />

              <SplitText
                {...LINE}
                text="WorkForce"
                highlightWords={["WorkForce"]}
                highlightClassName="text-[var(--color-1)]"
                swapWords={[["WorkForce", "Network"]]}
                swapDuration={0.45}
                swapInterval={6000}
              />

              <SplitText
                {...LINE}
                text="Layer for every"
                className="text-white py-1 md:py-2"
              />

              <SplitText
                {...LINE}
                text="Business"
                highlightWords={["Business"]}
                highlightClassName="text-[var(--color-1)]"
                swapWords={[["Business", "Worker"]]}
                swapDuration={0.45}
                swapInterval={6000}
              />

              <SplitText
                {...LINE}
                text="Everywhere."
                className="text-white py-1 md:py-2"
              />
            </h1>

            <p className="mt-5 max-w-[520px] text-base font-normal leading-[1.6] text-[#f2ecff]/[0.62] [text-wrap:pretty] md:mt-7 md:text-[18px] md:leading-[1.55]">
              AI-powered workforce infrastructure for managed staffing, gig
              services and enterprise operations from sourcing and verification
              to deployment, attendance and payouts.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5 md:mt-10">
              <Link
                href="#business"
                className="group flex min-h-[52px] items-center justify-center gap-3 rounded-md border border-[var(--color-1)]/45 bg-[var(--color-1)]/[0.04] px-[22px] text-base font-medium tracking-[-0.02em] text-[var(--color-1)] transition-colors hover:border-[var(--color-1)] hover:bg-[var(--color-1)]/[0.12] sm:justify-start md:text-[18px]"
              >
                Hire from the pool
                <ArrowRight className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="#workers"
                className="group flex min-h-[52px] items-center justify-center gap-3 rounded-md border border-white/[0.14] bg-white/[0.03] px-[22px] text-base font-medium tracking-[-0.02em] text-white transition-colors hover:border-[#5694ff]/60 hover:bg-[#5694ff]/[0.14] sm:justify-start md:text-[18px]"
              >
                Join the talent pool
                <ArrowRight className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
              </Link>
            </div>

            {/* Two-up on phones so the four figures stay legible instead of
                wrapping into a ragged single line. */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.08] pt-6 sm:flex sm:flex-wrap sm:gap-[34px] md:mt-11 md:pt-[26px]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className={`${MONO} text-xl font-semibold leading-none text-[#5694ff] md:text-2xl`}
                  >
                    {s.figure}
                  </div>
                  <div
                    className={`${MONO} mt-[7px] text-[13px] font-medium uppercase tracking-[-0.04em] text-[#f2ecff]/[0.42] md:text-[15px]`}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed-width floating cards: desktop only. */}
          <div className="hidden min-w-0 lg:block lg:h-[min(78vh,700px)] aspect-wide:h-[50svh]">
            <ScatteredCardField />
          </div>
        </div>

        <div
          className={`${GUTTER} relative z-10 pb-6 pt-4 md:pb-[30px] md:pt-[26px]`}
        >
          <MarqueeDemo />
        </div>
      </section>
    </HeroPointerProvider>
  );
}
