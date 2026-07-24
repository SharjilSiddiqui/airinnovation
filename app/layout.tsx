import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import IntroLoader from "@/components/layout/IntroLoader";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AIR Innovation",
  description:
    "Interactive architectural experiences that transform static designs into immersive environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body>
        <IntroLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
