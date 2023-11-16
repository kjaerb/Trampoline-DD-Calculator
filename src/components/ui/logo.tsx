"use client";

import Image from "next/image";
import Favicon from "@/app/favicon.ico";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={Favicon}
      width={32}
      height={32}
      alt="favicon"
      className={cn(resolvedTheme === "dark" ? "invert" : "")}
    />
  );
}
