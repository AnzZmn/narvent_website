import Link from "next/link";
import PrivacyToc from "./PrivacyToc";
import PrivacySection from "./PrivacySection";
import { CLOSING, INTRO, LAST_UPDATED, SECTIONS } from "./privacy-content";

const MONO = "font-[family-name:var(--font-mono)]";
const GUTTER = "px-5 sm:px-8 lg:px-[clamp(32px,5vw,88px)]";

export default function NarventPrivacy() {
  const [lede, ...rest] = INTRO;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0e0719]">
      {/* Ambient light + dot grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(58%_100%_at_22%_0%,rgba(109,86,255,0.28),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:22px_22px] opacity-[0.03]" />

      <header
        className={`${GUTTER} sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0e0719]/[0.78] py-4 backdrop-blur-[14px] lg:py-5`}
      >
        <Link
          href="/"
          className="text-[21px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff] lg:text-2xl"
        >
          Narvent.
        </Link>
        <nav className="flex items-center gap-3.5 text-[12.5px] font-medium lg:gap-7 lg:text-[13.5px]">
          <Link
            href="/T&C"
            className="hidden text-white/[0.62] transition-colors hover:text-white sm:inline"
          >
            Terms &amp; Conditions
          </Link>
          <a
            href="mailto:team@narvent.in"
            className="flex min-h-11 items-center rounded-lg border border-white/[0.16] px-[11px] text-white transition-colors hover:border-[var(--color-1)]/60 hover:text-[var(--color-1)] lg:px-[15px]"
          >
            team@narvent.in
          </a>
        </nav>
      </header>

      <div
        className={`${GUTTER} relative z-10 mx-auto max-w-[1320px] pt-14 lg:pt-[clamp(56px,9vw,116px)]`}
      >
        <div
          className={`${MONO} text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-1)] lg:text-xs`}
        >
          Legal
        </div>
        <h1 className="mt-4 text-[36px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[52px] lg:mt-[18px] lg:text-[clamp(44px,6vw,84px)] lg:leading-none">
          Privacy Policy
        </h1>
        <div
          className={`${MONO} mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs font-medium uppercase tracking-[0.06em] text-[#f2ecff]/[0.45] lg:mt-[26px] lg:text-[13px]`}
        >
          <span>Last updated: {LAST_UPDATED}</span>
          <span className="text-[#6d56ff]">&#9670;</span>
          <span>{SECTIONS.length} sections</span>
        </div>

        <p className="mt-7 max-w-[760px] text-[17px] leading-[1.6] text-[#f2ecff]/[0.72] [text-wrap:pretty] lg:mt-[34px] lg:text-[19px]">
          {lede}
        </p>
        {rest.map((t) => (
          <p
            key={t}
            className="mt-4 max-w-[760px] text-base leading-[1.65] text-[#f2ecff]/[0.6] [text-wrap:pretty] lg:text-[17px]"
          >
            {t}
          </p>
        ))}
      </div>

      <div
        className={`${GUTTER} relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 gap-[34px] pt-10 lg:grid-cols-[242px_minmax(0,1fr)] lg:gap-[clamp(36px,5vw,72px)] lg:pt-[clamp(48px,6vw,80px)]`}
      >
        <PrivacyToc />

        <main className="flex min-w-0 flex-col gap-10 pb-10 lg:gap-14">
          {SECTIONS.map((s, i) => (
            <PrivacySection key={s.title} section={s} index={i} />
          ))}

          <section className="max-w-[800px] rounded-[14px] border border-white/10 bg-[linear-gradient(180deg,rgba(109,86,255,0.14),rgba(255,255,255,0.02))] p-6 lg:p-[clamp(26px,3vw,38px)]">
            <div
              className={`${MONO} text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-1)]`}
            >
              Narvent
            </div>
            <div className="mt-5 flex flex-wrap gap-x-14 gap-y-6">
              <div>
                <div
                  className={`${MONO} text-[11px] font-medium tracking-[0.16em] text-[#f2ecff]/[0.38]`}
                >
                  WEBSITE
                </div>
                <a
                  href="https://narvent.in"
                  className="mt-1 flex min-h-11 items-center text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-1)] hover:underline lg:text-[19px]"
                >
                  narvent.in
                </a>
              </div>
              <div>
                <div
                  className={`${MONO} text-[11px] font-medium tracking-[0.16em] text-[#f2ecff]/[0.38]`}
                >
                  PRIVACY ENQUIRIES
                </div>
                <a
                  href="mailto:team@narvent.in"
                  className="mt-1 flex min-h-11 items-center break-all text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-1)] hover:underline lg:text-[19px]"
                >
                  team@narvent.in
                </a>
              </div>
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-[15.5px] leading-[1.6] text-[#f2ecff]/[0.62] [text-wrap:pretty] lg:mt-7 lg:pt-6 lg:text-base">
              {CLOSING}
            </p>
          </section>
        </main>
      </div>

      <footer
        className={`${GUTTER} ${MONO} relative z-10 mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-6 text-xs font-medium uppercase tracking-[0.08em] text-[#f2ecff]/40 lg:mt-[clamp(56px,8vw,96px)] lg:py-7 lg:text-[12.5px]`}
      >
        <span>&copy; 2026 Narvent</span>
        <a
          href="#top"
          className="text-[#f2ecff]/[0.55] transition-colors hover:text-[var(--color-1)]"
        >
          Back to top &uarr;
        </a>
      </footer>
    </div>
  );
}
