"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";
import WhatTheyDo from "@/components/WhatWeDo";
import { IntroGate } from "@/components/intro-animation/IntroGate";
import NarventFaq from "@/components/NarventFaq";
import NarventTestimonials from "@/components/NarventTestimonials";
import NarventWhyWorkWithUs from "@/components/NarventWhyWorkWithUs";
import NarventHeroMap from "@/components/hero-map/NarventHeroMap";
import ForBusinessMobile from "@/components/for-business-mobile/ForBusinessMobile";
import OurOfferingsMobile from "@/components/our-offerings-mobile/OurOfferingsMobile";
import WhyWorkWithUsMobile from "@/components/WhyWorkWithUsMobile";
import FooterMobile from "@/components/FooterMobile";
import NarventHeroMapDesktop from "@/components/NarventHeroMap";
import LookingForWorkMobile from "@/components/LookingForWorkMobile";
import NarventFAQMobile from "@/components/narvent-faq-mobile";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse) and (hover: none)");

    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  const [introPlaying, setIntroPlaying] = useState(true);

  return (
    <>
      <IntroGate onIntroDone={() => setIntroPlaying(false)}>
        {isMobile ? (
          <>
            <NarventHeroMap />
            <LookingForWorkMobile inlineForm />
            <NarventFAQMobile />
            <ForBusinessMobile framed={false} />
            <OurOfferingsMobile framed={false} />
            <WhyWorkWithUsMobile />
            <FooterMobile />
          </>
        ) : (
          <>
            <div className="relative bg-[#0d0a1a] ">
              {/* 3D background */}
              {/*
        Fix: the original wrapped Hero/Capabilities/Features in
        pointer-events-none with no corresponding pointer-events-auto
        anywhere inside, which silently disables every button, link,
        and input in those sections (pointer-events-none is inherited
        by children unless a child explicitly opts back in). Since
        the background no longer needs pointer capture, the
        foreground can stay fully interactive.
      */}

              <div className="relative z-10 overflow-y-scroll">
                <NarventHeroMapDesktop className="md:h-svh aspect-wide:h-auto" />
                <WhatTheyDo />

                <NarventTestimonials />
                <NarventFaq />
                <Capabilities />
                <NarventWhyWorkWithUs />
                <Footer />
              </div>
            </div>
          </>
        )}
      </IntroGate>
    </>
  );
}
