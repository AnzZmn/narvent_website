import type { Section } from "./terms-content";
import { sectionNumber, slugify } from "./terms-content";

/** One numbered clause: heading, paragraphs and bullet grids. */
export default function TermsSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  return (
    <section
      id={slugify(section.title)}
      data-terms-section
      className="max-w-[800px] scroll-mt-24 lg:scroll-mt-[110px]"
    >
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="flex-none font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[#6d56ff]">
          {sectionNumber(index)}
        </span>
        <h2 className="text-[20px] font-bold leading-[1.25] tracking-[-0.03em] text-white sm:text-[22px] lg:text-[clamp(24px,2.4vw,32px)] lg:leading-[1.2]">
          {section.title}
        </h2>
      </div>

      <div className="mt-4 flex flex-col gap-4 lg:mt-[18px] lg:pl-[29px]">
        {section.blocks.map((b, i) =>
          "isText" in b ? (
            <p
              key={i}
              className="text-base leading-[1.68] text-[#f2ecff]/[0.62] [text-wrap:pretty] lg:text-[16.5px]"
            >
              {b.text}
            </p>
          ) : (
            <ul
              key={i}
              className="my-0.5 grid list-none grid-cols-1 gap-x-[26px] gap-y-[9px] p-0 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"
            >
              {b.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[15px] leading-[1.5] text-[#f2ecff]/[0.72] lg:text-[15.5px]"
                >
                  <span className="absolute left-0 top-[0.62em] size-[5px] rounded-[1px] bg-[var(--color-1)]" />
                  {item}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
