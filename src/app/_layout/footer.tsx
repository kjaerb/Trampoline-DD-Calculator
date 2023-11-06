import { ThemeToggle } from "@/components/toggles/theme-toggle";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-4 mt-4 border-t">
      <div className="flex justify-between items-start sm:items-center text-gray-500 text-xs flex-col sm:flex-row space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center space-y-4 sm:space-y-0">
          <ThemeToggle />
          <p className="ml-0 sm:ml-2 mt-2 sm:mt-0">
            &copy;{new Date().getFullYear()} - Benjamin Kjær
          </p>
        </div>

        <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row items-center justify-center ml-0 sm:ml-1">
          <p className="py-0 my-0">Want to support me?</p>
          <a
            href="https://www.buymeacoffee.com/benjaminkjaer"
            target="_blank"
            className="ml-0 sm:ml-1 mt-2 sm:mt-0"
          >
            <Image
              width={108}
              height={30}
              src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
              alt="Buy Me A Coffee"
              className="mx-0 sm:mx-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
