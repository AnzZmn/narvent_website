"use client";

import { useEffect, useRef } from "react";
import { Iphone } from "./ui/iphone";
import NarventTestimonials from "./NarventTestimonials";

const SANS = "Archivo, system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const CSS = `
.nf summary { list-style: none; }
.nf summary::-webkit-details-marker { display: none; }
.nf details[open] .nf-chev { transform: rotate(180deg); }
.nf-scroll::-webkit-scrollbar { width: 6px; }
.nf-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.16); border-radius: 99px; }
@keyframes nf-travel { 0% { offset-distance: 0%; } 34% { offset-distance: 42%; } 47% { offset-distance: 42%; } 83% { offset-distance: 90%; } 95% { offset-distance: 90%; } 100% { offset-distance: 100%; } }
@keyframes nf-pop { 0%,32% { opacity: 0; transform: translateY(5px) scale(.86); } 38%,45% { opacity: 1; transform: translateY(0) scale(1); } 51%,81% { opacity: 0; transform: translateY(5px) scale(.86); } 87%,93% { opacity: 1; transform: translateY(0) scale(1); } 99%,100% { opacity: 0; transform: translateY(5px) scale(.86); } }
@keyframes nf-ring { 0% { transform: scale(.6); opacity: .55; } 70%,100% { transform: scale(2.2); opacity: 0; } }
@keyframes nf-dash { to { stroke-dashoffset: -260; } }
@media (prefers-reduced-motion: reduce) { .nf g, .nf circle { animation: none !important; } }
`;

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Narvent?",
    a: "Narvent connects workers with flexible, paid work opportunities from businesses and AI companies. You can discover projects, complete tasks, and earn based on the work you take up.",
  },
  {
    q: "Who can join Narvent?",
    a: "Anyone who is eligible to work and meets the requirements of a particular project can register. Different projects may have different requirements such as location, skills, age, or availability.",
  },
  {
    q: "What kind of work is available?",
    a: "Work can include AI data collection, data annotation, asset audits, field surveys, verification, quality checks, and other on-ground or digital tasks.",
  },
  {
    q: "Do I need previous experience?",
    a: "Not always. Some projects are beginner-friendly and include instructions or training before you start. Projects that require specific skills or experience will mention those requirements.",
  },
  {
    q: "How do I get a project?",
    a: "After registering, you'll be considered for projects that match your profile, location, skills, and availability. When you're eligible for an opportunity, you'll receive the relevant project details and instructions.",
  },
  {
    q: "Is the work full-time or part-time?",
    a: "Most Narvent opportunities are flexible gig or project-based work. You can choose opportunities based on your availability, subject to each project's requirements.",
  },
  {
    q: "How much can I earn?",
    a: "Earnings depend on the project, task, location, and amount of work completed. Each opportunity will provide the applicable payment details before you begin.",
  },
  {
    q: "When will I get paid?",
    a: "Payments are processed according to the payment schedule and verification requirements of each project. You’ll be informed of the payment terms when you join a project.",
  },
  {
    q: "Do I have to pay to register?",
    a: "No. You should not have to pay Narvent simply to register as a worker. Be cautious of anyone asking for money in exchange for guaranteed work or selection.",
  },
  {
    q: "What documents do I need?",
    a: "Requirements vary by project. You may be asked to provide basic identity, contact, payment, or eligibility information required to verify your participation and process payments.",
  },
  {
    q: "Can I work on multiple projects?",
    a: "This depends on the individual project rules. Some opportunities may allow you to participate in multiple projects, while others may require dedicated availability.",
  },
  {
    q: "What happens after I register?",
    a: "We'll review your information and match you with suitable opportunities. If you're selected for a project, you'll receive the details, requirements, instructions, and payment terms.",
  },
  {
    q: "How do I get help if I have a problem?",
    a: "You can contact the Narvent support team through the support channel provided for your project. For active projects, keep your project ID and relevant task details ready so we can resolve issues faster.",
  },
  {
    q: "Why should I join Narvent?",
    a: "Narvent gives you access to real project opportunities, flexible work, and a growing network of workers—so you can turn your skills and available time into income.",
  },
];

export type NarventFaqProps = {
  /** how many workers move on the map at once */
  density?: "Calm" | "Busy" | "Peak";
  /** speed multiplier for the worker animation */
  pace?: number;
  /** dotted route overlay on the roads */
  routes?: "Visible" | "Hidden";
  /** street-name labels on the background map */
  mapLabels?: "Visible" | "Hidden";
  /** opacity of the background map, 0–1 */
  mapOpacity?: number;
  className?: string;
};

export default function NarventFaq({
  density = "Busy",
  pace = 0.7,
  routes = "Visible",
  mapLabels = "Hidden",
  mapOpacity = 0.85,
  className,
}: NarventFaqProps) {
  const mapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const p = Number(pace) || 0.7;
    const shown = { Calm: 8, Busy: 16, Peak: 24 }[density] ?? 16;

    svg.querySelectorAll<SVGGElement>("[data-w]").forEach((g) => {
      if (!g.dataset.baseDur) {
        const cs = getComputedStyle(g);
        g.dataset.baseDur = String(parseFloat(cs.animationDuration) || 24);
        g.dataset.baseDelay = String(parseFloat(cs.animationDelay) || 0);
      }
      const d = Number(g.dataset.baseDur) / p;
      const dl = Number(g.dataset.baseDelay) / p;
      g.style.animationDuration = d + "s";
      g.style.animationDelay = dl + "s";
      g.style.display = Number(g.dataset.w) < shown ? "" : "none";
      const b = g.querySelector<SVGGElement>('[data-bubble="1"]');
      if (b) {
        b.style.animationDuration = d + "s";
        b.style.animationDelay = dl + "s";
      }
    });

    const r = svg.querySelector<SVGGElement>('[data-routes="1"]');
    if (r) r.style.display = routes === "Visible" ? "" : "none";
    const l = svg.querySelector<SVGGElement>('[data-role="label"]');
    if (l) l.style.display = mapLabels === "Visible" ? "" : "none";
  }, [density, pace, routes, mapLabels]);

  return (
    <section
      className={`nf${className ? " " + className : ""}`}
      style={{
        position: "relative",
        background: "#000000",
        color: "#fff",
        fontFamily: SANS,
        WebkitFontSmoothing: "antialiased",
      }}
      id="faq"
    >
      <style>{CSS}</style>
      <div style={{ position: "relative", height: "screen" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            minHeight: 680,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: mapOpacity }}>
            <svg
              ref={mapRef}
              data-map="faq"
              viewBox="0 0 1600 1000"
              preserveAspectRatio="xMidYMid slice"
              style={{
                position: "absolute",
                inset: "0",
                width: "100%",
                height: "100%",
                display: "block",
                background: "#000000",
              }}
            >
              <defs>
                <filter id="mSoft" x="-60%" y="-60%" width="220%" height="220%">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="#0b1220"
                    floodOpacity=".28"
                  ></feDropShadow>
                </filter>
                <filter id="mPin" x="-80%" y="-80%" width="260%" height="260%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="6"
                    floodColor="#0b1220"
                    floodOpacity=".35"
                  ></feDropShadow>
                </filter>
              </defs>

              <g
                data-role="water"
                fill="none"
                stroke="#17284a"
                strokeLinecap="round"
              >
                <path
                  d="M -40,610 C 230,600 440,594 650,582 C 920,568 1200,548 1660,520"
                  strokeWidth="76"
                ></path>
                <path
                  d="M 430,-40 C 448,120 478,270 528,388 C 556,452 570,514 586,572"
                  strokeWidth="58"
                ></path>
                <path
                  d="M 1408,-40 C 1500,60 1596,132 1680,176"
                  strokeWidth="66"
                ></path>
                <path
                  d="M 1250,20 C 1330,10 1420,40 1470,96"
                  strokeWidth="34"
                  opacity=".9"
                ></path>
              </g>
              <g data-role="water" fill="#17284a">
                <path d="M -40,760 L 250,716 C 360,730 420,790 404,880 C 392,952 300,1010 180,1020 L -40,1020 Z"></path>
                <path
                  d="M 470,900 C 560,880 640,912 660,980 L 660,1020 L 460,1020 Z"
                  opacity=".92"
                ></path>
                <path
                  d="M 1560,300 C 1620,286 1660,320 1660,392 L 1660,470 L 1580,470 Z"
                  opacity=".8"
                ></path>
              </g>

              <g
                data-role="minor"
                fill="none"
                stroke="rgba(255,255,255,.085)"
                strokeWidth="3.4"
                strokeLinecap="round"
              >
                <path d="M 60,120 L 340,96"></path>
                <path d="M 80,220 L 268,206"></path>
                <path d="M 46,330 L 300,312"></path>
                <path d="M 120,430 L 296,418"></path>
                <path d="M 60,500 L 292,486"></path>
                <path d="M 150,60 L 168,330"></path>
                <path d="M 96,180 L 112,470"></path>
                <path d="M 214,40 L 236,300"></path>
                <path d="M 330,760 L 470,742"></path>
                <path d="M 300,840 L 452,824"></path>
                <path d="M 390,700 L 402,900"></path>
                <path d="M 620,120 L 760,110"></path>
                <path d="M 600,210 L 756,200"></path>
                <path d="M 596,400 L 748,392"></path>
                <path d="M 660,60 L 676,400"></path>
                <path d="M 596,140 L 610,420"></path>
                <path d="M 800,150 L 950,140"></path>
                <path d="M 812,380 L 990,368"></path>
                <path d="M 860,90 L 878,290"></path>
                <path d="M 920,60 L 936,270"></path>
                <path d="M 1060,120 L 1180,108"></path>
                <path d="M 1090,60 L 1104,270"></path>
                <path d="M 1200,180 L 1330,166"></path>
                <path d="M 1180,340 L 1330,326"></path>
                <path d="M 1250,240 L 1262,470"></path>
                <path d="M 800,650 L 990,638"></path>
                <path d="M 806,830 L 1000,816"></path>
                <path d="M 850,700 L 866,960"></path>
                <path d="M 1060,600 L 1230,588"></path>
                <path d="M 1070,880 L 1250,864"></path>
                <path d="M 1140,640 L 1156,980"></path>
                <path d="M 1290,560 L 1440,548"></path>
                <path d="M 1300,820 L 1430,808"></path>
                <path d="M 1350,600 L 1364,900"></path>
                <path d="M 480,470 L 620,460"></path>
                <path d="M 470,540 L 640,528"></path>
              </g>

              <g
                data-role="road"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="12"
                ></path>
                <path
                  d="M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="8.5"
                ></path>
                <path
                  d="M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="12"
                ></path>
                <path
                  d="M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="8.5"
                ></path>
                <path
                  d="M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="11"
                ></path>
                <path
                  d="M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="7.5"
                ></path>
                <path
                  d="M 250,60 C 262,220 274,380 286,540 C 296,680 304,820 310,1000"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="11"
                ></path>
                <path
                  d="M 250,60 C 262,220 274,380 286,540 C 296,680 304,820 310,1000"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="7.5"
                ></path>
                <path
                  d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="12"
                ></path>
                <path
                  d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="8.5"
                ></path>
                <path
                  d="M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="14"
                ></path>
                <path
                  d="M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="10"
                ></path>
                <path
                  d="M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="12"
                ></path>
                <path
                  d="M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020"
                  stroke="rgba(255,255,255,.17)"
                  strokeWidth="8"
                ></path>
              </g>

              <g data-role="arterial" fill="none" strokeLinecap="round">
                <path
                  d="M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020"
                  stroke="rgba(255,255,255,.10)"
                  strokeWidth="26"
                ></path>
                <path
                  d="M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020"
                  stroke="rgba(255,255,255,.24)"
                  strokeWidth="20"
                ></path>
                <path
                  d="M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020"
                  stroke="rgba(255,255,255,.10)"
                  strokeWidth="26"
                ></path>
                <path
                  d="M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020"
                  stroke="rgba(255,255,255,.24)"
                  strokeWidth="20"
                ></path>
              </g>

              <g
                data-routes="1"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="14 12"
                style={{ animation: "nf-dash 6s linear infinite" }}
              >
                <path
                  d="M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020"
                  stroke="#6d56ff"
                  strokeWidth="3.4"
                  opacity=".5"
                ></path>
                <path
                  d="M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476"
                  stroke="#5694ff"
                  strokeWidth="3.4"
                  opacity=".5"
                ></path>
                <path
                  d="M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020"
                  stroke="#c156ff"
                  strokeWidth="3.4"
                  opacity=".5"
                ></path>
                <path
                  d="M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240"
                  stroke="#6d56ff"
                  strokeWidth="3"
                  opacity=".45"
                ></path>
                <path
                  d="M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722"
                  stroke="#5694ff"
                  strokeWidth="3"
                  opacity=".45"
                ></path>
                <path
                  d="M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000"
                  stroke="#c156ff"
                  strokeWidth="3"
                  opacity=".45"
                ></path>
                <path
                  d="M 250,60 C 262,220 274,380 286,540 C 296,680 304,820 310,1000"
                  stroke="#6d56ff"
                  strokeWidth="3"
                  opacity=".45"
                ></path>
                <path
                  d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652"
                  stroke="#5694ff"
                  strokeWidth="3"
                  opacity=".45"
                ></path>
              </g>

              <g data-role="pins" filter="url(#mPin)">
                <g>
                  <circle
                    cx="764"
                    cy="640"
                    r="13"
                    fill="#6d56ff"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "nf-ring 3.2s ease-out infinite",
                    }}
                  ></circle>
                  <circle cx="764" cy="640" r="7" fill="#fff"></circle>
                  <circle cx="764" cy="640" r="4" fill="#6d56ff"></circle>
                </g>
                <g>
                  <circle
                    cx="1140"
                    cy="276"
                    r="13"
                    fill="#c156ff"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "nf-ring 3.2s ease-out infinite",
                      animationDelay: "-1.1s",
                    }}
                  ></circle>
                  <circle cx="1140" cy="276" r="7" fill="#fff"></circle>
                  <circle cx="1140" cy="276" r="4" fill="#c156ff"></circle>
                </g>
                <g>
                  <circle
                    cx="286"
                    cy="540"
                    r="13"
                    fill="#5694ff"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "nf-ring 3.2s ease-out infinite",
                      animationDelay: "-2.2s",
                    }}
                  ></circle>
                  <circle cx="286" cy="540" r="7" fill="#fff"></circle>
                  <circle cx="286" cy="540" r="4" fill="#5694ff"></circle>
                </g>
                <g>
                  <circle
                    cx="1140"
                    cy="736"
                    r="13"
                    fill="#6d56ff"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "nf-ring 3.2s ease-out infinite",
                      animationDelay: "-1.7s",
                    }}
                  ></circle>
                  <circle cx="1140" cy="736" r="7" fill="#fff"></circle>
                  <circle cx="1140" cy="736" r="4" fill="#6d56ff"></circle>
                </g>
              </g>

              <g
                data-role="label"
                fontFamily="Archivo, system-ui, sans-serif"
                fontSize="15"
                fontWeight="600"
                fill="rgba(255,255,255,.30)"
              >
                <text x="24" y="546">
                  Canal Rd
                </text>
                <text x="24" y="680">
                  Tank Bund Road
                </text>
                <text x="712" y="452" transform="rotate(-88 712 452)">
                  Service Rd
                </text>
                <text x="716" y="180">
                  Vyttila
                </text>
                <text x="1188" y="266">
                  Thykoodam
                </text>
                <text x="1040" y="700" transform="rotate(-88 1040 700)">
                  Kumalakkat Rd
                </text>
                <text x="300" y="530" transform="rotate(-86 300 530)">
                  Chilavannur Rd
                </text>
                <text x="1418" y="640" transform="rotate(80 1418 640)">
                  NH 66
                </text>
                <text x="1476" y="152" fill="rgba(140,190,220,.34)">
                  Kaniyampuzha
                </text>
              </g>

              <g data-workers="1" filter="url(#mSoft)">
                <g
                  data-w="0"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020')",
                    animation: "nf-travel 26s linear infinite",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "0s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Data collected
                    </text>
                  </g>
                </g>
                <g
                  data-w="1"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020')",
                    animation: "nf-travel 26s linear infinite",
                    animationDelay: "-9s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "-9s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Notice delivered
                    </text>
                  </g>
                </g>
                <g
                  data-w="2"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020')",
                    animation: "nf-travel 26s linear infinite",
                    animationDelay: "-18s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "-18s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Money credited
                    </text>
                  </g>
                </g>
                <g
                  data-w="3"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476')",
                    animation: "nf-travel 30s linear infinite",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 30s linear infinite",
                      animationDelay: "0s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Site audited
                    </text>
                  </g>
                </g>
                <g
                  data-w="4"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476')",
                    animation: "nf-travel 30s linear infinite",
                    animationDelay: "-11s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 30s linear infinite",
                      animationDelay: "-11s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="162"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="162"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      New work available
                    </text>
                  </g>
                </g>
                <g
                  data-w="5"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476')",
                    animation: "nf-travel 34s linear infinite",
                    animationDelay: "-22s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 34s linear infinite",
                      animationDelay: "-22s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="155"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="155"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Attendance marked
                    </text>
                  </g>
                </g>
                <g
                  data-w="6"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020')",
                    animation: "nf-travel 28s linear infinite",
                    animationDelay: "-4s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 28s linear infinite",
                      animationDelay: "-4s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="169"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="169"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Task photo uploaded
                    </text>
                  </g>
                </g>
                <g
                  data-w="7"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020')",
                    animation: "nf-travel 28s linear infinite",
                    animationDelay: "-16s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 28s linear infinite",
                      animationDelay: "-16s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="126"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="126"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Shift started
                    </text>
                  </g>
                </g>
                <g
                  data-w="8"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240')",
                    animation: "nf-travel 18s linear infinite",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 18s linear infinite",
                      animationDelay: "0s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Survey submitted
                    </text>
                  </g>
                </g>
                <g
                  data-w="9"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240')",
                    animation: "nf-travel 22s linear infinite",
                    animationDelay: "-8s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 22s linear infinite",
                      animationDelay: "-8s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Notice delivered
                    </text>
                  </g>
                </g>
                <g
                  data-w="10"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722')",
                    animation: "nf-travel 20s linear infinite",
                    animationDelay: "-3s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 20s linear infinite",
                      animationDelay: "-3s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="126"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="126"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Stock audited
                    </text>
                  </g>
                </g>
                <g
                  data-w="11"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722')",
                    animation: "nf-travel 24s linear infinite",
                    animationDelay: "-14s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 24s linear infinite",
                      animationDelay: "-14s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Payout released
                    </text>
                  </g>
                </g>
                <g
                  data-w="12"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000')",
                    animation: "nf-travel 21s linear infinite",
                    animationDelay: "-6s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 21s linear infinite",
                      animationDelay: "-6s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Data collected
                    </text>
                  </g>
                </g>
                <g
                  data-w="13"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000')",
                    animation: "nf-travel 25s linear infinite",
                    animationDelay: "-17s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 25s linear infinite",
                      animationDelay: "-17s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Job accepted
                    </text>
                  </g>
                </g>
                <g
                  data-w="14"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 250,60 C 262,220 274,380 286,540 C 296,680 304,820 310,1000')",
                    animation: "nf-travel 27s linear infinite",
                    animationDelay: "-2s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 27s linear infinite",
                      animationDelay: "-2s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="112"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="112"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      ID verified
                    </text>
                  </g>
                </g>
                <g
                  data-w="15"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 250,60 C 262,220 274,380 286,540 C 296,680 304,820 310,1000')",
                    animation: "nf-travel 23s linear infinite",
                    animationDelay: "-13s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 23s linear infinite",
                      animationDelay: "-13s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Money credited
                    </text>
                  </g>
                </g>
                <g
                  data-w="16"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652')",
                    animation: "nf-travel 19s linear infinite",
                    animationDelay: "-5s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 19s linear infinite",
                      animationDelay: "-5s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Route completed
                    </text>
                  </g>
                </g>
                <g
                  data-w="17"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652')",
                    animation: "nf-travel 26s linear infinite",
                    animationDelay: "-15s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "-15s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Data collected
                    </text>
                  </g>
                </g>
                <g
                  data-w="18"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020')",
                    animation: "nf-travel 31s linear infinite",
                    animationDelay: "-7s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 31s linear infinite",
                      animationDelay: "-7s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="162"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="162"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      New work available
                    </text>
                  </g>
                </g>
                <g
                  data-w="19"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020')",
                    animation: "nf-travel 29s linear infinite",
                    animationDelay: "-20s",
                    animationDirection: "reverse",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 29s linear infinite",
                      animationDelay: "-20s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="119"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Audit passed
                    </text>
                  </g>
                </g>
                <g
                  data-w="20"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240')",
                    animation: "nf-travel 26s linear infinite",
                    animationDelay: "-19s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#c156ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "-19s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="148"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#c156ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#c156ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Notice delivered
                    </text>
                  </g>
                </g>
                <g
                  data-w="21"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476')",
                    animation: "nf-travel 26s linear infinite",
                    animationDelay: "-6s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 26s linear infinite",
                      animationDelay: "-6s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="155"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="155"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Attendance marked
                    </text>
                  </g>
                </g>
                <g
                  data-w="22"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 1000,300 C 1006,440 1012,580 1018,720 C 1022,820 1026,900 1030,1000')",
                    animation: "nf-travel 30s linear infinite",
                    animationDelay: "-25s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#5694ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 30s linear infinite",
                      animationDelay: "-25s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="141"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#5694ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#5694ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Payout released
                    </text>
                  </g>
                </g>
                <g
                  data-w="23"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    offsetRotate: "0deg",
                    offsetPath:
                      "path('M 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722')",
                    animation: "nf-travel 28s linear infinite",
                    animationDelay: "-21s",
                  }}
                >
                  <circle r="9" fill="#fff"></circle>
                  <circle r="5" fill="#6d56ff"></circle>
                  <g
                    data-bubble="1"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "0 100%",
                      opacity: "0",
                      animation: "nf-pop 28s linear infinite",
                      animationDelay: "-21s",
                    }}
                  >
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="#0d0518"
                      opacity=".93"
                    ></rect>
                    <rect
                      x="14"
                      y="-45"
                      width="133"
                      height="28"
                      rx="14"
                      fill="none"
                      stroke="#6d56ff"
                      strokeWidth="1"
                      opacity=".5"
                    ></rect>
                    <circle cx="30" cy="-31" r="3.6" fill="#6d56ff"></circle>
                    <text
                      x="41"
                      y="-26"
                      fontFamily="Archivo, system-ui, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Data collected
                    </text>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(88% 70% at 22% 50%, rgba(13,5,24,.9) 26%, rgba(13,5,24,.44) 68%, rgba(13,5,24,.2) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg,#0d0518 0%,rgba(13,5,24,0) 16%,rgba(13,5,24,0) 84%,#0d0518 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 3,
              width: "100%",
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0 clamp(24px,4vw,64px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))",
              gap: "clamp(32px,5vw,80px)",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: 460 }}>
              <div
                style={{
                  font: `600 12px ${MONO}`,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#5694ff",
                }}
              >
                For workers
              </div>
              <h2
                style={{
                  margin: "20px 0 0",
                  font: `700 clamp(34px,4vw,54px)/1.02 ${SANS}`,
                  letterSpacing: "-.05em",
                  color: "#fff",
                  textWrap: "balance",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                style={{
                  margin: "20px 0 0",
                  font: `400 16.5px/1.6 ${SANS}`,
                  color: "rgba(255,255,255,.6)",
                  textWrap: "pretty",
                }}
              >
                Everything about registering, getting matched to projects and
                getting paid.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 30,
                }}
              >
                <a
                  href="#register"
                  style={{
                    borderRadius: 10,
                    padding: "15px 26px",
                    font: `600 15.5px ${SANS}`,
                    color: "#fff",
                    textDecoration: "none",
                    background: "linear-gradient(135deg,#6d56ff,#c156ff)",
                    boxShadow: "0 14px 36px rgba(109,86,255,.32)",
                  }}
                >
                  Register as a worker
                </a>
                <a
                  href="#support"
                  style={{
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: 10,
                    padding: "15px 26px",
                    font: `600 15.5px ${SANS}`,
                    color: "#fff",
                    textDecoration: "none",
                    background: "rgba(13,5,24,.5)",
                  }}
                >
                  Contact support
                </a>
              </div>
            </div>

            <div
              className="nf-scroll"
              style={{
                maxHeight: "min(74vh,760px)",
                overflowY: "auto",
                padding: "6px 22px",
                borderRadius: 20,
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.09)",
                backdropFilter: "blur(14px)",
              }}
            >
              {FAQ.map((item, i) => (
                <details
                  key={item.q}
                  open={i === 0}
                  style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}
                >
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      padding: "20px 4px",
                      cursor: "pointer",
                      font: `600 17px/1.4 ${SANS}`,
                      color: "#fff",
                      textWrap: "pretty",
                    }}
                  >
                    <span
                      style={{
                        flex: "0 0 auto",
                        width: 26,
                        font: `600 12px ${MONO}`,
                        color: "rgba(255,255,255,.34)",
                        paddingTop: 4,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ flex: 1 }}>{item.q}</span>
                    <svg
                      className="nf-chev"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#8b7cff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        flex: "0 0 auto",
                        marginTop: 3,
                        transition: "transform .25s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p
                    style={{
                      margin: "0 4px 22px 42px",
                      maxWidth: 640,
                      font: `400 15.5px/1.65 ${SANS}`,
                      color: "rgba(255,255,255,.62)",
                      textWrap: "pretty",
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(48px,7vh,96px) clamp(24px,4vw,64px)",
          borderTop: "1px solid rgba(255,255,255,.09)",
          background: "linear-gradient(180deg,#0d0518 0%,#120a26 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 900,
            height: 600,
            margin: "-300px 0 0 -450px",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 70% 50%, rgba(109,86,255,.24), transparent 62%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(36px,6vw,80px)",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <div
              style={{
                font: `600 12px ${MONO}`,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#5694ff",
              }}
            >
              Coming soon
            </div>
            <h3
              style={{
                margin: "18px 0 0",
                font: `700 clamp(28px,3.4vw,44px)/1.06 ${SANS}`,
                letterSpacing: "-.045em",
                color: "#fff",
                textWrap: "balance",
              }}
            >
              The Narvent app for workers
            </h3>
            <p
              style={{
                margin: "18px 0 0",
                font: `400 16px/1.6 ${SANS}`,
                color: "rgba(255,255,255,.6)",
                textWrap: "pretty",
              }}
            >
              Find projects near you, accept work, mark attendance and track
              payouts from your phone. Launching on Play Store and App Store.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 28,
              }}
            >
              {["Google Play", "App Store"].map((store) => (
                <div
                  key={store}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(255,255,255,.05)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#6d56ff",
                      boxShadow: "0 0 0 4px rgba(109,86,255,.22)",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: 1.25,
                    }}
                  >
                    <span
                      style={{
                        font: `500 10.5px ${MONO}`,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.5)",
                      }}
                    >
                      Soon on
                    </span>
                    <span style={{ font: `600 15px ${SANS}`, color: "#fff" }}>
                      {store}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#notify"
              style={{
                display: "inline-block",
                marginTop: 24,
                font: `600 15px ${SANS}`,
                color: "#8b7cff",
                textDecoration: "none",
                borderBottom: "1px solid rgba(139,124,255,.4)",
                paddingBottom: 2,
              }}
            >
              Notify me at launch →
            </a>
          </div>

          <div className="h-[600px] aspect-433/882">
            <Iphone src="/MobileApp.svg" color="#000000" />
          </div>
        </div>
      </div>
    </section>
  );
}
