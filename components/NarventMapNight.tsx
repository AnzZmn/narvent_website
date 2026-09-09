import { forwardRef } from "react";
import type { SVGProps } from "react";

/**
 * NarventMap — animated night-theme city map.
 * Workers ride the road geometry via CSS `offset-path`; status bubbles pop en route.
 * Self-contained: keyframes ship with the component, no external assets.
 */
const CSS = `
@keyframes travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@keyframes pop { 0%,32% { opacity:0; transform: translateY(5px) scale(.86); } 38%,45% { opacity:1; transform: translateY(0) scale(1); } 51%,81% { opacity:0; transform: translateY(5px) scale(.86); } 87%,93% { opacity:1; transform: translateY(0) scale(1); } 99%,100% { opacity:0; transform: translateY(5px) scale(.86); } }
@keyframes ring { 0% { transform: scale(.6); opacity:.55; } 70%,100% { transform: scale(2.2); opacity:0; } }
@keyframes dash { to { stroke-dashoffset: -260; } }
[data-map="1"] text { font-family: Archivo, system-ui, sans-serif; }
@media (prefers-reduced-motion: reduce) { [data-map="1"] * { animation: none !important; } }
`;

export interface NarventMapProps extends SVGProps<SVGSVGElement> {
  /** Canvas colour behind the map. Default "#07040e". */
  bg?: string;
}

