import Image from "next/image";
import Link from "next/link";
import SocialLink from "./SocialLink";

import { Separator } from "@/components/ui/separator";
import { BRAND_GRADIENT, CONTAINER, fontMono } from "@/lib/utils";

const FOOTER_COLUMNS = [
  { title: "Product", links: ["Features", "How it works", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Blog"] },
  { title: "Resources", links: ["Docs", "Support", "Community"] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <Link href="#top" className="flex items-center gap-2.5">
              <div
                className="w-[50px] h-[50px]"
                style={{
                  WebkitMask:
                    "url('/NarventLogoOnly.png') center / contain no-repeat",
                  mask: "url('/NarventLogoOnly.png') center / contain no-repeat",
                  backgroundImage: BRAND_GRADIENT,
                }}
              />
              <Image
                src="/NarventTextOnlyViolet.png"
                alt="Narvent"
                width={112}
                height={26}
              />
            </Link>
            <p className="max-w-xs text-sm text-white/50">
              Autonomous workflows for modern teams.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <SocialLink label="X" href="#" />
              <SocialLink label="gh" href="#" />
              <SocialLink label="in" href="#" />
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
                  key={l}
                  href="#"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l}
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
            Built for autonomous teams
          </p>
        </div>
      </div>
    </footer>
  );
}
