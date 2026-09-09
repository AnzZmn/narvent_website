"use Client";

const CSS = `
@keyframes nb-beam { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
@keyframes nb-orb { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-14px) scale(1.05); } }
@media (prefers-reduced-motion: reduce) { .nb-orb, .nb-net path { animation: none !important; } }
`;

const METRICS = [
  {
    id: "1",
    metric: "Registered talent",
    figure: 30,
    sub: "K+",
    foot: "Across South India",
  },
  {
    id: "2",
    metric: "Successfull projects",
    figure: 5000,
    sub: "+",
    foot: "Delivered end-to-end",
  },
  {
    id: "3",
    metric: "Trusted clients",
    figure: 100,
    sub: "+",
    foot: "Enterprise and AI teams",
  },
  {
    id: "4",
    metric: "Annual payouts",
    figure: 6,
    sub: "M +",
    foot: "Statutory handled by us",
  },
];

import { cn, fontDisplay, fontMono } from "@/lib/utils";
import SplitText from "./SplitText";
import CountUp from "./CountUp";
import { HorizontalGlowLine } from "./glowLine";
import { ArrowRightIcon } from "lucide-react";
import SpecularButton from "./SpecularButton";
import OurOfferings from "./our-offerings/OurOfferings";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Capabilities() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // snap each junction dot onto the nearest point of any connector path
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const links = svg.querySelector('[data-links="1"]');
    const dotsG = svg.querySelector('[data-dots="1"]');
    if (!links || !dotsG) return;
    const samples = Array.from(
      links.querySelectorAll<SVGPathElement>(":scope > path"),
    ).map((p) => {
      const len = p.getTotalLength();
      if (!len) return [] as DOMPoint[];
      const n = Math.max(24, Math.round(len / 8));
      return Array.from({ length: n + 1 }, (_, i) =>
        p.getPointAtLength((i / n) * len),
      );
    });
    Array.from(
      dotsG.querySelectorAll<SVGCircleElement>(":scope > circle"),
    ).forEach((c) => {
      const x = Number(c.getAttribute("cx"));
      const y = Number(c.getAttribute("cy"));
      let best: DOMPoint | null = null;
      let bd = Infinity;
      samples.forEach((pts) =>
        pts.forEach((pt) => {
          const d = (pt.x - x) ** 2 + (pt.y - y) ** 2;
          if (d < bd) {
            bd = d;
            best = pt;
          }
        }),
      );
      if (best) {
        c.setAttribute("cx", best.x.toFixed(1));
        c.setAttribute("cy", best.y.toFixed(1));
      }
    });
  }, []);

  const mask = "radial-gradient(46% 62% at 50% 52%, transparent 52%, #000 92%)";

  const router = useRouter();

  return (
    <section
      id="Business"
      className="relative mx-auto h-auto text-center flex items-center w-screen snap-start flex-col py-20 md:pt-50 justify-center bg-black "
    >
      <div
        className="nb-orb"
        style={{
          position: "absolute",
          left: "50%",
          top: "20%",
          width: 1100,
          height: 900,
          margin: "-450px 0 0 -550px",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 50%, rgba(109,86,255,.26), transparent 82%)",
          filter: "blur(60px)",
          animation: "nb-orb 26s ease-in-out infinite",
        }}
      />
      <style>{CSS}</style>

      <div
        className="nb-net"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 1,
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1536 1024"
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%,-50%)",
            width: `112%`,
            height: "auto",
            display: "block",
          }}
        >
          <defs>
            <symbol id="pp" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="8.4"
                r="3.5"
                fill="none"
                stroke="rgba(213,203,255,.55)"
                strokeWidth="1.5"
              ></circle>
              <path
                d="M5.2 19.2c0-3.9 3-6.2 6.8-6.2s6.8 2.3 6.8 6.2"
                fill="none"
                stroke="rgba(213,203,255,.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </symbol>
            <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="9"
                floodColor="#000"
                floodOpacity="0.5"
              ></feDropShadow>
            </filter>
            <filter id="softlg" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="18"
                floodColor="#000"
                floodOpacity="0.5"
              ></feDropShadow>
            </filter>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7b3ff2"></stop>
              <stop offset="55%" stopColor="#5b2ee6"></stop>
              <stop offset="100%" stopColor="#3d1fd6"></stop>
            </linearGradient>
            <radialGradient id="nodeFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1b1030" stopOpacity="0.95"></stop>
              <stop offset="62%" stopColor="#1b1030" stopOpacity="0.8"></stop>
              <stop offset="100%" stopColor="#1b1030" stopOpacity="0"></stop>
            </radialGradient>
          </defs>

          <g data-links="1" fill="none" strokeLinecap="round">
            {/* main spokes: base */}
            <path
              id="s1"
              d="M690,455 C620,400 540,360 496,338"
              stroke="rgba(150,130,255,.42)"
              strokeWidth="1.6"
              opacity=".55"
            ></path>
            <path
              id="s2"
              d="M800,452 C850,378 960,248 1030,204"
              stroke="rgba(150,130,255,.42)"
              strokeWidth="1.6"
              opacity=".55"
            ></path>
            <path
              id="s3"
              d="M690,527 C620,572 560,640 498,676"
              stroke="rgba(150,130,255,.42)"
              strokeWidth="1.6"
              opacity=".55"
            ></path>
            <path
              id="s4"
              d="M820,540 C880,610 920,690 950,720"
              stroke="rgba(150,130,255,.42)"
              strokeWidth="1.6"
              opacity=".55"
            ></path>
            <path
              id="g1"
              d="M835,476 C950,438 1050,398 1122,376"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              opacity=".8"
            ></path>
            <path
              id="g2"
              d="M835,497 C940,522 1030,546 1090,556"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              opacity=".8"
            ></path>
            <path
              id="g3"
              d="M828,512 C900,600 1000,660 1078,690"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              opacity=".75"
            ></path>

            {/* animated beams over the spokes */}
            <path
              d="M690,455 C620,400 540,360 496,338"
              stroke="#8b7cff"
              strokeWidth="3"
              strokeDasharray="70 1000"
              style={{ animation: "nb-beam 3.2s linear infinite" }}
            ></path>
            <path
              d="M800,452 C850,378 960,248 1030,204"
              stroke="#8b7cff"
              strokeWidth="3"
              strokeDasharray="70 1000"
              style={{
                animation: "nb-beam 3.6s linear infinite",
                animationDelay: "-1.1s",
              }}
            ></path>
            <path
              d="M690,527 C620,572 560,640 498,676"
              stroke="#8b7cff"
              strokeWidth="3"
              strokeDasharray="70 1000"
              style={{
                animation: "nb-beam 3.4s linear infinite",
                animationDelay: "-2.2s",
              }}
            ></path>
            <path
              d="M820,540 C880,610 920,690 950,720"
              stroke="#8b7cff"
              strokeWidth="3"
              strokeDasharray="70 1000"
              style={{
                animation: "nb-beam 3s linear infinite",
                animationDelay: "-0.6s",
              }}
            ></path>
            <path
              d="M835,476 C950,438 1050,398 1122,376"
              stroke="#5694ff"
              strokeWidth="2.4"
              strokeDasharray="55 1000"
              style={{
                animation: "nb-beam 4.2s linear infinite",
                animationDelay: "-1.6s",
              }}
            ></path>
            <path
              d="M835,497 C940,522 1030,546 1090,556"
              stroke="#a78bff"
              strokeWidth="2.4"
              strokeDasharray="55 1000"
              style={{
                animation: "nb-beam 4.6s linear infinite",
                animationDelay: "-3s",
              }}
            ></path>
            <path
              d="M828,512 C900,600 1000,660 1078,690"
              stroke="#a78bff"
              strokeWidth="2.2"
              strokeDasharray="50 1000"
              style={{
                animation: "nb-beam 5s linear infinite",
                animationDelay: "-2.4s",
              }}
            ></path>

            {/* upper-left cluster */}
            <path
              d="M428,308 C400,290 370,258 340,240"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M434,355 C400,395 370,425 348,448"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M292,443 C265,410 220,360 190,335"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M282,463 C250,450 210,440 172,435"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M288,492 C255,520 210,545 168,556"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M428,308 C400,290 370,258 340,240"
              stroke="#5694ff"
              strokeWidth="2.4"
              strokeDasharray="40 1000"
              style={{
                animation: "nb-beam 3.8s linear infinite",
                animationDelay: "-0.9s",
              }}
            ></path>
            <path
              d="M434,355 C400,395 370,425 348,448"
              stroke="#5694ff"
              strokeWidth="2.4"
              strokeDasharray="40 1000"
              style={{
                animation: "nb-beam 3.4s linear infinite",
                animationDelay: "-2.1s",
              }}
            ></path>
            <path
              d="M288,492 C255,520 210,545 168,556"
              stroke="#5694ff"
              strokeWidth="2.2"
              strokeDasharray="38 1000"
              style={{
                animation: "nb-beam 4.4s linear infinite",
                animationDelay: "-1.3s",
              }}
            ></path>

            {/* lower-left cluster */}
            <path
              d="M426,670 C380,630 300,625 256,645"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M428,695 C390,730 330,760 284,768"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M452,720 C442,760 412,792 412,812"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M452,720 C442,760 412,792 412,812"
              stroke="#5694ff"
              strokeWidth="2.2"
              strokeDasharray="34 1000"
              style={{
                animation: "nb-beam 4s linear infinite",
                animationDelay: "-2.6s",
              }}
            ></path>

            {/* top-right cluster */}
            <path
              d="M1098,178 C1140,150 1190,115 1236,105"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M1102,196 C1150,200 1195,196 1233,192"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M1098,178 C1140,150 1190,115 1236,105"
              stroke="#5694ff"
              strokeWidth="2.4"
              strokeDasharray="36 1000"
              style={{
                animation: "nb-beam 3.6s linear infinite",
                animationDelay: "-1.8s",
              }}
            ></path>
            <path
              d="M1102,196 C1150,200 1195,196 1233,192"
              stroke="#5694ff"
              strokeWidth="2.4"
              strokeDasharray="36 1000"
              style={{
                animation: "nb-beam 3.9s linear infinite",
                animationDelay: "-0.4s",
              }}
            ></path>

            {/* right-upper cluster */}
            <path
              d="M1196,362 C1260,328 1330,283 1378,264"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M1198,371 C1260,360 1320,353 1372,350"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M1194,388 C1250,410 1310,432 1349,440"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M1152,412 C1142,462 1132,512 1128,522"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M1152,412 C1142,462 1132,512 1128,522"
              stroke="#a78bff"
              strokeWidth="2.2"
              strokeDasharray="34 1000"
              style={{
                animation: "nb-beam 3.3s linear infinite",
                animationDelay: "-1.5s",
              }}
            ></path>

            {/* right-mid / lower cluster */}
            <path
              d="M1166,556 C1240,545 1320,543 1368,546"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M1160,575 C1220,605 1290,630 1326,638"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M1152,712 C1210,730 1260,748 1283,752"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M1166,556 C1240,545 1320,543 1368,546"
              stroke="#a78bff"
              strokeWidth="2.2"
              strokeDasharray="44 1000"
              style={{
                animation: "nb-beam 4.8s linear infinite",
                animationDelay: "-3.4s",
              }}
            ></path>

            {/* bottom cluster */}
            <path
              d="M962,762 C940,795 916,824 906,832"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M988,773 C992,810 996,850 998,865"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            ></path>
            <path
              d="M1016,752 C1060,790 1090,830 1104,850"
              stroke="rgba(180,168,255,.30)"
              strokeWidth="1.2"
            ></path>
            <path
              d="M962,762 C940,795 916,824 906,832"
              stroke="#5694ff"
              strokeWidth="2.2"
              strokeDasharray="30 1000"
              style={{
                animation: "nb-beam 3.5s linear infinite",
                animationDelay: "-0.8s",
              }}
            ></path>
            <path
              d="M988,773 C992,810 996,850 998,865"
              stroke="#5694ff"
              strokeWidth="2.2"
              strokeDasharray="30 1000"
              style={{
                animation: "nb-beam 3.1s linear infinite",
                animationDelay: "-2s",
              }}
            ></path>
          </g>

          {/* junction dots */}
          <g data-dots="1" opacity="0.9">
            <circle cx="686" cy="452" r="6" fill="#8b7cff"></circle>
            <circle cx="884" cy="296" r="6" fill="#8b7cff"></circle>
            <circle cx="688" cy="533" r="6" fill="#8b7cff"></circle>
            <circle cx="866" cy="619" r="6" fill="#8b7cff"></circle>
            <circle cx="587" cy="643" r="6" fill="#8b7cff"></circle>
            <circle cx="944" cy="714" r="6" fill="#8b7cff"></circle>
            <circle cx="922" cy="431" r="6" fill="#a78bff"></circle>
            <circle cx="1082" cy="690" r="6" fill="#a78bff"></circle>
            <circle cx="1080" cy="551" r="6" fill="#a78bff"></circle>
            <circle cx="1168" cy="690" r="6" fill="#a78bff"></circle>
            <circle cx="1219" cy="343" r="6" fill="#a78bff"></circle>
            <circle cx="1222" cy="398" r="6" fill="#a78bff"></circle>
            <circle cx="1191" cy="565" r="6" fill="#a78bff"></circle>
            <circle cx="1128" cy="527" r="6" fill="#a78bff"></circle>
            <circle cx="404" cy="274" r="6" fill="#5694ff"></circle>
            <circle cx="387" cy="341" r="6" fill="#5694ff"></circle>
            <circle cx="300" cy="418" r="6" fill="#5694ff"></circle>
            <circle cx="262" cy="452" r="6" fill="#5694ff"></circle>
            <circle cx="265" cy="504" r="6" fill="#5694ff"></circle>
            <circle cx="452" cy="641" r="6" fill="#8b7cff"></circle>
            <circle cx="396" cy="684" r="6" fill="#8b7cff"></circle>
            <circle cx="420" cy="737" r="6" fill="#5694ff"></circle>
            <circle cx="1130" cy="163" r="6" fill="#5694ff"></circle>
            <circle cx="1136" cy="209" r="6" fill="#5694ff"></circle>
            <circle cx="951" cy="791" r="6" fill="#5694ff"></circle>
            <circle cx="1020" cy="791" r="6" fill="#5694ff"></circle>
          </g>

          {/* leaf nodes */}
          <g>
            <g>
              <circle cx="310" cy="225" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="294" y="209" width="32" height="32"></use>
            <g>
              <circle cx="167" cy="315" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="151" y="299" width="32" height="32"></use>
            <g>
              <circle cx="140" cy="432" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="124" y="416" width="32" height="32"></use>
            <g>
              <circle cx="137" cy="562" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="121" y="546" width="32" height="32"></use>
            <g>
              <circle cx="225" cy="655" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="209" y="639" width="32" height="32"></use>
            <g>
              <circle cx="252" cy="770" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="236" y="754" width="32" height="32"></use>
            <g>
              <circle cx="422" cy="840" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="406" y="824" width="32" height="32"></use>
            <g>
              <circle cx="1268" cy="97" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1252" y="81" width="32" height="32"></use>
            <g>
              <circle cx="1265" cy="192" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1249" y="176" width="32" height="32"></use>
            <g>
              <circle cx="1410" cy="257" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1394" y="241" width="32" height="32"></use>
            <g>
              <circle cx="1404" cy="350" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1388" y="334" width="32" height="32"></use>
            <g>
              <circle cx="1381" cy="443" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1365" y="427" width="32" height="32"></use>
            <g>
              <circle cx="1400" cy="548" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1384" y="532" width="32" height="32"></use>
            <g>
              <circle cx="1358" cy="643" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1342" y="627" width="32" height="32"></use>
            <g>
              <circle cx="1315" cy="755" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1299" y="739" width="32" height="32"></use>
            <g>
              <circle cx="886" cy="852" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="870" y="836" width="32" height="32"></use>
            <g>
              <circle cx="999" cy="897" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="983" y="881" width="32" height="32"></use>
            <g>
              <circle cx="1119" cy="880" r="33" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1103" y="864" width="32" height="32"></use>
          </g>

          {/* hub nodes */}
          <g>
            <g>
              <circle cx="458" cy="330" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="437" y="309" width="42" height="42"></use>
            <g>
              <circle cx="320" cy="470" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="299" y="449" width="42" height="42"></use>
            <g>
              <circle cx="460" cy="683" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="439" y="662" width="42" height="42"></use>
            <g>
              <circle cx="1064" cy="192" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1043" y="171" width="42" height="42"></use>
            <g>
              <circle cx="1160" cy="375" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1139" y="354" width="42" height="42"></use>
            <g>
              <circle cx="1128" cy="560" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1107" y="539" width="42" height="42"></use>
            <g>
              <circle cx="1116" cy="703" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="1095" y="682" width="42" height="42"></use>
            <g>
              <circle cx="985" cy="735" r="42" fill="url(#nodeFade)"></circle>
            </g>
            <use xlinkHref="#pp" x="964" y="714" width="42" height="42"></use>
          </g>
        </svg>
      </div>

      <div className=" relative flex w-screen flex-col justify-center items-center z-10">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] mt-5"
          style={{ ...fontMono, color: "var(--color-1)" }}
        >
          Narvent For Business
        </span>
        <HorizontalGlowLine
          color="from-transparent via-[var(--color-3)] to-transparent"
          className="max-w-3xl bg-transparent"
        />
        <div className="flex flex-col mt-[26px] font-[var(--font-display)] text-[clamp(34px,4.6vw,66px)] font-bold leading-[0.95] tracking-[-0.055em] text-white [text-wrap:balance]">
          <SplitText
            text="Tell us the scope."
            className="py-2"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            highlightWords={["workforce"]}
            highlightClassName="text-[var(--color-1)]"
          ></SplitText>

          <SplitText
            text="We staff it and Supervise it."
            delay={50}
            duration={1.25}
            ease="power3.out"
            className="py-2"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            highlightWords={["staff", "Supervise"]}
            highlightClassName="text-[var(--color-1)]"
          ></SplitText>
        </div>
        <div className="mx-auto mt-[26px] max-w-[672px] font-[var(--font-display)] text-[18px] font-normal leading-[1.6] text-white/[0.6] [text-wrap:pretty]">
          <SplitText
            text="Every extra staffing vendor is another contract, another quality standard and another week lost. Narvent replaces the chain with one platform: verified talent, deployed and supervised by us, visible to you shift by shift, billed on one invoice."
            className={cn("mt-4 text-lg text-white/60")}
            delay={10}
            duration={0.5}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            highlightWords={["frontline", "talent", "Narvent"]}
            highlightClassName="text-[var(--color-1)]"
          ></SplitText>
        </div>

        <SpecularButton
          size="lg"
          radius={18}
          tint="#ffffff"
          tintOpacity={0}
          blur={0}
          textColor="#f5f5f5"
          lineColor="#ffffff"
          baseColor="#525252"
          intensity={1}
          shineSize={10}
          shineFade={40}
          thickness={1}
          speed={0.35}
          followMouse
          proximity={500}
          autoAnimate={true}
          onClick={() => router.push("/ContactUs")}
          className="my-10"
        >
          <span className="flex flex-row flex-nowrap gap-3 text-lg justify-center items-center text-white tracking-tighter">
            <p className="m-0 whitespace-nowrap">Book a meeting now</p>

            <ArrowRightIcon
              className="
        size-6
        shrink-0
        transition-all
        duration-200
        ease-out
        group-hover:translate-x-1.5
        group-hover:text-(--color-1)
      "
            />
          </span>
        </SpecularButton>
        <div className=" w-5xl h-auto flex mt-10">
          <div className="grid h-[100px] w-full max-w-5xl grid-cols-4 gap-2 p-2 pl-30">
            {METRICS.map((item) => {
              return (
                <div
                  className="flex flex-col justify-start "
                  style={{ ...fontDisplay }}
                  key={item.id}
                >
                  <span
                    className="flex flex-row gap-1 justify-start text-2xl font-bold text-[var(--color-1)]"
                    style={{
                      ...fontMono,
                    }}
                  >
                    <CountUp
                      from={0}
                      to={item.figure}
                      separator=","
                      direction="up"
                      duration={0.5}
                      className="count-up-text text-start"
                      delay={0}
                    />
                    <p className="">{item.sub}</p>
                  </span>
                  <span className="text-md text-[#CBB8FF] font-semibold text-start">
                    {item.metric}
                  </span>
                  <span className="text-xs text-white/60 font-normal text-start">
                    {item.foot}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <OurOfferings />
    </section>
  );
}
