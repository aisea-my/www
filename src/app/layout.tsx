import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const perfectlyNineties = localFont({
  src: "../../public/fonts/perfectly-nineties-regular.otf",
  variable: "--font-perfectly-nineties",
});

export const metadata: Metadata = {
  title: "AISEA | Southeast Asia's Largest AI Builder Movement",
  description:
    "Join AISEA (24-30 Nov 2025) - Southeast Asia's largest grassroots builder movement bringing together builders, startups, corporates, and VCs.",
  keywords: [
    "AISEA",
    "AI",
    "Southeast Asia",
    "builder movement",
    "hackathon",
    "AI week",
    "tech event",
  ],
  authors: [{ name: "AISEA" }],
  creator: "AISEA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${perfectlyNineties.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
