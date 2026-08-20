"use Client";

const METRICS = [
  {
    id: "1",
    metric: "Registered talent",
    figure: 30,
    sub: "K+",
    foot: "Across South India",
  },
  {
    id: "2",
    metric: "Successfull projects",
    figure: 5000,
    sub: "+",
  },
  {
    id: "3",
    metric: "Trusted clients",
    figure: 50,
    sub: "+",
  },
  {
    id: "4",
    metric: "Annual payouts",
    figure: 5,
    sub: "M +",
  },
];

import {
  BRAND_GRADIENT,
  cn,
  CONTAINER,
  fontDisplay,
  fontMono,
} from "@/lib/utils";
import SplitText from "./SplitText";
import CountUp from "./CountUp";
import { HorizontalGlowLine } from "./glowLine";

export default function Capabilities() {
  return (
    <section
      id="workers"
      className="mx-auto h-screen text-center flex items-center w-screen snap-start"
    >
      <div className=" relative flex w-screen flex-col justify-center items-center">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] mt-5"
          style={{ ...fontMono, color: "var(--color-1)" }}
        >
          What is Narvent
        </span>
        <HorizontalGlowLine
          color="from-transparent via-[var(--color-3)] to-transparent"
          className="max-w-3xl bg-transparent"
        />
        <div className="flex">
          <SplitText
            text="The frontline workforce management platform you'll ever need."
            className={cn(
              "text-balance text-center font-bold tracking-[-0.08em] text-[#ffffff]",
              "text-[clamp(3rem,10vw,1rem)]",
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
            textAlign="center"
            highlightWords={["workforce"]}
            highlightClassName="text-[var(--color-1)]"
          ></SplitText>
        </div>
        <div className="relative max-w-2xl">
          <SplitText
            text="Narvent is a workforce infrastructure platform built around the idea
            that finding, managing, and deploying frontline talent should be as
            seamless as managing technology. From the first hire to the last
            deploy, Narvent handles the parts that used to need someone
            watching."
            className={cn("mt-4 text-lg text-white/60")}
            delay={10}
            duration={0.5}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            highlightWords={["frontline", "talent", "Narvent"]}
            highlightClassName="text-[var(--color-1)]"
          ></SplitText>
        </div>
        <div className=" w-5xl h-auto flex mt-10">
          <div className="grid h-[100px] w-full max-w-5xl grid-cols-4 gap-2 p-2 pl-30">
            {METRICS.map((item) => {
              return (
                <div
                  className="flex flex-col justify-start "
                  style={{ ...fontDisplay }}
                  key={item.id}
                >
                  <span
                    className="flex flex-row gap-1 justify-start text-2xl font-bold text-[var(--color-1)]"
                    style={{
                      ...fontMono,
                    }}
                  >
                    <CountUp
                      from={0}
                      to={item.figure}
                      separator=","
                      direction="up"
                      duration={0.5}
                      className="count-up-text text-start"
                      delay={0}
                    />
                    <p className="">{item.sub}</p>
                  </span>
                  <span className="text-md text-[#CBB8FF] font-semibold text-start">
                    {item.metric}
                  </span>
                  <span className="text-xs text-white/60 font-normal text-start">
                    {item.metric}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
