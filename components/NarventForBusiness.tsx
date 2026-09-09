'use client';

import { useEffect, useRef, useState } from 'react';

const CSS = `
@keyframes nb-beam { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
@keyframes nb-orb { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-14px) scale(1.05); } }
@media (prefers-reduced-motion: reduce) { .nb-orb, .nb-net path { animation: none !important; } }
`;

const PATHS: Record<string, string> = {
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
  shield: 'M12 3l7 3v6c0 4-3 6.6-7 9-4-2.4-7-5-7-9V6zM9 12l2 2 4-4',
  eye: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6m10 2.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8',
  map: 'M9 20l-6 2V7l6-2m0 15 6 2m-6-2V5m6 17 6-2V5l-6 2m0 15V7m0 0L9 5',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
};

type Reason = { icon: keyof typeof PATHS | string; tint: string; kicker: string; title: string; desc: string };

const CTA = { label: 'Scope a deployment', href: '#demo' };

const REASONS: Reason[] = [
  { icon: 'clock', tint: '#5694ff', kicker: 'Speed', title: 'Crews on site in days, not quarters', desc: 'Tell us the scope and we source, verify and brief in parallel rather than in sequence, so the first shift runs while a tender would still be open.' },
  { icon: 'shield', tint: '#c156ff', kicker: 'Trust', title: 'Every worker verified before day one', desc: 'Identity, documents and role eligibility are checked digitally and stored against the deployment, so the audit trail is ready before anyone asks for it.' },
  { icon: 'eye', tint: '#8b7cff', kicker: 'Visibility', title: 'Watch the work as it happens', desc: 'Live attendance, geo-tagged proof of task and shift-level status across every site in one dashboard. You see exactly what our ops team sees.' },
  { icon: 'map', tint: '#5694ff', kicker: 'Reach', title: 'One partner from metro to tier 3', desc: 'The same contract covers every location we operate in, so a pilot expands into new cities without onboarding a new supplier for each one.' },
  { icon: 'receipt', tint: '#c156ff', kicker: 'Compliance', title: 'One invoice, statutory handled', desc: 'Wages, statutory contributions and consolidated billing sit with us. Your finance team receives a single monthly invoice per deployment.' },
];

const STATS = [
  { n: '30K+', label: 'Registered talent', sub: 'Across South India' },
  { n: '5,000+', label: 'Successful projects', sub: 'Delivered end to end' },
  { n: '50+', label: 'Trusted clients', sub: 'Enterprise and AI teams' },
  { n: '5M+', label: 'Annual payouts', sub: 'Statutory compliance handled by us' },
];

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const SANS = 'Archivo, system-ui, sans-serif';

export type NarventForBusinessProps = {
  /** how far the network graphic is scaled, as a % of the section width */
  networkScale?: number;
  /** opacity of the background network */
  networkOpacity?: number;
  className?: string;
};

