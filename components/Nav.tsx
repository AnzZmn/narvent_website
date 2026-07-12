import { useEffect, useState } from "react";
import Link from "next/link";
import {
  SheetHeader,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import { BRAND_GRADIENT, cn, CONTAINER } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 md:py-10 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#05050b]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          CONTAINER,
          "flex h-16 items-center justify-between sm:h-[72px]",
        )}
      >
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
          <div
            className="w-[112px] h-[25px] "
            style={{
              WebkitMask:
                "url('/NarventTextOnlyViolet.png') center / contain no-repeat",
              mask: "url('/NarventTextOnlyViolet.png' center / contain no-repeat)",
              backgroundImage: BRAND_GRADIENT,
            }}
          ></div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-white/80 hover:bg-white/5 hover:text-white"
          >
            Sign in
          </Button>
          <Button
            className="group border-0 text-white"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/5 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[300px] flex-col gap-8 border-white/10 bg-[#05050b] sm:w-[340px]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <Image src="/narvent-icon.png" alt="" width={20} height={34} />
                <Image
                  src="/NarventTextOnlyViolet.png"
                  alt="Narvent"
                  width={100}
                  height={23}
                />
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-white/15 text-white hover:bg-white/5"
              >
                Sign in
              </Button>
              <Button
                className="border-0 text-white"
                style={{ backgroundImage: BRAND_GRADIENT }}
              >
                Get started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
