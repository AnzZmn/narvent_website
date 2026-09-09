import { useCallback, useEffect, useRef, useState } from "react";

interface SectionConfig {
  id: string;
  frequency: number;
}

interface UseForceScrollThroughSectionsOptions {
  threshold?: number;
  touchThreshold?: number;
  wheelThreshold?: number; // min |deltaY| before a wheel tick counts as "intent to jump"
  duration?: number; // ms, controls both scroll tween and frequency lerp
  enabled?: boolean; // set false while something else owns scroll (e.g. intro overlay)
}

// easeInOutCubic — smooth accelerate/decelerate, matches native smooth-scroll feel
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function useForceScrollThroughSections(
  sections: SectionConfig[],
  options: UseForceScrollThroughSectionsOptions = {},
) {
  const {
    threshold = 0.1,
    touchThreshold = 40,
    wheelThreshold = 24,
    duration = 900,
    enabled = true,
  } = options;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [frequency, setFrequency] = useState(sections[0]?.frequency ?? 1);

  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  // Watch every section; whichever is intersecting becomes the active index
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observers = elements.map(
      (el, index) =>
        new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveIndex(index);
          },
          { threshold },
        ),
    );

    elements.forEach((el, i) => observers[i].observe(el));
    return () => observers.forEach((o) => o.disconnect());
  }, [sections, threshold]);

  // Fix 2: land aligned with the same boundary useScrollProgress uses —
  // bottom-aligned when moving forward (matches scrollEnd = endBottom - vh),
  // top-aligned when moving backward (matches scrollStart = startTop).
  const triggerScroll = useCallback(
    (targetIndex: number, direction: "forward" | "backward") => {
      const target = sections[targetIndex];
      const targetEl = document.getElementById(target.id);
      if (!targetEl || isAnimating.current) return;

      isAnimating.current = true;

      const startY = window.scrollY;
      const vh = window.innerHeight;
      const rect = targetEl.getBoundingClientRect();

      const targetY =
        direction === "forward"
          ? startY + rect.bottom - vh // bottom-align: matches scrollEnd
          : startY + rect.top; // top-align: matches scrollStart

      const startFreq = frequency;
      const targetFreq = target.frequency;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(rawProgress);

        window.scrollTo(0, startY + (targetY - startY) * eased);
        setFrequency(startFreq + (targetFreq - startFreq) * eased);

        if (rawProgress < 1) {
          rafId.current = requestAnimationFrame(step);
        } else {
          isAnimating.current = false;
          rafId.current = null;
        }
      };

      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(step);
    },
    [sections, frequency, duration],
  );

  // Fix 1 + Fix 3: require real intent on wheel, and no-op entirely while disabled
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!enabled || activeIndex === null) return;
      if (Math.abs(e.deltaY) < wheelThreshold) return; // ignore micro-scrolls / trackpad noise

      const hasNext = activeIndex < sections.length - 1;
      const hasPrev = activeIndex > 0;
      const wantsNext = e.deltaY > 0 && hasNext;
      const wantsPrev = e.deltaY < 0 && hasPrev;

      if (wantsNext || wantsPrev) {
        e.preventDefault();
        if (!isAnimating.current) {
          triggerScroll(
            wantsNext ? activeIndex + 1 : activeIndex - 1,
            wantsNext ? "forward" : "backward",
          );
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [enabled, activeIndex, sections, wheelThreshold, triggerScroll]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!enabled) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!enabled || activeIndex === null || touchStartY.current === null)
        return;

      const deltaY = touchStartY.current - e.touches[0].clientY;
      const hasNext = activeIndex < sections.length - 1;
      const hasPrev = activeIndex > 0;
      const wantsNext = deltaY > touchThreshold && hasNext;
      const wantsPrev = deltaY < -touchThreshold && hasPrev;

      if (wantsNext || wantsPrev) {
        e.preventDefault();
        if (!isAnimating.current) {
          triggerScroll(
            wantsNext ? activeIndex + 1 : activeIndex - 1,
            wantsNext ? "forward" : "backward",
          );
          touchStartY.current = null;
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [enabled, activeIndex, sections, touchThreshold, triggerScroll]);

  // Fix 3 continued: if disabled mid-flight (e.g. intro finishes while a tween
  // was somehow queued), cancel it rather than letting a stale scroll land later.
  useEffect(() => {
    if (!enabled && rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
      isAnimating.current = false;
    }
  }, [enabled]);

  // Cleanup any in-flight rAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { activeIndex, frequency };
}

export default useForceScrollThroughSections;
