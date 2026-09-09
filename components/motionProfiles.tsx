// components/motionProfiles.ts
import {
  MotionValue,
  useTransform,
  useSpring,
  SpringOptions,
} from "motion/react";

export type MotionProfileFn = (
  px: MotionValue<number>,
  py: MotionValue<number>,
) => {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
};

interface ProfileConfig {
  spring: SpringOptions;
  build: (
    px: MotionValue<number>,
    py: MotionValue<number>,
  ) => {
    rawX: MotionValue<number>;
    rawY: MotionValue<number>;
    rawRotate: MotionValue<number>;
    rawScale: MotionValue<number>;
  };
}

// Each profile reads the same shared px/py but wires them up differently —
// different axis mapping, different inversion, different magnitude.
// This is what makes cards feel independently alive instead of uniformly scaled.
const PROFILES: Record<string, ProfileConfig> = {
  // Drifts straight toward the pointer, gentle rotate, no scale change
  drift: {
    spring: { stiffness: 120, damping: 20, mass: 0.6 },
    build: (px, py) => ({
      rawX: useTransform(px, [-1, 1], [-20, 20]),
      rawY: useTransform(py, [-1, 1], [-20, 20]),
      rawRotate: useTransform(py, [-1, 1], [4, -4]),
      rawScale: useTransform(() => 1),
    }),
  },
  // Drifts AWAY from pointer (inverted) — creates a "push" feeling
  recoil: {
    spring: { stiffness: 90, damping: 14, mass: 0.9 }, // looser, more overshoot
    build: (px, py) => ({
      rawX: useTransform(px, [-1, 1], [24, -24]),
      rawY: useTransform(py, [-1, 1], [16, -16]),
      rawRotate: useTransform(px, [-1, 1], [-6, 6]),
      rawScale: useTransform(() => 1),
    }),
  },
  // Reacts mostly to X, barely to Y, heavier rotation swing — feels "hinged"
  swing: {
    spring: { stiffness: 160, damping: 12, mass: 0.5 }, // snappier, springier
    build: (px, py) => ({
      rawX: useTransform(px, [-1, 1], [-14, 14]),
      rawY: useTransform(py, [-1, 1], [-6, 6]),
      rawRotate: useTransform(px, [-1, 1], [-12, 12]),
      rawScale: useTransform(() => 1),
    }),
  },
  // Cross-axis: horizontal pointer movement drives vertical drift and vice versa
  crossAxis: {
    spring: { stiffness: 100, damping: 18, mass: 0.7 },
    build: (px, py) => ({
      rawX: useTransform(py, [-1, 1], [-18, 18]),
      rawY: useTransform(px, [-1, 1], [-18, 18]),
      rawRotate: useTransform(py, [-1, 1], [3, -3]),
      rawScale: useTransform(() => 1),
    }),
  },
  // Barely moves, but breathes with a subtle scale pulse tied to distance
  anchor: {
    spring: { stiffness: 200, damping: 26, mass: 0.4 }, // stiff, minimal overshoot
    build: (px, py) => ({
      rawX: useTransform(px, [-1, 1], [-6, 6]),
      rawY: useTransform(py, [-1, 1], [-6, 6]),
      rawRotate: useTransform(() => 0),
      rawScale: useTransform(
        [px, py],
        ([latestPx, latestPy]: number[]) =>
          1 + (Math.abs(latestPx) + Math.abs(latestPy)) * 0.015,
      ),
    }),
  },
};

export function useMotionProfile(
  profile: keyof typeof PROFILES,
  px: MotionValue<number>,
  py: MotionValue<number>,
) {
  const cfg = PROFILES[profile];
  const { rawX, rawY, rawRotate, rawScale } = cfg.build(px, py);
  return {
    x: useSpring(rawX, cfg.spring),
    y: useSpring(rawY, cfg.spring),
    rotate: useSpring(rawRotate, cfg.spring),
    scale: useSpring(rawScale, cfg.spring),
  };
}

export type MotionProfileName = keyof typeof PROFILES;
