import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import StructuredData from "@/components/StructuredData";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const siteUrl = "https://narvent.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Narvent: AI-Powered Workforce Platform | Find Parttime work in Kerala",
    template: "%s | Narvent",
  },

  description:
    "Narvent is an AI-powered workforce platform connecting businesses with verified blue-collar and gig workers for field operations, audits, data collection, staffing, and workforce deployment across India.",

  icons: {
    icon: "/NarventICO.svg",
  },

  applicationName: "Narvent",

  keywords: [
    "Narvent",
    "manpower solutions",
    "manpower solutions India",
    "gig workforce platform",
    "gig workers India",
    "blue collar workforce",
    "blue collar jobs India",
    "workforce management",
    "field workforce",
    "field operations",
    "staffing solutions",
    "AI workforce platform",
    "gig staffing",
    "contract workforce",
    "on-demand workforce",
    "workforce deployment",
  ],

  authors: [
    {
      name: "Narvent",
      url: siteUrl,
    },
  ],

  creator: "Narvent",
  publisher: "Narvent",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,

    siteName: "Narvent",

    title: "Narvent | AI-Powered Workforce & Gig Workforce Platform",

    description:
      "Deploy verified gig and blue-collar workers for field operations, audits, data collection, staffing, and workforce projects across India.",

    images: [
      {
        url: "/NarventICO.svg",
        width: 1200,
        height: 630,
        alt: "Narvent — AI-Powered Workforce Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Narvent | AI-Powered Workforce Platform",

    description:
      "AI-powered workforce and gig staffing platform for businesses across India.",

    images: ["/NarventICO.svg"],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-clip bg-[#0b0813]">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
