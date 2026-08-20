"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Users,
  CheckSquare,
  Briefcase,
  Calendar,
  BookOpen,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import styles from "./OrbitalProcess.module.css";

/**
 * OrbitalProcess
 * -----------------------------------------------------------------------
 * A circular 6-step process diagram: six stage nodes arranged evenly
 * around a ring with an animated gradient arc that highlights the path
 * leading into the active step. The active step advances automatically
 * on a timer, pausing on hover/focus so a user can inspect a step.
 *
 * Every dimension is derived from NODE_REM (the node circle's diameter),
 * so changing that one constant rescales the whole diagram.
 *
 * Uses a CSS Module (OrbitalProcess.module.css) — place both files in the
 * same folder, e.g. app/components/OrbitalProcess.tsx +
 * app/components/OrbitalProcess.module.css — then render <OrbitalProcess />
 * inside a dark-background section.
 * Requires: lucide-react
 * -----------------------------------------------------------------------
 */

type Stage = {
  id: string;
  label: string;
  tag: string;
  icon: LucideIcon;
  color: string; // base accent color for this node
  glow: string; // brighter glow variant
};

const STAGES: Stage[] = [
  {
    id: "hire",
    label: "Hire",
    tag: "staffBetter",
    icon: Users,
    color: "#3B63E0",
    glow: "#6C8CFF",
  },
  {
    id: "verify",
    label: "Verify",
    tag: "verifyBetter",
    icon: CheckSquare,
    color: "#6C6FE0",
    glow: "#9A9CFF",
  },
  {
    id: "onboard",
    label: "Onboard",
    tag: "goBetter",
    icon: Briefcase,
    color: "#A6469C",
    glow: "#D06BC6",
  },
  {
    id: "attend",
    label: "Attend",
    tag: "goBetter",
    icon: Calendar,
    color: "#6B5B7B",
    glow: "#9A87AC",
  },
  {
    id: "upskill",
    label: "Upskill",
    tag: "skillBetter",
    icon: BookOpen,
    color: "#1FA97F",
    glow: "#4CDA9F",
  },
  {
    id: "pay",
    label: "Pay",
    tag: "manageBetter",
    icon: CreditCard,
    color: "#17B8C4",
    glow: "#4FE0EA",
  },
];

// ---- Everything below is derived from this one constant ----------------
const NODE_REM = 2; // node circle diameter
const BASE_NODE_REM = 5.6; // the diameter the rest of the layout was tuned for
const SCALE = NODE_REM / BASE_NODE_REM;

const SIZE = Math.round(600 * SCALE); // svg viewBox size, in rem-equivalent px
const CENTER = SIZE / 2;
const RING_RADIUS = Math.round(210 * SCALE);
const ARC_WIDTH = Math.max(1.5, +(5 * SCALE).toFixed(2));
const STAGE_REM = +(SIZE / 16).toFixed(2);
const STEP_ANGLE = 360 / STAGES.length;

const AUTOPLAY_MS = 2600;
// -------------------------------------------------------------------------

function pointOnRing(index: number, radius: number = RING_RADIUS) {
  // angle 0 = top, increases clockwise
  const angle = ((index * STEP_ANGLE - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function describeArc(startIdx: number, endIdx: number, radius: number) {
  const start = pointOnRing(startIdx, radius);
  const end = pointOnRing(endIdx, radius);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function OrbitalProcess() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % STAGES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const active = STAGES[activeIdx];
  const prevIdx = (activeIdx - 1 + STAGES.length) % STAGES.length;
  const prev = STAGES[prevIdx];

  const arcPath = useMemo(
    () => describeArc(prevIdx, activeIdx, RING_RADIUS),
    [prevIdx, activeIdx],
  );

  const wrapStyle = {
    "--stage-rem": `${STAGE_REM}rem`,
    "--node-rem": `${NODE_REM}rem`,
  } as React.CSSProperties;

  return (
    <section
      className={styles.wrap}
      style={wrapStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stage}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="presentation"
        >
          <defs>
            <linearGradient
              id="arcGradient"
              gradientUnits="userSpaceOnUse"
              x1={pointOnRing(prevIdx).x}
              y1={pointOnRing(prevIdx).y}
              x2={pointOnRing(activeIdx).x}
              y2={pointOnRing(activeIdx).y}
            >
              <stop offset="0%" stopColor={prev.glow} />
              <stop offset="100%" stopColor={active.glow} />
            </linearGradient>
            <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={2 * SCALE * 3.5} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* faint full guide ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
            strokeDasharray="1.5 6"
          />

          {/* dashed hexagon connecting consecutive node centers */}
          <polygon
            points={STAGES.map((_, i) => {
              const p = pointOnRing(i);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1}
            strokeDasharray="1 5"
          />

          {/* dashed accent line from previous stage into center */}
          <line
            x1={pointOnRing(prevIdx).x}
            y1={pointOnRing(prevIdx).y}
            x2={CENTER}
            y2={CENTER}
            stroke={prev.glow}
            strokeOpacity={0.5}
            strokeWidth={1}
            strokeDasharray="1 4"
          />

          {/* highlighted gradient arc: previous -> active, animates as activeIdx changes */}
          <path
            className={styles.arc}
            d={arcPath}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth={ARC_WIDTH}
            strokeLinecap="round"
            filter="url(#softGlow)"
          />
        </svg>

        {/* nodes */}
        {STAGES.map((stage, i) => {
          const pos = pointOnRing(i);
          const isActive = i === activeIdx;
          const Icon = stage.icon;
          const leftHalf = pos.x < CENTER - 2;
          const rightHalf = pos.x > CENTER + 2;
          const nodeStyle = {
            left: `${(pos.x / SIZE) * 100}%`,
            top: `${(pos.y / SIZE) * 100}%`,
            "--accent": stage.color,
            "--accent-glow": stage.glow,
          } as React.CSSProperties;

          return (
            <button
              key={stage.id}
              type="button"
              className={cx(styles.node, isActive && styles.isActive)}
              style={nodeStyle}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setActiveIdx(i)}
              onFocus={() => setActiveIdx(i)}
              aria-pressed={isActive}
            >
              <span className={styles.nodeCircle}>
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <span
                className={cx(
                  styles.nodeLabel,
                  leftHalf
                    ? styles.alignRight
                    : rightHalf
                      ? styles.alignLeft
                      : styles.alignCenter,
                )}
              >
                <strong>{stage.label}</strong>
                <em>{stage.tag}</em>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
