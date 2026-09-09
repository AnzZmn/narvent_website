"use client";

import Footer from "@/components/Footer";
import NarventContactSales from "@/components/NarventContactSales";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "../page";
import FooterMobile from "@/components/FooterMobile";

export default function ContactUsPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <>
      {isMobile ? (
        <>
          <header className="absolute z-20 flex items-center justify-start gap-3 px-5 py-[18px]">
            <Link
              href="#top"
              className="flex items-center gap-2 font-[var(--font-display)] text-[21px] font-extrabold leading-none tracking-[-0.03em] text-[#4a34cf] "
              onClick={(e) => {
                e.preventDefault();
                router.push("/#Hero");
              }}
            >
              <Image
                src="/NarventLogoMobile.svg"
                width={15}
                height={15}
                alt="logo"
              />
              Narvent.
            </Link>
          </header>
          <NarventContactSales />
          <FooterMobile />
        </>
      ) : (
        <>
          <header className="relative z-20 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-6 px-[clamp(28px,5vw,100px)] py-[26px] bg-[radial-gradient(78%_60%_at_78%_0%,#e6e2f2_72%)] hidden md:grid">
            <span className="flex gap-2 items-center">
              <Image
                src="/NarventSVG.svg"
                alt="logo"
                className="object-contain"
                width={20}
                height={20}
              />
              <Link
                href={"/#Hero"}
                className="justify-self-start text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff]"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#Hero");
                }}
              >
                Narvent.
              </Link>
            </span>
            <nav className="flex gap-[34px] text-sm font-medium ">
              <Link
                href="#forworkers"
                className="transition-colors text-black/50 hover:text-black/80"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#forworkers");
                }}
              >
                For Workers
              </Link>
              <Link
                href="#Business"
                className="text-black/50 hover:text-black/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#Business");
                }}
              >
                For Business
              </Link>
              <Link
                href="#faq"
                className="text-black/50 hover:text-black/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#faq");
                }}
              >
                FAQ
              </Link>
            </nav>
          </header>
          <NarventContactSales />
          <Footer />
        </>
      )}
    </>
  );
}
