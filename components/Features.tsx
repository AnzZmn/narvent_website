import {
  Activity,
  Blocks,
  Bot,
  Gauge,
  LucideIcon,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { BRAND_GRADIENT, CONTAINER, fontDisplay, fontMono } from "@/lib/utils";

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
export default function Features() {
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
