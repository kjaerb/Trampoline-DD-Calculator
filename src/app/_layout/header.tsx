import { NotationDialog } from "@/components/tariff/notation-dialog";
import { Logo } from "@/components/ui/logo";

export function Header() {
  return (
    <nav className="flex justify-between items-center py-4 mb-4 border-b mx-auto">
      <div className="flex space-x-2 items-center">
        <Logo />
        <h1 className="font-bold sm:text-xl text-base">
          Trampoline Difficulty Calculator
        </h1>
      </div>
      <NotationDialog />
    </nav>
  );
}
