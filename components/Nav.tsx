import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { BRAND_GRADIENT, cn, CONTAINER } from "@/lib/utils";
import BorderGlow from "./BorderGlow";

const NAV_LINKS = [
  { label: "For Workers", href: "#workers" },
  { label: "For Business", href: "#features" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 py-5  transition-all duration-300 md:pr-26 md:pl-26",
        scrolled
          ? "backdrop-blur-xs"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          CONTAINER,
          "flex h-16 items-center justify-between sm:h-[72px] ",
        )}
      >
        <Link href="#top" className="flex items-center">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 40,
              fontWeight: "800",
            }}
            className="text-[var(--color-2)]"
          >
            Narvent.
          </h1>
        </Link>

        <nav className="hidden items-center gap-8 md:flex md:flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#CBB8FF] transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <BorderGlow
          edgeSensitivity={150}
          glowColor="40 80 80"
          glowRadius={200}
          glowIntensity={0.5}
          coneSpread={25}
          animated={true}
          colors={["#c084fc", "#f472b6", "#38bdf8"]}
          className="text-white justify-center items-center rounded-md"
        >
          Contact Us
        </BorderGlow>
      </div>
    </header>
  );
}
