"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRight,
  Menu,
  Play,
  Sparkles,
  Workflow,
  Bot,
  Activity,
  Blocks,
  Gauge,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

/* ------------------------------------------------------------------ */
/*  Shared style helpers                                               */
/* ------------------------------------------------------------------ */

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-8";

const BRAND_GRADIENT =
  "linear-gradient(135deg, var(--color-1) 0%, var(--color-2) 55%, var(--color-3) 100%)";

const gradientText: React.CSSProperties = {
  backgroundImage: BRAND_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const fontDisplay: React.CSSProperties = { fontFamily: "var(--font-display)" };
const fontMono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
];

const STATS = [
  { value: "2.4M+", label: "Workflows run monthly" },
  { value: "180+", label: "Native integrations" },
  { value: "12ms", label: "Avg. trigger latency" },
  { value: "99.98%", label: "Platform uptime" },
];

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Workflow,
    title: "Visual workflow builder",
    description:
      "Drag, connect, and branch logic on a canvas built for real pipelines, not toy examples.",
  },
  {
    icon: Bot,
    title: "Autonomous AI agents",
    description:
      "Hand off decisions to agents that reason over context and act without a rigid script.",
  },
  {
    icon: Activity,
    title: "Real-time orchestration",
    description:
      "Every step runs the moment it's ready, coordinated across services automatically.",
  },
  {
    icon: Blocks,
    title: "180+ integrations",
    description:
      "Connect the tools you already use in minutes — no custom API glue required.",
  },
  {
    icon: Gauge,
    title: "Live observability",
    description:
      "Watch every run trace through your pipeline with logs, retries, and timing built in.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "Role-based access, full audit trails, and encryption at rest and in transit.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your tools, APIs, and data sources in minutes — no code required.",
  },
  {
    number: "02",
    title: "Orchestrate",
    description:
      "Design the logic once. Narvent runs it continuously, adapting as conditions change.",
  },
  {
    number: "03",
    title: "Deploy",
    description:
      "Push to production with monitoring, retries, and rollback built in.",
  },
];

