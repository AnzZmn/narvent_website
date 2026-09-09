# Narvent Privacy Policy

## Files
- `NarventPrivacy.tsx` — page shell: header, title block, intro, contact card, footer. Server component.
- `PrivacyToc.tsx` — TOC: collapsible pill list on mobile, sticky position-tracking sidebar at lg (client component).
- `PrivacySection.tsx` — one numbered clause (heading, sub-heads, paragraphs, bullet grid).
- `privacy-content.ts` — all 19 sections as data, plus INTRO, CLOSING, LAST_UPDATED, slugify.

## Setup
1. Drop the folder in e.g. `app/privacy/` and render <NarventPrivacy /> from `page.tsx`.
2. Tokens used: `--color-1` (lime accent, #c9f24d) and `--font-mono` (IBM Plex Mono).
   Body font is Archivo via Tailwind's default sans.
3. Add `html { scroll-behavior: smooth; }` to `globals.css` for anchored jumps.

## Responsive
- Gutters step 20 / 32 / clamp; type scales down one step below lg.
- Bullet grids are single-column under sm, auto-fill above.
- Clause numbers stay in the flow on mobile (the 29px hanging indent is lg only).
- Every tap target — TOC pills, nav button, contact links — is at least 44px tall.

## Notes
- Pure Tailwind — no inline styles, no keyframes, no extra CSS file.
- The spy reads scroll position (last heading above the 140px line) on a
  capture-phase document scroll listener with a 100ms gate — no rAF, no
  IntersectionObserver band, so it works inside a scroll container and on
  short viewports alike.
- Legal copy is verbatim from the supplied source. Edit `privacy-content.ts` only.
