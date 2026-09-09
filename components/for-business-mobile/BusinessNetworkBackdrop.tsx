import "./for-business.css";

/* Decorative worker-network field behind the hero copy.
   Geometry is data-driven; motion comes from the keyframes in for-business.css,
   applied through Tailwind arbitrary-property classes. */

const INK = "rgba(74,52,207,";

type Node = { x: number; y: number; r: number; anim: string };

/* Literal class strings so Tailwind's scanner can see every variant. */
const NODES: Node[] = [
  {
    x: 30,
    y: 112,
    r: 18,
    anim: "[animation:nv-breathe_5.5s_ease-in-out_0s_infinite]",
  },
  {
    x: 104,
    y: 170,
    r: 13,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_0.7s_infinite]",
  },
  {
    x: 70,
    y: 252,
    r: 11,
    anim: "[animation:nv-breathe_7.5s_ease-in-out_1.4s_infinite]",
  },
  {
    x: 188,
    y: 88,
    r: 12,
    anim: "[animation:nv-breathe_5.5s_ease-in-out_2.1s_infinite]",
  },
  {
    x: 358,
    y: 146,
    r: 16,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_0.4s_infinite]",
  },
  {
    x: 292,
    y: 208,
    r: 19,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_1.1s_infinite]",
  },
  {
    x: 344,
    y: 292,
    r: 11,
    anim: "[animation:nv-breathe_7.5s_ease-in-out_1.8s_infinite]",
  },
  {
    x: 214,
    y: 142,
    r: 10,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_2.5s_infinite]",
  },
  {
    x: 42,
    y: 470,
    r: 13,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_0.9s_infinite]",
  },
  {
    x: 124,
    y: 528,
    r: 17,
    anim: "[animation:nv-breathe_7.5s_ease-in-out_0.2s_infinite]",
  },
  {
    x: 56,
    y: 608,
    r: 11,
    anim: "[animation:nv-breathe_7.5s_ease-in-out_1.6s_infinite]",
  },
  {
    x: 336,
    y: 498,
    r: 12,
    anim: "[animation:nv-breathe_5.5s_ease-in-out_2.3s_infinite]",
  },
  {
    x: 264,
    y: 566,
    r: 16,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_0.6s_infinite]",
  },
  {
    x: 348,
    y: 626,
    r: 11,
    anim: "[animation:nv-breathe_7.5s_ease-in-out_1.3s_infinite]",
  },
];

type Link = {
  id: string;
  d: string;
  flow: string;
  packet: { dur: string; begin: string };
};

const LINKS: Link[] = [
  {
    id: "nvP1",
    d: "M30 112 C 62 128, 84 142, 104 170 S 88 224, 70 252",
    flow: "[animation:nv-flow_9s_linear_infinite]",
    packet: { dur: "7s", begin: "0s" },
  },
  {
    id: "nvP2",
    d: "M104 170 C 132 148, 160 112, 188 88",
    flow: "[animation:nv-flow_10s_linear_infinite]",
    packet: { dur: "8.6s", begin: "0.8s" },
  },
  {
    id: "nvP3",
    d: "M358 146 C 330 168, 308 182, 292 208 S 322 268, 344 292",
    flow: "[animation:nv-flow_11s_linear_infinite]",
    packet: { dur: "10.2s", begin: "1.6s" },
  },
  {
    id: "nvP4",
    d: "M292 208 C 268 186, 240 158, 214 142",
    flow: "[animation:nv-flow_12s_linear_infinite]",
    packet: { dur: "11.8s", begin: "2.4s" },
  },
  {
    id: "nvP5",
    d: "M42 470 C 74 486, 104 502, 124 528 S 82 584, 56 608",
    flow: "[animation:nv-flow_13s_linear_infinite]",
    packet: { dur: "7s", begin: "3.2s" },
  },
  {
    id: "nvP6",
    d: "M336 498 C 308 522, 284 540, 264 566 S 322 606, 348 626",
    flow: "[animation:nv-flow_14s_linear_infinite]",
    packet: { dur: "8.6s", begin: "4s" },
  },
  {
    id: "nvP7",
    d: "M124 528 C 172 552, 214 560, 264 566",
    flow: "[animation:nv-flow_15s_linear_infinite]",
    packet: { dur: "10.2s", begin: "4.8s" },
  },
  {
    id: "nvP8",
    d: "M188 88 C 232 96, 268 112, 292 208",
    flow: "[animation:nv-flow_16s_linear_infinite]",
    packet: { dur: "11.8s", begin: "5.6s" },
  },
  {
    id: "nvP9",
    d: "M70 252 C 46 330, 38 402, 42 470",
    flow: "[animation:nv-flow_17s_linear_infinite]",
    packet: { dur: "7s", begin: "6.4s" },
  },
];