const FOOTER_COLUMNS = [
  { title: "Product", links: ["Features", "How it works", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Blog"] },
  { title: "Resources", links: ["Docs", "Support", "Community"] },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div
      className={cn(
        display.variable,
        body.variable,
        mono.variable,
        "relative min-h-screen overflow-x-clip bg-[#05050b] text-white antialiased",
      )}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <GlobalStyles />

      {/* ambient grid floor */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Global styles: brand vars, keyframes, reduced motion               */
/* ------------------------------------------------------------------ */

function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --color-1: #5694ff;
        --color-2: #6d56ff;
        --color-3: #c156ff;
      }

      @keyframes drift {
        0%,
        100% {
          transform: translate(0, 0) scale(1);
        }
        50% {
          transform: translate(24px, -18px) scale(1.06);
        }
      }

      @keyframes flow-dash {
        to {
          stroke-dashoffset: -28;
        }
      }

      @keyframes pulse-dot {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.35;
        }
      }

      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translateY(14px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#05050b]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          CONTAINER,
          "flex h-16 items-center justify-between sm:h-[72px]",
        )}
      >
        <Link href="#top" className="flex items-center gap-2.5">
          <div
            className="w-[50px] h-[50px]"
            style={{
              WebkitMask:
                "url('/NarventLogoOnly.png') center / contain no-repeat",
              mask: "url('/NarventLogoOnly.png') center / contain no-repeat",
              backgroundImage: BRAND_GRADIENT,
            }}
          />
          <div
            className="w-[112px] h-[25px] "
            style={{
              WebkitMask:
                "url('/NarventTextOnlyViolet.png') center / contain no-repeat",
              mask: "url('/NarventTextOnlyViolet.png' center / contain no-repeat)",
              backgroundImage: BRAND_GRADIENT,
            }}
          ></div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-white/80 hover:bg-white/5 hover:text-white"
          >
            Sign in
          </Button>
          <Button
            className="group border-0 text-white"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/5 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[300px] flex-col gap-8 border-white/10 bg-[#05050b] sm:w-[340px]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <Image src="/narvent-icon.png" alt="" width={20} height={34} />
                <Image
                  src="/NarventTextOnlyViolet.png"
                  alt="Narvent"
                  width={100}
                  height={23}
                />
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-white/15 text-white hover:bg-white/5"
              >
                Sign in
              </Button>
              <Button
                className="border-0 text-white"
                style={{ backgroundImage: BRAND_GRADIENT }}
              >
                Get started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-24 left-[8%] h-[380px] w-[380px] rounded-full opacity-30 blur-[110px]"
          style={{
            background: "var(--color-2)",
            animation: "drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-[2%] h-[340px] w-[340px] rounded-full opacity-25 blur-[110px]"
          style={{
            background: "var(--color-3)",
            animation: "drift 22s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bottom-[-100px] left-[28%] h-[300px] w-[300px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "var(--color-1)",
            animation: "drift 26s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className={cn(
          CONTAINER,
          "grid items-center gap-16 lg:grid-cols-2 lg:gap-12",
        )}
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: "var(--color-3)" }}
            />
            AI-native workflow orchestration
          </Badge>

          <h1
            className="mt-6 text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4rem]"
            style={{
              ...fontDisplay,
              animation: "fade-up 0.6s ease-out 0.08s both",
            }}
          >
            Every workflow.
            <br />
            <span style={gradientText}>One autonomous current.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg text-white/60"
            style={{ animation: "fade-up 0.6s ease-out 0.16s both" }}
          >
            Narvent connects your tools, triggers, and AI agents into a single
            self-running pipeline — so the work moves without anyone pushing it.
          </p>

          <div
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animation: "fade-up 0.6s ease-out 0.24s both" }}
          >
            <Button
              size="lg"
              className="group border-0 text-white"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 text-white bg-transparent"
            >
              <Play className="h-4 w-4" />
              See it in action
            </Button>
          </div>

          <p
            className="mt-6 text-xs uppercase tracking-widest text-white/35"
            style={{
              ...fontMono,
              animation: "fade-up 0.6s ease-out 0.32s both",
            }}
          >
            No credit card · Free forever plan · Deploy in minutes
          </p>
        </div>

        <div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          style={{ animation: "fade-up 0.7s ease-out 0.2s both" }}
        >
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const nodes = [
    { x: 16, y: 18, w: 118, h: 56, label: "Trigger" },
    { x: 182, y: 108, w: 128, h: 56, label: "Transform" },
    { x: 182, y: 220, w: 128, h: 56, label: "AI Agent", active: true },
    { x: 346, y: 258, w: 118, h: 56, label: "Deploy" },
  ];

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-1 shadow-2xl backdrop-blur-xl">
      <div className="overflow-hidden rounded-[1.35rem] border border-white/5 bg-[#0a0816]">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-[11px] text-white/40" style={fontMono}>
            workflow.trace
          </span>
          <span
            className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300"
            style={fontMono}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
            />
            live
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <svg
            viewBox="0 0 480 340"
            className="w-full"
            role="img"
            aria-label="Diagram of a workflow moving from trigger, to transform, to an AI agent, to deploy"
          >
            <defs>
              <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-1)" />
                <stop offset="55%" stopColor="var(--color-2)" />
                <stop offset="100%" stopColor="var(--color-3)" />
              </linearGradient>
            </defs>

            <path
              d="M134,50 C168,50 150,136 182,136"
              stroke="url(#flowLine)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
              opacity="0.85"
              style={{ animation: "flow-dash 1.4s linear infinite" }}
            />
            <path
              d="M246,164 L246,220"
              stroke="url(#flowLine)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
              opacity="0.85"
              style={{ animation: "flow-dash 1.4s linear infinite" }}
            />
            <path
              d="M310,248 C338,248 318,286 346,286"
              stroke="url(#flowLine)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
              opacity="0.85"
              style={{ animation: "flow-dash 1.4s linear infinite" }}
            />

            {nodes.map((n) => (
              <g key={n.label}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={14}
                  fill={n.active ? "url(#flowLine)" : "rgba(255,255,255,0.04)"}
                  fillOpacity={n.active ? 0.3 : 1}
                  stroke={
                    n.active ? "var(--color-2)" : "rgba(255,255,255,0.12)"
                  }
                  strokeWidth={1.25}
                />
                {n.active && (
                  <circle
                    cx={n.x + 16}
                    cy={n.y + 16}
                    r={4}
                    fill="#34d399"
                    style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
                  />
                )}
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={n.active ? "#ffffff" : "rgba(255,255,255,0.78)"}
                  fontSize="14"
                  fontWeight={500}
                  style={fontMono}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

function StatsBar() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02]">
      <div
        className={cn(CONTAINER, "grid grid-cols-2 gap-8 py-10 sm:grid-cols-4")}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col items-center gap-1 text-center sm:items-start sm:text-left",
              i > 0 && "sm:border-l sm:border-white/5 sm:pl-8",
            )}
          >
            <span
              className="text-2xl font-bold sm:text-3xl"
              style={{ ...fontDisplay, ...gradientText }}
            >
              {s.value}
            </span>
            <span className="text-xs text-white/50 sm:text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-28 lg:py-32">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ ...fontMono, color: "var(--color-1)" }}
          >
            Capabilities
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={fontDisplay}
          >
            Everything your workflows need to run themselves
          </h2>
          <p className="mt-4 text-lg text-white/60">
            From the first trigger to the last deploy, Narvent handles the parts
            that used to need someone watching.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              className="border-white/10 bg-white/[0.03] transition-colors hover:border-[#6d56ff]/40"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                >
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={fontDisplay}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section id="workflow" className="relative py-24 sm:py-28 lg:py-32">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ ...fontMono, color: "var(--color-3)" }}
          >
            The process
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={fontDisplay}
          >
            From trigger to deploy in three steps
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute top-8 right-0 left-0 hidden h-px md:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--color-1), var(--color-2), var(--color-3), transparent)",
            }}
          />
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0816] text-xl font-bold"
                style={{ ...fontDisplay, color: "var(--color-2)" }}
              >
                {s.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold" style={fontDisplay}>
                {s.title}
              </h3>
              <p className="mt-3 text-white/55">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16 sm:py-20"
          style={{ backgroundImage: BRAND_GRADIENT }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="relative">
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={fontDisplay}
            >
              Put your busywork on autopilot
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Start free. Scale when you&rsquo;re ready. No migration headaches.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-[#6d56ff] hover:bg-white/90"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="#"
                className="text-sm font-medium text-white/90 underline-offset-4 hover:underline"
              >
                Talk to sales →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <Link href="#top" className="flex items-center gap-2.5">
              <div
                className="w-[50px] h-[50px]"
                style={{
                  WebkitMask:
                    "url('/NarventLogoOnly.png') center / contain no-repeat",
                  mask: "url('/NarventLogoOnly.png') center / contain no-repeat",
                  backgroundImage: BRAND_GRADIENT,
                }}
              />
              <Image
                src="/NarventTextOnlyViolet.png"
                alt="Narvent"
                width={112}
                height={26}
              />
            </Link>
            <p className="max-w-xs text-sm text-white/50">
              Autonomous workflows for modern teams.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <SocialLink label="X" href="#" />
              <SocialLink label="gh" href="#" />
              <SocialLink label="in" href="#" />
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4
                className="text-xs font-medium uppercase tracking-wider text-white/40"
                style={fontMono}
              >
                {col.title}
              </h4>
              {col.links.map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2026 Narvent. All rights reserved.
          </p>
          <p className="text-xs text-white/30" style={fontMono}>
            Built for autonomous teams
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
      style={fontMono}
    >
      {label}
    </Link>
  );
}
