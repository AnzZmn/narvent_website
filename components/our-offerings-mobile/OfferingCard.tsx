import OfferingIcon from "./OfferingIcon";
import type { Offering } from "./offerings.data";

export default function OfferingCard({ offering, knowMoreHref = "#know-more" }: { offering: Offering; knowMoreHref?: string }) {
  return (
    <article className="flex shrink-0 basis-[290px] snap-center flex-col rounded-[18px] border border-[#191428]/[0.09] bg-white/[0.86] p-[18px] pb-4 shadow-[0_12px_30px_rgba(58,44,110,0.09)] backdrop-blur-[6px]">
      <div className="flex size-[34px] items-center justify-center rounded-[10px] bg-[#4a34cf]/[0.09] text-[#4a34cf]">
        <OfferingIcon name={offering.icon} />
      </div>

      <h3 className="mt-4 text-balance text-center text-[17px] font-bold leading-[1.2] tracking-[-0.02em] text-[#191428]">
        {offering.title}
      </h3>

      <p className="mt-2.5 text-pretty text-center text-[11.5px] leading-[1.5] text-[#191428]/[0.58]">
        {offering.blurb}
      </p>

      <ul className="mt-3.5 flex list-none flex-col gap-[9px] overflow-hidden p-0">
        {offering.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-[11.5px] leading-[1.45] text-[#191428]/70">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#4a34cf]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="min-h-[18px] flex-1" />

      <a
        href={knowMoreHref}
        className="flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[23px] bg-[#191428] text-[13px] font-semibold text-white transition-colors hover:bg-[#2c2445]"
      >
        Know More
        <span aria-hidden="true" className="text-sm">
          &rarr;
        </span>
      </a>
    </article>
  );
}
