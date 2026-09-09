import NarventHeroPhone from "./NarventHeroPhone";

/** Preview shell: dark page + 390px phone frame. Drop <NarventHeroPhone /> straight
 *  into a page instead if you don't want the frame. */
export default function NarventHeroPhoneDemo() {
  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(70%_50%_at_50%_0%,#1d1233,#0b0715_70%)] px-4 pb-16 pt-8">
      <div className="w-full max-w-[390px] overflow-hidden rounded-[34px] border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <NarventHeroPhone />
      </div>
    </div>
  );
}
