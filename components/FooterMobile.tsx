"use client";

const PRODUCT_LINKS = [
  { href: "#for-workers", label: "For Workers" },
  { href: "#for-business", label: "For Business" },
  { href: "#faq", label: "FAQ" },
];

const COMPANY_LINKS = [
  { href: "#terms", label: "Terms & Condition" },
  { href: "#privacy", label: "Privacy Policy" },
];

const SOCIALS = [
  {
    href: "#instagram",
    label: "Instagram",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" />
      </>
    ),
  },
  {
    href: "#whatsapp",
    label: "WhatsApp",
    icon: (
      <>
        <path d="M20.5 11.7A8.5 8.5 0 0 1 7.9 19.2L3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 20.5 11.7Z" />
        <path d="M9 8.6c.3-.1.6 0 .8.3l.8 1.3c.1.3.1.6-.1.8l-.5.6a6 6 0 0 0 2.6 2.6l.6-.5c.2-.2.5-.2.8-.1l1.3.8c.3.2.4.5.3.8-.2.7-.9 1.2-1.7 1.1a8 8 0 0 1-6.4-6.4c-.1-.8.4-1.5 1.1-1.7Z" />
      </>
    ),
  },
  {
    href: "#facebook",
    label: "Facebook",
    icon: (
      <path d="M15.5 4h-2.2A3.3 3.3 0 0 0 10 7.3V10H8v3h2v7h3v-7h2.3l.7-3H13V7.7c0-.4.3-.7.7-.7h1.8V4Z" />
    ),
  },
];

const linkClass =
  "text-[14.5px] text-[#191428]/70 transition-colors hover:text-[#4a34cf]";
const kickerClass =
  "font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[#191428]/40";

export default function FooterMobile() {
  return (
    <footer
      data-screen-label="Footer · phone, light"
      className="flex flex-col gap-[26px] bg-[#faf9fd] px-[22px] pb-[22px] pt-9 font-[Archivo,system-ui,sans-serif]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <svg width="19" height="33" viewBox="0 0 341 592" fill="none" aria-hidden="true">
            <path
              d="M341 409.643L340.313 158.737L50.2248 0V130.821L222.834 226.042V344.893L341 409.643Z"
              fill="#4a34cf"
            />
            <path
              d="M51.4797 525.819L51.0873 190.286L171.822 257.098V592H50.8112L0 489.208L51.4797 525.819Z"
              fill="#4a34cf"
            />
          </svg>
          <span className="text-[25px] font-extrabold leading-none tracking-[-0.03em] text-[#4a34cf]">
            Narvent
          </span>
        </div>
        <p className="m-0 text-[14px] leading-normal text-[#191428]/60">
          India&apos;s frontline workforce network
        </p>
      </div>

      <div className="flex gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#141020]/10 bg-white/80 text-[#191428]/70 transition-colors hover:border-[#4a34cf]/45 hover:text-[#4a34cf]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {s.icon}
            </svg>
          </a>
        ))}
      </div>

      <div className="h-px bg-[#141020]/10" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-[26px]">
        <nav className="flex flex-col gap-3.5">
          <div className={kickerClass}>Product</div>
          {PRODUCT_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </nav>
        <nav className="flex flex-col gap-3.5">
          <div className={kickerClass}>Company</div>
          {COMPANY_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="h-px bg-[#141020]/10" />

      <div className="flex flex-col gap-1.5">
        <div className="text-[12px] text-[#191428]/45">
          &copy; 2026 Narvent. All rights reserved.
        </div>
        <div className="font-mono text-[11.5px] text-[#191428]/30">
          India&apos;s frontline workforce network
        </div>
      </div>
    </footer>
  );
}
