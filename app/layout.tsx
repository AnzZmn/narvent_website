import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Narvent",
  description: "South India's Largest Manpower Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
