"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Narvent — "What our workers have to say"
 *
 * Half-viewport section: copy + stats on the left, an animated 3D-tilted
 * rolling testimonial stack on the right.
 *
 * Requires the keyframes in globals.list.css (or the block at the bottom of
 * this file) to be present in app/globals.css.
 *
 * Photos: pass `photo` on each testimonial (any /public path or remote URL).
 * Items without a photo render a soft initials disc instead.
 */

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
};

const POOL: Testimonial[] = [
  {
    name: "Ramesh Yadav",
    role: "Mason · Hyderabad",
    quote:
      "I used to wait at the chowk every morning. Now the jobs come to my phone the night before.",
  },
  {
    name: "Sunita Devi",
    role: "Housekeeping · Pune",
    quote:
      "The money reaches my account the same evening. No middleman takes a cut.",
  },
  {
    name: "Mohammed Irfan",
    role: "Electrician · Chennai",
    quote:
      "My skill test is on the app, so contractors call me for bigger sites than before.",
  },
  {
    name: "Lakshmi Naik",
    role: "Packaging · Nashik",
    quote: "If a shift gets cancelled, another one is offered within the hour.",
  },
  {
    name: "Arjun Patil",
    role: "Warehouse · Bhiwandi",
    quote:
      "Attendance is marked by the app. No one can argue about the hours I worked.",
  },
  {
    name: "Farida Begum",
    role: "Tailoring · Jaipur",
    quote:
      "I picked the days I can work. My family did not have to change anything.",
  },
];

const WINDOW = 4;
const STEP = 152; // card height (136) + gap (16) — keep in sync
const GLIDE = "1.1s cubic-bezier(.22,.61,.36,1)";

