import Link from "next/link";
import BusinessNetworkBackdrop from "./BusinessNetworkBackdrop";
import BusinessStats from "./BusinessStats";
import "./for-business.css";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

/* Narvent — "For Business" section, phone layout (390 × 693, 9:16).
   Fonts expected on the page: Archivo (sans) and IBM Plex Mono (mono).
   Tailwind only; the css import carries keyframes, nothing else. */

type Props = {
  bookHref?: string;
  /** Renders the 390×693 frame with a device shell. Set false to fill the parent. */
  framed?: boolean;
};

export default function ForBusinessMobile({
  bookHref = "#book",
  framed = true,
}: Props) {
  const router = useRouter();
  const section = (
    <section
      className="relative flex h-svh flex-col overflow-hidden bg-[#faf9fd] py-10 w-full px-10"
      id="Business"
    >
      <BusinessNetworkBackdrop />

      {/* Readability wash so the centred copy holds contrast over the network. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_34%_at_50%_42%,#ffffff_0%,rgba(250,249,253,0.9)_52%,rgba(250,249,253,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_85%_at_50%_42%,#ffffff_0%,rgba(250,249,253,0.9)_52%,rgba(250,249,253,0)_100%)]" />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6">
        <div className="flex flex-col items-center gap-3 opacity-0 [animation:nv-rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a34cf]">
            Narvent for business
          </span>
          <span className="block h-px w-40 bg-[linear-gradient(90deg,rgba(74,52,207,0),rgba(74,52,207,0.5),rgba(74,52,207,0))]" />
        </div>

        <h2 className="mt-[22px] text-balance text-center text-[33px] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#191428] opacity-0 [animation:nv-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_0.08s_both]">
          Tell us the scope.
          <br />
          We <span className="text-[#4a34cf]"> staff </span> it <br /> &{" "}
          <span className="text-[#4a34cf]">superwise</span> it.
        </h2>

        <p className="mt-[18px] text-pretty text-center text-sm leading-[1.6] text-[#191428]/[0.62] opacity-0 [animation:nv-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_0.16s_both]">
          Every extra staffing vendor is another contract, another quality
          standard and another week lost.{" "}
          <span className="text-[#4a34cf]">Narvent</span> replaces the chain
          with one platform: verified talent, deployed and supervised by us,
          visible to you shift by shift, billed on one invoice.
        </p>

        <Link
          href={bookHref}
          className="mt-7 flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#4a34cf] text-base font-semibold text-white shadow-[0_14px_30px_rgba(74,52,207,0.28)] opacity-0 transition-colors [animation:nv-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_0.24s_both] hover:bg-[#3d2ab5]"
          onClick={(e) => {
            e.preventDefault();
            router.refresh();
            router.push("/ContactUs");
          }}
        >
          Book a meeting now
          <ArrowRightIcon />
        </Link>

        <BusinessStats />
      </div>
    </section>
  );

  if (!framed) return section;

  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(70%_50%_at_50%_0%,#ffffff,#e3dff1_74%)] px-4 pb-16 pt-8">
      <div className="h-[693px] w-[390px] overflow-hidden rounded-[34px] border border-[#191428]/10 shadow-[0_30px_80px_rgba(58,44,110,0.18)]">
        {section}
      </div>
    </div>
  );
}
