"use client";

import {
  BRAND_GRADIENT,
  cn,
  fontDisplay,
  fontManiac,
  fontMono,
} from "@/lib/utils";
import SplitText from "./SplitText";
import { Button } from "./ui/button";
import HeroStats from "./HeroStats";
import BorderGlow from "./BorderGlow";
import { outline } from "three/examples/jsm/tsl/display/OutlineNode.js";
import Image from "next/image";
import OrbitalProcess from "./Orbit";

export default function Hero() {
  return (
    <section id="Hero" className="w-screen h-screen flex snap-start">
      <div className="font-bold h-auto w-screen flex flex-row justify-center items-center pt-38">
        <div
          id="Content"
          className="  flex w-screen h-screen items-start pl-20 pb-30 flex-col justify-center gap-5"
        >
          <section
            id="Content"
            className="relative flex min-h-[60vh] w-full items-center justify-center px-6 py-20"
          >
            <div className="w-full max-w-6xl">
              <SplitText
                text="The WorkForce Layer for every Business  Everywhere."
                className={cn(
                  "text-balance text-center font-bold tracking-[-0.08em] text-[#ffffff]",
                  "text-[clamp(4rem,5vw,6rem)]",
                  "leading-[0.95] pb-10",
                )}
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="initial"
                highlightWords={["WorkForce", "Business"]}
                highlightClassName="text-[var(--color-1)]"
                swapWords={[
                  ["WorkForce", "Network"],
                  ["Business", "Worker"],
                ]}
                swapDuration={0.45}
                swapInterval={6000}
              ></SplitText>

              <p
                style={{
                  margin: 0,
                  width: "700px",
                  color: "#f6f6f6",
                  fontSize: "24px",
                  lineHeight: "1.4",
                  textAlign: "initial",
                  ...fontDisplay,
                }}
                className="font-light"
              >
                AI-powered workforce infrastructure for managed staffing, gig
                work, and enterprise operations.
              </p>
              <div className="flex flex-row gap-5">
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  backgroundColor="var(--color-2)"
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                  className="mt-8 text-xs text-wrap font-normal text-white rounded-md justify-center items-center"
                >
                  Request a Demo
                </BorderGlow>
                <BorderGlow
                  edgeSensitivity={150}
                  glowColor="40 80 80"
                  glowRadius={200}
                  glowIntensity={0.5}
                  coneSpread={25}
                  animated={true}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                  className="mt-8 text-white text-wrap text-xs justify-center items-center rounded-md hover:bg-amber-100"
                >
                  Join the Community
                </BorderGlow>
              </div>
              <HeroStats />
            </div>
          </section>
        </div>

        <section
          id="Logo"
          className=" flex justify-center w-screen h-screen pr-20 items-end pb-35"
        ></section>
      </div>
    </section>
  );
}
