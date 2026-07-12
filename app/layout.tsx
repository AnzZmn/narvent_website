import type { Metadata } from "next";
import "./globals.css";

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
