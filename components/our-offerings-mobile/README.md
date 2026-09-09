# Narvent — Our Offerings (mobile, light)

390 × 693 (9:16) swipe-carousel section, Tailwind-only styling.

    OurOfferingsMobile.tsx   section shell, tabs, rail, dot pager  (default export)
    OfferingCard.tsx         one offering card
    OfferingsBackdrop.tsx    animated network SVG
    OfferingIcon.tsx         inline icon set
    offerings.data.ts        tab + card copy
    our-offerings.css        @keyframes, .nv-origin, .nv-rail (no layout rules)

## Use

    import OurOfferingsMobile from "./OurOfferingsMobile";

    <OurOfferingsMobile knowMoreHref="/services" />   // device-framed preview
    <OurOfferingsMobile framed={false} />             // fills its parent

## Notes

- Client component (`useState`/`useRef`) — keep the `"use client"` directive in Next.js.
- Fonts: map Archivo to `font-sans` in your Tailwind theme.
- Motion classes are Tailwind arbitrary properties (`[animation:nv-rise_...]`) bound to
  keyframes in `our-offerings.css`. Keep the CSS import.
- Active-card tracking assumes the 290px card + 12px gap stride (`CARD_STRIDE`); change both
  together if you resize cards.
- `prefers-reduced-motion` disables the animations.
