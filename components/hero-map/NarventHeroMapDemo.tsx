import NarventHeroMap from "./NarventHeroMap";

/** Preview shell: lilac page + 390px phone frame.
 *  Drop <NarventHeroMap /> straight into a page if you don't want the frame. */
export default function NarventHeroMapDemo() {
  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(70%_50%_at_50%_0%,#ffffff,#e6e2f2_72%)] px-4 pb-16 pt-8">
      <div className="w-full max-w-[390px] overflow-hidden rounded-[34px] border border-[rgba(20,16,31,0.1)] shadow-[0_30px_80px_rgba(58,44,110,0.18)]">
        <NarventHeroMap />
      </div>
    </div>
  );
}
