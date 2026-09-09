import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;

  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);

  splitType?: "chars" | "words" | "lines" | "words, chars";

  from?: gsap.TweenVars;
  to?: gsap.TweenVars;

  threshold?: number;
  rootMargin?: string;

  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

  textAlign?: React.CSSProperties["textAlign"];

  onLetterAnimationComplete?: () => void;

  // ----------------------------------------
  // Highlight
  // ----------------------------------------

  highlightWords?: string[];
  highlightClassName?: string;

  // ----------------------------------------
  // Multiple word swap groups
  // ----------------------------------------
  //
  // Example:
  //
  // [
  //   ["WorkForce", "Network"],
  //   ["Business,", "Worker,"],
  // ]
  //
  // ----------------------------------------

  swapWords?: string[][];

  /**
   * Time each word stays visible
   * before transitioning to the next word.
   */
  swapInterval?: number;

  /**
   * Duration of the exit/enter animation.
   */
  swapDuration?: number;
}

type SplitElement = HTMLElement & {
  _rbsplitInstance?: GSAPSplitText;
  _swapTimelines?: gsap.core.Timeline[];
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",

  delay = 50,
  duration = 1.25,
  ease = "power3.out",

  splitType = "chars",

  from = {
    opacity: 0,
    y: 40,
  },

  to = {
    opacity: 1,
    y: 0,
  },

  threshold = 0.1,
  rootMargin = "-100px",

  tag = "p",
  textAlign = "center",

  onLetterAnimationComplete,

  // Highlight
  highlightWords = [],
  highlightClassName = "text-[#6d56ff]",

  // Multiple swap groups
  swapWords = [],
  swapInterval = 2500,
  swapDuration = 0.45,
}) => {
  const ref = useRef<HTMLElement>(null);

  const animationCompletedRef = useRef(false);

  const onCompleteRef = useRef(onLetterAnimationComplete);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // ----------------------------------------
  // Keep callback updated
  // ----------------------------------------

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // ----------------------------------------
  // Wait for fonts
  // ----------------------------------------

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // ----------------------------------------
  // GSAP
  // ----------------------------------------

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) {
        return;
      }

      // Prevent re-animation
      if (animationCompletedRef.current) {
        return;
      }

      const el = ref.current as SplitElement;

      // --------------------------------------
      // Cleanup previous split
      // --------------------------------------

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {}

        el._rbsplitInstance = undefined;
      }

      // --------------------------------------
      // Cleanup previous swap timelines
      // --------------------------------------

      if (el._swapTimelines) {
        el._swapTimelines.forEach((timeline) => {
          timeline.kill();
        });

        el._swapTimelines = undefined;
      }

      // --------------------------------------
      // ScrollTrigger start
      // --------------------------------------

      const startPct = (1 - threshold) * 100;

      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);

      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;

      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";

      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;

      const start = `top ${startPct}%${sign}`;

      // --------------------------------------
      // Animation targets
      // --------------------------------------

      let targets: Element[] = [];

      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes("chars") && self.chars?.length) {
          targets = self.chars;
        }

        if (
          !targets.length &&
          splitType.includes("words") &&
          self.words?.length
        ) {
          targets = self.words;
        }

        if (
          !targets.length &&
          splitType.includes("lines") &&
          self.lines?.length
        ) {
          targets = self.lines;
        }

        if (!targets.length) {
          targets = self.chars || self.words || self.lines || [];
        }
      };

      // --------------------------------------
      // Split text
      // --------------------------------------

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,

        smartWrap: true,

        autoSplit: splitType === "lines",

        linesClass: "split-line",

        wordsClass: "split-word",

        charsClass: "split-char",

        reduceWhiteSpace: false,

        // ------------------------------------
        // After split
        // ------------------------------------

        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);

          // ----------------------------------
          // Highlight words
          // ----------------------------------

          if (highlightWords.length && self.words?.length) {
            self.words.forEach((word) => {
              const wordText = word.textContent?.trim();

              if (wordText && highlightWords.includes(wordText)) {
                word.classList.add(...highlightClassName.split(" "));
              }
            });
          }

          // Reserve width for swappable words up front, at split time —
          // not after the entrance animation — so no browser has to
          // reconcile a late layout mutation against an already-painted
          // (and possibly already text-wrap:balance'd) line.
          if (
            splitType.includes("words") &&
            swapWords.length &&
            self.words?.length
          ) {
            swapWords.forEach((words) => {
              if (words.length < 2) return;

              const firstWord = words[0];
              const dynamicWord = self.words.find(
                (word) => word.textContent?.trim() === firstWord,
              ) as HTMLElement | undefined;

              if (!dynamicWord) return;

              dynamicWord.style.display = "inline-block";

              const originalText = dynamicWord.textContent || "";
              let maxWidth = 0;

              words.forEach((word) => {
                dynamicWord.textContent = word;
                maxWidth = Math.max(maxWidth, dynamicWord.offsetWidth);
              });

              dynamicWord.textContent = originalText;
              dynamicWord.style.minWidth = `${maxWidth}px`;
            });
          }

          // ----------------------------------
          // Normal entrance animation
          // ----------------------------------

          const entrance = gsap.fromTo(
            targets,

            {
              ...from,
            },

            {
              ...to,

              duration,

              ease,

              stagger: delay / 1000,

              scrollTrigger: {
                trigger: el,

                start,

                once: true,

                fastScrollEnd: true,

                anticipatePin: 0.4,
              },

              willChange: "transform, opacity",

              force3D: true,

              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();

                if (!splitType.includes("words") || swapWords.length === 0) {
                  return;
                }

                const swapTimelines: gsap.core.Timeline[] = [];

                swapWords.forEach((words) => {
                  if (words.length < 2) return;

                  const firstWord = words[0];

                  // ← this line must still be here, inside onComplete too —
                  //    it's a SEPARATE lookup from the one in onSplit, because
                  //    onComplete needs its own closure over `dynamicWord` for
                  //    the swap timeline below.
                  const dynamicWord = self.words.find(
                    (word) => word.textContent?.trim() === firstWord,
                  ) as HTMLElement | undefined;

                  if (!dynamicWord) return; // ← and this guard must still be here

                  let currentIndex = 0;
                  const timeline = gsap.timeline({
                    repeat: -1,
                    repeatDelay: swapInterval / 1000,
                  });

                  timeline.call(() => {
                    currentIndex = (currentIndex + 1) % words.length;
                    const nextWord = words[currentIndex];

                    gsap.to(dynamicWord, {
                      yPercent: 100,
                      opacity: 0,
                      duration: swapDuration,
                      ease: "power3.in",
                      force3D: true,
                      onComplete: () => {
                        dynamicWord.textContent = nextWord;
                        gsap.fromTo(
                          dynamicWord,
                          { yPercent: -100, opacity: 0 },
                          {
                            yPercent: 0,
                            opacity: 1,
                            duration: swapDuration,
                            ease: "power3.out",
                            force3D: true,
                          },
                        );
                      },
                    });
                  });

                  swapTimelines.push(timeline);
                });

                el._swapTimelines = swapTimelines;
              },
            },
          );

          return entrance;
        },
      });

      el._rbsplitInstance = splitInstance;

      // --------------------------------------
      // Cleanup
      // --------------------------------------

      return () => {
        // Kill ScrollTriggers
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) {
            st.kill();
          }
        });

        // Kill all swap animations
        if (el._swapTimelines) {
          el._swapTimelines.forEach((timeline) => {
            timeline.kill();
          });

          el._swapTimelines = undefined;
        }

        // Revert SplitText
        try {
          splitInstance.revert();
        } catch (_) {}

        el._rbsplitInstance = undefined;
      };
    },

    {
      dependencies: [
        text,

        delay,

        duration,

        ease,

        splitType,

        JSON.stringify(from),

        JSON.stringify(to),

        threshold,

        rootMargin,

        fontsLoaded,

        JSON.stringify(highlightWords),

        highlightClassName,

        JSON.stringify(swapWords),

        swapInterval,

        swapDuration,
      ],

      scope: ref,
    },
  );

  // ----------------------------------------
  // Render
  // ----------------------------------------

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,

      wordWrap: "break-word",

      willChange: "transform, opacity",
    };

    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    const Tag = (tag || "p") as React.ElementType;

    return (
      <Tag ref={ref} style={style} className={classes}>
        {text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;