export default function NarventTestimonials({
  testimonials = POOL,
  pace = 2600,
  eyebrow = "Voices from the field",
  heading = "What our workers have to say",
  blurb = "Every shift completed on Narvent is verified, rated and paid the same day. These are the people behind those records.",
}: {
  testimonials?: Testimonial[];
  pace?: number;
  eyebrow?: string;
  heading?: string;
  blurb?: string;
}) {
  const pool = testimonials.length ? testimonials : POOL;

  const [feed, setFeed] = useState<Testimonial[]>(() =>
    Array.from(
      { length: WINDOW },
      (_, i) => pool[(WINDOW - 1 - i) % pool.length],
    ),
  );
  const [next, setNext] = useState(WINDOW % pool.length);
  const [lift, setLift] = useState(false);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setFeed((f) => [pool[next % pool.length], ...f].slice(0, WINDOW));
      setNext((n) => (n + 1) % pool.length);
      setLift(true);
      setFresh(true);
      // jump the stack up one row with no transition, then release on the
      // next frame so everything glides back down
      requestAnimationFrame(() => requestAnimationFrame(() => setLift(false)));
    }, pace);
    return () => clearInterval(id);
  }, [pace, next, pool]);

  const liftStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "0 4px",
    transform: `translateY(${lift ? -STEP : 0}px)`,
    transition: lift ? "none" : `transform ${GLIDE}`,
  };

  return (
    <section style={S.section}>
      <div style={S.glowA} />
      <div style={S.glowB} />

      <div style={S.copy}>
        <div style={S.eyebrow}>{eyebrow}</div>
        <h2 style={S.h2}>{heading}</h2>
        <p style={S.blurb}>{blurb}</p>
        <div style={S.stats}>
          <div>
            <div style={S.statNum}>30000+</div>
            <div style={S.statLabel}>verified workers</div>
          </div>
          <div>
            <div style={S.statNum}>4.8/5</div>
            <div style={S.statLabel}>average worker rating</div>
          </div>
        </div>
      </div>

      <div style={S.stage}>
        <div style={S.tilt}>
          <div style={liftStyle}>
            {feed.map((t, i) => (
              <div
                key={i}
                style={{
                  transformOrigin: "50% 0",
                  transition: `opacity ${GLIDE}, transform ${GLIDE}`,
                  opacity: Math.max(0, 1 - i * 0.3),
                  transform: `scale(${1 - i * 0.045})`,
                }}
              >
                <figure
                  style={{
                    ...S.card,
                    // only the newest card animates in; alternating names force
                    // a restart on the reused DOM node
                    animation:
                      i === 0 && fresh
                        ? `nwt-slide-in-${next % 2 ? "a" : "b"} .85s cubic-bezier(.22,.61,.36,1) both`
                        : "none",
                  }}
                >
                  <div style={S.photoWell}>
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photo} alt={t.name} style={S.photo} />
                    ) : (
                      <span style={S.initials}>
                        {t.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                  <figcaption style={S.caption}>
                    <div>
                      <span style={S.name}>{t.name}</span>
                      <span style={S.role}>{t.role}</span>
                    </div>
                    <p style={S.quote}>{t.quote}</p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MASK_V = "linear-gradient(to bottom,#000 0,#000 58%,transparent 88%)";

const S: Record<string, CSSProperties> = {
  section: {
    height: "50vh",
    minHeight: 520,
    background: "#0d0a1a",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0,620px) 400px",
    gap: "clamp(28px,4vw,64px)",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(28px,4vh,48px) clamp(48px,8vw,140px)",
    boxSizing: "border-box",
    fontFamily: "Archivo, system-ui, sans-serif",
  },
  glowA: {
    position: "absolute",
    top: "-40%",
    left: "20%",
    width: "60%",
    height: "160%",
    pointerEvents: "none",
  },
  glowB: {
    position: "absolute",
    bottom: "-40%",
    right: "-10%",
    width: "55%",
    height: "170%",
    pointerEvents: "none",
  },
  copy: { position: "relative", maxWidth: 620 },
  eyebrow: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "#5694ff",
    marginBottom: 14,
  },
  h2: {
    margin: 0,
    fontSize: "clamp(30px,3.6vw,50px)",
    lineHeight: 1.04,
    fontWeight: 800,
    letterSpacing: "-.02em",
    textWrap: "balance" as never,
  },
  blurb: {
    margin: "18px 0 0",
    fontSize: "clamp(15px,1.15vw,17px)",
    lineHeight: 1.55,
    color: "rgba(255,255,255,.6)",
    maxWidth: "44ch",
    textWrap: "pretty" as never,
  },
  stats: {
    display: "flex",
    gap: "clamp(20px,2.5vw,40px)",
    marginTop: "clamp(20px,3vh,50px)",
  },
  statNum: {
    fontSize: "clamp(22px,2.2vw,30px)",
    fontWeight: 800,
    letterSpacing: "-.02em",
    color: "#5694ff",
  },
  statLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "rgba(255,255,255,.42)",
    marginTop: 4,
  },
  stage: {
    position: "relative",
    height: "100%",
    minHeight: 0,
    perspective: "1100px",
    maskImage: MASK_V,
    WebkitMaskImage: MASK_V,
  },
  tilt: {
    position: "absolute",
    inset: "100px 56px 0 6px",
    transform: "translate(0,6px) rotateX(18deg) rotateZ(-4deg)",
    transformOrigin: "50% 0",
    transformStyle: "preserve-3d",
  },
  card: {
    margin: 0,
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    background: "#fff",
    color: "#150a24",
    borderRadius: 16,
    padding: "14px 16px",
    height: 136,
    boxSizing: "border-box",
    boxShadow: "0 18px 40px -18px rgba(0,0,0,.7)",
  },
  photoWell: {
    width: 84,
    height: 108,
    flex: "0 0 auto",
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: "#eee7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  initials: {
    fontSize: 26,
    fontWeight: 800,
    color: "#6d56ff",
    letterSpacing: "-.02em",
  },
  caption: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  name: {
    display: "block",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  role: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "rgba(21,10,36,.5)",
    display: "block",
    marginTop: 3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  quote: {
    margin: "6px 0 0",
    fontSize: 13,
    lineHeight: 1.45,
    color: "rgba(21,10,36,.78)",
    overflow: "hidden",
  },
};

/* Append to app/globals.css:


*/
