# Intro animation — Next.js

```
IntroAnimation.tsx      // "use client" — the overlay itself
IntroGate.tsx           // "use client" — optional wrapper that reveals children after the intro
globals.intro.css       // 4 keyframes: intro-line, intro-rule, intro-glow, page-in
```

## Install

1. Copy the two components into e.g. `components/intro/`.
2. Append `globals.intro.css` into your existing `app/globals.css` (keyframes only — nothing is overwritten).
3. Wrap the homepage content:

```tsx
// app/page.tsx
import IntroGate from "@/components/intro/IntroGate";

export default function Home() {
  return (
    <IntroGate>
      <Nav />
      <main>{/* … */}</main>
      <Footer />
    </IntroGate>
  );
}
```

Or mount `<IntroAnimation />` alone if you don't want the page to animate in.

## Dependencies

None. React 18 / Next 13+ App Router, Tailwind v4 utilities, and the two font variables `--font-display` / `--font-mono` you already define. No GSAP, no Framer Motion — the sequence is CSS keyframes with staggered `animation-delay`, so it costs nothing on the main thread and cannot desync.

## Timing

| Constant | Default | What it controls |
| --- | --- | --- |
| `LINE_DUR` | 2000ms | how long each line lives (fade in → hold → fade out) |
| `STAGGER` | 1800ms | gap between line starts, so lines cross-fade by 200ms |
| `START` | 250ms | pause before the first line |
| `FADE` | 700ms | overlay fade-out |

Total ≈ 5.85s, then the page reveals. All four are at the top of `IntroAnimation.tsx`; the JS timeout and the CSS delays are derived from them, so changing one keeps everything in sync.

## Behaviour

- **Plays once per session** via `sessionStorage["narvent-intro-seen"]`. Pass `once={false}` to replay on every load, or clear that key while designing.
- **Click anywhere skips** — fades out immediately and marks the session seen.
- `prefers-reduced-motion: reduce` skips the intro entirely and calls `onDone` right away.
- Locks `body` scroll while playing and restores it on exit (also on unmount).
- Renders `null` once finished, so nothing stays in the tree.

## Notes

- Taglines and their rule colors are the `LINES` array — copy is verbatim: "One Platform", "Unlimited Talent", "Infinite Possibilities".
- If your hero has an R3F canvas, mount it as usual: the overlay is `position: fixed` above it, so the 3D scene warms up during the intro and is ready when it lifts.
