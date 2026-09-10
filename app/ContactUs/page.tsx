import ContactUsPage from "@/components/ContactUsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manpower & Gig Workforce Solutions for Businesses",

  description:
    "Hire and deploy verified gig, blue-collar, and field workers for audits, surveys, data collection, operations, and workforce projects with Narvent.",

  alternates: {
    canonical: "https://narvent.in/business",
  },

  icons: {
    icon: "/NarventICO.svg",
  },

  openGraph: {
    title: "Manpower & Gig Workforce Solutions | Narvent",
    description:
      "Deploy verified workers for field operations, audits, surveys, data collection and workforce projects.",
    url: "https://narvent.in/business",
  },
};

export default function BusinessPage() {
  return <ContactUsPage />;
}
