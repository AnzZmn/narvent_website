import { fontMono } from "@/lib/utils";
import { Users, MapPin, ShieldCheck } from "lucide-react";

export default function HeroStats() {
  return (
    <div
      className="relative mt-10  flex items-center gap-4 text-sm md:text-base font-medium text-white/75"
      style={{
        ...fontMono,
        fontVariantCaps: "all-petite-caps",
        fontSize: "20px",
      }}
    >
      <div className="flex flex-row items-center gap-2 ">
        <Users className="h-4 w-4 text-[#7C5CFF]" strokeWidth={2} />
        <span className="flex-row flex gap-2">
          <span className="font-bold text-[#CBB8FF]">30,000+</span> Workers
        </span>
      </div>

      <div className="h-1 w-1 rounded-full bg-white/30" />

      <div className="flex flex-row items-center gap-2">
        <MapPin className="h-4 w-4 text-[#7C5CFF]" strokeWidth={2} />
        <span className="flex-row flex gap-2">
          <span className="font-bold text-[#CBB8FF]">129</span> Locations
        </span>
      </div>

      <div className="h-1 w-1 rounded-full bg-white/30" />

      <div className="flex flex-row items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#7C5CFF]" strokeWidth={2} />

        <span className="flex-row flex gap-2">
          <span className="font-bold text-[#CBB8FF]">AI</span> Managed
        </span>
      </div>
    </div>
  );
}
