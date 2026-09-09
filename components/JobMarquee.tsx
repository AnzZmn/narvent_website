import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

export type Role = {
  id: string;
  title: string;
  description: string;
  photo: string; // replace with a real src once photography lands
};

export const WORK: Role[] = [
  {
    id: "01",
    title: "Survey & data collection agent",
    description:
      "Walk assigned routes, capture photos and readings on the app. Day rates from ₹700.",
    photo: "/Promotion.jpg",
  },
  {
    id: "02",
    title: "Annotation & data entry",
    description:
      "Label images, audio and text from a Narvent pod or from home. Training provided.",
    photo: "/Annotation.png",
  },
  {
    id: "03",
    title: "Retail promoter",
    description:
      "In-store demos, sampling and customer engagement for brand launches.",
    photo: "/Promotion.jpg",
  },
  {
    id: "04",
    title: "Site & asset auditor",
    description:
      "QR-scan assets, verify stock and file inspection reports across nearby sites.",
    photo: "/Audit.jpg",
  },
  {
    id: "05",
    title: "Warehouse & logistics crew",
    description:
      "Sorting, loading and dispatch shifts with fixed hours and same-week payouts.",
    photo: "/ManagedStaffing.jpg",
  },
  {
    id: "06",
    title: "Telecaller",
    description:
      "Inbound and outbound calling in your language, from a centre or from home.",
    photo: "/Promotion.jpg",
  },
  {
    id: "07",
    title: "Merchant onboarding executive",
    description:
      "Sign up local sellers, verify documents and set up their accounts on the ground.",
    photo: "/Audit.jpg",
  },
  {
    id: "08",
    title: "Field technician support",
    description:
      "On-site installs, checks and validation runs for enterprise and AI teams.",
    photo: "/FieldOps1.jpg",
  },
];

const firstRow = WORK.slice(0, WORK.length / 2);
const secondRow = WORK.slice(WORK.length / 2);

const JobCard = ({
  id,
  photo,
  title,
  description,
}: {
  id: string;
  photo: string;
  title: string;
  description: string;
}) => {
  return (
    <article
      key={id}
      className="group flex-none w-[350px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] hover:border-[#8b7cff]/55 hover:bg-[#6d56ff]/[0.08] backdrop-blur-lg transition-all duration-200 ease-in-out hover:scale-105 "
    >
      {/* replace with next/image once real photography lands */}
      <div className="flex h-[184px] items-end bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.045)_0_8px,transparent_8px_16px)]">
        <Image
          src={photo}
          alt={photo}
          width={1000} // Arbitrary large width
          height={500} // Arbitrary large height
          className="w-full h-full object-cover"
        />
      </div>
      <div className="border-t border-white/[0.4] p-5 pb-6">
        <div className="font-[family-name:var(--font-mono)] text-[18px] font-semibold tracking-[0.18em] text-[#5694ff]">
          {id}
        </div>
        <h3 className="mb-2 mt-2.5 font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-[#ffffff]">
          {title}
        </h3>
        <p className="text-sm leading-[1.5] text-[#f2ecff]/[0.55]">
          {description}
        </p>
      </div>
    </article>
  );
};

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-start overflow-y-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]">
      <Marquee
        pauseOnHover
        vertical
        className="[--duration:20s] [mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)]"
      >
        {firstRow.map((work) => (
          <JobCard key={work.id} {...work} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:20s] [mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)]"
      >
        {secondRow.map((work) => (
          <JobCard key={work.id} {...work} />
        ))}
      </Marquee>
    </div>
  );
}
