import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

export const metadata: Metadata = {
  title: "Narvent: AI-Powered Workforce Platform | Gig Jobs & Data Operations",
  description:
    "Join Narvent's workforce network. Find flexible gig work, field jobs, data annotation, asset audits, and more.",
  icons: {
    icon: "/NarventSVG.svg",
  },
};

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-clip">{children}</body>
    </html>
  );
}
