import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { BRAND_GRADIENT, fontDisplay } from "@/lib/utils";

export function CTASection() {
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
