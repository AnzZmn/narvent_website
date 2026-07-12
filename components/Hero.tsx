import {
  BRAND_GRADIENT,
  cn,
  CONTAINER,
  fontDisplay,
  fontMono,
  gradientText,
} from "@/lib/utils";
import { ArrowRight, Badge, Play, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { HeroVisual } from "./HeroVisual";

export default function Hero() {
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
            className="gap-1.5 rounded-full border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: "var(--color-3)" }}
            />
            AI-native work orchestratior
          </Badge>

          <h1
            className="mt-6 text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[3.2rem]"
            style={{
              ...fontDisplay,
              animation: "fade-up 0.6s ease-out 0.08s both",
            }}
          >
            One Platform
            <br />
            <span style={gradientText}>
              Unlimited Talent
              <br />
              infinite Possibilities
            </span>
            <br />
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
