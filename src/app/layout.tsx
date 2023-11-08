import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trampoline Difficulty Calculator",
  description:
    "An application, that can calculate the difficulty of a trampoline routine. It is based on the FIG Code of Points and you're able to select multiple different COP's or even the gender of the athlete to get the correct difficulty.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "nextjs13",
    "next13",
    "pwa",
    "next-pwa",
    "trampoline",
    "tariff",
    "calculator",
    "dd",
    "difficulty",
  ],
  authors: [
    { name: "Benjamin Kjær" },
    {
      name: "Benjamin Kjær",
      url: "https://www.linkedin.com/in/benjamin-kj%C3%A6r-971a0618b/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
