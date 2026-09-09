/**
 * Narvent — "Are you looking for work?" section (mobile, light theme)
 * Fits a 390 × 693 (9:16) viewport. Self-contained: inline styles + one <style> block
 * for keyframes and scrollbar hiding. Fonts: Archivo + IBM Plex Mono (load via <link> or next/font).
 */
import Image from "next/image";
import React from "react";

type Role = { id: string; title: string; desc: string; photo: string };

export const ROLES: Role[] = [
  {
    id: "01",
    title: "Survey & data collection",
    desc: "Walk assigned routes, capture photos and readings on the app. Day rates from ₹700.",
    photo: "/Audit.jpg",
  },
  {
    id: "02",
    title: "Annotation & data entry",
    desc: "Label images, audio and text from a Narvent pod or from home. Training provided.",
    photo: "/Annotation.png",
  },
  {
    id: "03",
    title: "Retail promoter",
    desc: "In-store demos, sampling and customer engagement for brand launches.",
    photo: "/Promotion.jpg",
  },
  {
    id: "04",
    title: "Site & asset auditor",
    desc: "QR-scan assets, verify stock and file inspection reports across nearby sites.",
    photo: "/Audit.jpg",
  },
  {
    id: "05",
    title: "Warehouse & logistics crew",
    desc: "Sorting, loading and dispatch shifts with fixed hours and same-week payouts.",
    photo: "/ManagedStaffing.jpg",
  },
  {
    id: "06",
    title: "Merchant onboarding",
    desc: "Sign up local sellers, verify documents and set up their accounts on the ground.",
    photo: "/Annotation.png",
  },
  {
    id: "07",
    title: "Field technician support",
    desc: "On-site installs, checks and validation runs for enterprise and AI teams.",
    photo: "/FieldOps1.jpg",
  },
];

const ACCENT = "#4a34cf";
const INK = "#191428";
const SURFACE = "#faf9fd";
const MONO = "'IBM Plex Mono',ui-monospace,monospace";
const SANS = "Archivo,system-ui,sans-serif";

export type LookingForWorkProps = {
  /** Phone field and button on one row instead of stacked. */
  inlineForm?: boolean;
  showStats?: boolean;
  showRoleRail?: boolean;
  roles?: Role[];
  joinedLabel?: string;
  /** Wrap the section in a 390×693 phone frame (demo/preview only). */
  framed?: boolean;
  onSubmit?: (phone: string) => void;
};

const CSS = `
@keyframes nvRise { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
@keyframes nvBlob { 0%,100% { transform:translate(0,0) scale(1) } 50% { transform:translate(14px,-18px) scale(1.12) } }
.nv-rail { scrollbar-width:none; -ms-overflow-style:none; }
.nv-rail::-webkit-scrollbar { display:none; }
.nv-input:focus { border-color:${ACCENT}; }
.nv-cta:hover { background:#3a28ad; }
.nv-card:hover { border-color:rgba(74,52,207,.4); transform:translateY(-2px); }
`;

