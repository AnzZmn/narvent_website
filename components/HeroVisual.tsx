import { fontMono } from "@/lib/utils";
import "../app/globals.css";

export function HeroVisual() {
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
              strokeDashoffset={0}
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
