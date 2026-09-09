"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const LINES = [
  { text: "One Platform", rule: "#8b7cff" },
  { text: "Unlimited Talent", rule: "#c156ff" },
  { text: "Infinite Possibilities", rule: "#5694ff" },
];

const LINE_DUR = 2000; // ms each line is on screen
const STAGGER = 1800; // ms between line starts (they cross-fade slightly)
const START = 250;
const TOTAL = START + STAGGER * (LINES.length - 1) + LINE_DUR; // ≈ 5850ms
const FADE = 700;

const SEEN_KEY = "narvent-intro-seen";

/**
 * Whether the intro should be skipped, read as an external store so SSR and the
 * first client render agree (server snapshot = false = play). React re-renders
 * after hydration if the real snapshot differs — no hydration mismatch.
 */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function makeSnapshot(once: boolean) {
  return () => {
    try {
      if (once && window.localStorage.getItem(SEEN_KEY) === "1") return true;
    } catch {
      /* private mode — ignore */
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };
}

const serverSnapshot = () => false;

/**
 * Full-screen intro: three taglines fade in and out in sequence, then the
 * overlay fades away and reveals the page. Click anywhere to skip.
 */
export default function IntroAnimation({
  onDone,
  once = true,
}: {
  onDone?: () => void;
  once?: boolean;
}) {
  const getSnapshot = useRef(makeSnapshot(once));
  const shouldSkip = useSyncExternalStore(
    subscribe,
    getSnapshot.current,
    serverSnapshot,
  );

  const [phase, setPhase] = useState<"playing" | "leaving" | "done">("playing");
  const finished = shouldSkip || phase === "done";

  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const leave = useCallback(() => {
    setPhase((p) => (p === "playing" ? "leaving" : p));
  }, []);

  // playing -> leaving -> done, one timer per transition
  useEffect(() => {
    if (finished) return undefined;
    if (phase === "playing") {
      const t = window.setTimeout(leave, TOTAL);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setPhase("done"), FADE);
    return () => clearTimeout(t);
  }, [finished, phase, leave]);

  // outside-React side effects
  useEffect(() => {
    if (finished) {
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      doneRef.current?.();
      return undefined;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [finished]);

  if (finished) return null;

  return (
    <div
      onClick={leave}
      role="presentation"
      className="fixed inset-0 z-[9999] grid cursor-pointer place-items-center bg-[#0b0813] transition-opacity"
      style={{
        opacity: phase === "leaving" ? 0 : 1,
        transitionDuration: `${FADE}ms`,
      }}
    >
      <div className="relative grid place-items-center px-8 text-center">
        {LINES.map((line, i) => {
          const delay = `${START + i * STAGGER}ms`;
          return (
            <div
              key={line.text}
              className="col-start-1 row-start-1 flex flex-col items-center gap-5 opacity-0"
              style={{
                animation: `intro-line ${LINE_DUR}ms cubic-bezier(.22,.9,.24,1) ${delay} both`,
              }}
            >
              <span className="bg-[#ffffff] bg-clip-text font-[family-name:var(--font-display)] text-[clamp(40px,7.4vw,86px)] font-extrabold leading-none tracking-[-0.05em] text-transparent">
                {line.text}
              </span>
            </div>
          );
        })}
      </div>

      <span className="absolute bottom-[34px] left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#f2ecff]/30">
        Click to skip
      </span>
    </div>
  );
}
