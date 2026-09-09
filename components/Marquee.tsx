import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  "46 ROLES OPEN TODAY",
  "DATA ANNOTATION · KOCHI",
  "ASSET AUDIT · 4 CITIES",
  "FIELD SURVEY · COIMBATORE",
  "WAREHOUSE OPS · HYDERABAD",
  "VALET PARKING · CALICUT",
  "CATTERING · THRISSUR",
];

const firstRow = ITEMS.slice(0, Math.ceil(ITEMS.length / 2));

const JobTicker = ({ item }: { item: string }) => {
  return (
    <span className="flex shrink-0 items-center gap-11 text-white">
      {item}
      <span className="text-[#6d56ff]">◆</span>
    </span>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((item) => (
          <JobTicker key={item} item={item} />
        ))}
      </Marquee>
    </div>
  );
}