const HALOS = [
  { x: 104, y: 170, anim: "[animation:nv-halo_4.6s_ease-out_0s_infinite]" },
  { x: 292, y: 208, anim: "[animation:nv-halo_4.6s_ease-out_1.2s_infinite]" },
  { x: 124, y: 528, anim: "[animation:nv-halo_4.6s_ease-out_2.1s_infinite]" },
  { x: 358, y: 146, anim: "[animation:nv-halo_4.6s_ease-out_3s_infinite]" },
  { x: 264, y: 566, anim: "[animation:nv-halo_4.6s_ease-out_0.6s_infinite]" },
];

export default function BusinessNetworkBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 390 693" className="block h-svh">
        <defs>
          <radialGradient id="nvNodeFill" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor={`${INK}.13)`} />
            <stop offset="100%" stopColor={`${INK}.03)`} />
          </radialGradient>
          <radialGradient id="nvBlobA">
            <stop offset="0%" stopColor="rgba(109,86,255,.30)" />
            <stop offset="100%" stopColor="rgba(109,86,255,0)" />
          </radialGradient>
          <radialGradient id="nvBlobB">
            <stop offset="0%" stopColor="rgba(52,140,207,.24)" />
            <stop offset="100%" stopColor="rgba(52,140,207,0)" />
          </radialGradient>
        </defs>

        <g className="nv-origin [animation:nv-blob_18s_ease-in-out_infinite]">
          <circle cx="66" cy="176" r="150" fill="url(#nvBlobA)" />
        </g>
        <g className="nv-origin [animation:nv-blob_22s_ease-in-out_3s_infinite_reverse]">
          <circle cx="330" cy="556" r="165" fill="url(#nvBlobB)" />
        </g>

        <g fill="none" strokeLinecap="round">
          {LINKS.map((l) => (
            <path
              key={l.id}
              id={l.id}
              d={l.d}
              stroke={`${INK}.2)`}
              strokeWidth={1.1}
              strokeDasharray="3 7"
              className={l.flow}
            />
          ))}
        </g>

        <g className="[animation:nv-drift_20s_ease-in-out_infinite]">
          {NODES.map((n) => (
            <g key={`${n.x}-${n.y}`} className={`nv-origin ${n.anim}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="url(#nvNodeFill)"
                stroke={`${INK}.26)`}
                strokeWidth={1}
              />
              <g
                transform={`translate(${n.x} ${n.y}) scale(${(n.r / 17).toFixed(2)})`}
                stroke={`${INK}.5)`}
                strokeWidth={1.5}
                fill="none"
                strokeLinecap="round"
              >
                <circle cx="0" cy="-4.4" r="3.9" />
                <path d="M-7 7.2a7 7 0 0 1 14 0" />
              </g>
            </g>
          ))}
        </g>

        {HALOS.map((h) => (
          <circle
            key={`halo-${h.x}-${h.y}`}
            cx={h.x}
            cy={h.y}
            r={16}
            fill="none"
            stroke={`${INK}.4)`}
            strokeWidth={1}
            className={`nv-origin ${h.anim}`}
          />
        ))}

        {LINKS.map((l) => (
          <circle key={`packet-${l.id}`} r={2.6} fill="#4a34cf" opacity={0.75}>
            <animateMotion
              dur={l.packet.dur}
              begin={l.packet.begin}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${l.id}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
}
