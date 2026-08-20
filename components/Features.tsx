import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  ChartColumn,
  ClipboardCheck,
  LucideIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CardSwap, { Card, type CardProps } from "./CardSwap";
import { BRAND_GRADIENT, CONTAINER, fontDisplay, fontMono } from "@/lib/utils";
import { HorizontalGlowLine } from "./glowLine";

const FEATURES: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    id: "01",
    icon: Sparkles,
    title: "AI Workforce Matching",
    description:
      "Match qualified workers to projects by skill, location, and availability in real time.",
  },
  {
    id: "02",
    icon: BriefcaseBusiness,
    title: "Unified Staffing Operations",
    description:
      "Manage part-time, full-time, freelance, and contract workforce from one dashboard.",
  },
  {
    id: "03",
    icon: Activity,
    title: "Real-Time Deployment",
    description:
      "Coordinate multiple sites with live attendance, shift allocation, and status tracking.",
  },
  {
    id: "04",
    icon: ShieldCheck,
    title: "Digital Onboarding & Verification",
    description:
      "Verify identity, manage documents, and run role-based eligibility checks digitally.",
  },
  {
    id: "05",
    icon: ClipboardCheck,
    title: "Field Projects & Enterprise Audits",
    description:
      "Run asset audits, QR-based verification, and inspections with full field visibility.",
  },
  {
    id: "06",
    icon: ChartColumn,
    title: "Automated Payouts & Analytics",
    description:
      "Simplify payroll and contractor payouts with actionable workforce reporting.",
  },
];

/** Fires once an element enters the viewport, used for a single scroll-in reveal. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * CardSwap clones its direct children and attaches a ref + style + onClick
 * to each one so GSAP has a real DOM node to animate. Since this wrapper
 * sits between CardSwap and Card, it has to forward all three through or
 * the ref stays null and GSAP throws "target null not found".
 */
const ModuleCard = forwardRef<
  HTMLDivElement,
  CardProps & { feature: (typeof FEATURES)[number] }
>(({ feature, style, ...rest }, ref) => (
  <Card
    ref={ref}
    {...rest}
    customClass="overflow-hidden shadow-2xl"
    style={{
      backgroundColor: "rgba(10,10,12,0.7)",
      borderColor: "rgba(255,255,255,0.12)",
      ...style,
    }}
    className="backdrop-blur-2xl"
  >
    <div className="flex h-full w-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] tracking-[0.2em] text-white/40"
          style={fontMono}
        >
          MOD.{feature.id}
        </span>
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: "var(--color-3)" }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-3)" }}
          />
        </span>
      </div>

      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundImage: BRAND_GRADIENT }}
      >
        <feature.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-base font-semibold text-white" style={fontDisplay}>
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55">
          {feature.description}
        </p>
      </div>
    </div>
  </Card>
));
ModuleCard.displayName = "ModuleCard";

export default function Features() {
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();
  const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>();

  return (
    <section
      id="features"
      className="relative flex h-screen w-screen snap-start flex-col overflow-hidden px-6 pt-28 pb-10 sm:px-10 sm:pt-32 lg:px-16"
    >
      <div
        className={`${CONTAINER} relative flex h-full max-h-full flex-col justify-center`}
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div
            ref={leftRef}
            className="narvent-fade flex flex-col gap-6"
            data-in-view={leftInView}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-3)" }}
              />
              <span
                className="text-xs tracking-[0.3em] text-white/50"
                style={{ ...fontMono, fontVariantCaps: "all-petite-caps" }}
              >
                Operations Stack
              </span>
            </div>

            <h2
              className="max-w-md text-2xl font-semibold text-white sm:text-3xl lg:text-4xl"
              style={fontDisplay}
            >
Manage sourcing, onboarding, deployment, attendance, payroll, and audits — all from one AI-powered workforce platform.
            </h2>

            <p className="max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              Six systems run underneath Narvent at once. Watch them cycle, or
              open any module to see it live.
            </p>

            <HorizontalGlowLine
              color="from-[var(--color-3)] via-[var(--color-3)] to-transparent"
              className="max-w-[200px]"
            />

            <span
              className="text-xs tracking-[0.2em] text-white/30"
              style={fontMono}
            >
              06 MODULES · LIVE
            </span>

            {/* Real list of every module for search engines and screen readers,
               since the animated stack only ever shows one card at a time. */}
            <ul className="sr-only">
              {FEATURES.map((f) => (
                <li key={f.title}>
                  {f.title}: {f.description}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={rightRef}
            className="narvent-fade relative pr-40 h-[360px] w-full sm:h-[420px]"
            data-in-view={rightInView}
            aria-hidden="true"
          >
            <CardSwap
              width={500}
              height={350}
              cardDistance={50}
              verticalDistance={54}
              delay={100}
              pauseOnHover
              skewAmount={5}
            >
              {FEATURES.map((feature) => (
                <ModuleCard key={feature.title} feature={feature} />
              ))}
            </CardSwap>
          </div>
        </div>
      </div>

      <style>{`
        .narvent-fade {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .narvent-fade[data-in-view="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .narvent-fade {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
