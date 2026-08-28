import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Safarnama — AI Travel Planner for Students",
  description:
    "Plan personalized, budget-friendly trips with Safarnama's AI travel planner. Student-focused, AI-powered.",
  applicationName: "Safarnama",
  keywords: ["AI travel planner", "student travel", "budget trips", "India travel", "Safarnama"],
  openGraph: {
    title: "Safarnama — AI Travel Planner for Students",
    description: "Plan personalized, budget-friendly trips with Safarnama's AI travel planner.",
    type: "website",
    images: ["/images/hero-desktop.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safarnama — AI Travel Planner for Students",
    description: "Plan personalized, budget-friendly trips with Safarnama's AI travel planner.",
    images: ["/images/hero-desktop.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-950 text-neutral-200 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIChat />
      </body>
    </html>
  );
}
