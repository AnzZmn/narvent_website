import { ArrowRight } from "lucide-react";
import SplitText from "../SplitText";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SwapWord({ a, b }: { a: string; b: string }) {
  return (
    <span className="relative block py-1">
      <span className="invisible">{a}</span>
      <span className="nv-word-a absolute inset-x-0 top-1 text-center text-[#4a34cf]">
        {a}
      </span>
      <span className="nv-word-b absolute inset-x-0 top-1 text-center text-[#4a34cf]">
        {b}
      </span>
    </span>
  );
}

export function HeroCopy() {
  const router = useRouter();
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center px-[22px] pt-10 text-center">
      <div className="nv-rise inline-flex items-center gap-2 rounded-full border border-[rgba(74,52,207,0.22)] bg-white/90 py-[7px] pl-[11px] pr-3.5 backdrop-blur-[6px]">
        <span className="nv-dot h-[7px] w-[7px] rounded-full bg-[#4a34cf]" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4a34cf]">
          46 roles open today
        </span>
      </div>

      <h1 className="mt-[26px] flex flex-col items-center font-[Archivo] text-[44px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#191428]">
        <span className="nv-rise">The</span>

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
          textAlign="center"
          highlightWords={["Talent"]}
          highlightClassName="text-[#4a34cf]"
          swapWords={[["Talent", "Network"]]}
          swapDuration={0.45}
          swapInterval={6000}
        />
        <span className="nv-rise nv-d1 py-1">Layer for every</span>

        <SplitText
          text="Business"
          className=""
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          highlightWords={["Business"]}
          highlightClassName="text-[#4a34cf]"
          swapWords={[["Business", "Talent"]]}
          swapDuration={0.45}
          swapInterval={6000}
        />
        <span className="nv-rise nv-d2 py-1">Everywhere.</span>
      </h1>

      <p className="nv-rise nv-d3 mt-[22px] max-w-[305px] font-[Archivo] text-[15.5px] leading-[1.6] text-[rgba(25,20,40,0.6)] [text-wrap:pretty]">
        AI-powered workforce infrastructure for managed staffing, gig services
        and enterprise operations &mdash; sourcing to payouts.
      </p>

      <div className="nv-rise nv-d4 mt-8 flex w-full flex-col gap-[11px]">
        <Link
          href="https://www.talent.narvent.in/join"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            window.location.href =
              "https://wa.me/918848780644?text=Hi%2C%20I%20am%20available%20to%20work";
          }}
          className="flex h-[54px] items-center justify-center gap-2.5 rounded-[10px] bg-[#4a34cf] font-[Archivo] text-[16.5px] font-semibold text-white shadow-[0_14px_30px_rgba(74,52,207,0.28)] transition-colors hover:bg-[#3b2ab0]"
        >
          find work.
          <ArrowRight className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
        </Link>
        <Link
          href="#Business"
          className="flex h-[54px] items-center justify-center gap-2.5 rounded-[10px] border border-[rgba(20,16,31,0.14)] bg-white font-[Archivo] text-[16.5px] font-medium text-[#191428] transition-colors hover:border-[rgba(74,52,207,0.5)]"
          onClick={(e) => {
            e.preventDefault();
            router.refresh();
            router.push("/ContactUs");
          }}
        >
          Hire from the pool
        </Link>
      </div>

      <div className="mt-[28px] pb-5 flex items-center gap-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[rgba(25,20,40,0.42)]">
        <span>Trusted by 100+ teams</span>
        <span className="h-1 w-1 rounded-full bg-[rgba(25,20,40,0.22)]" />
        <span>129 cities</span>
      </div>
    </div>
  );
}
