import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

import { Separator } from "@/components/ui/separator";
import { BRAND_GRADIENT, CONTAINER, fontMono } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { name: "For Workers", link: "#forworkers" },
      { name: "For Business", link: "#Business" },
      { name: "FAQ", link: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Terms & Condition", link: "T&C" },
      { name: "Privacy Policy", link: "PrivacyPolicy" },
    ],
  },
];

export default function Footer() {
  const router = useRouter();
  return (
    <footer
      className="relative border-t border-white/5 py-16 md:px-25 bg-[#0d0a1a]"
      id="footer"
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <span className="flex gap-2 items-center">
              <Image
                src="/NarventSVG.svg"
                alt="logo"
                className="object-contain"
                width={20}
                height={20}
              />
              <Link
                href="/#Hero"
                className="justify-self-start text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#6d56ff]"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/#Hero");
                }}
              >
                Narvent.
              </Link>
            </span>
            <p className="max-w-xs text-sm text-white/50">
              India&apos;s frontline workforce network
            </p>
            <div className="mt-2 flex items-center gap-3">
              <SocialIcon
                url="https://www.instagram.com/narvent.in?igsi=MTg0bmFpNzViMjBoNw=="
                bgColor="transparent"
              />
              <SocialIcon
                url="https://talent.narvent.in/join"
                network="whatsapp"
                bgColor="transparent"
              />
              <SocialIcon
                url="https://www.facebook.com/share/1D8kXKQ2Y9/"
                bgColor="transparent"
              />
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4
                className="text-xs font-medium uppercase tracking-wider text-white/40"
                style={fontMono}
              >
                {col.title}
              </h4>
              {col.links.map((l) => (
                <Link
                  key={l.name}
                  href={l.link}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/${l.link}`);
                  }}
                >
                  {l.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2026 Narvent. All rights reserved.
          </p>
          <p className="text-xs text-white/30" style={fontMono}>
            India&apos;s frontline workforce network
          </p>
        </div>
      </div>
    </footer>
  );
}
