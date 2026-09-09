// components/HeroPointerContext.tsx
"use client";

import { createContext, useContext, useRef } from "react";
import { useMotionValue, MotionValue } from "motion/react";

interface PointerContextValue {
  px: MotionValue<number>; // normalized -1..1
  py: MotionValue<number>;
}

const PointerContext = createContext<PointerContextValue | null>(null);

export default function HeroPointerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
    px.set(nx);
    py.set(ny);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <PointerContext.Provider value={{ px, py }}>
        {children}
      </PointerContext.Provider>
    </div>
  );
}

export function useHeroPointer() {
  const ctx = useContext(PointerContext);
  if (!ctx)
    throw new Error("useHeroPointer must be used within HeroPointerProvider");
  return ctx;
}
