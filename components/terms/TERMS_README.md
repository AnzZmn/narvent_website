# Narvent Terms & Conditions

## Files
- `NarventTerms.tsx` — page shell: header, title block, intro, contact card, footer. Server component.
- `TermsToc.tsx` — TOC: collapsible pill list on mobile, sticky scroll-spy sidebar at lg (client component).
- `TermsSection.tsx` — one numbered clause (heading + paragraphs + bullet grid).
- `terms-content.ts` — all 32 sections as data, plus INTRO, CLOSING, LAST_UPDATED, slugify.

## Setup
1. Drop the folder in e.g. `app/terms/` and render <NarventTerms /> from `page.tsx`.
2. Tokens used: `--color-1` (lime accent, #c9f24d) and `--font-mono` (IBM Plex Mono).
   Body font is Archivo via Tailwind's default sans.
3. Add `html { scroll-behavior: smooth; }` to `globals.css` for anchored jumps.

## Responsive
- Gutters step 20 / 32 / clamp; type scales down one step below lg.
- Bullet grids are single-column under sm, auto-fill above.
- Clause numbers stay in the flow on mobile (the 29px hanging indent is lg only).
- Every tap target — TOC pills, nav button, contact links — is at least 44px tall.
- `scroll-mt-24` on mobile matches the shorter sticky header.

## Notes
- Pure Tailwind — no inline styles, no keyframes, no extra CSS file.
- Scroll-spy targets `section[data-terms-section]`.
- Legal copy is verbatim from the supplied source. Edit `terms-content.ts` only.
