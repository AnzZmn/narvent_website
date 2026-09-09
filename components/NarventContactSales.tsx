import { useState } from "react";

/**
 * Narvent — Contact sales section. Mobile-first.
 * Tailwind only. Requires Archivo + IBM Plex Mono to be loaded and mapped in
 * tailwind.config (fontFamily.sans = Archivo, fontFamily.mono = IBM Plex Mono).
 */

type Timeline = "Immediately" | "This quarter" | "Just exploring";

const SERVICES = [
  "Data annotation",
  "Field & audit teams",
  "Telecalling",
  "Omni-staffing",
  "Merchant onboarding",
  "Content moderation",
  "Something else",
] as const;

const TIMELINES: Timeline[] = ["Immediately", "This quarter", "Just exploring"];

const SCALES = [
  "Under 25 people",
  "25–100 people",
  "100–500 people",
  "500+ people",
  "Not sure yet",
];

const STATS = [
  { value: "30K+", label: "Registered talent" },
  { value: "5,000+", label: "Projects delivered" },
  { value: "50+", label: "Enterprise clients" },
];

/* 16px text on mobile keeps iOS from zooming on focus; 48px+ tap heights. */
const FIELD =
  "h-12 rounded-xl border border-[#191428]/15 bg-white px-3.5 text-base text-[#191428] outline-none transition placeholder:text-[#191428]/30 focus:border-[#4a34cf] focus:ring-[3px] focus:ring-[#4a34cf]/15 sm:h-[46px] sm:text-[15px]";
const LABEL = "text-[12.5px] font-semibold text-[#191428] sm:text-xs";
const META =
  "font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#191428]/40";
const ROW =
  "flex min-h-[60px] items-center justify-between gap-4 border-b border-[#191428]/10 px-0.5 py-4 transition active:bg-[#4a34cf]/[0.06] sm:py-[18px] sm:hover:bg-[#4a34cf]/5";

export interface NarventContactSalesProps {
  /** Show the "Your role" + "Scale of work" row. */
  detailFields?: "Standard" | "Detailed";
  /** Show the 30K+ / 5,000+ / 50+ stat row. */
  showStats?: boolean;
  /** Show the consent line under the submit button. */
  showConsentNote?: boolean;
  email?: string;
  phone?: string;
  onSubmit?: (payload: {
    name: string;
    email: string;
    company: string;
    phone: string;
    role: string;
    scale: string;
    services: string[];
    timeline: Timeline;
    brief: string;
  }) => void;
}