export const NarventMap = forwardRef<SVGSVGElement, NarventMapProps>(
  function NarventMap({ bg = "#000000", ...rest }, ref) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <svg
          ref={ref}
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          data-map="1"
          viewBox="0 0 1600 1000"
          style={{
            background: bg,
            width: "100%",
            height: "auto",
            display: "block",
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
            stroke="#152647"
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
          </g>
          <g data-role="water" fill="#152647">
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

          <g data-role="blocks" fill="rgba(255,255,255,.06)">
            <rect
              x="63"
              y="61"
              width="25"
              height="23"
              rx="2"
              opacity="0.74"
            ></rect>
            <rect
              x="70"
              y="105"
              width="34"
              height="22"
              rx="2"
              opacity="0.59"
            ></rect>
            <rect
              x="117"
              y="103"
              width="31"
              height="24"
              rx="2"
              opacity="0.76"
            ></rect>
            <rect
              x="165"
              y="145"
              width="28"
              height="25"
              rx="2"
              opacity="0.62"
            ></rect>
            <rect
              x="210"
              y="143"
              width="25"
              height="28"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="67"
              y="180"
              width="35"
              height="30"
              rx="2"
              opacity="0.80"
            ></rect>
            <rect
              x="117"
              y="185"
              width="45"
              height="20"
              rx="2"
              opacity="0.66"
            ></rect>
            <rect
              x="163"
              y="180"
              width="35"
              height="17"
              rx="2"
              opacity="0.66"
            ></rect>
            <rect
              x="62"
              y="228"
              width="25"
              height="19"
              rx="2"
              opacity="0.56"
            ></rect>
            <rect
              x="109"
              y="223"
              width="44"
              height="21"
              rx="2"
              opacity="0.84"
            ></rect>
            <rect
              x="162"
              y="266"
              width="34"
              height="18"
              rx="2"
              opacity="0.90"
            ></rect>
            <rect
              x="116"
              y="345"
              width="33"
              height="23"
              rx="2"
              opacity="0.88"
            ></rect>
            <rect
              x="160"
              y="343"
              width="38"
              height="22"
              rx="2"
              opacity="0.89"
            ></rect>
            <rect
              x="206"
              y="345"
              width="25"
              height="26"
              rx="2"
              opacity="0.70"
            ></rect>
            <rect
              x="68"
              y="383"
              width="24"
              height="28"
              rx="2"
              opacity="0.76"
            ></rect>
            <rect
              x="115"
              y="381"
              width="24"
              height="29"
              rx="2"
              opacity="0.79"
            ></rect>
            <rect
              x="157"
              y="380"
              width="29"
              height="25"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="207"
              y="382"
              width="23"
              height="26"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="61"
              y="427"
              width="37"
              height="31"
              rx="2"
              opacity="0.80"
            ></rect>
            <rect
              x="111"
              y="427"
              width="36"
              height="20"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="65"
              y="464"
              width="26"
              height="24"
              rx="2"
              opacity="0.56"
            ></rect>
            <rect
              x="116"
              y="461"
              width="39"
              height="21"
              rx="2"
              opacity="0.91"
            ></rect>
            <rect
              x="497"
              y="62"
              width="27"
              height="16"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="544"
              y="65"
              width="31"
              height="15"
              rx="2"
              opacity="0.62"
            ></rect>
            <rect
              x="594"
              y="68"
              width="39"
              height="15"
              rx="2"
              opacity="0.58"
            ></rect>
            <rect
              x="350"
              y="106"
              width="31"
              height="17"
              rx="2"
              opacity="0.71"
            ></rect>
            <rect
              x="502"
              y="106"
              width="34"
              height="17"
              rx="2"
              opacity="0.81"
            ></rect>
            <rect
              x="596"
              y="105"
              width="28"
              height="30"
              rx="2"
              opacity="0.65"
            ></rect>
            <rect
              x="547"
              y="144"
              width="26"
              height="33"
              rx="2"
              opacity="0.76"
            ></rect>
            <rect
              x="351"
              y="187"
              width="43"
              height="25"
              rx="2"
              opacity="0.99"
            ></rect>
            <rect
              x="550"
              y="181"
              width="28"
              height="27"
              rx="2"
              opacity="0.82"
            ></rect>
            <rect
              x="356"
              y="222"
              width="45"
              height="28"
              rx="2"
              opacity="0.59"
            ></rect>
            <rect
              x="548"
              y="225"
              width="21"
              height="16"
              rx="2"
              opacity="0.87"
            ></rect>
            <rect
              x="593"
              y="222"
              width="29"
              height="34"
              rx="2"
              opacity="0.80"
            ></rect>
            <rect
              x="589"
              y="347"
              width="32"
              height="21"
              rx="2"
              opacity="0.85"
            ></rect>
            <rect
              x="349"
              y="384"
              width="28"
              height="31"
              rx="2"
              opacity="0.56"
            ></rect>
            <rect
              x="404"
              y="386"
              width="44"
              height="30"
              rx="2"
              opacity="0.60"
            ></rect>
            <rect
              x="591"
              y="385"
              width="32"
              height="17"
              rx="2"
              opacity="0.92"
            ></rect>
            <rect
              x="356"
              y="425"
              width="24"
              height="24"
              rx="2"
              opacity="0.94"
            ></rect>
            <rect
              x="406"
              y="422"
              width="42"
              height="30"
              rx="2"
              opacity="0.92"
            ></rect>
            <rect
              x="595"
              y="424"
              width="40"
              height="17"
              rx="2"
              opacity="0.56"
            ></rect>
            <rect
              x="352"
              y="463"
              width="38"
              height="32"
              rx="2"
              opacity="0.57"
            ></rect>
            <rect
              x="401"
              y="464"
              width="22"
              height="14"
              rx="2"
              opacity="0.61"
            ></rect>
            <rect
              x="804"
              y="66"
              width="40"
              height="20"
              rx="2"
              opacity="0.95"
            ></rect>
            <rect
              x="854"
              y="68"
              width="24"
              height="28"
              rx="2"
              opacity="0.63"
            ></rect>
            <rect
              x="899"
              y="67"
              width="38"
              height="33"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="1048"
              y="66"
              width="45"
              height="32"
              rx="2"
              opacity="0.99"
            ></rect>
            <rect
              x="1096"
              y="62"
              width="35"
              height="22"
              rx="2"
              opacity="0.78"
            ></rect>
            <rect
              x="1280"
              y="61"
              width="43"
              height="26"
              rx="2"
              opacity="0.68"
            ></rect>
            <rect
              x="1331"
              y="68"
              width="44"
              height="19"
              rx="2"
              opacity="0.57"
            ></rect>
            <rect
              x="801"
              y="107"
              width="38"
              height="19"
              rx="2"
              opacity="0.70"
            ></rect>
            <rect
              x="902"
              y="104"
              width="27"
              height="20"
              rx="2"
              opacity="0.99"
            ></rect>
            <rect
              x="946"
              y="103"
              width="21"
              height="22"
              rx="2"
              opacity="0.84"
            ></rect>
            <rect
              x="1092"
              y="102"
              width="42"
              height="15"
              rx="2"
              opacity="0.61"
            ></rect>
            <rect
              x="1281"
              y="108"
              width="30"
              height="32"
              rx="2"
              opacity="0.79"
            ></rect>
            <rect
              x="852"
              y="142"
              width="22"
              height="16"
              rx="2"
              opacity="0.57"
            ></rect>
            <rect
              x="906"
              y="142"
              width="37"
              height="26"
              rx="2"
              opacity="0.84"
            ></rect>
            <rect
              x="1049"
              y="147"
              width="34"
              height="23"
              rx="2"
              opacity="0.99"
            ></rect>
            <rect
              x="1097"
              y="143"
              width="45"
              height="33"
              rx="2"
              opacity="0.63"
            ></rect>
            <rect
              x="1145"
              y="146"
              width="27"
              height="34"
              rx="2"
              opacity="0.79"
            ></rect>
            <rect
              x="1337"
              y="142"
              width="42"
              height="32"
              rx="2"
              opacity="0.75"
            ></rect>
            <rect
              x="850"
              y="181"
              width="36"
              height="26"
              rx="2"
              opacity="0.85"
            ></rect>
            <rect
              x="897"
              y="182"
              width="21"
              height="30"
              rx="2"
              opacity="0.58"
            ></rect>
            <rect
              x="951"
              y="180"
              width="42"
              height="17"
              rx="2"
              opacity="0.66"
            ></rect>
            <rect
              x="1138"
              y="181"
              width="23"
              height="24"
              rx="2"
              opacity="0.59"
            ></rect>
            <rect
              x="1337"
              y="187"
              width="39"
              height="29"
              rx="2"
              opacity="0.94"
            ></rect>
            <rect
              x="809"
              y="224"
              width="33"
              height="21"
              rx="2"
              opacity="0.78"
            ></rect>
            <rect
              x="853"
              y="225"
              width="24"
              height="20"
              rx="2"
              opacity="0.67"
            ></rect>
            <rect
              x="954"
              y="221"
              width="37"
              height="28"
              rx="2"
              opacity="0.68"
            ></rect>
            <rect
              x="1090"
              y="220"
              width="43"
              height="34"
              rx="2"
              opacity="0.59"
            ></rect>
            <rect
              x="1141"
              y="227"
              width="24"
              height="26"
              rx="2"
              opacity="0.97"
            ></rect>
            <rect
              x="1191"
              y="222"
              width="29"
              height="25"
              rx="2"
              opacity="1.00"
            ></rect>
            <rect
              x="1233"
              y="226"
              width="30"
              height="26"
              rx="2"
              opacity="0.55"
            ></rect>
            <rect
              x="1336"
              y="226"
              width="38"
              height="16"
              rx="2"
              opacity="0.61"
            ></rect>
            <rect
              x="851"
              y="371"
              width="45"
              height="16"
              rx="2"
              opacity="0.74"
            ></rect>
            <rect
              x="901"
              y="374"
              width="32"
              height="16"
              rx="2"
              opacity="0.57"
            ></rect>
            <rect
              x="807"
              y="412"
              width="41"
              height="26"
              rx="2"
              opacity="0.97"
            ></rect>
            <rect
              x="858"
              y="417"
              width="23"
              height="31"
              rx="2"
              opacity="0.63"
            ></rect>
            <rect
              x="905"
              y="415"
              width="23"
              height="27"
              rx="2"
              opacity="0.98"
            ></rect>
            <rect
              x="449"
              y="645"
              width="30"
              height="22"
              rx="2"
              opacity="0.65"
            ></rect>
            <rect
              x="501"
              y="647"
              width="40"
              height="23"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="548"
              y="642"
              width="32"
              height="30"
              rx="2"
              opacity="0.64"
            ></rect>
            <rect
              x="594"
              y="641"
              width="33"
              height="27"
              rx="2"
              opacity="0.66"
            ></rect>
            <rect
              x="597"
              y="808"
              width="25"
              height="17"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="455"
              y="846"
              width="39"
              height="33"
              rx="2"
              opacity="0.67"
            ></rect>
            <rect
              x="503"
              y="843"
              width="45"
              height="19"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="543"
              y="844"
              width="21"
              height="19"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="599"
              y="846"
              width="45"
              height="21"
              rx="2"
              opacity="0.58"
            ></rect>
            <rect
              x="844"
              y="625"
              width="32"
              height="21"
              rx="2"
              opacity="0.61"
            ></rect>
            <rect
              x="887"
              y="622"
              width="24"
              height="31"
              rx="2"
              opacity="0.82"
            ></rect>
            <rect
              x="941"
              y="626"
              width="25"
              height="26"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="1038"
              y="622"
              width="41"
              height="20"
              rx="2"
              opacity="0.74"
            ></rect>
            <rect
              x="1088"
              y="621"
              width="31"
              height="27"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="1136"
              y="621"
              width="44"
              height="16"
              rx="2"
              opacity="0.83"
            ></rect>
            <rect
              x="1270"
              y="625"
              width="39"
              height="23"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="1043"
              y="806"
              width="36"
              height="33"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="1141"
              y="807"
              width="42"
              height="28"
              rx="2"
              opacity="0.98"
            ></rect>
            <rect
              x="1189"
              y="805"
              width="34"
              height="23"
              rx="2"
              opacity="0.61"
            ></rect>
            <rect
              x="804"
              y="844"
              width="29"
              height="33"
              rx="2"
              opacity="0.91"
            ></rect>
            <rect
              x="851"
              y="841"
              width="25"
              height="26"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="897"
              y="844"
              width="34"
              height="25"
              rx="2"
              opacity="0.85"
            ></rect>
            <rect
              x="1042"
              y="843"
              width="44"
              height="22"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="1091"
              y="845"
              width="31"
              height="14"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="1145"
              y="846"
              width="23"
              height="18"
              rx="2"
              opacity="0.59"
            ></rect>
            <rect
              x="1189"
              y="848"
              width="34"
              height="21"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="1288"
              y="844"
              width="29"
              height="27"
              rx="2"
              opacity="0.82"
            ></rect>
            <rect
              x="804"
              y="881"
              width="44"
              height="33"
              rx="2"
              opacity="0.88"
            ></rect>
            <rect
              x="853"
              y="887"
              width="36"
              height="31"
              rx="2"
              opacity="0.90"
            ></rect>
            <rect
              x="1144"
              y="887"
              width="29"
              height="33"
              rx="2"
              opacity="1.00"
            ></rect>
            <rect
              x="1238"
              y="882"
              width="27"
              height="32"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="1330"
              y="883"
              width="28"
              height="21"
              rx="2"
              opacity="0.64"
            ></rect>
            <rect
              x="809"
              y="925"
              width="30"
              height="25"
              rx="2"
              opacity="0.98"
            ></rect>
            <rect
              x="896"
              y="927"
              width="30"
              height="33"
              rx="2"
              opacity="0.84"
            ></rect>
            <rect
              x="951"
              y="922"
              width="25"
              height="22"
              rx="2"
              opacity="0.91"
            ></rect>
            <rect
              x="1044"
              y="924"
              width="37"
              height="18"
              rx="2"
              opacity="0.79"
            ></rect>
            <rect
              x="1091"
              y="924"
              width="26"
              height="27"
              rx="2"
              opacity="0.73"
            ></rect>
            <rect
              x="1335"
              y="924"
              width="41"
              height="26"
              rx="2"
              opacity="0.63"
            ></rect>
            <rect
              x="1180"
              y="345"
              width="38"
              height="24"
              rx="2"
              opacity="0.77"
            ></rect>
            <rect
              x="1234"
              y="347"
              width="42"
              height="15"
              rx="2"
              opacity="0.93"
            ></rect>
            <rect
              x="1189"
              y="385"
              width="20"
              height="20"
              rx="2"
              opacity="0.90"
            ></rect>
            <rect
              x="1231"
              y="381"
              width="40"
              height="20"
              rx="2"
              opacity="0.63"
            ></rect>
            <rect
              x="1280"
              y="384"
              width="41"
              height="27"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="1429"
              y="387"
              width="27"
              height="19"
              rx="2"
              opacity="0.88"
            ></rect>
            <rect
              x="1232"
              y="426"
              width="46"
              height="18"
              rx="2"
              opacity="0.80"
            ></rect>
            <rect
              x="1284"
              y="422"
              width="36"
              height="25"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="1328"
              y="427"
              width="24"
              height="33"
              rx="2"
              opacity="0.57"
            ></rect>
            <rect
              x="1421"
              y="427"
              width="36"
              height="29"
              rx="2"
              opacity="0.97"
            ></rect>
            <rect
              x="1483"
              y="642"
              width="27"
              height="33"
              rx="2"
              opacity="0.86"
            ></rect>
            <rect
              x="1535"
              y="648"
              width="41"
              height="33"
              rx="2"
              opacity="0.89"
            ></rect>
            <rect
              x="1536"
              y="847"
              width="33"
              height="31"
              rx="2"
              opacity="0.92"
            ></rect>
            <rect
              x="1488"
              y="881"
              width="45"
              height="19"
              rx="2"
              opacity="0.90"
            ></rect>
            <rect
              x="1536"
              y="882"
              width="28"
              height="18"
              rx="2"
              opacity="0.56"
            ></rect>
            <rect
              x="1488"
              y="925"
              width="45"
              height="19"
              rx="2"
              opacity="0.75"
            ></rect>
            <rect
              x="1537"
              y="921"
              width="22"
              height="27"
              rx="2"
              opacity="0.72"
            ></rect>
            <rect
              x="1064"
              y="473"
              width="45"
              height="21"
              rx="2"
              opacity="1.00"
            ></rect>
            <rect
              x="1112"
              y="470"
              width="29"
              height="19"
              rx="2"
              opacity="0.69"
            ></rect>
            <rect
              x="1162"
              y="474"
              width="22"
              height="20"
              rx="2"
              opacity="0.77"
            ></rect>
          </g>

          <g
            data-role="minor"
            fill="none"
            stroke="rgba(255,255,255,.10)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M 67,155 Q 127,132 157,141 L 187,150"
              opacity="0.72"
            ></path>
            <path d="M 127,132 Q 124,152 119,168" opacity="0.72"></path>
            <path d="M 127,132 Q 126,115 124,101" opacity="0.72"></path>
            <path
              d="M 65,229 Q 125,235 155,228 L 185,221"
              opacity="0.72"
            ></path>
            <path d="M 125,235 Q 123,269 119,297" opacity="0.72"></path>
            <path
              d="M 63,340 Q 123,327 153,338 L 183,348"
              opacity="0.72"
            ></path>
            <path d="M 123,327 Q 123,354 123,376" opacity="0.72"></path>
            <path d="M 123,327 Q 119,289 114,257" opacity="0.72"></path>
            <path
              d="M 61,416 Q 121,419 151,421 L 181,422"
              opacity="0.72"
            ></path>
            <path d="M 121,419 Q 123,444 126,463" opacity="0.72"></path>
            <path d="M 121,419 Q 124,460 128,494" opacity="0.72"></path>
            <path
              d="M 133,74 Q 129,164 135,209 Q 141,254 144,299 Q 148,344 139,389 L 130,434"
              opacity="0.72"
            ></path>
            <path d="M 544,166 Q 543,195 541,219" opacity="0.72"></path>
            <path d="M 544,166 Q 540,126 535,92" opacity="0.72"></path>
            <path d="M 373,250 Q 375,293 377,328" opacity="0.72"></path>
            <path d="M 373,250 Q 370,293 365,328" opacity="0.72"></path>
            <path d="M 364,322 Q 362,301 360,284" opacity="0.72"></path>
            <path d="M 480,442 Q 475,472 468,495" opacity="0.72"></path>
            <path
              d="M 553,70 Q 538,162 548,208 L 558,254"
              opacity="0.72"
            ></path>
            <path
              d="M 796,119 Q 894,117 943,118 Q 993,119 1042,120 Q 1091,120 1140,117 Q 1189,113 1238,111 L 1288,108"
              opacity="0.72"
            ></path>
            <path d="M 1091,120 Q 1092,158 1095,190" opacity="0.72"></path>
            <path d="M 1091,120 Q 1088,105 1084,92" opacity="0.72"></path>
            <path
              d="M 805,193 Q 904,184 953,187 Q 1002,191 1051,188 Q 1100,186 1150,184 L 1199,183"
              opacity="0.72"
            ></path>
            <path d="M 1002,191 Q 1005,219 1010,242" opacity="0.72"></path>
            <path
              d="M 928,65 Q 928,120 923,147 Q 918,175 925,202 L 932,230"
              opacity="0.72"
            ></path>
            <path
              d="M 1097,68 Q 1102,123 1097,151 Q 1093,178 1093,206 L 1092,233"
              opacity="0.72"
            ></path>
            <path
              d="M 795,405 Q 855,391 885,399 Q 915,407 945,398 L 975,389"
              opacity="0.72"
            ></path>
            <path d="M 915,407 Q 912,385 907,368" opacity="0.72"></path>
            <path
              d="M 877,323 Q 883,378 882,406 L 881,433"
              opacity="0.72"
            ></path>
            <path
              d="M 475,731 Q 535,729 565,728 Q 595,728 625,730 L 655,732"
              opacity="0.72"
            ></path>
            <path d="M 595,728 Q 590,694 584,666" opacity="0.72"></path>
            <path d="M 595,728 Q 597,693 600,664" opacity="0.72"></path>
            <path
              d="M 481,795 Q 541,809 571,803 Q 601,797 631,798 L 661,799"
              opacity="0.72"
            ></path>
            <path d="M 541,809 Q 538,790 533,774" opacity="0.72"></path>
            <path d="M 601,797 Q 601,836 600,868" opacity="0.72"></path>
            <path
              d="M 452,647 Q 472,702 466,729 Q 459,757 456,784 Q 452,812 463,839 L 473,867"
              opacity="0.72"
            ></path>
            <path
              d="M 553,657 Q 550,712 548,739 Q 547,767 547,794 Q 548,822 555,849 L 562,877"
              opacity="0.72"
            ></path>
            <path
              d="M 786,680 Q 887,691 938,687 Q 989,683 1040,684 Q 1091,686 1141,678 Q 1192,670 1243,671 L 1294,671"
              opacity="0.72"
            ></path>
            <path
              d="M 793,878 Q 898,859 950,867 Q 1003,875 1055,864 Q 1108,853 1160,854 Q 1213,854 1265,862 L 1318,869"
              opacity="0.72"
            ></path>
            <path d="M 1003,875 Q 1001,846 999,823" opacity="0.72"></path>
            <path
              d="M 802,926 Q 907,923 960,921 Q 1012,918 1065,927 Q 1117,936 1170,933 Q 1222,930 1275,931 L 1327,932"
              opacity="0.72"
            ></path>
            <path d="M 1012,918 Q 1015,897 1018,880" opacity="0.72"></path>
            <path d="M 1012,918 Q 1011,961 1009,995" opacity="0.72"></path>
            <path
              d="M 944,791 Q 953,846 958,874 Q 964,901 962,929 L 960,956"
              opacity="0.72"
            ></path>
            <path
              d="M 1109,796 Q 1111,851 1112,878 Q 1113,906 1110,933 L 1107,961"
              opacity="0.72"
            ></path>
            <path
              d="M 1277,792 Q 1281,847 1283,875 Q 1285,902 1285,930 L 1285,957"
              opacity="0.72"
            ></path>
            <path
              d="M 1185,381 Q 1245,379 1275,375 Q 1305,372 1365,373 Q 1425,373 1455,369 L 1485,364"
              opacity="0.72"
            ></path>
            <path d="M 1245,379 Q 1244,412 1242,440" opacity="0.72"></path>
            <path d="M 1245,379 Q 1242,351 1237,329" opacity="0.72"></path>
            <path
              d="M 1283,290 Q 1298,345 1299,373 L 1299,400"
              opacity="0.72"
            ></path>
          </g>

          <g
            data-role="road"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="12"
            ></path>
            <path
              d="M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="8.5"
            ></path>
            <path
              d="M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="12"
            ></path>
            <path
              d="M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="8.5"
            ></path>
            <path
              d="M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="11"
            ></path>
            <path
              d="M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="7.5"
            ></path>
            <path
              d="M 244,-20 C 250,20 256,220 274,380 C 280,440 283,490 286,540 C 296,680 304,820 310,1020"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="11"
            ></path>
            <path
              d="M 244,-20 C 250,20 256,220 274,380 C 280,440 283,490 286,540 C 296,680 304,820 310,1020"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="7.5"
            ></path>
            <path
              d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652 C 900,636 1120,620 1340,606 C 1440,600 1530,596 1620,592"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="12"
            ></path>
            <path
              d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652 C 900,636 1120,620 1340,606 C 1440,600 1530,596 1620,592"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="8.5"
            ></path>
            <path
              d="M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="14"
            ></path>
            <path
              d="M -20,556 C 220,548 430,542 640,532 C 900,520 1180,500 1620,476"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="10"
            ></path>
            <path
              d="M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020"
              stroke="rgba(255,255,255,.10)"
              strokeWidth="12"
            ></path>
            <path
              d="M 742,-20 C 734,220 728,430 726,640 C 724,830 720,930 718,1020"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="8"
            ></path>
          </g>

          <g data-role="arterial" fill="none" strokeLinecap="round">
            <path
              d="M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020"
              stroke="rgba(255,255,255,.13)"
              strokeWidth="26"
            ></path>
            <path
              d="M 780,-20 C 772,220 766,430 764,640 C 762,830 758,930 756,1020"
              stroke="rgba(255,255,255,.28)"
              strokeWidth="20"
            ></path>
            <path
              d="M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020"
              stroke="rgba(255,255,255,.13)"
              strokeWidth="26"
            ></path>
            <path
              d="M 1160,-20 C 1240,150 1320,290 1392,410 C 1444,498 1462,700 1470,1020"
              stroke="rgba(255,255,255,.28)"
              strokeWidth="20"
            ></path>
          </g>

          <g
            data-routes="1"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="14 12"
            style={{ animation: "dash 6s linear infinite" }}
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
              d="M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196"
              stroke="#6d56ff"
              strokeWidth="3"
              opacity=".45"
            ></path>
            <path
              d="M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715"
              stroke="#5694ff"
              strokeWidth="3"
              opacity=".45"
            ></path>
            <path
              d="M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020"
              stroke="#c156ff"
              strokeWidth="3"
              opacity=".45"
            ></path>
            <path
              d="M 244,-20 C 250,20 256,220 274,380 C 280,440 283,490 286,540 C 296,680 304,820 310,1020"
              stroke="#6d56ff"
              strokeWidth="3"
              opacity=".45"
            ></path>
            <path
              d="M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652 C 900,636 1120,620 1340,606 C 1440,600 1530,596 1620,592"
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
                  animation: "ring 3.2s ease-out infinite",
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
                  animation: "ring 3.2s ease-out infinite",
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
                  animation: "ring 3.2s ease-out infinite",
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
                  animation: "ring 3.2s ease-out infinite",
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
            <text x="1476" y="152" fill="rgba(140,180,220,.34)">
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
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                animation: "travel 30s linear infinite",
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
                  animation: "pop 30s linear infinite",
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
                animation: "travel 30s linear infinite",
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
                  animation: "pop 30s linear infinite",
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
                animation: "travel 34s linear infinite",
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
                  animation: "pop 34s linear infinite",
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
                animation: "travel 28s linear infinite",
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
                  animation: "pop 28s linear infinite",
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
                animation: "travel 28s linear infinite",
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
                  animation: "pop 28s linear infinite",
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
                  "path('M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196')",
                animation: "travel 18s linear infinite",
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
                  animation: "pop 18s linear infinite",
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
                  "path('M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196')",
                animation: "travel 22s linear infinite",
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
                  animation: "pop 22s linear infinite",
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
                  "path('M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715')",
                animation: "travel 20s linear infinite",
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
                  animation: "pop 20s linear infinite",
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
                  "path('M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715')",
                animation: "travel 24s linear infinite",
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
                  animation: "pop 24s linear infinite",
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
                  "path('M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020')",
                animation: "travel 21s linear infinite",
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
                  animation: "pop 21s linear infinite",
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
                  "path('M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020')",
                animation: "travel 25s linear infinite",
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
                  animation: "pop 25s linear infinite",
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
                  "path('M 244,-20 C 250,20 256,220 274,380 C 280,440 283,490 286,540 C 296,680 304,820 310,1020')",
                animation: "travel 27s linear infinite",
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
                  animation: "pop 27s linear infinite",
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
                  "path('M 244,-20 C 250,20 256,220 274,380 C 280,440 283,490 286,540 C 296,680 304,820 310,1020')",
                animation: "travel 23s linear infinite",
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
                  animation: "pop 23s linear infinite",
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
                  "path('M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652 C 900,636 1120,620 1340,606 C 1440,600 1530,596 1620,592')",
                animation: "travel 19s linear infinite",
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
                  animation: "pop 19s linear infinite",
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
                  "path('M -20,690 C 140,686 300,680 470,672 C 560,668 640,660 700,652 C 900,636 1120,620 1340,606 C 1440,600 1530,596 1620,592')",
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                animation: "travel 31s linear infinite",
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
                  animation: "pop 31s linear infinite",
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
                animation: "travel 29s linear infinite",
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
                  animation: "pop 29s linear infinite",
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
                  "path('M -20,330 C 180,324 440,312 700,300 C 860,292 1000,286 1140,276 C 1230,270 1300,258 1370,240 C 1460,220 1540,206 1620,196')",
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                animation: "travel 26s linear infinite",
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
                  animation: "pop 26s linear infinite",
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
                  "path('M 999,284 C 1002,360 1008,500 1018,720 C 1022,820 1026,900 1030,1020')",
                animation: "travel 30s linear infinite",
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
                  animation: "pop 30s linear infinite",
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
                  "path('M -20,790 C 160,782 400,772 660,760 C 820,752 980,744 1140,736 C 1260,730 1360,726 1450,722 C 1520,719 1570,717 1620,715')",
                animation: "travel 28s linear infinite",
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
                  animation: "pop 28s linear infinite",
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
      </>
    );
  },
);

export default NarventMap;
