import { BRAND_GRADIENT, cn } from "@/lib/utils";

export default function Visual() {
  return (
    <div className="relative">
      <svg viewBox="0 0 480 340" className="w-full bg-transparent">
        <defs>
          <mask id="logo">
            <image
              x="190px"
              y="120px"
              width="100px"
              height="100px"
              href="/NarventLogoOnly.png"
              className="bg-transparent"
            ></image>
          </mask>
          <linearGradient
            id="brand_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-1)" />
            <stop offset="55%" stopColor="var(--color-2)" />
            <stop offset="100%" stopColor="var(--color-3)" />
          </linearGradient>

          <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-1)" />
            <stop offset="55%" stopColor="var(--color-2)" />
            <stop offset="100%" stopColor="var(--color-3)" />
          </linearGradient>
        </defs>

        <path
          d="M172,47 C206,47 188,133 220,133"
          stroke="url(#flowLine)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 8"
          opacity="0.85"
          style={{ animation: "flow-dash 1.4s linear infinite" }}
        />

        <rect
          width="100px"
          height="100px"
          mask="url(#logo)"
          x="190px"
          y="120px"
          fill="url(#brand_gradient)"
        />
      </svg>
    </div>
  );
}
