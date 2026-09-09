# Our Offerings — Next.js section

```
OurOfferings.tsx        // "use client" — tabs, horizontal rail, scroll progress bar
OfferingIcon.tsx        // 12 single-path line icons, no icon library
offerings.data.ts       // all copy: 3 tracks × cards (title, blurb, bullets)
```

Mount `<OurOfferings />`. Copy all three files into e.g. `components/offerings/`.

## Dependencies

None beyond React 18 / Next 13+ App Router and Tailwind v4. No icon package, no carousel package — the rail is native `overflow-x-auto` with `scroll-snap`, and the two-segment progress bar reads `scrollLeft`.

The design uses **Poppins**. Add it in your layout if it isn't there:

```ts
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"] });
// <body className={poppins.className}>
```

## Notes

- Copy is verbatim from your screens, including "Awign's" in the Visual Merchandising card — check that one is intentional.
- Grey Collar opens first (`useState(1)`), matching the first screenshot. Change to `0` for White Collar.
- White/Grey have 5 cards and scroll; Blue has 3 and centres instead — that's the `few` branch, driven by card count, not hardcoded.
- Accent is `#c9f24d`, cards are `#232323 → #1b1b1b`, both sampled from the screenshots. Swap for a token if you have one.
- Cards are fixed 435×604 minimum so all bullet lengths line up; the "Know More" button is pinned with `mt-auto`.
- `Know More` links are `href="#"` — point them at real routes.