const rise = (delay: string): React.CSSProperties => ({
  animation: `nvRise .9s ${delay} cubic-bezier(.16,1,.3,1) both`,
});

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ font: `600 19px/1 ${MONO}`, color: ACCENT }}>{value}</div>
      <div
        style={{
          marginTop: 6,
          font: `500 9.5px ${MONO}`,
          letterSpacing: ".13em",
          textTransform: "uppercase",
          color: "rgba(25,20,40,.45)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function LookingForWorkMobile({
  inlineForm = false,
  showStats = true,
  showRoleRail = true,
  roles = ROLES,
  joinedLabel = "31,598 people already joined",
  framed = false,
  onSubmit,
}: LookingForWorkProps) {
  const [phone, setPhone] = React.useState("");

  const inputStyle: React.CSSProperties = {
    height: 50,
    boxSizing: "border-box",
    border: "1px solid rgba(20,16,31,.16)",
    background: "#fff",
    borderRadius: 12,
    padding: inlineForm ? "0 15px" : "0 16px",
    font: `400 ${inlineForm ? "14.5px" : "15px"} ${SANS}`,
    color: INK,
    outline: "none",
    ...(inlineForm ? { flex: 1, minWidth: 0 } : null),
  };

  const ctaStyle: React.CSSProperties = {
    height: 50,
    border: "none",
    borderRadius: 12,
    font: `600 ${inlineForm ? "14.5px" : "15.5px"} ${SANS}`,
    color: "#fff",
    background: ACCENT,
    cursor: "pointer",
    boxShadow: inlineForm
      ? "0 10px 24px rgba(74,52,207,.24)"
      : "0 12px 26px rgba(74,52,207,.26)",
    ...(inlineForm ? { flex: "0 0 112px" } : null),
  };

  const section = (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        background: SURFACE,
        display: "flex",
        flexDirection: "column",
        fontFamily: SANS,
      }}
    >
      <style>{CSS}</style>

      {/* ambient backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 390 693"
          width="390"
          height="693"
          style={{ display: "block" }}
        >
          <defs>
            <radialGradient id="lfwBlob">
              <stop offset="0%" stopColor="rgba(109,86,255,.26)" />
              <stop offset="100%" stopColor="rgba(109,86,255,0)" />
            </radialGradient>
            <radialGradient id="lfwBlob2">
              <stop offset="0%" stopColor="rgba(52,140,207,.2)" />
              <stop offset="100%" stopColor="rgba(52,140,207,0)" />
            </radialGradient>
          </defs>
          <g style={{ animation: "nvBlob 18s ease-in-out infinite" }}>
            <circle cx="52" cy="120" r="150" fill="url(#lfwBlob)" />
          </g>
          <g
            style={{ animation: "nvBlob 22s ease-in-out 3s infinite reverse" }}
          >
            <circle cx="352" cy="330" r="150" fill="url(#lfwBlob2)" />
          </g>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg,rgba(250,249,253,.72) 0%,rgba(250,249,253,.94) 46%,#faf9fd 78%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          padding: "30px 0 0",
        }}
      >
        {/* copy */}
        <div
          style={{
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            ...rise("0s"),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ACCENT,
              }}
            />
            <span
              style={{
                font: `600 9.5px ${MONO}`,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {joinedLabel}
            </span>
          </div>

          <h2
            style={{
              margin: "12px 0 0",
              font: `800 32px/1.04 ${SANS}`,
              letterSpacing: "-.04em",
              color: INK,
              textWrap: "pretty" as never,
            }}
          >
            Are you looking
            <br />
            for <span style={{ color: ACCENT }}>work?</span>
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              font: `400 13.5px/1.5 ${SANS}`,
              color: "rgba(25,20,40,.66)",
              textWrap: "pretty" as never,
            }}
          >
            Find flexible work near you — from field operations and audits to AI
            data projects, warehouse shifts and remote tasks.
          </p>

          <p
            style={{
              margin: "8px 0 0",
              font: `400 11.5px/1.45 ${SANS}`,
              color: "rgba(25,20,40,.44)",
              textWrap: "pretty" as never,
            }}
          >
            Register once. Get matched with work based on your location, skills
            and availability.
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(phone);
          }}
          style={{
            padding: "0 24px",
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            ...rise(".12s"),
          }}
        >
          {inlineForm ? (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="nv-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                minLength={10}
                placeholder="+91 mobile number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(value);
                }}
                style={inputStyle}
              />
              <button className="nv-cta" type="submit" style={ctaStyle}>
                Find work
              </button>
            </div>
          ) : (
            <>
              <input
                className="nv-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="+91 mobile number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(value);
                }}
                style={inputStyle}
              />
              <button className="nv-cta" type="submit" style={ctaStyle}>
                Find work.
              </button>
            </>
          )}
          <div
            style={{ font: `400 10.5px ${MONO}`, color: "rgba(25,20,40,.4)" }}
          >
            No fee, ever · English / हिंदी / മലയാളം
          </div>
        </form>

        {/* stats */}
        {showStats && (
          <div
            style={{
              padding: "14px 24px 0",
              marginTop: 14,
              borderTop: "1px solid rgba(20,16,31,.09)",
              display: "flex",
              gap: 12,
              ...rise("1s"),
            }}
          >
            <Stat value="46" label="Jobs open today" />
            <Stat value="120+" label="Locations" />
            <Stat value="3 min" label="To register" />
          </div>
        )}

        {/* role rail */}
        {showRoleRail && (
          <div
            style={{
              paddingBottom: 18,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              ...rise(".28s"),
            }}
            className="mt-10"
          >
            <div
              style={{
                padding: "0 24px",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  font: `600 9.5px ${MONO}`,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(25,20,40,.5)",
                }}
              >
                Open roles
              </span>
            </div>
            <div
              className="nv-rail"
              style={{
                display: "flex",
                gap: 12,
                padding: "2px 24px 6px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
              }}
            >
              {roles.map((role) => (
                <article
                  key={role.id}
                  className="nv-card"
                  style={{
                    flex: "0 0 208px",
                    scrollSnapAlign: "start",
                    borderRadius: 14,
                    background: "#fff",
                    border: "1px solid rgba(20,16,31,.09)",
                    boxShadow: "0 8px 20px rgba(58,44,110,.07)",
                    overflow: "hidden",
                    transition: "border-color .3s ease,transform .3s ease",
                  }}
                >
                  <div
                    style={{
                      height: 62,
                      background:
                        "repeating-linear-gradient(45deg,rgba(74,52,207,.07) 0 7px,rgba(74,52,207,.02) 7px 14px)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "8px 10px",
                    }}
                    className="relative"
                  >
                    <span
                      style={{
                        font: `400 9px ${MONO}`,
                        color: "rgba(25,20,40,.4)",
                      }}
                    >
                      <Image
                        src={role.photo}
                        className="object-cover"
                        alt={role.title}
                        fill
                        sizes="208px"
                      />
                    </span>
                  </div>
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div
                      style={{
                        font: `600 9px ${MONO}`,
                        letterSpacing: ".18em",
                        color: ACCENT,
                      }}
                    >
                      {role.id}
                    </div>
                    <h3
                      style={{
                        margin: "5px 0 4px",
                        font: `600 13px/1.25 ${SANS}`,
                        letterSpacing: "-.015em",
                        color: INK,
                      }}
                    >
                      {role.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        font: `400 10.5px/1.4 ${SANS}`,
                        color: "rgba(25,20,40,.52)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {role.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  if (!framed) return section;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "32px 16px 64px",
        background: "radial-gradient(70% 50% at 50% 0%,#ffffff,#e3dff1 74%)",
      }}
    >
      <div
        style={{
          width: 390,
          height: 693,
          borderRadius: 34,
          overflow: "hidden",
          border: "1px solid rgba(20,16,31,.1)",
          boxShadow: "0 30px 80px rgba(58,44,110,.18)",
        }}
      >
        {section}
      </div>
    </div>
  );
}
