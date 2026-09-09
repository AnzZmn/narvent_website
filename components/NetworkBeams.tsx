'use client';

import { useEffect, useRef } from 'react';

export type NetworkBeamsProps = {
  /** show the junction dots (snapped onto their nearest connector) or hide them */
  dots?: 'Aligned to lines' | 'Hidden';
  /** direction the light travels along the connectors */
  flow?: 'Outward' | 'Inward' | 'Still';
  /** beam speed multiplier, 0.3–2.5 */
  pace?: number;
  className?: string;
};

const CSS = `
@keyframes nb-beam { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
@keyframes nb-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
`;


function Person({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 24;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill="none" stroke="#141414" strokeWidth={1.5 / s} strokeLinecap="round">
      <circle cx="12" cy="8.4" r="3.5" />
      <path d="M5.2 19.2c0-3.9 3-6.2 6.8-6.2s6.8 2.3 6.8 6.2" />
    </g>
  );
}

export default function NetworkBeams({
  dots = 'Aligned to lines',
  flow = 'Inward',
  pace = 1,
  className,
}: NetworkBeamsProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  // beam direction + speed
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const p = Number(pace) || 1;
    svg.querySelectorAll<SVGPathElement>('path[stroke-dasharray]').forEach((el) => {
      if (!String(el.getAttribute('stroke-dasharray')).includes('1000')) return;
      if (!el.dataset.baseDur) {
        const cs = getComputedStyle(el);
        el.dataset.baseDur = String(parseFloat(cs.animationDuration) || 3.5);
        el.dataset.baseDelay = String(parseFloat(cs.animationDelay) || 0);
      }
      el.style.animationDuration = Number(el.dataset.baseDur) / p + 's';
      el.style.animationDelay = Number(el.dataset.baseDelay) / p + 's';
      el.style.animationDirection = flow === 'Inward' ? 'reverse' : 'normal';
      el.style.animationPlayState = flow === 'Still' ? 'paused' : 'running';
    });
  }, [flow, pace]);

  // snap each dot onto the nearest point of any connector path
  useEffect(() => {
    const svg = ref.current;
    if (!svg || dots === 'Hidden') return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-links="1"] > path'));
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-dots="1"] > circle'));
    if (!paths.length || !circles.length) return;
    const samples = paths.map((el) => {
      const len = el.getTotalLength();
      if (!len) return [] as DOMPoint[];
      const n = Math.max(24, Math.round(len / 8));
      return Array.from({ length: n + 1 }, (_, i) => el.getPointAtLength((i / n) * len));
    });
    circles.forEach((c) => {
      const x = Number(c.dataset.ox ?? c.getAttribute('cx'));
      const y = Number(c.dataset.oy ?? c.getAttribute('cy'));
      c.dataset.ox = String(x);
      c.dataset.oy = String(y);
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
  }, [dots]);

  return (
    <div
      className={className}
      style={{
        width: '100%',
	height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(120% 90% at 50% 45%, #fbfbfc 0%, #f2f2f4 100%)',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <style>{CSS}</style>
      <svg ref={ref} viewBox="0 0 1536 1024" style={{ width: '100%', maxWidth: '1536px', height: 'auto', display: 'block', overflow: 'visible' }}>
      <defs>
      <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#0b0b1a" floodOpacity="0.13"></feDropShadow>
      </filter>
      <filter id="softlg" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#0b0b1a" floodOpacity="0.16"></feDropShadow>
      </filter>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#7b3ff2"></stop>
      <stop offset="55%" stopColor="#5b2ee6"></stop>
      <stop offset="100%" stopColor="#3d1fd6"></stop>
      </linearGradient>
      </defs>
      
      <g data-links="1" fill="none" strokeLinecap="round">
      {/* main spokes: base */}
      <path id="s1" d="M690,455 C620,400 540,360 496,338" stroke="#6d3ff5" strokeWidth="1.6" opacity=".55"></path>
      <path id="s2" d="M800,452 C850,378 960,248 1030,204" stroke="#6d3ff5" strokeWidth="1.6" opacity=".55"></path>
      <path id="s3" d="M690,527 C620,572 560,640 498,676" stroke="#6d3ff5" strokeWidth="1.6" opacity=".55"></path>
      <path id="s4" d="M820,540 C880,610 920,690 950,720" stroke="#6d3ff5" strokeWidth="1.6" opacity=".55"></path>
      <path id="g1" d="M835,476 C950,438 1050,398 1122,376" stroke="#9a9aa6" strokeWidth="1.2" opacity=".8"></path>
      <path id="g2" d="M835,497 C940,522 1030,546 1090,556" stroke="#9a9aa6" strokeWidth="1.2" opacity=".8"></path>
      <path id="g3" d="M828,512 C900,600 1000,660 1078,690" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7" opacity=".75"></path>
      
      {/* animated beams over the spokes */}
      <path d="M690,455 C620,400 540,360 496,338" stroke="#5b2ee6" strokeWidth="3" strokeDasharray="70 1000" style={{ animation: 'nb-beam 3.2s linear infinite' }}></path>
      <path d="M800,452 C850,378 960,248 1030,204" stroke="#5b2ee6" strokeWidth="3" strokeDasharray="70 1000" style={{ animation: 'nb-beam 3.6s linear infinite', animationDelay: '-1.1s' }}></path>
      <path d="M690,527 C620,572 560,640 498,676" stroke="#5b2ee6" strokeWidth="3" strokeDasharray="70 1000" style={{ animation: 'nb-beam 3.4s linear infinite', animationDelay: '-2.2s' }}></path>
      <path d="M820,540 C880,610 920,690 950,720" stroke="#5b2ee6" strokeWidth="3" strokeDasharray="70 1000" style={{ animation: 'nb-beam 3s linear infinite', animationDelay: '-0.6s' }}></path>
      <path d="M835,476 C950,438 1050,398 1122,376" stroke="#2f6bff" strokeWidth="2.4" strokeDasharray="55 1000" style={{ animation: 'nb-beam 4.2s linear infinite', animationDelay: '-1.6s' }}></path>
      <path d="M835,497 C940,522 1030,546 1090,556" stroke="#7b3ff2" strokeWidth="2.4" strokeDasharray="55 1000" style={{ animation: 'nb-beam 4.6s linear infinite', animationDelay: '-3s' }}></path>
      <path d="M828,512 C900,600 1000,660 1078,690" stroke="#7b3ff2" strokeWidth="2.2" strokeDasharray="50 1000" style={{ animation: 'nb-beam 5s linear infinite', animationDelay: '-2.4s' }}></path>
      
      {/* upper-left cluster */}
      <path d="M428,308 C400,290 370,258 340,240" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M434,355 C400,395 370,425 348,448" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M292,443 C265,410 220,360 190,335" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M282,463 C250,450 210,440 172,435" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M288,492 C255,520 210,545 168,556" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M428,308 C400,290 370,258 340,240" stroke="#2f6bff" strokeWidth="2.4" strokeDasharray="40 1000" style={{ animation: 'nb-beam 3.8s linear infinite', animationDelay: '-0.9s' }}></path>
      <path d="M434,355 C400,395 370,425 348,448" stroke="#2f6bff" strokeWidth="2.4" strokeDasharray="40 1000" style={{ animation: 'nb-beam 3.4s linear infinite', animationDelay: '-2.1s' }}></path>
      <path d="M288,492 C255,520 210,545 168,556" stroke="#2f6bff" strokeWidth="2.2" strokeDasharray="38 1000" style={{ animation: 'nb-beam 4.4s linear infinite', animationDelay: '-1.3s' }}></path>
      
      {/* lower-left cluster */}
      <path d="M426,670 C380,630 300,625 256,645" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M428,695 C390,730 330,760 284,768" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M452,720 C442,760 412,792 412,812" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M452,720 C442,760 412,792 412,812" stroke="#2f6bff" strokeWidth="2.2" strokeDasharray="34 1000" style={{ animation: 'nb-beam 4s linear infinite', animationDelay: '-2.6s' }}></path>
      
      {/* top-right cluster */}
      <path d="M1098,178 C1140,150 1190,115 1236,105" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M1102,196 C1150,200 1195,196 1233,192" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M1098,178 C1140,150 1190,115 1236,105" stroke="#2f6bff" strokeWidth="2.4" strokeDasharray="36 1000" style={{ animation: 'nb-beam 3.6s linear infinite', animationDelay: '-1.8s' }}></path>
      <path d="M1102,196 C1150,200 1195,196 1233,192" stroke="#2f6bff" strokeWidth="2.4" strokeDasharray="36 1000" style={{ animation: 'nb-beam 3.9s linear infinite', animationDelay: '-0.4s' }}></path>
      
      {/* right-upper cluster */}
      <path d="M1196,362 C1260,328 1330,283 1378,264" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M1198,371 C1260,360 1320,353 1372,350" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M1194,388 C1250,410 1310,432 1349,440" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M1152,412 C1142,462 1132,512 1128,522" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M1152,412 C1142,462 1132,512 1128,522" stroke="#7b3ff2" strokeWidth="2.2" strokeDasharray="34 1000" style={{ animation: 'nb-beam 3.3s linear infinite', animationDelay: '-1.5s' }}></path>
      
      {/* right-mid / lower cluster */}
      <path d="M1166,556 C1240,545 1320,543 1368,546" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M1160,575 C1220,605 1290,630 1326,638" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M1152,712 C1210,730 1260,748 1283,752" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M1166,556 C1240,545 1320,543 1368,546" stroke="#7b3ff2" strokeWidth="2.2" strokeDasharray="44 1000" style={{ animation: 'nb-beam 4.8s linear infinite', animationDelay: '-3.4s' }}></path>
      
      {/* bottom cluster */}
      <path d="M962,762 C940,795 916,824 906,832" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M988,773 C992,810 996,850 998,865" stroke="#9a9aa6" strokeWidth="1.2" strokeDasharray="5 7"></path>
      <path d="M1016,752 C1060,790 1090,830 1104,850" stroke="#9a9aa6" strokeWidth="1.2"></path>
      <path d="M962,762 C940,795 916,824 906,832" stroke="#2f6bff" strokeWidth="2.2" strokeDasharray="30 1000" style={{ animation: 'nb-beam 3.5s linear infinite', animationDelay: '-0.8s' }}></path>
      <path d="M988,773 C992,810 996,850 998,865" stroke="#2f6bff" strokeWidth="2.2" strokeDasharray="30 1000" style={{ animation: 'nb-beam 3.1s linear infinite', animationDelay: '-2s' }}></path>
      </g>
      
      {/* junction dots */}
      <g data-dots="1" style={{ display: dots === 'Hidden' ? 'none' : 'inline' }}>
      <circle cx="686" cy="452" r="6" fill="#5b2ee6"></circle>
      <circle cx="884" cy="296" r="6" fill="#5b2ee6"></circle>
      <circle cx="688" cy="533" r="6" fill="#5b2ee6"></circle>
      <circle cx="866" cy="619" r="6" fill="#5b2ee6"></circle>
      <circle cx="587" cy="643" r="6" fill="#5b2ee6"></circle>
      <circle cx="944" cy="714" r="6" fill="#5b2ee6"></circle>
      <circle cx="922" cy="431" r="6" fill="#7b3ff2"></circle>
      <circle cx="1082" cy="690" r="6" fill="#7b3ff2"></circle>
      <circle cx="1080" cy="551" r="6" fill="#7b3ff2"></circle>
      <circle cx="1168" cy="690" r="6" fill="#7b3ff2"></circle>
      <circle cx="1219" cy="343" r="6" fill="#7b3ff2"></circle>
      <circle cx="1222" cy="398" r="6" fill="#7b3ff2"></circle>
      <circle cx="1191" cy="565" r="6" fill="#7b3ff2"></circle>
      <circle cx="1128" cy="527" r="6" fill="#7b3ff2"></circle>
      <circle cx="404" cy="274" r="6" fill="#2f6bff"></circle>
      <circle cx="387" cy="341" r="6" fill="#2f6bff"></circle>
      <circle cx="300" cy="418" r="6" fill="#2f6bff"></circle>
      <circle cx="262" cy="452" r="6" fill="#2f6bff"></circle>
      <circle cx="265" cy="504" r="6" fill="#2f6bff"></circle>
      <circle cx="452" cy="641" r="6" fill="#5b2ee6"></circle>
      <circle cx="396" cy="684" r="6" fill="#5b2ee6"></circle>
      <circle cx="420" cy="737" r="6" fill="#2f6bff"></circle>
      <circle cx="1130" cy="163" r="6" fill="#2f6bff"></circle>
      <circle cx="1136" cy="209" r="6" fill="#2f6bff"></circle>
      <circle cx="951" cy="791" r="6" fill="#2f6bff"></circle>
      <circle cx="1020" cy="791" r="6" fill="#2f6bff"></circle>
      </g>
      
      {/* leaf nodes */}
      <g>
      <g filter="url(#soft)"><circle cx="310" cy="225" r="33" fill="#fafafb"></circle></g><Person x={294} y={209} size={32} />
      <g filter="url(#soft)"><circle cx="167" cy="315" r="33" fill="#fafafb"></circle></g><Person x={151} y={299} size={32} />
      <g filter="url(#soft)"><circle cx="140" cy="432" r="33" fill="#fafafb"></circle></g><Person x={124} y={416} size={32} />
      <g filter="url(#soft)"><circle cx="137" cy="562" r="33" fill="#fafafb"></circle></g><Person x={121} y={546} size={32} />
      <g filter="url(#soft)"><circle cx="225" cy="655" r="33" fill="#fafafb"></circle></g><Person x={209} y={639} size={32} />
      <g filter="url(#soft)"><circle cx="252" cy="770" r="33" fill="#fafafb"></circle></g><Person x={236} y={754} size={32} />
      <g filter="url(#soft)"><circle cx="422" cy="840" r="33" fill="#fafafb"></circle></g><Person x={406} y={824} size={32} />
      <g filter="url(#soft)"><circle cx="1268" cy="97" r="33" fill="#fafafb"></circle></g><Person x={1252} y={81} size={32} />
      <g filter="url(#soft)"><circle cx="1265" cy="192" r="33" fill="#fafafb"></circle></g><Person x={1249} y={176} size={32} />
      <g filter="url(#soft)"><circle cx="1410" cy="257" r="33" fill="#fafafb"></circle></g><Person x={1394} y={241} size={32} />
      <g filter="url(#soft)"><circle cx="1404" cy="350" r="33" fill="#fafafb"></circle></g><Person x={1388} y={334} size={32} />
      <g filter="url(#soft)"><circle cx="1381" cy="443" r="33" fill="#fafafb"></circle></g><Person x={1365} y={427} size={32} />
      <g filter="url(#soft)"><circle cx="1400" cy="548" r="33" fill="#fafafb"></circle></g><Person x={1384} y={532} size={32} />
      <g filter="url(#soft)"><circle cx="1358" cy="643" r="33" fill="#fafafb"></circle></g><Person x={1342} y={627} size={32} />
      <g filter="url(#soft)"><circle cx="1315" cy="755" r="33" fill="#fafafb"></circle></g><Person x={1299} y={739} size={32} />
      <g filter="url(#soft)"><circle cx="886" cy="852" r="33" fill="#fafafb"></circle></g><Person x={870} y={836} size={32} />
      <g filter="url(#soft)"><circle cx="999" cy="897" r="33" fill="#fafafb"></circle></g><Person x={983} y={881} size={32} />
      <g filter="url(#soft)"><circle cx="1119" cy="880" r="33" fill="#fafafb"></circle></g><Person x={1103} y={864} size={32} />
      </g>
      
      {/* hub nodes */}
      <g>
      <g filter="url(#soft)"><circle cx="458" cy="330" r="42" fill="#fbfbfc"></circle></g><Person x={437} y={309} size={42} />
      <g filter="url(#soft)"><circle cx="320" cy="470" r="42" fill="#fbfbfc"></circle></g><Person x={299} y={449} size={42} />
      <g filter="url(#soft)"><circle cx="460" cy="683" r="42" fill="#fbfbfc"></circle></g><Person x={439} y={662} size={42} />
      <g filter="url(#soft)"><circle cx="1064" cy="192" r="42" fill="#fbfbfc"></circle></g><Person x={1043} y={171} size={42} />
      <g filter="url(#soft)"><circle cx="1160" cy="375" r="42" fill="#fbfbfc"></circle></g><Person x={1139} y={354} size={42} />
      <g filter="url(#soft)"><circle cx="1128" cy="560" r="42" fill="#fbfbfc"></circle></g><Person x={1107} y={539} size={42} />
      <g filter="url(#soft)"><circle cx="1116" cy="703" r="42" fill="#fbfbfc"></circle></g><Person x={1095} y={682} size={42} />
      <g filter="url(#soft)"><circle cx="985" cy="735" r="42" fill="#fbfbfc"></circle></g><Person x={964} y={714} size={42} />
      </g>
      
      {/* centre mark */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center'}}>
      <g filter="url(#softlg)"><circle cx="760" cy="490" r="76" fill="#ffffff"></circle></g>
      <g transform="translate(729,436) scale(0.493)">
      <path d="M15.3846 193.281C15.7158 193.516 16.1749 193.279 16.1744 192.873L16.039 77.0771C16.0337 72.5032 20.9429 69.6056 24.9446 71.8205L57.5749 89.8813C60.1208 91.2904 61.7008 93.9708 61.7008 96.8806V210.885C61.7008 215.303 58.1191 218.885 53.7008 218.885H20.8926C17.849 218.885 15.0691 217.158 13.7207 214.429L0.21869 187.109C-0.702094 185.246 1.47744 183.388 3.17096 184.593L15.3846 193.281Z" fill="url(#logoGrad)"></path>
      <path d="M121.295 53.678C123.852 55.0778 125.446 57.7581 125.454 60.6737L125.673 140.723C125.685 145.289 120.794 148.196 116.789 146.001L85.1536 128.662C82.5914 127.258 80.9986 124.568 80.9986 121.647V86.1369C80.9986 83.2232 79.4145 80.54 76.8634 79.1324L19.836 47.6664C17.2849 46.2588 15.7008 43.5755 15.7008 40.6619V6.0085C15.7008 1.45035 20.583 -1.44317 24.5815 0.745251L121.295 53.678Z" fill="url(#logoGrad)"></path>
      </g>
      </g>
      </svg>
    </div>
  );
}
