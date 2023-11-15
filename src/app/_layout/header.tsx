"use client";

import { NotationDialog } from "@/components/tariff/notation-dialog";
import Image from "next/image";
import Favicon from "@/app/favicon.ico";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <nav className="flex justify-between items-center py-4 mb-4 border-b mx-auto">
      <div className="flex space-x-2 items-center">
        <Image src={Favicon} width={32} height={32} alt="favicon" />
        <h1 className="font-bold sm:text-xl text-base">
          Trampoline Difficulty Calculator
        </h1>
      </div>
      <NotationDialog />
      {process.env.NODE_ENV === "development" ? (
        <Button
          onClick={() => {
            if (window && window.localStorage) {
              window.localStorage.setItem(
                "trampoline-exercises-cache",
                JSON.stringify({})
              );
            }
          }}
        >
          Reset localstorage
        </Button>
      ) : null}
    </nav>
  );
}