export default function NarventForBusiness({
  networkScale = 112,
  networkOpacity = 0.5,
  className,
}: NarventForBusinessProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [index, setIndex] = useState(0);
  const active = REASONS[Math.min(index, REASONS.length - 1)];

  // snap each junction dot onto the nearest point of any connector path
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const links = svg.querySelector('[data-links="1"]');
    const dotsG = svg.querySelector('[data-dots="1"]');
    if (!links || !dotsG) return;
    const samples = Array.from(links.querySelectorAll<SVGPathElement>(':scope > path')).map((p) => {
      const len = p.getTotalLength();
      if (!len) return [] as DOMPoint[];
      const n = Math.max(24, Math.round(len / 8));
      return Array.from({ length: n + 1 }, (_, i) => p.getPointAtLength((i / n) * len));
    });
    Array.from(dotsG.querySelectorAll<SVGCircleElement>(':scope > circle')).forEach((c) => {
      const x = Number(c.getAttribute('cx'));
      const y = Number(c.getAttribute('cy'));
      let best: DOMPoint | null = null;
      let bd = Infinity;
      samples.forEach((pts) =>
        pts.forEach((pt) => {
          const d = (pt.x - x) ** 2 + (pt.y - y) ** 2;
          if (d < bd) { bd = d; best = pt; }
        }),
      );
      if (best) {
        c.setAttribute('cx', best.x.toFixed(1));
        c.setAttribute('cy', best.y.toFixed(1));
      }
    });
  }, []);

  const mask = 'radial-gradient(46% 62% at 50% 52%, transparent 52%, #000 92%)';

  return (
    <div className={className} style={{ background: '#0d0518', color: '#fff', fontFamily: SANS, WebkitFontSmoothing: 'antialiased' }}>
      <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{CSS}</style>

      <section style={{ position: 'relative', overflow: 'hidden', background: '#0d0518', padding: '120px clamp(28px,4vw,64px) 76px', minHeight: 760, display: 'flex', alignItems: 'center' }}>
        <div className="nb-orb" style={{ position: 'absolute', left: '50%', top: '46%', width: 1100, height: 900, margin: '-450px 0 0 -550px', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(109,86,255,.26), transparent 62%)', filter: 'blur(60px)', animation: 'nb-orb 26s ease-in-out infinite' }} />

        <div className="nb-net" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: networkOpacity, WebkitMaskImage: mask, maskImage: mask, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>
          <svg ref={svgRef} viewBox="0 0 1536 1024" style={{ 'position': 'absolute', 'left': '50%', 'top': '50%', 'transform': 'translate(-50%,-50%)', 'width': `${networkScale}%`, 'height': 'auto', 'display': 'block' }}>
          <defs>
          <symbol id="pp" viewBox="0 0 24 24">
          <circle cx="12" cy="8.4" r="3.5" fill="none" stroke="rgba(213,203,255,.55)" strokeWidth="1.5"></circle>
          <path d="M5.2 19.2c0-3.9 3-6.2 6.8-6.2s6.8 2.3 6.8 6.2" fill="none" stroke="rgba(213,203,255,.55)" strokeWidth="1.5" strokeLinecap="round"></path>
          </symbol>
          <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#000" floodOpacity="0.5"></feDropShadow>
          </filter>
          <filter id="softlg" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000" floodOpacity="0.5"></feDropShadow>
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
          <path id="s1" d="M690,455 C620,400 540,360 496,338" stroke="rgba(150,130,255,.42)" strokeWidth="1.6" opacity=".55"></path>
          <path id="s2" d="M800,452 C850,378 960,248 1030,204" stroke="rgba(150,130,255,.42)" strokeWidth="1.6" opacity=".55"></path>
          <path id="s3" d="M690,527 C620,572 560,640 498,676" stroke="rgba(150,130,255,.42)" strokeWidth="1.6" opacity=".55"></path>
          <path id="s4" d="M820,540 C880,610 920,690 950,720" stroke="rgba(150,130,255,.42)" strokeWidth="1.6" opacity=".55"></path>
          <path id="g1" d="M835,476 C950,438 1050,398 1122,376" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" opacity=".8"></path>
          <path id="g2" d="M835,497 C940,522 1030,546 1090,556" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" opacity=".8"></path>
          <path id="g3" d="M828,512 C900,600 1000,660 1078,690" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7" opacity=".75"></path>
          
          {/* animated beams over the spokes */}
          <path d="M690,455 C620,400 540,360 496,338" stroke="#8b7cff" strokeWidth="3" strokeDasharray="70 1000" style={{ 'animation': 'nb-beam 3.2s linear infinite' }}></path>
          <path d="M800,452 C850,378 960,248 1030,204" stroke="#8b7cff" strokeWidth="3" strokeDasharray="70 1000" style={{ 'animation': 'nb-beam 3.6s linear infinite', animationDelay: '-1.1s' }}></path>
          <path d="M690,527 C620,572 560,640 498,676" stroke="#8b7cff" strokeWidth="3" strokeDasharray="70 1000" style={{ 'animation': 'nb-beam 3.4s linear infinite', animationDelay: '-2.2s' }}></path>
          <path d="M820,540 C880,610 920,690 950,720" stroke="#8b7cff" strokeWidth="3" strokeDasharray="70 1000" style={{ 'animation': 'nb-beam 3s linear infinite', animationDelay: '-0.6s' }}></path>
          <path d="M835,476 C950,438 1050,398 1122,376" stroke="#5694ff" strokeWidth="2.4" strokeDasharray="55 1000" style={{ 'animation': 'nb-beam 4.2s linear infinite', animationDelay: '-1.6s' }}></path>
          <path d="M835,497 C940,522 1030,546 1090,556" stroke="#a78bff" strokeWidth="2.4" strokeDasharray="55 1000" style={{ 'animation': 'nb-beam 4.6s linear infinite', animationDelay: '-3s' }}></path>
          <path d="M828,512 C900,600 1000,660 1078,690" stroke="#a78bff" strokeWidth="2.2" strokeDasharray="50 1000" style={{ 'animation': 'nb-beam 5s linear infinite', animationDelay: '-2.4s' }}></path>
          
          {/* upper-left cluster */}
          <path d="M428,308 C400,290 370,258 340,240" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M434,355 C400,395 370,425 348,448" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M292,443 C265,410 220,360 190,335" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M282,463 C250,450 210,440 172,435" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M288,492 C255,520 210,545 168,556" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M428,308 C400,290 370,258 340,240" stroke="#5694ff" strokeWidth="2.4" strokeDasharray="40 1000" style={{ 'animation': 'nb-beam 3.8s linear infinite', animationDelay: '-0.9s' }}></path>
          <path d="M434,355 C400,395 370,425 348,448" stroke="#5694ff" strokeWidth="2.4" strokeDasharray="40 1000" style={{ 'animation': 'nb-beam 3.4s linear infinite', animationDelay: '-2.1s' }}></path>
          <path d="M288,492 C255,520 210,545 168,556" stroke="#5694ff" strokeWidth="2.2" strokeDasharray="38 1000" style={{ 'animation': 'nb-beam 4.4s linear infinite', animationDelay: '-1.3s' }}></path>
          
          {/* lower-left cluster */}
          <path d="M426,670 C380,630 300,625 256,645" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M428,695 C390,730 330,760 284,768" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M452,720 C442,760 412,792 412,812" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M452,720 C442,760 412,792 412,812" stroke="#5694ff" strokeWidth="2.2" strokeDasharray="34 1000" style={{ 'animation': 'nb-beam 4s linear infinite', animationDelay: '-2.6s' }}></path>
          
          {/* top-right cluster */}
          <path d="M1098,178 C1140,150 1190,115 1236,105" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M1102,196 C1150,200 1195,196 1233,192" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M1098,178 C1140,150 1190,115 1236,105" stroke="#5694ff" strokeWidth="2.4" strokeDasharray="36 1000" style={{ 'animation': 'nb-beam 3.6s linear infinite', animationDelay: '-1.8s' }}></path>
          <path d="M1102,196 C1150,200 1195,196 1233,192" stroke="#5694ff" strokeWidth="2.4" strokeDasharray="36 1000" style={{ 'animation': 'nb-beam 3.9s linear infinite', animationDelay: '-0.4s' }}></path>
          
          {/* right-upper cluster */}
          <path d="M1196,362 C1260,328 1330,283 1378,264" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M1198,371 C1260,360 1320,353 1372,350" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M1194,388 C1250,410 1310,432 1349,440" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M1152,412 C1142,462 1132,512 1128,522" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M1152,412 C1142,462 1132,512 1128,522" stroke="#a78bff" strokeWidth="2.2" strokeDasharray="34 1000" style={{ 'animation': 'nb-beam 3.3s linear infinite', animationDelay: '-1.5s' }}></path>
          
          {/* right-mid / lower cluster */}
          <path d="M1166,556 C1240,545 1320,543 1368,546" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M1160,575 C1220,605 1290,630 1326,638" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M1152,712 C1210,730 1260,748 1283,752" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M1166,556 C1240,545 1320,543 1368,546" stroke="#a78bff" strokeWidth="2.2" strokeDasharray="44 1000" style={{ 'animation': 'nb-beam 4.8s linear infinite', animationDelay: '-3.4s' }}></path>
          
          {/* bottom cluster */}
          <path d="M962,762 C940,795 916,824 906,832" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M988,773 C992,810 996,850 998,865" stroke="rgba(180,168,255,.30)" strokeWidth="1.2" strokeDasharray="5 7"></path>
          <path d="M1016,752 C1060,790 1090,830 1104,850" stroke="rgba(180,168,255,.30)" strokeWidth="1.2"></path>
          <path d="M962,762 C940,795 916,824 906,832" stroke="#5694ff" strokeWidth="2.2" strokeDasharray="30 1000" style={{ 'animation': 'nb-beam 3.5s linear infinite', animationDelay: '-0.8s' }}></path>
          <path d="M988,773 C992,810 996,850 998,865" stroke="#5694ff" strokeWidth="2.2" strokeDasharray="30 1000" style={{ 'animation': 'nb-beam 3.1s linear infinite', animationDelay: '-2s' }}></path>
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
          <g><circle cx="310" cy="225" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="294" y="209" width="32" height="32"></use>
          <g><circle cx="167" cy="315" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="151" y="299" width="32" height="32"></use>
          <g><circle cx="140" cy="432" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="124" y="416" width="32" height="32"></use>
          <g><circle cx="137" cy="562" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="121" y="546" width="32" height="32"></use>
          <g><circle cx="225" cy="655" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="209" y="639" width="32" height="32"></use>
          <g><circle cx="252" cy="770" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="236" y="754" width="32" height="32"></use>
          <g><circle cx="422" cy="840" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="406" y="824" width="32" height="32"></use>
          <g><circle cx="1268" cy="97" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1252" y="81" width="32" height="32"></use>
          <g><circle cx="1265" cy="192" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1249" y="176" width="32" height="32"></use>
          <g><circle cx="1410" cy="257" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1394" y="241" width="32" height="32"></use>
          <g><circle cx="1404" cy="350" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1388" y="334" width="32" height="32"></use>
          <g><circle cx="1381" cy="443" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1365" y="427" width="32" height="32"></use>
          <g><circle cx="1400" cy="548" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1384" y="532" width="32" height="32"></use>
          <g><circle cx="1358" cy="643" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1342" y="627" width="32" height="32"></use>
          <g><circle cx="1315" cy="755" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1299" y="739" width="32" height="32"></use>
          <g><circle cx="886" cy="852" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="870" y="836" width="32" height="32"></use>
          <g><circle cx="999" cy="897" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="983" y="881" width="32" height="32"></use>
          <g><circle cx="1119" cy="880" r="33" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1103" y="864" width="32" height="32"></use>
          </g>
          
          {/* hub nodes */}
          <g>
          <g><circle cx="458" cy="330" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="437" y="309" width="42" height="42"></use>
          <g><circle cx="320" cy="470" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="299" y="449" width="42" height="42"></use>
          <g><circle cx="460" cy="683" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="439" y="662" width="42" height="42"></use>
          <g><circle cx="1064" cy="192" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1043" y="171" width="42" height="42"></use>
          <g><circle cx="1160" cy="375" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1139" y="354" width="42" height="42"></use>
          <g><circle cx="1128" cy="560" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1107" y="539" width="42" height="42"></use>
          <g><circle cx="1116" cy="703" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="1095" y="682" width="42" height="42"></use>
          <g><circle cx="985" cy="735" r="42" fill="url(#nodeFade)"></circle></g><use xlinkHref="#pp" x="964" y="714" width="42" height="42"></use>
          </g>
          
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 940, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ font: `600 12px ${MONO}`, letterSpacing: '.2em', textTransform: 'uppercase', color: '#5694ff' }}>Narvent for business</div>
          <div style={{ width: 'min(560px,80%)', height: 1, margin: '16px auto 0', background: 'linear-gradient(90deg,transparent,rgba(193,86,255,.7),transparent)' }} />

          <h2 style={{ margin: '26px 0 0', font: `700 clamp(34px,4.2vw,60px)/0.98 ${SANS}`, letterSpacing: '-.055em', color: '#fff', textWrap: 'balance' }}>
            Stop chasing vendors.<br />Run one <span style={{ color: '#5694ff' }}>workforce</span> instead.
          </h2>

          <p style={{ margin: '24px auto 0', maxWidth: 600, font: `400 17.5px/1.6 ${SANS}`, color: 'rgba(255,255,255,.68)', textWrap: 'pretty' }}>
            Every extra staffing vendor is another contract, another quality standard and another week lost. Narvent replaces the chain with one platform: verified talent, deployed and supervised by us, visible to you shift by shift, billed on one invoice.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 34 }}>
            <a href="#demo" style={{ borderRadius: 10, padding: '16px 28px', font: `600 16px ${SANS}`, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg,#6d56ff,#c156ff)', boxShadow: '0 14px 36px rgba(109,86,255,.34)' }}>Book a meeting now</a>
            <a href="#offerings" style={{ border: '1px solid rgba(255,255,255,.2)', borderRadius: 10, padding: '16px 28px', font: `600 16px ${SANS}`, color: '#fff', textDecoration: 'none', background: 'rgba(13,5,24,.55)', backdropFilter: 'blur(6px)' }}>See what we run</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '26px 30px', maxWidth: 900, margin: '52px auto 0', padding: '30px 26px 4px', borderTop: '1px solid rgba(255,255,255,.12)', textAlign: 'left', background: 'rgba(13,5,24,.85)', backdropFilter: 'blur(10px)', borderRadius: '0 0 18px 18px' }}>
            {STATS.map((s) => (
              <div key={s.n}>
                <div style={{ font: `700 24px/1 ${MONO}`, color: '#5694ff' }}>{s.n}</div>
                <div style={{ marginTop: 6, font: `600 15px ${SANS}`, color: '#CBB8FF' }}>{s.label}</div>
                <div style={{ marginTop: 2, font: `400 12px ${SANS}`, color: 'rgba(255,255,255,.6)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', background: '#0d0518', padding: '40px clamp(28px,4vw,64px) 110px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2 style={{ margin: 0, textAlign: 'center', font: `700 clamp(28px,3.4vw,44px)/1.1 ${SANS}`, letterSpacing: '-.04em', color: '#fff' }}>Why work with us?</h2>

          <div style={{ marginTop: 44, borderRadius: 24, border: '1px solid rgba(255,255,255,.09)', background: 'linear-gradient(115deg,#07040e 0%,#0f0a22 44%,#141a3c 100%)', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(420px,1fr))' }}>
            <div style={{ position: 'relative', minHeight: 440, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '-46%', top: '50%', transform: 'translateY(-50%)', width: '120%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle at 72% 50%, rgba(86,148,255,.42), rgba(13,5,24,0) 66%)' }} />

              <div style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', marginRight: '14%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {REASONS.map((r, n) => (
                  <button
                    key={r.kicker}
                    onClick={() => setIndex(n)}
                    onMouseEnter={() => setIndex(n)}
                    aria-label={r.kicker}
                    style={{
                      width: n === index ? 58 : 48,
                      height: n === index ? 58 : 48,
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      background: '#fff',
                      boxShadow: n === index ? `0 0 0 8px ${r.tint}33, 0 14px 34px rgba(0,0,0,.45)` : '0 8px 22px rgba(0,0,0,.35)',
                      opacity: n === index ? 1 : 0.72,
                      transition: 'all .35s cubic-bezier(.2,.8,.2,1)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#14101f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={PATHS[r.icon]} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '34px clamp(26px,3vw,44px) 38px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ font: `600 12px ${MONO}`, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.42)' }}>For business</div>

              <div style={{ marginTop: 'auto', paddingTop: 44 }}>
                <div style={{ font: `600 11px ${MONO}`, letterSpacing: '.22em', textTransform: 'uppercase', color: active.tint }}>{active.kicker}</div>
                <h3 style={{ margin: '14px 0 0', font: `700 clamp(24px,2.4vw,32px)/1.16 ${SANS}`, letterSpacing: '-.03em', color: '#fff', textWrap: 'pretty' }}>{active.title}</h3>
                <p style={{ margin: '14px 0 0', maxWidth: 460, font: `400 15.5px/1.6 ${SANS}`, color: 'rgba(255,255,255,.6)', textWrap: 'pretty' }}>{active.desc}</p>
              </div>

              <a href={CTA.href} style={{ alignSelf: 'flex-start', marginTop: 38, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', color: '#0d0518', textDecoration: 'none', borderRadius: 999, padding: '15px 26px', font: `600 15.5px ${SANS}` }}>
                {CTA.label} <span style={{ font: `400 17px/1 ${SANS}` }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
