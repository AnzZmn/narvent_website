import Image from "next/image";
import { HeroCopy } from "./HeroCopy";
import { HeroMapBackdrop } from "./HeroMapBackdrop";
import { HeroStatsGrid } from "./HeroStatsGrid";
import { HeroTicker } from "./HeroTicker";
import "./hero-map.css";

export default function NarventHeroMap() {
  return (
    <section
      data-screen-label="Hero · phone, map backdrop"
      className="relative flex aspect-16/9 flex-col  bg-[#faf9fd]"
    >
      <HeroMapBackdrop />

      <header className="relative z-20 flex items-center justify-start gap-3 px-5 py-[18px]">
        <a
          href="#top"
          className="flex items-center gap-2 font-[var(--font-display)] text-[21px] font-extrabold leading-none tracking-[-0.03em] text-[#4a34cf]"
        >
          <Image
            src="/NarventLogoMobile.svg"
            width={15}
            height={15}
            alt="logo"
          />
          Narvent.
        </a>
      </header>

      <HeroCopy />
      <HeroTicker />
    </section>
  );
}
