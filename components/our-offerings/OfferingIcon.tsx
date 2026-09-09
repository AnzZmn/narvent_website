import type { IconKey } from "./offerings.data";

/** Single-path line icons at 24×24, stroke 1.5 — no icon library needed. */
const PATHS: Record<IconKey, string> = {
  phone:
    "M15.7 13.6a10.4 10.4 0 0 1-4.9-4.9m0 0 1.7-1.7-2.4-3.4L7 5.4c-.6.4-.9 1.1-.7 1.8a15.5 15.5 0 0 0 10.5 10.5c.7.2 1.4-.1 1.8-.7l1.8-3.1-3.4-2.4z",
  list: "M4 6h6M4 10h10M4 14h7M4 18h12M17 5v3M20 9v3M17 13v3",
  idcard: "M4 4h16v16H4zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-3.5 6c0-2 1.6-3 3.5-3s3.5 1 3.5 3",
  loyalty:
    "M3 15c1.5-1 3-1 4.5 0l2 1.4M9 13.5 5.5 11m6.6-1.5a2.6 2.6 0 0 0-3.7 0 2.6 2.6 0 0 0 0 3.7l1.9 1.9 1.8-1.9a2.6 2.6 0 0 0 0-3.7M14 17l5-2.5M19 6l1.5 1.5M17 4v2",
  people:
    "M15 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 4 17.5V19M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10.5 8v-1.5a3.5 3.5 0 0 0-2.6-3.4M15 5.2a3 3 0 0 1 0 5.6",
  robot:
    "M12 3v2m-4 3h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m1.5 4h.01m4.99 0h.01M6 20l3-4m9 4-3-4M9 20h6",
  doc: "M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zm0 0v4h4M12 12v.01M12 15v3",
  network:
    "M12 4a2.5 2.5 0 0 1 2 4v1.5H10V8a2.5 2.5 0 0 1 2-4M12 9.5v3m0 0H5v2m7-2h7v2M5 18h2v2H5zm7 0h2v2h-2zm7 0h2v2h-2z",
  megaphone: "M5 9v6m0-6 12-4v14L5 15m0 0v5",
  clipboard: "M9 4h6v2H9zm0 1H7a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2",
  bag: "M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2m-3 5v3m-1.5-1.5h3",
  chart: "M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zm0 0v4h4M8.5 16l2.5-3 2 1.5 2.5-3.5",
};

export default function OfferingIcon({ name }: { name: IconKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
