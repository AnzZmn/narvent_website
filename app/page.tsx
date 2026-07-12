"use client";

import { body, cn, display, mono } from "@/lib/utils";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";

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
