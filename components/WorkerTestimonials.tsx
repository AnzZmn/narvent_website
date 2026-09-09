import { VOICES } from "../lib/lookingForWork";

export default function WorkerTestimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#0b0813] px-[clamp(32px,4vw,64px)] pb-[110px] pt-[100px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[200px] -top-[160px] h-[640px] w-[700px] blur-[50px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%,rgba(201,242,77,.10),transparent 62%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.28em] text-[#5694ff]">
              From the pool
            </div>
            <h2 className="mt-4 max-w-[640px] text-[clamp(30px,3.4vw,44px)] font-bold leading-[1.08] tracking-[-0.035em] text-white text-pretty">
              What work through Narvent actually looks like.
            </h2>
          </div>
          <p className="m-0 max-w-[300px] text-[15px] leading-[1.6] text-[#f2ecff]/[0.55]">
            Three of the 30,000. Names and photos published with permission.
          </p>
        </div>

        <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {VOICES.map((v) => (
            <figure
              key={v.quote}
              className="m-0 flex flex-col rounded-[18px] border border-white/[0.08] bg-[#101010] p-[30px]"
            >
              <div
                aria-hidden
                className="text-[44px] font-bold leading-none opacity-55"
                style={{ color: v.accent }}
              >
                &ldquo;
              </div>

              <blockquote className="m-0 mt-3.5 text-lg font-medium leading-[1.5] tracking-[-0.01em] text-[#f2ecff] text-pretty">
                {v.quote}
              </blockquote>

              <figcaption className="mt-[26px] flex items-center gap-3.5 border-t border-white/[0.09] pt-5">
                {/* swap for next/image with a real portrait */}
                <span className="h-[46px] w-[46px] flex-none rounded-full border border-white/[0.14] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.06)_0_5px,transparent_5px_10px)]" />
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <strong className="text-[15px] font-semibold text-white">
                    {v.name}
                  </strong>
                  <em className="font-[family-name:var(--font-mono)] text-[12.5px] not-italic text-[#f2ecff]/[0.45]">
                    {v.meta}
                  </em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-5 border-t border-white/[0.08] pt-7">
          <span className="text-[15px] leading-[1.5] text-[#f2ecff]/[0.55]">
            Registration takes three minutes and costs nothing.
          </span>
          <a
            href="#register"
            className="rounded-[10px] bg-[#c9f24d] px-[26px] py-[13px] text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:bg-[#dcff70]"
          >
            Join the talent pool
          </a>
        </div>
      </div>
    </section>
  );
}
