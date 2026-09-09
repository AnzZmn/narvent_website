"use client";

import { useEffect, useRef, useState } from "react";
import {
  EVENTS,
  ICON_PATHS,
  type NotificationEvent,
} from "./notifications.data";

const DELAY = 1800; // ms between cards
const WINDOW = 9; // fixed-length rolling feed: one in, one out per tick
const STEP = 84; // card height (68) + gap (16) — one row of travel
const GLIDE = 1.1; // seconds for the downward drift

function NotificationCard({
  event,
  newest,
}: {
  event: NotificationEvent;
  newest: boolean;
}) {
  return (
    <article
      className="flex items-center gap-4 rounded-[18px] bg-white px-[19px] py-[15px] shadow-[0_18px_40px_rgba(0,0,0,.32)]"
      style={{
        animation: newest ? "slide-in .8s cubic-bezier(.22,.9,.24,1)" : "none",
      }}
    >
      <span
        className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px]"
        style={{ background: event.bg }}
      >
        <svg
          viewBox="0 0 24 24"
          width={20}
          height={20}
          fill="none"
          stroke="#14101f"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d={ICON_PATHS[event.icon]} />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col gap-[3px]">
        <span className="flex items-baseline gap-[7px] whitespace-nowrap">
          <strong className="text-[16.5px] font-bold tracking-[-0.01em] text-[#14101f]">
            {event.title}
          </strong>
          <em className="text-[13.5px] not-italic text-[#9a94a8]">
            · {event.time}
          </em>
        </span>
        <span className="truncate text-[14.5px] text-[#4a4458]">
          {event.body}
        </span>
      </span>
    </article>
  );
}

/**
 * Tilted, never-ending notification feed.
 *
 * Two mechanics worth understanding before editing:
 *
 * 1. SMOOTH DOWNWARD DRIFT. Inserting a card at the top would snap the rest of
 *    the stack down one row. So on each tick we jump the list UP by exactly one
 *    row with `transition: none`, then release it back to 0 on the next frame —
 *    the transition then glides everything down. STEP must stay equal to the
 *    real card height + gap, or the jump will be visible.
 *
 * 2. ONLY THE NEWEST CARD ANIMATES IN. The list is a fixed-length rolling
 *    window, so every render shifts array positions and React (keyed by index)
 *    reuses the DOM nodes. Giving older cards `animation: none` means that
 *    reshuffle never replays the entry animation on cards already on screen.
 *
 * Depth (opacity + scale by distance from the top) lives on a WRAPPER, not the
 * card: the card's own animation has a filled end state that would otherwise
 * overwrite it.
 */
export default function AnimatedNotificationList({
  degree,
}: {
  degree: string;
}) {
  const [count, setCount] = useState(1);
  const [jump, setJump] = useState(false);
  const release = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
      setJump(true);
      release.current = setTimeout(() => setJump(false), 40);
    }, DELAY);

    return () => {
      clearInterval(id);
      if (release.current) clearTimeout(release.current);
    };
  }, []);

  const start = Math.max(0, count - WINDOW);
  const shown: NotificationEvent[] = [];
  for (let k = start; k < count; k++) shown.push(EVENTS[k % EVENTS.length]);

  return (
    <div
      className="absolute inset-0 top-[-50%] left-[0] h-[560px] w-full"
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 0%",
        maskImage:
          "radial-gradient(96% 108% at 50% 24%,#000 46%,transparent 82%),linear-gradient(#000 75%,transparent 96%)",
        WebkitMaskImage:
          "radial-gradient(96% 108% at 50% 24%,#000 46%,transparent 82%),linear-gradient(#000 75%,transparent 96%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      {/* the 3D stage */}
      <div
        className="mx-auto h-[2500px] w-[500px]"
        style={{
          transformOrigin: "50% 0",
          transform: `translateY(300px) rotateX(38deg) rotateZ(${degree}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* the glide layer */}
        <div
          className="flex flex-col-reverse justify-end gap-4"
          style={{
            transform: `translateY(${jump ? -STEP : 0}px)`,
            transition: jump
              ? "none"
              : `transform ${GLIDE}s cubic-bezier(.22,.9,.24,1)`,
          }}
        >
          {shown.map((event, n) => {
            const fromTop = shown.length - 1 - n;
            return (
              <div
                key={n}
                className="flex-none"
                style={{
                  opacity: Math.max(0.28, 1 - fromTop * 0.16),
                  transform: `scale(${Math.max(0.92, 1 - fromTop * 0.018)})`,
                  transformOrigin: "50% 0",
                  transition: `opacity ${GLIDE}s ease, transform ${GLIDE}s cubic-bezier(.22,.9,.24,1)`,
                }}
              >
                <NotificationCard event={event} newest={fromTop === 0} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
