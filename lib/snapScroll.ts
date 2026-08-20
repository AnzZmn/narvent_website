import { useCallback, useEffect, useRef, useState } from "react";

interface SectionConfig {
  id: string;
  frequency: number;
}

interface UseForceScrollThroughSectionsOptions {
  threshold?: number;
  touchThreshold?: number;
  duration?: number; // ms, controls both scroll tween and frequency lerp
}

// easeInOutCubic — smooth accelerate/decelerate, matches native smooth-scroll feel
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function useForceScrollThroughSections(
  sections: SectionConfig[],
  options: UseForceScrollThroughSectionsOptions = {},
) {
  const { threshold = 0.1, touchThreshold = 40, duration = 900 } = options;

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

  const triggerScroll = useCallback(
    (targetIndex: number) => {
      const target = sections[targetIndex];
      const targetEl = document.getElementById(target.id);
      if (!targetEl || isAnimating.current) return;

      isAnimating.current = true;

      const startY = window.scrollY;
      const targetY = startY + targetEl.getBoundingClientRect().top;
      const startFreq = frequency;
      const targetFreq = target.frequency;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(rawProgress);

        // Scroll position
        window.scrollTo(0, startY + (targetY - startY) * eased);

        // Frequency interpolates continuously, same clock, same easing
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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeIndex === null) return;

      const hasNext = activeIndex < sections.length - 1;
      const hasPrev = activeIndex > 0;
      const wantsNext = e.deltaY > 0 && hasNext;
      const wantsPrev = e.deltaY < 0 && hasPrev;

      if (wantsNext || wantsPrev) {
        e.preventDefault();
        if (!isAnimating.current) {
          triggerScroll(wantsNext ? activeIndex + 1 : activeIndex - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, sections, triggerScroll]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (activeIndex === null || touchStartY.current === null) return;

      const deltaY = touchStartY.current - e.touches[0].clientY;
      const hasNext = activeIndex < sections.length - 1;
      const hasPrev = activeIndex > 0;
      const wantsNext = deltaY > touchThreshold && hasNext;
      const wantsPrev = deltaY < -touchThreshold && hasPrev;

      if (wantsNext || wantsPrev) {
        e.preventDefault();
        if (!isAnimating.current) {
          triggerScroll(wantsNext ? activeIndex + 1 : activeIndex - 1);
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
  }, [activeIndex, sections, touchThreshold, triggerScroll]);

  // Cleanup any in-flight rAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { activeIndex, frequency };
}

export default useForceScrollThroughSections;
