import { clsx, type ClassValue } from "clsx";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-8";

export const BRAND_GRADIENT =
  "linear-gradient(135deg, var(--color-1) 0%, var(--color-2) 55%, var(--color-3) 100%)";

export const gradientText: React.CSSProperties = {
  backgroundImage: BRAND_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const fontDisplay: React.CSSProperties = {
  fontFamily: "var(--font-display)",
};
export const fontMono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