export default function NarventContactSales({
  detailFields = "Detailed",
  showStats = true,
  showConsentNote = true,
  email = "team@narvent.in",
  phone = "+91 949 649 8991",
  onSubmit,
}: NarventContactSalesProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    scale: SCALES[0],
    brief: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<Timeline>("Immediately");
  const [sent, setSent] = useState(false);

  const set =
    (key: keyof typeof values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const submit = () => {
    onSubmit?.({ ...values, services, timeline });
    setSent(true);
  };

  const reset = () => {
    setValues({
      name: "",
      email: "",
      company: "",
      phone: "",
      role: "",
      scale: SCALES[0],
      brief: "",
    });
    setServices([]);
    setSent(false);
  };

  return (
    <section
      data-screen-label="Contact sales · responsive"
      className="relative overflow-hidden bg-[radial-gradient(120%_60%_at_50%_0%,#ffffff,#e6e2f2_72%)] px-4 py-20 font-sans antialiased sm:px-10 sm:py-16 lg:px-16 lg:py-28 lg:bg-[radial-gradient(78%_60%_at_78%_0%,#e6e2f2_72%)]"
    >
      <div className="relative mx-auto grid w-full max-w-[1220px] grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">
        {/* ---------- Left: pitch + direct contact ---------- */}
        <div className="max-w-[460px]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#4a34cf] sm:text-[11px]">
              Contact us
            </span>
            <span className="block h-px w-[56px] bg-gradient-to-r from-[#4a34cf]/50 to-transparent sm:w-[72px]" />
          </div>

          <h2 className="mt-4 text-[30px] font-extrabold leading-[1.06] tracking-[-0.035em] text-[#191428] text-balance sm:mt-5 sm:text-[38px] sm:leading-[1.04] sm:tracking-[-0.04em] lg:text-[52px]">
            Tell us what you need to get done.
          </h2>
          <p className="mt-4 max-w-[420px] text-[15px] leading-[1.6] text-[#191428]/60 text-pretty sm:mt-5 sm:text-[16.5px] sm:leading-[1.62]">
            Share the scope and we&apos;ll come back with a staffing plan,
            timelines and pricing. Most briefs get a response within one
            business day.
          </p>

          {/* Mobile: two full-width tap targets. Desktop: the detail list below. */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:hidden">
            <a
              href={`mailto:${email}`}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#4a34cf] px-4 text-[14.5px] font-semibold text-white shadow-[0_10px_24px_rgba(74,52,207,0.26)] active:bg-[#3a27b0]"
            >
              Email us
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#191428]/15 bg-white px-4 text-[14.5px] font-semibold text-[#191428] active:border-[#4a34cf] active:text-[#4a34cf]"
            >
              Call us
            </a>
          </div>

          <div className="mt-7 flex flex-col border-t border-[#191428]/10 sm:mt-9">
            <a href={`mailto:${email}`} className={`${ROW} hidden sm:flex`}>
              <span className="flex flex-col gap-1">
                <span className={META}>Email</span>
                <span className="text-base font-semibold text-[#191428]">
                  {email}
                </span>
              </span>
              <span className="text-[15px] font-semibold text-[#4a34cf]">
                →
              </span>
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={`${ROW} hidden sm:flex`}
            >
              <span className="flex flex-col gap-1">
                <span className={META}>Phone</span>
                <span className="text-base font-semibold text-[#191428]">
                  {phone}
                </span>
              </span>
              <span className="text-[15px] font-semibold text-[#4a34cf]">
                →
              </span>
            </a>
            <div className={ROW}>
              <span className="flex flex-col gap-1">
                <span className={META}>Coverage</span>
                <span className="text-[15px] font-semibold text-[#191428] sm:text-base">
                  PAN India deployment
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[12.5px] font-medium text-[#191428]/50 sm:text-[13px]">
                <span className="relative h-2 w-2 rounded-full bg-[#4a34cf]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#4a34cf]" />
                </span>
                Tier 1–3 cities
              </span>
            </div>
          </div>

          {showStats && (
            <div className="mt-7 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-[22px]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className=" text-[19px] font-semibold leading-none text-[#4a34cf] sm:text-[22px] ">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[11.5px] font-medium leading-[1.3] text-[#191428]/55 sm:mt-[7px] sm:text-[12.5px] sm:leading-[1.35]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Right: form card ---------- */}
        <div className="relative -mx-1 rounded-[22px] border border-[#191428]/10 bg-white/90 p-4 shadow-[0_16px_40px_rgba(58,44,110,0.12)] backdrop-blur-[10px] sm:mx-0 sm:rounded-3xl sm:p-6 sm:shadow-[0_24px_60px_rgba(58,44,110,0.14)] lg:p-9">
          {!sent ? (
            <div className="flex flex-col gap-5 sm:gap-[22px]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[18px]">
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>Full name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={set("name")}
                    placeholder="Priya Menon"
                    className={FIELD}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>Work email</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={values.email}
                    onChange={set("email")}
                    placeholder="priya@company.com"
                    className={FIELD}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>Company</span>
                  <input
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={set("company")}
                    placeholder="Company name"
                    className={FIELD}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>Phone</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={set("phone")}
                    placeholder="+91 00000 00000"
                    className={FIELD}
                  />
                </label>
              </div>

              {detailFields === "Detailed" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[18px]">
                  <label className="flex flex-col gap-2">
                    <span className={LABEL}>Your role</span>
                    <input
                      type="text"
                      autoComplete="organization-title"
                      value={values.role}
                      onChange={set("role")}
                      placeholder="Head of Operations"
                      className={FIELD}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={LABEL}>Scale of work</span>
                    <select
                      value={values.scale}
                      onChange={set("scale")}
                      className={`${FIELD} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234a34cf%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px_18px] bg-[right_14px_center] bg-no-repeat pr-11`}
                    >
                      {SCALES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <span className={LABEL}>
                  What do you need?{" "}
                  <span className="text-[12.5px] font-normal text-[#191428]/40 sm:text-xs">
                    Pick any
                  </span>
                </span>
                {/* Mobile: one swipeable row, edge-to-edge. Desktop: wraps. */}
                <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0">
                  {SERVICES.map((s) => {
                    const on = services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`min-h-[44px] shrink-0 snap-start whitespace-nowrap rounded-full border px-4 text-[13.5px] font-medium transition sm:shrink sm:px-[15px] sm:py-2.5 ${
                          on
                            ? "border-[#4a34cf] bg-[#4a34cf] text-white"
                            : "border-[#191428]/15 bg-white text-[#191428] hover:border-[#4a34cf]/50"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className={LABEL}>When do you want to start?</span>
                <div className="grid grid-cols-1 gap-1.5 rounded-2xl border border-[#191428]/[0.07] bg-[#191428]/5 p-1.5 sm:flex sm:gap-2 sm:rounded-[13px] sm:p-[5px]">
                  {TIMELINES.map((t) => {
                    const on = timeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className={`min-h-[44px] rounded-xl px-3 text-[13.5px] font-semibold transition sm:flex-1 sm:rounded-[9px] sm:px-2 sm:py-[11px] ${
                          on
                            ? "bg-white text-[#4a34cf] shadow-[0_2px_8px_rgba(58,44,110,0.14)]"
                            : "bg-transparent text-[#191428]/60"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex flex-col gap-2">
                <span className={LABEL}>Project brief</span>
                <textarea
                  rows={4}
                  value={values.brief}
                  onChange={set("brief")}
                  placeholder="Roles, cities, volumes, timelines — anything that helps us scope it."
                  className="resize-y rounded-xl border border-[#191428]/15 bg-white px-3.5 py-3.5 text-base leading-[1.55] text-[#191428] outline-none transition placeholder:text-[#191428]/30 focus:border-[#4a34cf] focus:ring-[3px] focus:ring-[#4a34cf]/15 sm:rounded-[11px] sm:text-[15px]"
                />
              </label>

              <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-[18px]">
                <button
                  type="button"
                  onClick={submit}
                  className="h-[52px] w-full rounded-full bg-[#4a34cf] px-[30px] text-[15.5px] font-semibold text-white shadow-[0_14px_30px_rgba(74,52,207,0.3)] transition active:bg-[#3a27b0] sm:w-auto sm:hover:bg-[#3a27b0] sm:hover:shadow-[0_18px_38px_rgba(74,52,207,0.4)]"
                >
                  Send enquiry
                </button>
                {showConsentNote && (
                  <span className="text-center text-[12px] leading-[1.5] text-[#191428]/50 sm:max-w-[260px] sm:text-left sm:text-[12.5px]">
                    By sending this you agree to be contacted about your
                    enquiry. No marketing lists.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 pb-2 pt-4 sm:pt-[22px]">
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#4a34cf]/10 text-xl font-semibold text-[#4a34cf]">
                ✓
              </span>
              <h3 className="text-[23px] font-bold leading-[1.15] tracking-[-0.03em] text-[#191428] sm:text-[26px]">
                Enquiry received.
              </h3>
              <p className="max-w-[380px] text-[15px] leading-[1.6] text-[#191428]/60 text-pretty sm:text-[15.5px]">
                A Narvent partnerships lead will reply within one business day
                with next steps. Reference details are on their way to your
                inbox.
              </p>
              <div className="flex flex-wrap gap-2">
                {[...services, timeline].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#4a34cf]/30 bg-[#4a34cf]/5 px-3 py-[7px] font-mono text-[11.5px] font-medium text-[#4a34cf] sm:px-[13px] sm:text-[12.5px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-1.5 min-h-[48px] w-full rounded-full border border-[#191428]/15 bg-white px-[22px] text-sm font-semibold text-[#191428] transition active:border-[#4a34cf] active:text-[#4a34cf] sm:w-auto sm:py-3"
              >
                Send another enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
