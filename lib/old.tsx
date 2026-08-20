"use client";

import { body, cn, CONTAINER, display, mono } from "@/lib/utils";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";
import BackDrop from "@/components/backdrop";
import DotField from "@/components/DotField";

export default function Home() {
  return (
    <div
      className={cn(
        display.variable,
        body.variable,
        mono.variable,
        "relative min-h-screen overflow-x-clip text-[#05050b] antialiased",
      )}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <Nav />
      <div
        className={cn(
          CONTAINER,
          "absolute left-1/2 top-0 -translate-x-1/2 overflow-x-clip",
        )}
      >
        <main className="relative z-10 flex flex-col justify-start bg-black">
          <div
            style={{ width: "100%", position: "absolute" }}
            className="inset-0 h-screen"
          >
            <DotField
              dotRadius={3}
              dotSpacing={28}
              waveAmplitude={0}
              cursorForce={0.1}
              gradientFrom="#A855F7"
              gradientTo="#B497CF"
              bulgeOnly={true}
            />
          </div>
          <Hero />
          <Features />
          <HowItWorks />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
