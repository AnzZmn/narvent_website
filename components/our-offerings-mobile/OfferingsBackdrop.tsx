import "./our-offerings.css";

/* Decorative network field behind the offerings carousel.
   Motion lives in our-offerings.css, bound via Tailwind arbitrary-property classes. */

const STROKE = "rgba(74,52,207,.24)";

const LINKS = [
  {
    d: "M18 84 C 78 52, 132 108, 196 78",
    flow: "[animation:nv-flow_12s_linear_infinite]",
  },
  {
    d: "M372 122 C 322 166, 286 132, 246 172",
    flow: "[animation:nv-flow_15s_linear_infinite]",
  },
  {
    d: "M22 612 C 96 578, 148 626, 214 600",
    flow: "[animation:nv-flow_14s_linear_infinite]",
  },
];

const NODES = [
  {
    x: 24,
    y: 86,
    r: 17,
    worker: 3.7,
    anim: "[animation:nv-breathe_6.5s_ease-in-out_0s_infinite]",
  },
  {
    x: 62,
    y: 204,
    r: 13,
    worker: 3.0,
    anim: "[animation:nv-breathe_7.4s_ease-in-out_0.8s_infinite]",
  },
  {
    x: 368,
    y: 124,
    r: 15,
    worker: 3.3,
    anim: "[animation:nv-breathe_6.1s_ease-in-out_1.5s_infinite]",
  },
  {
    x: 342,
    y: 240,
    r: 11,
    worker: 0,
    anim: "[animation:nv-breathe_7.8s_ease-in-out_0.4s_infinite]",
  },
  {
    x: 30,
    y: 616,
    r: 14,
    worker: 3.1,
    anim: "[animation:nv-breathe_6.8s_ease-in-out_1.1s_infinite]",
  },
  {
    x: 358,
    y: 556,
    r: 12,
    worker: 0,
    anim: "[animation:nv-breathe_7.2s_ease-in-out_2s_infinite]",
  },
];

export default function OfferingsBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 h-svh w-svh"
      aria-hidden="true"
    ></div>
  );
}
