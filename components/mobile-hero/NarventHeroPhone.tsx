import { HeroCardCluster } from "./HeroCardCluster";
import { HeroHeadline } from "./HeroHeadline";
import { HeroStats } from "./HeroStats";
import { HeroTicker } from "./HeroTicker";
import "./hero-phone.css";

export function HeroPhoneHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-5 py-[18px]">
      <a
        href="#top"
        className="font-[Archivo] text-[22px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff]"
      >
        Narvent.
      </a>
      <div className="flex items-center gap-2.5">
        <a
          href="#contact"
          className="flex h-[38px] items-center rounded-lg border border-white/[0.16] bg-[rgba(10,6,18,0.6)] px-3.5 font-[Archivo] text-[13px] font-medium text-white"
        >
          Contact
        </a>
        <button
          type="button"
          aria-label="Menu"
          className="grid h-11 w-11 place-items-center gap-[5px] rounded-[10px] border border-white/[0.14] bg-[rgba(10,6,18,0.5)]"
        >
          <span className="block h-[1.5px] w-[18px] bg-white" />
          <span className="block h-[1.5px] w-[18px] bg-white" />
        </button>
      </div>
    </header>
  );
}

export default function NarventHeroPhone() {
  return (
    <section
      data-screen-label="Hero · phone"
      className="relative flex flex-col overflow-hidden h-screen bg-[#150b26]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_46%_at_62%_16%,rgba(109,86,255,0.36),transparent_70%),radial-gradient(70%_40%_at_8%_4%,rgba(86,148,255,0.16),transparent_72%)]"
      />
      <HeroPhoneHeader />
      <HeroHeadline />
      <HeroStats />
      <HeroTicker />
    </section>
  );
}
