# Narvent — For Business (mobile, light)

390 × 693 (9:16) section, Tailwind-only styling.

    ForBusinessMobile.tsx        section shell + copy + CTA  (default export)
    BusinessNetworkBackdrop.tsx  animated worker-network SVG
    BusinessStats.tsx            2x2 stat grid
    for-business.css             @keyframes + .nv-origin helper (no layout rules)

## Use

    import ForBusinessMobile from "./ForBusinessMobile";

    <ForBusinessMobile bookHref="/contact" />       // device-framed preview
    <ForBusinessMobile framed={false} />            // fills its parent

## Notes

- Fonts: load Archivo (`font-sans`) and IBM Plex Mono (`font-mono`) in your Tailwind theme.
- Motion classes are Tailwind arbitrary properties (`[animation:nv-rise_...]`) bound to the
  keyframes in `for-business.css`. Keep the CSS import.
- All animation class strings are written out literally so Tailwind's scanner picks them up.
- `prefers-reduced-motion` disables the animations.
