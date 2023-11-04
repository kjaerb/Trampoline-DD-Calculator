import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trampoline Difficulty Calculator",
  description:
    "This is an application, that can calculate the difficulty of a trampoline routine. It is based on the FIG Code of Points and you're able to select multiple different COP's or even the gender of the athlete to get the correct difficulty.",
};

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
