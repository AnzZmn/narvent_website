// IntroGate.tsx
"use client";
import { useCallback, useState } from "react";
import IntroAnimation from "./IntroAnimationClient"; // ← now the client-only wrapper

export type IntroGateProps = {
  children: React.ReactNode;
  onIntroDone?: () => void;
};

export function IntroGate({ children, onIntroDone }: IntroGateProps) {
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    onIntroDone?.();
  }, [onIntroDone]);

  return (
    <>
      <IntroAnimation onDone={reveal} />
      <div
        style={
          revealed
            ? { animation: "page-in 1s cubic-bezier(.22,.9,.24,1) both" }
            : { opacity: 0, pointerEvents: "none" }
        }
      >
        {children}
      </div>
    </>
  );
}
